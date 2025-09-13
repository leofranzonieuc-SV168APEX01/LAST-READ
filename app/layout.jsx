// app/layout.jsx
import "./globals.css";
import AuthProvider from "@/components/auth/AuthProvider";
import Header from "@/components/Header";

export const metadata = {
  title: "Occitan’Ewheel",
  description: "Association gyroroue Occitanie",
};

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body>
        {/* Provider de session côté client, mais instancié ici côté serveur */}
        <AuthProvider>
          <Header />
          <main className="mt-20">{children}</main>
        </AuthProvider>
      </body>
    </html>
  );
}
