import { getRequestConfig } from 'next-intl/server';
import { defineRouting } from 'next-intl/routing';

export const locales = ['fr', 'en', 'es'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'fr';

export const routing = defineRouting({
  locales,
  defaultLocale,
  localePrefix: 'always'
});

export default getRequestConfig(async ({ locale }) => {
  // Ne pas appeler notFound() ici - laisser le layout gérer
  if (!locale || !locales.includes(locale as Locale)) {
    // Retourner une config par défaut au lieu de notFound()
    locale = defaultLocale;
  }

  const validLocale = locale as Locale;
  
  // Charger les messages pour cette locale
  // Si l'import échoue, utiliser les messages français par défaut
  let messages = {};
  try {
    const messagesModule = await import(`./messages/${validLocale}.json`);
    messages = messagesModule.default || {};
  } catch (error) {
    // Silencieusement fallback vers français
    try {
      const fallbackModule = await import(`./messages/fr.json`);
      messages = fallbackModule.default || {};
    } catch (fallbackError) {
      // Si même le fallback échoue, retourner un objet vide
      console.error('Error loading messages:', fallbackError);
      messages = {};
    }
  }

  return {
    locale: validLocale,
    messages
  };
});

