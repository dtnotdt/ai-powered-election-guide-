import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { REELS_DATA } from '../../utils/constants';
import { fadeInUp } from '../../animations/variants';

export default function ReelsMode({ setScreen }) {
  const [activeReel, setActiveReel] = useState(0);
  const containerRef = useRef(null);

  const handleScroll = (e) => {
    const scrollTop = e.target.scrollTop;
    const slideHeight = e.target.clientHeight;
    const newIndex = Math.round(scrollTop / slideHeight);
    if (newIndex !== activeReel && newIndex < REELS_DATA.length) {
      setActiveReel(newIndex);
    }
  };

  return (
    <div className="page-container">
      <motion.div
        className="section-header"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h2 className="section-title">
          <span className="text-gradient">Quick Learn</span>
        </h2>
        <p className="section-subtitle">Swipe through bite-sized election knowledge</p>
      </motion.div>

      <div className="reels-container" ref={containerRef} onScroll={handleScroll}>
        {/* Scroll indicator */}
        <div className="reel-indicator">
          {REELS_DATA.map((_, i) => (
            <div
              key={i}
              className={`reel-indicator-dot ${activeReel === i ? 'active' : ''}`}
            />
          ))}
        </div>

        {REELS_DATA.map((reel, idx) => (
          <div
            key={idx}
            className="reel-slide"
            style={{ background: reel.gradient }}
          >
            {/* Subtle bg pattern */}
            <div style={{
              position: 'absolute',
              inset: 0,
              backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.03) 1px, transparent 1px)',
              backgroundSize: '30px 30px',
              pointerEvents: 'none',
            }} />

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.6 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: 10, position: 'relative' }}
            >
              {/* Big stat */}
              <div className="reel-stat text-gradient">{reel.stat}</div>
              <div className="reel-stat-label">{reel.statLabel}</div>

              {/* Content */}
              <h3 className="reel-title">{reel.title}</h3>
              <p className="reel-text">{reel.text}</p>
            </motion.div>

            {/* Bottom gradient fade */}
            <div style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              height: '120px',
              background: 'linear-gradient(transparent, rgba(0,0,0,0.3))',
              pointerEvents: 'none',
            }} />
          </div>
        ))}
      </div>
    </div>
  );
}
