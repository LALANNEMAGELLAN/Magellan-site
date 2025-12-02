import { NextIntlClientProvider } from 'next-intl';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { locales, type Locale } from '../../i18n';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import StructuredData from '../../components/StructuredData';
import MobileMenuProvider from '../../components/MobileMenuProvider';
import { Inter } from 'next/font/google';
import '../globals.css';

const inter = Inter({ subsets: ['latin'] });

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://magellan.app';

  return {
    metadataBase: new URL(baseUrl),
    viewport: {
      width: 'device-width',
      initialScale: 1,
      maximumScale: 5,
      userScalable: true,
      viewportFit: 'cover',
    },
    alternates: {
      canonical: `${baseUrl}/${locale}`,
      languages: {
        'fr': `${baseUrl}/fr`,
        'en': `${baseUrl}/en`,
        'es': `${baseUrl}/es`,
      },
    },
  };
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Valider la locale
  if (!locale || !locales.includes(locale as Locale)) {
    notFound();
  }

  // Charger les messages directement - éviter getMessages() qui peut échouer
  let messages;
  try {
    // Import dynamique avec chemin relatif depuis app/[locale]/
    const messagesModule = await import(`../../messages/${locale}.json`);
    messages = messagesModule.default;
  } catch (error) {
    console.error(`Error loading messages for locale ${locale}, using fallback:`, error);
    // Fallback vers français
    try {
      const fallbackModule = await import(`../../messages/fr.json`);
      messages = fallbackModule.default;
    } catch (fallbackError) {
      console.error('Error loading fallback messages:', fallbackError);
      messages = {};
    }
  }

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={`${inter.className} min-h-screen bg-surface-bg text-text-base antialiased overflow-x-hidden`}>
        <NextIntlClientProvider messages={messages}>
          <MobileMenuProvider>
            <StructuredData />
            <Header />
            <main id="main-content" className="mx-auto w-full max-w-6xl px-3 sm:px-4 md:px-6" role="main">
              {children}
            </main>
            <Footer />
          </MobileMenuProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
