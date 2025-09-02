// src/app/solucions/[categoryKey]/page.js

import { notFound } from 'next/navigation';
import SolutionsListPageClient from './SolutionsListPageClient';
import { AUTOMATION_DATA as fallbackData } from '@/data/solutionsData';

// --- Funció única per carregar totes les dades (s'executa al servidor) ---
async function getSolutionsData() {
  try {
    const res = await fetch('https://digitaistudios.com/api/get-solutions.php');
    if (!res.ok) {
      console.error("Failed to fetch solutions, using fallback data.");
      return fallbackData;
    }
    const data = await res.json();
    return Object.keys(data).length ? data : fallbackData;
  } catch (error) {
    console.error("Error fetching solutions, using fallback data:", error);
    return fallbackData;
  }
}

// --- 1. Generació de les pàgines estàtiques ---
// Li diu a Next.js quines rutes '/solucions/*' ha de construir
export async function generateStaticParams() {
  const allSolutions = await getSolutionsData();
  const paths = Object.keys(allSolutions).map((key) => ({
    categoryKey: key,
  }));
  return paths;
}

// --- 2. Generació del SEO dinàmic per a cada pàgina ---
export async function generateMetadata({ params }) {
  const allSolutions = await getSolutionsData();
  const category = allSolutions[params.categoryKey];

  if (!category) {
    return {
      title: 'Categoria no trobada',
      description: 'La categoria que busques no existeix.',
    };
  }

  const url = `https://digitaistudios.com/solucions/${params.categoryKey}`;

  return {
    title: `${category.name} | Solucions d'IA - DigitAI Studios`,
    description: category.description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: `${category.name} | DigitAI Studios`,
      description: category.description,
      type: 'website',
      url: url,
      images: [{ url: 'https://digitaistudios.com/og-image.png', alt: `${category.name} - Solucions d'IA` }],
    },
    // ... altres metadades
  };
}


// --- 3. Component de la Pàgina (de Servidor) ---
export default async function SolutionsListPage({ params }) {
  const allSolutions = await getSolutionsData();
  const category = allSolutions[params.categoryKey];

  // Si després de carregar les dades, la categoria no existeix, mostrem un error 404
  if (!category) {
    notFound();
  }

  // Passem la categoria específica al component de client
  return <SolutionsListPageClient category={category} />;
}