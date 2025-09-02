import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Phone, Mail, Hammer, Building2, Home ,CheckCircle, Bot, Code2, Users, Target, Palette, Edit3, Rocket, Layers3, Fingerprint, BrainCircuit, X, Calendar, BarChart3, MessageSquare, ArrowRight, Clock, Building} from 'lucide-react';

// -------------------- MODERN WEBSITE --------------------
const ModernConstructionWebsite = () => {
    const [chatMessages, setChatMessages] = useState([
        { sender: "bot", text: "👋 Hola! Sóc l’assistent virtual. En què puc ajudar-te?" },
      ]);
      const [input, setInput] = useState("");
      const [showChatDialog, setShowChatDialog] = useState(false);
      const [showContactDialog, setShowContactDialog] = useState(false);
      const [contactFormSubmitted, setContactFormSubmitted] = useState(false);
      const [chatConfirmation, setChatConfirmation] = useState(false);
    
      const handleSendChat = () => {
        if (!input.trim()) return;
        setChatMessages([
          ...chatMessages,
          { sender: "user", text: input },
          { sender: "bot", text: "👌 Perfecte, el nostre equip es posarà en contacte aviat!" },
        ]);
        setInput("");
        setChatConfirmation(true);
        setTimeout(() => setChatConfirmation(false), 3000);
      };
    
      const handleContactSubmit = (e) => {
        e.preventDefault();
        setContactFormSubmitted(true);
        setTimeout(() => setContactFormSubmitted(false), 3000);
      };

  const serviceImages = [
    "https://ik.imagekit.io/uol7aqk8z/DigitAI%20Studios/istockphoto-147205632-612x612.jpg?updatedAt=1756199420945",
    "https://ik.imagekit.io/uol7aqk8z/DigitAI%20Studios/istockphoto-1961618501-612x612.jpg?updatedAt=1756199420855",
    "https://ik.imagekit.io/uol7aqk8z/DigitAI%20Studios/istockphoto-1399337320-612x612.jpg?updatedAt=1756199420842",
  ];

  return (
    <div className="w-full min-h-[700px] bg-white text-gray-900 font-sans rounded-xl overflow-hidden shadow-2xl">
      {/* Header */}
      <header className="flex justify-between items-center p-6 bg-white shadow-md">
        <span className="text-xl font-extrabold text-yellow-600">Construccions Martínez</span>
        <nav className="hidden md:flex space-x-6 text-sm font-medium">
          <a href="#">Inici</a>
          <a href="#">Serveis</a>
          <a href="#">Projectes</a>
          <a href="#">Contacte</a>
        </nav>
      </header>

      {/* Hero */}
      <section className="relative h-80 flex items-center justify-center text-center">
        <img
          src="https://ik.imagekit.io/uol7aqk8z/DigitAI%20Studios/istockphoto-1680403073-612x612.jpg?updatedAt=1756199420885"
          className="absolute inset-0 w-full h-full object-cover"
          alt="Construcció moderna"
        />
        <div className="absolute inset-0 bg-black/40" />
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 px-6"
        >
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-3">
            Construint el futur amb tu
          </h1>
          <p className="text-gray-200 max-w-xl mx-auto">
            Innovació i confiança en cada projecte d’obra nova i reforma.
          </p>
        </motion.div>
      </section>

      {/* Serveis */}
      <section className="p-8 grid md:grid-cols-3 gap-6">
        {[
          { icon: Home, title: "Obra nova", desc: "Vivendes sostenibles i modernes." },
          { icon: Building2, title: "Reformes", desc: "Espais renovats amb disseny actual." },
          { icon: Hammer, title: "Manteniment", desc: "Solucions intel·ligents i ràpides." },
        ].map((s, i) => (
          <motion.div
            key={s.title}
            whileHover={{ scale: 1.05 }}
            className="relative h-60 rounded-xl overflow-hidden shadow-lg"
          >
            <img src={serviceImages[i]} className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/50" />
            <div className="relative z-10 flex flex-col items-center justify-center text-center h-full text-white p-4">
              <s.icon className="h-10 w-10 mb-2 text-yellow-400" />
              <h3 className="font-bold text-lg">{s.title}</h3>
              <p className="text-sm mt-2">{s.desc}</p>
            </div>
          </motion.div>
        ))}
      </section>

      {/* Contact Dialog */}
      <section className="p-8 bg-gray-50 text-center">
          <h2 className="text-2xl font-bold mb-4">Contacta amb nosaltres</h2>
          <p className="mb-6 text-gray-600">
            Explica’ns el teu projecte i et farem arribar un pressupost adaptat.
          </p>
          <Button
            className="bg-yellow-500 text-black hover:bg-yellow-400"
            onClick={() => setShowContactDialog(true)}
          >
            Demana pressupost
          </Button>
  
          <AnimatePresence>
  {showContactDialog && (
    <motion.div
      className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="bg-gray-800 p-6 rounded-xl w-full max-w-md relative"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
      >
        <button
          className="absolute top-3 right-3 text-gray-300 hover:text-white"
          onClick={() => setShowContactDialog(false)}
        >
          ✕
        </button>
        <h3 className="text-xl font-bold mb-4 text-white">Demana el teu pressupost</h3>
        <form className="space-y-3" onSubmit={handleContactSubmit}>
          <input type="text" placeholder="Nom" className="w-full border p-2 rounded bg-gray-700 text-white" required />
          <input type="email" placeholder="Correu electrònic" className="w-full border p-2 rounded bg-gray-700 text-white" required />
          <textarea placeholder="Explica’ns el projecte..." className="w-full border p-2 rounded bg-gray-700 text-white" rows={3} required />
          <Button type="submit" className="w-full bg-yellow-500 text-black hover:bg-yellow-400">
            Enviar
          </Button>
          {contactFormSubmitted && (
            <p className="text-green-400 font-semibold mt-2">✅ Formulari enviat correctament!</p>
          )}
        </form>
      </motion.div>
    </motion.div>
  )}
</AnimatePresence>
        </section>
  
        {/* Chatbot */}
        <button
          className="fixed bottom-6 right-6 bg-yellow-500 text-black p-4 rounded-full shadow-lg hover:bg-yellow-400 z-40"
          onClick={() => setShowChatDialog(true)}
        >
          💬
        </button>
  
        <AnimatePresence>
  {showChatDialog && (
    <motion.div
      className="fixed bottom-20 right-6 w-full max-w-xs bg-white shadow-lg rounded-xl z-50"
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 100, opacity: 0 }}
    >
      <div className="p-4 border-b flex justify-between items-center">
        <h4 className="font-bold">Assistent Virtual</h4>
        <button onClick={() => setShowChatDialog(false)}>✕</button>
      </div>
      <div className="h-40 overflow-y-auto p-3 space-y-2 text-white">
        {chatMessages.map((msg, i) => (
          <div
            key={i}
            className={`p-2 rounded-md max-w-[80%] ${
              msg.sender === "bot" ? "bg-yellow-100 text-gray-800" : "bg-yellow-500 text-black ml-auto"
            }`}
          >
            {msg.text}
          </div>
        ))}
      </div>
      <div className="flex p-3 space-x-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Escriu un missatge..."
          className="flex-grow border rounded p-2 text-white"
        />
        <Button onClick={handleSendChat} className="bg-yellow-500 text-black hover:bg-yellow-400">
          Enviar
        </Button>
      </div>
    </motion.div>
  )}
</AnimatePresence>
                {/* Footer */}
        <footer className="bg-gray-900 text-gray-400 text-xs text-center p-3">
            © 2025 Construccions Martínez - Tots els drets reservats
        </footer>
      </div>

  
    
  );
};

export default ModernConstructionWebsite;