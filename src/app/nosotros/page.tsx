import React from "react";
import Image from "next/image";
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
  HeartHandshake,
} from "lucide-react";

import { reveal } from "@/components/motion/reveal";
import { PageHeroFx } from "@/components/motion/PageHeroFx";
import { SplitWords } from "@/components/motion/SplitWords";
export const metadata: Metadata = {
  title: "Nosotros | Proscom: una empresa chilena que habla tu idioma",
  description:
    "Conoce Proscom: empresa chilena en Vitacura que ayuda a negocios y organizaciones a vender más y ordenarse. Más de 15 años de experiencia de su fundador.",
  alternates: {
    canonical: `${siteConfig.url}/nosotros`,
  },
};

export default function AboutPage() {
  const principles = [
    {
      title: "Te decimos la verdad",
      desc: "No te vendemos lo que no necesitas. Te recomendamos lo que de verdad resuelve tu problema, al mejor costo.",
    },
    {
      title: "Lo que hacemos es tuyo",
      desc: "Tu negocio es dueño de su sistema y de su información. No quedas amarrado a licencias ni a pagos por cada usuario.",
    },
    {
      title: "No te dejamos solo",
      desc: "El trabajo no termina cuando entregamos. Te acompañamos en la partida, enseñamos a tu equipo y seguimos disponibles.",
    },
    {
      title: "Cerca de ti, en todo Chile",
      desc: "Tenemos oficina en Vitacura y trabajamos con clientes de Santiago, la Región de Valparaíso y todo Chile.",
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
            Quiénes somos
          </Badge>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
            <SplitWords text="Personas que ayudan a negocios a crecer" delay={200} />
          </h1>
          <p className="text-base sm:text-lg text-slate-300 mt-4 leading-relaxed">
            Proscom nace para que cualquier negocio, organización o emprendedor pueda tener una página web, ventas por internet y un sistema ordenado, sin necesidad de saber de computación.
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
                <Image
                  src="/images/hero/header-hero.png"
                  alt="Equipo de Proscom planificando un proyecto para un cliente"
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover"
                />
              </div>
            </div>

            {/* Narrative text */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#1479D4] uppercase tracking-wider">
                <HeartHandshake className="w-4 h-4" />
                <span>Nuestra experiencia</span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#071A35]">
                Más de 15 años ayudando a ordenar negocios
              </h2>

              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                Detrás de Proscom hay más de 15 años de experiencia de su fundador creando sistemas y páginas web para empresas, colegios y organizaciones.
              </p>

              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                En todo este tiempo hemos visto lo mismo: negocios que pierden horas con planillas desordenadas, cuadernos o programas caros que no se adaptan a su forma de trabajar. Nosotros hacemos lo contrario: escuchamos cómo trabajas y creamos algo simple, que funciona y que tu equipo usa desde el primer día.
              </p>

              <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-[#F3F6FA] border border-slate-200">
                  <div className="flex items-center gap-2 text-sm font-bold text-[#071A35] mb-1">
                    <MapPin className="w-4 h-4 text-[#1479D4]" />
                    <span>Oficina real</span>
                  </div>
                  <p className="text-xs text-slate-500">
                    Estamos en Av. Presidente Kennedy, Vitacura. Atendemos en persona en Santiago y Valparaíso, y a distancia en todo Chile.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-[#F3F6FA] border border-slate-200">
                  <div className="flex items-center gap-2 text-sm font-bold text-[#071A35] mb-1">
                    <ShieldCheck className="w-4 h-4 text-emerald-500" />
                    <span>Sin sorpresas</span>
                  </div>
                  <p className="text-xs text-slate-500">
                    Sabes desde el principio qué incluye, cuánto cuesta y cuándo está listo. Y hablas directo con quienes hacen tu proyecto.
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
            <Badge variant="blue">Cómo somos</Badge>
            <h2 className="text-3xl font-extrabold text-[#071A35]">
              Lo que nos importa al trabajar contigo
            </h2>
            <p className="text-slate-600 text-sm sm:text-base">
              Nos tomamos en serio la confianza de cada negocio que trabaja con nosotros.
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
            <Badge variant="cyan">Cómo trabajamos</Badge>
            <h2 className="text-3xl font-extrabold text-white">
              De la primera conversación al soporte continuo
            </h2>
            <p className="text-sm sm:text-base text-slate-300">
              Así trabajamos en cada proyecto, paso a paso:
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
              Conversemos sobre tu negocio
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
