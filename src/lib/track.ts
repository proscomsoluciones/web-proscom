import { track } from "@vercel/analytics";

type GtagWindow = Window & { gtag?: (...args: unknown[]) => void };

/** Registra una conversión en Google Analytics (si está cargado) y en Vercel Analytics */
export const trackEvent = (name: string, params: Record<string, string> = {}) => {
  if (typeof window === "undefined") return;
  const win = window as GtagWindow;
  if (typeof win.gtag === "function") win.gtag("event", name, params);
  try {
    track(name, params);
  } catch {
    // La analítica nunca debe romper la navegación
  }
};
