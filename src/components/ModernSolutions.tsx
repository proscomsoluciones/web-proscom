import React from 'react';
import { ShoppingCart, Smartphone, Cpu, Globe, Lightbulb, Shield } from 'lucide-react';

const Solutions = () => {
  return (
    <section id="servicios" className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-16 items-start">
          {/* Left Column */}
          <div className="lg:w-1/2">
            <span className="text-blue-600 font-bold uppercase tracking-widest text-xs mb-3 block">Soluciones de Clase Mundial</span>
            <h2 className="text-4xl md:text-5xl font-extrabold text-[#002B5B] mb-8 leading-tight">
              Ingeniería Tecnológica <br /> para Grandes Empresas
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              En PROSCOM SpA diseñamos y construimos ecosistemas tecnológicos escalables. Respaldados por una sólida trayectoria en mercados de Colombia, México, Argentina y Perú, traemos estándares de ingeniería enterprise para potenciar la competitividad de corporaciones en Chile y Latinoamérica.
            </p>
          </div>

          {/* Right Column */}
          <div className="lg:w-1/2">
            <h3 className="text-2xl font-bold text-[#002B5B] mb-8">Servicios Enterprise</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {[
                { title: 'Software a Medida', icon: <Cpu className="w-8 h-8" /> },
                { title: 'Plataformas Web', icon: <Globe className="w-8 h-8" /> },
                { title: 'Apps Corporativas', icon: <Smartphone className="w-8 h-8" /> },
                { title: 'E-commerce B2B/B2C', icon: <ShoppingCart className="w-8 h-8" /> },
                { title: 'Ciberseguridad', icon: <Shield className="w-8 h-8" /> },
                { title: 'Consultoría Cloud', icon: <Lightbulb className="w-8 h-8" /> }
              ].map((item, i) => (
                <div key={i} className="bg-white border border-gray-100 rounded-2xl p-6 flex flex-col items-center justify-center shadow-sm text-center group hover:border-[#002B5B] hover:shadow-md transition-all">
                  <div className="text-[#002B5B] mb-4 transform group-hover:scale-110 transition-transform">
                    {item.icon}
                  </div>
                  <span className="text-sm font-bold text-gray-800 tracking-tight leading-tight">{item.title}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Solutions;
