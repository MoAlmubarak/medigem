// client/src/utils/validation.js
/**
 * Check if a string is empty
 * @param {string} str - The string to check
 * @returns {boolean} True if the string is empty or only whitespace
 */
export const isEmpty = (str) => {
  return !str || str.trim() === '';
};

/**
 * Validate drug name
 * @param {string} drugName - The drug name to validate
 * @returns {boolean} True if valid
 */
export const isValidDrugName = (drugName) => {
  if (isEmpty(drugName)) return false;
  
  // Basic validation: alphanumeric with spaces and hyphens
  return /^[a-zA-Z0-9 -]+$/.test(drugName);
};

/**
 * Sanitize input
 * @param {string} input - The input to sanitize
 * @returns {string} Sanitized input
 */
export const sanitizeInput = (input) => {
  if (!input) return '';
  
  // Remove potentially dangerous characters
  return input.replace(/[<>]/g, '');
};