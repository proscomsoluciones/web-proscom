import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import { servicesData } from "@/data/services";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import {
  Code2,
  Globe,
  Smartphone,
  LayoutDashboard,
  Network,
  Headphones,
  ShoppingCart,
  CreditCard,
  ArrowRight,
  CheckCircle2,
  HelpCircle,
} from "lucide-react";

import { reveal } from "@/components/motion/reveal";
import { PageHeroFx } from "@/components/motion/PageHeroFx";
import { SplitWords } from "@/components/motion/SplitWords";
export const metadata: Metadata = {
  title: "Servicios de Desarrollo de Software y Soluciones Tecnológicas",
  description:
    "Conoce nuestros servicios de software a medida, desarrollo web, e-commerce, integración de medios de pago, aplicaciones móviles, sistemas de gestión, integraciones de APIs y soporte técnico en Chile.",
  alternates: {
    canonical: "https://www.proscom.cl/servicios",
  },
};

export default function ServicesPage() {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "Code2":
        return <Code2 className="w-7 h-7 text-[#1479D4]" />;
      case "Globe":
        return <Globe className="w-7 h-7 text-[#1479D4]" />;
      case "ShoppingCart":
        return <ShoppingCart className="w-7 h-7 text-[#1479D4]" />;
      case "CreditCard":
        return <CreditCard className="w-7 h-7 text-[#1479D4]" />;
      case "Smartphone":
        return <Smartphone className="w-7 h-7 text-[#1479D4]" />;
      case "LayoutDashboard":
        return <LayoutDashboard className="w-7 h-7 text-[#1479D4]" />;
      case "Network":
        return <Network className="w-7 h-7 text-[#1479D4]" />;
      case "Headphones":
        return <Headphones className="w-7 h-7 text-[#1479D4]" />;
      default:
        return <Code2 className="w-7 h-7 text-[#1479D4]" />;
    }
  };

  return (
    <div className="bg-white">
      {/* Header Hero */}
      <section className="bg-[#071A35] text-white py-16 lg:py-20 border-b border-white/10 relative overflow-hidden">
        <PageHeroFx />
        <div
          aria-hidden="true"
          className="absolute -top-24 right-0 w-96 h-96 bg-[#1479D4]/20 rounded-full blur-[120px] pointer-events-none animate-aurora"
        />
        <div {...reveal("blur")} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center max-w-3xl">
          <Badge variant="cyan" className="mb-4">
            Catálogo de Servicios
          </Badge>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
            <SplitWords text="Servicios tecnológicos para empresas que buscan crecer" delay={200} />
          </h1>
          <p className="text-base sm:text-lg text-slate-300 mt-4 leading-relaxed">
            Desde la digitalización de procesos administrativos hasta plataformas de alta disponibilidad y aplicaciones móviles. Soluciones a la medida de tu realidad.
          </p>
        </div>
      </section>

      {/* Services List Section */}
      <section className="py-20 bg-[#F3F6FA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {servicesData.map((service, idx) => (
              <div
                key={service.id}
                {...reveal("up", (idx % 3) * 110)}
                data-tilt
                data-spotlight="light"
                className="relative bg-white rounded-2xl p-8 border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-[#1479D4]/40 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="w-14 h-14 rounded-2xl bg-[#1479D4]/10 group-hover:bg-[#1479D4] p-3.5 inline-flex items-center justify-center transition-colors duration-200 mb-6">
                    <div className="transition-transform group-hover:scale-110 group-hover:[&>svg]:text-white">
                      {getIcon(service.iconName)}
                    </div>
                  </div>

                  <h2 className="text-xl font-bold text-[#071A35] group-hover:text-[#1479D4] transition-colors mb-3">
                    {service.title}
                  </h2>

                  <p className="text-sm text-slate-600 leading-relaxed mb-6">
                    {service.shortDescription}
                  </p>

                  <div className="space-y-2 mb-6">
                    <p className="text-xs font-bold text-[#071A35] uppercase tracking-wider">
                      Beneficios destacados:
                    </p>
                    {service.benefits.slice(0, 2).map((benefit, i) => (
                      <div
                        key={i}
                        className="text-xs text-slate-700 flex items-start gap-2"
                      >
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                        <span>{benefit}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-5 border-t border-slate-100">
                  <Link
                    href={`/servicios/${service.slug}`}
                    className="text-sm font-bold text-[#1479D4] group-hover:text-[#1688F5] inline-flex items-center gap-1.5"
                  >
                    <span>Ver servicio completo y metodología</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Consultation Section */}
      <section className="py-16 bg-white border-t border-slate-200">
        <div {...reveal("up")} className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="w-12 h-12 rounded-full bg-[#1479D4]/10 text-[#1479D4] mx-auto flex items-center justify-center">
            <HelpCircle className="w-6 h-6" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#071A35]">
            ¿No estás seguro de qué servicio se ajusta mejor a tu necesidad?
          </h2>
          <p className="text-base text-slate-600 max-w-xl mx-auto">
            Te orientamos técnicamente sin compromiso. Analizamos la situación actual de tu empresa y te recomendamos el camino más eficiente.
          </p>
          <div className="pt-2">
            <Button href="/contacto" variant="primary" size="lg">
              Solicitar orientación técnica gratuita
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
