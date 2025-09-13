
"use client";
import { useEffect, useState } from "react";

export default function AuthClient() {
  const [user, setUser] = useState(null);
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    fetch("/api/me").then(r=>r.json()).then(d=>setUser(d.user));
  }, []);

  async function login(e) {
    e.preventDefault();
    const res = await fetch("/api/login", { method:"POST", headers:{ "Content-Type":"application/json" }, body: JSON.stringify({ email, password }) });
    const data = await res.json();
    if (data.ok) {
      setUser(data.user);
      setOpen(false);
      setEmail("");
      setPassword("");
    } else {
      alert("Connexion échouée");
    }
  }

  async function logout() {
    await fetch("/api/logout", { method:"POST" });
    setUser(null);
  }

  return (
    <div className="flex items-center gap-3">
      {user ? (
        <>
          <span className="text-sm">Bonjour, <strong>{user.name}</strong>{user.isMember ? " (Adhérent)" : ""}</span>
          <button onClick={logout} className="text-sm underline">Se déconnecter</button>
        </>
      ) : (
        <button onClick={()=>setOpen(v=>!v)} className="btn-primary">Connexion adhérent</button>
      )}

      {open && !user && (
        <form onSubmit={login} className="absolute right-4 top-14 z-50 bg-white border rounded-lg p-4 shadow w-72">
          <h4 className="font-semibold mb-2">Connexion adhérent</h4>
          <label className="block text-sm">Email</label>
          <input className="w-full border rounded px-3 py-2 mb-2" type="email" value={email} onChange={e=>setEmail(e.target.value)} />
          <label className="block text-sm">Mot de passe</label>
          <input className="w-full border rounded px-3 py-2 mb-3" type="password" value={password} onChange={e=>setPassword(e.target.value)} />
          <div className="flex justify-end gap-2">
            <button type="button" onClick={()=>setOpen(false)} className="px-3 py-2 border rounded">Annuler</button>
            <button type="submit" className="btn-primary">Se connecter</button>
          </div>
        </form>
      )}
    </div>
  );
}
