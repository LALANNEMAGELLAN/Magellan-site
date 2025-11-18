'use client';

import { useEffect, useState, useCallback } from 'react';

const TALLY_FORM_ID = 'pbbrPE';
const TALLY_BASE_URL = `https://tally.so/r/${TALLY_FORM_ID}`;

export default function BetaSignup() {
  const [tallyFormUrl, setTallyFormUrl] = useState(TALLY_BASE_URL);
  const [iframeKey, setIframeKey] = useState(0);
  const [iframeError, setIframeError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const redirectUrl = `${window.location.origin}/#beta`;
        const urlWithRedirect = `${TALLY_BASE_URL}?redirect=${encodeURIComponent(redirectUrl)}`;
        setTallyFormUrl(urlWithRedirect);
      } catch (error) {
        console.error('Erreur lors de la construction de l\'URL Tally:', error);
        setTallyFormUrl(TALLY_BASE_URL);
      }
    }
  }, []);

  const resetForm = useCallback(() => {
    setIframeError(false);
    setIsLoading(true);
    setIframeKey(prev => prev + 1);
    
    if (typeof window !== 'undefined') {
      try {
        const redirectUrl = `${window.location.origin}/#beta`;
        const urlWithRedirect = `${TALLY_BASE_URL}?redirect=${encodeURIComponent(redirectUrl)}&t=${Date.now()}`;
        setTallyFormUrl(urlWithRedirect);
      } catch (error) {
        console.error('Erreur lors de la réinitialisation du formulaire:', error);
        setTallyFormUrl(TALLY_BASE_URL);
      }
    }
  }, []);

  const handleIframeLoad = useCallback(() => {
    setIsLoading(false);
    setIframeError(false);
  }, []);

  const handleIframeError = useCallback(() => {
    setIsLoading(false);
    setIframeError(true);
  }, []);

  return (
    <section id="beta" className="py-12 sm:py-16 scroll-mt-20" aria-labelledby="beta-heading">
      <div className="grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2 md:items-start">
        <header className="space-y-3 sm:space-y-4">
          <h2 id="beta-heading" className="text-2xl sm:text-3xl font-semibold text-text-base">
            Rejoindre la bêta Magellan
          </h2>
          <p className="text-sm sm:text-base text-text-muted">
            Laissez votre email pour faire partie des premiers voyageurs à tester Magellan
            et recevoir les nouveautés en avant-première.
          </p>
          <ul className="text-xs sm:text-sm text-text-muted space-y-1">
            <li>• Accès anticipé aux nouvelles fonctionnalités</li>
            <li>• Invitations pour partager vos retours</li>
            <li>• Aucune publicité, aucun spam.</li>
          </ul>
        </header>

        <div className="flex flex-col items-center" aria-label="Formulaire d'inscription">
          <div className="w-full max-w-[450px] rounded-lg shadow-sm overflow-hidden bg-transparent">
            {isLoading && !iframeError && (
              <div className="flex items-center justify-center bg-white/80 rounded-xl min-h-[600px] sm:min-h-[700px] md:min-h-[850px]">
                <div className="text-center">
                  <div className="inline-block h-6 w-6 animate-spin rounded-full border-2 border-solid border-brand border-r-transparent" role="status" aria-label="Chargement">
                    <span className="sr-only">Chargement du formulaire...</span>
                  </div>
                  <p className="mt-2 text-sm text-text-muted">Chargement du formulaire...</p>
                </div>
              </div>
            )}
            
            {iframeError ? (
              <div className="flex min-h-[400px] flex-col items-center justify-center rounded-xl border border-surface-border bg-surface-bg p-8 text-center">
                <p className="mb-4 text-text-base">Le formulaire n'a pas pu être chargé.</p>
                <button
                  onClick={resetForm}
                  className="btn-primary"
                  type="button"
                  aria-label="Réessayer de charger le formulaire"
                >
                  Réessayer
                </button>
                <p className="mt-4 text-xs text-text-muted">
                  Ou contactez-nous directement à{' '}
                  <a href="mailto:contact@magellan.app" className="text-brand hover:text-brand-dark underline">
                    contact@magellan.app
                  </a>
                </p>
              </div>
            ) : (
              <iframe
                key={iframeKey}
                src={tallyFormUrl}
                title="Inscription bêta Magellan"
                className="w-full h-[600px] sm:h-[700px] md:h-[850px] rounded-xl border-0"
                frameBorder="0"
                loading="lazy"
                allow="clipboard-write"
                onLoad={handleIframeLoad}
                onError={handleIframeError}
                aria-label="Formulaire d'inscription à la bêta Magellan"
              />
            )}
          </div>
          
          {!iframeError && (
            <p className="mt-2 text-xs text-text-muted text-center w-full max-w-[450px]">
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


