import React, { useEffect, useMemo, useRef, useState } from 'react';
import TestimonialsCarousel from './components/TestimonialsCarousel.jsx';
import ContactModal from './components/ContactModal.jsx';

/* ========================
   Liens & fichiers (public/)
   ======================== */
const DEAL_DECK_PDF = '/TRK-DealDeck.pdf';
const HOMEPAGE_MOCKUP_IMG = '/assets/mockup-3d-home.webp';
const AVATAR_TAHA = '/assets/taha.jpg';
const QR_WHATSAPP = '/assets/whatsapp-qr.png';

// WhatsApp & Calendbook fournis
const WHATSAPP_FR = 'https://wa.me/33619642559';
const WHATSAPP_MA = 'https://wa.me/212722584276';
const CALENDBOOK =
  'https://www.calendbook.com/tahakerssane/rendezvousdécouverte15min';

/* ========================
   i18n local minimal
   ======================== */
const dict = {
  fr: {
    brand: 'TRK Impact Premium',
    tagline: 'Gestion locative clé en main pour propriétaires exigeants.',
    subTagline:
      'Nous optimisons vos revenus via Airbnb, Booking et Abritel.',
    ctaDeck: 'Télécharger le Deal Deck',
    ctaMeet: 'Prendre rendez-vous',
    ctaContact: 'Contact',
    partners: 'Nos plateformes partenaires',
    testimonialsTitle: 'Témoignages clients',
    bioTitle: 'À propos de Taha Kerssane',
    bio:
      "Expert en gestion locative et optimisation de rentabilité. J’accompagne les propriétaires à maximiser leurs revenus via Airbnb, Booking et Abritel, avec une gestion complète, transparente et premium.",
    langLabel: 'Langue',
    themeLight: 'Clair-or',
    themeDark: 'Noir-or',
    waMenu: 'WhatsApp',
    frShort: 'FR',
    maShort: 'MA',
    qrHint: 'Scannez ou cliquez pour m’écrire sur WhatsApp',
  },
  en: {
    brand: 'TRK Impact Premium',
    tagline: 'Turnkey rental management for demanding landlords.',
    subTagline: 'We optimize your income on Airbnb, Booking & Abritel.',
    ctaDeck: 'Download Deal Deck',
    ctaMeet: 'Book a call',
    ctaContact: 'Contact',
    partners: 'Partner platforms',
    testimonialsTitle: 'Client testimonials',
    bioTitle: 'About Taha Kerssane',
    bio:
      'Rental management & profitability expert. I help owners maximize income through Airbnb, Booking & Abritel with a transparent, premium service.',
    langLabel: 'Language',
    themeLight: 'Light-gold',
    themeDark: 'Dark-gold',
    waMenu: 'WhatsApp',
    frShort: 'FR',
    maShort: 'MA',
    qrHint: 'Scan or click to message me on WhatsApp',
  },
  ar: {
    brand: 'TRK Impact Premium',
    tagline: 'إدارة إيجار متكاملة لمالكين يبحثون عن الجودة.',
    subTagline: 'نُحسّن العوائد عبر Airbnb وBooking وAbritel.',
    ctaDeck: 'تحميل ملف العرض',
    ctaMeet: 'احجز مكالمة',
    ctaContact: 'اتصال',
    partners: 'منصات الشراكة',
    testimonialsTitle: 'آراء العملاء',
    bioTitle: 'نبذة عن طه كرسّان',
    bio:
      'خبير إدارة إيجار وتعظيم الأرباح. أساعد المالكين على زيادة العوائد عبر Airbnb وBooking وAbritel بخدمة فاخرة وشفافة.',
    langLabel: 'اللغة',
    themeLight: 'فاتح-ذهبي',
    themeDark: 'داكن-ذهبي',
    waMenu: 'واتساب',
    frShort: 'فر',
    maShort: 'مغ',
    qrHint: 'امسح أو اضغط للتواصل على واتساب',
  },
};

/* ========================
   Tracking unifié
   ======================== */
const track = {
  ga4(name, params = {}) {
    try {
      if (typeof window.gtag === 'function') window.gtag('event', name, params);
    } catch {}
  },
  fb(event, params = {}, { standard = false } = {}) {
    try {
      if (typeof window.fbq === 'function') {
        if (standard) window.fbq('track', event, params);
        else window.fbq('trackCustom', event, params);
      }
    } catch {}
  },
  both({ gaEvent, gaParams, fbEvent, fbParams, fbStandard = false }) {
    track.ga4(gaEvent, gaParams);
    track.fb(fbEvent, fbParams, { standard: fbStandard });
  },
};

/* ========================
   Utils
   ======================== */
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

/* ========================
   App
   ======================== */
export default function App() {
  const [lang, setLang] = useState(getInitialLang);
  const [theme, setTheme] = useState(getInitialTheme);
  const [contactOpen, setContactOpen] = useState(false); // 👈 NEW
  const isRtl = lang === 'ar';
  const t = useMemo(() => dict[lang] || dict.fr, [lang]);
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

  useEffect(() => {
    const onClick = (e) => {
      const bubble = document.getElementById('wa-bubble');
      if (bubble && !bubble.contains(e.target)) setWaOpen(false);
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);

  const onDownloadDeck = () => {
    track.both({
      gaEvent: 'file_download',
      gaParams: { file_name: 'TRK-DealDeck.pdf', file_extension: 'pdf', link_url: DEAL_DECK_PDF, lang, theme },
      fbEvent: 'ViewContent',
      fbParams: { content_name: 'DealDeck PDF', content_category: 'asset', lang, theme },
      fbStandard: true,
    });
    window.open(DEAL_DECK_PDF, '_blank', 'noopener,noreferrer');
  };

  return (
    <div
      className="min-h-screen"
      style={{
        background:
          theme === 'dark'
            ? 'linear-gradient(180deg,#0b0b0b 0%,#121212 100%)'
            : 'linear-gradient(180deg,#f7f6f3 0%,#ffffff 100%)',
        color: theme === 'dark' ? '#f5f5f5' : '#161616',
        transition: 'background .3s ease, color .3s ease',
      }}
    >
      {/* NAVBAR */}
      <header
        style={{
          position: 'sticky', top: 0, zIndex: 50, backdropFilter: 'blur(10px)',
          background: theme === 'dark' ? 'rgba(10,10,10,.65)' : 'rgba(255,255,255,.65)',
          borderBottom: theme === 'dark' ? '1px solid rgba(241,196,15,.15)' : '1px solid rgba(0,0,0,.06)',
        }}
      >
        <nav
          style={{
            maxWidth: 1180, margin: '0 auto', padding: '12px 16px',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            {/* logo carré décoratif (remplaçable par <img src="/assets/logo-trk.svg" .../> ) */}
            <div
              aria-hidden
              style={{
                width: 28, height: 28, borderRadius: 8,
                background: theme === 'dark'
                  ? 'linear-gradient(135deg,#111 0%,#3a3a3a 100%)'
                  : 'linear-gradient(135deg,#fff 0%,#f0efe8 100%)',
                border: '1px solid rgba(241,196,15,.6)',
                boxShadow: '0 4px 14px rgba(0,0,0,.15)',
              }}
            />
            <strong style={{ letterSpacing: '.3px' }}>{t.brand}</strong>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            {/* Sélecteur langue */}
            <select
              aria-label={t.langLabel}
              value={lang}
              onChange={(e) => setLang(e.target.value)}
              style={{
                padding: '6px 10px', borderRadius: 10,
                border: '1px solid rgba(241,196,15,.45)',
                background: 'transparent', color: 'inherit',
              }}
            >
              <option value="fr">🇫🇷 FR</option>
              <option value="en">🇬🇧 EN</option>
              <option value="ar">🇲🇦 AR</option>
            </select>

            {/* Thème clair-or / noir-or */}
            <button
              onClick={() => {
                const next = theme === 'dark' ? 'light' : 'dark';
                setTheme(next);
                track.both({
                  gaEvent: 'theme_change',
                  gaParams: { theme_before: theme, theme_after: next, lang },
                  fbEvent: 'theme_change',
                  fbParams: { theme_before: theme, theme_after: next, lang },
                });
              }}
              style={btnGhostStyle}
              aria-label={theme === 'dark' ? t.themeLight : t.themeDark}
              title={theme === 'dark' ? t.themeLight : t.themeDark}
            >
              {theme === 'dark' ? '☀️' : '🌙'}
            </button>

            {/* CTA principaux */}
            <button onClick={onDownloadDeck} style={btnPrimaryStyle}>
              {t.ctaDeck}
            </button>
            <a
              href={CALENDBOOK}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() =>
                track.both({
                  gaEvent: 'select_content',
                  gaParams: { content_type: 'calendbook_nav', lang },
                  fbEvent: 'Lead',
                  fbParams: { method: 'calendbook_nav', lang },
                  fbStandard: true,
                })
              }
              style={btnGhostStyle}
            >
              {t.ctaMeet}
            </a>
            {/* 👇 NEW bouton Contact (ouvre le modal) */}
            <button onClick={() => setContactOpen(true)} style={btnGhostStyle}>
              {t.ctaContact}
            </button>
          </div>
        </nav>
      </header>

      {/* CONTENU */}
      <main ref={animRootRef} style={{ maxWidth: 1180, margin: '0 auto', padding: '20px 16px 80px' }}>
        {/* HERO */}
        <section data-animate="fade" style={cardHeroStyle(theme)}>
          <div style={{ display: 'grid', gap: 12 }}>
            <h1 style={{ margin: 0, fontSize: 38, lineHeight: 1.15 }}>
              {t.tagline}
            </h1>
            <p style={{ margin: 0, opacity: 0.9, fontSize: 18 }}>{t.subTagline}</p>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              <button onClick={onDownloadDeck} style={btnPrimaryStyle}>
                {t.ctaDeck}
              </button>
              <a
                href={HOMEPAGE_MOCKUP_IMG}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() =>
                  track.both({
                    gaEvent: 'mockup_open',
                    gaParams: { lang },
                    fbEvent: 'mockup_open',
                    fbParams: { lang },
                  })
                }
                style={btnGhostStyle}
              >
                Aperçu
              </a>
            </div>
          </div>
        </section>

        {/* PARTENAIRES */}
        <section data-animate="fade" style={{ marginTop: 26 }}>
          <h2 style={h2Style}>{t.partners}</h2>
          <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
            <img src="/assets/icons/airbnb.svg" alt="Airbnb" width="48" height="48" />
            <img src="/assets/icons/booking.svg" alt="Booking" width="48" height="48" />
            <img src="/assets/icons/abritel.svg" alt="Abritel" width="48" height="48" />
          </div>
        </section>

        {/* TÉMOIGNAGES */}
        <section data-animate="fade" style={{ marginTop: 26 }}>
          <h2 style={h2Style}>{t.testimonialsTitle}</h2>
          {/* Le composant lit ses jeux FR/EN/AR et fonctionne en auto-défilement */}
          <TestimonialsCarousel lang={lang} />
        </section>

        {/* BIO */}
        <section data-animate="fade" style={{ marginTop: 26 }}>
          <h2 style={h2Style}>{t.bioTitle}</h2>
          <div style={bioCardStyle(theme)}>
            <img
              src={AVATAR_TAHA}
              alt="Taha Kerssane"
              width="70"
              height="70"
              style={{
                width: 70, height: 70, objectFit: 'cover', borderRadius: '50%',
                border: '1.5px solid rgba(241,196,15,.6)',
                boxShadow: '0 6px 20px rgba(0,0,0,.25)',
              }}
            />
            <div>
              <strong style={{ fontSize: 18, display: 'block' }}>Taha Kerssane</strong>
              <p style={{ margin: '6px 0 0 0', opacity: 0.92 }}>{t.bio}</p>
            </div>
          </div>
        </section>

        {/* QR WhatsApp proéminent */}
        <section style={{ marginTop: 26, textAlign: 'center' }}>
          <a
            href={WHATSAPP_FR}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() =>
              track.both({
                gaEvent: 'whatsapp_click',
                gaParams: { region: 'FR', lang, source: 'qr_section' },
                fbEvent: 'Contact',
                fbParams: { method: 'whatsapp', region: 'FR', lang },
                fbStandard: true,
              })
            }
            title={t.qrHint}
            style={{ display: 'inline-grid', placeItems: 'center', gap: 10, textDecoration: 'none', color: 'inherit' }}
          >
            <img
              src={QR_WHATSAPP}
              alt={t.qrHint}
              width="112"
              height="112"
              style={{
                width: 112, height: 112, borderRadius: 14,
                border: '1px solid rgba(241,196,15,.35)', padding: 10,
                background: theme === 'dark' ? '#0e0e0e' : '#ffffff',
                boxShadow: '0 10px 30px rgba(0,0,0,.18)',
              }}
            />
            <span style={{ opacity: .9 }}>{t.qrHint}</span>
          </a>

          <div style={{ marginTop: 12 }}>
            <a
              href={CALENDBOOK}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() =>
                track.both({
                  gaEvent: 'select_content',
                  gaParams: { content_type: 'calendbook_bottom', lang },
                  fbEvent: 'Lead',
                  fbParams: { method: 'calendbook_bottom', lang },
                  fbStandard: true,
                })
              }
              style={btnPrimaryStyle}
            >
              {t.ctaMeet}
            </a>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer
        style={{
          padding: '28px 16px',
          borderTop: theme === 'dark' ? '1px solid rgba(241,196,15,.18)' : '1px solid rgba(0,0,0,.08)',
          textAlign: 'center', fontSize: 14, opacity: 0.9,
        }}
      >
        © {new Date().getFullYear()} TRK Impact Premium — Tous droits réservés.
      </footer>

      {/* Bulle WhatsApp FR/MA */}
      <div id="wa-bubble" style={{ position: 'fixed', right: 18, bottom: 18, zIndex: 60 }}>
        <button
          onClick={() => setWaOpen((v) => !v)}
          aria-haspopup="menu"
          aria-expanded={waOpen}
          style={{
            width: 54, height: 54, borderRadius: '50%',
            border: '1px solid rgba(241,196,15,.6)',
            background: 'linear-gradient(135deg, rgba(20,20,20,1) 0%, rgba(44,44,44,1) 100%)',
            color: '#f1c40f', boxShadow: '0 10px 30px rgba(0,0,0,.35)', cursor: 'pointer',
            fontSize: 26, display: 'grid', placeItems: 'center',
          }}
          title={t.waMenu}
        >
          🟢
        </button>

        {waOpen && (
          <div
            role="menu"
            style={{
              marginTop: 8, borderRadius: 14, overflow: 'hidden',
              border: '1px solid rgba(241,196,15,.35)',
              boxShadow: '0 10px 30px rgba(0,0,0,.35)',
              background: 'linear-gradient(180deg, rgba(18,18,18,.95) 0%, rgba(10,10,10,.95) 100%)',
              minWidth: 180,
            }}
          >
            <a
              role="menuitem"
              href={WHATSAPP_FR}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => {
                track.both({
                  gaEvent: 'select_content',
                  gaParams: { content_type: 'whatsapp', content_id: 'whatsapp_fr', region: 'FR', lang, theme },
                  fbEvent: 'Contact',
                  fbParams: { method: 'whatsapp', region: 'FR', lang, theme },
                  fbStandard: true,
                });
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
                track.both({
                  gaEvent: 'select_content',
                  gaParams: { content_type: 'whatsapp', content_id: 'whatsapp_ma', region: 'MA', lang, theme },
                  fbEvent: 'Contact',
                  fbParams: { method: 'whatsapp', region: 'MA', lang, theme },
                  fbStandard: true,
                });
                setWaOpen(false);
              }}
              style={{ ...waItemStyle, borderTop: '1px solid rgba(241,196,15,.18)' }}
            >
              🇲🇦 {t.maShort}
            </a>
          </div>
        )}
      </div>

      {/* 👇 NEW : Modal de contact */}
      <ContactModal
        open={contactOpen}
        onClose={() => setContactOpen(false)}
        lang={lang}
        track={track}
        WA_FR={WHATSAPP_FR}
        CALENDBOOK={CALENDBOOK}
      />

      <style>{cssHelpers}</style>
    </div>
  );
}

/* ========================
   Styles
   ======================== */
const btnPrimaryStyle = {
  padding: '10px 14px',
  borderRadius: 12,
  border: '1px solid rgba(241,196,15,.6)',
  background: 'linear-gradient(135deg, rgba(28,28,28,1) 0%, rgba(50,50,50,1) 100%)',
  color: '#f1c40f', fontWeight: 700, boxShadow: '0 6px 16px rgba(0,0,0,.25)', cursor: 'pointer',
};
const btnGhostStyle = {
  padding: '10px 14px',
  borderRadius: 12,
  border: '1px solid rgba(241,196,15,.35)',
  background: 'transparent', color: '#f1c40f', fontWeight: 600, cursor: 'pointer',
};
const cardHeroStyle = (theme) => ({
  display: 'grid', alignItems: 'center', minHeight: 240, borderRadius: 18, padding: 24,
  background:
    theme === 'dark'
      ? 'linear-gradient(180deg, rgba(20,20,20,.92) 0%, rgba(10,10,10,.92) 100%)'
      : 'linear-gradient(180deg, rgba(255,255,255,.92) 0%, rgba(247,246,243,.92) 100%)',
  border: '1px solid rgba(241,196,15,.20)', boxShadow: '0 12px 40px rgba(0,0,0,.18)',
});
const h2Style = { margin: '0 0 12px 0', fontSize: 26 };
const bioCardStyle = (theme) => ({
  display: 'grid', gridTemplateColumns: '70px 1fr', gap: 14, alignItems: 'center',
  padding: 16, borderRadius: 14,
  border: '1px solid rgba(241,196,15,.18)',
  background:
    theme === 'dark'
      ? 'linear-gradient(180deg, rgba(22,22,22,.85) 0%, rgba(12,12,12,.85) 100%)'
      : 'linear-gradient(180deg, rgba(255,255,255,.85) 0%, rgba(247,246,243,.85) 100%)',
});
const waItemStyle = { display: 'flex', alignItems: 'center', gap: 8, color: '#f1c40f', textDecoration: 'none', padding: '12px 14px' };
const cssHelpers = `
  .fade-in-visible{opacity:1!important;transform:translateY(0)!important;}
  [data-animate="fade"]{opacity:0;transform:translateY(10px);transition:opacity .6s ease, transform .6s ease;}
  :root.dark body { background:#0b0b0b; }
  @media (max-width:640px){ h1{font-size:30px!important;} }
`;
