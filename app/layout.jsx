// app/layout.jsx
import { useState, useEffect } from 'react';
import Link from 'next/link';
import LoginModal from '@/components/LoginModal';
import AccountModal from '@/components/AccountModal';
import './globals.css';

export default function RootLayout({ children }) {
  const [user, setUser] = useState(null);
  const [showLogin, setShowLogin] = useState(false);
  const [showAccount, setShowAccount] = useState(false);

  // Au chargement, on vérifie s’il existe déjà une session utilisateur
  useEffect(() => {
    async function fetchUser() {
      const res = await fetch('/api/auth/me');
      if (res.ok) {
        const data = await res.json();
        setUser(data.user);
      }
    }
    fetchUser();
  }, []);

  const handleLoginClick = () => {
    if (user) {
      setShowAccount(true);
    } else {
      setShowLogin(true);
    }
  };

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    setUser(null);
  };

  return (
    <html lang="fr">
      <body className="bg-white text-gray-900">
        {/* Entête */}
        <header className="bg-white border-b border-gray-200 fixed top-0 left-0 right-0 z-50">
          <nav className="container mx-auto flex items-center justify-between py-4 px-4">
            <Link href="/" className="font-bold text-xl text-primary">OccitanEnduro</Link>
            <ul className="flex space-x-4">
              <li><Link href="/">Accueil</Link></li>
              <li><Link href="#quisonnous">Qui sommes‑nous</Link></li>
              <li><Link href="#disciplines">Disciplines</Link></li>
              <li><Link href="#media">Média</Link></li>
              <li><Link href="#calendrier">Calendrier & Licences</Link></li>
              <li><Link href="#contact">Contact</Link></li>
            </ul>
            {/* Bouton connexion/compte */}
            <button
              onClick={handleLoginClick}
              className="ml-4 px-4 py-2 rounded-full text-white bg-primary hover:bg-primary-dark transition"
            >
              {user ? 'Mon compte' : 'Connexion'}
            </button>
          </nav>
        </header>

        {/* Pop-up de connexion et d’affichage du compte */}
        {showLogin && (
          <LoginModal
            onClose={() => setShowLogin(false)}
            onLoggedIn={(user) => {
              setUser(user);
              setShowLogin(false);
            }}
          />
        )}
        {showAccount && user && (
          <AccountModal
            user={user}
            onClose={() => setShowAccount(false)}
            onLogout={handleLogout}
          />
        )}

        {/* Contenu des pages */}
        <main className="mt-20">{children}</main>
      </body>
    </html>
  );
}
