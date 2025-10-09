import React, { useEffect, useMemo, useRef, useState } from 'react';
import TestimonialsCarousel from './components/TestimonialsCarousel.jsx';

// Liens/constantes
const DEAL_DECK_PDF = '/TRK-DealDeck.pdf';
const HOMEPAGE_MOCKUP_IMG = '/assets/mockup-3d-home.webp';
const WHATSAPP_FR = 'https://wa.me/33619642559';
const WHATSAPP_MA = 'https://wa.me/212722584276';
const CALENDBOOK_LINK = 'https://www.calendbook.com/tahakerssane/rendezvousdécouverte15min';

// Tracking unifié (GA4 + Meta Pixel)
const track = {
  ga(event, params = {}) { try { window.gtag?.('event', event, params); } catch {} },
  fb(event, params = {}, standard = false) {
    try {
      if (standard) window.fbq?.('track', event, params);
      else window.fbq?.('trackCustom', event, params);
    } catch {}
  },
  both({ gaEvent, gaParams, fbEvent, fbParams, fbStandard = false }) {
    track.ga(gaEvent, gaParams); track.fb(fbEvent, fbParams, fbStandard);
  },
};

// Dictionnaire i18n
const dict = {
  fr: {
    brand: 'TRK Impact Premium',
    // Hero
    heroTitle: 'Gestion locative clé en main pour propriétaires exigeants.',
    heroSub: 'Maximisez vos revenus via Airbnb, Booking et Abritel, sans charge mentale.',
    ctaDeck: '📥 Télécharger le Deal Deck',
    ctaCall: '📅 Prendre rendez-vous',
    ctaWA: '💬 WhatsApp',
    // Plateformes
    platTitle: 'Plateformes partenaires',
    // Offres
    offersTitle: 'Ce que nous gérons pour vous',
    offers: [
      'Annonces irrésistibles : copywriting, photos pro, retouches & staging digital',
      'Tarification dynamique : saisonnalité, événements, concurrence, IA pricing',
      'Excellence opérationnelle : check-in/out, ménage hôtelier, linge, réassort',
      'Service invités 7j/7 : FR/EN/AR, réponse en < 15 min',
      'Maintenance proactive : artisans qualifiés, devis avant travaux',
      'Transparence totale : tableau de bord, rapport mensuel, virement sécurisé',
    ],
    // Résultats
    resultsTitle: 'Résultats moyens constatés',
    results: [
      '+22% de revenu net la 1ʳᵉ année',
      '78–90% de taux d’occupation selon la saison',
      'Note moyenne 4.8/5 sur les séjours gérés',
    ],
    // Process
    processTitle: 'Comment ça marche',
    process: [
      { step: '1', title: 'Audit & projection', text: 'Estimation du revenu, check réglementaire.' },
      { step: '2', title: 'Mise à niveau', text: 'Photos pro, optimisation du bien et des annonces.' },
      { step: '3', title: 'Lancement', text: 'Multi-plateformes, calendrier & synchronisation.' },
      { step: '4', title: 'Pilotage', text: 'Prix dynamiques, messagerie 7j/7, qualité 5★.' },
      { step: '5', title: 'Reporting & virement', text: 'Suivi transparent, recommandations.' },
    ],
    // Témoignages
    testimonialsTitle: 'Témoignages',
    // Bio
    bioTitle: 'À propos de Taha Kerssane',
    bio: "Expert en gestion locative et optimisation de rentabilité, j’accompagne les propriétaires à maximiser leurs revenus locatifs tout en offrant une expérience 5★ aux voyageurs. Basé au Maroc, j’opère pour des clients entre la France et le Royaume, avec une approche premium, transparente et orientée résultats.",
    // FAQ
    faqTitle: 'Questions fréquentes',
    faq: [
      { q: 'Quel engagement minimum ?', a: 'Mandat de 3 mois renouvelable. Résiliation possible avec préavis de 30 jours.' },
      { q: 'Qui s’occupe du ménage ?', a: 'Nos équipes hôtelières (check-list qualité + photos avant/après).' },
      { q: 'Comment fixez-vous les prix ?', a: 'Algorithme interne + données marché (saison, événements, concurrence).' },
      { q: 'Quand suis-je payé ?', a: 'Virement mensuel accompagné d’un rapport détaillé.' },
      { q: 'Qui gère les imprévus ?', a: 'Nous coordonnons artisans & interventions après votre validation chiffrée.' },
      { q: 'Puis-je bloquer des dates perso ?', a: 'Oui, vous avez un accès propriétaire pour bloquer librement.' },
      { q: 'Dépôt de garantie & litiges ?', a: 'Gérés selon les règles des plateformes, avec dossier photo/temps.' },
      { q: 'Assurances ?', a: 'Nous vous aidons à mettre en place les couvertures nécessaires.' },
    ],
    // UI
    platformsNote: 'Synchronisation, prix dynamiques, classement optimisé.',
    langLabel: 'Langue',
    themeLight: 'Clair',
    themeDark: 'Sombre',
    footer: '© ' + new Date().getFullYear() + ' TRK Impact Premium — Tous droits réservés.',
  },
  en: {
    brand: 'TRK Impact Premium',
    heroTitle: 'Turnkey short-term rental management for demanding owners.',
    heroSub: 'Maximize your income on Airbnb, Booking & Abritel — zero hassle.',
    ctaDeck: '📥 Download Deal Deck', ctaCall: '📅 Book a call', ctaWA: '💬 WhatsApp',
    platTitle: 'Partner Platforms',
    offersTitle: 'What we handle for you',
    offers: [
      'High-converting listings: copywriting, pro photos & digital staging',
      'Dynamic pricing: seasonality, events, competition, AI pricing',
      'Operational excellence: check-in/out, hotel-grade cleaning, linen',
      'Guest service 7/7: FR/EN/AR, < 15 min response time',
      'Proactive maintenance: vetted contractors, quote before work',
      'Full transparency: dashboard, monthly report, secure transfer',
    ],
    resultsTitle: 'Average results',
    results: ['+22% net revenue (1st year)', '78–90% occupancy', '4.8/5 average rating'],
    processTitle: 'How it works',
    process: [
      { step: '1', title: 'Audit & forecast', text: 'Revenue estimate, regulatory check.' },
      { step: '2', title: 'Upgrade & photos', text: 'Pro shoot, property & listing optimization.' },
      { step: '3', title: 'Go live', text: 'Multichannel, calendar & sync.' },
      { step: '4', title: 'Ongoing ops', text: 'Dynamic pricing, 7/7 messaging, 5★ quality.' },
      { step: '5', title: 'Reporting & payout', text: 'Transparent tracking, recommendations.' },
    ],
    testimonialsTitle: 'Testimonials',
    bioTitle: 'About Taha Kerssane',
    bio: 'Rental management & ROI specialist helping owners maximize returns with a premium, transparent, results-driven approach (MA & FR).',
    faqTitle: 'FAQ',
    faq: [
      { q: 'Minimum commitment?', a: '3-month renewable mandate. 30-day notice to cancel.' },
      { q: 'Who handles cleaning?', a: 'Hotel-grade teams (checklist + before/after photos).' },
      { q: 'How are prices set?', a: 'Internal algorithm + market data (season, events, competition).' },
      { q: 'When do I get paid?', a: 'Monthly transfer with a detailed report.' },
      { q: 'Who manages issues?', a: 'We coordinate contractors after your approval.' },
      { q: 'Can I block personal dates?', a: 'Yes, owner access lets you block freely.' },
      { q: 'Deposits & disputes?', a: 'Handled per platform rules with photo/time evidence.' },
      { q: 'Insurance?', a: 'We help set up proper coverage.' },
    ],
    platformsNote: 'Sync, dynamic prices, improved ranking.',
    langLabel: 'Language', themeLight: 'Light', themeDark: 'Dark',
    footer: '© ' + new Date().getFullYear() + ' TRK Impact Premium — All rights reserved.',
  },
  ar: {
    brand: 'TRK Impact Premium',
    heroTitle: 'تدبير شامل للإيجار القصير لأصحاب العقارات.',
    heroSub: 'تعظيم العائد عبر Airbnb وBooking وAbritel دون عناء.',
    ctaDeck: '📥 تحميل ملف العرض', ctaCall: '📅 حجز موعد', ctaWA: '💬 واتساب',
    platTitle: 'المنصات الشريكة',
    offersTitle: 'ماذا ندبّر نيابةً عنكم',
    offers: [
      'إعلانات فعّالة: كتابة احترافية وصور وجودة عرض رقمية',
      'تسعير ديناميكي: مواسم، أحداث، منافسة، وخوارزمية',
      'تشغيل متكامل: تسجيل وصول/مغادرة ونظافة فندقية ولوازم',
      'خدمة للنزلاء 7/7: FR/EN/AR وزمن رد أقل من 15 دقيقة',
      'صيانة استباقية: حرفيون موثوقون وعرض سعر قبل الأشغال',
      'شفافية كاملة: لوحة تحكم وتقرير شهري وتحويل آمن',
    ],
    resultsTitle: 'نتائج متوقعة',
    results: ['+22% عائد صافي في السنة الأولى', 'نسبة إشغال 78–90%', 'تقييم متوسط 4.8/5'],
    processTitle: 'خطوات العمل',
    process: [
      { step: '1', title: 'تقييم وتوقعات', text: 'تقدير العائد وفحص القوانين.' },
      { step: '2', title: 'تهيئة وتصوير', text: 'جلسة تصوير احترافية وتحسين العرض.' },
      { step: '3', title: 'إطلاق', text: 'نشر متعدد القنوات ومزامنة التقويم.' },
      { step: '4', title: 'تشغيل مستمر', text: 'تسعير ديناميكي ورسائل 7/7 وجودة 5★.' },
      { step: '5', title: 'تقارير وتحويلات', text: 'متابعة شفافة وتوصيات.' },
    ],
    testimonialsTitle: 'آراء العملاء',
    bioTitle: 'من نحن',
    bio: 'خبير في إدارة الإيجار وتعظيم العائد لأصحاب العقارات (المغرب وفرنسا) بنهج فاخر وشفاف وموجّه للنتائج.',
    faqTitle: 'الأسئلة الشائعة',
    faq: [
      { q: 'ما مدة الالتزام؟', a: 'عقد لمدة 3 أشهر قابل للتجديد وإلغاء بإشعار 30 يوماً.' },
      { q: 'من يدبر التنظيف؟', a: 'فرق تنظيف بمستوى فندقي (قائمة تدقيق + صور قبل/بعد).' },
      { q: 'كيف تحدد الأسعار؟', a: 'خوارزمية داخلية + بيانات سوقية (مواسم وأحداث ومنافسة).' },
      { q: 'متى أتلقى الدفعات؟', a: 'تحويل شهري مع تقرير تفصيلي.' },
      { q: 'من يدير الطوارئ؟', a: 'ننسق مع الحرفيين بعد موافقتكم على التكلفة.' },
      { q: 'هل أستطيع حجز تواريخ خاصة؟', a: 'نعم، حساب المالك يتيح الحجز.' },
      { q: 'الودائع والنزاعات؟', a: 'حسب قواعد المنصات مع ملف صور/توقيت.' },
      { q: 'التأمين؟', a: 'نساعدكم في إعداد التغطيات اللازمة.' },
    ],
    platformsNote: 'مزامنة، تسعير ديناميكي، وتحسين الترتيب.',
    langLabel: 'اللغة', themeLight: 'فاتح', themeDark: 'داكن',
    footer: '© ' + new Date().getFullYear() + ' TRK Impact Premium — جميع الحقوق محفوظة.',
  },
};

// Hooks
const getInitialLang = () => {
  const saved = localStorage.getItem('trk_lang');
  if (saved) return saved;
  const nav = navigator.language?.toLowerCase() || 'fr';
  if (nav.startsWith('ar')) return 'ar';
  if (nav.startsWith('en')) return 'en';
  return 'fr';
};
const getInitialTheme = () => {
  const saved = localStorage.getItem('trk_theme');
  if (saved === 'dark' || saved === 'light') return saved;
  const prefersDark = window.matchMedia?.('(prefers-color-scheme: dark)').matches;
  return prefersDark ? 'dark' : 'light';
};
const useFadeIn = () => {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const io = new IntersectionObserver((entries) => entries.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add('fade-in-visible'); io.unobserve(e.target); }
    }), { threshold: 0.2 });
    el.querySelectorAll('[data-animate="fade"]').forEach((n) => io.observe(n));
    return () => io.disconnect();
  }, []);
  return ref;
};

export default function App() {
  const [lang, setLang] = useState(getInitialLang);
  const [theme, setTheme] = useState(getInitialTheme);
  const t = useMemo(() => dict[lang] || dict.fr, [lang]);
  const isRtl = lang === 'ar';
  const animRootRef = useFadeIn();
  const [waOpen, setWaOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('trk_lang', lang);
    document.documentElement.setAttribute('lang', lang);
    document.documentElement.setAttribute('dir', isRtl ? 'rtl' : 'ltr');
  }, [lang, isRtl]);

  useEffect(() => {
    localStorage.setItem('trk_theme', theme);
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  return (
    <div className="min-h-screen">
      {/* NAVBAR */}
      <header style={navbarStyle(theme)}>
        <nav style={navInner}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <img src="/assets/logo-trk.svg" alt="TRK Impact Logo" width="36" height="36" />
            <strong>{t.brand}</strong>
          </div>

          {/* Boutons fixes (langue + soleil/lune) */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <select
              aria-label={t.langLabel}
              value={lang}
              onChange={(e) => {
                setLang(e.target.value);
                track.both({
                  gaEvent: 'lang_change',
                  gaParams: { to: e.target.value },
                  fbEvent: 'lang_change',
                  fbParams: { to: e.target.value },
                });
              }}
              style={selectStyle(theme)}
            >
              <option value="fr">🇫🇷 FR</option>
              <option value="en">🇬🇧 EN</option>
              <option value="ar">🇲🇦 AR</option>
            </select>

            <button
              onClick={() => {
                const next = theme === 'dark' ? 'light' : 'dark';
                setTheme(next);
                track.both({
                  gaEvent: 'theme_change',
                  gaParams: { before: theme, after: next },
                  fbEvent: 'theme_change',
                  fbParams: { before: theme, after: next },
                });
              }}
              style={btnGhost}
              title={theme === 'dark' ? t.themeLight : t.themeDark}
              aria-label={theme === 'dark' ? t.themeLight : t.themeDark}
            >
              {theme === 'dark' ? '☀️' : '🌙'}
            </button>
          </div>
        </nav>
      </header>

      {/* MAIN */}
      <main ref={animRootRef} className="container">
        {/* HERO */}
        <section className="section" data-animate="fade">
          <div className="card grid-2">
            <div className="stack-16">
              <h1>{t.heroTitle}</h1>
              <p>{t.heroSub}</p>
              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                <a
                  className="btn btn-primary"
                  href={CALENDBOOK_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() =>
                    track.both({
                      gaEvent: 'select_content',
                      gaParams: { content_type: 'calendbook' },
                      fbEvent: 'Contact',
                      fbParams: { method: 'calendbook' },
                      fbStandard: true
                    })
                  }
                >
                  {t.ctaCall}
                </a>
                <a
                  className="btn btn-ghost"
                  href={DEAL_DECK_PDF}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() =>
                    track.both({
                      gaEvent: 'file_download',
                      gaParams: { file_name: 'TRK-DealDeck.pdf', file_extension: 'pdf', link_url: DEAL_DECK_PDF },
                      fbEvent: 'ViewContent',
                      fbParams: { content_name: 'DealDeck PDF', content_category: 'asset' },
                      fbStandard: true
                    })
                  }
                >
                  {t.ctaDeck}
                </a>
                <a
                  className="btn btn-ghost"
                  href={WHATSAPP_FR}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() =>
                    track.both({
                      gaEvent: 'whatsapp_click',
                      gaParams: { region: 'FR' },
                      fbEvent: 'whatsapp_click',
                      fbParams: { region: 'FR' },
                    })
                  }
                >
                  {t.ctaWA} 🇫🇷
                </a>
                <a
                  className="btn btn-ghost"
                  href={WHATSAPP_MA}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() =>
                    track.both({
                      gaEvent: 'whatsapp_click',
                      gaParams: { region: 'MA' },
                      fbEvent: 'whatsapp_click',
                      fbParams: { region: 'MA' },
                    })
                  }
                >
                  {t.ctaWA} 🇲🇦
                </a>
              </div>
            </div>

            <div className="hero-visual">
              <img src={HOMEPAGE_MOCKUP_IMG} alt="Aperçu TRK Impact Premium" loading="eager" />
            </div>
          </div>
        </section>

        {/* PLATEFORMES */}
        <section className="section center" data-animate="fade">
          <h2>{t.platTitle}</h2>
          <div className="platforms" style={{ marginTop: 12 }}>
            <img src="/assets/icons/airbnb.svg" alt="Airbnb" />
            <img src="/assets/icons/booking.svg" alt="Booking" />
            <img src="/assets/icons/abritel.svg" alt="Abritel" />
          </div>
          <p style={{ marginTop: 8 }}>{t.platformsNote}</p>
        </section>

        {/* OFFRES */}
        <section className="section" data-animate="fade">
          <h2>{t.offersTitle}</h2>
          <div className="card" style={{ marginTop: 12 }}>
            <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'grid', gap: 10 }}>
              {t.offers.map((f, i) => (
                <li key={i} className="card" style={{ padding: 14 }}>
                  <span style={{ fontSize: 18, marginRight: 8 }}>⭐</span>{f}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* RÉSULTATS */}
        <section className="section" data-animate="fade">
          <h2>{t.resultsTitle}</h2>
          <div className="card" style={{ marginTop: 12, display: 'grid', gap: 10 }}>
            {t.results.map((r, i) => (
              <div key={i} className="card" style={{ padding: 14, textAlign: 'center' }}>{r}</div>
            ))}
          </div>
        </section>

        {/* PROCESS */}
        <section className="section" data-animate="fade">
          <h2>{t.processTitle}</h2>
          <div className="card" style={{ display: 'grid', gap: 14, marginTop: 12 }}>
            {t.process.map((p, i) => (
              <div key={i} className="card" style={{ display: 'grid', gridTemplateColumns: '38px 1fr', alignItems: 'center', gap: 10 }}>
                <div style={{
                  width: 38, height: 38, borderRadius: '50%', display: 'grid', placeItems: 'center',
                  border: '1px solid rgba(241,196,15,.6)', color: '#f1c40f', fontWeight: 800
                }}>{p.step}</div>
                <div>
                  <strong style={{ display: 'block' }}>{p.title}</strong>
                  <span style={{ color: 'var(--text-2)' }}>{p.text}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* TÉMOIGNAGES */}
        <section className="section" data-animate="fade">
          <h2>{t.testimonialsTitle}</h2>
          <TestimonialsCarousel lang={lang} />
        </section>

        {/* BIO */}
        <section className="section" data-animate="fade">
          <h2>{t.bioTitle}</h2>
          <div className="card" style={{ display: 'flex', alignItems: 'center', gap: 14, flexWrap: 'wrap' }}>
            <img className="avatar" src="/assets/taha.jpg" alt="Taha Kerssane" width="70" height="70" />
            <p style={{ marginTop: 6 }}>{t.bio}</p>
          </div>
        </section>

        {/* FAQ */}
        <section className="section" data-animate="fade">
          <h2>{t.faqTitle}</h2>
          <div className="card" style={{ marginTop: 12, display: 'grid', gap: 10 }}>
            {t.faq.map((qa, i) => (
              <div key={i} className="card" style={{ padding: 14 }}>
                <strong style={{ display: 'block' }}>{qa.q}</strong>
                <span style={{ color: 'var(--text-2)' }}>{qa.a}</span>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer style={footerStyle(theme)}>
        <div className="container" style={{ display: 'grid', gap: 10, placeItems: 'center' }}>
          <img src="/assets/whatsapp-qr.png" alt="QR WhatsApp" width="110" height="110" loading="lazy" />
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', justifyContent: 'center' }}>
            <a className="btn btn-primary" href={CALENDBOOK_LINK} target="_blank" rel="noopener noreferrer">📅 Prendre rendez-vous</a>
            <a className="btn btn-ghost" href={WHATSAPP_FR} target="_blank" rel="noopener noreferrer">WhatsApp 🇫🇷</a>
            <a className="btn btn-ghost" href={WHATSAPP_MA} target="_blank" rel="noopener noreferrer">WhatsApp 🇲🇦</a>
          </div>
          <small>{t.footer}</small>
        </div>
      </footer>

      {/* BULLE WHATSAPP */}
      <div id="wa-bubble" style={waBubbleWrap}>
        <button onClick={() => setWaOpen(!waOpen)} style={waButton} aria-haspopup="menu" aria-expanded={waOpen}>💬</button>
        {waOpen && (
          <div style={waMenu}>
            <a href={WHATSAPP_FR} target="_blank" rel="noopener noreferrer" style={waItem}>🇫🇷 WhatsApp FR</a>
            <a href={WHATSAPP_MA} target="_blank" rel="noopener noreferrer" style={waItem}>🇲🇦 WhatsApp MA</a>
          </div>
        )}
      </div>

      {/* Fade-in helper (au cas où le CSS n’est pas chargé) */}
      <style>{`[data-animate="fade"]{opacity:0;transform:translateY(10px);transition:opacity .6s, transform .6s;}
      .fade-in-visible{opacity:1!important;transform:translateY(0)!important;}`}</style>
    </div>
  );
}

// Styles inline partagés
const navbarStyle = (theme) => ({
  position: 'sticky', top: 0, zIndex: 50, backdropFilter: 'blur(10px)',
  background: theme === 'dark' ? 'rgba(10,10,10,.7)' : 'rgba(255,255,255,.7)',
  borderBottom: theme === 'dark' ? '1px solid rgba(241,196,15,.2)' : '1px solid rgba(0,0,0,.06)',
});
const navInner = { maxWidth: 1180, margin: '0 auto', padding: '12px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' };
const selectStyle = (theme) => ({ padding: '6px 10px', borderRadius: 10, border: theme === 'dark' ? '1px solid rgba(241,196,15,.45)' : '1px solid rgba(0,0,0,.2)', background: 'transparent', color: 'inherit' });
const btnGhost = { padding: '10px 16px', borderRadius: 12, border: '1px solid rgba(241,196,15,.35)', background: 'transparent', color: '#f1c40f', fontWeight: 600, textDecoration: 'none', cursor: 'pointer' };
const footerStyle = (theme) => ({ padding: '32px 0', borderTop: theme === 'dark' ? '1px solid rgba(241,196,15,.15)' : '1px solid rgba(0,0,0,.1)' });

const waBubbleWrap = { position: 'fixed', right: 18, bottom: 18, zIndex: 60 };
const waButton = {
  width: 54, height: 54, borderRadius: '50%', border: '1px solid rgba(241,196,15,.6)',
  background: 'linear-gradient(135deg,#141414,#2c2c2c)', color: '#f1c40f', fontSize: 22, cursor: 'pointer'
};
const waMenu = { marginTop: 8, borderRadius: 14, overflow: 'hidden', background: 'rgba(20,20,20,.95)', border: '1px solid rgba(241,196,15,.3)' };
const waItem = { display: 'block', padding: '10px 14px', color: '#f1c40f', textDecoration: 'none' };
