const axios = require('axios');

const FDA_API_BASE_URL = 'https://api.fda.gov/drug/label.json';
const FDA_API_LIMIT = 1; // Limit to 1 result for MVP

exports.fetchDrugSideEffects = async (drugName) => {
  try {
    // Query OpenFDA API for the drug
    const response = await axios.get(`${FDA_API_BASE_URL}`, {
      params: {
        search: `openfda.brand_name:"${drugName}" OR openfda.generic_name:"${drugName}"`,
        limit: FDA_API_LIMIT
      }
    });

    const results = response.data.results;
    
    if (!results || results.length === 0) {
      throw new Error('No medication information found');
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
    const categorizedSideEffects = categorizeSideEffects(sideEffects);
    
    return categorizedSideEffects;
  } catch (error) {
    console.error('FDA API Error:', error);
    throw error;
  }
};

// Helper function to parse sections from FDA data
function parseSection(section) {
  if (!section) return null;
  
  // If section is an array, join it
  if (Array.isArray(section)) {
    return section.join('\n\n');
  }
  
  return section;
}

// Helper function to categorize side effects by severity
function categorizeSideEffects(data) {
  // For the MVP, we'll return a simplified structure
  // In a more advanced version, this would use NLP to properly categorize side effects
  
  return {
    drugInfo: {
      brandName: data.brandName,
      genericName: data.genericName,
      lastUpdated: data.lastUpdated
    },
    sideEffects: {
      common: extractSideEffectsList(data.commonSideEffects),
      serious: extractSideEffectsList(data.seriousSideEffects),
      interactions: extractSideEffectsList(data.drugInteractions)
    },
    guidance: {
      whenToConsult: data.whenToConsult
    },
    rawData: data // Include raw data for debugging or advanced display
  };
}

// Helper function to extract a list of side effects from text
function extractSideEffectsList(text) {
  if (!text || text === 'Information not available') {
    return [];
  }
  
  // Simple extraction of bullet points and sentences
  // A more advanced version would use NLP for better extraction
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