import { useState, lazy, Suspense } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useUserProgress } from './hooks/useUserProgress';

// Eager-load landing for instant first paint
import LandingScreen from './components/landing/LandingScreen';
import FloatingNav from './components/navigation/FloatingNav';

// Lazy-load heavy screens for performance
const StoryMode = lazy(() => import('./components/story/StoryMode'));
const ReelsMode = lazy(() => import('./components/reels/ReelsMode'));
const EVMSimulator = lazy(() => import('./components/evm/EVMSimulator'));
const ImpactSimulator = lazy(() => import('./components/impact/ImpactSimulator'));
const ChatBot = lazy(() => import('./components/chat/ChatBot'));
const ChecklistTracker = lazy(() => import('./components/checklist/ChecklistTracker'));
const MapsLocation = lazy(() => import('./components/maps/MapsLocation'));
const VoiceAssistant = lazy(() => import('./components/voice/VoiceAssistant'));
const BadgesScreen = lazy(() => import('./components/badges/BadgesScreen'));

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
  } = useUserProgress();

  const renderScreen = () => {
    switch (currentScreen) {
      case 'landing':
        return <LandingScreen setScreen={setCurrentScreen} />;
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
      default:
        return <LandingScreen setScreen={setCurrentScreen} />;
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

      {/* Main content */}
      <Suspense fallback={<LoadingFallback />}>
        <AnimatePresence mode="wait">
          <motion.div key={currentScreen}>
            {renderScreen()}
          </motion.div>
        </AnimatePresence>
      </Suspense>

      {/* Floating navigation (hidden on landing) */}
      {currentScreen !== 'landing' && currentScreen !== 'story' && (
        <FloatingNav setScreen={setCurrentScreen} current={currentScreen} />
      )}
    </>
  );
}
