"use client";

import React from "react";
import { siteConfig } from "@/config/site";
import { Button } from "@/components/ui/Button";
import {
  Sparkles,
  Zap,
  ArrowRight,
  ShieldCheck,
  Video,
} from "lucide-react";
import { reveal } from "@/components/motion/reveal";
import { SplitWords } from "@/components/motion/SplitWords";
import { WebsiteExplodeStage } from "@/components/home/WebsiteExplodeStage";

export const MotionVideoSection: React.FC = () => {
  return (
    <section className="relative py-24 bg-[#071A35] text-white overflow-hidden border-b border-white/10">
      {/* Background Lighting & Grid Texture */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-grid-pattern-dark opacity-35 [mask-image:radial-gradient(ellipse_at_center,white,transparent_80%)] pointer-events-none"
      />
      <div
        aria-hidden="true"
        className="absolute top-1/3 left-1/4 w-[600px] h-[600px] bg-[#1479D4]/20 rounded-full blur-[150px] pointer-events-none animate-aurora"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: 3D Exploded Website Build */}
          <div {...reveal("zoom")} className="lg:col-span-5 flex justify-center">
            <div data-parallax="-0.08" className="relative w-full max-w-[400px] group">
              {/* Glowing Aura */}
              <div className="absolute -inset-3 bg-gradient-to-r from-[#1479D4]/30 via-[#19C6E6]/25 to-[#1688F5]/30 rounded-[38px] blur-2xl group-hover:blur-3xl transition-all opacity-80" />

              {/* 3D Build Frame */}
              <div className="relative rounded-[32px] overflow-hidden border-2 border-white/20 bg-gradient-to-b from-[#0A1E3B] to-[#071A35] shadow-2xl shadow-black/80">
                <WebsiteExplodeStage />

                {/* Caption Bar */}
                <div className="absolute bottom-4 inset-x-4 flex items-center justify-center p-2.5 rounded-2xl bg-black/60 backdrop-blur-md border border-white/15">
                  <span className="text-[11px] font-mono text-[#19C6E6] font-semibold">
                    HTML + CSS + JS // Construcción en vivo
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Narrative & 3D Build Pitch */}
          <div {...reveal("right", 150)} className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-xs font-mono text-[#19C6E6] uppercase tracking-wider backdrop-blur-sm">
              <Video className="w-3.5 h-3.5" />
              <span>Proscom en Movimiento // Desarrollo Web 3D</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight">
              <SplitWords text="Tecnología que comunica, cautiva y genera resultados" delay={250} />
            </h2>

            <p className="text-base text-slate-300 leading-relaxed">
              En Proscom combinamos el poder de la ingeniería de software con diseño visual y piezas interactivas en 3D de alto impacto. Creamos herramientas digitales donde la experiencia visual potencia la usabilidad y la conversión comercial.
            </p>

            {/* Feature Points */}
            <div className="space-y-3.5 pt-2">
              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-white/[0.04] border border-white/10 text-left">
                <Sparkles className="w-5 h-5 text-[#19C6E6] shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-sm font-bold text-white">
                    Animación e Interfaces Vivas
                  </h3>
                  <p className="text-xs text-slate-300 mt-0.5">
                    Microinteracciones, transiciones fluidas y gráficos dinámicos que guían al usuario sin distracciones innecesarias.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-white/[0.04] border border-white/10 text-left">
                <Zap className="w-5 h-5 text-[#1479D4] shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-sm font-bold text-white">
                    Velocidad y Optimización Móvil
                  </h3>
                  <p className="text-xs text-slate-300 mt-0.5">
                    Todos nuestros recursos multimedia están optimizados en WebP, AVIF y video comprimido para no ralentizar la navegación.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 rounded-xl bg-white/[0.04] border border-white/10 text-left">
                <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-sm font-bold text-white">
                    Soluciones que Representan a tu Empresa
                  </h3>
                  <p className="text-xs text-slate-300 mt-0.5">
                    Diseños que proyectan solidez corporativa, liderazgo en tu sector y capacidad tecnológica comprobada.
                  </p>
                </div>
              </div>
            </div>

            {/* Action */}
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5">
              <Button
                href="/contacto"
                variant="primary"
                size="md"
                icon={<ArrowRight className="w-4 h-4" />}
              >
                Cotizar desarrollo interactivo
              </Button>
              <Button
                href={siteConfig.contact.whatsappUrl}
                external
                variant="whatsapp"
                size="md"
              >
                Consultar por WhatsApp
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
