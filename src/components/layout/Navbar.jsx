// components/layout/Navbar.jsx

"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from '@/lib/motion';
import { Moon, Sun, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';
import logoImage from '/public/images/logo.png';

const Navbar = ({ darkMode, toggleDarkMode }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: '/', label: 'Inici' },
    { href: '/solucions', label: 'Solucions' },
    { href: '/disseny-web', label: 'Disseny Web' },
    { href: '/#beneficis', label: 'Beneficis' },
    { href: '/#testimonis', label: 'Testimonis' },
    { href: '/#contacte', label: 'Contacte' },
  ];

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="fixed top-0 w-full z-50 glass-effect"
    >
      <div className="container mx-auto px-4 py-3 flex justify-between items-center relative">
        
        {/* === SECCIÓ DEL LOGO ACTUALITZADA === */}
        <Link href="/" className="relative z-10">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            whileHover={{ scale: 1.05, rotate: -2 }}
            whileTap={{ scale: 0.95 }}
            // NOU: Contenidor més gran per a l'animació
            className="relative group w-60 h-12 flex items-center justify-center"
          >
            <Image 
              src={logoImage} 
              alt="DigitAI Studios Logo"
              width={200} // Augmentem la resolució base
              height={50}
              priority
              // CANVI: Classes de l'antic projecte per a mida i efecte
              className="absolute h-14 w-auto transition-all duration-300 group-hover:drop-shadow-[0_0_10px_hsl(var(--primary)/0.6)] pointer-events-none"
            />
          </motion.div>
        </Link>
        {/* === FI DE LA SECCIÓ DEL LOGO === */}
        
        <div className="hidden md:flex space-x-8 items-center">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="hover:text-primary font-medium"
            >
              {link.label}
            </Link>
          ))}
        </div>
        
        <div className="flex items-center space-x-2 sm:space-x-4">
            <Button
                variant="ghost"
                size="icon"
                onClick={toggleDarkMode}
                className="rounded-full hover:bg-primary/10"
                aria-label={darkMode ? "Activar mode clar" : "Activar mode fosc"}
            >
                {darkMode ? <Sun className="h-5 w-5 sm:h-6 sm:w-6" /> : <Moon className="h-5 w-5 sm:h-6 sm:w-6" />}
            </Button>
            <Button
                variant="ghost"
                size="icon"
                className="md:hidden hover:bg-primary/10"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Obrir menú de navegació"
            >
                <Menu className="h-5 w-5 sm:h-6 sm:w-6" />
            </Button>
        </div>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="md:hidden bg-background/95 backdrop-blur-sm border-t">
            <div className="container mx-auto px-4 py-4 space-y-4">
              {navLinks.map((link) => (
                 <Link
                   key={link.label}
                   href={link.href}
                   className="block py-2 w-full text-left"
                   onClick={() => setMobileMenuOpen(false)}
                 >
                   {link.label}
                 </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;