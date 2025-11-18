'use client';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="fr">
      <body>
        <div className="flex min-h-screen items-center justify-center bg-surface-bg">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-text-base">Une erreur s'est produite</h1>
            <p className="mt-2 text-text-muted">{error.message}</p>
            <button
              onClick={reset}
              className="mt-4 btn-primary"
            >
              Réessayer
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}

