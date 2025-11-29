import MentionsLegalesPage from '../../mentions-legales/MentionsLegalesPage';
import { Metadata } from 'next';

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://magellan.app';

  const title = locale === 'fr' 
    ? 'Mentions Légales - Magellan'
    : locale === 'en'
    ? 'Legal Notice - Magellan'
    : 'Aviso Legal - Magellan';
    
  const description = locale === 'fr'
    ? 'Consultez les mentions légales de Magellan : informations sur l\'éditeur, hébergeur et droits d\'auteur.'
    : locale === 'en'
    ? 'Read Magellan\'s legal notice: information about the publisher, host and copyright.'
    : 'Consulta el aviso legal de Magellan: información sobre el editor, alojamiento y derechos de autor.';

  return {
    title,
    description,
    keywords: locale === 'fr'
      ? ['mentions légales', 'informations légales', 'éditeur', 'magellan']
      : locale === 'en'
      ? ['legal notice', 'legal information', 'publisher', 'magellan']
      : ['aviso legal', 'información legal', 'editor', 'magellan'],
    authors: [{ name: 'Magellan' }],
    creator: 'Magellan',
    publisher: 'Magellan',
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: `${baseUrl}/${locale}/mentions-legales`,
      languages: {
        'fr': `${baseUrl}/fr/mentions-legales`,
        'en': `${baseUrl}/en/mentions-legales`,
        'es': `${baseUrl}/es/mentions-legales`,
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
  return <MentionsLegalesPage />;
}










