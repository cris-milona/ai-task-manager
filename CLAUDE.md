# AI Task Manager

An AI-powered task management web app that converts natural language input into structured, actionable plans using the Anthropic API (Claude Haiku).

## What it does

Users describe something they need to do in plain text. The AI structures it into a task with subtasks, priorities, and a suggested next step.

**Example:** "I need to prepare for a job interview next week" → structured task with subtasks like Research company, Practice questions, Update CV.

## Structure

```
/client   React + Vite + TypeScript frontend (port 5173)
/server   Express + TypeScript backend (port 3001)
/shared   Shared TypeScript types used by both client and server
```

## Running the project

```bash
pnpm dev        # runs client and server in parallel
```

## Mock vs Live AI

The server has a mock mode to avoid spending tokens during development.

```
# server/.env
ANTHROPIC_API_KEY=your_key
MOCK_AI=true     # true = mock data, false = real Claude API
```

When `MOCK_AI=true`, the `/parse-task` endpoint returns static data with a 600ms artificial delay. Switch to `false` to use the real Anthropic API.

## Shared types

Types live in `/shared` and are aliased as `@shared/*` in both the client TypeScript config and Vite config. Import as:

```ts
import { SomeType } from "@shared/types";
```
