"use client";

import React, { useState } from "react";
import { Users, Split, Server, HardDriveDownload, Power, Zap, Activity, AlertTriangle, CheckCircle2, Clock } from "lucide-react";
import { Stage3D, Box3D, Billboard, FloorLinks, Packet3D, NodeLabel, type Point } from "../stage3d";
import { ServerBox, DbStack } from "../props3d";
import { Toggle } from "../lab-ui";

const USERS: Point = { x: 110, y: 250 };
const LB: Point = { x: 320, y: 250 };
const SERVERS: Point[] = [
  { x: 470, y: 70 },
  { x: 560, y: 230 },
  { x: 650, y: 400 },
];
const BACKUP: Point = { x: 760, y: 130 };
const CAPACITY = 3500; // visitantes que soporta cómodamente un servidor

export const CloudLab: React.FC = () => {
  const [visitors, setVisitors] = useState(1200);
  const [autoscale, setAutoscale] = useState(true);
  const [down, setDown] = useState(false);
  const [backups, setBackups] = useState(0);

  // Servidores encendidos según el tráfico (escalado automático)
  const wanted = autoscale ? Math.min(3, Math.max(1, Math.ceil(visitors / CAPACITY))) : 1;
  // Si el servidor 2 falla, la nube enciende otro para compensar (si hay escalado)
  const on = [0, 1, 2].map((i) => i < wanted || (autoscale && down && i === wanted && wanted < 3));
  const serving = on.map((v, i) => v && !(down && i === 1));
  const servingCount = serving.filter(Boolean).length;

  const load = servingCount ? visitors / servingCount : Infinity;
  const cpu = servingCount ? Math.min(100, Math.round((load / CAPACITY) * 70)) : 100;
  const overloaded = cpu >= 95 || servingCount === 0;
  const responseMs = servingCount === 0 ? null : Math.round(90 + Math.max(0, cpu - 60) * 22);

  const flow = Math.min(4, Math.max(1, Math.round(visitors / 2500)));

  let status: { tone: "ok" | "warn" | "error"; title: string; text: string };
  if (servingCount === 0) {
    status = { tone: "error", title: "El sitio está caído", text: "No queda ningún servidor atendiendo. Sin redundancia ni escalado, una sola falla deja a todos sin servicio." };
  } else if (overloaded) {
    status = { tone: "error", title: "Servidor saturado", text: `Un solo servidor intenta atender ${visitors.toLocaleString("es-CL")} visitas. Las páginas se vuelven lentas o fallan. Activa el escalado automático para agregar capacidad.` };
  } else if (down) {
    status = { tone: "warn", title: "Falla controlada: nadie lo notó", text: "El servidor 2 se cayó, pero el balanceador dejó de enviarle tráfico y lo repartió entre los demás. Esto se llama alta disponibilidad." };
  } else if (servingCount > 1) {
    status = { tone: "ok", title: `${servingCount} servidores trabajando en equipo`, text: "El tráfico aumentó y la nube encendió más servidores automáticamente. Cuando baje, los apagará para no pagar de más." };
  } else {
    status = { tone: "ok", title: "Todo en orden", text: "Un servidor basta para este tráfico. Sube los visitantes para ver cómo responde la nube." };
  }

  return (
    <div className="lab-frame rounded-[2rem] bg-gradient-to-b from-[#0A1E3B] to-[#071A35] border border-white/10 shadow-2xl shadow-[#071A35]/40 overflow-hidden">
      {/* Controles */}
      <div className="grid gap-5 lg:grid-cols-12 items-end p-5 sm:p-6 lg:py-4 border-b border-white/10">
        <div className="lg:col-span-5">
          <label htmlFor="visitors" className="flex items-center justify-between text-[11px] font-mono uppercase tracking-wider text-slate-400 mb-2">
            <span>Visitantes al mismo tiempo</span>
            <span className="text-lg font-extrabold text-white tabular-nums normal-case">{visitors.toLocaleString("es-CL")}</span>
          </label>
          <input
            id="visitors"
            type="range"
            min={200}
            max={10000}
            step={200}
            value={visitors}
            onChange={(e) => setVisitors(Number(e.target.value))}
            className="w-full accent-[#19C6E6] cursor-pointer"
          />
          <div className="flex justify-between text-[10px] font-mono text-slate-500 mt-1">
            <span>Día normal</span>
            <span>Campaña / Cyber</span>
          </div>
        </div>
        <div className="lg:col-span-7 flex flex-wrap gap-2 lg:justify-end">
          <Toggle checked={autoscale} onChange={setAutoscale} label="Escalado automático" icon={<Zap className="w-4 h-4" />} />
          <button
            type="button"
            onClick={() => setDown((d) => !d)}
            className={`inline-flex items-center gap-2 rounded-xl border px-3 py-2 text-xs font-semibold transition-all ${
              down ? "bg-rose-500/20 border-rose-400/60 text-rose-100" : "bg-white/[0.04] border-white/10 text-slate-300 hover:border-rose-400/50"
            }`}
          >
            <Power className="w-4 h-4" /> {down ? "Reparar servidor 2" : "Simular caída del servidor 2"}
          </button>
          <button
            type="button"
            onClick={() => setBackups((b) => b + 1)}
            className="inline-flex items-center gap-2 rounded-xl border border-violet-400/40 bg-violet-500/10 hover:bg-violet-500/20 px-3 py-2 text-xs font-semibold text-violet-100 transition-all"
          >
            <HardDriveDownload className="w-4 h-4" /> Crear respaldo
          </button>
        </div>
      </div>

      <div className="lab-main grid grid-cols-1 lg:grid-cols-12">
        <div className="lab-stage lg:col-span-7 xl:col-span-8 relative border-b lg:border-b-0 lg:border-r border-white/10">
          <Stage3D label="Escena 3D: visitantes llegan a un balanceador de carga que reparte el tráfico entre varios servidores en la nube, con respaldo en otra ubicación">
            <FloorLinks
              links={[
                { from: USERS, to: LB, active: true },
                ...SERVERS.map((p, i) => ({
                  from: LB,
                  to: p,
                  active: serving[i],
                  color: down && i === 1 ? "#fb7185" : serving[i] ? undefined : "#475569",
                  bend: i === 0 ? -0.1 : i === 2 ? 0.1 : 0,
                })),
                { from: SERVERS[1], to: BACKUP, color: "#a78bfa", active: backups > 0 },
              ]}
            />

            {/* Visitantes */}
            {[-40, 0, 40].map((dy, i) => (
              <Billboard key={i} x={USERS.x + (i === 1 ? -25 : 0)} y={USERS.y + dy} z={2}>
                <span className="grid place-items-center w-11 h-11 rounded-full bg-gradient-to-br from-[#1479D4] to-[#19C6E6] border-2 border-white/60 shadow-[0_0_18px_rgba(25,198,230,0.6)]">
                  <Users className="w-5 h-5 text-white" />
                </span>
              </Billboard>
            ))}
            <Billboard x={USERS.x} y={USERS.y} z={110}>
              <NodeLabel title="Visitantes" subtitle={`${visitors.toLocaleString("es-CL")} conectados`} icon={<Users />} active />
            </Billboard>

            {/* Balanceador */}
            <Box3D x={LB.x} y={LB.y} w={90} d={130} h={45} top="#0EA5E9" front="#0369A1" side="#075985" glow />
            <Billboard x={LB.x} y={LB.y} z={80}>
              <NodeLabel title="Balanceador" subtitle="reparte el tráfico" icon={<Split />} active />
            </Billboard>

            {/* Servidores */}
            {SERVERS.map((p, i) => {
              const isDown = down && i === 1;
              return (
                <React.Fragment key={i}>
                  <ServerBox x={p.x} y={p.y} h={110} w={90} active={serving[i]} dim={!on[i]} tone={isDown ? "error" : overloaded && serving[i] ? "warn" : undefined} />
                  <Billboard x={p.x} y={p.y} z={135}>
                    <div className="flex flex-col items-center gap-1.5">
                      {on[i] && !isDown && (
                        <span className="w-24 h-2 rounded-full bg-white/10 overflow-hidden border border-white/10">
                          <span
                            className={`block h-full transition-all duration-700 ${cpu > 85 ? "bg-rose-400" : cpu > 60 ? "bg-amber-300" : "bg-emerald-400"}`}
                            style={{ width: `${cpu}%` }}
                          />
                        </span>
                      )}
                      <NodeLabel
                        title={`Servidor ${i + 1}`}
                        subtitle={isDown ? "caído ✗" : on[i] ? `CPU ${cpu}%` : "apagado"}
                        icon={<Server />}
                        active={serving[i]}
                        tone={isDown ? "error" : undefined}
                      />
                    </div>
                  </Billboard>
                </React.Fragment>
              );
            })}

            {/* Respaldo */}
            <DbStack x={BACKUP.x} y={BACKUP.y} layers={2} color="violet" active={backups > 0} />
            <Billboard x={BACKUP.x} y={BACKUP.y} z={95}>
              <NodeLabel title="Respaldo" subtitle={backups ? `${backups} copia${backups > 1 ? "s" : ""} ✓` : "otra región"} icon={<HardDriveDownload />} active={backups > 0} />
            </Billboard>

            {/* Flujo de tráfico */}
            {Array.from({ length: flow }).map((_, k) => (
              <Packet3D key={`u-${k}-${flow}`} from={USERS} to={LB} duration={1400} delay={k * (1400 / flow)} loop />
            ))}
            {SERVERS.map((p, i) =>
              serving[i]
                ? Array.from({ length: Math.max(1, Math.round(flow / Math.max(servingCount, 1))) }).map((_, k) => (
                    <Packet3D key={`s-${i}-${k}-${servingCount}-${flow}`} from={LB} to={p} duration={1400} delay={k * 500 + i * 230} loop color={overloaded ? "#fbbf24" : undefined} />
                  ))
                : null
            )}
            {backups > 0 && <Packet3D key={`b-${backups}`} from={SERVERS[1]} to={BACKUP} duration={1800} label="Respaldo" color="#a78bfa" />}
          </Stage3D>
        </div>

        {/* Panel de estado */}
        <div className="lab-narration lg:col-span-5 xl:col-span-4 p-5 sm:p-6 space-y-4" aria-live="polite">
          <div key={status.title} className="anim-rise">
            <p className="text-[11px] font-mono uppercase tracking-wider text-[#19C6E6]">Qué está pasando</p>
            <h3 className={`text-xl font-extrabold mt-1 flex items-center gap-2 ${status.tone === "error" ? "text-rose-300" : status.tone === "warn" ? "text-amber-200" : "text-white"}`}>
              {status.tone === "ok" ? <CheckCircle2 className="w-5 h-5 text-emerald-400" /> : <AlertTriangle className="w-5 h-5" />}
              {status.title}
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed mt-2">{status.text}</p>
          </div>

          <div className="grid grid-cols-3 gap-2">
            <div className="rounded-xl bg-white/[0.04] border border-white/10 p-3">
              <p className="text-[9px] font-mono uppercase text-slate-400 flex items-center gap-1"><Server className="w-3 h-3" /> Activos</p>
              <p className="text-xl font-extrabold text-white font-mono">{servingCount}/3</p>
            </div>
            <div className="rounded-xl bg-white/[0.04] border border-white/10 p-3">
              <p className="text-[9px] font-mono uppercase text-slate-400 flex items-center gap-1"><Clock className="w-3 h-3" /> Respuesta</p>
              <p className={`text-xl font-extrabold font-mono ${responseMs && responseMs < 400 ? "text-emerald-400" : "text-rose-300"}`}>
                {responseMs ? (responseMs >= 1000 ? `${(responseMs / 1000).toFixed(1)}s` : `${responseMs}ms`) : "—"}
              </p>
            </div>
            <div className="rounded-xl bg-white/[0.04] border border-white/10 p-3">
              <p className="text-[9px] font-mono uppercase text-slate-400 flex items-center gap-1"><Activity className="w-3 h-3" /> Estado</p>
              <p className={`text-xl font-extrabold font-mono ${overloaded ? "text-rose-300" : "text-emerald-400"}`}>{overloaded ? "Lento" : "OK"}</p>
            </div>
          </div>

          <div className="rounded-xl bg-amber-400/10 border border-amber-300/25 p-3">
            <p className="text-xs text-amber-100/90 leading-relaxed">
              <strong>Prueba esto:</strong> sube los visitantes al máximo con el escalado apagado, luego enciéndelo. Después simula la caída de un servidor y crea un respaldo.
            </p>
          </div>

          <div className="space-y-2 pt-1">
            {[
              ["Escalabilidad", "Agregar o quitar servidores según la demanda, pagando solo por lo que se usa."],
              ["Alta disponibilidad", "Varios servidores y un balanceador: si uno falla, los otros siguen atendiendo."],
              ["Respaldos", "Copias periódicas en otra ubicación para recuperar los datos ante cualquier desastre."],
            ].map(([t, d]) => (
              <div key={t} className="flex gap-2.5">
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[#19C6E6] shrink-0" />
                <p className="text-xs text-slate-300 leading-relaxed">
                  <strong className="text-white">{t}:</strong> {d}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

