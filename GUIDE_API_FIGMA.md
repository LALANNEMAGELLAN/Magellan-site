# 🔌 Guide : Configuration de l'API Figma

## Étape 1 : Obtenir un token Figma

1. Va sur https://www.figma.com/developers/api#access-tokens
2. Clique sur "Generate new token"
3. Donne un nom au token (ex: "Magellan Site")
4. Copie le token généré (⚠️ tu ne pourras plus le voir après)

## Étape 2 : Trouver la clé du fichier Figma

1. Ouvre ton fichier Figma dans le navigateur
2. Regarde l'URL : `https://www.figma.com/file/FILE_KEY/nom-du-fichier`
3. La `FILE_KEY` est la longue chaîne de caractères après `/file/`

**Exemple** :
- URL : `https://www.figma.com/file/abc123xyz456/Magellan-Cards`
- FILE_KEY : `abc123xyz456`

## Étape 3 : Configurer les variables d'environnement

Crée un fichier `.env.local` à la racine du projet :

```bash
FIGMA_TOKEN=ton_token_ici
FIGMA_FILE_KEY=ta_file_key_ici
```

⚠️ **Important** : Ajoute `.env.local` à `.gitignore` pour ne pas commiter ton token !

## Étape 4 : Nommer les frames dans Figma

Pour que le script trouve automatiquement les frames, nomme-les ainsi :

### Section Explore
- `map-front` → sera exporté comme `map.png`
- `map-back` → sera exporté comme `map-back.png`
- `lightbulb-front` → sera exporté comme `lightbulb.png`
- `lightbulb-back` → sera exporté comme `lightbulb-back.png`
- `globe-front` → sera exporté comme `globe.png`
- `globe-back` → sera exporté comme `globe-back.png`

### Section Share
- `folder-front` → `folder.png`
- `folder-back` → `folder-back.png`
- `chat-front` → `chat.png`
- `chat-back` → `chat-back.png`
- `share-front` → `share.png`
- `share-back` → `share-back.png`

### Section Remember
- `folder-front` → `folder.png`
- `folder-back` → `folder-back.png`
- `sparkles-front` → `sparkles.png`
- `sparkles-back` → `sparkles-back.png`
- `chart-front` → `chart.png`
- `chart-back` → `chart-back.png`

## Étape 5 : Télécharger les images

### Option A : Avec les variables d'environnement
```bash
npm run figma:download
```

### Option B : En ligne de commande
```bash
FIGMA_TOKEN=ton_token FIGMA_FILE_KEY=ta_file_key npm run figma:download
```

## Étape 6 : Vérifier la structure (optionnel)

Si tu veux voir la structure de ton fichier Figma :

```bash
npm run figma:setup
```

Cela te montrera tous les frames et leurs IDs.

## 🔧 Personnaliser le mapping

Si tes frames ont des noms différents, modifie le fichier `scripts/figma-download.js` :

```javascript
const FRAME_MAPPING = {
  explore: {
    'ton-nom-figma': 'nom-fichier-sortie.png',
    // ...
  },
};
```

## ⚠️ Limitations de l'API Figma

- **Rate limits** : 200 requêtes par minute
- **Taille des images** : Les images sont téléchargées en 2x (scale=2) pour une meilleure qualité
- **Format** : Seulement PNG pour l'instant

## 🐛 Dépannage

### Erreur : "FIGMA_TOKEN est requis"
- Vérifie que `.env.local` existe et contient `FIGMA_TOKEN`
- Ou passe le token en ligne de commande

### Erreur : "Frame non trouvé"
- Vérifie que les frames dans Figma ont exactement les noms attendus
- Utilise `npm run figma:setup` pour voir la structure

### Erreur : "Erreur API Figma: 403"
- Vérifie que ton token est valide
- Vérifie que tu as accès au fichier Figma

## 🎯 Avantages de l'API Figma

✅ **Automatisation** : Plus besoin d'exporter manuellement
✅ **Synchronisation** : Les images sont toujours à jour
✅ **Pas d'effet miroir** : Les images sont exportées directement depuis Figma
✅ **Qualité** : Export en 2x pour une meilleure qualité

## 📝 Prochaines étapes

Une fois configuré, tu peux :
1. Ajouter `npm run figma:download` avant `npm run build` pour automatiser
2. Créer un webhook Figma pour mettre à jour automatiquement
3. Intégrer dans un CI/CD pour déploiement automatique












