"use client";

import React from 'react';
import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-white pt-24 pb-32 lg:pt-36 lg:pb-52">
      {/* Background Decorative Arcs */}
      <div className="absolute top-0 right-0 -translate-y-[10%] translate-x-[15%] opacity-20 pointer-events-none">
        <svg width="800" height="800" viewBox="0 0 800 800" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="400" cy="400" r="399.5" stroke="#002B5B" strokeWidth="1" />
          <circle cx="400" cy="400" r="319.5" stroke="#002B5B" strokeWidth="1" />
        </svg>
      </div>
      <div className="absolute top-20 left-0 -translate-x-[40%] opacity-20 pointer-events-none">
        <svg width="600" height="600" viewBox="0 0 600 600" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="300" cy="300" r="299.5" stroke="#002B5B" strokeWidth="1" />
          <circle cx="300" cy="300" r="239.5" stroke="#002B5B" strokeWidth="1" />
        </svg>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-5 py-2 bg-blue-50/80 border border-blue-100 text-[#00529B] text-xs md:text-sm font-bold tracking-widest rounded-full mb-8 uppercase shadow-sm">
              <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
              PROSCOM SPA • TECNOLOGÍA CORPORATIVA & SOFTWARE ENTERPRISE
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-[#002B5B] leading-[1.1] tracking-tighter mb-8 uppercase">
              INGENIERÍA DE SOFTWARE CORPORATIVO <br className="hidden md:inline" />
              Y PLATAFORMAS DE ALTO IMPACTO
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg md:text-2xl text-gray-700 font-medium leading-relaxed max-w-4xl mx-auto mb-12 px-4"
          >
            Impulsamos la transformación digital de corporaciones y grandes empresas en Chile y Latinoamérica. 
            Arquitecturas robustas, ciberseguridad avanzada y desarrollo de sistemas a medida con estándares internacionales.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
          >
            <a 
              href="#contacto"
              className="w-full sm:w-auto px-10 py-5 bg-[#002B5B] text-white font-bold text-base rounded-xl shadow-xl shadow-blue-900/15 hover:bg-[#001D3D] transition-all flex items-center justify-center gap-3"
            >
              Solicitar Consultoría Corporativa
            </a>
            <a 
              href="#servicios"
              className="w-full sm:w-auto px-8 py-5 bg-gray-50 border border-gray-200 text-gray-800 font-bold text-base rounded-xl hover:bg-gray-100 transition-all flex items-center justify-center gap-2"
            >
              Ver Soluciones Enterprise
            </a>
          </motion.div>

          {/* Corporate Trust Badges */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-12 border-t border-gray-100 max-w-4xl mx-auto text-left"
          >
            <div>
              <p className="text-2xl font-black text-[#002B5B]">PROSCOM SpA</p>
              <p className="text-xs text-gray-500 font-medium">Software & Tecnología</p>
            </div>
            <div>
              <p className="text-2xl font-black text-[#002B5B]">Vitacura</p>
              <p className="text-xs text-gray-500 font-medium">Av. Pres. Kennedy 5600</p>
            </div>
            <div>
              <p className="text-2xl font-black text-[#002B5B]">Ley N° 21.719</p>
              <p className="text-xs text-gray-500 font-medium">Ciberseguridad Corporativa</p>
            </div>
            <div>
              <p className="text-2xl font-black text-[#002B5B]">Latam Scope</p>
              <p className="text-xs text-gray-500 font-medium">Proyectos Multi-mercado</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
