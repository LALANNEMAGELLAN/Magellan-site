'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import AnimatedTravelMap from './AnimatedTravelMap';
import AnimatedFeatureCard from './AnimatedFeatureCard';

// Icônes SVG pour les feature cards
const IconFolder = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
  </svg>
);

const IconChat = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
  </svg>
);

const IconShare = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
  </svg>
);

/**
 * Section Share refondue avec nouveau layout premium
 * - Animation d'itinéraire dynamique en arrière-plan
 * - Visuel principal à gauche (image immersive)
 * - Feature cards iOS-style à droite
 * - Animations fluides et transitions premium
 */
export default function ShareSection() {
  const t = useTranslations('journey.share');

  const featureCards = [
    {
      icon: <IconFolder className="w-6 h-6" />,
      title: t('features.album.title'),
      description: t('features.album.description'),
      color: 'bg-brand/10 text-brand',
      delay: 0.1,
      animationType: 'folder' as const,
      figmaImage: 'folder.png', // Image Figma pour cette carte (face avant)
      figmaImageBack: 'folder-back.png', // Image Figma pour cette carte (face arrière)
    },
    {
      icon: <IconChat className="w-6 h-6" />,
      title: t('features.chat.title'),
      description: t('features.chat.description'),
      color: 'bg-accent/10 text-accent',
      delay: 0.2,
      animationType: 'chat' as const,
      figmaImage: 'chat.png', // Image Figma pour cette carte (face avant)
      figmaImageBack: 'chat-back.png', // Image Figma pour cette carte (face arrière)
    },
    {
      icon: <IconShare className="w-6 h-6" />,
      title: t('features.share.title'),
      description: t('features.share.description'),
      color: 'bg-brand/10 text-brand',
      delay: 0.3,
      animationType: 'share' as const,
      figmaImage: 'share.png', // Image Figma pour cette carte (face avant)
      figmaImageBack: 'share-back.png', // Image Figma pour cette carte (face arrière)
    },
  ];

  return (
    <section
      id="share-section"
      className="relative py-16 sm:py-20 md:py-24 lg:py-32 min-h-screen flex items-center overflow-hidden"
      aria-labelledby="share-heading"
    >
      {/* Animation d'itinéraire dynamique en arrière-plan */}
      <AnimatedTravelMap sectionId="share-section" />

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
                id="share-heading"
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
                  src="/share.jpg"
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

              {/* Badge "Étape 2/3" flottant */}
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
                    section="share"
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

