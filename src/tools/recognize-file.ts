import { z } from "zod";
import { readFile } from "node:fs/promises";
import { extname } from "node:path";
import { salutePost } from "../client.js";

export const recognizeFileSchema = z.object({
  file_path: z.string().describe("Absolute path to the audio file to recognize"),
  language: z.string().default("ru-RU").describe("Recognition language (ru-RU, en-US, kk-KZ)"),
});

const EXT_TO_MIME: Record<string, string> = {
  ".wav": "audio/wav",
  ".ogg": "audio/ogg;codecs=opus",
  ".opus": "audio/ogg;codecs=opus",
  ".mp3": "audio/mpeg",
  ".flac": "audio/x-flac",
  ".pcm": "audio/x-pcm",
};

export async function handleRecognizeFile(params: z.infer<typeof recognizeFileSchema>): Promise<string> {
  const fileBuffer = await readFile(params.file_path);
  const ext = extname(params.file_path).toLowerCase();
  const contentType = EXT_TO_MIME[ext] || "audio/wav";

  const response = await salutePost(
    `/speech:recognize?language=${encodeURIComponent(params.language)}`,
    fileBuffer,
    contentType,
  );
  const result = await response.json();
  return JSON.stringify({ ...result as object, file: params.file_path, content_type: contentType }, null, 2);
}
