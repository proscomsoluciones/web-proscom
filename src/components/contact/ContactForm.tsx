"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactFormSchema, ContactFormData } from "@/lib/validation";
import { Button } from "@/components/ui/Button";
import {
  Send,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Building2,
  Mail,
  User,
  Phone,
  FileText,
  DollarSign,
  Calculator,
} from "lucide-react";

function makeCaptcha() {
  return {
    a: Math.floor(Math.random() * 8) + 1,
    b: Math.floor(Math.random() * 8) + 1,
  };
}

export const ContactForm: React.FC = () => {
  const [serverState, setServerState] = useState<{
    status: "idle" | "loading" | "success" | "error";
    message: string;
  }>({
    status: "idle",
    message: "",
  });
  // Valores fijos en el primer render (servidor y cliente deben coincidir);
  // se aleatorizan recién al montar en el navegador, evitando errores de hidratación.
  const [captcha, setCaptcha] = useState({ a: 0, b: 0 });

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      company: "",
      email: "",
      phone: "",
      projectType: "Software a medida",
      estimatedBudget: "",
      description: "",
      privacyConsent: false,
      website_hp: "",
      captchaA: 0,
      captchaB: 0,
      captchaAnswer: undefined as unknown as number,
    },
  });

  const renewCaptcha = () => {
    const next = makeCaptcha();
    setCaptcha(next);
    setValue("captchaA", next.a);
    setValue("captchaB", next.b);
    setValue("captchaAnswer", undefined as unknown as number);
  };

  useEffect(() => {
    renewCaptcha();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmit = async (data: ContactFormData) => {
    setServerState({ status: "loading", message: "Enviando solicitud..." });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setServerState({
          status: "success",
          message:
            result.message ||
            "¡Solicitud enviada exitosamente! Nos pondremos en contacto contigo dentro de las próximas 24 horas hábiles.",
        });
        reset();
        renewCaptcha();
      } else {
        renewCaptcha();
        setServerState({
          status: "error",
          message:
            result.message ||
            "No pudimos procesar tu mensaje. Por favor intenta nuevamente o contáctanos por WhatsApp.",
        });
      }
    } catch {
      setServerState({
        status: "error",
        message:
          "Ocurrió un error de conexión al enviar el formulario. Puedes comunicarte directamente al WhatsApp +56 9 7561 0245.",
      });
    }
  };

  return (
    <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200 shadow-xl">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-[#071A35]">
          Formulario de Cotización y Contacto
        </h2>
        <p className="text-sm text-slate-500 mt-1">
          Cuéntanos sobre tu idea y evaluaremos la mejor solución técnica sin costo ni compromiso.
        </p>
      </div>

      {serverState.status === "success" ? (
        <div className="p-8 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-4 animate-in fade-in duration-300">
          <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold text-emerald-900">
            ¡Mensaje Recibido!
          </h3>
          <p className="text-sm text-emerald-700 max-w-md mx-auto leading-relaxed">
            {serverState.message}
          </p>
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
            <div className="p-4 rounded-xl bg-red-50 border border-red-200 flex items-start gap-3 text-sm text-red-700 animate-in fade-in">
              <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
              <span>{serverState.message}</span>
            </div>
          )}

          {/* Honeypot field for anti-bot protection */}
          <div className="hidden" aria-hidden="true">
            <label htmlFor="website_hp">No llenar este campo</label>
            <input
              id="website_hp"
              type="text"
              tabIndex={-1}
              autoComplete="off"
              {...register("website_hp")}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* Nombre */}
            <div>
              <label
                htmlFor="name"
                className="block text-xs font-bold text-[#071A35] uppercase tracking-wider mb-2"
              >
                Tu Nombre *
              </label>
              <div className="relative">
                <input
                  id="name"
                  type="text"
                  placeholder="Ej: Rodrigo Tapia"
                  className={`w-full px-4 py-3 rounded-xl border text-sm text-slate-800 placeholder-slate-400 focus:outline-none transition-colors ${
                    errors.name
                      ? "border-red-400 focus:border-red-500 bg-red-50/20"
                      : "border-slate-300 focus:border-[#1479D4] focus:ring-1 focus:ring-[#1479D4]"
                  }`}
                  {...register("name")}
                />
                <User className="w-4 h-4 text-slate-400 absolute right-3.5 top-3.5 pointer-events-none" />
              </div>
              {errors.name && (
                <p className="text-xs text-red-600 mt-1">{errors.name.message}</p>
              )}
            </div>

            {/* Empresa */}
            <div>
              <label
                htmlFor="company"
                className="block text-xs font-bold text-[#071A35] uppercase tracking-wider mb-2"
              >
                Empresa u Organización *
              </label>
              <div className="relative">
                <input
                  id="company"
                  type="text"
                  placeholder="Ej: Comercial Andina SpA"
                  className={`w-full px-4 py-3 rounded-xl border text-sm text-slate-800 placeholder-slate-400 focus:outline-none transition-colors ${
                    errors.company
                      ? "border-red-400 focus:border-red-500 bg-red-50/20"
                      : "border-slate-300 focus:border-[#1479D4] focus:ring-1 focus:ring-[#1479D4]"
                  }`}
                  {...register("company")}
                />
                <Building2 className="w-4 h-4 text-slate-400 absolute right-3.5 top-3.5 pointer-events-none" />
              </div>
              {errors.company && (
                <p className="text-xs text-red-600 mt-1">
                  {errors.company.message}
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-xs font-bold text-[#071A35] uppercase tracking-wider mb-2"
              >
                Correo Electrónico *
              </label>
              <div className="relative">
                <input
                  id="email"
                  type="email"
                  placeholder="contacto@tuempresa.cl"
                  className={`w-full px-4 py-3 rounded-xl border text-sm text-slate-800 placeholder-slate-400 focus:outline-none transition-colors ${
                    errors.email
                      ? "border-red-400 focus:border-red-500 bg-red-50/20"
                      : "border-slate-300 focus:border-[#1479D4] focus:ring-1 focus:ring-[#1479D4]"
                  }`}
                  {...register("email")}
                />
                <Mail className="w-4 h-4 text-slate-400 absolute right-3.5 top-3.5 pointer-events-none" />
              </div>
              {errors.email && (
                <p className="text-xs text-red-600 mt-1">{errors.email.message}</p>
              )}
            </div>

            {/* Teléfono */}
            <div>
              <label
                htmlFor="phone"
                className="block text-xs font-bold text-[#071A35] uppercase tracking-wider mb-2"
              >
                Teléfono o WhatsApp <span className="text-slate-400 font-normal">(Opcional)</span>
              </label>
              <div className="relative">
                <input
                  id="phone"
                  type="tel"
                  placeholder="+56 9 1234 5678"
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#1479D4] focus:ring-1 focus:ring-[#1479D4] transition-colors"
                  {...register("phone")}
                />
                <Phone className="w-4 h-4 text-slate-400 absolute right-3.5 top-3.5 pointer-events-none" />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* Tipo de Proyecto */}
            <div>
              <label
                htmlFor="projectType"
                className="block text-xs font-bold text-[#071A35] uppercase tracking-wider mb-2"
              >
                Tipo de Proyecto *
              </label>
              <select
                id="projectType"
                className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm text-slate-800 focus:outline-none focus:border-[#1479D4] focus:ring-1 focus:ring-[#1479D4] transition-colors bg-white cursor-pointer"
                {...register("projectType")}
              >
                <option value="Software a medida">Software a medida</option>
                <option value="Página web">Página web corporativa</option>
                <option value="Aplicación móvil">Aplicación móvil (iOS/Android)</option>
                <option value="Sistema de gestión">Sistema de gestión (ERP / POS)</option>
                <option value="Integración">Integración de APIs y pasarelas</option>
                <option value="Consultoría">Consultoría y asesoría técnica</option>
                <option value="Otro">Otro requerimiento</option>
              </select>
            </div>

            {/* Presupuesto Estimado */}
            <div>
              <label
                htmlFor="estimatedBudget"
                className="block text-xs font-bold text-[#071A35] uppercase tracking-wider mb-2"
              >
                Presupuesto Estimado <span className="text-slate-400 font-normal">(Opcional)</span>
              </label>
              <div className="relative">
                <input
                  id="estimatedBudget"
                  type="text"
                  placeholder="Ej: Menos de $1.5M / Por definir"
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#1479D4] focus:ring-1 focus:ring-[#1479D4] transition-colors"
                  {...register("estimatedBudget")}
                />
                <DollarSign className="w-4 h-4 text-slate-400 absolute right-3.5 top-3.5 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Descripción del requerimiento */}
          <div>
            <label
              htmlFor="description"
              className="block text-xs font-bold text-[#071A35] uppercase tracking-wider mb-2"
            >
              Descripción de lo que necesitas *
            </label>
            <div className="relative">
              <textarea
                id="description"
                rows={4}
                placeholder="Cuéntanos sobre tu negocio, qué procesos deseas resolver o qué funciones principales te gustaría que tenga la solución..."
                className={`w-full px-4 py-3 rounded-xl border text-sm text-slate-800 placeholder-slate-400 focus:outline-none transition-colors ${
                  errors.description
                    ? "border-red-400 focus:border-red-500 bg-red-50/20"
                    : "border-slate-300 focus:border-[#1479D4] focus:ring-1 focus:ring-[#1479D4]"
                }`}
                {...register("description")}
              />
              <FileText className="w-4 h-4 text-slate-400 absolute right-3.5 top-3.5 pointer-events-none" />
            </div>
            {errors.description && (
              <p className="text-xs text-red-600 mt-1">
                {errors.description.message}
              </p>
            )}
          </div>

          {/* Captcha matemático (anti-bot) */}
          <div>
            <input type="hidden" {...register("captchaA")} />
            <input type="hidden" {...register("captchaB")} />
            <label
              htmlFor="captchaAnswer"
              className="block text-xs font-bold text-[#071A35] uppercase tracking-wider mb-2"
            >
              Verificación: ¿Cuánto es {captcha.a} + {captcha.b}? *
            </label>
            <div className="relative max-w-[200px]">
              <input
                id="captchaAnswer"
                type="number"
                inputMode="numeric"
                placeholder="Resultado"
                className={`w-full px-4 py-3 rounded-xl border text-sm text-slate-800 placeholder-slate-400 focus:outline-none transition-colors ${
                  errors.captchaAnswer
                    ? "border-red-400 focus:border-red-500 bg-red-50/20"
                    : "border-slate-300 focus:border-[#1479D4] focus:ring-1 focus:ring-[#1479D4]"
                }`}
                {...register("captchaAnswer")}
              />
              <Calculator className="w-4 h-4 text-slate-400 absolute right-3.5 top-3.5 pointer-events-none" />
            </div>
            {errors.captchaAnswer && (
              <p className="text-xs text-red-600 mt-1">
                {errors.captchaAnswer.message}
              </p>
            )}
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
                He leído y acepto la{" "}
                <a
                  href="/politica-de-privacidad"
                  target="_blank"
                  className="text-[#1479D4] underline font-semibold hover:text-[#1688F5]"
                >
                  política de privacidad
                </a>{" "}
                y autorizo el tratamiento de mis datos exclusivamente para responder a esta solicitud comercial.
              </span>
            </label>
            {errors.privacyConsent && (
              <p className="text-xs text-red-600 mt-1">
                {errors.privacyConsent.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="w-full text-center"
              disabled={isSubmitting}
              icon={
                isSubmitting ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <Send className="w-5 h-5" />
                )
              }
            >
              {isSubmitting ? "Enviando cotización..." : "Enviar requerimiento para cotización"}
            </Button>
          </div>
        </form>
      )}
    </div>
  );
};
