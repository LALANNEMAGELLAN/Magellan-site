# Guide pour ajouter les images front traduites

## 📋 Résumé

**État actuel :** Seules les versions françaises existent (9/9 ✓)  
**À créer :** 18 images traduites (9 cartes × 2 langues)

## 🎯 Images à créer

### Section EXPLORE (`/public/cards/explore/`)

| Carte | Français | Anglais | Espagnol |
|-------|----------|---------|----------|
| Carte interactive dynamique | `map.png` ✓ | `map-en.png` ✗ | `map-es.png` ✗ |
| Découvertes autour de vous | `lightbulb.png` ✓ | `lightbulb-en.png` ✗ | `lightbulb-es.png` ✗ |
| Inspirations de voyages | `globe.png` ✓ | `globe-en.png` ✗ | `globe-es.png` ✗ |

### Section SHARE (`/public/cards/share/`)

| Carte | Français | Anglais | Espagnol |
|-------|----------|---------|----------|
| Album partagé | `folder.png` ✓ | `folder-en.png` ✗ | `folder-es.png` ✗ |
| Chat intégré | `chat.png` ✓ | `chat-en.png` ✗ | `chat-es.png` ✗ |
| Récit interactif généré par l'IA | `share.png` ✓ | `share-en.png` ✗ | `share-es.png` ✗ |

### Section REMEMBER (`/public/cards/remember/`)

| Carte | Français | Anglais | Espagnol |
|-------|----------|---------|----------|
| Carnet de voyage intelligent | `book.png` ✓ | `book-en.png` ✗ | `book-es.png` ✗ |
| Slide Show & Albums imprimés | `slideshow.png` ✓ | `slideshow-en.png` ✗ | `slideshow-es.png` ✗ |
| Statistiques de voyage | `statistics.png` ✓ | `statistics-en.png` ✗ | `statistics-es.png` ✗ |

## 📝 Instructions

### Étape 1 : Exporter depuis Figma

Pour chaque carte front, exporter 3 versions :
1. **Version française** : `{nom}.png` (déjà fait ✓)
2. **Version anglaise** : `{nom}-en.png` (à créer)
3. **Version espagnole** : `{nom}-es.png` (à créer)

**Exemple pour "Carte interactive dynamique" :**
- `map.png` (FR) - déjà présent
- `map-en.png` (EN) - à créer avec texte anglais
- `map-es.png` (ES) - à créer avec texte espagnol

### Étape 2 : Nommer les fichiers

**Format exact requis :**
- Anglais : `{nom-carte}-en.png`
- Espagnol : `{nom-carte}-es.png`

**Noms exacts attendus :**
```
explore/
  map-en.png
  map-es.png
  lightbulb-en.png
  lightbulb-es.png
  globe-en.png
  globe-es.png

share/
  folder-en.png
  folder-es.png
  chat-en.png
  chat-es.png
  share-en.png
  share-es.png

remember/
  book-en.png
  book-es.png
  slideshow-en.png
  slideshow-es.png
  statistics-en.png
  statistics-es.png
```

### Étape 3 : Placer les fichiers

1. **Option A : Copie manuelle**
   - Copier les images depuis Downloads vers les dossiers correspondants
   - `/public/cards/explore/` pour Explore
   - `/public/cards/share/` pour Share
   - `/public/cards/remember/` pour Remember

2. **Option B : Script automatique**
   ```bash
   # Placer les images traduites dans Downloads avec les noms corrects
   # Puis exécuter :
   node scripts/copy-translated-images.js
   ```

### Étape 4 : Vérifier

```bash
# Vérifier que toutes les images sont présentes
node scripts/check-translated-images.js
```

## ✅ Vérification automatique

Le système chargera automatiquement :
- **Français** : `map.png`
- **Anglais** : `map-en.png` (ou `map.png` si n'existe pas)
- **Espagnol** : `map-es.png` (ou `map.png` si n'existe pas)

## 🎨 Conseils pour Figma

1. **Dupliquer le frame** de la carte française
2. **Modifier uniquement le texte** (titre, description, lien)
3. **Garder le même design** (couleurs, espacements, icônes)
4. **Exporter en PNG** avec le nom exact requis
5. **Même dimensions** que la version française

## 📊 Progression

Utilisez le script de vérification pour suivre votre progression :
```bash
node scripts/check-translated-images.js
```

Une fois toutes les images créées, vous devriez voir :
```
✅ Images traduites: 18/18 (100.0%)
```

