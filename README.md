<div align="center">

# Vidya Raut Portfolio

[![CI](https://github.com/mangeshraut712/vidyaraut/actions/workflows/ci.yml/badge.svg?branch=main)](https://github.com/mangeshraut712/vidyaraut/actions/workflows/ci.yml)
![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178C6?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-06B6D4?logo=tailwindcss)
![FastAPI](https://img.shields.io/badge/FastAPI-Optional-009688?logo=fastapi)
![Vercel](https://img.shields.io/badge/Deploy-Vercel-black?logo=vercel)

Multilingual portfolio website for Vidya Raut with an AI-powered agent desk, interactive puzzle section, and optional FastAPI backend support.

[Live Site](https://vidyaraut.vercel.app) • [LinkedIn](https://www.linkedin.com/in/vidyaraut17/) • [Email](mailto:vidyaraut17297@gmail.com)

</div>

---

## 📌 Table Of Contents

- [✨ Overview](#-overview)
- [🧩 Problem It Solves](#-problem-it-solves)
- [🚀 Key Features](#-key-features)
- [🛠️ Technology Stack](#️-technology-stack)
- [🖼️ Visual Preview](#️-visual-preview)
- [📁 Project Structure](#-project-structure)
- [⚙️ Installation](#️-installation)
- [🔐 Configuration](#-configuration)
- [💬 Usage Examples](#-usage-examples)
- [🧪 Quality Checks](#-quality-checks)
- [🔄 GitHub Actions](#-github-actions)
- [▲ Vercel Deployment](#-vercel-deployment)
- [🤝 Contributing](#-contributing)
- [📄 License](#-license)
- [📬 Contact](#-contact)

## ✨ Overview

`vidyaraut` is a polished personal portfolio application for Vidya Raut, designed to do more than present a static resume. It combines:

- a multilingual portfolio experience
- a structured homepage-first narrative
- an AI chatbot with domain-specific agents
- an inline Marathi crossword section
- optional FastAPI backend support for chat features

The project is built for recruiters, collaborators, customers, and visitors who want to understand Vidya's background, strengths, project fit, and domain knowledge quickly.

## 🧩 Problem It Solves

Traditional portfolio sites are often passive, repetitive, and difficult to navigate for different audiences. This project solves that by:

- making the portfolio easier to scan through strong section structure
- helping recruiters get role-fit answers directly through the chatbot
- helping non-technical visitors understand energy-market topics in plain language
- keeping engagement on the page with an inline game instead of sending users away
- supporting both frontend-only and frontend-plus-backend deployment patterns

## 🚀 Key Features

### 🏠 Portfolio Experience

- Homepage-driven navigation with clear section anchors
- Dedicated subpages for `skills`, `projects`, and `certifications`
- Consistent editorial heading system across active pages
- Solid white light mode and solid black dark mode
- Refined footer, navigation, and section spacing

### 🤖 AI Agent Desk

Four chatbot agents are available:

- `Portfolio Guide`
- `Energy Market Agent`
- `Opportunity Advisor`
- `Puzzle Helper`

Chatbot capabilities include:

- stable fixed-position chat shell
- agent-specific welcome states
- quick actions
- markdown-friendly assistant responses
- copy response action
- browser-native mic dictation support

### 🧠 Puzzle + Game Flow

- Inline Marathi crossword section below contact
- `/[locale]/game` redirects to the homepage `#game` section
- Puzzle Helper supports pasted clues and answer-checking
- Built to remain usable even when the third-party crossword iframe loads slowly

### 🌍 Internationalization

- English
- Hindi
- Marathi

## 🛠️ Technology Stack

### Frontend

- Next.js 16 App Router
- React 19
- TypeScript
- Tailwind CSS
- Framer Motion
- `next-intl`
- `next-themes`
- Radix UI primitives
- Lucide icons

### Backend / AI

- Next.js API route at `/api/chat`
- Optional FastAPI backend
- OpenAI Responses API support
- OpenRouter fallback support
- Remote upstream chat fallback for local and proxy scenarios

### Tooling

- ESLint
- TypeScript route-aware checks
- GitHub Actions CI
- Vercel-ready build configuration

## 🖼️ Visual Preview

Add screenshots and GIFs under:

```text
docs/images/
```

Recommended asset names:

- `docs/images/homepage-light.png`
- `docs/images/homepage-dark.png`
- `docs/images/chatbot-demo.gif`
- `docs/images/game-section.png`
- `docs/images/projects-page.png`

Example Markdown to paste once the assets exist:

```md
![Homepage Light](docs/images/homepage-light.png)
![Chatbot Demo](docs/images/chatbot-demo.gif)
![Game Section](docs/images/game-section.png)
```

## 📁 Project Structure

```text
.
├── .github/workflows/ci.yml     # GitHub Actions pipeline
├── api/index.py                 # Python entrypoint wrapper
├── fastapi_backend/             # Optional FastAPI backend
├── public/                      # Static assets
├── scripts/                     # Local helper scripts
├── src/
│   ├── app/                     # Next.js routes, layout, API
│   ├── components/              # Shared UI + app components
│   ├── i18n/                    # Locale config and translations
│   ├── lib/                     # Data, chatbot, helpers
│   └── types/                   # Shared TypeScript types
├── .env.example                 # Environment variable template
├── next.config.ts               # Next.js config
├── vercel.json                  # Vercel config
├── package.json                 # Frontend scripts and dependencies
└── README.md                    # Project documentation
```

### Where To Find Things

- Main homepage flow: `src/app/[locale]/page.tsx`
- Chatbot UI: `src/components/AIChatbot.tsx`
- Game section: `src/components/Game.tsx`
- Footer and navigation: `src/components/Footer.tsx`, `src/components/Navigation.tsx`
- Chat route: `src/app/api/chat/route.ts`
- FastAPI backend: `fastapi_backend/main.py`
- Agent definitions: `src/lib/assistant-agents.ts`

## ⚙️ Installation

### Prerequisites

- Node.js 20+
- npm
- Python 3.11+ for the optional FastAPI backend

### Frontend Setup

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open:

- `http://localhost:3000/en`

### Optional FastAPI Backend

```bash
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
uvicorn fastapi_backend.main:app --reload --host 127.0.0.1 --port 8000
```

Open:

- `http://127.0.0.1:8000/health`

## 🔐 Configuration

Copy `.env.example` to `.env.local` and configure only what you need.

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

### Configuration Notes

- `OPENAI_API_KEY` is optional
- `OPENROUTER_API_KEY` is optional
- `FASTAPI_URL` is optional
- `CHAT_UPSTREAM_URL` is optional
- `FASTAPI_DEV_REWRITE=true` enables a direct dev rewrite to local FastAPI, but it is intentionally off by default to keep dev and production behavior aligned

## 💬 Usage Examples

### Health Checks

```bash
curl http://localhost:3000/api/chat
curl http://127.0.0.1:8000/health
```

### Portfolio Agent Request

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

### Puzzle Helper Request

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

## 🧪 Quality Checks

Run before merging or deploying:

```bash
npm run lint
npm run type-check
npm run build
npm audit --audit-level=moderate
./.venv/bin/python -m py_compile api/index.py fastapi_backend/main.py
```

## 🔄 GitHub Actions

CI is configured at:

- `.github/workflows/ci.yml`

It runs on:

- push to `main`
- pull request to `main`

Checks included:

- `npm ci`
- `pip install -r requirements.txt`
- `npm run lint`
- `npm run type-check`
- `npm run build`
- Python compile validation for:
  - `api/index.py`
  - `fastapi_backend/main.py`

## ▲ Vercel Deployment

### Current Setup

[vercel.json](./vercel.json):

```json
{
  "framework": "nextjs",
  "buildCommand": "npm run build"
}
```

### Recommended Deployment Paths

#### Next.js Only

Use Vercel Git integration and set one of:

- `OPENAI_API_KEY`
- `OPENROUTER_API_KEY`

#### Next.js + FastAPI

1. Deploy FastAPI separately
2. Set provider keys on the FastAPI service
3. Set `FASTAPI_URL` on the Next.js project
4. Optionally set matching `FASTAPI_INTERNAL_TOKEN` values on both services

## 🤝 Contributing

1. Branch from `main`
2. Keep changes small and consistent with the existing design system
3. Run all quality checks
4. Update docs if routes, config, or behavior change
5. Open a pull request with:
   - a concise summary
   - screenshots or GIFs when UI changes
   - validation notes

## 📄 License

This repository does not currently include a standalone `LICENSE` file.

Until a license file is added, treat the codebase as not licensed for general redistribution or reuse.

## 📬 Contact

- GitHub: [mangeshraut712/vidyaraut](https://github.com/mangeshraut712/vidyaraut)
- LinkedIn: [linkedin.com/in/vidyaraut17](https://www.linkedin.com/in/vidyaraut17/)
- Email: [vidyaraut17297@gmail.com](mailto:vidyaraut17297@gmail.com)

---

If you add preview assets later, place them in `docs/images/` so the README stays clean and the root folder remains easy to navigate.
