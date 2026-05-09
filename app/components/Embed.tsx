import { useState } from "react";

type EmbedBoxProps = {
  embedCode: string;
};

export default function EmbedBox({ embedCode }: EmbedBoxProps) {
  const [copied, setCopied] = useState(false);

  const copyScript = async () => {
    try {
      await navigator.clipboard.writeText(embedCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      alert("Failed to copy script");
    }
  };

  return (
    <div className="mt-6 p-6 rounded-2xl border border-gray-200 shadow-sm bg-white transition-all duration-300 hover:shadow-md">
      
      <h3 className="text-lg font-semibold text-gray-800 mb-3">
        Embed this bot on your website
      </h3>

      <textarea
        readOnly
        value={embedCode}
        className="w-full h-24 p-3 rounded-lg border border-gray-300 bg-black text-sm font-mono text-yellow-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
      />

      <button
        onClick={copyScript}
        className={`mt-4 px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-300
        ${
          copied
            ? "bg-green-500 text-white"
            : "bg-blue-600 text-white hover:bg-blue-700 active:scale-95"
        }`}
      >
        {copied ? "Copied ✅" : "Copy Script"}
      </button>
    </div>
  );
}