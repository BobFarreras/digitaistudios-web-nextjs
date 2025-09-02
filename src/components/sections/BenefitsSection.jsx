// src/components/sections/BenefitsSection.jsx

"use client"; // NOU: Necessari per a les animacions de Framer Motion.

import React from 'react';
import { motion} from '@/lib/motion';
import { Clock, TrendingUp, Zap, Target, Share2, BrainCircuit } from 'lucide-react';

const benefits = [
  // ... (l'array de beneficis es manté exactament igual)
  {
    icon: Clock,
    title: 'Estalvi de temps',
    description: 'Automatitza tasques repetitives i allibera fins a 40 hores setmanals per centrar-te en el que realment importa.'
  },
  {
    icon: TrendingUp,
    title: 'Millora de productivitat',
    description: 'Incrementa l\'eficiència del teu equip fins a un 300% amb processos intel·ligents i optimitzats.'
  },
  {
    icon: Zap,
    title: 'Respostes instantànies',
    description: 'Chatbots intel·ligents que responen als teus clients 24/7 amb precisió i personalització.'
  },
  {
    icon: Target,
    title: 'Adaptació intel·ligent',
    description: 'La nostra IA aprèn de les necessitats específiques del teu negoci i s\'adapta automàticament.'
  },
  {
    icon: Share2,
    title: 'Gestió automàtica de RRSS',
    description: 'Programa i publica contingut a les teves xarxes socials de forma intel·ligent, estalviant hores de feina.'
  },
  {
    icon: BrainCircuit,
    title: 'Anàlisi Predictiva de Dades',
    description: 'Anticipa tendències del mercat i comportaments dels clients per prendre decisions estratègiques basades en dades.'
  }
];

const BenefitsSection = () => {
  return (
    <section id="beneficis" className="py-20">
      <div className="container mx-auto px-4">
        {/* La resta del component es manté exactament igual. */}
        {/* El teu ús de 'motion' i 'whileInView' ja és perfecte. */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-6xl font-bold mb-6">
            Beneficis de l'<span className="gradient-text">automatització amb IA</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Descobreix com la nostra tecnologia pot revolucionar la manera de treballar 
            de la teva empresa i portar-la al següent nivell.
          </p>
        </motion.div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -10, boxShadow: "0 20px 40px hsla(var(--primary)/0.2)" }}
              className="text-center group p-6 rounded-2xl glass-effect transition-all duration-300"
            >
              <div className="benefit-icon group-hover:pulse-glow transition-all duration-300">
                <benefit.icon className="h-10 w-10 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-4">{benefit.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{benefit.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;