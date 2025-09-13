import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export default async function AdherentPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return (
      <div className="mx-auto max-w-lg p-6">
        <h1 className="mb-4 text-2xl font-bold">Adhésion</h1>
        <p className="mb-3">Tu dois être connecté pour devenir adhérent.</p>
        <a href="/auth/login" className="rounded bg-black px-4 py-2 text-white">Se connecter</a>
      </div>
    );
  }

  if (session.user.isAdherent) {
    return (
      <div className="mx-auto max-w-lg p-6">
        <h1 className="mb-4 text-2xl font-bold">Tu es adhérent ✅</h1>
        <a href="/events" className="rounded bg-black px-4 py-2 text-white">Voir les événements</a>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-lg p-6">
      <h1 className="mb-4 text-2xl font-bold">Devenir adhérent</h1>
      <form action="/api/auth/become-adherent" method="post">
        <button className="rounded bg-black px-4 py-2 text-white">Devenir adhérent</button>
      </form>
    </div>
  );
}
