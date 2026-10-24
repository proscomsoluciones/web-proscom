import React from "react";
import { NetworkCanvas } from "@/components/motion/NetworkCanvas";

/**
 * Capa de fondo animada para las cabeceras de las páginas internas:
 * cuadrícula técnica, aurora en movimiento, red de datos y línea de escaneo.
 * Se coloca como primer hijo de una <section className="relative overflow-hidden">.
 */
export const PageHeroFx: React.FC = () => (
  <>
    <div
      aria-hidden="true"
      className="absolute inset-0 bg-grid-pattern-dark opacity-30 [mask-image:radial-gradient(ellipse_at_center,white,transparent_80%)] pointer-events-none"
    />
    <div
      aria-hidden="true"
      className="absolute -bottom-40 -left-20 w-[520px] h-[520px] bg-[#19C6E6]/10 rounded-full blur-[140px] pointer-events-none animate-aurora-delayed"
    />
    <NetworkCanvas
      density={0.45}
      className="opacity-60 [mask-image:radial-gradient(ellipse_at_center,white_25%,transparent_80%)]"
    />
    <div
      aria-hidden="true"
      className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#19C6E6]/60 to-transparent"
    >
      <span className="data-packet" style={{ animationDuration: "4.5s" }} />
    </div>
  </>
);
