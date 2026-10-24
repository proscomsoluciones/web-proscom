"use client";

/**
 * Motor 3D liviano (solo CSS 3D, sin librerías) para los laboratorios educativos.
 *
 * - <Stage3D>      Escenario isométrico que se inclina con el cursor y se escala al ancho disponible.
 * - <Box3D>        Caja 3D real (5 caras) apoyada en el piso.
 * - <Billboard>    Elemento que siempre mira a la cámara (etiquetas, pantallas, íconos).
 * - <FloorLinks>   Conexiones dibujadas sobre el piso.
 * - <Packet3D>     Paquete de datos que viaja en arco entre dos puntos.
 *
 * Coordenadas: el piso mide PLANE_W × PLANE_H px; x hacia la derecha, y hacia "abajo", z hacia arriba.
 */

import React, { useEffect, useRef, useState } from "react";

export const PLANE_W = 820;
export const PLANE_H = 480;
const VIEW_W = 940; // ancho aproximado del escenario proyectado
const VIEW_H = 640;

export type Point = { x: number; y: number };

/* -------------------------------------------------------------------------- */
/*  Escenario                                                                  */
/* -------------------------------------------------------------------------- */
interface Stage3DProps {
  children: React.ReactNode;
  className?: string;
  /** Inclinación base del piso (grados) */
  tiltX?: number;
  /** Giro base del piso (grados) */
  tiltZ?: number;
  /** Desactiva la inclinación con el cursor */
  staticView?: boolean;
  /** Etiqueta accesible del escenario */
  label: string;
  /** Acerca la cámara (1 = normal). Útil cuando la escena usa solo el centro del piso. */
  zoom?: number;
}

export const Stage3D: React.FC<Stage3DProps> = ({
  children,
  className = "",
  tiltX = 56,
  tiltZ = -38,
  staticView = false,
  label,
  zoom = 1,
}) => {
  const rootRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const [fill, setFill] = useState(false);

  // Escala el mundo para que quepa en el contenedor.
  // Dentro de un laboratorio (.lab-frame) en escritorio, la escena llena el alto disponible
  // para que todo el laboratorio se vea sin hacer scroll.
  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const mq = window.matchMedia("(min-width: 1024px)");
    const inFrame = !!el.closest(".lab-frame");
    const measure = () => {
      const fillMode = inFrame && mq.matches;
      const w = el.clientWidth;
      const h = el.clientHeight;
      // Fuera del modo "llenar", la escena nunca supera el 80% del alto de la pantalla
      // (importante en celulares en horizontal).
      const s =
        fillMode && h > 0
          ? Math.min(w / VIEW_W, h / VIEW_H)
          : Math.min(w / VIEW_W, (window.innerHeight * 0.8) / (VIEW_H * (zoom > 1 ? 1 + (zoom - 1) * 0.6 : 1)));
      setFill(fillMode);
      setScale(Math.min(Math.max(s, 0.36), 1.3));
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    mq.addEventListener("change", measure);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      mq.removeEventListener("change", measure);
      window.removeEventListener("resize", measure);
    };
  }, [zoom]);

  // Inclinación según la posición del cursor
  useEffect(() => {
    const el = rootRef.current;
    if (!el || staticView) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (window.matchMedia("(hover: none)").matches) return;
    let frame = 0;
    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        el.style.setProperty("--ax", `${tiltX - py * 8}deg`);
        el.style.setProperty("--az", `${tiltZ + px * 12}deg`);
      });
    };
    const onLeave = () => {
      el.style.setProperty("--ax", `${tiltX}deg`);
      el.style.setProperty("--az", `${tiltZ}deg`);
    };
    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
      cancelAnimationFrame(frame);
    };
  }, [tiltX, tiltZ, staticView]);

  return (
    <div
      ref={rootRef}
      role="img"
      aria-label={label}
      className={`stage3d relative w-full overflow-hidden select-none ${className}`}
      style={
        {
          "--ax": `${tiltX}deg`,
          "--az": `${tiltZ}deg`,
          // con zoom, la escena gana algo de alto para que el contenido acercado respire
          height: fill ? "100%" : VIEW_H * scale * (zoom > 1 ? 1 + (zoom - 1) * 0.6 : 1),
        } as React.CSSProperties
      }
    >
      <div
        className="absolute left-1/2 top-1/2"
        style={{
          width: PLANE_W,
          height: PLANE_H,
          marginLeft: -PLANE_W / 2,
          marginTop: -PLANE_H / 2 + 60,
          transform: `scale(${scale * zoom})`,
          transformStyle: "preserve-3d",
          perspective: 2200,
        }}
      >
        <div
          className="stage3d-plane absolute inset-0"
          style={{
            transformStyle: "preserve-3d",
            transform: "rotateX(var(--ax)) rotateZ(var(--az))",
            transition: "transform 0.45s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          {/* Piso */}
          <div className="absolute inset-0 rounded-[28px] bg-[#0A1E3B] border border-[#19C6E6]/25 shadow-[0_0_80px_rgba(25,198,230,0.15)_inset]">
            <div className="absolute inset-0 rounded-[28px] bg-grid-pattern-dark opacity-70" />
            <div className="absolute inset-0 rounded-[28px] bg-[radial-gradient(ellipse_at_center,rgba(25,198,230,0.12),transparent_70%)]" />
          </div>
          {children}
        </div>
      </div>
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/*  Caja 3D                                                                    */
/* -------------------------------------------------------------------------- */
interface Box3DProps {
  x: number;
  y: number;
  w: number;
  d: number;
  h: number;
  /** Colores: superior, frente (sur) y lado (este) */
  top?: string;
  front?: string;
  side?: string;
  /** Elevación sobre el piso (para apilar) */
  z?: number;
  glow?: boolean;
  dim?: boolean;
  /** Contenido sobre la cara frontal (ej: luces de un servidor) */
  frontContent?: React.ReactNode;
  topContent?: React.ReactNode;
  className?: string;
}

export const Box3D: React.FC<Box3DProps> = ({
  x,
  y,
  w,
  d,
  h,
  top = "#1E4F8A",
  front = "#123766",
  side = "#0C2850",
  z = 0,
  glow = false,
  dim = false,
  frontContent,
  topContent,
  className = "",
}) => {
  // Nota: no usar `filter` aquí; aplana el 3D. El brillo se logra con box-shadow.
  // `opacity` en el contenedor también aplanaría el 3D: se aplica a cada cara.
  const face = `absolute border transition-[top,left,width,height,transform,opacity] duration-700 ease-out ${glow ? "border-white/60 shadow-[0_0_22px_rgba(25,198,230,0.75)]" : "border-white/10"} ${dim ? "opacity-30" : ""}`;
  return (
    <div
      className={`absolute ${className}`}
      style={{
        left: x - w / 2,
        top: y - d / 2,
        width: w,
        height: d,
        transformStyle: "preserve-3d",
        transform: z ? `translateZ(${z}px)` : undefined,
      }}
    >
      {/* sombra */}
      {z === 0 && <div
        className="absolute -inset-3 rounded-2xl bg-black/50 blur-md"
        style={{ transform: "translateZ(0.5px)" }}
      />}
      {/* norte */}
      <div className={face} style={{ left: 0, top: -h, width: w, height: h, background: side, transformOrigin: "bottom", transform: "rotateX(-90deg)" }} />
      {/* oeste */}
      <div className={face} style={{ left: -h, top: 0, width: h, height: d, background: front, transformOrigin: "right", transform: "rotateY(90deg)" }} />
      {/* sur (frente) */}
      <div
        className={`${face} overflow-hidden`}
        style={{ left: 0, top: d - h, width: w, height: h, background: front, transformOrigin: "bottom", transform: "rotateX(-90deg)" }}
      >
        {frontContent}
      </div>
      {/* este (lado) */}
      <div
        className={`${face} overflow-hidden`}
        style={{ left: w - h, top: 0, width: h, height: d, background: side, transformOrigin: "right", transform: "rotateY(90deg)" }}
      />
      {/* superior */}
      <div
        className={`${face} overflow-hidden`}
        style={{ inset: 0, background: top, transform: `translateZ(${h}px)` }}
      >
        {topContent}
      </div>
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/*  Elemento que mira a la cámara                                             */
/* -------------------------------------------------------------------------- */
interface BillboardProps {
  x: number;
  y: number;
  /** Altura sobre el piso */
  z?: number;
  children: React.ReactNode;
  className?: string;
}

export const Billboard: React.FC<BillboardProps> = ({ x, y, z = 0, children, className = "" }) => (
  <div
    className="absolute w-0 h-0"
    style={{
      left: x,
      top: y,
      transformStyle: "preserve-3d",
      transform: `translateZ(${z}px) rotateZ(calc(var(--az) * -1)) rotateX(calc(var(--ax) * -1))`,
      transition: "transform 0.45s cubic-bezier(0.16, 1, 0.3, 1)",
    }}
  >
    <div className={`absolute bottom-0 left-0 -translate-x-1/2 ${className}`}>{children}</div>
  </div>
);

/* -------------------------------------------------------------------------- */
/*  Conexiones sobre el piso                                                   */
/* -------------------------------------------------------------------------- */
export interface Link3D {
  from: Point;
  to: Point;
  active?: boolean;
  color?: string;
  /** Curvatura (0 = recta) */
  bend?: number;
}

const linkPath = ({ from, to, bend = 0 }: Link3D) => {
  const mx = (from.x + to.x) / 2;
  const my = (from.y + to.y) / 2;
  const dx = to.x - from.x;
  const dy = to.y - from.y;
  const cx = mx - dy * bend;
  const cy = my + dx * bend;
  return `M ${from.x} ${from.y} Q ${cx} ${cy} ${to.x} ${to.y}`;
};

export const FloorLinks: React.FC<{ links: Link3D[] }> = ({ links }) => (
  <svg
    className="absolute inset-0 pointer-events-none overflow-visible"
    width={PLANE_W}
    height={PLANE_H}
    style={{ transform: "translateZ(1px)" }}
  >
    {links.map((l, i) => {
      const d = linkPath(l);
      const color = l.color ?? "#19C6E6";
      return (
        <g key={i}>
          <path d={d} fill="none" stroke={color} strokeOpacity={l.active ? 0.35 : 0.15} strokeWidth={l.active ? 10 : 6} strokeLinecap="round" />
          <path
            d={d}
            fill="none"
            stroke={color}
            strokeOpacity={l.active ? 1 : 0.45}
            strokeWidth={2.5}
            strokeDasharray="10 12"
            strokeLinecap="round"
            className={l.active ? "animate-circuit-flow" : undefined}
            style={l.active ? { animationDuration: "1.2s" } : undefined}
          />
        </g>
      );
    })}
  </svg>
);

/* -------------------------------------------------------------------------- */
/*  Paquete de datos viajando                                                  */
/* -------------------------------------------------------------------------- */
interface Packet3DProps {
  from: Point;
  to: Point;
  duration: number;
  label?: string;
  color?: string;
  /** Contenido de la etiqueta (reemplaza a label) */
  chip?: React.ReactNode;
  loop?: boolean;
  delay?: number;
}

export const Packet3D: React.FC<Packet3DProps> = ({
  from,
  to,
  duration,
  label,
  color = "#19C6E6",
  chip,
  loop = false,
  delay = 0,
}) => (
  <div
    className="packet3d absolute left-0 top-0 w-0 h-0"
    style={
      {
        "--x0": `${from.x}px`,
        "--y0": `${from.y}px`,
        "--x1": `${to.x}px`,
        "--y1": `${to.y}px`,
        animationDuration: `${duration}ms`,
        animationDelay: `${delay}ms`,
        animationIterationCount: loop ? "infinite" : 1,
        transformStyle: "preserve-3d",
      } as React.CSSProperties
    }
  >
    <div
      className="packet3d-hop absolute w-0 h-0"
      style={{
        animationDuration: `${duration}ms`,
        animationDelay: `${delay}ms`,
        animationIterationCount: loop ? "infinite" : 1,
        transformStyle: "preserve-3d",
      }}
    >
      <Box3D x={0} y={0} w={22} d={22} h={22} top="#ffffff" front={color} side={color} glow />
      {(label || chip) && (
        <Billboard x={0} y={0} z={58}>
          {chip ?? (
            <span
              className="block whitespace-nowrap rounded-md px-2 py-1 text-[13px] font-mono font-bold text-[#040F22] shadow-lg"
              style={{ background: color, boxShadow: `0 0 18px ${color}` }}
            >
              {label}
            </span>
          )}
        </Billboard>
      )}
    </div>
  </div>
);

/* -------------------------------------------------------------------------- */
/*  Etiqueta de nodo                                                            */
/* -------------------------------------------------------------------------- */
interface NodeLabelProps {
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
  active?: boolean;
  tone?: "default" | "ok" | "error" | "warn";
}

export const NodeLabel: React.FC<NodeLabelProps> = ({ title, subtitle, icon, active, tone = "default" }) => {
  const ring = {
    default: active ? "border-[#19C6E6] shadow-[0_0_24px_rgba(25,198,230,0.6)]" : "border-white/15",
    ok: "border-emerald-400 shadow-[0_0_24px_rgba(52,211,153,0.6)]",
    error: "border-rose-400 shadow-[0_0_24px_rgba(251,113,133,0.6)]",
    warn: "border-amber-400 shadow-[0_0_24px_rgba(251,191,36,0.6)]",
  }[tone];
  return (
    <div
      className={`flex items-center gap-2 whitespace-nowrap rounded-xl bg-[#071A35]/95 border px-3 py-2 transition-all duration-500 ${ring} ${
        active ? "scale-110" : ""
      }`}
    >
      {icon && <span className="text-[#19C6E6] [&>svg]:w-5 [&>svg]:h-5">{icon}</span>}
      <span className="leading-tight">
        <span className="block text-[15px] font-bold text-white">{title}</span>
        {subtitle && <span className="block text-[11px] font-mono text-slate-400">{subtitle}</span>}
      </span>
    </div>
  );
};
