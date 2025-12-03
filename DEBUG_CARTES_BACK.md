# 🐛 Debug : Cartes Back ne fonctionnent pas

## ✅ Vérifications effectuées

### Fichiers présents
- ✅ `map-back.png` (695K)
- ✅ `lightbulb-back.png` (654K)
- ✅ `globe-back.png` (589K)

### Code configuré
- ✅ `figmaImageBack` défini pour toutes les cartes
- ✅ `scaleX(-1)` appliqué pour corriger l'effet miroir
- ✅ Images chargées avec Next.js Image

## 🔍 Problèmes possibles

### 1. Images ne se chargent pas
**Symptôme** : Carte blanche ou erreur 404
**Solution** : Vérifier les chemins dans la console du navigateur

### 2. Effet miroir toujours présent
**Symptôme** : Texte inversé sur la face arrière
**Solution** : `scaleX(-1)` devrait corriger, vérifier qu'il est bien appliqué

### 3. Carte globe sans animation
**Symptôme** : Carte globe affiche juste l'image (normal si pas d'animation)
**Solution** : C'est normal, la carte globe n'a pas d'animation spécifique

## 🛠️ Tests à faire

1. **Ouvrir la console du navigateur (F12)**
   - Vérifier les erreurs de chargement d'images
   - Vérifier les erreurs JavaScript

2. **Tester chaque carte individuellement**
   - Survoler la carte map → vérifier que map-back.png s'affiche
   - Survoler la carte lightbulb → vérifier que lightbulb-back.png s'affiche
   - Survoler la carte globe → vérifier que globe-back.png s'affiche

3. **Vérifier les chemins**
   - Ouvrir `http://localhost:3000/cards/explore/map-back.png` directement
   - Si ça fonctionne, le problème vient du code React

## 📝 Code actuel

```typescript
// Face arrière
<div style={{ transform: 'rotateY(180deg) scaleX(-1)' }}>
  {figmaImageBackPath ? (
    <Image src={figmaImageBackPath} ... />
    {/* Animations si animationType === 'map' ou 'lightbulb' */}
  ) : (
    // Fallback avec description
  )}
</div>
```

## 💡 Solutions

### Si les images ne se chargent pas :
1. Vérifier que les fichiers sont dans `public/cards/explore/`
2. Vérifier les noms exacts (sensible à la casse)
3. Vider le cache Next.js : `rm -rf .next`

### Si l'effet miroir persiste :
1. Vérifier que `scaleX(-1)` est bien appliqué
2. Vérifier que les images exportées depuis Figma ne sont pas déjà inversées

### Si la carte globe ne fonctionne pas :
1. Vérifier que `globe-back.png` existe
2. Vérifier que `figmaImageBack: 'globe-back.png'` est défini
3. La carte globe n'a pas d'animation spécifique (normal)











