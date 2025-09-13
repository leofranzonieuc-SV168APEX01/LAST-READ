"use client";
import { useState } from "react";
import "./Header.css";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLogged, setIsLogged] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [membershipValid, setMembershipValid] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    // ⚠️ À remplacer par une vraie API / base de données
    if (email === "admin@occitanewheel.fr" && password === "password123") {
      setIsLogged(true);
      setMembershipValid(true); // simulation d’une cotisation valide
      setIsOpen(false);
    } else {
      alert("Identifiants incorrects");
    }
  };

  return (
    <header className="header">
      <div className="container flex items-center justify-between h-14">
        <div className="flex items-center gap-3">
          <img src="/logo.png" alt="Occitan'Ewheel" className="h-10 w-10" />
          <span className="font-bold text-red">Occitan'Ewheel</span>
        </div>

        <nav className="hidden md:flex gap-4">
          <a href="#accueil">Accueil</a>
          <a href="#qui-sommes-nous">Qui sommes-nous</a>
          <a href="#disciplines">Disciplines</a>
          <a href="#media">Média</a>
          <a href="#calendrier">Calendrier & Licences</a>
          <a href="#contact">Contact</a>
        </nav>

        {/* Bouton connexion / compte */}
        {!isLogged ? (
          <button className="btn-red" onClick={() => setIsOpen(true)}>
            Connexion adhérent
          </button>
        ) : (
          <button className="btn-yellow" onClick={() => setIsOpen(true)}>
            Mon compte
          </button>
        )}
      </div>

      {/* Pop-up */}
      {isOpen && (
        <div className="popup-overlay">
          <div className="popup">
            <button className="popup-close" onClick={() => setIsOpen(false)}>
              ✖
            </button>

            {!isLogged ? (
              <form onSubmit={handleLogin} className="login-form">
                <h2>Connexion adhérent</h2>
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <input
                  type="password"
                  placeholder="Mot de passe"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button type="submit" className="btn-red">
                  Se connecter
                </button>
              </form>
            ) : (
              <div className="account-info">
                <h2>Mon compte</h2>
                <p>Email : {email}</p>
                <p>
                  Adhésion :{" "}
                  {membershipValid ? "✅ Valide" : "❌ Non valide"}
                </p>
                <button
                  className="btn-red"
                  onClick={() => {
                    setIsLogged(false);
                    setEmail("");
                    setPassword("");
                  }}
                >
                  Déconnexion
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
