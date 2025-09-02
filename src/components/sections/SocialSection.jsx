// src/components/sections/SocialSection.jsx

import React from 'react';
import { Facebook, Linkedin, Instagram } from 'lucide-react';

const SocialSection = () => {
  return (
    <section className="py-20 bg-secondary/50">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-4">Segueix-nos a les Xarxes</h2>
        <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
          Estigues al dia de les últimes novetats en automatització i intel·ligència artificial.
        </p>
        <div className="flex justify-center space-x-8">
          <a href="https://www.linkedin.com/in/digitai-studios-105a0136a/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-muted-foreground hover:text-primary transition-transform duration-300 hover:scale-110">
            <Linkedin className="h-10 w-10" />
          </a>
          <a href="https://www.instagram.com/digitaistudios/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-muted-foreground hover:text-primary transition-transform duration-300 hover:scale-110">
            <Instagram className="h-10 w-10" />
          </a>
          <a href="https://www.facebook.com/profile.php?id=61576974390567" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="text-muted-foreground hover:text-primary transition-transform duration-300 hover:scale-110">
            <Facebook className="h-10 w-10" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default SocialSection;