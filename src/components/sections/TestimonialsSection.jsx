// src/components/sections/TestimonialsSection.jsx

"use client"; // Encara és client component per les animacions de Framer Motion

import React from 'react';
import { motion} from '@/lib/motion';

const Star = ({ className }) => <svg className={className} fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path></svg>;

// El component només rep una prop: la llista de testimonis ja carregada.
const TestimonialsSection = ({ initialTestimonials }) => {
  // NO hi ha useState ni useEffect per a les dades.
  // NO hi ha estats de 'isLoading' o 'error'. El component confia que les dades ja hi són.

  return (
    <section id="testimonis" className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-6xl font-bold mb-6">
            Què diuen els nostres <span className="gradient-text">clients</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Petites empreses de tot Catalunya ja han transformat els seus negocis amb DigitAI Studios
          </p>
        </motion.div>
        
        <div className="grid md:grid-cols-3 gap-8 min-h-[200px]">
          {initialTestimonials && initialTestimonials.length > 0 ? (
            initialTestimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id || index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ delay: index * 0.1 }}
                className="testimonial-card flex flex-col"
              >
                <div className="flex-grow">
                  <div className="flex mb-4">
                    {testimonial.rating > 0 && [...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-lg mb-6 italic text-muted-foreground whitespace-pre-wrap">
                    "{testimonial.text}"
                  </p>
                  {testimonial.link && (
                    <a
                      href={testimonial.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block px-4 py-2 bg-primary/10 text-primary text-sm font-semibold rounded-lg hover:bg-primary/20 transition-colors"
                    >
                      Visita el seu projecte →
                    </a>
                  )}
                </div>
                
                <div className="mt-6 flex items-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-primary to-primary/70 rounded-full flex items-center justify-center text-primary-foreground font-bold mr-4">
                    {testimonial.name ? testimonial.name.charAt(0) : '?'}
                  </div>
                  <div>
                    <div className="font-semibold text-foreground">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.company}</div>
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            // Missatge per si no hi ha testimonis
            <div className="md:col-span-3 text-center text-muted-foreground">
              <p>De moment, no hi ha testimonis per mostrar.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;