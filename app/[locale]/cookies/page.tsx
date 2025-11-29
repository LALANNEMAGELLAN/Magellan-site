import CookiesPage from '../../cookies/CookiesPage';
import { Metadata } from 'next';

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://magellan.app';

  const title = locale === 'fr' 
    ? 'Politique des Cookies - Magellan'
    : locale === 'en'
    ? 'Cookie Policy - Magellan'
    : 'Política de Cookies - Magellan';
    
  const description = locale === 'fr'
    ? 'Consultez la politique des cookies de Magellan : comment nous utilisons les cookies et technologies similaires sur notre site.'
    : locale === 'en'
    ? 'Read Magellan\'s cookie policy: how we use cookies and similar technologies on our website.'
    : 'Consulta la política de cookies de Magellan: cómo utilizamos cookies y tecnologías similares en nuestro sitio web.';

  return {
    title,
    description,
    keywords: locale === 'fr'
      ? ['politique des cookies', 'cookies', 'traceurs', 'magellan']
      : locale === 'en'
      ? ['cookie policy', 'cookies', 'trackers', 'magellan']
      : ['política de cookies', 'cookies', 'rastreadores', 'magellan'],
    authors: [{ name: 'Magellan' }],
    creator: 'Magellan',
    publisher: 'Magellan',
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: `${baseUrl}/${locale}/cookies`,
      languages: {
        'fr': `${baseUrl}/fr/cookies`,
        'en': `${baseUrl}/en/cookies`,
        'es': `${baseUrl}/es/cookies`,
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
  return <CookiesPage />;
}










