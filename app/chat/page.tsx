"use client";
import { useState } from "react";

export default function ChatPage() {
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hi, I'm here with you. What's on your mind today?" }
  ]);

  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: "user", text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput("");

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage }),
      });

      const data = await res.json();
      setMessages(prev => [...prev, { sender: "bot", text: data.reply }]);
    } catch (error) {
      setMessages(prev => [
        ...prev,
        { sender: "bot", text: "Error: could not connect to AI." }
      ]);
    }
  };

  return (
    <div style={{ padding: "20px", color: "white" }}>
      <h2>Chat</h2>

      <div style={{ marginBottom: "20px" }}>
        {messages.map((m, i) => (
          <p key={i}>
            <strong>{m.sender}:</strong> {m.text}
          </p>
        ))}
      </div>

      <input
        style={{ padding: "10px", width: "300px", color: "black" }}
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />

      <button
        style={{ marginLeft: "10px", padding: "10px" }}
        onClick={sendMessage}
      >
        Send
      </button>
    </div>
  );
}