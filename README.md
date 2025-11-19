# 🚀 Vidya Raut Portfolio

A modern, colorful, and feature-rich portfolio website showcasing expertise in Energy Technology and Market Analysis.

![Next.js](https://img.shields.io/badge/Next.js-15-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38bdf8)
![Build](https://img.shields.io/badge/build-passing-brightgreen)

## ✨ Features

### 🎨 **Premium Design**
- **Vibrant Color Scheme**: Purple, pink, and blue gradients throughout
- **Glassmorphism Effects**: Modern frosted glass UI elements
- **Smooth Animations**: Framer Motion powered transitions
- **Custom Scrollbar**: Gradient-themed scrollbar
- **Responsive Layout**: Perfect on all devices

### 📄 **Multiple Sections (Single Page Application)**
- **Home** - Hero section with introduction and portfolio overview
- **Skills** - Comprehensive skill breakdown in energy, data, and technical categories
- **Projects** - Showcase of analytical and research projects
- **Experience** - Professional work history with detailed achievements
- **Education** - Academic background and qualifications
- **Contact** - Contact form and professional information
- **Game** - Interactive Marathi crossword puzzle for downtime

### 🤖 **AI Chatbot**
- Powered by OpenRouter API
- Context-aware responses about Vidya's portfolio
- Fallback responses when API unavailable
- Floating chat interface with smooth animations

### 🎯 **Key Components**
- **Navigation Bar**: Sticky header with logo and smooth scroll
- **Timeline**: Animated experience and education timeline
- **Skill Cards**: Color-coded categories with progress indicators
- **Project Cards**: Detailed project showcases with metrics
- **Contact Form**: Beautiful gradient contact section

### 🌍 **Internationalization**
- English, Hindi, and Marathi support
- Automatic locale detection
- Locale-specific content

## 🎨 Design Highlights

### Color Palette
- **Primary**: Purple (`#8B5CF6`)
- **Secondary**: Blue (`#3B82F6`)
- **Accent**: Pink (`#EC4899`)
- **Success**: Green (`#10B981`)
- **Warning**: Orange (`#F59E0B`)

### Custom Animations
- Gradient animations
- Float effects
- Fade-in-up on scroll
- Smooth page transitions

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/mangeshraut712/vidyaraut.git
cd vidyaraut

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local and add your OpenRouter API key

# Run development server
npm run dev

# Open http://localhost:3000
```

## 🔧 Environment Variables

Create a `.env.local` file:

```env
NEXT_PUBLIC_OPENROUTER_API_KEY=your_api_key_here
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_SITE_NAME=Vidya Raut Portfolio
NEXT_PUBLIC_AI_MODEL=openai/gpt-3.5-turbo
```

## 📁 Project Structure

```
vidyaraut/
├── public/
│   ├── logo.svg              # Custom VR logo
│   └── favicon.svg           # Favicon
├── src/
│   ├── app/
│   │   ├── [locale]/
│   │   │   ├── page.tsx      # Home page
│   │   │   ├── skills/       # Skills page
│   │   │   └── projects/     # Projects page
│   │   ├── globals.css       # Global styles + animations
│   │   └── layout.tsx        # Root layout with metadata
│   ├── components/
│   │   ├── ui/               # Shadcn UI components
│   │   ├── AIChatbot.tsx     # AI chatbot
│   │   ├── Timeline.tsx      # Timeline component
│   │   └── Navigation.tsx    # Navigation bar
│   ├── lib/
│   │   ├── data.ts           # Portfolio content
│   │   ├── openrouter.ts     # AI API integration
│   │   └── utils.ts          # Utilities
│   └── i18n/                 # Internationalization
├── scripts/
│   └── test-chatbot.js       # API testing script
├── package.json
├── tailwind.config.ts
└── README.md
```

## 🎯 Pages Overview

### Home Page (`/en`)
- **Hero Section**: Animated introduction with logo and stats
- **About Section**: Professional summary with focus areas
- **Quick Links**: Cards linking to Skills and Projects
- **Experience Timeline**: Professional work history
- **Education Timeline**: Academic background
- **Contact Section**: Contact form and information

### Skills Page (`/en/skills`)
- **4 Skill Categories**:
  1. Data Analysis & Visualization (Purple/Pink)
  2. Energy Technology (Green/Teal)
  3. Market Research (Blue/Cyan)
  4. Technical Skills (Orange/Red)
- **Progress Bars**: Visual skill level indicators
- **Certifications**: 4 certification cards
- **Key Strengths**: Impact metrics

### Projects Page (`/en/projects`)
- **6 Major Projects**:
  1. Energy Storage Market Analysis Dashboard
  2. Battery Performance Testing Framework
  3. Competitive Intelligence Tracker
  4. Solar PV Market Sizing Study
  5. Energy Policy Impact Reports
  6. Data Visualization Portfolio
- **Project Metrics**: Impact, duration, team size
- **Color-Coded**: Each project has unique gradient

## 🚀 Deployment

### Vercel (Recommended)

```bash
# Push to GitHub
git add .
git commit -m "Initial commit"
git push origin main

# Deploy on Vercel
# 1. Go to vercel.com
# 2. Import repository
# 3. Add environment variables
# 4. Deploy!
```

### Environment Variables for Production
Add these in Vercel dashboard:
- `NEXT_PUBLIC_OPENROUTER_API_KEY`
- `NEXT_PUBLIC_SITE_URL` (your production URL)
- `NEXT_PUBLIC_SITE_NAME`
- `NEXT_PUBLIC_AI_MODEL`

## 🧪 Testing

### Build Test
```bash
npm run build
```

### AI Chatbot Test
```bash
export OPENROUTER_API_KEY=your_key
npm run test:chatbot
```

### Development Server
```bash
npm run dev
```

## 📊 Build Output

```
Route (app)                              Size     First Load JS
┌ ○ /                                    136 B          99.3 kB
├ ○ /_not-found                          900 B           100 kB
├ ● /[locale]                            28.3 kB         172 kB
├ ● /[locale]/projects                   3.93 kB         148 kB
└ ● /[locale]/skills                     3.79 kB         147 kB

✅ Build: Successful
✅ Lint: Passing
✅ TypeScript: No errors
```

## 🎨 Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 4
- **UI Components**: Shadcn UI
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **AI**: OpenRouter API
- **State**: Zustand
- **Data Fetching**: TanStack Query
- **i18n**: next-intl
- **Fonts**: Geist & Geist Mono

## 🎯 Key Improvements

### ✅ What's New
- ✨ **3 Pages**: Home, Skills, Projects
- 🎨 **Colorful Design**: Purple, pink, blue gradients
- 🖼️ **Custom Logo**: SVG logo and favicon
- 🧭 **Navigation**: Sticky header with smooth scroll
- 📊 **Skill Breakdown**: Detailed skills with progress bars
- 💼 **Project Showcase**: 6 detailed project cards
- 🎭 **Animations**: Custom CSS animations
- 📱 **Fully Responsive**: Mobile-first design
- 🚀 **Optimized**: Fast build and load times

### 🗑️ Cleaned Up
- ❌ Removed `_legacy` folder
- ❌ Removed unused documentation files
- ❌ Removed old project versions
- ✅ Clean project structure
- ✅ No unused dependencies

## 📝 License

This project is private and belongs to Vidya Raut.

## 🤝 Contact

- **Email**: vidyaraut17297@gmail.com
- **LinkedIn**: [linkedin.com/in/vidyaraut17](https://www.linkedin.com/in/vidyaraut17/)
- **Location**: Pune, India

---

**Built with ❤️ using Next.js 15, Shadcn UI, and OpenRouter AI**

*Last Updated: November 2025*
