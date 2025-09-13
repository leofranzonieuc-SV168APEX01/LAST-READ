'use client';
import { useState, useEffect } from 'react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch('/api/auth/me').then(r => r.json()).then(d => setUser(d.user));
  }, []);

  async function login(e) {
    e.preventDefault();
    const res = await fetch('/api/auth', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email, password }) });
    if (res.ok) location.reload();
    else alert('Identifiants invalides');
  }
  async function logout() {
    await fetch('/api/auth', { method: 'DELETE' });
    location.reload();
  }

  return (
    <div className="max-w-md mx-auto p-6 space-y-4">
      <h1 className="text-3xl font-bold">Connexion</h1>
      {user ? (
        <div className="space-y-2">
          <p>Connecté en tant que <b>{user.email}</b> — rôle: <b>{user.role}</b></p>
          <div className="flex gap-2">
            <a className="px-4 py-2 rounded bg-black text-white" href="/admin">Accéder au back‑office</a>
            <button className="px-4 py-2 rounded border" onClick={logout}>Se déconnecter</button>
          </div>
        </div>
      ) : (
        <form className="space-y-3" onSubmit={login}>
          <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" className="border p-2 w-full rounded" required />
          <input type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="Mot de passe" className="border p-2 w-full rounded" required />
          <button className="px-4 py-2 rounded bg-black text-white w-full">Se connecter</button>
        </form>
      )}
    </div>
  );
}