export default function Home() {
  return (
    <div style={{ padding: "40px", fontSize: "22px", color: "white" }}>
      <p>Welcome to Humans Together</p>
      <a
        href="/chat"
        style={{
          marginTop: "20px",
          display: "inline-block",
          padding: "10px 20px",
          background: "#444",
          borderRadius: "8px",
          color: "white",
        }}
      >
        Enter Chat
      </a>
    </div>
  );
}