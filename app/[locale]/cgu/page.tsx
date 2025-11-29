import CGUPage from '../../cgu/CGUPage';
import { Metadata } from 'next';

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://magellan.app';

  const title = locale === 'fr' 
    ? 'Conditions Générales d\'Utilisation - Magellan'
    : locale === 'en'
    ? 'Terms of Service - Magellan'
    : 'Términos y Condiciones - Magellan';
    
  const description = locale === 'fr'
    ? 'Consultez les conditions générales d\'utilisation de l\'application Magellan.'
    : locale === 'en'
    ? 'Read the terms of service for the Magellan application.'
    : 'Consulta los términos y condiciones de la aplicación Magellan.';

  return {
    title,
    description,
    keywords: locale === 'fr'
      ? ['cgu', 'conditions générales', 'conditions d\'utilisation', 'magellan']
      : locale === 'en'
      ? ['terms of service', 'tos', 'terms and conditions', 'magellan']
      : ['términos y condiciones', 'términos de uso', 'magellan'],
    authors: [{ name: 'Magellan' }],
    creator: 'Magellan',
    publisher: 'Magellan',
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: `${baseUrl}/${locale}/cgu`,
      languages: {
        'fr': `${baseUrl}/fr/cgu`,
        'en': `${baseUrl}/en/cgu`,
        'es': `${baseUrl}/es/cgu`,
      },
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

export default function Page() {
  return <CGUPage />;
}










