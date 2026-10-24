import React from "react";
import Link from "next/link";
import { servicesData } from "@/data/services";
import { Badge } from "@/components/ui/Badge";
import { reveal } from "@/components/motion/reveal";
import { SplitWords } from "@/components/motion/SplitWords";
import {
  ServicesExplorer,
  type ExplorerService,
} from "@/components/home/services/ServicesExplorer";

const TECH_TAGS: Record<string, string> = {
  "software-a-medida": "Arquitectura Modular • Cloud",
  "desarrollo-web": "Next.js • SEO • Core Web Vitals",
  ecommerce: "Catálogo • Envíos • Conversión",
  "medios-de-pago": "Webpay Plus • Mercado Pago • Flow",
  "aplicaciones-moviles": "iOS / Android • Modo Offline",
  "sistemas-de-gestion": "ERP / POS • Control en Tiempo Real",
  integraciones: "APIs REST • Webhooks • Pasarelas",
  "soporte-tecnologico": "Monitoreo 24/7 • Respaldos",
};

export const ServicesSection: React.FC = () => {
  // Solo se envían al cliente los datos que usa el explorador
  const services: ExplorerService[] = servicesData.map((s) => ({
    slug: s.slug,
    title: s.title,
    shortDescription: s.shortDescription,
    iconName: s.iconName,
    techTag: TECH_TAGS[s.slug] ?? "Solución Empresarial",
    highlights: [...s.benefits.slice(0, 2), ...s.features.slice(0, 2)],
  }));

  return (
    <section
      id="servicios"
      className="relative py-24 bg-[#F3F6FA] border-b border-slate-200 overflow-hidden"
    >
      {/* Textura de cuadrícula técnica */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-grid-pattern-light opacity-50 [mask-image:radial-gradient(ellipse_at_center,white,transparent_85%)] pointer-events-none"
      />
      {/* Luces ambientales en movimiento */}
      <div
        aria-hidden="true"
        className="absolute top-1/4 -left-40 w-[600px] h-[600px] bg-[#1479D4]/10 rounded-full blur-[140px] pointer-events-none animate-aurora"
      />
      <div
        aria-hidden="true"
        className="absolute -bottom-40 right-0 w-[500px] h-[500px] bg-[#19C6E6]/10 rounded-full blur-[140px] pointer-events-none animate-aurora-delayed"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Encabezado */}
        <div {...reveal("up")} className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <Badge variant="blue" className="shadow-sm">
            Nuestros Servicios
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#071A35] tracking-tight">
            <SplitWords text="Soluciones tecnológicas para cada desafío" delay={100} />
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Aplicamos ingeniería de software moderna para optimizar la gestión de tu empresa,
            automatizar tus flujos y ayudarte a escalar de forma sólida.
          </p>
        </div>

        {/* Explorador interactivo */}
        <div {...reveal("up", 150)}>
          <ServicesExplorer services={services} />
        </div>

        {/* Banner inferior */}
        <div
          {...reveal("zoom")}
          className="mt-14 p-6 sm:p-7 rounded-2xl bg-white border border-slate-200 text-center max-w-3xl mx-auto shadow-md relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-[#1479D4] to-[#19C6E6]" />
          <p className="text-sm text-slate-700">
            ¿Tienes un requerimiento especial o una integración compleja?{" "}
            <Link
              href="/contacto"
              className="font-bold text-[#1479D4] hover:text-[#1688F5] underline underline-offset-2 ml-1"
            >
              Conversemos sobre tu proyecto sin costo →
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};
