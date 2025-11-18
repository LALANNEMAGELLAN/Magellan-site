export default function BetaSignup() {

  return (
    <section id="beta" className="py-16" aria-labelledby="beta-heading">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:items-center">
        <header className="space-y-4">
          <h2 id="beta-heading" className="text-2xl md:text-3xl font-semibold text-text-base">
            Rejoindre la bêta Magellan
          </h2>
          <p className="text-text-muted">
            Laissez votre email pour faire partie des premiers voyageurs à tester Magellan
            et recevoir les nouveautés en avant-première.
          </p>
          <ul className="text-sm text-text-muted space-y-1">
            <li>• Accès anticipé aux nouvelles fonctionnalités</li>
            <li>• Invitations pour partager vos retours</li>
            <li>• Aucune publicité, aucun spam.</li>
          </ul>
        </header>

        <div className="flex justify-center" aria-label="Formulaire d'inscription">
          <div className="w-full max-w-[450px] rounded-lg shadow-sm overflow-hidden bg-transparent">
            <iframe
              aria-label="Inscription bêta Magellan"
              frameBorder={0}
              style={{
                width: '100%',
                height: '850px',
                border: 'none',
                background: 'transparent',
                borderRadius: '12px',
              }}
              src="https://forms.zohopublic.eu/julienmage1/form/InscriptionbtaMagellan/formperma/RlUNDvH_xgqPR8KaaHbheIF2o-0MIrgHVzP4H1iLj3k"
              scrolling="no"
              allow="clipboard-write"
            />
          </div>
        </div>
      </div>
    </section>
  );
}


