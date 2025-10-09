import React, { useState } from 'react';

export default function ContactModal({ open, onClose, lang = 'fr', track, WA_FR, CALENDBOOK }) {
  if (!open) return null;

  const t = {
    fr: {
      title: 'Demande de rappel / devis',
      name: 'Votre nom',
      email: 'Email',
      phone: 'Téléphone',
      property: 'Type de bien (studio, T2…)',
      city: 'Ville',
      message: 'Votre message',
      submit: 'Envoyer via WhatsApp',
      or: 'ou',
      book: 'Planifier un appel (Calendbook)',
      privacy: 'En envoyant ce formulaire, vous consentez à être recontacté.',
    },
    en: {
      title: 'Callback / Quote request',
      name: 'Your name',
      email: 'Email',
      phone: 'Phone',
      property: 'Property type (studio, 1BR…)',
      city: 'City',
      message: 'Your message',
      submit: 'Send via WhatsApp',
      or: 'or',
      book: 'Schedule a call (Calendbook)',
      privacy: 'By sending this form, you agree to be contacted.',
    },
    ar: {
      title: 'طلب اتصال / عرض سعر',
      name: 'الاسم',
      email: 'البريد الإلكتروني',
      phone: 'الهاتف',
      property: 'نوع العقار',
      city: 'المدينة',
      message: 'رسالتك',
      submit: 'إرسال عبر واتساب',
      or: 'أو',
      book: 'حجز مكالمة (Calendbook)',
      privacy: 'بإرسال هذا النموذج، فأنت توافق على التواصل معك.',
    },
  }[lang] || t.fr;

  const [form, setForm] = useState({ name: '', email: '', phone: '', property: '', city: '', message: '' });

  const onSubmit = (e) => {
    e.preventDefault();
    const txt = [
      `Demande TRK Impact Premium`,
      `Nom: ${form.name}`,
      `Email: ${form.email}`,
      `Téléphone: ${form.phone}`,
      `Bien: ${form.property}`,
      `Ville: ${form.city}`,
      `Message: ${form.message}`,
    ].join('\n');
    const url = `${WA_FR}?text=${encodeURIComponent(txt)}`;

    // tracking
    track?.both({
      gaEvent: 'generate_lead',
      gaParams: { method: 'whatsapp_form', city: form.city || '-', property: form.property || '-' },
      fbEvent: 'Lead',
      fbParams: { method: 'whatsapp_form', city: form.city || '-', property: form.property || '-' },
      fbStandard: true,
    });

    window.open(url, '_blank', 'noopener,noreferrer');
    onClose?.();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      style={{
        position: 'fixed', inset: 0, zIndex: 70,
        background: 'rgba(0,0,0,.55)', display: 'grid', placeItems: 'center', padding: 16,
      }}
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: 'min(680px, 96vw)', borderRadius: 16, padding: 18,
          background: 'linear-gradient(180deg, rgba(22,22,22,.95) 0%, rgba(10,10,10,.95) 100%)',
          border: '1px solid rgba(241,196,15,.25)', color: '#f5f5f5',
          boxShadow: '0 20px 60px rgba(0,0,0,.45)',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
          <h3 style={{ margin: 0, fontSize: 20 }}>{t.title}</h3>
          <button onClick={onClose} aria-label="Close"
            style={{ background: 'transparent', color: '#f1c40f', border: '1px solid rgba(241,196,15,.35)', borderRadius: 10, padding: '6px 10px' }}>
            ✕
          </button>
        </div>

        <form onSubmit={onSubmit} style={{ display: 'grid', gap: 10 }}>
          <div style={grid2}>
            <input required placeholder={t.name} value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })} style={inp} />
            <input type="email" required placeholder={t.email} value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })} style={inp} />
          </div>
          <div style={grid2}>
            <input placeholder={t.phone} value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })} style={inp} />
            <input placeholder={t.property} value={form.property}
              onChange={(e) => setForm({ ...form, property: e.target.value })} style={inp} />
          </div>
          <input placeholder={t.city} value={form.city}
            onChange={(e) => setForm({ ...form, city: e.target.value })} style={inp} />
          <textarea rows={4} placeholder={t.message} value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })} style={{ ...inp, resize: 'vertical' }} />

          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'center' }}>
            <button type="submit" style={btnPrimary}>🟢 {t.submit}</button>
            <span style={{ opacity: .9 }}>{t.or}</span>
            <a href={CALENDBOOK} target="_blank" rel="noopener noreferrer"
               onClick={() => track?.both({
                 gaEvent: 'select_content', gaParams: { content_type: 'calendbook_contact' },
                 fbEvent: 'Lead', fbParams: { method: 'calendbook_contact' }, fbStandard: true,
               })}
               style={btnGhost}>
              📞 {t.book}
            </a>
          </div>
          <small style={{ opacity: .7 }}>{t.privacy}</small>
        </form>
      </div>
    </div>
  );
}

const grid2 = { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 };
const inp = {
  padding: '10px 12px', borderRadius: 10, border: '1px solid rgba(241,196,15,.25)',
  background: 'rgba(255,255,255,.04)', color: 'inherit', outline: 'none',
};
const btnPrimary = {
  padding: '10px 14px', borderRadius: 12, border: '1px solid rgba(241,196,15,.6)',
  background: 'linear-gradient(135deg, rgba(28,28,28,1) 0%, rgba(50,50,50,1) 100%)',
  color: '#f1c40f', fontWeight: 700, cursor: 'pointer',
};
const btnGhost = {
  padding: '10px 14px', borderRadius: 12, border: '1px solid rgba(241,196,15,.35)',
  background: 'transparent', color: '#f1c40f', fontWeight: 600, textDecoration: 'none',
};
