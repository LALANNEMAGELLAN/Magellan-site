import HomePage from '../HomePage';
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
    const messagesModule = await import(`../../messages/${locale}.json`);
    messages = messagesModule.default;
  } catch {
    const fallbackModule = await import(`../../messages/fr.json`);
    messages = fallbackModule.default;
  }

  const title = messages.hero?.title || 'Magellan — votre compagnon de voyage intelligent';
  const description = messages.hero?.subtitle || 'Magellan organise automatiquement vos photos, suit votre itinéraire, crée la carte dynamique de votre voyage et génère votre récit interactif.';
  const ogImage = `${baseUrl}/og-image.jpg`;

  return {
    title,
    description,
    keywords: ['voyage', 'application voyage', 'souvenirs voyage', 'itinéraire', 'magellan', 'travel app', 'carnet de voyage'],
    authors: [{ name: 'Magellan' }],
    creator: 'Magellan',
    publisher: 'Magellan',
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: `${baseUrl}/${locale}`,
      languages: {
        'fr': `${baseUrl}/fr`,
        'en': `${baseUrl}/en`,
        'es': `${baseUrl}/es`,
      },
    },
    openGraph: {
      title,
      description,
      url: `${baseUrl}/${locale}`,
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

export default async function RootPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  await params;
  return <HomePage />;
}









