'use client';
import { useEffect, useState } from 'react';

export default function AdminUsersClient() {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({ id:'', email:'', name:'', role:'user', member:true, password:'' });

  async function load() {
    const res = await fetch('/api/users');
    if (!res.ok) return;
    const d = await res.json();
    setUsers(d.users || []);
  }
  useEffect(()=>{ load(); }, []);

  async function save(e) {
    e.preventDefault();
    await fetch('/api/users', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(form) });
    setForm({ id:'', email:'', name:'', role:'user', member:true, password:'' });
    load();
  }

  async function del(id) {
    await fetch(`/api/users?id=${id}`, { method:'DELETE' });
    load();
  }

  return (
    <div className="space-y-6">
      <form onSubmit={save} className="border rounded p-4 space-y-2">
        <h2 className="font-semibold">Créer / Mettre à jour</h2>
        <div className="grid md:grid-cols-2 gap-2">
          <input value={form.id} onChange={e=>setForm({...form, id:e.target.value})} placeholder="id (laisser vide pour créer)" className="border rounded px-2 py-1 w-full" />
          <input value={form.email} onChange={e=>setForm({...form, email:e.target.value})} placeholder="email" className="border rounded px-2 py-1 w-full" required />
          <input value={form.name} onChange={e=>setForm({...form, name:e.target.value})} placeholder="nom" className="border rounded px-2 py-1 w-full" />
          <select value={form.role} onChange={e=>setForm({...form, role:e.target.value})} className="border rounded px-2 py-1 w-full">
            <option value="user">user</option>
            <option value="admin">admin</option>
          </select>
          <select value={String(form.member)} onChange={e=>setForm({...form, member: e.target.value==='true'})} className="border rounded px-2 py-1 w-full">
            <option value="true">adhérent</option>
            <option value="false">non-adhérent</option>
          </select>
          <input type="password" value={form.password} onChange={e=>setForm({...form, password:e.target.value})} placeholder="mot de passe" className="border rounded px-2 py-1 w-full" />
        </div>
        <button className="px-3 py-1 rounded bg-blue-600 text-white">Enregistrer</button>
      </form>

      <div className="space-y-3">
        <h2 className="font-semibold">Liste</h2>
        <ul className="space-y-2">
          {users.map(u => (
            <li key={u.id} className="border rounded p-3 flex items-center justify-between">
              <div>
                <div className="font-medium">{u.name} <span className="text-xs text-gray-600">({u.email})</span></div>
                <div className="text-sm text-gray-600">{u.role} • {u.member ? 'adhérent' : 'non-adhérent'}</div>
              </div>
              <button onClick={()=>del(u.id)} className="px-2 py-1 rounded bg-red-600 text-white hover:bg-red-700">Supprimer</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
