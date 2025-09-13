import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { compare } from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";

export const authOptions = {
  session: { strategy: "jwt" },
  providers: [
    Credentials({
      name: "Email & Mot de passe",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Mot de passe", type: "password" },
      },
      async authorize(credentials) {
        const { email, password } = credentials ?? {};
        if (!email || !password) return null;
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) return null;
        const ok = await compare(password, user.passwordHash);
        if (!ok) return null;
        return { id: user.id, email: user.email, name: user.name, role: user.role, isAdherent: user.isAdherent };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
        token.isAdherent = user.isAdherent;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.role = token.role;
        session.user.isAdherent = token.isAdherent;
      }
      return session;
    },
  },
  pages: {
    signIn: "/auth/login",
  },
};

export async function getSession() {
  return getServerSession(authOptions);
}

// Utilitaire côté API/rendu serveur
export async function requireRole(roles = []) {
  const session = await getServerSession(authOptions);
  if (!session?.user) return null;
  if (roles.length && !roles.includes(session.user.role)) return null;
  return session;
}
