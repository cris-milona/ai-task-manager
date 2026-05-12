# Client

React + Vite + TypeScript frontend. Runs on port 5173.

## Stack

- React 19, React Router, MUI (Material UI) with Emotion
- Vite 8, TypeScript 6
- No state management library — local React state only

## Key config

**Path alias:** `@shared/*` resolves to `../shared/*`. Configured in both `vite.config.ts` (for bundling) and `tsconfig.app.json` (for type checking). Do not add it to `tsconfig.node.json` — that file only covers `vite.config.ts` itself.

```ts
import { Something } from "@shared/types"; // correct
import { Something } from "shared/types"; // wrong
```

## Dev server

```bash
pnpm dev    # starts Vite on port 5173
pnpm build  # tsc -b && vite build
pnpm lint   # eslint
pnpm clean  # rm -rf node_modules
```

## API

All requests go to the Express server on `http://localhost:3001`. No environment variable needed — the base URL is hardcoded for local development.
