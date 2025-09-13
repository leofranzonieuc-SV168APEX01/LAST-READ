'use client';
import { useEffect, useState } from 'react';

export default function AdminEventsClient() {
  const [events, setEvents] = useState([]);
  const [form, setForm] = useState({ id:'', title:'', date:'', location:'', capacity:'', description:'' });
  const [error, setError] = useState('');
  const [ok, setOk] = useState('');

  async function load() {
    const res = await fetch('/api/events', { cache: 'no-store' });
    const d = await res.json();
    setEvents(d.events || []);
  }

  useEffect(()=>{ load(); }, []);

  async function save(e) {
    e.preventDefault();
    setError(''); setOk('');
    const res = await fetch('/api/events', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...form, capacity: form.capacity ? Number(form.capacity) : null, date: new Date(form.date).toISOString() })
    });
    if (!res.ok) { setError('Erreur'); return; }
    setOk('Enregistré');
    setForm({ id:'', title:'', date:'', location:'', capacity:'', description:'' });
    load();
  }

  async function del(id) {
    await fetch(`/api/events?id=${id}`, { method: 'DELETE' });
    load();
  }

  return (
    <div className="space-y-6">
      <form onSubmit={save} className="border rounded p-4 space-y-2">
        <h2 className="font-semibold">Créer / Mettre à jour</h2>
        <div className="grid md:grid-cols-2 gap-2">
          <input value={form.id} onChange={e=>setForm({...form, id:e.target.value})} placeholder="id (laisser vide pour créer)" className="border rounded px-2 py-1 w-full" />
          <input value={form.title} onChange={e=>setForm({...form, title:e.target.value})} placeholder="Titre" className="border rounded px-2 py-1 w-full" required />
          <input value={form.date} onChange={e=>setForm({...form, date:e.target.value})} placeholder="Date (YYYY-MM-DD)" className="border rounded px-2 py-1 w-full" required />
          <input value={form.location} onChange={e=>setForm({...form, location:e.target.value})} placeholder="Lieu" className="border rounded px-2 py-1 w-full" required />
          <input value={form.capacity} onChange={e=>setForm({...form, capacity:e.target.value})} placeholder="Capacité (nombre)" className="border rounded px-2 py-1 w-full" />
        </div>
        <textarea value={form.description} onChange={e=>setForm({...form, description:e.target.value})} placeholder="Description" className="border rounded px-2 py-1 w-full" />
        <button className="px-3 py-1 rounded bg-blue-600 text-white">Enregistrer</button>
        {ok && <span className="text-green-700 ml-2">{ok}</span>}
        {error && <span className="text-red-600 ml-2">{error}</span>}
      </form>

      <div className="space-y-3">
        <h2 className="font-semibold">Liste</h2>
        <ul className="space-y-2">
          {events.map(e => (
            <li key={e.id} className="border rounded p-3">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">{e.title}</div>
                  <div className="text-sm text-gray-600">{new Date(e.date).toLocaleString()} • {e.location}</div>
                  <div className="text-sm">Inscrits: {e.registrations}/{e.capacity || '∞'}</div>
                </div>
                <div className="flex gap-2">
                  <button onClick={()=>setForm({ id:e.id, title:e.title, date:e.date.slice(0,10), location:e.location, capacity:e.capacity||'', description:e.description||'' })} className="px-2 py-1 rounded bg-gray-200 hover:bg-gray-300">Éditer</button>
                  <button onClick={()=>del(e.id)} className="px-2 py-1 rounded bg-red-600 text-white hover:bg-red-700">Supprimer</button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
