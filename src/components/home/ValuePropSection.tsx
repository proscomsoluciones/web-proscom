import React from "react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { CountUp } from "@/components/motion/CountUp";
import { ValueScene } from "@/components/home/ValueScene";
import {
  ShieldCheck,
  CheckCircle,
  Users,
  MapPin,
  ArrowRight,
  Cpu,
  Terminal,
} from "lucide-react";
import { reveal } from "@/components/motion/reveal";
import { SplitWords } from "@/components/motion/SplitWords";

export const ValuePropSection: React.FC = () => {
  const valuePoints = [
    {
      title: "Desarrollo 100% personalizado",
      description:
        "Construimos el sistema pensando en tu forma de operar, sin forzarte a pagar licencias mensuales por funciones que no usas.",
    },
    {
      title: "Análisis funcional exhaustivo",
      description:
        "No tiramos código sin antes entender la lógica real de tu negocio, los cuellos de botella y las metas que buscas cumplir.",
    },
    {
      title: "Arquitectura escalable",
      description:
        "Bases de datos optimizadas y código modular que permiten añadir nuevas funciones o sucursales a medida que creces.",
    },
    {
      title: "Comunicación directa sin intermediarios",
      description:
        "Hablas directamente con el equipo a cargo de programar tu sistema, asegurando agilidad y respuestas claras.",
    },
  ];

  const statPillars = [
    {
      icon: <ShieldCheck className="w-6 h-6 text-[#1479D4]" />,
      value: <CountUp value={15} prefix="+" />,
      label: "Años de experiencia",
      detail: "Trayectoria técnica del fundador en análisis y desarrollo",
      badge: "Know-How",
    },
    {
      icon: <MapPin className="w-6 h-6 text-[#1479D4]" />,
      value: "Chile",
      label: "Cobertura nacional",
      detail: "Sede en Vitacura, RM y cobertura en todo Chile",
      badge: "Alcance",
    },
    {
      icon: <Users className="w-6 h-6 text-[#1479D4]" />,
      value: "Múltiples",
      label: "Sectores atendidos",
      detail: "Comercio, logística, fundaciones, deporte y educación",
      badge: "Adaptabilidad",
    },
    {
      icon: <Cpu className="w-6 h-6 text-[#1479D4]" />,
      value: <CountUp value={100} suffix="%" />,
      label: "Código propio",
      detail: "Sistemas robustos sin ataduras a softwares genéricos",
      badge: "Propiedad",
    },
  ];

  return (
    <section className="relative py-24 bg-white border-b border-slate-200 overflow-hidden">
      {/* Subtle Grid Texture */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-grid-pattern-light opacity-30 pointer-events-none"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Visual graphic with Layered Frame */}
          <div {...reveal("left")} className="lg:col-span-5 order-2 lg:order-1">
            <div data-parallax="-0.06" className="relative rounded-3xl overflow-hidden border border-slate-200 shadow-2xl bg-slate-900 group">
              {/* Escena 3D animada (reemplaza la imagen estática) */}
              <div className="relative w-full bg-gradient-to-b from-[#0A1E3B] to-[#071A35]">
                <ValueScene />
              </div>

              {/* Floating Tech Console Bar */}
              <div className="p-5 bg-[#071A35] text-white border-t border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#1479D4]/20 border border-[#1479D4]/40 flex items-center justify-center text-[#19C6E6]">
                    <Terminal className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-mono font-bold text-white">
                      Arquitectura & Rendimiento
                    </h4>
                    <p className="text-[11px] text-slate-400">
                      Entregamos soluciones probadas en producción
                    </p>
                  </div>
                </div>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              </div>
            </div>
          </div>

          {/* Right Column: Narrative */}
          <div {...reveal("right", 120)} className="lg:col-span-7 order-1 lg:order-2 space-y-6">
            <Badge variant="blue" className="shadow-sm">
              Propuesta de Valor Tecnológica
            </Badge>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#071A35] tracking-tight leading-tight">
              <SplitWords text="Tecnología al servicio de las personas y organizaciones" delay={200} />
            </h2>

            <p className="text-base text-slate-600 leading-relaxed">
              En Proscom desarrollamos soluciones tecnológicas que aportan a la gestión, el control y el crecimiento de empresas, organizaciones sociales y emprendimientos en todo Chile.
            </p>
            <p className="text-base text-slate-600 leading-relaxed">
              Nuestro objetivo es simple: entregar herramientas que resuelvan problemas reales, ahorren horas de trabajo manual y generen un impacto positivo y medible en tu día a día.
            </p>

            {/* Value checklist with tech accents */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {valuePoints.map((point, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-xl bg-[#F3F6FA] border border-slate-200/80 hover:border-[#1479D4]/30 transition-colors"
                >
                  <div className="flex items-start gap-2.5">
                    <CheckCircle className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <div>
                      <h3 className="text-xs sm:text-sm font-bold text-[#071A35]">
                        {point.title}
                      </h3>
                      <p className="text-[11px] sm:text-xs text-slate-500 mt-0.5 leading-normal">
                        {point.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Action */}
            <div className="pt-4">
              <Button
                href="/nosotros"
                variant="outline"
                size="md"
                icon={<ArrowRight className="w-4 h-4" />}
                className="shadow-sm hover:border-[#1479D4]"
              >
                Conoce más sobre nosotros
              </Button>
            </div>
          </div>
        </div>

        {/* 4 Pillars Stats Grid with Tech Cards */}
        <div className="mt-16 pt-12 border-t border-slate-200">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {statPillars.map((stat, idx) => (
              <div
                key={idx}
                {...reveal("up", idx * 100)}
                data-tilt
                className="tech-card-light rounded-2xl p-6 relative overflow-hidden"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="w-11 h-11 rounded-xl bg-[#1479D4]/10 border border-[#1479D4]/20 flex items-center justify-center text-[#1479D4]">
                    {stat.icon}
                  </div>
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-600 border border-slate-200">
                    {stat.badge}
                  </span>
                </div>
                <div className="text-2xl sm:text-3xl font-extrabold text-[#071A35] tracking-tight">
                  {stat.value}
                </div>
                <div className="text-xs sm:text-sm font-bold text-[#1479D4] mt-1">
                  {stat.label}
                </div>
                <div className="text-xs text-slate-500 mt-1 leading-relaxed">
                  {stat.detail}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
