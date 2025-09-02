// src/app/disseny-web/page.js

import WebDesignPageClient from './WebDesignPageClient';

// --- SEO (Substitueix <Helmet>) ---
export const metadata = {
    title: "Disseny de Webs Intel·ligents amb IA | DigitAI Studios",
    description: "Creem pàgines web a mida que no només tenen un disseny espectacular, sinó que integren automatització i IA per treballar activament pel teu negoci. Descobreix com la teva web pot generar resultats reals.",
    alternates: {
        canonical: 'https://digitaistudios.com/disseny-web',
    },
    openGraph: {
        title: "Disseny de Webs Intel·ligents amb IA | DigitAI Studios",
        description: "Creem pàgines web a mida que integren automatització i IA per treballar activament pel teu negoci.",
        type: 'website',
        url: 'https://digitaistudios.com/disseny-web',
        images: [{ url: 'https://digitaistudios.com/og-image.png', alt: "DigitAI Studios - Disseny Web amb IA" }],
    },
    twitter: {
        card: 'summary_large_image',
        title: "Disseny de Webs Intel·ligents amb IA | DigitAI Studios",
        description: "Creem pàgines web a mida que integren automatització i IA per treballar activament pel teu negoci.",
        images: ['https://digitaistudios.com/og-image.png'],
    },
};

// Aquest component de servidor només importa i renderitza el component de client.
export default function WebDesignPage() {
  return <WebDesignPageClient />;
}