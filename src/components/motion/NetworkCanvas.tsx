"use client";

import React, { useEffect, useRef } from "react";

interface NetworkCanvasProps {
  className?: string;
  /** Partículas por cada 10.000 px² (densidad) */
  density?: number;
  /** Distancia máxima para dibujar una conexión */
  linkDistance?: number;
}

type Particle = { x: number; y: number; vx: number; vy: number; r: number; hue: 0 | 1 };

/**
 * Red de nodos y conexiones animada (motion graphic de fondo).
 * - Reacciona al cursor (los nodos cercanos se conectan con el puntero).
 * - Se pausa cuando no está en pantalla o la pestaña está oculta.
 * - Respeta prefers-reduced-motion (dibuja un solo cuadro estático).
 */
export const NetworkCanvas: React.FC<NetworkCanvasProps> = ({
  className = "",
  density = 0.55,
  linkDistance = 130,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const pointer = { x: -9999, y: -9999 };
    let particles: Particle[] = [];
    let width = 0;
    let height = 0;
    let raf = 0;
    let running = false;

    const colors = ["25, 198, 230", "22, 136, 245"]; // cyan, electric blue

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const isMobile = width < 640;
      const count = Math.min(
        Math.round(((width * height) / 10000) * density * (isMobile ? 0.55 : 1)),
        140
      );
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        r: Math.random() * 1.6 + 0.6,
        hue: Math.random() > 0.35 ? 0 : 1,
      }));
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        // Conexiones entre nodos
        for (let j = i + 1; j < particles.length; j++) {
          const q = particles[j];
          const dx = p.x - q.x;
          const dy = p.y - q.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < linkDistance) {
            const alpha = (1 - dist / linkDistance) * 0.22;
            ctx.strokeStyle = `rgba(${colors[p.hue]}, ${alpha})`;
            ctx.lineWidth = 0.7;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.stroke();
          }
        }

        // Conexión con el cursor
        const pdx = p.x - pointer.x;
        const pdy = p.y - pointer.y;
        const pdist = Math.sqrt(pdx * pdx + pdy * pdy);
        if (pdist < linkDistance * 1.5) {
          const alpha = (1 - pdist / (linkDistance * 1.5)) * 0.55;
          ctx.strokeStyle = `rgba(25, 198, 230, ${alpha})`;
          ctx.lineWidth = 0.9;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(pointer.x, pointer.y);
          ctx.stroke();
          // leve atracción
          p.x -= pdx * 0.004;
          p.y -= pdy * 0.004;
        }

        // Nodo
        ctx.fillStyle = `rgba(${colors[p.hue]}, 0.85)`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const loop = () => {
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
    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = e.clientX - rect.left;
      pointer.y = e.clientY - rect.top;
    };
    const onLeave = () => {
      pointer.x = -9999;
      pointer.y = -9999;
    };
    const ro = new ResizeObserver(() => {
      resize();
      if (!running) draw();
    });
    ro.observe(canvas);

    document.addEventListener("visibilitychange", onVisibility);
    const host = canvas.parentElement;
    host?.addEventListener("pointermove", onMove, { passive: true });
    host?.addEventListener("pointerleave", onLeave);

    return () => {
      stop();
      io.disconnect();
      ro.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      host?.removeEventListener("pointermove", onMove);
      host?.removeEventListener("pointerleave", onLeave);
    };
  }, [density, linkDistance]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}
    />
  );
};
