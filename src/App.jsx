import React, { useEffect, useMemo, useRef, useState } from 'react';
import TestimonialsCarousel from './components/TestimonialsCarousel.jsx';

/* ========================
   Liens réels (validés)
   ======================== */
const DEAL_DECK_PDF = '/TRK-DealDeck.pdf';
const HOMEPAGE_MOCKUP_IMG = '/assets/mockup-3d-home.webp';
const WHATSAPP_FR = 'https://wa.me/33619642559';
const WHATSAPP_MA = 'https://wa.me/212722584276';
const CALENDBOOK = 'https://www.calendbook.com/tahakerssane/rendezvousdécouverte15min';
const QR_IMG = '/assets/whatsapp-qr.png';
const AVATAR_ME = '/assets/taha.jpg';

/* ========================
   i18n
   ======================== */
const dict = {
  fr: {
    brand: 'TRK Impact Premium',
    tagline: 'Gestion locative clé en main pour propriétaires exigeants.',
    subTagline: 'Nous optimisons vos revenus via Airbnb, Booking et Abritel.',
    ctaDeck: 'Télécharger le Deal Deck',
    ctaCall: 'Prendre rendez-vous',
    partnersTitle: 'Nos plateformes partenaires',
    testimonialsTitle: 'Témoignages clients',
    servicesTitle: 'Nos services premium',
    services: [
      {
        title: 'Audit & estimation',
        desc: 'Étude gratuite du potentiel, positionnement intelligent et calcul de rentabilité.',
      },
      {
        title: 'Création d’annonce',
        desc: 'Shooting photo pro, textes optimisés, tarification dynamique et SEO plateformes.',
      },
      {
        title: 'Exploitation clé en main',
        desc: 'Check-in/out automatisés, ménage et maintenance, message 7j/7.',
      },
      {
        title: 'Reporting transparent',
        desc: 'Tableau de bord clair, suivi mensuel, optimisation continue des performances.',
      },
    ],
    aboutTitle: 'À propos de Taha Kerssane',
    about: `Entrepreneur franco-marocain, j’aide les propriétaires à transformer leurs biens en véritables marques d’hospitalité : rentables, fluides et sans contraintes. Mon approche marie exigence esthétique, process opérationnels et pilotage par la donnée pour maximiser l’occupation et les revenus, en toute transparence.`,
    aboutUSP: 'Différenciation : image premium + process + data-driven = performance durable.',
    finalCtaTitle: 'Prêt à booster vos revenus locatifs ?',
    finalCtaSubtitle: '15 minutes d’échange pour évaluer votre potentiel et vos objectifs.',
    finalCtaBtn: 'Planifier mon appel découverte gratuit',
    langLabel: 'Langue',
    themeLight: 'Clair',
    themeDark: 'Sombre',
    waBubble: 'WhatsApp',
    qrHint: 'Scanner pour me parler sur WhatsApp (FR) – ou',
    qrAlt: 'QR WhatsApp',
    linkMA: 'WhatsApp Maroc',
  },
  en: {
    brand: 'TRK Impact Premium',
    tagline: 'Turnkey rental management for demanding property owners.',
    subTagline: 'We optimize revenue through Airbnb, Booking and Abritel.',
    ctaDeck: 'Download Deal Deck',
    ctaCall: 'Book a call',
    partnersTitle: 'Partner platforms',
    testimonialsTitle: 'Client testimonials',
    servicesTitle: 'Premium services',
    services: [
      {
        title: 'Audit & forecast',
        desc: 'Free potential review, smart positioning and profitability forecast.',
      },
      {
        title: 'Listing creation',
        desc: 'Pro photo shoot, conversion copy, dynamic pricing and platform SEO.',
      },
      {
        title: 'Full operations',
        desc: 'Automated check-in/out, cleaning & maintenance, 7/7 guest support.',
      },
      {
        title: 'Transparent reporting',
        desc: 'Clean dashboard, monthly review and continuous optimization.',
      },
    ],
    aboutTitle: 'About Taha Kerssane',
    about:
      'Franco-Moroccan entrepreneur helping owners turn properties into hospitality brands: profitable, smooth and hassle-free. I combine premium branding, rigorous operations and data-driven decisions for durable performance.',
    aboutUSP: 'Differentiator: brand + process + data for long-term results.',
    finalCtaTitle: 'Ready to grow your rental revenue?',
    finalCtaSubtitle: '15-minute call to assess your potential and goals.',
    finalCtaBtn: 'Schedule my free discovery call',
    langLabel: 'Language',
    themeLight: 'Light',
    themeDark: 'Dark',
    waBubble: 'WhatsApp',
    qrHint: 'Scan to chat on WhatsApp (FR) — or',
    qrAlt: 'WhatsApp QR',
    linkMA: 'WhatsApp Morocco',
  },
  ar: {
    brand: 'TRK Impact Premium',
    tagline: 'إدارة إيجارية شاملة للمالكين المميزين.',
    subTagline: 'نزيد عوائدكم عبر Airbnb و Booking و Abritel.',
    ctaDeck: 'تحميل ملف العرض',
    ctaCall: 'احجز مكالمة',
    partnersTitle: 'منصّات شراكاتنا',
    testimonialsTitle: 'آراء العملاء',
    servicesTitle: 'خدماتنا الفاخرة',
    services: [
      { title: 'تقييم وعائدية', desc: 'مراجعة مجانية للإمكانيات وحساب العائد وتحديد التموقع.' },
      { title: 'إنشاء الإعلان', desc: 'تصوير احترافي ونصوص تحويلية وتسعير ديناميكي وتحسين محركات البحث.' },
      { title: 'تشغيل كامل', desc: 'تسجيل دخول/خروج آلي، تنظيف وصيانة، دعم 7/7.' },
      { title: 'تقارير شفافة', desc: 'لوحة بيانات واضحة ومراجعة شهرية وتحسين مستمر.' },
    ],
    aboutTitle: 'نبذة عن طه كرسّان',
    about:
      'رائد أعمال فرنسي-مغربي يساعد الملاك على تحويل ممتلكاتهم إلى علامات ضيافة مربحة وسلسة. أدمج هوية فاخرة مع عمليات دقيقة وقرارات مبنية على البيانات لتحقيق أداء مستدام.',
    aboutUSP: 'تميّزنا: هوية فاخرة + عمليات + بيانات = أداء مستمر.',
    finalCtaTitle: 'جاهز لرفع عوائد الإيجار؟',
    finalCtaSubtitle: 'مكالمة 15 دقيقة لتقييم إمكاناتك وأهدافك.',
    finalCtaBtn: 'احجز مكالمتي الاستكشافية مجانًا',
    langLabel: 'اللغة',
    themeLight: 'فاتح',
    themeDark: 'داكن',
    waBubble: 'واتساب',
    qrHint: 'امسح للتواصل على واتساب (فرنسا) — أو',
    qrAlt: 'رمز واتساب',
    linkMA: 'واتساب المغرب',
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
  return window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
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

  const goCalendbook = () => {
    track.both({
      gaEvent: 'select_content',
      gaParams: { content_type: 'calendbook', link_url: CALENDBOOK, lang, theme },
      fbEvent: 'Lead',
      fbParams: { method: 'calendbook', lang, theme },
      fbStandard: true,
    });
    window.open(CALENDBOOK, '_blank', 'noopener,noreferrer');
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
          background: theme === 'dark' ? 'rgba(10,10,10,.6)' : 'rgba(255,255,255,.6)',
          borderBottom: theme === 'dark' ? '1px solid rgba(241,196,15,.15)' : '1px solid rgba(0,0,0,.06)',
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
                width: 28, height: 28, borderRadius: 8,
                background: 'linear-gradient(135deg,#111 0%,#3a3a3a 100%)',
                border: '1px solid rgba(241,196,15,.6)',
                boxShadow: '0 4px 14px rgba(0,0,0,.25)',
              }}
            />
            <strong style={{ letterSpacing: '.3px' }}>{t.brand}</strong>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
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

            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              style={btnGhostStyle}
              aria-label={theme === 'dark' ? t.themeLight : t.themeDark}
              title={theme === 'dark' ? t.themeLight : t.themeDark}
            >
              {theme === 'dark' ? '☀️' : '🌙'}
            </button>

            <button onClick={onDownloadDeck} style={btnPrimaryStyle}>
              {t.ctaDeck}
            </button>
          </div>
        </nav>
      </header>

      {/* CONTENU */}
      <main ref={animRootRef} style={{ maxWidth: 1180, margin: '0 auto', padding: '20px 16px 80px' }}>
        {/* HERO */}
        <section data-animate="fade" style={cardHeroStyle}>
          <div style={{ display: 'grid', gap: 12 }}>
            <h1 style={{ margin: 0, fontSize: 38, lineHeight: 1.15 }}>{t.tagline}</h1>
            <p style={{ margin: 0, opacity: 0.9, fontSize: 18 }}>{t.subTagline}</p>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              <button onClick={onDownloadDeck} style={btnPrimaryStyle}>{t.ctaDeck}</button>
              <button onClick={goCalendbook} style={btnGhostStyle}>{t.ctaCall}</button>
            </div>
          </div>
        </section>

        {/* PARTNERS */}
        <section data-animate="fade" style={sectionStyle}>
          <h2 style={h2Style}>{t.partnersTitle}</h2>
          <div style={partnersRowStyle}>
            {['/assets/icons/airbnb.svg', '/assets/icons/booking.svg', '/assets/icons/abritel.svg'].map((src) => (
              <img key={src} src={src} alt="" style={partnerIconStyle} />
            ))}
          </div>
        </section>

        {/* SERVICES */}
        <section data-animate="fade" style={sectionStyle}>
          <h2 style={h2Style}>{t.servicesTitle}</h2>
          <div style={servicesGridStyle}>
            {t.services.map((s, i) => (
              <div key={i} style={serviceCardStyle}>
                <div style={{ fontSize: 22, marginBottom: 6 }}>
                  {['📊', '📸', '⚙️', '📈'][i]}
                </div>
                <strong style={{ display: 'block', marginBottom: 6 }}>{s.title}</strong>
                <p style={{ margin: 0, opacity: 0.9 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* TESTIMONIALS */}
        <section data-animate="fade" style={sectionStyle}>
          <h2 style={h2Style}>{t.testimonialsTitle}</h2>
          <TestimonialsCarousel lang={lang} />
        </section>

        {/* ABOUT / STORYTELLING */}
        <section data-animate="fade" style={sectionStyle}>
          <h2 style={h2Style}>{t.aboutTitle}</h2>
          <div style={aboutWrapStyle}>
            <img
              src={AVATAR_ME}
              alt="Taha Kerssane"
              width="80" height="80"
              style={{
                width: 80, height: 80, borderRadius: '50%',
                border: '1.5px solid rgba(241,196,15,.6)',
                boxShadow: '0 6px 20px rgba(0,0,0,.35)',
                objectFit: 'cover',
              }}
            />
            <div>
              <p style={{ margin: '0 0 6px 0', opacity: 0.95 }}>{t.about}</p>
              <em style={{ opacity: 0.9 }}>{t.aboutUSP}</em>
            </div>
          </div>
        </section>

        {/* CTA FINAL + QR BOOSTÉ */}
        <section data-animate="fade" style={{ ...sectionStyle, textAlign: 'center' }}>
          <h2 style={h2Style}>{t.finalCtaTitle}</h2>
          <p style={{ marginTop: -6, marginBottom: 16, opacity: 0.9 }}>{t.finalCtaSubtitle}</p>

          {/* QR agrandi et cliquable */}
          <div style={{ display: 'grid', placeItems: 'center', gap: 10, marginBottom: 14 }}>
            <a
              href={WHATSAPP_FR}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() =>
                track.both({
                  gaEvent: 'whatsapp_qr_click',
                  gaParams: { region: 'FR', lang, theme },
                  fbEvent: 'Contact',
                  fbParams: { method: 'whatsapp_qr', region: 'FR', lang, theme },
                  fbStandard: true,
                })
              }
              title="WhatsApp France"
            >
              <img
                src={QR_IMG}
                alt={t.qrAlt}
                width="160"
                height="160"
                style={{
                  width: 160, height: 160,
                  borderRadius: 16,
                  border: '1.5px solid rgba(241,196,15,.45)',
                  boxShadow: '0 14px 40px rgba(0,0,0,.35)',
                  background: theme === 'dark' ? '#0e0e0e' : '#fff',
                  padding: 8,
                  cursor: 'pointer',
                }}
              />
            </a>
            <small style={{ opacity: 0.9 }}>
              {t.qrHint}{' '}
              <a href={WHATSAPP_MA} target="_blank" rel="noopener noreferrer" style={{ color: '#f1c40f' }}>
                {t.linkMA}
              </a>
            </small>
          </div>

          <button onClick={goCalendbook} style={btnPrimaryStyle}>
            {t.finalCtaBtn}
          </button>
        </section>
      </main>

      {/* FOOTER */}
      <footer
        style={{
          padding: '28px 16px',
          borderTop: theme === 'dark' ? '1px solid rgba(241,196,15,.18)' : '1px solid rgba(0,0,0,.08)',
          textAlign: 'center',
          fontSize: 14,
          opacity: 0.9,
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
          title={t.waBubble}
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
              minWidth: 190,
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
              🇫🇷 WhatsApp FR
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
              🇲🇦 WhatsApp MA
            </a>
          </div>
        )}
      </div>

      <style>{cssHelpers}</style>
    </div>
  );
}

/* ========================
   Styles inline
   ======================== */
const btnPrimaryStyle = {
  padding: '11px 16px',
  borderRadius: 12,
  border: '1px solid rgba(241,196,15,.6)',
  background: 'linear-gradient(135deg, rgba(28,28,28,1) 0%, rgba(50,50,50,1) 100%)',
  color: '#f1c40f', fontWeight: 700, boxShadow: '0 6px 16px rgba(0,0,0,.35)', cursor: 'pointer',
};
const btnGhostStyle = {
  padding: '11px 16px',
  borderRadius: 12,
  border: '1px solid rgba(241,196,15,.35)',
  background: 'transparent', color: '#f1c40f', fontWeight: 600, cursor: 'pointer',
};
const cardHeroStyle = {
  display: 'grid', alignItems: 'center', minHeight: 240, borderRadius: 18, padding: 24,
  background: 'linear-gradient(180deg, rgba(20,20,20,.92) 0%, rgba(10,10,10,.92) 100%)',
  border: '1px solid rgba(241,196,15,.20)', boxShadow: '0 12px 40px rgba(0,0,0,.35)',
};
const sectionStyle = { marginTop: 32 };
const h2Style = { margin: '0 0 14px 0', fontSize: 26 };
const partnersRowStyle = { display: 'flex', gap: 18, alignItems: 'center', justifyContent: 'center' };
const partnerIconStyle = {
  width: 46, height: 46, padding: 8, borderRadius: 12,
  border: '1px solid rgba(241,196,15,.25)',
  background: 'linear-gradient(180deg, rgba(22,22,22,.9) 0%, rgba(12,12,12,.9) 100%)',
  boxShadow: '0 8px 24px rgba(0,0,0,.35)',
};
const servicesGridStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))',
  gap: 14,
};
const serviceCardStyle = {
  padding: 16, borderRadius: 14,
  border: '1px solid rgba(241,196,15,.18)',
  background: 'linear-gradient(180deg, rgba(22,22,22,.85) 0%, rgba(12,12,12,.85) 100%)',
  boxShadow: '0 10px 30px rgba(0,0,0,.3)',
};
const aboutWrapStyle = {
  display: 'grid', gridTemplateColumns: '90px 1fr', gap: 16, alignItems: 'start',
  padding: 16, borderRadius: 14,
  border: '1px solid rgba(241,196,15,.18)',
  background: 'linear-gradient(180deg, rgba(22,22,22,.85) 0%, rgba(12,12,12,.85) 100%)',
};
const waItemStyle = {
  display: 'flex', alignItems: 'center', gap: 8, color: '#f1c40f',
  textDecoration: 'none', padding: '12px 14px',
};
const cssHelpers = `
  .fade-in-visible{opacity:1!important;transform:translateY(0)!important;}
  [data-animate="fade"]{opacity:0;transform:translateY(10px);transition:opacity .6s ease, transform .6s ease;}
  :root.dark body { background:#0b0b0b; }
  @media (max-width:640px){
    h1{font-size:30px!important;}
  }
`;
