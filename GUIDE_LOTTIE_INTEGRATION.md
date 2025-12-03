# 🎬 Guide : Intégration Lottie pour les Animations Figma

## ✅ Implémentation terminée

Le système supporte maintenant :
- **PNG** pour les faces avant (statiques)
- **PNG ou Lottie (JSON)** pour les faces arrière (avec animations)

## 📋 Comment exporter depuis Figma

### Étape 1 : Installer le plugin Lottie dans Figma

1. Ouvrir Figma
2. Menu → Plugins → Browse plugins
3. Rechercher "Lottie" ou "Bodymovin"
4. Installer le plugin

### Étape 2 : Exporter l'animation

1. Sélectionner le frame avec l'animation dans Figma
2. Menu → Plugins → Lottie (ou le plugin installé)
3. Configurer l'export :
   - Format : JSON
   - Qualité : Haute
   - Loop : Activé (si souhaité)
4. Exporter et sauvegarder le fichier `.json`

### Étape 3 : Placer le fichier

Placer le fichier JSON dans le bon dossier :
- `public/cards/explore/` pour la section Explore
- `public/cards/share/` pour la section Share
- `public/cards/remember/` pour la section Remember

**Nommage :**
- `map-back.json` (au lieu de `map-back.png`)
- `lightbulb-back.json` (au lieu de `lightbulb-back.png`)
- `globe-back.json` (au lieu de `globe-back.png`)

### Étape 4 : Mettre à jour le code

Le code détecte automatiquement si c'est un `.json` (Lottie) ou `.png` :

```typescript
// Dans ExploreSection.tsx
{
  figmaImage: 'map.png',           // PNG (face avant)
  figmaImageBack: 'map-back.json', // Lottie (face arrière avec animation)
}
```

## 🔄 Migration depuis PNG vers Lottie

Pour migrer une carte de PNG vers Lottie :

1. **Exporter l'animation Figma en Lottie** (voir ci-dessus)
2. **Renommer le fichier** : `map-back.png` → `map-back.json`
3. **Mettre à jour ExploreSection.tsx** :
   ```typescript
   figmaImageBack: 'map-back.json', // Au lieu de 'map-back.png'
   ```
4. **Supprimer l'ancien PNG** (optionnel)

## 📁 Structure des fichiers

```
public/cards/explore/
├── map.png              (PNG - face avant)
├── map-back.json        (Lottie - face arrière avec animation)
├── lightbulb.png        (PNG - face avant)
├── lightbulb-back.json  (Lottie - face arrière avec animation)
├── globe.png            (PNG - face avant)
└── globe-back.json      (Lottie - face arrière avec animation)
```

## ⚙️ Fonctionnement technique

Le composant `AnimatedFeatureCard` détecte automatiquement le format :

```typescript
const isLottieBack = figmaImageBackPath?.endsWith('.json');
const isPngBack = figmaImageBackPath?.endsWith('.png');
```

- Si `.json` → Charge et affiche avec Lottie
- Si `.png` → Affiche l'image + animations en code (comme avant)

## 🎯 Avantages de Lottie

- ✅ **Animations Figma directes** : Pas besoin de recréer en code
- ✅ **Léger** : Format JSON optimisé
- ✅ **Scalable** : Vectoriel
- ✅ **Performant** : Rendu GPU

## 🐛 Dépannage

### L'animation ne se charge pas

1. Vérifier que le fichier JSON est dans `public/cards/[section]/`
2. Vérifier le nom du fichier dans `ExploreSection.tsx`
3. Vérifier la console du navigateur pour les erreurs
4. Vérifier que le JSON est valide (ouvrir dans un éditeur JSON)

### L'animation est inversée

L'animation Lottie est automatiquement corrigée avec `scaleX(-1)` comme les PNG.

### Performance

Si l'animation est trop lourde, optimiser dans Figma avant l'export ou réduire la complexité.

## 📝 Exemple complet

**Avant (PNG + animations en code) :**
```typescript
{
  figmaImage: 'map.png',
  figmaImageBack: 'map-back.png', // PNG avec animations en code
  animationType: 'map', // Pour les animations personnalisées
}
```

**Après (PNG + Lottie) :**
```typescript
{
  figmaImage: 'map.png',
  figmaImageBack: 'map-back.json', // Lottie avec animation Figma
  // animationType n'est plus nécessaire pour Lottie
}
```

---

**Dernière mise à jour** : Support Lottie implémenté ✅











