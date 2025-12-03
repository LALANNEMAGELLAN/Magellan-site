# Guide Complet : Intégration des Cartes Flip avec Images Figma

## 📋 Vue d'ensemble

Ce guide explique comment intégrer les designs Figma dans les cartes flip de la section Explore.

## 🗂️ Structure des fichiers

### 1. Emplacement des images
Place tes images Figma dans :
```
public/cards/explore/
```

### 2. Convention de nommage
Pour chaque carte, tu dois avoir 2 fichiers :
- **Face avant** : `[nom-carte].png` (ex: `map.png`, `lightbulb.png`)
- **Face arrière** : `[nom-carte]-back.png` (ex: `map-back.png`, `lightbulb-back.png`)

### 3. Cartes de la section Explore
- **Carte "Carte interactive"** :
  - Face avant : `map.png`
  - Face arrière : `map-back.png`
  
- **Carte "Découvertes autour de vous"** :
  - Face avant : `lightbulb.png`
  - Face arrière : `lightbulb-back.png`
  
- **Carte "Inspirations de voyages"** :
  - Face avant : `globe.png`
  - Face arrière : `globe-back.png` (optionnel)

## 🔧 Configuration dans le code

### Fichier : `components/ExploreSection.tsx`

Chaque carte est définie dans le tableau `featureCards` :

```typescript
{
  icon: <IconMap />,
  title: t('features.map.title'),
  description: t('features.map.description'),
  color: 'bg-brand/10 text-brand',
  delay: 0.1,
  animationType: 'map' as const,
  figmaImage: 'map.png',           // ← Nom du fichier face avant
  figmaImageBack: 'map-back.png',  // ← Nom du fichier face arrière
  section: 'explore'               // ← Section (défini automatiquement)
}
```

## 🎨 Comment ça fonctionne

1. **Au survol** : La carte se retourne (flip) avec une animation 3D
2. **Face avant** : Affiche l'image Figma `[nom].png`
3. **Face arrière** : Affiche l'image Figma `[nom]-back.png` avec `scaleX(-1)` pour corriger l'effet miroir

## ✅ Checklist d'intégration

- [ ] Les images sont dans `public/cards/explore/`
- [ ] Les noms de fichiers correspondent exactement à ceux dans `ExploreSection.tsx`
- [ ] Les images sont au format PNG
- [ ] Les dimensions recommandées : 810x640px (ou ratio similaire)
- [ ] Les images face arrière sont orientées correctement dans Figma (pas besoin d'inverser manuellement)

## 🐛 Dépannage

### Problème : L'image ne s'affiche pas
- Vérifie que le nom du fichier correspond exactement (sensible à la casse)
- Vérifie que le fichier est bien dans `public/cards/explore/`
- Vide le cache : `rm -rf .next` puis redémarre le serveur

### Problème : Effet miroir sur la face arrière
- Le code applique automatiquement `scaleX(-1)` pour corriger
- Si le problème persiste, vérifie que l'image dans Figma est orientée correctement

### Problème : Les points animés ne sont pas alignés (carte map)
- Les positions sont définies dans `AnimatedFeatureCard.tsx`
- Elles sont ajustées pour correspondre à l'image après `scaleX(-1)`

## 📝 Exemple complet

Pour ajouter une nouvelle carte :

1. **Exporter depuis Figma** :
   - Face avant : `nouvelle-carte.png`
   - Face arrière : `nouvelle-carte-back.png`

2. **Placer dans** : `public/cards/explore/`

3. **Ajouter dans `ExploreSection.tsx`** :
```typescript
{
  icon: <IconNouveau />,
  title: t('features.nouveau.title'),
  description: t('features.nouveau.description'),
  color: 'bg-brand/10 text-brand',
  delay: 0.4,
  animationType: 'default' as const,
  figmaImage: 'nouvelle-carte.png',
  figmaImageBack: 'nouvelle-carte-back.png',
}
```

4. **Redémarrer le serveur** et tester !












