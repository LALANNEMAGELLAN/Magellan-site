export default function CookiesPage() {
  return (
    <article className="py-12 sm:py-16">
      <header>
        <h1 className="text-3xl font-bold sm:text-4xl">Politique de cookies</h1>
      </header>
      <section className="mt-8 max-w-3xl mx-auto space-y-8">
        <div className="space-y-3">
          <h2 className="text-xl font-semibold text-text-base mt-8 mb-2">1. Introduction</h2>
          <p className="text-sm md:text-base text-text-muted leading-relaxed">
            Le site Magellan peut utiliser des cookies et technologies similaires afin d'améliorer votre expérience, de mesurer l'audience et d'assurer le bon fonctionnement du service.
          </p>
          <p className="text-sm md:text-base text-text-muted leading-relaxed">
            Un cookie est un petit fichier texte déposé sur votre terminal (ordinateur, smartphone, tablette) lorsque vous visitez un site web.
          </p>
        </div>

        <div className="space-y-3">
          <h2 className="text-xl font-semibold text-text-base mt-8 mb-2">2. Types de cookies utilisés</h2>
          
          <h3 className="text-lg font-semibold text-text-base mt-6 mb-2">Cookies strictement nécessaires</h3>
          <p className="text-sm md:text-base text-text-muted leading-relaxed">
            Ces cookies sont indispensables au fonctionnement du site (sécurité, affichage, navigation). Vous ne pouvez pas les désactiver.
          </p>

          <h3 className="text-lg font-semibold text-text-base mt-6 mb-2">Cookies de mesure d'audience</h3>
          <p className="text-sm md:text-base text-text-muted leading-relaxed">
            Ils nous permettent de comprendre comment le site est utilisé (pages vues, temps passé, erreurs éventuelles) et d'améliorer le service.
          </p>
          <p className="text-sm md:text-base text-text-muted leading-relaxed">
            Les données collectées sont anonymisées.
          </p>
          <p className="text-sm md:text-base text-text-muted leading-relaxed">
            Magellan n'utilise pas de cookies publicitaires ni de traceurs à des fins de ciblage commercial.
          </p>
        </div>

        <div className="space-y-3">
          <h2 className="text-xl font-semibold text-text-base mt-8 mb-2">3. Consentement</h2>
          <p className="text-sm md:text-base text-text-muted leading-relaxed">
            Lors de votre première visite, un bandeau d'information vous permet d'accepter ou de refuser certains cookies non essentiels (comme les cookies de mesure d'audience).
          </p>
          <p className="text-sm md:text-base text-text-muted leading-relaxed">
            Vous pouvez modifier votre choix à tout moment en configurant votre navigateur ou en effaçant les cookies de votre terminal.
          </p>
        </div>

        <div className="space-y-3">
          <h2 className="text-xl font-semibold text-text-base mt-8 mb-2">4. Gestion des cookies dans votre navigateur</h2>
          <p className="text-sm md:text-base text-text-muted leading-relaxed">
            Vous pouvez configurer votre navigateur pour :
          </p>
          <ul className="list-disc list-inside space-y-2 text-sm md:text-base text-text-muted leading-relaxed ml-4">
            <li>accepter tous les cookies</li>
            <li>les refuser systématiquement</li>
            <li>être informé lorsqu'un cookie est déposé</li>
          </ul>
          <p className="text-sm md:text-base text-text-muted leading-relaxed mt-3">
            La configuration se fait généralement dans les paramètres ou préférences de votre navigateur (Chrome, Safari, Firefox, Edge…).
          </p>
        </div>

        <div className="space-y-3">
          <h2 className="text-xl font-semibold text-text-base mt-8 mb-2">5. Contact</h2>
          <p className="text-sm md:text-base text-text-muted leading-relaxed">
            Pour toute question relative aux cookies et au traitement de vos données :
          </p>
          <p className="text-sm md:text-base text-text-base">
            <a href="mailto:privacy@magellan.app" className="font-semibold text-brand hover:text-brand-dark">privacy@magellan.app</a>
          </p>
        </div>
      </section>
    </article>
  );
}









