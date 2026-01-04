import express from 'express';
import axios from 'axios';
import { authenticate } from '../middleware/auth.js';
import MLModel from '../models/MLModel.js';
import Dataset from '../models/Dataset.js';

const router = express.Router();

const AI_SERVICE_URL = process.env.AI_SERVICE_URL || 'http://localhost:8000';

/**
 * @swagger
 * /api/models:
 *   get:
 *     summary: Get all models for authenticated user
 *     tags: [Models]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of models
 */
router.get('/', authenticate, async (req, res, next) => {
  try {
    const models = await MLModel.findAll({
      where: { userId: req.user.id },
      include: [{ model: Dataset }],
      order: [['createdAt', 'DESC']],
    });

    res.json(models);
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * /api/models:
 *   post:
 *     summary: Create and train a new model
 *     tags: [Models]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - type
 *               - datasetId
 *             properties:
 *               name:
 *                 type: string
 *               type:
 *                 type: string
 *                 enum: [time-series, nlp, classification, regression]
 *               datasetId:
 *                 type: string
 *               parameters:
 *                 type: object
 *     responses:
 *       201:
 *         description: Model created and training initiated
 */
router.post('/', authenticate, async (req, res, next) => {
  try {
    const { name, type, datasetId, parameters } = req.body;

    const dataset = await Dataset.findOne({
      where: { id: datasetId, userId: req.user.id },
    });

    if (!dataset) {
      return res.status(404).json({ error: 'Dataset not found' });
    }

    const model = await MLModel.create({
      name,
      type,
      datasetId,
      userId: req.user.id,
      parameters: parameters || {},
      status: 'pending',
    });

    // Trigger training in AI service
    try {
      await axios.post(`${AI_SERVICE_URL}/train`, {
        modelId: model.id,
        type: model.type,
        data: dataset.data,
        parameters: model.parameters,
      });

      model.status = 'training';
      await model.save();
    } catch (aiError) {
      console.error('AI service error:', aiError.message);
      model.status = 'failed';
      await model.save();
    }

    res.status(201).json(model);
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * /api/models/{id}:
 *   get:
 *     summary: Get model by ID
 *     tags: [Models]
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
 *         description: Model details
 */
router.get('/:id', authenticate, async (req, res, next) => {
  try {
    const model = await MLModel.findOne({
      where: { id: req.params.id, userId: req.user.id },
      include: [{ model: Dataset }],
    });

    if (!model) {
      return res.status(404).json({ error: 'Model not found' });
    }

    res.json(model);
  } catch (error) {
    next(error);
  }
});

export default router;
