"use client";
import { motion } from 'framer-motion';
import { staggerContainer, staggerItem } from '../../animations/variants';

const GALLERY_IMAGES = [
  {
    id: 1,
    url: '/images/youth_voting.png',
    alt: 'Diverse Indian crowd',
    caption: 'Democracy is Diversity',
  },
  {
    id: 2,
    url: '/images/women_voting.png',
    alt: 'Elderly person voting',
    caption: 'Every Age Matters',
  },
  {
    id: 3,
    url: '/images/indian_flag_abstract.png',
    alt: 'Rural India voting',
    caption: 'Reaching Every Corner',
  },
  {
    id: 4,
    url: '/images/youth_voting.png',
    alt: 'Youth of India',
    caption: 'The Future is Youth',
  },
  {
    id: 5,
    url: '/images/women_voting.png',
    alt: 'Women empowerment',
    caption: 'Empowered Women, Empowered Nation',
  },
  {
    id: 6,
    url: '/images/indian_flag_abstract.png',
    alt: 'Indian flag colors',
    caption: 'Your Vote Matters',
  },
];

export default function VotingGallery() {
  return (
    <motion.div
      className="page-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="section-header">
        <h2 className="section-title">
          <span className="text-gradient">Faces of Democracy</span>
        </h2>
        <p className="section-subtitle">
          A glimpse into the diverse millions who shape the nation.
        </p>
      </div>

      <motion.div 
        className="gallery-grid"
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: 'var(--space-lg)',
          marginTop: 'var(--space-xl)',
        }}
      >
        {GALLERY_IMAGES.map((img) => (
          <motion.div
            key={img.id}
            variants={staggerItem}
            whileHover={{ scale: 1.03, y: -5 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            style={{
              position: 'relative',
              borderRadius: 'var(--radius-lg)',
              overflow: 'hidden',
              aspectRatio: '4/3',
              boxShadow: '0 10px 30px -10px rgba(0,0,0,0.5)',
              border: '1px solid var(--color-border)',
            }}
          >
            <img
              src={img.url}
              alt={img.alt}
              loading="lazy"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                transition: 'transform 0.5s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.1)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
              }}
            />
            <div style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              padding: 'var(--space-lg) var(--space-md) var(--space-md)',
              background: 'linear-gradient(to top, rgba(0,0,0,0.9), transparent)',
              color: 'var(--color-white)',
              fontWeight: 600,
              fontSize: '1.1rem',
              textAlign: 'center',
              pointerEvents: 'none',
              textShadow: '0 2px 4px rgba(0,0,0,0.5)',
            }}>
              {img.caption}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
}
