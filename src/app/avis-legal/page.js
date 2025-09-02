// src/app/avis-legal/page.js

import LegalPageLayout from '@/components/layout/LegalPageLayout';
import Link from 'next/link';

// SEO específic per a aquesta pàgina
export const metadata = {
  title: 'Avís Legal',
  robots: {
    index: false,
    follow: true,
  },
};

export default function LegalNoticePage() {
  return (
    <LegalPageLayout title="Avís Legal">
      <h2>1. Dades Identificatives del Titular</h2>
      <p>En compliment de la Llei 34/2002, de Serveis de la Societat de la Informació i de Comerç Electrònic (LSSI-CE), s'informa que el titular d'aquest lloc web és:</p>
      <ul>
          <li><strong>Titular:</strong> DigitAI Studios</li>
          <li><strong>NIF/CIF:</strong> **********</li>
          <li><strong>Domicili:</strong> El Morro 54</li>
          <li><strong>Correu Electrònic:</strong> <a href="mailto:info@digitaistudios.com">info@digitaistudios.com</a></li>
      </ul>

      <h2>2. Condicions Generals d'Ús</h2>
      <p>L'accés a aquest lloc web atribueix la condició d'usuari i implica l'acceptació plena i sense reserves de totes i cadascuna de les disposicions incloses en aquest Avís Legal. L'usuari es compromet a utilitzar el lloc web i els seus serveis i continguts de conformitat amb la llei, la moral, els bons costums i l'ordre públic.</p>
      
      <h2>3. Propietat Intel·lectual i Industrial</h2>
      <p>Tots els continguts del lloc web, incloent-hi textos, gràfics, logos, icones i programari, són propietat exclusiva de <strong>DigitAI Studios</strong> o de tercers que n'han autoritzat la inclusió, i estan protegits per les lleis de propietat intel·lectual i industrial.</p>

      <h2>4. Exclusió de Responsabilitat</h2>
      <p>DigitAI Studios no es responsabilitza dels danys i perjudicis que es puguin derivar d'interferències, omissions, interrupcions o virus informàtics aliens al seu control. Així mateix, no es fa responsable del contingut dels llocs web externs als quals es pugui accedir mitjançant enllaços.</p>

      <h2>5. Protecció de Dades i Cookies</h2>
      <p>El tractament de les dades personals i l'ús de cookies en aquest lloc web es regeixen pel que disposen els nostres documents específics, que podeu consultar a:</p>
      <ul>
          {/* CANVI: Usem el component Link de Next.js */}
          <li><Link href="/politica-de-privacitat">Política de Privacitat</Link></li>
          <li><Link href="/politica-de-cookies">Política de Cookies</Link></li>
      </ul>

      <h2>6. Llei Aplicable i Jurisdicció</h2>
      <p>Aquest Avís Legal es regeix per la legislació espanyola. Per a la resolució de qualsevol conflicte que pogués sorgir, les parts se sotmeten als Jutjats i Tribunals de la ciutat de <strong>Girona</strong>.</p>
    </LegalPageLayout>
  );
}