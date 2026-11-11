import React from "react";
import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { Button } from "@/components/ui/Button";
import { reveal } from "@/components/motion/reveal";
import { SmartPos } from "@/components/home/business/SmartPos";
import { MessageCircle, ArrowRight, TrendingUp } from "lucide-react";

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
                variant="whatsapp"
                size="lg"
                icon={<MessageCircle className="w-5 h-5" />}
                className="w-full sm:w-auto whitespace-nowrap px-7 py-4 rounded-xl shadow-lg shadow-emerald-500/30"
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
            <div className="relative lg:ml-6 pb-8 sm:pb-12">
              {/* Notebook */}
              <div className="relative w-[90%]">
                {/* Pantalla */}
                <div className="relative mx-auto w-[88%] rounded-t-[14px] sm:rounded-t-[18px] rounded-b-[3px] bg-[#0B0D12] p-[2%] pb-[2.6%] ring-1 ring-[#3B414C] shadow-[0_30px_60px_-25px_rgba(7,26,53,0.5)]">
                  {/* Cámara */}
                  <span className="absolute top-[0.8%] left-1/2 -translate-x-1/2 w-1 h-1 sm:w-1.5 sm:h-1.5 rounded-full bg-[#2A303A]" />
                  <div className="relative rounded-[3px] overflow-hidden bg-white">
                    <Image
                      src="/images/hero/panel-ventas.png"
                      alt="Panel de ventas y caja desarrollado por Proscom para un cliente"
                      width={852}
                      height={565}
                      preload
                      sizes="(max-width: 1024px) 90vw, 560px"
                      className="w-full h-auto"
                    />
                    {/* Reflejo del vidrio */}
                    <span className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/15 via-transparent to-transparent" />
                  </div>
                </div>
                {/* Base de aluminio */}
                <div aria-hidden="true" className="relative h-2.5 sm:h-3.5 rounded-t-[2px] rounded-b-[16px] bg-gradient-to-b from-[#EEF0F3] via-[#D3D7DD] to-[#9EA5B0] shadow-[0_18px_30px_-12px_rgba(7,26,53,0.45)]">
                  <span className="absolute top-0 left-1/2 -translate-x-1/2 w-[15%] h-[45%] rounded-b-md bg-[#BDC2CA]" />
                </div>
              </div>

              {/* Tarjeta flotante: resultado */}
              <div className="absolute -left-3 sm:-left-10 top-[14%] rounded-2xl bg-white/95 backdrop-blur border border-slate-200 shadow-xl p-4 sm:p-5 w-[190px] sm:w-[230px]">
                <p className="text-xs font-medium text-slate-500">Ventas del mes</p>
                <p className="mt-1 text-xl sm:text-2xl font-extrabold text-[#071A35]">$7.055.220</p>
                <p className="mt-1.5 inline-flex items-center gap-1 text-xs font-bold text-emerald-600">
                  <TrendingUp className="w-3.5 h-3.5" /> Sin planillas
                </p>
              </div>

              {/* Máquina Smart POS cobrando en el local */}
              <SmartPos
                width={270}
                className="absolute z-20 -right-4 sm:-right-6 bottom-0 origin-bottom-right scale-[0.6] sm:scale-[0.85] xl:scale-100"
              />
            </div>
          </div>
        </div>

        {/* Cifras de respaldo */}
        <div {...reveal("up", 300)} className="mt-16 lg:mt-20 grid grid-cols-2 lg:grid-cols-4 border-t border-slate-200">
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
