"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/config/site";
import { Button } from "@/components/ui/Button";
import { Menu, X, ArrowRight, MessageSquare } from "lucide-react";

export const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent background scrolling when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [mobileMenuOpen]);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#071A35]/95 backdrop-blur-md shadow-lg shadow-black/20 border-b border-white/10 py-3"
          : "bg-[#071A35] border-b border-white/10 py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-3 group focus-visible:outline-2 focus-visible:outline-white rounded-md"
            aria-label="Proscom - Ir a página de inicio"
          >
            <div className="relative h-10 w-36 sm:h-11 sm:w-44 transition-transform group-hover:scale-[1.02]">
              <Image
                src="/brand/logotipo-light.png"
                alt="Proscom - Soluciones de control y gestión"
                fill
                preload
                fetchPriority="high"
                loading="eager"
                sizes="(max-width: 640px) 150px, 180px"
                className="object-contain object-left"
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav
            aria-label="Navegación principal"
            className="hidden lg:flex items-center gap-0.5 xl:gap-2"
          >
            {siteConfig.navigation.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`relative px-3 xl:px-3.5 py-2 text-sm whitespace-nowrap font-medium rounded-lg transition-colors duration-200 ${
                    active
                      ? "text-white font-semibold"
                      : "text-slate-300 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {item.name}
                  {active && (
                    <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-[#19C6E6] rounded-full shadow-[0_0_8px_#19C6E6]" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Action CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <Button
              href="/contacto"
              variant="primary"
              size="sm"
              icon={<MessageSquare className="w-4 h-4" />}
              className="whitespace-nowrap"
            >
              Cotiza tu proyecto
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-300 hover:text-white hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-white"
              aria-controls="mobile-menu"
              aria-expanded={mobileMenuOpen}
              aria-label={mobileMenuOpen ? "Cerrar menú principal" : "Abrir menú principal"}
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" aria-hidden="true" />
              ) : (
                <Menu className="w-6 h-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div
          id="mobile-menu"
          className="lg:hidden fixed inset-x-0 top-[61px] bottom-0 bg-[#071A35]/98 backdrop-blur-xl border-t border-white/10 px-6 py-6 flex flex-col justify-between overflow-y-auto animate-in fade-in duration-200"
        >
          <nav aria-label="Menú móvil" className="flex flex-col gap-2">
            {siteConfig.navigation.map((item) => {
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center justify-between px-4 py-3.5 text-base font-medium rounded-xl transition-colors ${
                    active
                      ? "bg-white/10 text-white font-semibold border-l-4 border-[#19C6E6]"
                      : "text-slate-200 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  <span>{item.name}</span>
                  <ArrowRight className="w-4 h-4 text-slate-400" />
                </Link>
              );
            })}
          </nav>

          <div className="pt-6 border-t border-white/10 flex flex-col gap-3">
            <Button
              href="/contacto"
              variant="primary"
              size="lg"
              className="w-full text-center"
              icon={<MessageSquare className="w-5 h-5" />}
            >
              Cotiza tu proyecto
            </Button>
            <Button
              href={siteConfig.contact.whatsappUrl}
              external
              variant="whatsapp"
              size="md"
              className="w-full text-center"
            >
              Contactar por WhatsApp
            </Button>
            <p className="text-center text-xs text-slate-400 mt-2">
              {siteConfig.location.full} • {siteConfig.contact.phone}
            </p>
          </div>
        </div>
      )}
    </header>
  );
};
