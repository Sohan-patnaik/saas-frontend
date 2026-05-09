"use client";
import React from "react";

const Bot = () => {
  const [botReply, setBotReply] = React.useState(
    "Hello! How can I assist you today?"
  );
  const [audioUrl, setAudioUrl] = React.useState<string | null>(null);
  const [userMessage, setUserMessage] = React.useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch("http://127.0.0.1:8000/get", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ msg: userMessage, audio: true }), 
      });

      const data = await response.json();
      setBotReply(data.response); 
      setAudioUrl(data.audio);   
      setUserMessage("");   
    } catch (error) {
      console.error("Error fetching bot reply:", error);
    }
  };

  return (
    <div className="text-2xl flex justify-center items-center flex-col gap-4 h-screen bg-black text-white">
      <h2 className="text-amber-50">Bot</h2>
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          name="message"
          placeholder="Type your message..."
          value={userMessage}
          onChange={(e) => setUserMessage(e.target.value)}
          className="px-2 py-1 rounded text-black"
        />
        <button
          type="submit"
          className="px-4 py-1 bg-amber-500 text-black rounded"
        >
          Send
        </button>
      </form>
      <div className="mt-4">
        <p>Bot Reply: {botReply}</p>
        {audioUrl && <audio controls src={audioUrl} />}
      </div>
    </div>
  );
};

export default Bot;
