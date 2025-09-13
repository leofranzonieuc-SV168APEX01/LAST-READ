import "./globals.css";
import Header from "@/components/site/Header"; // adapte si besoin
import AuthProvider from "../components/auth";

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
