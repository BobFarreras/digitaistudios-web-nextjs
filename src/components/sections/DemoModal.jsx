"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from '@/lib/motion';
import { Radar } from 'react-chartjs-2';
import { Chart as ChartJS, RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend } from 'chart.js';
import ReactMarkdown from 'react-markdown';

// Assumint que aquests components venen de la teva UI library (ex: Shadcn) i lucide-react
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Bot, X, Search, Loader2, Star, TrendingUp, Zap, ShieldCheck, Lightbulb, Send, Cpu } from 'lucide-react';

// Registrem els components de Chart.js
ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);


// Registrem els components de Chart.js
ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

const WelcomeView = ({ url, setUrl, handleSubmit, isLoading }) => (
    <motion.div key="welcome" exit={{ opacity: 0 }} className="flex-1 flex flex-col justify-center items-center p-8 text-center">
        <Bot className="h-16 w-16 text-primary mb-6" />
        <h2 className="text-3xl font-bold mb-2">Analitza la teva Web amb IA</h2>
        <p className="text-muted-foreground mb-8 max-w-lg">
            Introdueix la URL de la teva empresa per rebre un anàlisi instantani i un pla d'acció personalitzat.
        </p>
        <form onSubmit={handleSubmit} className="w-full max-w-md flex gap-2">
            <input
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="elteudomini.com" 
                className="flex-1 px-4 py-2 rounded-lg border border-input bg-background/50 focus:ring-2 focus:ring-primary"
                autoFocus
                disabled={isLoading}
            />
            <Button type="submit" className="h-10 w-10 flex-shrink-0 gradient-bg text-white" disabled={!url || isLoading}>
                <Search className="h-5 w-5" />
            </Button>
        </form>
    </motion.div>
);

const LoadingView = () => (
    <motion.div key="loading" exit={{ opacity: 0 }} className="flex-1 flex flex-col justify-center items-center p-8 text-center">
        <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
        <h2 className="text-2xl font-bold">Analitzant...</h2>
        <p className="text-muted-foreground mt-2">Això pot trigar uns segons.</p>
    </motion.div>
);


const CtaSection = ({ analysisResult, url, onReset }) => {
    const [showEmailInput, setShowEmailInput] = useState(false);
    const [email, setEmail] = useState('');
    const [isSendingDemo, setIsSendingDemo] = useState(false);
    const [emailSent, setEmailSent] = useState(false);
    const { toast } = useToast();

    const handleSendDemo = async () => {
        if (!email || !/\S+@\S+\.\S+/.test(email)) {
            toast({ title: "⚠️ Correu invàlid", description: "Si us plau, introdueix un correu electrònic vàlid." });
            return;
        }
        setIsSendingDemo(true);
    
        // Dades que enviarem al nostre nou script PHP
        const payload = {
            type: 'demo_request', // Li diem al PHP quin tipus de correu volem
            data: {
                email: email, // El correu de l'usuari a qui enviarem l'informe
                url: url,
                analysisResult: analysisResult // Enviem tot l'objecte de l'anàlisi
            }
        };
    
        try {
            const response = await fetch('https://digitaistudios.com/api/send_email.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });
    
            const result = await response.json();
    
            if (!response.ok) {
                throw new Error(result.error || 'Hi ha hagut un error desconegut.');
            }
    
            setEmailSent(true);
            toast({ title: "✅ Informe enviat!", description: "Rebràs el teu pla d'acció personalitzat al teu email aviat." });
    
        } catch (error) {
            console.error('Error enviant l\'informe:', error);
            toast({
                title: "❌ Error",
                description: error.message || "No s'ha pogut enviar l'email. Prova-ho més tard.",
                variant: "destructive",
            });
        } finally {
            setIsSendingDemo(false);
        }
    };

    return (
        <section className="text-center pt-16 md:pt-20">
            <div className="bg-card p-8 rounded-2xl shadow-lg border border-border">
                <p className="font-semibold text-xl mb-4">Impressionat? Rep aquest informe detallat.</p>
                {!emailSent ? (
                    <AnimatePresence mode="wait">
                        {!showEmailInput ? (
                            <motion.div key="show-button" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                                <Button onClick={() => setShowEmailInput(true)} className="gradient-bg bg-blue-600 text-white text-lg px-8 py-3">Vull rebre l'informe</Button>
                            </motion.div>
                        ) : (
                            <motion.div key="email-form" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="flex justify-center items-center gap-2 flex-wrap" onClick={(e) => e.preventDefault()}>
                                <input type="email" placeholder="El teu correu electrònic" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full sm:w-auto flex-grow max-w-xs px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:ring-2 focus:ring-blue-500" disabled={isSendingDemo} />
                                <Button onClick={handleSendDemo} className="bg-green-600 hover:bg-green-700 text-white px-6 py-2" disabled={isSendingDemo}>
                                    {isSendingDemo ? <Loader2 className="animate-spin" /> : 'Enviar'}
                                </Button>
                            </motion.div>
                        )}
                    </AnimatePresence>
                ) : (
                    <p className="text-green-500 font-bold">✅ Informe enviat! Revisa la teva bústia.</p>
                )}
            </div>
            
        </section>
    );
}
// Aquesta és la versió completa del component de resultats
const RadicalAnalysisResult = ({ result, onBack }) => {
    const { toast } = useToast();
    const [isSending, setIsSending] = useState(false);
    const [email, setEmail] = useState('');
    const [emailSent, setEmailSent] = useState(false);

    const handleSendReport = async (e) => {
        e.preventDefault();
        if (!email || !/\S+@\S+\.\S+/.test(email)) {
            toast({ title: "⚠️ Correu invàlid", description: "Si us plau, introdueix un correu electrònic vàlid." });
            return;
        }
        setIsSending(true);
        try {
            const response = await fetch('https://digitaistudios.com/api/send_email.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    type: 'demo_request',
                    data: { email, url: result.url, analysisResult: result }
                }),
            });
            const resData = await response.json();
            if (!response.ok) throw new Error(resData.error || 'Error desconegut.');
            setEmailSent(true);
            toast({ title: "✅ Informe enviat!", description: "Rebràs el teu pla d'acció al teu email aviat." });
        } catch (error) {
            toast({ title: "❌ Error", description: error.message, variant: "destructive" });
        } finally {
            setIsSending(false);
        }
    };
    
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } }
    };

    return (
        <div className="w-full h-full bg-transparent text-white overflow-y-auto p-4 sm:p-8 relative">
            <div className="w-full max-w-5xl mx-auto flex flex-col gap-8 sm:gap-10 relative z-10">
                <motion.header
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center"
                >
                    <button onClick={onBack} className="flex items-center gap-2 text-sm text-slate-400 hover:text-cyan-400 transition-colors mb-4 mx-auto">
                        <ArrowLeft className="h-4 w-4" /> REINICIAR ANÀLISI
                    </button>
                    <h1 className="text-4xl md:text-5xl font-black text-cyan-300 tracking-widest uppercase">
                        Anàlisi Completada
                    </h1>
                    <p className="text-lg text-slate-300">Objectiu: <span className="font-bold text-white">{result.company_name}</span></p>
                </motion.header>

                <motion.div variants={containerVariants} initial="hidden" animate="visible">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
                        <MetricPod icon={Search} label="SEO" score={result.stats.seo_score} delay={0.2} />
                        <MetricPod icon={Zap} label="Rendiment" score={result.stats.performance_score} delay={0.3} />
                        <MetricPod icon={ShieldCheck} label="Accessibilitat" score={result.stats.accessibility_score} delay={0.4} />
                        <MetricPod icon={Cpu} label="Potencial IA" score={result.stats.automation_potential} delay={0.5} />
                    </div>
                </motion.div>

                {/* La resta del JSX de RadicalAnalysisResult aquí... */}
                {result.google_rating && (
                     <motion.div /* ... */ >
                        {/* ... Google Rating JSX ... */}
                     </motion.div>
                )}

                <motion.div /* ... */ >
                    <h3 className="text-cyan-400 text-lg mb-4">[DIRECTIVES DE MILLORA]</h3>
                    <div className="space-y-4">
                        {(result.improvement_points || []).map((point, index) => (
                           <div key={index} /* ... */ >
                                {/* ... Improvement Point JSX ... */}
                           </div>
                        ))}
                    </div>
                </motion.div>
                
                {result.social_media_post && result.screenshotUrl && (
                     <motion.div /* ... */ >
                         {/* ... Social Media Post JSX ... */}
                     </motion.div>
                )}
                
                <motion.div /* ... */ className="bg-slate-800/50 border border-slate-700 rounded-lg p-6 text-center">
                    <AnimatePresence mode="wait">
                        {!emailSent ? (
                            <motion.div key="form" /* ... */ >
                                <h4 className="font-bold text-lg text-white">Rep l'informe complet</h4>
                                <p className="text-slate-400 text-sm mt-1 mb-4">Aquest és un resum. El pla d'acció detallat s'envia per correu.</p>
                                <form onSubmit={handleSendReport} className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
                                    <input type="email" placeholder="El teu correu electrònic" value={email} onChange={(e) => setEmail(e.target.value)} disabled={isSending} required className="flex-grow ..."/>
                                    <Button type="submit" disabled={isSending}>
                                        {isSending ? <Loader2 className="animate-spin" /> : <Send />}
                                        <span>{isSending ? 'Enviant...' : 'Enviar'}</span>
                                    </Button>
                                </form>
                            </motion.div>
                        ) : (
                            <motion.div key="sent" /* ... */ >
                                 <p className="font-bold text-green-400 text-xl">✅ Informe Enviat!</p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>
            </div>
        </div>
    );
};

const DemoModal = ({ isOpen, onClose }) => {
    const [view, setView] = useState('welcome'); // 'welcome', 'loading', 'results'
    const [url, setUrl] = useState('');
    const [analysisResult, setAnalysisResult] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const { toast } = useToast();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isLoading || !url) return;
        
        let normalizedUrl = url.trim();
        if (!normalizedUrl.startsWith('http')) {
            normalizedUrl = `https://${normalizedUrl}`;
        }
        
        setView('loading');
        setIsLoading(true);
        
        try {
            const response = await fetch("https://digitaistudios.com/api/analyze.php", {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ url: normalizedUrl })
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({ error: 'Error de servidor.' }));
                throw new Error(errorData.error || 'Hi ha hagut un error en l\'anàlisi.');
            }

            const result = await response.json();
            setAnalysisResult({ ...result, url: normalizedUrl });
            setView('results');

        } catch (err) {
            setView('welcome');
            toast({ title: "❌ Error en l'Anàlisi", description: err.message, variant: "destructive" });
        } finally {
            setIsLoading(false);
        }
    };

    const handleReset = () => {
        setUrl('');
        setAnalysisResult(null);
        setView('welcome');
    };

    useEffect(() => {
        if (!isOpen) {
            setTimeout(handleReset, 300); // Reset al tancar
        }
    }, [isOpen]);

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-0 sm:p-4" onClick={onClose}>
                    <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ opacity: 1, scale: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="relative w-full h-full sm:h-auto sm:max-h-[90vh] max-w-5xl bg-background sm:rounded-2xl shadow-2xl overflow-hidden flex flex-col" onClick={(e) => e.stopPropagation()}>
                        <Button onClick={onClose} variant="ghost" size="icon" className="absolute top-3 right-3 z-50 h-8 w-8 rounded-full"><X className="h-4 w-4" /></Button>
                        <AnimatePresence mode="wait">
                            {view === 'welcome' && (
                                <WelcomeView 
                                    url={url} 
                                    setUrl={setUrl} 
                                    handleSubmit={handleSubmit}
                                    isLoading={isLoading}
                                />
                            )}
                            {view === 'loading' && <LoadingView />}
                            {view === 'results' && analysisResult && (
                                <motion.div key="results" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex-1 overflow-y-auto">
                                    <ResultsView analysisResult={analysisResult} onReset={handleReset} />
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default DemoModal;