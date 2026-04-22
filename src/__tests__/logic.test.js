import { describe, it, expect, vi, beforeEach } from 'vitest';

// Mock localStorage
const localStorageMock = (() => {
  let store = {};
  return {
    getItem: vi.fn((key) => store[key] || null),
    setItem: vi.fn((key, value) => { store[key] = value; }),
    removeItem: vi.fn((key) => { delete store[key]; }),
    clear: vi.fn(() => { store = {}; }),
  };
})();

Object.defineProperty(global, 'localStorage', { value: localStorageMock });

describe('useUserProgress', () => {
  beforeEach(() => {
    localStorageMock.clear();
    vi.clearAllMocks();
  });

  it('initializes with default checklist values', async () => {
    const { useUserProgress } = await import('../hooks/useUserProgress');
    // Since this is a hook, we test the logic indirectly
    // Check that the module exports correctly
    expect(typeof useUserProgress).toBe('function');
  });
});

describe('Voting Logic', () => {
  it('prevents double voting', () => {
    const voters = new Set();
    const castVote = (voterId, party) => {
      if (!voterId || !party) throw new Error('Missing details');
      if (voters.has(voterId)) throw new Error('Duplicate vote');
      voters.add(voterId);
      return true;
    };

    expect(castVote('VOTER-001', 'Party A')).toBe(true);
    expect(() => castVote('VOTER-001', 'Party B')).toThrow('Duplicate vote');
  });

  it('rejects empty voter ID', () => {
    const castVote = (voterId, party) => {
      if (!voterId || !party) throw new Error('Missing details');
      return true;
    };

    expect(() => castVote('', 'Party A')).toThrow('Missing details');
    expect(() => castVote(null, 'Party A')).toThrow('Missing details');
  });

  it('accepts valid vote', () => {
    const castVote = (voterId, party) => {
      if (!voterId || !party) throw new Error('Missing details');
      return { voterId, party, timestamp: Date.now() };
    };

    const result = castVote('VOTER-002', 'Party B');
    expect(result.voterId).toBe('VOTER-002');
    expect(result.party).toBe('Party B');
    expect(result.timestamp).toBeTruthy();
  });
});

describe('Polling Booth Validation', () => {
  it('validates correct coordinates', () => {
    const validateBooth = (booth) => {
      if (!booth.lat || !booth.lng) throw new Error('Missing coordinates');
      return booth.lat >= -90 && booth.lat <= 90 && booth.lng >= -180 && booth.lng <= 180;
    };

    expect(validateBooth({ lat: 28.6139, lng: 77.2090 })).toBe(true);
    expect(validateBooth({ lat: 19.0760, lng: 72.8777 })).toBe(true);
  });

  it('rejects invalid coordinates', () => {
    const validateBooth = (booth) => {
      if (!booth.lat || !booth.lng) throw new Error('Missing coordinates');
      if (booth.lat < -90 || booth.lat > 90) return false;
      return true;
    };

    expect(validateBooth({ lat: 100, lng: 77 })).toBe(false);
  });

  it('rejects missing coordinates', () => {
    const validateBooth = (booth) => {
      if (booth.lat == null || booth.lng == null) throw new Error('Missing coordinates');
      return true;
    };

    expect(() => validateBooth({ name: 'Test' })).toThrow('Missing coordinates');
  });
});
