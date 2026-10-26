import React from "react";
import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/config/site";
import { servicesData } from "@/data/services";
import { solutionsData } from "@/data/solutions";
import { CurrentYear } from "@/components/ui/CurrentYear";
import { MapPin, Phone, Mail, MessageCircle, ArrowUpRight } from "lucide-react";

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#071A35] text-white border-t border-white/10 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-12 border-b border-white/10">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <Link
              href="/"
              className="inline-block"
              aria-label="Proscom - Soluciones de control y gestión"
            >
              <div className="relative h-11 w-48">
                <Image
                  src="/brand/logotipo-light.png"
                  alt="Proscom - Soluciones de control y gestión"
                  fill
                  sizes="192px"
                  className="object-contain object-left"
                />
              </div>
            </Link>
            <p className="text-sm font-medium text-[#19C6E6]">
              {siteConfig.slogan}
            </p>
            <p className="text-sm text-slate-300 leading-relaxed max-w-sm">
              Empresa chilena especializada en desarrollo de software a medida, aplicaciones web, móviles y sistemas de gestión para optimizar procesos en empresas y organizaciones.
            </p>
            <div className="pt-2 text-xs text-slate-400 space-y-1">
              <p className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0" />
                <span>Experiencia técnica de más de 15 años de su fundador</span>
              </p>
              <p className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#19C6E6] shrink-0" />
                <span>Cobertura en Región de Valparaíso y todo Chile</span>
              </p>
            </div>
          </div>

          {/* Services Column */}
          <div>
            <h3 className="text-sm font-semibold tracking-wider uppercase text-white mb-4">
              Servicios
            </h3>
            <ul className="space-y-2.5 text-sm">
              {servicesData.map((service) => (
                <li key={service.slug}>
                  <Link
                    href={`/servicios/${service.slug}`}
                    className="text-slate-300 hover:text-white transition-colors duration-150 flex items-center justify-between group"
                  >
                    <span>{service.title}</span>
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/servicios"
                  className="text-xs font-semibold text-[#19C6E6] hover:underline pt-1 inline-flex items-center gap-1"
                >
                  Ver todos los servicios
                  <ArrowUpRight className="w-3 h-3" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Solutions & Projects Column */}
          <div>
            <h3 className="text-sm font-semibold tracking-wider uppercase text-white mb-4">
              Soluciones & Casos
            </h3>
            <ul className="space-y-2.5 text-sm">
              {solutionsData.map((solution) => (
                <li key={solution.slug}>
                  <Link
                    href={`/soluciones/${solution.slug}`}
                    className="text-slate-300 hover:text-white transition-colors duration-150"
                  >
                    {solution.name}
                  </Link>
                </li>
              ))}
              <li className="pt-2">
                <Link
                  href="/proyectos"
                  className="text-slate-300 hover:text-white transition-colors duration-150 font-medium text-white flex items-center gap-1"
                >
                  <span>Proyectos a Medida</span>
                  <ArrowUpRight className="w-3 h-3 text-[#19C6E6]" />
                </Link>
              </li>
              <li>
                <Link
                  href="/nosotros"
                  className="text-slate-300 hover:text-white transition-colors duration-150"
                >
                  Sobre Proscom
                </Link>
              </li>
              <li>
                <Link
                  href="/ley-proteccion-datos-chile"
                  className="text-slate-300 hover:text-white transition-colors duration-150"
                >
                  Ley 21.719 de Protección de Datos
                </Link>
              </li>
              <li>
                <Link
                  href="/herramientas/creador-de-marcos"
                  className="text-slate-300 hover:text-white transition-colors duration-150"
                >
                  Creador de marcos para videos
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Information Column */}
          <div>
            <h3 className="text-sm font-semibold tracking-wider uppercase text-white mb-4">
              Contacto Directo
            </h3>
            <ul className="space-y-3 text-sm text-slate-300">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#19C6E6] shrink-0 mt-0.5" />
                <span>{siteConfig.location.full}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <MessageCircle className="w-4 h-4 text-[#25D366] shrink-0" />
                <a
                  href={siteConfig.contact.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors font-medium text-white"
                >
                  {siteConfig.contact.phone}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#1479D4] shrink-0" />
                <span>{siteConfig.contact.phone}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#1479D4] shrink-0" />
                <a
                  href={`mailto:${siteConfig.contact.email}`}
                  className="hover:text-white transition-colors"
                >
                  {siteConfig.contact.email}
                </a>
              </li>
            </ul>
            <div className="mt-5">
              <Link
                href="/contacto"
                className="inline-block text-xs font-semibold px-3.5 py-2 rounded-lg bg-[#1373C9] hover:bg-[#1688F5] text-white transition-colors"
              >
                Formulario de Cotización
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Legal */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-400 text-center md:text-left">
          <p>
            © <CurrentYear /> PROSCOM SPA — Av. Presidente Kennedy N° 5.600, Of. 507, Vitacura, Región Metropolitana. Todos los derechos reservados.
          </p>
          <div className="flex items-center gap-6 shrink-0">
            <Link
              href="/politica-de-privacidad"
              className="hover:text-slate-200 transition-colors"
            >
              Política de Privacidad
            </Link>
            <Link
              href="/terminos-y-condiciones"
              className="hover:text-slate-200 transition-colors"
            >
              Términos y Condiciones
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
