"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const onSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/auth/register", {
      method: "POST", headers: {"Content-Type":"application/json"},
      body: JSON.stringify({ email, password, name }),
    });
    const json = await res.json();
    if (!res.ok) return alert(json.error || "Erreur");
    alert("Compte créé. Connecte-toi.");
    router.push("/auth/login");
  };

  return (
    <div className="mx-auto max-w-sm p-6">
      <h1 className="mb-4 text-2xl font-bold">Créer un compte</h1>
      <form className="grid gap-3" onSubmit={onSubmit}>
        <input className="rounded border p-2" placeholder="Nom (optionnel)" value={name} onChange={e=>setName(e.target.value)} />
        <input className="rounded border p-2" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
        <input className="rounded border p-2" placeholder="Mot de passe" type="password" value={password} onChange={e=>setPassword(e.target.value)} />
        <button className="rounded bg-black px-4 py-2 text-white">Créer</button>
      </form>
    </div>
  );
}
