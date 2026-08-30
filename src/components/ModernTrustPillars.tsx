import React from 'react';
import { ShieldCheck, Cpu, Building2, BarChart3, Lock, Users } from 'lucide-react';

const TrustPillars = () => {
  const pillars = [
    {
      icon: <Building2 className="w-8 h-8 text-[#002B5B]" />,
      title: "Solidez & Estructura Corporativa",
      desc: "Constituidos formalmente como PROSCOM SpA con oficinas en la comuna de Vitacura, brindamos respaldo legal y contractual para operaciones corporativas."
    },
    {
      icon: <Cpu className="w-8 h-8 text-[#002B5B]" />,
      title: "Ingeniería de Software Enterprise",
      desc: "Arquitecturas modulares, desarrollo full-stack escalable e integraciones críticas diseñadas para operar sin interrupciones con alta concurrencia."
    },
    {
      icon: <ShieldCheck className="w-8 h-8 text-[#002B5B]" />,
      title: "Cumplimiento Ley N° 21.719",
      desc: "Adecuación integral a la Ley Marco de Ciberseguridad en Chile, garantizando protocolos de cifrado, auditoría de vulnerabilidades y gobierno de datos."
    },
    {
      icon: <BarChart3 className="w-8 h-8 text-[#002B5B]" />,
      title: "Experiencia Latam Consolidada",
      desc: "Trayectoria acreditada en proyectos de alta complejidad técnica en Chile, Colombia, México, Argentina y Perú."
    },
    {
      icon: <Lock className="w-8 h-8 text-[#002B5B]" />,
      title: "Protección & Seguridad de Información",
      desc: "Implementación de modelos de seguridad Zero-Trust, control de accesos por roles (RBAC) y prevención de fuga de información (DLP)."
    },
    {
      icon: <Users className="w-8 h-8 text-[#002B5B]" />,
      title: "Consultoría Estratégica Senior",
      desc: "Equipo multidisciplinario liderado por consultores sénior con más de 15 años de experiencia ejecutiva en dirección de tecnología."
    }
  ];

  return (
    <section className="py-20 bg-slate-50 border-b border-slate-100">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-blue-600 font-bold uppercase tracking-widest text-xs mb-3 block">
            Garantía & Confianza Empresarial
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#002B5B] tracking-tight mb-4">
            ¿Por qué grandes empresas eligen PROSCOM SpA?
          </h2>
          <p className="text-slate-600 text-base leading-relaxed">
            Metodología rigurosa, estándares internacionales de ingeniería y compromiso total con el éxito operativo de nuestros clientes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {pillars.map((pillar, index) => (
            <div 
              key={index}
              className="bg-white p-8 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md hover:border-[#002B5B]/40 transition-all group"
            >
              <div className="p-3 bg-blue-50 rounded-xl w-fit mb-6 group-hover:bg-[#002B5B] group-hover:text-white transition-colors duration-300">
                {pillar.icon}
              </div>
              <h3 className="text-xl font-bold text-[#002B5B] mb-3 leading-snug">
                {pillar.title}
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                {pillar.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustPillars;
