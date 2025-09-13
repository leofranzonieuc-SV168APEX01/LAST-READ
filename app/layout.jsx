
import "./globals.css";
export const metadata = {
  title: "Occitan'Ewheel - Association de gyroroue",
  description: "Initiation, découverte et entraînement aux disciplines de gyroroue en Occitanie",
};
import { AuthProvider } from '../components/auth';

export default function RootLayout({ children }) {
  return (<html lang="fr"><body><AuthProvider>{children}</AuthProvider></body></html>);
}
