import { NextResponse } from "next/server";
import { profile } from "@/data/profile";
import { featuredProjects } from "@/data/projects";
import { skillCategories } from "@/data/skills";

type ChatRole = "user" | "assistant";

type ClientMessage = {
  role: ChatRole;
  content: string;
};

type DeepSeekChoice = {
  message?: {
    content?: string;
  };
};

type DeepSeekResponse = {
  choices?: DeepSeekChoice[];
  error?: {
    message?: string;
  };
};

const DEEPSEEK_URL = "https://api.deepseek.com/chat/completions";

function isClientMessage(value: unknown): value is ClientMessage {
  if (!value || typeof value !== "object") {
    return false;
  }

  const message = value as Record<string, unknown>;
  return (
    (message.role === "user" || message.role === "assistant") &&
    typeof message.content === "string" &&
    message.content.trim().length > 0
  );
}

function getPortfolioContext() {
  const projectSummary = featuredProjects
    .map((project) => {
      return `${project.name}: ${project.shortDescription} Tech: ${project.tech.join(", ")}. Highlights: ${project.highlights.join("; ")}.`;
    })
    .join("\n");

  const skills = skillCategories
    .map((group) => `${group.category}: ${group.items.join(", ")}`)
    .join("\n");

  return `
You are the chatbot on Rolex Zhyronne Batican's developer portfolio.
Answer as a concise, helpful portfolio assistant. Keep replies under 120 words unless the visitor asks for detail.
Use the available portfolio facts. Do not invent links, employers, degrees, or project claims.

Profile:
Name: ${profile.fullName}
Display name: ${profile.displayName}
Status: ${profile.status}
Location: ${profile.location}
Availability: ${profile.availability}
Main focus: ${profile.mainFocus}
Email: ${profile.email}
GitHub: ${profile.githubUrl}
Bio: ${profile.bio}

Skills:
${skills}

Projects:
${projectSummary}
`;
}

export async function POST(request: Request) {
  const apiKey = process.env.DEEPSEEK_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      { error: "Chat is not configured yet. Missing DEEPSEEK_API_KEY." },
      { status: 500 },
    );
  }

  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON request." }, { status: 400 });
  }

  const rawMessages = (body as { messages?: unknown }).messages;

  if (!Array.isArray(rawMessages)) {
    return NextResponse.json({ error: "Messages are required." }, { status: 400 });
  }

  const messages = rawMessages
    .filter(isClientMessage)
    .slice(-10)
    .map((message) => ({
      role: message.role,
      content: message.content.trim().slice(0, 1200),
    }));

  if (messages.length === 0 || messages[messages.length - 1].role !== "user") {
    return NextResponse.json({ error: "A user message is required." }, { status: 400 });
  }

  try {
    const response = await fetch(DEEPSEEK_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "deepseek-chat",
        messages: [{ role: "system", content: getPortfolioContext() }, ...messages],
        temperature: 0.4,
        max_tokens: 450,
        stream: false,
      }),
    });

    const data = (await response.json()) as DeepSeekResponse;

    if (!response.ok) {
      return NextResponse.json(
        { error: data.error?.message ?? "DeepSeek request failed." },
        { status: response.status },
      );
    }

    const reply = data.choices?.[0]?.message?.content?.trim();

    if (!reply) {
      return NextResponse.json({ error: "DeepSeek returned an empty response." }, { status: 502 });
    }

    return NextResponse.json({ reply });
  } catch {
    return NextResponse.json({ error: "Unable to reach DeepSeek right now." }, { status: 502 });
  }
}
