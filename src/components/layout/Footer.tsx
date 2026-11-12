import React from "react";
import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/config/site";
import { CurrentYear } from "@/components/ui/CurrentYear";
import { MapPin, Phone, Mail, MessageCircle } from "lucide-react";

const LEGAL_LINKS = [
  { name: "Política de Privacidad", href: "/politica-de-privacidad" },
  { name: "Términos y Condiciones", href: "/terminos-y-condiciones" },
  { name: "Ley 21.719", href: "/ley-proteccion-datos-chile" },
  { name: "Aprende", href: "/aprende" },
];

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#071A35] text-white pt-12 pb-24 sm:pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 pb-10 border-b border-white/10">
          {/* Marca */}
          <div className="sm:col-span-2 lg:col-span-5 space-y-4">
            <Link href="/" className="inline-block" aria-label="Proscom - Ir a la página de inicio">
              <div className="relative h-10 w-44">
                <Image
                  src="/brand/logotipo-light.png"
                  alt="Proscom"
                  fill
                  sizes="176px"
                  className="object-contain object-left"
                />
              </div>
            </Link>
            <p className="text-sm text-slate-300 leading-relaxed max-w-sm">
              Ayudamos a negocios de Chile a vender más, cobrar fácil y ordenar su día a día.
            </p>
            <a
              href={siteConfig.contact.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg bg-[#25D366] hover:bg-[#20ba59] px-4 py-2.5 text-sm font-semibold text-white transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              Escríbenos por WhatsApp
            </a>
          </div>

          {/* Navegación */}
          <nav aria-label="Navegación del pie de página" className="lg:col-span-3">
            <h3 className="text-sm font-semibold text-white mb-4">Navegación</h3>
            <ul className="space-y-2.5 text-sm">
              {siteConfig.navigation
                .filter((item) => item.href !== "/")
                .map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className="text-slate-300 hover:text-white transition-colors">
                      {item.name}
                    </Link>
                  </li>
                ))}
            </ul>
          </nav>

          {/* Contacto */}
          <div className="lg:col-span-4">
            <h3 className="text-sm font-semibold text-white mb-4">Contacto</h3>
            <ul className="space-y-3 text-sm text-slate-300">
              <li>
                <a href={`tel:+${siteConfig.contact.phoneRaw}`} className="flex items-center gap-2.5 hover:text-white transition-colors">
                  <Phone className="w-4 h-4 text-[#19C6E6] shrink-0" />
                  {siteConfig.contact.phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${siteConfig.contact.email}`} className="flex items-center gap-2.5 hover:text-white transition-colors">
                  <Mail className="w-4 h-4 text-[#19C6E6] shrink-0" />
                  {siteConfig.contact.email}
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#19C6E6] shrink-0 mt-0.5" />
                <span>
                  {siteConfig.location.address}, {siteConfig.location.city}
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Barra inferior */}
        <div className="pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>
            © <CurrentYear /> {siteConfig.legalName}. Todos los derechos reservados.
          </p>
          <ul className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
            {LEGAL_LINKS.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="hover:text-slate-200 transition-colors">
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
};
