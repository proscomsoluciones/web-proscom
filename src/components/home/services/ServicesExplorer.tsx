"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  Code2,
  Globe,
  Smartphone,
  LayoutDashboard,
  Network,
  Headphones,
  ShoppingCart,
  CreditCard,
  ArrowRight,
  CheckCircle2,
  MessageCircle,
} from "lucide-react";
import { ServiceScene } from "./ServiceScenes";

export interface ExplorerService {
  slug: string;
  title: string;
  shortDescription: string;
  iconName: string;
  techTag: string;
  highlights: string[];
}

const ICONS: Record<string, React.ElementType> = {
  Code2,
  Globe,
  ShoppingCart,
  CreditCard,
  Smartphone,
  LayoutDashboard,
  Network,
  Headphones,
};

const CYCLE_MS = 6500;

export const ServicesExplorer: React.FC<{ services: ExplorerService[] }> = ({ services }) => {
  const [active, setActive] = useState(0);
  const [hovering, setHovering] = useState(false);
  const [inView, setInView] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const listRef = useRef<HTMLDivElement>(null);

  const running = !hovering && inView;

  // Solo avanza cuando la sección está visible
  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.3 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Recorrido automático por los servicios
  useEffect(() => {
    if (!running) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = window.setTimeout(() => setActive((a) => (a + 1) % services.length), CYCLE_MS);
    return () => window.clearTimeout(id);
  }, [active, running, services.length]);

  // En móvil la lista es una fila deslizable: se centra la pestaña activa
  useEffect(() => {
    const list = listRef.current;
    const tab = tabRefs.current[active];
    if (!list || !tab || list.scrollWidth <= list.clientWidth) return;
    list.scrollTo({
      left: tab.offsetLeft - (list.clientWidth - tab.offsetWidth) / 2,
      behavior: "smooth",
    });
  }, [active]);

  const select = useCallback((i: number, focus = false) => {
    setActive(i);
    if (focus) tabRefs.current[i]?.focus();
  }, []);

  // Navegación con teclado (flechas, Inicio, Fin)
  const onKeyDown = (e: React.KeyboardEvent) => {
    const n = services.length;
    const map: Record<string, number> = {
      ArrowDown: (active + 1) % n,
      ArrowRight: (active + 1) % n,
      ArrowUp: (active - 1 + n) % n,
      ArrowLeft: (active - 1 + n) % n,
      Home: 0,
      End: n - 1,
    };
    if (e.key in map) {
      e.preventDefault();
      select(map[e.key], true);
    }
  };

  return (
    <div
      ref={rootRef}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch"
    >
      {/* ------------------------- Lista de servicios ------------------------- */}
      <div
        ref={listRef}
        role="tablist"
        aria-label="Servicios de Proscom"
        aria-orientation="vertical"
        onKeyDown={onKeyDown}
        className="relative lg:col-span-5 flex md:grid md:grid-cols-3 lg:flex lg:flex-col lg:justify-center gap-2.5 overflow-x-auto md:overflow-visible -mx-4 px-4 md:mx-0 md:px-0 pb-2 md:pb-0 snap-x [scrollbar-width:none]"
      >
        {services.map((s, i) => {
          const Icon = ICONS[s.iconName] ?? Code2;
          const isActive = i === active;
          return (
            <button
              key={s.slug}
              ref={(el) => {
                tabRefs.current[i] = el;
              }}
              id={`svc-tab-${s.slug}`}
              role="tab"
              type="button"
              aria-selected={isActive}
              aria-controls={`svc-panel-${s.slug}`}
              tabIndex={isActive ? 0 : -1}
              onClick={() => select(i)}
              className={`group relative shrink-0 snap-start w-[230px] md:w-auto lg:w-full text-left rounded-2xl border px-4 py-3.5 lg:py-4 overflow-hidden transition-all duration-300 ${
                isActive
                  ? "bg-white border-[#1479D4]/40 shadow-xl shadow-[#1479D4]/10 lg:translate-x-2"
                  : "bg-white/60 border-slate-200 hover:bg-white hover:border-slate-300"
              }`}
            >
              {/* Acento lateral */}
              <span
                className={`absolute left-0 top-3 bottom-3 w-[3px] rounded-r-full bg-gradient-to-b from-[#1479D4] to-[#19C6E6] transition-opacity duration-300 ${
                  isActive ? "opacity-100" : "opacity-0"
                }`}
              />
              <div className="flex items-center gap-3.5">
                <span
                  className={`relative w-11 h-11 rounded-xl flex items-center justify-center shrink-0 border transition-all duration-300 ${
                    isActive
                      ? "bg-gradient-to-br from-[#1479D4] to-[#19C6E6] border-transparent shadow-lg shadow-[#1479D4]/30"
                      : "bg-[#1479D4]/8 border-[#1479D4]/15 group-hover:border-[#1479D4]/40"
                  }`}
                >
                  <Icon className={`w-5 h-5 transition-colors ${isActive ? "text-white" : "text-[#1479D4]"}`} />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="flex items-baseline gap-2">
                    <span className={`font-mono text-[10px] font-bold ${isActive ? "text-[#19C6E6]" : "text-slate-400"}`}>
                      0{i + 1}
                    </span>
                    <span className={`text-sm sm:text-[15px] font-bold truncate ${isActive ? "text-[#071A35]" : "text-slate-700"}`}>
                      {s.title}
                    </span>
                  </span>
                  <span className="block text-[11px] font-mono text-slate-500 truncate mt-0.5">{s.techTag}</span>
                </span>
                <ArrowRight
                  className={`hidden lg:block w-4 h-4 shrink-0 transition-all duration-300 ${
                    isActive ? "text-[#1479D4] translate-x-0 opacity-100" : "text-slate-300 -translate-x-1 opacity-0 group-hover:opacity-100"
                  }`}
                />
              </div>

              {/* Progreso del recorrido automático */}
              <span className="absolute left-0 right-0 bottom-0 h-[2px] bg-transparent">
                {isActive && (
                  <span
                    key={`${active}-${running}`}
                    className="block h-full origin-left bg-gradient-to-r from-[#1479D4] to-[#19C6E6]"
                    style={{ animation: running ? `fill-x ${CYCLE_MS}ms linear both` : "none", transform: running ? undefined : "scaleX(0)" }}
                  />
                )}
              </span>
            </button>
          );
        })}
      </div>

      {/* ---------------------------- Panel activo ---------------------------- */}
      <div className="lg:col-span-7 relative">
        {/* Halo */}
        <div aria-hidden="true" className="absolute -inset-4 bg-gradient-to-br from-[#1479D4]/20 via-[#19C6E6]/10 to-transparent rounded-[2rem] blur-2xl" />

        <div className="relative h-full rounded-3xl bg-gradient-to-b from-[#0A1E3B] to-[#071A35] border border-white/10 shadow-2xl shadow-[#071A35]/30 overflow-hidden border-beam">
          {/* Barra tipo ventana */}
          <div className="flex items-center gap-1.5 px-5 py-3 border-b border-white/10 bg-white/[0.03]">
            <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#FEBC2E]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#28C840]" />
            <span className="ml-3 text-[11px] font-mono text-slate-400 truncate">
              proscom://servicios/<span className="text-[#19C6E6]">{services[active].slug}</span>
            </span>
            <span className="ml-auto hidden sm:flex items-center gap-1.5 text-[10px] font-mono text-emerald-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              EN VIVO
            </span>
          </div>

          {services.map((s, i) => {
            const isActive = i === active;
            return (
              <div
                key={s.slug}
                id={`svc-panel-${s.slug}`}
                role="tabpanel"
                aria-labelledby={`svc-tab-${s.slug}`}
                hidden={!isActive}
                className="p-5 sm:p-7"
              >
                {isActive && (
                  <div key={`scene-${active}`}>
                    {/* Escena animada */}
                    <div
                      aria-hidden="true"
                      className="relative h-[220px] sm:h-[240px] rounded-2xl bg-[#040F22]/60 border border-white/5 p-4 bg-dots-pattern-dark overflow-hidden"
                    >
                      <ServiceScene slug={s.slug} index={i} />
                    </div>
                  </div>
                )}

                {/* Texto (siempre presente en el HTML para SEO) */}
                <div key={`text-${isActive ? active : "idle"}`} className="mt-6">
                  <h3 className="anim-rise text-2xl font-extrabold text-white" style={{ "--d": "80ms" } as React.CSSProperties}>
                    {s.title}
                  </h3>
                  <p className="anim-rise text-sm text-slate-300 leading-relaxed mt-2" style={{ "--d": "160ms" } as React.CSSProperties}>
                    {s.shortDescription}
                  </p>

                  <ul className="grid sm:grid-cols-2 gap-x-5 gap-y-2.5 mt-5">
                    {s.highlights.map((h, j) => (
                      <li
                        key={j}
                        className="anim-rise flex items-start gap-2 text-xs text-slate-200"
                        style={{ "--d": `${240 + j * 90}ms` } as React.CSSProperties}
                      >
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-px" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="anim-rise flex flex-col sm:flex-row gap-3 mt-7" style={{ "--d": "600ms" } as React.CSSProperties}>
                    <Link
                      href={`/servicios/${s.slug}`}
                      className="btn-shine inline-flex items-center justify-center gap-2 rounded-lg bg-[#1479D4] hover:bg-[#1688F5] text-white text-sm font-semibold px-5 py-2.5 transition-colors shadow-lg shadow-[#1479D4]/30"
                    >
                      Ver servicio completo
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                    <Link
                      href="/contacto"
                      className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/15 hover:border-[#19C6E6]/50 bg-white/5 hover:bg-white/10 text-white text-sm font-semibold px-5 py-2.5 transition-colors"
                    >
                      <MessageCircle className="w-4 h-4" />
                      Cotizar este servicio
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
