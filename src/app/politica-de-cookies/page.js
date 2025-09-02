// src/app/politica-de-cookies/page.js

import LegalPageLayout from '@/components/layout/LegalPageLayout';

export const metadata = {
  title: 'Política de Cookies',
  robots: {
    index: false,
    follow: true,
  },
};

export default function CookiePolicyPage() {
  return (
    <LegalPageLayout title="Política de Cookies">
      <h2>1. Què són les Cookies?</h2>
      <p>Una cookie és un petit fitxer de text que un lloc web emmagatzema al teu ordinador o dispositiu mòbil quan el visites. Aquestes permeten que el lloc web recordi les teves accions i preferències.</p>

      <h2>2. Com Utilitzem les Cookies?</h2>
      <p>En aquest lloc web, utilitzem cookies principalment per a finalitats analítiques. Les cookies que utilitzem són:</p>
      
      <table>
          <thead>
              <tr>
                  <th>Proveïdor</th>
                  <th>Nom de la Cookie</th>
                  <th>Finalitat</th>
                  <th>Durada</th>
              </tr>
          </thead>
          <tbody>
              <tr>
                  <td>Google Analytics</td>
                  <td>_ga, _gid, _gat</td>
                  <td>Ens ajuden a entendre com interactuen els visitants amb la nostra pàgina web de manera anònima.</td>
                  <td>Fins a 2 anys</td>
              </tr>
              <tr>
                  <td>DigitAI Studios</td>
                  <td>cookieConsent</td>
                  <td>Recorda la teva decisió sobre l'acceptació de les cookies analítiques.</td>
                  <td>1 any</td>
              </tr>
          </tbody>
      </table>
      <p><strong>Important:</strong> Les cookies de Google Analytics només s'instal·laran si ens dones el teu consentiment explícit.</p>

      <h2>3. Com Pots Controlar les Cookies?</h2>
      <p>Pots controlar i/o eliminar les cookies sempre que vulguis. Per a més informació, consulta <a href="https://www.aboutcookies.org" target="_blank" rel="noopener noreferrer">aboutcookies.org</a>.</p>
      
      <h2>4. Canvis a la Política de Cookies</h2>
      <p>Podem actualitzar la nostra Política de Cookies de tant en tant. Et recomanem que revisis aquesta pàgina periòdicament.</p>
    </LegalPageLayout>
  );
}