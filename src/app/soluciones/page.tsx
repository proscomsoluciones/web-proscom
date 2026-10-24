import React from "react";
import { Metadata } from "next";
import Image from "next/image";
import { solutionsData } from "@/data/solutions";
import { siteConfig } from "@/config/site";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { ArrowRight, Check, Sparkles, MessageCircle } from "lucide-react";

import { reveal } from "@/components/motion/reveal";
import { PageHeroFx } from "@/components/motion/PageHeroFx";
import { SplitWords } from "@/components/motion/SplitWords";
export const metadata: Metadata = {
  title: "Soluciones de Software Propias | Proscom",
  description:
    "Descubre las plataformas tecnológicas desarrolladas por Proscom: Proscom Org, Tesorería Deportiva, Asistencia Escolar, Pitazo Final, RoutePay y QueBuenDato.",
  alternates: {
    canonical: `${siteConfig.url}/soluciones`,
  },
};

export default function SolutionsPage() {
  return (
    <div className="bg-white">
      {/* Hero Header */}
      <section className="bg-[#071A35] text-white py-16 lg:py-20 border-b border-white/10 relative overflow-hidden">
        <PageHeroFx />
        <div
          aria-hidden="true"
          className="absolute -top-20 left-1/3 w-96 h-96 bg-[#1479D4]/20 rounded-full blur-[140px] pointer-events-none animate-aurora"
        />

        <div {...reveal("blur")} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center max-w-3xl">
          <Badge variant="cyan" className="mb-4">
            Plataformas Propias
          </Badge>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
            <SplitWords text="Soluciones de software listas para impulsar tu gestión" delay={200} />
          </h1>
          <p className="text-base sm:text-lg text-slate-300 mt-4 leading-relaxed">
            Herramientas operativas desarrolladas por Proscom con funcionalidades reales, diseñadas para resolver problemáticas específicas en diversos sectores.
          </p>
        </div>
      </section>

      {/* Solutions Cards Grid */}
      <section className="py-20 bg-[#F3F6FA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-12">
            {solutionsData.map((solution, index) => {
              const isEven = index % 2 === 1;
              return (
                <div
                  key={solution.id}
                  {...reveal(isEven ? "right" : "left")}
                  data-spotlight="light"
                  className="relative bg-white rounded-3xl overflow-hidden border border-slate-200/90 shadow-sm hover:shadow-xl transition-all duration-300 grid grid-cols-1 lg:grid-cols-12 gap-0"
                >
                  {/* Image Column */}
                  <div
                    className={`lg:col-span-6 relative w-full aspect-[16/10] lg:aspect-auto min-h-[220px] sm:min-h-[280px] bg-[#071A35] ${
                      isEven ? "lg:order-2" : "lg:order-1"
                    }`}
                  >
                    <Image
                      src={solution.image}
                      alt={solution.name}
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider bg-[#071A35]/90 text-white backdrop-blur-md border border-white/10">
                        {solution.commercialStatus}
                      </span>
                    </div>
                  </div>

                  {/* Content Column */}
                  <div
                    className={`lg:col-span-6 p-8 lg:p-10 flex flex-col justify-between ${
                      isEven ? "lg:order-1" : "lg:order-2"
                    }`}
                  >
                    <div>
                      <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#1479D4] uppercase tracking-wider mb-2">
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Solución Proscom</span>
                      </div>
                      <h2 className="text-2xl sm:text-3xl font-extrabold text-[#071A35] mb-2">
                        {solution.name}
                      </h2>
                      <p className="text-xs sm:text-sm font-medium text-[#1479D4] mb-4">
                        {solution.tagline}
                      </p>
                      <p className="text-sm text-slate-600 leading-relaxed mb-6">
                        {solution.detailedDescription}
                      </p>

                      {/* Confirmed features */}
                      <div className="space-y-2.5 mb-6">
                        <p className="text-xs font-bold text-[#071A35] uppercase tracking-wider">
                          Capacidades confirmadas:
                        </p>
                        {solution.confirmedFeatures.slice(0, 4).map((feat, i) => (
                          <div
                            key={i}
                            className="text-xs text-slate-700 flex items-start gap-2.5"
                          >
                            <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                            <span>{feat}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center gap-4">
                      <Button
                        href={`/soluciones/${solution.slug}`}
                        variant="primary"
                        size="md"
                        icon={<ArrowRight className="w-4 h-4" />}
                      >
                        Ver detalles completos
                      </Button>
                      <span className="text-xs text-slate-500">
                        Modalidad: {solution.commercialModel}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Direct Information Request */}
      <section className="py-16 bg-white border-t border-slate-200">
        <div {...reveal("up")} className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-5">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#071A35]">
            ¿Te interesa implementar alguna de nuestras soluciones?
          </h2>
          <p className="text-sm sm:text-base text-slate-600 max-w-xl mx-auto">
            Te explicamos cómo adaptarla a tu institución o negocio, los plazos de puesta en marcha y el acompañamiento incluido.
          </p>
          <div className="pt-2">
            <Button
              href="/contacto"
              variant="primary"
              size="lg"
              icon={<MessageCircle className="w-5 h-5" />}
            >
              Solicitar demostración o información comercial
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
