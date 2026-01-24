import { Router } from 'express';
import { claudeController } from '../controllers/claude.controller';

const router = Router();

/**
 * @route   POST /api/claude/generate
 * @desc    Generate text from a prompt using Claude
 * @access  Public
 */
router.post('/generate', (req, res) => claudeController.generateText(req, res));

/**
 * @route   POST /api/claude/summarize
 * @desc    Summarize text using Claude
 * @access  Public
 */
router.post('/summarize', (req, res) => claudeController.summarize(req, res));

/**
 * @route   POST /api/claude/custom-prompt
 * @desc    Custom prompt with tuning parameters
 * @access  Public
 */
router.post('/custom-prompt', (req, res) => claudeController.customPrompt(req, res));

/**
 * @route   POST /api/claude/conversation
 * @desc    Multi-turn conversation
 * @access  Public
 */
router.post('/conversation', (req, res) => claudeController.conversation(req, res));

/**
 * @route   POST /api/claude/analyze-code
 * @desc    Analyze code with Claude
 * @access  Public
 */
router.post('/analyze-code', (req, res) => claudeController.analyzeCode(req, res));

/**
 * @route   POST /api/claude/generate-code
 * @desc    Generate code with Claude
 * @access  Public
 */
router.post('/generate-code', (req, res) => claudeController.generateCode(req, res));

/**
 * @route   GET /api/claude/history
 * @desc    Get Claude AI output history
 * @access  Public
 */
router.get('/history', (req, res) => claudeController.getHistory(req, res));

export default router;
