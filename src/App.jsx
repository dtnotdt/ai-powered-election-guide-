"use client";
import { useState, Suspense } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import dynamic from 'next/dynamic';

import { useUserProgress } from './hooks/useUserProgress';
import { logout } from './services/firebase';
import './i18n'; // import the configuration

// Core Components
import AuthGate from './components/auth/AuthGate';
import LandingScreen from './components/landing/LandingScreen';
import FloatingNav from './components/navigation/FloatingNav';
import UserPill from './components/auth/UserPill';
import LanguageToggle from './components/navigation/LanguageToggle';
import LoadingFallback from './components/ui/LoadingFallback';

// Lazy-load heavy screens for performance (disable SSR for heavy canvas/maps libraries)
const StoryMode = dynamic(() => import('./components/story/StoryMode'), { ssr: false });
const ReelsMode = dynamic(() => import('./components/reels/ReelsMode'), { ssr: false });
const EVMSimulator = dynamic(() => import('./components/evm/EVMSimulator'), { ssr: false });
const ImpactSimulator = dynamic(() => import('./components/impact/ImpactSimulator'), { ssr: false });
const ChatBot = dynamic(() => import('./components/chat/ChatBot'), { ssr: false });
const ChecklistTracker = dynamic(() => import('./components/checklist/ChecklistTracker'), { ssr: false });
const MapsLocation = dynamic(() => import('./components/maps/MapsLocation'), { ssr: false });
const VoiceAssistant = dynamic(() => import('./components/voice/VoiceAssistant'), { ssr: false });
const BadgesScreen = dynamic(() => import('./components/badges/BadgesScreen'), { ssr: false });
const VotingGallery = dynamic(() => import('./components/gallery/VotingGallery'), { ssr: false });
const VotingTimeline = dynamic(() => import('./components/timeline/VotingTimeline'), { ssr: false });
const VotingSteps = dynamic(() => import('./components/steps/VotingSteps'), { ssr: false });
const ElectionSandbox = dynamic(() => import('./components/sandbox/ElectionSandbox'), { ssr: false });



export default function App() {
  const [currentScreen, setCurrentScreen] = useState('landing');
  const {
    checklist,
    badges,
    evmVote,
    setEvmVote,
    toggleChecklistItem,
    completeChecklistItem,
    unlockBadge,
    progress,
    resetProgress,
    user,
    loadingUser,
  } = useUserProgress();

  // Handle logout: sign out, reset screen to landing
  const handleLogout = async () => {
    await logout();
    setCurrentScreen('landing');
  };

  // ── AUTH GATE: mandatory entry point ──
  // Show auth gate if no user is signed in (and not loading)
  if (!user && !loadingUser) {
    return <AuthGate loadingUser={loadingUser} />;
  }

  // Show loading while Firebase resolves session
  if (loadingUser) {
    return <AuthGate loadingUser={true} />;
  }

  // ── ROUTE MAP ──
  const ScreenComponents = {
    landing: () => <LandingScreen setScreen={setCurrentScreen} user={user} />,
    story: () => <StoryMode setScreen={setCurrentScreen} completeChecklistItem={completeChecklistItem} unlockBadge={unlockBadge} />,
    reels: () => <ReelsMode setScreen={setCurrentScreen} />,
    evm: () => <EVMSimulator setScreen={setCurrentScreen} evmVote={evmVote} setEvmVote={setEvmVote} unlockBadge={unlockBadge} />,
    impact: () => <ImpactSimulator setScreen={setCurrentScreen} />,
    chat: () => <ChatBot setScreen={setCurrentScreen} />,
    checklist: () => <ChecklistTracker checklist={checklist} toggleChecklistItem={toggleChecklistItem} progress={progress} />,
    maps: () => <MapsLocation setScreen={setCurrentScreen} />,
    voice: () => <VoiceAssistant setScreen={setCurrentScreen} />,
    badges: () => <BadgesScreen badges={badges} />,
    gallery: () => <VotingGallery setScreen={setCurrentScreen} />,
    timeline: () => <VotingTimeline setScreen={setCurrentScreen} />,
    steps: () => <VotingSteps setScreen={setCurrentScreen} />,
    sandbox: () => <ElectionSandbox setScreen={setCurrentScreen} />
  };

  const renderScreen = () => {
    const Component = ScreenComponents[currentScreen] || ScreenComponents.landing;
    return Component();
  };

  return (
    <>
      {/* Ambient background orbs */}
      <div className="ambient-bg" aria-hidden="true">
        <div className="ambient-orb ambient-orb-1" />
        <div className="ambient-orb ambient-orb-2" />
        <div className="ambient-orb ambient-orb-3" />
      </div>

      {/* Noise texture overlay */}
      <div className="noise-overlay" aria-hidden="true" />

      {/* User identity pill — persistent across screens */}
      {currentScreen !== 'story' && (
        <UserPill user={user} onLogout={handleLogout} />
      )}

      {/* Language Toggle */}
      <LanguageToggle />

      {/* Main content */}
      <Suspense fallback={<LoadingFallback />}>
        <AnimatePresence mode="wait">
          <motion.div key={currentScreen}>
            {renderScreen()}
          </motion.div>
        </AnimatePresence>
      </Suspense>

      {/* Floating navigation (hidden on landing and story) */}
      {currentScreen !== 'landing' && currentScreen !== 'story' && (
        <FloatingNav setScreen={setCurrentScreen} current={currentScreen} />
      )}
    </>
  );
}
