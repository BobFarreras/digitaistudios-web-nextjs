// src/app/RootLayoutClient.js

"use client";

import { useState, useEffect } from 'react';
import { Inter } from 'next/font/google';

// Components comuns
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Toaster } from '@/components/ui/toaster';
import Chatbot from '@/components/layout/Chatbot';
import ScrollToTop from '@/components/ScrollToTop';
import Script from 'next/script'; // <-- AFEGEIX AQUESTA LÍNIA

const inter = Inter({ subsets: ['latin'] });

export default function RootLayoutClient({ children }) {
  const [darkMode, setDarkMode] = useState(false);

  // Lògica per gestionar el dark mode
  useEffect(() => {
    // S'executa només al navegador
    const isDark = localStorage.getItem('darkMode') === 'true' || 
                   (!localStorage.getItem('darkMode') && window.matchMedia('(prefers-color-scheme: dark)').matches);
    setDarkMode(isDark);
    document.documentElement.classList.toggle('dark', isDark);
  }, []);

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem('darkMode', newDarkMode.toString());
    document.documentElement.classList.toggle('dark', newDarkMode);
  };

  return (
    <html lang="ca" className={darkMode ? 'dark' : ''}>
      <body className={`${inter.className} min-h-screen bg-background text-foreground overflow-x-hidden`}>
        
        {/* === NOU: INTEGRACIÓ DE GOOGLE TAG MANAGER === */}
        {/* Script 1: Configuració inicial del Consent Mode */}
        <Script id="gtm-consent-init" strategy="beforeInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){ dataLayer.push(arguments); }
            gtag('consent', 'default', { 'ad_storage':'denied', 'analytics_storage':'denied' });
            
            window.__digitaiConsentUpdate = function(opts){
              gtag('consent','update',{
                'analytics_storage': opts.analytics ? 'granted' : 'denied',
                'ad_storage': opts.ads ? 'granted' : 'denied'
              });
            };
            
            window.addEventListener('digitai-consent', e => window.__digitaiConsentUpdate(e.detail || {}));
          `}
        </Script>

        {/* Script 2: Càrrega principal de Google Tag Manager */}
        <Script
          id="gtm-main"
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-3360TCW98C"
        />
        <Script id="gtm-config" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-3360TCW98C', { allow_google_signals: false });
          `}
        </Script>
        <Toaster />
        <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
        
        <main>
          <ScrollToTop /> 
          {children}
        </main>
        
        <Footer />
        <Chatbot />
      </body>
    </html>
  );
}