import React, { useState, useEffect } from 'react';
import TestimonialsCarousel from './components/TestimonialsCarousel.jsx';
import Footer from './components/Footer';
import Bio from './components/Bio';
import './styles.css';
import i18n from './i18n';

function App() {
  const [theme, setTheme] = useState('dark');
  const [lang, setLang] = useState('fr');

  const t = i18n[lang];

  useEffect(() => {
    document.documentElement.className = theme;
  }, [theme]);

  return (
    <div className="font-poppins min-h-screen transition-colors duration-500 bg-black text-white dark:bg-white dark:text-black">
      
      {/* Header */}
      <header className="flex justify-between items-center px-6 py-4 border-b border-zinc-700 dark:border-zinc-300">
        <img src="/actifs/logo.png" alt="Logo TRK" className="h-10" />
        
        <div className="flex items-center gap-4">
          {/* Lang switch */}
          <select value={lang} onChange={e => setLang(e.target.value)} className="bg-transparent border px-2 py-1 rounded text-sm">
            <option value="fr">🇫🇷</option>
            <option value="en">🇬🇧</option>
            <option value="ar">🇲🇦</option>
          </select>

          {/* Theme toggle */}
          <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} className="hover:scale-110 transition">
            {theme === 'dark' ? '🌙' : '☀️'}
          </button>
        </div>
      </header>

      {/* Hero */}
      <section className="text-center px-6 py-24 bg-gradient-to-b from-black via-zinc-900 to-black dark:from-white dark:via-zinc-200 dark:to-white fade-in">
        <h1 className="text-4xl md:text-6xl font-bold text-gold mb-4">{t.hero.title}</h1>
        <p className="max-w-2xl mx-auto text-lg mb-8">{t.hero.subtitle}</p>
        <a
          href="/actifs/TRK-DealDeck.pdf"
          onClick={() => gtag('event', 'Téléchargement', { event_category: 'PDF', event_label: 'Deal Deck TRK' })}
          className="inline-block bg-gold text-black px-6 py-3 rounded-full font-semibold hover:scale-105 transition"
        >
          {t.hero.button}
        </a>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-16 px-6 fade-in">
        <h2 className="text-3xl font-bold text-gold text-center mb-10">{t.testimonials.title}</h2>
        <TestimonialsCarousel lang={lang} />
      </section>

      {/* Bio */}
      <section id="bio" className="py-16 px-6 max-w-4xl mx-auto text-center fade-in">
        <Bio lang={lang} />
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-zinc-900 dark:bg-zinc-100 py-8 px-6 fade-in">
        <Footer lang={lang} />
      </footer>

      {/* WhatsApp bubble */}
      <a
        href="https://wa.me/212612345678"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 bg-gold text-black p-4 rounded-full shadow-lg hover:scale-110 transition z-50"
      >
        💬
      </a>

      {/* Scroll-to-top button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-6 left-6 bg-zinc-800 dark:bg-zinc-300 text-white dark:text-black p-3 rounded-full hover:scale-110 transition z-50"
        aria-label="Revenir en haut"
      >
        ⬆️
      </button>
    </div>
  );
}

export default App;
