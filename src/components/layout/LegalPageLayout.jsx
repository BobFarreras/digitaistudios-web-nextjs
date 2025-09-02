// src/components/layout/LegalPageLayout.jsx

"use client";

import { motion } from '@/lib/motion';

const LegalPageLayout = ({ title, lastUpdated, children }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="pt-32 pb-20 hero-pattern" // Afegim el fons de patró aquí
    >
      <div className="container mx-auto max-w-4xl px-4">
        {/* Contenidor principal que imita l'estil original */}
        <div className="bg-card/90 backdrop-blur-sm border border-border/50 rounded-2xl p-8 md:p-12 shadow-lg">
          <h1 className="text-4xl lg:text-5xl font-extrabold text-center mb-4 gradient-text">
            {title}
          </h1>
          {lastUpdated && (
            <p className="text-center text-sm text-muted-foreground mb-12">
              <strong>Última actualització:</strong> {lastUpdated}
            </p>
          )}
          
          {/* CANVI: Apliquem la nostra nova classe d'estils aquí */}
          <div className="legal-content">
            {children}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default LegalPageLayout;