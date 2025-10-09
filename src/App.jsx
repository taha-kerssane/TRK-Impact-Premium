import React, { useEffect, useMemo, useState } from "react";
import TestimonialsCarousel from "./components/TestimonialsCarousel.jsx";
import ContactModal from "./components/ContactModal.jsx";
import "./index.css";

// === CONSTANTES ===
const WHATSAPP_FR = "https://wa.me/33619642559?text=Bonjour%20Taha%2C%20je%20souhaite%20échanger%20au%20sujet%20de%20la%20gestion%20locative.";
const CALENDBOOK = "https://www.calendbook.com/tahakerssane/rendezvousdécouverte15min";

// === DICTIONNAIRES MULTILINGUES ===
const dict = {
  fr: {
    heroTitle: "Gestion locative clé en main pour propriétaires exigeants.",
    heroSubtitle: "Nous optimisons vos revenus via Airbnb, Booking et Abritel.",
    btnDeck: "Télécharger le Deal Deck",
    btnMeet: "Prendre rendez-vous",
    btnContact: "Contact",
    partners: "Nos plateformes partenaires",
    testimonials: "Témoignages clients",
    aboutTitle: "À propos de Taha Kerssane",
    aboutText:
      "Expert en gestion locative et optimisation de rentabilité. J’accompagne les propriétaires à maximiser leurs revenus via Airbnb, Booking et Abritel, avec une gestion complète, transparente et premium.",
    qrLegend: "Scannez ou cliquez pour m’écrire sur WhatsApp",
    servicesTitle: "Nos services & garanties",
    services: [
      { title: "Gestion clé en main", desc: "Check-in/out, ménage, linge, messages 7j/7 et maintenance." },
      { title: "Optimisation revenu", desc: "Tarifs dynamiques, calendrier optimisé et multi-plateformes." },
      { title: "Qualité & image", desc: "Photos premium, annonces optimisées, e-réputation et réponses." },
      { title: "Transparence", desc: "Tableau de bord mensuel, suivi des revenus et interventions." },
    ],
    faqTitle: "Questions fréquentes",
    faq: [
      { q: "Est-ce compatible avec mon bail ?", a: "Oui, nous validons la conformité (bail, copropriété) et proposons un mandat de gestion courte durée adapté." },
      { q: "Quels frais et quel engagement ?", a: "Rémunération au résultat, sans engagement long. Résiliable avec un préavis court." },
      { q: "Puis-je bloquer des dates ?", a: "Oui, vous gardez la main pour bloquer des périodes pour usage personnel ou travaux." },
      { q: "Comment se passe la mise en route ?", a: "Audit, photos premium, rédaction d’annonce, synchronisation, puis lancement avec suivi hebdomadaire." },
    ],
    stickyCtaWhatsapp: "Écrire sur WhatsApp",
    stickyCtaCall: "Prendre RDV",
  },
  en: {
    heroTitle: "Turnkey rental management for demanding landlords.",
    heroSubtitle: "We optimize your revenue through Airbnb, Booking and Abritel.",
    btnDeck: "Download the Deal Deck",
    btnMeet: "Book a meeting",
    btnContact: "Contact",
    partners: "Partner platforms",
    testimonials: "Client testimonials",
    aboutTitle: "About Taha Kerssane",
    aboutText:
      "Expert in property management and profitability optimization. I help landlords maximize their returns through Airbnb, Booking, and Abritel with a complete, transparent, and premium service.",
    qrLegend: "Scan or click to message on WhatsApp",
    servicesTitle: "Our services & guarantees",
    services: [
      { title: "Full management", desc: "Check-in/out, cleaning, laundry, guest messages, and maintenance." },
      { title: "Revenue optimization", desc: "Dynamic pricing, calendar syncing, and multi-platform distribution." },
      { title: "Quality & branding", desc: "Premium photos, optimized listings, and review management." },
      { title: "Transparency", desc: "Monthly dashboard, revenue tracking, and full transparency." },
    ],
    faqTitle: "Frequently Asked Questions",
    faq: [
      { q: "Is it compatible with my lease?", a: "Yes, we ensure legal compliance and provide a suitable short-term management structure." },
      { q: "What are the fees and terms?", a: "Performance-based fees only. No long-term commitment, easy termination." },
      { q: "Can I block personal dates?", a: "Yes, you keep full control of your property calendar." },
      { q: "How does onboarding work?", a: "Audit, professional photos, listing setup, synchronization, and launch with ongoing support." },
    ],
    stickyCtaWhatsapp: "Message on WhatsApp",
    stickyCtaCall: "Book a Call",
  },
  ar: {
    heroTitle: "إدارة إيجار متكاملة للمالكين المميزين.",
    heroSubtitle: "نقوم بتحسين العائد عبر Airbnb وBooking وAbritel.",
    btnDeck: "تحميل عرض الشراكة",
    btnMeet: "احجز موعدًا",
    btnContact: "اتصال",
    partners: "منصات الشركاء",
    testimonials: "آراء العملاء",
    aboutTitle: "عن طه كيرسان",
    aboutText: "خبير في إدارة الإيجارات وتحسين العوائد. أساعد الملاك على زيادة أرباحهم من خلال Airbnb وBooking وAbritel بخدمة شاملة واحترافية.",
    qrLegend: "امسح أو اضغط للتواصل عبر واتساب",
    servicesTitle: "خدماتنا وضماناتنا",
    services: [
      { title: "إدارة متكاملة", desc: "تسجيل دخول وخروج، تنظيف، صيانة، تواصل مستمر مع الضيوف." },
      { title: "تحسين الإيرادات", desc: "أسعار ديناميكية وجدولة محسّنة وتوزيع عبر المنصات." },
      { title: "الجودة والصورة", desc: "صور احترافية وإعلانات محسّنة وإدارة السمعة." },
      { title: "الشفافية", desc: "لوحة تحكم شهرية ومتابعة الإيرادات وتقارير مفصلة." },
    ],
    faqTitle: "الأسئلة الشائعة",
    faq: [
      { q: "هل يتوافق مع عقد الإيجار؟", a: "نعم، نتحقق من الامتثال القانوني ونقترح تفويض إدارة مناسب." },
      { q: "ما هي الرسوم والالتزامات؟", a: "نسبة من الأرباح فقط، دون التزام طويل الأمد." },
      { q: "هل يمكنني حجز تواريخ معينة؟", a: "نعم، يمكنك إغلاق أيام معينة لاستخدامك الخاص." },
      { q: "كيف تبدأ الخدمة؟", a: "تقييم، تصوير احترافي، إنشاء إعلانات، تزامن المنصات، وإطلاق الخدمة." },
    ],
    stickyCtaWhatsapp: "تواصل عبر واتساب",
    stickyCtaCall: "احجز مكالمة",
  },
};

export default function App() {
  const [lang, setLang] = useState("fr");
  const [theme, setTheme] = useState("light");
  const [contactOpen, setContactOpen] = useState(false);
  const t = useMemo(() => dict[lang], [lang]);

  const toggleTheme = () => setTheme((p) => (p === "light" ? "dark" : "light"));
  const toggleLang = () => setLang((p) => (p === "fr" ? "en" : p === "en" ? "ar" : "fr"));

  useEffect(() => {
    document.body.dataset.theme = theme;
  }, [theme]);

  return (
    <div className={`app theme-${theme}`}>
      {/* NAVBAR */}
      <nav className="navbar">
        <img src="/assets/logo-trk.svg" alt="TRK Impact Premium logo" className="logo" />
        <div className="nav-btns">
          <button onClick={toggleLang}>{lang.toUpperCase()}</button>
          <button onClick={toggleTheme}>{theme === "light" ? "🌙" : "☀️"}</button>
          <a href="/TRK-DealDeck.pdf" download className="btn-primary">{t.btnDeck}</a>
          <a href={CALENDBOOK} target="_blank" rel="noopener noreferrer" className="btn-outline">{t.btnMeet}</a>
          <button onClick={() => setContactOpen(true)} className="btn-ghost">{t.btnContact}</button>
        </div>
      </nav>

      {/* HERO */}
      <header className="hero">
        <h1>{t.heroTitle}</h1>
        <p>{t.heroSubtitle}</p>
        <div className="cta">
          <a href="/TRK-DealDeck.pdf" className="btn-primary">{t.btnDeck}</a>
          <a href={CALENDBOOK} target="_blank" className="btn-outline">{t.btnMeet}</a>
        </div>
      </header>

      {/* PARTENAIRES */}
      <section className="partners">
        <h2>{t.partners}</h2>
        <div className="icons">
          <img src="/assets/icons/airbnb.svg" alt="Airbnb" width="38" height="38" />
          <img src="/assets/icons/booking.svg" alt="Booking" width="38" height="38" />
          <img src="/assets/icons/abritel.svg" alt="Abritel" width="38" height="38" />
        </div>
      </section>

      {/* SERVICES */}
      <section className="services">
        <h2>{t.servicesTitle}</h2>
        <div className="grid-services">
          {t.services.map((s, i) => (
            <div key={i} className="service-card">
              <strong>{s.title}</strong>
              <p>{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* TÉMOIGNAGES */}
      <section className="testimonials">
        <h2>{t.testimonials}</h2>
        <TestimonialsCarousel lang={lang} />
      </section>

      {/* À PROPOS */}
      <section className="about">
        <h2>{t.aboutTitle}</h2>
        <img src="/assets/taha.jpg" alt="Taha Kerssane" className="avatar" width="90" height="90" loading="lazy" />
        <p>{t.aboutText}</p>

        <a href={WHATSAPP_FR} target="_blank" rel="noopener noreferrer" className="qr-link">
          <img src="/assets/whatsapp-qr.png" alt="QR WhatsApp" width="110" height="110" loading="lazy" decoding="async" />
        </a>
        <p>{t.qrLegend}</p>
        <a href={CALENDBOOK} className="btn-primary">{t.btnMeet}</a>
      </section>

      {/* FAQ */}
      <section className="faq">
        <h2>{t.faqTitle}</h2>
        <div className="faq-grid">
          {t.faq.map((item, i) => (
            <details key={i}>
              <summary>{item.q}</summary>
              <p>{item.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* STICKY MOBILE BAR */}
      <div className="sticky-mobile">
        <a href={WHATSAPP_FR} target="_blank" className="btn-primary">{t.stickyCtaWhatsapp}</a>
        <a href={CALENDBOOK} target="_blank" className="btn-outline">{t.stickyCtaCall}</a>
      </div>

      {/* CONTACT MODAL */}
      <ContactModal
        open={contactOpen}
        onClose={() => setContactOpen(false)}
        lang={lang}
        WA_FR={WHATSAPP_FR}
        CALENDBOOK={CALENDBOOK}
      />

      <footer>
        <p>© 2025 TRK Impact Premium — Tous droits réservés.</p>
      </footer>
    </div>
  );
}
