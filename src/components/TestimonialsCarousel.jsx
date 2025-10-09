import React, { useEffect, useMemo, useRef, useState } from 'react';

/**
 * Carousel de témoignages
 * - props: { lang: 'fr' | 'en' | 'ar' }
 * - Avatars: mettre vos images dans /public/avatars/ et référencer via avatar: '/avatars/xxx.png'
 * - Si pas d'avatar, des initiales seront générées automatiquement.
 */

const DATA = {
  fr: [
    {
      name: 'Sara',
      role: 'Directrice marketing',
      quote:
        "Une expérience fluide, moderne et haut de gamme. TRK Impact Premium a clairement élevé notre image de marque.",
      avatar: '/avatars/sara.png',
    },
    {
      name: 'Karim',
      role: 'Propriétaire multi-biens',
      quote:
        "J’ai délégué toute la gestion et mes revenus sont plus réguliers, avec une relation client impeccable. Top.",
      avatar: '/avatars/Karim.png',
    },
    {
      name: 'Famille B.',
      role: 'Propriétaires saisonniers',
      quote:
        "Communication claire, check-in sans friction et meilleurs tarifs. On s’occupe de rien, et ça change tout.",
      avatar: '/avatars/famille.png',
    },
  ],
  en: [
    {
      name: 'Sara',
      role: 'Marketing Director',
      quote:
        'Smooth, modern and premium experience. TRK Impact Premium clearly elevated our brand perception.',
      avatar: '/avatars/sara.png',
    },
    {
      name: 'Karim',
      role: 'Multi-property owner',
      quote:
        'I outsourced everything. Revenue is now consistent with flawless guest relations. Great work.',
      avatar: '/avatars/Karim.png',
    },
    {
      name: 'B. Family',
      role: 'Seasonal owners',
      quote:
        'Clear communication, frictionless check-ins and better pricing. We handle nothing — and that changes everything.',
      avatar: '/avatars/famille.png',
    },
  ],
  ar: [
    {
      name: 'سارة',
      role: 'مديرة التسويق',
      quote:
        'تجربة سلسة وحديثة وراقية. رفعت TRK Impact Premium صورتنا أمام العملاء بشكل واضح.',
      avatar: '/avatars/sara.png',
    },
    {
      name: 'كريم',
      role: 'مالك عدة عقارات',
      quote:
        'فوّضت كل شيء. أصبحت العوائد أكثر انتظاماً والعلاقة مع الضيوف ممتازة. عمل احترافي.',
      avatar: '/avatars/Karim.png',
    },
    {
      name: 'عائلة ب',
      role: 'مُلاك إيجار موسمي',
      quote:
        'تواصل واضح، تسجيل دخول سهل وتسعير أفضل. لا نفعل شيئاً تقريباً — والنتيجة رائعة.',
      avatar: '/avatars/famille.png',
    },
  ],
};

const AUTO_MS = 6000;

export default function TestimonialsCarousel({ lang = 'fr' }) {
  const items = useMemo(() => DATA[lang] || DATA.fr, [lang]);
  const isRtl = lang === 'ar';
  const [idx, setIdx] = useState(0);
  const timerRef = useRef(null);

  const go = (next) => setIdx((i) => (next + items.length) % items.length);
  const next = () => go(idx + 1);
  const prev = () => go(idx - 1);

  useEffect(() => {
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setIdx((i) => (i + 1) % items.length);
    }, AUTO_MS);
    return () => clearInterval(timerRef.current);
  }, [items]);

  const onMouseEnter = () => clearInterval(timerRef.current);
  const onMouseLeave = () => {
    timerRef.current = setInterval(() => {
      setIdx((i) => (i + 1) % items.length);
    }, AUTO_MS);
  };

  const t = items[idx];

  return (
    <div
      dir={isRtl ? 'rtl' : 'ltr'}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      style={{ display: 'grid', gap: 12 }}
    >
      <div style={cardStyle}>
        <div style={rowStyle}>
          <Avatar name={t.name} src={t.avatar} />
          <div style={{ overflow: 'hidden' }}>
            <p style={quoteStyle}>&ldquo;{t.quote}&rdquo;</p>
            <div style={metaStyle}>
              <strong style={{ fontSize: 14 }}>{t.name}</strong>
              <span style={{ opacity: 0.85 }}> · {t.role}</span>
            </div>
          </div>
        </div>
      </div>

      {/* contrôles */}
      <div style={controlsWrapStyle}>
        <button aria-label="Précédent" onClick={prev} style={dotBtnStyle}>◀</button>
        <div style={dotsStyle}>
          {items.map((_, i) => (
            <button
              key={i}
              onClick={() => setIdx(i)}
              aria-label={`Aller au témoignage ${i + 1}`}
              style={{
                ...dotStyle,
                opacity: i === idx ? 1 : 0.4,
                transform: i === idx ? 'scale(1.1)' : 'scale(1)',
              }}
            />
          ))}
        </div>
        <button aria-label="Suivant" onClick={next} style={dotBtnStyle}>▶</button>
      </div>
    </div>
  );
}

/* ========= sous-composants ========= */

function Avatar({ name, src }) {
  if (src) {
    return (
      <img
        src={src}
        alt={name}
        width="48"
        height="48"
        loading="lazy"
        style={{
          width: 48,
          height: 48,
          objectFit: 'cover',
          borderRadius: '50%',
          border: '1px solid rgba(241,196,15,.55)',
          boxShadow: '0 6px 16px rgba(0,0,0,.25)',
          flex: '0 0 auto',
        }}
      />
    );
  }
  const initials = (name || '?')
    .split(' ')
    .map((p) => p[0]?.toUpperCase())
    .slice(0, 2)
    .join('');

  return (
    <div style={avatarFallbackStyle} aria-hidden title={name}>
      {initials}
    </div>
  );
}

/* ========= styles ========= */

const cardStyle = {
  borderRadius: 16,
  border: '1px solid rgba(241,196,15,.28)',
  background:
    'linear-gradient(180deg, rgba(22,22,22,.90) 0%, rgba(12,12,12,.90) 100%)',
  color: '#f5f5f5',
  padding: 18,
  boxShadow: '0 12px 30px rgba(0,0,0,.28)',
};

const rowStyle = {
  display: 'grid',
  gridTemplateColumns: '48px 1fr',
  gap: 12,
  alignItems: 'center',
};

const quoteStyle = {
  margin: 0,
  fontSize: 16,
  lineHeight: 1.5,
  letterSpacing: '.2px',
};

const metaStyle = {
  marginTop: 8,
  fontSize: 13,
  color: '#f1c40f',
};

const controlsWrapStyle = {
  display: 'grid',
  gridTemplateColumns: 'auto 1fr auto',
  alignItems: 'center',
  gap: 8,
  justifyItems: 'center',
};

const dotsStyle = {
  display: 'flex',
  gap: 8,
  alignItems: 'center',
  justifyContent: 'center',
};

const dotStyle = {
  width: 10,
  height: 10,
  borderRadius: 999,
  background: '#f1c40f',
  border: '1px solid rgba(241,196,15,.55)',
  boxShadow: '0 2px 8px rgba(0,0,0,.25)',
  cursor: 'pointer',
};

const dotBtnStyle = {
  padding: '6px 8px',
  borderRadius: 10,
  border: '1px solid rgba(241,196,15,.35)',
  background: 'transparent',
  color: '#f1c40f',
  cursor: 'pointer',
};

const avatarFallbackStyle = {
  width: 48,
  height: 48,
  borderRadius: '50%',
  display: 'grid',
  placeItems: 'center',
  fontWeight: 700,
  color: '#f1c40f',
  background:
    'linear-gradient(135deg, rgba(28,28,28,1) 0%, rgba(50,50,50,1) 100%)',
  border: '1px solid rgba(241,196,15,.55)',
  boxShadow: '0 6px 16px rgba(0,0,0,.25)',
  flex: '0 0 auto',
};
