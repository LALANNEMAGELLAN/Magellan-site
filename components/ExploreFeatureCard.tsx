'use client';

import { motion } from 'framer-motion';
import { ReactNode, useState } from 'react';

/**
 * Feature Card style iOS avec animation flip pour la section Explore
 * Animation 3D flip au hover : face avant (icône + titre) → face arrière (description)
 * Design arrondi premium
 */
export default function ExploreFeatureCard({
  icon,
  title,
  description,
  color = 'bg-brand/10 text-brand',
  delay = 0,
}: {
  icon: ReactNode;
  title: string;
  description: string;
  color?: string;
  delay?: number;
}) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay, ease: [0.4, 0, 0.2, 1] }}
      className="relative h-48 sm:h-56"
      style={{ perspective: '1000px' }}
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
    >
      <motion.div
        className="relative w-full h-full"
        style={{
          transformStyle: 'preserve-3d',
        }}
        animate={{
          rotateY: isFlipped ? 180 : 0,
        }}
        transition={{
          duration: 0.7,
          ease: [0.4, 0, 0.2, 1],
        }}
      >
        {/* Face avant : Icône + Titre */}
        <div
          className="absolute inset-0 rounded-2xl border border-surface-border/50 bg-surface-card/80 backdrop-blur-sm p-6 flex flex-col items-center justify-center text-center cursor-pointer"
          style={{
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
          }}
        >
          <div className={`flex-shrink-0 inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-xl ${color} mb-4 transition-transform duration-300`}>
            {icon}
          </div>
          <h3 className="text-lg sm:text-xl font-semibold text-text-base leading-tight">
            {title}
          </h3>
        </div>

        {/* Face arrière : Description */}
        <div
          className="absolute inset-0 rounded-2xl border border-surface-border/50 bg-gradient-to-br from-brand/10 to-accent/10 backdrop-blur-sm p-6 flex flex-col items-center justify-center text-center cursor-pointer"
          style={{
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
          }}
        >
          <p className="text-sm sm:text-base text-text-muted leading-relaxed">
            {description}
          </p>
        </div>
      </motion.div>
    </motion.article>
  );
}

