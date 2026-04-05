const express = require('express');
const router = express.Router();
const settingsController = require('../controllers/settingsController');
const authenticate = require('../middleware/auth');
const authorize = require('../middleware/roles');
const auditLog = require('../middleware/audit');

/**
 * @swagger
 * /api/settings:
 *   get:
 *     summary: Get company settings
 *     tags: [Settings]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Returns company settings
 *       401:
 *         description: Unauthorized
 */
router.get('/', authenticate, settingsController.get);

/**
 * @swagger
 * /api/settings:
 *   put:
 *     summary: Update company settings
 *     tags: [Settings]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               company_name:
 *                 type: string
 *               primary_color:
 *                 type: string
 *                 example: "#3B82F6"
 *               sectors:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       200:
 *         description: Settings updated successfully
 *       403:
 *         description: Forbidden
 */
router.put('/', authenticate, authorize('admin'), auditLog('UPDATE', 'Settings'), settingsController.update);

module.exports = router;
