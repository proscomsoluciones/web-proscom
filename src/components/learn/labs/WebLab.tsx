"use client";

import React, { useState } from "react";
import { Globe, BookMarked, Server, Zap, Lock } from "lucide-react";
import { Stage3D, Box3D, Billboard, FloorLinks, Packet3D, NodeLabel, type Point } from "../stage3d";
import { ServerBox, BrowserWindow, SitePreview } from "../props3d";
import { useStepPlayer, ScenarioPicker, PlayerControls, StepTimeline, Narration, type CodeSnippet } from "../lab-ui";

type NodeId = "browser" | "dns" | "server";

interface Packet {
  from: NodeId;
  to: NodeId;
  label: string;
  color?: string;
  delay?: number;
  loop?: boolean;
}

interface Step {
  title: string;
  text: string;
  tip?: string;
  active: NodeId[];
  packets?: Packet[];
  code?: CodeSnippet;
  url: string;
  typing?: boolean;
  page: "blank" | "html" | "full";
  loading?: boolean;
  secure?: boolean;
  ms: number;
  tone?: "ok";
}

const POS: Record<NodeId, Point> = {
  browser: { x: 130, y: 380 },
  dns: { x: 380, y: 110 },
  server: { x: 700, y: 280 },
};

const OK = "#34d399";
const URL = "www.tuempresa.cl";

const FIRST: Step[] = [
  {
    title: "Escribes la dirección",
    text: "Todo empieza cuando escribes un dominio en el navegador. Un dominio es un nombre fácil de recordar, pero las computadoras no se ubican por nombres: necesitan un número llamado dirección IP.",
    active: ["browser"],
    url: URL,
    typing: true,
    page: "blank",
    ms: 0,
    code: { label: "PARTES DEL DOMINIO", content: "www          → subdominio\ntuempresa    → nombre registrado\n.cl          → extensión (Chile)" },
  },
  {
    title: "El navegador consulta al DNS",
    text: "El navegador le pregunta al DNS: «¿cuál es la IP de tuempresa.cl?». El DNS funciona como la guía telefónica de internet: traduce nombres a números.",
    active: ["browser", "dns"],
    packets: [{ from: "browser", to: "dns", label: "¿IP de tuempresa.cl?" }],
    url: URL,
    page: "blank",
    loading: true,
    ms: 20,
    code: { label: "CONSULTA DNS", content: "Tipo: A\nNombre: www.tuempresa.cl\n¿Respuesta? ..." },
  },
  {
    title: "El DNS responde con la IP",
    text: "El DNS contesta con la dirección IP del servidor donde está alojada la web. Ahora el navegador sabe a dónde ir.",
    active: ["dns", "browser"],
    packets: [{ from: "dns", to: "browser", label: "203.0.113.10", color: OK }],
    url: URL,
    page: "blank",
    loading: true,
    ms: 45,
    code: { label: "RESPUESTA DNS", tone: "ok", content: "www.tuempresa.cl.  3600  IN  A  203.0.113.10\n# 3600 = segundos que se puede recordar (TTL)" },
    tip: "La IP 203.0.113.10 es un ejemplo reservado para documentación; cada sitio tiene la suya.",
  },
  {
    title: "Se abre una conexión segura",
    text: "Antes de pedir la página, el navegador y el servidor se «saludan» y acuerdan cómo cifrar la conversación (TLS). Así aparece el candado 🔒 en la barra.",
    active: ["browser", "server"],
    packets: [
      { from: "browser", to: "server", label: "🔒 Hola (TLS)" },
      { from: "server", to: "browser", label: "Certificado ✓", color: OK, delay: 900 },
    ],
    url: URL,
    page: "blank",
    loading: true,
    secure: true,
    ms: 110,
    code: { label: "SALUDO TLS", content: "Cliente:  Hola, hablo TLS 1.3\nServidor: Hola, aquí está mi certificado\nCliente:  Certificado válido para tuempresa.cl ✓\n→ Conexión cifrada lista" },
  },
  {
    title: "El navegador pide la página",
    text: "Con la conexión lista, el navegador envía una solicitud HTTP pidiendo la página de inicio (la ruta «/»).",
    active: ["browser", "server"],
    packets: [{ from: "browser", to: "server", label: "GET /" }],
    url: URL,
    page: "blank",
    loading: true,
    secure: true,
    ms: 140,
    code: { label: "SOLICITUD HTTP", content: "GET / HTTP/2\nHost: www.tuempresa.cl\nAccept: text/html\nUser-Agent: Chrome/…" },
  },
  {
    title: "El servidor responde con HTML",
    text: "El servidor encuentra la página y responde con HTML: el «esqueleto» con los textos y la estructura. El navegador empieza a dibujarla de inmediato.",
    active: ["server", "browser"],
    packets: [{ from: "server", to: "browser", label: "200 OK · HTML", color: OK }],
    url: URL,
    page: "html",
    loading: true,
    secure: true,
    ms: 260,
    code: { label: "RESPUESTA HTTP", tone: "ok", content: "HTTP/2 200 OK\nContent-Type: text/html\nCache-Control: max-age=600\n\n<!doctype html>\n<html> ... </html>" },
  },
  {
    title: "Llegan estilos, scripts e imágenes",
    text: "El HTML indica qué otros archivos necesita: estilos (CSS) para el diseño, scripts (JS) para la interactividad e imágenes. El navegador los pide en paralelo.",
    active: ["server", "browser"],
    packets: [
      { from: "server", to: "browser", label: "CSS", color: "#C792EA", loop: true },
      { from: "server", to: "browser", label: "JS", color: "#fbbf24", delay: 450, loop: true },
      { from: "server", to: "browser", label: "IMG", color: OK, delay: 900, loop: true },
    ],
    url: URL,
    page: "html",
    loading: true,
    secure: true,
    ms: 640,
    code: { label: "DESCARGAS", content: "estilos.css     18 KB   ██░░░░  90 ms\napp.js          42 KB   ████░░ 160 ms\nportada.webp    95 KB   █████░ 210 ms\nlogo.svg         3 KB   █░░░░░  30 ms" },
  },
  {
    title: "¡La página está lista!",
    text: "El navegador combina todo y muestra la página completa. Este viaje tomó menos de un segundo. Un sitio bien optimizado reduce cada uno de estos pasos.",
    active: ["browser"],
    url: URL,
    page: "full",
    secure: true,
    ms: 820,
    tone: "ok",
    tip: "Google mide esta velocidad (Core Web Vitals) y la usa para ordenar los resultados de búsqueda.",
  },
];

const CACHED: Step[] = [
  {
    title: "Vuelves a entrar al sitio",
    text: "Escribes la misma dirección que ya visitaste hace un rato.",
    active: ["browser"],
    url: URL,
    typing: true,
    page: "blank",
    ms: 0,
  },
  {
    title: "La IP ya está en memoria",
    text: "El navegador recuerda la IP de la visita anterior (caché DNS), así que no necesita preguntarle al DNS. Se ahorra un viaje completo.",
    active: ["browser"],
    url: URL,
    page: "blank",
    loading: true,
    secure: true,
    ms: 1,
    code: { label: "CACHÉ DNS", tone: "ok", content: "www.tuempresa.cl → 203.0.113.10\n(guardado hace 4 min, válido 60 min)" },
  },
  {
    title: "Pregunta si algo cambió",
    text: "El navegador pide la página, pero avisa qué versión ya tiene guardada. Si nada cambió, el servidor no necesita enviar todo de nuevo.",
    active: ["browser", "server"],
    packets: [{ from: "browser", to: "server", label: "GET / · ¿cambió?" }],
    url: URL,
    page: "blank",
    loading: true,
    secure: true,
    ms: 60,
    code: { label: "SOLICITUD CONDICIONAL", content: 'GET / HTTP/2\nIf-None-Match: "v42"' },
  },
  {
    title: "«No ha cambiado»",
    text: "El servidor responde 304: «usa lo que ya tienes». Es una respuesta mínima y muy rápida.",
    active: ["server", "browser"],
    packets: [{ from: "server", to: "browser", label: "304 Not Modified", color: OK }],
    url: URL,
    page: "html",
    loading: true,
    secure: true,
    ms: 120,
    code: { label: "RESPUESTA HTTP", tone: "ok", content: 'HTTP/2 304 Not Modified\nETag: "v42"\n# Sin contenido: se reutiliza la copia local' },
  },
  {
    title: "Página casi instantánea",
    text: "Estilos, scripts e imágenes salen de la memoria del navegador. La página aparece en una fracción del tiempo de la primera visita.",
    active: ["browser"],
    url: URL,
    page: "full",
    secure: true,
    ms: 240,
    tone: "ok",
    tip: "Configurar bien la caché es una de las mejoras de velocidad más baratas que existen.",
  },
];

export const WebLab: React.FC = () => {
  const [scenario, setScenario] = useState<"first" | "cached">("first");
  const steps = scenario === "first" ? FIRST : CACHED;
  const player = useStepPlayer(steps.length, 3000);
  const cur = player.step >= 0 ? steps[player.step] : null;
  const act = (n: NodeId) => !!cur?.active.includes(n);
  const usesPair = (a: NodeId, b: NodeId) => !!cur?.packets?.some((p) => (p.from === a && p.to === b) || (p.from === b && p.to === a));

  return (
    <div className="lab-frame rounded-[2rem] bg-gradient-to-b from-[#0A1E3B] to-[#071A35] border border-white/10 shadow-2xl shadow-[#071A35]/40 overflow-hidden">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 p-5 sm:p-6 lg:py-4 border-b border-white/10">
        <ScenarioPicker
          options={[
            { id: "first", label: "Primera visita", hint: "≈ 0,82 s", tone: "info" },
            { id: "cached", label: "Visita repetida (caché)", hint: "≈ 0,24 s", tone: "ok" },
          ]}
          value={scenario}
          onChange={(id) => {
            setScenario(id as "first" | "cached");
            player.reset();
          }}
        />
        <PlayerControls player={player} total={steps.length} playLabel="Abrir la página" />
      </div>

      <div className="lab-main grid grid-cols-1 lg:grid-cols-12">
        <div className="lab-stage lg:col-span-7 xl:col-span-8 relative border-b lg:border-b-0 lg:border-r border-white/10">
          <Stage3D label="Escena 3D: un navegador consulta al DNS la dirección IP y luego descarga la página desde el servidor web">
            <FloorLinks
              links={[
                { from: POS.browser, to: POS.dns, bend: -0.15, active: usesPair("browser", "dns") },
                { from: POS.browser, to: POS.server, bend: 0.1, active: usesPair("browser", "server") },
              ]}
            />

            {/* Navegador */}
            <div
              className={`absolute rounded-full border-2 transition-all duration-500 ${act("browser") ? "border-[#19C6E6] shadow-[0_0_30px_rgba(25,198,230,0.8)]" : "border-[#19C6E6]/30"}`}
              style={{ left: POS.browser.x - 80, top: POS.browser.y - 80, width: 160, height: 160, transform: "translateZ(1px)" }}
            />
            <Billboard x={POS.browser.x} y={POS.browser.y} z={2}>
              <BrowserWindow url={cur?.url ?? URL} typing={cur?.typing ?? true} secure={cur?.secure} loading={cur?.loading}>
                <SitePreview state={cur?.page ?? "blank"} />
              </BrowserWindow>
            </Billboard>
            <Billboard x={POS.browser.x} y={POS.browser.y} z={200}>
              <NodeLabel title="Tu navegador" subtitle="Chrome, Safari…" icon={<Globe />} active={act("browser")} tone={cur?.tone === "ok" && act("browser") ? "ok" : undefined} />
            </Billboard>

            {/* DNS */}
            <Box3D x={POS.dns.x} y={POS.dns.y} w={110} d={90} h={70} top="#8B5CF6" front="#6D28D9" side="#5B21B6" glow={act("dns")} dim={scenario === "cached"} />
            <Billboard x={POS.dns.x} y={POS.dns.y} z={110}>
              <NodeLabel title="Servidor DNS" subtitle="guía de internet" icon={<BookMarked />} active={act("dns")} />
            </Billboard>

            {/* Servidor web */}
            <ServerBox x={POS.server.x} y={POS.server.y} active={act("server")} />
            <Billboard x={POS.server.x} y={POS.server.y} z={180}>
              <div className="flex flex-col items-center gap-2">
                {cur?.secure && act("server") && <Lock className="anim-pop w-8 h-8 text-emerald-400 drop-shadow-[0_0_10px_#34d399]" />}
                <NodeLabel title="Servidor web" subtitle="203.0.113.10" icon={<Server />} active={act("server")} />
              </div>
            </Billboard>

            {scenario === "cached" && (
              <Billboard x={POS.browser.x + 110} y={POS.browser.y - 40} z={150}>
                <span className="inline-flex items-center gap-1 rounded-full bg-amber-400 text-[#040F22] text-[12px] font-bold px-2.5 py-1 shadow-[0_0_16px_#fbbf24]">
                  <Zap className="w-3.5 h-3.5" /> Caché
                </span>
              </Billboard>
            )}

            {cur?.packets?.map((p, i) => (
              <Packet3D
                key={`${scenario}-${player.step}-${i}`}
                from={POS[p.from]}
                to={POS[p.to]}
                duration={1600}
                delay={p.delay}
                label={p.label}
                color={p.color}
                loop={p.loop}
              />
            ))}
          </Stage3D>

          {/* Cronómetro */}
          <div className="absolute right-4 top-4 rounded-xl bg-[#040F22]/90 border border-white/10 px-3 py-2 text-right">
            <p className="text-[9px] font-mono uppercase tracking-wider text-slate-400">Tiempo transcurrido</p>
            <p className="text-lg font-extrabold font-mono text-[#19C6E6] tabular-nums">{cur ? `${cur.ms} ms` : "0 ms"}</p>
          </div>
        </div>

        <div className="lab-narration lg:col-span-5 xl:col-span-4 p-5 sm:p-6 min-h-[300px] lg:min-h-0" aria-live="polite">
          <Narration
            stepIndex={player.step}
            total={steps.length}
            title={cur ? cur.title : "¿Qué pasa cuando abres una página web?"}
            text={
              cur
                ? cur.text
                : "Presiona «Abrir la página» y sigue el viaje: del nombre del sitio a la dirección IP, la conexión segura y la descarga de cada archivo. Compara luego con una visita repetida."
            }
            tip={cur?.tip}
            code={cur?.code}
          />
        </div>
      </div>

      <div className="px-5 sm:px-6 py-4 lg:py-3 border-t border-white/10">
        <StepTimeline steps={steps.map((s) => ({ title: s.title }))} current={player.step} onSelect={player.goto} />
      </div>
    </div>
  );
};
