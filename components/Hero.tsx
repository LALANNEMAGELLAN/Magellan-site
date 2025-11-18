'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

export default function Hero() {
  const [imageError, setImageError] = useState(false);

  return (
    <section className="py-8 sm:py-12 md:py-16 lg:py-24" aria-labelledby="hero-heading">
      <div className="grid items-center gap-4 sm:gap-6 md:gap-8 lg:gap-10 md:grid-cols-2">
        <header className="min-w-0">
          <h1 id="hero-heading" className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl font-extrabold tracking-tight leading-tight break-words">
            Magellan — votre compagnon de voyage intelligent
          </h1>
          <p className="muted mt-2 sm:mt-3 md:mt-4 text-xs sm:text-sm md:text-base break-words">
            Explorez le monde autrement : Magellan révèle les histoires derrière chaque lieu et crée automatiquement des souvenirs interactifs qui vous ressemblent.
          </p>
          <div className="mt-4 sm:mt-6 md:mt-8 flex flex-col gap-2 sm:gap-3 flex-wrap">
            <a 
              href="#beta" 
              aria-label="Rejoindre la bêta Magellan" 
              className="btn-primary text-center focus:outline-none focus:ring-2 focus:ring-brand focus:ring-offset-2 scroll-smooth"
              onClick={(e) => {
                e.preventDefault();
                const element = document.getElementById('beta');
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
              }}
            >
              Rejoindre la bêta
            </a>
            <Link 
              href="/fonctionnalites" 
              aria-label="Découvrir les fonctionnalités de Magellan" 
              className="btn-secondary text-center focus:outline-none focus:ring-2 focus:ring-brand focus:ring-offset-2"
            >
              Découvrir les fonctionnalités
            </Link>
          </div>
        </header>
        <div className="relative mt-8 md:mt-0 min-w-0" aria-label="Aperçu de l'application Magellan">
          <div className="relative aspect-[4/3] min-h-[450px] sm:min-h-[500px] md:min-h-[500px] w-full max-w-full rounded-lg sm:rounded-xl md:rounded-2xl border border-surface-border/80 bg-white shadow-2xl ring-1 ring-black/5 overflow-hidden">
            <div className="h-full w-full bg-white" />
            {/* Image optimisée à droite de l'aperçu, alignée sur le texte à gauche */}
            {!imageError && (
              <div className="pointer-events-none absolute right-1.5 sm:right-2 md:right-4 top-3 sm:top-5 md:top-9 bottom-3 sm:bottom-5 md:bottom-9 w-[45%] sm:w-[48%] md:w-[50%]">
                <Image
                  src="/apercu.jpg"
                  alt="Aperçu Magellan"
                  fill
                  priority
                  quality={75}
                  sizes="(min-width: 1024px) 45vw, (min-width: 640px) 50vw, 90vw"
                  className="object-contain rounded-xl shadow-md"
                  onError={() => setImageError(true)}
                />
              </div>
            )}
            {imageError && (
              <div className="pointer-events-none absolute right-1.5 sm:right-2 md:right-4 top-3 sm:top-5 md:top-9 bottom-3 sm:bottom-5 md:bottom-9 w-[45%] sm:w-[48%] md:w-[50%] flex items-center justify-center bg-surface-bg rounded-xl">
                <p className="text-xs sm:text-sm text-text-muted text-center px-2 sm:px-4">Aperçu Magellan</p>
              </div>
            )}
          </div>
          <div className="pointer-events-none absolute inset-0 flex items-start justify-start">
            <div className="ml-2 sm:ml-3 md:ml-4 max-w-[48%] sm:max-w-[50%] md:max-w-[48%] lg:max-w-[45%] pr-1.5 sm:pr-2 md:pr-5 lg:pr-7 pt-1.5 sm:pt-2 md:pt-3 lg:pt-5 xl:pt-9 pb-1.5 sm:pb-2 md:pb-3 lg:pb-5 xl:pb-9 text-left">
              <span className="block text-sm sm:text-base md:text-lg lg:text-xl italic font-extrabold tracking-wide leading-tight text-text-base">
                Explore. Share. Remember.
              </span>
              <div className="mt-1.5 sm:mt-2 md:mt-2.5 space-y-1 sm:space-y-1.5 md:space-y-1.5 text-xs sm:text-sm md:text-[12px] lg:text-[13px] leading-relaxed text-text-muted break-words">
                <p>Parce qu'un voyage ne commence pas au moment du départ.</p>
                <p>Il naît d'un message, d'un billet réservé, d'une photo reçue.</p>
                <p>Magellan rassemble ces fragments, les ordonne, et te raconte ton aventure comme une histoire.</p>
                <p>De la préparation au souvenir, ton voyage prend vie — naturellement, sans effort.</p>
                <p>Explore. Partage. Souviens-toi.</p>
                <p>Le reste, Magellan s'en charge.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


