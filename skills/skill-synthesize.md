---
name: skill-synthesize
description: Convert text to speech using SaluteSpeech TTS
tags: [speech, tts, synthesis, voice]
---

# Synthesize Speech

Use the `synthesize_speech` tool to convert text into audio.

## Basic usage
```
Use synthesize_speech with text="Привет, мир!" and voice="Nec_24000"
```

## Available voices
| Voice | Gender | Style |
|-------|--------|-------|
| Nec_24000 | Female | Neutral |
| Bys_24000 | Male | Business |
| May_24000 | Female | Young |
| Tur_24000 | Male | Deep |
| Ost_24000 | Female | Calm |
| Pon_24000 | Male | Young |

## Output formats
- `opus` (default, smallest size)
- `wav16` (uncompressed 16kHz WAV)
- `pcm16` (raw PCM 16kHz)

## Tips
- Use `list_models` to see all voices with descriptions
- The output is Base64-encoded audio data
- Opus format is recommended for smallest file size
