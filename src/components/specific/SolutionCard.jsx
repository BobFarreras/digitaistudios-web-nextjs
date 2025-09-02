// src/components/specific/SolutionCard.jsx
"use client";

import React from 'react';
import { motion, AnimatePresence } from '@/lib/motion';
import Link from 'next/link'; // NOU: Importem el Link de Next.js
import VideoPlayer from './VideoPlayer';
import { Button } from '@/components/ui/button';
import { iconMap } from '@/utils/iconMap'; // NOU: Importem el nostre mapa centralitzat
import { Users, PlayCircle, ArrowDown } from 'lucide-react';

const TechnologyBadge = ({ tech }) => {
  // Aquesta funció retorna les classes CSS correctes per a cada tecnologia
  const getTechStyles = (techName) => {
    switch (techName) {
      case 'OpenAI': return 'bg-teal-100 text-teal-800 ring-teal-200 dark:bg-teal-900/50 dark:text-teal-300 dark:ring-teal-400/40';
      case 'Google Drive': case 'Google Slides': return 'bg-yellow-100 text-yellow-800 ring-yellow-200 dark:bg-yellow-900/50 dark:text-yellow-300 dark:ring-yellow-400/40';
      case 'Gmail': case 'PDF.co': case 'Redis': case 'YouTube': return 'bg-red-100 text-red-800 ring-red-200 dark:bg-red-900/50 dark:text-red-300 dark:ring-red-400/40';
      case 'n8n': case 'Make': return 'bg-purple-100 text-purple-800 ring-purple-200 dark:bg-purple-900/50 dark:text-purple-300 dark:ring-purple-400/40';
      case 'WhatsApp': case 'Google Sheets': case 'Supabase': return 'bg-green-100 text-green-800 ring-green-200 dark:bg-green-900/50 dark:text-green-300 dark:ring-green-400/40';
      case 'PostgreSQL': case 'Telegram': return 'bg-sky-100 text-sky-800 ring-sky-200 dark:bg-sky-900/50 dark:text-sky-300 dark:ring-sky-400/40';
      case 'Airtable': case 'Facebook': case 'Zoom': return 'bg-blue-100 text-blue-800 ring-blue-200 dark:bg-blue-900/50 dark:text-blue-300 dark:ring-blue-400/40';
      case 'Instagram': return 'bg-pink-100 text-pink-800 ring-pink-200 dark:bg-pink-900/50 dark:text-pink-300 dark:ring-pink-400/40';
      case 'HeyGen': case 'Discord': return 'bg-indigo-100 text-indigo-800 ring-indigo-200 dark:bg-indigo-900/50 dark:text-indigo-300 dark:ring-indigo-400/40';
      case 'Claude': case 'DOGC API': return 'bg-amber-100 text-amber-800 ring-amber-200 dark:bg-amber-900/50 dark:text-amber-300 dark:ring-amber-400/40';
      default: return 'bg-slate-100 text-slate-800 ring-slate-200 dark:bg-slate-700 dark:text-slate-300 dark:ring-slate-600';
    }
  };

 

 // Ara utilitzem l'iconMap centralitzat
 const IconComponent = iconMap[tech] || Users;
 const styleClasses = getTechStyles(tech);

 return (
   <div className={`flex items-center text-sm font-medium px-3 py-1.5 rounded-full ring-1 ring-inset ${styleClasses}`}>
     {IconComponent && <IconComponent className="h-4 w-4 mr-1.5" />}
     <span>{tech}</span>
   </div>
 );
};

const SolutionCard = ({ solution, isExpanded, onExpand, index }) => {
  const isEven = index % 2 === 0;
  const steps = Array.isArray(solution.steps) ? solution.steps : [];

  return (
    <motion.div
      layout
      transition={{ duration: 0.6, ease: [0.43, 0.13, 0.23, 0.96] }}
      className="solution-card-futuristic rounded-3xl overflow-hidden cursor-pointer flex flex-col h-full"
      onClick={onExpand}
    >
      <div className="p-8 grid lg:grid-cols-2 gap-8 items-center flex-grow">
        <div className={`flex flex-col h-full justify-center ${isEven ? '' : 'lg:order-last'}`}>
          <div>
            <h2 className="text-3xl font-bold mb-3 gradient-text">{solution.title}</h2>
            <p className="text-muted-foreground mb-6 text-lg">{solution.description}</p>
          </div>
          <div className="flex flex-wrap gap-3 mt-4">
            {solution.technologies && solution.technologies.map(tech => <TechnologyBadge key={tech} tech={tech} />)}
          </div>
        </div>
        <div className="relative aspect-video">
          <AnimatePresence>
            {!isExpanded && (
              <motion.div key="preview" className="absolute inset-0">
                   <img src={solution.previewImage} alt={`Previsualització de ${solution.title}`} className="w-full h-full object-cover rounded-2xl" />
                   <div className="absolute inset-0 bg-black/40 rounded-2xl flex items-center justify-center">
                       <PlayCircle className="w-20 h-20 text-white/70 transform transition-transform hover:scale-110" />
                   </div>
              </motion.div>
            )}
          </AnimatePresence>
          {isExpanded && <VideoPlayer src={solution.videoUrl} isMuted={false} />}
        </div>
      </div>
      
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            key="details"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="px-8 pb-8" // Augmentat el padding
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-2xl font-bold mb-10 mt-4 border-t border-white/10 pt-8">Flux de l'Automatització:</h3>
            
            <div className="flex flex-col md:flex-row items-stretch justify-center w-full">
              {steps.map((step, stepIndex) => {
                const StepIcon = iconMap[step.icon] || Users;
                return (
                  <React.Fragment key={stepIndex}>
                    <div className="flex flex-col items-center text-center w-full max-w-xs md:w-1/4 px-2">
                        <div className="w-20 h-20 bg-primary/20 text-primary rounded-full flex items-center justify-center border-2 border-primary/50">
                            {StepIcon && <StepIcon className="w-10 h-10" />}
                        </div>
                        <h4 className="font-bold text-lg mt-5 mb-2">{step.title}</h4>
                        <p className="text-muted-foreground text-base">{step.description}</p>
                    </div>
                    {stepIndex < steps.length - 1 && (
                      <>
                        <div className="flex-shrink-0 w-full flex justify-center md:hidden my-4"><ArrowDown className="w-8 h-8 text-primary/30" /></div>
                        <div className="hidden md:flex flex-grow items-center justify-center"><div className="w-full h-px bg-primary/30"></div></div>
                      </>
                    )}
                  </React.Fragment>
                );
              })}
            </div>

            {/* NOU: Botó de 'Call to Action' */}
            <div className="text-center mt-12 pt-8 border-t border-white/10">
                <Link href="/#contacte">
                    <Button size="lg" className="text-lg px-8 py-6 gradient-bg text-primary-foreground transform hover:scale-105 transition-transform">
                        M'interessa, vull contactar
                    </Button>
                </Link>
            </div>
            
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default SolutionCard;