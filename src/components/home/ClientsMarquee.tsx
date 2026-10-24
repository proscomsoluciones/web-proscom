import React from "react";
import Image from "next/image";
import { reveal } from "@/components/motion/reveal";

const CLIENTS = [
  { src: "/images/clientes/marquee/cliente-lega-firma.png", name: "LegalFirma", subtitle: "Gestoría Vehicular" },
  { src: "/images/clientes/marquee/cliente-fichalo.png", name: "Fíchalo.cl", subtitle: "Fútbol Formativo" },
  { src: "/images/clientes/marquee/cliente-san-jose.png", name: "Colegio San José", subtitle: "Educación Básica" },
  { src: "/images/clientes/marquee/cliente-lyc.png", name: "Distribuidora LyC", subtitle: "Logística y Distribución" },
  { src: "/images/clientes/marquee/cliente-eleam.png", name: "Hnas. Hospitalarias", subtitle: "Gestión Asistencial" },
  { src: "/images/clientes/marquee/cliente-beerlover.png", name: "Beer Lover", subtitle: "Cervecería & Bar" },
  { src: "/images/clientes/marquee/logo.png", name: "AF Catemu", subtitle: "Asociación Deportiva" },
];

/** Cinta infinita de logos de clientes con estética dark-tech integrada */
export const ClientsMarquee: React.FC = () => {
  // Se duplica la lista para que el bucle sea continuo
  const loop = [...CLIENTS, ...CLIENTS];

  return (
    <section
      aria-label="Empresas y organizaciones que confían en nosotros"
      className="relative py-8 sm:py-10 bg-[#06152B] border-y border-white/10 overflow-hidden"
    >
      {/* Resplandor sutil de fondo */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_50%,rgba(20,121,212,0.12),transparent)] pointer-events-none"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div {...reveal("up")} className="flex items-center justify-center gap-3 mb-6 sm:mb-7">
          <span className="w-8 sm:w-16 h-px bg-gradient-to-r from-transparent to-[#19C6E6]/60" />
          <p className="text-center text-[10.5px] sm:text-[11px] font-mono font-semibold uppercase tracking-[0.25em] text-[#19C6E6] flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#19C6E6] animate-pulse" />
            Empresas y organizaciones que confían en nosotros
          </p>
          <span className="w-8 sm:w-16 h-px bg-gradient-to-l from-transparent to-[#19C6E6]/60" />
        </div>
      </div>

      <div className="marquee-track mask-fade-x relative z-10">
        <ul className="flex w-max items-center gap-6 sm:gap-8 animate-marquee py-1">
          {loop.map((client, i) => (
            <li
              key={`${client.name}-${i}`}
              aria-hidden={i >= CLIENTS.length ? "true" : undefined}
              className="shrink-0"
            >
              <div className="flex items-center gap-3.5 px-4 sm:px-5 py-2.5 sm:py-3 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-[#19C6E6]/50 transition-all duration-300 group shadow-[0_4px_16px_rgba(0,0,0,0.25)] hover:shadow-[0_0_24px_rgba(25,198,230,0.15)]">
                <div className="relative h-9 w-10 sm:h-10 sm:w-12 shrink-0 flex items-center justify-center p-1 rounded-lg bg-white/[0.07] border border-white/10 group-hover:bg-white/[0.12] transition-colors">
                  <Image
                    src={client.src}
                    alt={i >= CLIENTS.length ? "" : client.name}
                    width={56}
                    height={40}
                    className="max-h-7 sm:max-h-8 w-auto object-contain filter group-hover:scale-105 transition-transform"
                  />
                </div>
                <div className="flex flex-col text-left pr-2">
                  <span className="text-xs sm:text-sm font-semibold text-slate-200 group-hover:text-white transition-colors whitespace-nowrap">
                    {client.name}
                  </span>
                  <span className="text-[9.5px] sm:text-[10px] text-slate-400 font-mono tracking-wider whitespace-nowrap">
                    {client.subtitle}
                  </span>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

