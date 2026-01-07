export interface PromptOptions {
  model?: string;
  temperature?: number;
  maxTokens?: number;
  topP?: number;
  frequencyPenalty?: number;
  presencePenalty?: number;
}

export interface AIResponse {
  response: string;
}

export interface SummaryResponse {
  summary: string;
}

export interface EmbeddingResponse {
  embedding: number[];
  dimensions: number;
}

export interface AIOutput {
  _id: string;
  prompt: string;
  response: string;
  model: string;
  metadata?: any;
  timestamp: string;
}

export interface HistoryResponse {
  outputs: AIOutput[];
}
