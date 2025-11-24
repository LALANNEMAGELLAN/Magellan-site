'use client';

import Link from "next/link";
import { useTranslations } from 'next-intl';

function Footer() {
  const t = useTranslations('footer');
  const tCommon = useTranslations('common');

  return (
    <footer className="mt-16 sm:mt-20 md:mt-24 bg-[#050A14] border-t border-slate-800 overflow-x-hidden">
      <div className="mx-auto w-full max-w-6xl px-3 sm:px-4 md:px-6 py-8 sm:py-10 md:py-12">
        {/* Tagline */}
        <div className="mb-6 sm:mb-8">
          <p className="text-lg sm:text-xl font-semibold text-text-base">
            {t('tagline')}
          </p>
        </div>

        {/* Contenu principal */}
        <div className="flex flex-col gap-6 sm:gap-8 md:flex-row md:items-start md:justify-between">
          {/* Copyright */}
          <p className="text-xs sm:text-sm text-text-muted">
            {t('copyright', { year: new Date().getFullYear() })}
          </p>

          {/* Navigation */}
          <nav className="flex flex-wrap gap-4 sm:gap-6 text-xs sm:text-sm" aria-label={t('navAriaLabel')}>
            <Link 
              href="/mentions-legales"
              className="text-text-muted hover:text-text-base transition-colors focus:outline-none focus:ring-2 focus:ring-brand focus:ring-offset-2 focus:ring-offset-[#050A14] rounded"
            >
              {t('legal')}
            </Link>
            <Link 
              href="/politique-de-confidentialite"
              className="text-text-muted hover:text-text-base transition-colors focus:outline-none focus:ring-2 focus:ring-brand focus:ring-offset-2 focus:ring-offset-[#050A14] rounded"
            >
              {t('privacy')}
            </Link>
            <Link 
              href="/cgu"
              className="text-text-muted hover:text-text-base transition-colors focus:outline-none focus:ring-2 focus:ring-brand focus:ring-offset-2 focus:ring-offset-[#050A14] rounded"
            >
              {t('terms')}
            </Link>
            <Link 
              href="/cookies"
              className="text-text-muted hover:text-text-base transition-colors focus:outline-none focus:ring-2 focus:ring-brand focus:ring-offset-2 focus:ring-offset-[#050A14] rounded"
            >
              {t('cookies')}
            </Link>
            <Link 
              href="/contact"
              className="text-text-muted hover:text-text-base transition-colors focus:outline-none focus:ring-2 focus:ring-brand focus:ring-offset-2 focus:ring-offset-[#050A14] rounded"
            >
              {t('contact')}
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
export { Footer };
