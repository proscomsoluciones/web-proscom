"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  AlertTriangle,
  Download,
  Eye,
  Film,
  Maximize2,
  Palette,
  ShieldCheck,
  Smartphone,
  Trash2,
  Type,
  Upload,
} from "lucide-react";

/* -------------------------------------------------------------------------- */
/*  Creador de marcos para videos verticales (100% en el navegador)           */
/*  El logo, los textos y el video de prueba nunca salen del equipo.          */
/* -------------------------------------------------------------------------- */

type FormatId = "9:16" | "4:5";
type WindowId = "16:9" | "1.15" | "1.3" | "4:3";

interface Layout {
  h: number;
  title: [number, number]; // franja del título (y inicio, y fin)
  winY: number; // borde superior de la ventana del video
  winH: number; // alto de la ventana (siempre a 1080 de ancho)
  subs: [number, number] | null; // franja libre para subtítulos
  logoY: number;
  logoMax: [number, number]; // ancho y alto máximos del logo
  footSize: number;
  bottom: number; // nada se dibuja bajo esta línea (zona que tapa la app)
  sideMargin: number; // margen lateral del título (en pantallas alargadas la app recorta los lados)
  subsX: [number, number]; // ancho de la franja de subtítulos (en 9:16 evita los botones de la derecha)
}

const W = 1080;

const FORMATS: { id: FormatId; label: string; hint: string }[] = [
  { id: "9:16", label: "Vertical 9:16", hint: "TikTok, Reels, Shorts · 1080×1920" },
  { id: "4:5", label: "Vertical 4:5", hint: "Feed de Instagram · 1080×1350" },
];

/** Tamaños de la ventana. "zoom" es la escala que hay que darle a un video 16:9 en el editor. */
const WINDOWS: { id: WindowId; label: string; hint: string; h: number }[] = [
  { id: "16:9", label: "Normal", hint: "Video 16:9 completo", h: 608 },
  { id: "1.15", label: "Grande", hint: "Zoom 115 %, recorta un poco los lados", h: 699 },
  { id: "1.3", label: "Extra grande", hint: "Zoom 130 %, ideal para pantallas", h: 790 },
  { id: "4:3", label: "Alta 4:3", hint: "Para recortes o pantallas filmadas", h: 810 },
];

/**
 * Calcula dónde va cada elemento según el formato y el tamaño de la ventana.
 * En 9:16 respeta las zonas de TikTok, medidas en un iPhone (pantalla más alargada que 9:16: la app llena el
 * alto, agranda el video ~4 % y recorta ~96 px de cada lado):
 * - Arriba: 0..250 px ocupados por hora/estado y buscador ("Buscar contenido relacionado..."); el contenido parte en 265
 * - Derecha: X = 860..1080, Y = 740..1580 ocupados por perfil, me gusta, comentarios, guardados y compartir
 * - Abajo: 1430..1920 px ocupados por @usuario, descripción, promoción y barra inferior; nada se dibuja bajo 1420
 * - Lados: ~96 px que se recortan en pantallas alargadas; el título deja 110 px de margen
 */
function computeLayout(format: FormatId, win: WindowId): Layout {
  const v = format === "9:16"
    ? {
        h: 1920, top: 265, bottom: 1420, logoBlock: 130, logoMax: [320, 85] as [number, number], foot: 34, gap: 28,
        sideMargin: 110, subsX: [110, 850] as [number, number],
      }
    : {
        h: 1350, top: 50, bottom: 1320, logoBlock: 120, logoMax: [300, 70] as [number, number], foot: 32, gap: 30,
        sideMargin: 84, subsX: [80, 1000] as [number, number],
      };
  const winH = WINDOWS.find((x) => x.id === win)?.h ?? 608;
  const space = (g: number) => v.bottom - v.top - v.logoBlock - winH - g * 3;
  // Con ventanas grandes se achican los espacios para que todo quepa sobre la zona que tapa la app
  const gap = space(v.gap) >= 150 ? v.gap : 18;
  const free = space(gap);
  let titleH = Math.min(340, Math.max(190, Math.round(free * 0.56)));
  let subsH = free - titleH;
  if (subsH < 90) {
    titleH = Math.max(150, free - 90);
    subsH = free - titleH;
  }
  const winY = v.top + titleH + gap;
  const subsY = winY + winH + gap;
  const subs: [number, number] | null = subsH >= 60 ? [subsY, subsY + subsH] : null;
  return {
    h: v.h,
    title: [v.top, v.top + titleH],
    winY,
    winH,
    subs,
    logoY: subsY + Math.max(subsH, 0) + gap,
    logoMax: v.logoMax,
    footSize: v.foot,
    bottom: v.bottom,
    sideMargin: v.sideMargin,
    subsX: v.subsX,
  };
}

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
  { name: "Turquesa océano", colors: { bg: "#053B3F", text: "#FFFFFF", highlight: "#2DD4BF", accent: "#67E8F9", foot: "#9CCFD0" } },
  { name: "Amarillo vibrante", colors: { bg: "#FFD23F", text: "#111111", highlight: "#D62828", accent: "#111111", foot: "#3D3D3D" } },
  { name: "Rosa pastel", colors: { bg: "#FDE7EF", text: "#3B0A23", highlight: "#DB2777", accent: "#DB2777", foot: "#8A5A6E" } },
];

/** Textos de ejemplo: solo se ven (atenuados) en la vista previa, nunca en el PNG. */
const EXAMPLES = {
  title: "¿Tu negocio necesita dar el *salto tecnológico*?",
  label: "Tu marca · Tu rubro",
  foot: "tusitio.cl",
  brandName: "Tu marca",
};

interface FrameOptions {
  format: FormatId;
  win: WindowId;
  title: string;
  label: string;
  showLabel: boolean;
  foot: string;
  colors: Colors;
  glow: boolean;
  lines: boolean;
  logo: HTMLImageElement | null;
  logoScale: number; // 0.5 a 1.5 sobre el tamaño base del formato
  brandName: string;
  fontFamily: string;
}

interface PreviewOptions {
  sample: boolean;
  safe: boolean;
  video: HTMLVideoElement | null;
  panX: number; // -1 (izquierda) a 1 (derecha)
  panY: number; // -1 (arriba) a 1 (abajo)
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

/** Escala para que el video cubra la ventana (como "rellenar" en un editor). */
function coverScale(vw: number, vh: number, winH: number) {
  return Math.max(W / vw, winH / vh);
}

function drawFrame(ctx: CanvasRenderingContext2D, o: FrameOptions, preview: PreviewOptions | null) {
  const L = computeLayout(o.format, o.win);
  const H = L.h;
  const font = (weight: number, size: number) => `${weight} ${size}px ${o.fontFamily}`;
  // En la vista previa, los campos vacíos muestran el ejemplo atenuado; en el PNG se omiten.
  const pick = (value: string, example: string) =>
    value.trim() ? { text: value.trim(), ghost: false } : preview ? { text: example, ghost: true } : { text: "", ghost: false };
  const ghostAlpha = 0.35;

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
  const margin = L.sideMargin;
  const title = pick(o.title, EXAMPLES.title);
  const label = o.showLabel ? pick(o.label, EXAMPLES.label) : { text: "", ghost: false };
  const words = parseTitle(title.text);
  const labelH = label.text ? 60 : 0;
  const bandH = L.title[1] - L.title[0] - labelH - 10;
  let size = 84;
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
    ctx.save();
    if (label.ghost) ctx.globalAlpha = ghostAlpha;
    const text = label.text.toUpperCase();
    ctx.font = font(700, 28);
    const lw = ctx.measureText(text).width;
    const x = (W - lw) / 2;
    ctx.beginPath();
    ctx.roundRect(x - 22, y - 6, lw + 44, 46, 23);
    ctx.fillStyle = hexToRgba(o.colors.accent, 0.14);
    ctx.fill();
    ctx.lineWidth = 2;
    ctx.strokeStyle = hexToRgba(o.colors.accent, 0.7);
    ctx.stroke();
    ctx.fillStyle = o.colors.accent;
    ctx.fillText(text, x, y + 3);
    ctx.restore();
    y += labelH;
  }

  ctx.save();
  if (title.ghost) ctx.globalAlpha = ghostAlpha;
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
  ctx.restore();

  // Ventana transparente para el video
  ctx.clearRect(0, L.winY, W, L.winH);
  if (o.lines) {
    ctx.fillStyle = o.colors.highlight;
    ctx.fillRect(0, L.winY - 4, W, 4);
    ctx.fillRect(0, L.winY + L.winH, W, 4);
  }

  // Logo (o nombre de la marca) y texto inferior: siempre sobre la línea "bottom"
  const foot = pick(o.foot, EXAMPLES.foot);
  const footRoom = foot.text ? L.footSize + 12 : 0;
  const maxW = L.logoMax[0] * o.logoScale;
  const maxH = Math.max(30, Math.min(L.logoMax[1] * o.logoScale, L.bottom - L.logoY - footRoom));
  let footY = L.logoY;
  if (o.logo && o.logo.naturalWidth) {
    const r = Math.min(maxW / o.logo.naturalWidth, maxH / o.logo.naturalHeight);
    const lw = o.logo.naturalWidth * r;
    const lh = o.logo.naturalHeight * r;
    ctx.drawImage(o.logo, (W - lw) / 2, L.logoY, lw, lh);
    footY = L.logoY + lh + 10;
  } else {
    const brand = pick(o.brandName, EXAMPLES.brandName);
    if (brand.text) {
      const bs = Math.round(Math.min(maxH, L.logoMax[1] * o.logoScale) * 0.62);
      ctx.save();
      if (brand.ghost) ctx.globalAlpha = ghostAlpha;
      ctx.font = font(800, bs);
      ctx.fillStyle = o.colors.text;
      ctx.fillText(brand.text, (W - ctx.measureText(brand.text).width) / 2, L.logoY);
      ctx.restore();
      footY = L.logoY + bs + 14;
    }
  }
  if (foot.text) {
    ctx.save();
    if (foot.ghost) ctx.globalAlpha = ghostAlpha;
    ctx.font = font(600, L.footSize);
    ctx.fillStyle = o.colors.foot;
    ctx.fillText(foot.text, (W - ctx.measureText(foot.text).width) / 2, Math.min(footY, L.bottom - L.footSize));
    ctx.restore();
  }

  if (!preview) return;

  // Solo vista previa: video del usuario, ejemplo o cuadriculado dentro de la ventana
  const v = preview.video;
  if (v && v.videoWidth) {
    const s = coverScale(v.videoWidth, v.videoHeight, L.winH);
    const dw = v.videoWidth * s;
    const dh = v.videoHeight * s;
    const dx = (W - dw) / 2 - ((dw - W) / 2) * preview.panX;
    const dy = L.winY + (L.winH - dh) / 2 - ((dh - L.winH) / 2) * preview.panY;
    ctx.save();
    ctx.beginPath();
    ctx.rect(0, L.winY, W, L.winH);
    ctx.clip();
    ctx.drawImage(v, dx, dy, dw, dh);
    ctx.restore();
  } else if (preview.sample) {
    const g = ctx.createLinearGradient(0, L.winY, W, L.winY + L.winH);
    g.addColorStop(0, "#1f2937");
    g.addColorStop(1, "#374151");
    ctx.fillStyle = g;
    ctx.fillRect(0, L.winY, W, L.winH);
    ctx.fillStyle = "rgba(255,255,255,0.08)";
    for (let i = 0; i < 4; i++) ctx.fillRect(90, L.winY + 90 + i * 70, 420 - i * 60, 34);
    ctx.fillRect(600, L.winY + 90, 390, Math.min(300, L.winH - 180));
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
    const t = "Aquí va tu video";
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
  if (L.subs) {
    const [subX, subEnd] = L.subsX;
    ctx.setLineDash([14, 10]);
    ctx.lineWidth = 3;
    ctx.strokeStyle = hexToRgba(o.colors.text, 0.35);
    ctx.strokeRect(subX, L.subs[0], subEnd - subX, L.subs[1] - L.subs[0]);
    ctx.setLineDash([]);
    ctx.font = font(600, 30);
    ctx.fillStyle = hexToRgba(o.colors.text, 0.45);
    const st = "Subtítulos aquí";
    ctx.fillText(st, (subX + subEnd - ctx.measureText(st).width) / 2, (L.subs[0] + L.subs[1]) / 2 - 15);
  }

  if (preview.safe && o.format === "9:16") {
    // Mismas zonas que respeta computeLayout (ver comentario allí)
    ctx.fillStyle = "rgba(239, 68, 68, 0.28)";
    ctx.fillRect(0, 0, W, 250); // barra de estado + buscador de TikTok
    ctx.fillRect(860, 740, W - 860, 840); // avatar, me gusta, comentar, guardar, compartir
    ctx.fillRect(0, 1430, W, H - 1430); // @usuario, descripción, promoción y barra inferior
    ctx.fillStyle = "rgba(239, 68, 68, 0.14)";
    ctx.fillRect(0, 250, 96, 1180); // lados que se recortan en pantallas alargadas
    ctx.fillRect(W - 96, 250, 96, 490);
    ctx.font = font(700, 26);
    ctx.fillStyle = "#fff";
    ctx.fillText("Buscador de TikTok", 24, 110);
    ctx.fillText("@usuario y descripción del video", 24, 1480);
  }
}

/* ----------------------------- Componente ------------------------------ */

function slugify(s: string) {
  return s
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 40);
}

const STORAGE_KEY = "proscom-creador-marcos-v1";

interface Saved {
  format: FormatId;
  win: WindowId;
  title: string;
  label: string;
  showLabel: boolean;
  foot: string;
  brandName: string;
  colors: Colors;
  glow: boolean;
  lines: boolean;
  logoScale: number;
}

export function FrameMaker() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [format, setFormat] = useState<FormatId>("9:16");
  const [win, setWin] = useState<WindowId>("16:9");
  const [title, setTitle] = useState("");
  const [label, setLabel] = useState("");
  const [showLabel, setShowLabel] = useState(true);
  const [foot, setFoot] = useState("");
  const [brandName, setBrandName] = useState("");
  const [colors, setColors] = useState<Colors>(PRESETS[0].colors);
  const [glow, setGlow] = useState(true);
  const [lines, setLines] = useState(true);
  const [sample, setSample] = useState(true);
  const [safe, setSafe] = useState(false);
  const [logo, setLogo] = useState<HTMLImageElement | null>(null);
  const [logoName, setLogoName] = useState("");
  const [logoScale, setLogoScale] = useState(100);
  const [fontFamily, setFontFamily] = useState("sans-serif");
  const [fontReady, setFontReady] = useState(false);
  const [restored, setRestored] = useState(false);
  const [missing, setMissing] = useState<string[] | null>(null);

  // Video de prueba (solo vista previa, no se sube a ningún lado)
  const [video, setVideo] = useState<HTMLVideoElement | null>(null);
  const [videoName, setVideoName] = useState("");
  const [videoSize, setVideoSize] = useState<[number, number] | null>(null);
  const [panX, setPanX] = useState(0);
  const [panY, setPanY] = useState(0);

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

  // Recupera el último diseño guardado en este navegador (después de hidratar, para no romper el SSR)
  useEffect(() => {
    const id = setTimeout(() => {
      try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (raw) {
          const s = JSON.parse(raw) as Partial<Saved>;
          if (s.format && s.format in { "9:16": 1, "4:5": 1 }) setFormat(s.format);
          if (s.win && WINDOWS.some((x) => x.id === s.win)) setWin(s.win);
          if (typeof s.title === "string") setTitle(s.title);
          if (typeof s.label === "string") setLabel(s.label);
          if (typeof s.showLabel === "boolean") setShowLabel(s.showLabel);
          if (typeof s.foot === "string") setFoot(s.foot);
          if (typeof s.brandName === "string") setBrandName(s.brandName);
          if (s.colors && typeof s.colors.bg === "string") setColors({ ...PRESETS[0].colors, ...s.colors });
          if (typeof s.glow === "boolean") setGlow(s.glow);
          if (typeof s.lines === "boolean") setLines(s.lines);
          if (typeof s.logoScale === "number") setLogoScale(Math.min(150, Math.max(50, s.logoScale)));
        }
      } catch {
        /* sin almacenamiento disponible: se parte con los valores por defecto */
      }
      setRestored(true);
    }, 0);
    return () => clearTimeout(id);
  }, []);

  // Guarda el diseño en cada cambio (después de haber recuperado el anterior)
  useEffect(() => {
    if (!restored) return;
    const s: Saved = { format, win, title, label, showLabel, foot, brandName, colors, glow, lines, logoScale };
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(s));
    } catch {
      /* ignorar */
    }
  }, [restored, format, win, title, label, showLabel, foot, brandName, colors, glow, lines, logoScale]);

  const options = useCallback(
    (): FrameOptions => ({
      format, win, title, label, showLabel, foot, colors, glow, lines, logo, logoScale: logoScale / 100, brandName, fontFamily,
    }),
    [format, win, title, label, showLabel, foot, colors, glow, lines, logo, logoScale, brandName, fontFamily]
  );

  // Dibuja la vista previa; con un video cargado, redibuja en cada cuadro
  useEffect(() => {
    const c = canvasRef.current;
    const ctx = c?.getContext("2d");
    if (!c || !ctx || !fontReady) return;
    c.width = W;
    c.height = computeLayout(format, win).h;
    const preview: PreviewOptions = { sample, safe, video, panX, panY };
    drawFrame(ctx, options(), preview);
    if (!video) return;
    let raf = 0;
    const loop = () => {
      drawFrame(ctx, options(), preview);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [options, format, win, sample, safe, fontReady, video, panX, panY]);

  // Libera el video al quitarlo o al salir de la página
  useEffect(() => {
    return () => {
      if (video) {
        video.pause();
        URL.revokeObjectURL(video.src);
      }
    };
  }, [video]);

  const onLogo = (file: File | undefined) => {
    if (!file) return;
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      setLogo(img);
      setLogoName(file.name);
      URL.revokeObjectURL(url);
    };
    img.src = url;
  };

  const onVideo = (file: File | undefined) => {
    if (!file) return;
    const v = document.createElement("video");
    v.muted = true;
    v.loop = true;
    v.playsInline = true;
    v.onloadeddata = () => {
      setVideo(v);
      setVideoName(file.name);
      setVideoSize([v.videoWidth, v.videoHeight]);
      setPanX(0);
      setPanY(0);
      v.play().catch(() => undefined);
    };
    v.src = URL.createObjectURL(file);
  };

  const removeVideo = () => {
    setVideo(null);
    setVideoName("");
    setVideoSize(null);
  };

  const missingFields = () => {
    const m: string[] = [];
    if (!title.trim()) m.push("título");
    if (showLabel && !label.trim()) m.push("etiqueta superior");
    if (!logo && !brandName.trim()) m.push("logo o nombre de la marca");
    if (!foot.trim()) m.push("texto inferior");
    return m;
  };

  const download = (force = false) => {
    const m = missingFields();
    if (!force && m.length) {
      setMissing(m);
      return;
    }
    setMissing(null);
    const c = document.createElement("canvas");
    c.width = W;
    c.height = computeLayout(format, win).h;
    const ctx = c.getContext("2d");
    if (!ctx) return;
    drawFrame(ctx, options(), null);
    c.toBlob((blob) => {
      if (!blob) return;
      const a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      const name = slugify(brandName || logoName.replace(/\.[^.]+$/, "") || "video") || "video";
      a.download = `marco-${name}-${format.replace(":", "x")}-${win === "16:9" ? "normal" : win.replace(":", "x")}.png`;
      a.click();
      setTimeout(() => URL.revokeObjectURL(a.href), 2000);
    }, "image/png");
  };

  // Datos para ubicar el video en CapCut
  const layout = computeLayout(format, win);
  const vw = videoSize?.[0] ?? 1920;
  const vh = videoSize?.[1] ?? 1080;
  const editorScale = Math.round((coverScale(vw, vh, layout.winH) * vw * 100) / W);
  const winCenter = Math.round(layout.winY + layout.winH / 2);
  const offset = Math.round(layout.h / 2 - winCenter);

  const colorFields: { key: keyof Colors; label: string }[] = [
    { key: "bg", label: "Fondo" },
    { key: "text", label: "Título" },
    { key: "highlight", label: "Resaltado" },
    { key: "accent", label: "Etiqueta" },
    { key: "foot", label: "Texto inferior" },
  ];

  const input =
    "w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-[#071A35] placeholder:text-slate-400 focus:border-[#1479D4] focus:outline-none focus:ring-2 focus:ring-[#1479D4]/20";
  const sectionTitle = "flex items-center gap-2 text-sm font-bold text-[#071A35] mb-3";
  const choice = (active: boolean) =>
    `rounded-xl border px-4 py-3 text-left transition-colors ${
      active ? "border-[#1479D4] bg-[#1479D4]/5" : "border-slate-200 hover:border-slate-300"
    }`;

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
              <button key={f.id} type="button" onClick={() => setFormat(f.id)} aria-pressed={format === f.id} className={choice(format === f.id)}>
                <span className="block font-bold text-[#071A35]">{f.label}</span>
                <span className="block text-xs text-slate-500">{f.hint}</span>
              </button>
            ))}
          </div>
        </fieldset>

        <fieldset className="rounded-2xl border border-slate-200 bg-white p-5">
          <legend className={sectionTitle}>
            <Maximize2 className="w-4 h-4 text-[#1479D4]" /> Tamaño de la ventana del video
          </legend>
          <div className="grid grid-cols-2 xl:grid-cols-4 gap-3">
            {WINDOWS.map((w) => (
              <button key={w.id} type="button" onClick={() => setWin(w.id)} aria-pressed={win === w.id} className={choice(win === w.id)}>
                <span className="block font-bold text-[#071A35]">{w.label}</span>
                <span className="block text-xs text-slate-500">{w.hint}</span>
              </button>
            ))}
          </div>
          <p className="mt-3 text-xs text-slate-500">
            Una ventana más grande hace que tu grabación se lea mejor en el celular. El título, los subtítulos y tu marca
            se reacomodan solos para no quedar bajo los botones de la app.
          </p>
        </fieldset>

        <fieldset className="rounded-2xl border border-slate-200 bg-white p-5 space-y-4">
          <legend className={sectionTitle}>
            <Type className="w-4 h-4 text-[#1479D4]" /> Textos
          </legend>
          <label className="block">
            <span className="block text-xs font-semibold text-slate-600 mb-1">Título</span>
            <textarea value={title} onChange={(e) => setTitle(e.target.value)} rows={2} className={input} placeholder={EXAMPLES.title} />
            <span className="block text-xs text-slate-500 mt-1">
              Pon entre <code className="font-mono text-[#1479D4]">*asteriscos*</code> las palabras que quieras resaltar.
              Los títulos cortos (hasta 8 palabras) funcionan mejor.
            </span>
          </label>
          <div className="grid sm:grid-cols-[1fr_auto] gap-3 items-end">
            <label className="block">
              <span className="block text-xs font-semibold text-slate-600 mb-1">Etiqueta superior</span>
              <input value={label} onChange={(e) => setLabel(e.target.value)} className={input} disabled={!showLabel} placeholder={EXAMPLES.label} />
            </label>
            <label className="flex items-center gap-2 text-sm text-slate-700 pb-2">
              <input type="checkbox" checked={showLabel} onChange={(e) => setShowLabel(e.target.checked)} /> Mostrar
            </label>
          </div>
          <label className="block">
            <span className="block text-xs font-semibold text-slate-600 mb-1">Texto inferior (web, @usuario o teléfono)</span>
            <input value={foot} onChange={(e) => setFoot(e.target.value)} className={input} placeholder={EXAMPLES.foot} />
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
              <input value={brandName} onChange={(e) => setBrandName(e.target.value)} className={input} placeholder={EXAMPLES.brandName} />
            </label>
          )}
          <label className="block">
            <span className="flex items-center justify-between text-xs font-semibold text-slate-600 mb-1">
              <span>Tamaño del {logo ? "logo" : "nombre"}</span>
              <span className="font-mono text-[#1479D4]">{logoScale}%</span>
            </span>
            <span className="flex items-center gap-3">
              <span className="text-xs text-slate-400" aria-hidden="true">A</span>
              <input
                type="range"
                min={50}
                max={150}
                step={5}
                value={logoScale}
                onChange={(e) => setLogoScale(Number(e.target.value))}
                className="w-full accent-[#1479D4]"
              />
              <span className="text-base text-slate-400" aria-hidden="true">A</span>
              {logoScale !== 100 && (
                <button type="button" onClick={() => setLogoScale(100)} className="text-xs font-medium text-[#1479D4] hover:underline">
                  Restablecer
                </button>
              )}
            </span>
          </label>
        </fieldset>

        <fieldset className="rounded-2xl border border-slate-200 bg-white p-5 space-y-4">
          <legend className={sectionTitle}>
            <Palette className="w-4 h-4 text-[#1479D4]" /> Colores
          </legend>
          {/* 3 columnas solo cuando hay ancho suficiente para que los nombres no se corten */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 gap-2">
            {PRESETS.map((p) => {
              const active = (Object.keys(p.colors) as (keyof Colors)[]).every(
                (k) => p.colors[k].toLowerCase() === colors[k].toLowerCase()
              );
              return (
                <button
                  key={p.name}
                  type="button"
                  onClick={() => setColors(p.colors)}
                  aria-pressed={active}
                  className={`flex w-full items-center gap-2.5 rounded-lg border px-3 py-2 text-left text-xs font-medium transition-colors ${
                    active
                      ? "border-[#1479D4] bg-[#1479D4]/5 text-[#071A35]"
                      : "border-slate-200 text-slate-700 hover:border-slate-300"
                  }`}
                >
                  <span className="flex shrink-0">
                    <span className="w-4 h-4 rounded-full border border-black/10" style={{ background: p.colors.bg }} />
                    <span className="-ml-1.5 w-4 h-4 rounded-full border border-black/10" style={{ background: p.colors.highlight }} />
                  </span>
                  <span className="truncate">{p.name}</span>
                </button>
              );
            })}
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
          {!video && (
            <label className="flex items-center gap-2">
              <input type="checkbox" checked={sample} onChange={(e) => setSample(e.target.checked)} />
              <Eye className="w-4 h-4" /> Ver ejemplo de video
            </label>
          )}
          {format === "9:16" && (
            <label className="flex items-center gap-2">
              <input type="checkbox" checked={safe} onChange={(e) => setSafe(e.target.checked)} /> Zonas que tapa TikTok
            </label>
          )}
        </div>

        {/* Probar con un video propio */}
        <div className="rounded-xl border border-slate-200 bg-white p-4 space-y-3">
          <div className="flex flex-wrap items-center gap-3">
            <label className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-[#1479D4] px-3 py-2 text-sm font-medium text-[#1373C9] hover:bg-[#1479D4]/5">
              <Film className="w-4 h-4" /> {video ? "Cambiar video" : "Probar con mi video"}
              <input type="file" accept="video/*" className="sr-only" onChange={(e) => onVideo(e.target.files?.[0])} />
            </label>
            {video && (
              <button
                type="button"
                onClick={removeVideo}
                className="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-700 hover:bg-slate-50"
              >
                <Trash2 className="w-4 h-4" /> Quitar
              </button>
            )}
            <span className="text-xs text-slate-500 truncate max-w-[200px]">
              {videoName || "Se ve solo aquí; no se sube a ningún servidor."}
            </span>
          </div>
          {video && (
            <div className="grid grid-cols-2 gap-3">
              <label className="block text-xs font-semibold text-slate-600">
                Mover a los lados
                <input type="range" min={-1} max={1} step={0.05} value={panX} onChange={(e) => setPanX(Number(e.target.value))} className="w-full accent-[#1479D4]" />
              </label>
              <label className="block text-xs font-semibold text-slate-600">
                Mover arriba / abajo
                <input type="range" min={-1} max={1} step={0.05} value={panY} onChange={(e) => setPanY(Number(e.target.value))} className="w-full accent-[#1479D4]" />
              </label>
            </div>
          )}
          <p className="text-xs text-slate-600">
            <strong className="text-[#071A35]">En CapCut:</strong> pon tu video debajo del marco, escálalo al{" "}
            <strong className="font-mono text-[#1479D4]">{editorScale}%</strong>
            {offset !== 0 && (
              <>
                {" "}y {offset > 0 ? "súbelo" : "bájalo"}{" "}
                <strong className="font-mono text-[#1479D4]">{Math.abs(offset)} px</strong>
              </>
            )}{" "}
            para que calce con la ventana ({W}×{layout.winH} px, desde y={layout.winY}).
          </p>
        </div>

        {missing && (
          <div role="alert" className="rounded-xl border border-amber-300 bg-amber-50 p-4 text-sm text-amber-900 space-y-3">
            <p className="flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>
                Te falta completar: <strong>{missing.join(", ")}</strong>. Lo que está en gris en la vista previa es solo un
                ejemplo y no sale en el marco.
              </span>
            </p>
            <div className="flex flex-wrap gap-2">
              <button type="button" onClick={() => setMissing(null)} className="rounded-lg bg-amber-600 px-3 py-1.5 font-medium text-white hover:bg-amber-700">
                Completar
              </button>
              <button type="button" onClick={() => download(true)} className="rounded-lg border border-amber-400 px-3 py-1.5 font-medium hover:bg-amber-100">
                Descargar igual
              </button>
            </div>
          </div>
        )}

        <button
          type="button"
          onClick={() => download()}
          disabled={!fontReady}
          className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[#1373C9] px-6 py-3.5 text-base font-semibold text-white shadow-md shadow-[#1479D4]/20 transition-colors hover:bg-[#1688F5] disabled:opacity-60"
        >
          <Download className="w-5 h-5" /> Descargar marco PNG
        </button>
        <p className="flex items-start gap-2 text-xs text-slate-500">
          <ShieldCheck className="w-4 h-4 shrink-0 text-emerald-600" />
          Todo se genera en tu navegador: tu logo, tus textos y tu video no se suben a ningún servidor. La ventana del video
          queda transparente.
        </p>
      </div>
    </div>
  );
}
