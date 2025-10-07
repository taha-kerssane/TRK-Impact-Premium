import React, { useEffect, useMemo, useState } from "react";
import STR from "./i18n.json";
const LANGS=["fr"]; // can be extended
export default function App(){
  const [lang,setLang]=useState("fr");
  const t=useMemo(()=>STR[lang], [lang]);
  useEffect(()=>{document.documentElement.lang=lang;},[lang]);
  return (<div className="texture min-h-screen text-slate-800">
    <header className="max-w-6xl mx-auto px-5 py-12 grid md:grid-cols-2 gap-8 items-center">
      <div>
        <div className="tracking-[.18em] text-gold font-bold uppercase">{t.kicker}</div>
        <h1 className="text-5xl font-extrabold leading-tight text-ink mt-1">{t.heroTitle}</h1>
        <p className="text-lg text-slate-600 mt-3">{t.heroSub}</p>
        <div className="mt-5 flex flex-wrap gap-3">
          <a className="btn btn-primary" href="#owners">{t.ctaOwner}</a>
          <a className="btn btn-outline" href="https://wa.me/33619642559" target="_blank" rel="noopener">WhatsApp</a>
        </div>
      </div>
      <div className="rounded-2xl overflow-hidden border shadow-xl">
        <img src="/assets/taha.jpg" alt="Taha — TRK Impact" className="w-full h-full object-cover"/>
      </div>
    </header>
    <section id="owners" className="bg-white border-t border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-5 py-10">
        <h2 className="text-2xl font-bold mb-4">{t.ownersTitle}</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {t.features.map(([h,p],i)=>(
            <div key={i} className="card"><h3 className="font-semibold">{h}</h3><p className="text-sm text-slate-600 mt-1">{p}</p></div>
          ))}
        </div>
      </div>
    </section>
    <section id="invest" className="max-w-6xl mx-auto px-5 py-10">
      <h2 className="text-2xl font-bold mb-4">{t.investTitle}</h2>
      <div className="mt-4 flex gap-3 flex-wrap">
        <a id="dealDeckBtn" className="btn btn-primary" href="/assets/DealDeck-TRK-Impact.pdf" download type="application/pdf" rel="noopener"
          onClick={()=>{try{gtag('event','deal_deck_download')}catch(e){}; try{fbq('trackCustom','DealDeckDownload')}catch(e){}}}>
          📄 Télécharger le Deal Deck (PDF)
        </a>
        <a className="btn" href="#contact">Être rappelé</a>
      </div>
    </section>
  </div>);
}
