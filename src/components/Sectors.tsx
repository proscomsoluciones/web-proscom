import Link from "next/link";
import { FaUsers, FaFutbol, FaSchool, FaTractor, FaHammer, FaLeaf } from "react-icons/fa";

const sectors = [
  { icon: <FaUsers />, name: "Organizaciones Sociales", link: "https://soluciones.proscom.cl/organizaciones" },
  { icon: <FaFutbol />, name: "Asociaciones Deportivas", link: "https://soluciones.proscom.cl/deporte" },
  { icon: <FaSchool />, name: "Educación", link: "https://soluciones.proscom.cl/educacion" },
  { icon: <FaHammer />, name: "Pequeña Minería", link: "https://soluciones.proscom.cl/mineria" },
  { icon: <FaLeaf />, name: "Agricultura", link: "https://soluciones.proscom.cl/agricultura" },
  { icon: <FaTractor />, name: "Ganadería", link: "https://soluciones.proscom.cl/ganaderia" },
];

export default function Sectors() {
  return (
    <section className="py-24 bg-[#0a0a0a]">
      <div className="container px-4 md:px-6 mx-auto text-center">
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-12">
          Sectores donde implementamos soluciones
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {sectors.map((sector, index) => (
            <Link 
              key={index} 
              href={sector.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center justify-center p-6 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors group cursor-pointer"
            >
              <div className="text-3xl text-gray-400 group-hover:text-blue-400 mb-4 transition-colors">
                {sector.icon}
              </div>
              <span className="text-sm font-medium text-gray-300">
                {sector.name}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
