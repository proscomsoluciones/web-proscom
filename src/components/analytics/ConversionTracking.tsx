"use client";

import { useEffect } from "react";
import Script from "next/script";
import { trackEvent } from "@/lib/track";

const GA_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

/** Tipo de contacto según el enlace: WhatsApp, llamada o correo */
const contactType = (href: string) => {
  if (href.includes("wa.me/") || href.includes("api.whatsapp.com")) return "whatsapp_click";
  if (href.startsWith("tel:")) return "phone_click";
  if (href.startsWith("mailto:")) return "email_click";
  return null;
};

/**
 * Carga Google Analytics (cuando hay ID configurado) y registra cada clic
 * en WhatsApp, teléfono o correo de cualquier página, sin tocar cada botón.
 */
export const ConversionTracking: React.FC = () => {
  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      const link = (event.target as Element | null)?.closest?.("a[href]");
      if (!link) return;
      const href = link.getAttribute("href") ?? "";
      const name = contactType(href);
      if (!name) return;
      trackEvent(name, {
        page: window.location.pathname,
        label: (link.textContent ?? "").trim().slice(0, 80) || link.getAttribute("aria-label") || "",
      });
    };
    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, []);

  if (!GA_ID) return null;

  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
      <Script id="ga-init" strategy="afterInteractive">
        {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}window.gtag=gtag;gtag('js',new Date());gtag('config','${GA_ID}');`}
      </Script>
    </>
  );
};
