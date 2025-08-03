import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { db } from "@/lib/db";
import { stories } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { Plus, BookOpen, Calendar, Play } from "lucide-react";

export default async function DashboardPage() {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  // Obtener historias del usuario
  const userStories = await db
    .select()
    .from(stories)
    .where(eq(stories.userId, userId));

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Mis Historias</h1>
          <p className="text-gray-600 mt-2">
            Gestiona y crea tus narrativas interactivas
          </p>
        </div>
        <Link href="/editor/new">
          <Button size="lg">
            <Plus className="mr-2 h-5 w-5" />
            Nueva Historia
          </Button>
        </Link>
      </div>

      {userStories.length === 0 ? (
        <Card className="text-center py-12">
          <CardContent>
            <BookOpen className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              ¡Tu primera historia te espera!
            </h3>
            <p className="text-gray-500 mb-6">
              Comienza creando una historia interactiva llena de decisiones y
              aventuras.
            </p>
            <Link href="/editor/new">
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Crear Primera Historia
              </Button>
            </Link>
          </CardContent>
        </Card>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {userStories.map((story) => (
            <Card key={story.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5" />
                  {story.title}
                </CardTitle>
                {story.description && (
                  <CardDescription>{story.description}</CardDescription>
                )}
                <div className="flex items-center text-sm text-gray-500">
                  <Calendar className="h-4 w-4 mr-1" />
                  {new Date(story.createdAt).toLocaleDateString()}
                </div>
              </CardHeader>
              <CardFooter className="flex gap-2">
                <Link href={`/editor/${story.id}`} className="flex-1">
                  <Button variant="outline" className="w-full">
                    Editar
                  </Button>
                </Link>
                <Link href={`/play/${story.id}`} className="flex-1">
                  <Button className="w-full">
                    <Play className="mr-2 h-4 w-4" />
                    Jugar
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
