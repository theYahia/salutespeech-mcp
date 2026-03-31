#!/usr/bin/env node

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { recognizeSpeechSchema, handleRecognizeSpeech } from "./tools/recognize.js";
import { synthesizeSpeechSchema, handleSynthesizeSpeech } from "./tools/synthesize.js";

const server = new McpServer({
  name: "salutespeech-mcp",
  version: "1.0.0",
});

server.tool(
  "recognize_speech",
  "Распознавание речи через SaluteSpeech. Принимает аудио в Base64, возвращает текст.",
  recognizeSpeechSchema.shape,
  async (params) => ({ content: [{ type: "text", text: await handleRecognizeSpeech(params) }] }),
);

server.tool(
  "synthesize_speech",
  "Синтез речи через SaluteSpeech. Принимает текст, возвращает аудио в Base64.",
  synthesizeSpeechSchema.shape,
  async (params) => ({ content: [{ type: "text", text: await handleSynthesizeSpeech(params) }] }),
);

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("[salutespeech-mcp] Сервер запущен. 2 инструмента. Требуется SALUTE_AUTH_KEY.");
}

main().catch((error) => {
  console.error("[salutespeech-mcp] Ошибка:", error);
  process.exit(1);
});
