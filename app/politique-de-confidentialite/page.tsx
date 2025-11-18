import type { Metadata } from "next";
import PolitiqueConfidentialitePage from "./PolitiqueConfidentialitePage";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://magellan.app';

export const metadata: Metadata = {
  title: "Politique de confidentialité",
  description: "Politique de confidentialité de Magellan. Découvrez comment nous protégeons vos données personnelles et respectons votre vie privée.",
  alternates: {
    canonical: "/politique-de-confidentialite",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function Page() {
  return <PolitiqueConfidentialitePage />;
}







