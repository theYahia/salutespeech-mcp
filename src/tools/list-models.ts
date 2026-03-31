import { z } from "zod";

export const listModelsSchema = z.object({
  type: z.enum(["recognition", "synthesis", "all"]).default("all").describe("Filter by model type: recognition, synthesis, or all"),
});

const RECOGNITION_MODELS = [
  { name: "general", sample_rate: 16000, languages: ["ru-RU"], description: "General-purpose Russian recognition" },
  { name: "general", sample_rate: 8000, languages: ["ru-RU"], description: "General-purpose Russian (8kHz, telephony)" },
  { name: "general", sample_rate: 16000, languages: ["en-US"], description: "General-purpose English recognition" },
  { name: "general", sample_rate: 16000, languages: ["kk-KZ"], description: "General-purpose Kazakh recognition" },
];

const SYNTHESIS_VOICES = [
  { name: "Nec_24000", gender: "female", language: "ru-RU", description: "Neutral female voice" },
  { name: "Bys_24000", gender: "male", language: "ru-RU", description: "Business male voice" },
  { name: "May_24000", gender: "female", language: "ru-RU", description: "Young female voice" },
  { name: "Tur_24000", gender: "male", language: "ru-RU", description: "Deep male voice" },
  { name: "Ost_24000", gender: "female", language: "ru-RU", description: "Calm female voice" },
  { name: "Pon_24000", gender: "male", language: "ru-RU", description: "Young male voice" },
];

export async function handleListModels(params: z.infer<typeof listModelsSchema>): Promise<string> {
  const result: Record<string, unknown> = {};
  if (params.type === "recognition" || params.type === "all") {
    result.recognition_models = RECOGNITION_MODELS;
  }
  if (params.type === "synthesis" || params.type === "all") {
    result.synthesis_voices = SYNTHESIS_VOICES;
    result.synthesis_formats = ["opus", "wav16", "pcm16"];
  }
  return JSON.stringify(result, null, 2);
}
