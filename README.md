# Vidya Raut - Portfolio Website

<div align="center">

![Next.js](https://img.shields.io/badge/Next.js-16.0-black?logo=next.js)
![React](https://img.shields.io/badge/React-19.2-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178C6?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-06B6D4?logo=tailwindcss)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-11-FF0050?logo=framer)

**A stunning, modern portfolio website built with cutting-edge 2025 web technologies.**

[🌐 Live Demo](https://vidyaraut.vercel.app) | [📧 Contact](mailto:vidyaraut17297@gmail.com) | [💼 LinkedIn](https://www.linkedin.com/in/vidyaraut17/)

</div>

---

## ✨ Key Features

### 🎨 Premium Design
- **Glassmorphism Effects** - Modern frosted glass UI with backdrop blur
- **Animated Gradients** - Dynamic color transitions and mesh backgrounds
- **Typewriter Animation** - Engaging hero section text effects
- **3D Card Hover Effects** - Interactive perspective transformations
- **OLED-friendly Dark Mode** - True black background for maximum contrast

### 🚀 2025 Technologies
- **React 19 Compiler** - Automatic memoization (no manual useMemo/useCallback)
- **Next.js 16 + Turbopack** - 10x faster dev refresh, instant builds
- **Optimized Package Imports** - Faster bundling for heavy dependencies
- **React Server Components** - Optimal performance and reduced bundle size

### 🌐 Internationalization
- **3 Languages** - English, Hindi (हिंदी), Marathi (मराठी)
- **next-intl 4.x** - Modern i18n with type-safe translations
- **Locale-aware Routing** - Clean URLs with `/en`, `/hi`, `/mr` prefixes

### 💬 AI-Powered Features
- **AI Chatbot** - OpenRouter-powered assistant for portfolio Q&A
- **Animated Typing Indicator** - Bouncing dots for natural feel
- **Quick Actions** - One-click common questions
- **Context-aware Responses** - Remembers conversation history

### 📱 PWA Support
- **Installable App** - Add to home screen on any device
- **Offline Ready** - Service worker for offline access
- **App-like Experience** - Standalone display mode

### 🔍 SEO Optimized
- **Dynamic Sitemap** - Auto-generated for all locales
- **OpenGraph & Twitter Cards** - Rich social media previews
- **Structured Metadata** - Enhanced search engine visibility
- **robots.txt** - Proper crawler configuration

---

## 🛠️ Tech Stack

| Category | Technology | Version |
|----------|------------|---------|
| **Framework** | Next.js (App Router + Turbopack) | 16.0.10 |
| **UI Library** | React with React Compiler | 19.2.1 |
| **Language** | TypeScript | 5.7.2 |
| **Styling** | Tailwind CSS + Custom Utilities | 3.4.17 |
| **Animations** | Framer Motion | 11.x |
| **State** | Zustand | 5.0.1 |
| **Forms** | React Hook Form + Zod | 7.54 / 3.24 |
| **i18n** | next-intl | 4.5.8 |
| **Icons** | Lucide React | 0.468 |
| **UI Components** | Radix UI Primitives | Latest |
| **Analytics** | Vercel Analytics & Speed Insights | Latest |

---

## 📁 Project Structure

```
vidyaraut/
├── public/                    # Static assets
│   ├── logo.png              # Site logo & favicon
│   ├── home picture.jpeg     # Profile photo
│   ├── manifest.json         # PWA manifest
│   ├── robots.txt            # SEO crawler rules
│   └── Vidya_Raut_Resume.md  # Downloadable resume
│
├── src/
│   ├── app/                  # Next.js App Router
│   │   ├── [locale]/         # Internationalized routes
│   │   │   ├── page.tsx      # Main portfolio page
│   │   │   ├── layout.tsx    # Locale layout
│   │   │   ├── skills/       # Skills detail page
│   │   │   ├── projects/     # Projects showcase
│   │   │   ├── certifications/# Certifications page
│   │   │   └── game/         # Interactive game
│   │   ├── api/chat/         # AI chatbot API
│   │   ├── globals.css       # Global styles & utilities
│   │   ├── layout.tsx        # Root layout with SEO
│   │   ├── sitemap.ts        # Dynamic sitemap
│   │   └── providers.tsx     # Theme & i18n providers
│   │
│   ├── components/           # React components
│   │   ├── ui/               # Shadcn/Radix primitives
│   │   ├── Hero.tsx          # Animated hero section
│   │   ├── Skills.tsx        # Skills with gradients
│   │   ├── Projects.tsx      # 3D project cards
│   │   ├── Testimonials.tsx  # Carousel testimonials
│   │   ├── Timeline.tsx      # Experience timeline
│   │   ├── AIChatbot.tsx     # AI assistant
│   │   ├── Footer.tsx        # Premium footer
│   │   └── Navigation.tsx    # Responsive nav
│   │
│   ├── i18n/                 # Internationalization
│   │   ├── messages/         # Translation files
│   │   │   ├── en.json       # English
│   │   │   ├── hi.json       # Hindi
│   │   │   └── mr.json       # Marathi
│   │   ├── config.ts         # Locale config
│   │   └── request.ts        # Server request config
│   │
│   ├── lib/                  # Utilities
│   │   ├── data.ts           # Portfolio data
│   │   ├── openrouter.ts     # AI integration
│   │   └── utils.ts          # Helper functions
│   │
│   └── types/                # TypeScript definitions
│
├── eslint.config.js          # ESLint flat config
├── next.config.ts            # Next.js configuration
├── tailwind.config.ts        # Tailwind with animations
├── tsconfig.json             # TypeScript config
└── middleware.ts             # i18n middleware
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** 20.9.0 or higher
- **npm** or **yarn** or **pnpm**

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

Create a `.env.local` file:

```env
# OpenRouter API (for AI Chatbot)
OPENROUTER_API_KEY=your_api_key_here
OPENROUTER_MODEL=openai/gpt-3.5-turbo

# Site URL (for production)
NEXT_PUBLIC_SITE_URL=https://vidyaraut.vercel.app
```

---

## 📝 Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start dev server with Turbopack |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run lint:fix` | Auto-fix lint issues |
| `npm run type-check` | TypeScript type checking |

---

## 🎨 Design System

### Color Palette

**Light Mode**
- Background: Pure White (#FFFFFF)
- Primary: Vibrant Blue (#3B82F6)
- Accents: Purple, Pink, Cyan, Amber

**Dark Mode**
- Background: Solid Black (#000000)  
- Cards: Near-black (#0D0D0D)
- Primary: Bright Blue (#4B8BF5)

### Custom CSS Utilities

```css
.glass          /* Glassmorphism effect */
.gradient-text  /* Gradient text fill */
.hover-lift     /* Lift on hover */
.hover-glow     /* Glow on hover */
.animate-float  /* Floating animation */
```

---

## 🌐 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project in [Vercel](https://vercel.com)
3. Add environment variables
4. Deploy!

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/vidyaraut17297/vidyaraut)

### Environment Variables on Vercel

| Variable | Required | Description |
|----------|----------|-------------|
| `OPENROUTER_API_KEY` | Yes | API key for AI chatbot |
| `OPENROUTER_MODEL` | No | Model ID (default: gpt-3.5-turbo) |

---

## 👩‍💼 About Vidya Raut

**Energy Technology Analyst** with 4+ years of experience specializing in:

- 📊 Market Research & Data Analysis
- 🔋 Energy Storage Systems (ESS)
- 📈 Power BI & Excel Analytics
- 🔬 Battery Testing & R&D

### Contact

- 📧 **Email**: [vidyaraut17297@gmail.com](mailto:vidyaraut17297@gmail.com)
- 💼 **LinkedIn**: [linkedin.com/in/vidyaraut17](https://www.linkedin.com/in/vidyaraut17/)
- 🌐 **Portfolio**: [vidyaraut.vercel.app](https://vidyaraut.vercel.app)

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

<div align="center">

**Built with ❤️ using Next.js 16 & React 19**

*Powered by Turbopack • React Compiler • Framer Motion*

</div>
