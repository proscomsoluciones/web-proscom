"use client";

import React, { useCallback, useEffect, useState } from "react";
import {
  Play,
  Pause,
  RotateCcw,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  XCircle,
  Lightbulb,
  BookOpen,
  Trophy,
} from "lucide-react";

/* -------------------------------------------------------------------------- */
/*  Reproductor de pasos                                                       */
/* -------------------------------------------------------------------------- */
export function useStepPlayer(total: number, stepMs = 2800, gate?: number) {
  // -1 = estado inicial (aún no se envía nada)
  const [step, setStep] = useState(-1);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    if (!playing) return;
    const t = window.setTimeout(() => {
      // `gate`: paso que no se puede pasar hasta que el usuario resuelva un desafío
      if (step >= total - 1 || step === gate) setPlaying(false);
      else setStep((s) => s + 1);
    }, step === -1 ? 50 : stepMs);
    return () => window.clearTimeout(t);
  }, [playing, step, total, stepMs, gate]);

  const play = useCallback(() => {
    setStep((s) => (s >= total - 1 ? -1 : s));
    setPlaying(true);
  }, [total]);
  const pause = useCallback(() => setPlaying(false), []);
  const reset = useCallback(() => {
    setPlaying(false);
    setStep(-1);
  }, []);
  const next = useCallback(() => {
    setPlaying(false);
    setStep((s) => (s === gate ? s : Math.min(s + 1, total - 1)));
  }, [total, gate]);
  const prev = useCallback(() => {
    setPlaying(false);
    setStep((s) => Math.max(s - 1, -1));
  }, []);
  const goto = useCallback(
    (i: number) => {
      setPlaying(false);
      setStep(gate !== undefined && i > gate ? gate : i);
    },
    [gate]
  );

  return { step, playing, play, pause, reset, next, prev, goto, done: step === total - 1, blocked: step === gate };
}

/* -------------------------------------------------------------------------- */
/*  Selector de escenarios                                                     */
/* -------------------------------------------------------------------------- */
export interface ScenarioOption {
  id: string;
  label: string;
  hint?: string;
  tone?: "ok" | "error" | "info";
}

export const ScenarioPicker: React.FC<{
  options: ScenarioOption[];
  value: string;
  onChange: (id: string) => void;
  label?: string;
}> = ({ options, value, onChange, label = "Elige un escenario" }) => (
  <div>
    <p className="text-[11px] font-mono uppercase tracking-wider text-slate-400 mb-2 lg:sr-only">{label}</p>
    <div className="flex flex-wrap gap-2" role="radiogroup" aria-label={label}>
      {options.map((o) => {
        const active = o.id === value;
        const dot = o.tone === "error" ? "bg-rose-400" : o.tone === "info" ? "bg-[#19C6E6]" : "bg-emerald-400";
        return (
          <button
            key={o.id}
            type="button"
            role="radio"
            aria-checked={active}
            onClick={() => onChange(o.id)}
            title={o.hint}
            className={`group inline-flex items-center gap-2 rounded-xl border px-3.5 py-2 lg:py-2.5 text-left transition-all duration-200 ${
              active
                ? "bg-[#1479D4] border-[#19C6E6] text-white shadow-lg shadow-[#1479D4]/30"
                : "bg-white/[0.04] border-white/10 text-slate-300 hover:bg-white/[0.08] hover:border-white/20"
            }`}
          >
            <span className={`w-2 h-2 rounded-full ${dot}`} />
            <span className="leading-tight">
              <span className="block text-xs font-semibold">{o.label}</span>
              {o.hint && (
                <span className={`block lg:hidden text-[10px] font-mono ${active ? "text-white/70" : "text-slate-500"}`}>{o.hint}</span>
              )}
            </span>
          </button>
        );
      })}
    </div>
  </div>
);

/* -------------------------------------------------------------------------- */
/*  Controles de reproducción                                                  */
/* -------------------------------------------------------------------------- */
/** Encaja el laboratorio completo en la pantalla si quedó cortado. */
export function fitLabInView(from: HTMLElement | null) {
  const frame = from?.closest<HTMLElement>(".lab-frame");
  if (!frame || !window.matchMedia("(min-width: 1024px)").matches) return;
  const r = frame.getBoundingClientRect();
  if (r.top < 70 || r.bottom > window.innerHeight + 4) frame.scrollIntoView({ behavior: "smooth", block: "start" });
}

export const PlayerControls: React.FC<{
  player: ReturnType<typeof useStepPlayer>;
  total: number;
  playLabel?: string;
}> = ({ player, total, playLabel = "Enviar solicitud" }) => (
  <div className="flex flex-wrap items-center gap-2">
    {player.playing ? (
      <button
        type="button"
        onClick={player.pause}
        className="inline-flex items-center gap-2 rounded-xl bg-white/10 hover:bg-white/15 border border-white/15 text-white text-sm font-semibold px-4 py-2.5 transition-colors"
      >
        <Pause className="w-4 h-4" /> Pausar
      </button>
    ) : (
      <button
        type="button"
        onClick={(e) => {
          fitLabInView(e.currentTarget);
          player.play();
        }}
        className="btn-shine inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#1479D4] to-[#1688F5] hover:brightness-110 text-white text-sm font-bold px-5 py-2.5 shadow-lg shadow-[#1479D4]/40 transition"
      >
        <Play className="w-4 h-4 fill-white" /> {player.done ? "Repetir" : player.step >= 0 ? "Continuar" : playLabel}
      </button>
    )}
    <div className="inline-flex items-center rounded-xl border border-white/15 bg-white/[0.04] overflow-hidden">
      <button type="button" onClick={player.prev} disabled={player.step < 0} aria-label="Paso anterior" className="p-2.5 text-slate-300 hover:text-white hover:bg-white/10 disabled:opacity-30">
        <ChevronLeft className="w-4 h-4" />
      </button>
      <span className="px-2 text-xs font-mono text-slate-300 tabular-nums min-w-[64px] text-center">
        {player.step < 0 ? "Inicio" : `${player.step + 1} / ${total}`}
      </span>
      <button type="button" onClick={player.next} disabled={player.step >= total - 1 || player.blocked} aria-label="Paso siguiente" className="p-2.5 text-slate-300 hover:text-white hover:bg-white/10 disabled:opacity-30">
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>
    <button type="button" onClick={player.reset} aria-label="Reiniciar" className="p-2.5 rounded-xl border border-white/15 bg-white/[0.04] text-slate-300 hover:text-white hover:bg-white/10">
      <RotateCcw className="w-4 h-4" />
    </button>
  </div>
);

/* -------------------------------------------------------------------------- */
/*  Línea de pasos                                                             */
/* -------------------------------------------------------------------------- */
export const StepTimeline: React.FC<{
  steps: { title: string; tone?: "ok" | "error" }[];
  current: number;
  onSelect: (i: number) => void;
}> = ({ steps, current, onSelect }) => (
  <ol className="relative flex items-start gap-1 overflow-x-auto pb-1 [scrollbar-width:none]">
    {steps.map((s, i) => {
      const state = i < current ? "done" : i === current ? "now" : "next";
      const err = s.tone === "error" && i <= current;
      return (
        <li key={i} className="flex-1 min-w-[78px]">
          <button type="button" onClick={() => onSelect(i)} className="group w-full text-left">
            <span
              className={`block h-1.5 rounded-full transition-all duration-500 ${
                err ? "bg-rose-400" : state === "next" ? "bg-white/10 group-hover:bg-white/25" : "bg-gradient-to-r from-[#1479D4] to-[#19C6E6]"
              } ${state === "now" ? "shadow-[0_0_12px_#19C6E6]" : ""}`}
            />
            <span className={`mt-2 block text-[10px] font-mono ${state === "now" ? "text-[#19C6E6]" : "text-slate-500"}`}>
              PASO {i + 1}
            </span>
            <span className={`block text-[11px] leading-tight font-semibold ${state === "next" ? "text-slate-500" : "text-slate-200"}`}>
              {s.title}
            </span>
          </button>
        </li>
      );
    })}
  </ol>
);

/* -------------------------------------------------------------------------- */
/*  Bloque de código con resaltado simple                                      */
/* -------------------------------------------------------------------------- */
const TOKEN_RE = /("(?:[^"\\]|\\.)*"(?=\s*:))|("(?:[^"\\]|\\.)*")|(\b\d+(?:\.\d+)?\b)|(\b(?:GET|POST|PUT|DELETE|SELECT|FROM|WHERE|INSERT|INTO|VALUES|LIMIT|AND|true|false|null|HTTP\/\d(?:\.\d)?)\b)|(\/\/.*$|#.*$)/gm;

function highlight(line: string, key: number) {
  const out: React.ReactNode[] = [];
  let last = 0;
  line.replace(TOKEN_RE, (m, k, str, num, kw, comment, offset: number) => {
    if (offset > last) out.push(line.slice(last, offset));
    const cls = k
      ? "text-[#82AAFF]"
      : str
        ? "text-[#C3E88D]"
        : num
          ? "text-[#F78C6C]"
          : kw
            ? "text-[#C792EA] font-bold"
            : "text-slate-500 italic";
    out.push(
      <span key={`${key}-${offset}`} className={cls}>
        {m}
      </span>
    );
    last = offset + m.length;
    return m;
  });
  if (last < line.length) out.push(line.slice(last));
  return out;
}

export interface CodeSnippet {
  label: string;
  content: string;
  tone?: "ok" | "error" | "info";
}

export const CodeBlock: React.FC<{ code: CodeSnippet }> = ({ code }) => {
  const badge = code.tone === "error" ? "text-rose-300 border-rose-400/40 bg-rose-500/10" : code.tone === "ok" ? "text-emerald-300 border-emerald-400/40 bg-emerald-500/10" : "text-[#19C6E6] border-[#19C6E6]/30 bg-[#19C6E6]/10";
  return (
    <div className="anim-rise rounded-xl bg-[#040F22] border border-white/10 overflow-hidden">
      <div className="flex items-center justify-between px-3 py-2 border-b border-white/10">
        <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border ${badge}`}>{code.label}</span>
        <span className="flex gap-1">
          <span className="w-2 h-2 rounded-full bg-white/15" />
          <span className="w-2 h-2 rounded-full bg-white/15" />
          <span className="w-2 h-2 rounded-full bg-white/15" />
        </span>
      </div>
      <pre className="p-3 text-[11.5px] leading-relaxed font-mono text-slate-200 overflow-x-auto">
        {code.content.split("\n").map((l, i) => (
          <div key={i}>{highlight(l, i)}{l === "" ? " " : null}</div>
        ))}
      </pre>
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/*  Panel de narración                                                         */
/* -------------------------------------------------------------------------- */
export const Narration: React.FC<{
  stepIndex: number;
  total: number;
  title: string;
  text: string;
  tip?: string;
  code?: CodeSnippet;
  tone?: "ok" | "error";
}> = ({ stepIndex, total, title, text, tip, code, tone }) => (
  <div key={`${stepIndex}-${title}`} className="space-y-4">
    <div className="anim-rise">
      <p className="text-[11px] font-mono uppercase tracking-wider text-[#19C6E6]">
        {stepIndex < 0 ? "Cómo usar este laboratorio" : `Paso ${stepIndex + 1} de ${total}`}
      </p>
      <h3 className={`text-xl font-extrabold mt-1 ${tone === "error" ? "text-rose-300" : "text-white"}`}>{title}</h3>
      <p className="text-sm text-slate-300 leading-relaxed mt-2">{text}</p>
    </div>
    {code && <CodeBlock code={code} />}
    {tip && (
      <div className="anim-rise flex gap-2.5 rounded-xl bg-amber-400/10 border border-amber-300/25 p-3" style={{ "--d": "150ms" } as React.CSSProperties}>
        <Lightbulb className="w-4 h-4 text-amber-300 shrink-0 mt-0.5" />
        <p className="text-xs text-amber-100/90 leading-relaxed">{tip}</p>
      </div>
    )}
  </div>
);

/* -------------------------------------------------------------------------- */
/*  Glosario                                                                    */
/* -------------------------------------------------------------------------- */
export const Glossary: React.FC<{ terms: { term: string; def: string }[] }> = ({ terms }) => {
  const [open, setOpen] = useState(0);
  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      <div className="lg:col-span-4">
        <div className="flex items-center gap-2 text-[#1479D4] mb-2">
          <BookOpen className="w-5 h-5" />
          <span className="text-xs font-mono font-bold uppercase tracking-wider">Glosario rápido</span>
        </div>
        <h3 className="text-2xl font-extrabold text-[#071A35]">Las palabras clave, sin tecnicismos</h3>
        <p className="text-sm text-slate-600 mt-2">Toca cada término para ver su explicación.</p>
      </div>
      <div className="lg:col-span-8">
        <div className="flex flex-wrap gap-2 mb-4" role="tablist">
          {terms.map((t, i) => (
            <button
              key={t.term}
              type="button"
              role="tab"
              aria-selected={open === i}
              onClick={() => setOpen(i)}
              className={`rounded-full px-4 py-2 text-sm font-semibold border transition-all ${
                open === i ? "bg-[#071A35] text-white border-[#071A35] shadow-lg" : "bg-white text-slate-700 border-slate-200 hover:border-[#1479D4]/50"
              }`}
            >
              {t.term}
            </button>
          ))}
        </div>
        <div key={open} className="anim-rise rounded-2xl bg-white border border-slate-200 p-5 shadow-sm">
          <p className="text-base font-bold text-[#071A35]">{terms[open].term}</p>
          <p className="text-sm text-slate-600 leading-relaxed mt-1.5">{terms[open].def}</p>
        </div>
      </div>
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/*  Mini quiz                                                                   */
/* -------------------------------------------------------------------------- */
export interface QuizQuestion {
  q: string;
  options: string[];
  answer: number;
  why: string;
}

export const Quiz: React.FC<{ questions: QuizQuestion[] }> = ({ questions }) => {
  const [answers, setAnswers] = useState<(number | null)[]>(() => questions.map(() => null));
  const score = answers.filter((a, i) => a === questions[i].answer).length;
  const finished = answers.every((a) => a !== null);

  return (
    <div className="rounded-3xl bg-white border border-slate-200 shadow-sm p-6 sm:p-8">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
        <div>
          <p className="text-xs font-mono font-bold uppercase tracking-wider text-[#1479D4]">Pon a prueba lo aprendido</p>
          <h3 className="text-2xl font-extrabold text-[#071A35]">Mini desafío</h3>
        </div>
        <div className="flex items-center gap-2 rounded-xl bg-[#F3F6FA] border border-slate-200 px-4 py-2">
          <Trophy className={`w-5 h-5 ${finished && score === questions.length ? "text-amber-500" : "text-slate-400"}`} />
          <span className="text-sm font-bold text-[#071A35] tabular-nums">
            {score} / {questions.length}
          </span>
        </div>
      </div>
      <div className="space-y-6">
        {questions.map((q, qi) => {
          const chosen = answers[qi];
          return (
            <fieldset key={qi}>
              <legend className="text-sm font-bold text-[#071A35] mb-2.5">
                {qi + 1}. {q.q}
              </legend>
              <div className="grid sm:grid-cols-3 gap-2">
                {q.options.map((o, oi) => {
                  const isChosen = chosen === oi;
                  const isRight = oi === q.answer;
                  const show = chosen !== null;
                  return (
                    <button
                      key={oi}
                      type="button"
                      disabled={show}
                      onClick={() => setAnswers((a) => a.map((v, i) => (i === qi ? oi : v)))}
                      className={`flex items-start gap-2 text-left rounded-xl border px-3.5 py-3 text-sm transition-all ${
                        !show
                          ? "border-slate-200 hover:border-[#1479D4] hover:bg-[#1479D4]/5 text-slate-700"
                          : isRight
                            ? "border-emerald-400 bg-emerald-50 text-emerald-800"
                            : isChosen
                              ? "border-rose-300 bg-rose-50 text-rose-700"
                              : "border-slate-100 text-slate-400"
                      }`}
                    >
                      {show && isRight && <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5 text-emerald-500" />}
                      {show && isChosen && !isRight && <XCircle className="w-4 h-4 shrink-0 mt-0.5 text-rose-500" />}
                      <span>{o}</span>
                    </button>
                  );
                })}
              </div>
              {chosen !== null && (
                <p className="anim-rise text-xs text-slate-600 mt-2 pl-1">
                  <span className="font-bold">{chosen === q.answer ? "¡Correcto! " : "Casi. "}</span>
                  {q.why}
                </p>
              )}
            </fieldset>
          );
        })}
      </div>
      {finished && (
        <div className="anim-pop mt-6 flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-gradient-to-r from-[#071A35] to-[#0C284E] text-white p-4">
          <p className="text-sm">
            {score === questions.length ? "¡Puntaje perfecto! Ya dominas el concepto. 🎉" : `Obtuviste ${score} de ${questions.length}. Puedes repetir el laboratorio cuando quieras.`}
          </p>
          <button
            type="button"
            onClick={() => setAnswers(questions.map(() => null))}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#19C6E6] hover:underline"
          >
            <RotateCcw className="w-3.5 h-3.5" /> Intentar de nuevo
          </button>
        </div>
      )}
    </div>
  );
};

/* -------------------------------------------------------------------------- */
/*  Interruptor                                                                 */
/* -------------------------------------------------------------------------- */
export const Toggle: React.FC<{
  checked: boolean;
  onChange: (v: boolean) => void;
  label: string;
  icon?: React.ReactNode;
}> = ({ checked, onChange, label, icon }) => (
  <button
    type="button"
    role="switch"
    aria-checked={checked}
    onClick={() => onChange(!checked)}
    className={`inline-flex items-center gap-2.5 rounded-xl border px-3 py-2 text-xs font-semibold transition-all ${
      checked ? "bg-amber-400/15 border-amber-300/50 text-amber-100" : "bg-white/[0.04] border-white/10 text-slate-300 hover:border-white/25"
    }`}
  >
    {icon}
    {label}
    <span className={`relative w-8 h-4.5 rounded-full transition-colors ${checked ? "bg-amber-400" : "bg-white/20"}`}>
      <span className={`absolute top-0.5 w-3.5 h-3.5 rounded-full bg-white shadow transition-all ${checked ? "left-4" : "left-0.5"}`} />
    </span>
  </button>
);
