import React, { useEffect, useMemo, useRef, useState } from "react";
import TestimonialsCarousel from "./components/TestimonialsCarousel.jsx";

const DEAL_DECK_PDF = "/TRK-DealDeck.pdf";
const HOMEPAGE_MOCKUP_IMG = "/assets/mockup-3d-home.webp";
const WHATSAPP_FR = "https://wa.me/33651259462?text=Bonjour%20Taha%2C%20je%20souhaite%20%C3%A9changer%20au%20sujet%20de%20TRK%20Impact%20Premium%20%F0%9F%87%AB%F0%9F%87%B7";
const WHATSAPP_MA = "https://wa.me/212771348429?text=Salam%20Taha%2C%20je%20souhaite%20plus%20d%E2%80%99infos%20sur%20TRK%20Impact%20Premium%20%F0%9F%87%B2%F0%9F%87%A6";

const dict = {
  fr: {
    brand: "TRK Impact Premium",
    tagline: "Image premium. Vitesse. Conversion.",
    cta: "Télécharger le Deal Deck",
    featuresTitle: "Pourquoi TRK Impact ?",
    features: [
      "Interface multilingue FR/EN/AR",
      "Mode sombre / clair",
      "Carrousel de témoignages auto-défilant",
      "Animations fluides section par section",
      "Tracking GA4 + Meta Pixel",
      "Déploiement GitHub + Vercel",
    ],
    testimonialsTitle: "Témoignages",
    mockupTitle: "Aperçu",
    bioTitle: "À propos de Taha Kerssane",
    bio:
      "Closer & entrepreneur, j'accompagne les marques ambitieuses à lancer des sites premium orientés conversion (funnel clair, analytics, créas soignées). Objectif : crédibilité, leads qualifiés et ROI.",
    footer: "© " + new Date().getFullYear() + " TRK Impact — Tous droits réservés.",
    langLabel: "Langue",
    themeLight: "Clair",
    themeDark: "Sombre",
    menuWhatsApp: "WhatsApp",
    frShort: "FR",
    maShort: "MA",
  },
  en: {
    brand: "TRK Impact Premium",
    tagline: "Premium look. Speed. Conversion.",
    cta: "Download Deal Deck",
    featuresTitle: "Why TRK Impact?",
    features: [
      "Multilingual FR/EN/AR",
      "Light / Dark mode",
      "Auto-scrolling testimonials",
      "Smooth section animations",
      "GA4 + Meta Pixel tracking",
      "GitHub + Vercel deployment",
    ],
    testimonialsTitle: "Testimonials",
    mockupTitle: "Preview",
    bioTitle: "About Taha Kerssane",
    bio:
      "Closer & entrepreneur helping ambitious brands launch premium, conversion-focused websites (clear funnel, analytics, polished creatives). Goal: credibility, qualified leads & ROI.",
    footer: "© " + new Date().getFullYear() + " TRK Impact — All rights reserved.",
    langLabel: "Language",
    themeLight: "Light",
    themeDark: "Dark",
    menuWhatsApp: "WhatsApp",
    frShort: "FR",
    maShort: "MA",
  },
  ar: {
    brand: "TRK Impact Premium",
    tagline: "هوية فاخرة. سرعة. تحويل.",
    cta: "تحميل ملف العرض (Deal Deck)",
    featuresTitle: "لماذا TRK Impact؟",
    features: [
      "واجهة متعددة اللغات FR/EN/AR",
      "وضع فاتح / داكن",
      "شهادات عملاء بتمرير تلقائي",
      "حركات سلسة لكل قسم",
      "تتبّع GA4 + Meta Pixel",
      "إطلاق عبر GitHub + Vercel",
    ],
    testimonialsTitle: "آراء العملاء",
    mockupTitle: "معاينة",
    bioTitle: "نبذة عن طه كرسّان",
    bio:
      "Closer ورائد أعمال يساعد العلامات الطموحة على إطلاق مواقع فاخرة تركز على التحويل (قُمع واضح، تحليلات، تصاميم احترافية). الهدف: المصداقية والعملاء المؤهلون والعائد.",
    footer: "© " + new Date().getFullYear() + " TRK Impact — جميع الحقوق محفوظة.",
    langLabel: "اللغة",
    themeLight: "فاتح",
    themeDark: "داكن",
    menuWhatsApp: "واتساب",
    frShort: "فرنسا",
    maShort: "المغرب",
  },
};

const track = {
  ga4(name, params = {}) { try { if (typeof window.gtag === "function") window.gtag("event", name, params); } catch {} },
  fb(event, params = {}, { standard = false } = {}) {
    try {
      if (typeof window.fbq === "function") { standard ? window.fbq("track", event, params) : window.fbq("trackCustom", event, params); }
    } catch {}
  },
  both({ gaEvent, gaParams, fbEvent, fbParams, fbStandard = false }) {
    track.ga4(gaEvent, gaParams); track.fb(fbEvent, fbParams, { standard: fbStandard });
  },
};

const getInitialLang = () => {
  const saved = localStorage.getItem("trk_lang");
  if (saved) return saved;
  const nav = navigator.language?.toLowerCase() || "fr";
  if (nav.startsWith("ar")) return "ar";
  if (nav.startsWith("en")) return "en";
  return "fr";
};

const useFadeIn = () => {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const io = new IntersectionObserver((entries) => entries.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add("fade-in-visible"); io.unobserve(e.target); }
    }), { threshold: 0.2 });
    el.querySelectorAll('[data-animate="fade"]').forEach((n) => io.observe(n));
    return () => io.disconnect();
  }, []);
  return ref;
};

export default function App() {
  const [lang, setLang] = useState(getInitialLang);
  const [theme, setTheme] = useState("dark");
  const isRtl = lang === "ar";
  const t = useMemo(() => dict[lang] || dict.fr, [lang]);
  const animRootRef = useFadeIn();
  const [waOpen, setWaOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem("trk_lang", lang);
    document.documentElement.setAttribute("lang", lang);
    document.documentElement.setAttribute("dir", isRtl ? "rtl" : "ltr");
  }, [lang, isRtl]);

  return (
    <>
      {/* NAVBAR */}
      <header className="navbar">
        <div className="container nav-inner">
          <div className="brand">
            <img src="/assets/logo-trk.svg" alt="TRK" width="28" height="28"
                 style={{borderRadius:8,border:"1px solid rgba(241,196,15,.6)",boxShadow:"0 4px 14px rgba(0,0,0,.25)"}} />
            <strong>{t.brand}</strong>
          </div>

          <div style={{display:"flex",alignItems:"center",gap:10}}>
            <select aria-label={t.langLabel} value={lang} onChange={(e)=>setLang(e.target.value)}
                    style={{padding:"6px 10px",borderRadius:10,border:"1px solid rgba(241,196,15,.45)",background:"transparent",color:"inherit"}}>
              <option value="fr">🇫🇷 FR</option>
              <option value="en">🇬🇧 EN</option>
              <option value="ar">🇲🇦 AR</option>
            </select>
            <a className="btn btn-primary" href={DEAL_DECK_PDF} target="_blank" rel="noopener noreferrer"
               onClick={()=>track.both({
                 gaEvent:"file_download", gaParams:{file_name:"TRK-DealDeck.pdf",file_extension:"pdf",link_url:DEAL_DECK_PDF,lang,theme},
                 fbEvent:"ViewContent", fbParams:{content_name:"DealDeck PDF",content_category:"asset",lang,theme}, fbStandard:true
               })}>
              {t.cta}
            </a>
          </div>
        </div>
      </header>

      {/* MAIN */}
      <main ref={animRootRef}>
        <div className="container">

          {/* HERO */}
          <section className="section">
            <div className="card grid-2 hero" data-animate="fade">
              <div className="stack-16">
                <h1 className="h1">{t.tagline}</h1>
                <p className="p">GitHub + Vercel • GA4 + Meta Pixel • UI premium noir & or</p>
                <div style={{display:"flex",gap:10,flexWrap:"wrap"}}>
                  <a className="btn btn-primary" href={DEAL_DECK_PDF} target="_blank" rel="noopener noreferrer">{t.cta}</a>
                  <a className="btn btn-ghost" href={HOMEPAGE_MOCKUP_IMG} target="_blank" rel="noopener noreferrer">{t.mockupTitle}</a>
                </div>
              </div>
              <div className="hero-visual">
                <img src={HOMEPAGE_MOCKUP_IMG} alt="Aperçu TRK Impact Premium" loading="eager" />
              </div>
            </div>
          </section>

          {/* FEATURES */}
          <section className="section" data-animate="fade">
            <h2 className="h2">{t.featuresTitle}</h2>
            <ul className="features">
              {t.features.map((f,i)=>(
                <li key={i} className="feature"><span style={{fontSize:18}}>⭐</span><span>{f}</span></li>
              ))}
            </ul>
          </section>

          {/* TESTIMONIALS */}
          <section className="section" data-animate="fade">
            <h2 className="h2">{t.testimonialsTitle}</h2>
            <div className="card"><TestimonialsCarousel lang={lang} /></div>
          </section>

          {/* BIO */}
          <section className="section" data-animate="fade">
            <h2 className="h2">{t.bioTitle}</h2>
            <div className="card bio">
              <div style={{
                width:70,height:70,borderRadius:"50%",
                background:"linear-gradient(135deg,#121212 0%,#2c2c2c 100%)",
                border:"1.5px solid rgba(241,196,15,.6)", boxShadow:"0 6px 20px rgba(0,0,0,.35)"
              }} />
              <div>
                <strong style={{fontSize:18,display:"block"}}>Taha Kerssane</strong>
                <p className="p" style={{marginTop:6}}>{t.bio}</p>
              </div>
            </div>
          </section>

          {/* FOOTER */}
          <footer className="footer">{t.footer}</footer>
        </div>
      </main>

      {/* WHATSAPP FLOATING */}
      <div id="wa-bubble" style={{ position:"fixed", right:18, bottom:18, zIndex:60 }}>
        <button onClick={()=>setWaOpen(v=>!v)} title={t.menuWhatsApp}
                style={{ width:54,height:54,borderRadius:"50%",border:"1px solid rgba(241,196,15,.6)",
                         background:"linear-gradient(135deg,#141414 0%,#2c2c2c 100%)", color:"#f1c40f",
                         boxShadow:"0 10px 30px rgba(0,0,0,.35)", fontSize:26, display:"grid", placeItems:"center", cursor:"pointer" }}>
          🟢
        </button>
        {waOpen && (
          <div role="menu" style={{
            marginTop:8,borderRadius:14,overflow:"hidden",border:"1px solid rgba(241,196,15,.35)",
            boxShadow:"0 10px 30px rgba(0,0,0,.35)", background:"linear-gradient(180deg,rgba(18,18,18,.95) 0%, rgba(10,10,10,.95) 100%)", minWidth:180
          }}>
            <a role="menuitem" href={WHATSAPP_FR} target="_blank" rel="noopener noreferrer"
               style={{display:"block",padding:"12px 14px",color:"#f1c40f",textDecoration:"none"}}>
              🇫🇷 {t.frShort}
            </a>
            <div style={{borderTop:"1px solid rgba(241,196,15,.18)"}} />
            <a role="menuitem" href={WHATSAPP_MA} target="_blank" rel="noopener noreferrer"
               style={{display:"block",padding:"12px 14px",color:"#f1c40f",textDecoration:"none"}}>
              🇲🇦 {t.maShort}
            </a>
          </div>
        )}
      </div>
    </>
  );
}
