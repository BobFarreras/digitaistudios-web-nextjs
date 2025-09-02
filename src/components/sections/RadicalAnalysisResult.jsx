import React from 'react';
import { motion, AnimatePresence } from '@/lib/motion';
import CountUp from 'react-countup';
import { Search, Zap, ShieldCheck, Cpu, ArrowLeft, Send, Loader2, Bot, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';

// --- Component per a cada mètrica ---
const MetricPod = ({ icon: Icon, label, score, delay }) => (
    <motion.div
        variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }}
        transition={{ delay, duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
        className="relative bg-black/20 border border-cyan-400/20 rounded-xl p-4 text-center backdrop-blur-sm transition-all duration-300 hover:bg-cyan-400/10 hover:border-cyan-400/50"
    >
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(0,194,255,0.2),transparent)] opacity-75"></div>
        <Icon className="w-8 h-8 mx-auto mb-3 text-cyan-400" />
        <p className="text-sm font-medium text-slate-300 uppercase tracking-wider">{label}</p>
        <p className="text-5xl font-black text-white" style={{fontFamily: "'Orbitron', sans-serif"}}>
            <CountUp end={score} duration={2.5} delay={delay + 0.5} />%
        </p>
    </motion.div>
);

// --- Component principal del resultat ---
const RadicalAnalysisResult = ({ result, onBack, onSendReport, isSending, email, setEmail, emailSent }) => {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.3 } }
    };

    return (
        <div className="w-full h-full bg-transparent text-white overflow-y-auto p-4 sm:p-8 relative">
            <motion.div
                className="w-full max-w-5xl mx-auto flex flex-col gap-8 sm:gap-10 relative z-10"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                <motion.header
                    variants={{ hidden: { opacity: 0, y: -30 }, visible: { opacity: 1, y: 0 } }}
                    className="text-center"
                >
                    <button onClick={onBack} className="flex items-center gap-2 text-sm text-slate-400 hover:text-cyan-400 transition-colors mb-4 mx-auto">
                        <ArrowLeft className="h-4 w-4" /> REINICIAR ANÀLISI
                    </button>
                    <h1 className="text-4xl md:text-5xl font-black text-cyan-300 tracking-widest" style={{fontFamily: "'Orbitron', sans-serif"}}>
                        ANÀLISI COMPLETADA
                    </h1>
                    <p className="text-lg text-slate-300">Objectiu: <span className="font-bold text-white">{result.company_name}</span></p>
                </motion.header>

                <motion.div variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }}>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
                        <MetricPod icon={Search} label="SEO" score={result.stats.seo_score} delay={0.2} />
                        <MetricPod icon={Zap} label="Rendiment" score={result.stats.performance_score} delay={0.3} />
                        <MetricPod icon={ShieldCheck} label="Accessibilitat" score={result.stats.accessibility_score} delay={0.4} />
                        <MetricPod icon={Cpu} label="Potencial IA" score={result.stats.automation_potential} delay={0.5} />
                    </div>
                </motion.div>
                
                {/* NOU BLOC: Valoració de Google si existeix */}
                {result.google_rating && (
                     <motion.div
                        variants={{ hidden: { opacity: 0, scale: 0.95 }, visible: { opacity: 1, scale: 1 } }}
                        className="relative bg-black/30 border border-slate-700 rounded-lg p-6 shadow-2xl shadow-cyan-500/10 flex justify-center items-center gap-6"
                    >
                        <h3 className="text-cyan-400 text-lg" style={{fontFamily: "'Orbitron', sans-serif"}}>[VALORACIÓ GOOGLE]</h3>
                        <div className="flex items-center gap-2">
                             <Star className="w-6 h-6 text-yellow-400" />
                             <span className="text-2xl font-bold text-white">{result.google_rating}</span>
                             <span className="text-slate-400">({result.google_reviews} ressenyes)</span>
                        </div>
                    </motion.div>
                )}

                <motion.div
                    variants={{ hidden: { opacity: 0, scale: 0.95 }, visible: { opacity: 1, scale: 1 } }}
                    className="relative bg-black/30 border border-slate-700 rounded-lg p-6 font-mono text-sm shadow-2xl shadow-cyan-500/10"
                >
                    <h3 className="text-cyan-400 text-lg mb-4" style={{fontFamily: "'Orbitron', sans-serif"}}>[DIRECTIVES DE MILLORA]</h3>
                    <div className="space-y-4">
                        {(result.improvement_points || []).map((point, index) => (
                            <div key={index} className="border-l-2 border-cyan-700 pl-4">
                                <p className="font-bold text-slate-200" style={{fontFamily: "'Exo 2', sans-serif"}}>{point.title}</p>
                                <p className="text-slate-400" style={{fontFamily: "'Exo 2', sans-serif"}}>{point.description}</p>
                            </div>
                        ))}
                    </div>
                </motion.div>
                
                {/* NOU BLOC: Proposta per a Xarxes Socials */}
                {result.social_media_post && result.screenshotUrl && (
                    <motion.div
                        variants={{ hidden: { opacity: 0, scale: 0.95 }, visible: { opacity: 1, scale: 1 } }}
                        className="relative bg-black/30 border border-slate-700 rounded-lg p-6 shadow-2xl shadow-cyan-500/10"
                    >
                        <h3 className="text-cyan-400 text-lg mb-4 flex items-center gap-2" style={{ fontFamily: "'Orbitron', sans-serif" }}>
                            <Bot />
                            <span>[PROPOSTA PER A XARXES]</span>
                        </h3>
                        <div className="grid md:grid-cols-2 gap-6 items-start">
                            <div className="prose prose-sm prose-invert text-slate-300" style={{fontFamily: "'Exo 2', sans-serif"}}>
                                <p>{result.social_media_post.body}</p>
                            </div>
                            <div className="aspect-video bg-slate-800 rounded-md overflow-hidden border border-slate-600">
                                <img src={result.screenshotUrl} alt={`Captura de pantalla de ${result.company_name}`} className="w-full h-full object-cover" />
                            </div>
                        </div>
                    </motion.div>
                )}

                <motion.div 
                    variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }}
                    className="bg-slate-800/50 border border-slate-700 rounded-lg p-6 text-center"
                >
                     <AnimatePresence mode="wait">
                        {!emailSent ? (
                            <motion.div key="form" initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}}>
                                <h4 className="font-bold text-lg text-white">Rep l'informe complet</h4>
                                <p className="text-slate-400 text-sm mt-1 mb-4">Aquest és un resum. El pla d'acció detallat s'envia per correu.</p>
                                <form onSubmit={onSendReport} className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
                                    <input 
                                        type="email" 
                                        placeholder="El teu correu electrònic" 
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="flex-grow px-3 py-2 rounded-md border border-slate-600 bg-slate-900 text-slate-100 focus:ring-2 focus:ring-cyan-500 focus:outline-none transition-all w-full" 
                                        disabled={isSending} 
                                        required 
                                    />
                                    <Button type="submit" className="bg-cyan-500 hover:bg-cyan-400 text-black font-bold px-6 py-2 rounded-md flex items-center justify-center gap-2" disabled={isSending}>
                                        {isSending ? <Loader2 className="animate-spin" /> : <Send className="w-4 h-4" />}
                                        <span>{isSending ? 'Enviant...' : 'Enviar'}</span>
                                    </Button>
                                </form>
                            </motion.div>
                        ) : (
                            <motion.div key="sent" initial={{opacity: 0, scale: 0.8}} animate={{opacity: 1, scale: 1}}>
                                <p className="font-bold text-green-400 text-xl">✅ Informe Enviat!</p>
                                <p className="text-slate-400 mt-1">Revisa la teva bústia d'entrada.</p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>

            </motion.div>
        </div>
    );
};

export default RadicalAnalysisResult;
