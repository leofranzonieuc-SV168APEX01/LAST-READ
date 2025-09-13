// app/api/auth/[...nextauth]/route.js
import NextAuth from "next-auth";
import { authOptions } from "@/lib/auth"; // ajuste si ton fichier est ailleurs

const handler = NextAuth(authOptions);

// Next.js app router: on doit exporter GET et POST
export { handler as GET, handler as POST };
