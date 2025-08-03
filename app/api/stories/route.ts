import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { db } from "@/lib/db";
import { stories, storyNodes } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

export async function GET() {
  try {
    const {userId} = await auth();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userStories = await db
      .select()
      .from(stories)
      .where(eq(stories.userId, userId));

    return NextResponse.json(userStories);
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { title, description } = await request.json();

    // Crear historia
    const [newStory] = await db
      .insert(stories)
      .values({
        userId,
        title,
        description,
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

    return NextResponse.json(newStory);
  } catch () {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
