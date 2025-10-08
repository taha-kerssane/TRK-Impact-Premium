import React from "react";

export default function App() {
  return (
    <div className="font-sans bg-neutral-50 text-neutral-900">
      {/* HERO */}
      <header className="max-w-6xl mx-auto py-20 px-6 flex flex-col md:flex-row items-center gap-10">
        <div className="flex-1">
          <h4 className="uppercase tracking-wider text-yellow-600 font-semibold mb-2">
            Gestion locative premium
          </h4>
          <h1 className="text-5xl font-extrabold leading-tight mb-4">
            Agence immobilière haut de gamme à Tanger
          </h1>
          <p className="text-neutral-600 mb-6">
            Loyer fixe garanti, exploitation courte durée optimisée, et
            expérience 5★ — sans aucun effort pour vous.
          </p>
          <div className="flex gap-4">
            <a
              href="#owners"
              className="px-6 py-3 bg-neutral-900 text-white rounded-lg font-medium shadow hover:bg-neutral-800"
            >
              Je suis propriétaire
            </a>
            <a
              href="https://wa.me/33619642559"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 border border-neutral-400 rounded-lg font-medium hover:bg-neutral-100"
            >
              WhatsApp
            </a>
          </div>
        </div>

        <div className="flex-1">
          <img
            src="/assets/taha.jpg"
            alt="Taha Kerssane — TRK Impact"
            className="rounded-2xl shadow-lg w-full object-cover"
          />
        </div>
      </header>

      {/* SERVICES */}
      <section
        id="owners"
        className="max-w-6xl mx-auto py-16 px-6 grid md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {[
          {
            title: "Loyer fixe garanti",
            desc: "Revenus mensuels stables, zéro vacance locative.",
          },
          {
            title: "Exploitation courte durée",
            desc: "Pricing dynamique, shooting pro, annonces optimisées.",
          },
          {
            title: "Gestion 100% clé-en-main",
            desc: "Check-in/out, ménage hôtelier, maintenance, linge.",
          },
          {
            title: "Conformité & assurance",
            desc: "Baux, règlement de copropriété, assurance RC.",
          },
        ].map((s, i) => (
          <div
            key={i}
            className="bg-white shadow-sm p-6 rounded-xl border border-neutral-100"
          >
            <h3 className="font-bold mb-2">{s.title}</h3>
            <p className="text-neutral-600 text-sm">{s.desc}</p>
          </div>
        ))}
      </section>

      {/* TÉMOIGNAGES */}
      <section
        id="testimonials"
        className="bg-white py-20 px-6 border-t border-neutral-100"
      >
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-extrabold mb-10">
            Témoignages de nos propriétaires
          </h2>

          <div className="grid md:grid-cols-3 gap-10">
            {/* Témoignage 1 */}
            <div className="p-6 bg-neutral-50 rounded-2xl shadow">
              <img
                src="/assets/avatars/sara.png"
                alt="Sara"
                className="w-20 h-20 rounded-full mx-auto mb-4 object-cover"
              />
              <p className="italic text-neutral-700 mb-3">
                “Je vivais à Paris et je redoutais de gérer un bien à distance.
                L’équipe TRK Impact s’occupe de tout, je reçois mes loyers
                chaque mois sans le moindre stress.”
              </p>
              <p className="font-semibold text-neutral-900">Sara B. — Paris</p>
            </div>

            {/* Témoignage 2 */}
            <div className="p-6 bg-neutral-50 rounded-2xl shadow">
              <img
                src="/assets/avatars/karim.png"
                alt="Karim"
                className="w-20 h-20 rounded-full mx-auto mb-4 object-cover"
              />
              <p className="italic text-neutral-700 mb-3">
                “Ils m’ont aidé à transformer un appartement vide en un vrai
                investissement rentable. Le suivi est clair, les rendements
                dépassent mes attentes.”
              </p>
              <p className="font-semibold text-neutral-900">Karim L. — Casablanca</p>
            </div>

            {/* Témoignage 3 */}
            <div className="p-6 bg-neutral-50 rounded-2xl shadow">
              <img
                src="/assets/avatars/famille.png"
                alt="Famille"
                className="w-20 h-20 rounded-full mx-auto mb-4 object-cover"
              />
              <p className="italic text-neutral-700 mb-3">
                “Nous avons confié notre résidence secondaire à TRK Impact : en
                quelques semaines, elle est devenue source de revenus. Le
                professionnalisme est irréprochable.”
              </p>
              <p className="font-semibold text-neutral-900">
                Famille R. — Bruxelles
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* BIO Taha Kerssane */}
      <section className="max-w-5xl mx-auto py-20 px-6 text-center">
        <h2 className="text-3xl font-extrabold mb-6">
          À propos de Taha Kerssane
        </h2>
        <p className="text-neutral-700 leading-relaxed max-w-3xl mx-auto">
          Entrepreneur franco-marocain passionné par la valorisation
          immobilière, Taha Kerssane a fondé <strong>TRK Impact</strong> avec une
          vision claire : rendre la gestion locative haut de gamme accessible,
          fluide et rentable pour les propriétaires.  
          <br />
          Fort de plusieurs années d’expérience dans la gestion de projets
          immobiliers et l’optimisation locative à Paris, Strasbourg et Tanger,
          il allie rigueur, sens du service et approche humaine.
          <br />
          <br />
          Son objectif : créer une relation de confiance durable entre
          propriétaires et gestionnaires, où chaque bien devient un patrimoine
          valorisé — sans contraintes.
        </p>
      </section>

      {/* FOOTER */}
      <footer className="bg-neutral-900 text-neutral-200 py-10 text-center text-sm">
        © 2025 TRK Impact — Gestion locative premium à Tanger.
        <br />
        Site conçu par <strong>Taha Kerssane</strong> • Performance, élégance &
        confiance.
      </footer>
    </div>
  );
}
