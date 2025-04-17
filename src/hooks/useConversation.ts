import { useState } from "react";
import * as webllm from "@mlc-ai/web-llm";

export interface ChatMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

export interface ConversationState {
  latexOutput: string;
  isLoading: boolean;
  hasPreviousExpression: boolean;
  conversationHistory: ChatMessage[];
  sendToLLM: (text: string) => Promise<void>;
  resetConversation: () => void;
}

export function useConversation(engine: webllm.MLCEngine | null): ConversationState {
  const [latexOutput, setLatexOutput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [hasPreviousExpression, setHasPreviousExpression] = useState(false);
  const [conversationHistory, setConversationHistory] = useState<ChatMessage[]>([
    {
      role: "system",
      content: `You are a LaTeX expression generator. Convert the user's spoken math description into a valid LaTeX expression. Return ONLY the LaTeX code without any explanations, markdown formatting, or backticks. Do not include any text before or after the LaTeX expression. Do not include any $ symbols.`,
    },
  ]);

  // Send text to LLM
  const sendToLLM = async (text: string) => {
    if (!text.trim() || !engine) return;

    setIsLoading(true);
    
    try {
      console.log("Sending to LLM:", text);

      // Create the user message based on whether we're creating a new expression or modifying an existing one
      const userMessage: ChatMessage = {
        role: "user",
        content: hasPreviousExpression
          ? `Modify the previous LaTeX expression based on this instruction: "${text.trim()}"`
          : `Convert this math description to LaTeX: "${text.trim()}"`,
      };

      // Add the user message to conversation history
      const updatedHistory = [...conversationHistory, userMessage];
      setConversationHistory(updatedHistory);

      // Use streaming for better user experience
      const chunks = await engine.chat.completions.create({
        messages: updatedHistory,
        temperature: 0.3,
        stream: true,
      });

      let fullResponse = "";
      for await (const chunk of chunks) {
        const content = chunk.choices[0]?.delta.content || "";
        fullResponse += content;
        setLatexOutput(fullResponse);
      }

      // Add the assistant's response to the conversation history
      setConversationHistory([
        ...updatedHistory,
        { role: "assistant", content: fullResponse },
      ]);
      
      // Now we have a previous expression
      setHasPreviousExpression(true);

      console.log("LaTeX generation complete");
    } catch (error) {
      console.error("Error generating LaTeX:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Reset the conversation and latex output
  const resetConversation = () => {
    setLatexOutput("");
    setHasPreviousExpression(false);
    setConversationHistory([
      {
        role: "system",
        content: `You are a LaTeX expression generator. Convert the user's spoken math description into a valid LaTeX expression. Return ONLY the LaTeX code without any explanations, markdown formatting, or backticks. Do not include any text before or after the LaTeX expression. Do not include any $ symbols.`,
      },
    ]);
  };

  return {
    latexOutput,
    isLoading,
    hasPreviousExpression,
    conversationHistory,
    sendToLLM,
    resetConversation
  };
}
