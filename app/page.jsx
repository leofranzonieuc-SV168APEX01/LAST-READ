// app/page.jsx

export default function HomePage() {
  return (
    <>
      {/* ACCUEIL / HERO */}
      <section id="accueil" className="container mx-auto px-4 py-10">
        <div className="flex items-center justify-between gap-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold mb-3">Occitan’Ewheel</h1>
            <p className="text-gray-700 max-w-2xl">
              Association pour la pratique de la gyroroue en Occitanie : sorties, entraînements,
              sécurité et convivialité.
            </p>
            <div className="mt-4 flex gap-2">
              <a href="#disciplines" className="px-3 py-1.5 rounded bg-red-600 text-white">Découvrir</a>
              <a href="#contact" className="px-3 py-1.5 rounded border">Nous contacter</a>
            </div>
          </div>
          {/* Si tu as un visuel/illustration, ajoute-le ici */}
        </div>
      </section>

      {/* QUI SOMMES-NOUS */}
      <section id="quisonnous" className="container mx-auto px-4 py-10">
        <h2 className="text-2xl font-bold mb-4">Qui sommes-nous</h2>
        <p className="text-sm text-gray-700 max-w-3xl">
          L’association a pour but de promouvoir la pratique de la gyroroue dans toutes ses disciplines
          sportives, en prônant la sécurité, l’entraide et la bonne humeur. Elle vise à démocratiser
          cette activité, organiser des événements, proposer des entraînements, et représenter les pratiquants.
        </p>

        {/* Réseaux sociaux (garde/complète tes cartes) */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
          <a className="block border rounded p-3" href="#" target="_blank">QR WhatsApp Dan</a>
          <a className="block border rounded p-3" href="#" target="_blank">QR Instagram @asso</a>
          <a className="block border rounded p-3" href="#" target="_blank">QR Instagram @leofranzoni</a>
          <a className="block border rounded p-3" href="#" target="_blank">Lien vers les disciplines</a>
        </div>
      </section>

      {/* DISCIPLINES */}
      <section id="disciplines" className="container mx-auto px-4 py-10">
        <h2 className="text-2xl font-bold mb-4">Disciplines</h2>

        <h3 className="text-lg font-semibold mb-2">Découvrir les disciplines sportives</h3>
        <div className="mb-4 flex flex-wrap gap-2 text-sm">
          <span className="px-2 py-1 border rounded">Utilitaire</span>
          <span className="px-2 py-1 border rounded">Crosstrack</span>
          <span className="px-2 py-1 border rounded">Enduro Trail</span>
          <span className="px-2 py-1 border rounded">Piste/Circuit</span>
          <span className="px-2 py-1 border rounded">Dirt Jump/Slopestyle</span>
          <span className="px-2 py-1 border rounded">Parade & Voyages</span>
        </div>

        {/* Exemple de carte (remets tes vraies vignettes ici) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
          <div className="border rounded p-3">
            <div className="text-sm text-gray-700">Sherman VS Fiat500 Lafabrica</div>
          </div>
        </div>
      </section>

      {/* MÉDIA */}
      <section id="media" className="container mx-auto px-4 py-10">
        <h2 className="text-2xl font-bold mb-4">Média</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <p className="font-medium mb-1">YouTube, inscriptions & autres liens</p>
            <p>Liste à compléter : JKCW TEAM, MontlEur, WorgWey, LEC Limbrug…</p>
          </div>
          <div>
            <p className="font-medium mb-1">Articles, presse & tests matos</p>
            <p>À regrouper ici.</p>
          </div>
        </div>
      </section>

      {/* CALENDRIER & LICENCES */}
      <section id="calendrier" className="container mx-auto px-4 py-10">
        <h2 className="text-2xl font-bold mb-4">Calendrier & Licences</h2>
        <p className="text-sm text-gray-700 mb-4">
          1 — Les activités en voie publique requièrent… (ton texte existant).<br/>
          2 — Calendrier des évènements par discipline… (ton texte existant).
        </p>

        {/* Si tu as un composant EventsCalendar, insère-le ici */}
        {/* <EventsCalendar /> */}
      </section>

      {/* CONTACT */}
      <section id="contact" className="container mx-auto px-4 py-10">
        <h2 className="text-2xl font-bold mb-4">Contact</h2>
        <form className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm max-w-3xl">
          <label className="grid gap-1">
            <span>Qualité</span>
            <input className="border rounded p-2" placeholder="M., Mme, Autre" />
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <label className="grid gap-1">
              <span>Nom</span>
              <input className="border rounded p-2" />
            </label>
            <label className="grid gap-1">
              <span>Prénom</span>
              <input className="border rounded p-2" />
            </label>
          </div>
          <label className="grid gap-1">
            <span>E-mail de contact</span>
            <input type="email" className="border rounded p-2" placeholder="email@example.com" />
          </label>
          <label className="grid gap-1">
            <span>Lieu de domicile</span>
            <input className="border rounded p-2" placeholder="Ville / Département" />
          </label>
          <label className="grid gap-1 md:col-span-2">
            <span>Profession</span>
            <input className="border rounded p-2" />
          </label>
          <label className="grid gap-1 md:col-span-2">
            <span>Message</span>
            <textarea rows={4} className="border rounded p-2" />
          </label>
          <div className="md:col-span-2 text-right">
            <button type="submit" className="px-3 py-1.5 rounded bg-red-600 text-white">Envoyer</button>
          </div>
        </form>
      </section>
    </>
  );
}
