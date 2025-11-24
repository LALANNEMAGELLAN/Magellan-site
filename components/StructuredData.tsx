export default function StructuredData() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Magellan",
    description: "Votre compagnon de voyage intelligent",
    url: process.env.NEXT_PUBLIC_SITE_URL || "https://magellan.app",
    logo: `${process.env.NEXT_PUBLIC_SITE_URL || "https://magellan.app"}/logo-magellan.svg`,
    sameAs: [
      // Ajoutez vos réseaux sociaux ici
      // "https://twitter.com/magellan",
      // "https://linkedin.com/company/magellan",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "Support client",
      email: "contact@magellan.app",
    },
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Magellan",
    url: process.env.NEXT_PUBLIC_SITE_URL || "https://magellan.app",
    description: "Explorez le monde autrement : Magellan révèle les histoires derrière chaque lieu et crée automatiquement des souvenirs interactifs qui vous ressemblent.",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${process.env.NEXT_PUBLIC_SITE_URL || "https://magellan.app"}/fonctionnalites?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };

  const softwareApplicationSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Magellan",
    applicationCategory: "TravelApplication",
    operatingSystem: "iOS, Android, Web",
    description: "Application de voyage intelligente qui centralise vos réservations, itinéraires, emails et notes. Crée automatiquement des souvenirs interactifs de vos voyages.",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "EUR",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      ratingCount: "150",
    },
    featureList: [
      "Regroupement intelligent des photos et souvenirs",
      "Création instantanée d'albums de voyage",
      "Partage simplifié avec vos proches",
      "Assistant IA personnalisé",
      "Centralisation des réservations et itinéraires",
      "Mode hors ligne",
    ],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Qu'est-ce que Magellan ?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Magellan est votre compagnon de voyage intelligent qui centralise vos réservations, itinéraires, emails et notes. L'application révèle les histoires derrière chaque lieu et crée automatiquement des souvenirs interactifs qui vous ressemblent.",
        },
      },
      {
        "@type": "Question",
        name: "Comment Magellan organise-t-il mes voyages ?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Magellan classe automatiquement vos photos, notes et souvenirs par destination, date et moments clés. L'application lit vos emails de réservation (vols, trains, hôtels) et génère un itinéraire propre, chronologique et partageable.",
        },
      },
      {
        "@type": "Question",
        name: "Puis-je partager mes voyages avec Magellan ?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Oui, Magellan permet un partage simplifié. Vous pouvez choisir entre partage privé ou public, inviter vos proches et partager vos albums sur les réseaux sociaux, sans quitter l'application.",
        },
      },
      {
        "@type": "Question",
        name: "Magellan fonctionne-t-il hors ligne ?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Oui, Magellan fonctionne en mode hors ligne. Vous pouvez accéder à l'essentiel sans réseau : horaires, adresses, réservations, codes.",
        },
      },
      {
        "@type": "Question",
        name: "Comment rejoindre la bêta de Magellan ?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Vous pouvez rejoindre la bêta en vous inscrivant sur notre site avec votre adresse email. Vous serez parmi les premiers à tester Magellan et recevoir les nouveautés.",
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareApplicationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </>
  );
}











