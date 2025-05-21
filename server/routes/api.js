// server/routes/api.js
const express = require('express');
const medicationController = require('../controllers/medicationController');
const { validateDrugName, validateAdvancedSearch } = require('../middleware/validators');

const router = express.Router();

/**
 * @swagger
 * /medications/{drugName}:
 *   get:
 *     summary: Get side effects information for a medication
 *     description: Returns detailed information about side effects, interactions, and usage guidance for the specified medication
 *     tags: [Medications]
 *     parameters:
 *       - $ref: '#/components/parameters/drugNameParam'
 *       - $ref: '#/components/parameters/limitParam'
 *       - $ref: '#/components/parameters/includeInteractionsParam'
 *     responses:
 *       200:
 *         description: Successful response with medication information
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/MedicationResponse'
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       404:
 *         $ref: '#/components/responses/NotFound'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */
router.get('/medications/:drugName', validateDrugName, validateAdvancedSearch, medicationController.getDrugSideEffects);

/**
 * @swagger
 * /interactions:
 *   post:
 *     summary: Check interactions between multiple medications (Coming Soon)
 *     description: This endpoint will check for potential interactions between multiple medications
 *     tags: [Medications]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - drugs
 *             properties:
 *               drugs:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["Ibuprofen", "Aspirin", "Lisinopril"]
 *     responses:
 *       200:
 *         description: Successful response with interaction information
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Drug interaction check is not yet implemented"
 *                 drugsProvided:
 *                   type: array
 *                   items:
 *                     type: string
 *                   example: ["Ibuprofen", "Aspirin"]
 *       400:
 *         $ref: '#/components/responses/BadRequest'
 *       500:
 *         $ref: '#/components/responses/ServerError'
 */
// router.post('/interactions', validateInteractionCheck, medicationController.checkDrugInteractions);

module.exports = router;