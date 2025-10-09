import React, { useEffect, useRef } from 'react';

const data = {
  fr: [
    { name: 'Sara', role: 'Directrice marketing', text: 'Une expérience fluide, moderne et haut de gamme. TRK Impact a clairement élevé notre image de marque et nos revenus.', avatar: '/avatars/Sara.png' },
    { name: 'Karim', role: 'Propriétaire multi-biens', text: 'Taux d’occupation en hausse et zéro stress. Équipe réactive, carrée et force de proposition.', avatar: '/avatars/Karim.png' },
    { name: 'Famille B.', role: 'Investisseurs', text: 'Accueil au top, ménage impeccable, invités ravis. La rentabilité est au rendez-vous sans que nous ayons à intervenir.', avatar: '/avatars/Famille.png' },
  ],
  en: [
    { name: 'Sara', role: 'Marketing Director', text: 'Smooth, modern and premium experience. TRK Impact clearly raised our brand and revenues.', avatar: '/avatars/Sara.png' },
    { name: 'Karim', role: 'Multi-property Owner', text: 'Higher occupancy and zero hassle. Sharp, responsive and proactive team.', avatar: '/avatars/Karim.png' },
    { name: 'Family B.', role: 'Investors', text: 'Top-class welcome, spotless cleaning, happy guests. Profitability without our involvement.', avatar: '/avatars/Famille.png' },
  ],
  ar: [
    { name: 'سارة', role: 'مديرة التسويق', text: 'تجربة سلسة وعصرية وراقية. رفع TRK Impact من صورتنا وعائداتنا.', avatar: '/avatars/Sara.png' },
    { name: 'كريم', role: 'مالك عدة عقارات', text: 'ارتفاع ملحوظ في نسبة الإشغال ودون عناء. فريق محترف ومتجاوب.', avatar: '/avatars/Karim.png' },
    { name: 'عائلة ب', role: 'مستثمرون', text: 'استقبال ممتاز ونظافة مثالية وضيوف سعداء. ربحية دون تدخل منا.', avatar: '/avatars/Famille.png' },
  ],
};

export default function TestimonialsCarousel({ lang = 'fr' }) {
  const items = data[lang] || data.fr;
  const scrollerRef = useRef(null);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    let idx = 0;
    const id = setInterval(() => {
      idx = (idx + 1) % items.length;
      el.style.transform = `translateX(-${idx * 100}%)`;
    }, 3500);
    return () => clearInterval(id);
  }, [items.length, lang]);

  return (
    <div style={{ overflow: 'hidden', borderRadius: 16, border: '1px solid rgba(241,196,15,.18)' }}>
      <div
        ref={scrollerRef}
        style={{ display: 'flex', transition: 'transform .5s ease', width: `${items.length * 100}%` }}
      >
        {items.map((it, i) => (
          <div key={i} style={{ width: '100%', padding: 18 }}>
            <div className="card" style={{ display: 'grid', gridTemplateColumns: '70px 1fr', gap: 14, alignItems: 'center' }}>
              {it.avatar ? (
                <img className="avatar" src={it.avatar} alt={it.name} />
              ) : (
                <div className="avatar" aria-hidden style={{ display:'grid', placeItems:'center', fontWeight:800, color:'#f1c40f' }}>
                  {it.name?.slice(0,1).toUpperCase()}
                </div>
              )}
              <div>
                <strong style={{ display: 'block' }}>{it.name}</strong>
                <small style={{ opacity: .8 }}>{it.role}</small>
                <p style={{ marginTop: 8 }}>{it.text}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
