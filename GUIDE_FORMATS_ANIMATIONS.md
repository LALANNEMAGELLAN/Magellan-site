# 🎬 Guide : Formats pour les Animations Figma

## 📋 Formats disponibles

### 1. **PNG (actuel) - Recommandé pour images statiques**
- ✅ **Avantages** : Léger, compatible partout, qualité élevée
- ✅ **Parfait pour** : Images statiques avec animations gérées en code (React/Framer Motion)
- ❌ **Limite** : Ne contient pas d'animations (statique)

### 2. **Lottie (JSON) - Pour animations complexes Figma**
- ✅ **Avantages** : Exporte directement les animations Figma, léger, scalable
- ✅ **Parfait pour** : Animations complexes créées dans Figma
- ⚠️ **Requis** : Bibliothèque `lottie-react` ou `lottie-web`
- 📦 **Installation** : `npm install lottie-react`

### 3. **SVG - Pour animations vectorielles simples**
- ✅ **Avantages** : Vectoriel, scalable, peut contenir des animations CSS
- ⚠️ **Limite** : Animations limitées (CSS keyframes)

### 4. **GIF animé - Déconseillé**
- ❌ **Limite** : Lourd, qualité limitée, pas de contrôle

## 🎯 Solution actuelle (PNG + Code)

**Comment ça fonctionne :**
1. Exporte les designs Figma en PNG (statique)
2. Les animations sont recréées en code React avec Framer Motion
3. Les animations sont superposées sur les images PNG

**Avantages :**
- ✅ Contrôle total sur les animations
- ✅ Performances optimales
- ✅ Animations fluides et personnalisables
- ✅ Pas de dépendance supplémentaire

## 🔄 Si tu veux utiliser les animations Figma directement

### Option A : Export Lottie (Recommandé)

1. **Dans Figma :**
   - Sélectionne le frame avec l'animation
   - Installes le plugin "Lottie" ou "After Effects"
   - Exporte en JSON

2. **Dans le code :**
   ```bash
   npm install lottie-react
   ```

3. **Utilisation :**
   ```tsx
   import Lottie from 'lottie-react';
   import animationData from './animation.json';
   
   <Lottie animationData={animationData} loop={true} />
   ```

### Option B : Garder PNG + Améliorer les animations en code (ACTUEL)

Les animations sont déjà implémentées en code et fonctionnent bien. Si elles ne s'affichent pas, c'est probablement un problème de visibilité ou de z-index.

## 🐛 Dépannage : Animations non visibles

Si les animations ne s'affichent pas :

1. **Vérifie le z-index** : Les animations doivent être au-dessus de l'image
2. **Vérifie l'opacité** : Les animations doivent être visibles
3. **Vérifie la position** : Les animations doivent être bien positionnées
4. **Vérifie la console** : Pas d'erreurs JavaScript

## 💡 Recommandation

**Garde PNG + Code** pour l'instant car :
- ✅ Déjà implémenté et fonctionnel
- ✅ Performances optimales
- ✅ Contrôle total
- ✅ Pas de dépendance supplémentaire

Si tu as des animations très complexes dans Figma que tu veux exporter directement, on peut passer à Lottie, mais pour la plupart des cas, PNG + Code est la meilleure solution.









