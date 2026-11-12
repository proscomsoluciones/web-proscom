import { NextRequest, NextResponse } from "next/server";
import { contactFormSchema, MIN_FILL_MS, type ContactFormData } from "@/lib/validation";
import { sendContactEmail } from "@/lib/mailer";

/** Reenvía el contacto al webhook configurado (CRM, Slack, planilla, etc.) */
async function forwardToWebhook(data: ContactFormData) {
  const webhookUrl = process.env.CONTACT_WEBHOOK_URL;
  if (!webhookUrl) return false;
  try {
    const res = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: data.name,
        phone: data.phone,
        email: data.email,
        company: data.company,
        need: data.need,
        message: data.message,
        receivedAt: new Date().toISOString(),
      }),
    });
    return res.ok;
  } catch (err) {
    console.error("Error forwarding contact webhook:", err);
    return false;
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // 1. Validación
    const validationResult = contactFormSchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json(
        {
          success: false,
          errors: validationResult.error.flatten().fieldErrors,
          message: "Revisa los datos marcados en rojo.",
        },
        { status: 400 }
      );
    }

    const data = validationResult.data;

    // 2. Anti-robots: campo trampa y envío demasiado rápido
    if ((data.website_hp && data.website_hp.length > 0) || Date.now() - data.startedAt < MIN_FILL_MS) {
      return NextResponse.json({ success: false, message: "Petición no permitida." }, { status: 400 });
    }

    // 3. Registro del contacto (sin datos personales)
    console.log("[CONTACT_FORM_SUBMISSION]", {
      timestamp: new Date().toISOString(),
      need: data.need,
      hasEmail: Boolean(data.email),
      messageLength: data.message?.length ?? 0,
    });

    // 4. Correo y webhook: basta con que uno llegue para no perder el contacto
    const [mailResult, webhookOk] = await Promise.all([
      sendContactEmail(data).then(
        () => true,
        (err) => {
          console.error("Error sending contact email:", err);
          return false;
        }
      ),
      forwardToWebhook(data),
    ]);

    if (!mailResult && !webhookOk) {
      return NextResponse.json(
        {
          success: false,
          message:
            "No pudimos enviar tu mensaje en este momento. Envíalo por WhatsApp con el botón de abajo y te respondemos igual de rápido.",
        },
        { status: 502 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "¡Gracias! Recibimos tu mensaje y te contactaremos a la brevedad.",
    });
  } catch (error) {
    console.error("Contact API internal error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Ocurrió un error inesperado. Envíanos tu mensaje por WhatsApp con el botón de abajo.",
      },
      { status: 500 }
    );
  }
}
