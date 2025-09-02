// src/app/page.js

import HomePageClient from './HomePageClient';

// --- Funció per carregar dades (s'executa al servidor durant el build) ---
async function getTestimonials() {
  try {
    // CANVI: Eliminem l'objecte d'opcions del fetch
    const response = await fetch('https://digitaistudios.com/api/get-testimonials.php');
    if (!response.ok) return [];
    const data = await response.json();
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error("Failed to fetch testimonials:", error);
    return [];
  }
}


// --- SEO (Substitueix <Helmet>) ---
export const metadata = {
  title: 'DigitAI Studios - Automatitza el teu negoci amb Intel·ligència Artificial',
  description: 'Automatitza el teu negoci amb solucions d\'IA per a petites empreses. Estalvia temps, millora la productivitat i impulsa el futur del teu negoci.',
  alternates: {
    canonical: 'https://digitaistudios.com/',
  },
  openGraph: {
    title: 'DigitAI Studios - Automatitza el teu negoci amb IA',
    description: 'Automatitza el teu negoci amb solucions d\'IA per a petites empreses. Estalvia temps, millora la productivitat i impulsa el futur del teu negoci.',
    type: 'website',
    url: 'https://digitaistudios.com/',
    images: [
      {
        url: 'https://digitaistudios.com/og-image.png',
        alt: 'DigitAI Studios - IA per empreses',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DigitAI Studios - IA per empreses',
    description: 'Automatitza el teu negoci amb solucions d\'IA per a petites empreses. Estalvia temps, millora la productivitat i impulsa el futur del teu negoci.',
    images: ['https://digitaistudios.com/og-image.png'],
  },
  // Per al JSON-LD, Next.js recomana posar-lo directament al layout o a la pàgina
  // amb la propietat 'jsonLd' o directament com un script si és complex.
  // Aquesta és una manera de fer-ho:
  other: {
    'application/ld+json': JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebSite",
        "url": "https://digitaistudios.com/",
        "name": "DigitAI Studios",
        "alternateName": "Digitai Studios",
        "potentialAction": {
          "@type": "SearchAction",
          "target": "https://digitaistudios.com/search?q={search_term_string}",
          "query-input": "required name=search_term_string"
        }
    }),
  },
};


// --- Component de la Pàgina (de Servidor) ---
export default async function HomePage() {
  // 1. Carrega les dades al servidor
  const testimonials = await getTestimonials();

  // 2. Renderitza el component de client, passant-li les dades ja carregades
  return <HomePageClient initialTestimonials={testimonials} />;
}