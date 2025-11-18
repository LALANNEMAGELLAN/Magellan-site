import type { Metadata } from "next";
import ContactPage from "./ContactPage";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://magellan.app';

export const metadata: Metadata = {
  title: "Contact",
  description: "Contactez l'équipe Magellan pour toute question sur l'application de voyage. Nous vous répondons sous 24h.",
  keywords: ["contact Magellan", "support Magellan", "aide Magellan", "assistance voyage"],
  alternates: {
    canonical: "/contact",
  },
  openGraph: {
    title: "Contact — Magellan",
    description: "Contactez l'équipe Magellan pour toute question sur votre compagnon de voyage intelligent.",
    url: `${baseUrl}/contact`,
    type: "website",
    images: [
      {
        url: `${baseUrl}/apercu.jpg`,
        width: 1200,
        height: 630,
        alt: "Contactez Magellan",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact — Magellan",
    description: "Contactez l'équipe Magellan pour toute question sur votre compagnon de voyage intelligent.",
    images: [`${baseUrl}/apercu.jpg`],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function Page() {
  return <ContactPage />;
}




