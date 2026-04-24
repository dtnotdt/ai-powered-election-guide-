"use client";
import { motion } from 'framer-motion';

const TIMELINE_EVENTS = [
  {
    id: 1,
    title: 'Voter Registration',
    date: 'Months before Election',
    description: 'Ensure your name is on the electoral roll. You can apply online via the NVSP portal by submitting Form 6 along with your age and address proofs.',
    icon: '📝',
  },
  {
    id: 2,
    title: 'Verification',
    date: 'Weeks before Election',
    description: 'Receive your Voter ID (EPIC). Alternatively, keep approved documents like Aadhaar, Passport, or Driving License ready for polling day.',
    icon: '🪪',
  },
  {
    id: 3,
    title: 'Campaigning Ends',
    date: '48 Hours before Polling',
    description: 'All public political campaigning, rallies, and advertisements must stop to allow voters a silent period to reflect and decide.',
    icon: '🔇',
  },
  {
    id: 4,
    title: 'Polling Day',
    date: 'Election Day (7:00 AM - 6:00 PM)',
    description: 'Visit your assigned polling booth. Present your ID, receive the indelible ink mark, and cast your vote secretly on the EVM.',
    icon: '🗳️',
  },
  {
    id: 5,
    title: 'Counting of Votes',
    date: 'Counting Day',
    description: 'EVMs are unsealed under strict security. Votes are counted in the presence of party representatives to ensure transparency.',
    icon: '📊',
  },
  {
    id: 6,
    title: 'Results Declared',
    date: 'End of Counting Day',
    description: 'The Election Commission declares the final results. The candidate with the most votes in a constituency becomes the elected representative.',
    icon: '🇮🇳',
  },
];

export default function VotingTimeline() {
  return (
    <motion.div
      className="page-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="section-header">
        <h2 className="section-title">
          <span className="text-gradient">Election Timeline</span>
        </h2>
        <p className="section-subtitle">
          The step-by-step journey of the world's largest democratic exercise.
        </p>
      </div>

      <div style={{
        position: 'relative',
        maxWidth: '800px',
        margin: '0 auto',
        padding: 'var(--space-xl) 0',
      }}>
        {/* Vertical Line */}
        <div style={{
          position: 'absolute',
          left: '50%',
          top: 0,
          bottom: 0,
          width: '2px',
          background: 'linear-gradient(to bottom, var(--color-saffron), var(--color-white), var(--color-green))',
          transform: 'translateX(-50%)',
          opacity: 0.3,
        }} />

        {TIMELINE_EVENTS.map((event, index) => {
          const isEven = index % 2 === 0;
          return (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 50, x: isEven ? -50 : 50 }}
              whileInView={{ opacity: 1, y: 0, x: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6, type: 'spring' }}
              style={{
                display: 'flex',
                justifyContent: isEven ? 'flex-start' : 'flex-end',
                alignItems: 'center',
                width: '100%',
                marginBottom: 'var(--space-2xl)',
                position: 'relative',
              }}
            >
              {/* Center Dot */}
              <div style={{
                position: 'absolute',
                left: '50%',
                top: '50%',
                transform: 'translate(-50%, -50%)',
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                background: 'var(--color-bg-secondary)',
                border: '2px solid var(--color-saffron)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '1.2rem',
                zIndex: 2,
                boxShadow: '0 0 15px rgba(255, 153, 51, 0.3)',
              }}>
                {event.icon}
              </div>

              {/* Content Card */}
              <div style={{
                width: 'calc(50% - 40px)',
                textAlign: isEven ? 'right' : 'left',
                padding: 'var(--space-lg)',
              }} className="glass-card">
                <div style={{
                  color: 'var(--color-saffron)',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  marginBottom: 'var(--space-xs)',
                }}>
                  {event.date}
                </div>
                <h3 style={{
                  fontSize: '1.25rem',
                  fontWeight: 700,
                  color: 'var(--color-text-primary)',
                  marginBottom: 'var(--space-sm)',
                }}>
                  {event.title}
                </h3>
                <p style={{
                  color: 'var(--color-text-secondary)',
                  fontSize: '0.95rem',
                  lineHeight: 1.6,
                  margin: 0,
                }}>
                  {event.description}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
