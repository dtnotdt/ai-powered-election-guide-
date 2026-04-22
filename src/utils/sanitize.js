/**
 * Input sanitization utilities for VoteVerse India.
 * Prevents XSS and validates user input.
 */

/**
 * Sanitizes user input to prevent XSS attacks.
 * Strips HTML tags, javascript: protocol, and limits string length.
 * @param {string} str - Raw user input
 * @param {number} maxLen - Maximum allowed length (default: 500)
 * @returns {string} Sanitized string
 */
export function sanitizeInput(str, maxLen = 500) {
  if (!str) return '';
  return String(str)
    .replace(/[<>]/g, '')
    .replace(/javascript:/gi, '')
    .replace(/on\w+\s*=/gi, '')
    .trim()
    .substring(0, maxLen);
}

/**
 * Validates and normalizes an Indian location string.
 * Handles city, district, state, pincode inputs.
 * @param {string} input - Raw location input
 * @returns {{ normalized: string, type: string }} Normalized location and its type
 */
export function normalizeLocation(input) {
  if (!input) return { normalized: '', type: 'unknown' };
  const cleaned = sanitizeInput(input, 200).toLowerCase().trim();

  // Check if pincode (6 digits)
  const pincodeMatch = cleaned.match(/^\d{6}$/);
  if (pincodeMatch) {
    return { normalized: cleaned, type: 'pincode' };
  }

  // Check if contains pincode
  const embeddedPincode = cleaned.match(/\b(\d{6})\b/);
  if (embeddedPincode) {
    return { normalized: embeddedPincode[1], type: 'pincode' };
  }

  // Normalize common abbreviations
  const abbreviations = {
    'dl': 'delhi',
    'mh': 'maharashtra',
    'ka': 'karnataka',
    'tn': 'tamil nadu',
    'up': 'uttar pradesh',
    'mp': 'madhya pradesh',
    'wb': 'west bengal',
    'rj': 'rajasthan',
    'gj': 'gujarat',
    'ap': 'andhra pradesh',
    'ts': 'telangana',
    'kr': 'kerala',
    'pb': 'punjab',
    'hr': 'haryana',
    'uk': 'uttarakhand',
    'jk': 'jammu and kashmir',
    'hp': 'himachal pradesh',
    'br': 'bihar',
    'jh': 'jharkhand',
    'cg': 'chhattisgarh',
    'or': 'odisha',
    'ga': 'goa',
    'navi mumbai': 'mumbai',
    'new delhi': 'delhi',
    'bengaluru': 'bangalore',
    'kolkatta': 'kolkata',
    'calcutta': 'kolkata',
    'bombay': 'mumbai',
    'madras': 'chennai',
    'trivandrum': 'thiruvananthapuram',
    'noida': 'delhi',
    'gurgaon': 'delhi',
    'gurugram': 'delhi',
    'faridabad': 'delhi',
    'ghaziabad': 'delhi',
    'pune': 'mumbai',
    'thane': 'mumbai',
  };

  const normalized = abbreviations[cleaned] || cleaned;
  return { normalized, type: 'text' };
}

/**
 * Validates email format.
 * @param {string} email
 * @returns {boolean}
 */
export function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
