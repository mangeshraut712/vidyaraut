# Vidya Raut Portfolio

[![CI](https://github.com/mangeshraut712/vidyaraut/actions/workflows/ci.yml/badge.svg?branch=main)](https://github.com/mangeshraut712/vidyaraut/actions/workflows/ci.yml)
![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178C6?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-06B6D4?logo=tailwindcss)
![FastAPI](https://img.shields.io/badge/FastAPI-optional-009688?logo=fastapi)

Multilingual portfolio website for Vidya Raut built with Next.js 16, React 19, TypeScript, Tailwind CSS, and a multi-agent chatbot with optional FastAPI support.

## Highlights

- Solid light and dark themes with a consistent editorial layout system
- Homepage-first navigation with dedicated `skills`, `projects`, and `certifications` subpages
- AI Agent Desk with four agents:
  - `Portfolio Guide`
  - `Energy Market Agent`
  - `Opportunity Advisor`
  - `Puzzle Helper`
- Inline Marathi crossword section below contact, with chatbot puzzle help
- English, Hindi, and Marathi routing with `next-intl`
- Optional FastAPI backend for chat proxying and backend deployment
- GitHub Actions CI for lint, type-check, build, and Python compile validation

## Technology Stack

### Frontend

- Next.js 16 App Router
- React 19
- TypeScript
- Tailwind CSS
- Framer Motion
- Radix UI primitives
- `next-intl`
- `next-themes`
- Lucide icons

### Backend / AI

- Next.js route handler at `/api/chat`
- Optional FastAPI service
- OpenAI Responses API support
- OpenRouter fallback support
- Remote upstream chat fallback for local and proxy scenarios

### Quality / Tooling

- ESLint
- TypeScript route-aware type checks
- GitHub Actions CI
- Vercel-ready Next.js build

## Main Features

### Portfolio Experience

- Clean homepage narrative with role, strengths, credentials, experience, education, contact, and game sections
- Shared heading alignment system:
  - centered for `skills`, `contact`, `game`
  - left-aligned for `projects`, `experience`, `education`
- Refined footer with brand, explore links, and direct contact CTA

### AI Chatbot

- Stable fixed chat shell that stays below the navbar
- Agent switching without header drift
- Welcome states per agent
- Quick actions
- Browser-native dictation support
- Puzzle-helper flow that works with pasted crossword clues

### Game Flow

- `Game` lives on the homepage below `Contact`
- `/[locale]/game` redirects to `/{locale}#game`
- Inline iframe load instead of separate page navigation
- Copy/paste helper workflow into chatbot

## Routes

- `/[locale]`
- `/[locale]/skills`
- `/[locale]/projects`
- `/[locale]/certifications`
- `/[locale]/game` -> redirects to `/{locale}#game`
- `/api/chat`

Supported locales:

- `en`
- `hi`
- `mr`

## Project Structure

```text
src/
  app/
    [locale]/
      page.tsx
      skills/page.tsx
      projects/page.tsx
      certifications/page.tsx
      game/page.tsx
    api/chat/route.ts
    globals.css
    layout.tsx
    page.tsx
    providers.tsx
    sitemap.ts
  components/
    AIChatbot.tsx
    Footer.tsx
    Game.tsx
    GlobalLayout.tsx
    Navigation.tsx
    PageBackButton.tsx
    ScrollToTop.tsx
    SectionIntro.tsx
    Timeline.tsx
    ui/
  i18n/
    config.ts
    request.ts
    routing.ts
    messages/
  lib/
    assistant-agents.ts
    collection-utils.ts
    data.ts
    legacy-data.ts
    openrouter.ts
```

## Installation

### Prerequisites

- Node.js 20+
- npm
- Python 3.11+ for the optional backend

### Frontend

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open:

- `http://localhost:3000/en`

### Optional FastAPI backend

```bash
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
uvicorn fastapi_backend.main:app --reload --host 127.0.0.1 --port 8000
```

Open:

- `http://127.0.0.1:8000/health`

## Environment Variables

Copy `.env.example` to `.env.local` and set only what you need.

```env
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_SITE_NAME=Vidya Raut Portfolio

OPENAI_API_KEY=
OPENAI_MODEL=gpt-5.4

OPENROUTER_API_KEY=
OPENROUTER_MODEL=openai/gpt-3.5-turbo

FASTAPI_URL=
FASTAPI_INTERNAL_TOKEN=

CHAT_UPSTREAM_URL=
FASTAPI_DEV_REWRITE=
```

### Config Notes

- `OPENAI_API_KEY` is optional
- `OPENROUTER_API_KEY` is optional
- `FASTAPI_URL` is optional
- `CHAT_UPSTREAM_URL` is optional
- `FASTAPI_DEV_REWRITE=true` enables direct Next.js rewrite to local FastAPI, but it is off by default to keep dev and production behavior aligned

## Chat Architecture

### Next.js `/api/chat` resolution order

1. Proxy to `FASTAPI_URL` if configured
2. Use local OpenAI or OpenRouter keys if available
3. In non-production, proxy to `CHAT_UPSTREAM_URL` or the default dev upstream
4. Fall back to deterministic local responses

### FastAPI backend behavior

The optional FastAPI backend:

- mirrors the same four-agent model as the frontend
- supports OpenAI Responses API
- supports OpenRouter fallback
- supports remote upstream chat fallback when local AI keys are absent
- exposes `/health` and `/chat`

## Usage Examples

### Health checks

```bash
curl http://localhost:3000/api/chat
curl http://127.0.0.1:8000/health
```

### Portfolio chatbot request

```bash
curl -X POST http://localhost:3000/api/chat \
  -H "content-type: application/json" \
  --data '{
    "agent": "portfolio",
    "messages": [
      { "role": "user", "content": "Give me a concise summary of Vidya Raut'\''s profile." }
    ]
  }'
```

### Puzzle helper request

```bash
curl -X POST http://localhost:3000/api/chat \
  -H "content-type: application/json" \
  --data '{
    "agent": "puzzle",
    "messages": [
      { "role": "user", "content": "Give me a hint for this crossword clue: storage market" }
    ]
  }'
```

## GitHub Actions

CI lives at:

- `.github/workflows/ci.yml`

The workflow runs on pushes and pull requests to `main` and checks:

- `npm ci`
- `pip install -r requirements.txt`
- `npm run lint`
- `npm run type-check`
- `npm run build`
- Python compile validation for:
  - `api/index.py`
  - `fastapi_backend/main.py`

## Vercel Deployment

### Recommended setup

Use Git integration with the repository:

- Framework preset: `Next.js`
- Build command: `npm run build`
- Node version: 20+

Current [vercel.json](./vercel.json):

```json
{
  "framework": "nextjs",
  "buildCommand": "npm run build"
}
```

### Next.js-only deployment

Set one of:

- `OPENAI_API_KEY`
- `OPENROUTER_API_KEY`

### Next.js + FastAPI deployment

1. Deploy the FastAPI backend separately
2. Set provider keys on the FastAPI service
3. Set `FASTAPI_URL` on the Next.js project
4. Optionally set matching `FASTAPI_INTERNAL_TOKEN` values on both services

## Quality Commands

```bash
npm run lint
npm run type-check
npm run build
npm audit --audit-level=moderate
./.venv/bin/python -m py_compile api/index.py fastapi_backend/main.py
```

## Recent Improvements

- consolidated the homepage as the main product surface
- moved the game section below contact
- stabilized chatbot layout and agent switching
- aligned heading behavior across active pages
- cleaned footer structure and CTA behavior
- added `puzzle` support to FastAPI
- added remote-upstream fallback to FastAPI health/chat
- removed unused legacy components
- cleaned generated cache artifacts and stray tracked files
- refreshed docs and deployment guidance

## Known Limitations

- The crossword iframe depends on:
  `https://marathigames.in/Crossword/crossword.html`
- Local chat is still fallback-only unless keys or an upstream are configured
- Chat rate limiting is currently in-memory

## Contributing

1. Branch from `main`
2. Keep changes small and consistent with the existing design system
3. Run:
   - `npm run lint`
   - `npm run type-check`
   - `npm run build`
4. If backend code changes, also run:
   - `./.venv/bin/python -m py_compile api/index.py fastapi_backend/main.py`
5. Update docs when routes, env vars, or behavior change
6. Open a PR with a concise summary and verification notes

## Release Checklist

- homepage loads at `/en`
- solid white/light and solid black/dark themes remain intact
- chatbot opens, switches agents, and sends messages
- `GET /api/chat` works
- `POST /api/chat` works
- FastAPI `/health` and `/chat` work if backend is enabled
- `/[locale]/game` redirects to `#game`
- footer links and CTA are correct
- CI, lint, type-check, build, and audit remain green
