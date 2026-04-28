<div align="center">
  <h1>🇮🇳 VoteVerse India</h1>
  <p><strong>AI-Powered Election Guide & Digital Twin</strong></p>
  
  [![Live Demo](https://img.shields.io/badge/Live-Demo-brightgreen.svg?style=for-the-badge)](https://voteverse-1064148922722.asia-south1.run.app/)
  [![Next.js](https://img.shields.io/badge/Next.js-13+-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
  [![React](https://img.shields.io/badge/React-18-blue?style=for-the-badge&logo=react)](https://react.dev/)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
  [![Google Cloud Run](https://img.shields.io/badge/GCP-Cloud_Run-4285F4?style=for-the-badge&logo=google-cloud)](https://cloud.google.com/run)
</div>

<br />

> VoteVerse India is an interactive, cinematic, and AI-powered digital experience designed to educate citizens about the democratic process in the world's largest democracy. Built with modern web technologies, the platform turns complex election guidelines into an engaging, gamified journey.

---

## ✨ Key Features

| Feature | Description |
| :--- | :--- |
| 🎬 **Cinematic Story Mode** | A visually stunning, scroll-driven narrative walking you through the electoral process. |
| ⚡ **EVM Simulator** | A highly realistic, interactive Electronic Voting Machine simulation for first-time voters. |
| 🤖 **AI Assistant** | Intelligent chatbot integrated with Google Gemini API for instant election queries. |
| 📍 **Find Booth** | Geolocation-based feature to help locate your nearest polling station via Google Maps. |
| 🧪 **What-If Scenarios** | An interactive sandbox to explore common election-day hurdles and official ECI solutions. |
| 🏆 **Gamified Progress** | Earn badges and track readiness with a personalized checklist. |
| 🎤 **Voice Guide** | Accessible voice-activated assistant for inclusive navigation. |
| 🌐 **Bilingual Support** | Seamless English and Hindi language toggles via `i18next`. |

---

## 🛡️ Security & Reliability

VoteVerse adheres to strict production-grade security standards:
- **Authentication:** Secure Firebase Authentication supporting both Guest Sessions and Google OAuth.
- **Environment Isolation:** Zero hardcoded secrets; fully reliant on localized `.env` variables and GitHub Secret Scanning protection.
- **API Guardrails:** Structured API response validation to prevent unhandled rejections from third-party services (Gemini API, Google Maps).
- **Zero-Downtime Deployments:** Containerized deployment on Google Cloud Run utilizing revision-based canary rollouts.

## 🧪 Testing & Quality Assurance

Engineered for stability, the application boasts a comprehensive testing suite:
- **Framework:** Powered by `Vitest` and `@testing-library/react`.
- **Component Resilience:** Robust test cases ensuring safe rendering of lazy-loaded and dynamically imported modules.
- **Accessibility Validations:** Strict enforcement of semantic HTML roles, validating screen-reader compatibility in automated tests.
- **Interactive Verification:** Full mock tests of user input interactions, state toggles, and keyboard navigation.

---

## ♿ Accessibility (A11y)

Inclusivity is at the core of VoteVerse. We comply with **WCAG 2.1 guidelines** to ensure no voter is left behind:
- ✅ **Roving Tabindex** on custom radio groups and interactive elements.
- ✅ Full **Keyboard Navigation** support for non-mouse users.
- ✅ High contrast UI styling and **ARIA labels** seamlessly integrated for screen readers.

---

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
   Create a `.env.local` file in the root directory:
   ```env
   VITE_GEMINI_API_KEY=your_gemini_api_key
   VITE_FIREBASE_API_KEY=your_firebase_api_key
   # Add additional variables as per .env.example
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) to view the application.

---

<div align="center">
  <p><i>Built for democratic education. All official guidelines referenced are sourced from the Election Commission of India (ECI).</i></p>
</div>
