import { z } from "zod";
import { salutePost } from "../client.js";

export const synthesizeSpeechSchema = z.object({
  text: z.string().describe("Текст для синтеза речи"),
  voice: z.string().default("Nec_24000").describe("Голос синтеза (Nec_24000, Bys_24000, May_24000, Tur_24000, Ost_24000, Pon_24000)"),
  format: z.string().default("opus").describe("Формат аудио (opus, wav16, pcm16)"),
});

export async function handleSynthesizeSpeech(params: z.infer<typeof synthesizeSpeechSchema>): Promise<string> {
  const response = await salutePost(
    `/speech:synthesize?voice=${encodeURIComponent(params.voice)}&format=${encodeURIComponent(params.format)}`,
    params.text,
    "application/text",
  );
  const arrayBuffer = await response.arrayBuffer();
  const base64 = Buffer.from(arrayBuffer).toString("base64");
  return JSON.stringify({
    audio_base64: base64,
    format: params.format,
    voice: params.voice,
    size_bytes: arrayBuffer.byteLength,
  }, null, 2);
}
