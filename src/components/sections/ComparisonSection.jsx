import React, { useState } from 'react';
import { motion, AnimatePresence } from '@/lib/motion';
import { X, CheckCircle } from 'lucide-react';

// Les dades es mantenen igual per a un codi net
const beforeItems = [
  { icon: X, text: "Tasques manuals repetitives", color: "text-red-500" },
  { icon: X, text: "Errors humans constants", color: "text-red-500" },
  { icon: X, text: "Resposta lenta als clients", color: "text-red-500" },
  { icon: X, text: "Costos operatius alts", color: "text-red-500" },
];

const afterItems = [
  { icon: CheckCircle, text: "Automatització intel·ligent de fluxos", color: "text-green-500" },
  { icon: CheckCircle, text: "Precisió i consistència del 99.9%", color: "text-green-500" },
  { icon: CheckCircle, text: "Atenció al client instantània 24/7", color: "text-green-500" },
  { icon: CheckCircle, text: "Reducció dràstica de costos", color: "text-green-500" },
];

// Component de Targeta Genèric per no repetir codi
const ComparisonCard = ({ title, items, cardColor }) => {
  
  // Variants per a l'animació de la targeta
  const cardVariants = {
    initial: { opacity: 0, y: 30, scale: 0.98 },
    animate: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.4, ease: "easeOut" } },
    exit: { opacity: 0, y: -30, scale: 0.98, transition: { duration: 0.2, ease: "easeIn" } },
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className={`w-full max-w-2xl p-8 rounded-2xl shadow-lg border ${cardColor}`}
    >
      <h3 className="text-3xl font-bold mb-6">{title}</h3>
      <ul className="space-y-4">
        {items.map((item, index) => (
          <li key={index} className="flex items-center text-lg">
            <item.icon className={`h-6 w-6 mr-4 flex-shrink-0 ${item.color}`} />
            <span className="text-muted-foreground">{item.text}</span>
          </li>
        ))}
      </ul>
    </motion.div>
  );
};


// El Component Principal
export default function ComparisonSection()  {
  const [view, setView] = useState('after'); // Comencem mostrant el resultat positiu

  return (
    <section className="py-20 sm:py-28">
      <div className="container mx-auto px-4">
        {/* Títol de la secció */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl lg:text-6xl font-bold mb-6">
            Una transformació <span className="gradient-text">radical</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Deixa enrere les ineficiències. Descobreix el futur de la teva operació amb nosaltres.
          </p>
        </motion.div>
        
        {/* L'Interruptor / Toggle */}
        <div className="flex justify-center mb-12">
          <div className="flex items-center p-1.5 rounded-full bg-gray-100 dark:bg-gray-800 space-x-2">
            <button
              onClick={() => setView('before')}
              className={`px-8 py-3 rounded-full text-lg font-semibold transition-colors ${ // <-- Canvis aquí
                view === 'before' ? 'bg-white dark:bg-gray-900 shadow text-primary' : 'text-muted-foreground hover:text-primary'
              }`}
            >
              Sense DAIS
            </button>
            <button
              onClick={() => setView('after')}
              className={`px-8 py-3 rounded-full text-lg font-semibold transition-colors ${ // <-- Canvis aquí
                view === 'after' ? 'bg-white dark:bg-gray-900 shadow text-primary' : 'text-muted-foreground hover:text-primary'
              }`}
            >
              Amb DAIS
            </button>
          </div>
        </div>

        {/* Àrea de les targetes amb animació */}
        <div className="flex justify-center min-h-[320px]">
          <AnimatePresence mode="wait">
            {view === 'before' ? (
              <ComparisonCard
                key="before"
                title="sense DigitAI Studios"
                items={beforeItems}
                cardColor="bg-red-50/20 border-red-200 dark:bg-red-900/10 dark:border-red-800/50"
              />
            ) : (
              <ComparisonCard
                key="after"
                title="amb DigitAI Studios"
                items={afterItems}
                cardColor="bg-green-50/20 border-green-200 dark:bg-green-900/10 dark:border-green-800/50"
              />
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}