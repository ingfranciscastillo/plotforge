"use client";

import { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Plus, Trash2, Save, X } from "lucide-react";
import { StoryNode, NodeChoice } from "@/types";

interface Props {
  node: StoryNode;
  onSave: (node: StoryNode) => void;
  onCancel: () => void;
}

export default function NodeEditor({ node, onSave, onCancel }: Props) {
  const [title, setTitle] = useState(node.title || "");
  const [content, setContent] = useState(node.content);
  const [choices, setChoices] = useState<Partial<NodeChoice>[]>(
    node.choices || []
  );

  const addChoice = () => {
    if (choices.length < 3) {
      setChoices([...choices, { choiceText: "", order: choices.length }]);
    }
  };

  const updateChoice = (index: number, text: string) => {
    const updated = [...choices];
    updated[index] = { ...updated[index], choiceText: text };
    setChoices(updated);
  };

  const removeChoice = (index: number) => {
    setChoices(choices.filter((_, i) => i !== index));
  };

  const handleSave = () => {
    const updatedNode = {
      ...node,
      title,
      content,
      choices: choices.filter((c) => c.choiceText?.trim()) as NodeChoice[],
    };
    onSave(updatedNode);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          Editor de Nodo
          <Button variant="ghost" size="sm" onClick={onCancel}>
            <X className="h-4 w-4" />
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <label className="text-sm font-medium">Título del Nodo</label>
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Título opcional"
          />
        </div>

        <div>
          <label className="text-sm font-medium">Contenido Narrativo</label>
          <Textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Escribe la narrativa de este nodo..."
            rows={4}
          />
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-sm font-medium">Opciones de Decisión</label>
            <Button
              variant="outline"
              size="sm"
              onClick={addChoice}
              disabled={choices.length >= 3}
            >
              <Plus className="h-4 w-4 mr-1" />
              Agregar
            </Button>
          </div>

          {choices.map((choice, index) => (
            <div key={index} className="flex gap-2 mb-2">
              <Input
                value={choice.choiceText || ""}
                onChange={(e) => updateChoice(index, e.target.value)}
                placeholder={`Opción ${index + 1}`}
              />
              <Button
                variant="outline"
                size="sm"
                onClick={() => removeChoice(index)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex gap-2">
        <Button onClick={handleSave} className="flex-1">
          <Save className="mr-2 h-4 w-4" />
          Guardar Cambios
        </Button>
        <Button variant="outline" onClick={onCancel}>
          Cancelar
        </Button>
      </CardFooter>
    </Card>
  );
}
