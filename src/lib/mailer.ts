import nodemailer from "nodemailer";
import type { ContactFormData } from "@/lib/validation";

let transporter: ReturnType<typeof nodemailer.createTransport> | null = null;

function getTransporter() {
  if (transporter) return transporter;

  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT || 465);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASSWORD;

  if (!host || !user || !pass) {
    throw new Error(
      "Falta configuración SMTP (SMTP_HOST, SMTP_USER, SMTP_PASSWORD) en las variables de entorno."
    );
  }

  transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465, // true para 465 (SSL), false para 587 (STARTTLS)
    auth: { user, pass },
  });

  return transporter;
}

export async function sendContactEmail(data: ContactFormData) {
  const to = process.env.CONTACT_TO_EMAIL || "jcornejo@proscom.cl";
  const from = process.env.SMTP_USER;
  const rows: [string, string][] = [
    ["Nombre", data.name],
    ["Teléfono / WhatsApp", data.phone],
    ["Correo", data.email || "No indicado"],
    ["Negocio", data.company || "No indicado"],
    ["Qué necesita", data.need],
    ["Mensaje", data.message || "Sin mensaje"],
  ];

  const html = `
    <h2>Nuevo contacto desde Proscom.cl</h2>
    <table cellpadding="6" style="border-collapse:collapse;font-family:sans-serif;font-size:14px;">
      ${rows
        .map(
          ([label, value]) =>
            `<tr><td valign="top"><strong>${label}</strong></td><td>${escapeHtml(value).replace(/\n/g, "<br/>")}</td></tr>`
        )
        .join("\n      ")}
    </table>
  `;

  const text = `Nuevo contacto desde Proscom.cl

${rows.map(([label, value]) => `${label}: ${value}`).join("\n")}`;

  await getTransporter().sendMail({
    from: `"Formulario Proscom.cl" <${from}>`,
    to,
    ...(data.email ? { replyTo: data.email } : {}),
    subject: `Nuevo contacto: ${data.company || data.name} — ${data.need}`,
    text,
    html,
  });
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
