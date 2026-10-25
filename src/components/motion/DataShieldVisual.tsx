"use client";

import React, { useEffect, useRef } from "react";
import { ShieldCheck } from "lucide-react";

interface DataShieldVisualProps {
  className?: string;
}

type Vec3 = { x: number; y: number; z: number };

const PHI = (1 + Math.sqrt(5)) / 2;

// Vértices de un icosaedro regular (red geométrica que envuelve el "núcleo" de datos).
const ICOSA_VERTICES: Vec3[] = [
  { x: -1, y: PHI, z: 0 }, { x: 1, y: PHI, z: 0 }, { x: -1, y: -PHI, z: 0 }, { x: 1, y: -PHI, z: 0 },
  { x: 0, y: -1, z: PHI }, { x: 0, y: 1, z: PHI }, { x: 0, y: -1, z: -PHI }, { x: 0, y: 1, z: -PHI
  },
  { x: PHI, y: 0, z: -1 }, { x: PHI, y: 0, z: 1 }, { x: -PHI, y: 0, z: -1 }, { x: -PHI, y: 0, z: 1 },
];

const ICOSA_EDGES: [number, number][] = [
  [0, 1], [0, 5], [0, 7], [0, 10], [0, 11],
  [1, 5], [1, 7], [1, 8], [1, 9],
  [2, 3], [2, 4], [2, 6], [2, 10], [2, 11],
  [3, 4], [3, 6], [3, 8], [3, 9],
  [4, 5], [4, 9], [4, 11],
  [5, 9], [5, 11],
  [6, 7], [6, 8], [6, 10],
  [7, 8], [7, 10],
  [8, 9],
  [10, 11],
];

type DataPoint = { angle: number; radius: number; height: number; speed: number; t: number };

/**
 * Esfera geométrica 3D (icosaedro) que representa un "perímetro de protección",
 * con puntos de datos orbitando y siendo absorbidos hacia el núcleo central.
 * Sin dependencias externas (proyección con perspectiva hecha a mano).
 */
export const DataShieldVisual: React.FC<DataShieldVisualProps> = ({
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
    let angleY = 0.6;
    let angleX = 0.25;

    const dataPoints: DataPoint[] = Array.from({ length: 22 }, (_, i) => ({
      angle: (i / 22) * Math.PI * 2,
      radius: 150 + Math.random() * 30,
      height: (Math.random() - 0.5) * 160,
      speed: 0.004 + Math.random() * 0.006,
      t: Math.random(),
    }));

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

    const focal = 460;
    const sphereScale = 92;

    const rotate = (p: Vec3): Vec3 => {
      // Rotación Y
      let x = p.x * Math.cos(angleY) - p.z * Math.sin(angleY);
      let z = p.x * Math.sin(angleY) + p.z * Math.cos(angleY);
      const y0 = p.y;
      // Rotación X
      const y = y0 * Math.cos(angleX) - z * Math.sin(angleX);
      z = y0 * Math.sin(angleX) + z * Math.cos(angleX);
      x = x;
      return { x, y, z };
    };

    const project = (p: Vec3) => {
      const r = rotate(p);
      const scale = focal / (focal + r.z * sphereScale + 260);
      return {
        x: width / 2 + r.x * sphereScale * scale,
        y: height / 2 + r.y * sphereScale * scale,
        scale,
      };
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      // Núcleo: brillo central
      const coreGlow = ctx.createRadialGradient(
        width / 2, height / 2, 0,
        width / 2, height / 2, 70
      );
      coreGlow.addColorStop(0, "rgba(25, 198, 230, 0.35)");
      coreGlow.addColorStop(1, "rgba(25, 198, 230, 0)");
      ctx.fillStyle = coreGlow;
      ctx.beginPath();
      ctx.arc(width / 2, height / 2, 70, 0, Math.PI * 2);
      ctx.fill();

      // Icosaedro: aristas
      const projected = ICOSA_VERTICES.map(project);
      for (const [a, b] of ICOSA_EDGES) {
        const pa = projected[a];
        const pb = projected[b];
        const depthAlpha = (pa.scale + pb.scale) / 2;
        ctx.strokeStyle = `rgba(20, 121, 212, ${(depthAlpha * 0.5).toFixed(3)})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(pa.x, pa.y);
        ctx.lineTo(pb.x, pb.y);
        ctx.stroke();
      }
      // Icosaedro: vértices
      for (const p of projected) {
        ctx.fillStyle = `rgba(25, 198, 230, ${(0.6 * p.scale + 0.2).toFixed(3)})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 2.4 * p.scale, 0, Math.PI * 2);
        ctx.fill();
      }

      // Puntos de datos orbitando y siendo absorbidos hacia el núcleo
      for (const dp of dataPoints) {
        dp.t += dp.speed;
        if (dp.t >= 1) {
          dp.t = 0;
          dp.angle = Math.random() * Math.PI * 2;
          dp.radius = 150 + Math.random() * 30;
          dp.height = (Math.random() - 0.5) * 160;
        }
        const r = dp.radius * (1 - dp.t * 0.85);
        const theta = dp.angle + dp.t * 2.4;
        const p3: Vec3 = {
          x: (Math.cos(theta) * r) / sphereScale,
          y: (dp.height * (1 - dp.t * 0.6)) / sphereScale,
          z: (Math.sin(theta) * r) / sphereScale,
        };
        const p = project(p3);
        const alpha = (1 - dp.t) * p.scale;
        ctx.fillStyle = `rgba(255, 255, 255, ${Math.max(alpha, 0).toFixed(3)})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 1.8 * p.scale, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const loop = () => {
      angleY += 0.0028;
      angleX = 0.25 + Math.sin(angleY * 0.6) * 0.12;
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
      className={`relative w-full h-full bg-[#071A35] overflow-hidden flex items-center justify-center ${className}`}
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-grid-pattern-dark opacity-20 [mask-image:radial-gradient(ellipse_at_center,white,transparent_75%)]"
      />
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="absolute inset-0 w-full h-full"
      />
      <ShieldCheck
        aria-hidden="true"
        className="relative w-10 h-10 sm:w-12 sm:h-12 text-[#19C6E6] drop-shadow-[0_0_18px_rgba(25,198,230,0.7)]"
      />
    </div>
  );
};
