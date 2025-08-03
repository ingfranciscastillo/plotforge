"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Sparkles, Send, Loader2 } from "lucide-react";
import { StoryNode } from "@/types";
import toast from "react-hot-toast";

interface Props {
  currentNode: StoryNode;
  onSuggestionAccept: (suggestion: string) => void;
}

export default function AIAssistant({
  currentNode,
  onSuggestionAccept,
}: Props) {
  const [suggestion, setSuggestion] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [prompt, setPrompt] = useState("");

  const generateSuggestion = async () => {
    if (!prompt.trim()) {
      toast.error("Por favor, describe qué tipo de continuación necesitas");
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch("/api/ai/suggest", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          currentContent: currentNode.content,
          prompt: prompt,
          storyContext: "Continuación narrativa",
        }),
      });

      if (!response.ok) throw new Error("Error al generar sugerencia");

      const data = await response.json();
      setSuggestion(data.suggestion);
    } catch (error) {
      toast.error("Error al generar sugerencia con IA");
    } finally {
      setIsLoading(false);
    }
  };

  const acceptSuggestion = () => {
    if (suggestion) {
      onSuggestionAccept(suggestion);
      setSuggestion("");
      setPrompt("");
      toast.success("Sugerencia aplicada");
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-purple-600" />
          Asistente IA
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label className="text-sm font-medium">
            ¿Qué tipo de continuación necesitas?
          </label>
          <Textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Ej: Necesito que el personaje se encuentre con un misterioso extraño..."
            rows={3}
          />
        </div>

        <Button
          onClick={generateSuggestion}
          disabled={isLoading || !prompt.trim()}
          className="w-full"
        >
          {isLoading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Send className="mr-2 h-4 w-4" />
          )}
          Generar Sugerencia
        </Button>

        {suggestion && (
          <div className="space-y-3">
            <div>
              <label className="text-sm font-medium">Sugerencia IA:</label>
              <div className="mt-2 p-3 bg-purple-50 border border-purple-200 rounded-md text-sm">
                {suggestion}
              </div>
            </div>
            <div className="flex gap-2">
              <Button onClick={acceptSuggestion} size="sm" className="flex-1">
                Usar Sugerencia
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSuggestion("")}
              >
                Descartar
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
