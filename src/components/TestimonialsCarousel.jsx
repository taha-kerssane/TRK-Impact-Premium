import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const testimonialsData = {
  fr: [
    {
      name: "Yacine M.",
      quote: "Taha a transformé mon positionnement. C’est un accélérateur de projets !",
      avatar: "/actifs/avatar1.png",
    },
    {
      name: "Nora L.",
      quote: "Sa vision stratégique se traduit en résultats concrets.",
      avatar: "/actifs/avatar2.png",
    },
    {
      name: "Samir T.",
      quote: "Chiffre d'affaires triplé en 3 mois. Merci Taha !",
      avatar: "/actifs/avatar3.png",
    },
  ],
  en: [
    {
      name: "Yacine M.",
      quote: "Taha helped me redefine my positioning. He’s a true business accelerator!",
      avatar: "/actifs/avatar1.png",
    },
    {
      name: "Nora L.",
      quote: "His strategic vision delivered concrete results.",
      avatar: "/actifs/avatar2.png",
    },
    {
      name: "Samir T.",
      quote: "Tripled my revenue in 3 months. Grateful for the guidance!",
      avatar: "/actifs/avatar3.png",
    },
  ],
  ar: [
    {
      name: "ياسين م.",
      quote: "طه غيّر طريقة تفكيري تماماً. دفعني بقوة نحو النجاح!",
      avatar: "/actifs/avatar1.png",
    },
    {
      name: "نورة ل.",
      quote: "رؤيته الاستراتيجية ساعدتني على تحقيق نتائج فعلية.",
      avatar: "/actifs/avatar2.png",
    },
    {
      name: "سمير ت.",
      quote: "حققت 3 أضعاف دخلي خلال 3 أشهر فقط.",
      avatar: "/actifs/avatar3.png",
    },
  ],
};

export default function TestimonialsCarousel({ lang = "fr" }) {
  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    speed: 500,
    autoplaySpeed: 5000,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const data = testimonialsData[lang];

  return (
    <Slider {...settings}>
      {data.map((t, i) => (
        <div key={i} className="px-4">
          <div className="bg-zinc-800 dark:bg-zinc-200 text-white dark:text-black p-6 max-w-2xl mx-auto rounded-xl shadow-xl">
            <img src={t.avatar} alt={t.name} className="w-16 h-16 mx-auto rounded-full mb-4" loading="lazy" />
            <p className="italic text-lg mb-2 text-center">“{t.quote}”</p>
            <p className="text-gold font-semibold text-center">{t.name}</p>
          </div>
        </div>
      ))}
    </Slider>
  );
}

