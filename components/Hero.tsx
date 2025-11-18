'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

export default function Hero() {
  const [imageError, setImageError] = useState(false);

  return (
    <section className="py-16 md:py-24" aria-labelledby="hero-heading">
      <div className="grid items-center gap-10 md:grid-cols-2">
        <header>
          <h1 id="hero-heading" className="text-4xl font-extrabold tracking-tight sm:text-5xl">
            Magellan — votre compagnon de voyage intelligent
          </h1>
          <p className="muted mt-4 text-lg">
            Explorez le monde autrement : Magellan révèle les histoires derrière chaque lieu et crée automatiquement des souvenirs interactifs qui vous ressemblent.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a 
              href="#beta" 
              aria-label="Rejoindre la bêta Magellan" 
              className="btn-primary focus:outline-none focus:ring-2 focus:ring-brand focus:ring-offset-2"
            >
              Rejoindre la bêta
            </a>
            <Link 
              href="/fonctionnalites" 
              aria-label="Découvrir les fonctionnalités de Magellan" 
              className="btn-secondary focus:outline-none focus:ring-2 focus:ring-brand focus:ring-offset-2"
            >
              Découvrir les fonctionnalités
            </Link>
          </div>
        </header>
        <div className="relative" aria-label="Aperçu de l'application Magellan">
          <div className="relative aspect-[4/3] min-h-[450px] w-full rounded-2xl border border-surface-border/80 bg-white shadow-2xl ring-1 ring-black/5 overflow-hidden">
            <div className="h-full w-full bg-white" />
            {/* Image optimisée à droite de l'aperçu, alignée sur le texte à gauche */}
            {!imageError && (
              <div className="pointer-events-none absolute right-2 sm:right-4 top-5 sm:top-9 bottom-5 sm:bottom-9 w-[50%]">
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
              <div className="pointer-events-none absolute right-2 sm:right-4 top-5 sm:top-9 bottom-5 sm:bottom-9 w-[50%] flex items-center justify-center bg-surface-bg rounded-xl">
                <p className="text-sm text-text-muted text-center px-4">Aperçu Magellan</p>
              </div>
            )}
          </div>
          <div className="pointer-events-none absolute inset-0 flex items-start justify-start">
            <div className="ml-2 sm:ml-4 max-w-[48%] lg:max-w-[45%] pr-5 sm:pr-7 pt-5 sm:pt-9">
              <span className="block text-lg sm:text-xl italic font-extrabold tracking-wide leading-tight text-text-base">
                Explore. Share. Remember.
              </span>
              <div className="mt-2.5 space-y-1.5 text-[12px] sm:text-[13px] leading-relaxed text-text-muted max-h-[378px] sm:max-h-[432px] overflow-y-auto break-words">
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


