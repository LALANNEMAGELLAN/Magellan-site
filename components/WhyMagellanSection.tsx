'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Lock, Battery, Zap, Wifi, Film, Flag, Instagram, Hand } from 'lucide-react';
import AnimatedTravelMap from './AnimatedTravelMap';

export default function WhyMagellanSection() {
  const t = useTranslations('whyMagellan');

  return (
    <section
      id="why-magellan-section"
      className="relative py-16 sm:py-20 md:py-24 lg:py-32 min-h-screen flex items-center overflow-hidden"
      aria-labelledby="why-magellan-heading"
    >
      {/* Animation d'itinéraire dynamique en arrière-plan */}
      <AnimatedTravelMap sectionId="why-magellan-section" />

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-8 md:space-y-12">
          {/* Titre et sous-titre */}
          <motion.header
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
            className="space-y-4"
          >
            <h2
              id="why-magellan-heading"
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-text-base leading-tight"
            >
              {t('title')}
            </h2>
            <p className="text-lg sm:text-xl md:text-2xl text-text-muted leading-relaxed">
              {t('subtitle')}
            </p>
          </motion.header>

          {/* Feature cards en dessous - disposition en grille avec taille agrandie */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-10 justify-items-center">
            {/* Carte Confidentialité optimale */}
            <div className="w-full md:col-span-2">
              <div style={{ transform: 'scale(1.1)', transformOrigin: 'center' }}>
                <motion.div
                  className="bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-3xl p-8 relative overflow-hidden border border-blue-200 dark:border-blue-800 min-h-[280px] flex flex-col justify-between cursor-pointer"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  whileHover={{ 
                    scale: 1.02,
                    boxShadow: "0 20px 40px rgba(59, 130, 246, 0.25)",
                    transition: { duration: 0.3 }
                  }}
                >
                  <div className="relative z-10">
                    <motion.div 
                      className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-100 dark:bg-blue-900/40 backdrop-blur-sm rounded-full border border-blue-300 dark:border-blue-700 mb-4"
                      whileHover={{ scale: 1.05 }}
                    >
                      <motion.div
                        animate={{ rotate: [0, -10, 10, -10, 0] }}
                        transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                      >
                        <Lock className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                      </motion.div>
                      <span className="text-xs text-blue-600 dark:text-blue-400 font-semibold">{t('features.confidential.badge')}</span>
                    </motion.div>
                    <h3 className="text-slate-900 dark:text-text-base text-3xl font-semibold mb-3">
                      {t('features.confidential.title')}
                    </h3>
                    <p className="text-slate-700 dark:text-text-muted text-lg max-w-md">
                      {t('features.confidential.description')}
                    </p>
                  </div>
                  {/* Image à droite de la carte */}
                  <div className="absolute right-0 bottom-0 w-1/2 h-full">
                    <div className="relative w-full h-full">
                      <Image
                        src="https://images.unsplash.com/photo-1758272958726-0bdf2ff791ac?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0cmF2ZWxlcnMlMjBncm91cCUyMGZyaWVuZHN8ZW58MXx8fHwxNzY0MzE4MTc5fDA&ixlib=rb-4.1.0&q=80&w=1080"
                        alt="Travelers"
                        fill
                        className="object-cover opacity-40"
                        sizes="(max-width: 768px) 50vw, 25vw"
                        unoptimized
                      />
                      <div className="absolute inset-0 bg-gradient-to-l from-transparent to-blue-50 dark:to-blue-900/20" />
                    </div>
                  </div>
                  <motion.div 
                    className="absolute -bottom-8 -right-8 w-64 h-64 bg-gradient-to-br from-blue-300/40 to-indigo-400/40 rounded-full blur-3xl"
                    animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
                    transition={{ duration: 4, repeat: Infinity }}
                  />
                </motion.div>
              </div>
            </div>

            {/* Carte Consommation ultra-faible */}
            <div className="w-full">
              <div style={{ transform: 'scale(1.1)', transformOrigin: 'center' }}>
                <motion.div
                  className="bg-gradient-to-br from-emerald-50 to-teal-100 dark:from-emerald-900/20 dark:to-teal-900/20 rounded-3xl p-8 relative overflow-hidden border border-emerald-200 dark:border-emerald-800 min-h-[280px] flex flex-col justify-between cursor-pointer"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  whileHover={{ 
                    scale: 1.02,
                    boxShadow: "0 20px 40px rgba(16, 185, 129, 0.25)",
                    transition: { duration: 0.3 }
                  }}
                >
                  <div className="relative z-10">
                    <motion.div 
                      className="inline-flex items-center gap-2 px-3 py-1.5 bg-emerald-100 dark:bg-emerald-900/40 backdrop-blur-sm rounded-full border border-emerald-300 dark:border-emerald-700 mb-4"
                      whileHover={{ scale: 1.05 }}
                    >
                      <motion.div
                        animate={{ scale: [1, 0.9, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        <Battery className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                      </motion.div>
                      <span className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold">{t('features.consumption.badge')}</span>
                    </motion.div>
                    <h3 className="text-slate-900 dark:text-text-base text-2xl font-semibold mb-3">
                      {t('features.consumption.title')}
                    </h3>
                    <p className="text-slate-700 dark:text-text-muted">
                      {t('features.consumption.description')}
                    </p>
                  </div>
                  <motion.div 
                    className="absolute -bottom-8 -right-8 w-48 h-48 bg-gradient-to-br from-emerald-300/40 to-teal-400/40 rounded-full blur-3xl"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  />
                </motion.div>
              </div>
            </div>

            {/* Carte Confidentialité by design */}
            <div className="w-full">
              <div style={{ transform: 'scale(1.1)', transformOrigin: 'center' }}>
                <motion.div
                  className="bg-gradient-to-br from-violet-50 to-purple-100 dark:from-violet-900/20 dark:to-purple-900/20 rounded-3xl p-8 relative overflow-hidden border border-violet-200 dark:border-violet-800 min-h-[280px] flex flex-col justify-between cursor-pointer"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  whileHover={{ 
                    scale: 1.02,
                    boxShadow: "0 20px 40px rgba(139, 92, 246, 0.25)",
                    transition: { duration: 0.3 }
                  }}
                >
                  <div className="relative z-10">
                    <motion.div 
                      className="inline-flex items-center gap-2 px-3 py-1.5 bg-violet-100 dark:bg-violet-900/40 backdrop-blur-sm rounded-full border border-violet-300 dark:border-violet-700 mb-4"
                      whileHover={{ scale: 1.05 }}
                    >
                      <motion.div
                        animate={{ rotate: [0, 360] }}
                        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                      >
                        <Zap className="w-4 h-4 text-violet-600 dark:text-violet-400" />
                      </motion.div>
                      <span className="text-xs text-violet-600 dark:text-violet-400 font-semibold">{t('features.privacy.badge')}</span>
                    </motion.div>
                    <h3 className="text-slate-900 dark:text-text-base text-2xl font-semibold mb-3">
                      {t('features.privacy.title')}
                    </h3>
                    <p className="text-slate-700 dark:text-text-muted">
                      {t('features.privacy.description')}
                    </p>
                  </div>
                  <motion.div 
                    className="absolute -bottom-8 -right-8 w-48 h-48 bg-gradient-to-br from-violet-300/40 to-purple-400/40 rounded-full blur-3xl"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  />
                </motion.div>
              </div>
            </div>

            {/* Carte Fonctionne hors ligne */}
            <div className="w-full">
              <div style={{ transform: 'scale(1.1)', transformOrigin: 'center' }}>
                <motion.div
                  className="bg-gradient-to-br from-purple-50 to-pink-100 dark:from-purple-900/20 dark:to-pink-900/20 rounded-3xl p-8 relative overflow-hidden border border-purple-200 dark:border-purple-800 min-h-[280px] flex flex-col justify-between cursor-pointer"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  whileHover={{ 
                    scale: 1.02,
                    boxShadow: "0 20px 40px rgba(168, 85, 247, 0.25)",
                    transition: { duration: 0.3 }
                  }}
                >
                  <div className="relative z-10">
                    <motion.div 
                      className="inline-flex items-center gap-2 px-3 py-1.5 bg-purple-100 dark:bg-purple-900/40 backdrop-blur-sm rounded-full border border-purple-300 dark:border-purple-700 mb-4"
                      whileHover={{ scale: 1.05 }}
                    >
                      <motion.div
                        animate={{ rotate: [0, 360] }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                      >
                        <Wifi className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                      </motion.div>
                      <span className="text-xs text-purple-600 dark:text-purple-400 font-semibold">{t('features.offline.badge')}</span>
                    </motion.div>
                    <h3 className="text-slate-900 dark:text-text-base text-2xl font-semibold mb-3">
                      {t('features.offline.title')}
                    </h3>
                    <p className="text-slate-700 dark:text-text-muted">
                      {t('features.offline.description')}
                    </p>
                  </div>
                  <motion.div 
                    className="absolute -bottom-8 -right-8 w-48 h-48 bg-gradient-to-br from-purple-300/40 to-pink-400/40 rounded-full blur-3xl"
                    animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
                    transition={{ duration: 4, repeat: Infinity }}
                  />
                </motion.div>
              </div>
            </div>

            {/* Carte Sans pub */}
            <div className="w-full">
              <div style={{ transform: 'scale(1.1)', transformOrigin: 'center' }}>
                <motion.div
                  className="bg-gradient-to-br from-amber-50 to-orange-100 dark:from-amber-900/20 dark:to-orange-900/20 rounded-3xl p-8 relative overflow-hidden border border-amber-200 dark:border-amber-800 min-h-[280px] flex flex-col justify-between cursor-pointer"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  whileHover={{ 
                    scale: 1.02,
                    boxShadow: "0 20px 40px rgba(245, 158, 11, 0.25)",
                    transition: { duration: 0.3 }
                  }}
                >
                  <div className="relative z-10">
                    <motion.div 
                      className="inline-flex items-center gap-2 px-3 py-1.5 bg-amber-100 dark:bg-amber-900/40 backdrop-blur-sm rounded-full border border-amber-300 dark:border-amber-700 mb-4"
                      whileHover={{ scale: 1.05 }}
                    >
                      <motion.div
                        animate={{ scale: [1, 1.1, 1], opacity: [1, 0.7, 1] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                      >
                        <Film className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                      </motion.div>
                      <span className="text-xs text-amber-600 dark:text-amber-400 font-semibold">{t('features.noads.badge')}</span>
                    </motion.div>
                    <h3 className="text-slate-900 dark:text-text-base text-2xl font-semibold mb-3">
                      {t('features.noads.title')}
                    </h3>
                    <p className="text-slate-700 dark:text-text-muted">
                      {t('features.noads.description')}
                    </p>
                  </div>
                  <motion.div 
                    className="absolute -bottom-8 -right-8 w-48 h-48 bg-gradient-to-br from-amber-300/40 to-orange-400/40 rounded-full blur-3xl"
                    animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  />
                </motion.div>
              </div>
            </div>

            {/* Carte Imaginé et développé en France */}
            <div className="w-full">
              <div style={{ transform: 'scale(1.1)', transformOrigin: 'center' }}>
                <motion.div
                  className="bg-gradient-to-br from-cyan-50 to-teal-100 dark:from-cyan-900/20 dark:to-teal-900/20 rounded-3xl p-8 relative overflow-hidden border border-cyan-200 dark:border-cyan-800 min-h-[280px] flex flex-col justify-between cursor-pointer"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  whileHover={{ 
                    scale: 1.02,
                    boxShadow: "0 20px 40px rgba(6, 182, 212, 0.25)",
                    transition: { duration: 0.3 }
                  }}
                >
                  {/* Drapeau français en arrière-plan de toute la carte */}
                  <div className="absolute inset-0 z-0">
                    <Image
                      src="/cards/why-magellan/french.png"
                      alt="Drapeau français"
                      fill
                      className="object-cover opacity-20"
                      sizes="(max-width: 768px) 100vw, 50vw"
                      unoptimized
                    />
                    <div className="absolute inset-0 bg-gradient-to-br from-cyan-50/80 to-teal-100/80 dark:from-cyan-900/60 dark:to-teal-900/60" />
                  </div>
                  
                  <div className="relative z-10">
                    <motion.div 
                      className="inline-flex items-center gap-2 px-3 py-1.5 bg-cyan-100 dark:bg-cyan-900/40 backdrop-blur-sm rounded-full border border-cyan-300 dark:border-cyan-700 mb-4"
                      whileHover={{ scale: 1.05 }}
                    >
                      <motion.div
                        animate={{ y: [0, -5, 0] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                      >
                        <Flag className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
                      </motion.div>
                      <span className="text-xs text-cyan-600 dark:text-cyan-400 font-semibold">{t('features.france.badge')}</span>
                    </motion.div>
                    <h3 className="text-slate-900 dark:text-text-base text-2xl font-semibold mb-3">
                      {t('features.france.title')}
                    </h3>
                    <p className="text-slate-700 dark:text-text-muted">
                      {t('features.france.description')}
                    </p>
                  </div>
                  <motion.div 
                    className="absolute -bottom-8 -right-8 w-48 h-48 bg-gradient-to-br from-cyan-300/40 to-teal-400/40 rounded-full blur-3xl z-0"
                    animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
                    transition={{ duration: 4, repeat: Infinity }}
                  />
                </motion.div>
              </div>
            </div>

            {/* Carte Performance photo instantanée */}
            <div className="w-full">
              <div style={{ transform: 'scale(1.1)', transformOrigin: 'center' }}>
                <motion.div
                  className="bg-gradient-to-br from-rose-50 to-pink-100 dark:from-rose-900/20 dark:to-pink-900/20 rounded-3xl p-8 relative overflow-hidden border border-rose-200 dark:border-rose-800 min-h-[280px] flex flex-col justify-between cursor-pointer"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                  whileHover={{ 
                    scale: 1.02,
                    boxShadow: "0 20px 40px rgba(244, 63, 94, 0.25)",
                    transition: { duration: 0.3 }
                  }}
                >
                  <div className="relative z-10">
                    <motion.div 
                      className="inline-flex items-center gap-2 px-3 py-1.5 bg-rose-100 dark:bg-rose-900/40 backdrop-blur-sm rounded-full border border-rose-300 dark:border-rose-700 mb-4"
                      whileHover={{ scale: 1.05 }}
                    >
                      <motion.div
                        animate={{ scale: [1, 1.2, 1], rotate: [0, 5, -5, 0] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                      >
                        <Instagram className="w-4 h-4 text-rose-600 dark:text-rose-400" />
                      </motion.div>
                      <span className="text-xs text-rose-600 dark:text-rose-400 font-semibold">{t('features.performance.badge')}</span>
                    </motion.div>
                    <h3 className="text-slate-900 dark:text-text-base text-2xl font-semibold mb-3">
                      {t('features.performance.title')}
                    </h3>
                    <p className="text-slate-700 dark:text-text-muted">
                      {t('features.performance.description')}
                    </p>
                  </div>
                  <motion.div 
                    className="absolute -bottom-8 -right-8 w-48 h-48 bg-gradient-to-br from-rose-300/40 to-pink-400/40 rounded-full blur-3xl"
                    animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.5, 0.3] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  />
                </motion.div>
              </div>
            </div>

            {/* Carte Export Instagram & TikTok intégré */}
            <div className="w-full">
              <div style={{ transform: 'scale(1.1)', transformOrigin: 'center' }}>
                <motion.div
                  className="bg-gradient-to-br from-fuchsia-50 to-purple-100 dark:from-fuchsia-900/20 dark:to-purple-900/20 rounded-3xl p-8 relative overflow-hidden border border-fuchsia-200 dark:border-fuchsia-800 min-h-[280px] flex flex-col justify-between cursor-pointer"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.7 }}
                  whileHover={{ 
                    scale: 1.02,
                    boxShadow: "0 20px 40px rgba(192, 38, 211, 0.25)",
                    transition: { duration: 0.3 }
                  }}
                >
                  <div className="relative z-10">
                    <motion.div 
                      className="inline-flex items-center gap-2 px-3 py-1.5 bg-fuchsia-100 dark:bg-fuchsia-900/40 backdrop-blur-sm rounded-full border border-fuchsia-300 dark:border-fuchsia-700 mb-4"
                      whileHover={{ scale: 1.05 }}
                    >
                      <motion.div
                        animate={{ scale: [1, 1.1, 1], rotate: [0, 10, -10, 0] }}
                        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                      >
                        <Instagram className="w-4 h-4 text-fuchsia-600 dark:text-fuchsia-400" />
                      </motion.div>
                      <span className="text-xs text-fuchsia-600 dark:text-fuchsia-400 font-semibold">{t('features.export.badge')}</span>
                    </motion.div>
                    <h3 className="text-slate-900 dark:text-text-base text-2xl font-semibold mb-3">
                      {t('features.export.title')}
                    </h3>
                    <p className="text-slate-700 dark:text-text-muted">
                      {t('features.export.description')}
                    </p>
                  </div>
                  <motion.div 
                    className="absolute -bottom-8 -right-8 w-48 h-48 bg-gradient-to-br from-fuchsia-300/40 to-purple-400/40 rounded-full blur-3xl"
                    animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
                    transition={{ duration: 3.5, repeat: Infinity }}
                  />
                </motion.div>
              </div>
            </div>

            {/* Carte Utilisation gratuite - Large carte */}
            <div className="w-full md:col-span-2 lg:col-span-3">
              <div style={{ transform: 'scale(1.1)', transformOrigin: 'center' }}>
                <motion.div
                  className="bg-gradient-to-br from-green-50 to-emerald-100 dark:from-green-900/20 dark:to-emerald-900/20 rounded-3xl p-8 relative overflow-hidden border border-green-200 dark:border-green-800 min-h-[280px] flex flex-col justify-between cursor-pointer"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.8 }}
                  whileHover={{ 
                    scale: 1.02,
                    boxShadow: "0 20px 40px rgba(34, 197, 94, 0.25)",
                    transition: { duration: 0.3 }
                  }}
                >
                  <div className="relative z-10">
                    <motion.div 
                      className="inline-flex items-center gap-2 px-3 py-1.5 bg-green-100 dark:bg-green-900/40 backdrop-blur-sm rounded-full border border-green-300 dark:border-green-700 mb-4"
                      whileHover={{ scale: 1.05 }}
                    >
                      <motion.div
                        animate={{ scale: [1, 1.15, 1], y: [0, -3, 0] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                      >
                        <Hand className="w-4 h-4 text-green-600 dark:text-green-400" />
                      </motion.div>
                      <span className="text-xs text-green-600 dark:text-green-400 font-semibold">{t('features.free.badge')}</span>
                    </motion.div>
                    <h3 className="text-slate-900 dark:text-text-base text-3xl font-semibold mb-3">
                      {t('features.free.title')}
                    </h3>
                    <p className="text-slate-700 dark:text-text-muted text-lg max-w-2xl">
                      {t('features.free.description')}
                    </p>
                  </div>
                  <motion.div 
                    className="absolute -bottom-8 -right-8 w-64 h-64 bg-gradient-to-br from-green-300/40 to-emerald-400/40 rounded-full blur-3xl"
                    animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
                    transition={{ duration: 4, repeat: Infinity }}
                  />
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

