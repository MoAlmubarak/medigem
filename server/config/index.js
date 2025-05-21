// server/config/index.js
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables from .env file
dotenv.config({ path: path.join(__dirname, '../.env') });

// Set default values and validate environment variables
const config = {
  // Server configuration
  port: process.env.PORT || 3001,
  nodeEnv: process.env.NODE_ENV || 'development',
  
  // OpenFDA API configuration
  fda: {
    baseUrl: process.env.FDA_API_BASE_URL || 'https://api.fda.gov/drug/label.json',
    limit: parseInt(process.env.FDA_API_LIMIT || 1, 10),
    apiKey: process.env.FDA_API_KEY || null
  },
  
  // CORS configuration
  cors: {
    origin: process.env.CLIENT_URL || 'http://localhost:3000'
  },
  
  // Logging configuration
  logging: {
    level: process.env.LOG_LEVEL || 'info'
  },
  
  // Helper method to check if we're in production
  isProduction: () => process.env.NODE_ENV === 'production',
  
  // Helper method to check if we're in development
  isDevelopment: () => process.env.NODE_ENV === 'development' || !process.env.NODE_ENV
};

// Validate required configs
function validateConfig() {
  const requiredVars = [
    { key: 'fda.baseUrl', value: config.fda.baseUrl }
  ];
  
  const missingVars = requiredVars
    .filter(item => !item.value)
    .map(item => item.key);
  
  if (missingVars.length > 0) {
    throw new Error(`Missing required environment variables: ${missingVars.join(', ')}`);
  }
}

// Run validation
validateConfig();

module.exports = config;