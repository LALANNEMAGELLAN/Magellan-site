'use client';

import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import FeatureCard from './FeatureCard';

// Icônes SVG pour les cartes de fonctionnalités
const IconMap = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
  </svg>
);

const IconLightbulb = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
  </svg>
);

const IconGlobe = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const IconShare = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
  </svg>
);

const IconChat = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
  </svg>
);

const IconFolder = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
  </svg>
);

const IconSparkles = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
  </svg>
);

const IconChart = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
  </svg>
);

// Données des cartes de fonctionnalités par étape
const exploreFeatures = [
  {
    title: "Carte interactive dynamique",
    description: "Visualisez votre voyage sur une carte fluide : étapes, photos, distances et moments forts, tout en un coup d'œil.",
    icon: <IconMap className="w-6 h-6" />,
    color: 'bg-brand/10 text-brand'
  },
  {
    title: "Découvertes autour de vous",
    description: "Accédez instantanément à l'histoire des lieux et aux bons plans proches, proposés selon votre position et vos centres d'intérêt.",
    icon: <IconLightbulb className="w-6 h-6" />,
    color: 'bg-accent/10 text-accent'
  },
  {
    title: "Inspirations de voyages",
    description: "Parcourez les aventures des autres Magellistes et trouvez de nouvelles idées adaptées à vos envies.",
    icon: <IconGlobe className="w-6 h-6" />,
    color: 'bg-brand/10 text-brand'
  }
];

const shareFeatures = [
  {
    title: "Album collaboratif",
    description: "Ajoutez photos, vidéos et souvenirs dans un seul espace partagé entre tous les participants.",
    icon: <IconFolder className="w-6 h-6" />,
    color: 'bg-brand/10 text-brand'
  },
  {
    title: "Chat intégré par album",
    description: "Discutez, réagissez et organisez vos étapes ensemble, avant, pendant et après le voyage.",
    icon: <IconChat className="w-6 h-6" />,
    color: 'bg-accent/10 text-accent'
  },
  {
    title: "Partage instantané",
    description: "Diffusez vos plus beaux moments en un clic sur les réseaux sociaux ou via un lien privé.",
    icon: <IconShare className="w-6 h-6" />,
    color: 'bg-brand/10 text-brand'
  }
];

const rememberFeatures = [
  {
    title: "Souvenirs intelligemment regroupés",
    description: "Vos photos, notes et étapes sont classées automatiquement par dates, lieux et moments-clés.",
    icon: <IconFolder className="w-6 h-6" />,
    color: 'bg-brand/10 text-brand'
  },
  {
    title: "Récit interactif généré par l'IA",
    description: "En un clic, obtenez un récit animé de votre voyage : carte, anecdotes, temps forts, timeline.",
    icon: <IconSparkles className="w-6 h-6" />,
    color: 'bg-accent/10 text-accent'
  },
  {
    title: "Statistiques de voyage",
    description: "Distance parcourue, pays visités, étapes, grands souvenirs : votre aventure résumée en chiffres.",
    icon: <IconChart className="w-6 h-6" />,
    color: 'bg-brand/10 text-brand'
  }
];

// Données des 2 étapes du voyage
// ORDRE: Explore (1/2) → Share (2/2)
const journeySteps = [
  {
    id: 'explore',
    stepNumber: 1,
    title: 'Explore',
    subtitle: 'Laissez Magellan guider votre aventure.',
    description: "Découvrez votre parcours en temps réel : étapes, photos et lieux visités. Magellan vous propose des idées, des infos utiles et des inspirations d'autres voyageurs pour enrichir votre itinéraire, sans jamais quitter l'instant présent.",
    image: '/explore.jpg',
    featureCards: exploreFeatures
  },
  {
    id: 'share',
    stepNumber: 2,
    title: 'Share',
    subtitle: 'Vivez votre voyage ensemble, en temps réel.',
    description: "Créez un album commun où chacun ajoute ses photos, vidéos et messages. Partagez vos moments forts instantanément avec vos proches ou votre communauté.",
    image: '/share.jpg',
    featureCards: shareFeatures
  }
];

export default function JourneyShowcase() {
  const [activeStep, setActiveStep] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  // Détecter si on est sur mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Scrollytelling sur desktop : détecter quelle étape est visible
  useEffect(() => {
    if (isMobile) return;

    let rafId: number | null = null;
    let lastStep = -1;
    let animationStartScroll = 0; // Position de scroll où l'animation commence
    let hasAnimationStarted = false; // Flag pour savoir si l'animation a commencé

    const handleScroll = () => {
      if (rafId) return;

      rafId = requestAnimationFrame(() => {
        if (!sectionRef.current) {
          rafId = null;
          return;
        }

        const section = sectionRef.current;
        const rect = section.getBoundingClientRect();
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const scrollY = window.scrollY;
        const windowHeight = window.innerHeight;
        
        // PHASE 1 : Attendre que la section soit pleinement visible
        // Le haut de la section doit être bien dans le viewport (rect.top entre 0 et 200px)
        const isSectionFullyVisible = rect.top >= 0 && rect.top <= 200;
        
        if (!isSectionFullyVisible) {
          // La section n'est pas encore pleinement visible : afficher Explore et attendre
          if (lastStep !== 0) {
            setActiveStep(0);
            lastStep = 0;
            hasAnimationStarted = false; // Réinitialiser le flag
          }
          rafId = null;
          return;
        }
        
        // PHASE 2 : La section est maintenant pleinement visible
        // Si c'est la première fois qu'on détecte cela, enregistrer la position de scroll
        if (!hasAnimationStarted) {
          animationStartScroll = scrollY;
          hasAnimationStarted = true;
          console.log('🚀 Animation démarrée à scrollY:', scrollY, 'sectionTop:', sectionTop, 'sectionHeight:', sectionHeight);
        }
        
        // PHASE 3 : Calculer le progrès basé sur la position de la section dans le viewport
        // On calcule le progrès depuis que la section est visible
        // On utilise la différence entre scrollY et sectionTop pour savoir où on en est
        const sectionScrollProgress = Math.max(0, scrollY - sectionTop);
        
        // Utiliser la hauteur de la section comme référence pour la progression
        // La section fait min-h-[200vh], donc on utilise cette hauteur
        const animationRange = sectionHeight;
        
        // Calculer le progrès (0 à 1) basé sur le scroll de la section
        // On commence à 0 quand on arrive sur la section
        const progress = Math.max(0, Math.min(1, sectionScrollProgress / animationRange));
        
        // Diviser en 2 zones avec des seuils bien espacés pour que chaque étape soit visible
        let newStep = 0;
        if (progress < 0.50) {
          newStep = 0; // Explore : 0% à 50%
        } else {
          newStep = 1; // Share : 50% à 100% - Dernière étape
        }
        
        // Logs de débogage
        console.log('📊 Phase 3 - scrollY:', scrollY, 'sectionTop:', sectionTop, 'sectionScrollProgress:', sectionScrollProgress.toFixed(0), 'progress:', progress.toFixed(3), 'newStep:', newStep, 'lastStep:', lastStep);
        
        // Toujours mettre à jour pour forcer le rendu
        if (newStep !== lastStep) {
          console.log('✅ Changement d\'étape:', lastStep, '->', newStep, '(Explore=0, Share=1)');
          setActiveStep(newStep);
          lastStep = newStep;
        }

        rafId = null;
      });
    };

    // Initialiser avec l'étape 0 (Explore)
    setActiveStep(0);
    lastStep = 0;

    window.addEventListener('scroll', handleScroll, { passive: true });
    // Attendre un peu pour que le DOM soit prêt
    setTimeout(() => {
      handleScroll();
    }, 100);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [isMobile]);

  // Gérer le scroll du carrousel mobile
  const handleCarouselScroll = (e: React.UIEvent<HTMLDivElement>) => {
    if (isMobile) {
      const container = e.currentTarget;
      const scrollLeft = container.scrollLeft;
      const cardWidth = container.clientWidth;
      const newStep = Math.round(scrollLeft / cardWidth);
      setActiveStep(newStep);
    }
  };

  return (
    <section
      ref={sectionRef}
      id="journey-showcase"
      className="relative pt-8 sm:pt-12 md:pt-16 lg:pt-20 pb-16 sm:pb-20 md:pb-24 lg:pb-32 min-h-[100vh] md:min-h-[200vh] z-20 bg-transparent"
      aria-label="Film de voyage Magellan"
    >
      {/* Desktop : Layout 2 colonnes avec scrollytelling */}
      <div className="hidden md:block">
        <div className="sticky top-20 flex items-start py-8">
          <div className="grid grid-cols-2 gap-8 lg:gap-12 w-full items-start">
            {/* Colonne gauche : Grande image immersive (hauteur fixe uniforme - réduite de 25%) */}
            <div className="relative rounded-2xl overflow-hidden" style={{ height: '420px', minHeight: '420px', maxHeight: '420px', width: '100%' }}>
              <div className="absolute inset-0" style={{ height: '420px' }}>
                {journeySteps.map((step, index) => (
                  <div
                    key={step.id}
                    className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                      activeStep === index ? 'opacity-100 z-10' : 'opacity-0 z-0'
                    }`}
                    style={{
                      width: '100%',
                      height: '420px',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0
                    }}
                  >
                    <Image
                      src={step.image}
                      alt={`${step.title} - ${step.subtitle}`}
                      fill
                      quality={90}
                      className="object-cover"
                      sizes="(max-width: 1024px) 50vw, 600px"
                      style={{
                        objectFit: 'cover',
                        objectPosition: 'center center'
                      }}
                      onError={() => {
                        console.warn(`Image ${step.image} non trouvée`);
                      }}
                    />
                    {/* Overlay léger pour la lisibilité */}
                    <div className="absolute inset-0 bg-gradient-to-t from-surface-bg/20 to-transparent" />
                  </div>
                ))}
              </div>
            </div>

            {/* Colonne droite : Panneau de contenu avec cartes de fonctionnalités */}
            <div className="flex items-start">
              <div className="relative w-full">
                {journeySteps.map((step, index) => (
                  <div
                    key={step.id}
                    className={`transition-opacity duration-700 ease-in-out ${
                      activeStep === index
                        ? 'opacity-100 z-10 pointer-events-auto'
                        : 'opacity-0 z-0 pointer-events-none absolute top-0 left-0 w-full'
                    }`}
                    style={{
                      willChange: 'opacity',
                    }}
                  >
                    <div className="space-y-6 pr-4">
                      {/* Label étape */}
                      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs sm:text-sm font-medium">
                        Étape {step.stepNumber}/2
                      </div>

                      {/* Titre */}
                      <h2 className="text-4xl lg:text-5xl xl:text-6xl font-extrabold text-text-base">
                        {step.title}
                      </h2>

                      {/* Sous-titre */}
                      <p className="text-xl lg:text-2xl text-text-muted">
                        {step.subtitle}
                      </p>

                      {/* Description */}
                      {step.description && (
                        <p className="text-base lg:text-lg text-text-muted leading-relaxed">
                          {step.description}
                        </p>
                      )}

                      {/* 3 cartes de fonctionnalités */}
                      <div className="space-y-4 mt-8">
                        {step.featureCards && step.featureCards.map((featureCard, cardIndex) => (
                          <FeatureCard
                            key={cardIndex}
                            title={featureCard.title}
                            description={featureCard.description}
                            icon={featureCard.icon}
                            color={featureCard.color}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile : Carrousel horizontal avec scroll-snap */}
      <div className="md:hidden">
        <div
          className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide -mx-4 px-4"
          onScroll={handleCarouselScroll}
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none'
          }}
        >
          {journeySteps.map((step, index) => (
            <div
              key={step.id}
              className="flex-shrink-0 w-full snap-center px-4"
            >
              <div className="space-y-6">
                {/* Image (réduite de 20%) */}
                <div className="relative h-52 rounded-2xl overflow-hidden">
                  <Image
                    src={step.image}
                    alt={`${step.title} - ${step.subtitle}`}
                    fill
                    quality={85}
                    className="object-cover"
                    sizes="100vw"
                    onError={() => {
                      console.warn(`Image ${step.image} non trouvée`);
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-surface-bg/30 to-transparent" />
                </div>

                {/* Contenu */}
                <div className="space-y-4">
                  {/* Label étape */}
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs font-medium">
                    Étape {step.stepNumber}/2
                  </div>

                  {/* Titre */}
                  <h2 className="text-3xl font-extrabold text-text-base">
                    {step.title}
                  </h2>

                  {/* Sous-titre */}
                  <p className="text-lg text-text-muted">
                    {step.subtitle}
                  </p>

                  {/* Description */}
                  {step.description && (
                    <p className="text-sm text-text-muted leading-relaxed">
                      {step.description}
                    </p>
                  )}

                  {/* 3 cartes de fonctionnalités (mobile) */}
                  <div className="space-y-4 mt-6">
                    {step.featureCards && step.featureCards.map((featureCard, cardIndex) => (
                      <FeatureCard
                        key={cardIndex}
                        title={featureCard.title}
                        description={featureCard.description}
                        icon={featureCard.icon}
                        color={featureCard.color}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Indicateurs de progression mobile */}
        <div className="flex justify-center gap-2 mt-6">
          {journeySteps.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                const container = document.querySelector('[id="journey-showcase"] .md\\:hidden > div') as HTMLElement;
                if (container) {
                  container.scrollTo({
                    left: index * container.clientWidth,
                    behavior: 'smooth'
                  });
                }
              }}
              className={`transition-all duration-300 ${
                activeStep === index
                  ? 'w-8 h-2 bg-brand rounded-full'
                  : 'w-2 h-2 bg-surface-border rounded-full'
              }`}
              aria-label={`Aller à l'étape ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
