"use client";

import React, { useState } from "react";
import { Laptop, Wifi, Server, Eye, ShieldCheck, ShieldAlert, KeyRound } from "lucide-react";
import { Stage3D, Box3D, Billboard, FloorLinks, Packet3D, NodeLabel, type Point } from "../stage3d";
import { ServerBox, BrowserWindow } from "../props3d";
import { useStepPlayer, ScenarioPicker, PlayerControls, StepTimeline, Narration, type CodeSnippet } from "../lab-ui";

type NodeId = "you" | "wifi" | "server" | "spy";

const POS: Record<NodeId, Point> = {
  you: { x: 120, y: 360 },
  wifi: { x: 400, y: 250 },
  server: { x: 700, y: 140 },
  spy: { x: 600, y: 440 },
};

const OK = "#34d399";
const BAD = "#fb923c";

type SpyView = "idle" | "plain" | "cipher" | "handshake";

interface Step {
  title: string;
  text: string;
  tip?: string;
  active: NodeId[];
  packets?: { from: NodeId; to: NodeId; label: string; color?: string; delay?: number }[];
  spy: SpyView;
  code?: CodeSnippet;
  tone?: "ok" | "error";
  spyTone?: "error" | "ok";
}

const HTTP_STEPS: Step[] = [
  {
    title: "Te conectas a un Wi-Fi público",
    text: "Estás en un café y entras a una tienda que todavía usa http:// (sin candado). Escribes tu correo y contraseña para iniciar sesión.",
    active: ["you"],
    spy: "idle",
    code: { label: "FORMULARIO", tone: "error", content: "http://tienda-ejemplo.cl/login\ncorreo:     ana@correo.cl\ncontraseña: MiClave123" },
  },
  {
    title: "Los datos viajan en texto plano",
    text: "Sin cifrado, tu contraseña viaja tal cual la escribiste, pasando por el router del café y por varios equipos de internet antes de llegar a la tienda.",
    active: ["you", "wifi"],
    packets: [{ from: "you", to: "wifi", label: "clave=MiClave123", color: BAD }],
    spy: "idle",
  },
  {
    title: "Alguien en la misma red lo lee todo",
    text: "Cualquier persona conectada al mismo Wi-Fi con herramientas sencillas puede «escuchar» el tráfico. Como no está cifrado, ve tu contraseña completa.",
    active: ["wifi", "spy"],
    packets: [
      { from: "wifi", to: "spy", label: "copia 👀", color: BAD },
      { from: "wifi", to: "server", label: "clave=MiClave123", color: BAD, delay: 300 },
    ],
    spy: "plain",
    spyTone: "error",
    tone: "error",
    code: { label: "LO QUE VE EL ESPÍA", tone: "error", content: "POST /login HTTP/1.1\nHost: tienda-ejemplo.cl\n\ncorreo=ana@correo.cl&clave=MiClave123" },
  },
  {
    title: "Resultado: cuenta comprometida",
    text: "El servidor recibió los datos, pero también el espía. Con esa contraseña puede entrar a tu cuenta (y a otras, si reutilizas la misma clave).",
    active: ["spy", "server"],
    spy: "plain",
    spyTone: "error",
    tone: "error",
    tip: "Por eso los navegadores marcan estos sitios como «No seguro». Hoy ninguna web debería funcionar sin HTTPS.",
  },
];

const HTTPS_STEPS: Step[] = [
  {
    title: "Entras a un sitio con candado",
    text: "Mismo café, mismo Wi-Fi, pero ahora la tienda usa https:// y el navegador muestra el candado 🔒.",
    active: ["you"],
    spy: "idle",
  },
  {
    title: "Saludo: «¿quién eres?»",
    text: "Antes de enviar nada privado, tu navegador saluda al servidor y le pide que demuestre su identidad.",
    active: ["you", "server"],
    packets: [{ from: "you", to: "server", label: "Hola · ¿quién eres?" }],
    spy: "handshake",
  },
  {
    title: "El servidor muestra su certificado",
    text: "El servidor envía su certificado digital, firmado por una autoridad reconocida. El navegador comprueba que sea válido y que corresponda a ese dominio.",
    active: ["server", "you"],
    packets: [{ from: "server", to: "you", label: "Certificado ✓", color: OK }],
    spy: "handshake",
    code: { label: "CERTIFICADO", tone: "ok", content: "Emitido para: tienda-ejemplo.cl\nEmisor:       Let's Encrypt\nVálido:       sí ✓ (hasta mar 2027)" },
  },
  {
    title: "Acuerdan una llave secreta",
    text: "Con matemáticas ingeniosas, ambos crean una llave secreta compartida sin enviarla nunca completa por la red. El espía ve el intercambio, pero no puede deducir la llave.",
    active: ["you", "server"],
    packets: [
      { from: "you", to: "server", label: "🔑 parte A" },
      { from: "server", to: "you", label: "🔑 parte B", delay: 800 },
    ],
    spy: "handshake",
    tip: "Este intercambio se llama Diffie-Hellman y protege a casi todo internet.",
  },
  {
    title: "Tu contraseña viaja cifrada",
    text: "Ahora los datos salen de tu equipo cifrados con la llave secreta. El espía puede copiarlos, pero solo ve un montón de caracteres sin sentido.",
    active: ["you", "wifi", "spy"],
    packets: [
      { from: "you", to: "wifi", label: "x9#Fq2!…", color: OK },
      { from: "wifi", to: "spy", label: "copia 👀", color: "#64748b", delay: 1500 },
      { from: "wifi", to: "server", label: "x9#Fq2!…", color: OK, delay: 1500 },
    ],
    spy: "cipher",
    spyTone: "ok",
    code: { label: "LO QUE VE EL ESPÍA", tone: "ok", content: "17 03 03 00 4a 9f e1 2c 7b\nd4 88 0a f3 5e c1 77 92 3b\n(contenido ilegible)" },
  },
  {
    title: "Solo el servidor puede leerla",
    text: "El servidor usa la misma llave para descifrar y verificar tu contraseña. Tus datos llegaron intactos y nadie más pudo leerlos ni modificarlos.",
    active: ["server"],
    spy: "cipher",
    spyTone: "ok",
    tone: "ok",
    tip: "HTTPS protege lo que viaja. Además, las contraseñas deben guardarse cifradas (hash) en la base de datos.",
  },
];

const SpyScreen: React.FC<{ view: SpyView }> = ({ view }) => (
  <div className="w-[170px] rounded-lg bg-black border border-white/20 p-2 font-mono text-[9px] leading-snug shadow-xl">
    <p className="text-slate-500 mb-1">captura_wifi.log</p>
    {view === "idle" && <p className="text-slate-500">esperando tráfico…<span className="animate-caret">▌</span></p>}
    {view === "handshake" && <p className="text-slate-400">saludo TLS detectado<br />llave: ???</p>}
    {view === "plain" && (
      <p className="anim-pop text-rose-400 font-bold">
        correo=ana@correo.cl
        <br />
        clave=MiClave123
      </p>
    )}
    {view === "cipher" && (
      <p className="anim-pop text-slate-400 break-all">
        9fe12c7bd4880af35ec17792 3b0e…
        <br />
        <span className="text-emerald-400">¿?¿? ilegible</span>
      </p>
    )}
  </div>
);

export const SecurityLab: React.FC = () => {
  const [mode, setMode] = useState<"http" | "https">("http");
  const steps = mode === "http" ? HTTP_STEPS : HTTPS_STEPS;
  const player = useStepPlayer(steps.length, 3200);
  const cur = player.step >= 0 ? steps[player.step] : null;
  const act = (n: NodeId) => !!cur?.active.includes(n);
  const secure = mode === "https";

  return (
    <div className="lab-frame rounded-[2rem] bg-gradient-to-b from-[#0A1E3B] to-[#071A35] border border-white/10 shadow-2xl shadow-[#071A35]/40 overflow-hidden">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 p-5 sm:p-6 lg:py-4 border-b border-white/10">
        <ScenarioPicker
          label="Compara"
          options={[
            { id: "http", label: "Sitio sin candado", hint: "http://", tone: "error" },
            { id: "https", label: "Sitio seguro", hint: "https:// 🔒", tone: "ok" },
          ]}
          value={mode}
          onChange={(id) => {
            setMode(id as "http" | "https");
            player.reset();
          }}
        />
        <PlayerControls player={player} total={steps.length} playLabel="Iniciar sesión" />
      </div>

      <div className="lab-main grid grid-cols-1 lg:grid-cols-12">
        <div className="lab-stage lg:col-span-7 xl:col-span-8 relative border-b lg:border-b-0 lg:border-r border-white/10">
          <Stage3D label="Escena 3D: una persona envía su contraseña por un Wi-Fi público donde un espía intenta leer los datos; con HTTPS los ve cifrados">
            <FloorLinks
              links={[
                { from: POS.you, to: POS.wifi, active: act("wifi") || act("you"), color: secure ? OK : BAD },
                { from: POS.wifi, to: POS.server, active: act("server"), color: secure ? OK : BAD },
                { from: POS.wifi, to: POS.spy, active: act("spy"), color: "#fb7185", bend: 0.15 },
              ]}
            />

            {/* Tú */}
            <Billboard x={POS.you.x} y={POS.you.y} z={2}>
              <BrowserWindow url={secure ? "tienda-ejemplo.cl" : "tienda-ejemplo.cl/login"} secure={secure ? true : "insecure"} width={180}>
                <div className="space-y-1.5 pt-1">
                  <p className="text-[9px] font-bold text-[#071A35]">Iniciar sesión</p>
                  <span className="block h-4 rounded border border-slate-300 text-[8px] text-slate-500 px-1 leading-4">ana@correo.cl</span>
                  <span className="block h-4 rounded border border-slate-300 text-[8px] text-slate-500 px-1 leading-4">••••••••••</span>
                  <span className="block h-4 rounded bg-[#1479D4] text-[8px] text-white font-bold text-center leading-4">Entrar</span>
                </div>
              </BrowserWindow>
            </Billboard>
            <Billboard x={POS.you.x} y={POS.you.y} z={200}>
              <NodeLabel title="Tú" subtitle="notebook en el café" icon={<Laptop />} active={act("you")} />
            </Billboard>

            {/* Wi-Fi */}
            <Box3D x={POS.wifi.x} y={POS.wifi.y} w={80} d={60} h={26} top="#334155" front="#1E293B" side="#0F172A" glow={act("wifi")} />
            <Billboard x={POS.wifi.x} y={POS.wifi.y} z={40}>
              <NodeLabel title="Wi-Fi del café" subtitle="red pública" icon={<Wifi />} active={act("wifi")} />
            </Billboard>

            {/* Servidor */}
            <ServerBox x={POS.server.x} y={POS.server.y} active={act("server")} tone={cur?.tone === "ok" && act("server") ? "ok" : undefined} />
            <Billboard x={POS.server.x} y={POS.server.y} z={180}>
              <div className="flex flex-col items-center gap-2">
                {secure && player.step >= 2 && <ShieldCheck className="anim-pop w-8 h-8 text-emerald-400 drop-shadow-[0_0_10px_#34d399]" />}
                <NodeLabel title="Tienda online" subtitle={secure ? "https 🔒" : "http"} icon={<Server />} active={act("server")} />
              </div>
            </Billboard>

            {/* Espía */}
            <Billboard x={POS.spy.x} y={POS.spy.y} z={2}>
              <SpyScreen view={cur?.spy ?? "idle"} />
            </Billboard>
            <Billboard x={POS.spy.x} y={POS.spy.y} z={150}>
              <div className="flex flex-col items-center gap-2">
                {cur?.spyTone === "error" && <ShieldAlert className="anim-pop w-8 h-8 text-rose-400 drop-shadow-[0_0_10px_#fb7185]" />}
                {cur?.spyTone === "ok" && <KeyRound className="anim-pop w-8 h-8 text-emerald-400 drop-shadow-[0_0_10px_#34d399]" />}
                <NodeLabel title="Espía" subtitle="en la misma red" icon={<Eye />} active={act("spy")} tone={cur?.spyTone === "error" ? "error" : undefined} />
              </div>
            </Billboard>

            {cur?.packets?.map((p, i) => (
              <Packet3D key={`${mode}-${player.step}-${i}`} from={POS[p.from]} to={POS[p.to]} duration={1500} delay={p.delay} label={p.label} color={p.color} />
            ))}
          </Stage3D>
        </div>

        <div className="lab-narration lg:col-span-5 xl:col-span-4 p-5 sm:p-6 min-h-[300px] lg:min-h-0" aria-live="polite">
          <Narration
            stepIndex={player.step}
            total={steps.length}
            title={cur ? cur.title : secure ? "Ahora con HTTPS" : "¿Qué tan seguro es un Wi-Fi público?"}
            text={
              cur
                ? cur.text
                : secure
                  ? "Repite la misma situación, pero en un sitio con HTTPS. Observa qué ve el espía esta vez."
                  : "Presiona «Iniciar sesión» para enviar una contraseña desde un café. Luego compara con un sitio seguro (HTTPS)."
            }
            tip={cur?.tip}
            code={cur?.code}
            tone={cur?.tone}
          />
        </div>
      </div>

      <div className="px-5 sm:px-6 py-4 lg:py-3 border-t border-white/10">
        <StepTimeline steps={steps.map((x) => ({ title: x.title, tone: x.tone === "error" ? "error" : undefined }))} current={player.step} onSelect={player.goto} />
      </div>
    </div>
  );
};
