import React from "react";
import { methodologyData } from "@/data/methodology";
import {
  MessageSquare,
  Search,
  PenTool,
  Code2,
  Rocket,
  Headphones,
  GitBranch,
} from "lucide-react";
import { reveal } from "@/components/motion/reveal";
import { SplitWords } from "@/components/motion/SplitWords";

export const MethodologySection: React.FC = () => {
  const getStepIcon = (step: number) => {
    switch (step) {
      case 1:
        return <MessageSquare className="w-5 h-5 text-[#19C6E6]" />;
      case 2:
        return <Search className="w-5 h-5 text-[#19C6E6]" />;
      case 3:
        return <PenTool className="w-5 h-5 text-[#19C6E6]" />;
      case 4:
        return <Code2 className="w-5 h-5 text-[#19C6E6]" />;
      case 5:
        return <Rocket className="w-5 h-5 text-[#19C6E6]" />;
      case 6:
        return <Headphones className="w-5 h-5 text-[#19C6E6]" />;
      default:
        return <Code2 className="w-5 h-5 text-[#19C6E6]" />;
    }
  };

  return (
    <section className="relative py-24 bg-[#040F22] text-white overflow-hidden border-b border-white/10">
      {/* Blueprint Grid Texture */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-grid-pattern-dark opacity-25 [mask-image:radial-gradient(ellipse_at_center,white,transparent_80%)] pointer-events-none"
      />

      {/* Atmospheric Lighting */}
      <div
        aria-hidden="true"
        className="absolute top-1/2 left-0 w-96 h-96 bg-[#1479D4]/15 rounded-full blur-[140px] pointer-events-none"
      />
      <div
        aria-hidden="true"
        className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#19C6E6]/10 rounded-full blur-[130px] pointer-events-none"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div {...reveal("up")} className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-[#19C6E6]">
            <GitBranch className="w-3.5 h-3.5" />
            <span>Workflow de Ingeniería</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            <SplitWords text="De tu idea a una solución real" delay={100} />
          </h2>
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
            Un proceso de desarrollo simple, transparente y estructurado como una línea de producción ágil.
          </p>
        </div>

        {/* Línea de tiempo: la línea central se llena a medida que haces scroll */}
        <div data-scroll-progress className="relative">
          {/* Riel + relleno */}
          <div
            aria-hidden="true"
            className="absolute top-0 bottom-0 left-[22px] lg:left-1/2 lg:-translate-x-1/2 w-[2px] bg-white/10 rounded-full overflow-hidden"
          >
            <div className="timeline-fill absolute inset-0 bg-gradient-to-b from-[#19C6E6] via-[#1688F5] to-[#19C6E6] shadow-[0_0_14px_#19C6E6]" />
          </div>

          <ol className="space-y-10 lg:space-y-4">
            {methodologyData.map((stage, idx) => {
              const isLeft = idx % 2 === 0;
              return (
                <li
                  key={stage.step}
                  {...reveal(isLeft ? "left" : "right")}
                  className="timeline-step relative grid grid-cols-[44px_1fr] lg:grid-cols-[1fr_88px_1fr] items-center gap-4 lg:gap-0"
                >
                  {/* Nodo */}
                  <div className="row-start-1 col-start-1 lg:col-start-2 flex justify-center">
                    <span className="timeline-dot relative z-10 w-[18px] h-[18px] rounded-full bg-[#040F22] border-2 border-[#19C6E6]/40" />
                  </div>

                  {/* Tarjeta */}
                  <div
                    data-tilt
                    className={`row-start-1 col-start-2 tech-card-dark rounded-2xl p-6 lg:p-7 group ${
                      isLeft ? "lg:col-start-1 lg:mr-2" : "lg:col-start-3 lg:ml-2"
                    }`}
                  >
                    <div className="relative z-10">
                      <div className="flex items-center justify-between mb-4">
                        <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#1479D4]/25 to-[#19C6E6]/10 border border-[#19C6E6]/30 flex items-center justify-center group-hover:scale-110 transition-transform">
                          {getStepIcon(stage.step)}
                        </div>
                        <span className="font-mono text-lg font-extrabold text-[#19C6E6]/40 group-hover:text-[#19C6E6] transition-colors">
                          STAGE // 0{stage.step}
                        </span>
                      </div>
                      <h3 className="text-lg font-bold text-white group-hover:text-[#19C6E6] transition-colors">
                        {stage.title}
                      </h3>
                      <p className="text-xs font-mono font-semibold text-[#1479D4] mt-0.5 mb-3 uppercase tracking-wider">
                        {stage.subtitle}
                      </p>
                      <p className="text-sm text-slate-300 leading-relaxed">
                        {stage.description}
                      </p>
                      <div className="pt-5 mt-4 border-t border-white/5">
                        <div className="w-full bg-white/10 h-1 rounded-full overflow-hidden">
                          <div
                            className="reveal-fill bg-gradient-to-r from-[#1479D4] to-[#19C6E6] h-full rounded-full shadow-[0_0_10px_#19C6E6]"
                            style={{ width: `${(stage.step / 6) * 100}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
};
