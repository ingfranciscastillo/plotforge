import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function CallToAction() {
  return (
    <section className="py-16 md:py-32">
      <div className="mx-auto max-w-5xl px-6">
        <div className="text-center">
          <h2 className="text-balance text-4xl font-semibold lg:text-5xl">
            ¡Únete a nuestra comunidad y transforma tu negocio!
          </h2>
          <p className="mt-4">
            Descubre cómo nuestra plataforma puede transformar tu negocio y
            llevarlo al siguiente nivel. Con herramientas innovadoras y un
            enfoque centrado en el usuario, estamos aquí para ayudarte a
            alcanzar tus objetivos.
          </p>

          <div className="mt-12">
            <Button asChild size="lg">
              <Link href="/sign-up">
                <span> Inicia ahora </span>
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
