"use client";
import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { GoogleMap, useJsApiLoader, MarkerF } from '@react-google-maps/api';
import { useLocation } from '../../hooks/useLocation';
import { staggerContainer, staggerItem } from '../../animations/variants';
import { GOOGLE_MAPS_API_KEY } from '../../utils/constants';

export default function MapsLocation({ setScreen }) {
  const [searchQuery, setSearchQuery] = useState('');
  const { location, coordinates, booths, loading, error, suggestion, geocodeLocation, getCurrentLocation } = useLocation();

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: GOOGLE_MAPS_API_KEY,
  });

  const mapContainerStyle = {
    width: '100%',
    height: '250px',
    borderRadius: 'var(--radius-lg)',
    marginTop: 'var(--space-md)',
  };

  const mapOptions = useMemo(() => ({
    disableDefaultUI: true,
    zoomControl: true,
    styles: [
      { elementType: 'geometry', stylers: [{ color: '#242f3e' }] },
      { elementType: 'labels.text.stroke', stylers: [{ color: '#242f3e' }] },
      { elementType: 'labels.text.fill', stylers: [{ color: '#746855' }] },
      {
        featureType: 'administrative.locality',
        elementType: 'labels.text.fill',
        stylers: [{ color: '#d59563' }],
      },
      {
        featureType: 'poi',
        elementType: 'labels.text.fill',
        stylers: [{ color: '#d59563' }],
      },
      {
        featureType: 'poi.park',
        elementType: 'geometry',
        stylers: [{ color: '#263c3f' }],
      },
      {
        featureType: 'poi.park',
        elementType: 'labels.text.fill',
        stylers: [{ color: '#6b9a76' }],
      },
      {
        featureType: 'road',
        elementType: 'geometry',
        stylers: [{ color: '#38414e' }],
      },
      {
        featureType: 'road',
        elementType: 'geometry.stroke',
        stylers: [{ color: '#212a37' }],
      },
      {
        featureType: 'road',
        elementType: 'labels.text.fill',
        stylers: [{ color: '#9ca5b3' }],
      },
      {
        featureType: 'water',
        elementType: 'geometry',
        stylers: [{ color: '#17263c' }],
      },
      {
        featureType: 'water',
        elementType: 'labels.text.fill',
        stylers: [{ color: '#515c6d' }],
      },
      {
        featureType: 'water',
        elementType: 'labels.text.stroke',
        stylers: [{ color: '#17263c' }],
      },
    ],
  }), []);

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
          {location && (
            <div style={{ marginBottom: 'var(--space-sm)' }}>
              <div className="maps-placeholder-text">
                Showing booths near {location}
              </div>
              <div style={{ fontSize: '0.8rem', color: 'var(--color-text-tertiary)' }}>
                Coordinates: {coordinates?.lat.toFixed(4)}, {coordinates?.lng.toFixed(4)}
              </div>
            </div>
          )}

          {isLoaded && coordinates ? (
            <GoogleMap
              mapContainerStyle={mapContainerStyle}
              center={coordinates}
              zoom={14}
              options={mapOptions}
            >
              {/* User Location */}
              <MarkerF
                position={coordinates}
                icon={{
                  path: 0, // window.google.maps.SymbolPath.CIRCLE
                  scale: 8,
                  fillColor: '#4285F4',
                  fillOpacity: 1,
                  strokeColor: '#ffffff',
                  strokeWeight: 2,
                }}
                title="Your Location"
              />

              {/* Polling Booths */}
              {booths.map((booth, i) => (
                <MarkerF
                  key={i}
                  position={{ lat: booth.lat, lng: booth.lng }}
                  title={booth.name}
                  icon={{
                    path: 'M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z', // Custom pin shape
                    fillColor: '#FF9933', // Saffron
                    fillOpacity: 1,
                    strokeWeight: 1,
                    strokeColor: '#ffffff',
                    scale: 1.5,
                    anchor: { x: 12, y: 24 }
                  }}
                />
              ))}
            </GoogleMap>
          ) : (
            <div className="maps-placeholder">
              <div className="maps-placeholder-icon">🗺️</div>
              <div className="maps-placeholder-text">
                {location ? 'Loading Google Maps...' : 'Search a location to find polling booths'}
              </div>
            </div>
          )}
        </div>

        {/* Booth list */}
        {booths.length > 0 && (
          <>
            <h3 style={{ fontWeight: 700, marginBottom: 'var(--space-md)', fontSize: '1.1rem', marginTop: 'var(--space-lg)' }}>
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
          </>
        )}

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
