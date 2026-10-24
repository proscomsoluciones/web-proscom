import React from "react";
import Link from "next/link";
import type { Metadata } from "next";
import { Clock, ArrowRight, MousePointerClick, Box, Trophy, GraduationCap, Globe2, Briefcase, ShieldHalf, Sparkles } from "lucide-react";
import { siteConfig } from "@/config/site";
import { learnTopics, LEARN_CATEGORIES } from "@/data/learn";
import { Badge } from "@/components/ui/Badge";
import { reveal } from "@/components/motion/reveal";
import { PageHeroFx } from "@/components/motion/PageHeroFx";
import { SplitWords } from "@/components/motion/SplitWords";
import { TopicIcon } from "@/components/learn/TopicIcon";

export const metadata: Metadata = {
  title: "Aprende tecnología con laboratorios interactivos 3D",
  description:
    "Centro de aprendizaje de Proscom: APIs, páginas web, dominios y hosting, correo, la nube, HTTPS, contraseñas, pagos online y software a medida, explicados con laboratorios interactivos en 3D.",
  alternates: { canonical: `${siteConfig.url}/aprende` },
};

export default function LearnIndexPage() {
  return (
    <div className="bg-white">
      <section className="bg-[#071A35] text-white py-16 lg:py-24 border-b border-white/10 relative overflow-hidden">
        <PageHeroFx />
        <div {...reveal("blur")} className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <Badge variant="cyan" className="mb-4">
            <GraduationCap className="w-3.5 h-3.5 mr-1 inline" /> Centro de aprendizaje Proscom
          </Badge>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
            <SplitWords text="Aprende cómo funciona la tecnología que usas cada día" delay={150} />
          </h1>
          <p className="text-base sm:text-lg text-slate-300 mt-5 leading-relaxed">
            Laboratorios interactivos en 3D para entender, sin tecnicismos, lo que pasa detrás de una app, un sitio web o un sistema en la nube. Experimenta, equivócate y ponte a prueba.
          </p>
        </div>
      </section>

      {/* Cómo funciona */}
      <section className="py-10 bg-white border-b border-slate-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 grid sm:grid-cols-3 gap-6">
          {[
            { icon: MousePointerClick, t: "1. Elige un tema", d: "Cada tema responde una pregunta concreta." },
            { icon: Box, t: "2. Experimenta en 3D", d: "Envía solicitudes, simula fallas y mira qué ocurre." },
            { icon: Trophy, t: "3. Ponte a prueba", d: "Un mini desafío al final para confirmar lo aprendido." },
          ].map(({ icon: Icon, t, d }, i) => (
            <div key={t} {...reveal("up", i * 120)} className="flex gap-3">
              <span className="grid place-items-center w-11 h-11 rounded-xl bg-[#1479D4]/10 text-[#1479D4] shrink-0">
                <Icon className="w-5 h-5" />
              </span>
              <span>
                <span className="block font-bold text-[#071A35]">{t}</span>
                <span className="block text-sm text-slate-600">{d}</span>
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Temas */}
      <section className="py-16 lg:py-20 bg-[#F3F6FA]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-16">
            {LEARN_CATEGORIES.map((cat, ci) => {
              const topics = learnTopics.filter((t) => t.category === cat);
              const CatIcon = [Sparkles, Globe2, Briefcase, ShieldHalf][ci];
              return (
                <div key={cat}>
                  <div {...reveal("up")} className="flex items-center gap-3 mb-6">
                    <span className="grid place-items-center w-10 h-10 rounded-xl bg-[#071A35] text-[#19C6E6]">
                      <CatIcon className="w-5 h-5" />
                    </span>
                    <h2 className="text-2xl font-extrabold text-[#071A35]">{cat}</h2>
                    <span className="text-xs font-mono text-slate-400">{topics.length} temas</span>
                    <span className="flex-1 h-px bg-gradient-to-r from-slate-300 to-transparent" />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {topics.map((t, i) => (
                      <Link
                        key={t.slug}
                        href={`/aprende/${t.slug}`}
                        {...reveal("up", (i % 3) * 110)}
                        data-tilt
                        className="group tech-card-dark rounded-3xl p-7 flex flex-col justify-between min-h-[300px]"
                      >
                        <div className="relative z-10">
                          <div className="flex items-start justify-between gap-4 mb-6">
                            <div className="transition-transform duration-500 group-hover:-translate-y-1 group-hover:scale-105">
                              <TopicIcon name={t.iconName} accent={t.accent} />
                            </div>
                            <span className="font-mono text-4xl font-extrabold text-white/10 group-hover:text-white/25 transition-colors">{t.number}</span>
                          </div>
                          {t.slug === "web-informativa-o-autoadministrable" && (
                            <span className="inline-block mb-3 rounded-full bg-[#19C6E6]/15 border border-[#19C6E6]/40 px-3 py-1 text-[11px] font-mono font-bold text-[#19C6E6]">
                              ★ Recomendado para empezar
                            </span>
                          )}
                          <h3 className="text-xl font-extrabold text-white group-hover:text-[#19C6E6] transition-colors">{t.title}</h3>
                          <p className="text-sm font-semibold text-slate-300 mt-1">{t.question}</p>
                          <p className="text-sm text-slate-400 leading-relaxed mt-3">{t.shortDescription}</p>
                        </div>
                        <div className="relative z-10 flex items-center justify-between pt-6 mt-6 border-t border-white/10">
                          <span className="flex items-center gap-3 text-xs text-slate-400">
                            <span>{t.level}</span>
                            <span className="flex items-center gap-1">
                              <Clock className="w-3.5 h-3.5" /> {t.minutes} min
                            </span>
                          </span>
                          <span className="inline-flex items-center gap-1.5 text-sm font-bold text-[#19C6E6]">
                            Abrir laboratorio <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                          </span>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          <p {...reveal("up")} className="text-center text-sm text-slate-500 mt-12">
            ¿Te gustaría que agreguemos un tema?{" "}
            <Link href="/contacto" className="font-bold text-[#1479D4] hover:underline">
              Escríbenos
            </Link>
          </p>
        </div>
      </section>
    </div>
  );
}
