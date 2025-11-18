export default function PolitiqueConfidentialitePage() {
  return (
    <article className="py-12 sm:py-16">
      <header>
        <h1 className="text-3xl font-bold sm:text-4xl">Politique de confidentialité</h1>
      </header>
      <section className="mt-8 max-w-3xl mx-auto space-y-8">
        <div className="space-y-4">
          <p className="text-sm md:text-base text-text-muted leading-relaxed">
            Magellan (« nous », « l'application ») accorde une importance essentielle à la protection de vos données personnelles. La présente Politique de confidentialité explique quelles données nous collectons, comment nous les utilisons et quels sont vos droits.
          </p>
        </div>

        <div className="space-y-3">
          <h2 className="text-xl font-semibold text-text-base mt-8 mb-2">1. Responsable de traitement</h2>
          <p className="text-sm md:text-base text-text-muted leading-relaxed">
            Magellan est édité par Julien Lalanne.
          </p>
          <p className="text-sm md:text-base text-text-muted leading-relaxed">
            Pour toute question relative à vos données :
          </p>
          <p className="text-sm md:text-base text-text-base">
            <a href="mailto:privacy@magellan.app" className="font-semibold text-brand hover:text-brand-dark">privacy@magellan.app</a>
          </p>
        </div>

        <div className="space-y-3">
          <h2 className="text-xl font-semibold text-text-base mt-8 mb-2">2. Données collectées</h2>
          <p className="text-sm md:text-base text-text-muted leading-relaxed">
            Nous collectons uniquement les données nécessaires au fonctionnement de l'application :
          </p>
          
          <h3 className="text-lg font-semibold text-text-base mt-6 mb-2">2.1 Données fournies par vous</h3>
          <ul className="list-disc list-inside space-y-2 text-sm md:text-base text-text-muted leading-relaxed ml-4">
            <li>Nom, prénom</li>
            <li>Adresse e-mail</li>
            <li>Photos, vidéos et notes importées dans vos albums</li>
            <li>Informations sur vos voyages (lieux, dates, étapes, documents)</li>
          </ul>

          <h3 className="text-lg font-semibold text-text-base mt-6 mb-2">2.2 Données collectées automatiquement</h3>
          <ul className="list-disc list-inside space-y-2 text-sm md:text-base text-text-muted leading-relaxed ml-4">
            <li>Informations techniques (modèle de l'appareil, système d'exploitation, identifiant de session)</li>
            <li>Statistiques d'usage de l'application (pages vues, temps de consultation)</li>
          </ul>

          <h3 className="text-lg font-semibold text-text-base mt-6 mb-2">2.3 Données analysées par l'IA</h3>
          <p className="text-sm md:text-base text-text-muted leading-relaxed">
            Magellan utilise l'intelligence artificielle pour :
          </p>
          <ul className="list-disc list-inside space-y-2 text-sm md:text-base text-text-muted leading-relaxed ml-4">
            <li>classer automatiquement vos photos et souvenirs</li>
            <li>générer des récits interactifs</li>
            <li>reconnaître certains lieux pour vous fournir du contexte culturel</li>
          </ul>
          <p className="text-sm md:text-base text-text-muted leading-relaxed mt-3">
            Ces traitements se font uniquement dans le cadre de votre utilisation de l'application.
          </p>
        </div>

        <div className="space-y-3">
          <h2 className="text-xl font-semibold text-text-base mt-8 mb-2">3. Finalités</h2>
          <p className="text-sm md:text-base text-text-muted leading-relaxed">
            Vos données sont utilisées pour :
          </p>
          <ul className="list-disc list-inside space-y-2 text-sm md:text-base text-text-muted leading-relaxed ml-4">
            <li>créer et gérer votre compte utilisateur</li>
            <li>générer vos albums, récits et cartes de voyage</li>
            <li>faciliter le partage de vos contenus avec vos proches</li>
            <li>améliorer l'expérience et les fonctionnalités de Magellan</li>
            <li>assurer la sécurité et le bon fonctionnement du service</li>
          </ul>
          <p className="text-sm md:text-base text-text-muted leading-relaxed mt-3">
            Nous ne revendons jamais vos données.
          </p>
        </div>

        <div className="space-y-3">
          <h2 className="text-xl font-semibold text-text-base mt-8 mb-2">4. Bases légales</h2>
          <p className="text-sm md:text-base text-text-muted leading-relaxed">
            Les traitements sont fondés sur :
          </p>
          <ul className="list-disc list-inside space-y-2 text-sm md:text-base text-text-muted leading-relaxed ml-4">
            <li>votre consentement (photos, localisation, personnalisation)</li>
            <li>l'exécution du contrat (création et gestion de compte)</li>
            <li>notre intérêt légitime (sécurité, amélioration du service)</li>
          </ul>
        </div>

        <div className="space-y-3">
          <h2 className="text-xl font-semibold text-text-base mt-8 mb-2">5. Partage des données</h2>
          <p className="text-sm md:text-base text-text-muted leading-relaxed">
            Nous pouvons partager certaines données avec :
          </p>
          <ul className="list-disc list-inside space-y-2 text-sm md:text-base text-text-muted leading-relaxed ml-4">
            <li>nos prestataires techniques (hébergement, analytics, services d'IA)</li>
            <li>les personnes avec lesquelles vous choisissez de partager vos albums</li>
          </ul>
          <p className="text-sm md:text-base text-text-muted leading-relaxed mt-3">
            Nous ne partageons pas vos données avec des partenaires à des fins de publicité ciblée.
          </p>
        </div>

        <div className="space-y-3">
          <h2 className="text-xl font-semibold text-text-base mt-8 mb-2">6. Durée de conservation</h2>
          <ul className="list-disc list-inside space-y-2 text-sm md:text-base text-text-muted leading-relaxed ml-4">
            <li>Compte utilisateur : tant qu'il est actif ou jusqu'à sa suppression</li>
            <li>Contenus (photos, notes, albums) : tant que vous les conservez dans l'app</li>
            <li>Données techniques et statistiques : jusqu'à 13 mois</li>
            <li>Journaux de sécurité : jusqu'à 6 mois</li>
          </ul>
        </div>

        <div className="space-y-3">
          <h2 className="text-xl font-semibold text-text-base mt-8 mb-2">7. Vos droits</h2>
          <p className="text-sm md:text-base text-text-muted leading-relaxed">
            Conformément au RGPD, vous disposez de :
          </p>
          <ul className="list-disc list-inside space-y-2 text-sm md:text-base text-text-muted leading-relaxed ml-4">
            <li>droit d'accès</li>
            <li>droit de rectification</li>
            <li>droit de suppression</li>
            <li>droit d'opposition</li>
            <li>droit à la portabilité</li>
            <li>droit à la limitation du traitement</li>
          </ul>
          <p className="text-sm md:text-base text-text-base mt-3">
            Pour exercer vos droits : <a href="mailto:privacy@magellan.app" className="font-semibold text-brand hover:text-brand-dark">privacy@magellan.app</a>
          </p>
        </div>

        <div className="space-y-3">
          <h2 className="text-xl font-semibold text-text-base mt-8 mb-2">8. Sécurité</h2>
          <p className="text-sm md:text-base text-text-muted leading-relaxed">
            Nous mettons en œuvre des mesures techniques et organisationnelles pour protéger vos données (chiffrement des échanges, accès restreint, sauvegardes sécurisées).
          </p>
        </div>

        <div className="space-y-3">
          <h2 className="text-xl font-semibold text-text-base mt-8 mb-2">9. Mise à jour</h2>
          <p className="text-sm md:text-base text-text-muted leading-relaxed">
            La présente Politique de confidentialité peut être mise à jour. La date de dernière mise à jour sera indiquée en bas de page.
          </p>
        </div>
      </section>
    </article>
  );
}









