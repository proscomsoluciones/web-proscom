"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Project } from "@/types";
import { Shield, ArrowRight } from "lucide-react";

interface ProjectsGalleryProps {
  projects: Project[];
}

export const ProjectsGallery: React.FC<ProjectsGalleryProps> = ({ projects }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>("Todos");

  const categories = [
    "Todos",
    "Software a medida",
    "Sistemas de Gestión",
    "Desarrollo web",
    "Punto de Venta",
    "Gestión Deportiva",
    "Gestión Documental",
    "Logística",
  ];

  const filteredProjects =
    selectedCategory === "Todos"
      ? projects
      : projects.filter((p) => p.category === selectedCategory);

  return (
    <div>
      {/* Category Filter Pills */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer focus-visible:outline-2 focus-visible:outline-[#1479D4] ${
              selectedCategory === cat
                ? "bg-[#1479D4] text-white shadow-md shadow-[#1479D4]/25"
                : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-200"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProjects.map((project, idx) => (
          <div
            key={`${selectedCategory}-${project.id}`}
            data-tilt
            data-spotlight="light"
            style={{ animationDelay: `${idx * 70}ms` }}
            className="card-enter relative group bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl hover:border-[#1479D4]/40 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
          >
            <div>
              {/* Image container */}
              <div className="relative aspect-[16/10] w-full bg-[#071A35] overflow-hidden">
                <Image
                  src={project.image}
                  alt={project.name}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#071A35]/80 via-transparent to-transparent" />
                <div className="absolute top-3 left-3">
                  <span className="text-[11px] font-bold px-2.5 py-1 rounded-md bg-[#071A35]/90 text-white uppercase tracking-wider backdrop-blur-md border border-white/10">
                    {project.category}
                  </span>
                </div>
                <div className="absolute top-3 right-3">
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-500/90 text-white backdrop-blur-md">
                    {project.status}
                  </span>
                </div>
              </div>

              {/* Content body */}
              <div className="p-6">
                {/* Explicit custom client development notice */}
                {project.isClientProject && (
                  <div className="flex items-center gap-1.5 text-xs text-[#1479D4] font-semibold mb-2">
                    <Shield className="w-3.5 h-3.5" />
                    <span>Proyecto desarrollado a medida para cliente</span>
                  </div>
                )}

                <h3 className="text-xl font-bold text-[#071A35] group-hover:text-[#1479D4] transition-colors mb-1">
                  {project.name}
                </h3>
                <p className="text-xs text-slate-400 font-medium mb-3">
                  {project.clientOrSector}
                </p>
                <p className="text-sm text-slate-600 line-clamp-3 leading-relaxed mb-4">
                  {project.shortDescription}
                </p>

                {/* Tech chips */}
                <div className="flex flex-wrap gap-1.5 pt-3 border-t border-slate-100">
                  {project.technologies.map((tech, i) => (
                    <span
                      key={i}
                      className="text-[11px] px-2.5 py-1 rounded-md bg-slate-100 text-slate-600 font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer action */}
            <div className="p-6 pt-0">
              <Link
                href={`/proyectos/${project.slug}`}
                className="w-full text-center py-2.5 px-4 rounded-xl text-xs font-bold bg-[#F3F6FA] hover:bg-[#1479D4] text-[#071A35] hover:text-white transition-all duration-200 inline-flex items-center justify-center gap-1.5 group-hover:shadow-sm"
              >
                <span>Ver ficha técnica y caso de estudio</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
