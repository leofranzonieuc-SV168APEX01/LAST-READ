use client;
import { signIn } from next-authreact;
import { useState } from react;
import Link from nextlink;

export default function LoginPage() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const onSubmit = async (e) = {
    e.preventDefault();
    const res = await signIn(credentials, {
      email, password, redirect true, callbackUrl adminevents,
    });
  };

  return (
    div className=mx-auto max-w-sm p-6
      h1 className=mb-4 text-2xl font-boldConnexionh1
      form className=grid gap-3 onSubmit={onSubmit}
        input className=rounded border p-2 placeholder=Email value={email} onChange={e=setEmail(e.target.value)} 
        input className=rounded border p-2 placeholder=Mot de passe type=password value={password} onChange={e=setPassword(e.target.value)} 
        button className=rounded bg-black px-4 py-2 text-whiteSe connecterbutton
      form
      p className=mt-3 text-sm
        Pas de compte  Link className=underline href=authregisterCréer un compteLink
      p
    div
  );
}
