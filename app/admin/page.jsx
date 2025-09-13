'use client';
import { useEffect, useState } from 'react';

export default function AdminHome() {
  const [user, setUser] = useState(null);
  useEffect(() => { fetch('/api/auth/me').then(r=>r.json()).then(d=>setUser(d.user)); }, []);
  if (user === null) return <div className="p-6">Chargement…</div>;
  if (!user || (user.role !== 'admin')) return <div className="p-6">Accès refusé. <a className="underline" href="/login">Se connecter</a></div>;
  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold">Back‑office</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <a href="/admin/events" className="border rounded p-4 hover:shadow">Gérer les évènements</a>
        <a href="/api/registrations/export" className="border rounded p-4 hover:shadow">Exporter les inscriptions (CSV)</a>
      </div>
    </div>
  );
}