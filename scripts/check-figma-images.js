#!/usr/bin/env node

/**
 * Script pour vérifier que toutes les images Figma sont présentes
 * Usage: node scripts/check-figma-images.js
 */

const fs = require('fs');
const path = require('path');

const requiredImages = {
  explore: ['map.png', 'lightbulb.png', 'globe.png'],
  share: ['folder.png', 'chat.png', 'share.png'],
  remember: ['folder.png', 'sparkles.png', 'chart.png'],
};

const basePath = path.join(__dirname, '..', 'public', 'cards');

console.log('🔍 Vérification des images Figma...\n');

let allPresent = true;

Object.entries(requiredImages).forEach(([section, images]) => {
  console.log(`📁 Section: ${section.toUpperCase()}`);
  const sectionPath = path.join(basePath, section);
  
  images.forEach((imageName) => {
    const imagePath = path.join(sectionPath, imageName);
    const exists = fs.existsSync(imagePath);
    
    if (exists) {
      const stats = fs.statSync(imagePath);
      console.log(`  ✅ ${imageName} (${(stats.size / 1024).toFixed(2)} KB)`);
    } else {
      console.log(`  ❌ ${imageName} - MANQUANT`);
      allPresent = false;
    }
  });
  console.log('');
});

if (allPresent) {
  console.log('✨ Toutes les images sont présentes !');
  process.exit(0);
} else {
  console.log('⚠️  Certaines images sont manquantes.');
  console.log('\n📝 Instructions:');
  console.log('1. Exportez vos designs depuis Figma');
  console.log('2. Placez-les dans les dossiers correspondants');
  console.log('3. Utilisez les noms exacts indiqués ci-dessus');
  process.exit(1);
}

