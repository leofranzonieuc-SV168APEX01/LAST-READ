'use client';
import { useAuth } from '@/components/auth/AuthProvider';
import { useState } from 'react';

export default function LoginButton() {
  const { user, setUser } = useAuth();
  const [email, setEmail] = useState('user@occitanewheel.fr');
  const [password, setPassword] = useState('user123');
  const [error, setError] = useState('');

  async function login(e) {
    e.preventDefault();
    setError('');
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    if (!res.ok) {
      const d = await res.json();
      setError(d.error || 'Erreur');
      return;
    }
    const d = await res.json();
    setUser(d.user);
  }

  async function logout() {
    await fetch('/api/auth/login', { method: 'DELETE' });
    setUser(null);
  }

  if (user) {
    return (
      <div className="flex items-center gap-2">
        <span className="text-sm">Bonjour, {user.name}</span>
        <button className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300" onClick={logout}>Déconnexion</button>
      </div>
    );
  }

  return (
    <form onSubmit={login} className="flex items-center gap-2">
      <input className="border rounded px-2 py-1 text-sm" placeholder="email" value={email} onChange={e=>setEmail(e.target.value)} />
      <input type="password" className="border rounded px-2 py-1 text-sm" placeholder="mot de passe" value={password} onChange={e=>setPassword(e.target.value)} />
      <button className="px-3 py-1 rounded bg-blue-600 text-white hover:bg-blue-700">Connexion</button>
      {error && <span className="text-red-600 text-sm ml-2">{error}</span>}
    </form>
  );
}
