// src/app/sitemap.js

import { AUTOMATION_DATA as fallbackData } from '@/data/solutionsData';

// NOU: També ho afegim aquí, ja que també és una ruta generada dinàmicament.
export const dynamic = 'force-static';

async function getSolutions() {
  // ... la teva funció es manté igual
  try {
    const res = await fetch('https://digitaistudios.com/api/get-solutions.php');
    if (!res.ok) return fallbackData;
    const data = await res.json();
    return Object.keys(data).length ? data : fallbackData;
  } catch (error) {
    console.error("Failed to fetch solutions for sitemap, using fallback data:", error);
    return fallbackData;
  }
}

export default async function sitemap() {
  const siteUrl = 'https://digitaistudios.com';

  const staticRoutes = [
    '/',
    '/solucions',
    '/disseny-web',
    '/politica-de-privacitat',
    '/politica-de-cookies',
    '/avis-legal',
  ].map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date().toISOString(),
  }));

  const solutionsData = await getSolutions();
  const solutionRoutes = Object.keys(solutionsData).map((categoryKey) => ({
    url: `${siteUrl}/solucions/${categoryKey}`,
    lastModified: new Date().toISOString(),
  }));

  return [...staticRoutes, ...solutionRoutes];
}