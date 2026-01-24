import Anthropic from '@anthropic-ai/sdk';
import { config } from '../config';

class ClaudeService {
  private client: Anthropic;

  constructor() {
    this.client = new Anthropic({
      apiKey: config.anthropic.apiKey,
    });
  }

  /**
   * Generate text using Claude models
   */
  async generateText(prompt: string, options?: {
    model?: string;
    temperature?: number;
    maxTokens?: number;
  }): Promise<string> {
    const message = await this.client.messages.create({
      model: options?.model || 'claude-3-5-sonnet-20241022',
      max_tokens: options?.maxTokens || 1024,
      temperature: options?.temperature || 0.7,
      messages: [{ role: 'user', content: prompt }],
    });

    if (message.content.length === 0) {
      return '';
    }

    const content = message.content[0];
    if (content.type === 'text') {
      return content.text;
    }
    return '';
  }

  /**
   * Summarize text using Claude
   */
  async summarizeText(text: string): Promise<string> {
    const prompt = `Please summarize the following text:\n\n${text}`;
    return this.generateText(prompt, { temperature: 0.5, maxTokens: 500 });
  }

  /**
   * Custom prompt with tuning parameters and system message
   */
  async customPrompt(prompt: string, systemMessage?: string, options?: {
    model?: string;
    temperature?: number;
    maxTokens?: number;
    topP?: number;
  }): Promise<string> {
    const message = await this.client.messages.create({
      model: options?.model || 'claude-3-5-sonnet-20241022',
      max_tokens: options?.maxTokens || 1024,
      temperature: options?.temperature || 0.7,
      top_p: options?.topP,
      system: systemMessage,
      messages: [{ role: 'user', content: prompt }],
    });

    if (message.content.length === 0) {
      return '';
    }

    const content = message.content[0];
    if (content.type === 'text') {
      return content.text;
    }
    return '';
  }

  /**
   * Generate a conversation with multiple messages
   */
  async conversationPrompt(
    messages: Array<{ role: 'user' | 'assistant'; content: string }>,
    systemMessage?: string,
    options?: {
      model?: string;
      temperature?: number;
      maxTokens?: number;
    }
  ): Promise<string> {
    const message = await this.client.messages.create({
      model: options?.model || 'claude-3-5-sonnet-20241022',
      max_tokens: options?.maxTokens || 1024,
      temperature: options?.temperature || 0.7,
      system: systemMessage,
      messages,
    });

    if (message.content.length === 0) {
      return '';
    }

    const content = message.content[0];
    if (content.type === 'text') {
      return content.text;
    }
    return '';
  }

  /**
   * Analyze code using Claude
   */
  async analyzeCode(code: string, language: string): Promise<string> {
    const prompt = `Analyze the following ${language} code and provide insights:\n\n\`\`\`${language}\n${code}\n\`\`\``;
    return this.generateText(prompt, { temperature: 0.3, maxTokens: 1500 });
  }

  /**
   * Generate code based on description
   */
  async generateCode(description: string, language: string): Promise<string> {
    const systemMessage = `You are an expert ${language} developer. Generate clean, efficient, and well-documented code.`;
    const prompt = `Generate ${language} code for: ${description}`;
    return this.customPrompt(prompt, systemMessage, { temperature: 0.5, maxTokens: 2000 });
  }
}

export const claudeService = new ClaudeService();
