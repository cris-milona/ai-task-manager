# Server

Express + TypeScript backend. Runs on port 3001.

## Stack

- Express 5, TypeScript, tsx (for dev with watch mode)
- Anthropic SDK (`@anthropic-ai/sdk`) for Claude API calls
- dotenv, cors

## Environment variables

```
# .env
ANTHROPIC_API_KEY=your_key
MOCK_AI=true     # true = mock data, false = live Claude API
```

Never commit `.env`. Switch `MOCK_AI=false` only when testing real AI responses.

## Main endpoint

### `POST /parse-task`

Accepts a natural language string and returns a structured task object.

**Request:**

```json
{ "input": "I need to prepare for a job interview next week" }
```

**Response:**

```json
{
  "id": "1234567890",
  "title": "Prepare for job interview",
  "subtasks": [
    {
      "id": "1",
      "title": "Research company",
      "priority": "high",
      "completed": false
    },
    {
      "id": "2",
      "title": "Practice interview questions",
      "priority": "high",
      "completed": false
    }
  ]
}
```

In mock mode returns static data after a 600ms delay. In live mode calls Claude Haiku and parses the JSON response.

## AI behavior (taskSystemPrompt)

Claude is instructed to return ONLY valid JSON — no markdown, no explanation. The shape is: `title`, `subtasks[]` (each with `id`, `title`, `priority`, `completed`). 3–6 subtasks with realistic priorities. The server attaches a `Date.now()` id after parsing.

Model used: `claude-haiku-4-5-20251001`

## Dev scripts

```bash
pnpm dev    # tsx watch index.ts
pnpm clean  # rm -rf node_modules
```
