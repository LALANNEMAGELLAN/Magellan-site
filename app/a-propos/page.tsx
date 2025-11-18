import type { Metadata } from "next";
import AProposPage from "./AProposPage";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://magellan.app';

export const metadata: Metadata = {
  title: "À propos",
  description: "Découvrez l'histoire de Magellan, votre compagnon de voyage intelligent. Notre mission : aider chaque voyageur à explorer le monde autrement et créer des souvenirs interactifs.",
  keywords: ["à propos Magellan", "histoire Magellan", "équipe Magellan", "mission Magellan"],
  alternates: {
    canonical: "/a-propos",
  },
  openGraph: {
    title: "À propos — Magellan",
    description: "Découvrez l'histoire et la mission de Magellan, votre compagnon de voyage intelligent.",
    url: `${baseUrl}/a-propos`,
    type: "website",
    images: [
      {
        url: `${baseUrl}/apercu.jpg`,
        width: 1200,
        height: 630,
        alt: "À propos de Magellan",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "À propos — Magellan",
    description: "Découvrez l'histoire et la mission de Magellan, votre compagnon de voyage intelligent.",
    images: [`${baseUrl}/apercu.jpg`],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function Page() {
  return <AProposPage />;
}



