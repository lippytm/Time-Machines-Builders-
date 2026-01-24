import axios, { AxiosInstance } from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

class ApiService {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: API_BASE_URL,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  // OpenAI API calls
  async generateText(prompt: string, options?: {
    model?: string;
    temperature?: number;
    maxTokens?: number;
  }) {
    const response = await this.client.post('/openai/generate', {
      prompt,
      ...options,
    });
    return response.data;
  }

  async summarizeText(text: string) {
    const response = await this.client.post('/openai/summarize', { text });
    return response.data;
  }

  async createEmbedding(text: string) {
    const response = await this.client.post('/openai/embedding', { text });
    return response.data;
  }

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
  ) {
    const response = await this.client.post('/openai/custom-prompt', {
      prompt,
      systemMessage,
      ...options,
    });
    return response.data;
  }

  async batchEmbeddings(texts: string[]) {
    const response = await this.client.post('/openai/batch-embeddings', { texts });
    return response.data;
  }

  async getHistory(limit: number = 10) {
    const response = await this.client.get(`/openai/history?limit=${limit}`);
    return response.data;
  }

  // Claude API calls
  async claudeGenerateText(prompt: string, options?: {
    model?: string;
    temperature?: number;
    maxTokens?: number;
  }) {
    const response = await this.client.post('/claude/generate', {
      prompt,
      ...options,
    });
    return response.data;
  }

  async claudeSummarizeText(text: string) {
    const response = await this.client.post('/claude/summarize', { text });
    return response.data;
  }

  async claudeCustomPrompt(
    prompt: string,
    systemMessage?: string,
    options?: {
      model?: string;
      temperature?: number;
      maxTokens?: number;
      topP?: number;
    }
  ) {
    const response = await this.client.post('/claude/custom-prompt', {
      prompt,
      systemMessage,
      ...options,
    });
    return response.data;
  }

  async claudeConversation(
    messages: Array<{ role: 'user' | 'assistant'; content: string }>,
    systemMessage?: string,
    options?: {
      model?: string;
      temperature?: number;
      maxTokens?: number;
    }
  ) {
    const response = await this.client.post('/claude/conversation', {
      messages,
      systemMessage,
      ...options,
    });
    return response.data;
  }

  async claudeAnalyzeCode(code: string, language: string) {
    const response = await this.client.post('/claude/analyze-code', { code, language });
    return response.data;
  }

  async claudeGenerateCode(description: string, language: string) {
    const response = await this.client.post('/claude/generate-code', { description, language });
    return response.data;
  }

  async claudeGetHistory(limit: number = 10) {
    const response = await this.client.get(`/claude/history?limit=${limit}`);
    return response.data;
  }
}

export const apiService = new ApiService();
