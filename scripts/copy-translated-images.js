#!/usr/bin/env node

/**
 * Script pour copier les images traduites depuis Downloads
 * vers les bons dossiers dans public/cards/
 * 
 * Usage: Placez les images dans Downloads avec les noms corrects, puis exécutez ce script
 */

const fs = require('fs');
const path = require('path');

const downloadsDir = path.join(process.env.HOME || '/Users/julien_lalanne', 'Downloads');
const baseDir = path.join(__dirname, '..', 'public', 'cards');

// Mapping des noms de fichiers attendus
const expectedImages = {
  explore: [
    { name: 'map', locales: ['en', 'es'] },
    { name: 'lightbulb', locales: ['en', 'es'] },
    { name: 'globe', locales: ['en', 'es'] },
  ],
  share: [
    { name: 'folder', locales: ['en', 'es'] },
    { name: 'chat', locales: ['en', 'es'] },
    { name: 'share', locales: ['en', 'es'] },
  ],
  remember: [
    { name: 'book', locales: ['en', 'es'] },
    { name: 'slideshow', locales: ['en', 'es'] },
    { name: 'statistics', locales: ['en', 'es'] },
  ],
};

// Fonction pour trouver un fichier dans Downloads
function findFileInDownloads(baseName, locale) {
  const files = fs.readdirSync(downloadsDir);
  const targetName = `${baseName}-${locale}.png`;
  
  // Recherche exacte
  if (files.includes(targetName)) {
    return path.join(downloadsDir, targetName);
  }
  
  // Recherche avec variations de casse
  const lowerTarget = targetName.toLowerCase();
  const found = files.find(f => f.toLowerCase() === lowerTarget);
  if (found) {
    return path.join(downloadsDir, found);
  }
  
  // Recherche partielle (contient le nom)
  const partial = files.find(f => 
    f.toLowerCase().includes(baseName.toLowerCase()) && 
    f.toLowerCase().includes(`-${locale}`) &&
    (f.toLowerCase().endsWith('.png') || f.toLowerCase().endsWith('.jpg'))
  );
  if (partial) {
    return path.join(downloadsDir, partial);
  }
  
  return null;
}

// Fonction pour copier un fichier
function copyFile(source, dest) {
  try {
    // Créer le dossier de destination s'il n'existe pas
    const destDir = path.dirname(dest);
    if (!fs.existsSync(destDir)) {
      fs.mkdirSync(destDir, { recursive: true });
    }
    
    // Copier le fichier
    fs.copyFileSync(source, dest);
    return true;
  } catch (error) {
    console.error(`   ❌ Erreur lors de la copie: ${error.message}`);
    return false;
  }
}

// Exécution
console.log('📦 Copie des images traduites depuis Downloads...\n');

let copied = 0;
let skipped = 0;
let notFound = 0;

Object.keys(expectedImages).forEach(section => {
  console.log(`📁 Section: ${section.toUpperCase()}`);
  
  expectedImages[section].forEach(({ name, locales }) => {
    locales.forEach(locale => {
      const targetFileName = `${name}-${locale}.png`;
      const targetPath = path.join(baseDir, section, targetFileName);
      
      // Vérifier si le fichier existe déjà
      if (fs.existsSync(targetPath)) {
        console.log(`   ✓ ${targetFileName} (déjà présent)`);
        skipped++;
        return;
      }
      
      // Chercher le fichier dans Downloads
      const sourcePath = findFileInDownloads(name, locale);
      
      if (sourcePath && fs.existsSync(sourcePath)) {
        if (copyFile(sourcePath, targetPath)) {
          console.log(`   ✅ ${targetFileName} (copié depuis ${path.basename(sourcePath)})`);
          copied++;
        } else {
          notFound++;
        }
      } else {
        console.log(`   ❌ ${targetFileName} (non trouvé dans Downloads)`);
        notFound++;
      }
    });
  });
  console.log('');
});

console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log(`📊 RÉSUMÉ`);
console.log(`   ✅ Copiées: ${copied}`);
console.log(`   ⏭️  Déjà présentes: ${skipped}`);
console.log(`   ❌ Non trouvées: ${notFound}`);
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

if (notFound > 0) {
  console.log('💡 Pour copier les images manquantes:');
  console.log('   1. Exportez-les depuis Figma');
  console.log('   2. Nommez-les: {nom-carte}-en.png ou {nom-carte}-es.png');
  console.log('   3. Placez-les dans Downloads');
  console.log('   4. Relancez ce script\n');
}



