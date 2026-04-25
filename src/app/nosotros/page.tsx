import React from 'react';
import { History, Target, Eye, Rocket } from 'lucide-react';
import ModernNav from "@/components/ModernNav";
import ModernContactFooter from "@/components/ModernContactFooter";

export default function Nosotros() {
  return (
    <div className="min-h-screen bg-white">
      <main>
        {/* Hero Section Nosotros */}
        <section className="relative pt-32 pb-24 overflow-hidden bg-gray-50">
          <div className="container mx-auto px-6 relative z-10">
            <div className="max-w-4xl">
              <h1 className="text-6xl md:text-7xl font-black text-[#002B5B] mb-8 tracking-tighter">
                NUESTRA <br /> HISTORIA.
              </h1>
              <p className="text-xl text-gray-700 leading-relaxed max-w-2xl">
                Desde la Cordillera hasta el Mar, Proscom nació con la visión de llevar soluciones tecnológicas de clase mundial a los negocios regionales.
              </p>
            </div>
          </div>
          {/* Decorative SVG Arcs - Same style as landing */}
          <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 opacity-10 pointer-events-none">
             <svg width="600" height="600" viewBox="0 0 600 600" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="300" cy="300" r="299.5" stroke="#002B5B" strokeWidth="1" />
                <circle cx="300" cy="300" r="239.5" stroke="#002B5B" strokeWidth="1" />
             </svg>
          </div>
        </section>

        {/* Leadership Section */}
        <section className="py-24 bg-white">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="relative group max-w-md mx-auto lg:mx-0">
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
              
              <div>
                <span className="text-blue-600 font-bold uppercase tracking-widest text-sm mb-4 block">Liderazgo Experto</span>
                <h2 className="text-4xl md:text-5xl font-black text-[#002B5B] mb-8 leading-tight">
                  Juan Ramón <br /> Cornejo G.
                </h2>
                <div className="space-y-6 text-gray-700 text-lg leading-relaxed">
                  <p className="font-bold text-xl text-[#002B5B]">
                    &quot;Experto local con respaldo internacional.&quot;
                  </p>
                  <p>
                    Haber asesorado proyectos en **Colombia, México, Argentina y Perú** me ha dado una perspectiva única sobre cómo la tecnología debe servir al negocio para generar resultados reales.
                  </p>
                  <p>
                    Mi principal enfoque es devolver ese conocimiento a la **Quinta Región**. Ya sea para un packing en San Felipe o una oficina corporativa en Viña del Mar, diseño herramientas que no solo funcionan, sino que escalan a nivel global.
                  </p>
                  
                  <div className="flex gap-12 pt-8 border-t border-gray-100">
                    <div>
                      <p className="text-4xl font-black text-[#002B5B]">04</p>
                      <p className="text-[10px] uppercase text-blue-600 font-bold tracking-widest">Países Latam</p>
                    </div>
                    <div className="w-px h-12 bg-gray-100" />
                    <div>
                      <p className="text-4xl font-black text-[#00529B]">V Reg.</p>
                      <p className="text-[10px] uppercase text-blue-600 font-bold tracking-widest">Base Regional</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Content Section (Original Mission/Vision) */}
        <section className="py-24">
          <div className="container mx-auto px-6 text-black">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
              {/* History Block */}
              <div>
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 bg-[#002B5B] rounded-xl flex items-center justify-center text-white">
                    <History className="w-6 h-6" />
                  </div>
                  <h2 className="text-3xl font-bold text-[#002B5B]">Trayectoria Regional</h2>
                </div>
                <div className="space-y-6 text-gray-700 text-lg leading-relaxed">
                  <p>
                    Fundada en la Quinta Región, Proscom comenzó como una respuesta a la brecha tecnológica en San Felipe y Los Andes. Lo que empezó como un pequeño taller de desarrollo, rápidamente se expandió gracias a nuestra obsesión por la calidad y el impacto real.
                  </p>
                  <p>
                    Hoy, tras años de experiencia y proyectos exitosos en **Colombia, México, Argentina y Perú**, hemos traído esos estándares internacionales de vuelta a casa, elevando el nivel de la tecnología en el Aconcagua y todo Chile.
                  </p>
                </div>
              </div>

              {/* Mission & Vision Cards */}
              <div className="grid grid-cols-1 gap-8">
                {/* Misión */}
                <div className="bg-[#002B5B] rounded-3xl p-10 text-white relative overflow-hidden group hover:bg-black transition-all">
                  <Target className="w-12 h-12 text-blue-400 mb-6" />
                  <h3 className="text-2xl font-bold mb-4">Nuestra Misión</h3>
                  <p className="text-blue-100 leading-relaxed">
                    Potenciar el crecimiento de las empresas mediante software innovador, robusto y centrado en el usuario, eliminando las fronteras tecnológicas con soluciones de impacto global.
                  </p>
                </div>

                {/* Visión */}
                <div className="bg-gray-50 rounded-3xl p-10 border border-gray-100 group hover:border-[#002B5B] transition-all">
                  <Eye className="w-12 h-12 text-[#002B5B] mb-6" />
                  <h3 className="text-2xl font-bold text-[#002B5B] mb-4">Nuestra Visión</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Ser el referente tecnológico líder en Chile y Latinoamérica, reconocidos por nuestra capacidad de transformar negocios tradicionales en potencias digitales de vanguardia.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-24 bg-gray-50">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-[#002B5B] mb-4">Valores que nos mueven</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {[
                { title: 'Innovación sin Escusas', desc: 'Si no existe o es difícil, lo construimos mejor.' },
                { title: 'Impacto Real', desc: 'No solo escribimos código, resolvemos problemas de negocio.' },
                { title: 'Excelencia Regional', desc: 'Talento local con estándares globales de primer nivel.' }
              ].map((val, i) => (
                <div key={i} className="text-center p-8 bg-white rounded-2xl shadow-sm border border-gray-100">
                  <Rocket className="w-10 h-10 text-blue-600 mx-auto mb-6" />
                  <h4 className="text-xl font-bold text-[#002B5B] mb-4">{val.title}</h4>
                  <p className="text-gray-600">{val.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <ModernContactFooter />
      </main>
    </div>
  );
}
