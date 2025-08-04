"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Link from "next/link";
import { Button } from "./ui/button";
import { ArrowLeft } from "lucide-react";

export default function FAQsTwo() {
  const faqItems = [
    {
      id: "item-1",
      question: "¿Qué es un creador de historias interactivas?",
      answer:
        "Es una herramienta que te permite crear historias o guiones con decisiones ramificadas, ideales para videojuegos, novelas visuales, contenido educativo y más.",
    },
    {
      id: "item-2",
      question: "¿Necesito saber programar para usarlo?",
      answer:
        "No, la plataforma está diseñada para ser intuitiva y accesible. Puedes crear historias simplemente escribiendo texto y eligiendo opciones sin necesidad de código.",
    },
    {
      id: "item-3",
      question: "¿Puedo exportar mis historias?",
      answer:
        "Sí, puedes exportar tus historias en formatos como JSON, PDF o integrarlas fácilmente en motores de juego como Unity o herramientas web.",
    },
    {
      id: "item-4",
      question: "¿Se pueden añadir ilustraciones o música?",
      answer:
        "¡Por supuesto! Puedes enriquecer tus historias añadiendo imágenes, audio y hasta animaciones simples para una experiencia inmersiva.",
    },
    {
      id: "item-5",
      question: "¿Es posible colaborar con otros escritores?",
      answer:
        "Sí, el sistema permite colaboración en tiempo real para que varios usuarios trabajen en la misma historia simultáneamente, ideal para equipos creativos.",
    },
  ];

  return (
    <section className="py-16 md:py-24">
      <div className="mx-auto max-w-5xl px-4 md:px-6">
        <div className="mx-auto max-w-xl text-center">
          <div className="mb-8 flex items-center justify-between">
            <Link href="/" className="text-muted-foreground hover:underline">
              <Button variant="outline" size="sm" className="gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back to Home
              </Button>
            </Link>
          </div>
          <h2 className="text-balance text-3xl font-bold md:text-4xl lg:text-5xl">
            Frequently Asked Questions
          </h2>
          <p className="text-muted-foreground mt-4 text-balance">
            Discover quick and comprehensive answers to common questions about
            our platform, services, and features.
          </p>
        </div>

        <div className="mx-auto mt-12 max-w-xl">
          <Accordion
            type="single"
            collapsible
            className="bg-card ring-muted w-full rounded-2xl border px-8 py-3 shadow-sm ring-4 dark:ring-0"
          >
            {faqItems.map((item) => (
              <AccordionItem
                key={item.id}
                value={item.id}
                className="border-dashed"
              >
                <AccordionTrigger className="cursor-pointer text-base hover:no-underline">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent>
                  <p className="text-base">{item.answer}</p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <p className="text-muted-foreground mt-6 px-8">
            No puedes encontrar la respuesta que buscas? No dudes en contactar a
            nuestro{" "}
            <Link
              href="/contact"
              className="text-primary font-medium hover:underline"
            >
              equipo de soporte técnico
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
