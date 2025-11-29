'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { X } from 'lucide-react';
import Image from 'next/image';

export default function LoginModal() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignup, setIsSignup] = useState(false);
  const router = useRouter();
  const t = useTranslations('login');

  const handleClose = () => {
    router.back();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implémenter la logique de connexion
    console.log('Login:', { email, password });
  };

  return (
    <div className="fixed inset-0 z-[20000] flex items-center justify-center p-4 overflow-y-auto">
      {/* Overlay avec blur */}
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-md"
        onClick={handleClose}
      />
      
      {/* Modal */}
      <div className="relative w-full max-w-5xl bg-white rounded-2xl shadow-2xl overflow-hidden z-10 my-8">
        {/* Bouton de fermeture */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-white/90 hover:bg-white flex items-center justify-center transition-colors shadow-lg"
          aria-label={t('close')}
        >
          <X className="w-5 h-5 text-gray-800" />
        </button>

        <div className="flex flex-col md:flex-row min-h-[600px]">
          {/* Section gauche : Formulaire */}
          <div className="w-full md:w-1/2 bg-white p-8 md:p-12 flex flex-col justify-center">
            <div className="max-w-md mx-auto w-full">
              {/* Titre */}
              <h1 className="text-3xl md:text-4xl font-bold text-black mb-2">
                {isSignup ? t('signupTitle') : t('loginTitle')}
              </h1>
              
              {/* Lien inscription/connexion */}
              <p className="text-black mb-8">
                {isSignup ? t('alreadyHaveAccount') : t('newUser')}{' '}
                <button
                  onClick={() => setIsSignup(!isSignup)}
                  className="text-brand hover:underline font-medium"
                >
                  {isSignup ? t('loginLink') : t('signupLink')}
                </button>
              </p>

              {/* Formulaire */}
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Email */}
                <div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={t('emailPlaceholder')}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent text-black placeholder-gray-400"
                  />
                </div>

                {/* Mot de passe */}
                <div>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder={t('passwordPlaceholder')}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand focus:border-transparent text-black placeholder-gray-400"
                  />
                </div>

                {/* Bouton Continuer */}
                <button
                  type="submit"
                  className="w-full bg-teal-500 hover:bg-teal-600 text-white font-medium py-3 rounded-lg transition-colors"
                >
                  {t('continue')}
                </button>

                {/* Mot de passe oublié */}
                {!isSignup && (
                  <div className="text-center">
                    <button
                      type="button"
                      className="text-black hover:underline text-sm"
                    >
                      {t('forgotPassword')}
                    </button>
                  </div>
                )}
              </form>

              {/* Séparateur */}
              <div className="my-8 flex items-center">
                <div className="flex-1 border-t border-gray-300"></div>
                <span className="px-4 text-gray-500 text-sm">{t('or')}</span>
                <div className="flex-1 border-t border-gray-300"></div>
              </div>

              {/* Connexions sociales */}
              <div className="space-y-3">
                {/* Google */}
                <button
                  type="button"
                  className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-black"
                >
                  <div className="w-5 h-5 bg-blue-500 rounded text-white flex items-center justify-center font-bold text-xs">
                    G
                  </div>
                  <span>{t('continueWithGoogle')}</span>
                </button>

                {/* Apple */}
                <button
                  type="button"
                  className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-black"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
                  </svg>
                  <span>{t('continueWithApple')}</span>
                </button>

                {/* Facebook */}
                <button
                  type="button"
                  className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-black"
                >
                  <div className="w-5 h-5 bg-blue-600 rounded text-white flex items-center justify-center font-bold text-xs">
                    f
                  </div>
                  <span>{t('continueWithFacebook')}</span>
                </button>
              </div>

              {/* Conditions d'utilisation */}
              <p className="mt-8 text-xs text-gray-600 text-center">
                {t('termsText')}{' '}
                <a href="/cgu" className="underline hover:text-brand">
                  {t('termsLink')}
                </a>
                {' '}{t('and')}{' '}
                <a href="/politique-de-confidentialite" className="underline hover:text-brand">
                  {t('privacyLink')}
                </a>
                .
              </p>
            </div>
          </div>

          {/* Section droite : Image promotionnelle */}
          <div className="w-full md:w-1/2 relative overflow-hidden">
            {/* Image de fond avec bâtiment traditionnel */}
            <div className="absolute inset-0">
              <Image
                src="/Imagedefondsitemagellan.png"
                alt="Magellan"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                unoptimized
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

