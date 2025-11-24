'use client';

import { usePathname } from '@/navigation';
import { Link } from '@/navigation';
import { locales, type Locale } from '../i18n';
import { useParams } from 'next/navigation';

const localeNames: Record<Locale, { label: string; flag: string }> = {
  fr: { label: 'Français', flag: '🇫🇷' },
  en: { label: 'English', flag: '🇬🇧' },
  es: { label: 'Español', flag: '🇪🇸' }
};

export default function LanguageSwitcher({ onSelect }: { onSelect?: () => void }) {
  const pathname = usePathname();
  const params = useParams();
  
  // Détecter la locale depuis l'URL (plus fiable que useLocale qui peut être en retard)
  // useParams est plus réactif et se met à jour immédiatement après la navigation
  const currentLocale = (params?.locale as Locale) || (pathname?.split('/')[1] as Locale) || 'fr';
  
  // Valider que la locale est bien supportée
  const locale: Locale = locales.includes(currentLocale) ? currentLocale : 'fr';

  // Obtenir le chemin sans la locale pour construire les liens
  const getPathWithoutLocale = () => {
    const segments = pathname.split('/');
    if (segments[1] && locales.includes(segments[1] as Locale)) {
      return '/' + segments.slice(2).join('/') || '/';
    }
    return pathname || '/';
  };

  const pathWithoutLocale = getPathWithoutLocale();

  return (
    <div className="space-y-2">
      <p className="text-sm font-semibold text-text-base mb-3">Langue</p>
      <div className="flex flex-col gap-2">
        {locales.map((loc) => {
          const isActive = locale === loc;
          const localeInfo = localeNames[loc];
          return (
            <Link
              key={loc}
              href={pathWithoutLocale}
              locale={loc}
              onClick={onSelect}
              className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                isActive
                  ? 'bg-brand/20 text-brand border-2 border-brand shadow-md shadow-brand/20'
                  : 'bg-surface-card/50 text-white hover:bg-surface-card/70 border border-surface-border hover:border-surface-border/50'
              }`}
            >
              <span className="text-xl">{localeInfo.flag}</span>
              <span className={isActive ? 'font-semibold text-brand' : 'font-medium text-white'}>
                {localeInfo.label}
              </span>
              {isActive && (
                <svg 
                  className="w-4 h-4 ml-auto text-brand" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
              )}
            </Link>
          );
        })}
      </div>
    </div>
  );
}

