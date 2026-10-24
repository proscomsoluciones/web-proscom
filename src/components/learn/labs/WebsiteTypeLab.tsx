"use client";

import React, { useState } from "react";
import { Lock, Unlock, Mail, Clock, PencilLine, CheckCircle2 } from "lucide-react";
import { ScenarioPicker } from "../lab-ui";

type Mode = "informativa" | "auto";

const INITIAL_PRICE = "Desde $12.000 por kilo de helado artesanal";
const TAGLINE = "Hecho con frutas de estación";

export const WebsiteTypeLab: React.FC = () => {
  const [mode, setMode] = useState<Mode>("informativa");
  const [editing, setEditing] = useState(false);
  const [text, setText] = useState(INITIAL_PRICE);
  const [ticketSent, setTicketSent] = useState(false);

  const isAuto = mode === "auto";

  const changeMode = (m: string) => {
    setMode(m as Mode);
    setEditing(false);
    setTicketSent(false);
  };

  return (
    <div className="lab-frame rounded-[2rem] bg-gradient-to-b from-[#0A1E3B] to-[#071A35] border border-white/10 shadow-2xl shadow-[#071A35]/40 overflow-hidden">
      <div className="p-5 sm:p-6 border-b border-white/10">
        <ScenarioPicker
          label="Tipo de web"
          value={mode}
          onChange={changeMode}
          options={[
            { id: "informativa", label: "Web informativa", hint: "Contenido fijo, lo edita el desarrollador", tone: "info" },
            { id: "auto", label: "Web autoadministrable", hint: "Panel CMS, lo editas tú", tone: "ok" },
          ]}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12">
        {/* Vista previa del sitio */}
        <div className="lg:col-span-7 p-5 sm:p-6 border-b lg:border-b-0 lg:border-r border-white/10">
          <p className="text-[11px] font-mono uppercase tracking-wider text-slate-400 mb-3">Intenta editar el precio en vivo</p>
          <div className="rounded-2xl bg-white overflow-hidden shadow-xl">
            <div className="h-9 bg-slate-100 border-b border-slate-200 flex items-center gap-1.5 px-3">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-400" />
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
              <span className="ml-3 text-[11px] font-mono text-slate-400">heladeria-ejemplo.cl</span>
            </div>
            <div className="p-6 space-y-3">
              <div className="h-5 w-40 rounded bg-[#071A35]/90" />
              <p className="text-xs text-slate-400">{TAGLINE}</p>
              <div className="relative mt-4">
                {isAuto && editing ? (
                  <textarea
                    autoFocus
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    className="w-full rounded-xl border-2 border-[#1479D4] px-3 py-2 text-lg font-bold text-[#071A35] focus:outline-none"
                  />
                ) : (
                  <p className="text-lg font-bold text-[#071A35]">{text}</p>
                )}
                <button
                  type="button"
                  onClick={() => (isAuto ? setEditing((e) => !e) : setTicketSent(true))}
                  className={`mt-3 inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-bold transition-colors ${
                    isAuto
                      ? "bg-[#1479D4] text-white hover:bg-[#1688F5]"
                      : "bg-slate-100 text-slate-500 hover:bg-slate-200"
                  }`}
                >
                  {isAuto ? (
                    <>
                      <Unlock className="w-3.5 h-3.5" /> {editing ? "Guardar y publicar" : "Editar este texto"}
                    </>
                  ) : (
                    <>
                      <Lock className="w-3.5 h-3.5" /> Pedir cambio al desarrollador
                    </>
                  )}
                </button>
                {editing && isAuto && (
                  <p className="anim-rise mt-2 flex items-center gap-1.5 text-[11px] font-semibold text-emerald-600">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Cambio visible al instante para todos los visitantes.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Resultado */}
        <div className="lg:col-span-5 p-5 sm:p-6 space-y-4" aria-live="polite">
          {!isAuto && ticketSent ? (
            <div className="anim-rise rounded-2xl border border-amber-300/30 bg-amber-400/10 p-4">
              <p className="flex items-center gap-2 text-sm font-bold text-amber-200">
                <Mail className="w-4 h-4" /> Solicitud enviada al desarrollador
              </p>
              <p className="mt-2 flex items-center gap-1.5 text-xs text-amber-100/80">
                <Clock className="w-3.5 h-3.5" /> Respuesta estimada: 1 a 3 días hábiles, según el contrato de mantención.
              </p>
            </div>
          ) : (
            <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-4">
              <p className="text-sm text-slate-300 leading-relaxed">
                {isAuto
                  ? "En una web autoadministrable, cualquier persona autorizada puede editar textos e imágenes desde un panel, sin tocar código ni depender de nadie."
                  : "En una web informativa, el contenido vive en el código. Cambiarlo significa escribirle al desarrollador y esperar a que lo publique."}
              </p>
            </div>
          )}

          <div className="grid grid-cols-2 gap-2 text-center">
            <div className="rounded-xl bg-white/[0.04] border border-white/10 p-3">
              <p className="text-[9px] font-mono uppercase text-slate-400">Costo inicial</p>
              <p className={`text-sm font-extrabold mt-1 ${isAuto ? "text-amber-300" : "text-emerald-300"}`}>{isAuto ? "Algo mayor" : "Menor"}</p>
            </div>
            <div className="rounded-xl bg-white/[0.04] border border-white/10 p-3">
              <p className="text-[9px] font-mono uppercase text-slate-400">Cambiar un texto</p>
              <p className={`text-sm font-extrabold mt-1 ${isAuto ? "text-emerald-300" : "text-amber-300"}`}>{isAuto ? "Al instante" : "Días"}</p>
            </div>
          </div>

          <div className="space-y-2 pt-2">
            <p className="flex gap-2 text-xs text-slate-300">
              <PencilLine className="w-3.5 h-3.5 text-[#19C6E6] shrink-0 mt-0.5" />
              Elige autoadministrable si vas a cambiar precios, fotos o novedades seguido. Elige informativa si tu contenido casi no cambia.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
