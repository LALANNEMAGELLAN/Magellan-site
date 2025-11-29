/**
 * Script pour télécharger les images depuis Figma via l'API
 * 
 * Usage:
 *   npm run figma:download
 *   ou
 *   FIGMA_TOKEN=ton_token FIGMA_FILE_KEY=file_key node scripts/figma-download.js
 * 
 * Prérequis:
 *   1. Créer un token sur https://www.figma.com/developers/api#access-tokens
 *   2. Récupérer le FILE_KEY depuis l'URL Figma: figma.com/file/FILE_KEY/...
 *   3. Créer un fichier .env.local avec FIGMA_TOKEN et FIGMA_FILE_KEY
 */

require('dotenv').config({ path: '.env.local' });

const fs = require('fs');
const path = require('path');
const https = require('https');

// Configuration depuis .env.local ou variables d'environnement
const FIGMA_TOKEN = process.env.FIGMA_TOKEN;
const FIGMA_FILE_KEY = process.env.FIGMA_FILE_KEY;

if (!FIGMA_TOKEN) {
  console.error('❌ FIGMA_TOKEN est requis');
  console.log('💡 Crée un token sur https://www.figma.com/developers/api#access-tokens');
  console.log('💡 Ajoute-le dans .env.local : FIGMA_TOKEN=ton_token');
  process.exit(1);
}

if (!FIGMA_FILE_KEY) {
  console.error('❌ FIGMA_FILE_KEY est requis');
  console.log('💡 Récupère-le depuis l\'URL Figma : figma.com/file/FILE_KEY/...');
  console.log('💡 Ajoute-le dans .env.local : FIGMA_FILE_KEY=ton_file_key');
  process.exit(1);
}

// Mapping des noms de frames Figma vers les noms de fichiers
const FRAME_MAPPING = {
  explore: {
    'map-front': 'map.png',
    'map-back': 'map-back.png',
    'lightbulb-front': 'lightbulb.png',
    'lightbulb-back': 'lightbulb-back.png',
    'globe-front': 'globe.png',
    'globe-back': 'globe-back.png',
  },
  share: {
    'folder-front': 'folder.png',
    'folder-back': 'folder-back.png',
    'chat-front': 'chat.png',
    'chat-back': 'chat-back.png',
    'share-front': 'share.png',
    'share-back': 'share-back.png',
  },
  remember: {
    'folder-front': 'folder.png',
    'folder-back': 'folder-back.png',
    'sparkles-front': 'sparkles.png',
    'sparkles-back': 'sparkles-back.png',
    'chart-front': 'chart.png',
    'chart-back': 'chart-back.png',
  },
};

/**
 * Fait une requête à l'API Figma
 */
function figmaRequest(endpoint) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'api.figma.com',
      path: endpoint,
      method: 'GET',
      headers: {
        'X-Figma-Token': FIGMA_TOKEN,
      },
    };

    https.get(options, (res) => {
      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        if (res.statusCode === 200) {
          resolve(JSON.parse(data));
        } else {
          reject(new Error(`Erreur API Figma: ${res.statusCode} - ${data}`));
        }
      });
    }).on('error', (err) => {
      reject(err);
    });
  });
}

/**
 * Télécharge une image depuis Figma
 */
function downloadImage(nodeId, outputPath) {
  return new Promise((resolve, reject) => {
    // 1. Demander l'URL de l'image
    const options = {
      hostname: 'api.figma.com',
      path: `/v1/images/${FIGMA_FILE_KEY}?ids=${nodeId}&format=png&scale=2`,
      method: 'GET',
      headers: {
        'X-Figma-Token': FIGMA_TOKEN,
      },
    };

    https.get(options, (res) => {
      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        if (res.statusCode === 200) {
          const response = JSON.parse(data);
          const imageUrl = response.images[nodeId];
          
          if (!imageUrl) {
            reject(new Error(`Aucune image trouvée pour le node ${nodeId}`));
            return;
          }

          // 2. Télécharger l'image depuis l'URL
          https.get(imageUrl, (imageRes) => {
            if (imageRes.statusCode !== 200) {
              reject(new Error(`Erreur téléchargement image: ${imageRes.statusCode}`));
              return;
            }

            const fileStream = fs.createWriteStream(outputPath);
            imageRes.pipe(fileStream);
            
            fileStream.on('finish', () => {
              fileStream.close();
              const stats = fs.statSync(outputPath);
              const sizeKB = (stats.size / 1024).toFixed(2);
              console.log(`   ✅ ${path.basename(outputPath)} (${sizeKB} KB)`);
              resolve();
            });
          }).on('error', (err) => {
            reject(err);
          });
        } else {
          reject(new Error(`Erreur: ${res.statusCode} - ${data}`));
        }
      });
    }).on('error', (err) => {
      reject(err);
    });
  });
}

/**
 * Trouve tous les nodes par leur nom dans l'arbre Figma
 * Retourne un objet { nom: nodeId }
 */
function findAllNodesByName(node, names, found = {}) {
  // Vérifier si le node actuel correspond à un nom recherché
  if (names.includes(node.name)) {
    found[node.name] = node.id;
  }
  
  // Recherche récursive dans les enfants
  if (node.children) {
    for (const child of node.children) {
      findAllNodesByName(child, names, found);
    }
  }
  
  return found;
}

/**
 * Liste tous les frames disponibles dans le fichier Figma
 */
function listAllFrames(node, frames = []) {
  if (node.type === 'FRAME' || node.type === 'COMPONENT' || node.type === 'INSTANCE') {
    frames.push({
      name: node.name,
      id: node.id,
      type: node.type,
    });
  }
  
  if (node.children) {
    for (const child of node.children) {
      listAllFrames(child, frames);
    }
  }
  
  return frames;
}

/**
 * Fonction principale
 */
async function main() {
  console.log('🚀 Début du téléchargement depuis Figma...\n');
  console.log(`📁 File Key: ${FIGMA_FILE_KEY.substring(0, 10)}...\n`);

  try {
    // 1. Récupérer la structure du fichier Figma
    console.log('📋 Récupération de la structure du fichier...');
    const fileData = await figmaRequest(`/v1/files/${FIGMA_FILE_KEY}`);
    console.log(`✅ Fichier trouvé: "${fileData.name}"\n`);
    
    // 2. Lister tous les frames disponibles (pour debug)
    const allFrames = [];
    fileData.document.children.forEach(page => {
      listAllFrames(page, allFrames);
    });
    
    if (allFrames.length > 0) {
      console.log('📦 Frames disponibles dans le fichier:');
      allFrames.forEach(frame => {
        console.log(`   - ${frame.name} (${frame.type})`);
      });
      console.log('');
    }
    
    // 3. Créer les dossiers de destination
    const baseDir = path.join(__dirname, '../public/cards');
    ['explore', 'share', 'remember'].forEach((section) => {
      const sectionDir = path.join(baseDir, section);
      if (!fs.existsSync(sectionDir)) {
        fs.mkdirSync(sectionDir, { recursive: true });
        console.log(`📁 Dossier créé: ${sectionDir}`);
      }
    });
    console.log('');

    // 4. Pour chaque section, télécharger les images
    let totalDownloaded = 0;
    let totalSkipped = 0;

    for (const [section, mapping] of Object.entries(FRAME_MAPPING)) {
      console.log(`📁 Section: ${section}`);
      
      // Trouver tous les nodes de cette section en une fois
      const frameNames = Object.keys(mapping);
      const foundNodes = {};
      fileData.document.children.forEach(page => {
        findAllNodesByName(page, frameNames, foundNodes);
      });
      
      for (const [frameName, fileName] of Object.entries(mapping)) {
        const nodeId = foundNodes[frameName];
        
        if (!nodeId) {
          console.log(`   ⚠️  "${frameName}" non trouvé`);
          totalSkipped++;
          continue;
        }

        const outputPath = path.join(baseDir, section, fileName);
        console.log(`   📥 ${frameName} → ${fileName}`);
        
        try {
          await downloadImage(nodeId, outputPath);
          totalDownloaded++;
        } catch (error) {
          console.log(`   ❌ Erreur: ${error.message}`);
          totalSkipped++;
        }
      }
      console.log('');
    }

    // 5. Résumé
    console.log('📊 Résumé:');
    console.log(`   ✅ Téléchargés: ${totalDownloaded}`);
    console.log(`   ⚠️  Ignorés: ${totalSkipped}`);
    console.log('');
    
    if (totalDownloaded > 0) {
      console.log('✅ Téléchargement terminé !');
      console.log('💡 Les images sont dans public/cards/[section]/');
    } else {
      console.log('⚠️  Aucune image téléchargée.');
      console.log('💡 Vérifie que les frames ont les bons noms dans Figma.');
    }
  } catch (error) {
    console.error('\n❌ Erreur:', error.message);
    if (error.message.includes('404')) {
      console.log('💡 Vérifie que le FILE_KEY est correct dans .env.local');
    }
    process.exit(1);
  }
}

// Exécuter
if (require.main === module) {
  main();
}

module.exports = { main };
