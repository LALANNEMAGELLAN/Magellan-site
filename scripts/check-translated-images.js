#!/usr/bin/env node

/**
 * Script pour vérifier quelles images traduites existent déjà
 * et lesquelles manquent encore
 */

const fs = require('fs');
const path = require('path');

const sections = ['explore', 'share', 'remember'];
const locales = ['en', 'es'];
const baseDir = path.join(__dirname, '..', 'public', 'cards');

// Liste des images par section
const imagesBySection = {
  explore: [
    { front: 'map.png', back: 'map-back.png' },
    { front: 'lightbulb.png', back: 'lightbulb-back.png' },
    { front: 'globe.png', back: 'globe-back.png' },
  ],
  share: [
    { front: 'folder.png', back: 'folder-back.png' },
    { front: 'chat.png', back: 'chat-back.png' },
    { front: 'share.png', back: 'share-back.png' },
  ],
  remember: [
    { front: 'book.png', back: 'book-back.png' },
    { front: 'slideshow.png', back: 'slideshow-back.png' },
    { front: 'statistics.png', back: 'statistics-back.png' },
  ],
};

function getTranslatedImageName(imageName, locale) {
  const nameWithoutExt = imageName.replace(/\.(png|jpg|jpeg)$/i, '');
  const ext = imageName.match(/\.(png|jpg|jpeg)$/i)?.[1] || 'png';
  return `${nameWithoutExt}-${locale}.${ext}`;
}

function checkImageExists(section, imageName) {
  const imagePath = path.join(baseDir, section, imageName);
  return fs.existsSync(imagePath);
}

function checkSection(section) {
  const images = imagesBySection[section];
  const results = {
    section,
    total: 0,
    existing: 0,
    missing: [],
  };

  images.forEach(({ front, back }) => {
    // Vérifier les images front et back pour chaque langue
    locales.forEach((locale) => {
      const frontTranslated = getTranslatedImageName(front, locale);
      const backTranslated = getTranslatedImageName(back, locale);

      results.total += 2; // front + back

      if (checkImageExists(section, frontTranslated)) {
        results.existing++;
      } else {
        results.missing.push(`${section}/${frontTranslated}`);
      }

      if (checkImageExists(section, backTranslated)) {
        results.existing++;
      } else {
        results.missing.push(`${section}/${backTranslated}`);
      }
    });
  });

  return results;
}

// Exécution
console.log('🔍 Vérification des images traduites...\n');

let totalExisting = 0;
let totalMissing = 0;
const allMissing = [];

sections.forEach((section) => {
  const results = checkSection(section);
  totalExisting += results.existing;
  totalMissing += results.total - results.existing;
  allMissing.push(...results.missing);

  const percentage = ((results.existing / results.total) * 100).toFixed(1);
  console.log(`📁 Section: ${section.toUpperCase()}`);
  console.log(`   ✅ Existantes: ${results.existing}/${results.total} (${percentage}%)`);
  if (results.missing.length > 0) {
    console.log(`   ❌ Manquantes: ${results.missing.length}`);
    results.missing.forEach((img) => {
      console.log(`      - ${img}`);
    });
  }
  console.log('');
});

const totalPercentage = ((totalExisting / (totalExisting + totalMissing)) * 100).toFixed(1);
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log(`📊 RÉSUMÉ GLOBAL`);
console.log(`   ✅ Images traduites: ${totalExisting}/${totalExisting + totalMissing} (${totalPercentage}%)`);
console.log(`   ❌ Images manquantes: ${totalMissing}`);
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

if (allMissing.length > 0) {
  console.log('📝 Liste complète des images manquantes:');
  allMissing.forEach((img) => console.log(`   - ${img}`));
  console.log('\n💡 Consultez TRADUCTION-IMAGES.md pour plus de détails.\n');
} else {
  console.log('🎉 Toutes les images traduites sont présentes !\n');
}



