# 📤 Guide : Export depuis Figma

## Comment exporter correctement depuis Figma

### 1. Sélectionner le frame/carte
- Sélectionne le frame qui contient ta carte (face avant ou face arrière)
- Assure-toi que tout le contenu est visible dans le frame

### 2. Export en PNG
1. Dans le panneau de droite, clique sur "Export"
2. Clique sur le "+" pour ajouter un export
3. Sélectionne le format : **PNG**
4. **IMPORTANT** : Ne coche PAS "Flip horizontal" ou toute option d'inversion
5. Exporte avec le nom correct :
   - Face avant : `map.png`, `lightbulb.png`, etc.
   - Face arrière : `map-back.png`, `lightbulb-back.png`, etc.

### 3. Vérifier l'orientation
Avant de placer l'image dans `public/cards/explore/`, vérifie que :
- Le texte est lisible (pas inversé)
- Les éléments sont dans le bon sens
- L'image correspond à ce que tu vois dans Figma

### 4. Placer dans le projet
- Copie l'image exportée dans `public/cards/explore/`
- Vérifie que le nom correspond exactement à celui dans `ExploreSection.tsx`

## ⚠️ Points importants

1. **Ne pas inverser manuellement** : Laisse les images dans leur état d'export Figma
2. **Le code gère l'inversion** : `scaleX(-1)` dans le code corrige l'effet miroir créé par `rotateY(180deg)`
3. **Nommage exact** : Les noms doivent correspondre exactement (sensible à la casse)

## 🔍 Vérification

Après export, ouvre l'image dans un visualiseur d'images :
- Si le texte est lisible → ✅ Bon export
- Si le texte est inversé → ❌ Vérifie les options d'export dans Figma










