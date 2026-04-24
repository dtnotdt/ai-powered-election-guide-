# VoteVerse India 🇮🇳

> An interactive, cinematic, and comprehensive election education platform designed to empower the world's largest democracy.

![VoteVerse India](https://img.shields.io/badge/Status-Production%20Ready-success)
![Next.js](https://img.shields.io/badge/Next.js-14+-black)
![React](https://img.shields.io/badge/React-19-blue)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-12-pink)
![Google Cloud Run](https://img.shields.io/badge/Deployed_on-Google_Cloud_Run-blue)

VoteVerse India transforms static election guidelines into an engaging, multi-sensory digital experience. Built with a modern Next.js architecture and cinematic glassmorphism UI, it guides first-time voters and citizens through the entire electoral process.

## 🌟 Key Features

*   **🌐 Offline-First Bilingual Support:** Instant, browser-based translation between English and Hindi (`react-i18next`) with no external API dependency.
*   **🔐 Secure Authentication:** Seamless Google Sign-In integration via Firebase Authentication, protected by strict Content Security Policies (CSP).
*   **🎬 Cinematic Story Mode:** A scroll-driven, parallax narrative that follows a first-time voter through registration, polling, and results.
*   **⚡ Interactive EVM Simulator:** A realistic Electronic Voting Machine clone, complete with VVPAT verification and audio feedback.
*   **📍 Smart Booth Locator:** Integrated Google Maps API with secure geolocation Permissions-Policy to locate nearby polling booths instantly.
*   **🤖 AI Election Assistant:** A Gemini-powered chatbot integrated with a local Election Commission knowledge base to bust myths and answer queries.
*   **🎤 Voice Guide:** Web Speech API integration for hands-free queries and text-to-speech responses.
*   **📊 Impact Simulator:** Interactive Chart.js visualizations demonstrating how voter turnout mathematically flips election outcomes.
*   **🏆 Gamified Progress:** Checklist tracking and unlockable badges to motivate users through the learning journey.

## 🏗 Architecture & Tech Stack

VoteVerse India has been completely refactored into a scalable, production-ready Next.js App Router application.

*   **Core:** Next.js (App Router), React 19
*   **Styling:** Tailwind CSS, Custom CSS (Design System tokens), Glassmorphism
*   **Animations:** Framer Motion (Variants, Scroll Tracking, Layout Animations)
*   **Internationalization:** `react-i18next` (Static dictionary injection)
*   **State Management:** Custom React Hooks mapped to `localStorage`
*   **Integrations:**
    *   Firebase Authentication & Firestore
    *   Google Maps JavaScript API & Geocoding API
    *   Google Gemini AI API (Chatbot)
*   **Security:** Next.js Middleware, Strict CSP (Content-Security-Policy), X-Frame-Options, secure iframe sandboxing.
*   **Testing:** Vitest, React Testing Library, JSDOM

## 🚀 Getting Started

### Prerequisites

*   Node.js (v18 or higher)
*   npm or yarn
*   Firebase Project (with Google Sign-In enabled)
*   Google Cloud Console (Maps JavaScript API enabled)

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/yourusername/voteverse-india.git
    cd voteverse-india
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Environment Variables:**
    Copy the template and add your API keys. Note: Use `NEXT_PUBLIC_` prefixes or server-side injection for Next.js.
    ```bash
    cp .env.example .env.local
    ```

4.  **Start the development server:**
    ```bash
    npm run dev
    ```

## 📦 Production Deployment (Google Cloud Run)

The project is optimized for performance and is deployed on Google Cloud Run using Next.js standalone output.

1. **Clear cache and build:**
   ```bash
   rm -rf .next
   npm run build
   ```

2. **Deploy directly from source to Cloud Run:**
   ```bash
   gcloud run deploy voteverse \
     --source . \
     --project your-gcp-project-id \
     --region asia-south1 \
     --allow-unauthenticated \
     --set-env-vars VITE_GOOGLE_MAPS_API_KEY="...",VITE_FIREBASE_API_KEY="..."
   ```

## 📂 Project Structure

```text
src/
├── app/           # Next.js App Router entries (layout.jsx, page.jsx)
├── animations/    # Framer Motion variants for cinematic UI
├── components/    # Modular React components
│   ├── auth/      # Firebase Auth Gate & Logic
│   ├── evm/       # Interactive EVM simulator
│   ├── gallery/   # AI-generated visual assets
│   ├── landing/   # Main entry point & routing
│   ├── maps/      # Polling booth locator
│   ├── story/     # Cinematic scroll experience
│   └── ...        # Additional feature components
├── hooks/         # Custom state & logic hooks
├── services/      # API integrations (Firebase, Chatbot)
├── styles/        # Global CSS, Tailwind setup
├── utils/         # Constants, Sanitization, Runtime Env Injectors
├── i18n.js        # React-i18next Configuration
└── App.jsx        # Client-side Router Wrapper
```

## 🛡 Security & Compliance

*   **Dynamic Server Rendering:** Avoids leaking API keys into static HTML by utilizing Next.js `force-dynamic` rendering.
*   **Content Security Policy:** Carefully crafted `connect-src`, `frame-src`, and `script-src` to allow Firebase Auth iframes and Google Maps API while blocking third-party execution.
*   **Input Sanitization:** Custom sanitizers prevent XSS in chatbot and location search.

---
*Built to empower the next generation of voters. Every vote counts.*
