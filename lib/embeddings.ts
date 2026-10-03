import { embed, embedMany } from "ai";
import { createOpenRouter } from "@openrouter/ai-sdk-provider";

const openrouter = createOpenRouter({
  apiKey: process.env.OPENROUTER_API_KEY,
});

export async function generateEmbedding(text: string) {
  const input = text.replace(/\n/g, " ");

  const { embedding } = await embed({
    model: openrouter.embedding("nvidia/nemotron-3-embed-1b:free"),
    value: input,
  });
  console.log(embedding.length);
  return embedding;
}

export async function generateEmbeddings(texts: string[]) {
  const inputs = texts.map((text) => text.replace(/\n/g, " "));

  const { embeddings } = await embedMany({
    model: openrouter.embedding("nvidia/nemotron-3-embed-1b:free"),
    values: inputs,
  });

  return embeddings;
}
