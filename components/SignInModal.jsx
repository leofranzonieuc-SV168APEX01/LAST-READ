'use client';

import LoginButton from '@/components/auth/LoginButton';

export default function SignInModal({ open, onClose }) {
  if (!open) return null;

  function handleSuccess() {
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
        <h2 className="text-xl font-semibold mb-4">Connexion adhérent</h2>
        <LoginButton onLoginSuccess={handleSuccess} />
        <div className="mt-4 text-right">
          <button onClick={onClose} className="px-3 py-1.5 rounded border">
            Fermer
          </button>
        </div>
      </div>
    </div>
  );
}
