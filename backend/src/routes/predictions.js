import express from 'express';
import axios from 'axios';
import { authenticate } from '../middleware/auth.js';
import Prediction from '../models/Prediction.js';
import MLModel from '../models/MLModel.js';
import { apiLimiter } from '../middleware/rateLimiter.js';

const router = express.Router();

const AI_SERVICE_URL = process.env.AI_SERVICE_URL || 'http://localhost:8000';

/**
 * @swagger
 * /api/predictions:
 *   get:
 *     summary: Get all predictions for authenticated user
 *     tags: [Predictions]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of predictions
 */
router.get('/', authenticate, apiLimiter, async (req, res, next) => {
  try {
    const predictions = await Prediction.findAll({
      where: { userId: req.user.id },
      include: [{ model: MLModel }],
      order: [['createdAt', 'DESC']],
      limit: 100,
    });

    res.json(predictions);
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * /api/predictions:
 *   post:
 *     summary: Create a new prediction
 *     tags: [Predictions]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - modelId
 *               - input
 *             properties:
 *               modelId:
 *                 type: string
 *               input:
 *                 type: object
 *     responses:
 *       201:
 *         description: Prediction created
 */
router.post('/', authenticate, apiLimiter, async (req, res, next) => {
  try {
    const { modelId, input } = req.body;

    const model = await MLModel.findOne({
      where: { id: modelId, userId: req.user.id },
    });

    if (!model) {
      return res.status(404).json({ error: 'Model not found' });
    }

    if (model.status !== 'completed') {
      return res.status(400).json({ error: 'Model is not ready for predictions' });
    }

    // Get prediction from AI service
    const aiResponse = await axios.post(`${AI_SERVICE_URL}/predict`, {
      modelId: model.id,
      modelPath: model.modelPath,
      input,
      type: model.type,
    });

    const prediction = await Prediction.create({
      modelId: model.id,
      userId: req.user.id,
      input,
      output: aiResponse.data.output,
      confidence: aiResponse.data.confidence,
    });

    res.status(201).json(prediction);
  } catch (error) {
    if (error.response) {
      return res.status(error.response.status).json({ error: error.response.data });
    }
    next(error);
  }
});

/**
 * @swagger
 * /api/predictions/{id}:
 *   get:
 *     summary: Get prediction by ID
 *     tags: [Predictions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Prediction details
 */
router.get('/:id', authenticate, apiLimiter, async (req, res, next) => {
  try {
    const prediction = await Prediction.findOne({
      where: { id: req.params.id, userId: req.user.id },
      include: [{ model: MLModel }],
    });

    if (!prediction) {
      return res.status(404).json({ error: 'Prediction not found' });
    }

    res.json(prediction);
  } catch (error) {
    next(error);
  }
});

export default router;
