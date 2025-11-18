'use client';

import { useEffect, useState, useCallback } from 'react';

// Configuration Tally (désactivé temporairement suite à l'erreur 500 Cloudflare)
const TALLY_FORM_ID = 'pbbrPE';
const TALLY_BASE_URL = `https://tally.so/r/${TALLY_FORM_ID}`;

// Configuration Zoho (solution de secours)
const ZOHO_FORM_URL = 'https://forms.zohopublic.eu/julienmage1/form/InscriptionbtaMagellan/formperma/RlUNDvH_xgqPR8KaaHbheIF2o-0MIrgHVzP4H1iLj3k';

// Basculer sur true quand Tally sera réparé
const USE_TALLY = false;

export default function BetaSignup() {
  const [formUrl, setFormUrl] = useState(USE_TALLY ? TALLY_BASE_URL : ZOHO_FORM_URL);
  const [iframeKey, setIframeKey] = useState(0);

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
    <section id="beta" className="py-12 sm:py-16 scroll-mt-20" aria-labelledby="beta-heading">
      <div className="grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2 md:items-start">
        <header className="space-y-3 sm:space-y-4 min-w-0">
          <h2 id="beta-heading" className="text-2xl sm:text-3xl font-semibold text-text-base break-words">
            Rejoindre la bêta Magellan
          </h2>
          <p className="text-sm sm:text-base text-text-muted break-words">
            Laissez votre email pour faire partie des premiers voyageurs à tester Magellan
            et recevoir les nouveautés en avant-première.
          </p>
          <ul className="text-xs sm:text-sm text-text-muted space-y-1">
            <li>• Accès anticipé aux nouvelles fonctionnalités</li>
            <li>• Invitations pour partager vos retours</li>
            <li>• Aucune publicité, aucun spam.</li>
          </ul>
        </header>

        <div className="flex flex-col items-center min-w-0" aria-label="Formulaire d'inscription">
          <div className="w-full max-w-full sm:max-w-[450px] rounded-lg shadow-sm overflow-hidden bg-transparent">
            <iframe
              key={iframeKey}
              title="Inscription bêta Magellan"
              className="w-full h-[600px] sm:h-[700px] md:h-[850px] rounded-xl border-0"
              frameBorder="0"
              allow="clipboard-write"
              src={formUrl}
              scrolling="auto"
              aria-label="Formulaire d'inscription à la bêta Magellan"
            />
          </div>
          
          {USE_TALLY && (
            <p className="mt-2 text-xs text-text-muted text-center w-full max-w-full sm:max-w-[450px]">
              Si vous rencontrez un problème,{' '}
              <button
                onClick={resetForm}
                className="text-brand hover:text-brand-dark underline font-medium focus:outline-none focus:ring-2 focus:ring-brand focus:ring-offset-2 rounded"
                type="button"
                aria-label="Réinitialiser le formulaire"
              >
                réinitialisez le formulaire
              </button>
            </p>
          )}
        </div>
      </div>
    </section>
  );
}


