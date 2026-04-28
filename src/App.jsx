"use client";
import { useState, Suspense } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useUserProgress } from './hooks/useUserProgress';
import { logout } from './services/firebase';

// Eager-load auth gate and landing for instant first paint
import AuthGate from './components/auth/AuthGate';
import LandingScreen from './components/landing/LandingScreen';
import FloatingNav from './components/navigation/FloatingNav';

import dynamic from 'next/dynamic';

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

// Loading fallback
function LoadingFallback() {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      background: 'var(--color-bg-primary)',
    }}>
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        style={{
          width: '40px',
          height: '40px',
          borderRadius: '50%',
          border: '3px solid var(--color-border)',
          borderTopColor: 'var(--color-saffron)',
        }}
      />
    </div>
  );
}

// User profile pill — shown in all screens
function UserPill({ user, onLogout }) {
  if (!user) return null;

  const displayName = user.displayName || (user.isAnonymous ? 'Guest' : 'Voter');
  const photoURL = user.photoURL;
  const initial = displayName.charAt(0).toUpperCase();

  return (
    <button
      className="user-pill"
      onClick={onLogout}
      title={`Signed in as ${displayName}. Click to sign out.`}
      id="user-pill"
    >
      <div className="user-pill-avatar">
        {photoURL ? (
          <img src={photoURL} alt="" referrerPolicy="no-referrer" />
        ) : (
          initial
        )}
      </div>
      <span className="user-pill-name">{displayName}</span>
    </button>
  );
}

// Language Toggle Component
import { useTranslation } from 'react-i18next';
import './i18n'; // import the configuration

function LanguageToggle() {
  const { i18n } = useTranslation();
  
  const toggleLang = () => {
    const newLang = i18n.language === 'en' ? 'hi' : 'en';
    i18n.changeLanguage(newLang);
  };

  return (
    <button
      onClick={toggleLang}
      style={{
        position: 'fixed',
        top: '20px',
        left: '20px',
        background: 'rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        borderRadius: '20px',
        padding: '8px 16px',
        color: 'white',
        fontWeight: 'bold',
        cursor: 'pointer',
        zIndex: 1000,
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
      }}
      title="Toggle Language"
    >
      {i18n.language === 'en' ? '🇮🇳 हिन्दी' : '🇬🇧 English'}
    </button>
  );
}

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

  // ── PROTECTED APP ──
  const renderScreen = () => {
    switch (currentScreen) {
      case 'landing':
        return <LandingScreen setScreen={setCurrentScreen} user={user} />;
      case 'story':
        return (
          <StoryMode
            setScreen={setCurrentScreen}
            completeChecklistItem={completeChecklistItem}
            unlockBadge={unlockBadge}
          />
        );
      case 'reels':
        return <ReelsMode setScreen={setCurrentScreen} />;
      case 'evm':
        return (
          <EVMSimulator
            setScreen={setCurrentScreen}
            evmVote={evmVote}
            setEvmVote={setEvmVote}
            unlockBadge={unlockBadge}
          />
        );
      case 'impact':
        return <ImpactSimulator setScreen={setCurrentScreen} />;
      case 'chat':
        return <ChatBot setScreen={setCurrentScreen} />;
      case 'checklist':
        return (
          <ChecklistTracker
            checklist={checklist}
            toggleChecklistItem={toggleChecklistItem}
            progress={progress}
          />
        );
      case 'maps':
        return <MapsLocation setScreen={setCurrentScreen} />;
      case 'voice':
        return <VoiceAssistant setScreen={setCurrentScreen} />;
      case 'badges':
        return <BadgesScreen badges={badges} />;
      case 'gallery':
        return <VotingGallery setScreen={setCurrentScreen} />;
      case 'timeline':
        return <VotingTimeline setScreen={setCurrentScreen} />;
      case 'steps':
        return <VotingSteps setScreen={setCurrentScreen} />;
      case 'sandbox':
        return <ElectionSandbox setScreen={setCurrentScreen} />;
      default:
        return <LandingScreen setScreen={setCurrentScreen} user={user} />;
    }
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
