import HomePage from '../HomePage';

export default async function RootPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  await params;
  return <HomePage />;
}
