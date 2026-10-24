"use client";

import React, { useEffect, useState } from "react";
import { FileCode2, Palette, Zap } from "lucide-react";
import { Stage3D, Box3D, Billboard, PLANE_W } from "@/components/learn/stage3d";
import { BrowserWindow, SitePreview } from "@/components/learn/props3d";

interface Layer {
  id: string;
  label: string;
  top: string;
  front: string;
  side: string;
  explodedZ: number;
  icon: React.ElementType;
  code: string;
}

const LAYERS: Layer[] = [
  { id: "html", label: "HTML", top: "#FDBA74", front: "#EA580C", side: "#C2410C", explodedZ: 0, icon: FileCode2, code: "<section>\n  <h1>Proscom</h1>\n</section>" },
  { id: "css", label: "CSS", top: "#67E8F9", front: "#0891B2", side: "#0E7490", explodedZ: 70, icon: Palette, code: "h1 {\n  color: #1479D4;\n}" },
  { id: "js", label: "JavaScript", top: "#FDE68A", front: "#CA8A04", side: "#A16207", explodedZ: 140, icon: Zap, code: "btn.onclick =\n  () => animate();" },
];

const CX = PLANE_W / 2;
const CY = 260;

/** Escena 3D que arma una página web a partir de sus capas (HTML, CSS, JS) y se queda despiezada. */
export const WebsiteExplodeStage: React.FC = () => {
  const [exploded, setExploded] = useState(false);

  useEffect(() => {
    const id = window.setTimeout(() => setExploded(true), 500);
    return () => window.clearTimeout(id);
  }, []);

  return (
    <Stage3D
      label="Vista 3D despiezada de una página web: capas de HTML, CSS y JavaScript ensamblándose en el resultado final"
      tiltX={60}
      tiltZ={-30}
      zoom={1.15}
    >
      {LAYERS.map((l, i) => {
        const z = exploded ? l.explodedZ : i * 2;
        return (
          <React.Fragment key={l.id}>
            <Box3D
              x={CX}
              y={CY}
              w={260}
              d={160}
              h={10}
              z={z}
              top={l.top}
              front={l.front}
              side={l.side}
              glow={exploded}
              topContent={<pre className="p-2 text-[9px] leading-tight font-mono text-[#071A35]/70 whitespace-pre-wrap">{l.code}</pre>}
            />
            <Billboard x={CX - 178} y={CY} z={z + 18}>
              <div
                className="flex items-center gap-1.5 rounded-lg bg-[#040F22]/90 border border-white/15 px-2.5 py-1.5 whitespace-nowrap transition-opacity duration-500"
                style={{ opacity: exploded ? 1 : 0 }}
              >
                <l.icon className="w-3.5 h-3.5 text-[#19C6E6]" />
                <span className="text-[11px] font-mono font-bold text-white">{l.label}</span>
              </div>
            </Billboard>
          </React.Fragment>
        );
      })}

      {/* Resultado final: siempre encima de todas las capas */}
      <Billboard x={CX} y={CY} z={exploded ? 220 : LAYERS.length * 2 + 10}>
        <BrowserWindow url="tuempresa.cl" secure width={190}>
          <SitePreview state="full" />
        </BrowserWindow>
      </Billboard>
    </Stage3D>
  );
};
