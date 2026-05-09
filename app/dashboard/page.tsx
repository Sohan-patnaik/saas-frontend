"use client";

import React from "react";
import { useRouter } from "next/navigation";

export default function CreateBotPage() {
  const [botName, setBotName] = React.useState("");
  const [file, setFile] = React.useState<File | null>(null);
  const [description, setDescription] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!botName || !file) {
      setMessage("Please provide a bot name and a file");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const formData = new FormData();
      formData.append("bot_name", botName);
      formData.append("description", description);
      formData.append("file", file);

      const res = await fetch("http://127.0.0.1:8000/create-bot/create-bot", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (res.ok && data.bot?.[0]) {
        const createdBot = data.bot[0];
        setMessage(`Bot "${createdBot.name}" created successfully!`);
        setBotName("");
        setFile(null);
        setDescription("");

       
        router.push(`/chat/${createdBot.bot_id}`);
      } else {
        setMessage(`Error: ${data.error || "Failed to create bot"}`);
      }
    } catch (err) {
      console.error(err);
      setMessage("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-start gap-8 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 p-8 text-white">
      <h1 className="text-4xl font-extrabold tracking-wide">Create Your Personal AI assistant</h1>

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white/10 backdrop-blur-md p-6 rounded-2xl shadow-xl flex flex-col gap-4"
      >
        <label htmlFor="botName" className="font-medium">
          Enter the bot name
        </label>
        <input
          id="botName"
          type="text"
          placeholder="Bot Name"
          className="px-4 py-2 rounded-md bg-white/20 focus:bg-white/30 placeholder-gray-200 outline-none"
          value={botName}
          onChange={(e) => setBotName(e.target.value)}
          required
        />

        <label htmlFor="botData" className="font-medium">
          Upload data
        </label>
        <input
          id="botData"
          type="file"
          accept=".pdf"
          className="block w-full text-sm text-gray-200
                     file:mr-4 file:py-2 file:px-4
                     file:rounded-md file:border-0
                     file:text-sm file:font-semibold
                     file:bg-white/30 file:text-white
                     hover:file:bg-white/40"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
          required
        />

        <label htmlFor="botDescription" className="font-medium">
          Enter bot description (optional)
        </label>
        <textarea
          id="botDescription"
          name="description"
          placeholder="Describe your bot..."
          className="px-4 py-2 rounded-md bg-white/20 focus:bg-white/30 placeholder-gray-200 outline-none resize-none h-24"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <button
          type="submit"
          disabled={loading}
          className="mt-4 px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-500 hover:opacity-90 rounded-xl font-semibold transition disabled:opacity-50"
        >
          {loading ? "Creating..." : "Create Bot"}
        </button>

        {message && <p className="text-yellow-300 mt-2">{message}</p>}
      </form>
    </div>
  );
}
