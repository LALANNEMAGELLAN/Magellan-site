import LoginModal from '../../../components/LoginModal';
import { Metadata } from 'next';

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://magellan.app';

  const title = locale === 'fr' 
    ? 'Connexion Magellan - Se connecter'
    : locale === 'en'
    ? 'Login Magellan - Sign in'
    : 'Iniciar sesión Magellan - Conectarse';
    
  const description = locale === 'fr'
    ? 'Connectez-vous à votre compte Magellan pour accéder à vos voyages et souvenirs.'
    : locale === 'en'
    ? 'Sign in to your Magellan account to access your travels and memories.'
    : 'Inicia sesión en tu cuenta de Magellan para acceder a tus viajes y recuerdos.';

  const ogImage = `${baseUrl}/og-image.jpg`;

  return {
    title,
    description,
    keywords: locale === 'fr'
      ? ['connexion magellan', 'se connecter', 'login', 'compte']
      : locale === 'en'
      ? ['login magellan', 'sign in', 'account', 'connect']
      : ['iniciar sesión magellan', 'conectarse', 'cuenta', 'login'],
    authors: [{ name: 'Magellan' }],
    creator: 'Magellan',
    publisher: 'Magellan',
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: `${baseUrl}/${locale}/connexion`,
      languages: {
        'fr': `${baseUrl}/fr/connexion`,
        'en': `${baseUrl}/en/connexion`,
        'es': `${baseUrl}/es/connexion`,
      },
    },
    openGraph: {
      title,
      description,
      url: `${baseUrl}/${locale}/connexion`,
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
      index: false, // Ne pas indexer la page de connexion
      follow: true,
    },
  };
}

export default function Page() {
  return <LoginModal />;
}



