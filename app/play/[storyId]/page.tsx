import { db } from "@/lib/db";
import { stories, storyNodes, nodeChoices } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import StoryPlayer from "@/components/player/story-player";

interface Props {
  params: { storyId: string };
}

export default async function PlayPage({ params }: Props) {
  // Obtener historia (puede ser pública para jugar)
  const [story] = await db
    .select()
    .from(stories)
    .where(eq(stories.id, params.storyId));

  if (!story) {
    notFound();
  }

  // Obtener todos los nodos y opciones
  const nodes = await db
    .select()
    .from(storyNodes)
    .where(eq(storyNodes.storyId, params.storyId));
  const allChoices = await db.select().from(nodeChoices);

  const nodesWithChoices = nodes.map((node) => ({
    ...node,
    choices: allChoices.filter((choice) => choice.nodeId === node.id),
  }));

  // Encontrar nodo raíz
  const rootNode = nodesWithChoices.find((node) => node.isRoot === 1);

  if (!rootNode) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          Historia en Construcción
        </h1>
        <p className="text-gray-600">
          Esta historia aún no tiene contenido para reproducir.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50">
      <StoryPlayer story={story} nodes={nodesWithChoices} rootNode={rootNode} />
    </div>
  );
}
