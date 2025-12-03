# 🚀 Guide : Reprendre depuis le début

## Étape 1 : Vérifier les images

Les images doivent être dans : `public/cards/explore/`

**Cartes Explore :**
- ✅ `map.png` (face avant carte interactive)
- ✅ `map-back.png` (face arrière carte interactive)
- ✅ `lightbulb.png` (face avant découvertes)
- ✅ `lightbulb-back.png` (face arrière découvertes)
- ⚠️ `globe.png` (face avant inspirations) - manquant ?
- ⚠️ `globe-back.png` (face arrière inspirations) - manquant ?

## Étape 2 : Vérifier la configuration

**Fichier** : `components/ExploreSection.tsx`

Chaque carte doit avoir :
```typescript
{
  figmaImage: 'nom-fichier.png',        // Face avant
  figmaImageBack: 'nom-fichier-back.png', // Face arrière
}
```

## Étape 3 : Comprendre le fonctionnement

1. **Face avant** : Affiche directement l'image Figma
2. **Face arrière** : 
   - La carte fait `rotateY(180deg)` pour se retourner
   - Cela crée un effet miroir naturel
   - Le code applique `scaleX(-1)` pour corriger cet effet

## Étape 4 : Solution pour l'effet miroir

### Méthode A : Corriger dans le code (ACTUELLE)
Le code applique `scaleX(-1)` sur le conteneur de la face arrière.

**Fichier** : `components/AnimatedFeatureCard.tsx` ligne 196
```typescript
<div style={{ transform: 'scaleX(-1)' }}>
```

### Méthode B : Si Méthode A ne fonctionne pas
1. Exporter les images depuis Figma **déjà inversées horizontalement**
2. Retirer `scaleX(-1)` du code
3. Les images s'afficheront correctement

## Étape 5 : Test

1. Vérifier que les images sont bien dans `public/cards/explore/`
2. Vérifier que les noms correspondent dans `ExploreSection.tsx`
3. Vider le cache : `rm -rf .next`
4. Redémarrer le serveur : `npm run dev`
5. Tester sur `http://localhost:3000/fr`
6. Survoler une carte pour voir le flip

## 🐛 Si ça ne fonctionne toujours pas

### Test 1 : Vérifier que les images se chargent
Ouvre dans le navigateur :
- `http://localhost:3000/cards/explore/map.png`
- `http://localhost:3000/cards/explore/map-back.png`

Si erreur 404, le fichier n'est pas au bon endroit.

### Test 2 : Vérifier l'effet miroir
1. Ouvrir `components/AnimatedFeatureCard.tsx`
2. Ligne 196, retirer temporairement `transform: 'scaleX(-1)'`
3. Voir si l'image est à l'envers ou à l'endroit
4. Si à l'envers : remettre `scaleX(-1)`
5. Si à l'endroit : les images sont déjà inversées, ne pas mettre `scaleX(-1)`

## 📝 Checklist finale

- [ ] Images dans `public/cards/explore/`
- [ ] Noms de fichiers corrects dans `ExploreSection.tsx`
- [ ] Cache vidé (`rm -rf .next`)
- [ ] Serveur redémarré
- [ ] Testé dans le navigateur
- [ ] Effet miroir corrigé (ou images inversées dans Figma)












