#!/usr/bin/env node

/**
 * Script pour organiser les images traduites depuis Downloads
 * vers les bons dossiers dans public/cards/
 */

const fs = require('fs');
const path = require('path');

const downloadsDir = path.join(process.env.HOME || '/Users/julien_lalanne', 'Downloads');
const baseDir = path.join(__dirname, '..', 'public', 'cards');

// Mapping des noms de fichiers Figma vers les noms attendus
const imageMapping = {
  explore: {
    'carte-interactive-dynamique': 'map',
    'découvertes-autour-de-vous': 'lightbulb',
    'inspirations-de-voyages': 'globe',
  },
  share: {
    'album-partagé': 'folder',
    'chat-intégré': 'chat',
    'récit-interactif-généré-par-l\'ia': 'share',
  },
  remember: {
    'carnet-de-voyage-intelligent': 'book',
    'slide-show-&-albums-imprimés': 'slideshow',
    'statistiques-de-voyage': 'statistics',
  },
};

// Fonction pour normaliser les noms de fichiers
function normalizeFileName(fileName) {
  return fileName
    .toLowerCase()
    .replace(/[^a-z0-9-]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
}

// Fonction pour détecter la langue dans le nom de fichier
function detectLanguage(fileName) {
  const lower = fileName.toLowerCase();
  if (lower.includes('-en') || lower.includes('english') || lower.includes('anglais')) {
    return 'en';
  }
  if (lower.includes('-es') || lower.includes('spanish') || lower.includes('espagnol')) {
    return 'es';
  }
  return 'fr';
}

// Fonction pour trouver les images correspondantes
function findMatchingImages() {
  const files = fs.readdirSync(downloadsDir).filter(f => 
    f.toLowerCase().endsWith('.png') || f.toLowerCase().endsWith('.jpg')
  );

  const matches = {
    explore: { fr: {}, en: {}, es: {} },
    share: { fr: {}, en: {}, es: {} },
    remember: { fr: {}, en: {}, es: {} },
  };

  files.forEach(file => {
    const fileLower = file.toLowerCase();
    
    // Parcourir chaque section
    Object.keys(imageMapping).forEach(section => {
      Object.keys(imageMapping[section]).forEach(figmaName => {
        const targetName = imageMapping[section][figmaName];
        
        // Vérifier si le fichier correspond
        if (fileLower.includes(figmaName.toLowerCase().replace(/'/g, '')) || 
            fileLower.includes(targetName)) {
          const isFront = fileLower.includes('front') || (!fileLower.includes('back'));
          const lang = detectLanguage(file);
          
          if (isFront) {
            const key = `${targetName}.png`;
            if (!matches[section][lang][key]) {
              matches[section][lang][key] = path.join(downloadsDir, file);
            }
          }
        }
      });
    });
  });

  return matches;
}

// Exécution
console.log('🔍 Recherche des images traduites dans Downloads...\n');

const matches = findMatchingImages();
let foundCount = 0;
let missingCount = 0;

Object.keys(matches).forEach(section => {
  console.log(`📁 Section: ${section.toUpperCase()}`);
  
  ['fr', 'en', 'es'].forEach(lang => {
    const langName = { fr: 'Français', en: 'Anglais', es: 'Espagnol' }[lang];
    const images = matches[section][lang];
    const imageKeys = Object.keys(images);
    
    if (imageKeys.length > 0) {
      console.log(`   ${langName}:`);
      imageKeys.forEach(key => {
        const sourcePath = images[key];
        const targetPath = path.join(baseDir, section, key);
        const exists = fs.existsSync(targetPath);
        
        console.log(`      ${key}: ${exists ? '✓ Déjà présent' : '→ À copier'} (${path.basename(sourcePath)})`);
        if (!exists) {
          foundCount++;
        }
      });
    } else {
      console.log(`   ${langName}: Aucune image trouvée`);
      if (lang !== 'fr') {
        missingCount++;
      }
    }
  });
  console.log('');
});

console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log(`📊 RÉSUMÉ`);
console.log(`   ✅ Images trouvées à copier: ${foundCount}`);
console.log(`   ❌ Images manquantes: ${missingCount}`);
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

if (foundCount > 0) {
  console.log('💡 Pour copier les images, utilisez:');
  console.log('   node scripts/copy-translated-images.js\n');
}



