# Guide de traduction des images Figma

Ce document liste toutes les images à traduire pour les sections Explore, Share et Remember.

## Structure des fichiers

Pour chaque image, vous devez créer deux versions traduites :
- **Version anglaise** : `{nom-image}-en.png`
- **Version espagnole** : `{nom-image}-es.png`

Les images doivent être placées dans le même dossier que l'image originale.

## Section EXPLORE (`/public/cards/explore/`)

### Carte 1 : Carte interactive dynamique
- **Image front (FR)** : `map.png`
- **Image back (FR)** : `map-back.png`
- **Images à créer** :
  - `map-en.png` (anglais)
  - `map-es.png` (espagnol)
  - `map-back-en.png` (anglais)
  - `map-back-es.png` (espagnol)

### Carte 2 : Découvertes autour de vous
- **Image front (FR)** : `lightbulb.png`
- **Image back (FR)** : `lightbulb-back.png`
- **Images à créer** :
  - `lightbulb-en.png` (anglais)
  - `lightbulb-es.png` (espagnol)
  - `lightbulb-back-en.png` (anglais)
  - `lightbulb-back-es.png` (espagnol)

### Carte 3 : Inspirations de voyage
- **Image front (FR)** : `globe.png`
- **Image back (FR)** : `globe-back.png`
- **Images à créer** :
  - `globe-en.png` (anglais)
  - `globe-es.png` (espagnol)
  - `globe-back-en.png` (anglais)
  - `globe-back-es.png` (espagnol)

**Total Explore** : 6 images à traduire (3 front + 3 back) × 2 langues = **12 images**

---

## Section SHARE (`/public/cards/share/`)

### Carte 1 : Album partagé
- **Image front (FR)** : `folder.png`
- **Image back (FR)** : `folder-back.png`
- **Images à créer** :
  - `folder-en.png` (anglais)
  - `folder-es.png` (espagnol)
  - `folder-back-en.png` (anglais)
  - `folder-back-es.png` (espagnol)

### Carte 2 : Chat intégré
- **Image front (FR)** : `chat.png`
- **Image back (FR)** : `chat-back.png`
- **Images à créer** :
  - `chat-en.png` (anglais)
  - `chat-es.png` (espagnol)
  - `chat-back-en.png` (anglais)
  - `chat-back-es.png` (espagnol)

### Carte 3 : Récit interactif généré par IA
- **Image front (FR)** : `share.png`
- **Image back (FR)** : `share-back.png`
- **Images à créer** :
  - `share-en.png` (anglais)
  - `share-es.png` (espagnol)
  - `share-back-en.png` (anglais)
  - `share-back-es.png` (espagnol)

**Total Share** : 6 images à traduire (3 front + 3 back) × 2 langues = **12 images**

---

## Section REMEMBER (`/public/cards/remember/`)

### Carte 1 : Carnet de voyage intelligent
- **Image front (FR)** : `book.png`
- **Image back (FR)** : `book-back.png`
- **Images à créer** :
  - `book-en.png` (anglais)
  - `book-es.png` (espagnol)
  - `book-back-en.png` (anglais)
  - `book-back-es.png` (espagnol)

### Carte 2 : Diaporama et albums imprimés
- **Image front (FR)** : `slideshow.png`
- **Image back (FR)** : `slideshow-back.png`
- **Images à créer** :
  - `slideshow-en.png` (anglais)
  - `slideshow-es.png` (espagnol)
  - `slideshow-back-en.png` (anglais)
  - `slideshow-back-es.png` (espagnol)

### Carte 3 : Statistiques de voyage
- **Image front (FR)** : `statistics.png`
- **Image back (FR)** : `statistics-back.png`
- **Images à créer** :
  - `statistics-en.png` (anglais)
  - `statistics-es.png` (espagnol)
  - `statistics-back-en.png` (anglais)
  - `statistics-back-es.png` (espagnol)

**Total Remember** : 6 images à traduire (3 front + 3 back) × 2 langues = **12 images**

---

## Récapitulatif

- **Total général** : 18 images (9 front + 9 back) × 2 langues = **36 images à créer**

## Comment ajouter les images traduites

1. **Exporter depuis Figma** :
   - Ouvrir chaque image dans Figma
   - Modifier le texte pour la langue cible (anglais ou espagnol)
   - Exporter en PNG avec le nom correct (ex: `map-en.png`)

2. **Placer les fichiers** :
   - Copier les images dans le dossier correspondant :
     - `/public/cards/explore/` pour Explore
     - `/public/cards/share/` pour Share
     - `/public/cards/remember/` pour Remember

3. **Vérification automatique** :
   - Le système chargera automatiquement les images traduites selon la langue sélectionnée
   - Si une image traduite n'existe pas, l'image française sera utilisée en fallback

## Exemple de structure finale

```
public/cards/explore/
├── map.png (FR - par défaut)
├── map-en.png (EN)
├── map-es.png (ES)
├── map-back.png (FR - par défaut)
├── map-back-en.png (EN)
├── map-back-es.png (ES)
├── lightbulb.png
├── lightbulb-en.png
├── lightbulb-es.png
└── ...
```

## Notes importantes

- Les noms de fichiers doivent être **exactement** comme indiqué (respecter la casse)
- Les images doivent avoir les **mêmes dimensions** que les versions françaises
- Le système détecte automatiquement la langue et charge l'image correspondante
- Si une image traduite est manquante, l'image française sera utilisée automatiquement

