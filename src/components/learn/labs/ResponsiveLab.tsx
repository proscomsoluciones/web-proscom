"use client";

import React, { useState } from "react";
import { Smartphone, Tablet, Monitor } from "lucide-react";

const PRESETS = [
  { id: "mobile", label: "Celular", icon: Smartphone, width: 360 },
  { id: "tablet", label: "Tablet", icon: Tablet, width: 720 },
  { id: "desktop", label: "Computador", icon: Monitor, width: 1040 },
];

const CARDS = ["Software a medida", "Páginas web", "Apps móviles", "Sistemas de gestión", "Integraciones", "Soporte"];

export const ResponsiveLab: React.FC = () => {
  const [width, setWidth] = useState(1040);
  const isMobile = width < 640;
  const isTablet = width >= 640 && width < 900;
  const cols = isMobile ? 1 : isTablet ? 2 : 3;

  return (
    <div className="lab-frame rounded-[2rem] bg-gradient-to-b from-[#0A1E3B] to-[#071A35] border border-white/10 shadow-2xl shadow-[#071A35]/40 overflow-hidden p-5 sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-2">
          {PRESETS.map((p) => (
            <button
              key={p.id}
              type="button"
              onClick={() => setWidth(p.width)}
              className={`inline-flex items-center gap-1.5 rounded-xl border px-3 py-2 text-xs font-semibold transition-all ${
                Math.abs(width - p.width) < 4
                  ? "bg-[#1479D4] border-[#19C6E6] text-white"
                  : "bg-white/[0.04] border-white/10 text-slate-300 hover:border-white/25"
              }`}
            >
              <p.icon className="w-3.5 h-3.5" /> {p.label}
            </button>
          ))}
        </div>
        <label className="flex items-center gap-2 text-[11px] font-mono text-slate-400">
          Ancho: <span className="text-white font-bold">{width}px</span>
          <input
            type="range"
            min={320}
            max={1200}
            step={10}
            value={width}
            onChange={(e) => setWidth(Number(e.target.value))}
            className="w-40 accent-[#19C6E6] cursor-pointer"
          />
        </label>
      </div>

      <div className="overflow-x-auto pb-2">
        <div
          className="mx-auto rounded-2xl bg-white shadow-2xl overflow-hidden transition-[width] duration-200"
          style={{ width }}
        >
          <div className="flex items-center justify-between px-4 py-3 border-b border-slate-200">
            <span className="font-bold text-[#071A35] text-sm">Proscom</span>
            {isMobile ? (
              <span className="grid gap-1">
                <span className="block w-5 h-0.5 bg-[#071A35]" />
                <span className="block w-5 h-0.5 bg-[#071A35]" />
                <span className="block w-5 h-0.5 bg-[#071A35]" />
              </span>
            ) : (
              <div className="flex gap-4 text-xs font-semibold text-slate-600">
                <span>Servicios</span>
                <span>Proyectos</span>
                <span>Aprende</span>
                <span>Contacto</span>
              </div>
            )}
          </div>
          <div className="p-4">
            <div className={`grid gap-3`} style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}>
              {CARDS.map((c) => (
                <div key={c} className="rounded-xl bg-slate-50 border border-slate-200 p-3">
                  <div className="w-7 h-7 rounded-lg bg-[#1479D4]/15 mb-2" />
                  <p className="text-[11px] font-semibold text-slate-700 leading-tight">{c}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <p className="text-center text-xs text-slate-400 mt-5">
        {isMobile
          ? "Menos de 640px: el menú se colapsa en un botón y las tarjetas se apilan en una sola columna."
          : isTablet
            ? "Entre 640px y 900px: aparece el menú completo y las tarjetas se acomodan en dos columnas."
            : "Más de 900px: hay espacio de sobra, así que las tarjetas se despliegan en tres columnas."}
      </p>
    </div>
  );
};
