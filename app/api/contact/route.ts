import { contactFormSchema } from "@/lib/validations/contact-form";
import { resend } from "@/lib/resend";
import ContactMessageEmail from "@/components/emails/ContactMessageEmail";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();
  const parsed = contactFormSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ errors: parsed.error.flatten().fieldErrors });
  }

  const { name, email, country, message } = parsed.data;

  try {
    await resend.emails.send({
      from: "Acme <onboarding@resend.dev>",
      to: email,
      subject: `Nuevo mensaje de contacto de ${name}`,
      react: ContactMessageEmail({
        name,
        email,
        country,
        message,
      }),
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Error al enviar email:", err);
    return NextResponse.json({ error: "Error al enviar el correo" });
  }
}
