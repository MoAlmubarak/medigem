// server/services/fdaService.js
const axios = require('axios');
const config = require('../config');
const { NotFoundError, APIError, BadRequestError } = require('../utils/errors');

exports.fetchDrugSideEffects = async (drugName, options = {}) => {
  try {
    // Default options
    const { 
      limit = config.fda.limit, 
      includeInteractions = false 
    } = options;

    // Build request parameters
    const params = {
      search: `openfda.brand_name:"${drugName}" OR openfda.generic_name:"${drugName}"`,
      limit: limit
    };

    // Add API key if available
    if (config.fda.apiKey) {
      params.api_key = config.fda.apiKey;
    }

    // Query OpenFDA API for the drug
    const response = await axios.get(config.fda.baseUrl, { params });

    const results = response.data.results;
    
    if (!results || results.length === 0) {
      throw new NotFoundError(`No information found for medication "${drugName}"`);
    }

    const medicationData = results[0];
    
    // Extract side effects information
    const sideEffects = {
      drugName: drugName,
      brandName: medicationData.openfda?.brand_name?.[0] || 'Not available',
      genericName: medicationData.openfda?.generic_name?.[0] || 'Not available',
      commonSideEffects: parseSection(medicationData.adverse_reactions) || 
                         parseSection(medicationData.warnings) || 
                         'Information not available',
      seriousSideEffects: parseSection(medicationData.boxed_warnings) || 
                         parseSection(medicationData.warnings_and_cautions) || 
                         'Information not available',
      drugInteractions: parseSection(medicationData.drug_interactions) || 'Information not available',
      whenToConsult: parseSection(medicationData.when_using) || 'Information not available',
      fullLabeling: medicationData.openfda?.product_type || 'Not specified',
      lastUpdated: medicationData.effective_time || 'Unknown'
    };

    // Process and categorize side effects
    const categorizedSideEffects = categorizeSideEffects(sideEffects, { includeInteractions });
    
    return categorizedSideEffects;
  } catch (error) {
    // Error handling as improved earlier
    if (error.response) {
      if (error.response.status === 404) {
        throw new NotFoundError(`No information found for medication "${drugName}"`);
      } else {
        throw new APIError(`FDA API error: ${error.message}`, error.response.status);
      }
    } else if (error.isOperational) {
      throw error;
    } else {
      console.error('FDA API Error:', error);
      throw new APIError('Error accessing medication database');
    }
  }
};

// Update the categorizeSideEffects function to handle options
function categorizeSideEffects(data, options = {}) {
  const { includeInteractions = false } = options;
  
  const result = {
    drugInfo: {
      brandName: data.brandName,
      genericName: data.genericName,
      lastUpdated: data.lastUpdated
    },
    sideEffects: {
      common: extractSideEffectsList(data.commonSideEffects),
      serious: extractSideEffectsList(data.seriousSideEffects)
    },
    guidance: {
      whenToConsult: data.whenToConsult
    }
  };
  
  // Only include interactions if specifically requested
  if (includeInteractions) {
    result.sideEffects.interactions = extractSideEffectsList(data.drugInteractions);
  }
  
  // In development mode, include raw data for debugging
  if (config.isDevelopment()) {
    result.rawData = data;
  }
  
  return result;
}

// Helper functions remain mostly the same
function parseSection(section) {
  if (!section) return null;
  
  // If section is an array, join it
  if (Array.isArray(section)) {
    return section.join('\n\n');
  }
  
  return section;
}

function extractSideEffectsList(text) {
  if (!text || text === 'Information not available') {
    return [];
  }
  
  // Simple extraction of bullet points and sentences
  let effects = [];
  
  // Split by common delimiters
  const splitText = text.split(/[.;:•\n]+/);
  
  splitText.forEach(item => {
    const trimmed = item.trim();
    if (trimmed && trimmed.length > 3 && !effects.includes(trimmed)) {
      effects.push(trimmed);
    }
  });
  
  return effects;
}