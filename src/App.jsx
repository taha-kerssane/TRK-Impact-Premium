import React, { useEffect, useMemo, useRef, useState } from 'react';
import TestimonialsCarousel from './components/TestimonialsCarousel.jsx';

// ========================
// Constantes à personnaliser
// ========================
const DEAL_DECK_PDF = '/assets/TRK-Deal-Deck.pdf'; // ← remplace par le chemin réel du PDF
const HOMEPAGE_MOCKUP_IMG = '/assets/trk-home-3d.png'; // ← image mockup 3D Canva
const WHATSAPP_FR = 'https://wa.me/33600000000'; // ← numéro France
const WHATSAPP_MA = 'https://wa.me/212600000000'; // ← numéro Maroc

// ========================
// i18n local minimal (self-contained)
// ========================
const dict = {
  fr: {
    brand: 'TRK Impact Premium',
    tagline: 'Image premium. Vitesse. Conversion.',
    cta: 'Télécharger le Deal Deck',
    featuresTitle: 'Pourquoi TRK Impact ?',
    features: [
      'Interface multilingue FR/EN/AR',
      'Mode sombre / clair',
      'Carrousel de témoignages auto-défilant',
      'Animations fluides section par section',
      'Tracking GA4 + Meta Pixel',
      'Déploiement GitHub + Vercel',
    ],
    testimonialsTitle: 'Témoignages',
    mockupTitle: 'Aperçu',
    bioTitle: 'À propos de Taha Kerssane',
    bio:
      "Closer & entrepreneur, j'accompagne les marques ambitieuses à lancer des sites premium orientés conversion (funnel clair, analytics, créas soignées). Objectif : crédibilité, leads qualifiés et ROI.",
    footer: '© ' + new Date().getFullYear() + ' TRK Impact — Tous droits réservés.',
    langLabel: 'Langue',
    themeLight: 'Clair',
    themeDark: 'Sombre',
    menuWhatsApp: 'WhatsApp',
    frShort: 'FR',
    maShort: 'MA',
  },
  en: {
    brand: 'TRK Impact Premium',
    tagline: 'Premium look. Speed. Conversion.',
    cta: 'Download Deal Deck',
    featuresTitle: 'Why TRK Impact?',
    features: [
      'Multilingual FR/EN/AR',
      'Light / Dark mode',
      'Auto-scrolling testimonials',
      'Smooth section animations',
      'GA4 + Meta Pixel tracking',
      'GitHub + Vercel deployment',
    ],
    testimonialsTitle: 'Testimonials',
    mockupTitle: 'Preview',
    bioTitle: 'About Taha Kerssane',
    bio:
      'Closer & entrepreneur helping ambitious brands launch premium, conversion-focused websites (clear funnel, analytics, polished creatives). Goal: credibility, qualified leads & ROI.',
    footer: '© ' + new Date().getFullYear() + ' TRK Impact — All rights reserved.',
    langLabel: 'Language',
    themeLight: 'Light',
    themeDark: 'Dark',
    menuWhatsApp: 'WhatsApp',
    frShort: 'FR',
    maShort: 'MA',
  },
  ar: {
    brand: 'TRK Impact Premium',
    tagline: 'هوية فاخرة. سرعة. تحويل.',
    cta: 'تحميل ملف العرض (Deal Deck)',
    featuresTitle: 'لماذا TRK Impact؟',
    features: [
      'واجهة متعددة اللغات FR/EN/AR',
      'وضع فاتح / داكن',
      'شهادات عملاء بتمرير تلقائي',
      'حركات سلسة لكل قسم',
      'تتبّع GA4 + Meta Pixel',
      'إطلاق عبر GitHub + Vercel',
    ],
    testimonialsTitle: 'آراء العملاء',
    mockupTitle: 'معاينة',
    bioTitle: 'نبذة عن طه كرسّان',
    bio:
      'Closer ورائد أعمال يساعد العلامات الطموحة على إطلاق مواقع فاخرة تركز على التحويل (قُمع واضح، تحليلات، تصاميم احترافية). الهدف: المصداقية والعملاء المؤهلون والعائد.',
    footer: '© ' + new Date().getFullYear() + ' TRK Impact — جميع الحقوق محفوظة.',
    langLabel: 'اللغة',
    themeLight: 'فاتح',
    themeDark: 'داكن',
    menuWhatsApp: 'واتساب',
    frShort: 'فرنسا',
    maShort: 'المغرب',
  },
};

// ========================
// Utilitaires
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

// Push safe analytics events if gtag/fbq exist
const trackEvent = (name, params = {}) => {
  try {
    if (typeof window.gtag === 'function') window.gtag('event', name, params);
    if (typeof window.fbq === 'function') window.fbq('trackCustom', name, params);
  } catch {}
};

// Intersection Observer for fade-in
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
// Composant principal
// ========================
export default function App() {
  const [lang, setLang] = useState(getInitialLang);
  const [theme, setTheme] = useState(getInitialTheme);
  const isRtl = lang === 'ar';
  const t = useMemo(() => dict[lang] || dict.fr, [lang]);
  const animRootRef = useFadeIn();
  const [waOpen, setWaOpen] = useState(false);

  // persist language & direction
  useEffect(() => {
    localStorage.setItem('trk_lang', lang);
    document.documentElement.setAttribute('lang', lang);
    document.documentElement.setAttribute('dir', isRtl ? 'rtl' : 'ltr');
  }, [lang, isRtl]);

  // theme handling
  useEffect(() => {
    localStorage.setItem('trk_theme', theme);
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  // close WhatsApp menu on outside click
  useEffect(() => {
    const onClick = (e) => {
      const bubble = document.getElementById('wa-bubble');
      if (bubble && !bubble.contains(e.target)) setWaOpen(false);
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);

  const onDownloadDeck = () => {
    trackEvent('deal_deck_download', { lang, theme });
    // téléchargement en ouvrant le PDF
    window.open(DEAL_DECK_PDF, '_blank', 'noopener,noreferrer');
  };

  return (
    <div
      className="min-h-screen"
      style={{
        background:
          theme === 'dark'
            ? 'linear-gradient(180deg,#0b0b0b 0%,#121212 100%)'
            : 'linear-gradient(180deg,#fafafa 0%,#ffffff 100%)',
        color: theme === 'dark' ? '#f5f5f5' : '#161616',
        transition: 'background .3s ease, color .3s ease',
      }}
    >
      {/* NAVBAR */}
      <header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 50,
          backdropFilter: 'blur(10px)',
          background:
            theme === 'dark'
              ? 'rgba(10,10,10,.6)'
              : 'rgba(255,255,255,.6)',
          borderBottom:
            theme === 'dark' ? '1px solid rgba(241,196,15,.15)' : '1px solid rgba(0,0,0,.06)',
        }}
      >
        <nav
          style={{
            maxWidth: 1180,
            margin: '0 auto',
            padding: '12px 16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 12,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div
              aria-hidden
              style={{
                width: 28,
                height: 28,
                borderRadius: 8,
                background: 'linear-gradient(135deg,#111 0%,#3a3a3a 100%)',
                border: '1px solid rgba(241,196,15,.6)',
                boxShadow: '0 4px 14px rgba(0,0,0,.25)',
              }}
            />
            <strong style={{ letterSpacing: '.3px' }}>{t.brand}</strong>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            {/* Lang selector */}
            <select
              aria-label={t.langLabel}
              value={lang}
              onChange={(e) => setLang(e.target.value)}
              style={{
                padding: '6px 10px',
                borderRadius: 10,
                border: '1px solid rgba(241,196,15,.45)',
                background: 'transparent',
                color: 'inherit',
              }}
            >
              <option value="fr">🇫🇷 FR</option>
              <option value="en">🇬🇧 EN</option>
              <option value="ar">🇲🇦 AR</option>
            </select>

            {/* Theme toggle */}
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              style={btnGhostStyle}
              aria-label={theme === 'dark' ? t.themeLight : t.themeDark}
              title={theme === 'dark' ? t.themeLight : t.themeDark}
            >
              {theme === 'dark' ? '☀️' : '🌙'}
            </button>

            {/* CTA Deal Deck */}
            <button onClick={onDownloadDeck} style={btnPrimaryStyle}>
              {t.cta}
            </button>
          </div>
        </nav>
      </header>

      {/* CONTENU */}
      <main ref={animRootRef} style={{ maxWidth: 1180, margin: '0 auto', padding: '20px 16px 80px' }}>
        {/* HERO */}
        <section data-animate="fade" style={cardHeroStyle}>
          <div style={{ display: 'grid', gap: 12 }}>
            <h1 style={{ margin: 0, fontSize: 38, lineHeight: 1.15 }}>
              {t.tagline}
            </h1>
            <p style={{ margin: 0, opacity: 0.9, fontSize: 18 }}>
              GitHub + Vercel • GA4 + Meta Pixel • UI premium noir & or
            </p>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              <button onClick={onDownloadDeck} style={btnPrimaryStyle}>
                {t.cta}
              </button>
              <a
                href={HOMEPAGE_MOCKUP_IMG}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent('mockup_open', { lang })}
                style={btnGhostStyle}
              >
                {t.mockupTitle}
              </a>
            </div>
          </div>
        </section>

        {/* FEATURES */}
        <section data-animate="fade" style={sectionStyle}>
          <h2 style={h2Style}>{t.featuresTitle}</h2>
          <ul style={featuresListStyle}>
            {t.features.map((f, i) => (
              <li key={i} style={featureItemStyle}>
                <span style={{ fontSize: 18 }}>⭐</span>
                <span>{f}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* TESTIMONIALS */}
        <section data-animate="fade" style={sectionStyle}>
          <h2 style={h2Style}>{t.testimonialsTitle}</h2>
          <TestimonialsCarousel lang={lang} />
        </section>

        {/* BIO TAHA */}
        <section data-animate="fade" style={sectionStyle}>
          <h2 style={h2Style}>{t.bioTitle}</h2>
          <div style={bioCardStyle}>
            <div
              aria-hidden
              style={{
                width: 70,
                height: 70,
                borderRadius: '50%',
                background:
                  'linear-gradient(135deg, rgba(18,18,18,1) 0%, rgba(44,44,44,1) 100%)',
                border: '1.5px solid rgba(241,196,15,.6)',
                boxShadow: '0 6px 20px rgba(0,0,0,.35)',
              }}
            />
            <div>
              <strong style={{ fontSize: 18, display: 'block' }}>
                Taha Kerssane
              </strong>
              <p style={{ margin: '6px 0 0 0', opacity: 0.92 }}>{t.bio}</p>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer
        style={{
          padding: '28px 16px',
          borderTop:
            theme === 'dark' ? '1px solid rgba(241,196,15,.18)' : '1px solid rgba(0,0,0,.08)',
          textAlign: 'center',
          fontSize: 14,
          opacity: 0.9,
        }}
      >
        {t.footer}
      </footer>

      {/* WHATSAPP FLOATING BUBBLE */}
      <div
        id="wa-bubble"
        style={{
          position: 'fixed',
          right: 18,
          bottom: 18,
          zIndex: 60,
        }}
      >
        <button
          onClick={() => setWaOpen((v) => !v)}
          aria-haspopup="menu"
          aria-expanded={waOpen}
          style={{
            width: 54,
            height: 54,
            borderRadius: '50%',
            border: '1px solid rgba(241,196,15,.6)',
            background:
              'linear-gradient(135deg, rgba(20,20,20,1) 0%, rgba(44,44,44,1) 100%)',
            color: '#f1c40f',
            boxShadow: '0 10px 30px rgba(0,0,0,.35)',
            cursor: 'pointer',
            fontSize: 26,
            display: 'grid',
            placeItems: 'center',
          }}
          title={t.menuWhatsApp}
        >
          🟢
        </button>

        {waOpen && (
          <div
            role="menu"
            style={{
              marginTop: 8,
              borderRadius: 14,
              overflow: 'hidden',
              border: '1px solid rgba(241,196,15,.35)',
              boxShadow: '0 10px 30px rgba(0,0,0,.35)',
              background:
                'linear-gradient(180deg, rgba(18,18,18,.95) 0%, rgba(10,10,10,.95) 100%)',
              minWidth: 180,
            }}
          >
            <a
              role="menuitem"
              href={WHATSAPP_FR}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => {
                trackEvent('whatsapp_click', { region: 'FR', lang });
                setWaOpen(false);
              }}
              style={waItemStyle}
            >
              🇫🇷 {t.frShort}
            </a>
            <a
              role="menuitem"
              href={WHATSAPP_MA}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => {
                trackEvent('whatsapp_click', { region: 'MA', lang });
                setWaOpen(false);
              }}
              style={{ ...waItemStyle, borderTop: '1px solid rgba(241,196,15,.18)' }}
            >
              🇲🇦 {t.maShort}
            </a>
          </div>
        )}
      </div>

      {/* Styles utilitaires (classes minimalistes) */}
      <style>{cssHelpers}</style>
    </div>
  );
}

// ========================
// Styles inline réutilisables
// ========================
const btnPrimaryStyle = {
  padding: '10px 14px',
  borderRadius: 12,
  border: '1px solid rgba(241,196,15,.6)',
  background:
    'linear-gradient(135deg, rgba(28,28,28,1) 0%, rgba(50,50,50,1) 100%)',
  color: '#f1c40f',
  fontWeight: 700,
  boxShadow: '0 6px 16px rgba(0,0,0,.35)',
  cursor: 'pointer',
};

const btnGhostStyle = {
  padding: '10px 14px',
  borderRadius: 12,
  border: '1px solid rgba(241,196,15,.35)',
  background: 'transparent',
  color: '#f1c40f',
  fontWeight: 600,
  cursor: 'pointer',
};

const cardHeroStyle = {
  display: 'grid',
  alignItems: 'center',
  minHeight: 240,
  borderRadius: 18,
  padding: 24,
  background:
    'linear-gradient(180deg, rgba(20,20,20,.92) 0%, rgba(10,10,10,.92) 100%)',
  border: '1px solid rgba(241,196,15,.20)',
  boxShadow: '0 12px 40px rgba(0,0,0,.35)',
};

const sectionStyle = {
  marginTop: 26,
};

const h2Style = {
  margin: '0 0 12px 0',
  fontSize: 26,
};

const featuresListStyle = {
  listStyle: 'none',
  padding: 0,
  margin: 0,
  display: 'grid',
  gap: 10,
};

const featureItemStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: 10,
  padding: '12px 14px',
  borderRadius: 14,
  border: '1px solid rgba(241,196,15,.18)',
  background:
    'linear-gradient(180deg, rgba(22,22,22,.85) 0%, rgba(12,12,12,.85) 100%)',
};

const bioCardStyle = {
  display: 'grid',
  gridTemplateColumns: '70px 1fr',
  gap: 14,
  alignItems: 'center',
  padding: 16,
  borderRadius: 14,
  border: '1px solid rgba(241,196,15,.18)',
  background:
    'linear-gradient(180deg, rgba(22,22,22,.85) 0%, rgba(12,12,12,.85) 100%)',
};

const waItemStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: 8,
  color: '#f1c40f',
  textDecoration: 'none',
  padding: '12px 14px',
};

// CSS helpers (fade-in + dark class safety)
const cssHelpers = `
  .fade-in-visible {
    opacity: 1 !important;
    transform: translateY(0) !important;
  }
  [data-animate="fade"] {
    opacity: 0;
    transform: translateY(10px);
    transition: opacity .6s ease, transform .6s ease;
  }

  /* Body dark class if used globally */
  :root.dark body { background: #0b0b0b; }

  /* Responsive tweaks */
  @media (max-width: 640px) {
    h1 { font-size: 30px !important; }
  }
`;
