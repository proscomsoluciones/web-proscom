"use client";

import React, { useState } from "react";
import { Landmark, Server, Laptop, Globe, ListTree, Lock, CheckCircle2, XCircle, MapPin } from "lucide-react";
import { Stage3D, Box3D, Billboard, FloorLinks, Packet3D, NodeLabel, type Point } from "../stage3d";
import { ServerBox, BrowserWindow, SitePreview } from "../props3d";
import { useStepPlayer, PlayerControls, StepTimeline, Narration, type CodeSnippet } from "../lab-ui";

type NodeId = "registrar" | "dns" | "hosting" | "dev" | "visitor";

const POS: Record<NodeId, Point> = {
  registrar: { x: 120, y: 130 },
  dns: { x: 390, y: 110 },
  hosting: { x: 680, y: 190 },
  dev: { x: 150, y: 410 },
  visitor: { x: 760, y: 420 },
};

const CITIES: { name: string; p: Point }[] = [
  { name: "Santiago", p: { x: 300, y: 300 } },
  { name: "Valparaíso", p: { x: 230, y: 250 } },
  { name: "Lima", p: { x: 420, y: 330 } },
  { name: "Buenos Aires", p: { x: 360, y: 420 } },
  { name: "Miami", p: { x: 520, y: 260 } },
  { name: "Madrid", p: { x: 540, y: 370 } },
];

const OK = "#34d399";
const DOMAIN = "tuempresa.cl";
const IP = "203.0.113.10";

interface Step {
  title: string;
  text: string;
  tip?: string;
  active: NodeId[];
  code?: CodeSnippet;
  packets?: { from: NodeId; to: NodeId; label: string; color?: string; delay?: number; loop?: boolean }[];
  tone?: "ok";
}

const STEPS: Step[] = [
  {
    title: "Registra tu dominio",
    text: "El dominio es el nombre de tu sitio (tuempresa.cl). No se compra para siempre: se arrienda por año en un registrador. Para los .cl el registro oficial es NIC Chile; para .com hay muchos registradores.",
    active: ["registrar"],
    code: { label: "REGISTRO", tone: "ok", content: `Dominio:   ${DOMAIN}\nTitular:   Tu Empresa SpA\nEstado:    Activo ✓\nRenovación: anual` },
    tip: "Registra el dominio a nombre de tu empresa, no del proveedor: así siempre será tuyo.",
  },
  {
    title: "Contrata un hosting",
    text: "El hosting es el servidor donde «vive» tu web: guarda los archivos y responde a cada visita. Al contratarlo recibes una dirección IP. Si el dominio es tu dirección postal, el hosting es la casa.",
    active: ["hosting"],
    code: { label: "HOSTING", content: `Servidor:  hosting-01\nIP pública: ${IP}\nTipo:      VPS en la nube\nEstado:    Encendido ✓` },
    tip: "Hay hosting compartido (económico), VPS (más control) y cloud (escala automáticamente).",
  },
  {
    title: "Apunta el dominio al hosting",
    text: "Ahora hay que conectar el nombre con la IP. Eso se hace en la zona DNS del dominio, creando un «registro». ¿Cuál es el correcto? Elige abajo para continuar.",
    active: ["registrar", "dns", "hosting"],
  },
  {
    title: "Espera la propagación",
    text: "Los servidores DNS de todo el mundo se van enterando del cambio. Suele tardar minutos, aunque puede llegar a 24–48 horas porque cada servidor recuerda la respuesta anterior durante un tiempo (TTL).",
    active: ["dns"],
    code: { label: "PROPAGACIÓN", content: `Consultando ${DOMAIN} en el mundo…\nSantiago     ✓ ${IP}\nLima         ✓ ${IP}\nMiami        ✓ ${IP}\nMadrid       ✓ ${IP}` },
    tip: "Antes de un cambio importante se baja el TTL para que la propagación sea más rápida.",
  },
  {
    title: "Sube tu web al hosting",
    text: "Con el dominio apuntando correctamente, se suben los archivos del sitio al servidor (deploy). Hoy esto suele ser automático: cada cambio aprobado se publica solo.",
    active: ["dev", "hosting"],
    packets: [
      { from: "dev", to: "hosting", label: "index.html", loop: true },
      { from: "dev", to: "hosting", label: "estilos.css", color: "#C792EA", delay: 600, loop: true },
      { from: "dev", to: "hosting", label: "app.js", color: "#fbbf24", delay: 1200, loop: true },
    ],
    code: { label: "DEPLOY", tone: "ok", content: "$ git push produccion\n→ Construyendo sitio…   ✓\n→ Subiendo 24 archivos… ✓\n→ Publicado en 38 s" },
  },
  {
    title: "Activa el certificado SSL",
    text: "El certificado SSL permite el candado 🔒 y la dirección https://. Cifra los datos entre el visitante y tu servidor. Hoy se puede obtener gratis (por ejemplo, con Let's Encrypt) y renovarse solo.",
    active: ["hosting"],
    code: { label: "CERTIFICADO", tone: "ok", content: `Emitido para: ${DOMAIN}, www.${DOMAIN}\nEmisor:       Let's Encrypt\nVálido hasta: 90 días (renovación automática)` },
    tip: "Sin SSL, los navegadores marcan tu sitio como «No seguro» y Google lo posiciona peor.",
  },
  {
    title: "¡Llega tu primer visitante!",
    text: "Alguien escribe tuempresa.cl: su navegador consulta el DNS, obtiene la IP del hosting, se conecta de forma segura y recibe tu web. Dominio, DNS, hosting y SSL trabajando juntos.",
    active: ["visitor", "dns", "hosting"],
    packets: [
      { from: "visitor", to: "dns", label: `¿IP de ${DOMAIN}?` },
      { from: "dns", to: "visitor", label: IP, color: OK, delay: 1500 },
      { from: "hosting", to: "visitor", label: "🔒 Tu web", color: OK, delay: 3000 },
    ],
    tone: "ok",
  },
];

const RECORD_OPTIONS = [
  { id: "a", record: `A   @    →  ${IP}`, ok: true, why: "¡Exacto! Un registro A conecta el nombre del dominio con la IP del servidor." },
  { id: "mx", record: `MX  @    →  correo.proveedor.com`, ok: false, why: "El registro MX sirve para el correo electrónico (dónde llegan los emails), no para la web." },
  { id: "txt", record: `TXT @    →  "verificacion=abc123"`, ok: false, why: "Los TXT guardan textos de verificación (por ejemplo, para Google). No dirigen visitas a la web." },
];

export const DomainLab: React.FC = () => {
  const [solved, setSolved] = useState(false);
  const [choice, setChoice] = useState<string | null>(null);
  const player = useStepPlayer(STEPS.length, 3800, solved ? undefined : 2);
  const s = player.step;
  const cur = s >= 0 ? STEPS[s] : null;
  const act = (n: NodeId) => !!cur?.active.includes(n);

  const hostingOn = s >= 1;
  const dnsLinked = s >= 3 || (s === 2 && solved);
  const deployed = s >= 4;
  const sslOn = s >= 5;
  const propagating = s === 3;
  const propagated = s >= 3;

  const pick = (id: string) => {
    setChoice(id);
    if (RECORD_OPTIONS.find((o) => o.id === id)?.ok) setSolved(true);
  };
  const reset = () => {
    player.reset();
    setSolved(false);
    setChoice(null);
  };

  const chosen = RECORD_OPTIONS.find((o) => o.id === choice);
  const zoneCode: CodeSnippet | undefined =
    s === 2 && solved
      ? { label: "ZONA DNS", tone: "ok", content: `${DOMAIN}.       A      ${IP}\nwww.${DOMAIN}.   CNAME  ${DOMAIN}.\n# www es un alias que apunta al mismo lugar` }
      : cur?.code;

  return (
    <div className="lab-frame rounded-[2rem] bg-gradient-to-b from-[#0A1E3B] to-[#071A35] border border-white/10 shadow-2xl shadow-[#071A35]/40 overflow-hidden">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 sm:p-6 lg:py-4 border-b border-white/10">
        <div>
          <p className="text-[11px] font-mono uppercase tracking-wider text-slate-400">Misión</p>
          <p className="text-white font-bold">Publica <span className="text-[#19C6E6]">{DOMAIN}</span> en internet en 7 pasos</p>
          <div className="mt-2 flex items-center gap-2">
            <div className="w-40 h-1.5 rounded-full bg-white/10 overflow-hidden">
              <div className="h-full bg-gradient-to-r from-[#1479D4] to-[#34d399] transition-all duration-700" style={{ width: `${((s + 1) / STEPS.length) * 100}%` }} />
            </div>
            <span className="text-[11px] font-mono text-slate-400">{Math.max(s + 1, 0)}/{STEPS.length}</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <PlayerControls player={{ ...player, reset }} total={STEPS.length} playLabel="Comenzar misión" />
        </div>
      </div>

      <div className="lab-main grid grid-cols-1 lg:grid-cols-12">
        <div className="lab-stage lg:col-span-7 xl:col-span-8 relative border-b lg:border-b-0 lg:border-r border-white/10">
          <Stage3D label="Escena 3D: el dominio se registra, se apunta con DNS al servidor de hosting, se sube la web y llega el primer visitante">
            <FloorLinks
              links={[
                { from: POS.registrar, to: POS.dns, active: s === 2 && solved, color: dnsLinked ? OK : undefined },
                { from: POS.dns, to: POS.hosting, bend: 0.1, active: s === 2 && solved, color: dnsLinked ? OK : "#64748b" },
                { from: POS.dev, to: POS.hosting, bend: -0.1, active: s === 4, color: deployed ? undefined : "#64748b" },
                { from: POS.visitor, to: POS.dns, bend: 0.12, active: s === 6, color: s >= 6 ? undefined : "#64748b" },
                { from: POS.visitor, to: POS.hosting, bend: -0.1, active: s === 6, color: s >= 6 ? undefined : "#64748b" },
              ]}
            />

            {/* Ciudades (propagación) */}
            {CITIES.map((c, i) => (
              <React.Fragment key={c.name}>
                <div
                  className="absolute w-4 h-4 -ml-2 -mt-2 rounded-full transition-all duration-700"
                  style={{
                    left: c.p.x,
                    top: c.p.y,
                    transform: "translateZ(2px)",
                    background: propagated ? OK : "rgba(148,163,184,0.35)",
                    boxShadow: propagated ? "0 0 16px #34d399" : "none",
                    transitionDelay: propagating ? `${i * 380}ms` : "0ms",
                  }}
                />
                {propagating && (
                  <div className="absolute w-4 h-4 -ml-2 -mt-2 rounded-full border-2 border-emerald-400 beacon" style={{ left: c.p.x, top: c.p.y, animationDelay: `${i * 380}ms` }} />
                )}
                <Billboard x={c.p.x} y={c.p.y} z={14}>
                  <span className={`flex items-center gap-1 whitespace-nowrap text-[11px] font-semibold ${propagated ? "text-emerald-300" : "text-slate-500"}`}>
                    <MapPin className="w-3 h-3" />
                    {c.name}
                  </span>
                </Billboard>
              </React.Fragment>
            ))}

            {/* Registrador */}
            <Box3D x={POS.registrar.x} y={POS.registrar.y} w={100} d={90} h={60} top="#F59E0B" front="#B45309" side="#92400E" glow={act("registrar")} />
            <Billboard x={POS.registrar.x} y={POS.registrar.y} z={100}>
              <div className="flex flex-col items-center gap-2">
                {s >= 0 && (
                  <span className="anim-pop rounded-lg bg-white text-[#071A35] text-[12px] font-bold px-2.5 py-1 shadow-lg">
                    {DOMAIN} <CheckCircle2 className="inline w-3.5 h-3.5 text-emerald-500 -mt-0.5" />
                  </span>
                )}
                <NodeLabel title="Registrador" subtitle="NIC Chile / otros" icon={<Landmark />} active={act("registrar")} />
              </div>
            </Billboard>

            {/* Zona DNS */}
            <Box3D x={POS.dns.x} y={POS.dns.y} w={100} d={80} h={50} top="#8B5CF6" front="#6D28D9" side="#5B21B6" glow={act("dns")} />
            <Billboard x={POS.dns.x} y={POS.dns.y} z={90}>
              <div className="flex flex-col items-center gap-2">
                {dnsLinked && (
                  <span className="anim-pop rounded-lg bg-[#040F22] border border-emerald-400/60 text-emerald-300 text-[11px] font-mono font-bold px-2 py-1">
                    A → {IP}
                  </span>
                )}
                <NodeLabel title="Zona DNS" subtitle="registros" icon={<ListTree />} active={act("dns")} />
              </div>
            </Billboard>

            {/* Hosting */}
            <ServerBox x={POS.hosting.x} y={POS.hosting.y} active={act("hosting")} dim={!hostingOn} />
            <Billboard x={POS.hosting.x} y={POS.hosting.y} z={175}>
              <div className="flex flex-col items-center gap-2">
                {sslOn && <Lock className="anim-pop w-8 h-8 text-emerald-400 drop-shadow-[0_0_10px_#34d399]" />}
                <NodeLabel title="Hosting" subtitle={hostingOn ? IP : "sin contratar"} icon={<Server />} active={act("hosting")} />
              </div>
            </Billboard>

            {/* Tu equipo (desarrollo) */}
            <Box3D x={POS.dev.x} y={POS.dev.y} w={110} d={70} h={10} glow={act("dev")} />
            <Billboard x={POS.dev.x} y={POS.dev.y} z={12}>
              <div className="w-[150px] rounded-lg bg-[#040F22] border border-white/15 p-2 font-mono text-[9px] text-emerald-300 shadow-xl">
                <p className="text-slate-500">~/tuempresa-web</p>
                <p>$ git push produccion</p>
                {deployed && <p className="text-[#19C6E6]">✓ publicado</p>}
              </div>
            </Billboard>
            <Billboard x={POS.dev.x} y={POS.dev.y} z={110}>
              <NodeLabel title="Tu equipo" subtitle="código del sitio" icon={<Laptop />} active={act("dev")} />
            </Billboard>

            {/* Visitante */}
            <Billboard x={POS.visitor.x} y={POS.visitor.y} z={2}>
              <BrowserWindow url={s >= 6 ? `https://${DOMAIN}` : DOMAIN} secure={s >= 6 ? true : undefined} width={180}>
                <SitePreview state={s >= 6 ? "full" : "blank"} />
              </BrowserWindow>
            </Billboard>
            <Billboard x={POS.visitor.x} y={POS.visitor.y} z={185}>
              <NodeLabel title="Visitante" subtitle="cualquier lugar" icon={<Globe />} active={act("visitor")} tone={s >= 6 ? "ok" : undefined} />
            </Billboard>

            {cur?.packets?.map((p, i) => (
              <Packet3D key={`${s}-${i}`} from={POS[p.from]} to={POS[p.to]} duration={1500} delay={p.delay} label={p.label} color={p.color} loop={p.loop} />
            ))}
          </Stage3D>
        </div>

        <div className="lab-narration lg:col-span-5 xl:col-span-4 p-5 sm:p-6 min-h-[300px] lg:min-h-0" aria-live="polite">
          <Narration
            stepIndex={s}
            total={STEPS.length}
            title={cur ? cur.title : "Del nombre a la web publicada"}
            text={
              cur
                ? cur.text
                : "¿Qué hay que hacer para que tuempresa.cl muestre tu sitio? Presiona «Comenzar misión» y completa los 7 pasos. En el paso 3 tendrás que configurar el DNS tú mismo."
            }
            tip={cur?.tip}
            code={zoneCode}
            tone={cur?.tone}
          />

          {/* Desafío DNS */}
          {s === 2 && (
            <div className="anim-rise mt-4 rounded-2xl border border-[#19C6E6]/30 bg-[#19C6E6]/5 p-4">
              <p className="text-xs font-mono font-bold text-[#19C6E6] uppercase tracking-wider mb-1">Desafío</p>
              <p className="text-sm text-white font-semibold mb-3">¿Qué registro conecta {DOMAIN} con tu hosting?</p>
              <div className="space-y-2">
                {RECORD_OPTIONS.map((o) => {
                  const picked = choice === o.id;
                  return (
                    <button
                      key={o.id}
                      type="button"
                      disabled={solved}
                      onClick={() => pick(o.id)}
                      className={`w-full flex items-center gap-2 text-left rounded-xl border px-3 py-2.5 font-mono text-[12px] transition-all ${
                        picked && o.ok
                          ? "border-emerald-400 bg-emerald-500/15 text-emerald-200"
                          : picked
                            ? "border-rose-400 bg-rose-500/10 text-rose-200"
                            : "border-white/15 bg-white/[0.03] text-slate-200 hover:border-[#19C6E6]/60 disabled:opacity-50"
                      }`}
                    >
                      {picked && (o.ok ? <CheckCircle2 className="w-4 h-4 shrink-0" /> : <XCircle className="w-4 h-4 shrink-0" />)}
                      {o.record}
                    </button>
                  );
                })}
              </div>
              {chosen && <p className={`anim-rise text-xs mt-3 ${chosen.ok ? "text-emerald-300" : "text-rose-200"}`}>{chosen.why}</p>}
              {solved && (
                <button type="button" onClick={player.play} className="anim-pop mt-3 inline-flex items-center gap-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-[#040F22] text-xs font-bold px-3 py-2">
                  Continuar la misión →
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="px-5 sm:px-6 py-4 lg:py-3 border-t border-white/10">
        <StepTimeline steps={STEPS.map((x) => ({ title: x.title }))} current={s} onSelect={player.goto} />
      </div>
    </div>
  );
};
