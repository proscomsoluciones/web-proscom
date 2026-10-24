import React from "react";
import { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { Badge } from "@/components/ui/Badge";
import { AlertTriangle } from "lucide-react";

export const metadata: Metadata = {
  title: "Términos y Condiciones | Proscom",
  description:
    "Términos y Condiciones de uso del sitio web y contratación de servicios de Proscom SpA (Borrador para revisión legal).",
  alternates: {
    canonical: `${siteConfig.url}/terminos-y-condiciones`,
  },
  robots: {
    index: false,
    follow: true,
  },
};

export default function TermsPage() {
  return (
    <div className="bg-[#F3F6FA] py-16 lg:py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Legal Draft Notice Banner */}
        <div className="mb-8 p-4 rounded-2xl bg-amber-50 border border-amber-200 flex items-start gap-3.5 text-amber-900">
          <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div className="text-xs sm:text-sm">
            <span className="font-bold">Documento en Borrador Técnico:</span> Este texto de Términos y Condiciones se encuentra preparado como borrador modelo sujeto a revisión y formalización contractual previa por parte de asesoría legal.
          </div>
        </div>

        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-sm space-y-8 text-slate-700 leading-relaxed text-sm sm:text-base">
          <div>
            <Badge variant="blue" className="mb-3">
              Condiciones de Uso
            </Badge>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#071A35]">
              Términos y Condiciones Generales
            </h1>
            <p className="text-xs text-slate-400 mt-2">
              Última actualización: Octubre 2026 • Proscom SpA
            </p>
          </div>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-[#071A35]">1. Objeto y Alcance</h2>
            <p>
              El presente documento establece las condiciones de acceso, navegación y uso del sitio web <a href="https://www.proscom.cl" className="text-[#1479D4] underline">https://www.proscom.cl</a>, operado por Proscom SpA, así como los principios generales aplicables a las solicitudes de cotización de servicios tecnológicos.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-[#071A35]">2. Servicios y Propuestas Comerciales</h2>
            <p>
              La información publicada en este sitio web tiene carácter informativo y de presentación de capacidades técnicas. Ninguna cotización generada a través de formularios o WhatsApp constituye un contrato definitivo hasta que no se firmen las respectivas órdenes de servicio, anexos de especificación técnica o contratos de desarrollo entre el cliente y Proscom SpA.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-[#071A35]">3. Propiedad Intelectual de la Marca</h2>
            <p>
              El nombre comercial Proscom, su logotipo original, identidad gráfica, textos, arquitectura y componentes de software propios publicados en este sitio web están protegidos por las leyes de propiedad intelectual e industrial de Chile. Queda prohibida su reproducción o uso no autorizado.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-[#071A35]">4. Casos de Estudio y Proyectos para Clientes</h2>
            <p>
              Las menciones a proyectos desarrollados para terceros (tales como LegalFirma, WOWPOS, WOW Ticket, entre otros) se exhiben con fines de muestra técnica de la experiencia profesional del equipo de Proscom en el diseño e implementación de sistemas a medida.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-[#071A35]">5. Legislación Aplicable y Jurisdicción</h2>
            <p>
              Para todos los efectos legales, estos términos se rigen por las leyes de la República de Chile, fijándose el domicilio en la Región de Valparaíso para la resolución de cualquier discrepancia.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
