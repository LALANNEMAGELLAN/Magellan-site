# 🔌 Option : Utiliser l'API Figma

## Avantages de l'API Figma

✅ **Automatisation** : Plus besoin d'exporter manuellement
✅ **Synchronisation** : Les images se mettent à jour automatiquement
✅ **Versioning** : Suivi des changements dans Figma
✅ **Pas d'erreur de nommage** : Les noms sont gérés automatiquement

## Inconvénients

❌ **Complexité** : Configuration supplémentaire nécessaire
❌ **Token API** : Besoin d'un token Figma
❌ **Build time** : Les images doivent être téléchargées au build
❌ **Dépendance externe** : Dépend de l'API Figma (rate limits, downtime)

## Solution actuelle vs API Figma

### Solution actuelle (Export manuel)
- ✅ Simple et direct
- ✅ Pas de dépendance externe
- ✅ Contrôle total sur les images
- ❌ Export manuel à chaque changement

### API Figma
- ✅ Automatisation complète
- ✅ Synchronisation automatique
- ❌ Plus complexe à mettre en place
- ❌ Nécessite un token API
- ❌ Peut ralentir le build

## Recommandation

**Pour l'instant, je recommande de rester sur l'export manuel** car :
1. Le problème actuel (effet miroir) n'est pas lié à l'export
2. C'est plus simple et plus rapide
3. Tu as le contrôle total

**Si tu veux quand même utiliser l'API Figma**, je peux t'aider à :
1. Configurer le token API
2. Créer un script de build pour télécharger les images
3. Intégrer dans le workflow Next.js

## Mise en place de l'API Figma (si tu veux)

### 1. Obtenir un token Figma
- Va sur https://www.figma.com/developers/api#access-tokens
- Crée un token personnel

### 2. Installer les dépendances
```bash
npm install @figma/rest-api-sdk
```

### 3. Créer un script de build
Un script qui :
- Se connecte à l'API Figma
- Télécharge les images des frames
- Les place dans `public/cards/explore/`

### 4. Intégrer dans Next.js
- Exécuter le script avant le build
- Ou créer une route API pour mettre à jour les images

## Conclusion

Le problème actuel (effet miroir) **n'est PAS lié à l'export Figma**. C'est un problème de transformation CSS (`rotateY(180deg)`).

**Je recommande** :
1. D'abord corriger le problème d'effet miroir avec la solution actuelle
2. Ensuite, si tu veux automatiser, on peut mettre en place l'API Figma

Veux-tu que je t'aide à mettre en place l'API Figma maintenant, ou préfères-tu d'abord résoudre le problème d'effet miroir ?










