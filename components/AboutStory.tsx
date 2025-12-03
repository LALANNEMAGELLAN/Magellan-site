'use client';

import { useTranslations } from 'next-intl';
import ScrollReveal from './ScrollReveal';

export default function AboutStory() {
  const t = useTranslations('about');
  return (
    <section id="about-story" className="py-16 sm:py-20 md:py-24 scroll-mt-20 section-enter" aria-labelledby="about-heading">
      <div className="grid items-start gap-8 sm:gap-10 md:gap-12 lg:gap-16 md:grid-cols-2">
        {/* Colonne gauche : Texte */}
        <ScrollReveal delay={0}>
          <div className="space-y-6 sm:space-y-8">
          <header>
            <h2 id="about-heading" className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-text-base mb-4 sm:mb-6">
              {t('title')}
            </h2>
            <p className="text-lg sm:text-xl text-text-muted leading-relaxed">
              {t('subtitle')}
            </p>
          </header>

          <div className="space-y-4 sm:space-y-6 text-text-base">
            <p className="text-base sm:text-lg leading-relaxed">
              {t('paragraph1')}
            </p>
            <p className="text-base sm:text-lg leading-relaxed">
              {t('paragraph2')}
            </p>
            <p className="text-base sm:text-lg leading-relaxed">
              {t('paragraph3')}
            </p>
          </div>
          </div>
        </ScrollReveal>

        {/* Colonne droite : Timeline / Encart Genèse */}
        <ScrollReveal delay={200}>
          <div className="relative mt-8 md:mt-0">
          {/* Icône boussole/carte */}
          <div className="absolute -top-4 -right-4 w-16 h-16 sm:w-20 sm:h-20 opacity-20">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-brand">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.31-8.86c-1.77-.45-2.34-.94-2.34-1.67 0-.84.79-1.43 2.1-1.43 1.38 0 1.9.66 1.94 1.64h1.71c-.05-1.34-.87-2.57-2.49-2.97V5H10.9v1.69c-1.51.32-2.72 1.3-2.72 2.81 0 1.79 1.49 2.69 3.66 3.21 1.95.46 2.34 1.15 2.34 1.87 0 .53-.39 1.39-2.1 1.39-1.6 0-2.23-.72-2.32-1.64H8.04c.1 1.7 1.36 2.66 2.86 2.97V19h2.34v-1.67c1.52-.29 2.72-1.16 2.73-2.77-.01-2.2-1.9-2.96-3.66-3.21z"/>
            </svg>
          </div>

          {/* Encart Genèse */}
          <div className="relative rounded-2xl border border-surface-border bg-surface-card p-6 sm:p-8 space-y-4 sm:space-y-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-accent/20 flex items-center justify-center">
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-text-base">
                {t('genesis.title')}
              </h3>
            </div>

            <div className="space-y-4 text-text-muted text-sm sm:text-base leading-relaxed">
              <p>
                {t('genesis.paragraph1')}
              </p>
              <p>
                {t('genesis.paragraph2')}
              </p>
              <p>
                {t('genesis.paragraph3')}
              </p>
              <p className="pt-2 border-t border-surface-border text-text-base">
                {t('genesis.paragraph4')}
              </p>
            </div>
          </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}












