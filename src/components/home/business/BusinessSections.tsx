import React from "react";
import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { Button } from "@/components/ui/Button";
import { FaqAccordion } from "@/components/ui/FaqAccordion";
import { reveal } from "@/components/motion/reveal";
import { homeIcons } from "@/components/home/business/icons";
import {
  homePains,
  homeNeeds,
  homeStories,
  homeSteps,
  homeReasons,
  homeFaqs,
} from "@/data/home";
import { ArrowRight, MessageCircle, Phone, X, Check } from "lucide-react";

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

export const PainPoints: React.FC = () => (
  <section className="py-20 sm:py-24 bg-white">
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <SectionTitle
        eyebrow="¿Te suena familiar?"
        title="Si te pasa alguna de estas cosas, podemos ayudarte"
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {homePains.map((pain, idx) => {
          const Icon = homeIcons[pain.icon];
          return (
            <div
              key={pain.text}
              {...reveal("up", idx * 70)}
              className="flex items-start gap-4 rounded-2xl bg-[#F7F9FC] border border-slate-100 p-5"
            >
              <span className="p-2.5 rounded-xl bg-rose-50 text-rose-500 shrink-0">
                <Icon className="w-5 h-5" />
              </span>
              <p className="text-base text-slate-700 leading-relaxed">{pain.text}</p>
            </div>
          );
        })}
      </div>
      <p {...reveal("up")} className="mt-10 text-center text-lg font-semibold text-[#071A35]">
        No es falta de ganas: es falta de las herramientas correctas.{" "}
        <span className="text-[#1373C9]">Eso lo resolvemos nosotros.</span>
      </p>
    </div>
  </section>
);

export const NeedsGrid: React.FC = () => (
  <section id="como-te-ayudamos" className="py-20 sm:py-24 bg-[#F3F7FC]">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <SectionTitle
        eyebrow="Cómo te ayudamos"
        title="Elige lo que necesita tu negocio"
        text="No necesitas saber cómo se hace. Solo dinos qué quieres lograr y nosotros nos encargamos."
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {homeNeeds.map((need, idx) => {
          const Icon = homeIcons[need.icon];
          return (
            <Link
              key={need.href}
              href={need.href}
              {...reveal("up", idx * 70)}
              className="group flex flex-col rounded-3xl bg-white border border-slate-200 p-6 hover:border-[#1373C9]/40 hover:shadow-xl hover:shadow-[#1479D4]/10 hover:-translate-y-1 transition-all duration-300"
            >
              <span className="w-12 h-12 flex items-center justify-center rounded-2xl bg-[#1373C9]/10 text-[#1373C9] group-hover:bg-[#1373C9] group-hover:text-white transition-colors">
                <Icon className="w-6 h-6" />
              </span>
              <h3 className="mt-5 text-lg font-bold text-[#071A35] leading-snug">{need.title}</h3>
              <p className="mt-2 text-[15px] text-slate-600 leading-relaxed flex-1">{need.description}</p>
              <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-bold text-[#1373C9]">
                Ver más <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </span>
            </Link>
          );
        })}

        {/* Tarjeta para quien no sabe qué elegir */}
        <a
          href={whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          {...reveal("up", homeNeeds.length * 70)}
          className="group flex flex-col justify-between rounded-3xl bg-[#071A35] p-6 text-white hover:-translate-y-1 hover:shadow-xl transition-all duration-300"
        >
          <div>
            <h3 className="text-lg font-bold leading-snug">¿No sabes qué necesitas?</h3>
            <p className="mt-2 text-[15px] text-slate-300 leading-relaxed">
              Es normal. Cuéntanos qué te complica y te recomendamos la mejor opción para tu negocio.
            </p>
          </div>
          <span className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-[#25D366]">
            <MessageCircle className="w-4 h-4" /> Escríbenos por WhatsApp
          </span>
        </a>
      </div>
    </div>
  </section>
);

export const Stories: React.FC = () => (
  <section className="py-20 sm:py-24 bg-white">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <SectionTitle
        eyebrow="Casos reales"
        title="Negocios como el tuyo que ya dieron el paso"
      />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {homeStories.map((story, idx) => (
          <article
            key={story.slug}
            {...reveal("up", idx * 100)}
            className="flex flex-col rounded-3xl border border-slate-200 bg-white overflow-hidden hover:shadow-xl hover:shadow-slate-200/70 transition-shadow"
          >
            <div className="relative aspect-[16/10] bg-[#F3F7FC]">
              <Image
                src={story.image}
                alt={story.client}
                fill
                sizes="(max-width: 1024px) 100vw, 33vw"
                className="object-cover"
              />
              <span className="absolute top-4 left-4 text-xs font-bold px-3 py-1 rounded-full bg-white/95 text-[#071A35] shadow-sm">
                {story.client}
              </span>
            </div>
            <div className="flex flex-col flex-1 p-6">
              <h3 className="text-xl font-bold text-[#071A35] leading-snug">{story.title}</h3>
              <div className="mt-5 space-y-3 flex-1">
                <p className="flex gap-3 text-[15px] text-slate-600 leading-relaxed">
                  <span className="mt-0.5 p-1 h-fit rounded-full bg-rose-50 text-rose-500 shrink-0">
                    <X className="w-3.5 h-3.5" />
                  </span>
                  <span><strong className="text-slate-800">Antes:</strong> {story.before}</span>
                </p>
                <p className="flex gap-3 text-[15px] text-slate-600 leading-relaxed">
                  <span className="mt-0.5 p-1 h-fit rounded-full bg-emerald-50 text-emerald-600 shrink-0">
                    <Check className="w-3.5 h-3.5" />
                  </span>
                  <span><strong className="text-slate-800">Ahora:</strong> {story.after}</span>
                </p>
              </div>
              <Link
                href={`/proyectos/${story.slug}`}
                className="mt-6 inline-flex items-center gap-1.5 text-sm font-bold text-[#1373C9] hover:text-[#1688F5]"
              >
                Conoce la historia completa <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </article>
        ))}
      </div>
      <div {...reveal("up")} className="mt-12 text-center">
        <Button href="/proyectos" variant="outline" size="lg" icon={<ArrowRight className="w-5 h-5" />}>
          Ver más casos de éxito
        </Button>
      </div>
    </div>
  </section>
);

export const HowWeWork: React.FC = () => (
  <section className="py-20 sm:py-24 bg-[#071A35] text-white relative overflow-hidden">
    <div aria-hidden="true" className="absolute -top-40 right-0 w-[520px] h-[520px] rounded-full bg-[#1479D4]/25 blur-[140px] pointer-events-none" />
    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <SectionTitle
        light
        eyebrow="Así trabajamos"
        title="Simple, cercano y sin sorpresas"
        text="Te acompañamos en cada paso, desde la primera conversación hasta que tu equipo lo usa sin problemas."
      />
      <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {homeSteps.map((step, idx) => (
          <li
            key={step.title}
            {...reveal("up", idx * 100)}
            className="rounded-3xl bg-white/[0.06] border border-white/10 p-6"
          >
            <span className="w-11 h-11 flex items-center justify-center rounded-full bg-[#19C6E6] text-[#071A35] text-lg font-extrabold">
              {idx + 1}
            </span>
            <h3 className="mt-5 text-lg font-bold">{step.title}</h3>
            <p className="mt-2 text-[15px] text-slate-300 leading-relaxed">{step.description}</p>
          </li>
        ))}
      </ol>

      <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {homeReasons.map((reason, idx) => {
          const Icon = homeIcons[reason.icon];
          return (
            <div key={reason.title} {...reveal("up", idx * 80)} className="flex gap-4">
              <Icon className="w-6 h-6 text-[#19C6E6] shrink-0 mt-0.5" />
              <div>
                <h3 className="font-bold">{reason.title}</h3>
                <p className="mt-1.5 text-sm text-slate-300 leading-relaxed">{reason.text}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  </section>
);

export const HomeFaq: React.FC = () => (
  <section className="py-20 sm:py-24 bg-[#F3F7FC]">
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
      <SectionTitle eyebrow="Preguntas frecuentes" title="Lo que más nos preguntan" />
      <div {...reveal("up")}>
        <FaqAccordion faqs={homeFaqs} />
      </div>
    </div>
  </section>
);

export const FinalCta: React.FC = () => (
  <section className="py-20 sm:py-24 bg-white">
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      <div
        {...reveal("zoom")}
        className="relative overflow-hidden rounded-[32px] bg-gradient-to-br from-[#1373C9] to-[#0B4F96] px-6 py-14 sm:px-14 text-center text-white shadow-2xl shadow-[#1479D4]/25"
      >
        <div aria-hidden="true" className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-white/10 blur-2xl" />
        <h2 className="relative text-3xl sm:text-4xl font-extrabold tracking-tight leading-tight">
          Cuéntanos de tu negocio y te decimos cómo podemos ayudarte
        </h2>
        <p className="relative mt-4 text-lg text-blue-100 max-w-2xl mx-auto">
          Una conversación sin compromiso. Sin tecnicismos, sin letra chica.
        </p>
        <div className="relative mt-9 flex flex-col sm:flex-row items-center justify-center gap-3.5">
          <Button
            href={whatsappHref}
            external
            variant="whatsapp"
            size="lg"
            icon={<MessageCircle className="w-5 h-5" />}
            className="w-full sm:w-auto text-lg"
          >
            Conversemos por WhatsApp
          </Button>
          <a
            href={`tel:+${siteConfig.contact.phoneRaw}`}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 rounded-lg px-6 py-3.5 text-base font-semibold border border-white/30 bg-white/10 hover:bg-white/20 transition-colors"
          >
            <Phone className="w-5 h-5" />
            Llámanos al {siteConfig.contact.phone}
          </a>
        </div>
      </div>
    </div>
  </section>
);
