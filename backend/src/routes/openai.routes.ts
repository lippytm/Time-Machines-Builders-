import { Router } from 'express';
import { openaiController } from '../controllers/openai.controller';

const router = Router();

/**
 * @route   POST /api/openai/generate
 * @desc    Generate text from a prompt
 * @access  Public
 */
router.post('/generate', (req, res) => openaiController.generateText(req, res));

/**
 * @route   POST /api/openai/summarize
 * @desc    Summarize text
 * @access  Public
 */
router.post('/summarize', (req, res) => openaiController.summarize(req, res));

/**
 * @route   POST /api/openai/embedding
 * @desc    Create text embedding
 * @access  Public
 */
router.post('/embedding', (req, res) => openaiController.createEmbedding(req, res));

/**
 * @route   POST /api/openai/custom-prompt
 * @desc    Custom prompt with tuning parameters
 * @access  Public
 */
router.post('/custom-prompt', (req, res) => openaiController.customPrompt(req, res));

/**
 * @route   POST /api/openai/batch-embeddings
 * @desc    Create batch embeddings
 * @access  Public
 */
router.post('/batch-embeddings', (req, res) => openaiController.batchEmbeddings(req, res));

/**
 * @route   GET /api/openai/history
 * @desc    Get AI output history
 * @access  Public
 */
router.get('/history', (req, res) => openaiController.getHistory(req, res));

export default router;
