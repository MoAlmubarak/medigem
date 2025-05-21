// client/src/utils/constants.js
/**
 * API related constants
 */
export const API = {
  BASE_URL: process.env.REACT_APP_API_BASE_URL || 'http://localhost:3001/api',
  TIMEOUT: 10000, // 10 seconds
  RETRY_COUNT: 2
};

/**
 * Cache related constants
 */
export const CACHE = {
  DEFAULT_TTL: 60, // 60 minutes
  DRUG_INFO_TTL: 1440, // 24 hours
  SEARCH_HISTORY_KEY: 'medigem-search-history',
  MAX_HISTORY_ITEMS: 10
};

/**
 * UI related constants
 */
export const UI = {
  MAX_MESSAGE_LENGTH: 150,
  DEFAULT_ANIMATION_DURATION: 300, // ms
  DEBOUNCE_DELAY: 300, // ms for input debouncing
  COMMON_DRUGS: [
    'Tylenol',
    'Advil',
    'Ibuprofen',
    'Benadryl',
    'Claritin',
    'Zyrtec',
    'Aspirin',
    'Aleve',
    'Motrin',
    'Robitussin'
  ]
};

/**
 * Error message constants
 */
export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Network error. Please check your connection.',
  SERVER_ERROR: 'Server error. Our system is experiencing issues.',
  NOT_FOUND: 'Medication not found. Please check the spelling.',
  RATE_LIMIT: 'Too many requests. Please try again in a moment.',
  GENERIC_ERROR: 'An unexpected error occurred'
};