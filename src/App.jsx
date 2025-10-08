import React, { useEffect, useMemo, useRef, useState } from 'react';
import TestimonialsCarousel from './components/TestimonialsCarousel.jsx';

// ========================
// Liens et constantes
// ========================
const DEAL_DECK_PDF = '/TRK-DealDeck.pdf';
const HOMEPAGE_MOCKUP_IMG = '/assets/mockup-3d-home.webp';
const WHATSAPP_FR = 'https://wa.me/33619642559';
const WHATSAPP_MA = 'https://wa.me/212722584276';
const CALENDBOOK_LINK = 'https://www.calendbook.com/tahakerssane/rendezvousdécouverte15min';

// ========================
// i18n dictionnaire
// ========================
const dict = {
  fr: {
    brand: 'TRK Impact Premium',
    tagline: 'Gestion locative clé en main pour propriétaires exigeants.',
    subtagline: 'Nous optimisons vos revenus via Airbnb, Booking et Abritel.',
    ctaDeck: '📥 Télécharger le Deal Deck',
    ctaCall: '📅 Prendre rendez-vous',
    featuresTitle: 'Nos plateformes partenaires',
    bioTitle: 'À propos de Taha Kerssane',
    bio: "Expert en gestion locative et optimisation de rentabilité. J’accompagne les propriétaires à maximiser leurs revenus via Airbnb, Booking et Abritel, grâce à une gestion complète, transparente et premium.",
    testimonialsTitle: 'Témoignages clients',
    footer: '© ' + new Date().getFullYear() + ' TRK Impact Premium — Tous droits réservés.',
    themeLight: 'Clair',
    themeDark: 'Sombre',
  },
  en: {
    brand: 'TRK Impact Premium',
    tagline: 'Turnkey property management for demanding owners.',
    subtagline: 'We optimize your rental income through Airbnb, Booking, and Abritel.',
    ctaDeck: '📥 Download Deal Deck',
    ctaCall: '📅 Book a call',
    featuresTitle: 'Partner Platforms',
    bioTitle: 'About Taha Kerssane',
    bio: 'Expert in rental management and ROI optimization. I help property owners maximize their earnings via Airbnb, Booking, and Abritel through a transparent, all-inclusive, premium service.',
    testimonialsTitle: 'Client Testimonials',
    footer: '© ' + new Date().getFullYear() + ' TRK Impact Premium — All rights reserved.',
    themeLight: 'Light',
    themeDark: 'Dark',
  },
  ar: {
    brand: 'TRK Impact Premium',
    tagline: 'إدارة عقارية متكاملة للمالكين المميزين.',
    subtagline: 'نزيد من عائداتك عبر Airbnb وBooking وAbritel.',
    ctaDeck: '📥 تحميل عرض Deal Deck',
    ctaCall: '📅 حجز موعد',
    featuresTitle: 'المنصات الشريكة',
    bioTitle: 'حول طه كرسّان',
    bio: 'خبير في إدارة الإيجار وتحسين الأرباح. أساعد الملاك على زيادة دخلهم من خلال إدارة متكاملة وشفافة وفاخرة.',
    testimonialsTitle: 'آراء العملاء',
    footer: '© ' + new Date().getFullYear() + ' TRK Impact Premium — جميع الحقوق محفوظة.',
    themeLight: 'فاتح',
    themeDark: 'داكن',
  },
};

// ========================
// Hooks utilitaires
// ========================
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
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('fade-in-visible');
            io.unobserve(e.target);
          }
        }),
      { threshold: 0.2 }
    );
    el.querySelectorAll('[data-animate="fade"]').forEach((n) => io.observe(n));
    return () => io.disconnect();
  }, []);
  return ref;
};

// ========================
// App principale
// ========================
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
    <div
      className="min-h-screen"
      style={{
        background:
          theme === 'dark'
            ? 'linear-gradient(180deg,#0b0b0b 0%,#121212 100%)'
            : 'linear-gradient(180deg,#fafafa 0%,#ffffff 100%)',
        color: theme === 'dark' ? '#f5f5f5' : '#161616',
        fontFamily: 'Manrope, sans-serif',
      }}
    >
      {/* NAVBAR */}
      <header style={navbarStyle(theme)}>
        <nav style={navInner}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <img src="/assets/logo-trk.svg" alt="TRK Impact Logo" width="36" height="36" />
            <strong>{t.brand}</strong>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <select value={lang} onChange={(e) => setLang(e.target.value)} style={selectStyle(theme)}>
              <option value="fr">🇫🇷 FR</option>
              <option value="en">🇬🇧 EN</option>
              <option value="ar">🇲🇦 AR</option>
            </select>
            <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} style={btnGhost}>
              {theme === 'dark' ? '☀️' : '🌙'}
            </button>
          </div>
        </nav>
      </header>

      {/* MAIN */}
      <main ref={animRootRef} style={{ maxWidth: 1180, margin: '0 auto', padding: '40px 16px' }}>
        {/* HERO */}
        <section data-animate="fade" style={heroCard}>
          <h1 style={{ fontSize: 36, margin: 0 }}>{t.tagline}</h1>
          <p style={{ margin: '10px 0 20px', fontSize: 18 }}>{t.subtagline}</p>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <a href={DEAL_DECK_PDF} target="_blank" rel="noopener noreferrer" style={btnPrimary}>
              {t.ctaDeck}
            </a>
            <a href={CALENDBOOK_LINK} target="_blank" rel="noopener noreferrer" style={btnGhost}>
              {t.ctaCall}
            </a>
          </div>
        </section>

        {/* PLATEFORMES */}
        <section data-animate="fade" style={section}>
          <h2 style={h2}>{t.featuresTitle}</h2>
          <div style={iconGrid}>
            <img src="/assets/icons/airbnb.svg" alt="Airbnb" style={iconStyle} />
            <img src="/assets/icons/booking.svg" alt="Booking" style={iconStyle} />
            <img src="/assets/icons/abritel.svg" alt="Abritel" style={iconStyle} />
          </div>
        </section>

        {/* TÉMOIGNAGES */}
        <section data-animate="fade" style={section}>
          <h2 style={h2}>{t.testimonialsTitle}</h2>
          <TestimonialsCarousel lang={lang} />
        </section>

        {/* BIO */}
        <section data-animate="fade" style={section}>
          <h2 style={h2}>{t.bioTitle}</h2>
          <div style={bioCard}>
            <img src="/assets/taha.jpg" alt="Taha Kerssane" width="70" height="70" style={avatar} />
            <p>{t.bio}</p>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer style={footer(theme)}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
          <img src="/assets/whatsapp-qr.png" alt="QR WhatsApp" width="90" height="90" />
          <a href={CALENDBOOK_LINK} target="_blank" rel="noopener noreferrer" style={btnPrimary}>
            📅 Prendre rendez-vous
          </a>
          <small>{t.footer}</small>
        </div>
      </footer>

      {/* BULLE WHATSAPP */}
      <div id="wa-bubble" style={waBubbleWrap}>
        <button onClick={() => setWaOpen(!waOpen)} style={waButton}>
          💬
        </button>
        {waOpen && (
          <div style={waMenu}>
            <a href={WHATSAPP_FR} target="_blank" rel="noopener noreferrer" style={waItem}>🇫🇷 WhatsApp FR</a>
            <a href={WHATSAPP_MA} target="_blank" rel="noopener noreferrer" style={waItem}>🇲🇦 WhatsApp MA</a>
          </div>
        )}
      </div>

      <style>{fadeCSS}</style>
    </div>
  );
}

// ========================
// Styles réutilisables
// ========================
const navbarStyle = (theme) => ({
  position: 'sticky',
  top: 0,
  zIndex: 50,
  backdropFilter: 'blur(10px)',
  background: theme === 'dark' ? 'rgba(10,10,10,.7)' : 'rgba(255,255,255,.6)',
  borderBottom: theme === 'dark' ? '1px solid rgba(241,196,15,.2)' : '1px solid rgba(0,0,0,.06)',
});
const navInner = {
  maxWidth: 1180,
  margin: '0 auto',
  padding: '12px 16px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
};
const selectStyle = (theme) => ({
  padding: '6px 10px',
  borderRadius: 8,
  border: theme === 'dark' ? '1px solid rgba(241,196,15,.4)' : '1px solid rgba(0,0,0,.2)',
  background: 'transparent',
  color: 'inherit',
});
const heroCard = {
  borderRadius: 18,
  padding: 30,
  textAlign: 'center',
  background: 'linear-gradient(180deg, rgba(20,20,20,.9) 0%, rgba(10,10,10,.9) 100%)',
  border: '1px solid rgba(241,196,15,.25)',
  boxShadow: '0 12px 40px rgba(0,0,0,.35)',
};
const btnPrimary = {
  padding: '10px 16px',
  borderRadius: 12,
  border: '1px solid rgba(241,196,15,.6)',
  background: 'linear-gradient(135deg,#1c1c1c,#3a3a3a)',
  color: '#f1c40f',
  fontWeight: 700,
  textDecoration: 'none',
};
const btnGhost = {
  padding: '10px 16px',
  borderRadius: 12,
  border: '1px solid rgba(241,196,15,.3)',
  background: 'transparent',
  color: '#f1c40f',
  fontWeight: 600,
  textDecoration: 'none',
};
const section = { marginTop: 50, textAlign: 'center' };
const h2 = { fontSize: 28, marginBottom: 16 };
const iconGrid = {
  display: 'flex',
  justifyContent: 'center',
  gap: 30,
  flexWrap: 'wrap',
};
const iconStyle = {
  width: 64,
  height: 64,
  filter: 'drop-shadow(0 0 5px rgba(241,196,15,.4))',
};
const bioCard = {
  display: 'flex',
  alignItems: 'center',
  gap: 14,
  justifyContent: 'center',
  flexWrap: 'wrap',
};
const avatar = {
  borderRadius: '50%',
  border: '2px solid rgba(241,196,15,.5)',
  boxShadow: '0 6px 20px rgba(0,0,0,.35)',
};
const footer = (theme) => ({
  padding: '40px 16px',
  borderTop: theme === 'dark' ? '1px solid rgba(241,196,15,.15)' : '1px solid rgba(0,0,0,.1)',
  textAlign: 'center',
});
const waBubbleWrap = { position: 'fixed', right: 18, bottom: 18, zIndex: 60 };
const waButton = {
  width: 54,
  height: 54,
  borderRadius: '50%',
  border: '1px solid rgba(241,196,15,.6)',
  background: 'linear-gradient(135deg,#141414,#2c2c2c)',
  color: '#f1c40f',
  fontSize: 24,
  cursor: 'pointer',
};
const waMenu = {
  marginTop: 8,
  borderRadius: 14,
  overflow: 'hidden',
  background: 'rgba(20,20,20,.95)',
  border: '1px solid rgba(241,196,15,.3)',
};
const waItem = {
  display: 'block',
  padding: '10px 14px',
  color: '#f1c40f',
  textDecoration: 'none',
};
const fadeCSS = `
[data-animate="fade"]{opacity:0;transform:translateY(10px);transition:opacity .6s,transform .6s;}
.fade-in-visible{opacity:1!important;transform:translateY(0)!important;}
`;
