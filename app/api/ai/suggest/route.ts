import { NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: NextRequest) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { currentContent, prompt, storyContext } = await request.json();

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: `Eres un asistente especializado en escritura creativa de historias interactivas. 
          Tu trabajo es ayudar a los escritores a continuar sus narrativas de manera coherente y atractiva.
          Proporciona continuaciones que mantengan el tono y estilo de la historia existente.
          Las sugerencias deben ser concisas (máximo 200 palabras) y crear oportunidades para decisiones interesantes.`,
        },
        {
          role: "user",
          content: `Historia actual: "${currentContent}"
          
          Solicitud del escritor: "${prompt}"
          
          Proporciona una continuación narrativa que sea coherente con la historia existente y que incorpore la solicitud del escritor.`,
        },
      ],
      max_tokens: 300,
      temperature: 0.8,
    });

    const suggestion =
      completion.choices[0]?.message?.content ||
      "No se pudo generar una sugerencia.";

    return NextResponse.json({ suggestion });
  } catch (error) {
    console.error("Error en IA:", error);
    return NextResponse.json(
      { error: "Error al generar sugerencia" },
      { status: 500 }
    );
  }
}
