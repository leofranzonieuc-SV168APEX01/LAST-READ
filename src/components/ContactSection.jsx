"use client";
import { useState } from "react";

export default function ContactSection() {
  const [status, setStatus] = useState(null);

  async function submit(e) {
    e.preventDefault();
    setStatus(null);

    const fd = new FormData(e.currentTarget);
    const payload = Object.fromEntries(fd);
    payload.participer = !!fd.get("participer");
    payload.adherent = !!fd.get("adherent");
    payload.aider = !!fd.get("aider");

    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      setStatus("Merci ! Votre message a été envoyé.");
      e.currentTarget.reset();
    } else if (res.status === 429) {
      setStatus("Trop de demandes, réessayez dans une minute.");
    } else {
      setStatus("Une erreur est survenue. Réessayez plus tard.");
    }
  }

  return (
    <section id="contact" className="section bg-gray-50">
      <div className="container">
        <h2 className="h2">Roulez avec nous ou aidez-nous à devenir plus fort !</h2>

        <form onSubmit={submit} className="grid md:grid-cols-2 gap-4 max-w-3xl">
          <div>
            <label className="block text-sm font-medium">Nom</label>
            <input name="nom" className="mt-1 w-full border rounded-md px-3 py-2" required />
          </div>
          <div>
            <label className="block text-sm font-medium">Prénom</label>
            <input name="prenom" className="mt-1 w-full border rounded-md px-3 py-2" required />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium">Email</label>
            <input
              name="email"
              type="email"
              className="mt-1 w-full border rounded-md px-3 py-2"
              placeholder="email@exemple.com"
              required
            />
          </div>

          <fieldset className="md:col-span-2">
            <legend className="block text-sm font-medium mb-1">Je souhaite :</legend>
            <div className="flex flex-wrap gap-6">
              <label className="inline-flex items-center gap-2">
                <input type="checkbox" name="participer" className="h-4 w-4" />
                <span>Participer à un ride</span>
              </label>
              <label className="inline-flex items-center gap-2">
                <input type="checkbox" name="adherent" className="h-4 w-4" />
                <span>Devenir adhérent</span>
              </label>
              <label className="inline-flex items-center gap-2">
                <input type="checkbox" name="aider" className="h-4 w-4" />
                <span>Aider l’association</span>
              </label>
            </div>
          </fieldset>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium">Message</label>
            <textarea name="message" rows={5} className="mt-1 w-full border rounded-md px-3 py-2" required />
          </div>

          <div className="md:col-span-2 flex items-center gap-3">
            <button className="btn-primary" type="submit">Envoyer</button>
            {status && <span className="text-sm text-gray-600">{status}</span>}
          </div>
        </form>

        <p className="mt-4 text-xs text-gray-500">
          Ce formulaire est protégé par une limite de débit (anti-spam). En soumettant, vous acceptez que
          vos données soient traitées conformément à notre politique de confidentialité.
        </p>
      </div>
    </section>
  );
}