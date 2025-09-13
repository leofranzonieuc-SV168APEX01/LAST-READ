export default function ContactPage() {
  const mailto = "mailto:contact@occitanewheel.fr";
  return (
    <div className="max-w-2xl mx-auto p-6 space-y-4">
      <h1 className="text-3xl font-bold">Contact</h1>
      <p className="text-sm opacity-75">
        Serveur courrier: node32-eu.n0c.com — IMAP 993, POP3 995, SMTP 465/587 (TLS).
      </p>
      <form className="space-y-3" onSubmit={async (e) => {
        e.preventDefault();
        const form = e.currentTarget;
        const payload = {
          name: form.name.value,
          email: form.email.value,
          message: form.message.value,
        };
        const res = await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload)});
        alert(res.ok ? 'Message envoyé ✅' : 'Erreur lors de l’envoi ❌');
        if (res.ok) form.reset();
      }}>
        <input name="name" placeholder="Votre nom" className="border p-2 w-full rounded" required />
        <input name="email" type="email" placeholder="Votre email" className="border p-2 w-full rounded" required />
        <textarea name="message" placeholder="Votre message" className="border p-2 w-full rounded h-32" required />
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 rounded bg-black text-white">Envoyer</button>
          <a href={mailto} className="underline">ou écrire directement</a>
        </div>
      </form>
    </div>
  );
}