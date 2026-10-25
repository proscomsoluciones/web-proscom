"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { whenPageHydrated } from "./HydrationSignal";

/**
 * MotionProvider
 * --------------
 * Motor global y liviano (sin dependencias) para:
 *  1. Revelar elementos al hacer scroll:  <div {...reveal("up", 120)}>  (ver ./reveal.ts)
 *  2. Efecto "spotlight" que sigue al cursor en tarjetas .tech-card-light / .tech-card-dark / [data-spotlight]
 *  3. Inclinación 3D en tarjetas:          <div data-tilt>
 *  4. Botones magnéticos:                   <span data-magnetic>…</span>
 *  5. Parallax ligado al scroll:            <div data-parallax="0.2">   (velocidad, puede ser negativa)
 *  6. Progreso de scroll de un bloque:      <div data-scroll-progress>  → expone la variable CSS --p (0 a 1)
 *
 * Los Server Components solo necesitan agregar atributos data-*, no requieren "use client".
 */
export function MotionProvider() {
  const pathname = usePathname();

  // 1. Scroll reveal
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let observer: IntersectionObserver | null = null;

    // Se espera un instante para no modificar el DOM antes de que React
    // termine de hidratar el contenido de la página.
    const init = () => {
      const elements = Array.from(
        document.querySelectorAll<HTMLElement>("[data-reveal]:not(.is-revealed)")
      );

      if (reduce || !("IntersectionObserver" in window)) {
        elements.forEach((el) => el.classList.add("is-revealed"));
        return;
      }

      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            const el = entry.target as HTMLElement;
            el.classList.add("is-revealed");
            observer?.unobserve(el);
            // Al terminar la entrada, se limpia el atributo para que los
            // efectos hover propios de cada tarjeta (translateY, etc.) funcionen.
            const delay = parseFloat(el.style.getPropertyValue("--reveal-delay")) || 0;
            window.setTimeout(() => el.removeAttribute("data-reveal"), 1900 + delay);
          });
        },
        { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
      );

      elements.forEach((el) => observer?.observe(el));
    };

    let timer = 0;
    const cancelWait = whenPageHydrated(() => {
      timer = window.setTimeout(init, 120);
    });
    return () => {
      cancelWait();
      window.clearTimeout(timer);
      observer?.disconnect();
    };
  }, [pathname]);

  // 2-4. Interacciones con el cursor (spotlight, tilt 3D, magnético)
  useEffect(() => {
    if (window.matchMedia("(hover: none)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let frame = 0;
    let lastTilt: HTMLElement | null = null;
    let lastMagnet: HTMLElement | null = null;

    const resetTilt = () => {
      if (!lastTilt) return;
      lastTilt.style.removeProperty("--rx");
      lastTilt.style.removeProperty("--ry");
      lastTilt = null;
    };
    const resetMagnet = () => {
      if (!lastMagnet) return;
      lastMagnet.style.translate = "";
      lastMagnet = null;
    };

    const onMove = (e: PointerEvent) => {
      // No se escriben estilos sobre HTML que React aún no hidrata
      if (!window.__pageHydrated) return;
      const el = e.target as HTMLElement | null;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        // Spotlight
        const card = el?.closest<HTMLElement>(
          ".tech-card-light, .tech-card-dark, [data-spotlight]"
        );
        if (card) {
          const r = card.getBoundingClientRect();
          card.style.setProperty("--mx", `${e.clientX - r.left}px`);
          card.style.setProperty("--my", `${e.clientY - r.top}px`);
        }

        // Tilt 3D
        const tilt = el?.closest<HTMLElement>("[data-tilt]") ?? null;
        if (tilt !== lastTilt) resetTilt();
        if (tilt) {
          const r = tilt.getBoundingClientRect();
          const px = (e.clientX - r.left) / r.width - 0.5;
          const py = (e.clientY - r.top) / r.height - 0.5;
          tilt.style.setProperty("--rx", `${(-py * 7).toFixed(2)}deg`);
          tilt.style.setProperty("--ry", `${(px * 9).toFixed(2)}deg`);
          lastTilt = tilt;
        }

        // Magnético
        const magnet = el?.closest<HTMLElement>("[data-magnetic]") ?? null;
        if (magnet !== lastMagnet) resetMagnet();
        if (magnet) {
          const r = magnet.getBoundingClientRect();
          const dx = e.clientX - (r.left + r.width / 2);
          const dy = e.clientY - (r.top + r.height / 2);
          magnet.style.translate = `${(dx * 0.25).toFixed(1)}px ${(dy * 0.35).toFixed(1)}px`;
          lastMagnet = magnet;
        }
      });
    };
    const onLeaveWindow = () => {
      resetTilt();
      resetMagnet();
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeaveWindow);
    return () => {
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeaveWindow);
      cancelAnimationFrame(frame);
    };
  }, []);

  // 5-6. Efectos ligados al scroll (parallax + progreso de bloques)
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let frame = 0;
    let parallax: HTMLElement[] = [];
    let progress: HTMLElement[] = [];

    const collect = () => {
      parallax = Array.from(document.querySelectorAll<HTMLElement>("[data-parallax]"));
      progress = Array.from(document.querySelectorAll<HTMLElement>("[data-scroll-progress]"));
    };

    const update = () => {
      const vh = window.innerHeight;
      for (const el of parallax) {
        const r = el.getBoundingClientRect();
        if (r.bottom < -200 || r.top > vh + 200) continue;
        const speed = parseFloat(el.dataset.parallax || "0.15");
        const offset = (r.top + r.height / 2 - vh / 2) * speed;
        el.style.translate = `0 ${offset.toFixed(1)}px`;
      }
      for (const el of progress) {
        const r = el.getBoundingClientRect();
        // 0 cuando el bloque entra por abajo del 70% de la pantalla, 1 cuando su final pasa ese punto
        const start = vh * 0.7;
        const p = Math.min(Math.max((start - r.top) / r.height, 0), 1);
        el.style.setProperty("--p", p.toFixed(4));
      }
    };
    // Solo se escriben estilos cuando React ya hidrató la página: el navegador
    // puede disparar "scroll" antes (p. ej. al restaurar la posición al recargar)
    // y eso provocaba desajustes entre servidor y cliente.
    let collected = false;
    const onScroll = () => {
      if (!window.__pageHydrated) return;
      if (!collected) {
        collect();
        collected = true;
      }
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    // Si la página cargó ya desplazada, se aplica la posición apenas termine la hidratación
    const cancelWait = whenPageHydrated(() => {
      if (window.scrollY > 0) onScroll();
    });
    return () => {
      cancelWait();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(frame);
    };
  }, [pathname]);

  return null;
}
