import { pgTable, text, timestamp, uuid, integer } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

export const stories = pgTable("stories", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: text("user_id").notNull(),
  title: text("title").notNull(),
  description: text("description"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const storyNodes = pgTable("story_nodes", {
  id: uuid("id").defaultRandom().primaryKey(),
  storyId: uuid("story_id")
    .notNull()
    .references(() => stories.id, { onDelete: "cascade" }),
  parentId: uuid("parent_id").references(() => storyNodes.id, {
    onDelete: "cascade",
  }),
  content: text("content").notNull(),
  title: text("title"),
  isRoot: integer("is_root").default(0), // 1 para nodo raíz
  positionX: integer("position_x").default(0),
  positionY: integer("position_y").default(0),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const nodeChoices = pgTable("node_choices", {
  id: uuid("id").defaultRandom().primaryKey(),
  nodeId: uuid("node_id")
    .notNull()
    .references(() => storyNodes.id, { onDelete: "cascade" }),
  targetNodeId: uuid("target_node_id").references(() => storyNodes.id, {
    onDelete: "cascade",
  }),
  choiceText: text("choice_text").notNull(),
  order: integer("order").notNull().default(0),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

// Relaciones
export const storiesRelations = relations(stories, ({ many }) => ({
  nodes: many(storyNodes),
}));

export const storyNodesRelations = relations(storyNodes, ({ one, many }) => ({
  story: one(stories, {
    fields: [storyNodes.storyId],
    references: [stories.id],
  }),
  parent: one(storyNodes, {
    fields: [storyNodes.parentId],
    references: [storyNodes.id],
  }),
  children: many(storyNodes),
  choices: many(nodeChoices),
}));

export const nodeChoicesRelations = relations(nodeChoices, ({ one }) => ({
  node: one(storyNodes, {
    fields: [nodeChoices.nodeId],
    references: [storyNodes.id],
  }),
  targetNode: one(storyNodes, {
    fields: [nodeChoices.targetNodeId],
    references: [storyNodes.id],
  }),
}));
