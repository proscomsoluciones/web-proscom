"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  Globe,
  Server,
  Database,
  Cloud,
  Zap,
  Activity,
} from "lucide-react";

export const MotionArchitecture: React.FC = () => {
  const [activeNode, setActiveNode] = useState<number>(0);
  const [paused, setPaused] = useState(false);
  const [inView, setInView] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const CYCLE_MS = 3800;

  // Solo anima cuando la sección está en pantalla
  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), {
      threshold: 0.25,
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Recorre los nodos automáticamente (se pausa al interactuar)
  useEffect(() => {
    if (paused || !inView) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setTimeout(
      () => setActiveNode((n) => (n + 1) % 4),
      CYCLE_MS
    );
    return () => window.clearTimeout(id);
  }, [activeNode, paused, inView]);

  const nodes = [
    {
      id: 0,
      title: "Apps & Frontends",
      subtitle: "Web, iOS & Android",
      desc: "Interfaces ultra reactivas construidas en Next.js y TypeScript con tiempos de carga de alto rendimiento.",
      icon: <Globe className="w-5 h-5 text-[#19C6E6]" />,
      stats: "Latencia <12ms",
    },
    {
      id: 1,
      title: "API Gateway",
      subtitle: "Microservicios REST",
      desc: "Ruteo seguro, validaciones con Zod y colas de procesamiento asíncrono para soportar miles de peticiones.",
      icon: <Server className="w-5 h-5 text-[#1479D4]" />,
      stats: "Escalabilidad 99.9%",
    },
    {
      id: 2,
      title: "Datos & Cifrado",
      subtitle: "PostgreSQL & MySQL",
      desc: "Bases de datos relacionales normalizadas con respaldos automatizados y cifrado en tránsito y reposo.",
      icon: <Database className="w-5 h-5 text-emerald-400" />,
      stats: "Cifrado TLS 1.3",
    },
    {
      id: 3,
      title: "Cloud & DevOps",
      subtitle: "Alta Disponibilidad",
      desc: "Despliegues en servidores optimizados con monitoreo de incidentes y certificados SSL administrados.",
      icon: <Cloud className="w-5 h-5 text-[#1688F5]" />,
      stats: "Uptime 24/7",
    },
  ];

  return (
    <div
      ref={rootRef}
      onMouseLeave={() => setPaused(false)}
      className="tech-card-dark border-glow-top rounded-3xl p-6 sm:p-10 relative overflow-hidden"
    >
      {/* Background SVG Motion Graphic Circuits */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none opacity-40"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="cyanBlueGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#1479D4" stopOpacity="0.2" />
            <stop offset="50%" stopColor="#19C6E6" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#1688F5" stopOpacity="0.2" />
          </linearGradient>
        </defs>

        {/* Animated circuit lines */}
        <path
          d="M 50 120 L 250 120 Q 300 120 300 170 L 300 240 L 700 240 Q 750 240 750 190 L 750 120 L 1000 120"
          fill="none"
          stroke="url(#cyanBlueGrad)"
          strokeWidth="2"
          className="animate-circuit-flow"
        />
        <path
          d="M 100 280 L 450 280 Q 500 280 500 220 L 500 160 L 950 160"
          fill="none"
          stroke="#1479D4"
          strokeWidth="1.5"
          strokeOpacity="0.45"
          className="animate-circuit-flow"
          style={{ animationDuration: "5s", animationDirection: "reverse" }}
        />
      </svg>

      {/* Header of the motion panel */}
      <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-8 border-b border-white/10">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-mono text-[#19C6E6] mb-1">
            <Activity className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
            <span>ARQUITECTURA DE SOFTWARE EN TIEMPO REAL</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold text-white">
            Ecosistema Tecnológico de Proscom
          </h3>
          <p className="text-xs sm:text-sm text-slate-300">
            Pasa el cursor o presiona cada nodo para ver cómo fluyen los datos en nuestras soluciones.
          </p>
        </div>

        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-xs font-mono text-slate-300">
          <Zap className="w-3.5 h-3.5 text-emerald-400" />
          <span>Pipeline Activo</span>
        </div>
      </div>

      {/* 4 Interactive Nodes Grid */}
      <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-8">
        {/* Bus de datos con paquetes viajando entre nodos (escritorio) */}
        <div
          aria-hidden="true"
          className="hidden lg:block absolute left-[6%] right-[6%] top-[calc(2rem+42px)] h-px bg-gradient-to-r from-transparent via-[#19C6E6]/40 to-transparent"
        >
          <span className="data-packet" />
          <span className="data-packet" style={{ animationDelay: "-0.9s" }} />
          <span className="data-packet" style={{ animationDelay: "-1.8s" }} />
        </div>
        {/* Bus vertical (móvil) */}
        <div
          aria-hidden="true"
          className="lg:hidden sm:hidden absolute top-8 bottom-0 left-[46px] w-px bg-gradient-to-b from-transparent via-[#19C6E6]/40 to-transparent"
        >
          <span className="data-packet-y" />
          <span className="data-packet-y" style={{ animationDelay: "-1.4s" }} />
        </div>
        {nodes.map((node) => {
          const isSelected = activeNode === node.id;
          return (
            <button
              key={node.id}
              type="button"
              onClick={() => {
                setActiveNode(node.id);
                setPaused(true);
              }}
              onMouseEnter={() => {
                setActiveNode(node.id);
                setPaused(true);
              }}
              aria-pressed={isSelected}
              className={`p-5 rounded-2xl text-left transition-all duration-300 relative overflow-hidden group cursor-pointer focus-visible:outline-2 focus-visible:outline-[#19C6E6] ${
                isSelected
                  ? "bg-[#0C284E] border border-[#19C6E6] shadow-xl shadow-[#19C6E6]/10 -translate-y-1"
                  : "bg-white/[0.03] border border-white/10 hover:bg-white/[0.07] hover:border-white/20"
              }`}
            >
              {/* Radar ring indicator when selected */}
              {isSelected && (
                <span className="absolute -top-12 -right-12 w-28 h-28 bg-[#19C6E6]/15 rounded-full blur-xl pointer-events-none" />
              )}

              {/* Barra de progreso del ciclo automático */}
              <span className="absolute left-0 bottom-0 h-[2px] w-full bg-white/5">
                {isSelected && (
                  <span
                    key={`${activeNode}-${paused}`}
                    className="block h-full bg-gradient-to-r from-[#1479D4] to-[#19C6E6] origin-left"
                    style={{
                      animation: paused || !inView ? "none" : `fill-x ${CYCLE_MS}ms linear both`,
                    }}
                  />
                )}
              </span>

              <div className="flex items-center justify-between mb-4">
                <div
                  className={`relative w-11 h-11 rounded-xl flex items-center justify-center border transition-all duration-500 ${
                    isSelected
                      ? "bg-[#1479D4] border-[#19C6E6] text-white shadow-md shadow-[#1479D4]/40 [&>svg]:!text-white"
                      : "bg-white/5 border-white/10 text-slate-300"
                  }`}
                >
                  {isSelected && (
                    <span className="absolute inset-0 rounded-xl border border-[#19C6E6] animate-ping-soft" />
                  )}
                  {node.icon}
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/10 text-[#19C6E6] border border-white/10">
                  {node.stats}
                </span>
              </div>

              <h4 className="text-base font-bold text-white group-hover:text-[#19C6E6] transition-colors">
                {node.title}
              </h4>
              <p className="text-xs font-semibold text-[#1479D4] mt-0.5 mb-2">
                {node.subtitle}
              </p>
              <p className="text-xs text-slate-300 leading-relaxed">
                {node.desc}
              </p>
            </button>
          );
        })}
      </div>

      {/* Live Data Stream Status Footer */}
      <div className="relative z-10 mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-400">
        <div className="flex items-center gap-3">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          <span>FLUJO ENCRIPTADO // TLS 1.3 • PROTOCOLO SEGURO PROSCOM</span>
        </div>
        <div className="flex items-center gap-4 text-slate-300">
          <span>PostgreSQL</span>
          <span>•</span>
          <span>Next.js 16</span>
          <span>•</span>
          <span>APIs REST</span>
          <span>•</span>
          <span>Docker</span>
        </div>
      </div>
    </div>
  );
};
