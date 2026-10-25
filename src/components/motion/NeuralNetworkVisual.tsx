"use client";

import React, { useEffect, useRef } from "react";

interface NeuralNetworkVisualProps {
  className?: string;
}

type Node3D = { x: number; y: number; z: number };
type Pulse = { from: number; to: number; layerPair: number; t: number; speed: number };

const LAYER_SIZES = [4, 6, 6, 3];
const LAYER_SPACING = 150;
const NODE_SPACING = 46;
const COLORS = {
  line: "25, 198, 230",
  lineAlt: "20, 121, 212",
  node: "25, 198, 230",
  nodeAlt: "20, 121, 212",
  pulse: "255, 255, 255",
};

/**
 * Red neuronal animada en 3D (proyección con perspectiva, sin dependencias
 * externas): capas de nodos conectadas que rotan suavemente en el espacio,
 * con "pulsos" de señal viajando entre capas. Reemplaza una fotografía
 * estática por una pieza visual que representa tecnología/IA.
 */
export const NeuralNetworkVisual: React.FC<NeuralNetworkVisualProps> = ({
  className = "",
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let width = 0;
    let height = 0;
    let raf = 0;
    let running = false;
    let angle = 0.4;

    // Construye los nodos en el espacio 3D, centrados en (0,0,0).
    const nodes: Node3D[] = [];
    const layerStartIndex: number[] = [];
    const totalDepth = (LAYER_SIZES.length - 1) * LAYER_SPACING;
    LAYER_SIZES.forEach((count, layerIdx) => {
      layerStartIndex.push(nodes.length);
      const z = layerIdx * LAYER_SPACING - totalDepth / 2;
      const layerHeight = (count - 1) * NODE_SPACING;
      for (let i = 0; i < count; i++) {
        nodes.push({
          x: 0,
          y: i * NODE_SPACING - layerHeight / 2,
          z,
        });
      }
    });

    // Conexiones: cada nodo de una capa con cada nodo de la siguiente.
    const links: [number, number][] = [];
    for (let l = 0; l < LAYER_SIZES.length - 1; l++) {
      const a0 = layerStartIndex[l];
      const b0 = layerStartIndex[l + 1];
      for (let i = 0; i < LAYER_SIZES[l]; i++) {
        for (let j = 0; j < LAYER_SIZES[l + 1]; j++) {
          links.push([a0 + i, b0 + j]);
        }
      }
    }

    // Pulsos de "señal" viajando entre capas consecutivas.
    const pulses: Pulse[] = Array.from({ length: 7 }, () => makePulse());
    function makePulse(): Pulse {
      const layerPair = Math.floor(Math.random() * (LAYER_SIZES.length - 1));
      const a0 = layerStartIndex[layerPair];
      const b0 = layerStartIndex[layerPair + 1];
      return {
        from: a0 + Math.floor(Math.random() * LAYER_SIZES[layerPair]),
        to: b0 + Math.floor(Math.random() * LAYER_SIZES[layerPair + 1]),
        layerPair,
        t: Math.random(),
        speed: 0.006 + Math.random() * 0.006,
      };
    }

    const resize = () => {
      // En móvil se limita la resolución para no saturar la memoria gráfica
      const dpr = Math.min(window.devicePixelRatio || 1, window.innerWidth < 768 ? 1.5 : 2);
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const focal = 420;
    const project = (n: Node3D) => {
      // Rotación alrededor del eje Y (profundidad <-> ancho).
      const cos = Math.cos(angle);
      const sin = Math.sin(angle);
      const x = n.x * cos - n.z * sin;
      const z = n.x * sin + n.z * cos;
      const scale = focal / (focal + z + totalDepth / 2);
      return {
        x: width / 2 + x * scale * 1.15,
        y: height / 2 + n.y * scale,
        scale,
      };
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      const projected = nodes.map(project);

      // Conexiones
      for (const [a, b] of links) {
        const pa = projected[a];
        const pb = projected[b];
        const depthAlpha = Math.min(pa.scale, pb.scale);
        const color = a % 2 === 0 ? COLORS.line : COLORS.lineAlt;
        ctx.strokeStyle = `rgba(${color}, ${(depthAlpha * 0.22).toFixed(3)})`;
        ctx.lineWidth = 0.7;
        ctx.beginPath();
        ctx.moveTo(pa.x, pa.y);
        ctx.lineTo(pb.x, pb.y);
        ctx.stroke();
      }

      // Pulsos de señal viajando sobre las conexiones
      for (const pulse of pulses) {
        pulse.t += pulse.speed;
        if (pulse.t >= 1) {
          Object.assign(pulse, makePulse());
          continue;
        }
        const pa = projected[pulse.from];
        const pb = projected[pulse.to];
        const x = pa.x + (pb.x - pa.x) * pulse.t;
        const y = pa.y + (pb.y - pa.y) * pulse.t;
        const scale = pa.scale + (pb.scale - pa.scale) * pulse.t;
        const r = 2.2 * scale;
        const glow = ctx.createRadialGradient(x, y, 0, x, y, r * 4);
        glow.addColorStop(0, `rgba(${COLORS.pulse}, ${0.9 * scale})`);
        glow.addColorStop(1, `rgba(${COLORS.pulse}, 0)`);
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(x, y, r * 4, 0, Math.PI * 2);
        ctx.fill();
      }

      // Nodos (ordenados por profundidad para un efecto 3D correcto)
      const order = projected
        .map((p, i) => ({ p, i }))
        .sort((a, b) => a.p.scale - b.p.scale);

      for (const { p, i } of order) {
        const r = 3.4 * p.scale;
        const color = i % 2 === 0 ? COLORS.node : COLORS.nodeAlt;
        const glow = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, r * 3.2);
        glow.addColorStop(0, `rgba(${color}, ${0.5 * p.scale})`);
        glow.addColorStop(1, `rgba(${color}, 0)`);
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(p.x, p.y, r * 3.2, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = `rgba(${color}, ${0.9 * p.scale + 0.1})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const loop = () => {
      angle += 0.0032;
      draw();
      raf = requestAnimationFrame(loop);
    };
    const start = () => {
      if (running || reduce) return;
      running = true;
      raf = requestAnimationFrame(loop);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };

    resize();
    draw();

    const io = new IntersectionObserver(([entry]) =>
      entry.isIntersecting && !document.hidden ? start() : stop()
    );
    io.observe(canvas);

    const onVisibility = () => (document.hidden ? stop() : start());
    const ro = new ResizeObserver(() => {
      resize();
      if (!running) draw();
    });
    ro.observe(canvas);

    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      stop();
      io.disconnect();
      ro.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <div
      className={`relative w-full h-full bg-[#071A35] overflow-hidden ${className}`}
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-grid-pattern-dark opacity-20 [mask-image:radial-gradient(ellipse_at_center,white,transparent_75%)]"
      />
      <div
        aria-hidden="true"
        className="absolute -top-10 -right-10 w-64 h-64 bg-[#1479D4]/25 rounded-full blur-[100px] animate-aurora"
      />
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="absolute inset-0 w-full h-full"
      />
    </div>
  );
};
