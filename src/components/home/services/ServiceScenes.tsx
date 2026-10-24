import {
  Bell,
  CheckCircle2,
  CreditCard,
  Database,
  FileText,
  Gauge,
  Lock,
  RefreshCw,
  ShieldCheck,
  ShoppingCart,
  Tag,
  Truck,
  Users,
  Wifi,
} from "lucide-react";

/**
 * Escenas animadas (motion graphics en CSS/SVG) para cada servicio.
 * Se vuelven a montar al cambiar de pestaña, así las animaciones de entrada se repiten.
 */

/** Retraso de animación como variable CSS */
const d = (ms: number) => ({ "--d": `${ms}ms` }) as React.CSSProperties;

/* -------------------------------------------------------------------------- */
/* 1. Software a medida: editor de código + módulos que se ensamblan          */
/* -------------------------------------------------------------------------- */
const SoftwareScene = () => {
  const lines = [
    { w: "55%", c: "bg-[#C792EA]", indent: 0 },
    { w: "70%", c: "bg-[#19C6E6]", indent: 1 },
    { w: "45%", c: "bg-[#82AAFF]", indent: 2 },
    { w: "62%", c: "bg-[#C3E88D]", indent: 2 },
    { w: "38%", c: "bg-[#F78C6C]", indent: 1 },
    { w: "50%", c: "bg-[#19C6E6]", indent: 1 },
    { w: "28%", c: "bg-[#C792EA]", indent: 0 },
  ];
  const modules = ["Usuarios", "Inventario", "Reportes", "Facturación"];
  return (
    <div className="grid grid-cols-5 gap-4 h-full">
      <div className="col-span-3 rounded-xl bg-[#040F22] border border-white/10 px-4 py-3 font-mono">
        <div className="flex items-center justify-between mb-3 text-[10px] text-slate-500">
          <span>modulo-ventas.ts</span>
          <span className="text-emerald-400">● compilado</span>
        </div>
        <div className="space-y-2">
          {lines.map((l, i) => (
            <div key={i} className="flex items-center gap-2" style={{ paddingLeft: l.indent * 14 }}>
              <span className="w-4 text-[9px] text-slate-600 text-right">{i + 1}</span>
              <span
                className={`anim-grow-x h-2 rounded-full ${l.c} opacity-80`}
                style={{ width: l.w, ...d(150 + i * 140) }}
              />
            </div>
          ))}
          <div className="flex items-center gap-2 pl-[14px]">
            <span className="w-4 text-[9px] text-slate-600 text-right">8</span>
            <span className="animate-caret w-1.5 h-3 bg-[#19C6E6]" />
          </div>
        </div>
      </div>
      <div className="col-span-2 flex flex-col justify-center gap-2.5">
        {modules.map((m, i) => (
          <div
            key={m}
            className="anim-slide-in flex items-center gap-2 rounded-lg bg-white/[0.05] border border-[#19C6E6]/25 px-3 py-2"
            style={d(500 + i * 220)}
          >
            <span className="w-2 h-2 rounded-sm bg-[#19C6E6] shadow-[0_0_8px_#19C6E6]" />
            <span className="text-[11px] font-semibold text-white">{m}</span>
            <CheckCircle2 className="anim-pop w-3.5 h-3.5 text-emerald-400 ml-auto" style={d(900 + i * 220)} />
          </div>
        ))}
      </div>
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/* 2. Desarrollo web: navegador que se construye + puntaje de rendimiento     */
/* -------------------------------------------------------------------------- */
const WebScene = () => (
  <div className="relative h-full rounded-xl bg-white overflow-hidden border border-white/10">
    <div className="flex items-center gap-1.5 px-3 py-2 bg-slate-100 border-b border-slate-200">
      <span className="w-2 h-2 rounded-full bg-[#FF5F57]" />
      <span className="w-2 h-2 rounded-full bg-[#FEBC2E]" />
      <span className="w-2 h-2 rounded-full bg-[#28C840]" />
      <span className="ml-2 flex-1 h-4 rounded bg-white border border-slate-200 text-[9px] text-slate-400 font-mono px-2 leading-4">
        https://tuempresa.cl
      </span>
    </div>
    <div className="p-4 space-y-3">
      <div className="anim-rise flex items-center justify-between" style={d(100)}>
        <span className="w-16 h-3 rounded bg-[#071A35]" />
        <span className="flex gap-2">
          {[0, 1, 2].map((i) => (
            <span key={i} className="w-8 h-2 rounded bg-slate-300" />
          ))}
        </span>
      </div>
      <div className="anim-rise rounded-lg bg-gradient-to-r from-[#1479D4] to-[#19C6E6] p-4" style={d(300)}>
        <span className="block w-1/2 h-3 rounded bg-white/90 mb-2" />
        <span className="block w-1/3 h-2 rounded bg-white/60 mb-3" />
        <span className="inline-block w-16 h-4 rounded bg-white" />
      </div>
      <div className="grid grid-cols-3 gap-2">
        {[0, 1, 2].map((i) => (
          <div key={i} className="anim-rise rounded-md border border-slate-200 p-2" style={d(550 + i * 150)}>
            <span className="block w-5 h-5 rounded bg-[#1479D4]/15 mb-1.5" />
            <span className="block w-full h-1.5 rounded bg-slate-200 mb-1" />
            <span className="block w-2/3 h-1.5 rounded bg-slate-200" />
          </div>
        ))}
      </div>
    </div>
    {/* Puntaje de rendimiento */}
    <div
      className="anim-pop absolute bottom-3 right-3 flex items-center gap-2 rounded-xl bg-[#071A35] text-white px-3 py-2 shadow-xl"
      style={d(1100)}
    >
      <svg viewBox="0 0 36 36" className="w-9 h-9 -rotate-90">
        <circle cx="18" cy="18" r="15" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="3" />
        <circle
          cx="18" cy="18" r="15" fill="none" stroke="#34d399" strokeWidth="3" strokeLinecap="round"
          className="anim-draw" style={{ "--len": "94.2", "--to": "1.9", ...d(1200) } as React.CSSProperties}
        />
      </svg>
      <div className="leading-tight">
        <p className="text-sm font-extrabold">98</p>
        <p className="text-[9px] text-slate-400 flex items-center gap-1"><Gauge className="w-3 h-3" />Rendimiento</p>
      </div>
    </div>
  </div>
);

/* -------------------------------------------------------------------------- */
/* 3. Apps móviles: teléfono con lista, sincronización y notificación         */
/* -------------------------------------------------------------------------- */
const MobileScene = () => (
  <div className="relative h-full flex items-center justify-center gap-6">
    <div className="relative w-[150px] h-full max-h-[230px] rounded-[26px] border-[5px] border-[#1E3A5F] bg-[#040F22] overflow-hidden shadow-2xl">
      <div className="absolute top-1.5 left-1/2 -translate-x-1/2 w-12 h-3 rounded-full bg-black" />
      <div className="pt-6 px-2.5 space-y-2">
        <div className="flex items-center justify-between text-[8px] text-slate-400 font-mono">
          <span>Pedidos</span>
          <RefreshCw className="w-3 h-3 text-[#19C6E6] animate-spin" style={{ animationDuration: "2.5s" }} />
        </div>
        {["#1042", "#1043", "#1044", "#1045"].map((id, i) => (
          <div
            key={id}
            className="anim-rise flex items-center gap-2 rounded-lg bg-white/[0.06] border border-white/10 p-1.5"
            style={d(200 + i * 180)}
          >
            <span className="w-5 h-5 rounded-md bg-gradient-to-br from-[#1479D4] to-[#19C6E6] flex items-center justify-center">
              <ShoppingCart className="w-3 h-3 text-white" />
            </span>
            <span className="flex-1">
              <span className="block text-[8px] font-bold text-white">Pedido {id}</span>
              <span className="block w-10 h-1 rounded bg-slate-600 mt-0.5" />
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
          </div>
        ))}
      </div>
    </div>
    <div className="hidden sm:flex flex-col gap-3">
      <div className="anim-pop flex items-center gap-2 rounded-xl bg-white text-[#071A35] px-3 py-2 shadow-xl" style={d(1000)}>
        <Bell className="w-4 h-4 text-[#1479D4]" />
        <div>
          <p className="text-[10px] font-bold">Nuevo pedido recibido</p>
          <p className="text-[9px] text-slate-500">hace 1 segundo</p>
        </div>
      </div>
      <div className="anim-pop flex items-center gap-2 rounded-xl bg-white/[0.06] border border-white/10 px-3 py-2" style={d(1300)}>
        <Wifi className="w-4 h-4 text-emerald-400" />
        <p className="text-[10px] text-slate-200">Modo offline · sincronizado</p>
      </div>
      <div className="anim-pop flex items-center gap-2 rounded-xl bg-white/[0.06] border border-white/10 px-3 py-2" style={d(1550)}>
        <span className="text-[10px] font-mono text-[#19C6E6]">iOS</span>
        <span className="text-slate-600">·</span>
        <span className="text-[10px] font-mono text-emerald-400">Android</span>
      </div>
    </div>
  </div>
);

/* -------------------------------------------------------------------------- */
/* 4. Sistemas de gestión: dashboard con KPIs, barras y línea                 */
/* -------------------------------------------------------------------------- */
const DashboardScene = () => {
  const bars = [45, 70, 55, 85, 62, 95, 78];
  return (
    <div className="grid grid-cols-3 grid-rows-[auto_1fr] gap-3 h-full">
      {[
        { label: "Ventas hoy", value: "$2,4M", color: "text-emerald-400" },
        { label: "Stock crítico", value: "12", color: "text-[#F78C6C]" },
        { label: "Órdenes", value: "348", color: "text-[#19C6E6]" },
      ].map((k, i) => (
        <div key={k.label} className="anim-rise rounded-xl bg-white/[0.05] border border-white/10 p-3" style={d(100 + i * 120)}>
          <p className="text-[9px] text-slate-400 uppercase tracking-wider">{k.label}</p>
          <p className={`text-lg font-extrabold font-mono ${k.color}`}>{k.value}</p>
        </div>
      ))}
      <div className="col-span-2 rounded-xl bg-white/[0.05] border border-white/10 p-3 flex items-end gap-2">
        {bars.map((h, i) => (
          <span
            key={i}
            className="anim-grow-y flex-1 rounded-t-md bg-gradient-to-t from-[#1479D4] to-[#19C6E6]"
            style={{ height: `${h}%`, ...d(400 + i * 90) }}
          />
        ))}
      </div>
      <div className="rounded-xl bg-white/[0.05] border border-white/10 p-3 flex flex-col">
        <p className="text-[9px] text-slate-400 uppercase tracking-wider mb-1">Tendencia</p>
        <svg viewBox="0 0 100 60" className="w-full flex-1" preserveAspectRatio="none">
          <path
            d="M0 50 L15 42 L30 46 L45 30 L60 34 L75 18 L100 8"
            fill="none" stroke="#34d399" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
            className="anim-draw" style={{ "--len": "140", ...d(700) } as React.CSSProperties}
            vectorEffect="non-scaling-stroke"
          />
        </svg>
      </div>
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/* 5. Integraciones: hub central con paquetes de datos viajando               */
/* -------------------------------------------------------------------------- */
const IntegrationsScene = () => {
  const nodes = [
    { x: 60, y: 45, label: "Pasarela de pago", Icon: CreditCard },
    { x: 340, y: 45, label: "Facturación SII", Icon: FileText },
    { x: 60, y: 185, label: "CRM", Icon: Users },
    { x: 340, y: 185, label: "Base de datos", Icon: Database },
  ];
  const cx = 200;
  const cy = 115;
  return (
    <div className="relative h-full max-w-full aspect-[400/230] mx-auto">
      <svg viewBox="0 0 400 230" className="absolute inset-0 w-full h-full" preserveAspectRatio="xMidYMid meet">
        {nodes.map((n, i) => {
          const path = `M ${n.x} ${n.y} C ${(n.x + cx) / 2} ${n.y}, ${(n.x + cx) / 2} ${cy}, ${cx} ${cy}`;
          return (
            <g key={i}>
              <path d={path} fill="none" stroke="#19C6E6" strokeOpacity="0.25" strokeWidth="1.5" strokeDasharray="4 6" />
              <path
                d={path} fill="none" stroke="#19C6E6" strokeWidth="1.5"
                className="anim-draw" style={{ "--len": "220", ...d(200 + i * 150) } as React.CSSProperties}
              />
              <circle r="3.5" fill="#ffffff">
                <animateMotion dur={`${2 + i * 0.35}s`} repeatCount="indefinite" path={path} keyPoints={i % 2 ? "1;0" : "0;1"} keyTimes="0;1" calcMode="linear" />
              </circle>
              <circle r="7" fill="#19C6E6" opacity="0.25">
                <animateMotion dur={`${2 + i * 0.35}s`} repeatCount="indefinite" path={path} keyPoints={i % 2 ? "1;0" : "0;1"} keyTimes="0;1" calcMode="linear" />
              </circle>
            </g>
          );
        })}
      </svg>
      {/* Hub central */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <span className="absolute inset-0 rounded-2xl border border-[#19C6E6]/60 animate-ping-soft" />
        <div className="anim-pop relative w-16 h-16 rounded-2xl bg-gradient-to-br from-[#1479D4] to-[#19C6E6] flex flex-col items-center justify-center shadow-[0_0_40px_rgba(25,198,230,0.5)]">
          <span className="text-[9px] font-mono font-bold text-white">API</span>
          <span className="text-[8px] font-mono text-white/80">REST</span>
        </div>
      </div>
      {/* Nodos */}
      {nodes.map(({ x, y, label, Icon }, i) => (
        <div
          key={label}
          className="absolute -translate-x-1/2 -translate-y-1/2"
          style={{ left: `${(x / 400) * 100}%`, top: `${(y / 230) * 100}%` }}
        >
          <div className="anim-pop flex items-center gap-1.5 rounded-lg bg-[#071A35] border border-[#19C6E6]/30 px-2 py-1.5 shadow-lg" style={d(100 + i * 150)}>
            <Icon className="w-3.5 h-3.5 text-[#19C6E6]" />
            <span className="text-[9px] font-semibold text-white whitespace-nowrap">{label}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/* 6. Soporte: monitoreo con pulso, uptime y alerta resuelta                  */
/* -------------------------------------------------------------------------- */
const SupportScene = () => (
  <div className="grid grid-cols-5 gap-3 h-full">
    <div className="col-span-3 rounded-xl bg-[#040F22] border border-white/10 p-3 flex flex-col">
      <div className="flex items-center justify-between text-[9px] font-mono mb-1">
        <span className="text-slate-400">MONITOREO EN VIVO</span>
        <span className="text-emerald-400 flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> 24/7
        </span>
      </div>
      <svg viewBox="0 0 200 70" className="w-full flex-1" preserveAspectRatio="none">
        <path
          d="M0 40 L40 40 L50 40 L56 18 L64 60 L72 30 L78 40 L120 40 L128 40 L134 22 L142 56 L150 34 L156 40 L200 40"
          fill="none" stroke="#19C6E6" strokeWidth="2" strokeLinejoin="round"
          className="anim-heartbeat" vectorEffect="non-scaling-stroke"
        />
      </svg>
      <div className="grid grid-cols-3 gap-2 mt-1">
        {[
          ["Uptime", "99,9%"],
          ["Respuesta", "<24h"],
          ["Respaldos", "Diarios"],
        ].map(([k, v], i) => (
          <div key={k} className="anim-rise" style={d(300 + i * 120)}>
            <p className="text-[8px] text-slate-500 uppercase">{k}</p>
            <p className="text-xs font-bold font-mono text-white">{v}</p>
          </div>
        ))}
      </div>
    </div>
    <div className="col-span-2 flex flex-col justify-center gap-2.5">
      {[
        { t: "Servidor web", ok: true },
        { t: "Base de datos", ok: true },
        { t: "Certificado SSL", ok: true },
      ].map((s, i) => (
        <div key={s.t} className="anim-slide-in flex items-center gap-2 rounded-lg bg-white/[0.05] border border-white/10 px-2.5 py-2" style={d(400 + i * 180)}>
          <span className="relative flex w-2 h-2">
            <span className="absolute inset-0 rounded-full bg-emerald-400 animate-ping opacity-60" />
            <span className="relative w-2 h-2 rounded-full bg-emerald-400" />
          </span>
          <span className="text-[10px] text-white">{s.t}</span>
        </div>
      ))}
      <div className="anim-pop flex items-center gap-2 rounded-lg bg-emerald-500/15 border border-emerald-400/40 px-2.5 py-2" style={d(1300)}>
        <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
        <span className="text-[10px] font-semibold text-emerald-300">Incidente resuelto</span>
      </div>
    </div>
  </div>
);

/* -------------------------------------------------------------------------- */
/* 7. E-Commerce: carrito de compras + cálculo de envío + checkout rápido     */
/* -------------------------------------------------------------------------- */
const EcommerceScene = () => (
  <div className="relative h-full rounded-xl bg-[#040F22] border border-white/10 p-3.5 flex flex-col justify-between overflow-hidden">
    {/* Barra superior de tienda */}
    <div className="flex items-center justify-between pb-2.5 border-b border-white/10">
      <div className="flex items-center gap-2">
        <span className="w-2.5 h-2.5 rounded bg-emerald-400 shadow-[0_0_8px_#34d399]" />
        <span className="text-[11px] font-mono text-slate-300 font-semibold">tienda-online.cl</span>
      </div>
      <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-[#19C6E6]/15 border border-[#19C6E6]/30 text-[10px] font-mono text-[#19C6E6]">
        <ShoppingCart className="w-3 h-3" />
        <span>3 ítems</span>
      </div>
    </div>

    {/* Tarjeta de producto + desglose */}
    <div className="grid grid-cols-5 gap-3 my-1">
      <div className="col-span-3 rounded-lg bg-white/[0.04] border border-white/10 p-2.5 space-y-2">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-md bg-gradient-to-br from-[#1479D4] to-[#19C6E6] flex items-center justify-center shrink-0">
            <Tag className="w-4 h-4 text-white" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-[10px] font-semibold text-white truncate">Pack Distribución Pro</p>
            <p className="text-[9px] text-[#19C6E6] font-mono">$24.990 CLP</p>
          </div>
        </div>
        <div className="flex items-center gap-1.5 text-[9px] text-slate-400">
          <Truck className="w-3 h-3 text-emerald-400" />
          <span>Envío a Valparaíso / RM: <strong className="text-emerald-400">Gratis</strong></span>
        </div>
      </div>

      <div className="col-span-2 rounded-lg bg-[#1479D4]/10 border border-[#1479D4]/30 p-2 flex flex-col justify-center text-center">
        <span className="text-[9px] text-slate-400 font-mono">Total Orden</span>
        <span className="text-xs font-bold text-white font-mono mt-0.5">$24.990</span>
        <span className="inline-block mt-1 text-[8px] font-mono bg-emerald-400/20 text-emerald-300 rounded px-1 py-0.5">
          Stock sincronizado
        </span>
      </div>
    </div>

    {/* Botón de Checkout con confirmación animada */}
    <div className="space-y-1.5">
      <div
        className="anim-pop flex items-center justify-between px-3 py-2 rounded-lg bg-gradient-to-r from-[#1479D4] to-[#19C6E6] text-white font-semibold text-[11px] shadow-[0_4px_16px_rgba(20,121,212,0.35)]"
        style={d(600)}
      >
        <span className="flex items-center gap-1.5">
          <Lock className="w-3 h-3 text-white" />
          Checkout Seguro (1-Paso)
        </span>
        <CheckCircle2 className="w-3.5 h-3.5 text-white" />
      </div>
      <p className="text-[8.5px] text-center text-slate-500 font-mono">
        Integrado con despachos Starken / Blue Express / Chilexpress
      </p>
    </div>
  </div>
);

/* -------------------------------------------------------------------------- */
/* 8. Medios de pago: Webpay Plus / Mercado Pago / Flow + confirmación webhook */
/* -------------------------------------------------------------------------- */
const PaymentsScene = () => (
  <div className="relative h-full rounded-xl bg-[#040F22] border border-white/10 p-3.5 flex flex-col justify-between overflow-hidden">
    {/* Pasarelas admitidas */}
    <div className="flex items-center justify-between pb-2 border-b border-white/10">
      <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">Pasarelas de Pago</span>
      <div className="flex items-center gap-1.5">
        <span className="px-1.5 py-0.5 rounded text-[8px] font-bold bg-[#E60000]/20 border border-[#E60000]/40 text-red-400">Webpay</span>
        <span className="px-1.5 py-0.5 rounded text-[8px] font-bold bg-[#009EE3]/20 border border-[#009EE3]/40 text-sky-400">MercadoPago</span>
        <span className="px-1.5 py-0.5 rounded text-[8px] font-bold bg-[#FF8000]/20 border border-[#FF8000]/40 text-amber-400">Flow</span>
      </div>
    </div>

    {/* Tarjeta de simulación de pago */}
    <div className="anim-rise rounded-xl bg-gradient-to-br from-[#0F294D] to-[#08182E] border border-white/15 p-3 relative overflow-hidden" style={d(200)}>
      <div className="flex items-center justify-between mb-2">
        <CreditCard className="w-5 h-5 text-[#19C6E6]" />
        <span className="text-[9px] font-mono text-slate-400">•••• 4821</span>
      </div>
      <div className="flex items-baseline justify-between">
        <div>
          <span className="text-[8px] text-slate-400 font-mono block">MONTO TRANSACCIÓN</span>
          <span className="text-sm font-bold text-white font-mono">$48.900 CLP</span>
        </div>
        <div className="text-right">
          <span className="text-[8px] text-emerald-400 font-mono block">ESTADO</span>
          <span className="text-[10px] font-bold text-emerald-400 font-mono flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3 text-emerald-400" /> Aprobada
          </span>
        </div>
      </div>
    </div>

    {/* Webhook en tiempo real */}
    <div className="anim-pop rounded-lg bg-emerald-500/10 border border-emerald-400/30 px-3 py-2 flex items-center justify-between" style={d(800)}>
      <div className="flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
        <span className="text-[9.5px] font-mono text-emerald-300">
          webhook: <strong className="text-white">HTTP 200 OK</strong>
        </span>
      </div>
      <span className="text-[8.5px] font-mono text-slate-400">Conciliado al instante</span>
    </div>
  </div>
);

const SCENES: Record<string, React.FC> = {
  "software-a-medida": SoftwareScene,
  "desarrollo-web": WebScene,
  ecommerce: EcommerceScene,
  "medios-de-pago": PaymentsScene,
  "aplicaciones-moviles": MobileScene,
  "sistemas-de-gestion": DashboardScene,
  integraciones: IntegrationsScene,
  "soporte-tecnologico": SupportScene,
};
const FALLBACK = [
  SoftwareScene,
  WebScene,
  EcommerceScene,
  PaymentsScene,
  MobileScene,
  DashboardScene,
  IntegrationsScene,
  SupportScene,
];

export const ServiceScene: React.FC<{ slug: string; index: number }> = ({ slug, index }) => {
  const Scene = SCENES[slug] ?? FALLBACK[index % FALLBACK.length];
  return <Scene />;
};
