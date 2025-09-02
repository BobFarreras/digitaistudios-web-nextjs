// src/components/layout/Chatbot.jsx

"use client"; // NOU: Essencial per a tota la lògica del xat.

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from '@/lib/motion';
import ReactMarkdown from 'react-markdown';
import { Bot, Send, X, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

// --- Components i Icones Simulats ---




// --- Component Principal del Chatbot ---
const Chatbot = () => {
  // La clau d'API ha estat eliminada d'aquí. El codi del client ara és segur.
  
  const SYSTEM_PROMPT = `
    Ets Digi, l'assistent virtual expert de DigitAI Studios, una empresa especialitzada en automatització i solucions d'intel·ligència artificial per a petites i mitjanes empreses.

    El teu to ha de ser:
    - Amable 🤗
    - Proper i clar 🗣️
    - Professional i eficient 💼

    🎯 El teu objectiu és:
    - Ajudar els usuaris.
    - Respondre preguntes sobre serveis, automatització o IA.
    - Explicar de manera entenedora què fa DigitAI Studios.

    ---

    ## 🚀 Serveis principals de DigitAI Studios:
    1. **Automatització de processos:** Estalvia temps i diners eliminant tasques repetitives.
    2. **Chatbots amb IA:** Assistents virtuals com tu per millorar l’atenció al client.
    3. **Solucions d’intel·ligència artificial:** IA per augmentar la productivitat i millorar la presa de decisions.
    4. **Creació i desenvolupament de pàgines web** amb funcionalitats automatitzades amb IA.
    5. **Creació de contingut digital automatitzat** per a plataformes com xarxes socials, webs i blogs.
    6. **Formació i conscienciació en tecnologies digitals** per ajudar les petites empreses a adaptar-se.

    ---

    ## 🏢 Informació clau de l'empresa:
    - DigitAI Studios va ser fundada el 2025 per Adrià Farreras.
    - Missió: Desenvolupar eines amb IA per alliberar temps a les empreses.
    - L’empresa evoluciona constantment i es manté al dia en innovació tecnològica.

    ---

    ## 🧠 Instruccions específiques:
    - Contesta amb l'idioma que l'usuari a comentat, si no acabes de saber l'idioma contesta en català

    - Si un usuari parla de **preus** o **pressupostos**, dirigeix-lo de manera amable a l’apartat de **Contacte** i recomana que empleni el formulari perquè l’atenguem al més aviat possible. 📩

    - Si no saps alguna cosa, sigues sincer. Informa que no tens accés a la informació i ofereix ajuda per contactar amb un expert humà mitjançant el formulari. ❓➡️ 👨‍💻

    - **No t’inventis informació ni especulis.** És millor ser honest i redirigir si cal.

    ---

    ## ✏️ Format de resposta:

    - **Organitza les respostes per seccions** clares i diferenciades amb salts de línia.
    - **Utilitza emojis quan sigui adequat**, per fer-ho més visual i proper, però no en excés.
    - **Fes servir negreta o majúscules per destacar** punts clau si el format ho permet.
    - **Sigues breu, directe i visual.** Utilitza frases curtes i llenguatge natural.

    ---

    Sigues resolutiu, informatiu i sempre disposat a ajudar. 🚀
  `; // El teu prompt es queda igual

  const [chatOpen, setChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    { role: 'system', content: SYSTEM_PROMPT },
    { role: 'assistant', content: 'Hola! Sóc Digi, l\'assistent de DigitAI Studios. Com puc ajudar-te?' }
  ]);
  const [chatInput, setChatInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages, isTyping]);

  // --- LÒGICA D'ENVIAMENT SEGURA (REESTRUCTURADA) ---
  const handleChatSubmit = async (e) => {
    e.preventDefault();
    if (!chatInput.trim() || isTyping) return;

    const newUserMessage = { role: 'user', content: chatInput };
    const newMessages = [...chatMessages, newUserMessage];
    
    setChatMessages(newMessages);
    setChatInput('');
    setIsTyping(true);
    
    try {
      // Truquem al nostre script PHP que actua com a intermediari segur.
      const response = await fetch("https://digitaistudios.com/api/chat.php", {
        method: 'POST',
        headers: {
          // Ja no necessitem la capçalera 'Authorization' aquí.
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          // Només enviem la llista de missatges. La clau secreta i el model s'afegeixen al backend.
          messages: newMessages 
        })
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Error del servidor (${response.status}): ${errorText}`);
      }

      const botResponse = await response.json();
      setChatMessages(prev => [...prev, botResponse]);

    } catch (error) {
      console.error("Error en la comunicació amb el servidor:", error);
      setChatMessages(prev => [...prev, { role: 'assistant', content: `Ho sento, hi ha hagut un error: ${error.message}` }]);
    } finally {
      setIsTyping(false);
    }
  };

  // --- RENDERITZAT DEL COMPONENT ---
  return (
    <>
      <AnimatePresence>
        {chatOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="fixed bottom-24 right-6 w-[90vw] max-w-sm h-[70vh] max-h-[500px] bg-background/80 backdrop-blur-xl border border-border rounded-2xl shadow-2xl z-50 flex flex-col"
          >
            <div className="flex-shrink-0 flex items-center justify-between p-4 border-b border-border">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                  <Bot className="h-5 w-5 text-white" />
                </div>
                <div>
                  <div className="font-semibold text-white">Assistent DigitAI</div>
                  <div className="text-xs text-green-500">En línia</div>
                </div>
              </div>
              <Button variant="ghost" size="icon" onClick={() => setChatOpen(false)} className="h-8 w-8" aria-label="Tancar xat">
                <X className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="flex-1 p-4 overflow-y-auto space-y-4">
              {chatMessages.filter(msg => msg.role !== 'system').map((msg, index) => (
                <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`prose max-w-xs px-3 py-2 rounded-lg shadow-sm ${msg.role === 'user' ? 'bg-blue-600 text-white prose-invert' : 'bg-gray-200 text-gray-800'}`}>
                    <ReactMarkdown>
                      {msg.content}
                    </ReactMarkdown>
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="max-w-xs px-3 py-2 rounded-lg shadow-sm bg-gray-200">
                    <div className="typing-indicator">
                      <span></span><span></span><span></span>
                    </div>
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>
            
            <form onSubmit={handleChatSubmit} className="flex-shrink-0 p-4 border-t border-border">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  placeholder="Escriu el teu missatge..."
         className="flex-1 px-3 py-2 rounded-lg border border-input bg-background text-sm focus:ring-2 "                 
         aria-label="Missatge del xat"
                  disabled={isTyping}
                />
                <Button type="submit" size="icon" className="h-10 w-10" aria-label="Enviar missatge del xat" disabled={isTyping}>
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
      
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setChatOpen(!chatOpen)}
        className="fixed bottom-6 right-6 w-16 h-16 chatbot-bubble text-white rounded-full shadow-lg z-40 flex items-center justify-center"
        aria-label={chatOpen ? "Tancar xat d'assistència" : "Obrir xat d'assistència"}
      >
        {chatOpen ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
      </motion.button>
      
      <style>{`
        .chatbot-bubble {
          background: linear-gradient(135deg,rgb(138, 68, 212) 0%,rgb(77, 138, 244) 100%);
        }
        .typing-indicator span {
          height: 8px;
          width: 8px;
          background-color: #9E9EA1;
          border-radius: 50%;
          display: inline-block;
          animation: bounce 1.4s infinite ease-in-out both;
        }
        .typing-indicator span:nth-child(1) { animation-delay: -0.32s; }
        .typing-indicator span:nth-child(2) { animation-delay: -0.16s; }
        @keyframes bounce {
          0%, 80%, 100% { transform: scale(0); }
          40% { transform: scale(1.0); }
        }
      `}</style>
    </>
  );
};


export default Chatbot;
