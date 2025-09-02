// src/app/disseny-web/WebDesignPageClient.js

"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from '@/lib/motion';
import { Button } from "@/components/ui/button";
import { Fingerprint, Layers3, BrainCircuit, Edit3 } from 'lucide-react';
import Link from 'next/link';
import ModernConstructionWebsite from "@/components/webDesignPage/ModernConstructionWebsite";
import OldConstructionWebsite from "@/components/webDesignPage/OldConstructionWebsite";

// --- SUB-COMPONENTS ---
const AdvantageCard = ({ icon: Icon, title, description, delay }) => (
  <motion.div 
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.5 }}
    transition={{ duration: 0.6, delay }}
    className="bg-card/50 p-6 rounded-2xl border border-border/50 h-full"
  >
    <Icon className="h-10 w-10 mb-4 text-primary" />
    <h3 className="text-xl font-bold mb-2 text-foreground">{title}</h3>
    <p className="text-muted-foreground">{description}</p>
  </motion.div>
);

const PhaseStep = ({ number, title, description, delay }) => (
  <motion.div 
    initial={{ opacity: 0, x: -30 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true, amount: 0.5 }}
    transition={{ duration: 0.6, delay }}
    className="relative pl-16 pb-12 border-l-2 border-primary/20"
  >
    <div className="absolute -left-6 top-0 flex items-center justify-center w-12 h-12 bg-primary rounded-full text-primary-foreground font-bold text-lg ring-8 ring-background">
      {number}
    </div>
    <h3 className="text-2xl font-bold mb-2 text-foreground pt-2">{title}</h3>
    <p className="text-muted-foreground">{description}</p>
  </motion.div>
);

// --- COMPONENT PRINCIPAL DE LA PÀGINA ---
export default function WebDesignPageClient() {
    const [view, setView] = useState("old");

    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="pt-32 pb-20 overflow-x-hidden"
      >
        {/* --- SECCIÓ HERO --- */}
        <section className="container mx-auto px-4 text-center mb-24">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-4xl lg:text-7xl font-extrabold mb-4"
          >
            La teva web treballa per a tu, o només <span className="gradient-text">ocupa un lloc a Internet?</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-xl text-muted-foreground max-w-3xl mx-auto"
          >
            A DigitAI Studios no creem simples pàgines web. Construïm actius digitals intel·ligents que capturen clients, automatitzen tasques i es converteixen en el millor comercial del teu equip, disponible 24/7.
          </motion.p>
        </section>

        {/* --- SECCIÓ INTERACTIVA "ABANS I DESPRÉS" --- */}
        <div className="py-16 px-6 text-center">
            <h2 className="text-3xl lg:text-5xl font-bold">Una Transformació <span className="gradient-text">Radical</span></h2>
            <p className="text-lg text-muted-foreground mt-4 max-w-2xl mx-auto">Deixa enrere les ineficiències. Descobreix el futur de la teva presència online.</p>
        
            <div className="flex justify-center space-x-4 my-10">
                <Button variant={view === "old" ? "default" : "outline"} onClick={() => setView("old")}>Abans</Button>
                <Button variant={view === "modern" ? "default" : "outline"} onClick={() => setView("modern")}>Després</Button>
            </div>

            <div className="max-w-6xl mx-auto">
                <AnimatePresence mode="wait">
                    {view === "old" ? (
                        <motion.div key="old" initial={{ opacity: 0, filter: "blur(8px)" }} animate={{ opacity: 1, filter: "blur(0px)" }} exit={{ opacity: 0, filter: "blur(8px)" }} transition={{ duration: 0.6 }}>
                            <OldConstructionWebsite />
                        </motion.div>
                    ) : (
                        <motion.div key="modern" initial={{ opacity: 0, filter: "blur(8px)" }} animate={{ opacity: 1, filter: "blur(0px)" }} exit={{ opacity: 0, filter: "blur(8px)" }} transition={{ duration: 0.6 }}>
                            <ModernConstructionWebsite />
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>

        {/* --- SECCIÓ D'AVANTATGES --- */}
        <section className="container mx-auto px-4 my-24">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <AdvantageCard icon={Fingerprint} title="Disseny que Impacta" description="La teva marca és única. Creem una identitat visual des de zero que comunica els teus valors i et diferencia de la competència." delay={0.1} />
              <AdvantageCard icon={Layers3} title="Tecnologia Escalable" description="Construïm la teva web sobre una base sòlida que pot créixer amb tu. Afegeix noves funcionalitats en el futur sense haver de començar de nou." delay={0.2} />
              <AdvantageCard icon={BrainCircuit} title="Intel·ligència Integrada" description="Des d'un chatbot que qualifica clients fins a la redacció de textos optimitzats per SEO. La teva web pensa, aprèn i treballa per tu." delay={0.3} />
              <AdvantageCard icon={Edit3} title="Control Total per a Tu" description="T'entreguem un panell de control intuïtiu perquè puguis actualitzar continguts fàcilment, donant-te total autonomia i independència." delay={0.4} />
          </div>
        </section>
        
        {/* --- SECCIÓ DEL PROCÉS --- */}
        <section className="container mx-auto px-4 py-16">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-bold">El Teu Projecte, La Nostra Passió</h2>
            <p className="text-lg text-muted-foreground mt-4 max-w-2xl mx-auto">Aquest és el nostre full de ruta per convertir la teva visió en una realitat digital que genera resultats.</p>
          </div>
          <div className="max-w-3xl mx-auto">
            <PhaseStep number="01" title="Fase 1: Estratègia i Visió" description="No parlem de colors, parlem d'objectius. En aquesta primera fase, ens submergim en el teu negoci per entendre què necessites que faci la teva web." delay={0.1} />
            <PhaseStep number="02" title="Fase 2: Disseny de l'Experiència" description="Creem una proposta visual que no només és atractiva, sinó que està dissenyada per guiar l'usuari cap a l'acció. La revisem amb tu fins que sigui perfecta." delay={0.2} />
            <PhaseStep number="03" title="Fase 3: Construcció Intel·ligent" description="Aquí és on la màgia passa. Programem la teva web amb codi net i eficient, i integrem les eines d'IA que la faran destacar." delay={0.3} />
            <PhaseStep number="04" title="Fase 4: Validació i Llançament" description="Revisem cada detall junts. Un cop tenim la teva llum verda, publiquem la web i la presentem al món (i a Google) de la manera correcta." delay={0.4} />
          </div>
        </section>

        {/* --- SECCIÓ CTA (CALL TO ACTION) --- */}
        <section className="container mx-auto px-4 mt-16">
          <div className="bg-card p-12 rounded-3xl shadow-2xl border border-border/50 text-center">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Estàs a punt per tenir una web que no només impressiona, sinó que produeix resultats?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              El primer pas és parlar. Explica'ns el teu projecte i et prepararem una proposta personalitzada sense cap compromís.
            </p>
            {/* CANVI: Aquest botó ara és un Link directe a la secció de contacte de la pàgina principal. */}
            <Link href="/#contacte">
              <Button
                size="lg"
                className="text-lg px-8 py-6 gradient-bg text-primary-foreground transform hover:scale-105 transition-transform"
              >
                Comencem el Projecte
              </Button>
            </Link>
          </div>
        </section>
      </motion.div>
    );
}