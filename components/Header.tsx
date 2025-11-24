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
          : 'bg-surface-bg/95 backdrop-blur-xl border-b border-transparent'
      } overflow-x-hidden`} 
      role="banner"
      style={{ zIndex: 10000 }}
    >
      <div className={`mx-auto w-full transition-all duration-300 ${
        scrolled 
          ? 'max-w-2xl px-4 py-2 min-h-[48px]' 
          : 'max-w-6xl px-3 sm:px-4 md:px-6 py-3 sm:py-4 min-h-[64px]'
      } min-w-0 flex items-center ${
        scrolled ? 'justify-center' : 'justify-between'
      }`}>
        {/* Logo et nom - cachés quand scrolled */}
        {!scrolled && (
          <Link 
            href="/"
            className="flex items-center gap-2 text-text-base text-base sm:text-lg font-semibold hover:opacity-80 active:opacity-70 transition-opacity focus-visible:outline-2 focus-visible:outline-brand focus-visible:outline-offset-2 rounded min-w-0 flex-shrink-0"
            aria-label={t('homeAriaLabel')}
          >
            {!logoError ? (
              <Image
                src="/logo-magellan.svg"
                alt={t('logoAlt')}
                width={28}
                height={28}
                className="h-7 w-auto"
                onError={() => setLogoError(true)}
                aria-hidden="true"
              />
            ) : (
              <span className="h-7 w-7 bg-brand rounded" aria-hidden="true" />
            )}
            <span>{tCommon('brand')}</span>
          </Link>
        )}

        {/* Conteneur pour les boutons - toujours visible */}
        <div className="flex items-center gap-3">
          {/* Bouton Connexion - toujours visible */}
          <Link
            href="/connexion"
            className={`rounded-lg bg-brand/10 hover:bg-brand/20 border border-brand/30 text-brand font-medium transition-all duration-300 hover:scale-105 active:scale-95 focus-visible:outline-2 focus-visible:outline-brand focus-visible:outline-offset-2 ${
              scrolled 
                ? 'px-3 py-1.5 text-xs' 
                : 'px-4 py-2 text-sm'
            }`}
            aria-label={t('loginAriaLabel')}
          >
            {tNav('login')}
          </Link>

          {/* Menu burger - visible uniquement quand pas scrolled */}
          {!scrolled && (
            <button
              type="button"
              className="p-2 text-text-base focus-visible:outline-2 focus-visible:outline-brand focus-visible:outline-offset-2 rounded transition-all duration-300 hover:bg-surface-card/50 active:bg-surface-card/70 flex-shrink-0"
              onClick={handleMobileMenuToggle}
              aria-label={isMobileMenuOpen ? t('menuClose') : t('menuOpen')}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu"
            >
              <div className="flex flex-col gap-1.5 w-6 h-6 justify-center items-center">
                <span className={`block h-0.5 w-6 bg-current transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
                <span className={`block h-0.5 w-6 bg-current transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : 'opacity-100'}`} />
                <span className={`block h-0.5 w-6 bg-current transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
              </div>
            </button>
          )}

          {/* Bouton Tester la bêta - visible uniquement quand scrolled */}
          {scrolled && (
            <a 
              href="#beta" 
              aria-label={t('betaAriaLabel')} 
              className="px-3 py-1.5 rounded-lg bg-brand text-brand-fg text-xs font-semibold shadow-lg shadow-brand/20 hover:bg-brand-dark active:bg-brand-dark active:scale-95 transition-all duration-300 hover:scale-105 focus-visible:outline-2 focus-visible:outline-brand focus-visible:outline-offset-2 scroll-smooth"
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
              {tNav('beta')}
            </a>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
export { Header };
