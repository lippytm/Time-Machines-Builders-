import { Request, Response } from 'express';
import { claudeService } from '../services/claude.service';
import { postgresService } from '../services/postgres.service';
import { mongoService } from '../services/mongo.service';

export class ClaudeController {
  /**
   * Generate text from a prompt using Claude
   */
  async generateText(req: Request, res: Response): Promise<void> {
    try {
      const { prompt, model, temperature, maxTokens } = req.body;

      if (!prompt) {
        res.status(400).json({ error: 'Prompt is required' });
        return;
      }

      const response = await claudeService.generateText(prompt, {
        model,
        temperature,
        maxTokens,
      });

      // Save to databases (with individual error handling)
      try {
        await postgresService.savePrompt(prompt, response, model || 'claude-3-5-sonnet-20241022', temperature || 0.7);
      } catch (dbError: any) {
        console.warn('Failed to save to PostgreSQL:', dbError.message);
      }

      try {
        await mongoService.saveAIOutput({
          prompt,
          response,
          model: model || 'claude-3-5-sonnet-20241022',
          metadata: { temperature, maxTokens, provider: 'anthropic' },
        });
      } catch (dbError: any) {
        console.warn('Failed to save to MongoDB:', dbError.message);
      }

      res.json({ response });
    } catch (error: any) {
      console.error('Error generating text with Claude:', error);
      res.status(500).json({ error: error.message });
    }
  }

  /**
   * Summarize text using Claude
   */
  async summarize(req: Request, res: Response): Promise<void> {
    try {
      const { text } = req.body;

      if (!text) {
        res.status(400).json({ error: 'Text is required' });
        return;
      }

      const summary = await claudeService.summarizeText(text);

      try {
        await mongoService.saveAIOutput({
          prompt: `Summarize: ${text.substring(0, 100)}...`,
          response: summary,
          model: 'claude-3-5-sonnet-20241022',
          metadata: { operation: 'summarize', provider: 'anthropic' },
        });
      } catch (dbError: any) {
        console.warn('Failed to save to MongoDB:', dbError.message);
      }

      res.json({ summary });
    } catch (error: any) {
      console.error('Error summarizing text with Claude:', error);
      res.status(500).json({ error: error.message });
    }
  }

  /**
   * Custom prompt with tuning
   */
  async customPrompt(req: Request, res: Response): Promise<void> {
    try {
      const {
        prompt,
        systemMessage,
        model,
        temperature,
        maxTokens,
        topP,
      } = req.body;

      if (!prompt) {
        res.status(400).json({ error: 'Prompt is required' });
        return;
      }

      const response = await claudeService.customPrompt(prompt, systemMessage, {
        model,
        temperature,
        maxTokens,
        topP,
      });

      try {
        await mongoService.saveAIOutput({
          prompt,
          response,
          model: model || 'claude-3-5-sonnet-20241022',
          metadata: {
            systemMessage,
            temperature,
            maxTokens,
            topP,
            provider: 'anthropic',
          },
        });
      } catch (dbError: any) {
        console.warn('Failed to save to MongoDB:', dbError.message);
      }

      res.json({ response });
    } catch (error: any) {
      console.error('Error with custom prompt:', error);
      res.status(500).json({ error: error.message });
    }
  }

  /**
   * Conversation with multiple messages
   */
  async conversation(req: Request, res: Response): Promise<void> {
    try {
      const { messages, systemMessage, model, temperature, maxTokens } = req.body;

      if (!messages || !Array.isArray(messages)) {
        res.status(400).json({ error: 'Messages array is required' });
        return;
      }

      const response = await claudeService.conversationPrompt(
        messages,
        systemMessage,
        { model, temperature, maxTokens }
      );

      try {
        await mongoService.saveAIOutput({
          prompt: JSON.stringify(messages),
          response,
          model: model || 'claude-3-5-sonnet-20241022',
          metadata: {
            messageCount: messages.length,
            systemMessage,
            temperature,
            maxTokens,
            provider: 'anthropic',
          },
        });
      } catch (dbError: any) {
        console.warn('Failed to save to MongoDB:', dbError.message);
      }

      res.json({ response });
    } catch (error: any) {
      console.error('Error with conversation:', error);
      res.status(500).json({ error: error.message });
    }
  }

  /**
   * Analyze code using Claude
   */
  async analyzeCode(req: Request, res: Response): Promise<void> {
    try {
      const { code, language } = req.body;

      if (!code || !language) {
        res.status(400).json({ error: 'Code and language are required' });
        return;
      }

      const analysis = await claudeService.analyzeCode(code, language);

      try {
        await mongoService.saveAIOutput({
          prompt: `Analyze ${language} code`,
          response: analysis,
          model: 'claude-3-5-sonnet-20241022',
          metadata: { operation: 'code_analysis', language, provider: 'anthropic' },
        });
      } catch (dbError: any) {
        console.warn('Failed to save to MongoDB:', dbError.message);
      }

      res.json({ analysis });
    } catch (error: any) {
      console.error('Error analyzing code:', error);
      res.status(500).json({ error: error.message });
    }
  }

  /**
   * Generate code using Claude
   */
  async generateCode(req: Request, res: Response): Promise<void> {
    try {
      const { description, language } = req.body;

      if (!description || !language) {
        res.status(400).json({ error: 'Description and language are required' });
        return;
      }

      const code = await claudeService.generateCode(description, language);

      try {
        await mongoService.saveAIOutput({
          prompt: `Generate ${language} code: ${description}`,
          response: code,
          model: 'claude-3-5-sonnet-20241022',
          metadata: { operation: 'code_generation', language, provider: 'anthropic' },
        });
      } catch (dbError: any) {
        console.warn('Failed to save to MongoDB:', dbError.message);
      }

      res.json({ code });
    } catch (error: any) {
      console.error('Error generating code:', error);
      res.status(500).json({ error: error.message });
    }
  }

  /**
   * Get AI output history
   */
  async getHistory(req: Request, res: Response): Promise<void> {
    try {
      const limit = parseInt(req.query.limit as string) || 10;
      const outputs = await mongoService.getAIOutputs(limit);
      
      // Filter for Claude outputs
      const claudeOutputs = outputs.filter(
        (output: any) => output.metadata?.provider === 'anthropic'
      );
      
      res.json({ outputs: claudeOutputs });
    } catch (error: any) {
      console.error('Error fetching history:', error);
      res.status(500).json({ error: error.message });
    }
  }
}

export const claudeController = new ClaudeController();
