'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function BackgroundImage() {
  const [scrollY, setScrollY] = useState(0);
  const [isMounted, setIsMounted] = useState(false);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    // Appel initial pour avoir la valeur au chargement
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Calculer l'opacité : 
  // - Visible à 100% au début (scrollY = 0)
  // - Commence à disparaître après 100px de scroll
  // - Complètement invisible après 700px de scroll
  const imageOpacity = scrollY < 100 
    ? 1 
    : Math.max(0, 1 - (scrollY - 100) / 600);

  if (!isMounted) {
    return null;
  }

  // Ne pas afficher si l'image n'existe pas
  if (imageError) {
    return null;
  }

  return (
    <div 
      className="fixed inset-0 w-full h-full pointer-events-none"
      style={{ 
        zIndex: 0, // En arrière-plan, en dessous de tout
        opacity: imageOpacity,
        transition: 'opacity 0.3s ease-out'
      }}
    >
      <div
        className="absolute inset-0"
        style={{
          transform: `translateY(${-scrollY * 0.4}px) scale(1.15)`,
          willChange: 'transform',
        }}
      >
        <Image
          src="/Imagedefondsitemagellan.png"
          alt="Fond Magellan"
          fill
          priority
          quality={90}
          className="object-cover"
          sizes="100vw"
          style={{
            objectPosition: 'center center'
          }}
          onError={() => {
            console.warn('Image de fond Imagedefondsitemagellan.png non trouvée');
            setImageError(true);
          }}
        />
      </div>
      {/* Overlay sombre pour garder la lisibilité - plus léger au début */}
      <div 
        className="absolute inset-0 bg-gradient-to-b from-surface-bg/30 via-surface-bg/50 to-surface-bg/80"
        style={{
          opacity: Math.min(0.7, scrollY / 500) // Overlay augmente avec le scroll
        }}
      />
    </div>
  );
}











