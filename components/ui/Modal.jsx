"use client";

export default function Modal({ open, title, children, onClose }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative w-full max-w-2xl rounded-xl bg-white p-6 shadow-lg">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-xl font-semibold">{title}</h3>
          <button className="rounded-lg border px-3 py-1" onClick={onClose}>Fermer</button>
        </div>
        {children}
      </div>
    </div>
  );
}
