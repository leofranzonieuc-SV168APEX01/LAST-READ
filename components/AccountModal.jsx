"use client";
import { useSession, signOut } from "next-auth/react";

export default function AccountModal({ open, onClose }) {
  const { data: session } = useSession();
  if (!open) return null;
  // Fermer la modale si l’utilisateur n’est plus connecté
  if (!session?.user) {
    onClose();
    return null;
  }

  // Gestion de la déconnexion utilisateur
  async function handleLogout() {
    await signOut({ redirect: false });  // Déconnexion sans redirection automatique
    onClose();
  }

  const user = session.user;
  return (
    <div 
      className="fixed inset-0 bg-black/50 flex items-center justify-center"
      onClick={onClose}  // Ferme la modale si on clique en dehors du contenu
    >
      <div 
        className="bg-white rounded-lg p-6 min-w-[300px]" 
        onClick={(e) => e.stopPropagation()}  // Empêche la fermeture en cliquant à l’intérieur
      >
        <h2 className="text-xl font-semibold mb-4">Mon compte</h2>
        <p><strong>Nom :</strong> {user.name}</p>
        <p><strong>Email :</strong> {user.email}</p>
        {user.isAdherent && user.membershipValidUntil ? (
          <p><strong>Adhésion valide jusqu’au :</strong> {user.membershipValidUntil}</p>
        ) : (
          <p><strong>Adhésion :</strong> Aucune adhésion active</p>
        )}
        <div className="mt-6 text-right">
          <button 
            onClick={handleLogout} 
            className="px-4 py-1.5 rounded bg-gray-200 hover:bg-gray-300"
          >
            Déconnexion
          </button>
        </div>
      </div>
    </div>
  );
}
