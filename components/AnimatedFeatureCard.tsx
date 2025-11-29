'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { ReactNode, useState, useEffect } from 'react';
import Image from 'next/image';
import { useLocale } from 'next-intl';
import { Sparkles, Heart, Bookmark, MapPin, Plane, Folder, Plus, BookOpen, TrendingUp, Coffee, Camera, UtensilsCrossed, User, Clock, Image as ImageIcon, Calendar, FileText, Layers, Wand2, Film, ArrowRight } from 'lucide-react';
import { ImageWithFallback } from './ImageWithFallback';

// Composant pour l'icône avec fallback
function FolderIconWithFallback({ icon, className }: { icon: ReactNode; className?: string }) {
  const [imageError, setImageError] = useState(false);

  if (imageError) {
    return <div className={className || ''}>{icon}</div>;
  }

  return (
    <div className={className || ''}>
      <Image
        src="/cards/share/folder-icon.png"
        alt="Album partagé"
        width={48}
        height={48}
        className="w-full h-full object-contain"
        unoptimized
        onError={() => setImageError(true)}
      />
    </div>
  );
}

/**
 * Feature Card avec animation flip 3D
 * 
 * PRINCIPE SIMPLE :
 * - Face avant : image Figma PNG (statique)
 * - Face arrière : image Figma PNG (statique) avec animations en code
 * - Le flip utilise rotateY(180deg) qui inverse horizontalement
 * - Solution : scaleX(-1) sur le conteneur de la face arrière pour corriger l'inversion
 */
export default function AnimatedFeatureCard({
  icon,
  title,
  description,
  color = 'bg-brand/10 text-brand',
  delay = 0,
  animationType = 'default',
  figmaImage,
  figmaImageBack,
  section = 'explore',
}: {
  icon: ReactNode;
  title: string;
  description: string;
  color?: string;
  delay?: number;
  animationType?: 'map' | 'lightbulb' | 'globe' | 'folder' | 'chat' | 'share' | 'sparkles' | 'chart' | 'book' | 'slideshow' | 'default';
  figmaImage?: string;
  figmaImageBack?: string;
  section?: 'explore' | 'share' | 'remember';
}) {
  const [isFlipped, setIsFlipped] = useState(false);
  const locale = useLocale();
  const [imageError, setImageError] = useState(false);
  const [imageBackError, setImageBackError] = useState(false);

  // Fonction pour obtenir le chemin de l'image traduite
  // Format: map-en.png, map-es.png pour les langues autres que le français
  const getImagePath = (imageName: string | undefined, isBack: boolean = false): string | null => {
    if (!imageName) return null;
    
    // Pour le français, utiliser l'image par défaut
    if (locale === 'fr') {
      return `/cards/${section}/${imageName}`;
    }
    
    // Pour les autres langues, essayer de charger l'image traduite
    const nameWithoutExt = imageName.replace(/\.(png|jpg|jpeg)$/i, '');
    const ext = imageName.match(/\.(png|jpg|jpeg)$/i)?.[1] || 'png';
    const translatedImageName = `${nameWithoutExt}-${locale}.${ext}`;
    
    return `/cards/${section}/${translatedImageName}`;
  };

  const getDefaultImagePath = (imageName: string | undefined): string | null => {
    if (!imageName) return null;
    return `/cards/${section}/${imageName}`;
  };

  const figmaImagePath = getImagePath(figmaImage, false);
  const figmaImageBackPath = getImagePath(figmaImageBack, true);
  const defaultFigmaImagePath = getDefaultImagePath(figmaImage);
  const defaultFigmaImageBackPath = getDefaultImagePath(figmaImageBack);

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay, ease: [0.4, 0, 0.2, 1] }}
      className="relative w-full"
      style={{ 
        perspective: '1000px',
        aspectRatio: figmaImagePath ? '810 / 640' : undefined,
        height: figmaImagePath ? 'auto' : '12rem',
        minHeight: figmaImagePath ? 'auto' : '12rem',
      }}
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
    >
      <motion.div
        className="relative w-full h-full"
        style={{
          transformStyle: 'preserve-3d',
          height: '100%',
        }}
        animate={{
          rotateY: isFlipped ? 180 : 0,
        }}
        transition={{
          duration: 0.7,
          ease: [0.4, 0, 0.2, 1],
        }}
      >
        {/* FACE AVANT - PNG statique */}
        <div
          className="absolute inset-0 rounded-2xl cursor-pointer overflow-hidden"
          style={{
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
          }}
        >
          {figmaImagePath || defaultFigmaImagePath ? (
            <Image
              src={imageError && defaultFigmaImagePath ? defaultFigmaImagePath : (figmaImagePath || defaultFigmaImagePath || '')}
              alt={title}
              fill
              className="object-cover rounded-2xl"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
              unoptimized
              onError={() => {
                // Si l'image traduite n'existe pas, utiliser l'image par défaut
                if (!imageError && defaultFigmaImagePath) {
                  setImageError(true);
                }
              }}
            />
          ) : (
            <div className="h-full w-full rounded-2xl border border-surface-border/50 bg-surface-card/80 backdrop-blur-sm p-6 flex flex-col items-center justify-center text-center">
              <div className={`flex-shrink-0 inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-xl ${color} mb-4`}>
                {icon}
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-text-base leading-tight">
                {title}
              </h3>
            </div>
          )}
        </div>

        {/* FACE ARRIÈRE - PNG avec animations en code */}
        {/* IMPORTANT : scaleX(-1) corrige l'inversion créée par rotateY(180deg) */}
        <div
          className="absolute inset-0 rounded-2xl cursor-pointer"
          style={{
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            transform: 'rotateY(180deg) scaleX(-1)', // scaleX(-1) annule l'inversion de rotateY(180deg)
            overflow: (animationType === 'map' || animationType === 'globe' || animationType === 'book') ? 'visible' : 'hidden', // Permettre overflow visible pour map, globe et book
          }}
        >
          {figmaImageBackPath || defaultFigmaImageBackPath ? (
            <div className="relative w-full h-full bg-surface-card rounded-2xl">
              {/* Pour map, globe, chat, lightbulb, share, book et slideshow, on masque l'image PNG car l'animation est complète */}
              {animationType !== 'map' && animationType !== 'globe' && animationType !== 'chat' && animationType !== 'lightbulb' && animationType !== 'share' && animationType !== 'book' && animationType !== 'slideshow' && (
                <Image
                  src={imageBackError && defaultFigmaImageBackPath ? defaultFigmaImageBackPath : (figmaImageBackPath || defaultFigmaImageBackPath || '')}
                  alt={`${title} - Description`}
                  fill
                  className="object-cover rounded-2xl"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                  unoptimized
                  onError={() => {
                    // Si l'image traduite n'existe pas, utiliser l'image par défaut
                    if (!imageBackError && defaultFigmaImageBackPath) {
                      setImageBackError(true);
                    }
                  }}
                />
              )}
              {/* Animations personnalisées superposées sur l'image PNG */}
              {animationType === 'map' && isFlipped && (
                <DynamicMapAnimation />
              )}
              {animationType === 'lightbulb' && isFlipped && (
                <RadarAnimation />
              )}
              {animationType === 'globe' && isFlipped && (
                <TravelInspirationAnimation />
              )}
              {animationType === 'folder' && isFlipped && (
                <SharedAlbumAnimation />
              )}
              {animationType === 'book' && isFlipped && (
                <SmartMemoriesAnimation />
              )}
              {animationType === 'chat' && isFlipped && (
                <ChatAnimation />
              )}
              {animationType === 'share' && isFlipped && (
                <AIStoryAnimation />
              )}
              {animationType === 'slideshow' && isFlipped && (
                <SlideshowAnimation />
              )}
            </div>
          ) : (
            <div className="h-full w-full rounded-2xl border border-surface-border/50 bg-gradient-to-br from-brand/10 to-accent/10 backdrop-blur-sm p-6 flex flex-col items-center justify-center text-center">
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: isFlipped ? 1 : 0, y: isFlipped ? 0 : 10 }}
                transition={{ duration: 0.4, delay: 0.3 }}
                className="text-sm sm:text-base text-text-muted leading-relaxed"
              >
                {description}
              </motion.p>
            </div>
          )}
        </div>
      </motion.div>
    </motion.article>
  );
}

/**
 * Composants pour la carte map dynamique
 */
function DynamicMapCardFront() {
  return (
    <div className="absolute w-full h-full backface-hidden bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-8 flex flex-col items-center justify-center border border-slate-700">
      <div className="w-20 h-20 bg-blue-500/20 rounded-full flex items-center justify-center mb-6">
        <MapPin className="w-10 h-10 text-blue-400" />
      </div>
      <h3 className="text-white text-center mb-3">Carte Interactive</h3>
      <p className="text-slate-400 text-center text-sm">
        Visualisez votre itinéraire en temps réel
      </p>
    </div>
  );
}

function DynamicMapCardBack() {
  return (
    <div className="absolute w-full h-full backface-hidden bg-gradient-to-br from-blue-900 to-slate-900 rounded-2xl p-6 flex items-center justify-center border border-blue-700">
      <MapPulsatingPoints />
    </div>
  );
}

/**
 * Animation de points pulsants pour la carte interactive (map)
 * Les points pulsants sont superposés exactement sur les cercles colorés du design Figma
 * NOTE: Les positions doivent tenir compte de scaleX(-1) appliqué sur le parent
 */
function MapPulsatingPoints() {
  const cities = [
    { 
      name: 'Istanbul', 
      color: '#facc15', // Jaune
      top: '33%', 
      left: '15%',
      delay: 0.75 
    },
    { 
      name: 'Athènes', 
      color: '#f472b6', // Rose
      top: '38%', 
      left: '35%',
      delay: 0.5 
    },
    { 
      name: 'Rome', 
      color: '#a78bfa', // Violet
      top: '33%', 
      left: '55%',
      delay: 0.25 
    },
    { 
      name: 'Paris', 
      color: '#60a5fa', // Bleu
      top: '28%', 
      left: '75%',
      delay: 0 
    },
  ];

  return (
    <div className="absolute inset-0 pointer-events-none z-20">
      {cities.map((city, index) => (
        <CityPulse key={index} city={city} />
      ))}
    </div>
  );
}

function CityPulse({ city }: { city: { name: string; color: string; top: string; left: string; delay: number } }) {
  return (
    <>
      {/* Cercle d'expansion (onde de pulsation) */}
      <motion.div
        className="absolute rounded-full z-0"
        style={{
          top: city.top,
          left: city.left,
          width: '24px',
          height: '24px',
          border: `2px solid ${city.color}`,
          backgroundColor: 'transparent',
          opacity: 0.5,
          transform: 'translate(-50%, -50%)',
        }}
        animate={{
          scale: [1, 4, 1],
          opacity: [0.5, 0, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeOut' as const,
          times: [0, 0.125, 0.25],
          delay: city.delay,
        }}
      />
      
      {/* Glow autour du cercle Figma */}
      <motion.div
        className="absolute rounded-full z-10"
        style={{
          top: city.top,
          left: city.left,
          width: '24px',
          height: '24px',
          backgroundColor: 'transparent',
          boxShadow: `0 0 15px ${city.color}, 0 0 30px ${city.color}`,
          transform: 'translate(-50%, -50%)',
        }}
        animate={{
          scale: [1, 2.8, 1],
          opacity: [0.4, 0.9, 0.4],
          boxShadow: [
            `0 0 10px ${city.color}, 0 0 20px ${city.color}`,
            `0 0 30px ${city.color}, 0 0 60px ${city.color}, 0 0 90px ${city.color}`,
            `0 0 10px ${city.color}, 0 0 20px ${city.color}`,
          ],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut' as const,
          times: [0, 0.125, 0.25],
          delay: city.delay,
        }}
      />
    </>
  );
}

/**
 * Animation radar pour la carte lightbulb (découvertes autour de vous)
 * Affiche un radar avec des points d'intérêt positionnés radialement
 */
function RadarAnimation() {
  const spots = [
    { Icon: Coffee, label: "Café", angle: 45, distance: 60, color: "rgb(168, 85, 247)", delay: 0.5 },
    { Icon: Camera, label: "Monument", angle: 135, distance: 70, color: "rgb(59, 130, 246)", delay: 0.7 },
    { Icon: UtensilsCrossed, label: "Restaurant", angle: 240, distance: 55, color: "rgb(34, 197, 94)", delay: 0.9 },
    { Icon: MapPin, label: "Attraction", angle: 315, distance: 75, color: "rgb(236, 72, 153)", delay: 1.1 },
  ];

  return (
    <div
      className="absolute inset-0"
      style={{
        zIndex: 100,
        pointerEvents: 'none',
        transform: 'scaleX(-1)', // Corriger l'inversion causée par rotateY(180deg)
      }}
    >
      <div className="w-full h-full flex items-center justify-center relative overflow-hidden">
        {/* Radar waves */}
        {[1, 2, 3].map((wave) => (
          <motion.div
            key={wave}
            className="absolute w-32 h-32 border-2 border-green-500/30 rounded-full"
            initial={{ scale: 0, opacity: 0.6 }}
            animate={{ scale: [1, 2.5, 2.5], opacity: [0.6, 0.2, 0] }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: wave * 0.8,
              ease: "easeOut",
            }}
          />
        ))}

        {/* Center point - User icon */}
        <motion.div
          className="absolute w-10 h-10 bg-green-500 rounded-full flex items-center justify-center z-10 shadow-lg"
          animate={{
            scale: [1, 1.1, 1],
            boxShadow: [
              "0 0 0 0 rgba(34, 197, 94, 0.7)",
              "0 0 0 10px rgba(34, 197, 94, 0)",
              "0 0 0 0 rgba(34, 197, 94, 0)",
            ],
          }}
          transition={{ duration: 2, repeat: Infinity }}
          style={{ transform: 'translate(-50%, -50%)', left: '50%', top: '50%' }}
        >
          <User className="w-6 h-6 text-white" />
        </motion.div>

        {/* POI spots */}
        {spots.map((spot, index) => {
          const Icon = spot.Icon;
          const x = Math.cos((spot.angle * Math.PI) / 180) * spot.distance;
          const y = Math.sin((spot.angle * Math.PI) / 180) * spot.distance;

          return (
            <motion.div
              key={index}
              className="absolute"
              style={{ left: `calc(50% + ${x}px)`, top: `calc(50% + ${y}px)` }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: spot.delay, type: "spring", stiffness: 200 }}
            >
              <motion.div
                className="relative flex flex-col items-center"
                whileHover={{ scale: 1.1 }}
              >
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center shadow-lg"
                  style={{ backgroundColor: spot.color }}
                >
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <span 
                  className={`text-white text-xs font-medium ${
                    spot.label === "Restaurant" ? "mt-1 -ml-6" : "mt-1"
                  }`}
                  style={{
                    transform: spot.label === "Restaurant" ? "translateX(-28px)" : "none"
                  }}
                >
                  {spot.label}
                </span>
              </motion.div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

/**
 * Animation de carte dynamique pour la carte globe (inspirations de voyage)
 * Affiche un itinéraire de voyage animé avec des POI et des éléments géographiques
 */
function DynamicMapAnimation() {
  // Path points for the travel route with more curves
  const mainPath = "M30,140 Q70,80 120,100 Q170,120 220,80 Q270,50 290,70";

  // POI locations along the path
  const pois = [
    { x: 30, y: 140, label: "Paris", delay: 1, color: "rgb(59, 130, 246)", size: 12 },
    { x: 120, y: 100, label: "Rome", delay: 1.5, color: "rgb(168, 85, 247)", size: 10 },
    { x: 220, y: 80, label: "Athènes", delay: 2, color: "rgb(236, 72, 153)", size: 10 },
    { x: 290, y: 70, label: "Istanbul", delay: 2.5, color: "rgb(234, 179, 8)", size: 12 },
  ];

  // Geographic features (mountains, water)
  const mountains = [
    { points: "60,160 70,140 80,160", delay: 0.3 },
    { points: "140,170 155,145 170,170", delay: 0.5 },
    { points: "240,165 255,140 270,165", delay: 0.7 },
  ];

  const waterBodies = [
    { cx: 180, cy: 130, rx: 35, ry: 20, delay: 0.4 },
    { cx: 100, cy: 160, rx: 25, ry: 15, delay: 0.6 },
  ];

  return (
    <div 
      className="absolute inset-0 flex items-center justify-center p-4" 
      style={{ 
        zIndex: 100,
        pointerEvents: 'none',
        // Corriger l'inversion causée par le parent scaleX(-1)
        transform: 'scaleX(-1)',
      }}
    >
      {/* Picto avion en haut à gauche */}
      <motion.div
        className="absolute top-4 left-4 z-50"
        initial={{ opacity: 0, scale: 0, rotate: -45 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        transition={{ delay: 0.5, duration: 0.5, type: "spring" }}
      >
        <div className="bg-blue-500/20 backdrop-blur-sm rounded-full p-2 border border-blue-400/30">
          <Plane className="w-5 h-5 text-blue-400" />
        </div>
      </motion.div>
      
      <div className="w-full h-full flex items-center justify-center relative overflow-hidden">
        <svg 
          className="w-full h-full" 
          viewBox="0 0 320 200"
          preserveAspectRatio="xMidYMid meet"
        >
          {/* Background gradient */}
          <defs>
            <linearGradient id="mapGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgb(15, 23, 42)" stopOpacity="0.3" />
              <stop offset="100%" stopColor="rgb(30, 58, 138)" stopOpacity="0.2" />
            </linearGradient>
            
            <linearGradient id="pathGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgb(59, 130, 246)" />
              <stop offset="50%" stopColor="rgb(168, 85, 247)" />
              <stop offset="100%" stopColor="rgb(236, 72, 153)" />
            </linearGradient>

            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>

          <rect width="320" height="200" fill="url(#mapGradient)" />

          {/* Water bodies */}
          {waterBodies.map((water, index) => (
            <motion.ellipse
              key={`water-${index}`}
              cx={water.cx}
              cy={water.cy}
              rx={water.rx}
              ry={water.ry}
              fill="rgba(59, 130, 246, 0.15)"
              stroke="rgba(59, 130, 246, 0.3)"
              strokeWidth="1"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: water.delay, duration: 0.6 }}
            />
          ))}

          {/* Mountain ranges */}
          {mountains.map((mountain, index) => (
            <motion.polygon
              key={`mountain-${index}`}
              points={mountain.points}
              fill="rgba(148, 163, 184, 0.2)"
              stroke="rgba(148, 163, 184, 0.4)"
              strokeWidth="1"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: mountain.delay, duration: 0.5 }}
            />
          ))}

          {/* Animated route path */}
          <motion.path
            d={mainPath}
            fill="none"
            stroke="url(#pathGradient)"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
            filter="url(#glow)"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 2.5, ease: "easeInOut" }}
          />

          {/* POI markers */}
          {pois.map((poi, index) => (
            <motion.g
              key={index}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: poi.delay, duration: 0.4, type: "spring" }}
            >
              <circle
                cx={poi.x}
                cy={poi.y}
                r={poi.size}
                fill={poi.color}
                stroke="white"
                strokeWidth="3"
              />
              <motion.text
                x={poi.x}
                y={poi.y - 22}
                textAnchor="middle"
                fill="white"
                fontSize="11"
              >
                {poi.label}
              </motion.text>
            </motion.g>
          ))}
        </svg>
      </div>
    </div>
  );
}

/**
 * Animation d'inspirations de voyage pour la carte globe
 * Affiche un carrousel de destinations qui défile automatiquement avec AnimatePresence
 */
function TravelInspirationAnimation() {
  const destinations = [
    { 
      name: "Tokyo", 
      country: "Japon", 
      image: "https://images.unsplash.com/photo-1526481280693-3bfa7568e0f3?w=400",
      tag: "Tendance",
      color: "rgb(239, 68, 68)",
      icon: TrendingUp
    },
    { 
      name: "Santorin", 
      country: "Grèce", 
      image: "https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?w=400",
      tag: "Romantique",
      color: "rgb(236, 72, 153)",
      icon: Heart
    },
    { 
      name: "Bali", 
      country: "Indonésie", 
      image: "https://images.unsplash.com/photo-1704253411612-e4deb715dcd8?w=400",
      tag: "Spirituel",
      color: "rgb(34, 197, 94)",
      icon: Sparkles
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % destinations.length);
    }, 2500);

    return () => clearInterval(interval);
  }, [destinations.length]);

  const currentDest = destinations[currentIndex];
  const Icon = currentDest.icon;

  return (
    <div
      className="absolute inset-0 flex items-center justify-center"
      style={{
        zIndex: 100,
        pointerEvents: 'none',
        transform: 'scaleX(-1)', // Corriger l'inversion causée par rotateY(180deg)
      }}
    >
      <div className="w-full h-full flex items-center justify-center relative overflow-hidden">
        <div className="relative w-full h-full flex items-center justify-center p-4">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={currentIndex}
              custom={direction}
              className="absolute w-full max-w-[280px] h-[180px]"
              initial={{ x: 300, opacity: 0, scale: 0.8 }}
              animate={{ x: 0, opacity: 1, scale: 1 }}
              exit={{ x: -300, opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.7, ease: "easeInOut" }}
            >
              <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl border-2 border-white/10">
                <ImageWithFallback
                  src={currentDest.image}
                  alt={currentDest.name}
                  className="w-full h-full object-cover"
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                
                <motion.div
                  className="absolute top-3 right-3 flex items-center gap-1.5 px-3 py-1.5 rounded-full backdrop-blur-md"
                  style={{ 
                    backgroundColor: `${currentDest.color}20`,
                    border: `1.5px solid ${currentDest.color}`,
                  }}
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.3, type: "spring" }}
                >
                  <Icon className="w-3 h-3" style={{ color: currentDest.color }} />
                  <span className="text-white text-xs font-semibold">{currentDest.tag}</span>
                </motion.div>

                <motion.div
                  className="absolute bottom-4 left-4 right-4 text-white"
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <MapPin className="w-4 h-4 text-blue-400" />
                    <h3 className="font-bold text-lg">{currentDest.name}</h3>
                  </div>
                  <p className="text-slate-300 text-sm">{currentDest.country}</p>
                </motion.div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Pagination dots */}
        <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex gap-2 z-10">
          {destinations.map((dest, index) => (
            <motion.div
              key={index}
              className="h-1.5 rounded-full transition-all duration-300"
              style={{
                width: index === currentIndex ? "24px" : "6px",
                backgroundColor: index === currentIndex ? dest.color : "rgba(255, 255, 255, 0.3)",
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

/**
 * Animation d'album partagé pour la carte folder (album collaboratif)
 * Affiche un album central avec des contributeurs qui ajoutent leurs photos
 */
function SharedAlbumAnimation() {
  // Les contributeurs et leurs photos
  const contributors = [
    { 
      id: 1, 
      name: "Marie", 
      initial: "M",
      color: "bg-pink-500",
      photoUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=200&h=200&fit=crop",
      startPos: { x: -120, y: -80 },
      photoDelay: 0.8,
      gridPos: { x: 0, y: 0 }
    },
    { 
      id: 2, 
      name: "Tom", 
      initial: "T",
      color: "bg-blue-500",
      photoUrl: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=200&h=200&fit=crop",
      startPos: { x: 120, y: -80 },
      photoDelay: 1.2,
      gridPos: { x: 60, y: 0 }
    },
    { 
      id: 3, 
      name: "Sophie", 
      initial: "S",
      color: "bg-purple-500",
      photoUrl: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=200&h=200&fit=crop",
      startPos: { x: -120, y: 80 },
      photoDelay: 1.6,
      gridPos: { x: 0, y: 55 }
    },
    { 
      id: 4, 
      name: "Alex", 
      initial: "A",
      color: "bg-green-500",
      photoUrl: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=200&h=200&fit=crop",
      startPos: { x: 120, y: 80 },
      photoDelay: 2.0,
      gridPos: { x: 60, y: 55 }
    },
  ];

  return (
    <div 
      className="absolute inset-0 flex items-center justify-center"
      style={{
        zIndex: 100,
        pointerEvents: 'none',
        transform: 'scaleX(-1)', // Corriger l'inversion causée par rotateY(180deg)
      }}
    >
      <div className="w-full h-full flex items-center justify-center relative">
        {/* Album central */}
        <motion.div
          className="relative w-[140px] h-[140px] bg-slate-700 rounded-xl shadow-2xl border-4 border-slate-600 flex flex-col items-center justify-center"
          initial={{ scale: 0, rotate: -90 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 0.5, type: "spring" }}
        >
          {/* Icône folder */}
          <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: 0 }}
            transition={{ delay: 0.6, duration: 0.3 }}
          >
            <Folder className="w-12 h-12 text-slate-500 mb-2" />
            <p className="text-slate-400 text-xs">Album Voyage</p>
          </motion.div>

          {/* Grille de photos qui se remplissent */}
          <div className="absolute inset-2 grid grid-cols-2 gap-1">
            {contributors.map((contributor) => (
              <motion.div
                key={contributor.id}
                className="relative bg-slate-600 rounded overflow-hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: contributor.photoDelay + 0.3 }}
              >
                <ImageWithFallback
                  src={contributor.photoUrl}
                  alt={`Photo de ${contributor.name}`}
                  className="w-full h-full object-cover"
                />
                
                {/* Badge de l'auteur sur chaque photo */}
                <motion.div
                  className={`absolute bottom-0.5 right-0.5 w-4 h-4 ${contributor.color} rounded-full flex items-center justify-center text-white text-[8px] border border-white`}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: contributor.photoDelay + 0.5, type: "spring" }}
                >
                  {contributor.initial}
                </motion.div>
              </motion.div>
            ))}
          </div>

          {/* Label "Album partagé" */}
          <motion.div
            className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 px-3 py-1 bg-blue-600 rounded-full shadow-lg whitespace-nowrap"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.5 }}
          >
            <span className="text-white text-xs">Album partagé</span>
          </motion.div>
        </motion.div>

        {/* Avatars des contributeurs autour */}
        {contributors.map((contributor) => (
          <div key={`avatar-${contributor.id}`}>
            {/* Avatar */}
            <motion.div
              className={`absolute w-10 h-10 ${contributor.color} rounded-full flex items-center justify-center text-white border-2 border-white shadow-lg z-10`}
              style={{
                left: `calc(50% + ${contributor.startPos.x}px)`,
                top: `calc(50% + ${contributor.startPos.y}px)`,
                transform: 'translate(-50%, -50%)'
              }}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3 + contributor.id * 0.1, type: "spring" }}
            >
              {contributor.initial}
            </motion.div>

            {/* Mini photo qui vole de l'avatar vers l'album */}
            <motion.div
              className="absolute w-12 h-12 bg-white rounded shadow-xl overflow-hidden border-2 border-white z-20"
              style={{
                left: `calc(50% + ${contributor.startPos.x}px)`,
                top: `calc(50% + ${contributor.startPos.y}px)`,
              }}
              initial={{ 
                x: 0,
                y: 0,
                scale: 0,
                opacity: 0
              }}
              animate={{ 
                x: -contributor.startPos.x + contributor.gridPos.x - 50,
                y: -contributor.startPos.y + contributor.gridPos.y - 50,
                scale: [0, 1, 0.3],
                opacity: [0, 1, 0]
              }}
              transition={{ 
                delay: contributor.photoDelay,
                duration: 0.8,
                ease: "easeInOut"
              }}
            >
              <ImageWithFallback
                src={contributor.photoUrl}
                alt={`Photo de ${contributor.name}`}
                className="w-full h-full object-cover"
              />
            </motion.div>

            {/* Icône + au moment de l'ajout */}
            <motion.div
              className={`absolute w-6 h-6 ${contributor.color} rounded-full flex items-center justify-center border-2 border-white shadow-lg`}
              style={{
                left: `calc(50% + ${contributor.startPos.x}px + 15px)`,
                top: `calc(50% + ${contributor.startPos.y}px - 15px)`,
                transform: 'translate(-50%, -50%)'
              }}
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: [0, 1.3, 1], rotate: 0 }}
              transition={{ delay: contributor.photoDelay - 0.2, duration: 0.4 }}
            >
              <Plus className="w-4 h-4 text-white" strokeWidth={3} />
            </motion.div>

            {/* Ligne de connexion */}
            <svg
              className="absolute left-1/2 top-1/2 pointer-events-none"
              style={{
                width: '300px',
                height: '300px',
                transform: 'translate(-50%, -50%)',
                overflow: 'visible'
              }}
            >
              <motion.line
                x1="150"
                y1="150"
                x2={150 + contributor.startPos.x}
                y2={150 + contributor.startPos.y}
                stroke="rgba(59, 130, 246, 0.3)"
                strokeWidth="2"
                strokeDasharray="4 4"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ delay: contributor.photoDelay - 0.3, duration: 0.5 }}
              />
            </svg>
          </div>
        ))}

        {/* Texte explicatif en haut */}
        <motion.div
          className="absolute -top-10 left-1/2 transform -translate-x-1/2 text-center"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <p className="text-slate-300 text-sm">Chacun ajoute ses photos</p>
        </motion.div>
      </div>
    </div>
  );
}

/**
 * Animation de carnet de voyage intelligent
 * Montre l'organisation automatique des souvenirs (photos, notes, lieux) par destination et date
 */
function SmartMemoriesAnimation() {
  const [stage, setStage] = useState(0);
  const [organizedItems, setOrganizedItems] = useState<number[]>([]);

  const memoryItems = [
    {
      id: 1, type: "photo", location: "Paris", date: "15 Oct",
      image: "https://images.unsplash.com/photo-1431274172761-fca41d930114?w=300",
      color: "rgb(59, 130, 246)",
      scatteredPos: { x: -80, y: -40, rotate: -25 },
    },
    {
      id: 2, type: "note", location: "Paris", date: "15 Oct",
      text: "Tour Eiffel", color: "rgb(59, 130, 246)",
      scatteredPos: { x: -60, y: 50, rotate: 15 },
    },
    {
      id: 3, type: "photo", location: "Tokyo", date: "22 Oct",
      image: "https://images.unsplash.com/photo-1526481280693-3bfa7568e0f3?w=300",
      color: "rgb(168, 85, 247)",
      scatteredPos: { x: 70, y: -60, rotate: 30 },
    },
    {
      id: 4, type: "location", location: "Tokyo", date: "22 Oct",
      text: "Shibuya", color: "rgb(168, 85, 247)",
      scatteredPos: { x: 90, y: 20, rotate: -20 },
    },
  ];

  const groupedMemories = [
    { 
      location: "Paris", 
      date: "15 Oct 2024", 
      color: "rgb(59, 130, 246)",
      items: memoryItems.filter(item => item.location === "Paris"),
      photosCount: 24,
    },
    { 
      location: "Tokyo", 
      date: "22 Oct 2024", 
      color: "rgb(168, 85, 247)",
      items: memoryItems.filter(item => item.location === "Tokyo"),
      photosCount: 42,
    },
  ];

  useEffect(() => {
    const scatteredTimer = setTimeout(() => setStage(1), 1500);
    
    if (stage === 1) {
      memoryItems.forEach((_, index) => {
        setTimeout(() => {
          setOrganizedItems(prev => [...prev, index]);
          if (index === memoryItems.length - 1) {
            setTimeout(() => setStage(2), 1000);
          }
        }, index * 300);
      });
    }
    
    if (stage === 2) {
      const restartTimer = setTimeout(() => {
        setStage(0);
        setOrganizedItems([]);
      }, 2500);
      return () => clearTimeout(restartTimer);
    }
    
    return () => clearTimeout(scatteredTimer);
  }, [stage]);

  return (
    <div 
      className="absolute inset-0 flex items-center justify-center"
      style={{
        zIndex: 100,
        pointerEvents: 'none',
        transform: 'scaleX(-1)', // Corriger l'inversion causée par rotateY(180deg)
      }}
    >
      <div className="w-full h-full flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        {/* AI Badge */}
        <motion.div
          className="absolute top-4 right-4 flex items-center gap-2 px-3 py-1.5 bg-blue-500/20 backdrop-blur-md rounded-full border border-blue-400/30"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <Sparkles className="w-3 h-3 text-blue-400" />
          <span className="text-xs text-blue-400 font-semibold">
            {stage === 0 ? "Analyse..." : stage === 1 ? "Organisation..." : "Carnet créé"}
          </span>
        </motion.div>

        <div className="relative w-full h-full flex items-center justify-center">
          <AnimatePresence mode="wait">
            {/* Scattered items */}
            {stage <= 1 && (
              <motion.div key="scattered" className="absolute inset-0 flex items-center justify-center">
                {memoryItems.map((item, index) => {
                  const isOrganized = organizedItems.includes(index);
                  return (
                    <motion.div
                      key={item.id}
                      className="absolute"
                      animate={{
                        x: isOrganized ? 0 : item.scatteredPos.x,
                        y: isOrganized ? 0 : item.scatteredPos.y,
                        opacity: isOrganized ? 0 : 1,
                      }}
                    >
                      {item.type === "photo" ? (
                        <div className="w-16 h-16 rounded-lg overflow-hidden border-2 border-white/20">
                          <ImageWithFallback src={item.image!} alt={item.location} className="w-full h-full object-cover" />
                        </div>
                      ) : (
                        <div className="w-16 h-16 rounded-lg border border-white/20 backdrop-blur-sm flex items-center justify-center" style={{ backgroundColor: `${item.color}15` }}>
                          <FileText className="w-6 h-6" style={{ color: item.color }} />
                        </div>
                      )}
                    </motion.div>
                  );
                })}
              </motion.div>
            )}

            {/* Organized journal */}
            {stage === 2 && (
              <motion.div key="organized" className="relative w-full max-w-[320px] px-4">
                <div className="space-y-3">
                  {groupedMemories.map((group, groupIndex) => (
                    <motion.div
                      key={group.location}
                      className="relative bg-slate-800/60 backdrop-blur-md rounded-xl border border-slate-700/50 p-3"
                      initial={{ x: -50, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <MapPin className="w-4 h-4" style={{ color: group.color }} />
                        <h4 className="text-white text-sm">{group.location}</h4>
                      </div>
                      <div className="flex items-center gap-3 text-xs text-slate-400 mb-2">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" style={{ color: group.color }} />
                          <span>{group.date}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <ImageIcon className="w-3 h-3" style={{ color: group.color }} />
                          <span>{group.photosCount} photo{group.photosCount > 1 ? 's' : ''}</span>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        {group.items.map(item => (
                          <div key={item.id} className="w-12 h-12 rounded-lg overflow-hidden">
                            {item.type === "photo" && <ImageWithFallback src={item.image!} alt="" className="w-full h-full object-cover" />}
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

/**
 * Animation de chat avec messages et indicateur de frappe
 * Affiche des messages de chat qui apparaissent progressivement avec un indicateur de frappe animé
 */
function ChatAnimation() {
  const messages = [
    { id: 1, text: "On se retrouve où ?", sender: "left", color: "bg-blue-500", delay: 0.5 },
    { id: 2, text: "Au café près de la tour", sender: "right", color: "bg-purple-500", delay: 1 },
    { id: 3, text: "J'arrive dans 10 min !", sender: "left", color: "bg-blue-500", delay: 1.5 },
  ];

  return (
    <div
      className="absolute inset-0"
      style={{
        zIndex: 100,
        pointerEvents: 'none',
        transform: 'scaleX(-1)', // Corriger l'inversion causée par rotateY(180deg)
      }}
    >
      <div className="w-full h-full flex flex-col justify-center p-6 gap-3">
        {messages.map((message) => (
          <motion.div
            key={message.id}
            className={`flex ${message.sender === "right" ? "justify-end" : "justify-start"}`}
            initial={{ x: message.sender === "right" ? 50 : -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: message.delay, type: "spring", stiffness: 200 }}
          >
            <div className={`${message.color} text-white px-4 py-2 rounded-2xl max-w-[70%] shadow-lg`}>
              <p className="text-sm">{message.text}</p>
            </div>
          </motion.div>
        ))}

        {/* Typing indicator */}
        <motion.div
          className="flex justify-start"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
        >
          <div className="bg-slate-700 px-4 py-2 rounded-2xl flex items-center gap-1">
            {[0, 1, 2].map((dot) => (
              <motion.div
                key={dot}
                className="w-2 h-2 bg-slate-400 rounded-full"
                animate={{ y: [0, -5, 0] }}
                transition={{
                  duration: 0.6,
                  repeat: Infinity,
                  delay: dot * 0.2,
                }}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

/**
 * Animation d'export de médias (slideshow/album)
 * Affiche le processus d'export avec choix du format, conforme au design Figma
 */
function SlideshowAnimation() {
  const [step, setStep] = useState(1);
  const [outputChoice, setOutputChoice] = useState<'slideshow' | 'book' | null>(null);

  useEffect(() => {
    const timeline = [
      { time: 0, stepValue: 1, output: null },
      { time: 2000, stepValue: 2, output: null },
      { time: 3500, stepValue: 3, output: null },
      { time: 5000, stepValue: 4, output: 'slideshow' },
      { time: 7000, stepValue: 1, output: null },
      { time: 9000, stepValue: 2, output: null },
      { time: 10500, stepValue: 3, output: null },
      { time: 12000, stepValue: 4, output: 'book' },
      { time: 14000, stepValue: 1, output: null },
    ];

    let currentIndex = 0;

    const interval = setInterval(() => {
      currentIndex = (currentIndex + 1) % timeline.length;
      const current = timeline[currentIndex];
      setStep(current.stepValue);
      setOutputChoice(current.output as 'slideshow' | 'book' | null);
    }, timeline[1].time - timeline[0].time);

    return () => clearInterval(interval);
  }, []);

  const photos = [
    "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=300",
    "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=300",
    "https://images.unsplash.com/photo-1503220317375-aaad61436b1b?w=300",
  ];

  return (
    <div
      className="absolute inset-0"
      style={{
        zIndex: 100,
        pointerEvents: 'none',
        transform: 'scaleX(-1)', // Corriger l'inversion causée par rotateY(180deg)
      }}
    >
      <div className="w-full h-full flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6">
        {/* Étape 1: Photos arrivent */}
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step1"
              className="flex flex-col items-center gap-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {/* Label */}
              <motion.div
                className="flex items-center gap-2 px-4 py-2 bg-blue-500/20 border border-blue-500/50 rounded-full"
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <ImageIcon className="w-4 h-4 text-blue-400" />
                <span className="text-blue-300 text-sm">Vos photos</span>
              </motion.div>

              {/* Photos grid */}
              <div className="grid grid-cols-3 gap-3">
                {photos.map((photo, index) => (
                  <motion.div
                    key={index}
                    className="w-16 h-16 rounded-lg overflow-hidden shadow-lg border-2 border-slate-600"
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: 0.3 + index * 0.15, type: "spring" }}
                  >
                    <ImageWithFallback
                      src={photo}
                      alt={`Photo ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Étape 2: Montage / Processing */}
          {step === 2 && (
            <motion.div
              key="step2"
              className="flex flex-col items-center gap-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {/* Label */}
              <motion.div
                className="flex items-center gap-2 px-4 py-2 bg-purple-500/20 border border-purple-500/50 rounded-full"
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
              >
                <Wand2 className="w-4 h-4 text-purple-400" />
                <span className="text-purple-300 text-sm">Traitement IA</span>
              </motion.div>

              {/* Processing animation */}
              <div className="relative w-48 h-32 bg-slate-800/50 rounded-xl border border-slate-700 overflow-hidden">
                {/* Photos stacking */}
                <div className="absolute inset-0 flex items-center justify-center">
                  {photos.map((photo, index) => (
                    <motion.div
                      key={index}
                      className="absolute w-24 h-24 rounded-lg overflow-hidden shadow-xl border-2 border-purple-500/50"
                      initial={{ x: (index - 1) * 60, y: 0, scale: 0.8, opacity: 0.7 }}
                      animate={{ 
                        x: 0, 
                        y: 0, 
                        scale: 1,
                        opacity: 1,
                        zIndex: index,
                      }}
                      transition={{ 
                        delay: index * 0.2,
                        duration: 0.5,
                        repeat: Infinity,
                        repeatDelay: 0.8
                      }}
                    >
                      <ImageWithFallback
                        src={photo}
                        alt={`Photo ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </motion.div>
                  ))}
                </div>

                {/* Sparkles effect */}
                {[...Array(6)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-2 h-2 bg-purple-400 rounded-full"
                    style={{
                      left: `${20 + Math.random() * 60}%`,
                      top: `${20 + Math.random() * 60}%`,
                    }}
                    animate={{
                      scale: [0, 1, 0],
                      opacity: [0, 1, 0],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      delay: i * 0.2,
                    }}
                  />
                ))}
              </div>
            </motion.div>
          )}

          {/* Étape 3: Choix du format */}
          {step === 3 && (
            <motion.div
              key="step3"
              className="flex flex-col items-center gap-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {/* Label */}
              <motion.div
                className="flex items-center gap-2 px-4 py-2 bg-slate-600/30 border border-slate-500/50 rounded-full mb-2"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
              >
                <span className="text-slate-300 text-sm">Choisissez votre format</span>
              </motion.div>

              {/* Two options */}
              <div className="flex gap-6">
                {/* Slide Show option */}
                <motion.div
                  className="flex flex-col items-center gap-2 p-4 bg-gradient-to-br from-pink-500/20 to-purple-500/20 border border-pink-500/40 rounded-xl cursor-pointer"
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  whileHover={{ scale: 1.05 }}
                  transition={{ delay: 0.1 }}
                >
                  <div className="w-12 h-12 bg-pink-500/30 rounded-full flex items-center justify-center">
                    <Film className="w-6 h-6 text-pink-300" />
                  </div>
                  <span className="text-pink-200 text-xs">Slide Show</span>
                </motion.div>

                {/* Album option */}
                <motion.div
                  className="flex flex-col items-center gap-2 p-4 bg-gradient-to-br from-amber-500/20 to-orange-500/20 border border-amber-500/40 rounded-xl cursor-pointer"
                  initial={{ x: 50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  whileHover={{ scale: 1.05 }}
                  transition={{ delay: 0.1 }}
                >
                  <div className="w-12 h-12 bg-amber-500/30 rounded-full flex items-center justify-center">
                    <BookOpen className="w-6 h-6 text-amber-300" />
                  </div>
                  <span className="text-amber-200 text-xs">Album Photo</span>
                </motion.div>
              </div>
            </motion.div>
          )}

          {/* Étape 4: Export final */}
          {step === 4 && outputChoice && (
            <motion.div
              key={`step4-${outputChoice}`}
              className="flex flex-col items-center gap-4"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
            >
              {outputChoice === 'slideshow' ? (
                <>
                  {/* Slide Show export */}
                  <motion.div
                    className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-pink-500/30 to-purple-500/30 border border-pink-500/50 rounded-full mb-2"
                    initial={{ y: -20 }}
                    animate={{ y: 0 }}
                  >
                    <Film className="w-4 h-4 text-pink-300" />
                    <span className="text-pink-200 text-sm">Slide Show exporté !</span>
                  </motion.div>

                  <motion.div
                    className="relative w-28 h-48 bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl border-4 border-pink-500/50 shadow-2xl overflow-hidden"
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    {/* Vertical video preview */}
                    <div className="absolute inset-1 bg-black rounded-2xl overflow-hidden">
                      <ImageWithFallback
                        src={photos[0]}
                        alt="Slide Show preview"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                      
                      {/* Play button */}
                      <motion.div
                        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        <div className="w-12 h-12 bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center">
                          <div className="w-0 h-0 border-l-8 border-l-white border-t-6 border-t-transparent border-b-6 border-b-transparent ml-1" />
                        </div>
                      </motion.div>
                    </div>

                    {/* Success checkmark */}
                    <motion.div
                      className="absolute -top-3 -right-3 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center shadow-lg"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.4, type: "spring" }}
                    >
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </motion.div>
                  </motion.div>
                </>
              ) : (
                <>
                  {/* Book export */}
                  <motion.div
                    className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-500/30 to-orange-500/30 border border-amber-500/50 rounded-full mb-2"
                    initial={{ y: -20 }}
                    animate={{ y: 0 }}
                  >
                    <BookOpen className="w-4 h-4 text-amber-300" />
                    <span className="text-amber-200 text-sm">Album créé !</span>
                  </motion.div>

                  <motion.div
                    className="relative"
                    initial={{ y: 50, opacity: 0, rotateY: -30 }}
                    animate={{ y: 0, opacity: 1, rotateY: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    {/* Book */}
                    <div className="w-44 h-32 bg-gradient-to-br from-amber-100 to-amber-50 rounded-r-xl shadow-2xl border-r-4 border-amber-300 relative">
                      <div className="absolute inset-3 grid grid-cols-3 gap-1.5">
                        {photos.map((photo, index) => (
                          <motion.div
                            key={index}
                            className="rounded overflow-hidden shadow-md"
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.4 + index * 0.1 }}
                          >
                            <ImageWithFallback
                              src={photo}
                              alt={`Photo ${index + 1}`}
                              className="w-full h-full object-cover"
                            />
                          </motion.div>
                        ))}
                      </div>
                      
                      {/* Book spine */}
                      <div className="absolute left-0 top-0 bottom-0 w-2 bg-gradient-to-r from-amber-700/40 to-transparent" />
                    </div>

                    {/* Pages effect */}
                    <div className="absolute top-1 right-0 w-44 h-32 bg-white rounded-r-lg -z-10 translate-x-1 shadow-lg" 
                         style={{ clipPath: 'polygon(4% 0%, 100% 0%, 100% 100%, 4% 100%)' }} />

                    {/* Success checkmark */}
                    <motion.div
                      className="absolute -top-3 -right-3 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center shadow-lg"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.6, type: "spring" }}
                    >
                      <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </motion.div>
                  </motion.div>
                </>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Progress dots */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
          {[1, 2, 3, 4].map((dotStep) => (
            <motion.div
              key={dotStep}
              className={`w-2 h-2 rounded-full ${
                step === dotStep ? 'bg-blue-400' : 'bg-slate-600'
              }`}
              animate={{
                scale: step === dotStep ? 1.3 : 1,
              }}
              transition={{ duration: 0.3 }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

/**
 * Animation de récit interactif généré par IA pour la carte share
 * Interface de génération avec barre de progression, placeholders et filtres
 */
function AIStoryAnimation() {
  const [progress, setProgress] = useState(0);
  const [wordCount, setWordCount] = useState(0);
  const [isAnalyzing, setIsAnalyzing] = useState(true);
  const [isWriting, setIsWriting] = useState(false);

  useEffect(() => {
    // Animation de la progression de 0 à 100%
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          setIsAnalyzing(false);
          setIsWriting(false);
          return 100;
        }
        // Passer à la phase "écriture" quand on atteint 80%
        if (prev >= 80 && isAnalyzing) {
          setIsAnalyzing(false);
          setIsWriting(true);
        }
        return prev + 2;
      });
    }, 50);

    // Animation du compteur de mots de 0 à 243
    const wordInterval = setInterval(() => {
      setWordCount((prev) => {
        if (prev >= 243) {
          clearInterval(wordInterval);
          return 243;
        }
        return prev + 5;
      });
    }, 50);

    return () => {
      clearInterval(progressInterval);
      clearInterval(wordInterval);
    };
  }, []);

  return (
    <div
      className="absolute inset-0"
      style={{
        zIndex: 100,
        pointerEvents: 'none',
        transform: 'scaleX(-1)', // Corriger l'inversion causée par rotateY(180deg)
      }}
    >
      <div className="w-full h-full flex flex-col items-center justify-center relative overflow-hidden p-4">
        {/* Filtres en haut */}
        <div className="flex gap-2 mb-2">
          <motion.div
            className="w-8 h-8 bg-pink-500 rounded-lg flex items-center justify-center shadow-lg"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.2, type: "spring" }}
          >
            <Clock className="w-4 h-4 text-white" />
          </motion.div>
          <motion.div
            className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center shadow-lg"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.3, type: "spring" }}
          >
            <MapPin className="w-4 h-4 text-white" />
          </motion.div>
          <motion.div
            className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center shadow-lg"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.4, type: "spring" }}
          >
            <ImageIcon className="w-4 h-4 text-white" />
          </motion.div>
        </div>

        {/* Texte sous les filtres */}
        <motion.div
          className="flex gap-3 mb-3 text-[10px] text-slate-400"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          <span>3 jours</span>
          <span>2 lieux</span>
          <span>45 photos</span>
        </motion.div>

        {/* Carte principale */}
        <motion.div
          className="w-full bg-slate-700/80 rounded-xl p-4 shadow-2xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          {/* En-tête */}
          <div className="flex items-center justify-between mb-3 relative">
            <motion.div
              className="flex items-center gap-1.5"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 }}
            >
              <motion.span 
                className="text-white text-xs"
                animate={isAnalyzing || isWriting ? { opacity: [1, 0.5, 1] } : { opacity: 1 }}
                transition={{ duration: 1.5, repeat: (isAnalyzing || isWriting) ? Infinity : 0 }}
              >
                {isAnalyzing ? "...Analyse en cours" : isWriting ? "...En écriture" : "...En écriture"}
              </motion.span>
              {/* Point vert à gauche : clignote pendant analyse ET écriture, disparaît seulement à la fin */}
              <motion.div
                className="w-1.5 h-1.5 bg-green-500 rounded-full"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ 
                  opacity: progress < 100 ? [1, 0.5, 1] : 0,
                  scale: progress < 100 ? 1 : 0
                }}
                transition={{ 
                  duration: 1, 
                  repeat: progress < 100 ? Infinity : 0
                }}
              />
            </motion.div>
            <motion.div
              className="flex items-center gap-1.5"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 }}
            >
              <motion.span 
                className="text-white text-xs"
                animate={progress >= 100 ? { opacity: [1, 0.5, 1] } : { opacity: 1 }}
                transition={{ duration: 1, repeat: progress >= 100 ? Infinity : 0, delay: 0.5 }}
              >
                Récit généré
              </motion.span>
              {/* Point vert à droite : apparaît seulement quand progress = 100% avec animation de bascule */}
              <motion.div
                className="w-1.5 h-1.5 bg-green-500 rounded-full"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ 
                  opacity: progress >= 100 ? [1, 0.5, 1] : 0,
                  scale: progress >= 100 ? [1, 1.2, 1] : 0
                }}
                transition={{ 
                  duration: progress >= 100 ? 1 : 0.3,
                  repeat: progress >= 100 ? Infinity : 0,
                  delay: progress >= 100 ? 0.5 : 0
                }}
              />
              <BookOpen className="w-3 h-3 text-white" />
            </motion.div>
          </div>

          {/* Placeholders de texte (skeleton loading) */}
          <div className="space-y-2 mb-4">
            {[1, 2, 3, 4, 5].map((index) => (
              <motion.div
                key={index}
                className="h-2 bg-slate-600 rounded"
                style={{ width: `${75 + index * 8}%` }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 0.6, x: 0 }}
                transition={{ delay: 0.9 + index * 0.1 }}
              />
            ))}
          </div>

          {/* Barre de progression */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-[10px] text-slate-300 mb-1">
              <span>{Math.round(progress)}%</span>
              <span>{wordCount} / 243 mots</span>
            </div>
            <div className="w-full h-1.5 bg-slate-600 rounded-full overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={{
                  background: 'linear-gradient(90deg, rgb(236, 72, 153), rgb(59, 130, 246))',
                }}
                initial={{ width: '0%' }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.1 }}
              />
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

