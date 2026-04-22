import { motion } from 'framer-motion';

const NAV_ITEMS = [
  { id: 'story', icon: '🏠', label: 'Home' },
  { id: 'evm', icon: '⚡', label: 'EVM' },
  { id: 'chat', icon: '🤖', label: 'AI' },
  { id: 'maps', icon: '📍', label: 'Booth' },
  { id: 'checklist', icon: '✅', label: 'Track' },
  { id: 'badges', icon: '🏆', label: 'Badges' },
];

export default function FloatingNav({ setScreen, current }) {
  return (
    <motion.nav
      className="floating-nav"
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.3, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      role="navigation"
      aria-label="Main navigation"
    >
      {NAV_ITEMS.map((item) => (
        <button
          key={item.id}
          className={`nav-item ${current === item.id ? 'active' : ''}`}
          onClick={() => setScreen(item.id)}
          aria-label={item.label}
          aria-current={current === item.id ? 'page' : undefined}
          id={`nav-${item.id}`}
        >
          <span>{item.icon}</span>
          <span className="nav-item-label">{item.label}</span>
        </button>
      ))}
    </motion.nav>
  );
}
