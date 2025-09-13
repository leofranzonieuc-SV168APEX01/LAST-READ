
"use client";
import GalleryTabs from "../src/components/GalleryTabs";
import SocialQR from "../src/components/SocialQR";



const NAV = [
  { id: "accueil", label: "Accueil" },
  { id: "qui", label: "Qui sommes-nous" },
  { id: "disciplines", label: "Disciplines" },
  { id: "media", label: "Média" },
  { id: "calendrier", label: "Calendrier & Licences" },
  { id: "contact", label: "Contact" },
];

export default function Home() {
  return (
    <main>
      <header className="sticky top-0 z-40 border-b bg-white/90 backdrop-blur">
        <div className="container flex items-center justify-between h-14">
          <div className="flex items-center gap-3">
            <img src="/logo.png" alt="Occitan'Ewheel" className="h-8 w-8" />
            <span className="font-bold">Occitan'Ewheel</span>
          </div>
          <nav className="hidden md:flex gap-1">
            {NAV.map((n) => (
              <a key={n.id} href={`#${n.id}`} className="nav-link">{n.label}</a>
            ))}
          </nav>
        </div>
      </header>

      <section id="accueil" className="section bg-gradient-to-r from-occ-red to-occ-yellow text-white">
        <div className="container">
          <h1 className="text-4xl md:text-5xl font-extrabold">Association de gyroroue en Occitanie</h1>
          <p className="mt-3 max-w-2xl">Initiation, découverte et entraînement aux compétitions de gyroroue. Sécurité, partage et passion comme priorités.</p>
          <div className="mt-6 flex gap-3">
            <a href="#qui" className="btn-primary bg-white text-black hover:bg-gray-100">Découvrir</a>
            <a href="#contact" className="btn-primary">Nous contacter</a>
          </div>
        </div>
      </section>

      <section id="qui" className="section">
        <div className="container">
          <h2 className="h2">Qui sommes-nous</h2>
          <p className="mb-4">L'association a pour but de promouvoir la pratique de la gyroroue dans toutes ses disciplines sportives, sur piste bitumée ou sol terreux. Elle vise à démocratiser ces activités en favorisant l'accès à des lieux adaptés et en supprimant les appréhensions liées à sa pratique. Elle s'engage à développer une communauté inclusive et bienveillante, en proposant des conseils, des formations et des événements. Elle sensibilise au respect des règles de sécurité et de l'environnement...</p>
          <div className="mt-6 grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-xl font-bold mb-2">Réseaux sociaux</h3>
              <SocialQR />

              <ul className="list-disc list-inside">
                <li>@Asso+Dan+Hood+LF</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2">Lien vers les disciplines</h3>
              <a href="#disciplines" className="text-occ-red underline">Voir les disciplines</a>
            </div>
          </div>
        </div>
      </section>

      <section id="disciplines" className="section">
        <div className="container">
          <h2 className="h2">Disciplines</h2>
          <GalleryTabs />
        </div>
      </section>

      <section id="media" className="section bg-gray-50">
        <div className="container">
          <h2 className="h2">Média</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-2">YouTube Francophones & autres langues</h3>
              <p>Liste à compléter : JRCV TEAM, RoninEUC, Monsieur Flex, WrongWay, EUC Limburg, ...</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Articles, presse & sites majeurs</h3>
              <p>À regrouper ici.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="calendrier" className="section">
        <div className="container">
          <h2 className="h2">Calendrier & Licences</h2>
          <div className="space-y-3">
            <p>1 — La circulation sur voie publique requiert une assurance de responsabilité civile spécifique EDPM (non incluse dans l'habitation, contrairement au vélo). Sur un événement sportif chronométré / circuit, une assurance sportive événementielle peut être demandée.</p>
            <p>2 — Calendrier des événements par discipline avec réservations (formulaires). Entre lundi et mercredi on poste un événement ou pas.</p>
          </div>
        </div>
      </section>

      <section id="contact" className="section bg-gray-50">
        <div className="container">
          <h2 className="h2">Contact</h2>
          <form className="grid md:grid-cols-2 gap-4 max-w-3xl" onSubmit={(e)=>e.preventDefault()}>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium">Qualité</label>
              <input className="mt-1 w-full border rounded-md px-3 py-2" placeholder="M., Mme, Autre" />
            </div>
            <div>
              <label className="block text-sm font-medium">Nom</label>
              <input className="mt-1 w-full border rounded-md px-3 py-2" />
            </div>
            <div>
              <label className="block text-sm font-medium">Prénom</label>
              <input className="mt-1 w-full border rounded-md px-3 py-2" />
            </div>
            <div>
              <label className="block text-sm font-medium">@ de contact</label>
              <input type="email" className="mt-1 w-full border rounded-md px-3 py-2" placeholder="email@exemple.com" />
            </div>
            <div>
              <label className="block text-sm font-medium">Lieu de domicile</label>
              <input className="mt-1 w-full border rounded-md px-3 py-2" />
            </div>
            <div>
              <label className="block text-sm font-medium">Profession</label>
              <input className="mt-1 w-full border rounded-md px-3 py-2" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium">Message</label>
              <textarea rows={5} className="mt-1 w-full border rounded-md px-3 py-2" />
            </div>
            <div className="md:col-span-2">
              <button className="btn-primary" type="submit">Envoyer</button>
            </div>
          </form>
        </div>
      </section>

      <footer className="border-t">
        <div className="container py-6 text-sm text-gray-600">
          © {new Date().getFullYear()} Occitan'Ewheel — Tous droits réservés.
        </div>
      </footer>
    </main>
  );
}
