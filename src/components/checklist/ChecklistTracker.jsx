import { motion } from 'framer-motion';
import { CHECKLIST_ITEMS } from '../../utils/constants';
import { staggerContainer, staggerItem } from '../../animations/variants';

export default function ChecklistTracker({ checklist, toggleChecklistItem, progress }) {
  return (
    <motion.div
      className="page-container"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="section-header">
        <h2 className="section-title">
          <span className="text-gradient">Progress Tracker</span>
        </h2>
        <p className="section-subtitle">
          Track your journey from registration to casting your vote
        </p>
      </div>

      <div className="checklist-wrapper">
        {/* Progress bar */}
        <div className="checklist-progress-container">
          <div className="checklist-progress-bar">
            <div className="checklist-progress-fill" style={{ width: `${progress}%` }} />
          </div>
          <div className="checklist-progress-text">
            <span>{progress.toFixed(0)}% Complete</span>
            <span>{Object.values(checklist).filter(Boolean).length} / {CHECKLIST_ITEMS.length} steps</span>
          </div>
        </div>

        {/* Items */}
        <motion.div variants={staggerContainer} initial="hidden" animate="visible">
          {CHECKLIST_ITEMS.map((item) => (
            <motion.div
              key={item.key}
              variants={staggerItem}
              className="checklist-item glass-card"
              onClick={() => toggleChecklistItem(item.key)}
              role="button"
              tabIndex={0}
              aria-label={`${item.text}: ${checklist[item.key] ? 'completed' : 'pending'}`}
              id={`checklist-${item.key}`}
            >
              <span className="checklist-item-icon">{item.icon}</span>
              <div className="checklist-item-content">
                <div className="checklist-item-title">{item.text}</div>
                <div className="checklist-item-desc">{item.description}</div>
              </div>
              <span className="checklist-item-status">
                {checklist[item.key] ? '✅' : '⏳'}
              </span>
            </motion.div>
          ))}
        </motion.div>

        {/* Completion message */}
        {progress === 100 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-card"
            style={{
              marginTop: 'var(--space-xl)',
              padding: 'var(--space-xl)',
              textAlign: 'center',
              borderColor: 'rgba(255, 153, 51, 0.2)',
              boxShadow: 'var(--shadow-glow-saffron)',
            }}
          >
            <div style={{ fontSize: '2.5rem', marginBottom: '12px' }}>🎉</div>
            <h3 style={{ fontSize: '1.3rem', fontWeight: 700, marginBottom: '8px' }}>
              <span className="text-gradient">Congratulations!</span>
            </h3>
            <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.95rem' }}>
              You've completed all steps. You're ready to vote and shape India's future!
            </p>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
