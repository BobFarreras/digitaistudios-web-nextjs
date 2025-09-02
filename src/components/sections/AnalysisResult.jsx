import React from 'react';
import { motion } from 'framer-motion';
import { Radar } from 'react-chartjs-2';
import { Chart as ChartJS, RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend } from 'chart.js';
import { BarChart2, Tv, Server, Sparkles, Lightbulb, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ReactMarkdown from 'react-markdown';

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

const AnalysisResult = ({ result, onBack, onSendReport, isSending, email, setEmail, emailSent, showEmailInput, setShowEmailInput }) => {
  const chartData = {
    labels: ['SEO', 'Rendiment', 'Accessibilitat', 'Automatització'],
    datasets: [{
      label: 'Puntuació',
      data: [
        result.stats.seo_score,
        result.stats.performance_score,
        result.stats.accessibility_score,
        result.stats.automation_potential
      ],
      fill: true,
      backgroundColor: 'hsla(var(--primary) / 0.2)',
      borderColor: 'hsl(var(--primary))',
      pointBackgroundColor: 'hsl(var(--primary))',
      pointBorderColor: 'hsl(var(--card-foreground))',
    }],
  };
  const chartOptions = {
    maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: { r: { angleLines: { color: 'hsl(var(--border))' }, grid: { color: 'hsl(var(--border))' }, pointLabels: { font: { size: 12 }, color: 'hsl(var(--muted-foreground))' }, suggestedMin: 0, suggestedMax: 100, ticks: { display: false, stepSize: 25 } } }
  };

  return (
    <div id="scroll-container" className="flex-1 overflow-y-auto bg-background dark:bg-slate-950 text-foreground">
      <main className="container mx-auto px-6 py-16">
        
        <motion.section initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center mb-20">
          <p className="text-primary font-semibold mb-2">Informe d'Anàlisi d'IA</p>
          <h1 className="text-4xl lg:text-6xl font-extrabold mt-2">Resultats per a <span className="gradient-text">{result.company_name}</span></h1>
          <p className="max-w-2xl mx-auto text-lg text-muted-foreground mt-4">Sector identificat: {result.sector}</p>
        </motion.section>

        <motion.section initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.6, delay: 0.2 }}>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 text-center mb-24">
              <div className="bg-card border border-border/50 rounded-xl p-4 shadow-sm"><p className="text-3xl font-bold gradient-text">{result.stats.seo_score}%</p><p className="text-sm text-muted-foreground mt-1">SEO Tècnic</p></div>
              <div className="bg-card border border-border/50 rounded-xl p-4 shadow-sm"><p className="text-3xl font-bold gradient-text">{result.stats.performance_score}%</p><p className="text-sm text-muted-foreground mt-1">Rendiment</p></div>
              <div className="bg-card border border-border/50 rounded-xl p-4 shadow-sm"><p className="text-3xl font-bold gradient-text">{result.stats.accessibility_score}%</p><p className="text-sm text-muted-foreground mt-1">Accessibilitat</p></div>
              <div className="bg-card border border-border/50 rounded-xl p-4 shadow-sm"><p className="text-3xl font-bold gradient-text">{result.stats.automation_potential}%</p><p className="text-sm text-muted-foreground mt-1">Potencial IA</p></div>
          </div>
        </motion.section>
        
        <section className="py-12">
          <div className="bg-card p-6 sm:p-8 rounded-2xl shadow-2xl border border-border/50">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} className="space-y-6">
                <h4 className="font-bold text-2xl text-center">Mètriques Clau Visualitzades</h4>
                <div className="h-[300px] md:h-[400px]"><Radar data={chartData} options={chartOptions} /></div>
              </motion.div>
              <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
                <h4 className="font-bold text-2xl mb-4">Pla d'Acció Recomanat</h4>
                <div className="space-y-4 max-h-[400px] overflow-y-auto pr-3">
                  {(result.improvement_points || []).map((item, index) => (
                    <div key={index} className="bg-background p-4 rounded-lg border border-border flex items-start">
                        <Lightbulb className="h-6 w-6 mr-4 text-yellow-500 flex-shrink-0 mt-1" />
                        <div>
                            <h5 className="font-bold text-primary">{item.title}</h5>
                            <div className="prose prose-sm dark:prose-invert text-muted-foreground mt-1"><ReactMarkdown>{item.description}</ReactMarkdown></div>
                        </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        <hr className="my-20 border-border/50" />
        
        <section className="text-center py-12">
            <h3 className="text-3xl lg:text-4xl font-extrabold mb-4">Com Ho Hem Fet?</h3>
            <p className="max-w-3xl mx-auto text-lg text-muted-foreground mb-12">Un procés transparent en 3 passos clau.</p>
            <div className="relative flex flex-col items-center">
                <div className="absolute top-0 h-full w-px bg-border -z-10"></div>
                <motion.div initial={{opacity: 0, scale: 0.9}} whileInView={{opacity: 1, scale: 1}} viewport={{once: true}} className="bg-card p-6 rounded-xl shadow-lg border border-border w-full max-w-lg mb-8 flex items-center"><Tv className="mr-4 h-8 w-8 text-primary" /><div><h4 className="text-lg font-bold text-left">1. Interfície d'Usuari</h4><p className="text-sm text-muted-foreground text-left">Has introduït la URL a la nostra eina.</p></div></motion.div>
                <motion.div initial={{opacity: 0, scale: 0.9}} whileInView={{opacity: 1, scale: 1}} viewport={{once: true}} transition={{delay: 0.1}} className="bg-card p-6 rounded-xl shadow-lg border border-border w-full max-w-lg mb-8 flex items-center"><Server className="mr-4 h-8 w-8 text-primary" /><div><h4 className="text-lg font-bold text-left">2. Servidor (Backend)</h4><p className="text-sm text-muted-foreground text-left">El servidor ha rebut la teva URL i ha iniciat l'anàlisi.</p></div></motion.div>
                <motion.div initial={{opacity: 0, scale: 0.9}} whileInView={{opacity: 1, scale: 1}} viewport={{once: true}} transition={{delay: 0.2}} className="bg-card p-6 rounded-xl shadow-lg border border-border w-full max-w-lg flex items-center"><Sparkles className="mr-4 h-8 w-8 text-primary" /><div><h4 className="text-lg font-bold text-left">3. Generació amb IA</h4><p className="text-sm text-muted-foreground text-left">Hem consultat OpenAI per generar aquest informe.</p></div></motion.div>
            </div>
        </section>
        
        <section className="text-center pt-20">
            <div className="bg-card p-8 rounded-2xl shadow-lg border border-border">
                <p className="font-semibold text-xl">Impressionat? Rep aquest informe detallat.</p>
                {!emailSent ? (
                    <AnimatePresence>
                        {!showEmailInput ? (
                            <motion.div initial={{opacity:0}} animate={{opacity:1}}>
                                <Button onClick={() => setShowEmailInput(true)} className="mt-4 gradient-bg text-white text-lg px-8 py-3">Vull rebre l'informe</Button>
                            </motion.div>
                        ) : (
                            <motion.form initial={{opacity:0, y:10}} animate={{opacity:1, y:0}} className="flex justify-center items-center gap-2 flex-wrap mt-4" onSubmit={onSendReport}>
                                <input type="email" placeholder="El teu correu electrònic" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full sm:w-auto flex-grow max-w-xs px-4 py-2 rounded-lg border border-input bg-background/50 focus:ring-2 focus:ring-primary" disabled={isSending} required/>
                                <Button type="submit" className="bg-green-600 hover:bg-green-700 text-white px-6 py-2" disabled={isSending}>
                                    {isSending ? <Loader2 className="animate-spin" /> : <Send className="h-4 w-4" />}
                                </Button>
                            </motion.form>
                        )}
                    </AnimatePresence>
                ) : (
                    <p className="text-green-500 font-bold mt-4">✅ Informe enviat! Revisa la teva bústia.</p>
                )}
            </div>
            <Button onClick={onBack} variant="link" className="mt-4 text-muted-foreground">Fer una altra anàlisi</Button>
        </section>
      </main>
    </div>
  );
};

export default AnalysisResult;