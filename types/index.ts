export interface Story {
  id: string;
  userId: string;
  title: string;
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface StoryNode {
  id: string;
  storyId: string;
  parentId?: string;
  content: string;
  title?: string;
  isRoot: number;
  positionX: number;
  positionY: number;
  createdAt: Date;
  choices?: NodeChoice[];
  children?: StoryNode[];
}

export interface NodeChoice {
  id: string;
  nodeId: string;
  targetNodeId?: string;
  choiceText: string;
  order: number;
  createdAt: Date;
  targetNode?: StoryNode;
}

export interface FlowNode {
  id: string;
  type: string;
  position: { x: number; y: number };
  data: {
    label: string;
    content: string;
    choices: NodeChoice[];
  };
}

export interface FlowEdge {
  id: string;
  source: string;
  target: string;
  label?: string;
}
