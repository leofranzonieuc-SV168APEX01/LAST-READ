export default function SignInFallback() {
  return (
    <section className="max-w-md mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-2">Connexion</h1>
      <p className="mb-4">
        Cette page sert de secours tant que l’authentification n’est pas câblée.
      </p>
      <a href="/" className="underline">← Retour</a>
    </section>
  );
}
