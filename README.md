# Magellan — Site vitrine (Next.js + Tailwind)

Ce dépôt contient le site vitrine de l'application Magellan, construit avec **Next.js 16**, **React 19** et **Tailwind CSS**.

🌐 **Site en ligne** : [magellan.app](https://magellan.app)

## Prérequis
- Node.js 18 ou 20 recommandé
- npm (ou pnpm / yarn, au choix)

## Démarrage rapide (une seule commande)

```bash
npm install && npm run dev
```

Le site sera disponible sur `http://localhost:3000`.

## Démarrage pas à pas (terminal intégré)
1. Installer les dépendances :
   ```bash
   npm install
   ```
2. Lancer le serveur de développement :
   ```bash
   npm run dev
   ```
3. Ouvrir votre navigateur à l’adresse :
   ```
   http://localhost:3000
   ```

## Scripts utiles
- `npm run dev` — lance le serveur de développement (port 3000)
- `npm run build` — génère la build de production
- `npm run start` — démarre le serveur en mode production

## Structure
```
app/
  layout.tsx           # Layout global (Header, Footer)
  globals.css          # Styles globaux (Tailwind)
  page.tsx             # Page d’accueil (Hero)
  fonctionnalites/
    page.tsx           # Page Fonctionnalités
  a-propos/
    page.tsx           # Page À propos (notre histoire)
  contact/
    page.tsx           # Page Contact (formulaire simple)
  mentions-legales/
    page.tsx           # Mentions légales
components/
  Header.tsx           # En-tête + navigation
  Footer.tsx           # Pied de page
  ContactForm.tsx      # Formulaire côté client (mailto:)
tailwind.config.js     # Configuration Tailwind
postcss.config.js      # Configuration PostCSS
next.config.js         # Configuration Next.js
tsconfig.json          # TypeScript
package.json           # Dépendances et scripts
```

## Déploiement

Ce projet est déployé sur [Vercel](https://vercel.com). Chaque push sur la branche `main` déclenche un déploiement automatique.

## Technologies utilisées

- **Next.js 16** - Framework React avec App Router
- **React 19** - Bibliothèque UI
- **TypeScript** - Typage statique
- **Tailwind CSS** - Framework CSS utilitaire
- **Vercel** - Hébergement et déploiement

## Notes

- Le formulaire de contact ouvre votre client mail via `mailto:` (aucune donnée n'est stockée côté site). Vous pouvez remplacer l'adresse dans `components/ContactForm.tsx`.
- Le formulaire d'inscription à la bêta utilise Zoho Forms intégré via iframe.
- Le design utilise un système de couleurs personnalisé avec Tailwind CSS pour une expérience moderne et cohérente.












