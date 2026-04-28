# VoteVerse India 🇮🇳: AI-Powered Election Guide

VoteVerse India is an interactive, cinematic, and AI-powered digital experience designed to educate citizens about the democratic process in the world's largest democracy. Built with Next.js, Framer Motion, and Tailwind CSS, the platform turns complex election guidelines into an engaging, gamified journey.

**🌍 Live Application:** [VoteVerse India (Live on Google Cloud Run)](https://voteverse-1064148922722.asia-south1.run.app/)

## ✨ Key Features

- **🎬 Cinematic Story Mode:** A visually stunning, scroll-driven narrative that walks you through the entire electoral process.
- **⚡ EVM Simulator:** A realistic, interactive Electronic Voting Machine simulation to help first-time voters gain confidence.
- **🤖 AI Assistant:** An intelligent chatbot integrated with Google Gemini to answer all your election-related queries instantly.
- **📍 Find Booth:** Geolocation-based feature to help you locate your nearest polling station via interactive maps.
- **🧪 What-If Scenarios:** A sandbox environment exploring common election-day hurdles (e.g., lost ID, wrong booth) and their official ECI solutions.
- **🎤 Voice Guide:** An accessible, voice-activated assistant for inclusive navigation.
- **📱 Quick Learn (Reels):** Byte-sized, TikTok-style informative reels covering crucial voting facts and myth-busting.
- **🏆 Gamified Progress:** Earn badges and track your readiness with a personalized checklist as you prepare for polling day.
- **🌐 Bilingual Support:** Seamless English and Hindi language toggle (`i18next`).

## 🛠 Tech Stack

- **Frontend Framework:** React 18, Next.js (App Router)
- **Styling & Animation:** Tailwind CSS, Framer Motion, Lucide React
- **Backend & Auth:** Firebase Auth (Google OAuth & Guest), Firestore
- **AI Integration:** Google Gemini API
- **Testing:** Vitest, React Testing Library
- **Deployment:** Google Cloud Run, Docker

## 🚀 Getting Started Locally

1. **Clone the repository**
   ```bash
   git clone https://github.com/dtnotdt/ai-powered-election-guide-.git
   cd "Voting booth simulator"
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env.local` file in the root directory and add your keys:
   ```env
   VITE_GEMINI_API_KEY=your_gemini_api_key
   NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
   # ... other Firebase configuration variables
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## ♿ Accessibility (A11y)

VoteVerse is built with inclusive design in mind:
- Full **WCAG 2.1 compliance**.
- Complete **Keyboard Navigation** support (Roving tabindex on custom radio groups).
- **ARIA labels** and semantic HTML for screen readers.

## ☁️ Deployment

The application is containerized using Docker and continuously deployed to **Google Cloud Run**. The current architecture utilizes zero-downtime, revision-based deployments with safe canary rollouts.

## 📜 License

Built for democratic education. All official guidelines referenced are sourced from the Election Commission of India (ECI).
