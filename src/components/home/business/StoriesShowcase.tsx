"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { homeStories } from "@/data/home";
import {
  ArrowRight,
  MessageCircle,
  X,
  Check,
  CircleCheck,
  Flame,
  Trophy,
  GraduationCap,
  FileSignature,
  type LucideIcon,
} from "lucide-react";

const SECTOR_ICONS: Record<string, LucideIcon> = { Flame, Trophy, GraduationCap, FileSignature };

/** Vitrina de casos reales: el visitante elige un rubro y ve el antes y el después */
export const StoriesShowcase: React.FC = () => {
  const [active, setActive] = useState(0);
  const story = homeStories[active];
  const whatsappHref = `${siteConfig.contact.whatsappUrl}?text=${encodeURIComponent(
    `Hola, vi el caso de ${story.sector.toLowerCase()} en la página de Proscom y me gustaría algo así para mi negocio`
  )}`;

  return (
    <div>
      {/* Pestañas por rubro */}
      <div
        role="tablist"
        aria-label="Casos por rubro"
        className="flex gap-2 sm:gap-3 overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 sm:justify-center [scrollbar-width:none]"
      >
        {homeStories.map((item, idx) => {
          const Icon = SECTOR_ICONS[item.icon];
          const selected = idx === active;
          return (
            <button
              key={item.slug}
              type="button"
              role="tab"
              id={`caso-tab-${item.slug}`}
              aria-selected={selected}
              aria-controls="caso-panel"
              onClick={() => setActive(idx)}
              className={`shrink-0 inline-flex items-center gap-2 rounded-full px-4 sm:px-5 py-2.5 text-sm font-bold transition-all ${
                selected
                  ? "bg-orange-500 text-white shadow-lg shadow-orange-500/30"
                  : "bg-white text-slate-600 border border-orange-200/70 hover:border-orange-400 hover:text-orange-600"
              }`}
            >
              <Icon className="w-4 h-4" />
              {item.sector}
            </button>
          );
        })}
      </div>

      {/* Caso seleccionado */}
      <div
        id="caso-panel"
        role="tabpanel"
        aria-labelledby={`caso-tab-${story.slug}`}
        key={story.slug}
        className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start rounded-[32px] bg-white p-5 sm:p-8 lg:p-10 shadow-xl shadow-orange-900/5 animate-in fade-in duration-300"
      >
        {/* Captura del sistema */}
        <div className="lg:col-span-7 lg:sticky lg:top-28">
          <div className="rounded-2xl bg-[#0B0D12] p-1.5 sm:p-2 shadow-2xl shadow-slate-900/20">
            <div className="flex items-center gap-1.5 px-2 pb-1.5 sm:pb-2">
              <span className="w-2 h-2 rounded-full bg-[#FF5F57]" />
              <span className="w-2 h-2 rounded-full bg-[#FEBC2E]" />
              <span className="w-2 h-2 rounded-full bg-[#28C840]" />
            </div>
            <div className="relative aspect-[16/10] rounded-xl overflow-hidden bg-white">
              <Image
                src={story.image}
                alt={`Sistema creado por Proscom para ${story.sector.toLowerCase()}`}
                fill
                sizes="(max-width: 1024px) 100vw, 640px"
                className="object-cover object-top"
              />
            </div>
          </div>
        </div>

        {/* Historia */}
        <div className="lg:col-span-5">
          <span className="inline-flex items-center rounded-full bg-orange-100 px-3 py-1 text-xs font-bold text-orange-700">
            {story.sector}
          </span>
          <h3 className="mt-4 text-2xl sm:text-3xl font-extrabold tracking-tight text-[#071A35] leading-tight">
            {story.title}
          </h3>

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-3">
            <div className="rounded-2xl bg-rose-50 border border-rose-100 p-4">
              <p className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-rose-600">
                <X className="w-3.5 h-3.5" /> Antes
              </p>
              <p className="mt-2 text-sm text-slate-700 leading-relaxed">{story.before}</p>
            </div>
            <div className="rounded-2xl bg-emerald-50 border border-emerald-100 p-4">
              <p className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-emerald-700">
                <Check className="w-3.5 h-3.5" /> Ahora
              </p>
              <p className="mt-2 text-sm text-slate-700 leading-relaxed">{story.after}</p>
            </div>
          </div>

          <ul className="mt-6 space-y-2.5">
            {story.highlights.map((item) => (
              <li key={item} className="flex items-center gap-2.5 text-[15px] font-semibold text-[#071A35]">
                <CircleCheck className="w-5 h-5 text-emerald-500 shrink-0" />
                {item}
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#25D366] hover:bg-[#20ba59] px-5 py-3 text-sm font-bold text-white shadow-lg shadow-emerald-500/25 transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              Quiero algo así para mi negocio
            </a>
            <Link
              href={`/proyectos/${story.slug}`}
              className="inline-flex items-center justify-center gap-1.5 rounded-xl px-5 py-3 text-sm font-bold text-orange-600 hover:bg-orange-50 transition-colors"
            >
              Ver caso completo <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
