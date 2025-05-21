const express = require('express');
const medicationController = require('../controllers/medicationController');

const router = express.Router();

router.get('/medications/:drugName', medicationController.getDrugSideEffects);

module.exports = router;