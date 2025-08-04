import WelcomeEmail from "@/components/emails/sendWelcomeEmail";
import { resend } from "@/lib/resend";
import { verifyWebhook } from "@clerk/nextjs/webhooks";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const evt = await verifyWebhook(req);

    const eventType = evt.type;

    if (eventType === "user.created") {
      const name = evt.data.first_name || evt.data.username || "Nuevo usuario";
      const email = evt.data.email_addresses[0].email_address;

      await resend.emails.send({
        from: "Acme <onboarding@resend.dev>",
        to: email,
        subject: "Bienvenido a PlotForge",
        react: WelcomeEmail({
          name,
        }),
      });
    }

    return new Response("Webhook received", { status: 200 });
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return new Response("Error verifying webhook", { status: 400 });
  }
}
