import React from "react";
import { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { getBreadcrumbSchema, getFaqSchema } from "@/lib/schema";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import {
  CalendarClock,
  ShieldAlert,
  FileLock2,
  UserCheck,
  ClipboardCheck,
  DatabaseZap,
  ArrowRight,
  MapPin,
  Scale,
  CheckCircle2,
} from "lucide-react";

import { reveal } from "@/components/motion/reveal";
import { PageHeroFx } from "@/components/motion/PageHeroFx";
import { SplitWords } from "@/components/motion/SplitWords";
import { DataShieldVisual } from "@/components/motion/DataShieldVisual";

const PAGE_URL = `${siteConfig.url}/ley-proteccion-datos-chile`;

export const metadata: Metadata = {
  title:
    "Ley 21.719 de Protección de Datos en Chile: prepara tus sistemas antes de diciembre 2026 | Proscom",
  description:
    "La Ley 21.719 entra en vigencia el 1 de diciembre de 2026. Te explicamos qué cambia para tu empresa y cómo adaptamos tus sistemas y software en Valparaíso, Vitacura y todo Chile.",
  alternates: {
    canonical: PAGE_URL,
  },
};

const changes = [
  {
    icon: UserCheck,
    title: "Derechos ARCO+ de tus clientes y usuarios",
    desc: "Las personas podrán exigir acceder, rectificar, cancelar, oponerse y además pedir la portabilidad de sus datos. Tus sistemas deben estar preparados para recibir y resolver esas solicitudes dentro de plazo.",
  },
  {
    icon: FileLock2,
    title: "Consentimiento informado y trazable",
    desc: "Recolectar datos personales (de clientes, pacientes, postulantes, usuarios) exigirá un consentimiento claro, específico y registrado, no solo una casilla genérica al final de un formulario.",
  },
  {
    icon: ShieldAlert,
    title: "Notificación de brechas de seguridad",
    desc: "Si un sistema sufre una filtración de datos personales, existirá la obligación de notificar a la nueva autoridad y, en ciertos casos, a los propios afectados.",
  },
  {
    icon: DatabaseZap,
    title: "Medidas de seguridad técnicas exigibles",
    desc: "Cifrado, control de accesos, respaldo y registro de actividad dejan de ser 'buenas prácticas' opcionales y pasan a ser parte de lo que la ley espera que una empresa pueda demostrar.",
  },
];

const steps = [
  {
    step: "01",
    title: "Diagnóstico técnico de tus sistemas",
    desc: "Revisamos qué datos personales recolectas, dónde se almacenan (CRM, ERP, formularios web, planillas) y qué tan expuestos o desordenados están hoy.",
  },
  {
    step: "02",
    title: "Adecuación de software y formularios",
    desc: "Implementamos consentimiento explícito, políticas de retención, cifrado y controles de acceso directamente en los sistemas que ya usas o en los que desarrollamos a medida.",
  },
  {
    step: "03",
    title: "Flujos para derechos ARCO+ y brechas",
    desc: "Construimos el mecanismo técnico para que tu empresa pueda responder solicitudes de titulares y reaccionar ante incidentes dentro de los plazos que exige la ley.",
  },
  {
    step: "04",
    title: "Acompañamiento hasta diciembre de 2026",
    desc: "Te ayudamos a priorizar qué sistemas adecuar primero según riesgo, para llegar con margen a la fecha de entrada en vigencia.",
  },
];

const faqs = [
  {
    question: "¿Cuándo entra en vigencia la Ley 21.719 en Chile?",
    answer:
      "La Ley 21.719 de Protección de Datos Personales comienza a regir el 1 de diciembre de 2026, tras un período de vacancia legal desde su publicación.",
  },
  {
    question: "¿A qué empresas afecta la nueva ley de protección de datos?",
    answer:
      "En general, afecta a toda empresa, organización o profesional que recolecte, almacene o trate datos personales de clientes, usuarios, pacientes o trabajadores en Chile, sin importar el tamaño del negocio.",
  },
  {
    question: "¿Proscom entrega asesoría legal sobre la Ley 21.719?",
    answer:
      "No. Proscom es una empresa de desarrollo de software: apoyamos la adecuación técnica de tus sistemas (consentimiento, seguridad, derechos ARCO+). Para el análisis legal formal de tu caso recomendamos complementar con un abogado especializado.",
  },
];

export default function DataProtectionLawPage() {
  return (
    <div className="bg-white">
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            getBreadcrumbSchema([
              { name: "Inicio", item: siteConfig.url },
              { name: "Ley de Protección de Datos Chile", item: PAGE_URL },
            ])
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(getFaqSchema(faqs)),
        }}
      />

      {/* Hero */}
      <section className="bg-[#071A35] text-white py-16 lg:py-20 border-b border-white/10 relative overflow-hidden">
        <PageHeroFx />
        <div
          aria-hidden="true"
          className="absolute -top-20 left-1/4 w-96 h-96 bg-[#1479D4]/20 rounded-full blur-[140px] pointer-events-none animate-aurora"
        />

        {/* Sin animación de aparición: este bloque contiene el texto LCP
            (más grande contenido visible) y retrasarlo con fade-in perjudica
            el performance de carga. */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7">
              <Badge variant="cyan" className="mb-4">
                Cumplimiento Normativo · Entra en vigencia el 01-12-2026
              </Badge>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
                <SplitWords
                  text="Ley 21.719: prepara tus sistemas para la nueva Ley de Protección de Datos en Chile"
                  delay={200}
                />
              </h1>
              <p className="text-base sm:text-lg text-slate-300 mt-5 leading-relaxed max-w-2xl">
                Desde el <strong className="text-white">1 de diciembre de 2026</strong> toda empresa
                que recolecte datos de clientes, pacientes o usuarios deberá cumplir nuevas
                exigencias de consentimiento, seguridad y derechos de las personas. En Proscom
                adecuamos el software que las hace realidad, con foco también en empresas de la{" "}
                <strong className="text-white">Región de Valparaíso</strong>.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <Button
                  href="/contacto"
                  variant="primary"
                  size="lg"
                  icon={<ArrowRight className="w-5 h-5" />}
                >
                  Diagnóstico técnico de cumplimiento
                </Button>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div
                data-tilt
                className="relative rounded-3xl overflow-hidden border border-white/10 shadow-xl aspect-[4/3]"
              >
                <DataShieldVisual className="rounded-3xl" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contexto / qué es la ley */}
      <section className="py-20 bg-white border-b border-slate-200">
        <div {...reveal("up")} className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#1479D4] uppercase tracking-wider mb-4">
            <Scale className="w-4 h-4" />
            <span>¿Qué es la Ley 21.719?</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#071A35] mb-5">
            La primera gran actualización de la protección de datos personales en Chile
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed mb-4">
            La Ley 21.719 moderniza por completo la normativa chilena de datos personales y crea
            una nueva autoridad fiscalizadora, la Agencia de Protección de Datos Personales.
            Introduce principios y obligaciones inspirados en estándares internacionales (como el
            RGPD europeo), adaptados a la realidad chilena: consentimiento informado, principio de
            minimización de datos, seguridad desde el diseño, y derechos reforzados para las
            personas titulares de la información.
          </p>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            El desafío para las empresas no es solo legal: es <strong>técnico</strong>. Cumplir
            exige que los sistemas, formularios web, bases de datos y procesos internos estén
            efectivamente construidos para respetar esos derechos y esa seguridad, no solo
            declararlo en un documento.
          </p>
        </div>
      </section>

      {/* Qué cambia */}
      <section className="py-20 bg-[#F3F6FA] border-b border-slate-200">
        <div {...reveal("up")} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <Badge variant="blue">Qué cambia para tu empresa</Badge>
            <h2 className="text-3xl font-extrabold text-[#071A35]">
              Cuatro frentes que tus sistemas deben cubrir antes de diciembre de 2026
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {changes.map((item, idx) => (
              <div
                key={item.title}
                {...reveal("up", (idx % 2) * 120)}
                data-tilt
                className="p-8 rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="w-11 h-11 rounded-xl bg-[#1479D4]/10 flex items-center justify-center mb-4">
                  <item.icon className="w-5 h-5 text-[#1479D4]" />
                </div>
                <h3 className="text-lg font-bold text-[#071A35] mb-2">{item.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cómo ayuda Proscom - metodología */}
      <section className="py-20 bg-[#071A35] text-white">
        <div {...reveal("up")} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <Badge variant="cyan">Cómo te acompañamos</Badge>
            <h2 className="text-3xl font-extrabold text-white">
              De tus sistemas actuales a sistemas listos para diciembre de 2026
            </h2>
            <p className="text-sm sm:text-base text-slate-300">
              Nuestro foco es técnico: convertir las exigencias de la ley en funcionalidades
              reales dentro de tu software.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((stage, idx) => (
              <div
                key={stage.step}
                {...reveal("up", (idx % 4) * 100)}
                data-tilt
                data-spotlight
                className="relative p-7 rounded-2xl bg-[#0A1E3B] border border-white/10 flex flex-col justify-between"
              >
                <div>
                  <div className="text-xs font-bold text-[#19C6E6] mb-2 uppercase tracking-wider">
                    Paso {stage.step}
                  </div>
                  <h3 className="text-base font-bold text-white mb-2">{stage.title}</h3>
                  <p className="text-sm text-slate-300 leading-relaxed">{stage.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Foco regional Valparaíso */}
      <section className="py-20 bg-white border-b border-slate-200">
        <div {...reveal("up")} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-5">
              <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#1479D4] uppercase tracking-wider">
                <MapPin className="w-4 h-4" />
                <span>Presencia en la Región de Valparaíso</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#071A35]">
                Apoyo técnico cercano para empresas de Valparaíso, Viña del Mar y la Quinta Región
              </h2>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                Muchas pymes, clínicas, inmobiliarias y organizaciones de la Región de Valparaíso
                manejan datos de clientes en planillas, formularios web o sistemas antiguos sin
                controles de seguridad. Les ayudamos a identificar qué deben corregir primero y a
                implementarlo directamente en su software, coordinando el trabajo de forma remota
                y con visitas cuando el proyecto lo requiere.
              </p>
              <ul className="space-y-2 pt-2">
                {[
                  "Revisión de formularios web y bases de datos existentes",
                  "Priorización según riesgo real del negocio, no genérico",
                  "Implementación directa en tus sistemas, sin intermediarios",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-slate-600">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="lg:col-span-5">
              <div className="p-8 rounded-2xl bg-[#F3F6FA] border border-slate-200">
                <div className="flex items-center gap-2 text-sm font-bold text-[#071A35] mb-3">
                  <CalendarClock className="w-5 h-5 text-[#1479D4]" />
                  <span>Plazo clave</span>
                </div>
                <p className="text-3xl font-extrabold text-[#071A35] mb-1">
                  1 de diciembre, 2026
                </p>
                <p className="text-xs text-slate-500 mb-5">
                  Fecha de entrada en vigencia de la Ley 21.719.
                </p>
                <div className="flex items-center gap-2 text-sm font-bold text-[#071A35] mb-3">
                  <ClipboardCheck className="w-5 h-5 text-emerald-500" />
                  <span>Recomendación</span>
                </div>
                <p className="text-xs text-slate-500">
                  Partir con el diagnóstico técnico con tiempo, antes de que la demanda de
                  adecuaciones se concentre cerca de la fecha límite.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="py-10 bg-[#F3F6FA] border-b border-slate-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs text-slate-600 leading-relaxed">
            <strong>Aviso importante:</strong> este contenido tiene fines informativos y
            orientación técnica general sobre la Ley 21.719 de Protección de Datos Personales de
            Chile. No constituye asesoría legal. Proscom es una empresa de desarrollo de software;
            para el análisis jurídico específico de tu empresa recomendamos complementar este
            trabajo con un abogado o estudio especializado en protección de datos.
          </p>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-16 bg-white">
        <div {...reveal("up")} className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[#071A35] mb-3">
            Conversemos sobre el estado actual de tus sistemas
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mb-8">
            Te damos una mirada técnica honesta de qué tan preparados están tus sistemas para
            diciembre de 2026, sin costo ni compromiso.
          </p>
          <Button
            href="/contacto"
            variant="primary"
            size="lg"
            icon={<ArrowRight className="w-5 h-5" />}
          >
            Solicitar diagnóstico técnico
          </Button>
        </div>
      </section>
    </div>
  );
}
