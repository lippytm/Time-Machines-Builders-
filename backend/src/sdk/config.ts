/**
 * SDK Configuration Loader
 * 
 * Centralized configuration for AI, Web3, Messaging, and Data adapters.
 * Loads from environment variables with sensible defaults.
 * 
 * TODO: Replace placeholder values with actual secrets management
 * TODO: Use vault service for production deployments (e.g., AWS Secrets Manager, HashiCorp Vault)
 */

export interface SDKConfig {
  ai: AIConfig;
  web3: Web3Config;
  messaging: MessagingConfig;
  data: DataConfig;
}

export interface AIConfig {
  // OpenAI
  openai: {
    apiKey: string;
    organization?: string;
  };
  // Hugging Face
  huggingface: {
    apiKey: string;
    inferenceEndpoint?: string;
  };
  // LangChain (uses OpenAI by default)
  langchain: {
    enabled: boolean;
  };
  // LlamaIndex
  llamaindex: {
    enabled: boolean;
  };
  // Vector Stores (optional heavy dependencies)
  vectorStores: {
    pinecone?: {
      apiKey: string;
      environment: string;
    };
    weaviate?: {
      url: string;
      apiKey?: string;
    };
    chroma?: {
      url: string;
    };
  };
}

export interface Web3Config {
  // EVM chains (Ethereum, Polygon, BSC, etc.)
  evm: {
    rpcUrl: string;
    chainId: number;
    // Note: Private keys should be loaded from secure key management systems (AWS Secrets Manager, HashiCorp Vault, etc.)
    // This is a placeholder for development only - never commit actual private keys
    privateKey?: string;
  };
  // Solana
  solana: {
    rpcUrl: string;
    network: 'mainnet-beta' | 'testnet' | 'devnet';
    // Note: Private keys should be loaded from secure key management systems
    // This is a placeholder for development only - never commit actual private keys
    privateKey?: string;
  };
  // Anchor (Solana framework) - placeholder
  anchor: {
    enabled: boolean;
    programId?: string;
  };
  // Extension points for other chains (Cosmos, Polkadot, etc.)
  other?: Record<string, any>;
}

export interface MessagingConfig {
  slack: {
    token: string;
    signingSecret?: string;
  };
  discord: {
    token: string;
    clientId?: string;
  };
}

export interface DataConfig {
  postgres: {
    host: string;
    port: number;
    database: string;
    user: string;
    password: string;
  };
  redis: {
    url: string;
    password?: string;
  };
  s3: {
    region: string;
    bucket: string;
    accessKeyId?: string; // TODO: Use IAM roles in production
    secretAccessKey?: string;
  };
  ipfs: {
    url: string;
    projectId?: string;
    projectSecret?: string;
  };
}

/**
 * Load SDK configuration from environment variables
 */
export function loadSDKConfig(): SDKConfig {
  return {
    ai: {
      openai: {
        apiKey: process.env.OPENAI_API_KEY || '',
        organization: process.env.OPENAI_ORG_ID,
      },
      huggingface: {
        apiKey: process.env.HUGGINGFACE_API_KEY || '',
        inferenceEndpoint: process.env.HUGGINGFACE_INFERENCE_ENDPOINT,
      },
      langchain: {
        enabled: process.env.LANGCHAIN_ENABLED === 'true',
      },
      llamaindex: {
        enabled: process.env.LLAMAINDEX_ENABLED === 'true',
      },
      vectorStores: {
        pinecone: process.env.PINECONE_API_KEY ? {
          apiKey: process.env.PINECONE_API_KEY,
          environment: process.env.PINECONE_ENVIRONMENT || 'us-west1-gcp',
        } : undefined,
        weaviate: process.env.WEAVIATE_URL ? {
          url: process.env.WEAVIATE_URL,
          apiKey: process.env.WEAVIATE_API_KEY,
        } : undefined,
        chroma: process.env.CHROMA_URL ? {
          url: process.env.CHROMA_URL,
        } : undefined,
      },
    },
    web3: {
      evm: {
        rpcUrl: process.env.EVM_RPC_URL || 'https://eth-mainnet.g.alchemy.com/v2/demo',
        chainId: parseInt(process.env.EVM_CHAIN_ID || '1'),
        // Warning: Never commit private keys to source control
        // Use environment variables from secure key management systems only
        privateKey: process.env.EVM_PRIVATE_KEY,
      },
      solana: {
        rpcUrl: process.env.SOLANA_RPC_URL || 'https://api.mainnet-beta.solana.com',
        network: (process.env.SOLANA_NETWORK as any) || 'mainnet-beta',
        // Warning: Never commit private keys to source control
        // Use environment variables from secure key management systems only
        privateKey: process.env.SOLANA_PRIVATE_KEY,
      },
      anchor: {
        enabled: process.env.ANCHOR_ENABLED === 'true',
        programId: process.env.ANCHOR_PROGRAM_ID,
      },
      other: {},
    },
    messaging: {
      slack: {
        token: process.env.SLACK_BOT_TOKEN || '',
        signingSecret: process.env.SLACK_SIGNING_SECRET,
      },
      discord: {
        token: process.env.DISCORD_BOT_TOKEN || '',
        clientId: process.env.DISCORD_CLIENT_ID,
      },
    },
    data: {
      postgres: {
        host: process.env.POSTGRES_HOST || 'localhost',
        port: parseInt(process.env.POSTGRES_PORT || '5432'),
        database: process.env.POSTGRES_DB || 'timemachines',
        user: process.env.POSTGRES_USER || 'postgres',
        password: process.env.POSTGRES_PASSWORD || '',
      },
      redis: {
        url: process.env.REDIS_URL || 'redis://localhost:6379',
        password: process.env.REDIS_PASSWORD,
      },
      s3: {
        region: process.env.AWS_REGION || 'us-east-1',
        bucket: process.env.S3_BUCKET || '',
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      },
      ipfs: {
        url: process.env.IPFS_URL || 'https://ipfs.infura.io:5001',
        projectId: process.env.IPFS_PROJECT_ID,
        projectSecret: process.env.IPFS_PROJECT_SECRET,
      },
    },
  };
}

/**
 * Validate required configuration
 * @param config SDK configuration
 * @param required Array of required config paths (e.g., 'ai.openai.apiKey')
 */
export function validateConfig(config: SDKConfig, required: string[]): void {
  const missing: string[] = [];
  
  for (const path of required) {
    const value = getNestedValue(config, path);
    if (!value) {
      missing.push(path);
    }
  }
  
  if (missing.length > 0) {
    throw new Error(`Missing required configuration: ${missing.join(', ')}`);
  }
}

function getNestedValue(obj: any, path: string): any {
  return path.split('.').reduce((current, key) => current?.[key], obj);
}
