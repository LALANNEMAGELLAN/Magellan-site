export default function BetaSignup() {

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

        <div className="flex justify-center" aria-label="Formulaire d'inscription">
          <div className="w-full max-w-[450px] rounded-lg shadow-sm overflow-hidden bg-transparent">
            <iframe
              aria-label="Inscription bêta Magellan"
              frameBorder={0}
              className="w-full h-[600px] sm:h-[700px] md:h-[850px] border-0 bg-transparent rounded-xl"
              src="https://forms.zohopublic.eu/julienmage1/form/InscriptionbtaMagellan/formperma/RlUNDvH_xgqPR8KaaHbheIF2o-0MIrgHVzP4H1iLj3k"
              scrolling="auto"
              allow="clipboard-write"
            />
          </div>
        </div>
      </div>
    </section>
  );
}


