"use client";

import { useState, Fragment } from "react";
import { useChat } from "@ai-sdk/react";

import {
  PromptInput,
  PromptInputBody,
  type PromptInputMessage,
  PromptInputSubmit,
  PromptInputTextarea,
  PromptInputTools,
} from "@/components/ai-elements/prompt-input";

import {
  Message,
  MessageContent,
  MessageResponse,
} from "@/components/ai-elements/message";

import {
  Conversation,
  ConversationContent,
  ConversationScrollButton,
} from "@/components/ai-elements/conversation";

export default function RAGChatBot() {
  const [input, setInput] = useState("");

  const { messages, sendMessage, status } = useChat({
    api: "/api/chat",
  });

  const handleSubmit = (message: PromptInputMessage) => {
    if (!message.text) return;

    sendMessage({
      text: message.text,
    });

    setInput("");
  };

  return (
    <div className="max-w-4xl mx-auto p-6 relative size-full h-[calc(100vh)]">
      <div className="flex flex-col h-full">

        <Conversation className="h-full">
          <ConversationContent>
            {messages.map((message) => (
              <div key={message.id}>
                {message.parts.map((part, index) => {
                  switch (part.type) {
                    case "text":
                      return (
                        <Fragment key={`${message.id}-${index}`}>
                          <Message from={message.role}>
                            <MessageContent>
                              <MessageResponse>
                                {part.text}
                              </MessageResponse>
                            </MessageContent>
                          </Message>
                        </Fragment>
                      );

                    default:
                      return null;
                  }
                })}
              </div>
            ))}
            {(status === "submitted" || status === "streaming") && (
              <div className="text-sm text-muted-foreground">
                AI is thinking...
              </div>
            )}
          </ConversationContent>

          <ConversationScrollButton />
        </Conversation>


        <PromptInput
          className="p-4 bg-gray-100"
          onSubmit={handleSubmit}
        >
          <PromptInputBody >

            <PromptInputTextarea 
              className="p-10"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask anything..."
            />

            <PromptInputTools>
             
            </PromptInputTools>

            <PromptInputSubmit/>

          </PromptInputBody>
        </PromptInput>

      </div>
    </div>
  );
}
