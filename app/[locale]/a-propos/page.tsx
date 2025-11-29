import AProposPage from '../../a-propos/AProposPage';
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
    ? 'À propos de Magellan - Notre histoire'
    : locale === 'en'
    ? 'About Magellan - Our Story'
    : 'Acerca de Magellan - Nuestra historia';
    
  const description = locale === 'fr'
    ? 'Découvrez l\'histoire de Magellan, née d\'une idée simple : transformer chaque voyage en une expérience plus riche et mémorable grâce à l\'intelligence artificielle.'
    : locale === 'en'
    ? 'Discover Magellan\'s story, born from a simple idea: transforming every journey into a richer and more memorable experience through artificial intelligence.'
    : 'Descubre la historia de Magellan, nacida de una idea simple: transformar cada viaje en una experiencia más rica y memorable gracias a la inteligencia artificial.';

  const ogImage = `${baseUrl}/og-image.jpg`;

  return {
    title,
    description,
    keywords: locale === 'fr'
      ? ['magellan', 'à propos', 'histoire', 'équipe', 'mission']
      : locale === 'en'
      ? ['magellan', 'about', 'story', 'team', 'mission']
      : ['magellan', 'acerca de', 'historia', 'equipo', 'misión'],
    authors: [{ name: 'Magellan' }],
    creator: 'Magellan',
    publisher: 'Magellan',
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: `${baseUrl}/${locale}/a-propos`,
      languages: {
        'fr': `${baseUrl}/fr/a-propos`,
        'en': `${baseUrl}/en/a-propos`,
        'es': `${baseUrl}/es/a-propos`,
      },
    },
    openGraph: {
      title,
      description,
      url: `${baseUrl}/${locale}/a-propos`,
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
  return <AProposPage />;
}










