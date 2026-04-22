import { motion } from 'framer-motion';
import { fadeInUp, staggerContainer, staggerItem } from '../../animations/variants';
import '../../styles/landing.css';

export default function LandingScreen({ setScreen }) {
  return (
    <div className="landing">
      {/* Background layers */}
      <div className="landing-bg">
        <div className="landing-bg-gradient" />
        <div className="landing-grid" />
      </div>

      <motion.div
        className="landing-content"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        {/* Status badge */}
        <motion.div className="landing-badge" variants={staggerItem}>
          <span className="landing-badge-dot" />
          Interactive Election Education
        </motion.div>

        {/* Title */}
        <motion.h1 className="landing-title" variants={staggerItem}>
          <span className="text-gradient-tricolor">VoteVerse</span>
          <br />
          <span style={{ color: 'var(--color-text-primary)' }}>India</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p className="landing-subtitle" variants={staggerItem}>
          Your cinematic journey through the world's largest democracy.
          Learn, simulate, and understand the power of your vote.
        </motion.p>

        {/* Actions */}
        <motion.div className="landing-actions" variants={staggerItem}>
          <div className="landing-primary-actions">
            <button
              className="btn btn-primary btn-lg"
              onClick={() => setScreen('story')}
              id="btn-story-mode"
            >
              🎬 Cinematic Story
            </button>
            <button
              className="btn btn-secondary btn-lg"
              onClick={() => setScreen('evm')}
              id="btn-evm-sim"
            >
              ⚡ EVM Simulator
            </button>
          </div>

          <div className="landing-secondary-actions">
            <button
              className="btn btn-ghost btn-sm"
              onClick={() => setScreen('reels')}
              id="btn-reels"
            >
              📱 Quick Learn
            </button>
            <button
              className="btn btn-ghost btn-sm"
              onClick={() => setScreen('chat')}
              id="btn-chat"
            >
              🤖 AI Assistant
            </button>
            <button
              className="btn btn-ghost btn-sm"
              onClick={() => setScreen('maps')}
              id="btn-maps"
            >
              📍 Find Booth
            </button>
            <button
              className="btn btn-ghost btn-sm"
              onClick={() => setScreen('voice')}
              id="btn-voice"
            >
              🎤 Voice Guide
            </button>
          </div>
        </motion.div>
      </motion.div>

      {/* Footer */}
      <motion.div
        className="landing-footer"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        Built for democratic education • VoteVerse India
      </motion.div>
    </div>
  );
}
