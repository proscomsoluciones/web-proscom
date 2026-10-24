import React from "react";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { servicesData } from "@/data/services";
import { projectsData } from "@/data/projects";
import { siteConfig } from "@/config/site";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { FaqAccordion } from "@/components/ui/FaqAccordion";
import {
  CheckCircle2,
  AlertCircle,
  Building2,
  ArrowRight,
  MessageCircle,
  Layers,
  ChevronRight,
  Shield,
} from "lucide-react";

import { reveal } from "@/components/motion/reveal";
import { PageHeroFx } from "@/components/motion/PageHeroFx";
interface ServicePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return servicesData.map((service) => ({
    slug: service.slug,
  }));
}

export async function generateMetadata({
  params,
}: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = servicesData.find((s) => s.slug === slug);

  if (!service) {
    return {
      title: "Servicio no encontrado",
    };
  }

  return {
    title: service.metaTitle,
    description: service.metaDescription,
    alternates: {
      canonical: `${siteConfig.url}/servicios/${service.slug}`,
    },
    openGraph: {
      title: service.metaTitle,
      description: service.metaDescription,
      url: `${siteConfig.url}/servicios/${service.slug}`,
      siteName: siteConfig.name,
      locale: "es_CL",
      type: "article",
    },
  };
}

export default async function ServiceDetailPage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = servicesData.find((s) => s.slug === slug);

  if (!service) {
    notFound();
  }

  // Find related projects
  const relatedProjects = projectsData.filter((p) =>
    service.relatedProjectSlugs.includes(p.slug)
  );

  const whatsappUrl = `${siteConfig.contact.whatsappUrl}?text=${encodeURIComponent(
    `Hola, vi su servicio de "${service.title}" en la web de Proscom y me gustaría solicitar una evaluación técnica para mi empresa.`
  )}`;

  return (
    <div className="bg-white">
      {/* Breadcrumbs & Hero */}
      <section className="bg-[#071A35] text-white pt-10 pb-16 lg:pb-20 border-b border-white/10 relative overflow-hidden">
        <PageHeroFx />
        <div
          aria-hidden="true"
          className="absolute top-0 right-1/4 w-96 h-96 bg-[#1479D4]/20 rounded-full blur-[140px] pointer-events-none animate-aurora"
        />

        <div {...reveal("blur")} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Breadcrumb nav */}
          <nav aria-label="Miga de pan" className="mb-6">
            <ol className="flex items-center gap-2 text-xs text-slate-400">
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  Inicio
                </Link>
              </li>
              <li>
                <ChevronRight className="w-3 h-3 text-slate-500" />
              </li>
              <li>
                <Link
                  href="/servicios"
                  className="hover:text-white transition-colors"
                >
                  Servicios
                </Link>
              </li>
              <li>
                <ChevronRight className="w-3 h-3 text-slate-500" />
              </li>
              <li className="text-[#19C6E6] font-medium truncate max-w-xs">
                {service.title}
              </li>
            </ol>
          </nav>

          <div className="max-w-3xl space-y-4">
            <Badge variant="cyan">Servicio Especializado</Badge>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
              {service.title}
            </h1>
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed pt-2">
              {service.longDescription}
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-4">
              <Button
                href="/contacto"
                variant="primary"
                size="md"
                icon={<ArrowRight className="w-4 h-4" />}
              >
                Cotizar este servicio
              </Button>
              <Button
                href={whatsappUrl}
                external
                variant="whatsapp"
                size="md"
                icon={<MessageCircle className="w-4 h-4 fill-white stroke-none" />}
              >
                Consultar por WhatsApp
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Problems Solved & Key Benefits Grid */}
      <section className="py-16 bg-[#F3F6FA] border-b border-slate-200">
        <div {...reveal("up")} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Problems Solved Box */}
            <div className="bg-white rounded-2xl p-8 border border-red-100 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2.5 rounded-xl bg-red-50 text-red-600">
                  <AlertCircle className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-[#071A35]">
                    Problemas habituales que resolvemos
                  </h2>
                  <p className="text-xs text-slate-500">
                    Situaciones operativas comunes antes de implementar esta solución
                  </p>
                </div>
              </div>
              <ul className="space-y-3.5">
                {service.problemsSolved.map((item, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-3 text-sm text-slate-700"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-red-400 mt-2 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Benefits Box */}
            <div className="bg-white rounded-2xl p-8 border border-emerald-100 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-600">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-[#071A35]">
                    Beneficios directos para tu empresa
                  </h2>
                  <p className="text-xs text-slate-500">
                    Impacto en control, tiempo y rentabilidad operativa
                  </p>
                </div>
              </div>
              <ul className="space-y-3.5">
                {service.benefits.map((item, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-3 text-sm text-slate-700"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-1 shrink-0" />
                    <span className="font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Features & Target Companies */}
      <section className="py-16 bg-white border-b border-slate-200">
        <div {...reveal("up")} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Features (col 7) */}
            <div className="lg:col-span-7 space-y-6">
              <div className="space-y-2">
                <Badge variant="blue">Capacidades</Badge>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#071A35]">
                  Funcionalidades habituales que implementamos
                </h2>
                <p className="text-sm text-slate-600">
                  Cada proyecto se diseña a medida, pero estas son las características más solicitadas por nuestros clientes:
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                {service.features.map((feat, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-3"
                  >
                    <Layers className="w-4 h-4 text-[#1479D4] mt-1 shrink-0" />
                    <span className="text-xs sm:text-sm font-medium text-slate-700">
                      {feat}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Target Companies (col 5) */}
            <div className="lg:col-span-5 bg-[#F3F6FA] rounded-2xl p-8 border border-slate-200/80">
              <div className="flex items-center gap-3 mb-5">
                <div className="p-2.5 rounded-xl bg-[#1479D4]/10 text-[#1479D4]">
                  <Building2 className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-[#071A35]">
                  ¿A quién va dirigido este servicio?
                </h3>
              </div>
              <ul className="space-y-3">
                {service.targetCompanies.map((target, idx) => (
                  <li
                    key={idx}
                    className="text-xs sm:text-sm text-slate-700 flex items-start gap-2.5"
                  >
                    <span className="w-2 h-2 rounded-full bg-[#1479D4] mt-1.5 shrink-0" />
                    <span>{target}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-8 pt-6 border-t border-slate-200 text-xs text-slate-500">
                ¿No estás seguro de si tu rubro aplica? Contáctanos y analizamos la viabilidad sin costo.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Methodology specific steps */}
      <section className="py-16 bg-[#071A35] text-white border-b border-white/10">
        <div {...reveal("up")} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
            <Badge variant="cyan">Proceso de Trabajo</Badge>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              ¿Cómo implementamos este servicio?
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {service.methodology.map((step) => (
              <div
                key={step.step}
                className="p-6 rounded-2xl bg-[#0A1E3B] border border-white/10"
              >
                <div className="w-9 h-9 rounded-lg bg-[#1479D4]/20 text-[#19C6E6] flex items-center justify-center font-bold text-sm mb-4">
                  0{step.step}
                </div>
                <h3 className="text-base font-bold text-white mb-2">
                  {step.title}
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Related Projects (if any) */}
      {relatedProjects.length > 0 && (
        <section className="py-16 bg-[#F3F6FA] border-b border-slate-200">
          <div {...reveal("up")} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl font-bold text-[#071A35]">
                  Proyectos relacionados
                </h2>
                <p className="text-sm text-slate-600 mt-1">
                  Casos de desarrollo afines a este servicio
                </p>
              </div>
              <Link
                href="/proyectos"
                className="text-xs sm:text-sm font-semibold text-[#1479D4] hover:underline flex items-center gap-1"
              >
                <span>Ver portafolio completo</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedProjects.map((project) => (
                <div
                  key={project.id}
                  className="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between"
                >
                  <div className="relative aspect-video w-full bg-[#071A35]">
                    <Image
                      src={project.image}
                      alt={project.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover"
                    />
                  </div>
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      {project.isClientProject && (
                        <div className="flex items-center gap-1.5 text-[10px] text-[#1479D4] font-semibold mb-1.5">
                          <Shield className="w-3 h-3" />
                          <span>Desarrollo a medida</span>
                        </div>
                      )}
                      <h3 className="text-base font-bold text-[#071A35] mb-1">
                        {project.name}
                      </h3>
                      <p className="text-xs text-slate-500 line-clamp-2">
                        {project.shortDescription}
                      </p>
                    </div>
                    <div className="pt-4 mt-4 border-t border-slate-100">
                      <Link
                        href={`/proyectos/${project.slug}`}
                        className="text-xs font-bold text-[#1479D4] hover:text-[#1688F5] inline-flex items-center gap-1"
                      >
                        <span>Ver detalles del proyecto</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQs Section */}
      <section className="py-16 bg-white border-b border-slate-200">
        <div {...reveal("up")} className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 space-y-2">
            <Badge variant="blue">Preguntas Frecuentes</Badge>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#071A35]">
              Dudas habituales sobre este servicio
            </h2>
          </div>
          <FaqAccordion faqs={service.faqs} />
        </div>
      </section>

      {/* CTA Box */}
      <section className="py-16 bg-slate-50">
        <div {...reveal("up")} className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-5">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#071A35]">
            ¿Listo para iniciar tu proyecto de {service.title}?
          </h2>
          <p className="text-slate-600 max-w-xl mx-auto text-sm sm:text-base">
            Conversemos sobre tus requerimientos y planifiquemos una solución técnica sólida y accesible.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <Button href="/contacto" variant="primary" size="lg">
              Solicitar cotización personalizada
            </Button>
            <Button
              href={whatsappUrl}
              external
              variant="whatsapp"
              size="lg"
              icon={<MessageCircle className="w-4 h-4 fill-white stroke-none" />}
            >
              Hablemos por WhatsApp
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
