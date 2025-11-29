# 🔧 Solution : Corriger l'Effet Miroir

## Problème
Les cartes s'affichent à l'envers (effet miroir) sur la face arrière.

## Cause
Quand on fait `rotateY(180deg)` pour retourner la carte, cela retourne naturellement l'image horizontalement.

## Solution Simple

### Option 1 : Corriger dans le code (RECOMMANDÉ)
Le code applique déjà `scaleX(-1)` sur le conteneur de la face arrière pour annuler l'effet miroir.

**Fichier** : `components/AnimatedFeatureCard.tsx` (ligne 196)
```typescript
<div className="relative w-full h-full" style={{ zIndex: 10, transform: 'scaleX(-1)' }}>
```

### Option 2 : Si Option 1 ne fonctionne pas
1. Vérifier que les images dans Figma sont orientées correctement
2. Exporter les images depuis Figma SANS les inverser
3. Le code appliquera automatiquement `scaleX(-1)` pour corriger

## Test Rapide

Pour tester si le problème vient des images ou du code :

1. **Temporairement retirer `scaleX(-1)`** dans le code
2. **Voir si les images sont déjà inversées** dans les fichiers
3. **Si oui** : Les images ont été inversées avec `sips`, restaurer les originales
4. **Si non** : Remettre `scaleX(-1)` dans le code

## État Actuel

✅ Images présentes :
- `map.png` (594K)
- `map-back.png` (698K)
- `lightbulb.png` (593K)
- `lightbulb-back.png` (654K)

✅ Code configuré :
- `scaleX(-1)` appliqué sur le conteneur de la face arrière
- Chemins des images corrects : `/cards/explore/[nom].png`

## Prochaine Étape

Si le problème persiste, on peut :
1. Vérifier que les images ne sont pas déjà inversées
2. Tester sans `scaleX(-1)` pour voir l'état original
3. Ajuster selon le résultat










