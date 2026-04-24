"use client";
import { motion } from 'framer-motion';
import { staggerContainer, staggerItem } from '../../animations/variants';

const VOTING_STEPS = [
  {
    step: 1,
    title: 'Check Eligibility',
    desc: 'You must be an Indian citizen, 18+ years old, and ordinarily resident at the polling area.',
    icon: '👤',
  },
  {
    step: 2,
    title: 'Register to Vote',
    desc: 'Fill Form 6 on the NVSP portal to get your name on the electoral roll.',
    icon: '📝',
  },
  {
    step: 3,
    title: 'Get Voter ID',
    desc: 'Receive your EPIC card. Keep it safe, it\'s your primary identification for voting.',
    icon: '🪪',
  },
  {
    step: 4,
    title: 'Find Polling Booth',
    desc: 'Locate your designated polling booth online or via SMS before election day.',
    icon: '📍',
  },
  {
    step: 5,
    title: 'Verify Identity',
    desc: 'Show your Voter ID to the First Polling Officer. Your name will be checked against the list.',
    icon: '🔎',
  },
  {
    step: 6,
    title: 'Get Inked',
    desc: 'The Second Polling Officer will mark your left index finger with indelible ink.',
    icon: '👆',
  },
  {
    step: 7,
    title: 'Sign Register',
    desc: 'Sign or provide your thumb impression in Form 17A.',
    icon: '✍️',
  },
  {
    step: 8,
    title: 'Cast Vote on EVM',
    desc: 'Press the blue button against your chosen candidate. Verify via the VVPAT slip.',
    icon: '🗳️',
  },
];

export default function VotingSteps() {
  return (
    <motion.div
      className="page-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="section-header">
        <h2 className="section-title">
          <span className="text-gradient">Step-by-Step Guide</span>
        </h2>
        <p className="section-subtitle">
          Everything you need to know from registration to casting your ballot.
        </p>
      </div>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: 'var(--space-lg)',
          marginTop: 'var(--space-xl)',
        }}
      >
        {VOTING_STEPS.map((step) => (
          <motion.div
            key={step.step}
            variants={staggerItem}
            className="glass-card"
            whileHover={{ scale: 1.05 }}
            style={{
              padding: 'var(--space-xl) var(--space-lg)',
              textAlign: 'center',
              position: 'relative',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            {/* Background Number */}
            <div style={{
              position: 'absolute',
              top: '-10px',
              right: '-10px',
              fontSize: '8rem',
              fontWeight: 900,
              color: 'var(--color-text-primary)',
              opacity: 0.03,
              lineHeight: 1,
              pointerEvents: 'none',
            }}>
              {step.step}
            </div>

            <div style={{
              fontSize: '3rem',
              marginBottom: 'var(--space-md)',
              filter: 'drop-shadow(0 4px 10px rgba(255,153,51,0.3))',
            }}>
              {step.icon}
            </div>
            
            <div style={{
              color: 'var(--color-saffron)',
              fontWeight: 700,
              fontSize: '0.9rem',
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              marginBottom: 'var(--space-sm)',
            }}>
              Step {step.step}
            </div>

            <h3 style={{
              fontSize: '1.2rem',
              fontWeight: 700,
              marginBottom: 'var(--space-md)',
              color: 'var(--color-text-primary)',
            }}>
              {step.title}
            </h3>

            <p style={{
              color: 'var(--color-text-secondary)',
              fontSize: '0.95rem',
              lineHeight: 1.6,
              margin: 0,
            }}>
              {step.desc}
            </p>
          </motion.div>
        ))}
      </motion.div>

      {/* Progress Indicator Visualization */}
      <div style={{ marginTop: 'var(--space-2xl)', textAlign: 'center' }}>
        <div style={{ 
          height: '4px', 
          background: 'var(--color-bg-tertiary)', 
          borderRadius: '2px',
          width: '100%',
          maxWidth: '600px',
          margin: '0 auto',
          position: 'relative'
        }}>
          <motion.div 
            initial={{ width: 0 }}
            whileInView={{ width: '100%' }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            style={{ 
              height: '100%', 
              background: 'linear-gradient(to right, var(--color-saffron), var(--color-green))',
              borderRadius: '2px',
            }}
          />
        </div>
      </div>
    </motion.div>
  );
}
