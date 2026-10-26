"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { Download, Upload, Trash2, Palette, Smartphone, Eye, Type, ShieldCheck } from "lucide-react";

/* -------------------------------------------------------------------------- */
/*  Creador de marcos para videos verticales (100% en el navegador)           */
/*  El logo y los textos nunca salen del equipo del usuario.                  */
/* -------------------------------------------------------------------------- */

type FormatId = "9:16" | "4:5";

interface Layout {
  h: number;
  title: [number, number]; // franja del título (y inicio, y fin)
  winY: number; // borde superior de la ventana del video
  winH: number; // alto de la ventana (16:9 a 1080 de ancho)
  subs: [number, number]; // franja libre para subtítulos
  logoY: number;
  logoMax: [number, number]; // ancho y alto máximos del logo
  footSize: number;
}

const W = 1080;
const LAYOUTS: Record<FormatId, Layout> = {
  // TikTok / Reels / Shorts: deja libres ~150 px arriba y la zona de la descripción abajo
  "9:16": { h: 1920, title: [180, 530], winY: 570, winH: 608, subs: [1195, 1520], logoY: 1545, logoMax: [340, 110], footSize: 38 },
  // Feed de Instagram
  "4:5": { h: 1350, title: [60, 380], winY: 410, winH: 608, subs: [1030, 1165], logoY: 1180, logoMax: [300, 72], footSize: 32 },
};

const FORMATS: { id: FormatId; label: string; hint: string }[] = [
  { id: "9:16", label: "Vertical 9:16", hint: "TikTok, Reels, Shorts · 1080×1920" },
  { id: "4:5", label: "Vertical 4:5", hint: "Feed de Instagram · 1080×1350" },
];

interface Colors {
  bg: string;
  text: string;
  highlight: string;
  accent: string;
  foot: string;
}

const PRESETS: { name: string; colors: Colors }[] = [
  { name: "Azul tech", colors: { bg: "#071A35", text: "#FFFFFF", highlight: "#1688F5", accent: "#19C6E6", foot: "#A0B4CD" } },
  { name: "Negro elegante", colors: { bg: "#0B0B0F", text: "#FFFFFF", highlight: "#F5C542", accent: "#F5C542", foot: "#9CA3AF" } },
  { name: "Blanco limpio", colors: { bg: "#FFFFFF", text: "#111827", highlight: "#2563EB", accent: "#2563EB", foot: "#6B7280" } },
  { name: "Verde natural", colors: { bg: "#0F2A1D", text: "#FFFFFF", highlight: "#4ADE80", accent: "#4ADE80", foot: "#A7C4B5" } },
  { name: "Morado creativo", colors: { bg: "#1E1033", text: "#FFFFFF", highlight: "#C084FC", accent: "#E879F9", foot: "#B9A8D0" } },
  { name: "Coral cálido", colors: { bg: "#2A1214", text: "#FFFFFF", highlight: "#FB7185", accent: "#FDBA74", foot: "#D6B3B0" } },
];

interface FrameOptions {
  format: FormatId;
  title: string;
  label: string;
  showLabel: boolean;
  foot: string;
  colors: Colors;
  glow: boolean;
  lines: boolean;
  logo: HTMLImageElement | null;
  brandName: string;
  fontFamily: string;
}

/* ------------------------------ Dibujo -------------------------------- */

function hexToRgba(hex: string, alpha: number) {
  const h = hex.replace("#", "");
  const n = parseInt(h.length === 3 ? h.split("").map((c) => c + c).join("") : h, 16);
  return `rgba(${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}, ${alpha})`;
}

/** Separa el título en palabras; las que van entre *asteriscos* se resaltan. */
function parseTitle(text: string) {
  const words: { t: string; hl: boolean }[] = [];
  let hl = false;
  for (const raw of text.split(/\s+/).filter(Boolean)) {
    if (raw.startsWith("*")) hl = true;
    words.push({ t: raw.replace(/\*/g, ""), hl });
    if (raw.slice(1).includes("*")) hl = false;
  }
  return words.filter((w) => w.t);
}

function wrap(ctx: CanvasRenderingContext2D, words: { t: string; hl: boolean }[], maxW: number) {
  const lines: (typeof words)[] = [];
  let line: typeof words = [];
  for (const w of words) {
    const test = [...line, w].map((x) => x.t).join(" ");
    if (line.length && ctx.measureText(test).width > maxW) {
      lines.push(line);
      line = [w];
    } else {
      line.push(w);
    }
  }
  if (line.length) lines.push(line);
  return lines;
}

function drawFrame(ctx: CanvasRenderingContext2D, o: FrameOptions, preview: { sample: boolean; safe: boolean } | null) {
  const L = LAYOUTS[o.format];
  const H = L.h;
  const font = (weight: number, size: number) => `${weight} ${size}px ${o.fontFamily}`;
  ctx.clearRect(0, 0, W, H);
  ctx.textBaseline = "top";

  // Fondo
  ctx.fillStyle = o.colors.bg;
  ctx.fillRect(0, 0, W, H);

  // Halo suave detrás de la ventana del video
  if (o.glow) {
    const cy = L.winY + L.winH / 2;
    ctx.save();
    ctx.translate(W / 2, cy);
    ctx.scale(1, 0.62);
    const g = ctx.createRadialGradient(0, 0, 0, 0, 0, W * 0.95);
    g.addColorStop(0, hexToRgba(o.colors.highlight, 0.32));
    g.addColorStop(1, hexToRgba(o.colors.highlight, 0));
    ctx.fillStyle = g;
    ctx.fillRect(-W, -W * 1.6, W * 2, W * 3.2);
    ctx.restore();
  }

  // Título: se achica la letra hasta que quepa en su franja
  const margin = 80;
  const words = parseTitle(o.title);
  const labelH = o.showLabel && o.label.trim() ? 64 : 0;
  const bandH = L.title[1] - L.title[0] - labelH - 10;
  let size = 96;
  let lines: ReturnType<typeof wrap> = [];
  for (; size >= 44; size -= 4) {
    ctx.font = font(800, size);
    lines = wrap(ctx, words, W - margin * 2);
    if (lines.length * size * 1.12 <= bandH) break;
  }
  const lineH = Math.round(size * 1.12);
  let y = L.title[0] + (L.title[1] - L.title[0] - (labelH + lines.length * lineH)) / 2;

  // Etiqueta tipo "píldora"
  if (labelH) {
    const label = o.label.trim().toUpperCase();
    ctx.font = font(700, 28);
    const lw = ctx.measureText(label).width;
    const x = (W - lw) / 2;
    ctx.beginPath();
    ctx.roundRect(x - 22, y - 6, lw + 44, 46, 23);
    ctx.fillStyle = hexToRgba(o.colors.accent, 0.14);
    ctx.fill();
    ctx.lineWidth = 2;
    ctx.strokeStyle = hexToRgba(o.colors.accent, 0.7);
    ctx.stroke();
    ctx.fillStyle = o.colors.accent;
    ctx.fillText(label, x, y + 3);
    y += labelH;
  }

  ctx.font = font(800, size);
  const space = ctx.measureText(" ").width;
  for (const line of lines) {
    const lw = line.reduce((s, w) => s + ctx.measureText(w.t).width, 0) + space * (line.length - 1);
    let x = (W - lw) / 2;
    for (const w of line) {
      ctx.fillStyle = w.hl ? o.colors.highlight : o.colors.text;
      ctx.fillText(w.t, x, y);
      x += ctx.measureText(w.t).width + space;
    }
    y += lineH;
  }

  // Ventana transparente para el video
  ctx.clearRect(0, L.winY, W, L.winH);
  if (o.lines) {
    ctx.fillStyle = o.colors.highlight;
    ctx.fillRect(0, L.winY - 4, W, 4);
    ctx.fillRect(0, L.winY + L.winH, W, 4);
  }

  // Logo (o nombre de la marca) y texto inferior
  const [maxW, maxH] = L.logoMax;
  let footY = L.logoY;
  if (o.logo && o.logo.naturalWidth) {
    const r = Math.min(maxW / o.logo.naturalWidth, maxH / o.logo.naturalHeight);
    const lw = o.logo.naturalWidth * r;
    const lh = o.logo.naturalHeight * r;
    ctx.drawImage(o.logo, (W - lw) / 2, L.logoY, lw, lh);
    footY = L.logoY + lh + 10;
  } else if (o.brandName.trim()) {
    ctx.font = font(800, Math.round(maxH * 0.62));
    ctx.fillStyle = o.colors.text;
    const t = o.brandName.trim();
    ctx.fillText(t, (W - ctx.measureText(t).width) / 2, L.logoY);
    footY = L.logoY + Math.round(maxH * 0.62) + 14;
  }
  if (o.foot.trim()) {
    ctx.font = font(600, L.footSize);
    ctx.fillStyle = o.colors.foot;
    const t = o.foot.trim();
    ctx.fillText(t, (W - ctx.measureText(t).width) / 2, footY);
  }

  if (!preview) return;

  // Solo vista previa: ejemplo dentro de la ventana y zonas seguras
  if (preview.sample) {
    const g = ctx.createLinearGradient(0, L.winY, W, L.winY + L.winH);
    g.addColorStop(0, "#1f2937");
    g.addColorStop(1, "#374151");
    ctx.fillStyle = g;
    ctx.fillRect(0, L.winY, W, L.winH);
    ctx.fillStyle = "rgba(255,255,255,0.08)";
    for (let i = 0; i < 4; i++) ctx.fillRect(90, L.winY + 90 + i * 70, 420 - i * 60, 34);
    ctx.fillRect(600, L.winY + 90, 390, 300);
    ctx.fillStyle = "rgba(255,255,255,0.85)";
    ctx.beginPath();
    const cx = W / 2;
    const cy = L.winY + L.winH / 2;
    ctx.arc(cx, cy, 58, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#111827";
    ctx.beginPath();
    ctx.moveTo(cx - 16, cy - 26);
    ctx.lineTo(cx + 28, cy);
    ctx.lineTo(cx - 16, cy + 26);
    ctx.closePath();
    ctx.fill();
    ctx.font = font(700, 34);
    ctx.fillStyle = "rgba(255,255,255,0.9)";
    const t = "Aquí va tu video horizontal";
    ctx.fillText(t, (W - ctx.measureText(t).width) / 2, cy + 84);
  } else {
    // Cuadriculado de transparencia
    for (let yy = L.winY; yy < L.winY + L.winH; yy += 40) {
      for (let xx = 0; xx < W; xx += 40) {
        ctx.fillStyle = ((xx + yy) / 40) % 2 === 0 ? "#d1d5db" : "#f3f4f6";
        ctx.fillRect(xx, yy, 40, Math.min(40, L.winY + L.winH - yy));
      }
    }
  }

  // Franja de subtítulos
  ctx.setLineDash([14, 10]);
  ctx.lineWidth = 3;
  ctx.strokeStyle = hexToRgba(o.colors.text, 0.35);
  ctx.strokeRect(40, L.subs[0], W - 80, L.subs[1] - L.subs[0]);
  ctx.setLineDash([]);
  ctx.font = font(600, 30);
  ctx.fillStyle = hexToRgba(o.colors.text, 0.45);
  const st = "Subtítulos aquí";
  ctx.fillText(st, (W - ctx.measureText(st).width) / 2, (L.subs[0] + L.subs[1]) / 2 - 15);

  if (preview.safe && o.format === "9:16") {
    ctx.fillStyle = "rgba(239, 68, 68, 0.28)";
    ctx.fillRect(0, 0, W, 150); // barra superior de la app
    ctx.fillRect(930, 760, 150, 760); // botones de me gusta, comentar, compartir
    ctx.fillRect(0, 1640, W, 280); // nombre de usuario y descripción
    ctx.font = font(700, 26);
    ctx.fillStyle = "#fff";
    ctx.fillText("Zona de la app", 24, 60);
    ctx.fillText("Descripción del video", 24, 1700);
  }
}

/* ----------------------------- Componente ------------------------------ */

function slugify(s: string) {
  return s
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 40);
}

export function FrameMaker() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [format, setFormat] = useState<FormatId>("9:16");
  const [title, setTitle] = useState("¿Tu negocio necesita dar el *salto tecnológico*?");
  const [label, setLabel] = useState("Tu marca · Tu rubro");
  const [showLabel, setShowLabel] = useState(true);
  const [foot, setFoot] = useState("tusitio.cl");
  const [brandName, setBrandName] = useState("Tu marca");
  const [colors, setColors] = useState<Colors>(PRESETS[0].colors);
  const [glow, setGlow] = useState(true);
  const [lines, setLines] = useState(true);
  const [sample, setSample] = useState(true);
  const [safe, setSafe] = useState(false);
  const [logo, setLogo] = useState<HTMLImageElement | null>(null);
  const [logoName, setLogoName] = useState("");
  const [fontFamily, setFontFamily] = useState("sans-serif");
  const [fontReady, setFontReady] = useState(false);

  // La fuente Montserrat de la web tiene un nombre generado: se lee desde la variable CSS
  useEffect(() => {
    const family =
      getComputedStyle(document.documentElement).getPropertyValue("--font-montserrat").trim() || "sans-serif";
    Promise.all([600, 700, 800].map((w) => document.fonts.load(`${w} 40px ${family}`)))
      .catch(() => undefined)
      .finally(() => {
        setFontFamily(family);
        setFontReady(true);
      });
  }, []);

  const options = useCallback(
    (): FrameOptions => ({ format, title, label, showLabel, foot, colors, glow, lines, logo, brandName, fontFamily }),
    [format, title, label, showLabel, foot, colors, glow, lines, logo, brandName, fontFamily]
  );

  useEffect(() => {
    const c = canvasRef.current;
    const ctx = c?.getContext("2d");
    if (!c || !ctx || !fontReady) return;
    c.width = W;
    c.height = LAYOUTS[format].h;
    drawFrame(ctx, options(), { sample, safe });
  }, [options, format, sample, safe, fontReady]);

  const onLogo = (file: File | undefined) => {
    if (!file) return;
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      setLogo(img);
      setLogoName(file.name);
    };
    img.src = url;
  };

  const download = () => {
    const c = document.createElement("canvas");
    c.width = W;
    c.height = LAYOUTS[format].h;
    const ctx = c.getContext("2d");
    if (!ctx) return;
    drawFrame(ctx, options(), null);
    c.toBlob((blob) => {
      if (!blob) return;
      const a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = `marco-${slugify(brandName || "video") || "video"}-${format.replace(":", "x")}.png`;
      a.click();
      setTimeout(() => URL.revokeObjectURL(a.href), 2000);
    }, "image/png");
  };

  const colorFields: { key: keyof Colors; label: string }[] = [
    { key: "bg", label: "Fondo" },
    { key: "text", label: "Título" },
    { key: "highlight", label: "Resaltado" },
    { key: "accent", label: "Etiqueta" },
    { key: "foot", label: "Texto inferior" },
  ];

  const input =
    "w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-[#071A35] focus:border-[#1479D4] focus:outline-none focus:ring-2 focus:ring-[#1479D4]/20";
  const sectionTitle = "flex items-center gap-2 text-sm font-bold text-[#071A35] mb-3";

  return (
    <div className="grid lg:grid-cols-[1fr_minmax(0,440px)] gap-8 items-start">
      {/* Controles */}
      <div className="space-y-6 order-2 lg:order-1">
        <fieldset className="rounded-2xl border border-slate-200 bg-white p-5">
          <legend className={sectionTitle}>
            <Smartphone className="w-4 h-4 text-[#1479D4]" /> Formato
          </legend>
          <div className="grid sm:grid-cols-2 gap-3">
            {FORMATS.map((f) => (
              <button
                key={f.id}
                type="button"
                onClick={() => setFormat(f.id)}
                aria-pressed={format === f.id}
                className={`rounded-xl border px-4 py-3 text-left transition-colors ${
                  format === f.id ? "border-[#1479D4] bg-[#1479D4]/5" : "border-slate-200 hover:border-slate-300"
                }`}
              >
                <span className="block font-bold text-[#071A35]">{f.label}</span>
                <span className="block text-xs text-slate-500">{f.hint}</span>
              </button>
            ))}
          </div>
        </fieldset>

        <fieldset className="rounded-2xl border border-slate-200 bg-white p-5 space-y-4">
          <legend className={sectionTitle}>
            <Type className="w-4 h-4 text-[#1479D4]" /> Textos
          </legend>
          <label className="block">
            <span className="block text-xs font-semibold text-slate-600 mb-1">Título</span>
            <textarea value={title} onChange={(e) => setTitle(e.target.value)} rows={2} className={input} />
            <span className="block text-xs text-slate-500 mt-1">
              Pon entre <code className="font-mono text-[#1479D4]">*asteriscos*</code> las palabras que quieras resaltar.
            </span>
          </label>
          <div className="grid sm:grid-cols-[1fr_auto] gap-3 items-end">
            <label className="block">
              <span className="block text-xs font-semibold text-slate-600 mb-1">Etiqueta superior</span>
              <input value={label} onChange={(e) => setLabel(e.target.value)} className={input} disabled={!showLabel} />
            </label>
            <label className="flex items-center gap-2 text-sm text-slate-700 pb-2">
              <input type="checkbox" checked={showLabel} onChange={(e) => setShowLabel(e.target.checked)} /> Mostrar
            </label>
          </div>
          <label className="block">
            <span className="block text-xs font-semibold text-slate-600 mb-1">Texto inferior (web, @usuario o teléfono)</span>
            <input value={foot} onChange={(e) => setFoot(e.target.value)} className={input} />
          </label>
        </fieldset>

        <fieldset className="rounded-2xl border border-slate-200 bg-white p-5 space-y-4">
          <legend className={sectionTitle}>
            <Upload className="w-4 h-4 text-[#1479D4]" /> Logo
          </legend>
          <div className="flex flex-wrap items-center gap-3">
            <label className="inline-flex cursor-pointer items-center gap-2 rounded-lg bg-[#1373C9] px-4 py-2.5 text-sm font-medium text-white hover:bg-[#1688F5]">
              <Upload className="w-4 h-4" /> Subir logo
              <input
                type="file"
                accept="image/png,image/jpeg,image/webp,image/svg+xml"
                className="sr-only"
                onChange={(e) => onLogo(e.target.files?.[0])}
              />
            </label>
            {logo && (
              <button
                type="button"
                onClick={() => {
                  setLogo(null);
                  setLogoName("");
                }}
                className="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-700 hover:bg-slate-50"
              >
                <Trash2 className="w-4 h-4" /> Quitar
              </button>
            )}
            <span className="text-xs text-slate-500 truncate max-w-[220px]">{logoName || "PNG con fondo transparente recomendado"}</span>
          </div>
          {!logo && (
            <label className="block">
              <span className="block text-xs font-semibold text-slate-600 mb-1">Sin logo: escribe el nombre de tu marca</span>
              <input value={brandName} onChange={(e) => setBrandName(e.target.value)} className={input} />
            </label>
          )}
        </fieldset>

        <fieldset className="rounded-2xl border border-slate-200 bg-white p-5 space-y-4">
          <legend className={sectionTitle}>
            <Palette className="w-4 h-4 text-[#1479D4]" /> Colores
          </legend>
          <div className="flex flex-wrap gap-2">
            {PRESETS.map((p) => (
              <button
                key={p.name}
                type="button"
                onClick={() => setColors(p.colors)}
                className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-700 hover:border-slate-300"
              >
                <span className="flex">
                  <span className="w-4 h-4 rounded-full border border-black/10" style={{ background: p.colors.bg }} />
                  <span className="-ml-1.5 w-4 h-4 rounded-full border border-black/10" style={{ background: p.colors.highlight }} />
                </span>
                {p.name}
              </button>
            ))}
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
            {colorFields.map((f) => (
              <label key={f.key} className="block">
                <span className="block text-xs font-semibold text-slate-600 mb-1">{f.label}</span>
                <span className="flex items-center gap-2 rounded-lg border border-slate-300 px-2 py-1.5">
                  <input
                    type="color"
                    value={colors[f.key]}
                    onChange={(e) => setColors({ ...colors, [f.key]: e.target.value })}
                    className="h-7 w-7 cursor-pointer rounded border-0 bg-transparent p-0"
                  />
                  <span className="font-mono text-[11px] text-slate-600 uppercase">{colors[f.key]}</span>
                </span>
              </label>
            ))}
          </div>
          <div className="flex flex-wrap gap-5 text-sm text-slate-700">
            <label className="flex items-center gap-2">
              <input type="checkbox" checked={glow} onChange={(e) => setGlow(e.target.checked)} /> Brillo detrás del video
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" checked={lines} onChange={(e) => setLines(e.target.checked)} /> Líneas de acento
            </label>
          </div>
        </fieldset>
      </div>

      {/* Vista previa */}
      <div className="order-1 lg:order-2 lg:sticky lg:top-24 space-y-4">
        <div className="rounded-2xl border border-slate-200 bg-[#F3F6FA] p-4">
          <canvas
            ref={canvasRef}
            role="img"
            aria-label="Vista previa del marco"
            className="mx-auto block h-auto w-full max-w-[360px] rounded-xl shadow-xl shadow-slate-900/15"
          />
        </div>
        <div className="flex flex-wrap gap-4 text-sm text-slate-700">
          <label className="flex items-center gap-2">
            <input type="checkbox" checked={sample} onChange={(e) => setSample(e.target.checked)} />
            <Eye className="w-4 h-4" /> Ver ejemplo de video
          </label>
          {format === "9:16" && (
            <label className="flex items-center gap-2">
              <input type="checkbox" checked={safe} onChange={(e) => setSafe(e.target.checked)} /> Zonas que tapa TikTok
            </label>
          )}
        </div>
        <button
          type="button"
          onClick={download}
          disabled={!fontReady}
          className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[#1373C9] px-6 py-3.5 text-base font-semibold text-white shadow-md shadow-[#1479D4]/20 transition-colors hover:bg-[#1688F5] disabled:opacity-60"
        >
          <Download className="w-5 h-5" /> Descargar marco PNG
        </button>
        <p className="flex items-start gap-2 text-xs text-slate-500">
          <ShieldCheck className="w-4 h-4 shrink-0 text-emerald-600" />
          Todo se genera en tu navegador: tu logo y tus textos no se suben a ningún servidor. La ventana del video queda transparente.
        </p>
      </div>
    </div>
  );
}
