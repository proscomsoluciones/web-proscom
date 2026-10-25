"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    __pageHydrated?: boolean;
  }
}

/**
 * Avisa cuando el contenido de la página terminó de hidratarse.
 * Se monta dentro de template.tsx, junto a la página: su efecto corre recién
 * cuando React terminó de hidratar ese bloque. MotionProvider (que vive en el
 * layout y puede hidratarse antes) espera esta señal para no tocar el DOM
 * antes de tiempo y evitar errores de "hydration mismatch".
 */
export function HydrationSignal() {
  useEffect(() => {
    if (window.__pageHydrated) return;
    window.__pageHydrated = true;
    window.dispatchEvent(new Event("page-hydrated"));
  }, []);

  return null;
}

/** Ejecuta `cb` cuando la página ya está hidratada. Devuelve la función de limpieza. */
export function whenPageHydrated(cb: () => void): () => void {
  if (window.__pageHydrated) {
    cb();
    return () => {};
  }
  window.addEventListener("page-hydrated", cb, { once: true });
  return () => window.removeEventListener("page-hydrated", cb);
}
