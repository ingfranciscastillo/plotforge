import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { stories, storyNodes, nodeChoices } from "@/lib/db/schema";
import { eq, and } from "drizzle-orm";

export async function POST(
  request: NextRequest,
  { params }: { params: { storyId: string } }
) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Verificar que la historia pertenece al usuario
    const [story] = await db
      .select()
      .from(stories)
      .where(and(eq(stories.id, params.storyId), eq(stories.userId, userId)));

    if (!story) {
      return NextResponse.json({ error: "Story not found" }, { status: 404 });
    }

    const {
      parentId,
      content,
      title,
      positionX,
      positionY,
      choices = [],
    } = await request.json();

    // Crear nuevo nodo
    const [newNode] = await db
      .insert(storyNodes)
      .values({
        storyId: params.storyId,
        parentId,
        content,
        title,
        positionX,
        positionY,
        isRoot: 0,
      })
      .returning();

    // Crear opciones si las hay
    if (choices.length > 0) {
      await db.insert(nodeChoices).values(
        choices.map((choice: any, index: number) => ({
          nodeId: newNode.id,
          choiceText: choice.text,
          order: index,
        }))
      );
    }

    return NextResponse.json(newNode);
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

    const { nodeId, content, title, choices = [] } = await request.json();

    // Verificar que el nodo pertenece a una historia del usuario
    const [node] = await db
      .select({
        node: storyNodes,
        story: stories,
      })
      .from(storyNodes)
      .innerJoin(stories, eq(storyNodes.storyId, stories.id))
      .where(and(eq(storyNodes.id, nodeId), eq(stories.userId, userId)));

    if (!node) {
      return NextResponse.json({ error: "Node not found" }, { status: 404 });
    }

    // Actualizar nodo
    await db
      .update(storyNodes)
      .set({ content, title })
      .where(eq(storyNodes.id, nodeId));

    // Actualizar opciones - eliminar existentes y crear nuevas
    await db.delete(nodeChoices).where(eq(nodeChoices.nodeId, nodeId));

    if (choices.length > 0) {
      await db.insert(nodeChoices).values(
        choices.map((choice: any, index: number) => ({
          nodeId,
          choiceText: choice.text,
          targetNodeId: choice.targetNodeId,
          order: index,
        }))
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
