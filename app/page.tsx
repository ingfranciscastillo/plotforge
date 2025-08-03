import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BookOpen, GitBranch, Play, Sparkles } from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-6xl font-bold text-gray-900 mb-4">
            Plot<span className="text-blue-600">Forge</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            Crea historias interactivas ramificadas donde cada decisión cuenta.
            Construye narrativas envolventes como novelas visuales y juegos
            narrativos.
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/dashboard">
              <Button size="lg" className="text-lg px-8">
                <BookOpen className="mr-2 h-5 w-5" />
                Comenzar a Escribir
              </Button>
            </Link>
            <Link href="/explore">
              <Button variant="outline" size="lg" className="text-lg px-8">
                <Play className="mr-2 h-5 w-5" />
                Explorar Historias
              </Button>
            </Link>
          </div>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <Card className="text-center">
            <CardHeader>
              <GitBranch className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <CardTitle>Narrativas Ramificadas</CardTitle>
              <CardDescription>
                Crea historias con múltiples caminos y finales donde cada
                elección lleva a nuevas aventuras.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <Sparkles className="h-12 w-12 text-purple-600 mx-auto mb-4" />
              <CardTitle>IA Asistente</CardTitle>
              <CardDescription>
                Obtén sugerencias inteligentes para continuar tu historia y
                superar el bloqueo del escritor.
              </CardDescription>
            </CardHeader>
          </Card>

          <Card className="text-center">
            <CardHeader>
              <Play className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <CardTitle>Modo Jugador</CardTitle>
              <CardDescription>
                Experimenta tus historias como un lector, tomando decisiones y
                explorando todos los caminos posibles.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </div>
    </div>
  );
}
