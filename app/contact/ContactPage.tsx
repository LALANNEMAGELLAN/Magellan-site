import { ContactForm } from "../../components/ContactForm";

export default function ContactPage() {
  return (
    <article className="py-12 sm:py-16">
      <header>
        <h1 className="text-3xl font-bold sm:text-4xl">Contact</h1>
        <p className="muted mt-3 max-w-2xl">
          Une question ? On est là pour vous.
        </p>
        <p className="muted mt-2 max-w-2xl text-sm">
          Dites-nous ce dont vous avez besoin : une information, une suggestion, un bug, une idée… Nous répondons à tous les messages, généralement en moins de 24h.
        </p>
      </header>
      <section className="mt-8 max-w-2xl" aria-label="Formulaire de contact">
        <ContactForm />
      </section>
      <div className="mt-6 space-y-2">
        <p className="muted text-sm">
          En envoyant ce formulaire, votre client email s'ouvrira avec un message pré-rempli (aucune donnée n'est stockée côté site).
        </p>
        <p className="text-sm text-text-muted">
          Derrière Magellan, il y a une équipe de passionnés de voyage : on lit chaque message. 🌍
        </p>
      </div>
    </article>
  );
}

