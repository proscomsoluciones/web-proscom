import { NextRequest, NextResponse } from "next/server";
import { contactFormSchema } from "@/lib/validation";
import { sendContactEmail } from "@/lib/mailer";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // 1. Zod Validation
    const validationResult = contactFormSchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json(
        {
          success: false,
          errors: validationResult.error.flatten().fieldErrors,
          message: "Los datos enviados contienen errores de validación.",
        },
        { status: 400 }
      );
    }

    const data = validationResult.data;

    // 2. Honeypot check (anti-spam)
    if (data.website_hp && data.website_hp.length > 0) {
      return NextResponse.json(
        { success: false, message: "Petición no permitida." },
        { status: 400 }
      );
    }

    // 3. Server Logging
    console.log("[CONTACT_FORM_SUBMISSION]", {
      timestamp: new Date().toISOString(),
      name: data.name,
      company: data.company,
      email: data.email,
      phone: data.phone || "No especificado",
      projectType: data.projectType,
      estimatedBudget: data.estimatedBudget || "No especificado",
      descriptionLength: data.description.length,
      ip: req.headers.get("x-forwarded-for") || "local",
    });

    // 4. Envío de correo electrónico (SMTP)
    try {
      await sendContactEmail(data);
    } catch (err) {
      console.error("Error sending contact email:", err);
      return NextResponse.json(
        {
          success: false,
          message:
            "No pudimos enviar tu solicitud por correo en este momento. Intenta nuevamente o contáctanos por WhatsApp.",
        },
        { status: 502 }
      );
    }

    // Optional webhook forwarding if configured
    const webhookUrl = process.env.CONTACT_WEBHOOK_URL;
    if (webhookUrl) {
      try {
        await fetch(webhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        });
      } catch (err) {
        console.error("Error forwarding contact webhook:", err);
      }
    }

    return NextResponse.json({
      success: true,
      message:
        "Tu mensaje ha sido recibido con éxito. Nos pondremos en contacto contigo a la brevedad.",
    });
  } catch (error) {
    console.error("Contact API internal error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Ocurrió un error inesperado al procesar tu solicitud. Intenta nuevamente o contáctanos directamente por WhatsApp.",
      },
      { status: 500 }
    );
  }
}
