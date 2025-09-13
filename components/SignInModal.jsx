"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

// ——— Choisis le bon chemin selon l’endroit où se trouve CE fichier : ———
// Si ton header est dans `components/` :
import SignInModal from "./SignInModal";
// Si ton header est DANS `app/.../` et que SignInModal est dans `components/` :
// import SignInModal from "../../components/SignInModal";
// Si ton header est dans un sous-dossier de `components/` (ex: components/site/):
// import SignInModal from "../SignInModal";

// ——— Header principal avec bouton "Se connecter" qui ouvre une pop-up ———
export default function HeaderPrincipal() {
  const [signinOpen, setSigninOpen] = useState(false);

  // (optionnel) fermer la modale si on navigue
  useEffect(() => {
    const onRoute = () => setSigninOpen(false);
    // on pourrait écouter le router si tu utilises next/navigation
    return () => {};
  }, []);

  return (
    <>
      <header className="sticky top-0 z-40 border-b bg-white/90 backdrop-blur">
        <div className="mx-auto max-w-6xl px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Logo : assure-toi d’avoir /public/logo.png */}
            <img src="/logo.png" alt="Occitan’Ewheel" className="h-7 w-auto" />
            <span className="font-semibold">Occitan’Ewheel</span>
          </div>

          <nav className="flex items-center gap-4 text-sm">
            <Link href="/">Accueil</Link>
            <Link href="/qui-sommes-nous">Qui sommes-nous</Link>
            <Link href="/disciplines">Disciplines</Link>
            <Link href="/media">Média</Link>
            <Link href="/calendrier">Calendrier & Licences</Link>
            <Link href="/contact">Contact</Link>

            {/* BOUTON POP-UP */}
            <button
              onClick={() => setSigninOpen(true)}
              className="rounded-lg px-3 py-1.5 border hover:bg-black/5"
            >
              Se connecter
            </button>
          </nav>
        </div>
      </header>

      {/* Pop-up de connexion (fallback) */}
      <SignInModal open={signinOpen} onClose={() => setSigninOpen(false)} />
    </>
  );
}
