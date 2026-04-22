import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PARTIES } from '../../utils/constants';
import { fadeInUp, staggerContainer, staggerItem } from '../../animations/variants';

export default function EVMSimulator({ setScreen, evmVote, setEvmVote, unlockBadge }) {
  const [displayText, setDisplayText] = useState('READY FOR VOTE\nPress any party button to cast your vote');
  const [confirmLight, setConfirmLight] = useState(false);
  const [voted, setVoted] = useState(false);
  const [selectedParty, setSelectedParty] = useState(null);

  const handleVote = (party) => {
    if (voted) {
      setDisplayText('⚠ You have already voted!\nEach citizen gets one vote per election.');
      return;
    }

    setSelectedParty(party.id);
    setDisplayText(`SELECTED: ${party.name}\n\nConfirming vote...`);
    setEvmVote(party);

    setTimeout(() => {
      setConfirmLight(true);
      setDisplayText(`✓ VOTE RECORDED\n\nYou voted for: ${party.name}\nThank you for participating!`);
      unlockBadge('voter');
      setVoted(true);

      // Play confirmation beep
      try {
        const ctx = new AudioContext();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.frequency.value = 800;
        gain.gain.value = 0.1;
        osc.start();
        osc.stop(ctx.currentTime + 0.15);
      } catch {
        // Audio not available
      }
    }, 800);

    setTimeout(() => setConfirmLight(false), 3000);
  };

  const handleReset = () => {
    setVoted(false);
    setEvmVote(null);
    setSelectedParty(null);
    setDisplayText('READY FOR VOTE\nPress any party button to cast your vote');
    setConfirmLight(false);
  };

  return (
    <motion.div
      className="page-container"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="section-header">
        <h2 className="section-title">
          <span className="text-gradient">EVM Simulator</span>
        </h2>
        <p className="section-subtitle">
          Experience the Electronic Voting Machine — exactly as it works in real elections
        </p>
      </div>

      <div className="evm-wrapper">
        <div className="evm-machine">
          {/* Screen */}
          <div className="evm-screen">
            <div className="evm-display-text">{displayText}</div>
            <div className={`evm-confirm-light ${confirmLight ? 'active' : ''}`} />
          </div>

          {/* Party buttons */}
          <motion.div
            className="evm-buttons"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            {PARTIES.map((party) => (
              <motion.button
                key={party.id}
                variants={staggerItem}
                className={`evm-party-btn ${selectedParty === party.id ? 'selected' : ''}`}
                style={{ background: party.color }}
                onClick={() => handleVote(party)}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                id={`evm-btn-${party.id}`}
              >
                <span className="evm-party-symbol">{party.symbol}</span>
                <span>{party.shortName}</span>
              </motion.button>
            ))}
          </motion.div>

          {/* Reset button */}
          <div style={{ marginTop: 'var(--space-xl)', textAlign: 'center' }}>
            <button className="btn btn-ghost btn-sm" onClick={handleReset} id="evm-reset">
              🔄 Reset Simulator
            </button>
          </div>
        </div>

        {/* VVPAT Info */}
        <AnimatePresence>
          {voted && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="glass-card"
              style={{ marginTop: 'var(--space-xl)', padding: 'var(--space-xl)', textAlign: 'center' }}
            >
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '8px', color: 'var(--color-accent-emerald)' }}>
                🛡️ VVPAT Verification
              </h3>
              <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem', lineHeight: 1.7 }}>
                In a real election, a VVPAT slip showing your selected candidate is displayed
                for 7 seconds — allowing you to verify your vote was recorded correctly.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
