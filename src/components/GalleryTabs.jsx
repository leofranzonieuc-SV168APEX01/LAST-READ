
"use client";
import { useMemo, useState } from "react";
import { GALLERY } from "../data/galleryData";

const TABS_ORDER = ["Utilitaire","Crosstrack","Enduro Trail","Piste circuit","Dirt Jump trailSlopestyle","Parade et voyages"];

export default function GalleryTabs(){
  const tabs = useMemo(()=> TABS_ORDER.filter(t=> GALLERY[t]?.length), []);
  const [active, setActive] = useState(tabs[0]||"");
  const [lightbox, setLightbox] = useState(null);
  const images = GALLERY[active] || [];
  const open = (i)=> setLightbox({ ...images[i], index:i });
  const close = ()=> setLightbox(null);
  const prev = ()=> setLightbox(s=> s ? { ...images[(s.index-1+images.length)%images.length], index:(s.index-1+images.length)%images.length } : s);
  const next = ()=> setLightbox(s=> s ? { ...images[(s.index+1)%images.length], index:(s.index+1)%images.length } : s);
  return (
    <section id="galerie" className="section">
      <div className="container">
        <h2 className="h2">Découvrir les disciplines sportives</h2>
        <div className="flex flex-wrap gap-2 mb-6">
          {tabs.map(t=>(
            <button key={t} onClick={()=>setActive(t)} className={["px-4 py-2 rounded-full border transition", active===t?"bg-occ-red text-white border-occ-red":"bg-white text-gray-800 border-gray-200 hover:border-occ-red"].join(" ")} aria-pressed={active===t}>{t}</button>
          ))}
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
          {images.map((img,i)=>(
            <figure key={img.src} className="group relative">
              <button onClick={()=>open(i)} className="block w-full h-full focus:outline-none" aria-label={`Agrandir ${img.alt}`}>
                <img src={img.src} alt={img.alt} loading="lazy" className="aspect-[4/3] w-full object-cover rounded-lg border border-gray-200 group-hover:opacity-90"/>
              </button>
              <figcaption className="sr-only">{img.alt}</figcaption>
            </figure>
          ))}
        </div>
      </div>
      {lightbox && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-label="Visionneuse d'images" onClick={close}>
          <div className="relative max-w-6xl w-full" onClick={(e)=>e.stopPropagation()}>
            <img src={lightbox.src} alt={lightbox.alt} className="w-full h-auto rounded-lg"/>
            <p className="mt-2 text-center text-white/80">{lightbox.alt}</p>
            <button onClick={close} className="absolute top-2 right-2 px-3 py-1 rounded-md bg-white/90 hover:bg-white" aria-label="Fermer">✕</button>
            <button onClick={prev} className="absolute top-1/2 -translate-y-1/2 left-2 px-3 py-2 rounded-md bg-white/90 hover:bg-white" aria-label="Précédent">‹</button>
            <button onClick={next} className="absolute top-1/2 -translate-y-1/2 right-2 px-3 py-2 rounded-md bg-white/90 hover:bg-white" aria-label="Suivant">›</button>
          </div>
        </div>
      )}
    </section>
  );
}
