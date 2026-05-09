"use client";

import { useState, FormEvent, useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import EmbedBox from "./Embed";

interface Message {
  sender: "user" | "bot" | "error";
  text: string;
}

interface ChatUIProps {
  botId: string;
}

export default function ChatUI({ botId }: ChatUIProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [userMsg, setUserMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const embedCode = `<script src="http://localhost:8000/widget.js" bot-id="${botId}"></script>`;

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const trimmedMsg = userMsg.trim();
    if (!trimmedMsg || loading) return;

    const userMessage: Message = { sender: "user", text: trimmedMsg };

    setMessages((prev) => [...prev, userMessage]);
    setUserMsg("");
    setLoading(true);

    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || "";

      const res = await fetch(`${API_URL}/chat/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          msg: trimmedMsg,
          bot_id: botId,
        }),
      });

      if (!res.ok) throw new Error("Failed to get response");

      const data = await res.json();

      const botMessage: Message = {
        sender: "bot",
        text: data.reply,
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { sender: "error", text: "Failed to get response from bot." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] max-w-2xl mx-auto my-8 p-4 bg-white rounded-2xl shadow-2xl border border-gray-200">
      <h2 className="text-2xl font-bold mb-4 text-gray-800 text-center border-b pb-4">
        Chat Bot
      </h2>

      <div className="grow p-4 rounded-xl overflow-y-auto bg-gray-50/50 space-y-4">
        {messages.map((m, i) => (
          <div
            key={i}
            className={`flex ${
              m.sender === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-md p-3 rounded-2xl shadow-sm ${
                m.sender === "user"
                  ? "bg-blue-600 text-white"
                  : m.sender === "bot"
                    ? "bg-gray-200 text-gray-800"
                    : "bg-red-100 text-red-700"
              }`}
            >
              {m.sender === "bot" ? (
                <div className="prose prose-sm max-w-none prose-headings:font-semibold prose-headings:text-gray-900 prose-p:leading-relaxed prose-pre:bg-gray-800 prose-pre:text-gray-100 prose-pre:rounded-lg prose-pre:p-3 prose-code:bg-gray-300 prose-code:text-gray-800 prose-code:rounded prose-code:px-1 prose-code:py-0.5 prose-code:text-xs prose-ul:list-disc prose-ul:pl-4 prose-ol:list-decimal prose-ol:pl-4 prose-li:my-0.5 prose-strong:font-semibold prose-blockquote:border-l-4 prose-blockquote:border-gray-400 prose-blockquote:pl-3 prose-blockquote:italic prose-blockquote:text-gray-600 prose-a:text-blue-600 prose-a:underline prose-hr:border-gray-300">
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {m.text}
                  </ReactMarkdown>
                </div>
              ) : (
                <p className="whitespace-pre-wrap">{m.text}</p>
              )}
            </div>
          </div>
        ))}
        {loading && (
          <div className="text-gray-500 text-sm">Bot is thinking...</div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSubmit} className="flex mt-4 gap-2">
        <input
          type="text"
          value={userMsg}
          onChange={(e) => setUserMsg(e.target.value)}
          placeholder="Ask your bot anything..."
          required
          disabled={loading}
          className="flex-1 border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold disabled:bg-blue-400"
        >
          {loading ? "..." : "Send"}
        </button>
      </form>
      <div>
        <EmbedBox embedCode={embedCode} />
      </div>
    </div>
  );
}