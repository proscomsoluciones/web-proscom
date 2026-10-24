import React from "react";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { solutionsData } from "@/data/solutions";
import { siteConfig } from "@/config/site";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { FaqAccordion } from "@/components/ui/FaqAccordion";
import {
  ChevronRight,
  CheckCircle2,
  AlertCircle,
  Users,
  Layers,
  ArrowRight,
  MessageCircle,
  CalendarCheck,
} from "lucide-react";

import { reveal } from "@/components/motion/reveal";
import { PageHeroFx } from "@/components/motion/PageHeroFx";
interface SolutionPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return solutionsData.map((sol) => ({
    slug: sol.slug,
  }));
}

export async function generateMetadata({
  params,
}: SolutionPageProps): Promise<Metadata> {
  const { slug } = await params;
  const solution = solutionsData.find((s) => s.slug === slug);

  if (!solution) {
    return { title: "Solución no encontrada" };
  }

  return {
    title: solution.metaTitle,
    description: solution.metaDescription,
    alternates: {
      canonical: `${siteConfig.url}/soluciones/${solution.slug}`,
    },
    openGraph: {
      title: solution.metaTitle,
      description: solution.metaDescription,
      url: `${siteConfig.url}/soluciones/${solution.slug}`,
      siteName: siteConfig.name,
      locale: "es_CL",
      type: "website",
      images: [
        {
          url: solution.image,
          width: 1200,
          height: 630,
          alt: solution.name,
        },
      ],
    },
  };
}

export default async function SolutionDetailPage({ params }: SolutionPageProps) {
  const { slug } = await params;
  const solution = solutionsData.find((s) => s.slug === slug);

  if (!solution) {
    notFound();
  }

  const whatsappUrl = `${siteConfig.contact.whatsappUrl}?text=${encodeURIComponent(
    `Hola, me interesa conocer más información sobre la plataforma "${solution.name}" de Proscom.`
  )}`;

  return (
    <div className="bg-white">
      {/* Hero & Breadcrumb */}
      <section className="bg-[#071A35] text-white pt-10 pb-16 lg:pb-20 border-b border-white/10 relative overflow-hidden">
        <PageHeroFx />
        <div
          aria-hidden="true"
          className="absolute top-0 right-1/4 w-96 h-96 bg-[#1479D4]/20 rounded-full blur-[140px] pointer-events-none animate-aurora"
        />

        <div {...reveal("blur")} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
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
                  href="/soluciones"
                  className="hover:text-white transition-colors"
                >
                  Soluciones
                </Link>
              </li>
              <li>
                <ChevronRight className="w-3 h-3 text-slate-500" />
              </li>
              <li className="text-[#19C6E6] font-medium truncate max-w-xs">
                {solution.name}
              </li>
            </ol>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-4">
              <div className="flex items-center gap-2.5">
                <Badge variant="cyan">Solución Propia Proscom</Badge>
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  {solution.commercialStatus}
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
                {solution.name}
              </h1>

              <p className="text-base sm:text-lg text-[#19C6E6] font-medium">
                {solution.tagline}
              </p>

              <p className="text-sm sm:text-base text-slate-300 leading-relaxed pt-2">
                {solution.detailedDescription}
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-4">
                <Button
                  href="/contacto"
                  variant="primary"
                  size="md"
                  icon={<ArrowRight className="w-4 h-4" />}
                >
                  Solicitar demostración
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

            {/* Main Screenshot/Image */}
            <div className="lg:col-span-5">
              <div className="relative rounded-2xl overflow-hidden border border-white/20 shadow-2xl bg-[#0C284E]/50 aspect-[4/3] group">
                <Image
                  src={solution.image}
                  alt={solution.name}
                  fill
                  preload
                  fetchPriority="high"
                  loading="eager"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Target Audience & Problems Solved */}
      <section className="py-16 bg-[#F3F6FA] border-b border-slate-200">
        <div {...reveal("up")} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* Target audience */}
            <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2.5 rounded-xl bg-[#1479D4]/10 text-[#1479D4]">
                  <Users className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-[#071A35]">
                    Público objetivo y aplicación
                  </h2>
                  <p className="text-xs text-slate-500">
                    A quién está dirigida esta solución
                  </p>
                </div>
              </div>
              <ul className="space-y-3">
                {solution.targetAudience.map((target, idx) => (
                  <li
                    key={idx}
                    className="text-sm text-slate-700 flex items-start gap-2.5"
                  >
                    <CheckCircle2 className="w-4 h-4 text-[#1479D4] mt-0.5 shrink-0" />
                    <span>{target}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Problems Solved */}
            <div className="bg-white rounded-2xl p-8 border border-red-100 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2.5 rounded-xl bg-red-50 text-red-600">
                  <AlertCircle className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-[#071A35]">
                    Problemas reales que soluciona
                  </h2>
                  <p className="text-xs text-slate-500">
                    Dificultades operativas que elimina
                  </p>
                </div>
              </div>
              <ul className="space-y-3">
                {solution.problemsSolved.map((prob, idx) => (
                  <li
                    key={idx}
                    className="text-sm text-slate-700 flex items-start gap-2.5"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-red-400 mt-2 shrink-0" />
                    <span>{prob}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Confirmed Features & Benefits */}
      <section className="py-16 bg-white border-b border-slate-200">
        <div {...reveal("up")} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-7 space-y-6">
              <div className="space-y-2">
                <Badge variant="blue">Funcionalidades</Badge>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#071A35]">
                  Capacidades operativas confirmadas
                </h2>
                <p className="text-sm text-slate-600">
                  Módulos y herramientas incluidas en la versión comercial de la plataforma:
                </p>
              </div>

              <div className="space-y-3 pt-2">
                {solution.confirmedFeatures.map((feat, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-3"
                  >
                    <Layers className="w-4 h-4 text-[#1479D4] mt-1 shrink-0" />
                    <span className="text-sm font-medium text-slate-800">
                      {feat}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Commercial Model Box */}
            <div className="lg:col-span-5 bg-[#071A35] text-white rounded-3xl p-8 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-xs font-semibold text-[#19C6E6] uppercase tracking-wider mb-4">
                  <CalendarCheck className="w-4 h-4" />
                  <span>Modelo de Adquisición</span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">
                  Modalidad Comercial
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed mb-6">
                  {solution.commercialModel}
                </p>

                <div className="p-4 rounded-xl bg-white/5 border border-white/10 text-xs text-slate-300 space-y-2 mb-6">
                  <p className="font-semibold text-white">¿Qué incluye la implementación?</p>
                  <p>• Configuración inicial y parametrización de datos.</p>
                  <p>• Capacitación para administradores y operadores.</p>
                  <p>• Soporte técnico y respaldos periódicos.</p>
                </div>
              </div>

              <div className="pt-6 border-t border-white/10">
                <Button
                  href="/contacto"
                  variant="primary"
                  size="md"
                  className="w-full text-center"
                >
                  Solicitar cotización personalizada
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16 bg-[#F3F6FA] border-b border-slate-200">
        <div {...reveal("up")} className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 space-y-2">
            <Badge variant="blue">Preguntas Frecuentes</Badge>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#071A35]">
              Dudas sobre {solution.name}
            </h2>
          </div>
          <FaqAccordion faqs={solution.faqs} />
        </div>
      </section>
    </div>
  );
}
