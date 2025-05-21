const express = require('express');
const medicationController = require('../controllers/medicationController');
const v1Routes = require('./v1');

const router = express.Router();

router.get('/medications/:drugName', medicationController.getDrugSideEffects);
router.use('/v1', v1Routes);

module.exports = router;