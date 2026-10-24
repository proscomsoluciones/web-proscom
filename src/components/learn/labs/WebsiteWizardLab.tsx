"use client";

import React, { useState } from "react";
import { ArrowRight, RotateCcw, MessageCircle } from "lucide-react";
import Link from "next/link";

interface Question {
  q: string;
  options: { label: string; tags: string[] }[];
}

const QUESTIONS: Question[] = [
  {
    q: "¿Cuál es el objetivo principal de tu sitio?",
    options: [
      { label: "Vender productos en línea", tags: ["tienda"] },
      { label: "Generar contactos o reservas", tags: ["landing"] },
      { label: "Informar sobre mi empresa o servicios", tags: ["informativa", "completa"] },
    ],
  },
  {
    q: "¿Qué tan seguido necesitarás cambiar el contenido?",
    options: [
      { label: "Casi nunca", tags: ["fijo"] },
      { label: "Seguido: precios, novedades, fotos", tags: ["cms"] },
    ],
  },
  {
    q: "¿Cuántas secciones distintas necesitas contar?",
    options: [
      { label: "Una sola, bien enfocada", tags: ["una"] },
      { label: "Varias: servicios, nosotros, proyectos…", tags: ["varias"] },
    ],
  },
];

interface Result {
  title: string;
  desc: string;
  href: string;
}

function recommend(tags: string[]): Result {
  if (tags.includes("tienda")) {
    return {
      title: "Tienda online (e-commerce)",
      desc: "Necesitas catálogo, carrito de compras y una pasarela de pago integrada, además de gestión de stock.",
      href: "/servicios/ecommerce",
    };
  }
  if (tags.includes("landing") && tags.includes("una")) {
    return {
      title: "Landing page",
      desc: "Una sola página enfocada en lograr esa acción concreta: dejar sus datos, reservar o contactarte.",
      href: "/aprende/web-completa-o-landing-page",
    };
  }
  if (tags.includes("cms")) {
    return {
      title: "Web autoadministrable (con CMS)",
      desc: "Como cambiarás contenido seguido, un panel de administración te ahorrará tiempo y dependencia.",
      href: "/aprende/web-informativa-o-autoadministrable",
    };
  }
  return {
    title: "Web informativa, de varias secciones",
    desc: "Tu contenido es estable y necesitas contar varias cosas: te conviene un sitio completo y bien organizado.",
    href: "/servicios/desarrollo-web",
  };
}

export const WebsiteWizardLab: React.FC = () => {
  const [step, setStep] = useState(0);
  const [tags, setTags] = useState<string[]>([]);

  const answer = (optTags: string[]) => {
    const next = [...tags, ...optTags];
    setTags(next);
    setStep((s) => s + 1);
  };

  const reset = () => {
    setStep(0);
    setTags([]);
  };

  const done = step >= QUESTIONS.length;
  const result = done ? recommend(tags) : null;

  return (
    <div className="lab-frame rounded-[2rem] bg-gradient-to-b from-[#0A1E3B] to-[#071A35] border border-white/10 shadow-2xl shadow-[#071A35]/40 overflow-hidden p-5 sm:p-8">
      <div className="max-w-xl mx-auto">
        <div className="flex items-center gap-2 mb-6">
          {QUESTIONS.map((_, i) => (
            <span key={i} className={`h-1.5 flex-1 rounded-full transition-colors ${i < step ? "bg-[#19C6E6]" : i === step && !done ? "bg-white/40" : "bg-white/10"}`} />
          ))}
        </div>

        {!done ? (
          <div key={step} className="anim-rise">
            <p className="text-[11px] font-mono uppercase tracking-wider text-[#19C6E6] mb-2">
              Pregunta {step + 1} de {QUESTIONS.length}
            </p>
            <h3 className="text-xl font-extrabold text-white mb-5">{QUESTIONS[step].q}</h3>
            <div className="space-y-2.5">
              {QUESTIONS[step].options.map((o) => (
                <button
                  key={o.label}
                  type="button"
                  onClick={() => answer(o.tags)}
                  className="group w-full flex items-center justify-between gap-3 rounded-xl border border-white/15 bg-white/[0.04] hover:bg-[#1479D4]/15 hover:border-[#19C6E6] px-4 py-3.5 text-left transition-all"
                >
                  <span className="text-sm font-semibold text-slate-200 group-hover:text-white">{o.label}</span>
                  <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-[#19C6E6] group-hover:translate-x-1 transition-all shrink-0" />
                </button>
              ))}
            </div>
          </div>
        ) : (
          result && (
            <div className="anim-pop text-center">
              <p className="text-[11px] font-mono uppercase tracking-wider text-[#19C6E6] mb-2">Nuestra recomendación</p>
              <h3 className="text-2xl font-extrabold text-white mb-3">{result.title}</h3>
              <p className="text-sm text-slate-300 leading-relaxed mb-6">{result.desc}</p>
              <div className="flex flex-wrap justify-center gap-3">
                <Link
                  href={result.href}
                  className="inline-flex items-center gap-2 rounded-xl bg-white/10 hover:bg-white/15 border border-white/15 px-4 py-2.5 text-sm font-semibold text-white"
                >
                  Conocer más <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/contacto"
                  className="btn-shine inline-flex items-center gap-2 rounded-xl bg-[#1479D4] hover:bg-[#1688F5] px-4 py-2.5 text-sm font-bold text-white shadow-lg shadow-[#1479D4]/40"
                >
                  <MessageCircle className="w-4 h-4" /> Cotizar este proyecto
                </Link>
              </div>
              <button
                type="button"
                onClick={reset}
                className="mt-5 inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-white"
              >
                <RotateCcw className="w-3.5 h-3.5" /> Responder de nuevo
              </button>
            </div>
          )
        )}
      </div>
    </div>
  );
};
