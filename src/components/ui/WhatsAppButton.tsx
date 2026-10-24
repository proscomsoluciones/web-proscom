"use client";

import React, { useState } from "react";
import { siteConfig } from "@/config/site";
import { MessageCircle, X } from "lucide-react";

export const WhatsAppButton: React.FC = () => {
  const [showTooltip, setShowTooltip] = useState(false);

  const encodedMessage = encodeURIComponent(
    siteConfig.contact.whatsappDefaultMessage
  );
  const whatsappUrl = `${siteConfig.contact.whatsappUrl}?text=${encodedMessage}`;

  const handleClick = () => {
    // Analytics tracking (GA4 event dispatch if window.gtag is available)
    if (typeof window !== "undefined") {
      const win = window as unknown as { gtag?: (...args: unknown[]) => void };
      if (typeof win.gtag === "function") {
        win.gtag("event", "whatsapp_click", {
          event_category: "Conversion",
          event_label: "Floating WhatsApp Button",
        });
      }
    }
  };

  return (
    <aside
      aria-label="Atención directa por WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex items-end gap-3"
    >
      {/* Tooltip message */}
      {showTooltip && (
        <div
          role="status"
          className="bg-[#071A35] text-white p-3.5 rounded-2xl shadow-2xl border border-white/10 max-w-xs text-xs animate-in fade-in slide-in-from-bottom-2 duration-200"
        >
          <div className="flex items-start justify-between gap-2 mb-1">
            <span className="font-semibold text-[#19C6E6]">
              ¿Tienes dudas sobre tu proyecto?
            </span>
            <button
              type="button"
              onClick={() => setShowTooltip(false)}
              className="text-slate-400 hover:text-white p-0.5"
              aria-label="Cerrar mensaje"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
          <p className="text-slate-300 leading-normal mb-2">
            Escríbenos directamente por WhatsApp y evaluemos tu idea técnica.
          </p>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleClick}
            className="inline-flex items-center gap-1.5 font-semibold text-emerald-400 hover:text-emerald-300"
          >
            Iniciar conversación →
          </a>
        </div>
      )}

      {/* Floating Action Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleClick}
        onMouseEnter={() => setShowTooltip(true)}
        aria-label="Conversar por WhatsApp con Proscom (+56 9 7561 0245)"
        className="group relative flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] text-white shadow-xl shadow-[#25D366]/30 hover:shadow-2xl hover:shadow-[#25D366]/50 hover:scale-105 active:scale-95 transition-all duration-200 focus-visible:outline-4 focus-visible:outline-[#25D366]"
      >
        <span className="sr-only">Contactar por WhatsApp a Proscom</span>
        <MessageCircle className="w-7 h-7 fill-white stroke-none" />
        
        {/* Subtle pulsing indicator ring */}
        <span className="absolute -inset-1 rounded-full bg-[#25D366]/30 animate-ping -z-10 opacity-75" />
      </a>
    </aside>
  );
};
