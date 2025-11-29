import PolitiqueConfidentialitePage from '../../politique-de-confidentialite/PolitiqueConfidentialitePage';
import { Metadata } from 'next';

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://magellan.app';

  const title = locale === 'fr' 
    ? 'Politique de Confidentialité - Magellan'
    : locale === 'en'
    ? 'Privacy Policy - Magellan'
    : 'Política de Privacidad - Magellan';
    
  const description = locale === 'fr'
    ? 'Consultez la politique de confidentialité de Magellan : comment nous collectons, utilisons et protégeons vos données personnelles.'
    : locale === 'en'
    ? 'Read Magellan\'s privacy policy: how we collect, use and protect your personal data.'
    : 'Consulta la política de privacidad de Magellan: cómo recopilamos, utilizamos y protegemos tus datos personales.';

  return {
    title,
    description,
    keywords: locale === 'fr'
      ? ['politique de confidentialité', 'protection des données', 'rgpd', 'magellan']
      : locale === 'en'
      ? ['privacy policy', 'data protection', 'gdpr', 'magellan']
      : ['política de privacidad', 'protección de datos', 'rgpd', 'magellan'],
    authors: [{ name: 'Magellan' }],
    creator: 'Magellan',
    publisher: 'Magellan',
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: `${baseUrl}/${locale}/politique-de-confidentialite`,
      languages: {
        'fr': `${baseUrl}/fr/politique-de-confidentialite`,
        'en': `${baseUrl}/en/politique-de-confidentialite`,
        'es': `${baseUrl}/es/politique-de-confidentialite`,
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
  return <PolitiqueConfidentialitePage />;
}










