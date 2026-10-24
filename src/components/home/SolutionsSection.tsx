import React from "react";
import Image from "next/image";
import Link from "next/link";
import { solutionsData } from "@/data/solutions";
import { Badge } from "@/components/ui/Badge";
import { Check, ArrowRight, Sparkles, Terminal } from "lucide-react";
import { reveal } from "@/components/motion/reveal";
import { SplitWords } from "@/components/motion/SplitWords";

export const SolutionsSection: React.FC = () => {
  return (
    <section className="relative py-24 bg-[#071A35] text-white border-b border-white/10 overflow-hidden">
      {/* 1. Dot Matrix Tech Texture */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-dots-pattern-dark opacity-40 [mask-image:radial-gradient(ellipse_at_center,white,transparent_80%)] pointer-events-none"
      />

      {/* 2. Ambient Colored Spotlights */}
      <div
        aria-hidden="true"
        className="absolute top-1/4 left-10 w-[500px] h-[500px] bg-[#1479D4]/15 rounded-full blur-[140px] pointer-events-none animate-aurora"
      />
      <div
        aria-hidden="true"
        className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-[#19C6E6]/10 rounded-full blur-[130px] pointer-events-none animate-aurora-delayed"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div {...reveal("up")} className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <Badge variant="cyan" className="shadow-md shadow-[#19C6E6]/10">
            Soluciones Propias Proscom
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            <SplitWords text="Sistemas listos para impulsar tu gestión" delay={100} />
          </h2>
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
            Plataformas especializadas desarrolladas por Proscom para distintos sectores, con funcionalidades operativas reales y en constante evolución.
          </p>
        </div>

        {/* Solutions Cards with Dark-Tech Cockpit Styling */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {solutionsData.map((solution, idx) => (
            <div
              key={solution.id}
              {...reveal("up", idx * 130)}
              data-tilt
              className="tech-card-dark border-glow-top rounded-2xl overflow-hidden flex flex-col justify-between group"
            >
              <div>
                {/* Visual Header / Image with Tech Frame */}
                <div className="relative aspect-[16/10] w-full bg-[#040F22] overflow-hidden border-b border-white/10">
                  <Image
                    src={solution.image}
                    alt={solution.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#07172E] via-transparent to-transparent" />
                  {/* Línea de escaneo al pasar el cursor */}
                  <div
                    aria-hidden="true"
                    className="absolute inset-x-0 top-0 h-10 bg-gradient-to-b from-transparent via-[#19C6E6]/25 to-transparent scan-on-hover opacity-0 group-hover:opacity-100 pointer-events-none"
                  />
                  
                  {/* Status Badge */}
                  <div className="absolute top-3.5 right-3.5">
                    <span
                      className={`text-[10px] font-mono font-semibold px-2.5 py-1 rounded-full uppercase tracking-wider backdrop-blur-md border ${
                        solution.commercialStatus === "Disponible"
                          ? "bg-emerald-500/20 text-emerald-300 border-emerald-500/40"
                          : "bg-[#1479D4]/20 text-[#19C6E6] border-[#19C6E6]/30"
                      }`}
                    >
                      ● {solution.commercialStatus}
                    </span>
                  </div>

                  {/* Software name tag */}
                  <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between">
                    <span className="text-xs font-mono font-semibold text-[#19C6E6] bg-[#071A35]/80 px-2.5 py-0.5 rounded-md border border-white/10 backdrop-blur-sm">
                      {solution.slug}.proscom.cl
                    </span>
                  </div>
                </div>

                {/* Content body */}
                <div className="p-6">
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-[#1479D4] uppercase tracking-wider mb-2">
                    <Sparkles className="w-3.5 h-3.5 text-[#19C6E6]" />
                    <span>Plataforma Propia</span>
                  </div>

                  <h3 className="text-xl font-bold text-white group-hover:text-[#19C6E6] transition-colors mb-2">
                    {solution.name}
                  </h3>
                  <p className="text-xs text-slate-300 font-medium mb-3">
                    {solution.tagline}
                  </p>
                  <p className="text-sm text-slate-300 leading-relaxed mb-6">
                    {solution.shortDescription}
                  </p>

                  {/* Highlights with tech bullet points */}
                  <div className="space-y-2.5 pt-3 border-t border-white/10">
                    <p className="text-[11px] font-mono text-slate-400 uppercase tracking-wider flex items-center gap-1">
                      <Terminal className="w-3 h-3 text-[#19C6E6]" />
                      Funcionalidades confirmadas:
                    </p>
                    {solution.confirmedFeatures.slice(0, 3).map((feat, i) => (
                      <div
                        key={i}
                        className="text-xs text-slate-300 flex items-start gap-2"
                      >
                        <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Footer */}
              <div className="p-6 pt-0">
                <Link
                  href={`/soluciones/${solution.slug}`}
                  className="w-full text-center py-2.5 px-4 rounded-xl text-xs font-bold bg-white/10 hover:bg-[#1479D4] text-white hover:shadow-lg hover:shadow-[#1479D4]/30 border border-white/10 hover:border-transparent transition-all duration-200 inline-flex items-center justify-center gap-2 group-hover:border-[#19C6E6]/40"
                >
                  <span>Conocer detalles del sistema</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
