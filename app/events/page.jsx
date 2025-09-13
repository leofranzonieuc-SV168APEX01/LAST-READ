import Image from "next/image";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

async function getEvents() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || ""}/api/events`, { cache: "no-store" });
  if (!res.ok) return { future: [], past: [] };
  return res.json();
}

export default async function EventsPage() {
  const session = await getServerSession(authOptions); // 👈 on récupère la session
  const { future, past } = await getEvents();

  const Card = ({ ev, muted }) => (
    <div className={`rounded-xl p-4 shadow ${muted ? "bg-gray-100" : "bg-white"}`}>
      {ev.image ? (
        <Image
          src={ev.image}
          alt={ev.title}
          width={600}
          height={400}
          className="h-auto w-full rounded-lg object-cover"
        />
      ) : null}
      <h3 className="mt-2 text-lg font-semibold">{ev.title}</h3>
      <p className="text-sm">{new Date(ev.date).toLocaleString()}</p>
      <p className="text-sm">
        {ev.location} {ev.distance ? `— ${ev.distance}` : ""}
      </p>
      <p className="text-sm">Discipline : {ev.discipline || "-"}</p>
      {ev.notes ? <p className="mt-1 text-sm text-gray-700">{ev.notes}</p> : null}
      <div className="mt-3">
        {session?.user?.isAdherent ? (
          // 👉 Si connecté et adhérent
          <form action="/api/registrations" method="post">
            <input type="hidden" name="eventId" value={ev.id} />
            <button className="rounded bg-black px-3 py-2 text-sm text-white">
              S’inscrire
            </button>
          </form>
        ) : (
          // 👉 Sinon
          <a href="/auth/login" className="rounded bg-black px-3 py-2 text-sm text-white">
            Devenir adhérent
          </a>
        )}
      </div>
    </div>
  );

  return (
    <div className="mx-auto max-w-6xl space-y-8 p-6">
      <section>
        <h2 className="mb-4 text-2xl font-bold">Événements à venir</h2>
        {future.length ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {future.map((ev) => (
              <Card key={ev.id} ev={ev} />
            ))}
          </div>
        ) : (
          <p>Aucun événement à venir.</p>
        )}
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-bold">Événements passés</h2>
        {past.length ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {past.map((ev) => (
              <Card key={ev.id} ev={ev} muted />
            ))}
          </div>
        ) : (
          <p>Pas d’événements passés pour le moment.</p>
        )}
      </section>
    </div>
  );
}
