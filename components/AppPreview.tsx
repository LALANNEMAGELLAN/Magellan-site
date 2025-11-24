'use client';

import Image from 'next/image';
import { useState } from 'react';
import ScrollReveal from './ScrollReveal';

export default function AppPreview() {
  const [imageError, setImageError] = useState(false);

  return (
    <section id="app-preview" className="py-16 sm:py-20 md:py-24 bg-surface-card/50 rounded-3xl my-12 sm:my-16 md:my-20 scroll-mt-20 section-enter" aria-labelledby="app-preview-heading">
      <div className="grid items-center gap-8 sm:gap-10 md:gap-12 lg:gap-16 md:grid-cols-2">
        {/* Colonne gauche : Logo + Texte */}
        <ScrollReveal delay={0}>
          <div className="space-y-6 sm:space-y-8">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="relative w-12 h-12 sm:w-16 sm:h-16">
              <Image
                src="/logo-magellan.svg"
                alt="Logo Magellan"
                fill
                className="object-contain"
                priority
              />
            </div>
            <h2 id="app-preview-heading" className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-text-base">
              Explore, Share, Remember
            </h2>
          </div>

          {/* Bullet points */}
          <ul className="space-y-4 sm:space-y-5">
            <li className="flex items-start gap-3">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-brand/20 flex items-center justify-center mt-0.5">
                <svg className="w-4 h-4 text-brand" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-semibold text-text-base mb-1">Exploration intelligente</h3>
                <p className="text-sm sm:text-base text-text-muted">Découvrez les histoires derrière chaque lieu grâce à l'IA qui enrichit automatiquement vos photos et notes.</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center mt-0.5">
                <svg className="w-4 h-4 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-semibold text-text-base mb-1">Journal de bord automatique</h3>
                <p className="text-sm sm:text-base text-text-muted">Vos voyages s'organisent en récits interactifs avec cartes, étapes et anecdotes, sans effort de votre part.</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-brand/20 flex items-center justify-center mt-0.5">
                <svg className="w-4 h-4 text-brand" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-semibold text-text-base mb-1">Partage en un clic</h3>
                <p className="text-sm sm:text-base text-text-muted">Partagez vos aventures avec vos proches ou publiez-les sur les réseaux sociaux, directement depuis l'app.</p>
              </div>
            </li>
          </ul>
          </div>
        </ScrollReveal>

        {/* Colonne droite : Mockup large */}
        <ScrollReveal delay={200}>
          <div className="relative mt-8 md:mt-0 min-w-0" aria-label="Aperçu de l'application Magellan">
          <div className="relative w-full aspect-[4/3] rounded-2xl sm:rounded-3xl overflow-hidden border border-surface-border shadow-2xl bg-gradient-to-br from-surface-card to-surface-bg">
            {!imageError ? (
              <Image
                src="/apercu.jpg"
                alt="Aperçu de l'application Magellan avec carte interactive"
                fill
                priority
                quality={90}
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
                onError={() => setImageError(true)}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-surface-bg">
                <p className="text-sm text-text-muted text-center px-4">Aperçu Magellan</p>
              </div>
            )}
            {/* Overlay gradient léger */}
            <div className="absolute inset-0 bg-gradient-to-t from-surface-card/20 to-transparent pointer-events-none"></div>
          </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

