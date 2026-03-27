<div align="center">

# Vidya Raut Portfolio

Multilingual Next.js portfolio with an integrated AI assistant, polished motion, and an optional FastAPI backend for chat proxying.

[![Next.js](https://img.shields.io/badge/Next.js-16.1-black?logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.2-61DAFB?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-06B6D4?logo=tailwindcss)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-11-FF0050?logo=framer)](https://www.framer.com/motion/)
[![FastAPI](https://img.shields.io/badge/FastAPI-Optional-009688?logo=fastapi)](https://fastapi.tiangolo.com/)
[![Vercel](https://img.shields.io/badge/Deploy-Vercel-black?logo=vercel)](https://vercel.com/)

[Live Demo](https://vidyaraut.vercel.app) · [LinkedIn](https://www.linkedin.com/in/vidyaraut17/) · [GitHub](https://github.com/mangeshraut712/vidyaraut)

</div>

## Overview

This project is a personal portfolio for Vidya Raut, built around a single strong homepage, locale-aware routing, and a lightweight AI assistant surface. It combines resume-style storytelling, project and certification sections, and a crossword/game area into one editorial experience.

## Table of Contents

- [Features](#features)
- [Stack](#stack)
- [Quick Start](#quick-start)
- [Project Structure](#project-structure)
- [Scripts](#scripts)
- [Contact](#contact)

## Features

- Multilingual routing for English, Hindi, and Marathi.
- Homepage-first layout with clear navigation and section flow.
- AI assistant area with multiple specialized agents.
- Crossword/game section embedded in the portfolio flow.
- Optional FastAPI backend for chat proxying when Python support is enabled.
- Theme-aware UI, motion polish, and reusable component primitives.

## Stack

- Next.js App Router
- React 19
- TypeScript
- Tailwind CSS
- Framer Motion
- next-intl
- next-themes
- Radix UI components
- Optional FastAPI, httpx, and uvicorn backend

## Quick Start

```bash
git clone https://github.com/mangeshraut712/vidyaraut.git
cd vidyaraut
npm install
cp .env.example .env.local
npm run dev
```

Open `http://localhost:3000/en` in your browser.

### Optional FastAPI backend

```bash
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
uvicorn fastapi_backend.main:app --reload --host 127.0.0.1 --port 8000
```

## Project Structure

```text
.
├── api/                  # Python entrypoint wrapper
├── fastapi_backend/      # Optional backend service
├── public/               # Resume, images, manifest, robots.txt
├── scripts/              # Clean run and type-check helpers
├── src/
│   ├── app/              # Next.js App Router pages and layouts
│   ├── components/       # Portfolio sections and UI primitives
│   ├── i18n/             # Locale config and translations
│   ├── lib/              # Data, AI agent, and utility helpers
│   └── types/            # Shared TypeScript types
└── vercel.json           # Deployment config
```

## Scripts

- `npm run dev` - start the app with the clean local run helper.
- `npm run dev:turbo` - run the app with Turbopack.
- `npm run build` - create a production build.
- `npm run start` - start the production server.
- `npm run lint` - run ESLint.
- `npm run type-check` - run route-aware TypeScript checks.

## Contact

- LinkedIn: [vidyaraut17](https://www.linkedin.com/in/vidyaraut17/)
- Email: [vidyaraut17297@gmail.com](mailto:vidyaraut17297@gmail.com)
- GitHub: [mangeshraut712/vidyaraut](https://github.com/mangeshraut712/vidyaraut)
