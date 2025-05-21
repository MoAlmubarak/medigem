// server/controllers/medicationController.js
const fdaService = require('../services/fdaService');
const { BadRequestError } = require('../utils/errors');

exports.getDrugSideEffects = async (req, res, next) => {
  try {
    const { drugName } = req.params;
    
    if (!drugName || drugName.trim() === '') {
      throw new BadRequestError('Drug name is required');
    }
    
    const sideEffects = await fdaService.fetchDrugSideEffects(drugName);
    
    return res.status(200).json(sideEffects);
  } catch (error) {
    // Pass the error to the error handling middleware
    next(error);
  }
};