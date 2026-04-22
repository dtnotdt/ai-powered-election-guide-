# VoteVerse India 🇮🇳

> An interactive, cinematic, and comprehensive election education platform designed to empower the world's largest democracy.

![VoteVerse India](https://img.shields.io/badge/Status-Production%20Ready-success)
![React](https://img.shields.io/badge/React-19-blue)
![Vite](https://img.shields.io/badge/Vite-6-purple)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-12-pink)

VoteVerse India transforms static election guidelines into an engaging, multi-sensory digital experience. Built with a modern tech stack and cinematic glassmorphism UI, it guides first-time voters and citizens through the entire electoral process.

## 🌟 Key Features

*   **🎬 Cinematic Story Mode:** A scroll-driven, parallax narrative that follows a first-time voter through registration, polling, and results.
*   **⚡ Interactive EVM Simulator:** A realistic Electronic Voting Machine clone, complete with VVPAT verification and audio feedback.
*   **📍 Smart Booth Locator:** Integrated Google Geocoding API with fuzzy matching for Indian cities and 6-digit pincode support to locate nearby polling booths.
*   **🤖 AI Election Assistant:** A Gemini-powered chatbot integrated with a local Election Commission knowledge base to bust myths and answer queries.
*   **🎤 Voice Guide:** Web Speech API integration for hands-free queries and text-to-speech responses.
*   **📊 Impact Simulator:** Interactive Chart.js visualizations demonstrating how voter turnout mathematically flips election outcomes.
*   **🏆 Gamified Progress:** Checklist tracking and unlockable badges to motivate users through the learning journey.

## 🏗 Architecture & Tech Stack

VoteVerse India has been completely refactored from a monolithic HTML structure into a scalable, production-ready React application.

*   **Core:** React 19, Vite
*   **Styling:** Custom CSS (Design System tokens), Glassmorphism, Responsive Grid/Flexbox
*   **Animations:** Framer Motion (Variants, Scroll Tracking, Layout Animations)
*   **State Management:** Custom React Hooks (`useUserProgress`, `useLocation`) mapped to `localStorage`
*   **Integrations:**
    *   Google Maps Geocoding API
    *   Google Gemini AI API (Chatbot)
    *   Firebase (Auth/Firestore - Ready for backend sync)
    *   Web Speech API
*   **Testing:** Vitest, React Testing Library, JSDOM

## 🚀 Getting Started

### Prerequisites

*   Node.js (v18 or higher)
*   npm or yarn

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
    Copy the template and add your API keys:
    ```bash
    cp .env.example .env.local
    ```
    *Add your Google Maps and Gemini API keys to enable full functionality.*

4.  **Start the development server:**
    ```bash
    npm run dev
    ```

## 🧪 Testing

The application includes a comprehensive test suite covering utilities, hooks, and component rendering.

```bash
# Run unit tests
npm run test

# Run tests with coverage report
npm run test:coverage
```

## 📦 Production Build & Deployment

The project is optimized for performance with code-splitting (vendor, animations, charts) and is ready for containerized deployment.

**Local Build:**
```bash
npm run build
npm run preview
```

**Docker Deployment:**
```bash
docker build -t voteverse-india .
docker run -p 8080:8080 voteverse-india
```

## 📂 Project Structure

```text
src/
├── animations/    # Framer Motion variants for cinematic UI
├── components/    # Modular React components
│   ├── badges/    # Gamification display
│   ├── chat/      # AI Chatbot interface
│   ├── checklist/ # Progress tracking
│   ├── evm/       # Interactive EVM simulator
│   ├── impact/    # Chart.js visualization
│   ├── landing/   # Main entry point
│   ├── maps/      # Polling booth locator
│   ├── navigation/# Floating bottom nav
│   ├── reels/     # TikTok/Reels style quick-learn
│   ├── story/     # Cinematic scroll experience
│   └── voice/     # Web Speech UI
├── hooks/         # Custom state & logic hooks
├── services/      # API integrations (Firebase, Chatbot)
├── styles/        # Global CSS, Design System, Tokens
├── utils/         # Constants, Sanitization, Helpers
├── __tests__/     # Vitest testing suite
├── App.jsx        # App root & Routing
└── main.jsx       # React entry point
```

## 🛡 Security & Sanitization

*   **Input Sanitization:** Custom sanitizers prevent XSS in chat and location search.
*   **Location Normalization:** Handles diverse Indian address formats and aliases (e.g., Bombay -> Mumbai).
*   **Environment Config:** Sensitive keys are isolated from the codebase via `.env`.

---
*Built to empower the next generation of voters. Every vote counts.*
