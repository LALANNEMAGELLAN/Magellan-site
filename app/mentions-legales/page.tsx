import { redirect } from 'next/navigation';
import { defaultLocale } from '../../i18n';

export default function MentionsLegalesPage() {
  redirect(`/${defaultLocale}/mentions-legales`);
}
