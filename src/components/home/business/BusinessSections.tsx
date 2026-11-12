import React from "react";
import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { Button } from "@/components/ui/Button";
import { FaqAccordion } from "@/components/ui/FaqAccordion";
import { reveal } from "@/components/motion/reveal";
import { homeIcons } from "@/components/home/business/icons";
import { StoriesShowcase } from "@/components/home/business/StoriesShowcase";
import {
  homePillars,
  homeSteps,
  homeReasons,
  homeFaqs,
  homeTestimonials,
} from "@/data/home";
import { ArrowRight, MessageCircle, Phone, Check, CircleCheck, MapPin, Quote } from "lucide-react";

const whatsappHref = `${siteConfig.contact.whatsappUrl}?text=${encodeURIComponent(
  "Hola, vi la página de Proscom y me gustaría conversar sobre mi negocio"
)}`;

const CLIENTS = [
  { src: "/images/clientes/marquee/cliente-lega-firma.png", name: "LegalFirma" },
  { src: "/images/clientes/marquee/cliente-san-jose.png", name: "Colegio San José" },
  { src: "/images/clientes/marquee/cliente-lyc.png", name: "Distribuidora LyC" },
  { src: "/images/clientes/marquee/cliente-eleam.png", name: "Hnas. Hospitalarias" },
  { src: "/images/clientes/marquee/cliente-beerlover.png", name: "Beer Lover" },
  { src: "/images/clientes/marquee/logo.png", name: "AF Catemu" },
];

// Texturas de fondo para separar visualmente cada sección
const DOTS = "[background-image:radial-gradient(#1373C9_1px,transparent_1px)] [background-size:20px_20px]";
const GRID_DARK = "[background-image:linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:44px_44px]";

// Psicología del color por área: naranjo = ventas/energía, azul = orden/confianza, verde = tranquilidad/apoyo
const PILLAR_COLORS = [
  { icon: "bg-gradient-to-br from-orange-500 to-amber-500 shadow-orange-500/30", bar: "bg-orange-500", hover: "hover:text-orange-600", check: "text-orange-500" },
  { icon: "bg-gradient-to-br from-[#1373C9] to-[#1688F5] shadow-[#1373C9]/30", bar: "bg-[#1373C9]", hover: "hover:text-[#1373C9]", check: "text-[#1373C9]" },
  { icon: "bg-gradient-to-br from-emerald-500 to-teal-500 shadow-emerald-500/30", bar: "bg-emerald-500", hover: "hover:text-emerald-600", check: "text-emerald-500" },
];

/** Encabezado común de cada sección */
const SectionTitle: React.FC<{ eyebrow: string; title: string; text?: string; light?: boolean }> = ({
  eyebrow,
  title,
  text,
  light,
}) => (
  <div {...reveal("up")} className="max-w-3xl mx-auto text-center mb-14">
    <p className={`text-sm font-bold uppercase tracking-wider ${light ? "text-[#19C6E6]" : "text-[#1373C9]"}`}>
      {eyebrow}
    </p>
    <h2 className={`mt-3 text-3xl sm:text-4xl lg:text-[2.6rem] font-extrabold tracking-tight leading-tight ${light ? "text-white" : "text-[#071A35]"}`}>
      {title}
    </h2>
    {text && (
      <p className={`mt-4 text-lg leading-relaxed ${light ? "text-slate-300" : "text-slate-600"}`}>{text}</p>
    )}
  </div>
);

export const TrustedBy: React.FC = () => {
  const loop = [...CLIENTS, ...CLIENTS];
  return (
    <section aria-label="Negocios que confían en nosotros" className="py-10 bg-white border-y border-slate-100 overflow-hidden">
      <p className="text-center text-sm font-semibold text-slate-500 mb-6 px-4">
        Negocios y organizaciones que ya trabajan con nosotros
      </p>
      <div className="marquee-track mask-fade-x">
        <ul className="flex w-max items-center gap-12 animate-marquee">
          {loop.map((client, i) => (
            <li
              key={`${client.name}-${i}`}
              aria-hidden={i >= CLIENTS.length ? "true" : undefined}
              className="shrink-0 flex items-center gap-3"
            >
              <Image
                src={client.src}
                alt={i >= CLIENTS.length ? "" : client.name}
                width={56}
                height={40}
                className="h-9 w-auto object-contain"
              />
              <span className="text-sm font-semibold text-slate-600 whitespace-nowrap">{client.name}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

/** Qué hacemos: tres áreas con sus servicios */
export const WhatWeDo: React.FC = () => (
  <section id="que-hacemos" className="relative py-20 sm:py-28 bg-[#EAF2FC] overflow-hidden">
    <div aria-hidden="true" className={`absolute inset-0 ${DOTS} opacity-[0.12] pointer-events-none`} />
    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <SectionTitle
        eyebrow="Qué hacemos"
        title="Creamos las herramientas digitales que tu negocio necesita"
        text="Páginas web, tiendas online, sistemas de ventas y caja, y todo lo que te ayude a trabajar mejor. Tú eliges qué quieres lograr; nosotros lo hacemos realidad."
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {homePillars.map((pillar, idx) => {
          const Icon = homeIcons[pillar.icon];
          const color = PILLAR_COLORS[idx % PILLAR_COLORS.length];
          return (
            <article
              key={pillar.title}
              {...reveal("up", idx * 100)}
              className="relative flex flex-col rounded-3xl bg-white p-7 sm:p-8 shadow-lg shadow-slate-900/5 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 overflow-hidden"
            >
              <span aria-hidden="true" className={`absolute top-0 left-0 right-0 h-1.5 ${color.bar}`} />
              <span className={`w-14 h-14 flex items-center justify-center rounded-2xl text-white shadow-lg ${color.icon}`}>
                <Icon className="w-7 h-7" />
              </span>
              <h3 className="mt-6 text-2xl font-extrabold text-[#071A35]">{pillar.title}</h3>
              <p className="mt-3 text-[15px] text-slate-600 leading-relaxed">{pillar.question}</p>

              <ul className="mt-6 pt-6 border-t border-slate-100 space-y-1 flex-1">
                {pillar.services.map((service) => (
                  <li key={service.label}>
                    <Link
                      href={service.href}
                      className={`group flex items-center justify-between gap-3 rounded-xl px-3 py-2.5 -mx-3 text-[15px] font-semibold text-[#071A35] hover:bg-slate-50 ${color.hover} transition-colors`}
                    >
                      <span className="flex items-center gap-2.5">
                        <CircleCheck className={`w-4 h-4 shrink-0 ${color.check}`} />
                        {service.label}
                      </span>
                      <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-current group-hover:translate-x-0.5 transition-all" />
                    </Link>
                  </li>
                ))}
              </ul>
            </article>
          );
        })}
      </div>

      {/* Sistemas listos para usar */}
      <div
        {...reveal("up")}
        className="mt-8 flex flex-col md:flex-row md:items-center justify-between gap-5 rounded-3xl bg-gradient-to-r from-orange-500 to-amber-500 px-7 py-6 sm:px-8 text-white shadow-xl shadow-orange-500/25"
      >
        <div>
          <p className="text-lg font-bold">¿Tienes una junta de vecinos, club deportivo o colegio?</p>
          <p className="mt-1 text-orange-50">Tenemos sistemas listos para usar, probados por organizaciones como la tuya.</p>
        </div>
        <Link
          href="/soluciones"
          className="inline-flex items-center justify-center gap-2 shrink-0 rounded-xl bg-white px-5 py-3 text-sm font-bold text-orange-600 hover:bg-orange-50 transition-colors"
        >
          Ver sistemas listos <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  </section>
);

/** Cómo trabajamos: pasos con lo que recibe el cliente */
export const HowWeWork: React.FC = () => (
  <section id="como-trabajamos" className="relative py-20 sm:py-28 bg-[#071A35] text-white overflow-hidden">
    <div aria-hidden="true" className={`absolute inset-0 ${GRID_DARK} [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)] pointer-events-none`} />
    <div aria-hidden="true" className="absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[400px] rounded-full bg-[#1479D4]/30 blur-[140px] pointer-events-none" />
    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <SectionTitle
        light
        eyebrow="Cómo trabajamos"
        title="Un proceso simple, de principio a fin"
        text="Sabrás siempre en qué etapa estamos, qué viene después y cuánto cuesta. Sin sorpresas."
      />

      <ol className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-6">
        {/* Línea que une los pasos */}
        <span aria-hidden="true" className="hidden lg:block absolute top-7 left-[12.5%] right-[12.5%] h-0.5 bg-gradient-to-r from-amber-400/30 via-amber-400/60 to-amber-400/30" />
        {homeSteps.map((step, idx) => (
          <li key={step.title} {...reveal("up", idx * 110)} className="relative text-center">
            <span className="relative mx-auto w-14 h-14 flex items-center justify-center rounded-full bg-gradient-to-br from-amber-400 to-orange-500 text-xl font-extrabold text-white shadow-lg shadow-orange-500/30 ring-4 ring-[#071A35]">
              {idx + 1}
            </span>
            <h3 className="mt-5 text-xl font-bold text-white">{step.title}</h3>
            <p className="mt-2 text-[15px] text-slate-300 leading-relaxed max-w-xs mx-auto">{step.description}</p>
            <p className="mt-4 inline-flex items-start gap-2 rounded-xl bg-emerald-400/10 border border-emerald-400/25 px-3.5 py-2 text-left text-sm font-semibold text-emerald-300">
              <Check className="w-4 h-4 mt-0.5 shrink-0" />
              {step.result}
            </p>
          </li>
        ))}
      </ol>
    </div>
  </section>
);

export const Stories: React.FC = () => (
  <section className="relative py-20 sm:py-28 bg-[#FFF7ED] overflow-hidden">
    <div aria-hidden="true" className="absolute inset-0 [background-image:repeating-linear-gradient(135deg,rgba(234,88,12,0.045)_0_2px,transparent_2px_14px)] pointer-events-none" />
    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <SectionTitle
        eyebrow="Casos reales"
        title="Negocios como el tuyo que ya dieron el paso"
        text="Elige un rubro y mira cómo cambió su día a día."
      />
      <div {...reveal("up")}>
        <StoriesShowcase />
      </div>
      <div {...reveal("up")} className="mt-12 text-center">
        <Button href="/proyectos" variant="outline" size="lg" icon={<ArrowRight className="w-5 h-5" />} className="bg-white border-orange-500 text-orange-600 hover:bg-orange-50">
          Ver más casos de éxito
        </Button>
      </div>
    </div>
  </section>
);

// Colores de los avatares de testimonios, en la misma línea de los pilares
const AVATAR_COLORS = ["from-[#1373C9] to-[#1688F5]", "from-emerald-500 to-teal-500", "from-orange-500 to-amber-500"];

const initials = (name: string) =>
  name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

/** Lo que dicen nuestros clientes */
export const Testimonials: React.FC = () => (
  <section className="relative py-20 sm:py-28 bg-white overflow-hidden">
    <div aria-hidden="true" className={`absolute inset-0 opacity-[0.07] ${DOTS} [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)] pointer-events-none`} />
    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <SectionTitle
        eyebrow="Lo que dicen nuestros clientes"
        title="Personas reales, resultados reales"
        text="Colegios, organizaciones y empresas que ya confían en nosotros."
      />
      <ul className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
        {homeTestimonials.map((item, idx) => (
          <li key={item.name} {...reveal("up", idx * 100)} className="h-full">
            <figure className="relative h-full flex flex-col rounded-[28px] bg-[#F3F7FC] border border-slate-200/70 p-7 sm:p-8 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
              <Quote aria-hidden="true" className="absolute top-6 right-6 w-10 h-10 text-[#1373C9]/15 fill-[#1373C9]/10" />
              <span className="inline-flex self-start items-center rounded-full bg-white border border-slate-200 px-3 py-1 text-xs font-bold text-[#1373C9]">
                {item.service}
              </span>
              <blockquote className="mt-5 flex-1 text-[17px] leading-relaxed text-slate-700">
                “{item.quote}”
              </blockquote>
              <figcaption className="mt-7 pt-6 border-t border-slate-200 flex items-center gap-4">
                <span
                  aria-hidden="true"
                  className={`shrink-0 w-12 h-12 rounded-full bg-gradient-to-br ${AVATAR_COLORS[idx % AVATAR_COLORS.length]} flex items-center justify-center text-sm font-extrabold text-white shadow-lg`}
                >
                  {initials(item.name)}
                </span>
                <span className="min-w-0">
                  <span className="block font-bold text-[#071A35]">{item.name}</span>
                  <span className="block text-sm text-slate-500">{item.role}</span>
                </span>
              </figcaption>
              <Link
                href={item.href}
                className="mt-5 inline-flex items-center gap-1.5 text-sm font-bold text-[#1373C9] hover:text-[#0B4F96] transition-colors"
              >
                Ver lo que hicimos <ArrowRight className="w-4 h-4" />
              </Link>
            </figure>
          </li>
        ))}
      </ul>
    </div>
  </section>
);

/** Quiénes somos */
export const AboutUs: React.FC = () => (
  <section id="quienes-somos" className="py-20 sm:py-28 bg-gradient-to-br from-[#0B4F96] via-[#1167BD] to-[#1373C9] text-white relative overflow-hidden">
    <div aria-hidden="true" className="absolute inset-0 [background-image:radial-gradient(rgba(255,255,255,0.12)_1px,transparent_1px)] [background-size:22px_22px] [mask-image:linear-gradient(to_left,black,transparent_70%)] pointer-events-none" />
    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
      {/* Imagen */}
      <div {...reveal("right")} className="relative">
        <div className="relative aspect-[4/3] rounded-3xl overflow-hidden ring-4 ring-white/20 shadow-2xl shadow-black/30">
          <Image
            src="/images/hero/header-hero.png"
            alt="Equipo planificando un proyecto para un cliente"
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
        </div>
        <div className="absolute -bottom-6 left-6 sm:left-8 flex items-center gap-3 rounded-2xl bg-white text-[#071A35] shadow-xl px-5 py-4">
          <span className="p-2 rounded-xl bg-[#1373C9]/10 text-[#1373C9]">
            <MapPin className="w-5 h-5" />
          </span>
          <div>
            <p className="text-sm font-bold">Oficina en {siteConfig.location.city}</p>
            <p className="text-xs text-slate-500">Atendemos a todo Chile</p>
          </div>
        </div>
      </div>

      {/* Texto */}
      <div>
        <p {...reveal("up")} className="text-sm font-bold uppercase tracking-wider text-amber-300">Quiénes somos</p>
        <h2 {...reveal("up", 80)} className="mt-3 text-3xl sm:text-4xl lg:text-[2.6rem] font-extrabold tracking-tight leading-tight">
          Una empresa chilena que habla tu idioma
        </h2>
        <p {...reveal("up", 160)} className="mt-5 text-lg text-blue-50/90 leading-relaxed">
          En {siteConfig.name} creamos herramientas digitales para negocios y
          organizaciones: comercios, colegios, distribuidoras, asociaciones
          deportivas y empresas de servicios. Nuestro trabajo es que la
          tecnología te ahorre tiempo y te ayude a vender, sin que tengas que
          entenderla.
        </p>

        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-7">
          {homeReasons.map((reason, idx) => {
            const Icon = homeIcons[reason.icon];
            return (
              <div key={reason.title} {...reveal("up", 200 + idx * 80)} className="flex gap-4">
                <span className="p-2 h-fit rounded-xl bg-white/15 shrink-0">
                  <Icon className="w-5 h-5 text-white" />
                </span>
                <div>
                  <h3 className="font-bold">{reason.title}</h3>
                  <p className="mt-1.5 text-sm text-blue-50/80 leading-relaxed">{reason.text}</p>
                </div>
              </div>
            );
          })}
        </div>

        <Link
          {...reveal("up", 500)}
          href="/nosotros"
          className="mt-10 inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-bold text-[#1373C9] hover:bg-blue-50 transition-colors"
        >
          Conoce más sobre nosotros <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  </section>
);

export const HomeFaq: React.FC = () => (
  <section className="py-20 sm:py-28 bg-[#F3F7FC]">
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
      <SectionTitle eyebrow="Preguntas frecuentes" title="Lo que más nos preguntan" />
      <div {...reveal("up")}>
        <FaqAccordion faqs={homeFaqs} />
      </div>
    </div>
  </section>
);

export const FinalCta: React.FC = () => (
  <section className="relative py-20 sm:py-24 bg-gradient-to-br from-emerald-600 via-emerald-500 to-teal-500 text-white overflow-hidden">
    <div aria-hidden="true" className="absolute inset-0 [background-image:radial-gradient(rgba(255,255,255,0.18)_1px,transparent_1px)] [background-size:22px_22px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)] pointer-events-none" />
    <div {...reveal("zoom")} className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight">
        ¿Listo para ordenar tu negocio y vender más?
      </h2>
      <p className="mt-5 text-lg sm:text-xl text-emerald-50 max-w-2xl mx-auto">
        Cuéntanos de tu negocio y te decimos cómo podemos ayudarte. Una
        conversación sin compromiso, sin tecnicismos y sin letra chica.
      </p>
      <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3.5">
        <a
          href={whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 rounded-xl bg-white px-8 py-4 text-lg font-bold text-emerald-700 shadow-xl shadow-emerald-900/25 hover:bg-emerald-50 hover:-translate-y-0.5 transition-all"
        >
          <MessageCircle className="w-5 h-5" />
          Conversemos por WhatsApp
        </a>
        <a
          href={`tel:+${siteConfig.contact.phoneRaw}`}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 rounded-xl px-7 py-4 text-base font-semibold border-2 border-white/60 hover:bg-white/10 transition-colors"
        >
          <Phone className="w-5 h-5" />
          Llámanos al {siteConfig.contact.phone}
        </a>
      </div>
    </div>
  </section>
);
