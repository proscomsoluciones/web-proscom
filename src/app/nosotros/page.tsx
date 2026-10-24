import React from "react";
import { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { methodologyData } from "@/data/methodology";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import {
  ShieldCheck,
  MapPin,
  CheckCircle2,
  ArrowRight,
  Terminal,
} from "lucide-react";

import { reveal } from "@/components/motion/reveal";
import { PageHeroFx } from "@/components/motion/PageHeroFx";
import { SplitWords } from "@/components/motion/SplitWords";
import { NeuralNetworkVisual } from "@/components/motion/NeuralNetworkVisual";
export const metadata: Metadata = {
  title: "Sobre Proscom | Experiencia y Metodología en Desarrollo de Software",
  description:
    "Conoce Proscom: empresa tecnológica chilena en Vitacura, Región Metropolitana. Más de 15 años de experiencia técnica de su fundador en software a medida.",
  alternates: {
    canonical: `${siteConfig.url}/nosotros`,
  },
};

export default function AboutPage() {
  const principles = [
    {
      title: "Honestidad Técnica",
      desc: "No recomendamos tecnologías de moda innecesarias. Diseñamos la arquitectura que realmente resolverá tu problema con la mejor relación costo-beneficio.",
    },
    {
      title: "Soluciones Propias y Escalables",
      desc: "Desarrollamos código limpio y modular para que tu empresa sea dueña de su sistema y no quede atada a licencias restrictivas de terceros.",
    },
    {
      title: "Acompañamiento Cercano",
      desc: "El proyecto no termina cuando se entrega el software. Te acompañamos en la puesta en marcha, capacitación del equipo y soporte continuo.",
    },
    {
      title: "Compromiso Regional y Nacional",
      desc: "Con sede central en Vitacura, Región Metropolitana, brindamos soluciones tecnológicas tanto para la capital como para la Región de Valparaíso y todo Chile.",
    },
  ];

  return (
    <div className="bg-white">
      {/* Hero Header */}
      <section className="bg-[#071A35] text-white py-16 lg:py-20 border-b border-white/10 relative overflow-hidden">
        <PageHeroFx />
        <div
          aria-hidden="true"
          className="absolute -top-20 left-1/4 w-96 h-96 bg-[#1479D4]/20 rounded-full blur-[140px] pointer-events-none animate-aurora"
        />

        <div {...reveal("blur")} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center max-w-3xl">
          <Badge variant="cyan" className="mb-4">
            Nuestra Historia & Visión
          </Badge>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
            <SplitWords text="Tecnología práctica, humana y orientada a resultados" delay={200} />
          </h1>
          <p className="text-base sm:text-lg text-slate-300 mt-4 leading-relaxed">
            Proscom nace con el propósito de acercar el desarrollo de software profesional a empresas, organizaciones comunitarias y emprendedores que necesitan dar un salto cualitativo en su gestión.
          </p>
        </div>
      </section>

      {/* Story & Founder Experience */}
      <section className="py-20 bg-white border-b border-slate-200">
        <div {...reveal("up")} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Visual Graphic */}
            <div className="lg:col-span-5">
              <div
                data-tilt
                className="relative rounded-3xl overflow-hidden border border-slate-200 shadow-xl aspect-[4/3]"
              >
                <NeuralNetworkVisual className="rounded-3xl" />
              </div>
            </div>

            {/* Narrative text */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#1479D4] uppercase tracking-wider">
                <Terminal className="w-4 h-4" />
                <span>Trayectoria y Solidez Técnica</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#071A35]">
                Más de 15 años de experiencia técnica al servicio de tu empresa
              </h2>

              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                La experiencia de Proscom está respaldada por más de 15 años de trayectoria profesional de su fundador en las áreas de análisis de sistemas, desarrollo de software a medida, arquitectura web y bases de datos.
              </p>

              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                A lo largo de los años hemos comprobado que muchas organizaciones luchan diariamente contra herramientas rígidas, hojas de cálculo desordenadas o contratos de software costosos que no se adaptan a su realidad. Nuestra propuesta es distinta: creamos plataformas digitales claras, estables y hechas a la medida exacta de tus procesos.
              </p>

              <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-[#F3F6FA] border border-slate-200">
                  <div className="flex items-center gap-2 text-sm font-bold text-[#071A35] mb-1">
                    <MapPin className="w-4 h-4 text-[#1479D4]" />
                    <span>Presencia Real</span>
                  </div>
                  <p className="text-xs text-slate-500">
                    Con sede en Av. Presidente Kennedy, Vitacura, atendemos con cercanía a clientes de la Región Metropolitana, Valparaíso y coordinamos proyectos de forma remota en todo Chile.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-[#F3F6FA] border border-slate-200">
                  <div className="flex items-center gap-2 text-sm font-bold text-[#071A35] mb-1">
                    <ShieldCheck className="w-4 h-4 text-emerald-500" />
                    <span>Sin Sorpresas</span>
                  </div>
                  <p className="text-xs text-slate-500">
                    Definición de alcances transparente, cronogramas de entrega reales y comunicación directa sin capas burocráticas.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Corporate Principles */}
      <section className="py-20 bg-[#F3F6FA] border-b border-slate-200">
        <div {...reveal("up")} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <Badge variant="blue">Nuestros Valores</Badge>
            <h2 className="text-3xl font-extrabold text-[#071A35]">
              Principios que guían cada línea de código
            </h2>
            <p className="text-slate-600 text-sm sm:text-base">
              Nos tomamos en serio la confianza de quienes nos entregan la digitalización de sus operaciones.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {principles.map((principle, idx) => (
              <div
                key={idx}
                {...reveal("up", (idx % 2) * 120)}
                data-tilt
                className="p-8 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-center gap-3 mb-3">
                  <CheckCircle2 className="w-5 h-5 text-[#1479D4]" />
                  <h3 className="text-lg font-bold text-[#071A35]">
                    {principle.title}
                  </h3>
                </div>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {principle.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Methodology Section in Depth */}
      <section className="py-20 bg-[#071A35] text-white">
        <div {...reveal("up")} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <Badge variant="cyan">Metodología Proscom</Badge>
            <h2 className="text-3xl font-extrabold text-white">
              De la primera conversación al soporte continuo
            </h2>
            <p className="text-sm sm:text-base text-slate-300">
              Así es como llevamos adelante cada proyecto tecnológico:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {methodologyData.map((stage, idx) => (
              <div
                key={stage.step}
                {...reveal("up", (idx % 3) * 110)}
                data-tilt
                data-spotlight
                className="relative p-7 rounded-2xl bg-[#0A1E3B] border border-white/10 flex flex-col justify-between"
              >
                <div>
                  <div className="text-xs font-bold text-[#19C6E6] mb-2 uppercase tracking-wider">
                    Paso 0{stage.step}
                  </div>
                  <h3 className="text-lg font-bold text-white mb-1">
                    {stage.title}
                  </h3>
                  <p className="text-xs text-[#1479D4] font-medium mb-3">
                    {stage.subtitle}
                  </p>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    {stage.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <Button
              href="/contacto"
              variant="primary"
              size="lg"
              icon={<ArrowRight className="w-5 h-5" />}
            >
              Conversemos sobre tu próximo proyecto
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
