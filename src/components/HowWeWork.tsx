import { FaSearch, FaCogs, FaHandHoldingHeart } from "react-icons/fa";

const steps = [
  {
    number: "01",
    title: "Diagnóstico",
    description: "Analizamos los procesos actuales y detectamos los puntos críticos de gestión.",
    icon: <FaSearch className="text-2xl text-blue-400" />
  },
  {
    number: "02",
    title: "Implementación",
    description: "Configuramos la plataforma según la realidad de la organización, sin soluciones genéricas.",
    icon: <FaCogs className="text-2xl text-purple-400" />
  },
  {
    number: "03",
    title: "Acompañamiento",
    description: "Acompañamos la operación y evolución de la solución en el tiempo.",
    icon: <FaHandHoldingHeart className="text-2xl text-green-400" />
  }
];

export default function HowWeWork() {
  return (
    <section className="py-24 bg-[#0F0F0F]">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            Cómo trabajamos en Proscom
          </h2>
          <p className="text-gray-400">
            Un modelo enfocado en resultados y relaciones de largo plazo.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto relative">
          {/* Connector Line (Desktop) */}
          <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-0.5 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-green-500/20 z-0" />

          {steps.map((step, index) => (
            <div key={index} className="relative z-10 flex flex-col items-center text-center group">
              <div className="w-24 h-24 rounded-full bg-[#1a1a1a] border border-white/10 flex items-center justify-center mb-6 group-hover:border-white/30 transition-colors shadow-xl">
                 {step.icon}
              </div>
              <div className="text-sm font-bold text-blue-500 mb-2 tracking-widest">PASO {step.number}</div>
              <h3 className="text-xl font-bold text-white mb-4">{step.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
