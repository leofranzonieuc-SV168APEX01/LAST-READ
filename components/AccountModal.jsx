'use client';

import { useSession, signOut } from 'next-auth/react';

export default function AccountModal({ open, onClose }) {
  const { data: session } = useSession();
  if (!open) return null;

  // Si plus de session, on ferme
  if (!session?.user) {
    onClose?.();
    return null;
    }
  const u = session.user;

  async function handleLogout() {
    await signOut({ redirect: false });
    onClose?.();
  }

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg p-6 w-full max-w-sm"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl font-semibold mb-4">Mon compte</h2>
        <p><strong>Nom :</strong> {u.name}</p>
        <p><strong>Email :</strong> {u.email}</p>
        {u.isAdherent && u.membershipValidUntil ? (
          <p>
            <strong>Adhésion valide jusqu’au :</strong> {u.membershipValidUntil}
          </p>
        ) : (
          <p><strong>Adhésion :</strong> Aucune adhésion active</p>
        )}

        <div className="mt-6 text-right">
          <button
            onClick={handleLogout}
            className="px-3 py-1.5 rounded bg-gray-200 hover:bg-gray-300"
          >
            Déconnexion
          </button>
        </div>
      </div>
    </div>
  );
}
