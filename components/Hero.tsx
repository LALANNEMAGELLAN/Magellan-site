'use client';

import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import { TravelApp } from './TravelApp';
import { locales, type Locale } from '../i18n';

export default function Hero() {
  const t = useTranslations('hero');
  const params = useParams();
  // Détecter la locale depuis l'URL (plus fiable que useLocale qui peut être en retard)
  const currentLocale = (params?.locale as Locale) || 'fr';
  const locale: Locale = locales.includes(currentLocale) ? currentLocale : 'fr';

  return (
    <section id="hero" className="relative pt-4 sm:pt-8 md:pt-12 lg:pt-16 pb-8 sm:pb-12 md:pb-16 lg:pb-20 min-h-[100vh] flex items-center overflow-hidden z-10 bg-transparent" aria-labelledby="hero-heading">

      <div className="grid items-center gap-8 sm:gap-10 md:gap-12 lg:gap-16 md:grid-cols-2 relative z-0 w-full">
        {/* Colonne gauche : Contenu */}
        <header className="min-w-0 space-y-6 sm:space-y-8 animate-fade-in">
          {/* Titre */}
          <h1 id="hero-heading" className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight text-text-base">
            {t('title')}
          </h1>

          {/* Sous-titre */}
          <p className="text-lg sm:text-xl md:text-2xl text-text-muted leading-relaxed max-w-2xl">
            {t('subtitle')}
          </p>

          {/* Invitation bêta */}
          <p className="text-base sm:text-lg text-text-muted/90 leading-relaxed max-w-2xl">
            {t('betaInvite')}
          </p>

          {/* CTA */}
          <div className="flex flex-col gap-3 sm:gap-4">
            <a 
              href="#beta" 
              aria-label={t('ctaAriaLabel')} 
              className="inline-flex items-center justify-center gap-1.5 px-6 py-3 sm:px-8 sm:py-4 rounded-xl bg-brand text-accent text-base sm:text-lg font-semibold shadow-lg shadow-brand/20 hover:bg-brand-dark active:bg-brand-dark active:scale-95 transition-all duration-200 hover:scale-105 focus-visible:outline-2 focus-visible:outline-brand focus-visible:outline-offset-2 scroll-smooth will-change-transform"
              onClick={(e) => {
                e.preventDefault();
                const element = document.getElementById('beta');
                if (element) {
                  const headerHeight = 80;
                  const elementPosition = element.getBoundingClientRect().top + window.scrollY;
                  const offsetPosition = elementPosition - headerHeight;
                  window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                  });
                }
              }}
            >
              <span className="text-accent font-bold text-lg sm:text-xl leading-none">•</span>
              {t('cta')}
            </a>
            <p className="text-xs sm:text-sm text-text-muted/70 text-center sm:text-left">
              {t('ctaNote')}
            </p>
          </div>
        </header>

        {/* Colonne droite : Mockup téléphone */}
        <div className="relative mt-8 md:mt-0 min-w-0 flex items-center justify-center animate-fade-in-delay md:mt-4 lg:mt-8" aria-label={t('appPreviewAlt')}>
          {/* Effet glow/gradient derrière le téléphone */}
          <div className="absolute inset-0 flex items-center justify-center" aria-hidden="true">
            <div className="absolute w-full h-full max-w-md max-h-[600px] bg-gradient-to-br from-brand/20 via-accent/10 to-transparent rounded-3xl blur-3xl opacity-60 will-change-transform"></div>
          </div>

          {/* Mockup téléphone avec composant TravelApp */}
          <div className="relative z-10 w-full max-w-sm">
            <TravelApp language={locale} showLanguageSelector={false} />
          </div>
        </div>
      </div>
    </section>
  );
}
