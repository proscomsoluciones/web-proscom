import { FaSearchDollar, FaFileInvoiceDollar, FaRegWindowClose, FaHistory, FaEye } from "react-icons/fa";

const problems = [
  {
    icon: <FaSearchDollar className="text-4xl text-red-500" />,
    title: "Falta de control financiero",
    description: "Desconocimiento de flujos reales, fugas de dinero y presupuestos desordenados."
  },
  {
    icon: <FaRegWindowClose className="text-4xl text-orange-500" />,
    title: "Procesos manuales",
    description: "Exceso de planillas Excel, correos perdidos y gestión ineficiente del tiempo."
  },
  {
    icon: <FaEye className="text-4xl text-yellow-500" />,
    title: "Información dispersa",
    description: "Datos críticos repartidos en múltiples lugares, dificultando la visión global."
  },
  {
    icon: <FaHistory className="text-4xl text-purple-500" />,
    title: "Baja trazabilidad",
    description: "Imposibilidad de auditar cambios, versiones antiguas o responsables de acciones."
  },
  {
    icon: <FaFileInvoiceDollar className="text-4xl text-blue-500" />,
    title: "Escasa visibilidad",
    description: "Toma de decisiones basada en intuición en lugar de datos concretos y actualizados."
  }
];

export default function ProblemsWeSolve() {
  return (
    <section className="py-24 bg-[#0F0F0F] relative">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            Problemas de gestión que ayudamos a resolver
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Identificamos y eliminamos los cuellos de botella que frenan el crecimiento de tu organización.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {problems.map((problem, index) => (
            <div 
              key={index} 
              className="group p-8 rounded-2xl bg-[#1a1a1a] border border-white/5 hover:border-white/10 transition-all duration-300 hover:bg-[#222]"
            >
              <div className="mb-6 p-4 rounded-full bg-black/50 w-fit group-hover:scale-110 transition-transform duration-300">
                {problem.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-3">
                {problem.title}
              </h3>
              <p className="text-gray-400 leading-relaxed">
                {problem.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
