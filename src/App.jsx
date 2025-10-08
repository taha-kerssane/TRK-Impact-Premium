import React, { useEffect, useMemo, useState } from 'react'

const STR = {
  fr: {
    brand:"TRK Impact — Tanger",
    kicker:"Gestion locative premium",
    heroTitle:"Agence immobilière haut de gamme à Tanger",
    heroSub:"Loyer fixe garanti, exploitation courte durée optimisée, et expérience 5★ — sans aucun effort pour vous.",
    ctaOwner:"Je suis propriétaire",
    ownersTitle:"Services propriétaires & investisseurs",
    features:[
      ["Loyer fixe garanti","Pacte de rendement : revenus mensuels stables, zéro vacance."],
      ["Exploitation courte durée","Pricing dynamique, shooting pro, annonces optimisées."],
      ["Gestion 100% clé-en-main","Check-in/out, ménage hôtelier, maintenance, linge."],
      ["Conformité & assurance","Baux/avenants, règlement de copro, assurance RC."]
    ],
    investTitle:"Investisseurs — Rendement & sécurité",
    investCards:[
      ["Modèle de revenus","• Contrat à loyer fixe garanti<br>• Option indexation ou partage de performance<br>• Durée souple (12–36 mois)"],
      ["Performance cible","• ADR ≈ 1 400 MAD • Occupation ≈ 55%<br>• Brut ≈ 23 100 MAD<br>• Marge nette ≈ 8 000 MAD"],
      ["Gestion du risque","• Assurance, conformité copro, check-in autonome<br>• Standards ménage hôtelier & maintenance"],
      ["Onboarding express","• Audit (48h) • Shooting HDR<br>• Mise en ligne optimisée (Airbnb/Booking)"]
    ],
    pilotTitle:"Pilote — Résidence Tasnim (TASNIM 01)",
    pilotBullets:[
      "F4 • 150 m² • centre-ville • parking • fibre • check-in autonome",
      "ADR cible : 1 400 MAD • Occupation cible : 55 %",
      "Revenus bruts ~23 100 MAD • Marge nette ~8 000 MAD • Break-even ~7 nuits"
    ],
    directTitle:"Contact direct", role:"Chargé de location appartement",
    ctaWhats:"Parler sur WhatsApp", ctaContact:"Nous contacter", ctaWhats2:"WhatsApp direct",
    contactTitle:"Parlons de votre bien",
    contactSub:"Exploitons son plein potentiel dès ce mois-ci. Réponse rapide.",
    contactWhatsApp:"WhatsApp direct",
    footer:"© TRK Impact — Gestion locative premium à Tanger"
  },

  en: {
    brand:"TRK Impact — Tangier",
    kicker:"Premium property management",
    heroTitle:"High-end real-estate agency in Tangier",
    heroSub:"Guaranteed fixed rent, optimized short-stay operations and 5-star guest experience — fully hands-off.",
    ctaOwner:"I’m a landlord",
    ownersTitle:"Services for landlords & investors",
    features:[
      ["Guaranteed fixed rent","Stable monthly income, zero vacancy risk."],
      ["Short-stay operations","Dynamic pricing, pro shooting, optimized listings."],
      ["100% hands-off","Check-in/out, hotel-grade cleaning, maintenance, linen."],
      ["Compliance & insurance","Contracts, HOA rules, liability insurance."]
    ],
    investTitle:"Investors — Return & risk control",
    investCards:[
      ["Revenue model","• Guaranteed fixed-rent agreement<br>• Optional indexation / performance sharing<br>• Flexible term (12–36 months)"],
      ["Target performance","• ADR ≈ 1,400 MAD • Occupancy ≈ 55%<br>• Gross ≈ 23,100 MAD<br>• Net ≈ 8,000 MAD"],
      ["Risk management","• Insurance, HOA compliance, self check-in<br>• Hotel-grade cleaning & maintenance"],
      ["Fast onboarding","• 48h audit • HDR shooting<br>• Optimized listings (Airbnb/Booking)"]
    ],
    pilotTitle:"Pilot — Tasnim Residence (TASNIM 01)",
    pilotBullets:[
      "4BR • 150 m² • city center • parking • fiber • self check-in",
      "Target ADR: 1,400 MAD • Occupancy: 55%",
      "Gross ~23,100 MAD • Net ~8,000 MAD • Break-even ~7 nights"
    ],
    directTitle:"Direct contact", role:"Apartment rental manager",
    ctaWhats:"Chat on WhatsApp", ctaContact:"Contact us", ctaWhats2:"WhatsApp now",
    contactTitle:"Let’s talk about your property",
    contactSub:"We can unlock its full potential this month. Fast response.",
    contactWhatsApp:"WhatsApp now",
    footer:"© TRK Impact — Premium rental management in Tangier"
  },

  ar: {
    brand:"‏TRK Impact — طنجة",
    kicker:"إدارة إيجار فاخرة",
    heroTitle:"وكالة عقارية فاخرة في طنجة",
    heroSub:"إيجار ثابت مضمون وتشغيل قصير المدى مُحسّن وتجربة ضيوف خمس نجوم — بدون أي جهد منك.",
    ctaOwner:"أنا مالك العقار",
    ownersTitle:"خدمات للمالكين والمستثمرين",
    features:[
      ["إيجار ثابت مضمون","دخل شهري مستقر بدون شغور."],
      ["تشغيل قصير المدى","تسعير ديناميكي، تصوير احترافي، تحسين القوائم."],
      ["إدارة كاملة","تسجيل دخول/خروج، تنظيف فندقي، صيانة وبياضات."],
      ["امتثال وتأمين","عقود، نظام اتحاد الملاك، تأمين المسؤولية."]
    ],
    investTitle:"المستثمرون — عائد وتحكم بالمخاطر",
    investCards:[
      ["نموذج الإيرادات","• عقد إيجار ثابت مضمون<br>• فهرسة أو مشاركة أداء اختيارية<br>• مدة مرنة (12–36 شهرًا)"],
      ["الأداء المستهدف","• ADR ≈ 1400 درهم • إشغال ≈ 55%<br>• إجمالي ≈ 23100 درهم<br>• صافي ≈ 8000 درهم"],
      ["إدارة المخاطر","• تأمين، امتثال اتحاد الملاك، دخول ذاتي<br>• تنظيف فندقي وصيانة"],
      ["تشغيل سريع","• تدقيق خلال 48 ساعة • تصوير HDR<br>• قوائم محسنة (Airbnb/Booking)"]
    ],
    pilotTitle:"المشروع التجريبي — إقامة تسنيم (TASNIM 01)",
    pilotBullets:[
      "4 غرف • 150 م² • وسط المدينة • موقف • ألياف • دخول ذاتي",
      "متوسط السعر المستهدف: 1400 درهم • إشغال: 55%",
      "الإيراد الإجمالي ~23100 درهم • الصافي ~8000 درهم • نقطة التعادل ~7 ليالٍ"
    ],
    directTitle:"تواصل مباشر", role:"مسؤول تأجير الشقق",
    ctaWhats:"تواصل عبر واتساب", ctaContact:"اتصل بنا", ctaWhats2:"واتساب مباشر",
    contactTitle:"دعنا نتحدث عن عقارك",
    contactSub:"نطلق إمكاناته هذا الشهر. استجابة سريعة.",
    contactWhatsApp:"واتساب مباشر",
    footer:"© TRK Impact — إدارة إيجار فاخرة في طنجة"
  }
}

const LANGS = ['fr','en','ar']

export default function App(){
  const [lang, setLang] = useState('fr')
  const t = useMemo(()=>STR[lang], [lang])

  useEffect(()=>{
    document.documentElement.lang = lang
    document.body.classList.toggle('rtl', lang==='ar')
  },[lang])

  const trackPdfClick = () => {
    try{ gtag('event','deal_deck_download') }catch(e){}
    try{ fbq('trackCustom','DealDeckDownload') }catch(e){}
  }

  return (
    <div className="texture min-h-screen">
      {/* NAV */}
      <div className="sticky top-0 z-40 bg-white/80 backdrop-blur border-b border-[var(--line)]">
        <div className="max-w-6xl mx-auto px-5 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2 font-extrabold text-slate-900">
            <div className="w-10 h-10 rounded-2xl grid place-items-center text-white font-black"
                 style={{background:"linear-gradient(135deg,#0f172a,#1f2937)"}}>TRK</div>
            <span>{t.brand}</span>
          </div>
          <div className="flex items-center gap-2">
            {LANGS.map(l=>(
              <button key={l}
                onClick={()=>setLang(l)}
                className={"px-3 py-1 rounded-xl text-sm " + (lang===l ? "bg-[var(--ink)] text-white" : "border border-[var(--ink)] text-[var(--ink)] hover:bg-slate-50")}>
                {l.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* HERO */}
      <header className="max-w-6xl mx-auto px-5 py-12 grid md:grid-cols-2 gap-8 items-center">
        <div className={lang==='ar'?'text-right':''}>
          <div className="tracking-[.18em] text-[var(--gold)] font-bold uppercase">{t.kicker}</div>
          <h1 className="text-5xl font-extrabold leading-tight text-[var(--ink)] mt-1">{t.heroTitle}</h1>
          <p className="text-lg text-slate-600 mt-3">{t.heroSub}</p>
          <div className={"mt-5 flex flex-wrap gap-3 " + (lang==='ar'?'justify-end':'')}>
            <a className="btn btn-primary" href="#owners">{t.ctaOwner}</a>
            <a className="btn btn-outline" href="https://wa.me/33619642559" target="_blank" rel="noopener">WhatsApp</a>
          </div>
        </div>
        <div className="rounded-2xl overflow-hidden border shadow-xl">
         {/* PHOTO HERO */}
<img
  src="/actifs/taha.jpg?v=2"
  alt="Taha Kerssane — TRK Impact"
  className="w-full h-full object-cover"
/>
       </div>
      </header>

      {/* SERVICES */}
      <section id="owners" className="bg-white border-t border-b border-[var(--line)]">
        <div className="max-w-6xl mx-auto px-5 py-10">
          <h2 className={"text-2xl font-bold mb-4 " + (lang==='ar'?'text-right':'')}>{t.ownersTitle}</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {t.features.map(([h,p],i)=>(
              <div key={i} className="card">
                <h3 className="font-semibold">{h}</h3>
                <p className="text-sm text-slate-600 mt-1">{p}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* INVEST */}
      <section id="invest">
        <div className="max-w-6xl mx-auto px-5 py-10">
          <h2 className={"text-2xl font-bold mb-4 " + (lang==='ar'?'text-right':'')}>{t.investTitle}</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {t.investCards.map(([h,p],i)=>(
              <div key={i} className="card">
                <h3 className="font-semibold">{h}</h3>
                <p className="text-sm text-slate-600 mt-1" dangerouslySetInnerHTML={{__html:p}}/>
              </div>
            ))}
          </div>

          <div className="mt-4 flex gap-3 flex-wrap">
           <a
  {/* BOUTON PDF */}
<a
  id="dealDeckBtn"
  className="btn btn-primary"
  href="/actifs/DealDeck-TRK-Impact.pdf?v=2"
  download="DealDeck-TRK-Impact.pdf"
  rel="noopener"
  onClick={() => {
    try { gtag('event','deal_deck_download') } catch(e) {}
    try { fbq('trackCustom','DealDeckDownload') } catch(e) {}
  }}
>
  📄 Télécharger le Deal Deck (PDF)
</a>

            <a className="btn btn-contour" href="#contact">
              Être rappelé
            </a>
          </div>
        </div>
      </section>

      {/* PILOT + CONTACT DIRECT */}
      <section className="border-t border-b border-[var(--line)] bg-white">
        <div className="max-w-6xl mx-auto px-5 py-10 grid md:grid-cols-2 gap-6 items-start">
          <div className={lang==='ar'?'text-right':''}>
            <h3 className="text-xl font-bold">{t.pilotTitle}</h3>
            <ul className="mt-3 space-y-2 text-sm text-slate-700">
              {t.pilotBullets.map((x,idx)=>(<li key={idx}>• {x}</li>))}
            </ul>
            <div className={"mt-4 flex gap-3 " + (lang==='ar'?'justify-end':'')}>
              <a className="btn btn-primary" href="https://wa.me/33619642559" target="_blank" rel="noopener">{t.ctaWhats}</a>
              <a className="btn btn-outline" href="#contact">{t.ctaContact}</a>
            </div>
          </div>
          <div className="card">
            <h3 className="font-bold mb-2">{t.directTitle}</h3>
            <div className="flex gap-3 items-center">
{/* QR WHATSAPP (PNG !) */}
<img
  src="/actifs/whatsapp-qr.png?v=2"
  alt="QR WhatsApp Taha"
  className="w-[120px] h-[120px] rounded-xl border"
/>
              <div>
                <div className="font-extrabold">Taha Kerssane</div>
                <div className="text-sm text-slate-600">{t.role}</div>
                <div className="mt-1">📞 +33 6 19 64 25 59</div>
                <div>✉️ tahakerssanepro@gmail.com</div>
                <a className="btn btn-primary mt-2 inline-block" href="https://wa.me/33619642559" target="_blank" rel="noopener">{t.ctaWhats2}</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="max-w-6xl mx-auto px-5 py-10">
        <h2 className={"text-2xl font-bold " + (lang==='ar'?'text-right':'')}>{t.contactTitle}</h2>
        <p className={"text-slate-600 " + (lang==='ar'?'text-right':'')}>{t.contactSub}</p>
        <a className="btn btn-primary mt-4 inline-block" href="https://wa.me/33619642559" target="_blank" rel="noopener">
          {t.contactWhatsApp}
        </a>
      </section>

      {/* FOOTER */}
      <footer className="border-t">
        <div className="max-w-6xl mx-auto px-5 py-6 flex items-center justify-between flex-wrap gap-3">
          <small>{t.footer}</small>
          <span className="inline-block px-3 py-1 rounded-full text-white text-xs" style={{background:"#111827"}}>Top 5% service</span>
        </div>
      </footer>
    </div>
  )
}
