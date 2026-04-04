import React from 'react';
import { Globe } from 'lucide-react';

const NewFooter = () => (
  <footer className="py-20 border-t border-white/5 px-6 bg-black text-left text-white overflow-hidden">
    <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12 text-center md:text-left">
      <div>
        <div className="text-3xl font-black tracking-tighter mb-4 uppercase">PROSCOM<span className="text-blue-500">.</span>CL</div>
        <p className="text-gray-500 max-w-xs text-sm italic">Desarrollo y asesoría de software en la Quinta Región con alcance en toda Latinoamérica.</p>
      </div>
      
      <div className="flex flex-col md:flex-row gap-16">
        <div className="space-y-4">
          <h5 className="text-white font-bold text-xs uppercase tracking-widest text-blue-500 italic">Ejes Regionales</h5>
          <ul className="text-gray-500 space-y-2 text-[10px] font-bold uppercase tracking-widest">
            <li>Valle del Aconcagua</li>
            <li>Quillota / Limache</li>
            <li>Viña / Valparaíso</li>
          </ul>
        </div>
        <div className="space-y-4">
          <h5 className="text-white font-bold text-xs uppercase tracking-widest text-blue-500 italic">Asesoría Latam</h5>
          <ul className="text-gray-500 space-y-2 text-[10px] font-bold uppercase tracking-widest">
            <li>Colombia & México</li>
            <li>Argentina & Perú</li>
          </ul>
        </div>
      </div>
    </div>
    <div className="max-w-7xl mx-auto mt-24 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-[9px] text-gray-700 font-black uppercase tracking-[0.4em] text-center md:text-left">
      <p>© {new Date().getFullYear()} PROSCOM SpA. DE LA REGIÓN PARA EL MUNDO.</p>
      <div className="flex gap-4 items-center">
        <Globe size={12} />
        <span>LATAM CONSULTING STANDARDS</span>
      </div>
    </div>
  </footer>
);

export default NewFooter;
