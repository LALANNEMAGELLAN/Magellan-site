'use client';

import { useCallback, useState } from 'react';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_MESSAGE_LENGTH = 5000;
const MAX_EMAIL_LENGTH = 254;

export function ContactForm() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateEmail = useCallback((emailValue: string): boolean => {
    if (!emailValue.trim()) return false;
    if (emailValue.length > MAX_EMAIL_LENGTH) return false;
    return EMAIL_REGEX.test(emailValue);
  }, []);

  const validateMessage = useCallback((messageValue: string): boolean => {
    if (!messageValue.trim()) return false;
    if (messageValue.length > MAX_MESSAGE_LENGTH) return false;
    return true;
  }, []);

  const onSubmit = useCallback(
    (event: React.FormEvent) => {
      event.preventDefault();
      setError(null);

      // Validation
      if (!validateEmail(email)) {
        setError('Veuillez entrer une adresse email valide.');
        return;
      }

      if (!validateMessage(message)) {
        setError(`Le message doit contenir entre 1 et ${MAX_MESSAGE_LENGTH} caractères.`);
        return;
      }

      setIsSubmitting(true);

      try {
        const to = 'contact@magellan.app';
        const subject = encodeURIComponent("Message depuis le site Magellan");
        const sanitizedEmail = email.trim().slice(0, MAX_EMAIL_LENGTH);
        const sanitizedMessage = message.trim().slice(0, MAX_MESSAGE_LENGTH);
        const body = encodeURIComponent(
          `Email: ${sanitizedEmail}\n\nMessage:\n${sanitizedMessage}`
        );
        
        const mailtoLink = `mailto:${to}?subject=${subject}&body=${body}`;
        
        // Vérifier que le lien est valide
        if (mailtoLink.length > 2000) {
          throw new Error('Le message est trop long pour être envoyé par email.');
        }

        window.location.href = mailtoLink;
        setSent(true);
        
        // Réinitialiser après 3 secondes
        setTimeout(() => {
          setEmail('');
          setMessage('');
          setSent(false);
        }, 3000);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Une erreur est survenue. Veuillez réessayer.';
        setError(errorMessage);
        console.error('Erreur lors de l\'envoi du formulaire:', err);
      } finally {
        setIsSubmitting(false);
      }
    },
    [email, message, validateEmail, validateMessage]
  );

  const handleEmailChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.length <= MAX_EMAIL_LENGTH) {
      setEmail(value);
      setError(null);
    }
  }, []);

  const handleMessageChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    if (value.length <= MAX_MESSAGE_LENGTH) {
      setMessage(value);
      setError(null);
    }
  }, []);

  return (
    <form onSubmit={onSubmit} className="card space-y-4" noValidate>
      {error && (
        <div className="rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-800" role="alert">
          {error}
        </div>
      )}
      
      <div>
        <label htmlFor="email" className="mb-1 block text-sm font-medium text-text-base">
          Email <span className="text-red-500" aria-label="requis">*</span>
        </label>
        <input
          id="email"
          type="email"
          required
          value={email}
          onChange={handleEmailChange}
          placeholder="vous@exemple.com"
          maxLength={MAX_EMAIL_LENGTH}
          autoComplete="email"
          aria-required="true"
          aria-invalid={error && !validateEmail(email) ? 'true' : 'false'}
          className="w-full rounded-md border border-surface-border bg-white px-4 py-2 text-text-base placeholder:text-text-muted outline-none transition-colors focus:border-brand focus:ring-2 focus:ring-brand/20"
        />
      </div>
      
      <div>
        <label htmlFor="message" className="mb-1 block text-sm font-medium text-text-base">
          Message <span className="text-red-500" aria-label="requis">*</span>
        </label>
        <textarea
          id="message"
          required
          rows={5}
          value={message}
          onChange={handleMessageChange}
          placeholder="Dites-nous ce dont vous avez besoin..."
          maxLength={MAX_MESSAGE_LENGTH}
          aria-required="true"
          aria-invalid={error && !validateMessage(message) ? 'true' : 'false'}
          className="w-full rounded-md border border-surface-border bg-white px-4 py-2 text-text-base placeholder:text-text-muted outline-none transition-colors focus:border-brand focus:ring-2 focus:ring-brand/20 resize-y"
        />
        <p className="mt-1 text-xs text-text-muted">
          {message.length} / {MAX_MESSAGE_LENGTH} caractères
        </p>
      </div>
      
      <div className="flex items-center justify-start gap-4">
        <button 
          type="submit" 
          className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={isSubmitting || !email.trim() || !message.trim()}
          aria-label="Envoyer le message"
        >
          {isSubmitting ? 'Envoi en cours...' : 'Envoyer mon message'}
        </button>
        {sent && (
          <span className="text-sm text-emerald-600" role="status">
            Ouverture de votre client mail…
          </span>
        )}
      </div>
    </form>
  );
}



