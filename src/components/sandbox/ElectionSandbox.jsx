"use client";
/**
 * ElectionSandbox — "What-If" edge case scenarios.
 * Users explore realistic voting dilemmas and learn proper procedures.
 */
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { staggerContainer, staggerItem } from '../../animations/variants';

const SCENARIOS = [
  {
    id: 'lost-id',
    icon: '🪪',
    title: 'Lost Voter ID on Election Day',
    question: `It's polling day and you can't find your Voter ID (EPIC). Can you still vote?`,
    answer: 'Yes! You can use any of these 12 approved alternative photo IDs:\n\n• Aadhaar Card\n• Passport\n• Driving License\n• PAN Card\n• Service ID (Govt/PSU)\n• MNREGA Job Card\n• Student ID (university)\n• Bank/Post Office passbook with photo\n• NPR Smart Card\n• Pension document with photo\n• MP/MLA/MLC ID\n• Health Insurance Smart Card\n\nAs long as you carry a valid photo ID and your name is on the electoral roll, you can vote.',
    trustLevel: 'official',
  },
  {
    id: 'moved-city',
    icon: '🏙️',
    title: 'Moved to a New City',
    question: 'You recently moved from Delhi to Bangalore for work. Can you vote at your new address?',
    answer: 'Not immediately. You must apply for a transfer of voter registration:\n\n1. Visit nvsp.in and fill Form 6 (new registration) for your Bangalore address.\n2. Alternatively, fill Form 8A to shift your registration within the same state, or Form 6 for inter-state.\n3. Attach address proof at your new location.\n4. Processing takes 2–4 weeks.\n\nUntil then, your vote is registered at your Delhi constituency — you must travel to Delhi to vote, or plan ahead.',
    trustLevel: 'official',
  },
  {
    id: 'wrong-booth',
    icon: '📍',
    title: 'Went to the Wrong Booth',
    question: `You arrive at a polling station, but the officer says your name isn't on their list. What now?`,
    answer: `You are assigned to a specific polling booth based on your registered address. If your name isn't on the list:\n\n1. Check your assigned booth on the Voter Helpline app or nvsp.in.\n2. SMS your EPIC number to 1950 or 51969 for booth details.\n3. Call the Voter Helpline at 1950.\n4. You MUST go to your assigned booth — you cannot vote at any other polling station.\n\nTip: Always verify your booth details the day before the election.`,
    trustLevel: 'official',
  },
  {
    id: 'evm-malfunction',
    icon: '⚙️',
    title: 'EVM Malfunction While Voting',
    question: `The EVM doesn't respond when you press a button. What happens?`,
    answer: 'If an EVM malfunctions during voting:\n\n1. Alert the Presiding Officer immediately.\n2. The officer will check the machine.\n3. If confirmed faulty, the EVM is replaced with a reserve unit.\n4. Your vote is NOT lost — the Presiding Officer will issue you a fresh ballot opportunity on the replacement EVM.\n5. The faulty EVM is sealed and sent for inspection.\n\nReserve EVMs are always kept at every polling station for this reason.',
    trustLevel: 'official',
  },
  {
    id: 'someone-voted',
    icon: '🚨',
    title: 'Someone Already Voted Using Your Name',
    question: 'You arrive at the booth only to discover someone has already cast a vote under your identity. What can you do?',
    answer: 'This is called "personation" and is a serious electoral offence:\n\n1. Inform the Presiding Officer immediately.\n2. You can cast a "Tendered Vote" — a separate ballot that is kept aside.\n3. The Presiding Officer records the incident in the official register.\n4. File a complaint with the Election Commission and local police.\n5. The personation case is investigated after counting.\n\nTendered votes are counted only if they can affect the result and the complaint is verified.',
    trustLevel: 'official',
  },
  {
    id: 'disability',
    icon: '♿',
    title: 'Voter with Disability',
    question: 'A voter with a visual impairment or physical disability wants to vote. What facilities are available?',
    answer: 'The Election Commission provides multiple accommodations:\n\n• Wheelchairs and ramps at every polling station.\n• Braille-enabled EVMs with tactile ballot units.\n• A companion of your choice can accompany you into the voting compartment (after filling Form 49A).\n• Postal ballot option for persons with 40%+ disability.\n• Priority entry — no waiting in queue.\n• Volunteers to assist with navigation.\n\nYou can also request a pickup service through the District Election Office.',
    trustLevel: 'official',
  },
];

const TRUST_LABELS = {
  official: { text: '🏛️ Official ECI Guidelines', className: 'trust-label-official' },
  general: { text: '📘 General Info', className: 'trust-label-general' },
  estimated: { text: '📊 Estimated', className: 'trust-label-estimated' },
  educational: { text: '📚 Educational', className: 'trust-label-educational' },
};

export default function ElectionSandbox() {
  const [openId, setOpenId] = useState(null);

  const toggleScenario = (id) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <motion.div
      className="page-container"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="section-header">
        <h2 className="section-title">
          <span className="text-gradient">What-If Scenarios</span>
        </h2>
        <p className="section-subtitle">
          Explore real voting dilemmas and learn the correct procedures.
          Every answer is based on official Election Commission guidelines.
        </p>
      </div>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        style={{ maxWidth: '700px', margin: '0 auto' }}
      >
        {SCENARIOS.map((scenario) => {
          const isOpen = openId === scenario.id;
          const trust = TRUST_LABELS[scenario.trustLevel];

          return (
            <motion.div
              key={scenario.id}
              variants={staggerItem}
              className="glass-card"
              style={{
                marginBottom: 'var(--space-md)',
                overflow: 'hidden',
                cursor: 'pointer',
              }}
              onClick={() => toggleScenario(scenario.id)}
            >
              {/* Question header */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--space-md)',
                padding: 'var(--space-lg)',
              }}>
                <span style={{ fontSize: '2rem', flexShrink: 0 }}>{scenario.icon}</span>
                <div style={{ flex: 1 }}>
                  <div style={{
                    fontWeight: 700,
                    fontSize: '1rem',
                    color: 'var(--color-text-primary)',
                    marginBottom: '4px',
                  }}>
                    {scenario.title}
                  </div>
                  <div style={{
                    fontSize: '0.85rem',
                    color: 'var(--color-text-secondary)',
                    lineHeight: 1.5,
                  }}>
                    {scenario.question}
                  </div>
                </div>
                <motion.span
                  animate={{ rotate: isOpen ? 180 : 0 }}
                  style={{ fontSize: '1.2rem', color: 'var(--color-text-tertiary)', flexShrink: 0 }}
                >
                  ▼
                </motion.span>
              </div>

              {/* Answer (collapsible) */}
              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    style={{ overflow: 'hidden' }}
                  >
                    <div style={{
                      padding: '0 var(--space-lg) var(--space-lg)',
                      borderTop: '1px solid var(--color-border)',
                      paddingTop: 'var(--space-lg)',
                    }}>
                      <div style={{
                        marginBottom: 'var(--space-md)',
                      }}>
                        <span className={`trust-label ${trust.className}`}>
                          {trust.text}
                        </span>
                      </div>
                      <div style={{
                        color: 'var(--color-text-secondary)',
                        fontSize: '0.9rem',
                        lineHeight: 1.8,
                        whiteSpace: 'pre-line',
                      }}>
                        {scenario.answer}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </motion.div>
    </motion.div>
  );
}
