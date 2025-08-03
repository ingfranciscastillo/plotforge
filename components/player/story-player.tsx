"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, RotateCcw, BookOpen } from "lucide-react";
import { Story, StoryNode } from "@/types";
import Link from "next/link";

interface Props {
  story: Story;
  nodes: StoryNode[];
  rootNode: StoryNode;
}

export default function StoryPlayer({ story, nodes, rootNode }: Props) {
  const [currentNode, setCurrentNode] = useState<StoryNode>(rootNode);
  const [history, setHistory] = useState<StoryNode[]>([rootNode]);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleChoice = (targetNodeId: string) => {
    const targetNode = nodes.find((node) => node.id === targetNodeId);
    if (targetNode) {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentNode(targetNode);
        setHistory((prev) => [...prev, targetNode]);
        setIsAnimating(false);
      }, 300);
    }
  };

  const goBack = () => {
    if (history.length > 1) {
      const newHistory = history.slice(0, -1);
      setHistory(newHistory);
      setCurrentNode(newHistory[newHistory.length - 1]);
    }
  };

  const restart = () => {
    setCurrentNode(rootNode);
    setHistory([rootNode]);
  };

  const hasChoices = currentNode.choices && currentNode.choices.length > 0;
  const availableChoices =
    currentNode.choices?.filter((choice) => choice.targetNodeId) || [];

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <Link href="/dashboard">
          <Button variant="outline" size="sm">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Volver
          </Button>
        </Link>
        <div className="flex-1">
          <h1 className="text-2xl font-bold text-gray-900">{story.title}</h1>
          {story.description && (
            <p className="text-gray-600 mt-1">{story.description}</p>
          )}
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={goBack}
            disabled={history.length <= 1}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="sm" onClick={restart}>
            <RotateCcw className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Progreso */}
      <div className="mb-6">
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <BookOpen className="h-4 w-4" />
          <span>Paso {history.length} de la historia</span>
        </div>
      </div>

      {/* Contenido Principal */}
      <Card
        className={`mb-8 transition-all duration-300 ${
          isAnimating ? "opacity-50 scale-95" : "opacity-100 scale-100"
        }`}
      >
        <CardContent className="p-8">
          {currentNode.title && (
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              {currentNode.title}
            </h2>
          )}
          <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
            {currentNode.content.split("\n").map((paragraph, index) => (
              <p key={index} className="mb-4 last:mb-0">
                {paragraph}
              </p>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Opciones */}
      {hasChoices ? (
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">
              ¿Qué decides hacer?
            </h3>
            <div className="space-y-3">
              {availableChoices.map((choice, index) => (
                <Button
                  key={choice.id}
                  variant="outline"
                  className="w-full text-left justify-start h-auto p-4 hover:bg-blue-50 hover:border-blue-300"
                  onClick={() =>
                    choice.targetNodeId && handleChoice(choice.targetNodeId)
                  }
                >
                  <span className="flex items-start gap-3">
                    <span className="bg-blue-100 text-blue-700 rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium flex-shrink-0 mt-1">
                      {index + 1}
                    </span>
                    <span className="text-gray-900">{choice.choiceText}</span>
                  </span>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card className="text-center">
          <CardContent className="p-8">
            <div className="text-6xl mb-4">📖</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Fin de esta rama
            </h3>
            <p className="text-gray-600 mb-6">
              Has llegado al final de este camino en la historia.
            </p>
            <div className="flex gap-4 justify-center">
              <Button onClick={goBack} disabled={history.length <= 1}>
                <ArrowLeft className="mr-2 h-4 w-4" />
                Volver Atrás
              </Button>
              <Button onClick={restart}>
                <RotateCcw className="mr-2 h-4 w-4" />
                Reiniciar Historia
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
