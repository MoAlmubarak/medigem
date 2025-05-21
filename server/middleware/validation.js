// Create a validation middleware in server/middleware/validation.js
const validateDrugName = (req, res, next) => {
  const { drugName } = req.params;
  
  if (!drugName || drugName.trim() === '') {
    return res.status(400).json({ error: 'Drug name is required' });
  }
  
  // Basic sanitization - allow only alphanumeric and spaces
  if (!/^[a-zA-Z0-9 -]+$/.test(drugName)) {
    return res.status(400).json({ error: 'Drug name contains invalid characters' });
  }
  
  next();
};

// Use in routes
router.get('/medications/:drugName', validateDrugName, medicationController.getDrugSideEffects);