"use client";
import { motion } from 'framer-motion';
import { BADGE_LIST } from '../../utils/constants';
import { staggerContainer, staggerItem } from '../../animations/variants';

export default function BadgesScreen({ badges }) {
  const unlockedCount = Object.values(badges).filter(Boolean).length;

  return (
    <motion.div
      className="page-container"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="section-header">
        <h2 className="section-title">
          <span className="text-gradient">Your Badges</span>
        </h2>
        <p className="section-subtitle">
          {unlockedCount} of {BADGE_LIST.length} badges unlocked — complete activities to earn more
        </p>
      </div>

      <motion.div
        className="badges-grid"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
      >
        {BADGE_LIST.map((badge) => {
          const isUnlocked = badges[badge.key];
          return (
            <motion.div
              key={badge.key}
              variants={staggerItem}
              className={`badge-card glass-card ${isUnlocked ? 'unlocked' : 'locked'}`}
              id={`badge-${badge.key}`}
            >
              <div className="badge-icon" style={{ filter: isUnlocked ? 'none' : 'grayscale(1)' }}>
                {badge.icon}
              </div>
              <div className="badge-title">{badge.name}</div>
              <div className="badge-desc">{badge.desc}</div>
              <div className="badge-status">
                {isUnlocked ? '✅' : '🔒'}
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </motion.div>
  );
}
