import type { Metadata } from "next";
import CookiesPage from "./CookiesPage";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://magellan.app';

export const metadata: Metadata = {
  title: "Politique de cookies",
  description: "Politique de cookies de Magellan. Découvrez comment nous utilisons les cookies et comment les gérer.",
  alternates: {
    canonical: "/cookies",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function Page() {
  return <CookiesPage />;
}







