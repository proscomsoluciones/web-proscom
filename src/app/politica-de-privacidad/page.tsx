import React from "react";
import { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { Badge } from "@/components/ui/Badge";
import { AlertTriangle } from "lucide-react";

export const metadata: Metadata = {
  title: "Política de Privacidad | Proscom",
  description:
    "Política de Privacidad y tratamiento de datos personales de Proscom SpA (Borrador para revisión legal).",
  alternates: {
    canonical: `${siteConfig.url}/politica-de-privacidad`,
  },
  robots: {
    index: false,
    follow: true,
  },
};

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-[#F3F6FA] py-16 lg:py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Legal Draft Notice Banner */}
        <div className="mb-8 p-4 rounded-2xl bg-amber-50 border border-amber-200 flex items-start gap-3.5 text-amber-900">
          <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div className="text-xs sm:text-sm">
            <span className="font-bold">Documento en Borrador Técnico:</span> Este texto legal ha sido preparado como borrador modelo sujeto a revisión y aprobación jurídica definitiva antes de la entrada en vigencia formal de la plataforma web.
          </div>
        </div>

        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-sm space-y-8 text-slate-700 leading-relaxed text-sm sm:text-base">
          <div>
            <Badge variant="blue" className="mb-3">
              Legal & Privacidad
            </Badge>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#071A35]">
              Política de Privacidad y Tratamiento de Datos
            </h1>
            <p className="text-xs text-slate-400 mt-2">
              Última actualización: Octubre 2026 • PROSCOM SPA (Vitacura, Santiago, Chile)
            </p>
          </div>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-[#071A35]">1. Responsable del Tratamiento</h2>
            <p>
              PROSCOM SPA (en adelante, &quot;Proscom&quot; o &quot;la Empresa&quot;), con domicilio operativo en Av. Presidente Kennedy N° 5.600, Of. 507, Vitacura, Región Metropolitana, Chile, y sitio web oficial en <a href="https://www.proscom.cl" className="text-[#1479D4] underline">https://www.proscom.cl</a>, es responsable del tratamiento de los datos personales suministrados por los usuarios a través de sus formularios web y canales comerciales.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-[#071A35]">2. Datos que Recopilamos</h2>
            <p>A través de nuestro formulario de contacto y cotización recopilamos:</p>
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-600">
              <li>Nombre y apellidos del solicitante o representante.</li>
              <li>Nombre de la empresa u organización cliente.</li>
              <li>Dirección de correo electrónico comercial.</li>
              <li>Número telefónico o WhatsApp (opcional).</li>
              <li>Información general sobre el proyecto o requerimiento tecnológico.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-[#071A35]">3. Finalidad del Tratamiento</h2>
            <p>Los datos personales recolectados se utilizan exclusivamente para:</p>
            <ul className="list-disc pl-5 space-y-1 text-sm text-slate-600">
              <li>Responder consultas comerciales y enviar propuestas o cotizaciones solicitadas.</li>
              <li>Coordinar reuniones técnicas preliminares sobre proyectos de desarrollo.</li>
              <li>Prestar soporte técnico a clientes con servicios contratados.</li>
            </ul>
            <p>
              Proscom no comercializa, no alquila y no comparte bases de datos con terceros con fines de publicidad no solicitada.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-[#071A35]">4. Seguridad de la Información</h2>
            <p>
              Implementamos medidas técnicas y organizativas para resguardar la confidencialidad de la información, tales como navegación cifrada bajo protocolo HTTPS/TLS, validación estricta de entradas y almacenamiento protegido.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-[#071A35]">5. Derechos del Titular</h2>
            <p>
              De conformidad con la legislación chilena aplicable (Ley N° 19.628 sobre Protección de la Vida Privada), los usuarios pueden solicitar en cualquier momento la modificación, actualización o eliminación de sus datos personales de nuestros registros comerciales escribiendo a <a href="mailto:contacto@proscom.cl" className="text-[#1479D4] underline">contacto@proscom.cl</a>.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
