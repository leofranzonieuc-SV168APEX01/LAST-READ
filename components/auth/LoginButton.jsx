'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';

export default function LoginButton({ onLoginSuccess }) {
  const [email, setEmail] = useState('user@occitanewheel.fr');
  const [password, setPassword] = useState('user123');
  const [error, setError] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    const res = await signIn('credentials', {
      email,
      password,
      redirect: false,
    });
    if (res?.error) {
      setError('Identifiants incorrects');
      return;
    }
    onLoginSuccess?.();
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-2">
      <input
        type="email"
        className="border rounded px-2 py-1 text-sm"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        className="border rounded px-2 py-1 text-sm"
        placeholder="Mot de passe"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        type="submit"
        className="px-3 py-1 rounded bg-blue-600 text-white hover:bg-blue-700"
      >
        Connexion
      </button>
      {error && <span className="text-red-600 text-sm">{error}</span>}
    </form>
  );
}
