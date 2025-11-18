export default function MentionsLegalesPage() {
  return (
    <article className="py-12 sm:py-16">
      <header>
        <h1 className="text-3xl font-bold sm:text-4xl">Mentions légales</h1>
      </header>
      <section className="mt-8 max-w-3xl mx-auto space-y-8">
        <div className="space-y-3">
          <h2 className="text-2xl font-semibold text-text-base">Éditeur du site</h2>
          <p className="text-text-base">
            Magellan
          </p>
          <p className="muted">
            Application de voyage intelligente reposant sur l'intelligence artificielle générative.
          </p>
          <p className="text-text-base">
            Contact : <a href="mailto:contact@magellan.app" className="font-semibold text-brand hover:text-brand-dark">contact@magellan.app</a>
          </p>
        </div>

        <div className="space-y-3">
          <h2 className="text-2xl font-semibold text-text-base">Hébergement</h2>
          <p className="muted">
            Ce site est hébergé par :
          </p>
          <p className="text-text-base font-semibold">
            Vercel Inc.
          </p>
          <p className="muted">
            440 N Barranca Ave #4133, Covina, CA 91723, États-Unis
          </p>
          <p className="muted">
            Site : <a href="https://vercel.com" target="_blank" rel="noopener noreferrer" className="text-brand hover:text-brand-dark">https://vercel.com</a>
          </p>
        </div>

        <div className="space-y-3">
          <h2 className="text-2xl font-semibold text-text-base">Propriété intellectuelle</h2>
          <p className="muted">
            L'ensemble des contenus présents sur ce site (textes, visuels, logos, éléments graphiques et code) est la propriété exclusive de Magellan, sauf mention contraire.
          </p>
          <p className="muted">
            Toute reproduction, modification ou diffusion, totale ou partielle, sans autorisation préalable, est strictement interdite.
          </p>
        </div>

        <div className="space-y-3">
          <h2 className="text-2xl font-semibold text-text-base">Données personnelles et confidentialité</h2>
          <p className="muted">
            Magellan accorde une importance essentielle à la protection de vos données.
          </p>
          <p className="muted">
            Les informations collectées via ce site (formulaire de contact, inscription bêta…) sont utilisées uniquement pour répondre à vos demandes et vous permettre d'accéder aux services Magellan.
          </p>
          <p className="muted">
            Vous disposez d'un droit d'accès, de rectification, d'opposition, de suppression et de portabilité conformément au RGPD.
          </p>
          <p className="text-text-base">
            Pour exercer vos droits : <a href="mailto:contact@magellan.app" className="font-semibold text-brand hover:text-brand-dark">contact@magellan.app</a>
          </p>
        </div>

        <div className="space-y-3">
          <h2 className="text-2xl font-semibold text-text-base">Cookies</h2>
          <p className="muted">
            Le site peut utiliser des cookies pour la mesure d'audience et l'amélioration de l'expérience utilisateur.
          </p>
          <p className="muted">
            Vous pouvez configurer votre navigateur pour accepter, refuser ou supprimer les cookies à tout moment.
          </p>
        </div>

        <div className="space-y-3">
          <h2 className="text-2xl font-semibold text-text-base">Responsabilité</h2>
          <p className="muted">
            Les informations fournies sur ce site le sont à titre indicatif.
          </p>
          <p className="muted">
            Magellan se réserve le droit de modifier son contenu à tout moment et ne saurait être tenue responsable d'une mauvaise utilisation du site.
          </p>
        </div>

        <div className="space-y-3">
          <h2 className="text-2xl font-semibold text-text-base">Droit applicable</h2>
          <p className="muted">
            Les présentes mentions légales sont régies par le droit français.
          </p>
          <p className="muted">
            En cas de litige, les tribunaux français seront seuls compétents.
          </p>
        </div>
      </section>
    </article>
  );
}

