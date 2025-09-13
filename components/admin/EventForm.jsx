"use client";
import { useState, useEffect } from "react";

function toDatetimeLocalValue(d) {
  if (!d) return "";
  const dt = new Date(d);
  // yyyy-MM-ddTHH:mm
  const pad = n => String(n).padStart(2, "0");
  const yyyy = dt.getFullYear();
  const MM = pad(dt.getMonth() + 1);
  const dd = pad(dt.getDate());
  const hh = pad(dt.getHours());
  const mm = pad(dt.getMinutes());
  return `${yyyy}-${MM}-${dd}T${hh}:${mm}`;
}

export default function EventForm({ initial, onSaved }) {
  const [form, setForm] = useState({
    id: initial?.id ?? null,
    title: initial?.title ?? "",
    date: toDatetimeLocalValue(initial?.date) ?? "",
    location: initial?.location ?? "",
    notes: initial?.notes ?? "",
    image: initial?.image ?? "",
    distance: initial?.distance ?? "",
    discipline: initial?.discipline ?? "",
  });

  useEffect(() => {
    setForm({
      id: initial?.id ?? null,
      title: initial?.title ?? "",
      date: toDatetimeLocalValue(initial?.date) ?? "",
      location: initial?.location ?? "",
      notes: initial?.notes ?? "",
      image: initial?.image ?? "",
      distance: initial?.distance ?? "",
      discipline: initial?.discipline ?? "",
    });
  }, [initial]);

  const onChange = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...form,
      // convertir datetime-local en ISO
      date: form.date ? new Date(form.date).toISOString() : null,
    };
    const method = form.id ? "PUT" : "POST";
    const res = await fetch("/api/events", {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const json = await res.json();
    if (!res.ok) {
      alert(json?.error || "Erreur");
      return;
    }
    onSaved?.(json.event ?? null);
  };

  return (
    <form className="grid grid-cols-1 gap-4" onSubmit={onSubmit}>
      <label className="grid gap-1">
        <span className="text-sm font-medium">Titre *</span>
        <input name="title" value={form.title} onChange={onChange} required className="rounded border p-2"/>
      </label>
      <label className="grid gap-1">
        <span className="text-sm font-medium">Date *</span>
        <input type="datetime-local" name="date" value={form.date} onChange={onChange} required className="rounded border p-2"/>
      </label>
      <label className="grid gap-1">
        <span className="text-sm font-medium">Discipline</span>
        <input name="discipline" value={form.discipline} onChange={onChange} className="rounded border p-2" placeholder="Enduro, Piste, Freestyle…"/>
      </label>
      <label className="grid gap-1">
        <span className="text-sm font-medium">Distance</span>
        <input name="distance" value={form.distance} onChange={onChange} className="rounded border p-2" placeholder="ex: 25 km"/>
      </label>
      <label className="grid gap-1">
        <span className="text-sm font-medium">Lieu de RDV *</span>
        <input name="location" value={form.location} onChange={onChange} required className="rounded border p-2" placeholder="Parking Salagou…"/>
      </label>
      <label className="grid gap-1">
        <span className="text-sm font-medium">Image (URL)</span>
        <input name="image" value={form.image} onChange={onChange} className="rounded border p-2" placeholder="/images/enduro/photo01.jpg ou https://…"/>
      </label>
      <label className="grid gap-1">
        <span className="text-sm font-medium">Remarques</span>
        <textarea name="notes" value={form.notes} onChange={onChange} rows={3} className="rounded border p-2" placeholder="Prévoir casque…"/>
      </label>

      <div className="mt-2 flex justify-end gap-2">
        <button type="submit" className="rounded bg-black px-4 py-2 text-white">
          {form.id ? "Enregistrer" : "Créer l’événement"}
        </button>
      </div>
    </form>
  );
}
