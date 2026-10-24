"use client";

import React, { useMemo, useState } from "react";
import {
  Smartphone,
  Server,
  Database,
  User,
  ConciergeBell,
  ChefHat,
  ShieldCheck,
  ShieldX,
  Loader2,
  ShoppingBag,
  CheckCircle2,
  SearchX,
  Lock,
  UtensilsCrossed,
} from "lucide-react";
import { Stage3D, Box3D, Billboard, FloorLinks, Packet3D, NodeLabel, type Point } from "../stage3d";
import {
  useStepPlayer,
  ScenarioPicker,
  PlayerControls,
  StepTimeline,
  Narration,
  Toggle,
  type CodeSnippet,
} from "../lab-ui";

/* -------------------------------------------------------------------------- */
/*  Escenario                                                                  */
/* -------------------------------------------------------------------------- */
type NodeId = "app" | "api" | "db";
type Phone = "idle" | "loading" | "list" | "created" | "notfound" | "unauthorized";
type Tone = "ok" | "error" | "warn";

interface Step {
  title: string;
  text: string;
  analogy: string;
  tip?: string;
  active: NodeId[];
  tones?: Partial<Record<NodeId, Tone>>;
  packet?: { from: NodeId; to: NodeId; label: string; analogyLabel: string; color?: string };
  code?: CodeSnippet;
  phone: Phone;
  tone?: "ok" | "error";
  skipDb?: boolean;
}

const POS: Record<NodeId, Point> = {
  app: { x: 120, y: 400 },
  api: { x: 470, y: 150 },
  db: { x: 720, y: 340 },
};

const OK = "#34d399";
const ERR = "#fb7185";

const SCENARIOS: Record<string, Step[]> = {
  get: [
    {
      title: "La app pide información",
      text: "Al abrir la sección «Productos», la app arma una solicitud: un mensaje con el método (GET = «quiero leer»), la dirección del recurso (/api/productos) y una llave de acceso (token).",
      analogy: "Tú eres el cliente del restaurante. Miras la carta y decides qué quieres: «¿qué postres tienen hoy?». Todavía no hablas con la cocina.",
      active: ["app"],
      phone: "loading",
      code: { label: "SOLICITUD HTTP", content: "GET /api/productos HTTP/1.1\nHost: api.tuempresa.cl\nAuthorization: Bearer eyJhbGci...\nAccept: application/json" },
    },
    {
      title: "La solicitud viaja por internet",
      text: "El mensaje sale del teléfono y viaja por internet hasta el servidor donde vive la API. Normalmente tarda unos pocos milisegundos.",
      analogy: "Llamas al mesero y le haces el pedido. Él es el único intermediario: tú nunca entras a la cocina.",
      active: ["app", "api"],
      packet: { from: "app", to: "api", label: "GET /api/productos", analogyLabel: "«¿Qué postres hay?»" },
      phone: "loading",
    },
    {
      title: "La API valida la solicitud",
      text: "Antes de hacer nada, la API revisa: ¿la llave (token) es válida?, ¿existe esa ruta?, ¿este usuario tiene permiso? Este control protege los datos de la empresa.",
      analogy: "El mesero revisa que lo que pediste esté en la carta y que tengas una mesa asignada.",
      active: ["api"],
      tones: { api: "ok" },
      phone: "loading",
      code: { label: "VALIDACIÓN", tone: "ok", content: "✓ Token válido (usuario: ana@tuempresa.cl)\n✓ Ruta encontrada: /api/productos\n✓ Método permitido: GET\n✓ Límite de uso: 12 / 1000 solicitudes" },
      tip: "Una buena API nunca confía en la app: valida todo en el servidor, aunque la app ya lo haya revisado.",
    },
    {
      title: "La API consulta la base de datos",
      text: "La API traduce la solicitud a una consulta que la base de datos entiende (SQL) y pide solo los datos necesarios.",
      analogy: "El mesero lleva el pedido a la cocina en el formato que el chef entiende: una comanda.",
      active: ["api", "db"],
      packet: { from: "api", to: "db", label: "SELECT productos", analogyLabel: "Comanda" },
      phone: "loading",
      code: { label: "CONSULTA SQL", content: "SELECT id, nombre, precio\nFROM productos\nWHERE activo = true\nLIMIT 3;" },
    },
    {
      title: "La base de datos responde",
      text: "La base de datos busca la información y devuelve las filas encontradas a la API.",
      analogy: "La cocina prepara los platos y los deja listos para que el mesero los retire.",
      active: ["db", "api"],
      tones: { db: "ok" },
      packet: { from: "db", to: "api", label: "3 filas", analogyLabel: "Platos listos", color: OK },
      phone: "loading",
      code: { label: "RESULTADO", tone: "ok", content: "id | nombre          | precio\n 1 | Café de grano    | 8990\n 2 | Taza cerámica    | 6490\n 3 | Prensa francesa  | 21990" },
    },
    {
      title: "La API envía la respuesta",
      text: "La API empaqueta los datos en formato JSON y responde con un código de estado: 200 significa «todo salió bien».",
      analogy: "El mesero te trae los platos a la mesa, ordenados y presentados.",
      active: ["api", "app"],
      tones: { api: "ok" },
      packet: { from: "api", to: "app", label: "200 OK · JSON", analogyLabel: "¡Aquí tiene!", color: OK },
      phone: "loading",
      code: { label: "RESPUESTA 200 OK", tone: "ok", content: '{\n  "total": 3,\n  "productos": [\n    { "id": 1, "nombre": "Café de grano", "precio": 8990 },\n    { "id": 2, "nombre": "Taza cerámica", "precio": 6490 },\n    { "id": 3, "nombre": "Prensa francesa", "precio": 21990 }\n  ]\n}' },
    },
    {
      title: "La app muestra la información",
      text: "La app lee el JSON y lo convierte en una pantalla amigable. Todo el viaje de ida y vuelta tomó cerca de 120 milisegundos.",
      analogy: "Disfrutas tu pedido sin saber cómo funciona la cocina. Eso es justamente lo bueno de una API.",
      active: ["app"],
      tones: { app: "ok" },
      phone: "list",
      tone: "ok",
      tip: "La misma API puede atender a la app móvil, al sitio web y a otros sistemas al mismo tiempo.",
    },
  ],
  post: [
    {
      title: "La app quiere crear un pedido",
      text: "Esta vez la app no solo lee: quiere guardar algo nuevo. Usa el método POST e incluye los datos del pedido en el «cuerpo» del mensaje.",
      analogy: "Ya no preguntas qué hay: haces un pedido concreto. «Quiero 3 cafés, por favor».",
      active: ["app"],
      phone: "loading",
      code: { label: "SOLICITUD HTTP", content: 'POST /api/pedidos HTTP/1.1\nAuthorization: Bearer eyJhbGci...\nContent-Type: application/json\n\n{ "producto_id": 1, "cantidad": 3 }' },
    },
    {
      title: "La solicitud viaja a la API",
      text: "El pedido viaja cifrado por internet hasta la API.",
      analogy: "El mesero anota tu pedido.",
      active: ["app", "api"],
      packet: { from: "app", to: "api", label: "POST /api/pedidos", analogyLabel: "«3 cafés»" },
      phone: "loading",
    },
    {
      title: "La API valida los datos",
      text: "Además del token, la API revisa que los datos tengan sentido: que el producto exista, que la cantidad sea un número positivo y que haya stock.",
      analogy: "El mesero confirma que quedan cafés y que tu pedido es razonable.",
      active: ["api"],
      tones: { api: "ok" },
      phone: "loading",
      code: { label: "VALIDACIÓN", tone: "ok", content: "✓ Token válido\n✓ producto_id 1 existe\n✓ cantidad 3 (> 0)\n✓ Stock disponible: 40 unidades" },
    },
    {
      title: "La API guarda en la base de datos",
      text: "La API inserta un registro nuevo en la tabla de pedidos.",
      analogy: "La comanda llega a la cocina y queda registrada.",
      active: ["api", "db"],
      packet: { from: "api", to: "db", label: "INSERT pedido", analogyLabel: "Comanda" },
      phone: "loading",
      code: { label: "CONSULTA SQL", content: "INSERT INTO pedidos (producto_id, cantidad, estado)\nVALUES (1, 3, 'confirmado');" },
    },
    {
      title: "La base de datos confirma",
      text: "La base de datos guarda el pedido y le asigna un número único.",
      analogy: "La cocina confirma: «pedido número 1045 en preparación».",
      active: ["db", "api"],
      tones: { db: "ok" },
      packet: { from: "db", to: "api", label: "id: 1045", analogyLabel: "N° 1045", color: OK },
      phone: "loading",
    },
    {
      title: "La API responde «Creado»",
      text: "El código 201 significa «se creó un recurso nuevo». La respuesta incluye el número de pedido.",
      analogy: "El mesero vuelve y te confirma tu número de pedido.",
      active: ["api", "app"],
      tones: { api: "ok" },
      packet: { from: "api", to: "app", label: "201 Created", analogyLabel: "¡Confirmado!", color: OK },
      phone: "loading",
      code: { label: "RESPUESTA 201 CREATED", tone: "ok", content: '{\n  "id": 1045,\n  "estado": "confirmado",\n  "total": 26970\n}' },
    },
    {
      title: "La app confirma al usuario",
      text: "La app muestra el pedido confirmado. Si otra persona revisa el panel de administración, ya verá el pedido 1045.",
      analogy: "Tienes tu comprobante en la mano.",
      active: ["app"],
      tones: { app: "ok" },
      phone: "created",
      tone: "ok",
    },
  ],
  notfound: [
    {
      title: "La app pide un producto específico",
      text: "La app solicita el producto con id 999, por ejemplo desde un enlace antiguo.",
      analogy: "Pides un plato que viste en una carta de hace años.",
      active: ["app"],
      phone: "loading",
      code: { label: "SOLICITUD HTTP", content: "GET /api/productos/999 HTTP/1.1\nAuthorization: Bearer eyJhbGci..." },
    },
    {
      title: "La solicitud viaja a la API",
      text: "El mensaje llega a la API como cualquier otro.",
      analogy: "Se lo pides al mesero.",
      active: ["app", "api"],
      packet: { from: "app", to: "api", label: "GET /productos/999", analogyLabel: "«El plato 999»" },
      phone: "loading",
    },
    {
      title: "La API valida la solicitud",
      text: "El token es válido y la ruta existe, así que la API sigue adelante.",
      analogy: "El mesero no ve problema y va a la cocina.",
      active: ["api"],
      tones: { api: "ok" },
      phone: "loading",
      code: { label: "VALIDACIÓN", tone: "ok", content: "✓ Token válido\n✓ Ruta: /api/productos/:id\n✓ id = 999" },
    },
    {
      title: "La API busca en la base de datos",
      text: "La API pregunta por el producto 999.",
      analogy: "El mesero pregunta en la cocina.",
      active: ["api", "db"],
      packet: { from: "api", to: "db", label: "SELECT id=999", analogyLabel: "¿Hay plato 999?" },
      phone: "loading",
      code: { label: "CONSULTA SQL", content: "SELECT * FROM productos\nWHERE id = 999;" },
    },
    {
      title: "No hay resultados",
      text: "La base de datos responde vacía: ese producto no existe (o fue eliminado).",
      analogy: "La cocina responde: «ese plato ya no existe».",
      active: ["db", "api"],
      tones: { db: "warn" },
      packet: { from: "db", to: "api", label: "0 filas", analogyLabel: "No existe", color: "#fbbf24" },
      phone: "loading",
    },
    {
      title: "La API responde 404",
      text: "El código 404 significa «no encontrado». Es el mismo error que ves cuando una página web no existe.",
      analogy: "El mesero vuelve y te avisa amablemente que ese plato no está disponible.",
      active: ["api", "app"],
      tones: { api: "warn" },
      packet: { from: "api", to: "app", label: "404 Not Found", analogyLabel: "No disponible", color: ERR },
      phone: "loading",
      tone: "error",
      code: { label: "RESPUESTA 404", tone: "error", content: '{\n  "error": "Producto no encontrado",\n  "codigo": 404\n}' },
    },
    {
      title: "La app muestra un mensaje claro",
      text: "Una app bien hecha no se «cae»: interpreta el 404 y muestra un mensaje útil con alternativas.",
      analogy: "Te recomiendan otro plato en vez de dejarte sin nada.",
      active: ["app"],
      tones: { app: "warn" },
      phone: "notfound",
      tip: "Los códigos se agrupan: 2xx = éxito, 4xx = error de quien pide, 5xx = error del servidor.",
    },
  ],
  unauthorized: [
    {
      title: "La app pide datos sin llave",
      text: "Alguien intenta pedir información sin haber iniciado sesión: la solicitud no trae token.",
      analogy: "Alguien sin reserva intenta pedir directamente en un restaurante exclusivo.",
      active: ["app"],
      phone: "loading",
      code: { label: "SOLICITUD HTTP", tone: "error", content: "GET /api/productos HTTP/1.1\n# Falta la cabecera Authorization" },
    },
    {
      title: "La solicitud llega a la API",
      text: "La solicitud viaja igual que siempre.",
      analogy: "Se acerca al mesero.",
      active: ["app", "api"],
      packet: { from: "app", to: "api", label: "GET sin token", analogyLabel: "Sin reserva", color: "#fbbf24" },
      phone: "loading",
    },
    {
      title: "La API la rechaza",
      text: "La API detecta que no hay una llave válida y detiene todo ahí mismo. La base de datos nunca recibe la solicitud: está protegida.",
      analogy: "El mesero no lleva nada a la cocina: primero necesitas una reserva.",
      active: ["api"],
      tones: { api: "error" },
      phone: "loading",
      tone: "error",
      skipDb: true,
      code: { label: "VALIDACIÓN", tone: "error", content: "✗ Falta el token de acceso\n→ Solicitud bloqueada\n→ Base de datos no consultada" },
      tip: "Esta es una de las mayores ventajas de una API: es un guardia entre el mundo exterior y tus datos.",
    },
    {
      title: "La API responde 401",
      text: "El código 401 significa «no autorizado: identifícate primero».",
      analogy: "El mesero te indica amablemente cómo hacer una reserva.",
      active: ["api", "app"],
      tones: { api: "error" },
      packet: { from: "api", to: "app", label: "401 Unauthorized", analogyLabel: "Reserva requerida", color: ERR },
      phone: "loading",
      tone: "error",
      skipDb: true,
      code: { label: "RESPUESTA 401", tone: "error", content: '{\n  "error": "Debes iniciar sesión",\n  "codigo": 401\n}' },
    },
    {
      title: "La app pide iniciar sesión",
      text: "La app interpreta el 401 y lleva a la persona a la pantalla de inicio de sesión. Así se mantienen seguros los datos.",
      analogy: "Haces tu reserva y entonces sí puedes pedir.",
      active: ["app"],
      tones: { app: "warn" },
      phone: "unauthorized",
      skipDb: true,
    },
  ],
};

const SCENARIO_OPTIONS = [
  { id: "get", label: "Ver productos", hint: "GET · 200 OK", tone: "ok" as const },
  { id: "post", label: "Crear un pedido", hint: "POST · 201 Created", tone: "ok" as const },
  { id: "notfound", label: "Producto que no existe", hint: "GET · 404", tone: "error" as const },
  { id: "unauthorized", label: "Sin iniciar sesión", hint: "Sin token · 401", tone: "error" as const },
];

/* -------------------------------------------------------------------------- */
/*  Pantalla del teléfono                                                      */
/* -------------------------------------------------------------------------- */
const PhoneScreen: React.FC<{ state: Phone; analogy: boolean }> = ({ state, analogy }) => {
  const header = analogy ? "Mi pedido" : "Tienda";
  return (
    <div className="w-[128px] h-[230px] rounded-[22px] border-[5px] border-[#1E3A5F] bg-[#040F22] shadow-[0_20px_40px_rgba(0,0,0,0.5)] overflow-hidden">
      <div className="mx-auto mt-1 w-10 h-2.5 rounded-full bg-black" />
      <div className="px-2 pt-2">
        <p className="text-[10px] font-bold text-white mb-2">{header}</p>
        {state === "idle" && (
          <div className="text-center pt-6">
            <ShoppingBag className="w-7 h-7 text-[#19C6E6] mx-auto" />
            <p className="text-[9px] text-slate-400 mt-2 leading-tight">Presiona «Enviar solicitud»</p>
          </div>
        )}
        {state === "loading" && (
          <div className="space-y-1.5">
            {[0, 1, 2].map((i) => (
              <div key={i} className="h-9 rounded-md bg-white/[0.06] overflow-hidden relative">
                <span className="absolute inset-0 -translate-x-full animate-[shine_1.4s_ease-in-out_infinite] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
              </div>
            ))}
            <div className="flex justify-center pt-2">
              <Loader2 className="w-4 h-4 text-[#19C6E6] animate-spin" />
            </div>
          </div>
        )}
        {state === "list" && (
          <div className="space-y-1.5">
            {[
              ["Café de grano", "$8.990"],
              ["Taza cerámica", "$6.490"],
              ["Prensa francesa", "$21.990"],
            ].map(([n, p], i) => (
              <div key={n} className="anim-rise flex items-center gap-1.5 rounded-md bg-white/[0.07] p-1.5" style={{ "--d": `${i * 120}ms` } as React.CSSProperties}>
                <span className="w-5 h-5 rounded bg-gradient-to-br from-[#1479D4] to-[#19C6E6]" />
                <span className="flex-1 min-w-0">
                  <span className="block text-[8px] font-bold text-white truncate">{n}</span>
                  <span className="block text-[8px] text-emerald-400">{p}</span>
                </span>
              </div>
            ))}
          </div>
        )}
        {state === "created" && (
          <div className="anim-pop text-center pt-5">
            <CheckCircle2 className="w-9 h-9 text-emerald-400 mx-auto" />
            <p className="text-[10px] font-bold text-white mt-2">¡Pedido confirmado!</p>
            <p className="text-[9px] text-slate-400">N° 1045 · 3 cafés</p>
          </div>
        )}
        {state === "notfound" && (
          <div className="anim-pop text-center pt-5">
            <SearchX className="w-8 h-8 text-amber-300 mx-auto" />
            <p className="text-[10px] font-bold text-white mt-2">Producto no disponible</p>
            <p className="text-[9px] text-[#19C6E6] mt-1">Ver productos similares →</p>
          </div>
        )}
        {state === "unauthorized" && (
          <div className="anim-pop text-center pt-4">
            <Lock className="w-7 h-7 text-amber-300 mx-auto" />
            <p className="text-[10px] font-bold text-white mt-2">Inicia sesión</p>
            <div className="mt-2 space-y-1">
              <span className="block h-3.5 rounded bg-white/10" />
              <span className="block h-3.5 rounded bg-white/10" />
              <span className="block h-4 rounded bg-[#1479D4] text-[8px] font-bold text-white leading-4">Entrar</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/*  Laboratorio                                                                 */
/* -------------------------------------------------------------------------- */
export const ApiLab: React.FC = () => {
  const [scenario, setScenario] = useState("get");
  const [analogy, setAnalogy] = useState(false);
  const steps = SCENARIOS[scenario];
  const player = useStepPlayer(steps.length, 2900);
  const current = player.step >= 0 ? steps[player.step] : null;

  const changeScenario = (id: string) => {
    setScenario(id);
    player.reset();
  };

  const tone = (n: NodeId) => current?.tones?.[n];
  const isActive = (n: NodeId) => !!current?.active.includes(n);
  const dbDim = !!current?.skipDb;

  const labels = analogy
    ? {
        app: { title: "Tú (cliente)", sub: "haces el pedido", icon: <User /> },
        api: { title: "Mesero (API)", sub: "intermediario", icon: <ConciergeBell /> },
        db: { title: "Cocina (datos)", sub: "prepara y guarda", icon: <ChefHat /> },
      }
    : {
        app: { title: "App móvil", sub: "cliente", icon: <Smartphone /> },
        api: { title: "API", sub: "api.tuempresa.cl", icon: <Server /> },
        db: { title: "Base de datos", sub: "PostgreSQL", icon: <Database /> },
      };

  const links = useMemo(
    () => [
      { from: POS.app, to: POS.api, bend: 0.12, active: !!current?.packet && [current.packet.from, current.packet.to].every((n) => n === "app" || n === "api") },
      { from: POS.api, to: POS.db, bend: -0.12, active: !!current?.packet && [current.packet.from, current.packet.to].every((n) => n === "api" || n === "db"), color: dbDim ? "#64748b" : undefined },
    ],
    [current, dbDim]
  );

  const intro = {
    title: "Mira cómo una app conversa con un servidor",
    text: "Elige un escenario y presiona «Enviar solicitud». Puedes avanzar paso a paso con las flechas, mover el cursor sobre la escena para verla en 3D y activar el modo restaurante para una explicación sin tecnicismos.",
  };

  return (
    <div className="lab-frame rounded-[2rem] bg-gradient-to-b from-[#0A1E3B] to-[#071A35] border border-white/10 shadow-2xl shadow-[#071A35]/40 overflow-hidden">
      {/* Controles */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 p-5 sm:p-6 lg:py-4 border-b border-white/10">
        <ScenarioPicker options={SCENARIO_OPTIONS} value={scenario} onChange={changeScenario} />
        <div className="flex flex-wrap items-center gap-2">
          <Toggle checked={analogy} onChange={setAnalogy} label="Modo restaurante" icon={<UtensilsCrossed className="w-4 h-4" />} />
          <PlayerControls player={player} total={steps.length} />
        </div>
      </div>

      <div className="lab-main grid grid-cols-1 lg:grid-cols-12">
        {/* Escena 3D */}
        <div className="lab-stage lg:col-span-7 xl:col-span-8 relative border-b lg:border-b-0 lg:border-r border-white/10">
          <Stage3D label="Escena 3D: una app móvil envía una solicitud a la API, que consulta la base de datos y devuelve la respuesta">
            <FloorLinks links={links} />

            {/* App: pedestal + teléfono */}
            <div
              className={`absolute rounded-full border-2 transition-all duration-500 ${isActive("app") ? "border-[#19C6E6] shadow-[0_0_30px_rgba(25,198,230,0.8)]" : "border-[#19C6E6]/30"}`}
              style={{ left: POS.app.x - 70, top: POS.app.y - 70, width: 140, height: 140, transform: "translateZ(1px)" }}
            />
            <Billboard x={POS.app.x} y={POS.app.y} z={2}>
              <PhoneScreen state={current?.phone ?? "idle"} analogy={analogy} />
            </Billboard>
            <Billboard x={POS.app.x} y={POS.app.y} z={255}>
              <NodeLabel title={labels.app.title} subtitle={labels.app.sub} icon={labels.app.icon} active={isActive("app")} tone={tone("app")} />
            </Billboard>

            {/* API: servidor */}
            <Box3D
              x={POS.api.x}
              y={POS.api.y}
              w={120}
              d={110}
              h={150}
              top="#1E5AA0"
              glow={isActive("api")}
              frontContent={
                <div className="p-3 space-y-2.5">
                  {[0, 1, 2, 3].map((i) => (
                    <div key={i} className="flex items-center gap-1.5 h-5 rounded bg-black/30 px-1.5">
                      <span className={`w-1.5 h-1.5 rounded-full ${tone("api") === "error" ? "bg-rose-400" : "bg-emerald-400"} ${isActive("api") ? "led-blink" : ""}`} style={{ animationDelay: `${i * 0.2}s` }} />
                      <span className="w-1.5 h-1.5 rounded-full bg-[#19C6E6]/70" />
                      <span className="flex-1 h-1 rounded bg-white/15" />
                    </div>
                  ))}
                </div>
              }
            />
            <Billboard x={POS.api.x} y={POS.api.y} z={200}>
              <div className="flex flex-col items-center gap-2">
                {tone("api") === "ok" && <ShieldCheck className="anim-pop w-9 h-9 text-emerald-400 drop-shadow-[0_0_10px_#34d399]" />}
                {tone("api") === "error" && <ShieldX className="anim-pop w-9 h-9 text-rose-400 drop-shadow-[0_0_10px_#fb7185]" />}
                <NodeLabel title={labels.api.title} subtitle={labels.api.sub} icon={labels.api.icon} active={isActive("api")} tone={tone("api")} />
              </div>
            </Billboard>

            {/* Base de datos: discos apilados */}
            {[0, 1, 2].map((i) => (
              <Box3D
                key={i}
                x={POS.db.x}
                y={POS.db.y}
                w={110}
                d={110}
                h={26}
                z={i * 34}
                top="#14B8A6"
                front="#0F766E"
                side="#115E59"
                glow={isActive("db")}
                dim={dbDim}
              />
            ))}
            <Billboard x={POS.db.x} y={POS.db.y} z={150}>
              <NodeLabel title={labels.db.title} subtitle={labels.db.sub} icon={labels.db.icon} active={isActive("db")} tone={dbDim ? undefined : tone("db")} />
            </Billboard>

            {/* Paquete viajando */}
            {current?.packet && (
              <Packet3D
                key={`${scenario}-${player.step}`}
                from={POS[current.packet.from]}
                to={POS[current.packet.to]}
                duration={1700}
                label={analogy ? current.packet.analogyLabel : current.packet.label}
                color={current.packet.color}
              />
            )}
          </Stage3D>
          <p className="absolute left-4 bottom-3 text-[10px] font-mono text-slate-500 hidden sm:block">Mueve el cursor sobre la escena para girarla</p>
        </div>

        {/* Narración */}
        <div className="lab-narration lg:col-span-5 xl:col-span-4 p-5 sm:p-6 min-h-[300px] lg:min-h-0" aria-live="polite">
          <Narration
            stepIndex={player.step}
            total={steps.length}
            title={current ? current.title : intro.title}
            text={current ? (analogy ? current.analogy : current.text) : intro.text}
            tip={current?.tip}
            code={!analogy ? current?.code : undefined}
            tone={current?.tone}
          />
        </div>
      </div>

      {/* Línea de pasos */}
      <div className="px-5 sm:px-6 py-4 lg:py-3 border-t border-white/10">
        <StepTimeline
          steps={steps.map((s) => ({ title: s.title, tone: s.tone === "error" ? "error" : undefined }))}
          current={player.step}
          onSelect={player.goto}
        />
      </div>
    </div>
  );
};
