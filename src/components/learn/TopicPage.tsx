import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ChevronRight, Clock, GraduationCap, ArrowDown, ArrowRight, ArrowLeft, MessageCircle, Sparkles } from "lucide-react";
import { siteConfig } from "@/config/site";
import { learnTopics, getLearnTopic, type LearnLabId } from "@/data/learn";
import { reveal } from "@/components/motion/reveal";
import { PageHeroFx } from "@/components/motion/PageHeroFx";
import { SplitWords } from "@/components/motion/SplitWords";
import { Glossary, Quiz } from "@/components/learn/lab-ui";
import { ApiLab } from "@/components/learn/labs/ApiLab";
import { WebLab } from "@/components/learn/labs/WebLab";
import { DomainLab } from "@/components/learn/labs/DomainLab";
import { CloudLab } from "@/components/learn/labs/CloudLab";
import { SecurityLab } from "@/components/learn/labs/SecurityLab";
import { CostLab } from "@/components/learn/labs/CostLab";
import { EmailLab } from "@/components/learn/labs/EmailLab";
import { PaymentLab } from "@/components/learn/labs/PaymentLab";
import { PasswordLab } from "@/components/learn/labs/PasswordLab";
import { WebsiteTypeLab } from "@/components/learn/labs/WebsiteTypeLab";
import { CmsLab } from "@/components/learn/labs/CmsLab";
import { WebScopeLab } from "@/components/learn/labs/WebScopeLab";
import { WebsiteWizardLab } from "@/components/learn/labs/WebsiteWizardLab";
import { SeoLab } from "@/components/learn/labs/SeoLab";
import { ResponsiveLab } from "@/components/learn/labs/ResponsiveLab";
import { AppVsWebLab } from "@/components/learn/labs/AppVsWebLab";
import { WebsiteChecklistLab } from "@/components/learn/labs/WebsiteChecklistLab";
import { TopicIcon } from "@/components/learn/TopicIcon";

const LABS: Record<LearnLabId, React.FC> = {
  api: ApiLab,
  web: WebLab,
  domain: DomainLab,
  cloud: CloudLab,
  security: SecurityLab,
  cost: CostLab,
  email: EmailLab,
  payment: PaymentLab,
  password: PasswordLab,
  "website-type": WebsiteTypeLab,
  cms: CmsLab,
  "web-scope": WebScopeLab,
  "website-wizard": WebsiteWizardLab,
  seo: SeoLab,
  responsive: ResponsiveLab,
  "app-vs-web": AppVsWebLab,
  "website-checklist": WebsiteChecklistLab,
};

/** Metadatos SEO de cada tema */
export function topicMetadata(slug: string): Metadata {
  const t = getLearnTopic(slug);
  if (!t) return { title: "Tema no encontrado" };
  const url = `${siteConfig.url}/aprende/${t.slug}`;
  return {
    title: { absolute: t.metaTitle },
    description: t.metaDescription,
    alternates: { canonical: url },
    openGraph: { title: t.metaTitle, description: t.metaDescription, url, siteName: siteConfig.name, locale: "es_CL", type: "article" },
  };
}

export const TopicPage: React.FC<{ slug: string }> = ({ slug }) => {
  const topic = getLearnTopic(slug);
  if (!topic) notFound();
  const Lab = LABS[topic.lab];
  const idx = learnTopics.findIndex((t) => t.slug === slug);
  const prev = learnTopics[idx - 1];
  const next = learnTopics[idx + 1];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LearningResource",
    name: topic.title,
    description: topic.metaDescription,
    educationalLevel: topic.level,
    timeRequired: `PT${topic.minutes}M`,
    inLanguage: "es-CL",
    isAccessibleForFree: true,
    provider: { "@type": "Organization", name: siteConfig.name, url: siteConfig.url },
    url: `${siteConfig.url}/aprende/${topic.slug}`,
  };

  return (
    <div className="bg-white">
      {/* Cabecera */}
      <section className="bg-[#071A35] text-white pt-10 pb-14 lg:pb-16 border-b border-white/10 relative overflow-hidden">
        <PageHeroFx />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10" {...reveal("blur")}>
          <nav aria-label="Miga de pan" className="mb-6">
            <ol className="flex items-center gap-2 text-xs text-slate-400">
              <li><Link href="/" className="hover:text-white">Inicio</Link></li>
              <li><ChevronRight className="w-3 h-3" /></li>
              <li><Link href="/aprende" className="hover:text-white">Aprende</Link></li>
              <li><ChevronRight className="w-3 h-3" /></li>
              <li className="text-[#19C6E6] font-medium truncate">{topic.title}</li>
            </ol>
          </nav>
          <div className="flex flex-col lg:flex-row lg:items-end gap-8 justify-between">
            <div className="max-w-3xl">
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 border border-white/15 px-3 py-1 text-xs font-mono text-[#19C6E6]">
                  <GraduationCap className="w-3.5 h-3.5" /> Tema {topic.number}
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-white/5 border border-white/10 px-3 py-1 text-xs text-slate-300">{topic.level}</span>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-white/5 border border-white/10 px-3 py-1 text-xs text-slate-300">
                  <Clock className="w-3.5 h-3.5" /> {topic.minutes} min
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
                <SplitWords text={topic.question} delay={150} />
              </h1>
              <p className="text-base sm:text-lg text-slate-300 mt-4 leading-relaxed">{topic.intro}</p>
              <a
                href="#laboratorio"
                className="btn-shine mt-6 inline-flex items-center gap-2 rounded-xl bg-[#1479D4] hover:bg-[#1688F5] px-5 py-3 text-sm font-bold shadow-lg shadow-[#1479D4]/40"
              >
                Ir al laboratorio <ArrowDown className="w-4 h-4" />
              </a>
            </div>
            <div className="hidden lg:block shrink-0 animate-float-slow">
              <TopicIcon name={topic.iconName} accent={topic.accent} size="lg" />
            </div>
          </div>
        </div>
      </section>

      {/* Laboratorio */}
      <section className="py-12 sm:py-16 bg-[#F3F6FA] border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div {...reveal("up")} className="flex items-center gap-2 mb-5">
            <Sparkles className="w-4 h-4 text-[#1479D4]" />
            <h2 className="text-sm font-mono font-bold uppercase tracking-wider text-[#1479D4]">Laboratorio interactivo</h2>
          </div>
          {/* Ancla sin animación, para que el salto calcule bien la posición */}
          <div id="laboratorio" aria-hidden="true" className="scroll-mt-[84px] h-0" />
          <div {...reveal("up", 100)}>
            <Lab />
          </div>
        </div>
      </section>

      {/* Lo que aprendiste */}
      <section className="py-16 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div {...reveal("up")} className="max-w-2xl mb-10">
            <p className="text-xs font-mono font-bold uppercase tracking-wider text-[#1479D4]">Resumen</p>
            <h2 className="text-3xl font-extrabold text-[#071A35] mt-1">
              <SplitWords text="Lo que te llevas de este tema" delay={100} />
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {topic.keyPoints.map((p, i) => (
              <div key={i} {...reveal("up", (i % 3) * 100)} data-tilt className="tech-card-light rounded-2xl p-5">
                <div className="relative z-10 flex gap-3">
                  <span className="grid place-items-center w-8 h-8 rounded-lg bg-[#1479D4]/10 text-[#1479D4] font-mono text-sm font-bold shrink-0">{i + 1}</span>
                  <p className="text-sm text-slate-700 leading-relaxed">{p}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Glosario + quiz */}
      <section className="py-16 bg-[#F3F6FA] border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
          <div {...reveal("up")}>
            <Glossary terms={topic.glossary} />
          </div>
          <div {...reveal("up")}>
            <Quiz questions={topic.quiz} />
          </div>
        </div>
      </section>

      {/* Servicio relacionado + navegación */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div {...reveal("zoom")} className="border-beam rounded-3xl bg-gradient-to-r from-[#071A35] to-[#0C284E] text-white p-8 sm:p-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="max-w-2xl">
              <p className="text-xs font-mono uppercase tracking-wider text-[#19C6E6]">¿Lo necesitas en tu empresa?</p>
              <h2 className="text-2xl font-extrabold mt-1">{topic.related.label}</h2>
              <p className="text-slate-300 mt-2 text-sm leading-relaxed">{topic.related.text}</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 shrink-0">
              <Link href={topic.related.href} className="inline-flex items-center justify-center gap-2 rounded-xl bg-white/10 hover:bg-white/15 border border-white/15 px-5 py-3 text-sm font-semibold">
                Ver servicio <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/contacto" className="btn-shine inline-flex items-center justify-center gap-2 rounded-xl bg-[#1479D4] hover:bg-[#1688F5] px-5 py-3 text-sm font-bold shadow-lg shadow-[#1479D4]/40">
                <MessageCircle className="w-4 h-4" /> Cotizar
              </Link>
            </div>
          </div>

          <nav aria-label="Otros temas" className="grid sm:grid-cols-2 gap-4">
            {prev ? (
              <Link href={`/aprende/${prev.slug}`} className="group tech-card-light rounded-2xl p-5 flex items-center gap-4">
                <ArrowLeft className="relative z-10 w-5 h-5 text-slate-400 group-hover:text-[#1479D4] group-hover:-translate-x-1 transition-all" />
                <span className="relative z-10">
                  <span className="block text-[11px] font-mono text-slate-400">Tema anterior</span>
                  <span className="block font-bold text-[#071A35] group-hover:text-[#1479D4]">{prev.title}</span>
                </span>
              </Link>
            ) : (
              <Link href="/aprende" className="group tech-card-light rounded-2xl p-5 flex items-center gap-4">
                <ArrowLeft className="relative z-10 w-5 h-5 text-slate-400 group-hover:text-[#1479D4]" />
                <span className="relative z-10 font-bold text-[#071A35]">Todos los temas</span>
              </Link>
            )}
            {next ? (
              <Link href={`/aprende/${next.slug}`} className="group tech-card-light rounded-2xl p-5 flex items-center justify-end gap-4 text-right">
                <span className="relative z-10">
                  <span className="block text-[11px] font-mono text-slate-400">Siguiente tema</span>
                  <span className="block font-bold text-[#071A35] group-hover:text-[#1479D4]">{next.title}</span>
                </span>
                <ArrowRight className="relative z-10 w-5 h-5 text-slate-400 group-hover:text-[#1479D4] group-hover:translate-x-1 transition-all" />
              </Link>
            ) : (
              <Link href="/aprende" className="group tech-card-light rounded-2xl p-5 flex items-center justify-end gap-4">
                <span className="relative z-10 font-bold text-[#071A35]">Volver a todos los temas</span>
                <ArrowRight className="relative z-10 w-5 h-5 text-slate-400 group-hover:text-[#1479D4]" />
              </Link>
            )}
          </nav>
        </div>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </div>
  );
};

