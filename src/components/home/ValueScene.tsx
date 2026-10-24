"use client";

/**
 * Escena 3D de la propuesta de valor:
 * una plataforma con los módulos del sistema de un cliente que recorre, en bucle,
 * los 4 pilares: a medida → análisis → escalable → comunicación directa.
 */
import React, { useEffect, useRef, useState } from "react";
import { ShoppingCart, Boxes, BarChart3, Users, Store, Search, MessageCircle, Puzzle, ScanSearch, Expand } from "lucide-react";
import { Stage3D, Box3D, Billboard, FloorLinks, Packet3D, NodeLabel, type Point } from "@/components/learn/stage3d";

const HUB: Point = { x: 410, y: 245 };
const MODULES = [
  { id: "ventas", p: { x: 270, y: 150 }, h: 90, label: "Ventas", icon: <ShoppingCart />, top: "#38BDF8", front: "#0369A1", side: "#075985" },
  { id: "inventario", p: { x: 560, y: 140 }, h: 70, label: "Inventario", icon: <Boxes />, top: "#2DD4BF", front: "#0F766E", side: "#115E59" },
  { id: "reportes", p: { x: 260, y: 350 }, h: 60, label: "Reportes", icon: <BarChart3 />, top: "#A78BFA", front: "#6D28D9", side: "#5B21B6" },
  { id: "usuarios", p: { x: 545, y: 345 }, h: 80, label: "Usuarios", icon: <Users />, top: "#60A5FA", front: "#1D4ED8", side: "#1E40AF" },
];
const NEW_MODULE = { p: { x: 700, y: 250 }, h: 70 };

const PHASES = [
  { title: "Desarrollo 100% personalizado", text: "Cada módulo se construye a la medida de tu operación.", icon: Puzzle },
  { title: "Análisis funcional exhaustivo", text: "Entendemos la lógica de tu negocio antes de programar.", icon: ScanSearch },
  { title: "Arquitectura escalable", text: "Agrega sucursales o módulos cuando lo necesites.", icon: Expand },
  { title: "Comunicación directa", text: "Hablas con quienes programan tu sistema.", icon: MessageCircle },
];
const PHASE_MS = 4200;

export const ValueScene: React.FC = () => {
  const [phase, setPhase] = useState(0);
  const [cycle, setCycle] = useState(0);
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.2 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!visible) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = window.setTimeout(() => {
      if (phase === PHASES.length - 1) setCycle((c) => c + 1);
      setPhase((phase + 1) % PHASES.length);
    }, PHASE_MS);
    return () => window.clearTimeout(t);
  }, [phase, visible]);

  const scaled = phase >= 2;
  const Current = PHASES[phase].icon;

  return (
    <div ref={ref} className="relative">
      <Stage3D zoom={1.45} label="Escena 3D: plataforma con los módulos de un sistema a medida (ventas, inventario, reportes y usuarios) conectados por una API, que crece con un nuevo módulo de sucursal">
        <FloorLinks
          links={[
            ...MODULES.map((m) => ({ from: HUB, to: m.p, active: true })),
            ...(scaled ? [{ from: HUB, to: NEW_MODULE.p, active: true, color: "#34d399" }] : []),
          ]}
        />

        {/* Plataforma base */}
        <Box3D x={HUB.x} y={HUB.y} w={600} d={360} h={10} top="#0F2A4D" front="#0A1E3B" side="#071A35" />

        {/* Núcleo (API) */}
        <Box3D x={HUB.x} y={HUB.y} w={70} d={70} h={46} z={10} top="#19C6E6" front="#0E7490" side="#155E75" glow />
        <Billboard x={HUB.x} y={HUB.y} z={70}>
          <span className="block whitespace-nowrap rounded-md bg-[#19C6E6] px-2 py-1 text-[12px] font-mono font-bold text-[#040F22] shadow-[0_0_16px_#19C6E6]">API</span>
        </Billboard>

        {/* Módulos (caen desde arriba al comienzo de cada ciclo) */}
        {MODULES.map((m, i) => (
          <div
            key={`${m.id}-${cycle}`}
            className="value-drop absolute inset-0"
            style={{ transformStyle: "preserve-3d", animationDelay: `${i * 180}ms` }}
          >
            <Box3D x={m.p.x} y={m.p.y} w={110} d={90} h={m.h} z={10} top={m.top} front={m.front} side={m.side} glow={phase === 0} />
            <Billboard x={m.p.x} y={m.p.y} z={m.h + 55}>
              <NodeLabel title={m.label} icon={m.icon} active={phase === 0} />
            </Billboard>
          </div>
        ))}

        {/* Fase 2: análisis — barra de escaneo que recorre la plataforma */}
        {phase === 1 && (
          <>
            <div
              key={`scan-${cycle}`}
              className="value-scan absolute rounded-full"
              style={{ left: 120, top: 60, width: 14, height: 370, transformStyle: "preserve-3d" }}
            />
            <Billboard x={HUB.x} y={HUB.y + 40} z={150}>
              <span className="anim-pop inline-flex items-center gap-1.5 rounded-full bg-white text-[#071A35] text-[13px] font-bold px-3 py-1.5 shadow-xl">
                <Search className="w-4 h-4 text-[#1479D4]" /> Analizando procesos…
              </span>
            </Billboard>
          </>
        )}

        {/* Fase 3: escalable — aparece un módulo nuevo */}
        {scaled && (
          <div key={`new-${cycle}`} className="value-drop absolute inset-0" style={{ transformStyle: "preserve-3d" }}>
            <Box3D x={NEW_MODULE.p.x} y={NEW_MODULE.p.y} w={90} d={90} h={NEW_MODULE.h} z={10} top="#34D399" front="#047857" side="#065F46" glow={phase === 2} />
            <Billboard x={NEW_MODULE.p.x} y={NEW_MODULE.p.y} z={NEW_MODULE.h + 55}>
              <NodeLabel title="Nueva sucursal" icon={<Store />} active={phase === 2} tone={phase === 2 ? "ok" : undefined} />
            </Billboard>
          </div>
        )}

        {/* Fase 4: comunicación directa — globos de conversación */}
        {phase === 3 && (
          <>
            <Billboard x={240} y={250} z={190}>
              <span className="anim-pop block whitespace-nowrap rounded-2xl rounded-bl-sm bg-white text-[#071A35] text-[13px] font-semibold px-3 py-2 shadow-xl">
                ¿Podemos agregar boletas? 🙋
              </span>
            </Billboard>
            <Billboard x={580} y={240} z={220}>
              <span className="anim-pop block whitespace-nowrap rounded-2xl rounded-br-sm bg-[#1479D4] text-white text-[13px] font-semibold px-3 py-2 shadow-xl" style={{ animationDelay: "700ms" }}>
                ¡Sí! Lo vemos hoy mismo 👍
              </span>
            </Billboard>
          </>
        )}

        {/* Datos fluyendo */}
        {MODULES.map((m, i) => (
          <Packet3D key={`pk-${m.id}`} from={HUB} to={m.p} duration={1800} delay={i * 450} loop />
        ))}
        {scaled && <Packet3D key={`pk-new-${cycle}`} from={HUB} to={NEW_MODULE.p} duration={1800} loop color="#34d399" />}
      </Stage3D>

      {/* Leyenda de la fase */}
      <div className="absolute left-3 right-3 sm:left-4 sm:right-auto bottom-3 sm:bottom-4 sm:max-w-[320px]" aria-live="polite">
        <div key={phase} className="anim-rise flex items-start gap-2.5 rounded-xl bg-[#040F22]/85 border border-white/10 backdrop-blur-md px-3 py-2.5">
          <span className="grid place-items-center w-8 h-8 rounded-lg bg-gradient-to-br from-[#1479D4] to-[#19C6E6] shrink-0">
            <Current className="w-4 h-4 text-white" />
          </span>
          <span className="min-w-0">
            <span className="block text-[12px] font-bold text-white leading-tight">{PHASES[phase].title}</span>
            <span className="block text-[11px] text-slate-400 leading-snug mt-0.5">{PHASES[phase].text}</span>
          </span>
        </div>
      </div>

      {/* Indicadores de fase */}
      <div className="absolute top-3 right-4 flex gap-1.5">
        {PHASES.map((p, i) => (
          <button
            key={p.title}
            type="button"
            aria-label={p.title}
            onClick={() => setPhase(i)}
            className={`h-1.5 rounded-full transition-all duration-500 ${i === phase ? "w-8 bg-[#19C6E6]" : "w-3 bg-white/25 hover:bg-white/40"}`}
          />
        ))}
      </div>
    </div>
  );
};
