// server/middleware/validators.js
const { body, param, query, validationResult } = require('express-validator');

// Helper function to process validation results
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      status: 'fail',
      message: 'Invalid input data',
      errors: errors.array().map(err => ({
        field: err.param,
        message: err.msg
      }))
    });
  }
  next();
};

// Validation rules for drug name parameter
const validateDrugName = [
  param('drugName')
    .trim()
    .notEmpty().withMessage('Drug name is required')
    .isLength({ min: 2 }).withMessage('Drug name must be at least 2 characters long')
    .matches(/^[a-zA-Z0-9\s\-]+$/).withMessage('Drug name can only contain letters, numbers, spaces and hyphens')
    .escape(), // Sanitize the input
  validate
];

// Validation rules for drug interaction check (for future feature)
const validateInteractionCheck = [
  body('drugs')
    .isArray().withMessage('Drugs must be provided as an array')
    .notEmpty().withMessage('At least one drug must be provided'),
  body('drugs.*')
    .trim()
    .notEmpty().withMessage('Drug name cannot be empty')
    .isLength({ min: 2 }).withMessage('Drug name must be at least 2 characters long')
    .matches(/^[a-zA-Z0-9\s\-]+$/).withMessage('Drug names can only contain letters, numbers, spaces and hyphens')
    .escape(),
  validate
];

// Validation rules for advanced search options (for future feature)
const validateAdvancedSearch = [
  query('limit')
    .optional()
    .isInt({ min: 1, max: 10 }).withMessage('Limit must be a number between 1 and 10')
    .toInt(),
  query('includeInteractions')
    .optional()
    .isBoolean().withMessage('includeInteractions must be a boolean value')
    .toBoolean(),
  validate
];

module.exports = {
  validateDrugName,
  validateInteractionCheck,
  validateAdvancedSearch
};