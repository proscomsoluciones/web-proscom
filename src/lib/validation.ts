import { z } from "zod";

export const contactFormSchema = z.object({
  name: z
    .string()
    .min(2, { message: "El nombre debe tener al menos 2 caracteres." })
    .max(100, { message: "El nombre no puede exceder 100 caracteres." }),
  company: z
    .string()
    .min(2, { message: "Por favor indica tu empresa u organización." })
    .max(120, { message: "El nombre de la empresa es demasiado largo." }),
  email: z
    .string()
    .email({ message: "Ingresa un correo electrónico válido." })
    .max(150, { message: "El correo es demasiado largo." }),
  phone: z
    .string()
    .max(25, { message: "El teléfono no puede exceder 25 caracteres." })
    .optional()
    .or(z.literal("")),
  projectType: z.enum(
    [
      "Software a medida",
      "Página web",
      "Aplicación móvil",
      "Sistema de gestión",
      "Integración",
      "Consultoría",
      "Otro",
    ],
    { message: "Por favor selecciona un tipo de proyecto válido." }
  ),
  estimatedBudget: z
    .string()
    .max(60, { message: "Presupuesto no puede exceder 60 caracteres." })
    .optional()
    .or(z.literal("")),
  description: z
    .string()
    .min(10, { message: "Por favor describe brevemente tu requerimiento (mínimo 10 caracteres)." })
    .max(2000, { message: "La descripción no puede exceder 2000 caracteres." }),
  privacyConsent: z.boolean().refine((val) => val === true, {
    message: "Debes aceptar la política de privacidad para enviar el formulario.",
  }),
  // Honeypot field for anti-bot protection
  website_hp: z.string().max(0, { message: "Spam detectado" }).optional().or(z.literal("")),
  // Captcha matemático simple (anti-bot): a + b = captchaAnswer
  captchaA: z.coerce.number(),
  captchaB: z.coerce.number(),
  captchaAnswer: z.coerce.number({
    message: "Resuelve la operación para continuar.",
  }),
}).superRefine((data, ctx) => {
  if (data.captchaAnswer !== data.captchaA + data.captchaB) {
    ctx.addIssue({
      code: "custom",
      path: ["captchaAnswer"],
      message: "La respuesta no es correcta. Intenta nuevamente.",
    });
  }
});

export type ContactFormData = z.infer<typeof contactFormSchema>;
