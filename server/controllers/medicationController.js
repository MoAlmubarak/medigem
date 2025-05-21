// server/controllers/medicationController.js
const fdaService = require('../services/fdaService');
const { BadRequestError } = require('../utils/errors');

exports.getDrugSideEffects = async (req, res, next) => {
  try {
    // The input has already been validated and sanitized by the middleware
    const { drugName } = req.params;
    
    // Optional query parameters (for advanced search)
    const limit = req.query.limit || 1;
    const includeInteractions = req.query.includeInteractions || false;
    
    // Call the service with validated parameters
    const sideEffects = await fdaService.fetchDrugSideEffects(drugName, {
      limit,
      includeInteractions
    });
    
    return res.status(200).json(sideEffects);
  } catch (error) {
    // Pass the error to the error handling middleware
    next(error);
  }
};

// Placeholder for future feature
exports.checkDrugInteractions = async (req, res, next) => {
  try {
    // This would be implemented when you add the drug interaction feature
    const { drugs } = req.body;
    
    // For now, return a placeholder response
    return res.status(200).json({
      message: 'Drug interaction check is not yet implemented',
      drugsProvided: drugs
    });
  } catch (error) {
    next(error);
  }
};