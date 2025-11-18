import type { Metadata } from "next";
import MentionsLegalesPage from "./MentionsLegalesPage";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://magellan.app';

export const metadata: Metadata = {
  title: "Mentions légales",
  description: "Mentions légales de Magellan. Informations légales sur l'éditeur et les conditions d'utilisation du site.",
  alternates: {
    canonical: "/mentions-legales",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function Page() {
  return <MentionsLegalesPage />;
}



