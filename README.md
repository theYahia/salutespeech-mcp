# @theyahia/salutespeech-mcp

MCP-сервер для Sber SaluteSpeech API — распознавание и синтез речи. **2 инструмента.**

[![npm](https://img.shields.io/npm/v/@theyahia/salutespeech-mcp)](https://www.npmjs.com/package/@theyahia/salutespeech-mcp)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Часть серии [Russian API MCP](https://github.com/theYahia/russian-mcp) (50 серверов) by [@theYahia](https://github.com/theYahia).

## Установка

### Claude Desktop

```json
{
  "mcpServers": {
    "salutespeech": {
      "command": "npx",
      "args": ["-y", "@theyahia/salutespeech-mcp"],
      "env": { "SALUTE_AUTH_KEY": "your-auth-key" }
    }
  }
}
```

### Claude Code

```bash
claude mcp add salutespeech -e SALUTE_AUTH_KEY=your-auth-key -- npx -y @theyahia/salutespeech-mcp
```

### VS Code / Cursor

```json
{ "servers": { "salutespeech": { "command": "npx", "args": ["-y", "@theyahia/salutespeech-mcp"], "env": { "SALUTE_AUTH_KEY": "your-auth-key" } } } }
```

> Требуется `SALUTE_AUTH_KEY` (Base64-encoded `client_id:client_secret`). Получите на [developers.sber.ru](https://developers.sber.ru). Токены OAuth обновляются автоматически.

## Инструменты (2)

| Инструмент | Описание |
|------------|----------|
| `recognize_speech` | Распознавание речи из аудио (Base64) в текст |
| `synthesize_speech` | Синтез речи из текста, возвращает аудио в Base64 |

## Примеры

```
Распознай речь из аудиофайла
Синтезируй голосом Nec_24000 текст "Привет, как дела?"
```

## Лицензия

MIT
