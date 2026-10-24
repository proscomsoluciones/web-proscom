"use client";

import React from "react";
import { Laptop, Server, BookMarked, Mail, UserX, Inbox, ShieldAlert, Ban, PenLine, CheckCircle2, XCircle } from "lucide-react";
import { Box3D, Billboard, FloorLinks, NodeLabel, type Point } from "../stage3d";
import { ServerBox } from "../props3d";
import { FlowLab, type FlowScenario } from "../FlowLab";

const POS: Record<string, Point> = {
  me: { x: 110, y: 390 },
  myServer: { x: 320, y: 190 },
  dns: { x: 560, y: 90 },
  other: { x: 650, y: 310 },
  attacker: { x: 330, y: 450 },
};

const OK = "#34d399";
const BAD = "#fb7185";
const D = "tuempresa.cl";

type Folder = "none" | "inbox" | "spam" | "blocked";
type Check = "pending" | "ok" | "fail";

const checksCode = (spf: Check, dkim: Check, dmarc: string) =>
  `SPF   ${spf === "ok" ? "✓ pass  (servidor autorizado)" : "✗ fail  (servidor no autorizado)"}\nDKIM  ${dkim === "ok" ? "✓ pass  (firma válida)" : "✗ none  (sin firma)"}\nDMARC ${dmarc}`;

const SCENARIOS: FlowScenario[] = [
  {
    id: "receive",
    label: "Recibir un correo",
    hint: "registro MX",
    tone: "info",
    steps: [
      {
        title: "Un cliente te escribe",
        text: `Un cliente envía un correo a ventas@${D} desde su cuenta de Gmail. Su servidor de correo tiene que averiguar a dónde entregarlo.`,
        active: ["other"],
        state: { folderMe: "none" },
        code: { label: "CORREO", content: `De:     cliente@gmail.com\nPara:   ventas@${D}\nAsunto: Cotización` },
      },
      {
        title: "Pregunta por el registro MX",
        text: `El servidor del cliente consulta el DNS: «¿qué servidor recibe los correos de ${D}?». Esa respuesta está en el registro MX.`,
        active: ["other", "dns"],
        packets: [{ from: "other", to: "dns", label: `¿MX de ${D}?` }],
        state: { folderMe: "none" },
      },
      {
        title: "El DNS indica tu servidor de correo",
        text: "El DNS responde con el nombre de tu servidor de correo (por ejemplo, Google Workspace o Microsoft 365). Puede haber varios, con prioridades, por si uno falla.",
        active: ["dns", "other"],
        packets: [{ from: "dns", to: "other", label: `mx.${D}`, color: OK }],
        state: { folderMe: "none" },
        code: { label: "REGISTROS MX", tone: "ok", content: `${D}.  MX  10  mx1.proveedor-correo.com.\n${D}.  MX  20  mx2.proveedor-correo.com.\n# número menor = mayor prioridad` },
      },
      {
        title: "El correo viaja a tu servidor",
        text: "Con la dirección correcta, el servidor del cliente entrega el mensaje a tu servidor de correo usando el protocolo SMTP.",
        active: ["other", "myServer"],
        packets: [{ from: "other", to: "myServer", label: "✉ Cotización" }],
        state: { folderMe: "none" },
      },
      {
        title: "Llega a tu bandeja de entrada",
        text: "Tu servidor guarda el correo y lo muestra en tu bandeja, en el computador o el celular.",
        active: ["myServer", "me"],
        packets: [{ from: "myServer", to: "me", label: "Nuevo correo", color: OK }],
        state: { folderMe: "inbox" },
        tone: "ok",
        tip: "Si el registro MX está mal configurado, los correos simplemente no llegan: es uno de los errores más comunes al cambiar de proveedor.",
      },
    ],
  },
  {
    id: "send-ok",
    label: "Enviar bien configurado",
    hint: "SPF + DKIM + DMARC",
    tone: "ok",
    steps: [
      {
        title: "Envías un correo",
        text: `Desde ventas@${D} respondes al cliente. Tu programa de correo entrega el mensaje a tu servidor de envío.`,
        active: ["me", "myServer"],
        packets: [{ from: "me", to: "myServer", label: "✉ Re: Cotización" }],
        state: { folder: "none" },
      },
      {
        title: "Tu servidor firma el mensaje",
        text: "Antes de enviarlo, tu servidor agrega una firma digital (DKIM). Es como un sello lacrado: prueba que el mensaje salió de tu dominio y que nadie lo modificó en el camino.",
        active: ["myServer"],
        state: { folder: "none", dkim: true },
        code: { label: "FIRMA DKIM", tone: "ok", content: `DKIM-Signature: v=1; d=${D}; s=correo;\n  b=MIIBIjANBgkqhkiG9w0BAQEFAAOC...` },
      },
      {
        title: "El correo viaja al destinatario",
        text: "El mensaje firmado llega al servidor de Gmail del cliente.",
        active: ["myServer", "other"],
        packets: [{ from: "myServer", to: "other", label: "✉ + firma DKIM" }],
        state: { folder: "none", dkim: true },
      },
      {
        title: "Gmail verifica tu identidad",
        text: `Gmail no confía a ciegas: consulta el DNS de ${D} para revisar qué servidores pueden enviar en tu nombre (SPF), tu llave pública para validar la firma (DKIM) y qué hacer si algo falla (DMARC).`,
        active: ["other", "dns"],
        packets: [
          { from: "other", to: "dns", label: "¿SPF, DKIM, DMARC?" },
          { from: "dns", to: "other", label: "registros ✓", color: OK, delay: 1500 },
        ],
        state: { folder: "none", dkim: true },
        code: { label: "REGISTROS TXT", content: `${D}.               TXT "v=spf1 include:proveedor-correo.com -all"\ncorreo._domainkey.  TXT "v=DKIM1; p=MIIBIjAN..."\n_dmarc.             TXT "v=DMARC1; p=reject"` },
      },
      {
        title: "Todo coincide: bandeja de entrada",
        text: "Las tres verificaciones pasan. Gmail confía en el mensaje y lo entrega en la bandeja de entrada principal.",
        active: ["other"],
        state: { folder: "inbox", dkim: true, spf: "ok", dkimCheck: "ok" },
        tone: "ok",
        code: { label: "VERIFICACIÓN", tone: "ok", content: checksCode("ok", "ok", "✓ pass") },
      },
    ],
  },
  {
    id: "send-bad",
    label: "Enviar sin autenticación",
    hint: "sin SPF ni DKIM",
    tone: "error",
    steps: [
      {
        title: "Envías un correo",
        text: "Mismo correo, pero el dominio nunca se configuró con SPF ni DKIM (algo muy común en dominios recién creados).",
        active: ["me", "myServer"],
        packets: [{ from: "me", to: "myServer", label: "✉ Re: Cotización" }],
        state: { folder: "none" },
      },
      {
        title: "Sale sin firma",
        text: "Tu servidor envía el mensaje sin sello DKIM.",
        active: ["myServer", "other"],
        packets: [{ from: "myServer", to: "other", label: "✉ sin firma", color: "#fbbf24" }],
        state: { folder: "none" },
      },
      {
        title: "Gmail busca tus registros",
        text: `Gmail consulta el DNS de ${D}, pero no encuentra registros SPF ni DKIM: no tiene cómo comprobar que eres quien dices ser.`,
        active: ["other", "dns"],
        packets: [
          { from: "other", to: "dns", label: "¿SPF, DKIM?" },
          { from: "dns", to: "other", label: "no existen", color: "#fbbf24", delay: 1500 },
        ],
        state: { folder: "none" },
      },
      {
        title: "Termina en spam",
        text: "Sin pruebas de identidad, el correo se ve sospechoso y se envía a la carpeta de spam. Tu cliente probablemente nunca lo verá.",
        active: ["other"],
        state: { folder: "spam", spf: "fail", dkimCheck: "fail" },
        tone: "error",
        code: { label: "VERIFICACIÓN", tone: "error", content: checksCode("fail", "fail", "— sin política") },
        tip: "¿Tus correos llegan a spam? En la mayoría de los casos se resuelve configurando SPF, DKIM y DMARC en el DNS.",
      },
    ],
  },
  {
    id: "spoof",
    label: "Intento de suplantación",
    hint: "DMARC bloquea",
    tone: "error",
    steps: [
      {
        title: "Un estafador se hace pasar por ti",
        text: `Alguien envía un correo falso desde su propio servidor, pero escribe como remitente ventas@${D} para pedirle a tu cliente que «pague a una nueva cuenta».`,
        active: ["attacker"],
        state: { folder: "none" },
        code: { label: "CORREO FALSO", tone: "error", content: `De:     ventas@${D}   ← falso\nAsunto: Cambio de cuenta bancaria\nEnviado desde: 198.51.100.66 (desconocido)` },
      },
      {
        title: "El correo llega a Gmail",
        text: "El mensaje falso llega al servidor de tu cliente.",
        active: ["attacker", "other"],
        packets: [{ from: "attacker", to: "other", label: "✉ «ventas@…»", color: BAD }],
        state: { folder: "none" },
      },
      {
        title: "Gmail revisa tu política",
        text: `Gmail consulta el DNS de ${D}: el servidor del estafador no está autorizado en tu SPF y el mensaje no trae tu firma DKIM. Tu política DMARC dice «rechazar».`,
        active: ["other", "dns"],
        packets: [
          { from: "other", to: "dns", label: "¿SPF, DKIM, DMARC?" },
          { from: "dns", to: "other", label: "DMARC: rechazar", color: BAD, delay: 1500 },
        ],
        state: { folder: "none" },
      },
      {
        title: "Correo falso bloqueado",
        text: "Gmail rechaza el mensaje y tu cliente nunca lo recibe. Tu dominio quedó protegido contra la suplantación.",
        active: ["other"],
        state: { folder: "blocked", spf: "fail", dkimCheck: "fail" },
        tone: "ok",
        code: { label: "VERIFICACIÓN", tone: "error", content: checksCode("fail", "fail", "✗ fail → mensaje rechazado") },
        tip: "Sin DMARC, este correo falso podría haber llegado a la bandeja de entrada. Es una de las estafas más frecuentes a empresas.",
      },
    ],
  },
];

const MailClient: React.FC<{ folder: Folder; title: string; from: string }> = ({ folder, title, from }) => (
  <div className="w-[190px] rounded-xl overflow-hidden bg-white shadow-[0_20px_40px_rgba(0,0,0,0.5)] border border-white/20">
    <div className="flex items-center gap-1.5 px-2 py-1.5 bg-slate-100 border-b border-slate-200">
      <Mail className="w-3 h-3 text-[#1479D4]" />
      <span className="text-[9px] font-bold text-slate-700">{title}</span>
    </div>
    <div className="flex text-[8px] font-semibold border-b border-slate-200">
      <span className={`flex-1 flex items-center justify-center gap-1 py-1 ${folder === "inbox" ? "bg-[#1479D4] text-white" : "text-slate-500"}`}>
        <Inbox className="w-2.5 h-2.5" /> Entrada
      </span>
      <span className={`flex-1 flex items-center justify-center gap-1 py-1 ${folder === "spam" ? "bg-amber-400 text-[#071A35]" : "text-slate-500"}`}>
        <ShieldAlert className="w-2.5 h-2.5" /> Spam
      </span>
    </div>
    <div className="h-[70px] p-1.5 space-y-1">
      {folder === "none" && <p className="text-[8px] text-slate-400 text-center pt-5">Sin mensajes nuevos</p>}
      {(folder === "inbox" || folder === "spam") && (
        <div className={`anim-pop rounded p-1.5 ${folder === "spam" ? "bg-amber-50 border border-amber-200" : "bg-sky-50 border border-sky-200"}`}>
          <p className="text-[8px] font-bold text-slate-800 truncate">{from}</p>
          <p className="text-[8px] text-slate-500 truncate">Re: Cotización</p>
        </div>
      )}
      {folder === "blocked" && (
        <div className="anim-pop rounded p-1.5 bg-emerald-50 border border-emerald-200 text-center">
          <Ban className="w-3.5 h-3.5 text-emerald-600 mx-auto" />
          <p className="text-[8px] font-bold text-emerald-700">Correo falso bloqueado</p>
        </div>
      )}
    </div>
  </div>
);

export const EmailLab: React.FC = () => (
  <FlowLab
    scenarios={SCENARIOS}
    positions={POS}
    stageLabel="Escena 3D: viaje de un correo electrónico entre servidores, con verificaciones SPF, DKIM y DMARC en el DNS"
    intro={{
      title: "¿Cómo viaja un correo de tu dominio?",
      text: "Elige un escenario: cómo llegan los correos a tu empresa (MX), qué pasa cuando envías con todo bien configurado, por qué algunos terminan en spam y cómo se bloquea a quien intenta suplantarte.",
    }}
    playLabel="Enviar correo"
    renderScene={({ step, scenario, isActive }) => {
      const st = step?.state ?? {};
      const spoof = scenario === "spoof";
      const receive = scenario === "receive";
      return (
        <>
          <FloorLinks
            links={[
              { from: POS.me, to: POS.myServer, active: isActive("me") && isActive("myServer") },
              { from: POS.myServer, to: POS.other, bend: 0.1, active: isActive("myServer") && isActive("other") },
              { from: POS.other, to: POS.dns, bend: 0.12, active: isActive("other") && isActive("dns") },
              ...(spoof ? [{ from: POS.attacker, to: POS.other, active: isActive("attacker") && isActive("other"), color: BAD }] : []),
            ]}
          />

          {/* Tú */}
          <Billboard x={POS.me.x} y={POS.me.y} z={2}>
            <MailClient folder={receive ? ((st.folderMe as Folder) ?? "none") : "none"} title={`ventas@${D}`} from="cliente@gmail.com" />
          </Billboard>
          <Billboard x={POS.me.x} y={POS.me.y} z={165}>
            <NodeLabel title="Tu empresa" subtitle={`ventas@${D}`} icon={<Laptop />} active={isActive("me")} />
          </Billboard>

          {/* Tu servidor de correo */}
          <ServerBox x={POS.myServer.x} y={POS.myServer.y} h={110} w={95} active={isActive("myServer")} />
          <Billboard x={POS.myServer.x} y={POS.myServer.y} z={135}>
            <div className="flex flex-col items-center gap-2">
              {st.dkim && (
                <span className="anim-pop inline-flex items-center gap-1 rounded-full bg-emerald-400 text-[#040F22] text-[11px] font-bold px-2 py-0.5 shadow-[0_0_14px_#34d399]">
                  <PenLine className="w-3 h-3" /> Firmado DKIM
                </span>
              )}
              <NodeLabel title="Tu servidor de correo" subtitle={`mx.${D}`} icon={<Server />} active={isActive("myServer")} />
            </div>
          </Billboard>

          {/* DNS */}
          <Box3D x={POS.dns.x} y={POS.dns.y} w={100} d={80} h={55} top="#8B5CF6" front="#6D28D9" side="#5B21B6" glow={isActive("dns")} />
          <Billboard x={POS.dns.x} y={POS.dns.y} z={90}>
            <NodeLabel title={`DNS de ${D}`} subtitle="MX · SPF · DKIM · DMARC" icon={<BookMarked />} active={isActive("dns")} />
          </Billboard>

          {/* Servidor del destinatario */}
          <ServerBox x={POS.other.x} y={POS.other.y} h={110} w={95} active={isActive("other")} />
          <Billboard x={POS.other.x} y={POS.other.y} z={135}>
            <div className="flex flex-col items-center gap-2">
              {(st.spf || st.dkimCheck) && (
                <span className="anim-pop flex gap-1">
                  {[
                    ["SPF", st.spf],
                    ["DKIM", st.dkimCheck],
                  ].map(([k, v]) => (
                    <span key={k as string} className={`inline-flex items-center gap-0.5 rounded px-1.5 py-0.5 text-[11px] font-mono font-bold ${v === "ok" ? "bg-emerald-400 text-[#040F22]" : "bg-rose-400 text-white"}`}>
                      {v === "ok" ? <CheckCircle2 className="w-3 h-3" /> : <XCircle className="w-3 h-3" />} {k}
                    </span>
                  ))}
                </span>
              )}
              <NodeLabel title={receive ? "Gmail del cliente" : "Gmail del destinatario"} subtitle="cliente@gmail.com" icon={<Server />} active={isActive("other")} />
            </div>
          </Billboard>
          {!receive && (
            <Billboard x={POS.other.x + 90} y={POS.other.y + 90} z={2}>
              <MailClient folder={(st.folder as Folder) ?? "none"} title="cliente@gmail.com" from={spoof ? `ventas@${D} (falso)` : `ventas@${D}`} />
            </Billboard>
          )}

          {/* Estafador */}
          {spoof && (
            <>
              <Box3D x={POS.attacker.x} y={POS.attacker.y} w={80} d={60} h={30} top="#7F1D1D" front="#5B1414" side="#450A0A" glow={isActive("attacker")} />
              <Billboard x={POS.attacker.x} y={POS.attacker.y} z={70}>
                <NodeLabel title="Estafador" subtitle="servidor desconocido" icon={<UserX />} active={isActive("attacker")} tone="error" />
              </Billboard>
            </>
          )}
        </>
      );
    }}
  />
);
