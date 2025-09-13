import "./globals.css";
import AuthProvider from "../components/auth";   // déjà créé au point 2
import Header from "../components/Header";       // <— NOUVEAU

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body>
        <AuthProvider>
          <Header />
          <main>{children}</main>
        </AuthProvider>
      </body>
    </html>
  );
}
