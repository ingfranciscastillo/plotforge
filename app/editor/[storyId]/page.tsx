import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";
import { stories, storyNodes, nodeChoices } from "@/lib/db/schema";
import { eq, and } from "drizzle-orm";
import StoryEditor from "@/components/editor/story-editor";

interface Props {
  params: { storyId: string };
}

export default async function EditorPage({ params }: Props) {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  // Si es una nueva historia, crear una
  if (params.storyId === "new") {
    const [newStory] = await db
      .insert(stories)
      .values({
        userId,
        title: "Nueva Historia",
        description: "",
      })
      .returning();

    // Crear nodo raíz
    await db.insert(storyNodes).values({
      storyId: newStory.id,
      content: "Escribe aquí el comienzo de tu historia...",
      title: "Inicio",
      isRoot: 1,
      positionX: 100,
      positionY: 100,
    });

    redirect(`/editor/${newStory.id}`);
  }

  // Obtener historia existente
  const [story] = await db
    .select()
    .from(stories)
    .where(and(eq(stories.id, params.storyId), eq(stories.userId, userId)));

  if (!story) {
    redirect("/dashboard");
  }

  // Obtener nodos y opciones
  const nodes = await db
    .select()
    .from(storyNodes)
    .where(eq(storyNodes.storyId, params.storyId));
  const allChoices = await db.select().from(nodeChoices);

  const nodesWithChoices = nodes.map((node) => ({
    ...node,
    choices: allChoices.filter((choice) => choice.nodeId === node.id),
  }));

  return (
    <div className="h-screen">
      <StoryEditor story={story} initialNodes={nodesWithChoices} />
    </div>
  );
}
