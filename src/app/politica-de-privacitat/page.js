// src/app/politica-de-privacitat/page.js

import LegalPageLayout from '@/components/layout/LegalPageLayout';

// SEO específic per a aquesta pàgina
export const metadata = {
  title: 'Política de Privacitat',
  // Molt important per a pàgines legals, per dir-li a Google que no les indexi
  robots: {
    index: false,
    follow: true,
  },
};

export default function PrivacyPolicyPage() {
  return (
    <LegalPageLayout 
      title="Política de Privacitat" 
      lastUpdated="12 d'agost de 2025"
    >
      <h2>1. Responsable del Tractament de Dades</h2>
      <p>El responsable del tractament de les teves dades és <strong>DigitAI Studios.</strong> Per a qualsevol consulta relacionada amb la teva privacitat, pots contactar-nos a través del correu electrònic: <strong>info@digitaistudios.com</strong>.</p>
      
      <h2>2. Quines dades personals recollim i per què?</h2>
      <p>A DigitAI Studios valorem la teva privacitat. Només recollim les dades estrictament necessàries per poder oferir-te els nostres serveis. A continuació, detallem quines dades recollim i amb quina finalitat:</p>
      
      <h4>a) Formulari de Contacte</h4>
      <ul>
          <li><strong>Dades Recopilades:</strong> Nom complet, adreça d'email, nom de l'empresa (opcional) i el missatge que ens envies.</li>
          <li><strong>Finalitat:</strong> Utilitzem aquestes dades exclusivament per gestionar i respondre a la teva consulta, sol·licitud d'informació o proposta de servei.</li>
          <li><strong>Base Legal:</strong> El teu consentiment explícit, que ens dones en marcar la casella i enviar el formulari.</li>
      </ul>

      <h4>b) Chatbot d'Assistència (Digi)</h4>
      <ul>
          <li><strong>Dades Recopilades:</strong> El contingut de les converses que mantens amb el nostre assistent virtual. Podries proporcionar dades com el teu nom o email si ho decideixes durant la conversa.</li>
          <li><strong>Finalitat:</strong> Les converses s'utilitzen per poder respondre a les teves preguntes sobre els nostres serveis. Aquestes interaccions s'envien a l'API de Google (Gemini) per generar una resposta coherent.</li>
          <li><strong>Base Legal:</strong> El nostre interès legítim per oferir un servei d'atenció eficient i el teu consentiment implícit en iniciar i mantenir una conversa amb el chatbot.</li>
      </ul>

      <h2>3. Amb qui compartim les teves dades?</h2>
      <p>Per al funcionament de la nostra web, necessitem la col·laboració de proveïdors de confiança. Les teves dades poden ser tractades per:</p>
      <ul>
          <li><strong>Hostinger:</strong> El nostre proveïdor de hosting, on s'allotja la web i es processen els correus del formulari de contacte.</li>
          <li><strong>Google (Gemini API):</strong> El proveïdor de la tecnologia d'intel·ligència artificial que dóna vida al nostre chatbot.</li>
      </ul>
      <p>Ens assegurem que tots els nostres proveïdors compleixen amb el RGPD. Les transferències de dades amb Google es realitzen sota l'empara de les garanties adequades de protecció de dades.</p>

      <h2>4. Quant de temps conservem les teves dades?</h2>
      <p>Les dades del formulari de contacte i de les converses del chatbot es conservaran durant el temps estrictament necessari per complir amb la finalitat per a la qual van ser recollides.</p>

      <h2>5. Quins són els teus drets?</h2>
      <p>Tens dret a accedir, rectificar, suprimir les teves dades, així com altres drets reconeguts per la normativa. Pots exercir-los enviant un correu electrònic a <strong>info@digitaistudios.com</strong>.</p>
      
      <h2>6. Seguretat de les Dades</h2>
      <p>Hem adoptat les mesures tècniques i organitzatives necessàries per garantir la seguretat de les teves dades personals.</p>
    </LegalPageLayout>
  );
}