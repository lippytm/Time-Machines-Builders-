/**
 * SDK Entry Point
 * 
 * Main export for Time Machines Builders SDK
 * Provides factory pattern for creating adapters across AI, Web3, Messaging, and Data services
 */

export { SDKConfig, loadSDKConfig, validateConfig } from './config';
export { SDKFactory, BaseAdapter } from './factory';

// Re-export adapter types for convenience
export * from './ai/openai.adapter';
export * from './ai/huggingface.adapter';
export * from './ai/langchain.adapter';
export * from './ai/llamaindex.adapter';
export * from './ai/pinecone.adapter';
export * from './ai/weaviate.adapter';
export * from './ai/chroma.adapter';

export * from './web3/evm.adapter';
export * from './web3/solana.adapter';
export * from './web3/anchor.adapter';

export * from './messaging/slack.adapter';
export * from './messaging/discord.adapter';

export * from './data/postgres.adapter';
export * from './data/redis.adapter';
export * from './data/s3.adapter';
export * from './data/ipfs.adapter';
