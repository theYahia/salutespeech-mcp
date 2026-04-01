#!/usr/bin/env node

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js";
import { createServer } from "node:http";
import { recognizeSpeechSchema, handleRecognizeSpeech } from "./tools/recognize.js";
import { synthesizeSpeechSchema, handleSynthesizeSpeech } from "./tools/synthesize.js";
import { listModelsSchema, handleListModels } from "./tools/list-models.js";
import { getTaskStatusSchema, handleGetTaskStatus } from "./tools/get-task-status.js";
import { recognizeFileSchema, handleRecognizeFile } from "./tools/recognize-file.js";

const VERSION = "1.1.0";

function createMcpServer(): McpServer {
  const server = new McpServer({
    name: "salutespeech-mcp",
    version: VERSION,
  });

  server.tool(
    "recognize_speech",
    "Speech recognition via SaluteSpeech. Accepts Base64 audio, returns text transcription.",
    recognizeSpeechSchema.shape,
    async (params) => ({ content: [{ type: "text", text: await handleRecognizeSpeech(params) }] }),
  );

  server.tool(
    "synthesize_speech",
    "Text-to-speech via SaluteSpeech. Accepts text, returns Base64-encoded audio.",
    synthesizeSpeechSchema.shape,
    async (params) => ({ content: [{ type: "text", text: await handleSynthesizeSpeech(params) }] }),
  );

  server.tool(
    "list_models",
    "List available SaluteSpeech models and voices for recognition and synthesis.",
    listModelsSchema.shape,
    async (params) => ({ content: [{ type: "text", text: await handleListModels(params) }] }),
  );

  server.tool(
    "get_task_status",
    "Check status of an async SaluteSpeech recognition task by ID.",
    getTaskStatusSchema.shape,
    async (params) => ({ content: [{ type: "text", text: await handleGetTaskStatus(params) }] }),
  );

  server.tool(
    "recognize_file",
    "Recognize speech from a local audio file. Auto-detects format from extension.",
    recognizeFileSchema.shape,
    async (params) => ({ content: [{ type: "text", text: await handleRecognizeFile(params) }] }),
  );

  return server;
}

async function main() {
  const args = process.argv.slice(2);
  const useHttp = args.includes("--http");
  const port = parseInt(args.find(a => a.startsWith("--port="))?.split("=")[1] || "3000", 10);

  const server = createMcpServer();

  if (useHttp) {
    const transport = new StreamableHTTPServerTransport({ sessionIdGenerator: () => crypto.randomUUID() });
    const httpServer = createServer(async (req, res) => {
      const url = new URL(req.url || "/", `http://localhost:${port}`);
      if (url.pathname === "/mcp") {
        await transport.handleRequest(req, res);
      } else if (url.pathname === "/health") {
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ status: "ok", version: VERSION, tools: 5 }));
      } else {
        res.writeHead(404);
        res.end("Not Found");
      }
    });
    await server.connect(transport);
    httpServer.listen(port, () => {
      console.error(`[salutespeech-mcp] HTTP server on port ${port}. 5 tools. POST /mcp`);
    });
  } else {
    const transport = new StdioServerTransport();
    await server.connect(transport);
    console.error(`[salutespeech-mcp] Server started (stdio). 5 tools. v${VERSION}`);
  }
}

main().catch((error) => {
  console.error("[salutespeech-mcp] Error:", error);
  process.exit(1);
});
