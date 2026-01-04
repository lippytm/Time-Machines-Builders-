import express from 'express';
import { authenticate } from '../middleware/auth.js';
import Dataset from '../models/Dataset.js';

const router = express.Router();

/**
 * @swagger
 * /api/datasets:
 *   get:
 *     summary: Get all datasets for authenticated user
 *     tags: [Datasets]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of datasets
 */
router.get('/', authenticate, async (req, res, next) => {
  try {
    const datasets = await Dataset.findAll({
      where: { userId: req.user.id },
      order: [['createdAt', 'DESC']],
    });

    res.json(datasets);
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * /api/datasets:
 *   post:
 *     summary: Create a new dataset
 *     tags: [Datasets]
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
 *               - data
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               data:
 *                 type: object
 *     responses:
 *       201:
 *         description: Dataset created
 */
router.post('/', authenticate, async (req, res, next) => {
  try {
    const { name, description, data } = req.body;

    const dataset = await Dataset.create({
      name,
      description,
      data,
      userId: req.user.id,
      version: 1,
    });

    res.status(201).json(dataset);
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * /api/datasets/{id}:
 *   get:
 *     summary: Get dataset by ID
 *     tags: [Datasets]
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
 *         description: Dataset details
 */
router.get('/:id', authenticate, async (req, res, next) => {
  try {
    const dataset = await Dataset.findOne({
      where: { id: req.params.id, userId: req.user.id },
    });

    if (!dataset) {
      return res.status(404).json({ error: 'Dataset not found' });
    }

    res.json(dataset);
  } catch (error) {
    next(error);
  }
});

/**
 * @swagger
 * /api/datasets/{id}/rollback:
 *   post:
 *     summary: Rollback dataset to a previous version
 *     tags: [Datasets]
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
 *         description: Dataset rolled back
 */
router.post('/:id/rollback', authenticate, async (req, res, next) => {
  try {
    const dataset = await Dataset.findOne({
      where: { id: req.params.id, userId: req.user.id },
    });

    if (!dataset) {
      return res.status(404).json({ error: 'Dataset not found' });
    }

    if (!dataset.parentId) {
      return res.status(400).json({ error: 'No previous version available' });
    }

    const parent = await Dataset.findByPk(dataset.parentId);
    
    res.json(parent);
  } catch (error) {
    next(error);
  }
});

export default router;
