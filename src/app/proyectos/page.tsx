import React from "react";
import { Metadata } from "next";
import { projectsData } from "@/data/projects";
import { siteConfig } from "@/config/site";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { ProjectsGallery } from "@/components/projects/ProjectsGallery";
import { MessageSquare } from "lucide-react";

import { reveal } from "@/components/motion/reveal";
import { PageHeroFx } from "@/components/motion/PageHeroFx";
import { SplitWords } from "@/components/motion/SplitWords";
export const metadata: Metadata = {
  title: "Casos de éxito | Proscom",
  description:
    "Negocios y organizaciones de Chile que ya trabajan con Proscom: distribuidoras, colegios, asociaciones deportivas, gestorías y más.",
  alternates: {
    canonical: `${siteConfig.url}/proyectos`,
  },
};

export default function ProjectsPage() {
  // Only display authorized projects
  const authorizedProjects = projectsData.filter((p) => p.isAuthorized);

  return (
    <div className="bg-white">
      {/* Hero Header */}
      <section className="bg-[#071A35] text-white py-16 lg:py-20 border-b border-white/10 relative overflow-hidden">
        <PageHeroFx />
        <div
          aria-hidden="true"
          className="absolute -top-20 right-1/4 w-96 h-96 bg-[#1479D4]/20 rounded-full blur-[140px] pointer-events-none animate-aurora"
        />

        <div {...reveal("blur")} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center max-w-3xl">
          <Badge variant="cyan" className="mb-4">
            Casos de éxito
          </Badge>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
            <SplitWords text="Negocios reales que ya dieron el paso" delay={200} />
          </h1>
          <p className="text-base sm:text-lg text-slate-300 mt-4 leading-relaxed">
            Empresas, colegios, organizaciones y emprendedores de Chile que hoy venden más y trabajan más ordenados.
          </p>
        </div>
      </section>

      {/* Projects Gallery */}
      <section className="py-20 bg-[#F3F6FA]">
        <div {...reveal("up")} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ProjectsGallery projects={authorizedProjects} />
        </div>
      </section>

      {/* CTA Box */}
      <section className="py-16 bg-white border-t border-slate-200">
        <div {...reveal("up")} className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-5">
          <h2 className="text-2xl sm:text-3xl font-bold text-[#071A35]">
            ¿Quieres algo así para tu negocio?
          </h2>
          <p className="text-sm sm:text-base text-slate-600 max-w-xl mx-auto">
            Cuéntanos cómo trabajas y te proponemos una solución a la medida de tu negocio y tu presupuesto.
          </p>
          <div className="pt-2">
            <Button
              href="/contacto"
              variant="primary"
              size="lg"
              icon={<MessageSquare className="w-5 h-5" />}
            >
              Quiero que me contacten
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
