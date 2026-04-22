import { useState } from 'react';
import { motion } from 'framer-motion';
import { useLocation } from '../../hooks/useLocation';
import { staggerContainer, staggerItem } from '../../animations/variants';

export default function MapsLocation({ setScreen }) {
  const [searchQuery, setSearchQuery] = useState('');
  const { location, coordinates, booths, loading, error, suggestion, geocodeLocation, getCurrentLocation } = useLocation();

  const handleSearch = () => {
    if (searchQuery.trim()) {
      geocodeLocation(searchQuery);
    }
  };

  return (
    <motion.div
      className="page-container"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="section-header">
        <h2 className="section-title">
          <span className="text-gradient">Find Your Booth</span>
        </h2>
        <p className="section-subtitle">
          Enter any Indian location — city, district, state, or pincode
        </p>
      </div>

      <div className="maps-wrapper">
        {/* Search bar */}
        <div className="maps-search-bar">
          <input
            type="text"
            className="input"
            placeholder="Enter city, district, state, or 6-digit pincode..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            aria-label="Search for polling booths"
            id="maps-search-input"
          />
          <button className="btn btn-primary btn-sm" onClick={handleSearch} disabled={loading} id="maps-search-btn">
            {loading ? '...' : '🔍'}
          </button>
          <button className="btn btn-ghost btn-sm" onClick={getCurrentLocation} disabled={loading} title="Use current location" id="maps-gps-btn">
            📍
          </button>
        </div>

        {/* Error / Suggestion */}
        {error && (
          <div style={{ marginBottom: 'var(--space-md)', padding: '12px 16px', background: 'rgba(239, 68, 68, 0.08)', border: '1px solid rgba(239, 68, 68, 0.15)', borderRadius: 'var(--radius-md)', color: '#ef4444', fontSize: '0.85rem' }}>
            {error}
          </div>
        )}
        {suggestion && (
          <div style={{ marginBottom: 'var(--space-md)', padding: '12px 16px', background: 'rgba(255, 153, 51, 0.08)', border: '1px solid rgba(255, 153, 51, 0.15)', borderRadius: 'var(--radius-md)', color: 'var(--color-saffron)', fontSize: '0.85rem' }}>
            💡 {suggestion}
          </div>
        )}

        {/* Map display */}
        <div className="maps-display">
          <div className="maps-placeholder">
            <div className="maps-placeholder-icon">🗺️</div>
            <div className="maps-placeholder-text">
              {location
                ? `Showing booths near ${location}`
                : 'Search a location to find polling booths'}
            </div>
            {location && (
              <div style={{ fontSize: '0.8rem', color: 'var(--color-text-tertiary)' }}>
                Coordinates: {coordinates.lat.toFixed(4)}, {coordinates.lng.toFixed(4)}
              </div>
            )}
            {/* Visual map representation */}
            <div style={{
              width: '90%',
              maxWidth: '400px',
              height: '180px',
              background: 'linear-gradient(135deg, rgba(19,136,8,0.1), rgba(6,182,212,0.05))',
              borderRadius: 'var(--radius-lg)',
              position: 'relative',
              overflow: 'hidden',
              border: '1px solid var(--color-border)',
              marginTop: 'var(--space-md)',
            }}>
              {/* Grid */}
              <div style={{ position: 'absolute', inset: 0, opacity: 0.1 }}>
                {Array.from({ length: 5 }).map((_, i) => (
                  <div key={`h-${i}`} style={{ position: 'absolute', top: `${(i + 1) * 20}%`, left: 0, width: '100%', height: '1px', background: 'rgba(255,255,255,0.3)' }} />
                ))}
                {Array.from({ length: 5 }).map((_, i) => (
                  <div key={`v-${i}`} style={{ position: 'absolute', left: `${(i + 1) * 20}%`, top: 0, width: '1px', height: '100%', background: 'rgba(255,255,255,0.3)' }} />
                ))}
              </div>
              {/* Booth markers */}
              {booths.map((booth, i) => (
                <motion.div
                  key={i}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2 * (i + 1), type: 'spring', bounce: 0.4 }}
                  style={{
                    position: 'absolute',
                    left: `${20 + i * 25}%`,
                    top: `${30 + (i % 2) * 25}%`,
                    fontSize: '1.5rem',
                    filter: 'drop-shadow(0 2px 8px rgba(255,153,51,0.4))',
                    cursor: 'pointer',
                  }}
                  title={booth.name}
                >
                  📍
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Booth list */}
        <h3 style={{ fontWeight: 700, marginBottom: 'var(--space-md)', fontSize: '1.1rem' }}>
          Nearby Polling Booths
        </h3>

        <motion.div variants={staggerContainer} initial="hidden" animate="visible">
          {booths.map((booth, idx) => (
            <motion.div key={idx} variants={staggerItem} className="booth-card">
              <div className="booth-name">{booth.name}</div>
              <div className="booth-address">{booth.address}</div>
              <div className="booth-distance">📍 {booth.distance} away</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Help text */}
        <div className="glass-card" style={{ marginTop: 'var(--space-xl)', padding: 'var(--space-lg)', textAlign: 'center' }}>
          <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.85rem', lineHeight: 1.7 }}>
            💡 <strong>Tip:</strong> You can search by city name (Mumbai, Delhi), district, state,
            or 6-digit pincode. We support all Indian locations including alternate names
            (Bombay → Mumbai, Calcutta → Kolkata).
          </p>
        </div>
      </div>
    </motion.div>
  );
}
