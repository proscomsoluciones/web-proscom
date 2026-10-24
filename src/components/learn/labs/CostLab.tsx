"use client";

import React, { useState } from "react";
import { TrendingDown, Scale, CheckCircle2, Info } from "lucide-react";
import { Stage3D, Box3D, Billboard, PLANE_W } from "../stage3d";

/* -------------------------------------------------------------------------- */
/*  Utilidades                                                                 */
/* -------------------------------------------------------------------------- */
const clp = (n: number) => `$${Math.round(n).toLocaleString("es-CL")}`;
const short = (n: number) =>
  n >= 1_000_000 ? `$${(n / 1_000_000).toFixed(n >= 10_000_000 ? 0 : 1).replace(".", ",")}M` : `$${Math.round(n / 1000)}k`;

interface SliderProps {
  id: string;
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  format: (n: number) => string;
  onChange: (n: number) => void;
}

const Slider: React.FC<SliderProps> = ({ id, label, value, min, max, step, format, onChange }) => (
  <div>
    <label htmlFor={id} className="flex items-baseline justify-between gap-2 text-[11px] font-mono uppercase tracking-wider text-slate-400 mb-1.5">
      <span>{label}</span>
      <span className="text-sm font-extrabold text-white normal-case tabular-nums">{format(value)}</span>
    </label>
    <input
      id={id}
      type="range"
      min={min}
      max={max}
      step={step}
      value={value}
      onChange={(e) => onChange(Number(e.target.value))}
      className="w-full accent-[#19C6E6] cursor-pointer"
    />
  </div>
);

/* -------------------------------------------------------------------------- */
/*  Laboratorio                                                                 */
/* -------------------------------------------------------------------------- */
const ROW_LICENSE = 170;
const ROW_CUSTOM = 330;
const MAX_H = 230;

export const CostLab: React.FC = () => {
  const [users, setUsers] = useState(25);
  const [licensePrice, setLicensePrice] = useState(25000);
  const [devCost, setDevCost] = useState(12_000_000);
  const [maintenance, setMaintenance] = useState(250_000);
  const [years, setYears] = useState(5);

  const licenseMonthly = users * licensePrice;
  const licenseAt = (y: number) => licenseMonthly * 12 * y;
  const customAt = (y: number) => devCost + maintenance * 12 * y;

  const data = Array.from({ length: years }, (_, i) => ({ year: i + 1, license: licenseAt(i + 1), custom: customAt(i + 1) }));
  const max = Math.max(...data.map((d) => Math.max(d.license, d.custom)));
  const h = (v: number) => Math.max(6, (v / max) * MAX_H);

  const breakEvenMonths = licenseMonthly > maintenance ? Math.ceil(devCost / (licenseMonthly - maintenance)) : null;
  const savings = licenseAt(years) - customAt(years);
  const firstWinYear = data.find((d) => d.custom < d.license)?.year;

  const spacing = (PLANE_W - 220) / Math.max(years - 1, 1);
  const xAt = (i: number) => (years === 1 ? PLANE_W / 2 : 120 + i * spacing);

  return (
    <div className="lab-frame rounded-[2rem] bg-gradient-to-b from-[#0A1E3B] to-[#071A35] border border-white/10 shadow-2xl shadow-[#071A35]/40 overflow-hidden">
      {/* Controles */}
      <div className="grid sm:grid-cols-2 xl:grid-cols-5 gap-5 p-5 sm:p-6 lg:py-4 border-b border-white/10">
        <Slider id="users" label="Usuarios" value={users} min={1} max={150} step={1} format={(n) => `${n}`} onChange={setUsers} />
        <Slider id="lic" label="Licencia por usuario / mes" value={licensePrice} min={5000} max={80000} step={1000} format={clp} onChange={setLicensePrice} />
        <Slider id="dev" label="Desarrollo a medida (una vez)" value={devCost} min={2_000_000} max={60_000_000} step={500_000} format={short} onChange={setDevCost} />
        <Slider id="mnt" label="Mantención a medida / mes" value={maintenance} min={0} max={1_500_000} step={50_000} format={clp} onChange={setMaintenance} />
        <Slider id="yrs" label="Horizonte" value={years} min={1} max={6} step={1} format={(n) => `${n} año${n > 1 ? "s" : ""}`} onChange={setYears} />
      </div>

      <div className="lab-main grid grid-cols-1 lg:grid-cols-12">
        {/* Gráfico 3D */}
        <div className="lab-stage lg:col-span-7 xl:col-span-8 relative border-b lg:border-b-0 lg:border-r border-white/10">
          <Stage3D label={`Gráfico 3D de costo acumulado durante ${years} años: licencias versus software a medida`} tiltX={58} tiltZ={-30}>
            {/* Rieles de cada fila */}
            {[ROW_LICENSE, ROW_CUSTOM].map((y, r) => (
              <div
                key={y}
                className="absolute h-[70px] -mt-[35px] rounded-xl border border-dashed"
                style={{ left: 70, width: PLANE_W - 120, top: y, transform: "translateZ(1px)", borderColor: r === 0 ? "rgba(251,146,60,0.35)" : "rgba(25,198,230,0.35)" }}
              />
            ))}

            {data.map((d, i) => {
              const x = xAt(i);
              const win = firstWinYear !== undefined && d.year >= firstWinYear;
              return (
                <React.Fragment key={d.year}>
                  <Box3D x={x} y={ROW_LICENSE} w={52} d={52} h={h(d.license)} top="#FDBA74" front="#EA580C" side="#C2410C" />
                  <Box3D x={x} y={ROW_CUSTOM} w={52} d={52} h={h(d.custom)} top="#67E8F9" front="#0891B2" side="#0E7490" glow={win} />
                  <Billboard x={x} y={ROW_LICENSE} z={h(d.license) + 8}>
                    <span className="block whitespace-nowrap rounded bg-[#040F22]/90 px-1.5 py-0.5 text-[12px] font-mono font-bold text-orange-300">{short(d.license)}</span>
                  </Billboard>
                  <Billboard x={x} y={ROW_CUSTOM} z={h(d.custom) + 8}>
                    <span className={`block whitespace-nowrap rounded px-1.5 py-0.5 text-[12px] font-mono font-bold ${win ? "bg-emerald-400 text-[#040F22]" : "bg-[#040F22]/90 text-cyan-300"}`}>
                      {short(d.custom)}
                    </span>
                  </Billboard>
                  <Billboard x={x} y={ROW_CUSTOM + 70} z={2}>
                    <span className="text-[13px] font-mono text-slate-400 whitespace-nowrap">Año {d.year}</span>
                  </Billboard>
                </React.Fragment>
              );
            })}
          </Stage3D>

          {/* Leyenda */}
          <div className="absolute left-4 top-4 space-y-1.5 rounded-xl bg-[#040F22]/85 border border-white/10 px-3 py-2">
            <p className="flex items-center gap-2 text-[11px] text-slate-200"><span className="w-3 h-3 rounded-sm bg-orange-500" /> Software comprado (licencias)</p>
            <p className="flex items-center gap-2 text-[11px] text-slate-200"><span className="w-3 h-3 rounded-sm bg-cyan-500" /> Software a medida</p>
          </div>
        </div>

        {/* Resultado */}
        <div className="lab-narration lg:col-span-5 xl:col-span-4 p-5 sm:p-6 space-y-4" aria-live="polite">
          <div>
            <p className="text-[11px] font-mono uppercase tracking-wider text-[#19C6E6]">Resultado en {years} año{years > 1 ? "s" : ""}</p>
            <h3 className={`text-xl font-extrabold mt-1 flex items-center gap-2 ${savings > 0 ? "text-emerald-300" : "text-amber-200"}`}>
              {savings > 0 ? <TrendingDown className="w-5 h-5" /> : <Scale className="w-5 h-5" />}
              {savings > 0 ? `A medida ahorra ${short(savings)}` : `Licencias cuestan ${short(-savings)} menos`}
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed mt-2">
              {savings > 0
                ? `Pagando ${clp(licenseMonthly)} al mes en licencias, el desarrollo propio se recupera ${breakEvenMonths ? `en unos ${breakEvenMonths} meses` : "con el tiempo"}. Desde ahí, cada mes es ahorro, y el software es tuyo.`
                : "Con pocos usuarios o un horizonte corto, un software comprado suele ser más económico. A medida conviene cuando el negocio necesita procesos propios o crecerá en usuarios."}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div className="rounded-xl bg-orange-500/10 border border-orange-400/25 p-3">
              <p className="text-[9px] font-mono uppercase text-orange-200/80">Licencias acumuladas</p>
              <p className="text-lg font-extrabold font-mono text-orange-300">{short(licenseAt(years))}</p>
            </div>
            <div className="rounded-xl bg-cyan-500/10 border border-cyan-400/25 p-3">
              <p className="text-[9px] font-mono uppercase text-cyan-200/80">A medida acumulado</p>
              <p className="text-lg font-extrabold font-mono text-cyan-300">{short(customAt(years))}</p>
            </div>
            <div className="col-span-2 rounded-xl bg-white/[0.04] border border-white/10 p-3">
              <p className="text-[9px] font-mono uppercase text-slate-400">Punto de equilibrio</p>
              <p className="text-lg font-extrabold font-mono text-white">
                {breakEvenMonths ? `${breakEvenMonths} meses (${(breakEvenMonths / 12).toFixed(1).replace(".", ",")} años)` : "No se alcanza"}
              </p>
            </div>
          </div>

          <div className="space-y-2">
            <p className="text-xs font-bold text-white">El dinero no es lo único:</p>
            {[
              "A medida: se adapta a tus procesos, no al revés.",
              "A medida: el sistema y los datos son de tu empresa.",
              "Comprado: listo para usar desde el primer día.",
              "Comprado: ideal para procesos estándar (contabilidad, correo).",
            ].map((t) => (
              <p key={t} className="flex gap-2 text-xs text-slate-300">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" /> {t}
              </p>
            ))}
          </div>

          <p className="flex gap-2 text-[11px] text-slate-500 leading-relaxed">
            <Info className="w-3.5 h-3.5 shrink-0 mt-0.5" />
            Valores referenciales para ilustrar. Ajusta los controles con tus números reales o pídenos una evaluación.
          </p>
        </div>
      </div>
    </div>
  );
};
