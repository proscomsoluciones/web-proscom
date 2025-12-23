import { FaBuilding, FaFileAlt, FaGraduationCap, FaIndustry, FaCheckCircle } from "react-icons/fa";

const solutions = [
  {
    id: "org",
    title: "Gestión Organizacional",
    description: "Gestión organizacional digital para asociaciones, clubes y comunidades.",
    features: [
      "Control financiero organizaciones",
      "Control de pagos y membresías",
      "Software de gestión organizaciones sociales"
    ],
    icon: <FaBuilding className="text-blue-400" />,
    gradient: "from-blue-500/10 to-blue-500/5",
    border: "border-blue-500/20"
  },
  {
    id: "doc",
    title: "Gestión Documental",
    description: "Sistema de gestión documental para control, trazabilidad y publicación.",
    features: [
      "Trazabilidad documental",
      "Publicación de documentos en la web",
      "Transparencia documental"
    ],
    icon: <FaFileAlt className="text-purple-400" />,
    gradient: "from-purple-500/10 to-purple-500/5",
    border: "border-purple-500/20"
  },
  {
    id: "edu",
    title: "Educación",
    description: "Plataforma de gestión educativa y portal institucional.",
    features: [
      "Calendario escolar digital",
      "Planificación educativa anual",
      "Gestión administrativa educación"
    ],
    icon: <FaGraduationCap className="text-green-400" />,
    gradient: "from-green-500/10 to-green-500/5",
    border: "border-green-500/20"
  },
  {
    id: "prod",
    title: "Gestión Productiva",
    description: "Software de gestión para minería, agricultura y ganadería.",
    features: [
      "Control de costos productivos",
      "Control operativo digital",
      "Gestión administrativa productiva"
    ],
    icon: <FaIndustry className="text-orange-400" />,
    gradient: "from-orange-500/10 to-orange-500/5",
    border: "border-orange-500/20"
  }
];

export default function Solutions() {
  return (
    <section className="py-24 bg-[#0a0a0a] relative" id="soluciones">
       {/* Background Grid */}
       <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-5 pointer-events-none" />

      <div className="container px-4 md:px-6 mx-auto relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            Nuestras soluciones de gestión
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Plataformas especializadas y escalables para distintos tipos de industria.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {solutions.map((sol) => (
            <div 
              key={sol.id} 
              className={`p-8 rounded-3xl bg-gradient-to-br ${sol.gradient} border ${sol.border} backdrop-blur-sm group hover:-translate-y-1 transition-transform duration-300`}
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-black/40 rounded-xl border border-white/10 text-3xl">
                  {sol.icon}
                </div>
                <h3 className="text-2xl font-bold text-white">
                  {sol.title}
                </h3>
              </div>
              
              <p className="text-gray-300 mb-8 leading-relaxed h-20">
                {sol.description}
              </p>

              <div className="bg-black/20 rounded-xl p-6 border border-white/5">
                <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">Incluye:</h4>
                <ul className="space-y-3">
                  {sol.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <FaCheckCircle className="mt-1 text-blue-500 shrink-0" size={16} />
                      <span className="text-gray-300 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
