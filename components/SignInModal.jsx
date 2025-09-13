"use client";
import { useEffect } from "react";

export default function SignInModal({ open, onClose }) {
  useEffect(() => {
    const onEsc = (e) => e.key === "Escape" && onClose?.();
    if (open) document.addEventListener("keydown", onEsc);
    return () => document.removeEventListener("keydown", onEsc);
  }, [open, onClose]);

  if (!open) return null;
  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center"
      aria-modal="true"
      role="dialog"
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      {/* Panel */}
      <div className="relative w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
        <div className="flex items-start justify-between mb-4">
          <h2 className="text-xl font-semibold">Connexion</h2>
          <button
            onClick={onClose}
            className="rounded px-2 py-1 hover:bg-black/5"
            aria-label="Fermer"
          >
            ✕
          </button>
        </div>

        {/* Contenu minimal : tu peux brancher NextAuth plus tard */}
        <div className="space-y-3">
          <a
            href="/auth/signin"
            className="inline-block rounded-lg px-4 py-2 border text-sm hover:bg-black/5"
          >
            Continuer vers la page de connexion
          </a>
          <p className="text-sm text-gray-600">
            Lorsque NextAuth sera configuré, tu pourras remplacer ce contenu par
            de vrais boutons (Google, email, etc.).
          </p>
        </div>
      </div>
    </div>
  );
}
