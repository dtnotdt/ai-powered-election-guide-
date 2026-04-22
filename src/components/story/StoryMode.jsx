import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { fadeInUp, scaleIn } from '../../animations/variants';

export default function StoryMode({ setScreen, completeChecklistItem, unlockBadge }) {
  const [activeScene, setActiveScene] = useState(0);
  const containerRef = useRef(null);
  const totalScenes = 6;

  const handleScroll = (e) => {
    const scrollTop = e.target.scrollTop;
    const height = window.innerHeight;
    const newScene = Math.round(scrollTop / height);
    if (newScene !== activeScene && newScene < totalScenes) {
      setActiveScene(newScene);

      // Progress tracking
      if (newScene >= 1) {
        completeChecklistItem('register');
        unlockBadge('firstStep');
      }
      if (newScene >= 2) {
        completeChecklistItem('checkId');
        completeChecklistItem('findBooth');
      }
      if (newScene >= 3) {
        completeChecklistItem('vote');
        unlockBadge('voter');
        unlockBadge('learner');
      }
    }
  };

  const scrollToScene = (index) => {
    containerRef.current?.scrollTo({
      top: index * window.innerHeight,
      behavior: 'smooth',
    });
  };

  return (
    <div className="story-container" ref={containerRef} onScroll={handleScroll}>
      {/* Exit Button */}
      <button className="back-btn" onClick={() => setScreen('landing')}>
        ← Exit Story
      </button>

      {/* Progress Bar */}
      <div
        className="story-progress"
        style={{ width: `${(activeScene / (totalScenes - 1)) * 100}%` }}
      />

      {/* Navigation Dots */}
      <div className="story-dots">
        {Array.from({ length: totalScenes }).map((_, i) => (
          <div
            key={i}
            className={`story-dot ${activeScene === i ? 'active' : ''}`}
            onClick={() => scrollToScene(i)}
            role="button"
            tabIndex={0}
            aria-label={`Go to scene ${i + 1}`}
          />
        ))}
      </div>

      {/* SCENE 0: Introduction */}
      <div className="story-scene scene-bg-intro">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.5 }}
          variants={fadeInUp}
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
        >
          <div className="scene-avatar">👦🏽</div>
          <h2 className="scene-heading" style={{ marginTop: '32px' }}>
            Meet <span className="text-gradient">Aarav</span>
          </h2>
          <p className="scene-subtext">
            This is his first time voting.
            <br />
            Follow his journey into democracy.
          </p>
        </motion.div>
        {activeScene === 0 && (
          <button className="btn btn-ghost scene-next-btn" onClick={() => scrollToScene(1)}>
            Begin Journey ↓
          </button>
        )}
      </div>

      {/* SCENE 1: Registration */}
      <div className="story-scene scene-bg-register">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.5 }}
          variants={fadeInUp}
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', zIndex: 10 }}
        >
          <h2 className="scene-heading">Step 1: Registration</h2>
          <p className="scene-subtext">
            First, Aarav checks if he's registered on the electoral roll.
          </p>

          <motion.div variants={scaleIn} style={{ marginTop: '32px', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div className="scene-step-card">
              <span className="scene-step-icon">💻</span>
              <div>Visit <strong>voters.eci.gov.in</strong></div>
            </div>
            <div className="scene-step-card">
              <span className="scene-step-icon">📝</span>
              <div>Fill out <strong>Form 6</strong> online</div>
            </div>
            <div className="scene-step-card">
              <span className="scene-step-icon">📸</span>
              <div>Upload address proof &amp; photograph</div>
            </div>
            <div className="scene-step-card">
              <span className="scene-step-icon">🪪</span>
              <div>Receive <strong>EPIC</strong> (Voter ID Card)</div>
            </div>
          </motion.div>
        </motion.div>
        {activeScene === 1 && (
          <button className="btn btn-ghost scene-next-btn" onClick={() => scrollToScene(2)}>
            Next Step ↓
          </button>
        )}
      </div>

      {/* SCENE 2: Finding Booth */}
      <div className="story-scene scene-bg-booth">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.5 }}
          variants={fadeInUp}
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', zIndex: 10 }}
        >
          <h2 className="scene-heading">Step 2: Find Your Booth</h2>
          <p className="scene-subtext">
            Election day arrives. Where does Aarav go to cast his vote?
          </p>

          <motion.div
            variants={scaleIn}
            style={{
              marginTop: '32px',
              width: '90%',
              maxWidth: '480px',
              height: '280px',
              borderRadius: 'var(--radius-xl)',
              overflow: 'hidden',
              position: 'relative',
              background: 'linear-gradient(135deg, rgba(19, 136, 8, 0.15) 0%, rgba(6, 182, 212, 0.1) 100%)',
              border: '1px solid var(--color-border)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {/* Stylized map representation */}
            <div style={{ position: 'absolute', inset: 0, opacity: 0.1 }}>
              <div style={{ position: 'absolute', top: '35%', left: 0, width: '100%', height: '2px', background: 'rgba(255,255,255,0.3)' }} />
              <div style={{ position: 'absolute', top: '60%', left: 0, width: '100%', height: '2px', background: 'rgba(255,255,255,0.2)' }} />
              <div style={{ position: 'absolute', top: 0, left: '45%', width: '2px', height: '100%', background: 'rgba(255,255,255,0.3)' }} />
              <div style={{ position: 'absolute', top: 0, left: '70%', width: '2px', height: '100%', background: 'rgba(255,255,255,0.2)' }} />
            </div>
            <motion.div
              initial={{ opacity: 0, y: -50, scale: 0 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 0.5, type: 'spring', bounce: 0.4 }}
              style={{ fontSize: '4rem', zIndex: 10, filter: 'drop-shadow(0 4px 20px rgba(255, 153, 51, 0.4))' }}
            >
              📍
            </motion.div>
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: [0, 2, 2.5], opacity: [0, 0.3, 0] }}
              transition={{ delay: 0.8, duration: 2, repeat: Infinity }}
              style={{
                position: 'absolute',
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                border: '2px solid var(--color-saffron)',
              }}
            />
          </motion.div>
        </motion.div>
        {activeScene === 2 && (
          <button className="btn btn-ghost scene-next-btn" onClick={() => scrollToScene(3)}>
            Next Step ↓
          </button>
        )}
      </div>

      {/* SCENE 3: Voting (EVM) */}
      <div className="story-scene scene-bg-voting">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.5 }}
          variants={fadeInUp}
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', zIndex: 10 }}
        >
          <h2 className="scene-heading">Step 3: The EVM</h2>
          <p className="scene-subtext">
            Aarav enters the voting compartment and faces the Electronic Voting Machine.
          </p>

          <motion.div
            variants={scaleIn}
            style={{
              marginTop: '32px',
              background: 'rgba(15, 15, 30, 0.9)',
              borderRadius: 'var(--radius-xl)',
              padding: '24px',
              border: '1px solid var(--color-border)',
              maxWidth: '340px',
              width: '90%',
            }}
          >
            <div style={{
              background: '#000',
              borderRadius: 'var(--radius-md)',
              padding: '16px',
              marginBottom: '16px',
              textAlign: 'center',
              fontFamily: "'Courier New', monospace",
              color: '#00ff41',
              fontSize: '0.9rem',
              textShadow: '0 0 10px rgba(0,255,65,0.3)',
            }}>
              READY FOR VOTE
            </div>
            {['Party A 🌸', 'Party B 🖐️', 'Party C ⚡'].map((party, i) => (
              <div
                key={i}
                style={{
                  padding: '12px',
                  margin: '4px 0',
                  borderRadius: 'var(--radius-md)',
                  background: ['#FF9933', '#138808', '#000080'][i],
                  color: 'white',
                  fontWeight: 700,
                  fontSize: '0.9rem',
                  textAlign: 'center',
                  opacity: 0.8,
                }}
              >
                {party}
              </div>
            ))}
          </motion.div>
        </motion.div>
        {activeScene === 3 && (
          <button className="btn btn-ghost scene-next-btn" onClick={() => scrollToScene(4)}>
            Next Step ↓
          </button>
        )}
      </div>

      {/* SCENE 4: After Voting */}
      <div className="story-scene scene-bg-after">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.5 }}
          variants={fadeInUp}
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}
        >
          <h2 className="scene-heading">Secure &amp; Verified</h2>
          <p className="scene-subtext">
            His vote is encrypted in the EVM and verified via VVPAT — a paper trail for transparency.
          </p>

          <div style={{ marginTop: '40px', display: 'flex', alignItems: 'center', gap: '20px' }}>
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ delay: 0.3, type: 'spring', bounce: 0.3 }}
              style={{ fontSize: '4rem' }}
            >
              🗳️
            </motion.div>
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: '120px' }}
              transition={{ delay: 0.5, duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
              style={{
                height: '3px',
                background: 'var(--gradient-secondary)',
                borderRadius: '2px',
              }}
            />
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ delay: 1.2, type: 'spring', bounce: 0.3 }}
              style={{ fontSize: '4rem' }}
            >
              🛡️
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5 }}
            style={{
              marginTop: '32px',
              padding: '16px 24px',
              background: 'rgba(16, 185, 129, 0.08)',
              border: '1px solid rgba(16, 185, 129, 0.15)',
              borderRadius: 'var(--radius-lg)',
              color: '#10b981',
              fontWeight: 600,
              fontSize: '0.9rem',
            }}
          >
            ✓ Vote recorded securely &amp; anonymously
          </motion.div>
        </motion.div>
        {activeScene === 4 && (
          <button className="btn btn-ghost scene-next-btn" onClick={() => scrollToScene(5)}>
            See the Impact ↓
          </button>
        )}
      </div>

      {/* SCENE 5: Results */}
      <div className="story-scene scene-bg-results">
        {/* Confetti */}
        {activeScene === 5 && (
          <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
            {Array.from({ length: 40 }).map((_, i) => (
              <div
                key={i}
                style={{
                  position: 'absolute',
                  left: `${Math.random() * 100}%`,
                  top: '-10px',
                  width: `${Math.random() * 8 + 4}px`,
                  height: `${Math.random() * 8 + 4}px`,
                  background: ['#FF9933', '#138808', '#06b6d4', '#ec4899', '#7c3aed'][Math.floor(Math.random() * 5)],
                  borderRadius: Math.random() > 0.5 ? '50%' : '0',
                  animation: `confettiFall ${Math.random() * 3 + 2}s linear ${Math.random() * 2}s infinite`,
                }}
              />
            ))}
          </div>
        )}

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.5 }}
          variants={fadeInUp}
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', zIndex: 10 }}
        >
          <h2 className="scene-heading">
            Every Vote <span className="text-gradient">Counts</span>
          </h2>
          <p className="scene-subtext" style={{ marginBottom: '40px' }}>
            Aarav just shaped the future of his nation. Now it's your turn.
          </p>

          {/* Result bars */}
          <div style={{ width: '100%', maxWidth: '420px' }}>
            {[
              { name: 'Party A', width: '78%', color: '#FF9933', votes: '85M' },
              { name: 'Party B', width: '62%', color: '#138808', votes: '65M' },
              { name: 'Party C', width: '45%', color: '#1e1b4b', votes: '42M' },
            ].map((party, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px', margin: '10px 0' }}>
                <div style={{ color: 'white', fontWeight: 600, minWidth: '80px', fontSize: '0.85rem' }}>
                  {party.name}
                </div>
                <div style={{
                  flex: 1,
                  height: '24px',
                  background: 'rgba(255,255,255,0.06)',
                  borderRadius: '12px',
                  overflow: 'hidden',
                }}>
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: party.width }}
                    transition={{ duration: 1.5, delay: 0.2 * (i + 1), ease: [0.16, 1, 0.3, 1] }}
                    style={{
                      height: '100%',
                      background: party.color,
                      borderRadius: '12px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'flex-end',
                      paddingRight: '10px',
                      fontSize: '0.75rem',
                      color: 'white',
                      fontWeight: 700,
                    }}
                  >
                    {party.votes}
                  </motion.div>
                </div>
              </div>
            ))}
          </div>

          <button
            className="btn btn-primary"
            onClick={() => setScreen('evm')}
            style={{ marginTop: '40px' }}
          >
            Try Interactive EVM ⚡
          </button>
        </motion.div>
      </div>

      {/* Confetti keyframes injected via style tag */}
      <style>{`
        @keyframes confettiFall {
          0% { transform: translateY(-10vh) rotate(0deg); opacity: 1; }
          100% { transform: translateY(110vh) rotate(720deg); opacity: 0; }
        }
      `}</style>
    </div>
  );
}
