'use client';

import { useEffect, useRef, useState } from 'react';

type Benefit = { 
  icon: React.ReactNode; 
  title: string; 
  desc: string;
  color: string;
};

// Icônes SVG inline style Heroicons
const IconMail = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
);

const IconFolder = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
  </svg>
);

const IconShare = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
  </svg>
);

const IconSparkles = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
  </svg>
);

const IconBolt = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
  </svg>
);

const IconLock = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
  </svg>
);

const benefits: Benefit[] = [
  {
    icon: <IconMail className="w-6 h-6" />,
    title: 'Regroupement intelligent',
    desc: "Magellan classe automatiquement vos photos, notes et souvenirs par destination, date et moments clés. Votre voyage s'organise tout seul.",
    color: 'bg-brand/10 text-brand'
  },
  {
    icon: <IconFolder className="w-6 h-6" />,
    title: "Création instantanée d'albums",
    desc: "En un clic, l'IA transforme vos voyages en récits interactifs, avec cartes, étapes et anecdotes prêtes à être revécues.",
    color: 'bg-accent/10 text-accent'
  },
  {
    icon: <IconShare className="w-6 h-6" />,
    title: 'Partage simplifié',
    desc: 'Choisissez entre partage privé ou public, invitez vos proches et partagez vos albums sur les réseaux sociaux, sans quitter Magellan.',
    color: 'bg-brand/10 text-brand'
  },
  {
    icon: <IconSparkles className="w-6 h-6" />,
    title: 'Assistant IA personnalisé',
    desc: 'Un compagnon qui vous connaît : suggestions dynamiques de lieux, temps forts et idées de contenus, adaptées à vos préférences et au contexte de chaque voyage.',
    color: 'bg-accent/10 text-accent'
  },
  {
    icon: <IconBolt className="w-6 h-6" />,
    title: 'Centralisation de vos informations',
    desc: 'Centralisez vos réservations, itinéraires, emails et notes. Magellan transforme le chaos des préparatifs en un plan clair et partageable.',
    color: 'bg-brand/10 text-brand'
  },
  {
    icon: <IconLock className="w-6 h-6" />,
    title: 'Confidentialité by design',
    desc: 'Vos données restent vos données. Paramètres de confidentialité simples et transparents.',
    color: 'bg-accent/10 text-accent'
  }
];

// Composant pour chaque carte de bénéfice avec animation séquentielle
function BenefitCard({ benefit, index }: { benefit: Benefit; index: number }) {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Délai progressif pour chaque carte
            setTimeout(() => {
              setIsVisible(true);
            }, index * 150); // 150ms entre chaque carte
          }
        });
      },
      {
        threshold: 0.2,
        rootMargin: '-100px 0px -100px 0px',
      }
    );

    const currentRef = cardRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [index]);

  return (
    <article
      ref={cardRef}
      className={`benefit-card group relative rounded-2xl border border-surface-border bg-surface-card p-8 sm:p-10 md:p-12 transition-all duration-700 ${
        isVisible 
          ? 'opacity-100 translate-y-0' 
          : 'opacity-0 translate-y-12'
      }`}
      role="listitem"
      tabIndex={0}
    >
      <div className="flex flex-col md:flex-row md:items-center gap-6 md:gap-8">
        {/* Icône */}
        <div className={`flex-shrink-0 inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-2xl ${benefit.color} transition-transform duration-300 group-hover:scale-110`}>
          {benefit.icon}
        </div>

        {/* Contenu */}
        <div className="flex-1 space-y-3">
          <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-text-base">
            {benefit.title}
          </h3>
          <p className="text-base sm:text-lg md:text-xl text-text-muted leading-relaxed max-w-3xl">
            {benefit.desc}
          </p>
        </div>
      </div>

      {/* Ligne de séparation subtile */}
      {index < benefits.length - 1 && (
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-surface-border to-transparent opacity-50"></div>
      )}
    </article>
  );
}

/**
 * SECTION FONCTIONNALITÉS GLOBALE
 * 
 * NOTE : Cette section peut être supprimée ou déplacée plus bas si on souhaite
 * ne garder que les fonctionnalités intégrées dans les étapes Explore/Share/Remember
 * (voir components/JourneyShowcase.tsx).
 * 
 * Pour supprimer cette section :
 * 1. Commenter ou supprimer l'import de Benefits dans app/HomePage.tsx
 * 2. Commenter ou supprimer l'utilisation <Benefits /> dans app/HomePage.tsx
 */
export default function Benefits() {
  if (!benefits || benefits.length === 0) {
    return null;
  }

  return (
    <section id="fonctionnalites" className="relative py-16 sm:py-20 md:py-24 lg:py-32 scroll-mt-20 section-enter z-20 bg-transparent" aria-labelledby="benefits-heading">
      <header className="mb-16 sm:mb-20 md:mb-24">
        <h2 id="benefits-heading" className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-text-base mb-4 sm:mb-6">
          Pourquoi Magellan ?
        </h2>
        <p className="text-lg sm:text-xl md:text-2xl text-text-muted max-w-3xl">
          Des fonctionnalités pensées pour transformer chaque voyage en une expérience mémorable.
        </p>
      </header>

      <div className="space-y-4 sm:space-y-6 md:space-y-8" role="list">
        {benefits.map((benefit, index) => (
          <BenefitCard key={`${benefit.title}-${index}`} benefit={benefit} index={index} />
        ))}
      </div>
    </section>
  );
}
