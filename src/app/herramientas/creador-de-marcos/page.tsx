import React from "react";
import type { Metadata } from "next";
import { ArrowRight, Clapperboard, Download, Layers, Wand2 } from "lucide-react";
import { siteConfig } from "@/config/site";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { reveal } from "@/components/motion/reveal";
import { PageHeroFx } from "@/components/motion/PageHeroFx";
import { FrameMaker } from "@/components/tools/FrameMaker";

export const metadata: Metadata = {
  title: "Creador de marcos para videos de TikTok y Reels (gratis)",
  description:
    "Crea gratis un marco vertical 9:16 o 4:5 con tu logo, colores y título para mostrar grabaciones horizontales de tu web o sistema en TikTok, Reels y Shorts. Sin registro y sin subir archivos.",
  alternates: { canonical: `${siteConfig.url}/herramientas/creador-de-marcos` },
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
          <Badge variant="cyan" className="mb-4">
            <Wand2 className="w-3.5 h-3.5 mr-1 inline" /> Herramienta gratuita
          </Badge>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
            Creador de marcos para TikTok y Reels
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
    </div>
  );
}
