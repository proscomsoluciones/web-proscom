import React from 'react';
import { History, Target, Eye, Rocket } from 'lucide-react';
import ModernContactFooter from "@/components/ModernContactFooter";

export default function Nosotros() {
  return (
    <div className="min-h-screen bg-white">
      <main>
        {/* Hero Section Nosotros */}
        <section className="relative pt-32 pb-24 overflow-hidden bg-gray-50">
          <div className="container mx-auto px-6 relative z-10">
            <div className="max-w-4xl">
              <span className="text-blue-600 font-bold uppercase tracking-widest text-xs mb-3 block">PROSCOM SPA — SOLUCIONES ENTERPRISE</span>
              <h1 className="text-5xl md:text-7xl font-black text-[#002B5B] mb-8 tracking-tighter">
                SOLIDEZ CORPORATIVA & <br /> INNOVACIÓN GLOBAL.
              </h1>
              <p className="text-xl text-gray-700 leading-relaxed max-w-3xl">
                PROSCOM SpA es una compañía de ingeniería tecnológica y desarrollo de software enterprise con casa matriz en Vitacura, Santiago, creada para impulsar a grandes corporaciones mediante soluciones digitales de alto impacto.
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
                      <p className="text-blue-300 text-xs font-bold uppercase tracking-widest mt-1">Fundador & CEO — PROSCOM SpA</p>
                   </div>
                </div>
              </div>
              
              <div>
                <span className="text-blue-600 font-bold uppercase tracking-widest text-xs mb-3 block">Dirección Estratégica</span>
                <h2 className="text-4xl md:text-5xl font-black text-[#002B5B] mb-8 leading-tight">
                  Juan Ramón <br /> Cornejo G.
                </h2>
                <div className="space-y-6 text-gray-700 text-lg leading-relaxed">
                  <p className="font-bold text-xl text-[#002B5B]">
                    &quot;Construyendo tecnología robusta que escala con el crecimiento del negocio.&quot;
                  </p>
                  <p>
                    Con una vasta trayectoria en el diseño de software corporativo y consultorías internacionales en Colombia, México, Argentina y Perú, Juan Ramón lidera PROSCOM SpA asegurando estándares rigorosos de calidad, seguridad y cumplimiento normativo.
                  </p>
                  <p>
                    Desde nuestras oficinas centrales en Vitacura, Región Metropolitana, brindamos acompañamiento estratégico a nuestros clientes en sus proyectos digitales más ambiciosos.
                  </p>
                  
                  <div className="flex gap-8 pt-8 border-t border-gray-100">
                    <div>
                      <p className="text-3xl font-black text-[#002B5B]">04</p>
                      <p className="text-[10px] uppercase text-blue-600 font-bold tracking-widest">Países Latam</p>
                    </div>
                    <div className="w-px h-12 bg-gray-200" />
                    <div>
                      <p className="text-3xl font-black text-[#00529B]">Vitacura</p>
                      <p className="text-[10px] uppercase text-blue-600 font-bold tracking-widest">Casa Matriz</p>
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
                  <h2 className="text-3xl font-bold text-[#002B5B]">Evolución Corporativa</h2>
                </div>
                <div className="space-y-6 text-gray-700 text-lg leading-relaxed">
                  <p>
                    Tras años de trayectoria técnica e hitos de consultoría independiente desarrollados por Juan Ramón Cornejo G. en Colombia, México, Argentina y Perú, esa experiencia internacional se consolida hoy formalmente en PROSCOM SpA.
                  </p>
                  <p>
                    Constituidos como PROSCOM SpA con casa matriz en Av. Presidente Kennedy 5.600, Vitacura, integramos esa vasta vivencia técnica para ofrecer soluciones enterprise de software, ciberseguridad y consultoría estratégica de primer nivel.
                  </p>
                </div>
              </div>

              {/* Mission & Vision Cards */}
              <div className="grid grid-cols-1 gap-8">
                {/* Misión */}
                <div className="bg-[#002B5B] rounded-3xl p-10 text-white relative overflow-hidden group hover:bg-[#001D3D] transition-all">
                  <Target className="w-12 h-12 text-blue-400 mb-6" />
                  <h3 className="text-2xl font-bold mb-4">Nuestra Misión</h3>
                  <p className="text-blue-100 leading-relaxed">
                    Acelerar la competitividad de las grandes empresas mediante arquitecturas de software robustas, seguras y altamente escalables, eliminando la complejidad operativa.
                  </p>
                </div>

                {/* Visión */}
                <div className="bg-gray-50 rounded-3xl p-10 border border-gray-100 group hover:border-[#002B5B] transition-all">
                  <Eye className="w-12 h-12 text-[#002B5B] mb-6" />
                  <h3 className="text-2xl font-bold text-[#002B5B] mb-4">Nuestra Visión</h3>
                  <p className="text-gray-600 leading-relaxed">
                    Posicionarnos como el socio tecnológico corporativo de mayor confianza en Latinoamérica, reconocido por la excelencia técnica, transparencia y resiliencia de nuestras plataformas.
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
              <h2 className="text-4xl font-bold text-[#002B5B] mb-4">Principios Corporativos</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {[
                { title: 'Excelencia en Ingeniería', desc: 'Desarrollo robusto bajo las mejores prácticas y estándares internacionales.' },
                { title: 'Ciberseguridad & Compliance', desc: 'Cumplimiento estricto de marcos legales como la Ley N° 21.719 y protección de datos.' },
                { title: 'Compromiso Estratégico', desc: 'Acompañamiento continuo y alineación total con los objetivos de negocio.' }
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
