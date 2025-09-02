// src/app/robots.js

// NOU: Li diem a Next.js que aquest arxiu SEMPRE ha de ser estàtic.
export const dynamic = 'force-static';

export default function robots() {
  const siteUrl = 'https://digitaistudios.com';

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/'],
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}