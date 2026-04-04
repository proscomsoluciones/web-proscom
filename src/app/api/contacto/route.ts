import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { nombre, email, mensaje, "g-recaptcha-response": token } = body;

    // 1. Validar campos
    if (!nombre || !email || !mensaje || !token) {
      return NextResponse.json(
        { error: "Faltan campos obligatorios" },
        { status: 400 }
      );
    }

    // 2. Verificar reCAPTCHA
    const recaptchaSecret = process.env.RECAPTCHA_SECRET;
    const verifyUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${recaptchaSecret}&response=${token}`;

    const recaptchaRes = await fetch(verifyUrl, { method: "POST" });
    const recaptchaData = await recaptchaRes.json();

    if (!recaptchaData.success) {
      return NextResponse.json(
        { error: "Falló la verificación de reCAPTCHA" },
        { status: 400 }
      );
    }

    // 3. Configurar Nodemailer con las credenciales proporcionadas
    const transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST || "smtp.gmail.com",
      port: Number(process.env.MAIL_PORT) || 587,
      secure: false, // true para 465, false para otros puertos
      auth: {
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_PASSWORD?.replace(/"/g, ""), // Eliminar comillas si existen
      },
      tls: {
        rejectUnauthorized: false // A veces necesario en desarrollo
      }
    });

    // 4. Enviar correo
    await transporter.sendMail({
      from: `"${process.env.MAIL_FROM_NAME}" <${process.env.MAIL_FROM_ADDRESS}>`,
      to: "jcornejo@proscom.cl",
      replyTo: email,
      subject: `Nuevo Mensaje de Contacto Web: ${nombre}`,
      text: `Has recibido un nuevo mensaje de contacto:\n\nNombre: ${nombre}\nEmail: ${email}\nMensaje: ${mensaje}`,
      html: `
        <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: 0 auto; border: 1px solid #eee; border-radius: 8px; overflow: hidden;">
          <div style="background-color: #083668; padding: 20px; text-align: center;">
            <h2 style="color: #fff; margin: 0;">Nuevo Mensaje de Contacto</h2>
          </div>
          <div style="padding: 20px;">
            <p style="font-size: 16px;">Has recibido un nuevo mensaje desde el formulario web:</p>
            <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;">
            <p><strong>Nombre:</strong> ${nombre}</p>
            <p><strong>Email:</strong> <a href="mailto:${email}" style="color: #1B6CA8;">${email}</a></p>
            <p><strong>Mensaje:</strong></p>
            <div style="background-color: #f9f9f9; padding: 15px; border-radius: 4px; border-left: 4px solid #1B6CA8;">
              ${mensaje.replace(/\n/g, "<br>")}
            </div>
          </div>
          <div style="background-color: #f5f5f5; padding: 15px; text-align: center; font-size: 12px; color: #888;">
            Este correo fue enviado desde el formulario de contacto de Proscom.cl
          </div>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error al enviar correo:", error);
    return NextResponse.json(
      { error: "Error interno al enviar el correo" },
      { status: 500 }
    );
  }
}
