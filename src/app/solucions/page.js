// src/app/solucions/page.js

import CategoriesClient from './CategoriesClient';
import { AUTOMATION_DATA as fallbackData } from '@/data/solutionsData';

// --- Funció per carregar dades ---
async function getSolutions() {
  try {
    const res = await fetch('https://digitaistudios.com/api/get-solutions.php');
    if (!res.ok) {
        console.error("Failed to fetch solutions, using fallback data.");
        return fallbackData;
    };
    const data = await res.json();
    return Object.keys(data).length ? data : fallbackData;
  } catch (error) {
    console.error("Error fetching solutions, using fallback data:", error);
    return fallbackData;
  }
}

// --- SEO ---
export const metadata = {
  title: "Categories de solucions d'IA - DigitAI Studios",
  description: "Descobreix totes les categories de solucions d'intel·ligència artificial de DigitAI Studios per a automatitzar el teu negoci.",
  alternates: {
    canonical: 'https://digitaistudios.com/solucions', // URL canònica actualitzada
  },
  openGraph: {
    title: "Categories de solucions d'IA - DigitAI Studios",
    description: "Descobreix totes les categories de solucions d'intel·ligència artificial.",
    type: 'website',
    url: 'https://digitaistudios.com/solucions',
    images: [{ url: 'https://digitaistudios.com/og-image.png', alt: "Categories de solucions d'IA - DigitAI Studios" }],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Categories de solucions d'IA - DigitAI Studios",
    description: "Descobreix totes les categories de solucions d'intel·ligència artificial.",
    images: ['https://digitaistudios.com/og-image.png'],
  },
};

// --- Component de la Pàgina (de Servidor) ---
export default async function CategoriesPage() {
  const automationData = await getSolutions();
  const categories = Object.entries(automationData);

  return (
    <div className="pt-36 pb-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-4xl lg:text-6xl font-bold mb-4">Explora les nostres <span className="gradient-text">Àrees d'Automatització</span></h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Troba el grup de solucions que millor s'adapta al teu sector o departament.
          </p>
        </div>
        
        {/* Renderitzem el component de client amb les dades ja carregades */}
        <CategoriesClient categories={categories} />
      </div>
    </div>
  );
}