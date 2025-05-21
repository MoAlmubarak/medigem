// client/src/utils/cache.js
/**
 * Simple in-memory cache utility
 */
const cache = new Map();

/**
 * Get item from cache
 * @param {string} key - The cache key
 * @returns {any|null} The cached value or null if not found/expired
 */
export const getCachedData = (key) => {
  const item = cache.get(key);
  if (!item) return null;
  
  const now = new Date().getTime();
  if (now > item.expiry) {
    cache.delete(key);
    return null;
  }
  
  return item.value;
};

/**
 * Set item in cache
 * @param {string} key - The cache key
 * @param {any} value - Value to cache
 * @param {number} ttlMinutes - Time to live in minutes
 */
export const setCachedData = (key, value, ttlMinutes = 60) => {
  const expiry = new Date().getTime() + ttlMinutes * 60 * 1000;
  cache.set(key, { value, expiry });
};

/**
 * Clear specific item from cache
 * @param {string} key - The cache key to clear
 */
export const clearCacheItem = (key) => {
  cache.delete(key);
};

/**
 * Clear all cache
 */
export const clearCache = () => {
  cache.clear();
};

/**
 * Get cache size
 * @returns {number} Number of items in cache
 */
export const getCacheSize = () => {
  return cache.size;
};