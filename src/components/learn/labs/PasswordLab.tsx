"use client";

import React, { useMemo, useState } from "react";
import { Bot, Vault, Smartphone, Eye, EyeOff, CheckCircle2, Circle, ShieldCheck, Link2, XCircle, RotateCcw, Lock, Unlock } from "lucide-react";
import { Stage3D, Box3D, Billboard, FloorLinks, Packet3D, NodeLabel, type Point } from "../stage3d";
import { Toggle } from "../lab-ui";

/* -------------------------------------------------------------------------- */
/*  Estimación de fortaleza (100% local: la contraseña no sale del navegador) */
/* -------------------------------------------------------------------------- */
const COMMON = [
  "123456", "123456789", "12345678", "12345", "1234", "111111", "000000", "123123", "654321", "qwerty", "qwerty123",
  "password", "password1", "contraseña", "contrasena", "admin", "admin123", "abc123", "iloveyou", "teamo", "hola123",
  "chile", "chile123", "colocolo", "universidad", "santiago", "bienvenido", "qwertyuiop", "asdfgh", "zxcvbnm", "dragon",
];
const SEQUENCES = ["0123456789", "abcdefghijklmnopqrstuvwxyz", "qwertyuiop", "asdfghjkl", "zxcvbnm"];
const GUESSES_PER_SECOND = 1e10; // equipo de ataque con tarjetas gráficas (hash rápido)

function analyze(pw: string) {
  const lower = /[a-zñ]/.test(pw);
  const upper = /[A-ZÑ]/.test(pw);
  const digit = /\d/.test(pw);
  const symbol = /[^a-zA-ZñÑ0-9]/.test(pw);
  const pool = (lower ? 26 : 0) + (upper ? 26 : 0) + (digit ? 10 : 0) + (symbol ? 33 : 0);
  const lc = pw.toLowerCase();

  const isCommon = COMMON.includes(lc) || COMMON.some((c) => lc.replace(/[\d!@#$.*]+$/, "") === c && c.length >= 5);
  const wordPlusDigits = /^[a-zñ]+\d{0,4}[!.*@#]?$/i.test(pw) && pw.length <= 12;
  const hasSequence = SEQUENCES.some((seq) => {
    for (let i = 0; i + 4 <= seq.length; i++) if (lc.includes(seq.slice(i, i + 4))) return true;
    return false;
  });
  const repeated = /(.)\1{2,}/.test(pw);

  let log10Combos = pw.length * Math.log10(Math.max(pool, 1));
  if (wordPlusDigits) log10Combos = Math.min(log10Combos, 5 + (pw.match(/\d/g)?.length ?? 0) + 0.5); // diccionario + números
  if (hasSequence) log10Combos -= 3;
  if (repeated) log10Combos -= 2;
  if (isCommon) log10Combos = 0;
  if (!pw) log10Combos = 0;

  const log10Seconds = log10Combos - Math.log10(GUESSES_PER_SECOND) - Math.log10(2);
  const level = !pw ? -1 : log10Seconds < 0 ? 0 : log10Seconds < 5 ? 1 : log10Seconds < 8 ? 2 : log10Seconds < 11 ? 3 : 4;

  return {
    level,
    log10Seconds,
    checks: [
      { ok: pw.length >= 12, t: "12 caracteres o más" },
      { ok: upper && lower, t: "Mayúsculas y minúsculas" },
      { ok: digit, t: "Números" },
      { ok: symbol, t: "Símbolos ( ! ? # * … )" },
      { ok: !!pw && !isCommon && !wordPlusDigits, t: "No es una palabra común + números" },
      { ok: !!pw && !hasSequence && !repeated, t: "Sin secuencias (1234, qwerty, aaa)" },
    ],
    isCommon,
  };
}

function humanTime(log10s: number) {
  if (log10s < 0) return "al instante";
  const s = Math.pow(10, log10s);
  const units: [number, string, string][] = [
    [60, "segundo", "segundos"],
    [3600, "minuto", "minutos"],
    [86400, "hora", "horas"],
    [86400 * 30, "día", "días"],
    [86400 * 365, "mes", "meses"],
  ];
  if (s < 60) return `${Math.max(1, Math.round(s))} segundo${Math.round(s) === 1 ? "" : "s"}`;
  for (let i = 1; i < units.length; i++) {
    if (s < units[i][0]) {
      const v = Math.round(s / units[i - 1][0]);
      return `${v} ${v === 1 ? units[i][1] : units[i][2]}`;
    }
  }
  const years = s / (86400 * 365);
  if (years < 1000) return `${Math.round(years)} año${Math.round(years) === 1 ? "" : "s"}`;
  if (years < 1e6) return `${Math.round(years / 1000)} mil años`;
  if (years < 1.4e10) return `${Math.round(years / 1e6).toLocaleString("es-CL")} millones de años`;
  return "más que la edad del universo";
}

const LEVELS = [
  { label: "Muy débil", color: "#fb7185" },
  { label: "Débil", color: "#fb923c" },
  { label: "Aceptable", color: "#fbbf24" },
  { label: "Fuerte", color: "#34d399" },
  { label: "Muy fuerte", color: "#19C6E6" },
];

/* -------------------------------------------------------------------------- */
/*  Juego: ¿cuál enlace es falso?                                              */
/* -------------------------------------------------------------------------- */
const ROUNDS = [
  {
    urls: ["https://www.bancoejemplo.cl/personas", "https://bancoejemplo.cl.verificacion-clientes.com/login", "https://www.bancoejemplo.cl/ayuda"],
    fake: 1,
    why: "El dominio real es lo que va justo antes de la primera «/»: aquí es verificacion-clientes.com. «bancoejemplo.cl» solo está puesto adelante para engañar.",
  },
  {
    urls: ["https://ayuda.tutienda.cl/envios", "https://tutienda.cl/mi-cuenta", "https://tutienda-cl.com/mi-cuenta"],
    fake: 2,
    why: "«tutienda-cl.com» es otro dominio, de otra persona. Un guion y un .com bastan para crear una copia falsa.",
  },
  {
    urls: ["https://www.bancoejernplo.cl/login", "https://www.bancoejemplo.cl/login", "https://app.bancoejemplo.cl"],
    fake: 0,
    why: "Mira bien: «ejernplo» usa «r» + «n», que juntas parecen una «m». Los estafadores registran dominios casi idénticos.",
  },
];

const PhishingGame: React.FC = () => {
  const [round, setRound] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const done = round >= ROUNDS.length;
  const r = ROUNDS[Math.min(round, ROUNDS.length - 1)];

  return (
    <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
      <div className="flex items-center justify-between gap-3 mb-3">
        <p className="flex items-center gap-2 text-sm font-bold text-white">
          <Link2 className="w-4 h-4 text-[#19C6E6]" /> Juego: ¿cuál enlace es falso?
        </p>
        <span className="text-xs font-mono text-slate-400">
          {done ? `${score}/${ROUNDS.length}` : `Ronda ${round + 1}/${ROUNDS.length}`}
        </span>
      </div>
      {done ? (
        <div className="anim-pop text-center py-4">
          <p className="text-white font-bold">{score === ROUNDS.length ? "¡Ojo de experto! 🕵️" : `Detectaste ${score} de ${ROUNDS.length}.`}</p>
          <p className="text-xs text-slate-400 mt-1">Antes de escribir tu clave, revisa siempre el dominio en la barra de direcciones.</p>
          <button type="button" onClick={() => { setRound(0); setPicked(null); setScore(0); }} className="mt-3 inline-flex items-center gap-1.5 text-xs font-bold text-[#19C6E6] hover:underline">
            <RotateCcw className="w-3.5 h-3.5" /> Jugar de nuevo
          </button>
        </div>
      ) : (
        <>
          <p className="text-xs text-slate-400 mb-3">Uno de estos enlaces te llevaría a una página falsa. Tócalo.</p>
          <div className="space-y-2">
            {r.urls.map((u, i) => {
              const show = picked !== null;
              const isFake = i === r.fake;
              return (
                <button
                  key={u}
                  type="button"
                  disabled={show}
                  onClick={() => {
                    setPicked(i);
                    if (i === r.fake) setScore((s) => s + 1);
                  }}
                  className={`w-full flex items-center gap-2 text-left rounded-xl border px-3 py-2.5 font-mono text-[12px] break-all transition-all ${
                    !show
                      ? "border-white/15 bg-[#040F22] text-slate-200 hover:border-[#19C6E6]/60"
                      : isFake
                        ? "border-rose-400 bg-rose-500/15 text-rose-100"
                        : picked === i
                          ? "border-amber-300 bg-amber-400/10 text-amber-100"
                          : "border-white/10 bg-[#040F22] text-slate-500"
                  }`}
                >
                  {show && isFake && <XCircle className="w-4 h-4 shrink-0 text-rose-400" />}
                  {u}
                </button>
              );
            })}
          </div>
          {picked !== null && (
            <div className="anim-rise mt-3">
              <p className={`text-xs ${picked === r.fake ? "text-emerald-300" : "text-amber-200"}`}>
                <strong>{picked === r.fake ? "¡Bien visto! " : "Ese era real. "}</strong>
                {r.why}
              </p>
              <button type="button" onClick={() => { setRound((x) => x + 1); setPicked(null); }} className="mt-2 text-xs font-bold text-[#19C6E6] hover:underline">
                {round + 1 < ROUNDS.length ? "Siguiente ronda →" : "Ver resultado →"}
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/*  Laboratorio                                                                 */
/* -------------------------------------------------------------------------- */
const ATTACKER: Point = { x: 120, y: 260 };
const VAULT: Point = { x: 680, y: 240 };
const WALL_X = [300, 390, 480, 570];

export const PasswordLab: React.FC = () => {
  const [pw, setPw] = useState("");
  const [visible, setVisible] = useState(true);
  const [twoFactor, setTwoFactor] = useState(false);
  const a = useMemo(() => analyze(pw), [pw]);
  const lvl = a.level >= 0 ? LEVELS[a.level] : null;
  const walls = Math.max(a.level, 0);
  const cracked = !!pw && a.level <= 1 && !twoFactor;
  const blockedBy2fa = !!pw && a.level <= 1 && twoFactor;

  return (
    <div className="lab-frame rounded-[2rem] bg-gradient-to-b from-[#0A1E3B] to-[#071A35] border border-white/10 shadow-2xl shadow-[#071A35]/40 overflow-hidden">
      {/* Entrada */}
      <div className="p-5 sm:p-6 lg:py-4 border-b border-white/10 grid lg:grid-cols-12 gap-4 items-end">
        <div className="lg:col-span-8">
          <label htmlFor="pw-test" className="block text-[11px] font-mono uppercase tracking-wider text-slate-400 mb-2">
            Escribe una contraseña de prueba
          </label>
          <div className="relative">
            <input
              id="pw-test"
              type={visible ? "text" : "password"}
              value={pw}
              onChange={(e) => setPw(e.target.value)}
              autoComplete="off"
              spellCheck={false}
              placeholder="Ej: chile123  ·  o prueba: Cafe-Montaña-Azul-27"
              className="w-full rounded-xl bg-[#040F22] border border-white/15 focus:border-[#19C6E6] focus:outline-none px-4 py-3.5 pr-12 font-mono text-white placeholder:text-slate-600"
            />
            <button type="button" onClick={() => setVisible((v) => !v)} aria-label={visible ? "Ocultar" : "Mostrar"} className="absolute right-3 top-1/2 -translate-y-1/2 p-1.5 text-slate-400 hover:text-white">
              {visible ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
          <p className="mt-2 flex items-center gap-1.5 text-[11px] text-slate-500">
            <Lock className="w-3 h-3" /> Se analiza solo en tu navegador: no se envía ni se guarda. Aun así, no uses una contraseña real.
          </p>
        </div>
        <div className="lg:col-span-4 flex lg:justify-end">
          <Toggle checked={twoFactor} onChange={setTwoFactor} label="Doble factor (2FA)" icon={<Smartphone className="w-4 h-4" />} />
        </div>
      </div>

      <div className="lab-main grid grid-cols-1 lg:grid-cols-12">
        {/* Escena */}
        <div className="lab-stage lg:col-span-7 xl:col-span-8 relative border-b lg:border-b-0 lg:border-r border-white/10">
          <Stage3D label="Escena 3D: un programa de ataque intenta adivinar la contraseña; cada nivel de fortaleza agrega una barrera frente a la bóveda">
            <FloorLinks links={[{ from: ATTACKER, to: VAULT, active: !!pw, color: cracked ? "#fb7185" : undefined }]} />

            {/* Atacante */}
            <Box3D x={ATTACKER.x} y={ATTACKER.y} w={80} d={80} h={60} top="#7F1D1D" front="#5B1414" side="#450A0A" glow={!!pw} />
            <Billboard x={ATTACKER.x} y={ATTACKER.y} z={100}>
              <NodeLabel title="Programa de ataque" subtitle="10 mil millones de intentos/s" icon={<Bot />} active={!!pw} tone="error" />
            </Billboard>

            {/* Barreras según la fortaleza */}
            {WALL_X.map((x, i) => (
              <Box3D
                key={x}
                x={x}
                y={250}
                w={16}
                d={200}
                h={i < walls ? 90 : 4}
                top={lvl?.color ?? "#334155"}
                front="#0C2850"
                side={lvl?.color ?? "#1E293B"}
                glow={i < walls}
              />
            ))}

            {/* Barrera de doble factor */}
            {twoFactor && (
              <>
                <Box3D x={620} y={250} w={14} d={220} h={120} top="#FBBF24" front="#B45309" side="#F59E0B" glow />
                <Billboard x={620} y={360} z={10}>
                  <span className="inline-flex items-center gap-1 rounded-full bg-amber-400 text-[#040F22] text-[12px] font-bold px-2.5 py-1 shadow-[0_0_14px_#fbbf24]">
                    <Smartphone className="w-3.5 h-3.5" /> Código en tu celular
                  </span>
                </Billboard>
              </>
            )}

            {/* Bóveda */}
            <Box3D x={VAULT.x} y={VAULT.y} w={110} d={110} h={110} top={cracked ? "#9F1239" : "#1E5AA0"} front={cracked ? "#881337" : "#123766"} side={cracked ? "#4C0519" : "#0C2850"} />
            <Billboard x={VAULT.x} y={VAULT.y} z={140}>
              <div className="flex flex-col items-center gap-2">
                {pw &&
                  (cracked ? (
                    <Unlock className="anim-pop w-9 h-9 text-rose-400 drop-shadow-[0_0_10px_#fb7185]" />
                  ) : (
                    <ShieldCheck className="anim-pop w-9 h-9 text-emerald-400 drop-shadow-[0_0_10px_#34d399]" />
                  ))}
                <NodeLabel title="Tu cuenta" subtitle={cracked ? "¡descifrada!" : pw ? "protegida" : "esperando…"} icon={<Vault />} tone={cracked ? "error" : pw ? "ok" : undefined} />
              </div>
            </Billboard>

            {/* Intentos de ataque */}
            {pw &&
              [0, 1, 2].map((k) => (
                <Packet3D
                  key={`${k}-${cracked}-${walls}-${twoFactor}`}
                  from={ATTACKER}
                  to={cracked ? VAULT : { x: (twoFactor && a.level <= 1 ? 620 : WALL_X[0]) - 30, y: 250 + (k - 1) * 50 }}
                  duration={cracked ? 1400 : 1100}
                  delay={k * 400}
                  label={k === 1 ? (cracked ? "¡clave encontrada!" : "✗ intento fallido") : undefined}
                  color={cracked ? "#fb7185" : "#94a3b8"}
                  loop
                />
              ))}
          </Stage3D>
        </div>

        {/* Resultado */}
        <div className="lab-narration lg:col-span-5 xl:col-span-4 p-5 sm:p-6 space-y-4" aria-live="polite">
          <div>
            <p className="text-[11px] font-mono uppercase tracking-wider text-[#19C6E6]">Tiempo para descifrarla</p>
            <p className="text-2xl font-extrabold mt-1" style={{ color: lvl?.color ?? "#94a3b8" }}>
              {pw ? humanTime(a.log10Seconds) : "—"}
            </p>
            <div className="mt-3 grid grid-cols-5 gap-1">
              {LEVELS.map((l, i) => (
                <span key={l.label} className="h-2 rounded-full transition-colors duration-500" style={{ background: a.level >= i ? lvl?.color : "rgba(255,255,255,0.1)" }} />
              ))}
            </div>
            <p className="text-xs font-bold mt-1.5" style={{ color: lvl?.color ?? "#64748b" }}>
              {lvl ? lvl.label : "Escribe algo para analizar"}
            </p>
          </div>

          <ul className="space-y-1.5">
            {a.checks.map((c) => (
              <li key={c.t} className={`flex items-center gap-2 text-xs ${c.ok ? "text-slate-200" : "text-slate-500"}`}>
                {c.ok ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <Circle className="w-4 h-4" />}
                {c.t}
              </li>
            ))}
          </ul>

          <div className={`rounded-xl p-3 border text-xs leading-relaxed ${blockedBy2fa ? "bg-amber-400/10 border-amber-300/30 text-amber-100" : "bg-white/[0.04] border-white/10 text-slate-300"}`}>
            {blockedBy2fa
              ? "Tu clave es débil y el atacante la descubrió… pero el doble factor lo detiene: además necesita el código que llega a tu celular."
              : a.isCommon
                ? "Esta contraseña está en las listas que usan los atacantes: se prueba en los primeros segundos."
                : "Consejo: una frase de 3 o 4 palabras al azar con algún número y símbolo es fácil de recordar y muy difícil de descifrar."}
          </div>

          <PhishingGame />
        </div>
      </div>
    </div>
  );
};
