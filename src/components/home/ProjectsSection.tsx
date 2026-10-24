import React from "react";
import Image from "next/image";
import Link from "next/link";
import { projectsData } from "@/data/projects";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { ArrowRight, Shield } from "lucide-react";
import { reveal } from "@/components/motion/reveal";
import { SplitWords } from "@/components/motion/SplitWords";

export const ProjectsSection: React.FC = () => {
  // Filter authorized featured projects
  const visibleProjects = projectsData
    .filter((p) => p.isAuthorized && p.isFeatured)
    .slice(0, 4);

  return (
    <section className="relative py-24 bg-[#F3F6FA] border-b border-slate-200 overflow-hidden">
      {/* Blueprint Grid Texture */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-grid-pattern-light opacity-40 [mask-image:radial-gradient(ellipse_at_center,white,transparent_80%)] pointer-events-none"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header with Top CTA Button */}
        <div {...reveal("up")} className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl space-y-3">
            <Badge variant="blue" className="shadow-sm">
              Casos Reales de Desarrollo
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#071A35] tracking-tight">
              <SplitWords text="Proyectos reales que generan resultados" delay={100} />
            </h2>
            <p className="text-base text-slate-600 leading-relaxed">
              Hemos desarrollado plataformas a medida para empresas privadas, fundaciones, instituciones educativas y organizaciones sociales en Chile.
            </p>
          </div>
          <div>
            <Button
              href="/proyectos"
              variant="primary"
              size="md"
              icon={<ArrowRight className="w-4 h-4" />}
              className="shadow-md shadow-[#1479D4]/20"
            >
              Ver todos los proyectos
            </Button>
          </div>
        </div>

        {/* 4 Projects Grid with Elevated Tech Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {visibleProjects.map((project, idx) => (
            <div
              key={project.id}
              {...reveal("up", idx * 110)}
              data-tilt
              className="tech-card-light rounded-2xl overflow-hidden flex flex-col justify-between group"
            >
              <div>
                {/* Image container with tech frame */}
                <div className="relative aspect-[16/11] w-full bg-[#071A35] overflow-hidden border-b border-slate-100">
                  <Image
                    src={project.image}
                    alt={project.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#071A35]/85 via-transparent to-transparent" />
                  
                  {/* Category Pill */}
                  <div className="absolute top-3 left-3">
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-md bg-[#071A35]/90 text-white uppercase tracking-wider backdrop-blur-md border border-white/15">
                      {project.category}
                    </span>
                  </div>

                  <div className="absolute top-3 right-3">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block shadow-[0_0_8px_#34d399]" />
                  </div>
                </div>

                {/* Body Content */}
                <div className="p-5">
                  {/* Explicit Client Project Notice */}
                  {project.isClientProject && (
                    <div className="flex items-center gap-1.5 text-[11px] text-[#1479D4] font-semibold mb-2">
                      <Shield className="w-3.5 h-3.5 shrink-0" />
                      <span>Proyecto a medida para cliente</span>
                    </div>
                  )}

                  <h3 className="text-base font-bold text-[#071A35] group-hover:text-[#1479D4] transition-colors mb-1.5">
                    {project.name}
                  </h3>
                  <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed mb-4">
                    {project.shortDescription}
                  </p>

                  {/* Tech stack chips */}
                  <div className="flex flex-wrap gap-1.5 pt-2 border-t border-slate-100">
                    {project.technologies.slice(0, 3).map((tech, i) => (
                      <span
                        key={i}
                        className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-600 font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Link */}
              <div className="p-5 pt-0">
                <Link
                  href={`/proyectos/${project.slug}`}
                  className="text-xs font-bold text-[#1479D4] group-hover:text-[#1688F5] inline-flex items-center gap-1"
                >
                  <span>Ver caso de estudio</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
