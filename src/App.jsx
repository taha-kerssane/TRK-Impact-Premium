import React from "react";

export default function App() {
  return (
    <div className="font-sans bg-neutral-50 text-neutral-900">
      {/* HERO */}
      <header className="max-w-6xl mx-auto py-20 px-6 flex flex-col md:flex-row items-center gap-10">
        <div className="flex-1">
          <h4 className="uppercase tracking-wider text-yellow-600 font-semibold mb-2">
            Gestion locative premium
          </h4>
          <h1 className="text-5xl font-extrabold leading-tight mb-4">
            Agence immobilière haut de gamme à Tanger
          </h1>
          <p className="text-neutral-600 mb-6">
            Loyer fixe garanti, exploitation courte durée optimisée, et
            expérience 5★ — sans aucun effort pour vous.
          </p>
          <div className="flex gap-4">
            <a
              href="#owners"
              className="px-6 py-3 bg-neutral-900 text-white rounded-lg font-medium shadow hover:bg-neutral-800"
            >
              Je suis propriétaire
            </a>
            <a
              href="https://wa.me/33619642559"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 border border-neutral-400 rounded-lg font-medium hover:bg-neutral-100"
            >
              WhatsApp
            </a>
          </div>
        </div>

        <div className="flex-1">
          <img
            src="/assets/taha.jpg"
            alt="Taha Kerssane — TRK Impact"
            className="rounded-2xl shadow-lg w-full object-cover"
          />
        </div>
      </header>

      {/* SERVICES */}
      <section
        id="owners"
        className="max-w-6xl mx-auto py-16 px-6 grid md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {[
          {
            title: "Loyer fixe garanti",
            desc: "Revenus mensuels stables, zéro vacance locative.",
          },
          {
            title: "Exploitation courte durée",
            desc: "Pricing dynamique, shooting pro, annonces optimisées.",
          },
          {
            title: "Gestion 100% clé-en-main",
            desc: "Check-in/out, ménage hôtelier, maintenance, linge.",
          },
          {
            title: "Conformité & assurance",
            desc: "Baux, règlement de copropriété, assurance RC.",
          },
        ].map((s, i) => (
          <div
            key={i}
            className="bg-white shadow-sm p-6 rounded-xl border border-neutral-100"
          >
            <h3 className="font-bold mb-2">{s.title}</h3>
            <p className="text-neutral-600 text-sm">{s.desc}</p>
          </div>
        ))}
      </section>

      {/* TÉMOIGNAGES */}
      <section
        id="testimonials"
        className="bg-white py-20 px-6 border-t border-neutral-100"
      >
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-extrabold mb-10">
            Témoignages de nos propriétaires
          </h2>

          <div className="grid md:grid-cols-3 gap-10">
            {/* Témoignage 1 */}
            <div className="p-6 bg-neutral-50 rounded-2xl shadow">
              <img
                src="/assets/avatars/sara.png"
                alt="Sara"
                className="w-20 h-20 rounded-full mx-auto mb-4 object-cover"
              />
              <p className="italic text-neutral-700 mb-3">
                “Je vivais à Paris et je redoutais de gérer un bien à distance.
                L’équipe TRK Impact s’occupe de tout, je reçois mes loyers
                chaque mois sans le moindre stress.”
              </p>
              <p className="font-semibold text-neutral-900">Sara B. — Paris</p>
            </div>

            {/* Témoignage 2 */}
            <div className="p-6 bg-neutral-50 rounded-2xl shadow">
              <img
                src="/assets/avatars/karim.png"
                alt="Karim"
                className="w-20 h-20 rounded-full mx-auto mb-4 object-cover"
              />
              <p className="italic text-neutral-700 mb-3">
                “Ils m’ont aidé à transformer un appartement vide en un vrai
                investissement rentable. Le suivi est clair, les rendements
                dépassent mes attentes.”
              </p>
              <p className="font-semibold text-neutral-900">Karim L. — Casablanca</p>
            </div>

            {/* Témoignage 3 */}
            <div className="p-6 bg-neutral-50 rounded-2xl shadow">
              <img
                src="/assets/avatars/famille.png"
                alt="Famille"
                className="w-20 h-20 rounded-full mx-auto mb-4 object-cover"
              />
              <p className="italic text-neutral-700 mb-3">
                “Nous avons confié notre résidence secondaire à TRK Impact : en
                quelques semaines, elle est devenue source de revenus. Le
                professionnalisme est irréprochable.”
              </p>
              <p className="font-semibold text-neutral-900">
                Famille R. — Bruxelles
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* BIO Taha Kerssane */}
      <section className="max-w-5xl mx-auto py-20 px-6 text-center">
        <h2 className="text-3xl font-extrabold mb-6">
          À propos de Taha Kerssane
        </h2>
        <p className="text-neutral-700 leading-relaxed max-w-3xl mx-auto">
          Entrepreneur franco-marocain passionné par la valorisation
          immobilière, Taha Kerssane a fondé <strong>TRK Impact</strong> avec une
          vision claire : rendre la gestion locative haut de gamme accessible,
          fluide et rentable pour les propriétaires.  
          <br />
          Fort de plusieurs années d’expérience dans la gestion de projets
          immobiliers et l’optimisation locative à Paris, Strasbourg et Tanger,
          il allie rigueur, sens du service et approche humaine.
          <br />
          <br />
          Son objectif : créer une relation de confiance durable entre
          propriétaires et gestionnaires, où chaque bien devient un patrimoine
          valorisé — sans contraintes.
        </p>
      </section>

      {/* FOOTER */}
      <footer className="bg-neutral-900 text-neutral-200 py-10 text-center text-sm">
        © 2025 TRK Impact — Gestion locative premium à Tanger.
        <br />
        Site conçu par <strong>Taha Kerssane</strong> • Performance, élégance &
        confiance.
      </footer>
    </div>
  );
}
import React, { useEffect, useMemo, useState } from "react";

/** ====== i18n ====== */
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
    footer:"© TRK Impact — Gestion locative premium à Tanger",

    // Nouvelle section
    testiTitle: "Témoignages de propriétaires",
    bioTitle: "À propos — Taha Kerssane",
    bioP1: "Entrepreneur et opérateur immobilier basé à Tanger, Taha Kerssane a bâti TRK Impact avec une idée simple : offrir aux propriétaires un rendement stable et une expérience zéro contrainte.",
    bioP2: "Après plusieurs années à optimiser des appartements en exploitation courte durée (prix dynamique, shooting HDR, standards ménage hôtelier), Taha a structuré un modèle à loyer fixe garanti pour supprimer l’aléa et sécuriser les propriétaires.",
    bioP3: "Son obsession : des procédures carrées (check-in autonome, maintenance préventive, conformité copro), un service clients 5★ et une transparence totale sur les chiffres.",
    bioP4: "Confier votre bien à TRK Impact, c’est bénéficier d’un pilote local impliqué, d’une équipe formée aux standards hôteliers, et d’un interlocuteur unique — Taha — joignable et responsable de bout en bout."
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
    footer:"© TRK Impact — Premium rental management in Tangier",

    testiTitle: "Owners’ testimonials",
    bioTitle: "About — Taha Kerssane",
    bioP1: "Entrepreneur and real-estate operator in Tangier, Taha Kerssane created TRK Impact to deliver stable returns with zero hassle for owners.",
    bioP2: "After years optimizing short-stay operations (dynamic pricing, HDR shooting, hotel cleaning standards), he designed a fixed-rent model to remove uncertainty and secure owners.",
    bioP3: "He is obsessed with solid procedures (self check-in, preventive maintenance, compliance), 5-star guest service and full transparency on numbers.",
    bioP4: "With TRK Impact, you get a committed local pilot, a trained hotel-grade team and a single point of contact — Taha — accountable end-to-end."
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
    footer:"© TRK Impact — إدارة إيجار فاخرة في طنجة",

    testiTitle: "آراء الملاك",
    bioTitle: "نبذة — طه كرسّان",
    bioP1: "رائد أعمال ومشغّل عقاري في طنجة، أسّس طه كرسّان TRK Impact ليقدّم عائداً ثابتاً دون عناء للمالك.",
    bioP2: "بعد سنوات من تحسين التشغيل قصير المدى (تسعير ديناميكي، تصوير HDR، معايير تنظيف فندقية)، ابتكر عقد إيجار ثابت يزيل عدم اليقين.",
    bioP3: "هوسه: إجراءات محكمة، خدمة ضيوف ممتازة وشفافية كاملة بالأرقام.",
    bioP4: "مع TRK Impact تحصل على قائد محلي ملتزم وفريق تدريب فندقي ونقطة اتصال واحدة — طه — مسؤول من البداية للنهاية."
  }
};

const LANGS = ["fr","en","ar"];
const CALENDBOOK = "https://www.calendbook.com/tahakerssane/rendezvousdécouverte15min";

export default function App(){
  const [lang, setLang] = useState("fr");
  const t = useMemo(()=>STR[lang], [lang]);

  useEffect(()=>{
    document.documentElement.lang = lang;
    document.body.classList.toggle("rtl", lang === "ar");
  },[lang]);

  return (
    <div className="texture min-h-screen text-slate-800">
      {/* NAV */}
      <div className="sticky top-0 z-40 bg-white/80 backdrop-blur border-b border-[var(--line)]">
        <div className="max-w-6xl mx-auto px-5 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3 font-extrabold text-slate-900">
            <img src="/assets/logo.svg" alt="TRK Impact" className="w-9 h-9" />
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
          <img src="/assets/taha.jpg" alt="Taha Kerssane — TRK Impact" className="w-full h-full object-cover"/>
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

          {/* CTAs */}
          <div className="mt-4 flex gap-3 flex-wrap">
            {/* BOUTON PDF (GA4 + Meta) */}
            <a
              id="dealDeckBtn"
              className="btn btn-primary"
              href="/assets/DealDeck-TRK-Impact.pdf?v=2"
              download="DealDeck-TRK-Impact.pdf"
              rel="noopener"
              onClick={() => {
                try { gtag('event','deal_deck_download') } catch(e) {}
                try { fbq('trackCustom','DealDeckDownload') } catch(e) {}
              }}
            >
              📄 Télécharger le Deal Deck (PDF)
            </a>

            <a className="btn btn-contour" href={CALENDBOOK} target="_blank" rel="noopener">
              Être rappelé
            </a>
          </div>
        </div>
      </section>

      {/* PILOTE + CONTACT DIRECT */}
      <section className="border-t border-b border-[var(--line)] bg-white">
        <div className="max-w-6xl mx-auto px-5 py-10 grid md:grid-cols-2 gap-6 items-start">
          <div className={lang==='ar'?'text-right':''}>
            <h3 className="text-xl font-bold">{t.pilotTitle}</h3>
            <ul className="mt-3 space-y-2 text-sm text-slate-700">
              {t.pilotBullets.map((x,idx)=>(<li key={idx}>• {x}</li>))}
            </ul>
            <div className={"mt-4 flex gap-3 " + (lang==='ar'?'justify-end':'')}>
              <a className="btn btn-primary" href="https://wa.me/33619642559" target="_blank" rel="noopener">{t.ctaWhats}</a>
              <a className="btn btn-outline" href={CALENDBOOK} target="_blank" rel="noopener">{t.ctaContact}</a>
            </div>
          </div>

          <div className="card">
            <h3 className="font-bold mb-2">{t.directTitle}</h3>
            <div className="flex gap-3 items-center">
              {/* QR WHATSAPP */}
              <img src="/assets/whatsapp-qr.png" alt="QR WhatsApp Taha" className="w-[120px] h-[120px] rounded-xl border"/>
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

      {/* TÉMOIGNAGES */}
      <section id="temoignages" className="bg-white border-b border-[var(--line)]">
        <div className="max-w-6xl mx-auto px-5 py-12">
          <h2 className="text-2xl font-bold mb-6">{t.testiTitle}</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="card text-center">
              <img src="/avatars/sara.png" alt="Sara — propriétaire" className="w-24 h-24 rounded-full mx-auto mb-3 object-cover"/>
              <p className="text-sm text-slate-700 italic">
                “J’ai confié mon appartement à TRK Impact il y a 6 mois : photos pro, annonces soignées, ménage impeccable.
                Je reçois mes loyers sans stress, et les voyageurs sont triés sur le volet.”
              </p>
              <div className="mt-3 font-semibold">Sara B. — Propriétaire à Tanger</div>
            </div>

            <div className="card text-center">
              <img src="/avatars/Karim.png" alt="Karim — investisseur" className="w-24 h-24 rounded-full mx-auto mb-3 object-cover"/>
              <p className="text-sm text-slate-700 italic">
                “Je craignais la courte durée. Taha a tout cadré : check-in autonome, maintenance, linge hôtelier.
                Résultat : +28 % de rendement vs. ma location classique.”
              </p>
              <div className="mt-3 font-semibold">Karim A. — Investisseur</div>
            </div>

            <div className="card text-center">
              <img src="/avatars/famille.png" alt="Famille — villa" className="w-24 h-24 rounded-full mx-auto mb-3 object-cover"/>
              <p className="text-sm text-slate-700 italic">
                “Notre villa dormait 8 mois sur 12. Avec TRK Impact, elle génère un revenu stable toute l’année.
                L’équipe est réactive, carrée, et les standards sont vraiment hôteliers.”
              </p>
              <div className="mt-3 font-semibold">Famille El Idrissi — Résidence Malabata</div>
            </div>
          </div>
        </div>
      </section>

      {/* BIO TAHA */}
      <section id="bio" className="max-w-6xl mx-auto px-5 py-12">
        <div className="grid md:grid-cols-3 gap-6 items-start">
          <div className="md:col-span-1">
            <h2 className="text-2xl font-bold">{t.bioTitle}</h2>
            <img src="/assets/taha.jpg" alt="Taha Kerssane" className="mt-4 rounded-xl border shadow-sm"/>
          </div>
          <div className="md:col-span-2 text-slate-700 leading-relaxed">
            <p className="mb-3">{t.bioP1}</p>
            <p className="mb-3">{t.bioP2}</p>
            <p className="mb-3">{t.bioP3}</p>
            <p className="mb-3">{t.bioP4}</p>
            <div className="mt-4 flex gap-3 flex-wrap">
              <a className="btn btn-primary" href={CALENDBOOK} target="_blank" rel="noopener">Prendre rendez-vous</a>
              <a className="btn btn-outline" href="https://wa.me/33619642559" target="_blank" rel="noopener">WhatsApp direct</a>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="max-w-6xl mx-auto px-5 py-10">
        <h2 className={"text-2xl font-bold " + (lang==='ar'?'text-right':'')}>{t.contactTitle}</h2>
        <p className={"text-slate-600 " + (lang==='ar'?'text-right':'')}>{t.contactSub}</p>
        <div className="flex gap-3 mt-4">
          <a className="btn btn-primary" href="https://wa.me/33619642559" target="_blank" rel="noopener">
            {t.contactWhatsApp}
          </a>
          <a className="btn btn-contour" href={CALENDBOOK} target="_blank" rel="noopener">
            Réserver un créneau
          </a>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t">
        <div className="max-w-6xl mx-auto px-5 py-6 flex items-center justify-between flex-wrap gap-3">
          <small>{t.footer}</small>
          <span className="inline-block px-3 py-1 rounded-full text-white text-xs" style={{background:"#111827"}}>Top 5% service</span>
        </div>
      </footer>

      {/* ===== Bulle WhatsApp (noir & doré) ===== */}
      <style>{`
        #trkWhatsAppBtn{
          position:fixed;bottom:22px;right:22px;background:#0f172a;color:#c6a972;
          border-radius:50%;width:62px;height:62px;display:flex;align-items:center;justify-content:center;
          font-size:28px;box-shadow:0 4px 20px rgba(0,0,0,.25);cursor:pointer;transition:.3s;z-index:1000
        }
        #trkWhatsAppBtn:hover{transform:scale(1.08);box-shadow:0 6px 24px rgba(198,169,114,.35)}
        #trkChatCard{
          position:fixed;bottom:90px;right:22px;background:#fff;border-radius:16px;padding:16px 18px;width:280px;
          font-family:Inter,system-ui,sans-serif;box-shadow:0 8px 30px rgba(0,0,0,.2);display:none;z-index:1001
        }
        #trkChatCard strong{color:#0f172a}
        #trkChatCard a{display:block;margin-top:8px;background:#0f172a;color:#c6a972;text-align:center;border-radius:10px;padding:10px;font-weight:600}
        #trkChatCard a:hover{background:#1c243a}
        #trkChatCard small{display:block;margin-top:10px;color:#666;font-size:13px}
      `}</style>
      <div id="trkWhatsAppBtn" title="Parler avec Taha sur WhatsApp" aria-label="Ouvrir la messagerie WhatsApp">💬</div>
      <div id="trkChatCard" aria-live="polite">
        <p><strong>💬 Besoin d’une estimation ?</strong><br/>Parlez avec Taha sur WhatsApp :</p>
        <a href="https://wa.me/33619642559" target="_blank" rel="noopener">🇫🇷 +33 6 19 64 25 59</a>
        <a href="https://wa.me/212722584276" target="_blank" rel="noopener">🇲🇦 +212 7 22 58 42 76</a>
        <small>Réponse rapide (8h – 22h) • tahakerssanepro@gmail.com</small>
      </div>
      <script dangerouslySetInnerHTML={{__html:`
        (function(){
          var btn=document.getElementById('trkWhatsAppBtn');
          var card=document.getElementById('trkChatCard'); var timer;
          btn.addEventListener('click',function(){
            var open=card.style.display==='block';
            card.style.display=open?'none':'block';
            clearTimeout(timer);
            if(!open) timer=setTimeout(function(){card.style.display='none'},9000);
            try{gtag('event','whatsapp_bubble_click')}catch(e){}
            try{fbq('trackCustom','WhatsAppBubbleClick')}catch(e){}
          });
        })();
      `}}/>
    </div>
  );
}
