import { redirect } from 'next/navigation';
import { defaultLocale } from '../../i18n';

export default function PolitiqueConfidentialitePage() {
  redirect(`/${defaultLocale}/politique-de-confidentialite`);
}
