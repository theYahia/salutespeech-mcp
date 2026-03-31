import { z } from "zod";
import { salutePost } from "../client.js";

export const recognizeSpeechSchema = z.object({
  audio_base64: z.string().describe("Аудиоданные в формате Base64"),
  content_type: z.string().default("audio/wav").describe("MIME-тип аудио (audio/wav, audio/ogg;codecs=opus, audio/mpeg)"),
  language: z.string().default("ru-RU").describe("Язык распознавания"),
});

export async function handleRecognizeSpeech(params: z.infer<typeof recognizeSpeechSchema>): Promise<string> {
  const audioBuffer = Buffer.from(params.audio_base64, "base64");
  const response = await salutePost(
    `/speech:recognize?language=${encodeURIComponent(params.language)}`,
    audioBuffer,
    params.content_type,
  );
  const result = await response.json();
  return JSON.stringify(result, null, 2);
}
