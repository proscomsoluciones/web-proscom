import React from 'react';
import { ChevronRight, MapPin, Globe } from 'lucide-react';

const NewHero = () => (
  <header className="relative pt-28 pb-16 md:pt-44 md:pb-32 px-6 overflow-hidden bg-[#020202] text-white">
    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] -z-10 pointer-events-none text-center overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-blue-600/20 rounded-full blur-[120px]" />
    </div>

    <div className="max-w-6xl mx-auto text-center">
      <div className="inline-flex flex-wrap justify-center gap-3 mb-8">
        <div className="flex items-center gap-2 px-4 py-1.5 border border-blue-500/30 rounded-full bg-blue-500/5 text-blue-400 text-[10px] font-bold uppercase tracking-[0.2em]">
          <MapPin size={12} /> Quinta Región, Chile
        </div>
        <div className="flex items-center gap-2 px-4 py-1.5 border border-purple-500/30 rounded-full bg-purple-500/5 text-purple-400 text-[10px] font-bold uppercase tracking-[0.2em]">
          <Globe size={12} /> Experiencia en Latam
        </div>
      </div>
      
      <h1 className="text-3xl md:text-5xl lg:text-[6.5rem] font-black tracking-tighter leading-[0.95] mb-8 md:mb-12 italic uppercase break-words">
        SOFTWARE LÍDER <br />
        <span className="text-blue-500 not-italic">DE CORDILLERA A MAR.</span>
      </h1>

      <p className="text-xl md:text-2xl text-gray-400 mb-10 md:mb-14 max-w-4xl mx-auto leading-relaxed text-center">
        Asesoría experta con trayectoria en <span className="text-white">Colombia, México, Argentina y Perú</span>. Traigo estándares internacionales al desarrollo de sistemas en el <span className="text-white">Aconcagua y la costa chilena</span>.
      </p>

      <div className="flex flex-col sm:flex-row justify-center gap-6">
        <a href="#contacto" className="bg-blue-600 hover:bg-blue-500 text-white px-12 py-6 rounded-2xl font-black text-xl transition-all shadow-[0_20px_50px_-10px_rgba(37,99,235,0.5)] flex items-center justify-center gap-3 group">
          Agendar Consultoría Local
          <ChevronRight className="group-hover:translate-x-1 transition-transform" />
        </a>
        <a href="#internacional" className="bg-white/5 hover:bg-white/10 border border-white/10 text-white px-12 py-6 rounded-2xl font-black text-xl transition-all backdrop-blur-sm">
          Trayectoria Latam
        </a>
      </div>
    </div>
  </header>
);

export default NewHero;
