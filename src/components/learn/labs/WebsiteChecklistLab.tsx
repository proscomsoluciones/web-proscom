"use client";

import React, { useState } from "react";
import { CheckCircle2, Circle, Trophy } from "lucide-react";

interface Item {
  id: string;
  label: string;
  detail: string;
}

const ITEMS: Item[] = [
  { id: "logo", label: "Logo o identidad visual", detail: "Aunque sea una versión simple. Si no tienes, podemos ayudarte a crear una." },
  { id: "textos", label: "Textos sobre tu negocio", detail: "Qué haces, a quién le vendes y qué te hace distinto. No necesitan estar perfectos." },
  { id: "fotos", label: "Fotos o imágenes propias", detail: "De tu equipo, local o productos. Las fotos genéricas se notan y conectan menos." },
  { id: "dominio", label: "Nombre de dominio decidido", detail: "El nombre de tu sitio (tuempresa.cl). Conviene reservarlo apenas lo decidas." },
  { id: "objetivo", label: "Objetivo principal claro", detail: "¿Quieres vender, informar o generar contactos? Esto guía todo el diseño." },
  { id: "referencias", label: "1 o 2 sitios que te gusten", detail: "No para copiarlos, sino para entender qué estilo prefieres." },
  { id: "redes", label: "Redes sociales y WhatsApp de contacto", detail: "Para enlazarlos desde el sitio y que te encuentren por donde prefieran." },
  { id: "presupuesto", label: "Presupuesto o rango estimado", detail: "Aunque sea aproximado, ayuda a proponerte la solución correcta." },
];

export const WebsiteChecklistLab: React.FC = () => {
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const [open, setOpen] = useState<string | null>(ITEMS[0].id);

  const total = ITEMS.length;
  const done = Object.values(checked).filter(Boolean).length;
  const pct = Math.round((done / total) * 100);

  const toggle = (id: string) => setChecked((c) => ({ ...c, [id]: !c[id] }));

  return (
    <div className="lab-frame rounded-[2rem] bg-gradient-to-b from-[#0A1E3B] to-[#071A35] border border-white/10 shadow-2xl shadow-[#071A35]/40 overflow-hidden p-5 sm:p-8">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center gap-4 mb-6">
          <div className="flex-1 h-2 rounded-full bg-white/10 overflow-hidden">
            <div className="h-full bg-gradient-to-r from-[#1479D4] to-[#19C6E6] transition-all duration-500" style={{ width: `${pct}%` }} />
          </div>
          <span className="text-sm font-mono font-bold text-white tabular-nums shrink-0">
            {done}/{total}
          </span>
        </div>

        <div className="space-y-2.5">
          {ITEMS.map((item) => {
            const isChecked = !!checked[item.id];
            const isOpen = open === item.id;
            return (
              <div
                key={item.id}
                className={`rounded-xl border transition-colors ${isChecked ? "border-emerald-400/40 bg-emerald-400/10" : "border-white/10 bg-white/[0.03]"}`}
              >
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : item.id)}
                  className="w-full flex items-center gap-3 px-4 py-3 text-left"
                >
                  <span
                    role="checkbox"
                    aria-checked={isChecked}
                    onClick={(e) => {
                      e.stopPropagation();
                      toggle(item.id);
                    }}
                    className="shrink-0"
                  >
                    {isChecked ? <CheckCircle2 className="w-5 h-5 text-emerald-400" /> : <Circle className="w-5 h-5 text-slate-500" />}
                  </span>
                  <span className={`text-sm font-semibold flex-1 ${isChecked ? "text-emerald-100 line-through" : "text-white"}`}>{item.label}</span>
                </button>
                {isOpen && <p className="anim-rise px-4 pb-3.5 pl-12 text-xs text-slate-400 leading-relaxed">{item.detail}</p>}
              </div>
            );
          })}
        </div>

        {done === total && (
          <div className="anim-pop mt-6 flex items-center gap-3 rounded-2xl bg-gradient-to-r from-[#071A35] to-[#0C284E] border border-emerald-400/30 p-4">
            <Trophy className="w-6 h-6 text-amber-400 shrink-0" />
            <p className="text-sm text-white">¡Tienes todo listo! Ya puedes pedir tu cotización con información clara y precisa.</p>
          </div>
        )}
      </div>
    </div>
  );
};
