'use client';

import { useState } from 'react';
import SignInModal from '@/components/SignInModal';
import AccountModal from '@/components/AccountModal';
import { useSession } from 'next-auth/react';

export default function Header() {
  const { data: session } = useSession();
  const [signinOpen, setSigninOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-40 border-b bg-white/90 backdrop-blur">
        <div className="mx-auto max-w-6xl px-4 h-14 flex items-center justify-between">
          <a href="#accueil" className="font-bold">Occitan’Ewheel</a>
          <nav className="flex items-center gap-4 text-sm">
            <a href="#accueil">Accueil</a>
            <a href="#evenements">Événements</a>
            <a href="#quisonnous">Qui sommes-nous</a>
            <a href="#media">Média</a>
            <a href="#calendrier">Calendrier & Licences</a>
            <a href="#contact">Contact</a>

            {session?.user ? (
              <button
                onClick={() => setAccountOpen(true)}
                className="rounded-lg px-3 py-1.5 border hover:bg-black/5"
              >
                Mon compte
              </button>
            ) : (
              <button
                onClick={() => setSigninOpen(true)}
                className="rounded-lg px-3 py-1.5 border hover:bg-black/5"
              >
                Se connecter
              </button>
            )}
          </nav>
        </div>
      </header>

      {/* Modales */}
      <SignInModal open={signinOpen} onClose={() => setSigninOpen(false)} />
      <AccountModal open={accountOpen} onClose={() => setAccountOpen(false)} />
    </>
  );
}
