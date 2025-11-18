import type { Metadata } from "next";
import FonctionnalitesPage from "./FonctionnalitesPage";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://magellan.app';

export const metadata: Metadata = {
  title: "Fonctionnalités",
  description: "Découvrez toutes les fonctionnalités de Magellan : regroupement intelligent, création d'albums, partage simplifié, assistant IA personnalisé, centralisation des informations et bien plus encore.",
  keywords: ["fonctionnalités Magellan", "application voyage", "organisation voyage", "albums voyage", "partage voyage", "IA voyage"],
  alternates: {
    canonical: "/fonctionnalites",
  },
  openGraph: {
    title: "Fonctionnalités — Magellan",
    description: "Découvrez toutes les fonctionnalités de Magellan pour organiser et partager vos voyages.",
    url: `${baseUrl}/fonctionnalites`,
    type: "website",
    images: [
      {
        url: `${baseUrl}/apercu.jpg`,
        width: 1200,
        height: 630,
        alt: "Fonctionnalités de l'application Magellan",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Fonctionnalités — Magellan",
    description: "Découvrez toutes les fonctionnalités de Magellan pour organiser et partager vos voyages.",
    images: [`${baseUrl}/apercu.jpg`],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function Page() {
  return <FonctionnalitesPage />;
}



