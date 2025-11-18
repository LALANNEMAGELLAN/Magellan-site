'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useState, useMemo, useCallback, useEffect } from 'react';

type NavLink = { href: string; label: string };

const links: NavLink[] = [
  { href: '/', label: 'Accueil' },
  { href: '/fonctionnalites', label: 'Fonctionnalités' },
  { href: '/a-propos', label: 'À propos' },
  { href: '/contact', label: 'Contact' },
];

function Header() {
  const pathname = usePathname() || '/';
  const [open, setOpen] = useState(false);
  const [logoError, setLogoError] = useState(false);

  const isActive = useCallback((href: string) => {
    if (!pathname) return false;
    return pathname === href || (href !== '/' && pathname.startsWith(href + '/'));
  }, [pathname]);

  const linkClass = useCallback((href: string) => {
    const baseClasses = 'text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-brand focus:ring-offset-2 rounded';
    return isActive(href)
      ? `${baseClasses} text-text-base font-medium`
      : `${baseClasses} text-text-muted hover:text-text-base`;
  }, [isActive]);

  const handleLinkClick = useCallback(() => {
    setOpen(false);
  }, []);

  const handleMenuToggle = useCallback(() => {
    setOpen((prev) => !prev);
  }, []);

  const navItems = useMemo(
    () =>
      links.map((l) => (
        <Link
          key={l.href}
          href={l.href}
          className={linkClass(l.href)}
          onClick={handleLinkClick}
          aria-current={isActive(l.href) ? 'page' : undefined}
        >
          {l.label}
        </Link>
      )),
    [linkClass, handleLinkClick, isActive]
  );

  // Fermer le menu mobile lors du changement de route
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Fermer le menu mobile avec la touche Escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && open) {
        setOpen(false);
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [open]);

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-surface-border overflow-x-hidden" role="banner">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 py-3 flex items-center justify-between min-w-0">
        <Link 
          href="/" 
          className="flex items-center gap-2 text-text-base text-lg font-semibold hover:opacity-80 transition-opacity focus:outline-none focus:ring-2 focus:ring-brand focus:ring-offset-2 rounded min-w-0 flex-shrink-0"
          aria-label="Retour à l'accueil Magellan"
        >
          {!logoError ? (
            <Image
              src="/logo-magellan.svg"
              alt="Logo Magellan"
              width={24}
              height={24}
              className="h-6 w-auto"
              onError={() => setLogoError(true)}
              aria-hidden="true"
            />
          ) : (
            <span className="h-6 w-6 bg-brand rounded" aria-hidden="true" />
          )}
          <span>Magellan</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex gap-6 flex-shrink-0" aria-label="Navigation principale">
          {navItems}
        </nav>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-text-base p-2 -mr-2 focus:outline-none focus:ring-2 focus:ring-brand focus:ring-offset-2 rounded"
          onClick={handleMenuToggle}
          aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'}
          aria-expanded={open}
          aria-controls="mobile-nav"
        >
          {open ? '✕' : '☰'}
        </button>
      </div>

      {/* Mobile nav */}
      {open && (
        <div 
          id="mobile-nav"
          className="md:hidden border-t border-surface-border bg-white"
          role="navigation"
          aria-label="Navigation mobile"
        >
          <nav className="mx-auto w-full max-w-6xl px-4 sm:px-6 py-3 flex flex-col gap-3">
            {navItems}
          </nav>
        </div>
      )}
    </header>
  );
}

export default Header;
export { Header };
