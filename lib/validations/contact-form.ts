import { z } from "zod";

export const contactFormSchema = z.object({
  name: z.string().min(2, "El nombre es requerido"),
  email: z.string().email("Correo inválido"),
  country: z.string().min(2, "El país es requerido"),
  message: z.string().min(10, "El mensaje es muy corto"),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;
