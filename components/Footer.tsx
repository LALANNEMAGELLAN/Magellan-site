import Link from "next/link";

function Footer() {
  return (
    <footer className="mt-12 sm:mt-16 bg-white border-t border-surface-border">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 py-6 sm:py-8 flex flex-col gap-4 sm:gap-3 md:flex-row md:items-center md:justify-between">
        <p className="text-xs sm:text-sm text-text-muted text-center md:text-left">© {new Date().getFullYear()} Magellan</p>
        <nav className="flex flex-wrap justify-center md:justify-end gap-4 sm:gap-6 text-xs sm:text-sm">
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


