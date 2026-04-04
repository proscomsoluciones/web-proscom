import React from 'react';
import { Globe, Sparkles, Flag } from 'lucide-react';

const Internacional = () => {
  const countries = ["Chile", "Colombia", "México", "Argentina", "Perú"];

  return (
    <section id="internacional" className="py-16 md:py-32 px-6 bg-[#020202] text-white overflow-hidden">
      <div className="max-w-7xl mx-auto bg-gradient-to-br from-blue-900/40 via-blue-950/20 to-transparent p-8 md:p-24 rounded-[2.5rem] md:rounded-[4rem] border border-blue-500/10 relative overflow-hidden text-left group">
         <Globe className="absolute -top-10 -right-10 text-blue-500/5 w-[500px] h-[500px] -z-10 group-hover:rotate-12 transition-transform duration-[3000ms]" />
         <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-6 border border-blue-500/30 rounded-full bg-blue-500/5 text-blue-400 text-[10px] font-bold uppercase tracking-[0.2em]">
              <Sparkles size={12} /> Alcance Multipaís
            </div>
            <h2 className="text-4xl md:text-6xl font-black mb-8 tracking-tighter uppercase italic">Experiencia que <br />cruza fronteras.</h2>
            <p className="text-xl text-gray-300 leading-relaxed mb-12">
              Mi metodología ha sido validada asesorando a empresas en los mercados más dinámicos de la región. Aplico esta visión global para resolver problemas locales con precisión.
            </p>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
               {countries.map((country) => (
                 <div key={country} className="flex flex-col gap-2 p-6 rounded-3xl bg-white/5 border border-white/5 hover:border-blue-500/30 transition-all text-center md:text-left">
                    <Flag size={20} className="text-blue-500 mx-auto md:mx-0" />
                    <span className="font-bold text-lg text-white">{country}</span>
                    <span className="text-[10px] uppercase text-gray-500 font-bold tracking-widest">Asesoría TI</span>
                 </div>
               ))}
            </div>
         </div>
      </div>
    </section>
  );
};

export default Internacional;
