"use client";

import React, { useState } from 'react';
import { Quote } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const SuccessCases = () => {
  const [testimonialIndex, setTestimonialIndex] = React.useState(0);

  const testimonials = [
    {
       text: "Proscom transformó radicalmente nuestra gestión comunitaria, dándonos herramientas que antes parecían inalcanzables.",
       entity: "Junta de Vecinos Villa el Sol",
       project: "Sistema de Gestión Comunitaria"
    },
    {
       text: "El desarrollo de nuestro portal web superó las expectativas, brindando una plataforma sólida para nuestra comunidad educativa.",
       entity: "Escuela San José de Los Andes",
       project: "Portal Web — Dir. Julio Herrera"
    },
    {
       text: "Gracias a Proscom, logramos implementar un sistema de gestión documental eficiente que optimizó todos nuestros procesos internos.",
       entity: "ELEAM Los Andes",
       project: "Sistema de Gestión Documental"
    },
    {
       text: "Desarrollamos una plataforma integral para la gestión de pases amateur, automatizando la creación de documentos PDF y simplificando la administración deportiva.",
       entity: "Fichalo.cl",
       project: "Gestión de Pases Fútbol Amateur"
    },
    {
       text: "Creamos una plataforma social de apoyo al comercio local en Catemu, Llay Llay y el valle, democratizando el acceso a herramientas digitales de forma gratuita.",
       entity: "QueBuenDato.cl",
       project: "Plataforma de Fomento al Comercio"
    },
    {
       text: "La digitalización de nuestra asociación nos permitió organizar los torneos y registrar a los clubes de manera eficiente, moderna y transparente.",
       entity: "Asociación de Fútbol de Catemu",
       project: "Plataforma de Gestión Deportiva"
    }
  ];
  const logos = [
    { name: 'BeerLover', path: '/images/clientes/cliente-beerlover.png' },
    { name: 'Eleam', path: '/images/clientes/cliente-eleam.jpg' },
    { name: 'Fichalo', path: '/images/clientes/cliente-fichalo.jpg' },
    { name: 'LegalFirma', path: '/images/clientes/cliente-lega-firma.jpg' },
    { name: 'LyC', path: '/images/clientes/cliente-lyc.jpg' },
    { name: 'San Jose', path: '/images/clientes/cliente-san-jose.jpg' },
    { name: 'QueBuenDato', path: '/images/clientes/logo-quebuendato.png' },
    { name: 'Asociacion de Futbol de Catemu', path: '/images/clientes/logo.jpg' },
    { name: 'Asociacion de Futbol de Catemu', path: '/images/clientes/icon-512x512.webp' }
  ];

  React.useEffect(() => {
    const timer = setInterval(() => {
      setTestimonialIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [testimonials.length]);

  return (
    <section id="casos" className="py-24 bg-[#002B5B]">
      <div className="container mx-auto px-6">
        <div className="mb-12">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-2">Casos de Éxito</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Logo Grid (Left side) */}
          <div className="lg:col-span-8 grid grid-cols-2 md:grid-cols-4 gap-3">
             {logos.map((logo, i) => (
               <div key={i} className="bg-white rounded-2xl h-32 flex items-center justify-center p-6 group transition-all duration-300 hover:shadow-xl">
                  <img 
                    src={logo.path} 
                    alt={logo.name} 
                    className="max-w-full max-h-full object-contain filter grayscale group-hover:grayscale-0 transition-all duration-500"
                  />
               </div>
             ))}
          </div>

          {/* Testimonial Section (Right side) - Fixed Height */}
          <div className="lg:col-span-4 bg-[#00529B] rounded-[2rem] p-8 text-white relative overflow-hidden shadow-2xl flex flex-col justify-between h-auto lg:h-full min-h-[350px]">
              <Quote className="absolute top-6 right-6 w-10 h-10 text-white/5" />
              
              <AnimatePresence mode="wait">
                <motion.div
                  key={testimonialIndex}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="flex-grow flex flex-col justify-center py-4"
                >
                  <div className="min-h-[140px] flex items-center">
                    <p className="text-base md:text-lg font-medium leading-relaxed italic text-gray-100">
                      &quot;{testimonials[testimonialIndex].text}&quot;
                    </p>
                  </div>
                  <div className="mt-6">
                     <p className="font-bold text-base text-white">{testimonials[testimonialIndex].entity}</p>
                     <p className="text-blue-200 text-xs uppercase tracking-widest mt-1 font-bold">
                        {testimonials[testimonialIndex].project}
                     </p>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Dots navigation */}
              <div className="flex gap-1.5 mt-4">
                 {testimonials.map((_, i) => (
                   <button 
                    key={i} 
                    onClick={() => setTestimonialIndex(i)}
                    className={`h-1 rounded-full transition-all duration-500 ${i === testimonialIndex ? 'bg-white w-8' : 'bg-white/20 w-3'}`} 
                   />
                 ))}
              </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SuccessCases;
