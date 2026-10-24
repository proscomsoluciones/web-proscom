"use client";

import React from "react";
import { Smartphone, Store, CreditCard, Landmark, Lock, CheckCircle2, XCircle, ShieldCheck, Loader2, KeyRound, Receipt } from "lucide-react";
import { Box3D, Billboard, FloorLinks, NodeLabel, type Point } from "../stage3d";
import { ServerBox } from "../props3d";
import { FlowLab, type FlowScenario, type FlowStep } from "../FlowLab";

const POS: Record<string, Point> = {
  client: { x: 120, y: 380 },
  store: { x: 330, y: 150 },
  gateway: { x: 560, y: 300 },
  bank: { x: 740, y: 120 },
};

const OK = "#34d399";
const BAD = "#fb7185";
const TOTAL = "$26.970";

type Screen = "cart" | "redirect" | "card" | "otp" | "processing" | "approved" | "rejected";

const common = (screen: Screen): FlowStep["state"] => ({ screen });

const start: FlowStep[] = [
  {
    title: "El cliente presiona «Pagar»",
    text: `El cliente revisa su carrito por ${TOTAL} y presiona «Pagar». La tienda todavía no sabe nada de su tarjeta, y así debe ser.`,
    active: ["client"],
    state: common("cart"),
  },
  {
    title: "La tienda crea una transacción",
    text: "El servidor de la tienda le pide a la pasarela (como Webpay, Mercado Pago o Flow) que prepare un cobro por ese monto. La pasarela responde con un código único y una dirección segura de pago.",
    active: ["store", "gateway"],
    packets: [
      { from: "store", to: "gateway", label: `Crear cobro ${TOTAL}` },
      { from: "gateway", to: "store", label: "token: tx_8F3a…", color: OK, delay: 1500 },
    ],
    state: common("cart"),
    code: { label: "API DE LA PASARELA", content: `POST /transacciones\n{ "orden": "1045", "monto": 26970,\n  "volver_a": "https://tienda.cl/pago/resultado" }\n\n→ { "token": "tx_8F3a…", "url": "https://pago.pasarela.cl/…" }` },
  },
  {
    title: "El cliente va al sitio seguro de la pasarela",
    text: "El cliente es redirigido a la página de la pasarela. Ahí, y solo ahí, escribe los datos de su tarjeta. La tienda nunca los ve ni los guarda.",
    active: ["client", "gateway"],
    packets: [{ from: "client", to: "gateway", label: "🔒 datos de tarjeta", color: OK }],
    state: common("card"),
    tip: "Por esto una tienda pequeña puede cobrar con tarjeta sin cumplir las exigentes normas de seguridad bancaria (PCI DSS): la pasarela se encarga.",
  },
];

const finish = (approved: boolean): FlowStep[] => [
  {
    title: approved ? "El banco aprueba el pago" : "El banco rechaza el pago",
    text: approved
      ? "El banco emisor revisa que la tarjeta sea válida y tenga cupo disponible, y aprueba el cargo."
      : "El banco revisa la tarjeta y detecta que no tiene saldo suficiente. Rechaza el cargo y no se cobra nada.",
    active: ["bank", "gateway"],
    packets: [{ from: "bank", to: "gateway", label: approved ? "APROBADO ✓" : "RECHAZADO ✗", color: approved ? OK : BAD }],
    state: { screen: "processing", bank: approved ? "ok" : "error" },
    tone: approved ? undefined : "error",
    code: approved
      ? { label: "RESPUESTA DEL BANCO", tone: "ok", content: 'Código de autorización: 482931\nEstado: "aprobado"' }
      : { label: "RESPUESTA DEL BANCO", tone: "error", content: 'Estado: "rechazado"\nMotivo: "fondos insuficientes"' },
  },
  {
    title: approved ? "La pasarela avisa a la tienda" : "La pasarela informa el rechazo",
    text: approved
      ? "La pasarela confirma el pago a la tienda mediante un aviso automático de servidor a servidor (webhook). La tienda nunca debe confiar solo en lo que diga el navegador del cliente."
      : "La tienda recibe el aviso de pago rechazado. El pedido no se confirma y el stock no se descuenta.",
    active: ["gateway", "store"],
    packets: [{ from: "gateway", to: "store", label: approved ? "webhook: pagado" : "webhook: rechazado", color: approved ? OK : BAD }],
    state: { screen: "processing", bank: approved ? "ok" : "error", store: approved ? "ok" : "error" },
    tone: approved ? undefined : "error",
    code: { label: "WEBHOOK", tone: approved ? "ok" : "error", content: `POST https://tienda.cl/api/pagos/webhook\n{ "orden": "1045", "estado": "${approved ? "pagado" : "rechazado"}" }` },
  },
  {
    title: approved ? "Pedido confirmado" : "El cliente puede reintentar",
    text: approved
      ? "La tienda confirma el pedido, descuenta el stock, emite la boleta y le muestra al cliente su comprobante. Todo en pocos segundos."
      : "El cliente ve un mensaje claro y puede intentar con otro medio de pago. Una buena integración no deja pedidos «a medias».",
    active: ["store", "client"],
    packets: [{ from: "store", to: "client", label: approved ? "Comprobante ✓" : "Pago rechazado", color: approved ? OK : BAD }],
    state: { screen: approved ? "approved" : "rejected", bank: approved ? "ok" : "error", store: approved ? "ok" : "error" },
    tone: approved ? "ok" : "error",
  },
];

const SCENARIOS: FlowScenario[] = [
  {
    id: "approved",
    label: "Pago aprobado",
    hint: "flujo completo",
    tone: "ok",
    steps: [
      ...start,
      {
        title: "La pasarela consulta al banco",
        text: "La pasarela envía la solicitud de autorización a la red de tarjetas y al banco que emitió la tarjeta del cliente.",
        active: ["gateway", "bank"],
        packets: [{ from: "gateway", to: "bank", label: `¿Autorizar ${TOTAL}?` }],
        state: common("processing"),
      },
      ...finish(true),
    ],
  },
  {
    id: "rejected",
    label: "Pago rechazado",
    hint: "sin fondos",
    tone: "error",
    steps: [
      ...start,
      {
        title: "La pasarela consulta al banco",
        text: "Igual que siempre, la pasarela pide autorización al banco emisor.",
        active: ["gateway", "bank"],
        packets: [{ from: "gateway", to: "bank", label: `¿Autorizar ${TOTAL}?` }],
        state: common("processing"),
      },
      ...finish(false),
    ],
  },
  {
    id: "secure",
    label: "Verificación con tu banco",
    hint: "clave dinámica",
    tone: "info",
    steps: [
      ...start,
      {
        title: "El banco pide confirmar que eres tú",
        text: "Para compras en línea, muchos bancos exigen un segundo paso: una clave dinámica o una aprobación en su app. Así, aunque alguien robe los datos de la tarjeta, no puede usarla.",
        active: ["gateway", "bank", "client"],
        packets: [
          { from: "gateway", to: "bank", label: `¿Autorizar ${TOTAL}?` },
          { from: "bank", to: "client", label: "🔑 Confirma en tu app", color: "#fbbf24", delay: 1500 },
        ],
        state: common("otp"),
        code: { label: "AUTENTICACIÓN", content: "Protocolo: 3-D Secure\nMétodo: aprobación en la app del banco\nEstado: esperando al cliente…" },
      },
      {
        title: "El cliente confirma",
        text: "El cliente aprueba la compra en la app de su banco. Ahora el banco tiene la certeza de que es el titular quien paga.",
        active: ["client", "bank"],
        packets: [{ from: "client", to: "bank", label: "✓ Soy yo", color: OK }],
        state: common("processing"),
      },
      ...finish(true),
    ],
  },
];

const PhonePay: React.FC<{ screen: Screen }> = ({ screen }) => (
  <div className="w-[128px] h-[230px] rounded-[22px] border-[5px] border-[#1E3A5F] bg-white shadow-[0_20px_40px_rgba(0,0,0,0.5)] overflow-hidden">
    <div className="mx-auto mt-1 w-10 h-2.5 rounded-full bg-black" />
    <div className="px-2 pt-2 text-[#071A35]">
      {screen === "cart" && (
        <div className="space-y-1.5">
          <p className="text-[10px] font-bold">Tu carrito</p>
          {[["Café de grano ×3", "$26.970"]].map(([n, p]) => (
            <div key={n} className="flex justify-between text-[8px] border-b border-slate-100 pb-1">
              <span>{n}</span>
              <span className="font-bold">{p}</span>
            </div>
          ))}
          <div className="flex justify-between text-[9px] font-bold pt-1">
            <span>Total</span>
            <span>{TOTAL}</span>
          </div>
          <span className="block mt-4 rounded bg-[#1479D4] text-white text-[9px] font-bold text-center py-1.5">Pagar</span>
        </div>
      )}
      {screen === "card" && (
        <div className="space-y-1.5">
          <p className="flex items-center gap-1 text-[8px] text-emerald-600 font-bold"><Lock className="w-2.5 h-2.5" /> pago.pasarela.cl</p>
          <p className="text-[10px] font-bold">Pagar {TOTAL}</p>
          <span className="block h-4 rounded border border-slate-300 text-[7px] text-slate-500 px-1 leading-4">•••• •••• •••• 4821</span>
          <div className="flex gap-1">
            <span className="flex-1 h-4 rounded border border-slate-300 text-[7px] text-slate-500 px-1 leading-4">12/28</span>
            <span className="flex-1 h-4 rounded border border-slate-300 text-[7px] text-slate-500 px-1 leading-4">•••</span>
          </div>
          <span className="block rounded bg-emerald-500 text-white text-[9px] font-bold text-center py-1.5">Confirmar pago</span>
        </div>
      )}
      {screen === "otp" && (
        <div className="anim-pop text-center pt-4">
          <KeyRound className="w-7 h-7 text-amber-500 mx-auto" />
          <p className="text-[9px] font-bold mt-2">Confirma en la app de tu banco</p>
          <Loader2 className="w-4 h-4 text-[#1479D4] animate-spin mx-auto mt-3" />
        </div>
      )}
      {screen === "processing" && (
        <div className="text-center pt-8">
          <Loader2 className="w-7 h-7 text-[#1479D4] animate-spin mx-auto" />
          <p className="text-[9px] font-bold mt-2">Procesando pago…</p>
        </div>
      )}
      {screen === "approved" && (
        <div className="anim-pop text-center pt-4">
          <CheckCircle2 className="w-9 h-9 text-emerald-500 mx-auto" />
          <p className="text-[10px] font-bold mt-1">¡Pago aprobado!</p>
          <p className="text-[8px] text-slate-500">Pedido N° 1045</p>
          <p className="flex items-center justify-center gap-1 text-[8px] text-[#1479D4] mt-2"><Receipt className="w-3 h-3" /> Boleta enviada</p>
        </div>
      )}
      {screen === "rejected" && (
        <div className="anim-pop text-center pt-4">
          <XCircle className="w-9 h-9 text-rose-500 mx-auto" />
          <p className="text-[10px] font-bold mt-1">Pago rechazado</p>
          <p className="text-[8px] text-slate-500">No se realizó ningún cargo</p>
          <span className="block mt-2 rounded border border-[#1479D4] text-[#1479D4] text-[8px] font-bold py-1">Usar otro medio</span>
        </div>
      )}
    </div>
  </div>
);

export const PaymentLab: React.FC = () => (
  <FlowLab
    scenarios={SCENARIOS}
    positions={POS}
    stageLabel="Escena 3D: un cliente paga en una tienda online; la tienda, la pasarela de pago y el banco se comunican para aprobar la compra"
    intro={{
      title: "¿Qué pasa cuando pagas con tarjeta en una tienda online?",
      text: "Presiona «Pagar» y sigue el recorrido entre el cliente, la tienda, la pasarela de pago y el banco. Compara un pago aprobado, uno rechazado y uno con verificación del banco.",
    }}
    playLabel="Pagar"
    stepMs={3200}
    renderScene={({ step, isActive }) => {
      const st = step?.state ?? {};
      return (
        <>
          <FloorLinks
            links={[
              { from: POS.client, to: POS.store, bend: -0.1, active: isActive("client") && isActive("store") },
              { from: POS.store, to: POS.gateway, bend: 0.1, active: isActive("store") && isActive("gateway") },
              { from: POS.client, to: POS.gateway, bend: 0.1, active: isActive("client") && isActive("gateway"), color: OK },
              { from: POS.gateway, to: POS.bank, bend: -0.1, active: isActive("gateway") && isActive("bank") },
            ]}
          />

          <div
            className={`absolute rounded-full border-2 transition-all duration-500 ${isActive("client") ? "border-[#19C6E6] shadow-[0_0_30px_rgba(25,198,230,0.8)]" : "border-[#19C6E6]/30"}`}
            style={{ left: POS.client.x - 70, top: POS.client.y - 70, width: 140, height: 140, transform: "translateZ(1px)" }}
          />
          <Billboard x={POS.client.x} y={POS.client.y} z={2}>
            <PhonePay screen={(st.screen as Screen) ?? "cart"} />
          </Billboard>
          <Billboard x={POS.client.x} y={POS.client.y} z={255}>
            <NodeLabel title="Cliente" subtitle="paga desde el celular" icon={<Smartphone />} active={isActive("client")} />
          </Billboard>

          <ServerBox x={POS.store.x} y={POS.store.y} h={110} w={95} active={isActive("store")} tone={st.store === "error" ? "error" : undefined} />
          <Billboard x={POS.store.x} y={POS.store.y} z={135}>
            <NodeLabel title="Tienda online" subtitle="tienda.cl" icon={<Store />} active={isActive("store")} tone={st.store === "ok" ? "ok" : st.store === "error" ? "error" : undefined} />
          </Billboard>

          <Box3D x={POS.gateway.x} y={POS.gateway.y} w={110} d={100} h={70} top="#22C55E" front="#15803D" side="#166534" glow={isActive("gateway")} />
          <Billboard x={POS.gateway.x} y={POS.gateway.y} z={110}>
            <div className="flex flex-col items-center gap-2">
              {isActive("gateway") && <ShieldCheck className="anim-pop w-8 h-8 text-emerald-400 drop-shadow-[0_0_10px_#34d399]" />}
              <NodeLabel title="Pasarela de pago" subtitle="Webpay, Mercado Pago…" icon={<CreditCard />} active={isActive("gateway")} />
            </div>
          </Billboard>

          <Box3D x={POS.bank.x} y={POS.bank.y} w={100} d={100} h={90} top="#64748B" front="#334155" side="#1E293B" glow={isActive("bank")} />
          <Billboard x={POS.bank.x} y={POS.bank.y} z={125}>
            <NodeLabel title="Banco del cliente" subtitle="emisor de la tarjeta" icon={<Landmark />} active={isActive("bank")} tone={st.bank === "ok" ? "ok" : st.bank === "error" ? "error" : undefined} />
          </Billboard>
        </>
      );
    }}
  />
);
