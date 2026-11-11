import React from "react";
import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { Button } from "@/components/ui/Button";
import { reveal } from "@/components/motion/reveal";
import { SmartPos } from "@/components/home/business/SmartPos";
import { MessageCircle, ArrowRight, TrendingUp, CircleCheck } from "lucide-react";

const whatsappHref = `${siteConfig.contact.whatsappUrl}?text=${encodeURIComponent(
  "Hola, vi la página de Proscom y me gustaría conversar sobre mi negocio"
)}`;

// Cifras respaldadas por src/data/projects.ts y siteConfig
const STATS = [
  { value: "+15", label: "años de experiencia" },
  { value: "+10", label: "sistemas funcionando hoy" },
  { value: "+8", label: "rubros distintos" },
  { value: "Todo Chile", label: "cobertura nacional" },
];

export const BusinessHero: React.FC = () => {
  return (
    <section className="relative overflow-hidden bg-white">
      {/* Fondo: retícula de puntos muy sutil y luz de marca */}
      <div
        aria-hidden="true"
        className="absolute inset-0 [background-image:radial-gradient(#071A35_1px,transparent_1px)] [background-size:22px_22px] opacity-[0.06] [mask-image:linear-gradient(to_bottom,black,transparent_85%)] pointer-events-none"
      />
      <div aria-hidden="true" className="absolute -top-48 right-[-10%] w-[720px] h-[720px] rounded-full bg-[#1479D4]/12 blur-[140px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14 sm:pt-20 lg:pt-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-12 items-center">
          {/* Mensaje principal */}
          <div className="lg:col-span-6 text-center lg:text-left">
            <p {...reveal("up")} className="inline-flex items-center gap-3 text-sm font-semibold text-[#1373C9]">
              <span className="hidden sm:block w-8 h-px bg-[#1373C9]" />
              Soluciones digitales para negocios en Chile
            </p>

            <h1
              {...reveal("up", 100)}
              className="mt-5 text-[2.5rem] sm:text-6xl lg:text-[3.3rem] xl:text-[4.1rem] font-extrabold tracking-[-0.03em] leading-[1.04] text-[#071A35]"
            >
              Tu negocio ordenado,{" "}
              <span className="relative inline-block whitespace-nowrap text-[#1373C9]">
                vendiendo más
                <svg
                  aria-hidden="true"
                  viewBox="0 0 300 12"
                  preserveAspectRatio="none"
                  className="absolute left-0 -bottom-1 sm:-bottom-2 w-full h-2.5 sm:h-3 text-[#19C6E6]"
                >
                  <path d="M2 9 C 80 2, 220 2, 298 7" stroke="currentColor" strokeWidth="4" fill="none" strokeLinecap="round" />
                </svg>
              </span>
            </h1>

            <p {...reveal("up", 200)} className="mt-7 text-lg sm:text-xl text-slate-600 leading-relaxed max-w-xl mx-auto lg:mx-0">
              Creamos la página web, la tienda online y el sistema de ventas y
              caja que tu negocio necesita. Tú nos cuentas cómo trabajas; de la
              parte técnica nos encargamos nosotros.
            </p>

            <div {...reveal("up", 300)} className="mt-9 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3">
              <Button
                href={whatsappHref}
                external
                variant="primary"
                size="lg"
                icon={<MessageCircle className="w-5 h-5" />}
                className="w-full sm:w-auto whitespace-nowrap px-7 py-4 rounded-xl shadow-lg shadow-[#1479D4]/25"
              >
                Hablemos de tu negocio
              </Button>
              <Link
                href="/proyectos"
                className="w-full sm:w-auto whitespace-nowrap inline-flex items-center justify-center gap-2.5 px-6 py-4 rounded-xl text-base font-semibold text-[#071A35] bg-white border border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition-colors"
              >
                Ver casos reales
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>

          </div>

          {/* Producto real: panel de ventas de un cliente */}
          <div {...reveal("left", 200)} className="lg:col-span-6 relative">
            <div className="relative lg:ml-4 lg:mr-[-12%]">
              <div className="rounded-2xl bg-white border border-slate-200 shadow-[0_40px_80px_-20px_rgba(7,26,53,0.25)] overflow-hidden">
                {/* Barra de navegador */}
                <div className="flex items-center gap-2 px-4 py-3 bg-slate-50 border-b border-slate-200">
                  <span className="w-2.5 h-2.5 rounded-full bg-slate-300" />
                  <span className="w-2.5 h-2.5 rounded-full bg-slate-300" />
                  <span className="w-2.5 h-2.5 rounded-full bg-slate-300" />
                  <span className="ml-3 flex-1 max-w-[240px] h-6 rounded-md bg-white border border-slate-200 text-[11px] text-slate-400 flex items-center px-3">
                    Reporte de ventas
                  </span>
                </div>
                <Image
                  src="/images/hero/panel-ventas.png"
                  alt="Panel de ventas y caja desarrollado por Proscom para un cliente"
                  width={852}
                  height={565}
                  preload
                  sizes="(max-width: 1024px) 100vw, 640px"
                  className="w-full h-auto"
                />
              </div>

              {/* Tarjeta flotante: resultado */}
              <div className="absolute -left-3 sm:-left-8 -bottom-8 sm:-bottom-10 rounded-2xl bg-white border border-slate-200 shadow-xl p-4 sm:p-5 w-[210px] sm:w-[240px]">
                <p className="text-xs font-medium text-slate-500">Ventas del mes</p>
                <p className="mt-1 text-2xl font-extrabold text-[#071A35]">$7.055.220</p>
                <p className="mt-1.5 inline-flex items-center gap-1 text-xs font-bold text-emerald-600">
                  <TrendingUp className="w-3.5 h-3.5" /> Todo registrado, sin planillas
                </p>
              </div>

              {/* Máquina Smart POS cobrando en el local */}
              <SmartPos className="absolute z-20 right-1 sm:right-4 lg:right-[13%] -bottom-16 sm:-bottom-20 w-[118px] sm:w-[150px] rotate-[5deg]" />

              {/* Tarjeta flotante: caja */}
              <div className="hidden sm:flex absolute -top-6 right-6 lg:right-[14%] items-center gap-3 rounded-2xl bg-[#071A35] text-white shadow-xl px-4 py-3">
                <CircleCheck className="w-5 h-5 text-emerald-400" />
                <div>
                  <p className="text-sm font-semibold">Caja cerrada</p>
                  <p className="text-xs text-slate-300">Sin diferencias</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Cifras de respaldo */}
        <div {...reveal("up", 300)} className="mt-32 lg:mt-36 grid grid-cols-2 lg:grid-cols-4 border-t border-slate-200">
          {STATS.map((stat, idx) => (
            <div
              key={stat.label}
              className={`py-8 px-4 text-center lg:text-left ${idx % 2 === 1 ? "border-l border-slate-200" : ""} ${idx >= 2 ? "border-t lg:border-t-0 border-slate-200" : ""} ${idx === 2 ? "lg:border-l" : ""}`}
            >
              <p className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#071A35]">{stat.value}</p>
              <p className="mt-1 text-sm text-slate-500">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
