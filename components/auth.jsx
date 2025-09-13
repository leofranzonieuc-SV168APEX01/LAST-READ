"use client";

// Provider neutre : n'ajoute pas de dépendances et ne casse rien.
// Tu pourras plus tard remplacer le contenu par le vrai SessionProvider NextAuth.
export default function AuthProvider({ children }) {
  return <>{children}</>;
}
