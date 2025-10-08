import React from "react";

const App = () => {
  // Lien CalendBook — Taha Kerssane (15 min)
  const calendbookUrl =
    "https://www.calendbook.com/tahakerssane/rendezvousd%C3%A9couverte15min";

  const handleCalendbook = () => {
    try {
      gtag("event", "calendbook_open");
      fbq("trackCustom", "CalendBookOpen");
    } catch (e) {}
    window.open(calendbookUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <main className="min-h-screen bg-[#fafafa] text-slate-900">
      {/* --- HERO --- */}
      <section className="flex flex-col md:flex-row items-center justify-center px-6 py-16 gap-10">
        <div className="max-w-xl">
          <h1 className="text-3xl font-extrabold leading-tight">
            Agence immobilière <br /> haut de gamme à Tanger
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            Loyer fixe garanti, exploitation courte durée optimisée, conciergerie
            clé-en-main. Une gestion premium, sans aucun effort pour vous.
          </p>

          <div className="mt-6 flex gap-4">
            <button
              className="btn btn-primary px-5 py-2 bg-black text-white rounded-xl hover:bg-gray-800 transition"
              onClick={handleCalendbook}
            >
              📅 Je suis propriétaire
            </button>
            <button
              className="btn btn-outline px-5 py-2 border border-black rounded-xl hover:bg-black hover:text-white transition"
              onClick={handleCalendbook}
            >
              Être rappelé
            </button>
          </div>
        </div>

        {/* --- PHOTO --- */}
        <img
          src="/assets/taha.jpg"
          alt="Taha Kerssane — TRK Impact"
          className="w-[280px] h-[360px] object-cover rounded-2xl shadow-lg"
        />
      </section>

      {/* --- SERVICES --- */}
      <section className="px-6 md:px-20 py-12 bg-white">
        <h2 className="text-2xl font-bold mb-6">Services propriétaires & investisseurs</h2>
        <div className="grid md:grid-cols-4 gap-6 text-gray-700">
          <div className="p-4 border rounded-xl">Loyer fixe garanti 💸</div>
          <div className="p-4 border rounded-xl">Exploitation courte durée 🏙️</div>
          <div className="p-4 border rounded-xl">Gestion 100 % clé en main 🤝</div>
          <div className="p-4 border rounded-xl">Conformité & assurance 🧾</div>
        </div>
      </section>

      {/* --- INVESTISSEURS --- */}
      <section className="px-6 md:px-20 py-12 bg-gray-50">
        <h2 className="text-2xl font-bold mb-6">Investisseurs — Rendement & sécurité</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="border rounded-xl p-6 bg-white">
            <h3 className="font-semibold mb-2">Modèle de revenus</h3>
            <p>
              Capital libre – Loyer garanti – Durée flexible.  
              Accompagnement fiscal & juridique.
            </p>
          </div>
          <div className="border rounded-xl p-6 bg-white">
            <h3 className="font-semibold mb-2">Performance cible</h3>
            <ul className="list-disc list-inside text-sm text-gray-700">
              <li>ROI : +18 % / an</li>
              <li>TRK Impact : gestion haut rendement</li>
            </ul>
          </div>
        </div>

        {/* --- Bouton PDF --- */}
        <div className="mt-8">
          <a
            id="dealDeckBtn"
            className="inline-block px-5 py-3 bg-black text-white rounded-xl hover:bg-gray-800 transition"
            href="/assets/DealDeck-TRK-Impact.pdf?v=2"
            download="DealDeck-TRK-Impact.pdf"
            rel="noopener"
            onClick={() => {
              try {
                gtag("event", "deal_deck_download");
                fbq("trackCustom", "DealDeckDownload");
              } catch (e) {}
            }}
          >
            📄 Télécharger le Deal Deck (PDF)
          </a>
        </div>
      </section>

      {/* --- CONTACT --- */}
      <section className="px-6 md:px-20 py-12 bg-white flex flex-col md:flex-row justify-between items-center gap-6">
        <div>
          <h2 className="text-2xl font-bold mb-4">Contact direct</h2>
          <p className="text-gray-700 mb-3">
            <strong>Taha Kerssane</strong>  
            <br />
            Expert en gestion immobilière & investissement locatif à Tanger.  
            <br />
            +212 6 14 25 39 85 · taha.kerssane.pro@gmail.com
          </p>
          <button
            className="btn btn-primary bg-green-600 text-white px-5 py-2 rounded-xl hover:bg-green-700 transition"
            onClick={() =>
              window.open("https://wa.me/212614253985", "_blank", "noopener,noreferrer")
            }
          >
            💬 WhatsApp direct
          </button>
        </div>

        <img
          src="/assets/whatsapp-qr.png"
          alt="QR WhatsApp Taha Kerssane"
          className="w-[140px] h-[140px] rounded-xl border shadow-sm"
        />
      </section>

      {/* --- BIOGRAPHIE --- */}
      <section className="px-6 md:px-20 py-12 bg-gray-50">
        <h2 className="text-2xl font-bold mb-4">À propos de Taha Kerssane</h2>
        <p className="text-gray-700 leading-relaxed max-w-3xl">
          Entrepreneur franco-marocain passionné par la performance, Taha Kerssane a bâti son
          expertise entre la vente, la psychologie du consommateur et l’investissement
          immobilier.  
          Après plusieurs années dans la direction commerciale et le développement de
          solutions haut de gamme, il fonde <strong>TRK Impact</strong> à Tanger : une
          conciergerie premium qui transforme la gestion locative traditionnelle en
          expérience rentable, transparente et humaine.  
          <br />
          <br />
          Son approche repose sur trois piliers : la confiance, la rigueur et l’innovation.  
          Chaque propriétaire est accompagné comme un véritable partenaire : audit, mise en
          valeur du bien, automatisation des réservations et gestion des revenus.  
          <br />
          <br />
          Avec une vision long terme et des outils digitaux de pointe, TRK Impact s’impose
          aujourd’hui comme la référence des conciergeries haut de gamme à Tanger.
        </p>

        <div className="mt-6">
          <button
            className="btn btn-primary px-6 py-3 bg-black text-white rounded-xl hover:bg-gray-800 transition"
            onClick={handleCalendbook}
          >
            📅 Prendre rendez-vous avec Taha
          </button>
        </div>
      </section>

      <footer className="py-6 text-center text-sm text-gray-500">
        © 2025 TRK Impact — Gestion locative premium à Tanger
      </footer>
    </main>
  );
};

export default App;
