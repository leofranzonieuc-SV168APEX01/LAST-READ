"use client";
import Link from "next/link";

export default function Header() {
  return (
    <header className="sticky top-0 z-40 border-b bg-white/90 backdrop-blur">
      <div className="mx-auto max-w-6xl px-4 h-14 flex items-center justify-between">
        <Link href="/" className="font-bold">Occitan’Ewheel</Link>
        <nav className="flex items-center gap-4">
          <Link href="/">Accueil</Link>
          <Link href="/evenements">Événements</Link>
          <Link href="/qui-sommes-nous">Qui sommes-nous</Link>
          <Link href="/auth/signin" className="underline">Se connecter</Link>
        </nav>
      </div>
    </header>
  );
}
