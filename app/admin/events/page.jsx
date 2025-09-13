"use client";
import { useEffect, useState, useMemo } from "react";
import Modal from "@/components/ui/Modal";
import EventForm from "@/components/admin/EventForm";

function EventRow({ ev, onEdit, onDelete }) {
  const d = new Date(ev.date);
  return (
    <tr className="border-b">
      <td className="p-2 font-medium">{ev.title}</td>
      <td className="p-2">{d.toLocaleString()}</td>
      <td className="p-2">{ev.discipline || "-"}</td>
      <td className="p-2">{ev.distance || "-"}</td>
      <td className="p-2">{ev.location}</td>
      <td className="p-2">{ev.image ? "🖼️" : "-"}</td>
      <td className="p-2 text-right">
        <button className="mr-2 rounded border px-3 py-1" onClick={() => onEdit(ev)}>Modifier</button>
        <button className="rounded border px-3 py-1 text-red-600" onClick={() => onDelete(ev.id)}>Supprimer</button>
      </td>
    </tr>
  );
}

export default function AdminEventsPage() {
  const [data, setData] = useState({ future: [], past: [] });
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState(null);

  const load = async () => {
    setLoading(true);
    const res = await fetch("/api/events", { cache: "no-store" });
    const json = await res.json();
    setData(json);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  const onCreate = () => { setEditing(null); setOpen(true); };
  const onEdit = (ev) => { setEditing(ev); setOpen(true); };
  const onDelete = async (id) => {
    if (!confirm("Supprimer cet événement ?")) return;
    const res = await fetch("/api/events", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    if (res.ok) load();
    else alert("Erreur de suppression");
  };

  const now = new Date();
  const futureCount = data.future.length;
  const pastCount = data.past.length;

  return (
    <div className="mx-auto max-w-6xl p-6">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Back-office — Événements</h1>
        <button className="rounded bg-black px-4 py-2 text-white" onClick={onCreate}>+ Nouvel événement</button>
      </div>

      {loading ? (
        <p>Chargement…</p>
      ) : (
        <div className="space-y-10">
          <section>
            <h2 className="mb-2 text-xl font-semibold">À venir ({futureCount})</h2>
            <div className="overflow-auto rounded border">
              <table className="min-w-full text-sm">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="p-2 text-left">Titre</th>
                    <th className="p-2 text-left">Date</th>
                    <th className="p-2 text-left">Discipline</th>
                    <th className="p-2 text-left">Distance</th>
                    <th className="p-2 text-left">Lieu</th>
                    <th className="p-2 text-left">Image</th>
                    <th className="p-2" />
                  </tr>
                </thead>
                <tbody>
                  {data.future.map(ev => (
                    <EventRow key={ev.id} ev={ev} onEdit={onEdit} onDelete={onDelete}/>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h2 className="mb-2 text-xl font-semibold">Passés ({pastCount})</h2>
            <div className="overflow-auto rounded border">
              <table className="min-w-full text-sm">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="p-2 text-left">Titre</th>
                    <th className="p-2 text-left">Date</th>
                    <th className="p-2 text-left">Discipline</th>
                    <th className="p-2 text-left">Distance</th>
                    <th className="p-2 text-left">Lieu</th>
                    <th className="p-2 text-left">Image</th>
                    <th className="p-2" />
                  </tr>
                </thead>
                <tbody>
                  {data.past.map(ev => (
                    <EventRow key={ev.id} ev={ev} onEdit={onEdit} onDelete={onDelete}/>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </div>
      )}

      <Modal open={open} onClose={() => setOpen(false)} title={editing ? "Modifier l’événement" : "Créer un événement"}>
        <EventForm
          initial={editing}
          onSaved={() => { setOpen(false); setEditing(null); load(); }}
        />
      </Modal>
    </div>
  );
}
