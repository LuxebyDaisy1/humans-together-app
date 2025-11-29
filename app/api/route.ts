import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { message } = await req.json();

    if (!process.env.OPENAI_API_KEY) {
      console.error("Missing OPENAI_API_KEY");
      return NextResponse.json(
        { error: "Missing API key" },
        { status: 500 }
      );
    }

    const apiRes = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: "You are a warm emotional support companion. Always respond with empathy, clarity, and compassion." },
          { role: "user", content: message },
        ],
      }),
    });

    if (!apiRes.ok) {
      const err = await apiRes.text();
      console.error("API ERROR:", err);
      return NextResponse.json(
        { error: "OpenAI API error", details: err },
        { status: 500 }
      );
    }

    const data = await apiRes.json();
    const aiReply = data.choices?.[0]?.message?.content || "I'm here with you.";

    return NextResponse.json({ reply: aiReply });

  } catch (error) {
    console.error("SERVER ERROR:", error);
    return NextResponse.json(
      { error: "Server failure", details: String(error) },
      { status: 500 }
    );
  }
}