/**
 * Custom hook for location handling.
 * Uses Geocoding API with fallback to mock data.
 * Supports city, district, state, pincode inputs.
 */
import { useState, useCallback } from 'react';
import { normalizeLocation } from '../utils/sanitize';
import { POLLING_BOOTHS, GOOGLE_MAPS_API_KEY } from '../utils/constants';

export function useLocation() {
  const [location, setLocation] = useState('');
  const [coordinates, setCoordinates] = useState({ lat: 28.6139, lng: 77.2090 });
  const [booths, setBooths] = useState(POLLING_BOOTHS.delhi);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [suggestion, setSuggestion] = useState('');

  /**
   * Geocode a location string using Google Geocoding API.
   * Falls back to mock data if API key is missing or request fails.
   */
  const geocodeLocation = useCallback(async (query) => {
    if (!query.trim()) return;
    setLoading(true);
    setError('');
    setSuggestion('');

    const { normalized, type } = normalizeLocation(query);

    // Try Google Geocoding API first
    if (GOOGLE_MAPS_API_KEY) {
      try {
        const searchQuery = type === 'pincode' ? `${normalized}, India` : `${normalized}, India`;
        const res = await fetch(
          `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(searchQuery)}&key=${GOOGLE_MAPS_API_KEY}&region=in`
        );
        const data = await res.json();

        if (data.status === 'OK' && data.results.length > 0) {
          const result = data.results[0];
          const { lat, lng } = result.geometry.location;
          setCoordinates({ lat, lng });
          setLocation(result.formatted_address);

          // Generate mock booths near the geocoded location
          const nearbyBooths = generateNearbyBooths(lat, lng, result.formatted_address);
          setBooths(nearbyBooths);
          setLoading(false);
          return;
        }

        if (data.status === 'ZERO_RESULTS') {
          setSuggestion(`No exact match for "${query}". Try a nearby city or pincode.`);
        }
      } catch {
        // Fall through to mock data
      }
    }

    // Fallback: match against known cities
    const matchedCity = findClosestCity(normalized);
    if (matchedCity) {
      setBooths(POLLING_BOOTHS[matchedCity] || POLLING_BOOTHS.default);
      setLocation(matchedCity.charAt(0).toUpperCase() + matchedCity.slice(1));
      const coords = getCityCoordinates(matchedCity);
      setCoordinates(coords);
    } else {
      setBooths(POLLING_BOOTHS.default);
      setLocation(query);
      setSuggestion(`Showing general results. Try entering a major city name or 6-digit pincode for better results.`);
    }

    setLoading(false);
  }, []);

  /**
   * Use browser geolocation API for current position.
   */
  const getCurrentLocation = useCallback(() => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser');
      return;
    }

    setLoading(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setCoordinates({ lat: latitude, lng: longitude });
        setLocation('Your Current Location');

        const nearbyBooths = generateNearbyBooths(latitude, longitude, 'Your area');
        setBooths(nearbyBooths);
        setLoading(false);
      },
      () => {
        setError('Unable to get your location. Please enter it manually.');
        setLoading(false);
      },
      { timeout: 10000, enableHighAccuracy: false }
    );
  }, []);

  return {
    location,
    setLocation,
    coordinates,
    booths,
    loading,
    error,
    suggestion,
    geocodeLocation,
    getCurrentLocation,
  };
}

/** Find closest matching city from known database */
function findClosestCity(input) {
  const cities = Object.keys(POLLING_BOOTHS).filter((k) => k !== 'default');
  const exactMatch = cities.find((city) => input.includes(city) || city.includes(input));
  if (exactMatch) return exactMatch;

  // Fuzzy match: check if the input is within 2 character edits
  for (const city of cities) {
    if (levenshtein(input, city) <= 2) return city;
  }
  return null;
}

/** Simple Levenshtein distance for fuzzy matching */
function levenshtein(a, b) {
  const matrix = Array.from({ length: a.length + 1 }, (_, i) =>
    Array.from({ length: b.length + 1 }, (_, j) => (i === 0 ? j : j === 0 ? i : 0))
  );
  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      matrix[i][j] =
        a[i - 1] === b[j - 1]
          ? matrix[i - 1][j - 1]
          : 1 + Math.min(matrix[i - 1][j], matrix[i][j - 1], matrix[i - 1][j - 1]);
    }
  }
  return matrix[a.length][b.length];
}

/** Get approximate coordinates for known cities */
function getCityCoordinates(city) {
  const coords = {
    delhi: { lat: 28.6139, lng: 77.2090 },
    mumbai: { lat: 19.0760, lng: 72.8777 },
    bangalore: { lat: 12.9716, lng: 77.5946 },
    chennai: { lat: 13.0827, lng: 80.2707 },
    kolkata: { lat: 22.5726, lng: 88.3639 },
    hyderabad: { lat: 17.3850, lng: 78.4867 },
  };
  return coords[city] || { lat: 20.5937, lng: 78.9629 };
}

/** Generate mock polling booths near a given coordinate */
function generateNearbyBooths(lat, lng, area) {
  const names = [
    'Govt. Primary School', 'Community Hall', 'Municipal Office',
    'Kendriya Vidyalaya', 'Town Hall', 'Public Library',
  ];
  return Array.from({ length: 3 }, (_, i) => ({
    name: `${names[i % names.length]} - Booth ${i + 1}`,
    address: `Near ${area}`,
    distance: `${(Math.random() * 4 + 0.5).toFixed(1)} km`,
    lat: lat + (Math.random() - 0.5) * 0.02,
    lng: lng + (Math.random() - 0.5) * 0.02,
  }));
}
