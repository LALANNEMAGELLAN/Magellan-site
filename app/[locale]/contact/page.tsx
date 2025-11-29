import ContactPage from '../../contact/ContactPage';
import { Metadata } from 'next';

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://magellan.app';

  const title = locale === 'fr' 
    ? 'Contact Magellan - Nous contacter'
    : locale === 'en'
    ? 'Contact Magellan - Get in Touch'
    : 'Contacto Magellan - Contáctanos';
    
  const description = locale === 'fr'
    ? 'Contactez l\'équipe Magellan pour toute question, suggestion ou demande d\'information sur notre application de voyage.'
    : locale === 'en'
    ? 'Contact the Magellan team for any questions, suggestions or information requests about our travel application.'
    : 'Contacta al equipo de Magellan para cualquier pregunta, sugerencia o solicitud de información sobre nuestra aplicación de viajes.';

  const ogImage = `${baseUrl}/og-image.jpg`;

  return {
    title,
    description,
    keywords: locale === 'fr'
      ? ['contact magellan', 'support', 'aide', 'assistance']
      : locale === 'en'
      ? ['contact magellan', 'support', 'help', 'assistance']
      : ['contacto magellan', 'soporte', 'ayuda', 'asistencia'],
    authors: [{ name: 'Magellan' }],
    creator: 'Magellan',
    publisher: 'Magellan',
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: `${baseUrl}/${locale}/contact`,
      languages: {
        'fr': `${baseUrl}/fr/contact`,
        'en': `${baseUrl}/en/contact`,
        'es': `${baseUrl}/es/contact`,
      },
    },
    openGraph: {
      title,
      description,
      url: `${baseUrl}/${locale}/contact`,
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
  return <ContactPage />;
}
