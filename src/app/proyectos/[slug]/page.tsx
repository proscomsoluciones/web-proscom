import React from "react";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { projectsData } from "@/data/projects";
import { siteConfig } from "@/config/site";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import {
  ChevronRight,
  Shield,
  Cpu,
  ArrowRight,
  MessageCircle,
  CheckCircle2,
  Calendar,
} from "lucide-react";

import { reveal } from "@/components/motion/reveal";
import { PageHeroFx } from "@/components/motion/PageHeroFx";
interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return projectsData
    .filter((p) => p.isAuthorized)
    .map((p) => ({
      slug: p.slug,
    }));
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = projectsData.find((p) => p.slug === slug && p.isAuthorized);

  if (!project) {
    return { title: "Proyecto no encontrado" };
  }

  return {
    title: project.metaTitle,
    description: project.metaDescription,
    alternates: {
      canonical: `${siteConfig.url}/proyectos/${project.slug}`,
    },
    openGraph: {
      title: project.metaTitle,
      description: project.metaDescription,
      url: `${siteConfig.url}/proyectos/${project.slug}`,
      siteName: siteConfig.name,
      locale: "es_CL",
      type: "article",
      images: [
        {
          url: project.image,
          width: 1200,
          height: 630,
          alt: project.name,
        },
      ],
    },
  };
}

export default async function ProjectDetailPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = projectsData.find((p) => p.slug === slug && p.isAuthorized);

  if (!project) {
    notFound();
  }

  const whatsappUrl = `${siteConfig.contact.whatsappUrl}?text=${encodeURIComponent(
    `Hola, estuve revisando el caso de desarrollo "${project.name}" en la web de Proscom y me gustaría consultar por un proyecto similar para mi empresa.`
  )}`;

  return (
    <div className="bg-white">
      {/* Breadcrumb & Hero */}
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
                  href="/proyectos"
                  className="hover:text-white transition-colors"
                >
                  Proyectos
                </Link>
              </li>
              <li>
                <ChevronRight className="w-3 h-3 text-slate-500" />
              </li>
              <li className="text-[#19C6E6] font-medium truncate max-w-xs">
                {project.name}
              </li>
            </ol>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-4">
              <div className="flex flex-wrap items-center gap-2.5">
                <Badge variant="cyan">{project.category}</Badge>
                {project.isClientProject && (
                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full bg-[#1479D4]/20 text-[#19C6E6] border border-[#1479D4]/40">
                    <Shield className="w-3.5 h-3.5" />
                    <span>Proyecto desarrollado a medida para cliente</span>
                  </span>
                )}
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
                {project.name}
              </h1>

              <p className="text-xs sm:text-sm text-slate-400 font-medium">
                Sector / Ámbito: {project.clientOrSector}
              </p>

              <p className="text-base text-slate-300 leading-relaxed pt-2">
                {project.shortDescription}
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-4">
                <Button
                  href="/contacto"
                  variant="primary"
                  size="md"
                  icon={<ArrowRight className="w-4 h-4" />}
                >
                  Cotizar proyecto similar
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

            {/* Project Image */}
            <div className="lg:col-span-5">
              <div className="relative rounded-2xl overflow-hidden border border-white/20 shadow-2xl bg-[#0C284E]/50 aspect-[16/10] group">
                <Image
                  src={project.image}
                  alt={project.name}
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

      {/* Problem & Solution In-Depth */}
      <section className="py-16 bg-[#F3F6FA] border-b border-slate-200">
        <div {...reveal("up")} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            {/* The Challenge */}
            <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm">
              <span className="text-xs font-bold text-red-600 uppercase tracking-wider mb-2 block">
                El Desafío
              </span>
              <h2 className="text-xl font-bold text-[#071A35] mb-4">
                Problema u oportunidad identificada
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                {project.problem}
              </p>
            </div>

            {/* The Solution */}
            <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm">
              <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider mb-2 block">
                Nuestra Solución
              </span>
              <h2 className="text-xl font-bold text-[#071A35] mb-4">
                Implementación técnica desarrollada
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                {project.solution}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features & Technologies */}
      <section className="py-16 bg-white border-b border-slate-200">
        <div {...reveal("up")} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Features list */}
            <div className="lg:col-span-7 space-y-6">
              <div className="space-y-2">
                <Badge variant="blue">Funcionalidades</Badge>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#071A35]">
                  Módulos y funciones clave implementadas
                </h2>
              </div>
              <div className="space-y-3 pt-2">
                {project.features.map((feat, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-3"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-1 shrink-0" />
                    <span className="text-sm font-medium text-slate-800">
                      {feat}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Technologies Box */}
            <div className="lg:col-span-5 bg-[#071A35] text-white rounded-3xl p-8 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-xs font-semibold text-[#19C6E6] uppercase tracking-wider mb-4">
                  <Cpu className="w-4 h-4" />
                  <span>Stack Tecnológico</span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">
                  Tecnologías utilizadas
                </h3>
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.technologies.map((tech, i) => (
                    <span
                      key={i}
                      className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-white/10 text-white border border-white/10"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="pt-4 border-t border-white/10 space-y-2 text-xs text-slate-300">
                  <p className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-[#19C6E6]" />
                    <span>Estado: {project.status}</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <Shield className="w-4 h-4 text-emerald-400" />
                    <span>Desarrollo exclusivo a la medida</span>
                  </p>
                </div>
              </div>

              <div className="pt-8 border-t border-white/10">
                <Button
                  href="/contacto"
                  variant="primary"
                  size="md"
                  className="w-full text-center"
                >
                  Consultar por un desarrollo similar
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
