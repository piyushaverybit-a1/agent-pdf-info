import { streamText, UIMessage, convertToModelMessages } from "ai";
import { createOpenRouter, openrouter } from "@openrouter/ai-sdk-provider";

export async function POST(req: Request) {
  try {
    const { messages }: { messages: UIMessage[] } = await req.json();

    const result = streamText({
      model: openrouter(process.env.MODEL!),
      messages: await convertToModelMessages(messages),
    });

    return result.toUIMessageStreamResponse();
  } catch (error) {
    console.error("Error streaming chat completion", error);
    return new Response("Failed to stream chat completion", { status: 500 });
  }
}