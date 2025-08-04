import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { GitBranch, Play, Sparkles } from "lucide-react";
import { ReactNode } from "react";

export default function Features() {
  return (
    <section className="py-16 md:py-32">
      <div className="@container mx-auto max-w-5xl px-6">
        <div className="text-center">
          <h2 className="text-balance text-4xl font-semibold lg:text-5xl">
            Características que harán brillar tu historia
          </h2>
          <p className="mt-4">
            Explora las herramientas y funcionalidades que hacen de nuestra
            plataforma la mejor opción para crear y disfrutar de historias
            interactivas.
          </p>
        </div>
        <div className="@min-4xl:max-w-full @min-4xl:grid-cols-3 mx-auto mt-8 grid max-w-sm gap-6 [--color-background:var(--color-muted)] [--color-card:var(--color-muted)] *:text-center md:mt-16 dark:[--color-muted:var(--color-zinc-900)]">
          <Card className="group border-0 shadow-none">
            <CardHeader className="pb-3">
              <CardDecorator>
                <GitBranch className="size-6" aria-label="hidden" />
              </CardDecorator>

              <h3 className="mt-6 font-medium">Narrativas Ramificadas</h3>
            </CardHeader>

            <CardContent>
              <p className="text-sm">
                Crea historias con múltiples caminos y finales donde cada
                elección lleva a nuevas aventuras.
              </p>
            </CardContent>
          </Card>

          <Card className="group border-0 shadow-none">
            <CardHeader className="pb-3">
              <CardDecorator>
                <Play className="size-6" aria-hidden />
              </CardDecorator>

              <h3 className="mt-6 font-medium">Modo Jugador</h3>
            </CardHeader>

            <CardContent>
              <p className="mt-3 text-sm">
                Experimenta tus historias como un lector, tomando decisiones y
                explorando todos los caminos posibles.
              </p>
            </CardContent>
          </Card>

          <Card className="group border-0 shadow-none">
            <CardHeader className="pb-3">
              <CardDecorator>
                <Sparkles className="size-6" aria-hidden />
              </CardDecorator>

              <h3 className="mt-6 font-medium">IA Asistente</h3>
            </CardHeader>

            <CardContent>
              <p className="mt-3 text-sm">
                Obtén sugerencias inteligentes para continuar tu historia y
                superar el bloqueo del escritor.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}

const CardDecorator = ({ children }: { children: ReactNode }) => (
  <div className="relative mx-auto size-36 duration-200 [--color-border:color-mix(in_oklab,var(--color-zinc-950)10%,transparent)] group-hover:[--color-border:color-mix(in_oklab,var(--color-zinc-950)20%,transparent)] dark:[--color-border:color-mix(in_oklab,var(--color-white)15%,transparent)] dark:group-hover:bg-white/5 dark:group-hover:[--color-border:color-mix(in_oklab,var(--color-white)20%,transparent)]">
    <div
      aria-hidden
      className="absolute inset-0 bg-[linear-gradient(to_right,var(--color-border)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-border)_1px,transparent_1px)] bg-[size:24px_24px]"
    />
    <div
      aria-hidden
      className="bg-radial to-background absolute inset-0 from-transparent to-75%"
    />
    <div className="dark:bg-background absolute inset-0 m-auto flex size-12 items-center justify-center border-l border-t bg-white">
      {children}
    </div>
  </div>
);
