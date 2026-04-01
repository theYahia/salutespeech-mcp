---
name: skill-transcribe
description: Transcribe audio to text using SaluteSpeech STT
tags: [speech, stt, transcription, audio]
---

# Transcribe Audio

Use the `recognize_speech` or `recognize_file` tool to transcribe audio into text.

## From file
```
Use recognize_file with file_path="/path/to/audio.wav" and language="ru-RU"
```

## From Base64
```
Use recognize_speech with audio_base64="..." and content_type="audio/wav"
```

## Supported formats
- WAV (audio/wav)
- OGG/Opus (audio/ogg;codecs=opus)
- MP3 (audio/mpeg)
- FLAC (audio/x-flac)

## Languages
- ru-RU (Russian, default)
- en-US (English)
- kk-KZ (Kazakh)

## Tips
- For telephony audio (8kHz), the API auto-selects the appropriate model
- Use `list_models` to see all available recognition models
- For long audio, use async recognition and check with `get_task_status`
