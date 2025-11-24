import type { Metadata } from "next";
import "./globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import StructuredData from "../components/StructuredData";
import { Inter } from "next/font/google";
import MobileMenuProvider from "../components/MobileMenuProvider";

const inter = Inter({ subsets: ["latin"] });

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://magellan.app";

export const metadata: Metadata = {
  title: {
    default: "Magellan — Votre compagnon de voyage intelligent",
    template: "%s | Magellan"
  },
  description: "Explorez le monde autrement : Magellan révèle les histoires derrière chaque lieu et crée automatiquement des souvenirs interactifs qui vous ressemblent. Centralisez vos réservations, itinéraires, emails et notes.",
  keywords: ["voyage", "itinéraire", "réservations", "souvenirs", "photos voyage", "organisation voyage", "application voyage", "compagnon voyage", "IA voyage", "albums voyage", "partage voyage"],
  authors: [{ name: "Magellan", url: baseUrl }],
  creator: "Magellan",
  publisher: "Magellan",
  metadataBase: new URL(baseUrl),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: baseUrl,
    siteName: "Magellan",
    title: "Magellan — Votre compagnon de voyage intelligent",
    description: "Explorez le monde autrement : Magellan révèle les histoires derrière chaque lieu et crée automatiquement des souvenirs interactifs qui vous ressemblent.",
    images: [
      {
        url: `${baseUrl}/apercu.jpg`,
        width: 1200,
        height: 630,
        alt: "Aperçu de l'application Magellan",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Magellan — Votre compagnon de voyage intelligent",
    description: "Explorez le monde autrement : Magellan révèle les histoires derrière chaque lieu et crée automatiquement des souvenirs interactifs.",
    images: [`${baseUrl}/apercu.jpg`],
    creator: "@magellan",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: { 
    icon: "/favicon.ico",
    apple: "/favicon.ico",
  },
  verification: {
    // À compléter avec vos codes de vérification
    // google: "votre-code-google",
    // yandex: "votre-code-yandex",
    // yahoo: "votre-code-yahoo",
  },
};

export default function RootLayout(props: { children: React.ReactNode }) {
  const { children } = props;
  
  return (
    <html lang="fr" suppressHydrationWarning>
      <body className={`${inter.className} min-h-screen bg-surface-bg text-text-base antialiased overflow-x-hidden`}>
        <MobileMenuProvider>
          <StructuredData />
          <Header />
          <main id="main-content" className="mx-auto w-full max-w-6xl px-3 sm:px-4 md:px-6" role="main">
            {children}
          </main>
          <Footer />
        </MobileMenuProvider>
      </body>
    </html>
  );
}



