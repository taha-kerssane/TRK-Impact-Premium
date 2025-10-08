import React from "react";

// Petit composant Avatar avec fallback externe si le fichier local manque
const Avatar = ({ src, fallback, alt }) => (
  <img
    src={src}
    onError={(e) => { if (e.currentTarget.src !== fallback) e.currentTarget.src = fallback; }}
    alt={alt}
    className="w-14 h-14 rounded-full object-cover ring-2 ring-black/5 shadow-sm"
    loading="lazy"
    decoding="async"
  />
);

const App = () => {
  return (
    <main className="bg-gray-50 text-gray-900 font-sans">

      {/* SECTION HERO */}
      <section className="relative min-h-screen flex flex-col justify-center items-center text-center px-6 md:px-20">
        <img
          src="/actifs/taha.jpg"
          alt="Taha Kerssane — TRK Impact"
          className="absolute inset-0 w-full h-full object-cover opacity-25 -z-10"
        />
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
          TRK Impact — Gestion Locative Premium à Tanger
        </h1>
        <p className="max-w-2xl mx-auto text-lg text-gray-700 mb-8">
          Confiez votre bien à une conciergerie haut de gamme. Loyer fixe garanti,
          exploitation courte durée optimisée, service clé-en-main 5★.
        </p>

        {/* Boutons d'action */}
        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <a
            href="https://www.calendbook.com/tahakerssane/rendezvousdécouverte15min"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition font-medium"
          >
            📅 Prendre rendez-vous
          </a>

          <a
            href="#contact"
            className="border border-black px-6 py-3 rounded-lg hover:bg-black hover:text-white transition font-medium"
          >
            ✉️ Nous contacter
          </a>
        </div>

        {/* QR WhatsApp */}
        <div className="mt-8 flex flex-col items-center">
          <img
            src="/actifs/whatsapp-qr.png"
            alt="QR WhatsApp Taha"
            className="w-[120px] h-[120px] rounded-xl border shadow-md"
          />
          <p className="mt-2 text-sm text-gray-600">
            Scannez pour échanger directement avec Taha
          </p>
        </div>
      </section>

      {/* SECTION BIO / CONFIANCE */}
      <section className="px-6 md:px-20 py-16 bg-white">
        <h2 className="text-2xl font-bold mb-6 text-center">Qui est Taha Kerssane ?</h2>
        <p className="max-w-3xl mx-auto text-center text-gray-700 leading-relaxed">
          Entrepreneur passionné et expert en valorisation immobilière,
          <strong> Taha Kerssane </strong> a fondé TRK Impact avec une conviction claire :
          la confiance et la transparence sont les piliers d’une gestion réussie.
          Après plusieurs années dans le domaine du développement commercial et de la relation client,
          il s’est spécialisé dans la gestion locative premium à Tanger.
          <br /><br />
          Son approche humaine, combinée à une rigueur de gestion et une sensibilité aux détails,
          séduit de plus en plus de propriétaires cherchant à sécuriser leur patrimoine tout en
          maximisant leur rentabilité. Son objectif : que chaque propriétaire puisse dormir tranquille,
          en sachant que son bien est entre de bonnes mains.
        </p>
      </section>

      {/* SECTION TÉMOIGNAGES CLIENTS */}
      <section className="px-6 md:px-20 py-16 bg-gray-50 border-t border-gray-200">
        <h2 className="text-2xl font-bold mb-8 text-center">
          Ce que disent nos propriétaires partenaires
        </h2>

        <div className="grid md:grid-cols-3 gap-8 text-gray-700">
          {/* Témoignage 1 */}
          <div className="border rounded-2xl p-6 shadow-sm hover:shadow-md transition bg-white">
            <div className="flex items-center gap-3 mb-4">
              <Avatar
                src="/actifs/avatars/karim.jpg"
                fallback="https://images.unsplash.com/photo-1601412436009-d964bd02edbc?q=80&w=600&auto=format&fit=crop"
                alt="Karim B."
              />
              <div>
                <div className="font-semibold">Karim B.</div>
                <div className="text-xs text-gray-500">Investisseur à distance • 🇫🇷</div>
              </div>
            </div>
            <div className="flex items-center gap-2 text-amber-500 text-sm mb-3" aria-label="5 étoiles">
              <span>★★★★★</span>
              <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">Propriétaire vérifié</span>
            </div>
            <p className="italic">
              “J’habite à Paris et je ne pouvais plus gérer mon appartement à distance.
              Taha s’est occupé de tout avec un professionnalisme rare. Chaque mois, je reçois
              mes loyers sans stress. J’ai redécouvert le plaisir d’investir sans les contraintes.”
            </p>
          </div>

          {/* Témoignage 2 */}
          <div className="border rounded-2xl p-6 shadow-sm hover:shadow-md transition bg-white">
            <div className="flex items-center gap-3 mb-4">
              <Avatar
                src="/actifs/avatars/nadia.jpg"
                fallback="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=600&auto=format&fit=crop"
                alt="Nadia E."
              />
              <div>
                <div className="font-semibold">Nadia E.</div>
                <div className="text-xs text-gray-500">Propriétaire expatriée • 🇦🇪</div>
              </div>
            </div>
            <div className="flex items-center gap-2 text-amber-500 text-sm mb-3" aria-label="5 étoiles">
              <span>★★★★★</span>
              <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">Propriétaire vérifié</span>
            </div>
            <p className="italic">
              “Je vis à Dubaï et je voulais louer mon bien à Tanger sans perdre le contrôle.
              TRK Impact m’informe à chaque étape, l’appartement est mieux entretenu qu’avant
              et les chiffres sont stables. Sérieux, bienveillance et transparence.”
            </p>
          </div>

          {/* Témoignage 3 */}
          <div className="border rounded-2xl p-6 shadow-sm hover:shadow-md transition bg-white">
            <div className="flex items-center gap-3 mb-4">
              <Avatar
                src="/actifs/avatars/sofia-mehdi.jpg"
                fallback="https://images.unsplash.com/photo-1544005314-6a9f6ce23bd9?q=80&w=600&auto=format&fit=crop"
                alt="Sofia & Mehdi R."
              />
              <div>
                <div className="font-semibold">Sofia &amp; Mehdi R.</div>
                <div className="text-xs text-gray-500">Résidence secondaire • 🇲🇦</div>
              </div>
            </div>
            <div className="flex items-center gap-2 text-amber-500 text-sm mb-3" aria-label="5 étoiles">
              <span>★★★★★</span>
              <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">Propriétaires vérifiés</span>
            </div>
            <p className="italic">
              “Nous cherchions une conciergerie haut de gamme. Taha nous a convaincus par sa
              transparence et son sens du détail. Notre villa génère des revenus constants,
              tout en restant impeccable. On sent un vrai engagement.”
            </p>
          </div>
        </div>
      </section>

      {/* SECTION PDF */}
      <section className="px-6 md:px-20 py-16 text-center">
        <h2 className="text-2xl font-bold mb-6">Découvrez notre Deal Deck</h2>
        <p className="text-gray-700 mb-6">
          Téléchargez notre présentation complète pour découvrir le modèle TRK Impact et nos résultats.
        </p>

        <a
          id="dealDeckBtn"
          className="btn btn-primary bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition font-medium"
          href="/actifs/DealDeck-TRK-Impact.pdf?v=2"
          download="DealDeck-TRK-Impact.pdf"
          rel="noopener"
          onClick={() => {
            try { gtag('event','deal_deck_download') } catch(e) {}
            try { fbq('trackCustom','DealDeckDownload') } catch(e) {}
          }}
        >
          📄 Télécharger le Deal Deck (PDF)
        </a>
      </section>

      {/* SECTION CONTACT */}
      <footer id="contact" className="bg-black text-white py-12 text-center">
        <h3 className="text-xl font-semibold mb-2">TRK Impact — Tanger</h3>
        <p className="text-gray-400 mb-4">Conciergerie haut de gamme & gestion locative clé-en-main</p>
        <p className="text-gray-400 text-sm">
          © {new Date().getFullYear()} TRK Impact. Tous droits réservés.
        </p>
      </footer>
    </main>
  );
};

export default App;
