"use client";

import React, { useState } from "react";
import { Gauge, FileText, Link2, Tags, Search } from "lucide-react";
import { Toggle } from "../lab-ui";

interface Factor {
  id: string;
  label: string;
  icon: React.ReactNode;
  weight: number;
  on: boolean;
}

const INITIAL: Factor[] = [
  { id: "speed", label: "Carga rápida y versión móvil", icon: <Gauge className="w-3.5 h-3.5" />, weight: 28, on: false },
  { id: "titles", label: "Títulos y descripciones claras", icon: <Tags className="w-3.5 h-3.5" />, weight: 22, on: false },
  { id: "content", label: "Contenido útil y original", icon: <FileText className="w-3.5 h-3.5" />, weight: 30, on: false },
  { id: "links", label: "Enlaces desde otros sitios", icon: <Link2 className="w-3.5 h-3.5" />, weight: 20, on: false },
];

const COMPETITORS = [
  { name: "competidor-a.cl", score: 72 },
  { name: "competidor-b.cl", score: 54 },
  { name: "competidor-c.cl", score: 38 },
];

export const SeoLab: React.FC = () => {
  const [factors, setFactors] = useState(INITIAL);
  const score = factors.reduce((acc, f) => acc + (f.on ? f.weight : 0), 0);

  const toggle = (id: string) => setFactors((fs) => fs.map((f) => (f.id === id ? { ...f, on: !f.on } : f)));

  const all = [...COMPETITORS, { name: "tuempresa.cl", score, mine: true }].sort((a, b) => b.score - a.score);
  const myRank = all.findIndex((s) => "mine" in s) + 1;

  return (
    <div className="lab-frame rounded-[2rem] bg-gradient-to-b from-[#0A1E3B] to-[#071A35] border border-white/10 shadow-2xl shadow-[#071A35]/40 overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-12">
        {/* Factores */}
        <div className="lg:col-span-6 p-5 sm:p-6 border-b lg:border-b-0 lg:border-r border-white/10">
          <p className="text-[11px] font-mono uppercase tracking-wider text-slate-400 mb-4">Activa factores de SEO en tu sitio</p>
          <div className="space-y-3">
            {factors.map((f) => (
              <div key={f.id} className="flex items-center justify-between gap-3 rounded-xl bg-white/[0.03] border border-white/10 px-3.5 py-3">
                <span className="flex items-center gap-2 text-sm text-slate-200">
                  {f.icon} {f.label}
                </span>
                <Toggle checked={f.on} onChange={() => toggle(f.id)} label={f.on ? "Activo" : "Inactivo"} />
              </div>
            ))}
          </div>
          <p className="mt-4 text-xs text-slate-500 leading-relaxed">
            Esta puntuación es una simplificación educativa: Google usa cientos de señales, pero estos cuatro grupos explican la mayor parte del resultado.
          </p>
        </div>

        {/* Resultado de búsqueda simulado */}
        <div className="lg:col-span-6 p-5 sm:p-6 space-y-4" aria-live="polite">
          <div className="flex items-center gap-2 rounded-xl bg-white border border-slate-200 px-4 py-2.5">
            <Search className="w-4 h-4 text-slate-400" />
            <span className="text-sm text-slate-500">heladería artesanal valparaíso</span>
          </div>

          <div className="space-y-2">
            {all.map((s, i) => (
              <div
                key={s.name}
                className={`anim-rise rounded-xl border px-4 py-3 transition-colors ${
                  "mine" in s ? "border-[#19C6E6] bg-[#19C6E6]/10" : "border-white/10 bg-white/[0.03]"
                }`}
              >
                <p className={`text-[11px] font-mono ${"mine" in s ? "text-[#19C6E6]" : "text-slate-500"}`}>
                  {i + 1}. {s.name}
                </p>
                <div className="mt-1.5 h-1.5 rounded-full bg-white/10 overflow-hidden">
                  <div
                    className={`h-full transition-all duration-500 ${"mine" in s ? "bg-gradient-to-r from-[#1479D4] to-[#19C6E6]" : "bg-white/25"}`}
                    style={{ width: `${s.score}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-4 text-center">
            <p className="text-[11px] font-mono uppercase text-slate-400">Tu posición simulada</p>
            <p className="text-2xl font-extrabold text-white mt-1">
              #{myRank} <span className="text-sm text-slate-400 font-normal">de {all.length}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
