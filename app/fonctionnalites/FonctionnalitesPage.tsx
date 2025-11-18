export default function FonctionnalitesPage() {
  const features = [
    {
      icon: "📍",
      title: "Profitez pleinement de l'instant présent",
      desc:
        "Magellan devient votre guide personnel : découvrez instantanément l'histoire des lieux visités et les bons plans autour de vous, sans quitter l'instant."
    },
    {
      icon: "🗺️",
      title: "Carte interactive de vos voyages",
      desc:
        "Visualisez votre parcours sur une carte dynamique : étapes, photos et kilomètres parcourus. Revivez votre voyage d'un coup d'œil et partagez-le avec vos proches."
    },
    {
      icon: "📸",
      title: "Partagez un album photo commun",
      desc:
        "Chaque voyage devient un album partagé. Ajoutez vos photos, vidéos et souvenirs au même endroit, accessibles facilement par tous les participants."
    },
    {
      icon: "📱",
      title: "Partagez les meilleurs moments sans effort",
      desc:
        "Une photo, une journée ou tout le séjour : partagez en quelques secondes avec les personnes de votre choix ou sur vos réseaux sociaux préférés."
    },
    {
      icon: "💬",
      title: "Chat intégré par album",
      desc:
        "Discutez directement dans chaque album avec les autres Magellistes. Commentez, réagissez et organisez-vous avant, pendant et après le voyage."
    },
    {
      icon: "🌍",
      title: "Inspirez-vous de voyages époustouflants",
      desc:
        "Les Magellistes partagent leurs expériences partout dans le monde. Trouvez de nouvelles destinations adaptées à vos envies, vos habitudes et votre budget."
    }
  ];

  return (
    <article className="py-12 sm:py-16">
      <header>
        <h1 className="text-3xl font-bold sm:text-4xl">Fonctionnalités</h1>
        <p className="muted mt-3 max-w-2xl">
          Tout ce qu'il vous faut pour transformer chaque voyage en expérience fluide, mémorable et partagée.
        </p>
      </header>
      <section className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3" aria-label="Liste des fonctionnalités">
        {features.map((f) => (
          <article key={f.title} className="card">
            <div className="text-2xl mb-3" aria-hidden="true">{f.icon}</div>
            <h2 className="text-lg font-semibold text-text-base">{f.title}</h2>
            <p className="muted mt-2">{f.desc}</p>
          </article>
        ))}
      </section>
    </article>
  );
}

