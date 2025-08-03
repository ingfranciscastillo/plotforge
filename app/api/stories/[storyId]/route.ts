import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { stories, storyNodes, nodeChoices } from "@/lib/db/schema";
import { eq, and } from "drizzle-orm";

export async function GET(
  request: NextRequest,
  { params }: { params: { storyId: string } }
) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const [story] = await db
      .select()
      .from(stories)
      .where(and(eq(stories.id, params.storyId), eq(stories.userId, userId)));

    if (!story) {
      return NextResponse.json({ error: "Story not found" }, { status: 404 });
    }

    // Obtener nodos con sus opciones
    const nodes = await db
      .select()
      .from(storyNodes)
      .where(eq(storyNodes.storyId, params.storyId));
    const choices = await db
      .select()
      .from(nodeChoices)
      .where(eq(nodeChoices.nodeId, storyNodes.id));

    // Agrupar opciones por nodo
    const nodesWithChoices = nodes.map((node) => ({
      ...node,
      choices: choices.filter((choice) => choice.nodeId === node.id),
    }));

    return NextResponse.json({
      story,
      nodes: nodesWithChoices,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { storyId: string } }
) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { title, description } = await request.json();

    const [updatedStory] = await db
      .update(stories)
      .set({ title, description, updatedAt: new Date() })
      .where(and(eq(stories.id, params.storyId), eq(stories.userId, userId)))
      .returning();

    if (!updatedStory) {
      return NextResponse.json({ error: "Story not found" }, { status: 404 });
    }

    return NextResponse.json(updatedStory);
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
