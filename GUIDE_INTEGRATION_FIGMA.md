# 🎨 Guide d'intégration Figma - Repartir depuis le début

## 📋 Vue d'ensemble

Ce guide explique comment intégrer proprement les designs Figma dans les cartes flip du site Magellan.

## 🔑 Principe de base

### Le problème de l'effet miroir

Quand on utilise `rotateY(180deg)` pour créer un effet flip 3D, l'image est **automatiquement inversée horizontalement**. C'est un comportement normal de la transformation CSS.

### La solution

On applique `scaleX(-1)` sur le conteneur de la face arrière pour **annuler cette inversion**. Ainsi :
- Les images exportées depuis Figma doivent être dans leur **état normal** (non inversées)
- Le code applique automatiquement la correction

## 📁 Structure des fichiers

```
public/cards/
├── explore/
│   ├── map.png          (face avant)
│   ├── map-back.png     (face arrière)
│   ├── lightbulb.png
│   ├── lightbulb-back.png
│   ├── globe.png
│   └── globe-back.png
├── share/
│   └── ...
└── remember/
    └── ...
```

## 🎯 Méthode 1 : Export manuel depuis Figma

### Étape 1 : Préparer les frames dans Figma

1. Crée un frame pour chaque carte (ex: `map-front`, `map-back`)
2. Assure-toi que les dimensions sont cohérentes (ex: 810x640px)
3. **IMPORTANT** : Les designs doivent être dans leur état normal (non inversés)

### Étape 2 : Exporter les images

1. Sélectionne le frame
2. Clic droit → "Export" ou utilise le panneau Export
3. Format : PNG
4. Scale : 2x (pour la qualité)
5. Nomme le fichier selon la convention :
   - Face avant : `map.png`, `lightbulb.png`, etc.
   - Face arrière : `map-back.png`, `lightbulb-back.png`, etc.

### Étape 3 : Placer les fichiers

Place les fichiers PNG dans le bon dossier :
- `public/cards/explore/` pour la section Explore
- `public/cards/share/` pour la section Share
- `public/cards/remember/` pour la section Remember

### Étape 4 : Mettre à jour le code

Les images sont automatiquement détectées si les noms correspondent dans `ExploreSection.tsx` :

```typescript
const featureCards = [
  {
    // ...
    figmaImage: 'map.png',
    figmaImageBack: 'map-back.png',
  },
];
```

## 🚀 Méthode 2 : Export automatique via API Figma

### Prérequis

1. **Token Figma** : https://www.figma.com/developers/api#access-tokens
2. **File Key** : L'ID du fichier Figma (dans l'URL : `figma.com/file/FILE_KEY/...`)

### Configuration

Crée un fichier `.env.local` :

```env
FIGMA_TOKEN=figd_ton_token_ici
FIGMA_FILE_KEY=ton_file_key_ici
```

### Nommage des frames dans Figma

Les frames doivent s'appeler **exactement** :

**Section Explore :**
- `map-front` → exporté comme `map.png`
- `map-back` → exporté comme `map-back.png`
- `lightbulb-front` → exporté comme `lightbulb.png`
- `lightbulb-back` → exporté comme `lightbulb-back.png`
- `globe-front` → exporté comme `globe.png`
- `globe-back` → exporté comme `globe-back.png`

**Section Share :**
- `folder-front`, `folder-back`
- `chat-front`, `chat-back`
- `share-front`, `share-back`

**Section Remember :**
- `folder-front`, `folder-back`
- `sparkles-front`, `sparkles-back`
- `chart-front`, `chart-back`

### Exécution

```bash
npm run figma:download
# ou
node scripts/figma-download.js
```

Le script va :
1. Se connecter à l'API Figma
2. Chercher les frames par nom
3. Télécharger les images au format PNG 2x
4. Les placer dans `public/cards/[section]/`

## ✅ Vérification

1. **Vérifie que les fichiers existent** dans `public/cards/[section]/`
2. **Vérifie les noms** : ils doivent correspondre exactement à ceux dans le code
3. **Teste le flip** : au survol, la carte doit se retourner sans effet miroir
4. **Vérifie les animations** : les points pulsants doivent être bien positionnés

## 🐛 Dépannage

### L'image est toujours inversée

- Vérifie que `scaleX(-1)` est bien appliqué dans `AnimatedFeatureCard.tsx` (ligne ~70)
- Vérifie que l'image exportée depuis Figma n'est pas déjà inversée

### Les animations ne s'affichent pas

- Vérifie que `animationType` est bien défini dans `ExploreSection.tsx`
- Vérifie que les positions des points correspondent aux cercles dans l'image Figma

### Les images ne se chargent pas

- Vérifie les chemins : `/cards/[section]/[nom].png`
- Vérifie que les fichiers existent dans `public/cards/`
- Vérifie la console du navigateur pour les erreurs 404

## 📝 Notes importantes

1. **Les images doivent être exportées dans leur état normal** (non inversées)
2. **Le code corrige automatiquement l'inversion** avec `scaleX(-1)`
3. **Les dimensions recommandées** : 810x640px (ratio 1.265:1)
4. **Format** : PNG avec transparence si nécessaire
5. **Scale** : 2x pour la qualité Retina

## 🔄 Mise à jour des images

Quand tu mets à jour une image dans Figma :

1. **Exporte la nouvelle version** (méthode 1 ou 2)
2. **Remplace le fichier** dans `public/cards/[section]/`
3. **Recharge le site** (Next.js détecte automatiquement les changements)

---

**Dernière mise à jour** : Repartir depuis le début - Solution propre et simple











