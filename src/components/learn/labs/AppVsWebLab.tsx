"use client";

import React, { useState } from "react";
import { CheckCircle2, XCircle, MinusCircle } from "lucide-react";
import { ScenarioPicker } from "../lab-ui";

type Opt = "nativa" | "webapp" | "pwa";

type Cell = "si" | "no" | "parcial";

const ROWS: { label: string; values: Record<Opt, Cell> }[] = [
  { label: "Se descarga desde App Store / Google Play", values: { nativa: "si", webapp: "no", pwa: "no" } },
  { label: "Se instala en la pantalla de inicio", values: { nativa: "si", webapp: "no", pwa: "si" } },
  { label: "Funciona sin conexión a internet", values: { nativa: "si", webapp: "no", pwa: "parcial" } },
  { label: "Notificaciones push", values: { nativa: "si", webapp: "no", pwa: "parcial" } },
  { label: "Acceso a cámara, GPS, sensores", values: { nativa: "si", webapp: "parcial", pwa: "parcial" } },
  { label: "Un solo código para todos los dispositivos", values: { nativa: "no", webapp: "si", pwa: "si" } },
  { label: "Costo y tiempo de desarrollo", values: { nativa: "no", webapp: "si", pwa: "si" } },
];

const OPTIONS: { id: Opt; label: string; hint: string }[] = [
  { id: "nativa", label: "App nativa", hint: "iOS / Android" },
  { id: "webapp", label: "Web app", hint: "Sitio responsive" },
  { id: "pwa", label: "PWA", hint: "Web app instalable" },
];

const CellIcon: React.FC<{ v: Cell }> = ({ v }) =>
  v === "si" ? (
    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
  ) : v === "no" ? (
    <XCircle className="w-4 h-4 text-rose-400" />
  ) : (
    <MinusCircle className="w-4 h-4 text-amber-400" />
  );

export const AppVsWebLab: React.FC = () => {
  const [focus, setFocus] = useState<Opt>("nativa");

  return (
    <div className="lab-frame rounded-[2rem] bg-gradient-to-b from-[#0A1E3B] to-[#071A35] border border-white/10 shadow-2xl shadow-[#071A35]/40 overflow-hidden">
      <div className="p-5 sm:p-6 border-b border-white/10">
        <ScenarioPicker
          label="Destaca una opción"
          value={focus}
          onChange={(v) => setFocus(v as Opt)}
          options={OPTIONS.map((o) => ({ id: o.id, label: o.label, hint: o.hint }))}
        />
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/10">
              <th className="text-left text-[11px] font-mono uppercase tracking-wider text-slate-400 px-5 py-3">Capacidad</th>
              {OPTIONS.map((o) => (
                <th
                  key={o.id}
                  className={`px-4 py-3 text-center transition-colors ${focus === o.id ? "bg-[#1479D4]/15" : ""}`}
                >
                  <span className={`block text-xs font-bold ${focus === o.id ? "text-[#19C6E6]" : "text-white"}`}>{o.label}</span>
                  <span className="block text-[10px] text-slate-500">{o.hint}</span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {ROWS.map((r) => (
              <tr key={r.label} className="border-b border-white/5">
                <td className="px-5 py-3 text-xs text-slate-300">{r.label}</td>
                {OPTIONS.map((o) => (
                  <td key={o.id} className={`px-4 py-3 text-center transition-colors ${focus === o.id ? "bg-[#1479D4]/10" : ""}`}>
                    <span className="inline-flex justify-center"><CellIcon v={r.values[o.id]} /></span>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="p-5 sm:p-6 border-t border-white/10">
        <p className="text-xs text-slate-400 leading-relaxed">
          <CheckCircle2 className="inline w-3.5 h-3.5 text-emerald-400 -mt-0.5 mr-1" />Sí ·{" "}
          <MinusCircle className="inline w-3.5 h-3.5 text-amber-400 -mt-0.5 mr-1" />Parcial ·{" "}
          <XCircle className="inline w-3.5 h-3.5 text-rose-400 -mt-0.5 mr-1" />No. Elige app nativa si necesitas acceso completo al dispositivo o estar en las tiendas; web app o PWA si quieres un solo desarrollo, más rápido y económico.
        </p>
      </div>
    </div>
  );
};
