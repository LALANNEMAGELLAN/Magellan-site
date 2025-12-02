'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import AnimatedTravelMap from './AnimatedTravelMap';
import AnimatedFeatureCard from './AnimatedFeatureCard';

// Icônes SVG pour les feature cards
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

/**
 * Section Explore refondue avec nouveau layout premium
 * - Animation d'itinéraire dynamique en arrière-plan
 * - Visuel principal à gauche (image immersive)
 * - Feature cards iOS-style à droite
 * - Animations fluides et transitions premium
 */
export default function ExploreSection() {
  const t = useTranslations('journey.explore');

  const featureCards = [
    {
      icon: <IconMap className="w-6 h-6" />,
      title: t('features.map.title'),
      description: t('features.map.description'),
      color: 'bg-brand/10 text-brand',
      delay: 0.1,
      animationType: 'map' as const,
      figmaImage: 'map.png', // Image Figma pour cette carte (face avant)
      figmaImageBack: 'map-back.png', // Image Figma pour cette carte (face arrière)
    },
    {
      icon: <IconLightbulb className="w-6 h-6" />,
      title: t('features.discoveries.title'),
      description: t('features.discoveries.description'),
      color: 'bg-accent/10 text-accent',
      delay: 0.2,
      animationType: 'lightbulb' as const,
      figmaImage: 'lightbulb.png', // Image Figma pour cette carte (face avant)
      figmaImageBack: 'lightbulb-back.png', // Image Figma pour cette carte (face arrière)
    },
    {
      icon: <IconGlobe className="w-6 h-6" />,
      title: t('features.inspirations.title'),
      description: t('features.inspirations.description'),
      color: 'bg-brand/10 text-brand',
      delay: 0.3,
      animationType: 'globe' as const,
      figmaImage: 'globe.png', // Image Figma pour cette carte (face avant)
      figmaImageBack: 'globe-back.png', // Image Figma pour cette carte (face arrière)
    },
  ];

  return (
    <section
      id="explore-section"
      className="relative py-16 sm:py-20 md:py-24 lg:py-32 min-h-screen flex items-center overflow-hidden"
      aria-labelledby="explore-heading"
    >
      {/* Animation d'itinéraire dynamique en arrière-plan */}
      <AnimatedTravelMap sectionId="explore-section" />

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-8 md:space-y-12">
          {/* Ligne avec titre et photo côte à côte */}
          <div className="grid md:grid-cols-2 gap-6 md:gap-8 lg:gap-12 items-start">
            {/* Colonne gauche : Titre et sous-titre */}
            <motion.header
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
              className="space-y-4"
            >
              <h2
                id="explore-heading"
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-text-base leading-tight"
              >
                {t('title')}
              </h2>
              <p className="text-lg sm:text-xl md:text-2xl text-text-muted leading-relaxed">
                {t('subtitle')}
              </p>
              <p className="text-base sm:text-lg text-text-muted/80 leading-relaxed whitespace-pre-line">
                {t('description')}
              </p>
            </motion.header>

            {/* Colonne droite : Visuel principal */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
              className="relative"
            >
              {/* Image immersive avec overlay dégradé */}
              <div className="relative aspect-[4/3] rounded-3xl overflow-hidden border border-surface-border/50 shadow-2xl">
                <Image
                  src="/explore.jpg"
                  alt={t('title')}
                  fill
                  priority
                  quality={90}
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
                {/* Overlay dégradé léger */}
                <div className="absolute inset-0 bg-gradient-to-t from-surface-bg/40 via-transparent to-transparent" />
                
                {/* Effet de brillance subtil */}
                <div className="absolute inset-0 bg-gradient-to-br from-brand/10 via-transparent to-accent/10 opacity-50" />
              </div>

              {/* Badge "Étape 1/3" flottant */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="absolute -top-4 -right-4 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/30 text-accent text-sm font-medium backdrop-blur-md shadow-lg"
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
                </span>
                {t('stepBadge')}
              </motion.div>
            </motion.div>
          </div>

          {/* Feature cards en dessous - disposition en grille avec taille agrandie */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 lg:gap-10 justify-items-center">
            {featureCards.map((card, index) => (
              <div key={index} className="w-full">
                <div style={{ transform: 'scale(1.1)', transformOrigin: 'center' }}>
                  <AnimatedFeatureCard
                    icon={card.icon}
                    title={card.title}
                    description={card.description}
                    color={card.color}
                    delay={card.delay}
                    animationType={card.animationType}
                    figmaImage={card.figmaImage}
                    figmaImageBack={card.figmaImageBack}
                    section="explore"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

