import FonctionnalitesPage from '../../fonctionnalites/FonctionnalitesPage';
import { Metadata } from 'next';

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://magellan.app';
  
  // Charger les messages pour la locale
  let messages;
  try {
    const messagesModule = await import(`../../../messages/${locale}.json`);
    messages = messagesModule.default;
  } catch {
    const fallbackModule = await import(`../../../messages/fr.json`);
    messages = fallbackModule.default;
  }

  const title = locale === 'fr' 
    ? 'Fonctionnalités Magellan - Explorez, Partagez, Souvenez-vous'
    : locale === 'en'
    ? 'Magellan Features - Explore, Share, Remember'
    : 'Funcionalidades de Magellan - Explora, Comparte, Recuerda';
    
  const description = locale === 'fr'
    ? 'Découvrez toutes les fonctionnalités de Magellan : carte interactive, albums collaboratifs, récits IA, partage instantané et bien plus encore.'
    : locale === 'en'
    ? 'Discover all Magellan features: interactive map, collaborative albums, AI stories, instant sharing and much more.'
    : 'Descubre todas las funcionalidades de Magellan: mapa interactivo, álbumes colaborativos, relatos IA, compartir instantáneo y mucho más.';

  const ogImage = `${baseUrl}/og-image.jpg`;

  return {
    title,
    description,
    keywords: locale === 'fr'
      ? ['fonctionnalités magellan', 'application voyage', 'carte interactive', 'albums collaboratifs', 'récits IA']
      : locale === 'en'
      ? ['magellan features', 'travel app', 'interactive map', 'collaborative albums', 'AI stories']
      : ['funcionalidades magellan', 'app viajes', 'mapa interactivo', 'álbumes colaborativos', 'relatos IA'],
    authors: [{ name: 'Magellan' }],
    creator: 'Magellan',
    publisher: 'Magellan',
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: `${baseUrl}/${locale}/fonctionnalites`,
      languages: {
        'fr': `${baseUrl}/fr/fonctionnalites`,
        'en': `${baseUrl}/en/fonctionnalites`,
        'es': `${baseUrl}/es/fonctionnalites`,
      },
    },
    openGraph: {
      title,
      description,
      url: `${baseUrl}/${locale}/fonctionnalites`,
      siteName: 'Magellan',
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      locale: locale,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
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
  return <FonctionnalitesPage />;
}










