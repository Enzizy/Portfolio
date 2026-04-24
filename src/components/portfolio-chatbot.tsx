"use client";

import { FormEvent, useRef, useState } from "react";

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

const starterMessages: ChatMessage[] = [
  {
    role: "assistant",
    content:
      "Hi, I can answer questions about Rolex's projects, stack, availability, and contact details.",
  },
];

export default function PortfolioChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>(starterMessages);
  const [input, setInput] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  function openChat() {
    setIsOpen(true);
    window.setTimeout(() => inputRef.current?.focus(), 50);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const content = input.trim();
    if (!content || isSending) {
      return;
    }

    const nextMessages: ChatMessage[] = [...messages, { role: "user", content }];
    setMessages(nextMessages);
    setInput("");
    setIsSending(true);
    setError("");

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ messages: nextMessages.filter((message) => message.role !== "assistant" || message.content !== starterMessages[0].content) }),
      });

      const data = (await response.json()) as { reply?: string; error?: string };

      if (!response.ok || !data.reply) {
        throw new Error(data.error ?? "Chat request failed.");
      }

      setMessages((current) => [...current, { role: "assistant", content: data.reply as string }]);
    } catch (caughtError) {
      const message =
        caughtError instanceof Error ? caughtError.message : "Chat is unavailable right now.";
      setError(message);
      setMessages((current) => [
        ...current,
        {
          role: "assistant",
          content: "I could not answer that right now. Please try again in a moment.",
        },
      ]);
    } finally {
      setIsSending(false);
    }
  }

  return (
    <div className={`portfolio-chatbot ${isOpen ? "is-open" : ""}`}>
      {isOpen ? (
        <section className="chatbot-panel" aria-label="Portfolio chatbot">
          <div className="chatbot-header">
            <div>
              <p className="chatbot-kicker">Portfolio Assistant</p>
              <h2>Ask about Rolex</h2>
            </div>
            <button
              type="button"
              className="chatbot-icon-button"
              onClick={() => setIsOpen(false)}
              aria-label="Close chat"
              title="Close chat"
            >
              x
            </button>
          </div>

          <div className="chatbot-messages" aria-live="polite">
            {messages.map((message, index) => (
              <div
                key={`${message.role}-${index}-${message.content.slice(0, 12)}`}
                className={`chatbot-message chatbot-message--${message.role}`}
              >
                {message.content}
              </div>
            ))}
            {isSending ? <div className="chatbot-message chatbot-message--assistant">Thinking...</div> : null}
          </div>

          {error ? <p className="chatbot-error">{error}</p> : null}

          <form className="chatbot-form" onSubmit={handleSubmit}>
            <input
              ref={inputRef}
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder="Ask about projects or skills"
              maxLength={500}
              disabled={isSending}
              aria-label="Message"
            />
            <button type="submit" disabled={isSending || input.trim().length === 0}>
              Send
            </button>
          </form>
        </section>
      ) : null}

      <button
        type="button"
        className="chatbot-launcher"
        onClick={openChat}
        aria-label="Open portfolio chatbot"
      >
        Chat
      </button>
    </div>
  );
}
