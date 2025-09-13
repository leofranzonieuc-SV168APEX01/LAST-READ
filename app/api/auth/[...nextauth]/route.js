// app/api/auth/[...nextauth]/route.js
import NextAuth from "next-auth";
import { authOptions } from "@/lib/auth"; // adapte ce chemin si ton fichier s’appelle /lib/auth.js

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
