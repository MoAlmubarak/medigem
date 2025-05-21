// server/routes/api.js
const express = require('express');
const medicationController = require('../controllers/medicationController');
const { validateDrugName, validateAdvancedSearch } = require('../middleware/validators');

const router = express.Router();

// Apply validation middleware before the controller function
router.get('/medications/:drugName', validateDrugName, validateAdvancedSearch, medicationController.getDrugSideEffects);

// Future endpoint for drug interaction checks (placeholder for now)
// router.post('/interactions', validateInteractionCheck, medicationController.checkDrugInteractions);

module.exports = router;