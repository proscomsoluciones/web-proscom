import React from "react";
import Link from "next/link";
import { ArrowRight, GraduationCap } from "lucide-react";
import { learnTopics } from "@/data/learn";
import { reveal } from "@/components/motion/reveal";
import { SplitWords } from "@/components/motion/SplitWords";
import { TopicIcon } from "@/components/learn/TopicIcon";
import { ApiPreview } from "@/components/learn/ApiPreview";

/** Vista previa del centro de aprendizaje en la página de inicio. */
export const LearnTeaser: React.FC = () => (
  <section className="relative py-24 bg-[#040F22] text-white overflow-hidden border-b border-white/10">
    <div aria-hidden="true" className="absolute inset-0 bg-dots-pattern-dark opacity-40 [mask-image:radial-gradient(ellipse_at_center,white,transparent_80%)] pointer-events-none" />
    <div aria-hidden="true" className="absolute -top-20 right-0 w-[600px] h-[600px] bg-[#1479D4]/15 rounded-full blur-[150px] pointer-events-none animate-aurora" />

    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
      <div {...reveal("left")} className="lg:col-span-5 space-y-6">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-xs font-mono text-[#19C6E6] uppercase tracking-wider">
          <GraduationCap className="w-3.5 h-3.5" /> Aprende con Proscom
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight leading-tight">
          <SplitWords text="Entiende la tecnología jugando con ella" delay={150} />
        </h2>
        <p className="text-slate-300 leading-relaxed">
          Creamos laboratorios interactivos en 3D para explicar, sin tecnicismos, cómo funcionan las piezas de cualquier proyecto digital. Porque un cliente que entiende, decide mejor.
        </p>
        <ul className="space-y-2">
          {learnTopics.slice(0, 5).map((t) => (
            <li key={t.slug}>
              <Link href={`/aprende/${t.slug}`} className="group flex items-center gap-3 rounded-xl px-3 py-2 -mx-3 hover:bg-white/5 transition-colors">
                <span className="scale-[0.55] -m-3.5">
                  <TopicIcon name={t.iconName} accent={t.accent} />
                </span>
                <span className="flex-1 text-sm font-semibold text-slate-200 group-hover:text-white">{t.question}</span>
                <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-[#19C6E6] group-hover:translate-x-1 transition-all" />
              </Link>
            </li>
          ))}
        </ul>
        <Link href="/aprende" className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#19C6E6] hover:underline">
          Ver los {learnTopics.length} temas <ArrowRight className="w-4 h-4" />
        </Link>
        <br />
        <Link
          href="/aprende/como-funciona-una-api"
          className="btn-shine inline-flex items-center gap-2 rounded-xl bg-[#1479D4] hover:bg-[#1688F5] px-6 py-3.5 text-sm font-bold shadow-lg shadow-[#1479D4]/40"
        >
          Probar el laboratorio de APIs <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
      <div {...reveal("zoom", 150)} className="lg:col-span-7">
        <ApiPreview />
      </div>
    </div>
  </section>
);
