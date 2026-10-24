"use client";

import React, { useState } from "react";
import { FileText, Target, Search as SearchIcon, Clock } from "lucide-react";
import { ScenarioPicker } from "../lab-ui";

type Mode = "landing" | "completa";

const LANDING_SECTIONS = ["Encabezado + oferta", "Beneficios", "Formulario de contacto"];
const COMPLETA_PAGES = [
  { page: "Inicio", children: [] as string[] },
  { page: "Servicios", children: ["Servicio A", "Servicio B", "Servicio C"] },
  { page: "Nosotros", children: [] },
  { page: "Proyectos", children: ["Caso 1", "Caso 2"] },
  { page: "Contacto", children: [] },
];

export const WebScopeLab: React.FC = () => {
  const [mode, setMode] = useState<Mode>("landing");
  const isLanding = mode === "landing";

  return (
    <div className="lab-frame rounded-[2rem] bg-gradient-to-b from-[#0A1E3B] to-[#071A35] border border-white/10 shadow-2xl shadow-[#071A35]/40 overflow-hidden">
      <div className="p-5 sm:p-6 border-b border-white/10">
        <ScenarioPicker
          label="Tipo de sitio"
          value={mode}
          onChange={(v) => setMode(v as Mode)}
          options={[
            { id: "landing", label: "Landing page", hint: "Una sola página, un solo objetivo", tone: "info" },
            { id: "completa", label: "Web completa", hint: "Varias páginas y secciones", tone: "ok" },
          ]}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12">
        {/* Mapa del sitio */}
        <div className="lg:col-span-7 p-5 sm:p-6 border-b lg:border-b-0 lg:border-r border-white/10">
          <p className="text-[11px] font-mono uppercase tracking-wider text-slate-400 mb-4">Mapa del sitio</p>
          {isLanding ? (
            <div className="space-y-2.5 max-w-sm">
              {LANDING_SECTIONS.map((s, i) => (
                <div
                  key={s}
                  className="anim-rise rounded-xl bg-white/[0.05] border border-[#19C6E6]/30 px-4 py-3 flex items-center gap-3"
                  style={{ "--d": `${i * 80}ms` } as React.CSSProperties}
                >
                  <span className="grid place-items-center w-6 h-6 rounded-full bg-[#19C6E6]/20 text-[#19C6E6] text-[11px] font-mono font-bold shrink-0">{i + 1}</span>
                  <span className="text-sm font-semibold text-white">{s}</span>
                </div>
              ))}
              <div className="pt-1 text-center">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-[#19C6E6]/15 border border-[#19C6E6]/40 px-3 py-1 text-[11px] font-mono text-[#19C6E6]">
                  <Target className="w-3 h-3" /> 1 página · 1 objetivo
                </span>
              </div>
            </div>
          ) : (
            <div className="space-y-2.5">
              {COMPLETA_PAGES.map((p, i) => (
                <div key={p.page} className="anim-rise space-y-2" style={{ "--d": `${i * 70}ms` } as React.CSSProperties}>
                  <div className="rounded-xl bg-white/[0.05] border border-white/15 px-4 py-2.5 flex items-center gap-2">
                    <FileText className="w-3.5 h-3.5 text-[#19C6E6] shrink-0" />
                    <span className="text-sm font-semibold text-white">{p.page}</span>
                  </div>
                  {p.children.length > 0 && (
                    <div className="ml-6 space-y-1.5 border-l border-white/10 pl-4">
                      {p.children.map((c) => (
                        <p key={c} className="text-xs text-slate-400">
                          └ {c}
                        </p>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <div className="pt-1 text-center">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-400/15 border border-emerald-400/40 px-3 py-1 text-[11px] font-mono text-emerald-300">
                  <SearchIcon className="w-3 h-3" /> {COMPLETA_PAGES.length + COMPLETA_PAGES.reduce((a, p) => a + p.children.length, 0)} páginas indexables
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Resultado */}
        <div className="lg:col-span-5 p-5 sm:p-6 space-y-4" aria-live="polite">
          <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-4">
            <p className="text-sm text-slate-300 leading-relaxed">
              {isLanding
                ? "Una landing concentra toda la atención en una sola acción: dejar tus datos, reservar o comprar. Ideal para campañas, lanzamientos o un solo servicio."
                : "Una web completa organiza mucha información en varias páginas, para negocios con distintos servicios, proyectos o contenido que explorar."}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-2 text-center">
            <div className="rounded-xl bg-white/[0.04] border border-white/10 p-3">
              <p className="text-[9px] font-mono uppercase text-slate-400 flex items-center justify-center gap-1">
                <Clock className="w-3 h-3" /> Tiempo de desarrollo
              </p>
              <p className={`text-sm font-extrabold mt-1 ${isLanding ? "text-emerald-300" : "text-amber-300"}`}>{isLanding ? "Más corto" : "Mayor"}</p>
            </div>
            <div className="rounded-xl bg-white/[0.04] border border-white/10 p-3">
              <p className="text-[9px] font-mono uppercase text-slate-400 flex items-center justify-center gap-1">
                <SearchIcon className="w-3 h-3" /> Alcance en Google
              </p>
              <p className={`text-sm font-extrabold mt-1 ${isLanding ? "text-amber-300" : "text-emerald-300"}`}>{isLanding ? "Acotado" : "Mayor"}</p>
            </div>
          </div>

          <p className="text-xs text-slate-400 leading-relaxed">
            {isLanding
              ? "Conviene cuando hay un objetivo muy claro y, muchas veces, tráfico pagado llevando gente directo a esa página."
              : "Conviene cuando tu negocio tiene varios servicios, proyectos o contenido que vale la pena mostrar por separado."}
          </p>
        </div>
      </div>
    </div>
  );
};
