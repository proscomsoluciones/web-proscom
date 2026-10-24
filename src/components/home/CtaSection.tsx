import React from "react";
import { siteConfig } from "@/config/site";
import { Button } from "@/components/ui/Button";
import {
  MessageCircle,
  Mail,
  MapPin,
  CheckCircle2,
  Terminal,
  Code2,
  Database,
  Cloud,
  Smartphone,
  ShieldCheck,
  Cpu,
} from "lucide-react";
import { SplitWords } from "@/components/motion/SplitWords";
import { reveal } from "@/components/motion/reveal";

export const CtaSection: React.FC = () => {
  const whatsappUrl = `${siteConfig.contact.whatsappUrl}?text=${encodeURIComponent(
    siteConfig.contact.whatsappDefaultMessage
  )}`;

  // Iconos flotantes decorativos alrededor del panel
  const floatingIcons = [
    { Icon: Code2, pos: "top-[14%] left-[6%]", speed: "0.18", delay: "0s" },
    { Icon: Database, pos: "bottom-[18%] left-[10%]", speed: "-0.12", delay: "-2s" },
    { Icon: Cloud, pos: "top-[12%] right-[8%]", speed: "-0.16", delay: "-4s" },
    { Icon: Smartphone, pos: "bottom-[14%] right-[6%]", speed: "0.14", delay: "-1s" },
    { Icon: ShieldCheck, pos: "top-[48%] left-[2%]", speed: "0.08", delay: "-3s" },
    { Icon: Cpu, pos: "top-[52%] right-[2%]", speed: "-0.1", delay: "-5s" },
  ];

  return (
    <section className="relative py-24 bg-[#071A35] text-white overflow-hidden border-t border-white/10">
      {/* 1. Grid Pattern Texture */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-grid-pattern-dark opacity-30 [mask-image:radial-gradient(ellipse_at_center,white,transparent_75%)] pointer-events-none"
      />

      {/* 2. Central High-Intensity Neon Spotlight */}
      <div
        aria-hidden="true"
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[550px] pointer-events-none"
      >
        <div className="w-full h-full bg-gradient-to-r from-[#1479D4]/25 via-[#19C6E6]/20 to-[#1479D4]/25 rounded-full blur-[150px] animate-aurora" />
      </div>

      {/* Iconos tecnológicos flotando con parallax */}
      <div aria-hidden="true" className="hidden md:block absolute inset-0 pointer-events-none">
        {floatingIcons.map(({ Icon, pos, speed, delay }, i) => (
          <div key={i} data-parallax={speed} className={`absolute ${pos}`}>
            <div
              className="animate-float-rotate w-14 h-14 rounded-2xl bg-white/[0.04] border border-white/10 backdrop-blur-md flex items-center justify-center shadow-xl shadow-black/30"
              style={{ animationDelay: delay }}
            >
              <Icon className="w-6 h-6 text-[#19C6E6]/70" />
            </div>
          </div>
        ))}
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <div
        {...reveal("zoom")}
        className="border-beam rounded-[2rem] bg-[#0A1E3B]/60 border border-white/10 backdrop-blur-xl px-6 py-12 sm:px-12 sm:py-16 text-center space-y-8 shadow-2xl shadow-black/40"
      >
        {/* Terminal Pill Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/15 text-xs font-mono text-[#19C6E6] uppercase tracking-wider backdrop-blur-md shadow-md">
          <Terminal className="w-3.5 h-3.5" />
          <span>Hablemos de tu idea // Consulta Técnica</span>
        </div>

        {/* Headline */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight">
          <SplitWords text="¿Tienes un proyecto tecnológico en mente?" delay={250} />
        </h2>

        {/* Subtitle */}
        <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
          Cuéntanos qué necesitas y evaluemos cómo convertirlo en una solución digital eficiente. Desarrollo a medida, implementación y soporte en toda la Región Metropolitana, Valparaíso y Chile.
        </p>

        {/* Benefits bullets with tech pills */}
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs text-slate-300 pt-2">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Asesoría inicial sin costo</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Respuesta en menos de 24 hrs</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10">
            <MapPin className="w-4 h-4 text-[#19C6E6]" />
            <span>Vitacura, RM • Cobertura en todo Chile</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <span data-magnetic className="w-full sm:w-auto">
          <Button
            href={whatsappUrl}
            external
            variant="whatsapp"
            size="lg"
            icon={<MessageCircle className="w-5 h-5 fill-white stroke-none" />}
            className="btn-shine w-full sm:w-auto shadow-2xl shadow-[#25D366]/30 hover:scale-[1.02]"
          >
            Cotiza por WhatsApp
          </Button>
          </span>

          <span data-magnetic className="w-full sm:w-auto">
          <Button
            href="/contacto"
            variant="secondary"
            size="lg"
            icon={<Mail className="w-5 h-5" />}
            className="w-full sm:w-auto hover:border-[#19C6E6]/40 hover:scale-[1.02]"
          >
            Completar formulario web
          </Button>
          </span>
        </div>
      </div>
      </div>
    </section>
  );
};
