import React, { useEffect, useRef, useState } from 'react';

/**
 * TestimonialsCarousel
 * Props:
 * - lang: "fr" | "en" | "ar" (par défaut "fr")
 * - intervalMs: nombre en ms entre slides (par défaut 4500)
 * - testimonials: tableau optionnel pour override le contenu par défaut
 */
export default function TestimonialsCarousel({
  lang = 'fr',
  intervalMs = 4500,
  testimonials: testimonialsProp,
}) {
 const content = {
  fr: [
    {
      name: 'Karim',
      role: 'Entrepreneur digital',
      quote:
        'Grâce à TRK Impact Premium, j’ai complètement transformé ma manière de présenter mes projets. L’image est premium et la vitesse est top.',
      avatar: '/avatars/Karim.png',
    },
    {
      name: 'Sara',
      role: 'Directrice marketing',
      quote:
        'Une expérience fluide, moderne et haut de gamme. TRK Impact Premium a clairement élevé notre image de marque.',
      avatar: '/avatars/sara.png',
    },
    {
      name: 'Famille TRK',
      role: 'Équipe interne',
      quote:
        'Nous voulions une vitrine à la hauteur de notre vision : élégante, performante et orientée conversion.',
      avatar: '/avatars/famille.png',
    },
  ],
  en: [
    {
      name: 'Karim',
      role: 'Digital Entrepreneur',
      quote:
        'Thanks to TRK Impact Premium, I completely changed how I showcase my projects. Premium look and excellent speed.',
      avatar: '/avatars/Karim.png',
    },
    {
      name: 'Sara',
      role: 'Marketing Director',
      quote:
        'A smooth, modern and high-end experience. TRK Impact Premium clearly elevated our brand image.',
      avatar: '/avatars/sara.png',
    },
    {
      name: 'TRK Family',
      role: 'Internal Team',
      quote:
        'We wanted a showcase worthy of our vision: elegant, efficient, and conversion-focused.',
      avatar: '/avatars/famille.png',
    },
  ],
  ar: [
    {
      name: 'كريم',
      role: 'رائد أعمال رقمي',
      quote:
        'بفضل TRK Impact Premium غيّرت تمامًا طريقة عرض مشاريعي. المظهر فاخر والسرعة ممتازة.',
      avatar: '/avatars/Karim.png',
    },
    {
      name: 'سارة',
      role: 'مديرة تسويق',
      quote:
        'تجربة سلسة وعصرية وراقية. TRK Impact Premium رفع صورة علامتنا بشكل واضح.',
      avatar: '/avatars/sara.png',
    },
    {
      name: 'عائلة TRK',
      role: 'الفريق الداخلي',
      quote:
        'أردنا واجهة تليق برؤيتنا: أنيقة وفعّالة ومركّزة على التحويل.',
      avatar: '/avatars/famille.png',
    },
  ],
};

  const testimonials =
    Array.isArray(testimonialsProp) && testimonialsProp.length
      ? testimonialsProp
      : (content[lang] || content.fr);

  const [index, setIndex] = useState(0);
  const timerRef = useRef(null);
  const containerRef = useRef(null);
  const isRtl = lang === 'ar';

  const goTo = (i) => setIndex((i + testimonials.length) % testimonials.length);
  const next = () => goTo(index + 1);
  const prev = () => goTo(index - 1);

  useEffect(() => {
    start();
    return stop;
  }, [index, intervalMs, testimonials.length]);

  const start = () => {
    stop();
    timerRef.current = setInterval(() => { next(); }, intervalMs);
  };
  const stop = () => {
    if (timerRef.current) clearInterval(timerRef.current);
  };

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    let startX = 0;
    let isDown = false;

    const onDown = (e) => {
      isDown = true;
      startX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      stop();
    };
    const onMove = (e) => {
      if (!isDown) return;
      const x = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const delta = x - startX;
      if (Math.abs(delta) > 50) {
        isRtl ? (delta > 0 ? next() : prev()) : (delta > 0 ? prev() : next());
        isDown = false;
        start();
      }
    };
    const onUp = () => { isDown = false; };

    el.addEventListener('mousedown', onDown);
    el.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
    el.addEventListener('touchstart', onDown, { passive: true });
    el.addEventListener('touchmove', onMove, { passive: true });
    el.addEventListener('touchend', onUp);

    return () => {
      el.removeEventListener('mousedown', onDown);
      el.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
      el.removeEventListener('touchstart', onDown);
      el.removeEventListener('touchmove', onMove);
      el.removeEventListener('touchend', onUp);
    };
  }, [isRtl]);

  return (
    <section
      ref={containerRef}
      dir={isRtl ? 'rtl' : 'ltr'}
      onMouseEnter={stop}
      onMouseLeave={start}
      style={styles.wrapper}
      aria-label="Témoignages"
    >
      <div style={styles.track}>
        {testimonials.map((t, i) => (
          <article
            key={i}
            style={{
              ...styles.card,
              opacity: i === index ? 1 : 0,
              transform: i === index ? 'translateY(0px)' : 'translateY(8px)',
              pointerEvents: i === index ? 'auto' : 'none',
            }}
            aria-hidden={i !== index}
          >
            <Avatar name={t.name} src={t.avatar} />
            <p style={styles.quote}>“{t.quote}”</p>
            <div style={styles.meta}>
              <span style={styles.name}>{t.name}</span>
              <span style={styles.dot}>•</span>
              <span style={styles.role}>{t.role}</span>
            </div>
          </article>
        ))}
      </div>

      <div style={styles.controls}>
        <button onClick={prev} style={styles.btn} aria-label="Précédent">‹</button>
        <Dots total={testimonials.length} index={index} onClick={goTo} />
        <button onClick={next} style={styles.btn} aria-label="Suivant">›</button>
      </div>
    </section>
  );
}

function Avatar({ name, src, size = 56 }) {
  const initials = (name || '')
    .split(' ')
    .map((s) => s[0])
    .filter(Boolean)
    .slice(0, 2)
    .join('')
    .toUpperCase();

  return src ? (
    <img
      src={src}
      alt={name}
      width={size}
      height={size}
      style={{ ...styles.avatar, width: size, height: size }}
      loading="lazy"
    />
  ) : (
    <div
      aria-hidden
      style={{
        ...styles.avatar,
        width: size,
        height: size,
        background: 'linear-gradient(135deg, rgba(18,18,18,1) 0%, rgba(44,44,44,1) 100%)',
        color: '#f1c40f',
        fontWeight: 700,
        display: 'grid',
        placeItems: 'center',
        letterSpacing: '0.5px',
      }}
    >
      {initials}
    </div>
  );
}

function Dots({ total, index, onClick }) {
  return (
    <div style={styles.dots} role="tablist" aria-label="Navigation témoignages">
      {Array.from({ length: total }).map((_, i) => (
        <button
          key={i}
          onClick={() => onClick(i)}
          role="tab"
          aria-selected={i === index}
          style={{
            ...styles.dotBtn,
            opacity: i === index ? 1 : 0.4,
            transform: i === index ? 'scale(1.05)' : 'scale(1)',
          }}
        />
      ))}
    </div>
  );
}

const styles = {
  wrapper: { position: 'relative', width: '100%', maxWidth: 980, margin: '0 auto', padding: '24px 16px' },
  track: { position: 'relative', minHeight: 190 },
  card: {
    position: 'absolute', inset: 0, padding: '24px', borderRadius: 16,
    background: 'linear-gradient(180deg, rgba(20,20,20,.90) 0%, rgba(10,10,10,.90) 100%)',
    border: '1px solid rgba(241,196,15,.25)', boxShadow: '0 8px 28px rgba(0,0,0,.35)',
    transition: 'opacity .5s ease, transform .5s ease', color: '#f2f2f2',
    display: 'grid', gridTemplateColumns: '56px 1fr', gridTemplateRows: 'auto 1fr auto', gap: 16, alignItems: 'center',
  },
  avatar: { borderRadius: '50%', objectFit: 'cover', border: '1.5px solid rgba(241,196,15,.6)', gridColumn: '1 / 2', gridRow: '1 / 3' },
  quote: { gridColumn: '2 / 3', gridRow: '1 / 3', margin: 0, fontSize: 18, lineHeight: 1.5 },
  meta: { gridColumn: '1 / -1', gridRow: '3 / 4', display: 'flex', alignItems: 'center', gap: 8, color: '#d8d8d8', fontSize: 14 },
  name: { fontWeight: 700, color: '#f1c40f' },
  role: { opacity: 0.85 },
  dot: { opacity: 0.5 },
  controls: { marginTop: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12 },
  btn: {
    width: 36, height: 36, borderRadius: 999, border: '1px solid rgba(241,196,15,.45)',
    background: 'transparent', color: '#f1c40f', fontSize: 18, cursor: 'pointer',
  },
  dots: { display: 'flex', gap: 8, alignItems: 'center' },
  dotBtn: { width: 8, height: 8, borderRadius: 999, border: 'none', background: '#f1c40f', cursor: 'pointer' },
};
