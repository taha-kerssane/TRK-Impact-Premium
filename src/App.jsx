import React from 'react';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';
import Bio from './components/Bio';
import './App.css';

function App() {
  return (
    <div className="app font-poppins bg-black text-white">
      {/* Header */}
      <header className="flex items-center justify-between px-6 py-4 shadow-md">
        <img src="/actifs/logo.png" alt="Logo TRK" className="h-12" />
        <nav>
          <ul className="flex gap-6 font-semibold text-sm">
            <li><a href="#bio" className="hover:text-gold">À propos</a></li>
            <li><a href="#testimonials" className="hover:text-gold">Témoignages</a></li>
            <li><a href="#contact" className="hover:text-gold">Contact</a></li>
          </ul>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="text-center px-6 py-20 bg-gradient-to-b from-black via-zinc-900 to-black">
        <h1 className="text-4xl md:text-6xl font-bold text-gold mb-6">
          TRK Impact Premium
        </h1>
        <p className="max-w-2xl mx-auto text-lg text-zinc-300 mb-8">
          Accompagnement haut de gamme pour entrepreneurs, investisseurs et leaders de demain.
        </p>
        <a href="/actifs/TRK-DealDeck.pdf" onClick={() => gtag('event', 'Téléchargement', { event_category: 'PDF', event_label: 'Deal Deck TRK' })} className="inline-block bg-gold text-black px-6 py-3 rounded-full font-semibold hover:scale-105 transition">
          📥 Télécharger le Deal Deck
        </a>
      </section>

      {/* Témoignages */}
      <section id="testimonials" className="bg-zinc-950 py-16 px-6">
        <Testimonials />
      </section>

      {/* Bio Taha */}
      <section id="bio" className="py-16 px-6 max-w-4xl mx-auto text-center">
        <Bio />
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-zinc-900 py-8 px-6">
        <Footer />
      </footer>

      {/* WhatsApp Bubble */}
      <a href="https://wa.me/212612345678" target="_blank" rel="noopener noreferrer" className="fixed bottom-6 right-6 bg-gold text-black p-4 rounded-full shadow-lg hover:scale-105 transition z-50">
        💬
      </a>
    </div>
  );
}

export default App;
