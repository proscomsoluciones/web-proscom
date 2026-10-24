"use client";

import React from "react";
import { LayoutDashboard, Save, Rocket, Globe } from "lucide-react";
import { useStepPlayer, PlayerControls, StepTimeline, Narration, type CodeSnippet } from "../lab-ui";

interface Step {
  title: string;
  text: string;
  tip?: string;
  code?: CodeSnippet;
}

const STEPS: Step[] = [
  {
    title: "Entras al panel de administración",
    text: "Con tu usuario y contraseña, entras al CMS: un área privada separada de la web pública, donde se organiza todo el contenido del sitio.",
    code: { label: "PANEL", content: "usuario: equipo@tuempresa.cl\nrol: Editor\nsección: Productos" },
  },
  {
    title: "Editas el contenido",
    text: "Cambias un texto, subes una foto nueva o actualizas un precio, usando campos simples: nada de código ni archivos que subir a mano.",
    code: { label: "EDITOR", content: 'titulo: "Helado de maracuyá"\nprecio: 12000\ndestacado: true' },
  },
  {
    title: "Guardas como borrador",
    text: "El cambio se guarda, pero todavía no se ve en la web pública. Puedes revisarlo con calma, o pedirle a otra persona que lo revise antes de publicar.",
    code: { label: "BORRADOR", tone: "info", content: "estado: borrador\nvisible_en_web: false" },
  },
  {
    title: "Publicas",
    text: "Al publicar, el CMS actualiza el contenido en la base de datos del sitio. No hay que subir nada a un servidor ni avisarle a un desarrollador.",
    code: { label: "PUBLICAR", tone: "ok", content: "estado: publicado ✓\nvisible_en_web: true\npublicado_por: equipo@tuempresa.cl" },
  },
  {
    title: "Se ve en la web, al instante",
    text: "Cualquier persona que visite el sitio ahora ve el contenido actualizado. Todo el viaje, de editar a publicar, puede tomar menos de un minuto.",
    tip: "Así es como una tienda actualiza precios, una fundación sube noticias o un restorán cambia su menú, sin depender de nadie más.",
  },
];

export const CmsLab: React.FC = () => {
  const player = useStepPlayer(STEPS.length, 2600);
  const s = player.step;
  const cur = s >= 0 ? STEPS[s] : null;

  return (
    <div className="lab-frame rounded-[2rem] bg-gradient-to-b from-[#0A1E3B] to-[#071A35] border border-white/10 shadow-2xl shadow-[#071A35]/40 overflow-hidden">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 sm:p-6 lg:py-4 border-b border-white/10">
        <p className="text-white font-bold flex items-center gap-2">
          <LayoutDashboard className="w-4 h-4 text-[#19C6E6]" /> De editar en el panel a verlo publicado
        </p>
        <PlayerControls player={player} total={STEPS.length} playLabel="Iniciar edición" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12">
        <div className="lg:col-span-7 p-5 sm:p-6 border-b lg:border-b-0 lg:border-r border-white/10">
          <div className="grid grid-cols-5 gap-2 mb-6">
            {[LayoutDashboard, Save, Save, Rocket, Globe].map((Icon, i) => (
              <div
                key={i}
                className={`aspect-square rounded-xl border grid place-items-center transition-all duration-500 ${
                  i <= s ? "bg-[#1479D4]/20 border-[#19C6E6] shadow-[0_0_18px_rgba(25,198,230,0.35)]" : "bg-white/[0.03] border-white/10"
                }`}
              >
                <Icon className={`w-5 h-5 ${i <= s ? "text-[#19C6E6]" : "text-slate-500"}`} />
              </div>
            ))}
          </div>
          <div className="rounded-2xl bg-white overflow-hidden shadow-xl">
            <div className="h-8 bg-slate-100 border-b border-slate-200 flex items-center px-3">
              <span className="text-[11px] font-mono text-slate-400">{s >= 3 ? "tuempresa.cl — en vivo" : "panel.tuempresa.cl — administración"}</span>
            </div>
            <div className="p-5 space-y-2">
              <div className="h-4 w-32 rounded bg-slate-200" />
              <p className={`text-base font-bold transition-colors ${s >= 1 ? "text-[#071A35]" : "text-slate-300"}`}>
                {s >= 1 ? "Helado de maracuyá — $12.000" : "contenido sin editar"}
              </p>
              <span
                className={`inline-block rounded-full px-2.5 py-0.5 text-[10px] font-mono font-bold ${
                  s >= 3 ? "bg-emerald-100 text-emerald-700" : s === 2 ? "bg-amber-100 text-amber-700" : "bg-slate-100 text-slate-400"
                }`}
              >
                {s >= 3 ? "PUBLICADO" : s === 2 ? "BORRADOR" : "SIN CAMBIOS"}
              </span>
            </div>
          </div>
        </div>

        <div className="lab-narration lg:col-span-5 p-5 sm:p-6 min-h-[260px]" aria-live="polite">
          <Narration
            stepIndex={s}
            total={STEPS.length}
            title={cur ? cur.title : "El viaje de un cambio dentro del CMS"}
            text={cur ? cur.text : "Presiona «Iniciar edición» y sigue cómo un cambio hecho en el panel llega a verse en la web pública."}
            tip={cur?.tip}
            code={cur?.code}
          />
        </div>
      </div>

      <div className="px-5 sm:px-6 py-4 lg:py-3 border-t border-white/10">
        <StepTimeline steps={STEPS.map((x) => ({ title: x.title }))} current={s} onSelect={player.goto} />
      </div>
    </div>
  );
};
