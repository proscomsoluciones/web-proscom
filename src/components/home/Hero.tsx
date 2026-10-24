import React from "react";
import { Button } from "@/components/ui/Button";
import { NetworkCanvas } from "@/components/motion/NetworkCanvas";
import { TypewriterWords } from "@/components/motion/TypewriterWords";
import { HeroVisual } from "@/components/motion/HeroVisual";
import { reveal } from "@/components/motion/reveal";
import {
  Code2,
  Globe,
  Smartphone,
  LayoutDashboard,
  Headphones,
  ArrowRight,
  MessageCircle,
  ShieldCheck,
  Zap,
  Activity,
  Lock,
} from "lucide-react";

const ROTATING_WORDS = [
  "software a medida",
  "sitios web",
  "apps móviles",
  "sistemas de gestión",
  "soluciones reales",
];

export const Hero: React.FC = () => {
  const quickPillars = [
    {
      icon: <Code2 className="w-5 h-5 text-[#19C6E6]" />,
      title: "Desarrollo a medida",
      desc: "Software 100% exclusivo",
    },
    {
      icon: <Globe className="w-5 h-5 text-[#19C6E6]" />,
      title: "Páginas web profesionales",
      desc: "Rápidas y autoadministrables",
    },
    {
      icon: <Smartphone className="w-5 h-5 text-[#19C6E6]" />,
      title: "Aplicaciones móviles",
      desc: "Conectadas a tu operación",
    },
    {
      icon: <LayoutDashboard className="w-5 h-5 text-[#19C6E6]" />,
      title: "Sistemas de gestión",
      desc: "Control, ERP y POS",
    },
    {
      icon: <Headphones className="w-5 h-5 text-[#19C6E6]" />,
      title: "Soporte y mantenimiento",
      desc: "Acompañamiento continuo",
    },
  ];

  return (
    <section className="relative bg-[#071A35] text-white overflow-hidden pt-8 pb-16 lg:pt-14 lg:pb-24 border-b border-white/10">
      {/* 1. Tech Blueprint Grid Pattern Texture */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-grid-pattern-dark opacity-35 [mask-image:radial-gradient(ellipse_at_center,white,transparent_80%)] pointer-events-none"
      />

      {/* 2. Ambient Lighting Glow Orbs (en movimiento lento tipo aurora) */}
      <div
        aria-hidden="true"
        className="absolute -top-32 left-1/4 -translate-x-1/2 w-[700px] h-[700px] bg-[#1479D4]/20 rounded-full blur-[150px] pointer-events-none animate-aurora"
      />
      <div
        aria-hidden="true"
        className="absolute top-1/3 right-0 w-[600px] h-[600px] bg-[#19C6E6]/15 rounded-full blur-[140px] pointer-events-none animate-aurora-delayed"
      />

      {/* 3. Motion graphic: red de datos interactiva */}
      <NetworkCanvas className="opacity-70 [mask-image:radial-gradient(ellipse_at_center,white_30%,transparent_85%)]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Top Telemetry Live Status Bar */}
        <div {...reveal("down")} className="flex flex-wrap items-center justify-center lg:justify-start gap-3 mb-6 text-[11px] font-mono text-slate-300">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.06] border border-white/10 backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-white font-medium">Sistemas Operativos 24/7</span>
          </div>
          <div className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.04] border border-white/5">
            <Activity className="w-3.5 h-3.5 text-[#19C6E6]" />
            <span>Infraestructura Cloud</span>
          </div>
          <div className="hidden md:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.04] border border-white/5">
            <Lock className="w-3.5 h-3.5 text-emerald-400" />
            <span>Seguridad TLS 1.3</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Headlines & Call to actions */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Badge */}
            <div {...reveal("up", 80)} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-[#1479D4]/20 via-[#19C6E6]/15 to-transparent border border-[#19C6E6]/30 text-xs font-semibold text-[#19C6E6] tracking-wider uppercase backdrop-blur-md shadow-[0_0_15px_rgba(25,198,230,0.15)]">
              <Zap className="w-3.5 h-3.5 text-[#19C6E6]" />
              <span>Desarrollo de Software & Soluciones Tecnológicas</span>
            </div>

            {/* Main H1 — texto rotativo tipo terminal */}
            <h1
              {...reveal("blur", 160)}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.5rem] font-extrabold tracking-tight leading-[1.12]"
            >
              Transformamos ideas en{" "}
              <span className="sr-only">
                soluciones tecnológicas: software a medida, sitios web, apps móviles y sistemas de gestión
              </span>
              <TypewriterWords
                words={ROTATING_WORDS}
                className="block min-h-[1.2em] whitespace-nowrap"
              />
            </h1>

            {/* Subtitle */}
            <p {...reveal("up", 260)} className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl mx-auto lg:mx-0">
              Desarrollamos software a medida, páginas web, aplicaciones móviles y
              sistemas de gestión para empresas, organizaciones y emprendimientos
              en la Región Metropolitana, Valparaíso y todo Chile.
            </p>

            {/* Action Buttons */}
            <div {...reveal("up", 360)} className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-2">
              <span data-magnetic className="w-full sm:w-auto">
                <Button
                  href="/contacto"
                  variant="primary"
                  size="lg"
                  icon={<MessageCircle className="w-5 h-5" />}
                  className="btn-shine w-full sm:w-auto shadow-lg shadow-[#1479D4]/30"
                >
                  Cotiza tu proyecto
                </Button>
              </span>
              <Button
                href="/proyectos"
                variant="secondary"
                size="lg"
                icon={<ArrowRight className="w-4 h-4" />}
                className="w-full sm:w-auto hover:border-[#19C6E6]/40"
              >
                Explora nuestros proyectos
              </Button>
            </div>

            {/* Credibility highlights */}
            <div {...reveal("up", 460)} className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-y-2 gap-x-6 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>+15 años de experiencia del fundador</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#19C6E6]" />
                <span>Sede en Vitacura, RM • Cobertura en todo Chile</span>
              </div>
            </div>
          </div>

          {/* Right Column: Motion graphic (núcleo + órbitas + terminal + métricas) */}
          <div
            {...reveal("zoom", 250)}
            className="lg:col-span-5 flex justify-center items-center px-8 sm:px-10 lg:px-0 pb-28 sm:pb-0"
          >
            <div data-parallax="-0.07" className="w-full">
              <HeroVisual />
            </div>
          </div>
        </div>

        {/* Bottom Hero Bar: 5 Core Service Pillars with Tech Cards */}
        <div className="mt-16 pt-8 border-t border-white/10">
          <div className="grid grid-cols-1 min-[400px]:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
            {quickPillars.map((pillar, idx) => (
              <div
                key={idx}
                {...reveal("up", 500 + idx * 90)}
                className="flex items-start gap-3 p-3.5 rounded-xl bg-white/[0.04] border border-white/10 hover:bg-white/[0.08] hover:border-[#19C6E6]/30 transition-all duration-200 group"
              >
                <div className="p-2 rounded-lg bg-gradient-to-br from-[#1479D4]/30 to-[#19C6E6]/10 border border-[#19C6E6]/20 shrink-0 group-hover:scale-105 transition-transform">
                  {pillar.icon}
                </div>
                <div>
                  <h2 className="text-xs font-semibold text-white group-hover:text-[#19C6E6] transition-colors">
                    {pillar.title}
                  </h2>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    {pillar.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
