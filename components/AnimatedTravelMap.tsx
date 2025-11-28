'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

/**
 * Composant d'animation d'itinéraire dynamique pour la section Explore
 * Style premium inspiré Polarsteps / Lyla / Mapiful
 * Animation fluide au scroll avec waypoints et fil conducteur lumineux
 */
export default function AnimatedTravelMap({ 
  sectionId = 'explore-section',
  className = '' 
}: { 
  sectionId?: string;
  className?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    let rafId: number | null = null;

    const updateVisibility = () => {
      const section = document.getElementById(sectionId);
      if (section) {
        const rect = section.getBoundingClientRect();
        const isInViewport = rect.top < window.innerHeight && rect.bottom > 0;
        setIsVisible(isInViewport);
      }
    };

    const updateProgress = () => {
      if (rafId) return;
      
      rafId = requestAnimationFrame(() => {
        const section = document.getElementById(sectionId);
        if (section) {
          const rect = section.getBoundingClientRect();
          const windowHeight = window.innerHeight;
          const sectionTop = rect.top;
          const sectionHeight = rect.height;
          
          // Calculer le progrès basé sur la position de la section dans le viewport
          // 0 = section en haut du viewport, 1 = section complètement passée
          const progress = Math.max(0, Math.min(1, 
            (windowHeight - sectionTop) / (windowHeight + sectionHeight)
          ));
          
          setScrollProgress(progress);
        }
        rafId = null;
      });
    };

    updateVisibility();
    updateProgress();
    
    window.addEventListener('scroll', updateVisibility, { passive: true });
    window.addEventListener('scroll', updateProgress, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', updateVisibility);
      window.removeEventListener('scroll', updateProgress);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [sectionId]);

  if (!isVisible) {
    return null;
  }

  // Opacité de la carte (subtile, max 20%)
  const mapOpacity = Math.min(0.2, scrollProgress * 0.4);
  
  // Progression de l'itinéraire (0 à 1)
  const routeProgress = Math.min(1, scrollProgress * 1.5);
  
  // Opacité du fil conducteur (apparaît progressivement)
  const routeOpacity = scrollProgress > 0.1 ? Math.min(0.7, (scrollProgress - 0.1) * 0.7 / 0.2) : 0;
  
  // Waypoints avec animation progressive
  const waypoints = [
    { progress: 0.2, x: 150, y: 200 },
    { progress: 0.4, x: 350, y: 150 },
    { progress: 0.6, x: 550, y: 250 },
    { progress: 0.8, x: 750, y: 180 },
  ];

  // Calculer les points de l'itinéraire (courbe de Bézier pour un effet fluide)
  const routePoints = waypoints.map((wp, index) => {
    const wpProgress = wp.progress;
    const isVisible = scrollProgress >= wpProgress;
    const scale = isVisible ? Math.min(1, (scrollProgress - wpProgress) * 5) : 0;
    
    return {
      ...wp,
      isVisible,
      scale,
      opacity: Math.min(1, scale * 1.2),
    };
  });

  // Générer le path SVG de l'itinéraire (courbe fluide)
  const generateRoutePath = () => {
    if (routePoints.length < 2) return '';
    
    const visiblePoints = routePoints.filter(p => p.isVisible);
    if (visiblePoints.length < 2) return '';
    
    let path = `M ${visiblePoints[0].x} ${visiblePoints[0].y}`;
    
    for (let i = 1; i < visiblePoints.length; i++) {
      const prev = visiblePoints[i - 1];
      const curr = visiblePoints[i];
      const midX = (prev.x + curr.x) / 2;
      const midY = (prev.y + curr.y) / 2;
      
      // Utiliser une courbe quadratique pour un effet fluide
      path += ` Q ${prev.x} ${prev.y} ${midX} ${midY}`;
      if (i === visiblePoints.length - 1) {
        path += ` T ${curr.x} ${curr.y}`;
      }
    }
    
    return path;
  };

  return (
    <motion.div
      ref={containerRef}
      className={`fixed inset-0 pointer-events-none overflow-hidden ${className}`}
      style={{ zIndex: 0 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: isVisible ? 1 : 0 }}
      transition={{ duration: 0.5 }}
      aria-hidden="true"
    >
      {/* Carte stylisée en arrière-plan */}
      <motion.svg
        viewBox="0 0 1000 500"
        className="absolute inset-0 w-full h-full"
        style={{ opacity: mapOpacity }}
        preserveAspectRatio="xMidYMid meet"
      >
        {/* Continents stylisés (simplifiés) */}
        <g opacity="0.3">
          {/* Europe */}
          <path
            d="M 200 150 Q 250 120 300 140 Q 350 160 400 150 Q 450 140 500 160 L 480 200 Q 450 220 400 210 Q 350 200 300 210 Q 250 220 200 200 Z"
            fill="currentColor"
            className="text-brand/30"
          />
          {/* Amérique du Nord */}
          <path
            d="M 100 100 Q 120 80 150 90 Q 180 100 200 95 Q 220 90 250 100 L 240 180 Q 220 200 200 190 Q 180 180 150 190 Q 120 200 100 180 Z"
            fill="currentColor"
            className="text-brand/30"
          />
          {/* Asie */}
          <path
            d="M 600 120 Q 700 100 800 130 Q 850 140 900 120 L 880 200 Q 850 220 800 210 Q 700 200 600 220 Z"
            fill="currentColor"
            className="text-brand/30"
          />
        </g>
      </motion.svg>

      {/* Itinéraire animé avec fil conducteur lumineux */}
      <motion.svg
        viewBox="0 0 1000 500"
        className="absolute inset-0 w-full h-full"
        style={{ opacity: routeOpacity }}
        preserveAspectRatio="xMidYMid meet"
      >
        {/* Fil conducteur lumineux (glow effect) */}
        <defs>
          <linearGradient id="routeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#0E7490" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#F59E0B" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#0E7490" stopOpacity="0.8" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        {/* Path de l'itinéraire */}
        <motion.path
          d={generateRoutePath()}
          fill="none"
          stroke="url(#routeGradient)"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          filter="url(#glow)"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: routeProgress }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        />
      </motion.svg>

      {/* Waypoints avec animation de pulsation */}
      <motion.svg
        viewBox="0 0 1000 500"
        className="absolute inset-0 w-full h-full"
        preserveAspectRatio="xMidYMid meet"
      >
        {routePoints.map((waypoint, index) => (
          <g key={index}>
            {/* Cercle de pulsation (effet glow) */}
            <motion.circle
              cx={waypoint.x}
              cy={waypoint.y}
              r="12"
              fill="currentColor"
              className="text-brand"
              opacity={waypoint.opacity * 0.3}
              animate={{
                scale: waypoint.isVisible ? [1, 1.5, 1] : 0,
                opacity: waypoint.isVisible ? [0.3, 0.1, 0.3] : 0,
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: index * 0.2,
              }}
            />
            {/* Point waypoint principal */}
            <motion.circle
              cx={waypoint.x}
              cy={waypoint.y}
              r="6"
              fill="currentColor"
              className="text-accent"
              initial={{ scale: 0, opacity: 0 }}
              animate={{
                scale: waypoint.scale,
                opacity: waypoint.opacity,
              }}
              transition={{
                duration: 0.5,
                ease: "easeOut",
                delay: index * 0.1,
              }}
            />
            {/* Point central (blanc) */}
            <motion.circle
              cx={waypoint.x}
              cy={waypoint.y}
              r="3"
              fill="white"
              initial={{ scale: 0, opacity: 0 }}
              animate={{
                scale: waypoint.scale,
                opacity: waypoint.opacity,
              }}
              transition={{
                duration: 0.3,
                ease: "easeOut",
                delay: index * 0.1 + 0.2,
              }}
            />
          </g>
        ))}
      </motion.svg>
    </motion.div>
  );
}

