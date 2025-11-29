"use client";

import { useState } from "react";

export default function ChatPage() {
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hi, I’m here with you. What’s on your mind today?" }
  ]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMsg = { sender: "user", text: input };
    setMessages([...messages, userMsg]);

    setInput("");

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input })
      });

      const data = await res.json();

      const botMsg = { sender: "bot", text: data.reply || "..." };
      setMessages((prev) => [...prev, botMsg]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "Sorry, something went wrong." }
      ]);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.chatBox}>
        {messages.map((msg, i) => (
          <div
            key={i}
            style={{
              ...styles.message,
              ...(msg.sender === "user"
                ? styles.userBubble
                : styles.botBubble)
            }}
          >
            {msg.text}
          </div>
        ))}
      </div>

      <div style={styles.inputRow}>
        <input
          style={styles.input}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
        />

        <button style={styles.button} onClick={sendMessage}>
          Send
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    background: "#111",
    minHeight: "100vh",
    padding: "20px",
    color: "white",
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  chatBox: {
    width: "100%",
    maxWidth: "600px",
    height: "70vh",
    overflowY: "auto",
    background: "#1a1a1a",
    borderRadius: "12px",
    padding: "15px",
    marginBottom: "20px"
  },
  message: {
    padding: "10px 14px",
    margin: "8px 0",
    borderRadius: "12px",
    maxWidth: "80%",
    fontSize: "16px",
    lineHeight: "22px"
  },
  userBubble: {
    background: "#4e8cff",
    alignSelf: "flex-end",
    marginLeft: "auto"
  },
  botBubble: {
    background: "#363636",
    alignSelf: "flex-start",
    marginRight: "auto"
  },
  inputRow: {
    width: "100%",
    maxWidth: "600px",
    display: "flex"
  },
  input: {
    flex: 1,
    padding: "12px",
    borderRadius: "8px",
    border: "none",
    marginRight: "10px",
    fontSize: "16px"
  },
  button: {
    padding: "12px 20px",
    background: "#4e8cff",
    border: "none",
    color: "white",
    borderRadius: "8px",
    cursor: "pointer"
  }
};