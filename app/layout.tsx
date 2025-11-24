// Layout racine minimal requis par Next.js
// Le layout [locale] gère le HTML et body
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
