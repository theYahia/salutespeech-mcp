# @theyahia/salutespeech-mcp

MCP server for Sber SaluteSpeech API — speech recognition (STT) and synthesis (TTS). **5 tools.**

[![npm](https://img.shields.io/npm/v/@theyahia/salutespeech-mcp)](https://www.npmjs.com/package/@theyahia/salutespeech-mcp)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Part of [Russian API MCP](https://github.com/theYahia/russian-mcp) (50 servers) by [@theYahia](https://github.com/theYahia).

## Install

### Claude Desktop

```json
{
  "mcpServers": {
    "salutespeech": {
      "command": "npx",
      "args": ["-y", "@theyahia/salutespeech-mcp"],
      "env": { "SALUTESPEECH_API_KEY": "your-base64-key" }
    }
  }
}
```

### Claude Code

```bash
claude mcp add salutespeech -e SALUTESPEECH_API_KEY=your-key -- npx -y @theyahia/salutespeech-mcp
```

### Streamable HTTP mode

```bash
SALUTESPEECH_API_KEY=your-key npx @theyahia/salutespeech-mcp --http --port=3000
# POST http://localhost:3000/mcp
# GET  http://localhost:3000/health
```

## Auth

Three options (checked in order):

| Env var | Format |
|---------|--------|
| `SALUTESPEECH_API_KEY` | Base64-encoded `client_id:client_secret` |
| `SALUTE_AUTH_KEY` | Same (legacy alias) |
| `SALUTE_SPEECH_CLIENT_ID` + `SALUTE_SPEECH_CLIENT_SECRET` | Raw credentials (auto-encoded) |

OAuth tokens (scope `SALUTE_SPEECH_PERS`) are obtained and refreshed automatically.
Get credentials at [developers.sber.ru](https://developers.sber.ru).

## Tools (5)

| Tool | Description |
|------|-------------|
| `recognize_speech` | STT from Base64 audio |
| `synthesize_speech` | TTS, returns Base64 audio |
| `list_models` | List recognition models and synthesis voices |
| `get_task_status` | Check async recognition task status |
| `recognize_file` | STT from a local file path |

## Skills

- `skill-transcribe` — guided workflow for audio transcription
- `skill-synthesize` — guided workflow for speech synthesis

## Examples

```
Transcribe the audio file /tmp/meeting.wav
Synthesize "Hello world" with voice Bys_24000 in wav16 format
List available voices
```

## License

MIT
