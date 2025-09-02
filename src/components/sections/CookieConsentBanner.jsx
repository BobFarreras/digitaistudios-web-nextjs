// components/CookieConsentBanner.jsx

"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from '@/lib/motion';
import { Cookie, BarChart2, Megaphone, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button'; // Assegura't que la ruta és correcta

const CookieConsentBanner = () => {
    const [showBanner, setShowBanner] = useState(false);
    const [isCustomizing, setIsCustomizing] = useState(false);
    const [preferences, setPreferences] = useState({ analytics: false, marketing: false });

    useEffect(() => {
        const consentCookie = document.cookie.split('; ').find(row => row.startsWith('cookie_consent='));
        if (!consentCookie) {
            const timer = setTimeout(() => {
                setShowBanner(true);
            }, 1500);
            return () => clearTimeout(timer);
        }
    }, []);

    const updateGtagConsent = (prefs) => {
        if (typeof window.gtag !== 'function') {
            console.warn("gtag() no està disponible. Assegura't que l'script de Google Analytics estigui carregat correctament al teu layout.jsx.");
            return;
        }
        window.gtag('consent', 'update', {
            'analytics_storage': prefs.analytics ? 'granted' : 'denied',
            'ad_storage': prefs.marketing ? 'granted' : 'denied'
        });
    };

    const handleConsent = (type) => {
        let finalPreferences;
        if (type === 'accept') finalPreferences = { necessary: true, analytics: true, marketing: true };
        else if (type === 'reject') finalPreferences = { necessary: true, analytics: false, marketing: false };
        else finalPreferences = { necessary: true, ...preferences };
        
        setShowBanner(false);
        document.cookie = `cookie_consent=${JSON.stringify(finalPreferences)}; max-age=31536000; path=/; SameSite=Lax`;
        updateGtagConsent(finalPreferences);
    };

    const togglePreference = (key) => setPreferences(prev => ({ ...prev, [key]: !prev[key] }));

    if (!showBanner) return null;

    return (
        <AnimatePresence>
            <motion.div 
                initial={{ y: "100%", opacity: 0 }} 
                animate={{ y: 0, opacity: 1 }} 
                exit={{ y: "100%", opacity: 0 }} 
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }} 
                className="fixed bottom-0 left-0 right-0 z-[100] p-4"
            >
                <div className="container mx-auto max-w-6xl p-6 rounded-2xl shadow-2xl bg-background/80 backdrop-blur-xl border border-border/50">
                    <AnimatePresence mode="wait">
                        {!isCustomizing ? (
                            <motion.div key="main" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                                <div className="flex items-center gap-4 mb-4">
                                    <Cookie className="h-8 w-8 text-primary flex-shrink-0" />
                                    <h3 className="text-lg font-semibold text-foreground">Aquesta web fa servir galetes (cookies)</h3>
                                </div>
                                <p className="text-muted-foreground text-sm mb-6">Utilitzem cookies pròpies i de tercers per millorar la teva experiència, analitzar el tràfic i personalitzar anuncis. El teu control sobre la teva privacitat és la nostra prioritat.</p>
                                <div className="flex flex-col sm:flex-row gap-3">
                                    <Button onClick={() => handleConsent('accept')} size="lg" className="w-full sm:w-auto flex-1 bg-primary text-primary-foreground hover:bg-primary/80 shadow-lg hover:shadow-primary/30">Acceptar Totes</Button>
                                    <Button onClick={() => setIsCustomizing(true)} size="lg" variant="outline" className="w-full sm:w-auto">Personalitzar</Button>
                                    <Button onClick={() => handleConsent('reject')} size="lg" variant="ghost" className="w-full sm:w-auto">Rebutjar</Button>
                                </div>
                            </motion.div>
                        ) : (
                            <motion.div key="customize" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                                <h4 className="text-md font-semibold mb-4 text-foreground">Gestiona les teves preferències</h4>
                                <div className="space-y-4">
                                    {/* ... JSX per a les preferències de cookies ... */}
                                </div>
                                <div className="flex flex-col sm:flex-row gap-3 mt-6">
                                    <Button onClick={() => handleConsent('customize')} size="lg" className="w-full sm:w-auto flex-1">Desar preferències</Button>
                                    <Button onClick={() => setIsCustomizing(false)} size="lg" variant="ghost" className="w-full sm:w-auto">Enrere</Button>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </motion.div>
        </AnimatePresence>
    );
};

export default CookieConsentBanner;