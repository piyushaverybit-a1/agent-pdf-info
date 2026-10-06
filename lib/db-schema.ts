import { pgTable, serial, text, vector, index } from "drizzle-orm/pg-core";

export const documents = pgTable("documents", {
  id: serial("id").primaryKey(),
  content: text("content").notNull(),
  embedding: vector("embedding", { dimensions: 2048 }),
});

export type InsertDocument = typeof documents.$inferInsert;
export type SelectDocument = typeof documents.$inferSelect;