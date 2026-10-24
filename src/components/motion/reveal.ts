import type React from "react";

export type RevealType = "up" | "down" | "left" | "right" | "zoom" | "blur";

/**
 * Atributos para animar un elemento al entrar en pantalla.
 * Uso: <div {...reveal("up", 120)} className="...">
 * Funciona en Server Components (solo agrega atributos).
 */
export function reveal(type: RevealType = "up", delay = 0) {
  return {
    "data-reveal": type,
    style: { "--reveal-delay": `${delay}ms` } as React.CSSProperties,
  };
}
