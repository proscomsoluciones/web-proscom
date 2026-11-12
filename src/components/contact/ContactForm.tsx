"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactFormSchema, contactNeeds, ContactFormData, ContactFormInput } from "@/lib/validation";
import { siteConfig } from "@/config/site";
import { trackEvent } from "@/lib/track";
import { Button } from "@/components/ui/Button";
import { Send, CheckCircle2, AlertCircle, Loader2, Mail, User, Phone, Store, MessageCircle } from "lucide-react";

const inputClass = (hasError: boolean) =>
  `w-full px-4 py-3 rounded-xl border text-sm text-slate-800 placeholder-slate-400 focus:outline-none transition-colors ${
    hasError
      ? "border-red-400 focus:border-red-500 bg-red-50/20"
      : "border-slate-300 focus:border-[#1479D4] focus:ring-1 focus:ring-[#1479D4]"
  }`;

/** Momento actual; fuera del componente porque solo se usa en efectos y eventos */
const now = () => Date.now();

const labelClass = "block text-sm font-semibold text-[#071A35] mb-2";

/** Mensaje de WhatsApp con lo que la persona alcanzó a escribir, para no perder el contacto */
const whatsappFallback = (data: ContactFormData) => {
  const lines = [
    `Hola, soy ${data.name}${data.company ? ` de ${data.company}` : ""}.`,
    `Me interesa: ${data.need}.`,
    data.message ? data.message : "",
  ].filter(Boolean);
  return `${siteConfig.contact.whatsappUrl}?text=${encodeURIComponent(lines.join("\n"))}`;
};

export const ContactForm: React.FC = () => {
  const [serverState, setServerState] = useState<{
    status: "idle" | "loading" | "success" | "error";
    message: string;
    fallbackHref?: string;
  }>({ status: "idle", message: "" });

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormInput, unknown, ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      company: "",
      need: contactNeeds[0],
      message: "",
      privacyConsent: false,
      website_hp: "",
      startedAt: 0,
    },
  });

  // El tiempo de inicio se fija al montar en el navegador (no en el servidor)
  useEffect(() => {
    setValue("startedAt", now());
  }, [setValue]);

  const onSubmit = async (data: ContactFormData) => {
    setServerState({ status: "loading", message: "Enviando..." });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await response.json();

      if (response.ok && result.success) {
        trackEvent("form_submit", { need: data.need, page: window.location.pathname });
        setServerState({
          status: "success",
          message: result.message || "¡Gracias! Recibimos tu mensaje y te contactaremos a la brevedad.",
        });
        reset();
        setValue("startedAt", now());
      } else {
        setServerState({
          status: "error",
          message: result.message || "No pudimos enviar tu mensaje. Envíalo por WhatsApp con el botón de abajo.",
          fallbackHref: whatsappFallback(data),
        });
      }
    } catch {
      setServerState({
        status: "error",
        message: "Hubo un problema de conexión. Envíanos tu mensaje por WhatsApp con el botón de abajo.",
        fallbackHref: whatsappFallback(data),
      });
    }
  };

  return (
    <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200 shadow-xl">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-[#071A35]">Cuéntanos qué necesitas</h2>
        <p className="text-sm text-slate-500 mt-1">
          Toma menos de un minuto. Te llamamos o escribimos para conversar, sin compromiso.
        </p>
      </div>

      {serverState.status === "success" ? (
        <div className="p-8 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-4 animate-in fade-in duration-300">
          <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold text-emerald-900">¡Mensaje recibido!</h3>
          <p className="text-sm text-emerald-700 max-w-md mx-auto leading-relaxed">{serverState.message}</p>
          <div className="pt-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setServerState({ status: "idle", message: "" })}
            >
              Enviar otra consulta
            </Button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" noValidate>
          {serverState.status === "error" && (
            <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-sm text-red-700 animate-in fade-in space-y-3">
              <p className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                <span>{serverState.message}</span>
              </p>
              {serverState.fallbackHref && (
                <a
                  href={serverState.fallbackHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg bg-[#25D366] hover:bg-[#20ba59] px-4 py-2.5 text-sm font-semibold text-white transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  Enviar por WhatsApp
                </a>
              )}
            </div>
          )}

          {/* Campo trampa invisible (anti-robots) */}
          <div className="hidden" aria-hidden="true">
            <label htmlFor="website_hp">No llenar este campo</label>
            <input id="website_hp" type="text" tabIndex={-1} autoComplete="off" {...register("website_hp")} />
          </div>
          <input type="hidden" {...register("startedAt")} />

          {/* Qué necesita */}
          <div>
            <label htmlFor="need" className={labelClass}>
              ¿En qué te podemos ayudar? *
            </label>
            <select
              id="need"
              className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm text-slate-800 focus:outline-none focus:border-[#1479D4] focus:ring-1 focus:ring-[#1479D4] transition-colors bg-white cursor-pointer"
              {...register("need")}
            >
              {contactNeeds.map((need) => (
                <option key={need} value={need}>
                  {need}
                </option>
              ))}
            </select>
            {errors.need && <p className="text-xs text-red-600 mt-1">{errors.need.message}</p>}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* Nombre */}
            <div>
              <label htmlFor="name" className={labelClass}>
                Tu nombre *
              </label>
              <div className="relative">
                <input
                  id="name"
                  type="text"
                  autoComplete="name"
                  placeholder="Ej: Rodrigo Tapia"
                  className={inputClass(Boolean(errors.name))}
                  {...register("name")}
                />
                <User className="w-4 h-4 text-slate-400 absolute right-3.5 top-3.5 pointer-events-none" />
              </div>
              {errors.name && <p className="text-xs text-red-600 mt-1">{errors.name.message}</p>}
            </div>

            {/* Teléfono */}
            <div>
              <label htmlFor="phone" className={labelClass}>
                Teléfono o WhatsApp *
              </label>
              <div className="relative">
                <input
                  id="phone"
                  type="tel"
                  autoComplete="tel"
                  inputMode="tel"
                  placeholder="+56 9 1234 5678"
                  className={inputClass(Boolean(errors.phone))}
                  {...register("phone")}
                />
                <Phone className="w-4 h-4 text-slate-400 absolute right-3.5 top-3.5 pointer-events-none" />
              </div>
              {errors.phone && <p className="text-xs text-red-600 mt-1">{errors.phone.message}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* Correo */}
            <div>
              <label htmlFor="email" className={labelClass}>
                Correo <span className="text-slate-400 font-normal">(opcional)</span>
              </label>
              <div className="relative">
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  placeholder="tu@correo.cl"
                  className={inputClass(Boolean(errors.email))}
                  {...register("email")}
                />
                <Mail className="w-4 h-4 text-slate-400 absolute right-3.5 top-3.5 pointer-events-none" />
              </div>
              {errors.email && <p className="text-xs text-red-600 mt-1">{errors.email.message}</p>}
            </div>

            {/* Negocio */}
            <div>
              <label htmlFor="company" className={labelClass}>
                Nombre de tu negocio <span className="text-slate-400 font-normal">(opcional)</span>
              </label>
              <div className="relative">
                <input
                  id="company"
                  type="text"
                  autoComplete="organization"
                  placeholder="Ej: Ferretería Los Andes"
                  className={inputClass(Boolean(errors.company))}
                  {...register("company")}
                />
                <Store className="w-4 h-4 text-slate-400 absolute right-3.5 top-3.5 pointer-events-none" />
              </div>
              {errors.company && <p className="text-xs text-red-600 mt-1">{errors.company.message}</p>}
            </div>
          </div>

          {/* Mensaje */}
          <div>
            <label htmlFor="message" className={labelClass}>
              Cuéntanos un poco más <span className="text-slate-400 font-normal">(opcional)</span>
            </label>
            <textarea
              id="message"
              rows={3}
              placeholder="Ej: Tengo una botillería y quiero dejar de anotar las ventas en un cuaderno."
              className={inputClass(Boolean(errors.message))}
              {...register("message")}
            />
            {errors.message && <p className="text-xs text-red-600 mt-1">{errors.message.message}</p>}
          </div>

          {/* Consentimiento de privacidad */}
          <div>
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                className="mt-1 w-4 h-4 text-[#1479D4] rounded border-slate-300 focus:ring-[#1479D4]"
                {...register("privacyConsent")}
              />
              <span className="text-xs text-slate-600 leading-normal">
                Acepto la{" "}
                <a
                  href="/politica-de-privacidad"
                  target="_blank"
                  className="text-[#1479D4] underline font-semibold hover:text-[#1688F5]"
                >
                  política de privacidad
                </a>{" "}
                y que usen mis datos solo para responder esta consulta.
              </span>
            </label>
            {errors.privacyConsent && <p className="text-xs text-red-600 mt-1">{errors.privacyConsent.message}</p>}
          </div>

          <div className="pt-2">
            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="w-full text-center"
              disabled={isSubmitting}
              icon={isSubmitting ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
            >
              {isSubmitting ? "Enviando..." : "Quiero que me contacten"}
            </Button>
          </div>
        </form>
      )}
    </div>
  );
};
