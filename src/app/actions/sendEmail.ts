"use server";

import nodemailer from 'nodemailer';

export async function sendEmail(formData: FormData) {
  const firstName = formData.get('firstName') as string;
  const lastName = formData.get('lastName') as string;
  const email = formData.get('email') as string;
  const phone = formData.get('phone') as string;
  const message = formData.get('message') as string;

  const transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: Number(process.env.MAIL_PORT),
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.MAIL_USERNAME,
      pass: process.env.MAIL_PASSWORD,
    },
  });

  try {
    await transporter.sendMail({
      from: `"${firstName} ${lastName}" <${process.env.MAIL_FROM_ADDRESS}>`,
      to: "jcornejo@proscom.cl",
      subject: `Nuevo mensaje de contacto de ${firstName} ${lastName}`,
      text: `Nombre: ${firstName} ${lastName}\nEmail: ${email}\nTeléfono: ${phone}\n\nMensaje:\n${message}`,
      html: `
        <div style="font-family: sans-serif; padding: 20px; color: #333;">
          <h2 style="color: #002B5B;">Nuevo Contacto Web Proscom</h2>
          <p><strong>Nombre:</strong> ${firstName} ${lastName}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Teléfono:</strong> ${phone}</p>
          <hr style="border: 1px solid #eee; margin: 20px 0;" />
          <p><strong>Mensaje:</strong></p>
          <p style="white-space: pre-wrap;">${message}</p>
        </div>
      `,
    });
    return { success: true };
  } catch (error) {
    console.error("Error sending email:", error);
    return { success: false, error: "Error al enviar el mensaje" };
  }
}
