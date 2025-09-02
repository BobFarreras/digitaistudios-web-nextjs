// src/app/layout.js

import './globals.css';
import RootLayoutClient from './RootLayoutClient';

const siteUrl = 'https://digitaistudios.com';

// NOU: Creem un objecte 'viewport' per a les opcions del navegador
export const viewport = {
  themeColor: '#0f172a',
  colorScheme: 'light dark',
};

// L'objecte 'metadata' ara està més net
export const metadata = {
  title: {
    template: '%s | DigitAI Studios',
    default: 'DigitAI Studios - Automatització i IA per a Empreses',
  },
  description: 'Automatitza el teu negoci amb solucions d\'IA per a petites empreses. Estalvia temps, millora la productivitat i impulsa el futur del teu negoci.',
  
  // CANVI: Definim les icones de manera més explícita
  icons: {
    icon: [
        { url: '/favicon.ico', type: 'image/x-icon' },
        { url: '/favicon.png', type: 'image/png' },
    ],
    shortcut: '/favicon.png',
    apple: '/apple-touch-icon.png',
  },

  openGraph: {
    title: 'DigitAI Studios - Automatitza el teu negoci amb IA',
    description: 'Automatitza el teu negoci amb solucions d\'IA per a petites empreses.',
    url: siteUrl,
    siteName: 'DigitAI Studios',
    images: [{
        url: `${siteUrl}/og-image.webp`,
        alt: 'DigitAI Studios - IA per empreses',
    }],
    locale: 'ca_ES',
    type: 'website',
  },

  twitter: {
    card: 'summary_large_image',
    title: 'DigitAI Studios - IA per empreses',
    description: 'Automatitza el teu negoci amb solucions d\'IA.',
    images: [`${siteUrl}/og-image.webp`],
  },
  
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: '/',
    languages: {
      'ca-ES': '/',
      'x-default': '/',
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
};

const organizationSchema = {
  "@context":"https://schema.org",
  "@type":"Organization",
  "name":"DigitAI Studios",
  "alternateName":"Digitai Studios",
  "url":"https://digitaistudios.com/",
  "logo":"https://digitaistudios.com/favicon.ico",
  "description":"A DigitAI Studios transformem petites empreses amb IA que automatitza processos i millora la productivitat.",
  "sameAs":[
    "https://www.linkedin.com/in/digitai-studios-105a0136a/",
    "https://www.instagram.com/digitaistudios/",
    "https://www.facebook.com/profile.php?id=61576974390567"
  ]
};

export default function RootLayout({ children }) {
return (
  <RootLayoutClient>
      {/* NOU: Afegim l'script de dades estructurades aquí */}
      <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      {children}
  </RootLayoutClient>
);
}