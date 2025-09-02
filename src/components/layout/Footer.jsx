// src/components/layout/Footer.jsx

import React from 'react';
import { Facebook, Linkedin, Instagram } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import logoImage from '/public/images/logo.png';

const Footer = () => {

  // JA NO NECESSITEM la funció handleScrollTo

  return (
    <footer className="bg-card border-t border-border/50 py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center mb-4">
               <Image src={logoImage} alt="DigitAI Studios Logo" width={48} height={48} className="h-12 w-auto" />
               <span className="ml-2 text-lg font-semibold text-foreground">DigitAI Studios</span>
            </Link>
            <p className="text-muted-foreground text-sm">Automatitzem el futur de les petites empreses.</p>
          </div>

          <div>
            <span className="font-semibold mb-4 block text-foreground">Producte</span>
            <ul className="space-y-2 text-muted-foreground">
              <li><Link href="/#beneficis" className="hover:text-primary transition-colors">Funcionalitats</Link></li>
              <li><Link href="/solucions" className="hover:text-primary transition-colors">Solucions</Link></li>
              <li><Link href="/disseny-web" className="hover:text-primary transition-colors">Disseny Web</Link></li>
            </ul>
          </div>

          <div>
            <span className="font-semibold mb-4 block text-foreground">Empresa</span>
            <ul className="space-y-2 text-muted-foreground">
              <li><Link href="/#contacte" className="hover:text-primary transition-colors">Sobre nosaltres</Link></li>
              <li><a href="#" className="hover:text-primary transition-colors">Blog</a></li>
            </ul>
          </div>
          
          <div>
            <span className="font-semibold mb-4 block text-foreground">Suport</span>
            <ul className="space-y-2 text-muted-foreground mb-6">
              <li>
                <Link href="/#contacte" className="hover:text-primary transition-colors">Contacte</Link>
              </li>
            </ul>
            <div className="flex space-x-4">
              <a href="https://www.linkedin.com/in/digitai-studios-105a0136a/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-muted-foreground hover:text-primary transition-transform duration-300 hover:scale-110">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="https://www.instagram.com/digitaistudios/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-muted-foreground hover:text-primary transition-transform duration-300 hover:scale-110">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="https://www.facebook.com/profile.php?id=61576974390567" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="text-muted-foreground hover:text-primary transition-transform duration-300 hover:scale-110">
                <Facebook className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

       {/* Els enllaços a arxius .html han d'estar a la carpeta 'public' */}
       <div className="border-t border-border/50 mt-12 pt-8 text-center text-sm text-muted-foreground flex flex-col sm:flex-row justify-between items-center">
          <p className="mb-4 sm:mb-0">&copy; {new Date().getFullYear()} DigitAI Studios. Tots els drets reservats.</p>
          <div className="flex space-x-4">
          <div className="flex space-x-4">
              <Link href="/avis-legal" className="hover:text-primary transition-colors">Avís Legal</Link>
              <Link href="/politica-de-privacitat" className="hover:text-primary transition-colors">Política de Privacitat</Link>
              <Link href="/politica-de-cookies" className="hover:text-primary transition-colors">Política de Cookies</Link>
          </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;