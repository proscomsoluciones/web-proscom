import React from "react";
import { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { Badge } from "@/components/ui/Badge";
import { ContactForm } from "@/components/contact/ContactForm";
import {
  MessageCircle,
  Mail,
  MapPin,
  Clock,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";

import { reveal } from "@/components/motion/reveal";
import { PageHeroFx } from "@/components/motion/PageHeroFx";
import { SplitWords } from "@/components/motion/SplitWords";
export const metadata: Metadata = {
  title: "Contacto y Cotización de Proyectos | Proscom",
  description:
    "Contáctanos para evaluar tu proyecto de desarrollo de software, páginas web o sistemas de gestión en Chile. WhatsApp comercial: +56 9 7561 0245.",
  alternates: {
    canonical: `${siteConfig.url}/contacto`,
  },
};

export default function ContactPage() {
  const whatsappUrl = `${siteConfig.contact.whatsappUrl}?text=${encodeURIComponent(
    siteConfig.contact.whatsappDefaultMessage
  )}`;

  return (
    <div className="bg-white">
      {/* Header Hero */}
      <section className="bg-[#071A35] text-white py-16 lg:py-20 border-b border-white/10 relative overflow-hidden">
        <PageHeroFx />
        <div
          aria-hidden="true"
          className="absolute -top-20 right-1/4 w-96 h-96 bg-[#1479D4]/20 rounded-full blur-[140px] pointer-events-none animate-aurora"
        />

        <div {...reveal("blur")} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center max-w-3xl">
          <Badge variant="cyan" className="mb-4">
            Atención Comercial
          </Badge>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
            <SplitWords text="Conversemos sobre tu proyecto tecnológico" delay={200} />
          </h1>
          <p className="text-base sm:text-lg text-slate-300 mt-4 leading-relaxed">
            Estamos disponibles para responder tus consultas, evaluar requerimientos técnicos y preparar una propuesta adaptada a tu empresa.
          </p>
        </div>
      </section>

      {/* Main Content Grid: Direct Channels (Col 5) vs Form (Col 7) */}
      <section className="py-20 bg-[#F3F6FA]">
        <div {...reveal("up")} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Direct Contact Channels Column */}
            <div {...reveal("left")} className="lg:col-span-5 space-y-8">
              <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm space-y-6">
                <div>
                  <h2 className="text-xl font-bold text-[#071A35]">
                    Canales Directos de Atención
                  </h2>
                  <p className="text-xs text-slate-500 mt-1">
                    Elige el medio más cómodo para comunicarte con nosotros
                  </p>
                </div>

                {/* WhatsApp Direct Card */}
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-5 rounded-2xl bg-emerald-50/70 border border-emerald-200/80 hover:bg-emerald-50 hover:border-emerald-300 transition-all duration-200 flex items-start gap-4 group block"
                >
                  <div className="w-12 h-12 rounded-xl bg-[#25D366] text-white flex items-center justify-center shrink-0 shadow-md shadow-[#25D366]/20">
                    <MessageCircle className="w-6 h-6 fill-white stroke-none" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-bold text-emerald-950 group-hover:text-emerald-700 transition-colors">
                        WhatsApp Comercial
                      </h3>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#25D366] text-white">
                        Rápido
                      </span>
                    </div>
                    <p className="text-sm font-bold text-slate-800 mt-0.5">
                      {siteConfig.contact.phone}
                    </p>
                    <p className="text-xs text-slate-600 mt-1">
                      Ideal para consultas ágiles y coordinar reuniones.
                    </p>
                  </div>
                </a>

                {/* Email Card */}
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="p-5 rounded-2xl bg-slate-50 border border-slate-200 hover:bg-slate-100/70 transition-all duration-200 flex items-start gap-4 group block"
                >
                  <div className="w-12 h-12 rounded-xl bg-[#1479D4] text-white flex items-center justify-center shrink-0 shadow-md shadow-[#1479D4]/20">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-[#071A35] group-hover:text-[#1479D4] transition-colors">
                      Correo Electrónico
                    </h3>
                    <p className="text-sm font-bold text-slate-800 mt-0.5">
                      {siteConfig.contact.email}
                    </p>
                    <p className="text-xs text-slate-600 mt-1">
                      Envío de bases técnicas, requerimientos o licitaciones.
                    </p>
                  </div>
                </a>

                {/* Location & Coverage */}
                <div className="pt-4 border-t border-slate-100 space-y-4">
                  <div className="flex items-start gap-3 text-xs text-slate-700">
                    <MapPin className="w-4 h-4 text-[#1479D4] shrink-0 mt-0.5" />
                    <div>
                      <p className="font-bold text-[#071A35]">Ubicación Base:</p>
                      <p>{siteConfig.location.full}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 text-xs text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-bold text-[#071A35]">Cobertura Comercial:</p>
                      <p>{siteConfig.location.coverage}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 text-xs text-slate-700">
                    <Clock className="w-4 h-4 text-[#1479D4] shrink-0 mt-0.5" />
                    <div>
                      <p className="font-bold text-[#071A35]">Horario de Atención:</p>
                      <p>Lunes a Viernes: 09:00 - 18:30 hrs</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Security & Confidentiality Box */}
              <div className="p-6 rounded-2xl bg-white border border-slate-200 text-xs text-slate-600 space-y-2">
                <div className="flex items-center gap-2 font-bold text-[#071A35]">
                  <ShieldCheck className="w-4 h-4 text-emerald-500" />
                  <span>Confidencialidad Garantizada</span>
                </div>
                <p className="leading-relaxed">
                  Toda la información entregada sobre tu empresa, procesos o requerimientos es tratada con estricta reserva y nunca será compartida con terceros.
                </p>
              </div>
            </div>

            {/* Functional Form Column */}
            <div {...reveal("right", 120)} className="lg:col-span-7">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
