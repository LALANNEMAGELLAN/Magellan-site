type Benefit = { icon: string; title: string; desc: string };

const benefits: Benefit[] = [
  {
    icon: '📨',
    title: 'Regroupement intelligent',
    desc:
      "Magellan classe automatiquement vos photos, notes et souvenirs par destination, date et moments clés. Votre voyage s'organise tout seul."
  },
  {
    icon: '📁',
    title: "Création instantanée d'albums",
    desc:
      "En un clic, l'IA transforme vos voyages en récits interactifs, avec cartes, étapes et anecdotes prêtes à être revécues."
  },
  {
    icon: '🔗',
    title: 'Partage simplifié',
    desc:
      'Choisissez entre partage privé ou public, invitez vos proches et partagez vos albums sur les réseaux sociaux, sans quitter Magellan.'
  },
  {
    icon: '🛫',
    title: 'Assistant IA personnalisé',
    desc:
      'Un compagnon qui vous connaît : suggestions dynamiques de lieux, temps forts et idées de contenus, adaptées à vos préférences et au contexte de chaque voyage.'
  },
  {
    icon: '⚡️',
    title: 'Centralisation de vos informations',
    desc:
      'Centralisez vos réservations, itinéraires, emails et notes. Magellan transforme le chaos des préparatifs en un plan clair et partageable.'
  },
  {
    icon: '🔒',
    title: 'Confidentialité by design',
    desc:
      'Vos données restent vos données. Paramètres de confidentialité simples et transparents.'
  }
];

export default function Benefits() {
  if (!benefits || benefits.length === 0) {
    return null;
  }

  return (
    <section className="py-16" aria-labelledby="benefits-heading">
      <h2 id="benefits-heading" className="text-2xl font-semibold text-text-base">
        Pourquoi Magellan ?
      </h2>
      <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3" role="list">
        {benefits.map((benefit) => (
          <article 
            key={`${benefit.title}-${benefit.icon}`} 
            className="card h-full transition-shadow hover:shadow-md focus-within:ring-2 focus-within:ring-brand focus-within:ring-offset-2 rounded-2xl"
            role="listitem"
            tabIndex={0}
          >
            <div className="text-2xl" aria-hidden="true" role="img">
              {benefit.icon}
            </div>
            <h3 className="mt-3 text-lg font-semibold text-text-base">
              {benefit.title}
            </h3>
            <p className="muted mt-2">
              {benefit.desc}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}


