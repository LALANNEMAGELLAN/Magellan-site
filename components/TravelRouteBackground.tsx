'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

/**
 * Composant d'animation d'arrière-plan avec carte du monde et itinéraire animé
 * S'affiche après le hero et s'anime au scroll
 * Style élégant inspiré Apple Vision Pro / Polarsteps / Airbnb
 */
export default function TravelRouteBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const heroRef = useRef<HTMLElement | null>(null);

  // Détecter quand on dépasse le hero - démarrer immédiatement
  useEffect(() => {
    const checkScroll = () => {
      // Trouver le hero par son ID
      const hero = document.getElementById('hero');
      if (hero) {
        heroRef.current = hero;
        const heroBottom = hero.offsetTop + hero.offsetHeight;
        // Afficher l'animation dès qu'on commence à quitter le hero (dès le début du scroll)
        if (window.scrollY > heroBottom - window.innerHeight) {
          setIsVisible(true);
        } else {
          setIsVisible(false);
        }
      }
    };

    // Vérifier immédiatement au montage
    checkScroll();
    window.addEventListener('scroll', checkScroll, { passive: true });
    return () => window.removeEventListener('scroll', checkScroll);
  }, []);

  // Calculer le progrès basé sur la position du scroll après le hero
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const hero = document.getElementById('hero');
      const scrollContainer = document.getElementById('scroll-container');
      
      if (hero && scrollContainer) {
        const heroBottom = hero.offsetTop + hero.offsetHeight;
        const scrollStart = heroBottom - window.innerHeight * 0.2;
        const scrollEnd = scrollContainer.offsetTop + scrollContainer.offsetHeight;
        const scrollRange = scrollEnd - scrollStart;
        
        if (scrollRange > 0) {
          const currentScroll = window.scrollY;
          const progress = Math.max(0, Math.min(1, (currentScroll - scrollStart) / scrollRange));
          setScrollProgress(progress);
        }
      }
    };

    updateProgress();
    window.addEventListener('scroll', updateProgress, { passive: true });
    return () => window.removeEventListener('scroll', updateProgress);
  }, []);

  // Opacité de la carte (max 15-20%)
  const mapOpacity = Math.min(0.15, scrollProgress * 0.5);
  
  // Progression de l'itinéraire (0 à 1)
  const routeProgress = Math.min(1, scrollProgress * 2);
  
  // Opacité de l'itinéraire
  const routeOpacity = scrollProgress > 0.1 ? Math.min(0.6, (scrollProgress - 0.1) * 0.6 / 0.1) : 0;
  
  // Opacité des waypoints (apparaissent progressivement)
  const waypoint1Opacity = scrollProgress > 0.2 ? Math.min(1, (scrollProgress - 0.2) / 0.1) : 0;
  const waypoint2Opacity = scrollProgress > 0.4 ? Math.min(1, (scrollProgress - 0.4) / 0.1) : 0;
  const waypoint3Opacity = scrollProgress > 0.6 ? Math.min(1, (scrollProgress - 0.6) / 0.1) : 0;
  const waypoint4Opacity = scrollProgress > 0.8 ? Math.min(1, (scrollProgress - 0.8) / 0.1) : 0;

  // Scale des waypoints (effet d'apparition)
  const waypoint1Scale = scrollProgress > 0.2 ? Math.min(1, 0.5 + (scrollProgress - 0.2) * 0.5 / 0.1) : 0.5;
  const waypoint2Scale = scrollProgress > 0.4 ? Math.min(1, 0.5 + (scrollProgress - 0.4) * 0.5 / 0.1) : 0.5;
  const waypoint3Scale = scrollProgress > 0.6 ? Math.min(1, 0.5 + (scrollProgress - 0.6) * 0.5 / 0.1) : 0.5;
  const waypoint4Scale = scrollProgress > 0.8 ? Math.min(1, 0.5 + (scrollProgress - 0.8) * 0.5 / 0.1) : 0.5;

  if (!isVisible) {
    return null;
  }

  return (
    <motion.div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none overflow-hidden"
      style={{ zIndex: 1 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: isVisible ? 1 : 0 }}
      transition={{ duration: 0.3 }}
      aria-hidden="true"
    >
      {/* Carte du monde stylisée (style minimaliste élégant) */}
      <motion.svg
        viewBox="0 0 1200 600"
        className="absolute inset-0 w-full h-full"
        animate={{ opacity: mapOpacity }}
        transition={{ duration: 0.3 }}
        preserveAspectRatio="xMidYMid meet"
      >
        {/* Fond de la carte (continents stylisés - style Apple/Polarsteps) */}
        <g opacity="0.4">
          {/* Europe (simplifié et élégant) */}
          <path
            d="M 200 200 Q 250 180 300 200 T 400 220 Q 450 210 500 220 L 520 250 L 480 280 L 400 270 L 350 260 L 300 250 L 250 240 Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-brand/30"
          />
          
          {/* Asie (simplifié et élégant) */}
          <path
            d="M 500 180 Q 600 170 700 180 T 850 200 Q 900 190 950 200 L 980 250 L 920 300 L 800 290 L 700 280 L 600 270 L 520 250 Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-brand/30"
          />
          
          {/* Amériques (simplifié et élégant) */}
          <path
            d="M 100 300 Q 120 280 150 300 T 200 320 Q 220 310 250 320 L 280 380 L 200 400 L 150 390 L 120 380 L 100 350 Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-brand/30"
          />
          
          {/* Océanie (simplifié et élégant) */}
          <path
            d="M 900 400 Q 920 390 950 400 T 1000 420 Q 1020 410 1050 420 L 1080 450 L 1040 480 L 980 470 L 950 460 L 920 450 Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-brand/30"
          />
        </g>
      </motion.svg>

      {/* Itinéraire animé */}
      <motion.svg
        viewBox="0 0 1200 600"
        className="absolute inset-0 w-full h-full"
        preserveAspectRatio="xMidYMid meet"
      >
        {/* Itinéraire principal (courbe Bezier élégante) */}
        <motion.path
          d="M 250 250 Q 400 200 550 220 T 850 240 Q 950 250 1000 280"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-brand/40"
          animate={{
            pathLength: routeProgress,
            opacity: routeOpacity,
          }}
          transition={{ duration: 0.1 }}
        />

        {/* Waypoint 1 - Paris (Europe) */}
        <motion.g
          animate={{
            opacity: waypoint1Opacity,
            scale: waypoint1Scale,
          }}
          style={{
            transformOrigin: '250px 250px',
          }}
          transition={{ duration: 0.3 }}
        >
          <circle
            cx="250"
            cy="250"
            r="8"
            fill="currentColor"
            className="text-brand"
            opacity="0.8"
          />
          <circle
            cx="250"
            cy="250"
            r="12"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="text-brand"
            opacity="0.4"
          />
        </motion.g>

        {/* Waypoint 2 - Istanbul (Europe/Asie) */}
        <motion.g
          animate={{
            opacity: waypoint2Opacity,
            scale: waypoint2Scale,
          }}
          style={{
            transformOrigin: '550px 220px',
          }}
          transition={{ duration: 0.3 }}
        >
          <circle
            cx="550"
            cy="220"
            r="8"
            fill="currentColor"
            className="text-accent"
            opacity="0.8"
          />
          <circle
            cx="550"
            cy="220"
            r="12"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="text-accent"
            opacity="0.4"
          />
        </motion.g>

        {/* Waypoint 3 - Tokyo (Asie) */}
        <motion.g
          animate={{
            opacity: waypoint3Opacity,
            scale: waypoint3Scale,
          }}
          style={{
            transformOrigin: '850px 240px',
          }}
          transition={{ duration: 0.3 }}
        >
          <circle
            cx="850"
            cy="240"
            r="8"
            fill="currentColor"
            className="text-brand"
            opacity="0.8"
          />
          <circle
            cx="850"
            cy="240"
            r="12"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="text-brand"
            opacity="0.4"
          />
        </motion.g>

        {/* Waypoint 4 - Sydney (Océanie) */}
        <motion.g
          animate={{
            opacity: waypoint4Opacity,
            scale: waypoint4Scale,
          }}
          style={{
            transformOrigin: '1000px 280px',
          }}
          transition={{ duration: 0.3 }}
        >
          <circle
            cx="1000"
            cy="280"
            r="8"
            fill="currentColor"
            className="text-accent"
            opacity="0.8"
          />
          <circle
            cx="1000"
            cy="280"
            r="12"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="text-accent"
            opacity="0.4"
          />
        </motion.g>
      </motion.svg>

      {/* Overlay de flou pour effet élégant */}
      <div
        className="absolute inset-0 backdrop-blur-[1px]"
        style={{ opacity: 0.2 }}
        aria-hidden="true"
      />
    </motion.div>
  );
}












