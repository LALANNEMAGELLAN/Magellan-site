import Link from "next/link";

function Footer() {
  return (
    <footer className="mt-16 bg-white border-t border-surface-border">
      <div className="mx-auto max-w-6xl px-4 py-8 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <p className="text-sm text-text-muted">© {new Date().getFullYear()} Magellan</p>
        <nav className="flex gap-6 text-sm">
          <Link href="/mentions-legales" className="text-text-muted hover:text-text-base">
            Mentions légales
          </Link>
          <Link href="/politique-de-confidentialite" className="text-text-muted hover:text-text-base">
            Politique de confidentialité
          </Link>
          <Link href="/cgu" className="text-text-muted hover:text-text-base">
            CGU
          </Link>
          <Link href="/cookies" className="text-text-muted hover:text-text-base">
            Cookies
          </Link>
          <Link href="/contact" className="text-text-muted hover:text-text-base">
            Contact
          </Link>
        </nav>
      </div>
    </footer>
  );
}

export default Footer;
export { Footer };


