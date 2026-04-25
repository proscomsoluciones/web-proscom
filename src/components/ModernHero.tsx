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
            <span className="inline-block px-4 py-1.5 bg-blue-50 text-[#00529B] text-xs md:text-sm font-bold tracking-widest rounded-full mb-6 uppercase">
              Diseño de Páginas Web en el Valle del Aconcagua
            </span>
            <h1 className="text-4xl md:text-6xl lg:text-8xl font-black text-[#002B5B] leading-[1.1] tracking-tighter mb-10">
              SOFTWARE LÍDER DE <br />
              CORDILLERA A MAR.
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-base md:text-xl text-gray-800 font-medium leading-relaxed max-w-3xl mx-auto mb-16 px-4"
          >
            Asesoría experta con trayectoria en Colombia, México, Argentina y Perú. Traigo estándares internacionales al desarrollo de sistemas en el Aconcagua y la costa chilena.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex justify-center"
          >
            <button className="px-10 py-5 bg-[#00529B] text-white font-bold rounded-xl shadow-xl shadow-blue-900/10 hover:bg-[#002B5B] transition-all flex items-center gap-3">
              Agendar Consultoría Gratuita
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
