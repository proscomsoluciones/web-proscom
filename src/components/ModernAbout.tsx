"use client";

import React from 'react';
import { motion } from 'framer-motion';

const ModernAbout = () => {
  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          {/* Image Side */}
          <div className="w-full lg:w-1/2 relative group">
            <div className="absolute -inset-4 bg-blue-600/10 rounded-[3rem] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            <div className="relative aspect-[4/5] bg-gray-100 rounded-[3rem] border border-gray-200 overflow-hidden shadow-2xl transition-transform duration-700 hover:scale-[0.99]">
               <img 
                src="/juan-ramon.png" 
                alt="Juan Ramón Cornejo G." 
                className="w-full h-full object-cover scale-110 origin-top"
               />
               <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-[#002B5B] via-[#002B5B]/80 to-transparent">
                  <p className="text-xl font-bold text-white">Juan Ramón Cornejo G.</p>
                  <p className="text-blue-300 text-xs font-bold uppercase tracking-widest mt-1">Fundador & Especialista Software</p>
               </div>
            </div>
          </div>

          {/* Text Side */}
          <div className="w-full lg:w-1/2">
            <span className="text-blue-600 font-bold uppercase tracking-widest text-sm mb-4 block">Confianza y Experiencia</span>
            <h2 className="text-4xl md:text-5xl font-black text-[#002B5B] mb-8 leading-tight">
              Liderazgo local con <br /> impacto internacional.
            </h2>
            <div className="space-y-6 text-gray-700 text-lg leading-relaxed mb-10">
              <p>
                &quot;Haber asesorado proyectos en **Colombia, México, Argentina y Perú** me ha dado una perspectiva única sobre cómo la tecnología debe servir al negocio para generar resultados reales.&quot;
              </p>
            </div>
            
            <div className="flex gap-8">
               <div className="flex flex-col">
                  <span className="text-3xl font-black text-[#002B5B]">15+</span>
                  <span className="text-[10px] uppercase text-blue-600 font-bold tracking-widest">Años de Expertiz</span>
               </div>
               <div className="w-px h-10 bg-gray-100" />
               <div className="flex flex-col">
                  <span className="text-3xl font-black text-[#002B5B]">04</span>
                  <span className="text-[10px] uppercase text-blue-600 font-bold tracking-widest">Mercados Latam</span>
               </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ModernAbout;
