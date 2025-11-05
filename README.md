# Legal AI Agent System

Production-quality, modular multi-agent legal AI using LangChain and LangGraph. Ships a Next.js UI and API with safety and pluggable connectors. This is an educational demo and not legal advice.

## Quick Start

- Install: `npm install`
- Dev: `npm run dev`
- Test: `npm test`
- Build: `npm run build`

## API

POST `/api/agent`
```json
{ "task": "Summarize this case" }
```
Returns `{ output, trace }`.

## Notes
- Uses a deterministic mock model by default to avoid external API keys; wire a real model in `lib/llm.ts` if desired.
- Includes basic safety checks and disclaimers.
