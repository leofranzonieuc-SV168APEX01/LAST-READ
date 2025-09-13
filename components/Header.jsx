"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import SignInModal from "./SignInModal";
import AccountModal from "./AccountModal";

export default function Header() {
  const { data: session } = useSession();
  const [signinOpen, setSigninOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);

  // Optionnel : fermer les modales en cas de navigation (si nécessaire)
  useEffect(() => {
    const handleRouteChange = () => {
      setSigninOpen(false);
      setAccountOpen(false);
    };
    // Si Next.js Router disponible, on l'écouterait ici
    return () => {};
  }, []);

  return (
    <>
      <header className="sticky top-0 z-40 border-b bg-white/90 backdrop-blur">
        <div className="mx-auto max-w-6xl px-4 h-14 flex items-center justify-between">
          <Link href="/" className="font-bold">Occitan’Ewheel</Link>
          <nav className="flex items-center gap-4 text-sm">
            <Link href="/">Accueil</Link>
            <Link href="/evenements">Événements</Link>
            <Link href="/qui-sommes-nous">Qui sommes-nous</Link>
            <Link href="/media">Média</Link>
            <Link href="/calendrier">Calendrier & Licences</Link>
            <Link href="/contact">Contact</Link>

            {session?.user ? (
              /* Utilisateur connecté -> bouton "Mon compte" */
              <button 
                onClick={() => setAccountOpen(true)}
                className="rounded-lg px-3 py-1.5 border hover:bg-black/5"
              >
                Mon compte
              </button>
            ) : (
              /* Utilisateur non connecté -> bouton "Se connecter" */
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

      {/* Modales de connexion et de compte */}
      <SignInModal open={signinOpen} onClose={() => setSigninOpen(false)} />
      <AccountModal 
        open={accountOpen} 
        onClose={() => setAccountOpen(false)} 
      />
    </>
  );
}
