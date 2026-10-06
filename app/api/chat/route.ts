import { streamText, UIMessage, convertToModelMessages, tool, stepCountIs} from "ai";
import { createOpenRouter} from "@openrouter/ai-sdk-provider";
import { z } from "zod";
import { searchDocuments } from "@/lib/search";

const openrouter = createOpenRouter({
  apiKey: process.env.OPENROUTER_API_KEY,
});
const tools = {
  searchKnowledgeBase: tool({
    description: "Search the knowledge base for relevant information.",

    inputSchema: z.object({
      query: z
        .string()
        .describe("The search query to find relevant documents."),
    }),

    execute: async ({ query }) => {
      try {
        const results = await searchDocuments(query);

        if (results.length === 0) {
          return "No relevant information found in the knowledge base.";
        }

        return results
          .map((result, index) => `[${index + 1}] ${result.content}`)
          .join("\n\n");
      } catch (error) {
        console.error("Search error:", error);
        return "Error searching the knowledge base.";
      }
    },
  }),
};

export async function POST(req: Request) {
  try {
    const { messages }: { messages: UIMessage[] } = await req.json();

    const result = streamText({
      model: openrouter(process.env.MODEL!),
      messages: await convertToModelMessages(messages),
      tools,
      system: `
        You are a helpful assistant with access to a knowledge base.
        When the user's question may be related to the knowledge base,
        always search the knowledge base before answering.Use the searchKnowledgeBase
         tool and answer based on its results.Keep the answer concise.
      `,
      stopWhen: stepCountIs(5),
    });

    return result.toUIMessageStreamResponse();
  } catch (error) {
    console.error("Error streaming chat completion", error);

    return new Response("Failed to stream chat completion", {
      status: 500,
    });
  }
}