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

  const html = `
    <h2>Nueva solicitud de cotización — Proscom.cl</h2>
    <table cellpadding="6" style="border-collapse:collapse;font-family:sans-serif;font-size:14px;">
      <tr><td><strong>Nombre</strong></td><td>${escapeHtml(data.name)}</td></tr>
      <tr><td><strong>Empresa</strong></td><td>${escapeHtml(data.company)}</td></tr>
      <tr><td><strong>Correo</strong></td><td>${escapeHtml(data.email)}</td></tr>
      <tr><td><strong>Teléfono</strong></td><td>${escapeHtml(data.phone || "No especificado")}</td></tr>
      <tr><td><strong>Tipo de proyecto</strong></td><td>${escapeHtml(data.projectType)}</td></tr>
      <tr><td><strong>Presupuesto estimado</strong></td><td>${escapeHtml(data.estimatedBudget || "No especificado")}</td></tr>
      <tr><td valign="top"><strong>Descripción</strong></td><td>${escapeHtml(data.description).replace(/\n/g, "<br/>")}</td></tr>
    </table>
  `;

  const text = `Nueva solicitud de cotización — Proscom.cl

Nombre: ${data.name}
Empresa: ${data.company}
Correo: ${data.email}
Teléfono: ${data.phone || "No especificado"}
Tipo de proyecto: ${data.projectType}
Presupuesto estimado: ${data.estimatedBudget || "No especificado"}

Descripción:
${data.description}`;

  await getTransporter().sendMail({
    from: `"Formulario Proscom.cl" <${from}>`,
    to,
    replyTo: data.email,
    subject: `Nueva cotización: ${data.company} — ${data.projectType}`,
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
