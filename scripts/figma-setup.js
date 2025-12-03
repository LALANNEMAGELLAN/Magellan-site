/**
 * Script d'aide pour configurer l'API Figma
 * Aide à trouver les IDs des frames dans le fichier Figma
 */

const https = require('https');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function question(query) {
  return new Promise((resolve) => rl.question(query, resolve));
}

async function listFrames(fileKey, token) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'api.figma.com',
      path: `/v1/files/${fileKey}`,
      method: 'GET',
      headers: {
        'X-Figma-Token': token,
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
          reject(new Error(`Erreur: ${res.statusCode} - ${data}`));
        }
      });
    }).on('error', (err) => {
      reject(err);
    });
  });
}

function printNodes(nodes, indent = '') {
  for (const nodeId in nodes) {
    const node = nodes[nodeId];
    console.log(`${indent}📦 ${node.name} (ID: ${nodeId})`);
    
    if (node.children) {
      printNodes(node.children.reduce((acc, child) => {
        acc[child.id] = child;
        return acc;
      }, {}), indent + '  ');
    }
  }
}

async function main() {
  console.log('🔧 Configuration de l\'API Figma\n');

  const token = await question('Entrez votre token Figma (ou appuyez sur Entrée pour utiliser FIGMA_TOKEN): ');
  const figmaToken = token || process.env.FIGMA_TOKEN;

  if (!figmaToken) {
    console.error('❌ Token Figma requis');
    console.log('💡 Crée un token sur https://www.figma.com/developers/api#access-tokens');
    process.exit(1);
  }

  const fileKey = await question('Entrez la clé du fichier Figma (trouvable dans l\'URL): ');
  
  if (!fileKey) {
    console.error('❌ Clé du fichier requise');
    process.exit(1);
  }

  try {
    console.log('\n📋 Récupération de la structure du fichier...\n');
    const fileData = await listFrames(fileKey, figmaToken);
    
    console.log('📁 Structure du fichier Figma:\n');
    printNodes({ [fileData.document.id]: fileData.document });
    
    console.log('\n✅ Configuration terminée !');
    console.log('\n💡 Pour télécharger les images, utilisez:');
    console.log(`   FIGMA_TOKEN=${figmaToken} FIGMA_FILE_KEY=${fileKey} npm run figma:download`);
    
  } catch (error) {
    console.error('\n❌ Erreur:', error.message);
    process.exit(1);
  }

  rl.close();
}

main();












