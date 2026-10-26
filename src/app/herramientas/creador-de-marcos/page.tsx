import React from "react";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight, ChevronDown, ChevronRight, Clapperboard, Download, Layers, Wand2 } from "lucide-react";
import { siteConfig } from "@/config/site";
import { getBreadcrumbSchema, getFaqSchema } from "@/lib/schema";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { reveal } from "@/components/motion/reveal";
import { PageHeroFx } from "@/components/motion/PageHeroFx";
import { FrameMaker } from "@/components/tools/FrameMaker";

const PAGE_URL = `${siteConfig.url}/herramientas/creador-de-marcos`;
const META_TITLE = "Marco para videos de TikTok y Reels: créalo gratis con tu logo";
const META_DESCRIPTION =
  "Crea gratis un marco vertical 9:16 o 4:5 con tu logo y colores para pasar videos horizontales a TikTok, Reels y Shorts. Sin registro y listo para CapCut.";

export const metadata: Metadata = {
  title: META_TITLE,
  description: META_DESCRIPTION,
  keywords: [
    "marco para videos de TikTok",
    "plantilla para Reels",
    "plantilla 9:16 con logo",
    "convertir video horizontal a vertical",
    "video horizontal en TikTok",
    "marco para CapCut",
    "fondo para video vertical",
    "plantilla para YouTube Shorts",
  ],
  alternates: { canonical: PAGE_URL },
  openGraph: {
    type: "website",
    locale: "es_CL",
    url: PAGE_URL,
    siteName: siteConfig.name,
    title: "Creador de marcos para TikTok y Reels (gratis)",
    description: META_DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: "Creador de marcos para TikTok y Reels (gratis)",
    description: META_DESCRIPTION,
  },
};

const faqs = [
  {
    question: "¿El creador de marcos es gratis?",
    answer:
      "Sí. Es una herramienta 100% gratuita de Proscom: no necesitas registrarte, no tiene marcas de agua y puedes descargar todos los marcos que quieras.",
  },
  {
    question: "¿Se suben mi logo o mis textos a algún servidor?",
    answer:
      "No. El marco se dibuja directamente en tu navegador. Tu logo, tus colores y tus textos nunca salen de tu computador o celular.",
  },
  {
    question: "¿Qué medidas tiene un video para TikTok, Reels o Shorts?",
    answer:
      "El formato recomendado es vertical 9:16, de 1080 × 1920 píxeles. Para publicaciones en el feed de Instagram se usa 4:5, de 1080 × 1350 píxeles. El creador genera ambos tamaños.",
  },
  {
    question: "¿Cómo paso un video horizontal a vertical sin que se vea chico?",
    answer:
      "Pon tu grabación horizontal a todo el ancho dentro de un marco vertical, con un título arriba y tu logo abajo. Así el video llena la pantalla del celular, se lee mejor y TikTok no lo muestra con barras negras.",
  },
  {
    question: "¿Por qué mi video horizontal se ve con barras negras en TikTok?",
    answer:
      "Porque TikTok y Reels están pensados para videos verticales. Si subes un video horizontal, la app lo achica y rellena el resto con negro. Un marco 9:16 aprovecha ese espacio con tu marca, un título y los subtítulos.",
  },
  {
    question: "¿Cómo uso el marco en CapCut?",
    answer:
      "Crea un proyecto 9:16, pon tu grabación horizontal en la pista principal y el PNG del marco en una pista encima. Luego agranda el video hasta que llene la ventana transparente del centro y agrega voz, música y subtítulos.",
  },
  {
    question: "¿Qué formato debe tener mi logo?",
    answer:
      "Lo ideal es un PNG con fondo transparente. También puedes usar JPG, WebP o SVG. Si no tienes logo, puedes escribir el nombre de tu marca y el creador lo dibuja con letra gruesa.",
  },
];

const appSchema = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Creador de marcos para videos de TikTok y Reels",
  url: PAGE_URL,
  description: META_DESCRIPTION,
  applicationCategory: "MultimediaApplication",
  operatingSystem: "Web",
  browserRequirements: "Requiere un navegador moderno con JavaScript",
  inLanguage: "es-CL",
  isAccessibleForFree: true,
  offers: { "@type": "Offer", price: "0", priceCurrency: "CLP" },
  featureList: [
    "Marcos verticales 9:16 (1080×1920) y 4:5 (1080×1350)",
    "Logo propio en PNG, JPG, WebP o SVG",
    "Título con palabras resaltadas",
    "9 temas de color y colores personalizables",
    "Ventana transparente para el video",
    "Vista previa de las zonas que tapa TikTok",
  ],
  publisher: { "@id": `${siteConfig.url}/#organization` },
};

const steps = [
  {
    icon: Wand2,
    t: "1. Diseña tu marco",
    d: "Elige el formato, escribe el título, sube tu logo y ajusta los colores de tu marca.",
  },
  {
    icon: Download,
    t: "2. Descarga el PNG",
    d: "La ventana del centro queda transparente para que tu video se vea a través de ella.",
  },
  {
    icon: Layers,
    t: "3. Llévalo a tu editor",
    d: "En CapCut (o el editor que uses) pon el marco en una pista encima de tu grabación horizontal.",
  },
  {
    icon: Clapperboard,
    t: "4. Agrega voz y subtítulos",
    d: "Ubica los subtítulos en la franja libre entre el video y el logo, y publica.",
  },
];

const capcut = [
  "Crea un proyecto nuevo y cambia la relación de aspecto a 9:16 (o 4:5).",
  "Arrastra tu grabación horizontal a la pista principal.",
  "Arrastra el marco PNG a una pista por encima del video y estíralo hasta el final.",
  "Selecciona el video y sube su escala hasta que llene la ventana del centro.",
  "Agrega música, voz y subtítulos automáticos en la franja libre bajo el video.",
  "Exporta en 1080p a 30 fps.",
];

export default function FrameMakerPage() {
  return (
    <div className="bg-white">
      <section className="bg-[#071A35] text-white py-14 lg:py-20 border-b border-white/10 relative overflow-hidden">
        <PageHeroFx />
        <div {...reveal("blur")} className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <nav aria-label="Ruta de navegación" className="mb-5 text-xs text-slate-400">
            <ol className="inline-flex flex-wrap items-center gap-1.5">
              <li className="inline-flex items-center gap-1.5">
                <Link href="/" className="hover:text-white">Inicio</Link>
                <ChevronRight className="w-3 h-3" aria-hidden="true" />
              </li>
              <li className="inline-flex items-center gap-1.5">
                Herramientas
                <ChevronRight className="w-3 h-3" aria-hidden="true" />
              </li>
              <li aria-current="page" className="text-slate-200">Creador de marcos</li>
            </ol>
          </nav>
          <Badge variant="cyan" className="mb-4">
            <Wand2 className="w-3.5 h-3.5 mr-1 inline" /> Herramienta gratuita
          </Badge>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
            Creador de marcos para videos de TikTok y Reels
          </h1>
          <p className="text-base sm:text-lg text-slate-300 mt-5 leading-relaxed">
            ¿Grabaste tu web o tu sistema en horizontal y en el celular se ve chico? Crea un marco vertical con tu logo,
            tus colores y un título, y muestra tus grabaciones a pantalla completa en TikTok, Reels y Shorts.
          </p>
        </div>
      </section>

      <section className="py-10 bg-white border-b border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map(({ icon: Icon, t, d }) => (
            <div key={t} className="flex gap-3">
              <span className="grid place-items-center w-11 h-11 rounded-xl bg-[#1479D4]/10 text-[#1479D4] shrink-0">
                <Icon className="w-5 h-5" />
              </span>
              <span>
                <span className="block font-bold text-[#071A35]">{t}</span>
                <span className="block text-sm text-slate-600">{d}</span>
              </span>
            </div>
          ))}
        </div>
      </section>

      <section className="py-12 lg:py-16 bg-[#F8FAFC]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <FrameMaker />
        </div>
      </section>

      <section className="py-14 lg:py-20 bg-white border-t border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-10">
          <div {...reveal("up")}>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#071A35]">Cómo usar el marco en CapCut</h2>
            <ol className="mt-6 space-y-3">
              {capcut.map((s, i) => (
                <li key={s} className="flex gap-3 text-slate-700">
                  <span className="grid place-items-center w-7 h-7 rounded-full bg-[#071A35] text-white text-xs font-bold shrink-0">
                    {i + 1}
                  </span>
                  <span className="pt-0.5">{s}</span>
                </li>
              ))}
            </ol>
          </div>
          <div {...reveal("up", 120)} className="space-y-5">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#071A35]">Consejos para que se vea profesional</h2>
            <ul className="space-y-3 text-slate-700 list-disc pl-5">
              <li>Graba en pantalla completa y oculta la barra de marcadores del navegador.</li>
              <li>Usa títulos cortos, de 4 a 7 palabras, y resalta solo una o dos palabras clave.</li>
              <li>Activa &quot;Zonas que tapa TikTok&quot; en la vista previa para no poner nada importante bajo los botones de la app.</li>
              <li>Usa siempre los mismos colores y logo: así tus videos se reconocen al instante.</li>
              <li>Nunca muestres datos reales de clientes en tus grabaciones; usa datos de prueba.</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="py-14 lg:py-20 bg-[#F8FAFC] border-t border-slate-200">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 {...reveal("up")} className="text-2xl sm:text-3xl font-extrabold text-[#071A35]">
            Cómo pasar un video horizontal a vertical para TikTok y Reels
          </h2>
          <div className="mt-5 space-y-4 text-slate-700 leading-relaxed">
            <p>
              Las grabaciones de pantalla de una web, un sistema o una presentación son horizontales (16:9), pero TikTok,
              Instagram Reels y YouTube Shorts muestran los videos en vertical (9:16). Si subes el video tal cual, la app lo
              achica, le agrega barras negras y tu contenido casi no se lee en el celular.
            </p>
            <p>
              La solución que usan las marcas es un <strong>marco vertical</strong>: el video horizontal va a todo el ancho
              en el centro, arriba un título que engancha y abajo tu logo y tu web, con una franja libre para los subtítulos.
              Así el video llena la pantalla, se ve profesional y todos tus contenidos mantienen la misma identidad visual.
            </p>
            <p>
              Con este creador armas ese marco en un minuto, lo descargas como PNG con la ventana transparente y lo usas en
              CapCut o en el editor que prefieras.
            </p>
          </div>
        </div>
      </section>

      <section className="py-14 lg:py-20 bg-white border-t border-slate-200">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 {...reveal("up")} className="text-2xl sm:text-3xl font-extrabold text-[#071A35] mb-6">
            Preguntas frecuentes
          </h2>
          {/* <details> deja todas las respuestas en el HTML (útil para buscadores) */}
          <div className="space-y-3">
            {faqs.map((f) => (
              <details key={f.question} className="group rounded-2xl border border-slate-200 bg-white">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-5 font-semibold text-[#071A35] hover:text-[#1479D4] [&::-webkit-details-marker]:hidden">
                  <h3 className="text-sm sm:text-base">{f.question}</h3>
                  <ChevronDown className="w-5 h-5 shrink-0 text-slate-400 transition-transform group-open:rotate-180" />
                </summary>
                <p className="px-5 pb-5 text-sm leading-relaxed text-slate-600">{f.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="py-14 bg-[#071A35] text-white">
        <div {...reveal("up")} className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-extrabold">¿Necesitas una web o un sistema que valga la pena mostrar?</h2>
          <p className="text-slate-300 mt-4">
            En Proscom desarrollamos software a medida, sitios web y aplicaciones para empresas y organizaciones en todo Chile.
          </p>
          <div className="mt-7 flex flex-col sm:flex-row gap-3 justify-center">
            <Button href="/contacto" variant="primary" size="lg" icon={<ArrowRight className="w-4 h-4" />}>
              Cotiza tu proyecto
            </Button>
            <Button href={siteConfig.contact.whatsappUrl} external variant="whatsapp" size="lg">
              Escríbenos por WhatsApp
            </Button>
          </div>
        </div>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(appSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(getFaqSchema(faqs)) }} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            getBreadcrumbSchema([
              { name: "Inicio", item: siteConfig.url },
              { name: "Creador de marcos", item: PAGE_URL },
            ])
          ),
        }}
      />
    </div>
  );
}
