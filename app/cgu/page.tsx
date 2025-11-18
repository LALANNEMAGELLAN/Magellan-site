import type { Metadata } from "next";
import CGUPage from "./CGUPage";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://magellan.app';

export const metadata: Metadata = {
  title: "Conditions Générales d'Utilisation (CGU)",
  description: "Conditions Générales d'Utilisation de l'application Magellan. Règles d'utilisation et conditions de service.",
  alternates: {
    canonical: "/cgu",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function Page() {
  return <CGUPage />;
}







