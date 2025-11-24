'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { useTranslations } from 'next-intl';

export default function Hero() {
  const [imageError, setImageError] = useState(false);
  const t = useTranslations('hero');

  return (
    <section id="hero" className="relative pt-12 sm:pt-16 md:pt-20 lg:pt-28 pb-8 sm:pb-12 md:pb-16 lg:pb-20 min-h-[100vh] flex items-center overflow-hidden z-10 bg-transparent" aria-labelledby="hero-heading">

      <div className="grid items-center gap-8 sm:gap-10 md:gap-12 lg:gap-16 md:grid-cols-2 relative z-0 w-full">
        {/* Colonne gauche : Contenu */}
        <header className="min-w-0 space-y-6 sm:space-y-8 animate-fade-in">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs sm:text-sm font-medium backdrop-blur-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
            </span>
            {t('badge')}
          </div>

          {/* Titre */}
          <h1 id="hero-heading" className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight text-text-base">
            {t('title')}
          </h1>

          {/* Sous-titre */}
          <p className="text-lg sm:text-xl md:text-2xl text-text-muted leading-relaxed max-w-2xl">
            {t('subtitle')}
          </p>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-4">
            <a 
              href="#beta" 
              aria-label={t('ctaAriaLabel')} 
              className="inline-flex items-center justify-center px-6 py-3 sm:px-8 sm:py-4 rounded-xl bg-brand text-brand-fg text-base sm:text-lg font-semibold shadow-lg shadow-brand/20 hover:bg-brand-dark active:bg-brand-dark active:scale-95 transition-all duration-200 hover:scale-105 focus-visible:outline-2 focus-visible:outline-brand focus-visible:outline-offset-2 scroll-smooth will-change-transform"
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
              {t('cta')}
            </a>
          </div>
        </header>

        {/* Colonne droite : Mockup téléphone */}
        <div className="relative mt-8 md:mt-0 min-w-0 flex items-center justify-center animate-fade-in-delay" aria-label={t('appPreviewAlt')}>
          {/* Effet glow/gradient derrière le téléphone */}
          <div className="absolute inset-0 flex items-center justify-center" aria-hidden="true">
            <div className="absolute w-full h-full max-w-md max-h-[600px] bg-gradient-to-br from-brand/20 via-accent/10 to-transparent rounded-3xl blur-3xl opacity-60 will-change-transform"></div>
          </div>

          {/* Mockup téléphone */}
          <div className="relative z-10 w-full max-w-sm">
            <div className="relative aspect-[9/19.5] w-full rounded-[2.5rem] bg-surface-card border-8 border-surface-border shadow-2xl overflow-hidden">
              {/* Barre de statut */}
              <div className="absolute top-0 left-0 right-0 h-12 bg-surface-card z-20 flex items-center justify-center">
                <div className="w-32 h-1.5 rounded-full bg-surface-border"></div>
              </div>

              {/* Contenu de l'app */}
              <div className="absolute inset-0 pt-12 pb-8 px-4">
                {!imageError ? (
                  <div className="relative w-full h-full rounded-2xl overflow-hidden">
                    <Image
                      src="/apercu.jpg"
                      alt={t('appPreviewAlt')}
                      fill
                      priority
                      quality={85}
                      sizes="(max-width: 640px) 100vw, 400px"
                      className="object-cover"
                      onError={() => setImageError(true)}
                    />
                  </div>
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-surface-bg rounded-2xl">
                    <p className="text-sm text-text-muted text-center px-4">Aperçu Magellan</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
