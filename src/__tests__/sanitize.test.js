import { describe, it, expect } from 'vitest';
import { sanitizeInput, normalizeLocation, isValidEmail } from '../utils/sanitize';

describe('sanitizeInput', () => {
  it('removes HTML angle brackets', () => {
    expect(sanitizeInput('<script>alert("xss")</script>')).toBe('scriptalert("xss")/script');
  });

  it('removes javascript: protocol', () => {
    expect(sanitizeInput('javascript:alert(1)')).toBe('alert(1)');
  });

  it('trims whitespace', () => {
    expect(sanitizeInput('  hello world  ')).toBe('hello world');
  });

  it('respects max length', () => {
    const longStr = 'A'.repeat(600);
    expect(sanitizeInput(longStr, 200).length).toBe(200);
  });

  it('handles null/undefined input', () => {
    expect(sanitizeInput(null)).toBe('');
    expect(sanitizeInput(undefined)).toBe('');
    expect(sanitizeInput('')).toBe('');
  });

  it('removes inline event handlers', () => {
    expect(sanitizeInput('onload=malicious()')).not.toContain('onload=');
  });
});

describe('normalizeLocation', () => {
  it('detects 6-digit pincode', () => {
    const result = normalizeLocation('110001');
    expect(result.type).toBe('pincode');
    expect(result.normalized).toBe('110001');
  });

  it('extracts embedded pincode', () => {
    const result = normalizeLocation('Delhi 110001');
    expect(result.type).toBe('pincode');
    expect(result.normalized).toBe('110001');
  });

  it('normalizes city abbreviations', () => {
    const result = normalizeLocation('DL');
    expect(result.normalized).toBe('delhi');
  });

  it('normalizes old city names', () => {
    expect(normalizeLocation('Bombay').normalized).toBe('mumbai');
    expect(normalizeLocation('Calcutta').normalized).toBe('kolkata');
    expect(normalizeLocation('Madras').normalized).toBe('chennai');
  });

  it('normalizes NCR satellite cities', () => {
    expect(normalizeLocation('Noida').normalized).toBe('delhi');
    expect(normalizeLocation('Gurgaon').normalized).toBe('delhi');
    expect(normalizeLocation('Gurugram').normalized).toBe('delhi');
  });

  it('handles empty input', () => {
    const result = normalizeLocation('');
    expect(result.normalized).toBe('');
    expect(result.type).toBe('unknown');
  });
});

describe('isValidEmail', () => {
  it('validates correct email', () => {
    expect(isValidEmail('user@example.com')).toBe(true);
  });

  it('rejects invalid email', () => {
    expect(isValidEmail('not-an-email')).toBe(false);
    expect(isValidEmail('missing@domain')).toBe(false);
    expect(isValidEmail('')).toBe(false);
  });
});
