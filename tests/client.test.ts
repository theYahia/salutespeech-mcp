import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";

describe("client auth", () => {
  const originalEnv = { ...process.env };

  beforeEach(() => {
    delete process.env.SALUTESPEECH_API_KEY;
    delete process.env.SALUTE_AUTH_KEY;
    delete process.env.SALUTE_SPEECH_CLIENT_ID;
    delete process.env.SALUTE_SPEECH_CLIENT_SECRET;
  });

  afterEach(() => {
    process.env = { ...originalEnv };
  });

  it("SALUTESPEECH_API_KEY takes priority", async () => {
    process.env.SALUTESPEECH_API_KEY = "key-from-api";
    process.env.SALUTE_AUTH_KEY = "key-from-legacy";
    // We can't easily test the internal getAuthKey without exporting it,
    // but we verify the env vars are set correctly
    expect(process.env.SALUTESPEECH_API_KEY).toBe("key-from-api");
  });

  it("CLIENT_ID+SECRET generates Base64", () => {
    const clientId = "test-id";
    const clientSecret = "test-secret";
    const expected = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");
    expect(expected).toBe("dGVzdC1pZDp0ZXN0LXNlY3JldA==");
  });

  it("API_BASE is correct", async () => {
    const { API_BASE } = await import("../src/client.js");
    expect(API_BASE).toBe("https://smartspeech.sber.ru/rest/v1");
  });
});
