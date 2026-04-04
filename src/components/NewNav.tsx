import React from 'react';

const Nav = () => (
  <nav className="fixed top-0 w-full z-50 backdrop-blur-xl border-b border-white/5 bg-black/60">
    <div className="max-w-7xl mx-auto flex justify-between items-center p-4 md:px-8 text-white">
      <div className="flex items-center gap-3 group cursor-pointer">
        <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20 group-hover:rotate-12 transition-transform text-white font-bold">
          P
        </div>
        <span className="text-xl font-black tracking-tighter uppercase">PROSCOM<span className="text-blue-500">.</span></span>
      </div>
      <div className="hidden md:flex gap-8 text-sm font-bold text-gray-400">
        <a href="#servicios" className="hover:text-white transition-colors">Soluciones</a>
        <a href="#internacional" className="hover:text-white transition-colors">Impacto Latam</a>
        <a href="#experto" className="hover:text-white transition-colors">Sobre Mí</a>
      </div>
      <a 
        href="#contacto" 
        className="bg-white text-black px-6 py-2.5 rounded-full text-sm font-bold hover:bg-blue-500 hover:text-white transition-all transform hover:scale-105 active:scale-95 shadow-xl"
      >
        Iniciar Consultoría
      </a>
    </div>
  </nav>
);

export default Nav;
