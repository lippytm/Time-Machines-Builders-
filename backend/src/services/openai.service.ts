import OpenAI from 'openai';
import { config } from '../config';

class OpenAIService {
  private client: OpenAI;

  constructor() {
    this.client = new OpenAI({
      apiKey: config.openai.apiKey,
      organization: config.openai.organization,
    });
  }

  /**
   * Generate text using OpenAI GPT models
   */
  async generateText(
    prompt: string,
    options?: {
      model?: string;
      temperature?: number;
      maxTokens?: number;
    }
  ): Promise<string> {
    const completion = await this.client.chat.completions.create({
      model: options?.model || 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
      temperature: options?.temperature || 0.7,
      max_tokens: options?.maxTokens || 1000,
    });

    return completion.choices[0]?.message?.content || '';
  }

  /**
   * Summarize text using OpenAI
   */
  async summarizeText(text: string): Promise<string> {
    const prompt = `Please summarize the following text:\n\n${text}`;
    return this.generateText(prompt, { temperature: 0.5, maxTokens: 500 });
  }

  /**
   * Generate embeddings for text
   */
  async createEmbedding(text: string): Promise<number[]> {
    const response = await this.client.embeddings.create({
      model: 'text-embedding-ada-002',
      input: text,
    });

    return response.data[0].embedding;
  }

  /**
   * Custom prompt with tuning parameters
   */
  async customPrompt(
    prompt: string,
    systemMessage?: string,
    options?: {
      model?: string;
      temperature?: number;
      maxTokens?: number;
      topP?: number;
      frequencyPenalty?: number;
      presencePenalty?: number;
    }
  ): Promise<string> {
    const messages: OpenAI.Chat.ChatCompletionMessageParam[] = [];

    if (systemMessage) {
      messages.push({ role: 'system', content: systemMessage });
    }

    messages.push({ role: 'user', content: prompt });

    const completion = await this.client.chat.completions.create({
      model: options?.model || 'gpt-3.5-turbo',
      messages,
      temperature: options?.temperature || 0.7,
      max_tokens: options?.maxTokens || 1000,
      top_p: options?.topP,
      frequency_penalty: options?.frequencyPenalty,
      presence_penalty: options?.presencePenalty,
    });

    return completion.choices[0]?.message?.content || '';
  }

  /**
   * Batch embeddings for multiple texts
   */
  async batchEmbeddings(texts: string[]): Promise<number[][]> {
    const response = await this.client.embeddings.create({
      model: 'text-embedding-ada-002',
      input: texts,
    });

    return response.data.map((item) => item.embedding);
  }
}

export const openaiService = new OpenAIService();
