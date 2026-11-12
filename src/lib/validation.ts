import { z } from "zod";

/** Opciones del formulario en palabras del cliente, no en términos técnicos */
export const contactNeeds = [
  "Vender por internet (página web o tienda online)",
  "Ordenar ventas, stock y caja",
  "Cobrar con tarjeta o link de pago",
  "Un sistema hecho a la medida de mi negocio",
  "Una app para mi equipo o mis clientes",
  "Un sistema listo (club, colegio, junta de vecinos…)",
  "Adaptarme a la Ley de Datos Personales",
  "Ayuda con algo que ya tengo",
  "Aún no lo sé, quiero que me orienten",
] as const;

/** Tiempo mínimo que una persona tarda en llenar el formulario (los robots lo envían al instante) */
export const MIN_FILL_MS = 3000;

export const contactFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, { message: "Escribe tu nombre." })
    .max(100, { message: "El nombre no puede exceder 100 caracteres." }),
  phone: z
    .string()
    .trim()
    .max(25, { message: "El teléfono no puede exceder 25 caracteres." })
    .refine((val) => val.replace(/\D/g, "").length >= 8, {
      message: "Escribe un teléfono o WhatsApp para poder contactarte.",
    }),
  email: z
    .string()
    .trim()
    .email({ message: "Revisa que el correo esté bien escrito." })
    .max(150, { message: "El correo es demasiado largo." })
    .optional()
    .or(z.literal("")),
  company: z
    .string()
    .trim()
    .max(120, { message: "El nombre del negocio es demasiado largo." })
    .optional()
    .or(z.literal("")),
  need: z.enum(contactNeeds, { message: "Elige una opción." }),
  message: z
    .string()
    .trim()
    .max(2000, { message: "El mensaje no puede exceder 2000 caracteres." })
    .optional()
    .or(z.literal("")),
  privacyConsent: z.boolean().refine((val) => val === true, {
    message: "Debes aceptar la política de privacidad para enviar el formulario.",
  }),
  // Campo trampa invisible (anti-robots)
  website_hp: z.string().max(0, { message: "Spam detectado" }).optional().or(z.literal("")),
  // Momento en que se abrió el formulario (anti-robots)
  startedAt: z.coerce.number(),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;
