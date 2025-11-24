'use client';

import { Link } from '@/navigation';
import { usePathname } from 'next/navigation';
import { useLocale } from 'next-intl';
import { useEffect } from 'react';
import { locales, type Locale } from '../i18n';
import LanguageSwitcher from './LanguageSwitcher';

type MobileMenuProps = {
  isOpen: boolean;
  onClose: () => void;
};

const localeNames: Record<Locale, string> = {
  fr: 'Français',
  en: 'English',
  es: 'Español'
};

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const pathname = usePathname();
  const locale = useLocale() as Locale;

  // Fermer avec Escape
  useEffect(() => {
    if (!isOpen) return;
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  // Bloquer le scroll quand le menu est ouvert
  useEffect(() => {
    if (isOpen) {
      const scrollY = window.scrollY;
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
      
      return () => {
        document.body.style.overflow = '';
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.width = '';
        window.scrollTo(0, scrollY);
      };
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay sombre avec blur */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[9998] animate-fade-in-overlay"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Menu principal - Overlay 50% de l'écran (100% sur mobile) */}
      <div
        className={`fixed top-0 right-0 bottom-0 w-full md:max-w-[50vw] z-[9999] flex flex-col bg-surface-bg/98 backdrop-blur-xl transition-transform duration-300 ease-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Menu de navigation"
        aria-labelledby="mobile-menu-title"
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            onClose();
          }
        }}
      >
        {/* Header du menu avec bouton fermer */}
        <div className="flex items-center justify-between p-6 border-b border-surface-border/30 bg-surface-bg/98">
          <h2 id="mobile-menu-title" className="text-xl font-bold text-text-base">
            Menu
          </h2>
          <button
            onClick={onClose}
            className="p-2 text-text-muted hover:text-text-base hover:bg-surface-card/50 active:bg-surface-card/70 rounded-lg transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-brand focus-visible:outline-offset-2"
            aria-label="Fermer le menu"
            type="button"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Contenu scrollable */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6" onClick={(e) => e.stopPropagation()}>
          {/* 1. Sélecteur de langue */}
          <LanguageSwitcher onSelect={onClose} />

          {/* 2. Qui sommes nous */}
          <div className="space-y-2">
            <label className="text-xs font-medium text-text-muted uppercase tracking-wider">
              À propos
            </label>
            <Link
              href="/a-propos"
              onClick={onClose}
              className="flex items-start gap-4 p-4 rounded-xl bg-surface-card/30 hover:bg-surface-card/50 border border-transparent hover:border-surface-border/30 transition-all duration-200 active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-brand focus-visible:outline-offset-2 group"
            >
              <div className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center bg-surface-card text-text-muted group-hover:text-text-base transition-colors">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-base font-semibold text-text-base mb-1">
                  Qui sommes nous
                </div>
                <div className="text-xs font-medium text-text-muted">
                  L'histoire de Magellan
                </div>
              </div>
            </Link>
          </div>

          {/* 3. Actualités */}
          <div className="space-y-2">
            <label className="text-xs font-medium text-text-muted uppercase tracking-wider">
              Actualités
            </label>
            <Link
              href="/actualites"
              onClick={onClose}
              className="flex items-start gap-4 p-4 rounded-xl bg-surface-card/30 hover:bg-surface-card/50 border border-transparent hover:border-surface-border/30 transition-all duration-200 active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-brand focus-visible:outline-offset-2 group"
            >
              <div className="flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center bg-surface-card text-text-muted group-hover:text-text-base transition-colors">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-base font-semibold text-text-base mb-1">
                  Actualités
                </div>
                <div className="text-xs font-medium text-text-muted">
                  Testez la bêta et découvrez les dernières nouvelles
                </div>
              </div>
            </Link>
          </div>

          {/* 4. Lien vers le formulaire d'inscription */}
          <div className="space-y-2">
            <Link
              href="/inscription"
              onClick={onClose}
              className="flex items-center justify-center gap-2 p-4 rounded-xl bg-brand/20 hover:bg-brand/30 border border-brand/30 text-brand font-semibold transition-all duration-200 active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-brand focus-visible:outline-offset-2 group"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
              </svg>
              <span>S'inscrire</span>
            </Link>
          </div>
        </div>

        {/* Séparateur */}
        <div className="border-t border-surface-border/30 mx-6"></div>

        {/* 5. Réseaux sociaux */}
        <div className="p-6" onClick={(e) => e.stopPropagation()}>
          <div className="flex items-center justify-center gap-4">
            {/* Instagram */}
            <a
              href="https://www.instagram.com/magellan"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 flex items-center justify-center rounded-full bg-surface-card/50 hover:bg-surface-card active:bg-surface-card/80 border border-surface-border/30 transition-all duration-200 hover:scale-110 active:scale-95 focus-visible:outline-2 focus-visible:outline-brand focus-visible:outline-offset-2"
              aria-label="Instagram Magellan"
            >
              <svg className="w-6 h-6 text-text-muted hover:text-text-base transition-colors" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162 0 3.403 2.759 6.162 6.162 6.162 3.403 0 6.162-2.759 6.162-6.162 0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4 2.209 0 4 1.791 4 4 0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>

            {/* LinkedIn */}
            <a
              href="https://www.linkedin.com/company/magellan"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 flex items-center justify-center rounded-full bg-surface-card/50 hover:bg-surface-card active:bg-surface-card/80 border border-surface-border/30 transition-all duration-200 hover:scale-110 active:scale-95 focus-visible:outline-2 focus-visible:outline-brand focus-visible:outline-offset-2"
              aria-label="LinkedIn Magellan"
            >
              <svg className="w-6 h-6 text-text-muted hover:text-text-base transition-colors" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>

            {/* TikTok */}
            <a
              href="https://www.tiktok.com/@magellan"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 flex items-center justify-center rounded-full bg-surface-card/50 hover:bg-surface-card active:bg-surface-card/80 border border-surface-border/30 transition-all duration-200 hover:scale-110 active:scale-95 focus-visible:outline-2 focus-visible:outline-brand focus-visible:outline-offset-2"
              aria-label="TikTok Magellan"
            >
              <svg className="w-6 h-6 text-text-muted hover:text-text-base transition-colors" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
