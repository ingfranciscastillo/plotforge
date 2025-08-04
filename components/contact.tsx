"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  contactFormSchema,
  ContactFormValues,
} from "@/lib/validations/contact-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import countries from "@/lib/data/countries.json";
import { useState } from "react";
import { toast } from "react-hot-toast";

export default function ContactSection() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
  });

  const onSubmit = async (data: ContactFormValues) => {
    setLoading(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      console.log("Response:", res);

      if (res.ok) {
        toast("Mensaje enviado correctamente", {
          icon: "✅",
        });
        setSubmitted(true);
        setTimeout(() => setSubmitted(false), 5000);
      }
    } catch (error) {
      console.error("Error enviando mensaje:", error);
      toast("Error al enviar el mensaje. Inténtalo de nuevo más tarde.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-32">
      <div className="mx-auto max-w-3xl px-8 lg:px-0">
        <h1 className="text-center text-4xl font-semibold lg:text-5xl">
          Contáctanos
        </h1>
        <p className="mt-4 text-center">
          ¿Tienes preguntas o necesitas más información? ¡Estamos aquí para
          ayudarte!
        </p>

        <Card className="mx-auto mt-12 max-w-lg p-8 shadow-md sm:p-16">
          {submitted ? (
            <p className="text-green-600 font-semibold text-center">
              ¡Mensaje enviado correctamente!
            </p>
          ) : (
            <>
              <h2 className="text-xl font-semibold">
                Interesados en adquirir la aplicación?
              </h2>
              <p className="mt-4 text-sm">
                Por favor completa el formulario a continuación.
              </p>

              <form
                onSubmit={handleSubmit(onSubmit)}
                className="**:[&>label]:block mt-12 space-y-6 *:space-y-3"
              >
                <div>
                  <Label htmlFor="name">Nombre completo</Label>
                  <Input id="name" {...register("name")} />
                  {errors.name && (
                    <p className="text-red-500 text-sm">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor="email">Correo electrónico</Label>
                  <Input id="email" type="email" {...register("email")} />
                  {errors.email && (
                    <p className="text-red-500 text-sm">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor="country">País</Label>
                  <Select onValueChange={(value) => setValue("country", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona un país" />
                    </SelectTrigger>
                    <SelectContent>
                      {countries.map((country) => (
                        <SelectItem key={country} value={country}>
                          {country}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.country && (
                    <p className="text-red-500 text-sm">
                      {errors.country.message}
                    </p>
                  )}
                </div>

                <div>
                  <Label htmlFor="message">Mensaje</Label>
                  <Textarea id="message" rows={3} {...register("message")} />
                  {errors.message && (
                    <p className="text-red-500 text-sm">
                      {errors.message.message}
                    </p>
                  )}
                </div>

                <Button type="submit" disabled={loading}>
                  {loading ? "Enviando..." : "Enviar"}
                </Button>
              </form>
            </>
          )}
        </Card>
      </div>
    </section>
  );
}
