import React from 'react';
import { Globe2, ShieldCheck, MapPin, Building, Award, CheckCircle2 } from 'lucide-react';

const LatamPresence = () => {
  const countries = [
    {
      name: "Chile",
      role: "Casa Matriz Corporativa",
      city: "Vitacura, Santiago",
      flag: "🇨🇱",
      desc: "Sede central en Av. Presidente Kennedy 5.600, Of. 507. Dirección ejecutiva, desarrollo core y ciberseguridad."
    },
    {
      name: "Colombia",
      role: "Consultoría & Desarrollo",
      city: "Bogotá / Medellín",
      flag: "🇨🇴",
      desc: "Proyectos de transformación digital y optimización de plataformas de software empresariales."
    },
    {
      name: "México",
      role: "Estrategia & Software Enterprise",
      city: "Ciudad de México",
      flag: "🇲🇽",
      desc: "Implementación de arquitecturas cloud escalables y soluciones digitales para el mercado norteamericano."
    },
    {
      name: "Argentina",
      role: "Ingeniería de Sistemas",
      city: "Buenos Aires",
      flag: "🇦🇷",
      desc: "Desarrollo especializado e integración de sistemas complejos de alto rendimiento."
    },
    {
      name: "Perú",
      role: "Soluciones B2B & Consultoría",
      city: "Lima",
      flag: "🇵🇪",
      desc: "Asesoría tecnológica y modernización de infraestructuras críticas corporativas."
    }
  ];

  return (
    <section id="latam" className="py-24 bg-slate-900 text-white relative overflow-hidden">
      {/* Background Subtle Mesh */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-500/10 border border-blue-400/20 text-blue-400 text-xs font-bold tracking-widest rounded-full uppercase mb-4">
            <Globe2 className="w-4 h-4" /> Alcance & Experiencia Internacional
          </div>
          <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-6">
            Experiencia & Trayectoria Internacional
          </h2>
          <p className="text-lg text-slate-300 leading-relaxed font-normal">
            La sólida trayectoria técnica desarrollada por nuestro líder estratégico, <strong className="text-white font-semibold">Juan Ramón Cornejo G.</strong>, mediante proyectos de consultoría e ingeniería en <strong className="text-white font-semibold">Colombia, México, Argentina y Perú</strong>, constituye el estándar de calidad internacional que hoy canalizamos a través de <strong className="text-white font-semibold">PROSCOM SpA</strong> desde nuestra sede corporativa en <strong className="text-white font-semibold">Vitacura, Chile</strong>.
          </p>
        </div>

        {/* Countries Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-16">
          {countries.map((country, idx) => (
            <div 
              key={idx}
              className="bg-slate-800/80 border border-slate-700/60 rounded-2xl p-6 flex flex-col justify-between hover:border-blue-500/60 transition-all duration-300 group hover:-translate-y-1 shadow-lg"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-3xl">{country.flag}</span>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-1 bg-slate-700/80 text-blue-300 rounded-md">
                    {country.name}
                  </span>
                </div>
                <h3 className="text-base font-bold text-white mb-1 group-hover:text-blue-400 transition-colors">
                  {country.role}
                </h3>
                <p className="text-xs text-slate-400 font-semibold mb-3 flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-blue-400" /> {country.city}
                </p>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {country.desc}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-700/50 flex items-center gap-1.5 text-[11px] text-blue-400 font-medium">
                <CheckCircle2 className="w-3.5 h-3.5" /> Estándar Enterprise
              </div>
            </div>
          ))}
        </div>

        {/* Executive Summary Bar */}
        <div className="bg-blue-950/60 border border-blue-800/40 rounded-2xl p-8 max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-blue-600/20 rounded-xl text-blue-400 shrink-0">
              <Building className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-base font-bold text-white mb-1">PROSCOM SPA</h4>
              <p className="text-xs text-slate-300">Av. Pres. Kennedy 5600, Of. 507, Vitacura.</p>
            </div>
          </div>

          <div className="flex items-start gap-4 border-t md:border-t-0 md:border-l border-slate-700/60 pt-4 md:pt-0 md:pl-8">
            <div className="p-3 bg-blue-600/20 rounded-xl text-blue-400 shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-base font-bold text-white mb-1">Ley N° 21.719</h4>
              <p className="text-xs text-slate-300">Cumplimiento regulatorio en Ciberseguridad y Protección de Datos.</p>
            </div>
          </div>

          <div className="flex items-start gap-4 border-t md:border-t-0 md:border-l border-slate-700/60 pt-4 md:pt-0 md:pl-8">
            <div className="p-3 bg-blue-600/20 rounded-xl text-blue-400 shrink-0">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-base font-bold text-white mb-1">Calidad Garantizada</h4>
              <p className="text-xs text-slate-300">Metodologías de ingeniería ágil con altos estándares de disponibilidad.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LatamPresence;
