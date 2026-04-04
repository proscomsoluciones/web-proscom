import React from 'react';
import { Code2 } from 'lucide-react';
import Image from 'next/image';

const AboutMe = () => (
  <section id="experto" className="py-16 md:py-32 px-6 bg-white/[0.01] border-y border-white/5 text-left text-white overflow-hidden">
    <div className="max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center text-left">
        <div className="relative group">
          <div className="absolute -inset-4 bg-blue-600/20 rounded-[3rem] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
          <div className="relative aspect-[4/5] bg-[#0a0a0a] rounded-[3rem] border border-white/10 overflow-hidden shadow-2xl transition-transform duration-700 hover:scale-[0.98]">
            <Image
              src="/juan-ramon.png"
              alt="Juan Ramón Cornejo"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black via-black/80 to-transparent">
              <p className="text-2xl font-bold text-white mb-1">Juan Ramón Cornejo G.</p>
              <p className="text-blue-500 text-xs font-bold uppercase tracking-widest">Especialista en Software Latam</p>
            </div>
          </div>
        </div>
        
        <div>
          <h2 className="text-4xl md:text-5xl font-bold mb-8 tracking-tighter italic text-blue-500 uppercase">&quot;Experto local con <br />respaldo internacional.&quot;</h2>
          <div className="space-y-6 text-gray-400 text-lg leading-relaxed">
            <p>
              Haber asesorado proyectos en <strong>Colombia, México, Argentina y Perú</strong> me ha dado una perspectiva única sobre cómo la tecnología debe servir al negocio. 
            </p>
            <p>
              Hoy, mi enfoque es devolver ese conocimiento a la <strong>Quinta Región</strong>. Ya sea en un packing en San Felipe o en una oficina en Viña del Mar, diseño herramientas que no solo funcionan, sino que escalan.
            </p>
            <div className="flex gap-12 pt-8">
              <div>
                <p className="text-4xl font-black text-white italic">04</p>
                <p className="text-[10px] uppercase text-blue-500 font-bold tracking-widest">Países Latam</p>
              </div>
              <div className="w-px h-12 bg-white/10" />
              <div>
                <p className="text-4xl font-black text-white italic">V Reg.</p>
                <p className="text-[10px] uppercase text-blue-500 font-bold tracking-widest">Base de Operaciones</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default AboutMe;
