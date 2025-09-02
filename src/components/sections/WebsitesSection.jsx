// src/components/sections/WebsitesSection.jsx

"use client"; // NOU: Necessari per a les animacions de Framer Motion.

import React from 'react';
import { motion} from '@/lib/motion';
import { Button } from '@/components/ui/button';
import { BarChart, Users, Zap } from 'lucide-react';

const WebsitesSection = ({ onOpenDemo }) => {
  return (
    <section id="websites" className="py-20 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Columna de text */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl lg:text-6xl font-bold mb-6">
              Webs que <span className="gradient-text">Treballen per Tu</span>
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              No només dissenyem pàgines web, creem eines intel·ligents per al teu negoci. Les nostres webs estan optimitzades amb IA per analitzar el trànsit, personalitzar l'experiència de l'usuari i captar clients de manera proactiva.
            </p>
            <div className="space-y-4 mb-8">
              <div className="flex items-center"><Zap className="h-6 w-6 text-primary mr-3" /><span>Automatització de tasques integrada.</span></div>
              <div className="flex items-center"><Users className="h-6 w-6 text-primary mr-3" /><span>Experiències personalitzades per a cada visitant.</span></div>
              <div className="flex items-center"><BarChart className="h-6 w-6 text-primary mr-3" /><span>Anàlisi de dades per a la presa de decisions.</span></div>
            </div>
            {/* ... El teu botó comentat ... */}
          </motion.div>
          
          {/* Columna visual (simulació de navegador) */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-card/50 dark:bg-card/80 p-4 rounded-2xl shadow-2xl border border-border/50"
          >
            <div className="flex items-center gap-2 mb-3">
              <span className="w-3 h-3 bg-red-500 rounded-full"></span>
              <span className="w-3 h-3 bg-yellow-500 rounded-full"></span>
              <span className="w-3 h-3 bg-green-500 rounded-full"></span>
            </div>
            <div className="bg-background rounded-lg p-6 aspect-[4/3] flex flex-col justify-center items-center">
              <motion.div
                initial={{ opacity: 0.5, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ repeat: Infinity, repeatType: 'reverse', duration: 2 }}
                className="text-center"
              >
                <BarChart className="h-20 w-20 text-primary mx-auto" />
                <p className="font-semibold mt-4">Analitzant dades en temps real...</p>
                <div className="w-full bg-muted rounded-full h-2.5 mt-4">
                  <div className="bg-primary h-2.5 rounded-full w-[75%]"></div>
                </div>
              </motion.div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default WebsitesSection;