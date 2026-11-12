"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { reveal } from "@/components/motion/reveal";
import { ShieldCheck, CircleCheck, MessageCircle, ArrowRight, CalendarClock } from "lucide-react";

// La Ley 21.719 entra en vigencia el 1 de diciembre de 2026 (hora de Chile)
const LAW_START = new Date("2026-12-01T00:00:00-03:00");

const POINTS = [
  "Revisamos qué datos de tus clientes guardas y dónde",
  "Adaptamos tu web y tus sistemas: consentimiento, seguridad y derechos de tus clientes",
  "Te acompañamos hasta dejar tus sistemas preparados",
];

/** Días que faltan para la ley; se calcula en el navegador para no desfasar la hidratación */
const useDaysLeft = () => {
  const [days, setDays] = useState<number | null>(null);
  useEffect(() => {
    const update = () => setDays(Math.ceil((LAW_START.getTime() - Date.now()) / 86_400_000));
    update();
    const id = window.setInterval(update, 60_000);
    return () => window.clearInterval(id);
  }, []);
  return days;
};

/** Banner llamativo sobre la Ley 21.719 de Protección de Datos Personales */
export const DataLawBanner: React.FC = () => {
  const days = useDaysLeft();
  const whatsappHref = `${siteConfig.contact.whatsappUrl}?text=${encodeURIComponent(
    "Hola, quiero preparar mi negocio para la Ley 21.719 de Protección de Datos"
  )}`;

  return (
    <section
      aria-label="Ley 21.719 de Protección de Datos Personales"
      className="relative overflow-hidden bg-gradient-to-br from-yellow-300 via-amber-300 to-amber-400 py-16 sm:py-20"
    >
      {/* Franjas diagonales tipo señal de atención */}
      <div
        aria-hidden="true"
        className="absolute inset-0 [background-image:repeating-linear-gradient(135deg,rgba(7,26,53,0.06)_0_14px,transparent_14px_28px)] pointer-events-none"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        {/* Mensaje */}
        <div className="lg:col-span-7 text-[#071A35]">
          <p {...reveal("up")} className="inline-flex items-center gap-2 rounded-full bg-[#071A35] px-4 py-1.5 text-xs sm:text-sm font-bold text-yellow-300">
            <ShieldCheck className="w-4 h-4" />
            Ley 21.719 · Protección de Datos Personales
          </p>
          <h2 {...reveal("up", 80)} className="mt-5 text-3xl sm:text-4xl lg:text-[2.75rem] font-extrabold tracking-tight leading-[1.1]">
            ¿Tu negocio está listo para la nueva ley de datos personales?
          </h2>
          <p {...reveal("up", 160)} className="mt-5 text-lg text-[#071A35]/85 leading-relaxed max-w-2xl">
            Desde el <strong>1 de diciembre de 2026</strong>, todo negocio que guarde
            datos de sus clientes (nombres, RUT, teléfonos o correos) debe cuidarlos
            con nuevas reglas. Te ayudamos a adaptar tu página web y tus sistemas,
            sin complicaciones.
          </p>
          <ul {...reveal("up", 240)} className="mt-7 space-y-3">
            {POINTS.map((point) => (
              <li key={point} className="flex items-start gap-3 text-base font-semibold">
                <CircleCheck className="w-5 h-5 mt-0.5 shrink-0 text-[#071A35]" />
                {point}
              </li>
            ))}
          </ul>
        </div>

        {/* Cuenta regresiva y llamado a la acción */}
        <div {...reveal("zoom", 200)} className="lg:col-span-5">
          <div className="rounded-[28px] bg-[#071A35] p-7 sm:p-8 text-white shadow-2xl shadow-amber-900/30">
            <p className="flex items-center gap-2 text-sm font-semibold text-yellow-300">
              <CalendarClock className="w-4 h-4" />
              Entra en vigencia el 1 de diciembre de 2026
            </p>

            <div className="mt-5 flex items-end gap-3" aria-live="polite">
              {days === null ? (
                <p className="text-4xl font-extrabold">Muy pronto</p>
              ) : days > 0 ? (
                <>
                  <span className="text-6xl sm:text-7xl font-extrabold leading-none text-yellow-300">{days}</span>
                  <span className="pb-1.5 text-lg font-semibold text-slate-200">
                    {days === 1 ? "día para que empiece a regir" : "días para que empiece a regir"}
                  </span>
                </>
              ) : (
                <p className="text-4xl font-extrabold text-yellow-300">Ya está vigente</p>
              )}
            </div>

            <p className="mt-4 text-sm text-slate-300 leading-relaxed">
              Mientras antes empieces, más tranquilo llegas. Conversemos y te decimos
              qué necesita tu negocio.
            </p>

            <div className="mt-7 flex flex-col gap-3">
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#25D366] hover:bg-[#20ba59] px-5 py-3.5 text-base font-bold text-white shadow-lg shadow-emerald-500/25 transition-colors"
              >
                <MessageCircle className="w-5 h-5" />
                Quiero preparar mi negocio
              </a>
              <Link
                href="/ley-proteccion-datos-chile"
                className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-white/20 px-5 py-3 text-sm font-semibold text-white hover:bg-white/10 transition-colors"
              >
                Conoce la ley en simple <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <p className="mt-5 text-[11px] text-slate-400 leading-relaxed">
              Hacemos la adaptación técnica de tus sistemas. Para el análisis legal de tu
              caso te recomendamos complementar con un abogado.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
