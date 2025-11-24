import { redirect } from 'next/navigation';
import { defaultLocale } from '../../i18n';

// Rediriger vers la version avec locale
export default function AProposPage() {
  redirect(`/${defaultLocale}/a-propos`);
}
