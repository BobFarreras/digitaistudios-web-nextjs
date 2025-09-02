// src/components/sections/ContactSection.jsx

"use client"; // NOU: Aquest component és interactiu, ha de ser de client.

import React, { useState } from 'react';
import { motion } from '@/lib/motion';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Checkbox } from '@/components/ui/checkbox';
import { Rocket, Shield, Users, Send, Loader2, Bot, Code2 } from 'lucide-react';

const ContactSection = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({ service: '', fullName: '', email: '', companyName: '', message: '' });
  const [privacyAccepted, setPrivacyAccepted] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleServiceSelect = (service) => {
    setFormData(prev => ({ ...prev, service }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!privacyAccepted) {
      toast({ title: "Acceptació requerida", description: "Has d'acceptar la política de privacitat.", variant: "destructive" });
      return;
    }
    if (!formData.service) {
      toast({ title: "Servei requerit", description: "Si us plau, selecciona un servei d'interès.", variant: "destructive" });
      return;
    }
    setIsLoading(true);
  
    try {
      const response = await fetch('https://digitaistudios.com/api/send_email.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: "contact",
          data: formData
        }),
      });
      
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || 'Hi ha hagut un error desconegut.');
  
      toast({
        title: "✅ Missatge enviat correctament!",
        description: "Ens posarem en contacte amb tu aviat. Gràcies!"
      });
      setFormData({ service: '', fullName: '', email: '', companyName: '', message: '' });
      setPrivacyAccepted(false); // Reseteja el checkbox
    } catch (error) {
      toast({
        title: "❌ Error enviant el missatge",
        description: error.message || "Si us plau, prova-ho més tard.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    // CANVI CLAU AQUÍ: Afegim 'overflow-x-hidden' per contenir les animacions
    <section id="contacte" className="py-20 bg-gradient-to-br from-background to-muted/20 overflow-x-hidden">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl lg:text-6xl font-bold mb-6">
              Comença la teva{' '}
              <span className="gradient-text">
                transformació digital
              </span>
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Contacta amb nosaltres i descobreix com DigitAI Studios pot revolucionar el teu negoci. 
              Oferim una consulta gratuïta personalitzada.
            </p>
            <div className="space-y-6">
              {[
                { icon: Rocket, title: "Implementació ràpida", description: "En menys de 48 hores" },
                { icon: Shield, title: "Suport 24/7", description: "Sempre aquí per ajudar-te" },
                { icon: Users, title: "Equip expert", description: "Especialistes en IA i automatització" }
              ].map((feature, index) => (
                <motion.div key={index} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: index * 0.1 }} className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center">
                    <feature.icon className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="bg-card/50 dark:bg-card/80 backdrop-blur-sm border border-border/50 rounded-3xl p-8 shadow-2xl"
          >
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label className="block text-sm font-medium mb-3">En què estàs interessat?</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <Button type="button" variant={formData.service === 'Automatització i IA' ? 'default' : 'outline'} onClick={() => handleServiceSelect('Automatització i IA')} className="w-full justify-center px-6 py-3" disabled={isLoading}>
                    <Bot className="mr-2 h-5 w-5" /><span>Automatització i IA</span>
                  </Button>
                  <Button type="button" variant={formData.service === 'Creació de Webs' ? 'default' : 'outline'} onClick={() => handleServiceSelect('Creació de Webs')} className="w-full justify-center px-6 py-3" disabled={isLoading}>
                    <Code2 className="mr-2 h-5 w-5" /><span>Creació de Webs</span>
                  </Button>
                </div>
              </div>
              
              <div>
                <label htmlFor="fullName" className="block text-sm font-medium mb-2">Nom complet</label>
                <input id="fullName" name="fullName" type="text" value={formData.fullName} onChange={handleInputChange} className="w-full px-4 py-3 rounded-lg border border-input bg-background/50 focus:ring-2 focus:ring-primary" placeholder="El teu nom" required disabled={isLoading} />
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">Email</label>
                <input id="email" name="email" type="email" value={formData.email} onChange={handleInputChange} className="w-full px-4 py-3 rounded-lg border border-input bg-background/50 focus:ring-2 focus:ring-primary" placeholder="el.teu.email@empresa.com" required disabled={isLoading} />
              </div>
              
              <div>
                <label htmlFor="companyName" className="block text-sm font-medium mb-2">Empresa <span className="text-muted-foreground">(Opcional)</span></label>
                <input id="companyName" name="companyName" type="text" value={formData.companyName} onChange={handleInputChange} className="w-full px-4 py-3 rounded-lg border border-input bg-background/50 focus:ring-2 focus:ring-primary" placeholder="Nom de la teva empresa" disabled={isLoading} />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2">Com et podem ajudar?</label>
                <textarea id="message" name="message" rows={4} value={formData.message} onChange={handleInputChange} className="w-full px-4 py-3 rounded-lg border border-input bg-background/50 resize-none focus:ring-2 focus:ring-primary" placeholder="Explica'ns breument el teu projecte..." required disabled={isLoading} />
              </div>
              
              <div className="flex items-center space-x-3 pt-2">
                <Checkbox id="privacy" checked={privacyAccepted} onCheckedChange={setPrivacyAccepted} disabled={isLoading} />
                <label htmlFor="privacy" className="text-sm font-medium leading-none text-muted-foreground peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  He llegit i accepto la{' '}
                  <a href="/politica-de-privacitat" target="_blank" rel="noopener noreferrer" className="underline hover:text-primary">
                    Política de Privacitat
                  </a>.
                </label>
              </div>

              <Button type="submit" className="w-full gradient-bg text-white py-6 text-lg font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50" disabled={isLoading || !privacyAccepted}>
                {isLoading ? ( <><Loader2 className="mr-2 h-5 w-5 animate-spin" />Enviant...</> ) : ( <>Enviar missatge<Send className="ml-2 h-s w-5" /></> )}
              </Button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;