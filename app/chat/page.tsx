"use client";
import { useState } from "react";

export default function ChatPage() {
  const [message, setMessage] = useState("");
  const [reply, setReply] = useState("");

  async function sendMessage() {
    if (!message.trim()) return;

    const res = await fetch("/api", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message }),
    });

    const data = await res.json();
    setReply(data.reply || "Error");
  }

  return (
    <div
      style={{
        maxWidth: "600px",
        margin: "80px auto",
        padding: "20px",
        fontFamily: "sans-serif",
      }}
    >
      <h1 style={{ marginBottom: "20px" }}>Chat</h1>

      {reply && (
        <p style={{ marginBottom: "20px", color: "#ccc" }}>
          <strong>bot:</strong> {reply}
        </p>
      )}

      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type your message..."
        style={{
          width: "100%",
          height: "100px",
          padding: "10px",
          marginBottom: "10px",
          fontSize: "16px",
        }}
      />

      <button
        onClick={sendMessage}
        style={{
          padding: "12px 20px",
          fontSize: "16px",
          background: "#333",
          color: "white",
          border: "none",
          cursor: "pointer",
        }}
      >
        Send
      </button>
    </div>
  );
}