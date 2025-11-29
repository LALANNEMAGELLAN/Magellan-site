# 🚀 Démarrage Rapide : API Figma

## Configuration en 3 étapes

### 1. Obtenir un token Figma
```bash
# Va sur https://www.figma.com/developers/api#access-tokens
# Crée un token et copie-le
```

### 2. Trouver la clé du fichier
```bash
# Dans l'URL de ton fichier Figma :
# https://www.figma.com/file/FILE_KEY/nom-du-fichier
# La FILE_KEY est la longue chaîne après /file/
```

### 3. Créer le fichier .env.local
```bash
FIGMA_TOKEN=ton_token_ici
FIGMA_FILE_KEY=ta_file_key_ici
```

## Utilisation

### Télécharger les images
```bash
npm run figma:download
```

### Voir la structure du fichier Figma
```bash
npm run figma:setup
```

## Nommage des frames dans Figma

Les frames doivent s'appeler exactement :
- `map-front`, `map-back`
- `lightbulb-front`, `lightbulb-back`
- `globe-front`, `globe-back`
- etc.

Voir `GUIDE_API_FIGMA.md` pour plus de détails.










