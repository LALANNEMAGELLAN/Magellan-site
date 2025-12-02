'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { useMobileMenu } from './MobileMenuProvider';

function Header() {
  const pathname = usePathname() || '/';
  const [logoError, setLogoError] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { isOpen: isMobileMenuOpen, toggleMenu: handleMobileMenuToggle } = useMobileMenu();
  const t = useTranslations('header');
  const tNav = useTranslations('nav');
  const tCommon = useTranslations('common');

  // Détecter le scroll pour changer le style du header
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setScrolled(scrollPosition > 50);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Appel initial
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-[10000] transition-all duration-300 ${
        scrolled 
          ? 'bg-surface-bg/98 backdrop-blur-lg border-b border-surface-border shadow-lg shadow-black/10' 
          : 'bg-surface-bg/98 sm:bg-surface-bg/95 backdrop-blur-xl border-b border-transparent'
      } overflow-x-hidden safe-area-top`} 
      role="banner"
      style={{ 
        zIndex: 10000,
        paddingTop: 'env(safe-area-inset-top, 0px)',
        ...(!scrolled && {
          background: 'linear-gradient(to bottom, rgba(11, 18, 32, 0.98) 0%, rgba(11, 18, 32, 0.92) 50%, rgba(11, 18, 32, 0.88) 100%)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)'
        })
      }}
    >
      <div className={`mx-auto w-full transition-all duration-300 ${
        scrolled 
          ? 'max-w-2xl px-3 sm:px-4 py-2.5 min-h-[52px]' 
          : 'max-w-6xl px-3 sm:px-4 md:px-6 py-3 sm:py-4 min-h-[60px] sm:min-h-[64px]'
      } min-w-0 flex items-center ${
        scrolled ? 'justify-center' : 'justify-between'
      }`}>
        {/* Logo et nom - cachés quand scrolled */}
        {!scrolled && (
          <Link 
            href="/"
            className="flex items-center gap-1.5 sm:gap-2 text-white sm:text-text-base text-sm sm:text-lg font-bold sm:font-semibold hover:opacity-80 active:opacity-70 transition-opacity focus-visible:outline-2 focus-visible:outline-brand focus-visible:outline-offset-2 rounded min-w-0 flex-shrink-0 drop-shadow-[0_3px_12px_rgba(0,0,0,0.95)] sm:drop-shadow-none"
            style={{
              textShadow: '0 3px 10px rgba(0,0,0,1), 0 0 6px rgba(0,0,0,0.95), 0 2px 4px rgba(0,0,0,1), -1px -1px 2px rgba(0,0,0,0.8)',
              WebkitTextStroke: '0.5px rgba(0,0,0,0.3)'
            }}
            aria-label={t('homeAriaLabel')}
          >
            {!logoError ? (
              <Image
                src="/logo-magellan.svg"
                alt={t('logoAlt')}
                width={28}
                height={28}
                className="h-6 w-6 sm:h-7 sm:w-7 brightness-0 invert sm:brightness-100 sm:invert-0 flex-shrink-0"
                onError={() => setLogoError(true)}
                aria-hidden="true"
              />
            ) : (
              <span className="h-6 w-6 sm:h-7 sm:w-7 bg-brand rounded flex-shrink-0" aria-hidden="true" />
            )}
            <span className="whitespace-nowrap">{tCommon('brand')}</span>
          </Link>
        )}

        {/* Conteneur pour les boutons - toujours visible */}
        <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
          {/* Bouton Connexion - toujours visible */}
          <Link
            href="/connexion"
            className={`rounded-lg font-semibold sm:font-medium transition-all duration-300 hover:scale-105 active:scale-95 focus-visible:outline-2 focus-visible:outline-brand focus-visible:outline-offset-2 ${
              scrolled 
                ? 'px-2.5 sm:px-3 py-1.5 text-xs' 
                : 'px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm'
            } bg-white sm:bg-brand/10 border-2 border-white/90 sm:border-brand/30 text-slate-900 sm:text-brand shadow-[0_4px_12px_rgba(0,0,0,0.5)] sm:shadow-none whitespace-nowrap`}
            aria-label={t('loginAriaLabel')}
          >
            {tNav('login')}
          </Link>

          {/* Menu burger - visible uniquement quand pas scrolled */}
          {!scrolled && (
            <button
              type="button"
              className="p-1.5 sm:p-2 text-white sm:text-text-base focus-visible:outline-2 focus-visible:outline-brand focus-visible:outline-offset-2 rounded transition-all duration-300 hover:bg-white/25 sm:hover:bg-surface-card/50 active:bg-white/35 sm:active:bg-surface-card/70 flex-shrink-0"
              style={{
                filter: 'drop-shadow(0 4px 10px rgba(0,0,0,1)) drop-shadow(0 0 4px rgba(0,0,0,1)) drop-shadow(0 2px 4px rgba(0,0,0,0.9))',
              }}
              onClick={handleMobileMenuToggle}
              aria-label={isMobileMenuOpen ? t('menuClose') : t('menuOpen')}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu"
            >
              <div className="flex flex-col gap-1.5 w-5 h-5 sm:w-6 sm:h-6 justify-center items-center">
                <span className={`block h-0.5 w-5 sm:w-6 bg-current transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`} style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,1)) drop-shadow(0 0 2px rgba(0,0,0,1))' }} />
                <span className={`block h-0.5 w-5 sm:w-6 bg-current transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : 'opacity-100'}`} style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,1)) drop-shadow(0 0 2px rgba(0,0,0,1))' }} />
                <span className={`block h-0.5 w-5 sm:w-6 bg-current transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,1)) drop-shadow(0 0 2px rgba(0,0,0,1))' }} />
              </div>
            </button>
          )}

          {/* Bouton Tester la bêta - visible uniquement quand scrolled */}
          {scrolled && (
            <a 
              href="#beta" 
              aria-label={t('betaAriaLabel')} 
              className="px-2.5 sm:px-3 py-1.5 rounded-lg bg-brand text-accent text-xs font-semibold shadow-lg shadow-brand/20 hover:bg-brand-dark active:bg-brand-dark active:scale-95 transition-all duration-300 hover:scale-105 focus-visible:outline-2 focus-visible:outline-brand focus-visible:outline-offset-2 scroll-smooth flex items-center gap-1 sm:gap-1.5 whitespace-nowrap"
              onClick={(e) => {
                e.preventDefault();
                const element = document.getElementById('beta');
                if (element) {
                  const headerHeight = 80;
                  const elementPosition = element.getBoundingClientRect().top + window.scrollY;
                  const offsetPosition = elementPosition - headerHeight;
                  window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                  });
                }
              }}
            >
              <span className="text-accent font-bold text-xs sm:text-sm leading-none">•</span>
              <span className="hidden xs:inline">{tNav('beta')}</span>
              <span className="xs:hidden">Bêta</span>
            </a>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
export { Header };
