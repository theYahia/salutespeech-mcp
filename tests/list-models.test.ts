import { describe, it, expect } from "vitest";
import { handleListModels } from "../src/tools/list-models.js";

describe("list_models", () => {
  it("returns all models when type=all", async () => {
    const result = JSON.parse(await handleListModels({ type: "all" }));
    expect(result.recognition_models).toBeDefined();
    expect(result.synthesis_voices).toBeDefined();
    expect(result.synthesis_formats).toEqual(["opus", "wav16", "pcm16"]);
    expect(result.recognition_models.length).toBeGreaterThan(0);
    expect(result.synthesis_voices.length).toBeGreaterThan(0);
  });

  it("returns only recognition models", async () => {
    const result = JSON.parse(await handleListModels({ type: "recognition" }));
    expect(result.recognition_models).toBeDefined();
    expect(result.synthesis_voices).toBeUndefined();
  });

  it("returns only synthesis voices", async () => {
    const result = JSON.parse(await handleListModels({ type: "synthesis" }));
    expect(result.synthesis_voices).toBeDefined();
    expect(result.recognition_models).toBeUndefined();
  });

  it("voices have required fields", async () => {
    const result = JSON.parse(await handleListModels({ type: "synthesis" }));
    for (const voice of result.synthesis_voices) {
      expect(voice).toHaveProperty("name");
      expect(voice).toHaveProperty("gender");
      expect(voice).toHaveProperty("language");
      expect(voice).toHaveProperty("description");
    }
  });
});
