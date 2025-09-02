// src/app/solucions/[categoryKey]/SolutionsListPageClient.js

"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from '@/lib/motion';
import Link from 'next/link';
import { iconMap } from '@/utils/solutionUtils';
import SolutionCard from '@/components/specific/SolutionCard';
import { ArrowLeft, Bot } from 'lucide-react';

export default function SolutionsListPageClient({ category }) {
  // L'únic estat que necessitem aquí és per a la interactivitat de l'acordió.
  // NO necessitem isLoading, error, o category, ja que ens arriben directament.
  const [expandedIndex, setExpandedIndex] = useState(null);

  const handleCardClick = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  const IconComponent = iconMap[category.icon] || Bot;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="pt-16 pb-20">
      <div className="container mx-auto px-4 py-4">
        <div className="mb-16">
          
          <Link 
            href="/solucions" 
            className="group inline-flex items-center text-sm font-semibold text-muted-foreground transition-all duration-300 ease-in-out mt-8 px-4 py-2 bg-secondary/50 dark:bg-background/50 backdrop-blur-sm border border-border/50 rounded-full hover:border-primary/50 hover:text-foreground hover:shadow-lg hover:shadow-primary/20"
          >
            <ArrowLeft className="w-4 h-4 mr-2 transition-transform duration-300 ease-in-out group-hover:-translate-x-1" />
            Tornar a totes les categories
          </Link>

          <div className="text-center mt-8">
            {IconComponent && <IconComponent className="w-16 h-16 text-primary mx-auto mb-4" />}
            <h1 className="text-4xl lg:text-6xl font-bold mb-4">{category.name}</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">{category.description}</p>
          </div>
        </div>
        
        <div className="grid lg:grid-cols-1 gap-12">
          {category.solutions && category.solutions.map((solution, index) => (
            <SolutionCard
              key={index}
              index={index}
              solution={solution}
              isExpanded={expandedIndex === index}
              onExpand={() => handleCardClick(index)}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
};