"use client";

/** Piezas 3D reutilizables para los laboratorios. */
import React from "react";
import { Lock, Loader2 } from "lucide-react";
import { Box3D } from "./stage3d";

/** Servidor (torre con luces) */
export const ServerBox: React.FC<{
  x: number;
  y: number;
  h?: number;
  active?: boolean;
  tone?: "ok" | "error" | "warn";
  dim?: boolean;
  w?: number;
}> = ({ x, y, h = 140, active, tone, dim, w = 110 }) => {
  const led = tone === "error" ? "bg-rose-400" : tone === "warn" ? "bg-amber-300" : "bg-emerald-400";
  return (
    <Box3D
      x={x}
      y={y}
      w={w}
      d={100}
      h={h}
      top={tone === "error" ? "#7F1D1D" : "#1E5AA0"}
      front={tone === "error" ? "#5B1414" : "#123766"}
      side={tone === "error" ? "#450A0A" : "#0C2850"}
      glow={active}
      dim={dim}
      frontContent={
        <div className="p-3 space-y-2">
          {Array.from({ length: Math.max(2, Math.floor(h / 36)) }).map((_, i) => (
            <div key={i} className="flex items-center gap-1.5 h-5 rounded bg-black/30 px-1.5">
              <span className={`w-1.5 h-1.5 rounded-full ${led} ${active ? "led-blink" : ""}`} style={{ animationDelay: `${i * 0.2}s` }} />
              <span className="w-1.5 h-1.5 rounded-full bg-[#19C6E6]/70" />
              <span className="flex-1 h-1 rounded bg-white/15" />
            </div>
          ))}
        </div>
      }
    />
  );
};

/** Base de datos o almacenamiento (discos apilados) */
export const DbStack: React.FC<{ x: number; y: number; active?: boolean; dim?: boolean; layers?: number; color?: "teal" | "violet" }> = ({
  x,
  y,
  active,
  dim,
  layers = 3,
  color = "teal",
}) => {
  const c = color === "violet" ? { top: "#8B5CF6", front: "#6D28D9", side: "#5B21B6" } : { top: "#14B8A6", front: "#0F766E", side: "#115E59" };
  return (
    <>
      {Array.from({ length: layers }).map((_, i) => (
        <Box3D key={i} x={x} y={y} w={100} d={100} h={24} z={i * 32} {...c} glow={active} dim={dim} />
      ))}
    </>
  );
};

/** Ventana de navegador (para usar dentro de un Billboard) */
export const BrowserWindow: React.FC<{
  url: string;
  secure?: boolean | "insecure";
  typing?: boolean;
  children?: React.ReactNode;
  width?: number;
  loading?: boolean;
}> = ({ url, secure, typing, children, width = 210, loading }) => (
  <div className="rounded-xl overflow-hidden bg-white shadow-[0_20px_40px_rgba(0,0,0,0.5)] border border-white/20" style={{ width }}>
    <div className="flex items-center gap-1 px-2 py-1.5 bg-slate-100 border-b border-slate-200">
      <span className="w-1.5 h-1.5 rounded-full bg-[#FF5F57]" />
      <span className="w-1.5 h-1.5 rounded-full bg-[#FEBC2E]" />
      <span className="w-1.5 h-1.5 rounded-full bg-[#28C840]" />
      <span className="ml-1 flex-1 flex items-center gap-1 h-4 rounded bg-white border border-slate-200 px-1.5 overflow-hidden">
        {secure === true && <Lock className="w-2.5 h-2.5 text-emerald-600 shrink-0" />}
        {secure === "insecure" && <span className="text-[7px] font-bold text-rose-500 shrink-0">No seguro</span>}
        <span className="text-[8px] font-mono text-slate-600 whitespace-nowrap">{url}</span>
        {typing && <span className="animate-caret w-px h-2.5 bg-slate-700" />}
        {loading && <Loader2 className="w-2.5 h-2.5 text-[#1479D4] animate-spin ml-auto shrink-0" />}
      </span>
    </div>
    <div className="h-[120px] p-2">{children}</div>
  </div>
);

/** Contenido de sitio web de ejemplo según su estado de carga */
export const SitePreview: React.FC<{ state: "blank" | "html" | "full" }> = ({ state }) => {
  if (state === "blank") return <div className="h-full grid place-items-center text-[8px] text-slate-400">Esperando…</div>;
  const full = state === "full";
  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <span className={`h-2 w-10 rounded ${full ? "bg-[#071A35]" : "bg-slate-300"}`} />
        <span className="flex gap-1">
          {[0, 1, 2].map((i) => (
            <span key={i} className="h-1.5 w-5 rounded bg-slate-300" />
          ))}
        </span>
      </div>
      <div className={`rounded p-2 transition-colors duration-700 ${full ? "bg-gradient-to-r from-[#1479D4] to-[#19C6E6]" : "bg-slate-200"}`}>
        <span className={`block h-2 w-2/3 rounded mb-1 ${full ? "bg-white" : "bg-slate-400"}`} />
        <span className={`block h-1.5 w-1/2 rounded ${full ? "bg-white/70" : "bg-slate-300"}`} />
      </div>
      <div className="grid grid-cols-3 gap-1">
        {[0, 1, 2].map((i) => (
          <div key={i} className={`h-8 rounded transition-colors duration-700 ${full ? ["bg-amber-200", "bg-emerald-200", "bg-sky-200"][i] : "bg-slate-100 border border-dashed border-slate-300"}`} />
        ))}
      </div>
    </div>
  );
};
