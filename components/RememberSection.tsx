'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import AnimatedTravelMap from './AnimatedTravelMap';
import AnimatedFeatureCard from './AnimatedFeatureCard';

// Icônes SVG pour les feature cards
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

/**
 * Section Remember refondue avec nouveau layout premium
 * - Animation d'itinéraire dynamique en arrière-plan
 * - Visuel principal à gauche (image immersive)
 * - Feature cards iOS-style à droite
 * - Animations fluides et transitions premium
 */
export default function RememberSection() {
  const featureCards = [
    {
      icon: <IconFolder className="w-6 h-6" />,
      title: 'Souvenirs intelligemment regroupés',
      description: 'Vos photos, notes et étapes sont classées automatiquement par dates, lieux et moments-clés.',
      color: 'bg-brand/10 text-brand',
      delay: 0.1,
      animationType: 'book' as const,
      figmaImage: 'book.png', // Image Figma pour cette carte (face avant)
      figmaImageBack: 'book-back.png', // Image Figma pour cette carte (face arrière)
    },
    {
      icon: <IconSparkles className="w-6 h-6" />,
      title: 'Récit interactif généré par l\'IA',
      description: 'En un clic, obtenez un récit animé de votre voyage : carte, anecdotes, temps forts, timeline.',
      color: 'bg-accent/10 text-accent',
      delay: 0.2,
      animationType: 'slideshow' as const,
      figmaImage: 'slideshow.png', // Image Figma pour cette carte (face avant)
      figmaImageBack: 'slideshow-back.png', // Image Figma pour cette carte (face arrière)
    },
    {
      icon: <IconChart className="w-6 h-6" />,
      title: 'Statistiques de voyage',
      description: 'Distance parcourue, pays visités, étapes, grands souvenirs : votre aventure résumée en chiffres.',
      color: 'bg-brand/10 text-brand',
      delay: 0.3,
      animationType: 'chart' as const,
      figmaImage: 'statistics.png', // Image Figma pour cette carte (face avant)
      figmaImageBack: 'statistics-back.png', // Image Figma pour cette carte (face arrière)
    },
  ];

  return (
    <section
      id="remember-section"
      className="relative py-16 sm:py-20 md:py-24 lg:py-32 min-h-screen flex items-center overflow-hidden"
      aria-labelledby="remember-heading"
    >
      {/* Animation d'itinéraire dynamique en arrière-plan */}
      <AnimatedTravelMap sectionId="remember-section" />

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
                id="remember-heading"
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-text-base leading-tight"
              >
                Remember
              </h2>
              <p className="text-lg sm:text-xl md:text-2xl text-text-muted leading-relaxed">
                Transformez vos souvenirs en histoire vivante.
              </p>
              <p className="text-base sm:text-lg text-text-muted/80 leading-relaxed">
                Magellan regroupe automatiquement vos photos, notes et lieux visités pour créer un récit interactif enrichi de statistiques, d'anecdotes et de vos moments les plus marquants.
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
                  src="/remember.jpg"
                  alt="Remember"
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

              {/* Badge "Étape 3/3" flottant */}
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
                Étape 3/3
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
                    section="remember"
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

