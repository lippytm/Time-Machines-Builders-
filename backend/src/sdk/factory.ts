/**
 * SDK Factory
 * 
 * Factory pattern for creating SDK adapters with proper configuration.
 * References @lippytm/ai-sdk for shared AI adapter interfaces.
 * 
 * Usage:
 *   const factory = new SDKFactory(loadSDKConfig());
 *   const openaiAdapter = factory.createAIAdapter('openai');
 *   const evmAdapter = factory.createWeb3Adapter('evm');
 */

import { SDKConfig } from './config';

// Placeholder type - in production, import from @lippytm/ai-sdk
// import type { AIAdapter, Web3Adapter, MessagingAdapter, DataAdapter } from '@lippytm/ai-sdk';

export interface BaseAdapter {
  type: string;
  isConnected(): boolean;
  disconnect(): Promise<void>;
}

export class SDKFactory {
  constructor(private config: SDKConfig) {}

  /**
   * Create AI adapter
   * @param provider - 'openai' | 'huggingface' | 'langchain' | 'llamaindex'
   */
  createAIAdapter(provider: string): BaseAdapter {
    switch (provider) {
      case 'openai':
        return this.createOpenAIAdapter();
      case 'huggingface':
        return this.createHuggingFaceAdapter();
      case 'langchain':
        return this.createLangChainAdapter();
      case 'llamaindex':
        return this.createLlamaIndexAdapter();
      default:
        throw new Error(`Unknown AI provider: ${provider}`);
    }
  }

  /**
   * Create Web3 adapter
   * @param chain - 'evm' | 'solana' | 'anchor'
   */
  createWeb3Adapter(chain: string): BaseAdapter {
    switch (chain) {
      case 'evm':
        return this.createEVMAdapter();
      case 'solana':
        return this.createSolanaAdapter();
      case 'anchor':
        return this.createAnchorAdapter();
      default:
        throw new Error(`Unknown Web3 chain: ${chain}`);
    }
  }

  /**
   * Create Messaging adapter
   * @param platform - 'slack' | 'discord' | 'manychat' | 'botbuilders' | 'openclaw' | 'moltbook'
   */
  createMessagingAdapter(platform: string): BaseAdapter {
    switch (platform) {
      case 'slack':
        return this.createSlackAdapter();
      case 'discord':
        return this.createDiscordAdapter();
      case 'manychat':
        return this.createManyChatAdapter();
      case 'botbuilders':
        return this.createBotBuildersAdapter();
      case 'openclaw':
        return this.createOpenClawAdapter();
      case 'moltbook':
        return this.createMoltbookAdapter();
      default:
        throw new Error(`Unknown messaging platform: ${platform}`);
    }
  }

  /**
   * Create Data adapter
   * @param service - 'postgres' | 'redis' | 's3' | 'ipfs'
   */
  createDataAdapter(service: string): BaseAdapter {
    switch (service) {
      case 'postgres':
        return this.createPostgresAdapter();
      case 'redis':
        return this.createRedisAdapter();
      case 's3':
        return this.createS3Adapter();
      case 'ipfs':
        return this.createIPFSAdapter();
      default:
        throw new Error(`Unknown data service: ${service}`);
    }
  }

  /**
   * Create vector store adapter
   * @param store - 'pinecone' | 'weaviate' | 'chroma'
   */
  createVectorStoreAdapter(store: string): BaseAdapter {
    switch (store) {
      case 'pinecone':
        return this.createPineconeAdapter();
      case 'weaviate':
        return this.createWeaviateAdapter();
      case 'chroma':
        return this.createChromaAdapter();
      default:
        throw new Error(`Unknown vector store: ${store}`);
    }
  }

  // AI Adapters
  private createOpenAIAdapter(): BaseAdapter {
    // TODO: Implement using @lippytm/ai-sdk interfaces
    const { lazy } = require('./ai/openai.adapter');
    return lazy(this.config.ai.openai);
  }

  private createHuggingFaceAdapter(): BaseAdapter {
    const { lazy } = require('./ai/huggingface.adapter');
    return lazy(this.config.ai.huggingface);
  }

  private createLangChainAdapter(): BaseAdapter {
    const { lazy } = require('./ai/langchain.adapter');
    return lazy(this.config.ai.langchain);
  }

  private createLlamaIndexAdapter(): BaseAdapter {
    const { lazy } = require('./ai/llamaindex.adapter');
    return lazy(this.config.ai.llamaindex);
  }

  // Web3 Adapters
  private createEVMAdapter(): BaseAdapter {
    const { lazy } = require('./web3/evm.adapter');
    return lazy(this.config.web3.evm);
  }

  private createSolanaAdapter(): BaseAdapter {
    const { lazy } = require('./web3/solana.adapter');
    return lazy(this.config.web3.solana);
  }

  private createAnchorAdapter(): BaseAdapter {
    const { lazy } = require('./web3/anchor.adapter');
    return lazy(this.config.web3.anchor);
  }

  // Messaging Adapters
  private createSlackAdapter(): BaseAdapter {
    const { lazy } = require('./messaging/slack.adapter');
    return lazy(this.config.messaging.slack);
  }

  private createDiscordAdapter(): BaseAdapter {
    const { lazy } = require('./messaging/discord.adapter');
    return lazy(this.config.messaging.discord);
  }

  private createManyChatAdapter(): BaseAdapter {
    const { lazy } = require('./messaging/manychat.adapter');
    return lazy(this.config.messaging.manychat);
  }

  private createBotBuildersAdapter(): BaseAdapter {
    const { lazy } = require('./messaging/botbuilders.adapter');
    return lazy(this.config.messaging.botbuilders);
  }

  private createOpenClawAdapter(): BaseAdapter {
    const { lazy } = require('./messaging/openclaw.adapter');
    return lazy(this.config.messaging.openclaw);
  }

  private createMoltbookAdapter(): BaseAdapter {
    const { lazy } = require('./messaging/moltbook.adapter');
    return lazy(this.config.messaging.moltbook);
  }

  // Data Adapters
  private createPostgresAdapter(): BaseAdapter {
    const { lazy } = require('./data/postgres.adapter');
    return lazy(this.config.data.postgres);
  }

  private createRedisAdapter(): BaseAdapter {
    const { lazy } = require('./data/redis.adapter');
    return lazy(this.config.data.redis);
  }

  private createS3Adapter(): BaseAdapter {
    const { lazy } = require('./data/s3.adapter');
    return lazy(this.config.data.s3);
  }

  private createIPFSAdapter(): BaseAdapter {
    const { lazy } = require('./data/ipfs.adapter');
    return lazy(this.config.data.ipfs);
  }

  // Vector Store Adapters (optional dependencies)
  private createPineconeAdapter(): BaseAdapter {
    if (!this.config.ai.vectorStores.pinecone) {
      throw new Error('Pinecone not configured');
    }
    const { lazy } = require('./ai/pinecone.adapter');
    return lazy(this.config.ai.vectorStores.pinecone);
  }

  private createWeaviateAdapter(): BaseAdapter {
    if (!this.config.ai.vectorStores.weaviate) {
      throw new Error('Weaviate not configured');
    }
    const { lazy } = require('./ai/weaviate.adapter');
    return lazy(this.config.ai.vectorStores.weaviate);
  }

  private createChromaAdapter(): BaseAdapter {
    if (!this.config.ai.vectorStores.chroma) {
      throw new Error('Chroma not configured');
    }
    const { lazy } = require('./ai/chroma.adapter');
    return lazy(this.config.ai.vectorStores.chroma);
  }
}
