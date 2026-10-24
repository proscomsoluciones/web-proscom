"use client";

import React, { useEffect, useState } from "react";
import {
  Code2,
  Globe,
  Smartphone,
  LayoutDashboard,
  Headphones,
  Network,
  Cpu,
  Activity,
} from "lucide-react";

/* -------------------------------------------------------------------------- */
/*  Terminal que "despliega" un proyecto línea por línea, en bucle            */
/* -------------------------------------------------------------------------- */
const TERMINAL_LINES = [
  { text: "$ proscom deploy --cliente=tu-empresa", tone: "cmd" },
  { text: "✓ Análisis funcional completado", tone: "ok" },
  { text: "✓ Arquitectura escalable lista", tone: "ok" },
  { text: "✓ Build optimizado · 1.2s", tone: "ok" },
  { text: "● Sistema en producción", tone: "live" },
] as const;

const DeployTerminal: React.FC = () => {
  const [lineIdx, setLineIdx] = useState<number>(0);
  const [chars, setChars] = useState(0);

  useEffect(() => {
    // Sin animación: mostrar el terminal completo de inmediato
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const t = window.setTimeout(() => setLineIdx(TERMINAL_LINES.length), 0);
      return () => window.clearTimeout(t);
    }
    if (lineIdx >= TERMINAL_LINES.length) {
      const restart = window.setTimeout(() => {
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
        setLineIdx(0);
        setChars(0);
      }, 3200);
      return () => window.clearTimeout(restart);
    }
    const line = TERMINAL_LINES[lineIdx].text;
    if (chars < line.length) {
      const speed = lineIdx === 0 ? 38 : 14;
      const t = window.setTimeout(() => setChars((c) => c + 1), speed);
      return () => window.clearTimeout(t);
    }
    const next = window.setTimeout(() => {
      setLineIdx((i) => i + 1);
      setChars(0);
    }, lineIdx === 0 ? 450 : 320);
    return () => window.clearTimeout(next);
  }, [lineIdx, chars]);

  const toneClass = {
    cmd: "text-white",
    ok: "text-emerald-400",
    live: "text-[#19C6E6]",
  } as const;

  return (
    <div className="rounded-xl bg-[#040F22]/95 border border-white/15 backdrop-blur-xl shadow-2xl shadow-black/50 overflow-hidden w-[250px] sm:w-[290px]">
      <div className="flex items-center gap-1.5 px-3 py-2 border-b border-white/10 bg-white/[0.03]">
        <span className="w-2 h-2 rounded-full bg-[#FF5F57]" />
        <span className="w-2 h-2 rounded-full bg-[#FEBC2E]" />
        <span className="w-2 h-2 rounded-full bg-[#28C840]" />
        <span className="ml-2 text-[9px] font-mono text-slate-400">deploy.sh — proscom</span>
      </div>
      <div className="p-3 font-mono text-[10px] sm:text-[11px] leading-relaxed min-h-[112px]">
        {TERMINAL_LINES.map((line, i) => {
          if (i > lineIdx) return null;
          const visible = i < lineIdx ? line.text : line.text.slice(0, chars);
          return (
            <div key={i} className={toneClass[line.tone]}>
              {visible}
              {i === lineIdx && (
                <span className="animate-caret inline-block w-1.5 h-3 -mb-0.5 ml-0.5 bg-[#19C6E6]" />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/*  Tarjeta de métricas "en vivo"                                             */
/* -------------------------------------------------------------------------- */
const INITIAL_BARS = [42, 65, 38, 80, 56, 92, 70, 60, 85, 48];

const LiveMetrics: React.FC = () => {
  const [bars, setBars] = useState(INITIAL_BARS);
  const [rps, setRps] = useState(1284);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setInterval(() => {
      setBars((prev) => [...prev.slice(1), 30 + Math.round(Math.random() * 65)]);
      setRps(1150 + Math.round(Math.random() * 300));
    }, 1100);
    return () => window.clearInterval(id);
  }, []);

  return (
    <div className="rounded-xl bg-[#071A35]/95 border border-[#19C6E6]/25 backdrop-blur-xl shadow-2xl shadow-black/50 p-3 w-[170px] sm:w-[190px]">
      <div className="flex items-center justify-between mb-2">
        <span className="flex items-center gap-1 text-[9px] font-mono text-slate-400 uppercase tracking-wider">
          <Activity className="w-3 h-3 text-[#19C6E6]" /> Peticiones/s
        </span>
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
      </div>
      <p className="text-lg font-extrabold text-white font-mono tabular-nums leading-none mb-2">
        {rps.toLocaleString("es-CL")}
      </p>
      <div className="flex items-end gap-[3px] h-9">
        {bars.map((h, i) => (
          <span
            key={i}
            className="flex-1 rounded-sm bg-gradient-to-t from-[#1479D4] to-[#19C6E6] transition-[height] duration-700 ease-out"
            style={{ height: `${h}%`, opacity: 0.45 + (i / bars.length) * 0.55 }}
          />
        ))}
      </div>
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/*  Composición principal: núcleo + órbitas con servicios                     */
/* -------------------------------------------------------------------------- */
const ORBIT_ITEMS = [
  { icon: Code2, label: "Software" },
  { icon: Globe, label: "Web" },
  { icon: Smartphone, label: "Apps" },
  { icon: LayoutDashboard, label: "Gestión" },
  { icon: Network, label: "APIs" },
  { icon: Headphones, label: "Soporte" },
];

const ORBIT_DURATION = "48s";

export const HeroVisual: React.FC = () => {
  return (
    <div className="relative w-full max-w-[min(520px,82svh)] mx-auto aspect-square select-none">
      {/* Halo */}
      <div className="absolute inset-[12%] rounded-full bg-gradient-to-br from-[#1479D4]/35 via-[#19C6E6]/20 to-transparent blur-3xl animate-aurora" />

      {/* Anillos SVG giratorios */}
      <svg
        viewBox="0 0 400 400"
        className="absolute inset-0 w-full h-full animate-spin-slow"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="ringGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#19C6E6" stopOpacity="0.9" />
            <stop offset="50%" stopColor="#1479D4" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#19C6E6" stopOpacity="0.6" />
          </linearGradient>
        </defs>
        <circle cx="200" cy="200" r="182" fill="none" stroke="url(#ringGrad)" strokeWidth="1" />
        <circle cx="200" cy="200" r="182" fill="none" stroke="#19C6E6" strokeOpacity="0.5" strokeWidth="2" strokeDasharray="2 22" />
      </svg>
      <svg
        viewBox="0 0 400 400"
        className="absolute inset-0 w-full h-full animate-spin-reverse"
        aria-hidden="true"
      >
        <circle cx="200" cy="200" r="132" fill="none" stroke="#1688F5" strokeOpacity="0.35" strokeWidth="1" strokeDasharray="60 14 4 14" />
        <circle cx="200" cy="68" r="3" fill="#19C6E6" />
        <circle cx="332" cy="200" r="2" fill="#1688F5" />
      </svg>
      <svg
        viewBox="0 0 400 400"
        className="absolute inset-0 w-full h-full animate-spin-medium"
        aria-hidden="true"
      >
        <circle cx="200" cy="200" r="88" fill="none" stroke="#19C6E6" strokeOpacity="0.25" strokeWidth="1" strokeDasharray="3 6" />
        <path d="M 200 112 A 88 88 0 0 1 288 200" fill="none" stroke="#19C6E6" strokeWidth="2" strokeLinecap="round" />
      </svg>

      {/* Iconos de servicios orbitando (anillo exterior) */}
      <div
        className="absolute inset-[4.5%]"
        style={{ animation: `spin-slow ${ORBIT_DURATION} linear infinite` }}
        aria-hidden="true"
      >
        {ORBIT_ITEMS.map(({ icon: Icon, label }, i) => {
          const angle = (i / ORBIT_ITEMS.length) * Math.PI * 2;
          const left = (50 + 50 * Math.sin(angle)).toFixed(3);
          const top = (50 - 50 * Math.cos(angle)).toFixed(3);
          return (
            <div
              key={label}
              className="absolute -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${left}%`, top: `${top}%` }}
            >
              {/* Contra-rotación para que el icono siempre quede derecho */}
              <div style={{ animation: `spin-reverse ${ORBIT_DURATION} linear infinite` }}>
                <div className="flex flex-col items-center gap-1">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-[#071A35]/90 border border-[#19C6E6]/35 backdrop-blur-md flex items-center justify-center shadow-lg shadow-[#19C6E6]/15">
                    <Icon className="w-5 h-5 text-[#19C6E6]" />
                  </div>
                  <span className="text-[9px] font-mono text-slate-300 bg-[#071A35]/80 px-1.5 rounded">
                    {label}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Núcleo central */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <span className="absolute inset-0 rounded-3xl border border-[#19C6E6]/60 animate-ping-soft" />
        <span
          className="absolute inset-0 rounded-3xl border border-[#19C6E6]/40 animate-ping-soft"
          style={{ animationDelay: "1.2s" }}
        />
        <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-3xl bg-gradient-to-br from-[#1479D4] via-[#1688F5] to-[#19C6E6] p-[1.5px] shadow-[0_0_60px_rgba(25,198,230,0.45)]">
          <div className="w-full h-full rounded-[22px] bg-[#071A35] flex flex-col items-center justify-center gap-1">
            <Cpu className="w-8 h-8 sm:w-10 sm:h-10 text-[#19C6E6]" />
            <span className="text-[9px] sm:text-[10px] font-mono font-bold tracking-[0.2em] text-white">
              PROSCOM
            </span>
          </div>
        </div>
      </div>

      {/* Terminal flotante */}
      <div className="absolute -left-2 sm:-left-8 -bottom-[34%] sm:bottom-[2%] z-20 animate-float-slow">
        <DeployTerminal />
      </div>

      {/* Métricas flotantes */}
      <div
        className="absolute -right-1 sm:-right-6 -top-[6%] sm:top-[4%] z-20 animate-float-slow scale-90 sm:scale-100 origin-top-right"
        style={{ animationDelay: "-2s" }}
      >
        <LiveMetrics />
      </div>
    </div>
  );
};
