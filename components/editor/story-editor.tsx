"use client";

import { useState, useCallback, useEffect } from "react";
import ReactFlow, {
  Node,
  Edge,
  addEdge,
  Connection,
  useNodesState,
  useEdgesState,
  Controls,
  MiniMap,
  Background,
} from "react-flow-renderer";
import Panel from "react-flow-renderer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Save, Play, Plus } from "lucide-react";
import { Story, StoryNode } from "@/types";
import NodeEditor from "./node-editor";
import toast from "react-hot-toast";

interface Props {
  story: Story;
  initialNodes: StoryNode[];
}

export default function StoryEditor({ story, initialNodes }: Props) {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [selectedNode, setSelectedNode] = useState<StoryNode | null>(null);
  const [storyTitle, setStoryTitle] = useState(story.title);
  const [storyDescription, setStoryDescription] = useState(
    story.description || ""
  );

  // Convertir nodos de DB a formato ReactFlow
  useEffect(() => {
    const flowNodes: Node[] = initialNodes.map((node) => ({
      id: node.id,
      type: "default",
      position: { x: node.positionX, y: node.positionY },
      data: {
        label: node.title || "Nodo",
        content: node.content,
        choices: node.choices || [],
      },
      style: {
        background: node.isRoot ? "#e0f2fe" : "#ffffff",
        border: node.isRoot ? "2px solid #0284c7" : "1px solid #d1d5db",
        borderRadius: "8px",
        padding: "10px",
        minWidth: "200px",
      },
    }));

    const flowEdges: Edge[] = [];
    initialNodes.forEach((node) => {
      node.choices?.forEach((choice, index) => {
        if (choice.targetNodeId) {
          flowEdges.push({
            id: `${node.id}-${choice.targetNodeId}-${index}`,
            source: node.id,
            target: choice.targetNodeId,
            label: choice.choiceText,
            style: { stroke: "#6366f1" },
          });
        }
      });
    });

    setNodes(flowNodes);
    setEdges(flowEdges);
  }, [initialNodes, setNodes, setEdges]);

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const handleNodeClick = useCallback(
    (event: React.MouseEvent, node: Node) => {
      const storyNode = initialNodes.find((n) => n.id === node.id);
      setSelectedNode(storyNode || null);
    },
    [initialNodes]
  );

  const handleSaveStory = async () => {
    try {
      await fetch(`/api/stories/${story.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: storyTitle,
          description: storyDescription,
        }),
      });
      toast.success("Historia guardada");
    } catch (error) {
      toast.error("Error al guardar");
    }
  };

  const handleAddNode = () => {
    const newNode: Node = {
      id: `temp-${Date.now()}`,
      type: "default",
      position: { x: Math.random() * 500 + 100, y: Math.random() * 300 + 100 },
      data: {
        label: "Nuevo Nodo",
        content: "Escribe aquí el contenido...",
        choices: [],
      },
      style: {
        background: "#ffffff",
        border: "1px solid #d1d5db",
        borderRadius: "8px",
        padding: "10px",
        minWidth: "200px",
      },
    };
    setNodes((nds) => [...nds, newNode]);
  };

  return (
    <div className="h-full flex">
      {/* Panel lateral */}
      <div className="w-80 bg-white border-r border-gray-200 p-4 overflow-y-auto">
        <Card className="mb-4">
          <CardHeader>
            <CardTitle>Información de la Historia</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="text-sm font-medium">Título</label>
              <Input
                value={storyTitle}
                onChange={(e) => setStoryTitle(e.target.value)}
                placeholder="Título de la historia"
              />
            </div>
            <div>
              <label className="text-sm font-medium">Descripción</label>
              <Input
                value={storyDescription}
                onChange={(e) => setStoryDescription(e.target.value)}
                placeholder="Descripción opcional"
              />
            </div>
            <div className="flex gap-2">
              <Button onClick={handleSaveStory} className="flex-1">
                <Save className="mr-2 h-4 w-4" />
                Guardar
              </Button>
              <Button
                variant="outline"
                onClick={() => window.open(`/play/${story.id}`, "_blank")}
              >
                <Play className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {selectedNode && (
          <NodeEditor
            node={selectedNode}
            onSave={(updatedNode) => {
              // Actualizar nodo en el servidor
              console.log("Guardando nodo:", updatedNode);
              setSelectedNode(null);
            }}
            onCancel={() => setSelectedNode(null)}
          />
        )}
      </div>

      {/* Editor visual */}
      <div className="flex-1 relative">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onNodeClick={handleNodeClick}
          fitView
        >
          <Controls />
          <MiniMap />
          <Background gap={12} size={1} />
          <Panel position="top-right">
            <Button onClick={handleAddNode}>
              <Plus className="mr-2 h-4 w-4" />
              Agregar Nodo
            </Button>
          </Panel>
        </ReactFlow>
      </div>
    </div>
  );
}
