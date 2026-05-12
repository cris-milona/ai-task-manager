import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import Anthropic from "@anthropic-ai/sdk";
import { getMockTask } from "./mock/mockTasks";
import { taskSystemPrompt } from "./prompts/taskPrompt";

const app = express();
const isMock = process.env.MOCK_AI === "true";
const client = isMock ? null : new Anthropic();

app.use(express.json());
app.use(cors());

app.get("/", (_req, res) => {
  res.send("Server is running");
});

app.post("/parse-task", async (req, res) => {
  const { input } = req.body;

  if (!input || typeof input !== "string") {
    res.status(400).json({ error: "Input is required" });
    return;
  }

  if (isMock) {
    console.log("Returning static task for:", input);
    // small delay so it feels realistic
    await new Promise((r) => setTimeout(r, 600));
    res.json(getMockTask(input));
    return;
  }

  try {
    const message = await client!.messages.create({
      model: "claude-haiku-4-5-20251001",
      max_tokens: 1024,
      system: taskSystemPrompt,
      messages: [{ role: "user", content: input }],
    });

    const textBlock = message.content.find((b) => b.type === "text");
    if (!textBlock || textBlock.type !== "text") {
      throw new Error("No text response from Claude");
    }
    const parsed = JSON.parse(textBlock.text);
    // Attach a unique id if Claude didn't include one
    parsed.id = Date.now().toString();
    res.json(parsed);
  } catch (err) {
    console.error("Claude API error:", err);
    res.status(500).json({ error: "Failed to process task" });
  }
});

app.listen(3001, () => console.log("Server running on port 3001"));
console.log(`Server on port 3001 | AI: ${isMock ? "MOCK 🟡" : "LIVE 🟢"}`);
