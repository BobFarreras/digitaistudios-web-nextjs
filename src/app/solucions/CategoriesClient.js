// src/app/solucions/CategoriesClient.js

"use client";

import { motion} from '@/lib/motion';
import Link from 'next/link';
// NOU: Importem totes les icones que necessitem aquí
import { 
  MessageSquare, Share2, GraduationCap, Briefcase, Handshake, Bot, FolderInput, BarChart3, 
  BrainCircuit, Mail, Database, Sparkles, Send, CalendarClock, Filter, ClipboardCheck, 
  BellRing, Youtube, FileText, Camera, Video, Mic, Languages, Puzzle, Album, VenetianMask,
  Ticket,BotMessageSquare, FileCode2, Sheet, Presentation, BookCopy, Facebook, Instagram
} from 'lucide-react';

// NOU: L'iconMap ara viu dins del component de client
export const iconMap = {
  MessageSquare, Share2, GraduationCap, Briefcase, Handshake, Bot, FolderInput, BarChart3, 
  BrainCircuit, Mail, Database, Sparkles, Send, CalendarClock, Filter, ClipboardCheck, 
  BellRing, Youtube, FileText, Camera, Video, Mic, Languages, Puzzle, Album, VenetianMask,
  Ticket, BotMessageSquare, FileCode2, Sheet, Presentation, BookCopy, Facebook, Instagram 
};

export default function CategoriesClient({ categories }) {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {categories.map(([key, category], i) => {
        // La lògica de traducció funciona igual, però ara és segura
        const Icon = iconMap[category.icon] || Bot;
        return (
          <motion.div 
            key={key} 
            initial={{opacity:0, y:50}} 
            whileInView={{opacity:1, y:0}} 
            viewport={{once: true}} 
            transition={{delay: i * 0.1}}
          >
            <Link href={`/solucions/${key}`} className="block h-full">
              <div className="solution-card-futuristic p-8 rounded-3xl h-full flex flex-col text-center items-center justify-center transform hover:-translate-y-2 transition-transform duration-300">
                <div className="w-20 h-20 bg-primary/20 text-primary rounded-full flex items-center justify-center mb-6">
                  {Icon && <Icon className="w-10 h-10"/>}
                </div>
                <h2 className="text-2xl font-bold mb-3">{category.name}</h2>
                <p className="text-muted-foreground flex-grow">{category.description}</p>
              </div>
            </Link>
          </motion.div>
        );
      })}
    </div>
  );
}