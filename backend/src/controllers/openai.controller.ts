import { Request, Response } from 'express';
import { openaiService } from '../services/openai.service';
import { postgresService } from '../services/postgres.service';
import { mongoService } from '../services/mongo.service';

export class OpenAIController {
  /**
   * Generate text from a prompt
   */
  async generateText(req: Request, res: Response): Promise<void> {
    try {
      const { prompt, model, temperature, maxTokens } = req.body;

      if (!prompt) {
        res.status(400).json({ error: 'Prompt is required' });
        return;
      }

      const response = await openaiService.generateText(prompt, {
        model,
        temperature,
        maxTokens,
      });

      // Save to databases (with individual error handling)
      try {
        await postgresService.savePrompt(prompt, response, model || 'gpt-3.5-turbo', temperature || 0.7);
      } catch (dbError: any) {
        console.warn('Failed to save to PostgreSQL:', dbError.message);
      }

      try {
        await mongoService.saveAIOutput({
          prompt,
          response,
          model: model || 'gpt-3.5-turbo',
          metadata: { temperature, maxTokens },
        });
      } catch (dbError: any) {
        console.warn('Failed to save to MongoDB:', dbError.message);
      }

      res.json({ response });
    } catch (error: any) {
      console.error('Error generating text:', error);
      res.status(500).json({ error: error.message });
    }
  }

  /**
   * Summarize text
   */
  async summarize(req: Request, res: Response): Promise<void> {
    try {
      const { text } = req.body;

      if (!text) {
        res.status(400).json({ error: 'Text is required' });
        return;
      }

      const summary = await openaiService.summarizeText(text);

      try {
        await mongoService.saveAIOutput({
          prompt: `Summarize: ${text.substring(0, 100)}...`,
          response: summary,
          model: 'gpt-3.5-turbo',
          metadata: { operation: 'summarize' },
        });
      } catch (dbError: any) {
        console.warn('Failed to save to MongoDB:', dbError.message);
      }

      res.json({ summary });
    } catch (error: any) {
      console.error('Error summarizing text:', error);
      res.status(500).json({ error: error.message });
    }
  }

  /**
   * Create text embeddings
   */
  async createEmbedding(req: Request, res: Response): Promise<void> {
    try {
      const { text } = req.body;

      if (!text) {
        res.status(400).json({ error: 'Text is required' });
        return;
      }

      const embedding = await openaiService.createEmbedding(text);

      try {
        await postgresService.saveEmbedding(text, embedding);
      } catch (dbError: any) {
        console.warn('Failed to save embedding to PostgreSQL:', dbError.message);
      }

      res.json({ embedding, dimensions: embedding.length });
    } catch (error: any) {
      console.error('Error creating embedding:', error);
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
        frequencyPenalty,
        presencePenalty,
      } = req.body;

      if (!prompt) {
        res.status(400).json({ error: 'Prompt is required' });
        return;
      }

      const response = await openaiService.customPrompt(prompt, systemMessage, {
        model,
        temperature,
        maxTokens,
        topP,
        frequencyPenalty,
        presencePenalty,
      });

      try {
        await mongoService.saveAIOutput({
          prompt,
          response,
          model: model || 'gpt-3.5-turbo',
          metadata: {
            systemMessage,
            temperature,
            maxTokens,
            topP,
            frequencyPenalty,
            presencePenalty,
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
   * Batch create embeddings
   */
  async batchEmbeddings(req: Request, res: Response): Promise<void> {
    try {
      const { texts } = req.body;

      if (!texts || !Array.isArray(texts)) {
        res.status(400).json({ error: 'Texts array is required' });
        return;
      }

      const embeddings = await openaiService.batchEmbeddings(texts);

      // Save each embedding with individual error handling
      for (let i = 0; i < texts.length; i++) {
        try {
          await postgresService.saveEmbedding(texts[i], embeddings[i]);
        } catch (dbError: any) {
          console.warn(`Failed to save embedding ${i} to PostgreSQL:`, dbError.message);
        }
      }

      res.json({ embeddings, count: embeddings.length });
    } catch (error: any) {
      console.error('Error creating batch embeddings:', error);
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
      res.json({ outputs });
    } catch (error: any) {
      console.error('Error fetching history:', error);
      res.status(500).json({ error: error.message });
    }
  }
}

export const openaiController = new OpenAIController();
