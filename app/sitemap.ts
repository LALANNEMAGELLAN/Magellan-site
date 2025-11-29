import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://magellan.app';
  const now = new Date();
  const locales = ['fr', 'en', 'es'];
  
  const pages = [
    { path: '', priority: 1.0, changeFrequency: 'weekly' as const },
    { path: 'fonctionnalites', priority: 0.9, changeFrequency: 'monthly' as const },
    { path: 'a-propos', priority: 0.8, changeFrequency: 'monthly' as const },
    { path: 'contact', priority: 0.7, changeFrequency: 'monthly' as const },
    { path: 'mentions-legales', priority: 0.3, changeFrequency: 'yearly' as const },
    { path: 'politique-de-confidentialite', priority: 0.3, changeFrequency: 'yearly' as const },
    { path: 'cgu', priority: 0.3, changeFrequency: 'yearly' as const },
    { path: 'cookies', priority: 0.3, changeFrequency: 'yearly' as const },
  ];

  const sitemapEntries: MetadataRoute.Sitemap = [];

  // Générer les URLs pour chaque locale et chaque page
  locales.forEach(locale => {
    pages.forEach(page => {
      const url = page.path 
        ? `${baseUrl}/${locale}/${page.path}`
        : `${baseUrl}/${locale}`;
      
      // Créer les alternates pour toutes les locales
      const alternates: Record<string, string> = {};
      locales.forEach(loc => {
        const altUrl = page.path 
          ? `${baseUrl}/${loc}/${page.path}`
          : `${baseUrl}/${loc}`;
        alternates[loc] = altUrl;
      });
      
      sitemapEntries.push({
        url,
        lastModified: now,
        changeFrequency: page.changeFrequency,
        priority: page.priority,
        alternates: {
          languages: alternates,
        },
      });
    });
  });

  return sitemapEntries;
}







