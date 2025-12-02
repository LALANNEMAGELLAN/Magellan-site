'use client';

import { useEffect, useState, useCallback } from 'react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';

// Configuration Tally (désactivé temporairement suite à l'erreur 500 Cloudflare)
const TALLY_FORM_ID = 'pbbrPE';
const TALLY_BASE_URL = `https://tally.so/r/${TALLY_FORM_ID}`;

// Configuration Zoho (solution de secours)
const ZOHO_FORM_URL = 'https://forms.zohopublic.eu/julienmage1/form/InscriptionbtaMagellan/formperma/RlUNDvH_xgqPR8KaaHbheIF2o-0MIrgHVzP4H1iLj3k';

// Basculer sur true quand Tally sera réparé
const USE_TALLY = true;

export default function BetaSignup() {
  const [formUrl, setFormUrl] = useState(USE_TALLY ? TALLY_BASE_URL : ZOHO_FORM_URL);
  const [iframeKey, setIframeKey] = useState(0);
  const t = useTranslations('beta');

  useEffect(() => {
    if (typeof window !== 'undefined' && USE_TALLY) {
      try {
        const redirectUrl = `${window.location.origin}/#beta`;
        const urlWithRedirect = `${TALLY_BASE_URL}?redirect=${encodeURIComponent(redirectUrl)}`;
        setFormUrl(urlWithRedirect);
      } catch (error) {
        console.error('Erreur lors de la construction de l\'URL Tally:', error);
        setFormUrl(TALLY_BASE_URL);
      }
    }
  }, []);

  const resetForm = useCallback(() => {
    setIframeKey(prev => prev + 1);
    
    if (typeof window !== 'undefined' && USE_TALLY) {
      try {
        const redirectUrl = `${window.location.origin}/#beta`;
        const urlWithRedirect = `${TALLY_BASE_URL}?redirect=${encodeURIComponent(redirectUrl)}&t=${Date.now()}`;
        setFormUrl(urlWithRedirect);
      } catch (error) {
        console.error('Erreur lors de la réinitialisation du formulaire:', error);
        setFormUrl(TALLY_BASE_URL);
      }
    }
  }, []);

  return (
    <section id="beta" className="relative py-16 sm:py-20 md:py-24 scroll-mt-20 section-enter overflow-hidden" aria-labelledby="beta-heading">
      {/* Image d'arrière-plan - positionnée comme l'image du haut */}
      <div 
        className="absolute inset-0 w-full h-full pointer-events-none"
        style={{ 
          zIndex: 0,
        }}
      >
        <div
          className="absolute inset-0"
          style={{
            transform: 'scale(1.15)',
            willChange: 'transform',
          }}
        >
          <Image
            src="/imagedefondbas.png"
            alt="Fond bas Magellan"
            fill
            priority
            quality={90}
            className="object-cover"
            sizes="100vw"
            style={{
              objectPosition: 'center center'
            }}
            onError={() => {
              console.warn('Image de fond imagedefondbas.png non trouvée');
            }}
          />
        </div>
        {/* Overlay dégradé pour garder la lisibilité */}
        <div 
          className="absolute inset-0 bg-gradient-to-b from-surface-bg/40 via-surface-bg/60 to-surface-bg/80"
        />
      </div>
      
      <div className="relative z-10 rounded-3xl bg-gradient-to-br from-brand/10 via-brand/5 to-transparent border border-brand/20 p-6 sm:p-8 md:p-12">
        <div className="grid grid-cols-1 gap-8 sm:gap-10 md:gap-12 lg:grid-cols-2 lg:items-start">
          {/* Colonne gauche : Texte rassurant */}
          <header className="space-y-4 sm:space-y-6 min-w-0">
            <h2 id="beta-heading" className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-accent">
              {t('title')}
            </h2>
            <p className="text-lg sm:text-xl text-text-muted leading-relaxed">
              {t('subtitle')}
            </p>
            
            <div className="space-y-3 sm:space-y-4 pt-4">
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-brand/20 flex items-center justify-center mt-0.5">
                  <svg className="w-4 h-4 text-brand" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-semibold text-text-base mb-1">{t('items.earlyAccess.title')}</h3>
                  <p className="text-sm sm:text-base text-text-muted">{t('items.earlyAccess.description')}</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-accent/20 flex items-center justify-center mt-0.5">
                  <svg className="w-4 h-4 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-semibold text-text-base mb-1">{t('items.noSpam.title')}</h3>
                  <p className="text-sm sm:text-base text-text-muted">{t('items.noSpam.description')}</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-brand/20 flex items-center justify-center mt-0.5">
                  <svg className="w-4 h-4 text-brand" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-semibold text-text-base mb-1">{t('items.invitations.title')}</h3>
                  <p className="text-sm sm:text-base text-text-muted">{t('items.invitations.description')}</p>
                </div>
              </div>
            </div>
          </header>

          {/* Colonne droite : Container blanc arrondi avec iframe */}
          <div className="flex flex-col items-center min-w-0" aria-label="Formulaire d'inscription">
            <div className="w-full max-w-lg rounded-2xl bg-white shadow-2xl overflow-hidden border border-surface-border/20">
              <iframe
                key={iframeKey}
                title={t('formTitle')}
                className="w-full h-[600px] sm:h-[650px] md:h-[700px] border-0"
                frameBorder="0"
                allow="clipboard-write"
                src={formUrl}
                scrolling="auto"
                aria-label={t('formAriaLabel')}
              />
            </div>
            
            {USE_TALLY && (
              <p className="mt-4 text-xs sm:text-sm text-text-muted text-center w-full max-w-lg">
                {t('formReset')}{' '}
                <button
                  onClick={resetForm}
                  className="text-brand hover:text-brand-dark underline font-medium focus-visible:outline-2 focus-visible:outline-brand focus-visible:outline-offset-2 rounded active:text-brand-dark"
                  type="button"
                  aria-label={t('formResetAriaLabel')}
                >
                  {t('formResetLink')}
                </button>
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
