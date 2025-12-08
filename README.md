# Vidya Raut - Portfolio Website

A modern, multilingual portfolio website built with Next.js 16, React 19, and TypeScript.

![Next.js](https://img.shields.io/badge/Next.js-16.0.7-black)
![React](https://img.shields.io/badge/React-19.2.1-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue)
![Node](https://img.shields.io/badge/Node-22.x-green)

## 🚀 Live Demo

**[https://vidyaraut.vercel.app](https://vidyaraut.vercel.app)**

## ✨ Features

- **Multilingual Support** - English, Hindi, and Marathi (next-intl)
- **Dark/Light Theme** - System-aware theming with next-themes
- **AI Chatbot** - OpenRouter-powered assistant for portfolio Q&A
- **Responsive Design** - Mobile-first approach with Tailwind CSS
- **Smooth Animations** - Framer Motion for page transitions
- **SEO Optimized** - Meta tags, Open Graph, and structured data
- **Analytics** - Vercel Analytics and Speed Insights

## 🛠️ Tech Stack

| Category | Technology |
|----------|------------|
| Framework | Next.js 16 (App Router) |
| UI Library | React 19 with React Compiler |
| Styling | Tailwind CSS 3.4 |
| Language | TypeScript 5.7 |
| State Management | Zustand 5.0 |
| Form Handling | React Hook Form + Zod |
| Animations | Framer Motion 11 |
| Icons | Lucide React |
| Internationalization | next-intl 4.x |
| Analytics | Vercel Analytics |

## 📦 Getting Started

### Prerequisites

- Node.js 22.x or later
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/vidyaraut17297/vidyaraut.git
cd vidyaraut

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your API keys

# Start development server
npm run dev
```

### Environment Variables

Create a `.env.local` file with:

```env
# OpenRouter API (for AI Chatbot)
OPENROUTER_API_KEY=your_api_key_here
OPENROUTER_MODEL=openai/gpt-3.5-turbo

# Site Configuration
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_SITE_NAME=Vidya Raut Portfolio
```

## 🏗️ Project Structure

```
vidyaraut/
├── src/
│   ├── app/              # Next.js App Router pages
│   │   ├── [locale]/     # Internationalized routes
│   │   ├── api/          # API routes
│   │   └── globals.css   # Global styles
│   ├── components/       # React components
│   │   ├── ui/           # Shadcn UI components
│   │   └── ...           # Feature components
│   ├── i18n/             # Internationalization
│   │   ├── messages/     # Translation files (en, hi, mr)
│   │   ├── routing.ts    # Route configuration
│   │   └── request.ts    # Request config
│   └── lib/              # Utilities and helpers
├── public/               # Static assets
├── middleware.ts         # next-intl middleware
└── next.config.ts        # Next.js configuration
```

## 🚀 Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import project in Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

### Environment Variables for Vercel

| Variable | Required | Description |
|----------|----------|-------------|
| `OPENROUTER_API_KEY` | Yes | API key for AI chatbot |
| `OPENROUTER_MODEL` | No | AI model (default: gpt-3.5-turbo) |

## 📝 Scripts

```bash
npm run dev      # Start development server with Turbopack
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

## 📄 License

MIT License - feel free to use this project as a template!

## 👩‍💼 About Vidya Raut

Energy Technology Analyst specializing in:
- Market Research & Data Analysis
- Energy Storage Systems (ESS)
- Power BI & Excel Analytics
- Battery Testing & R&D

📧 **Contact**: vidyaraut17297@gmail.com  
🔗 **LinkedIn**: [linkedin.com/in/vidyaraut17](https://www.linkedin.com/in/vidyaraut17/)

---

Built with ❤️ using Next.js 16 and React 19
