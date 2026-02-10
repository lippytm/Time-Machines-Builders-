/**
 * Test Configuration Loader
 * 
 * Simple smoke test to validate SDK configuration loading
 * Run with: npm run test:config
 */

import { loadSDKConfig, validateConfig } from './config';

async function testConfigLoader() {
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('🧪 SDK Configuration Test');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

  try {
    // Load configuration
    console.log('📋 Loading SDK configuration...');
    const config = loadSDKConfig();
    console.log('✅ Configuration loaded successfully\n');

    // Display AI configuration
    console.log('🤖 AI Configuration:');
    console.log(`  OpenAI: ${config.ai.openai.apiKey ? '✓ Configured' : '✗ Not configured'}`);
    console.log(`  Hugging Face: ${config.ai.huggingface.apiKey ? '✓ Configured' : '✗ Not configured'}`);
    console.log(`  LangChain: ${config.ai.langchain.enabled ? '✓ Enabled' : '✗ Disabled'}`);
    console.log(`  LlamaIndex: ${config.ai.llamaindex.enabled ? '✓ Enabled' : '✗ Disabled'}`);
    console.log(`  Pinecone: ${config.ai.vectorStores.pinecone?.apiKey ? '✓ Configured' : '✗ Not configured'}`);
    console.log(`  Weaviate: ${config.ai.vectorStores.weaviate?.url ? '✓ Configured' : '✗ Not configured'}`);
    console.log(`  Chroma: ${config.ai.vectorStores.chroma?.url ? '✓ Configured' : '✗ Not configured'}\n`);

    // Display Web3 configuration
    console.log('⛓️  Web3 Configuration:');
    console.log(`  EVM RPC: ${config.web3.evm.rpcUrl}`);
    console.log(`  EVM Chain ID: ${config.web3.evm.chainId}`);
    console.log(`  Solana RPC: ${config.web3.solana.rpcUrl}`);
    console.log(`  Solana Network: ${config.web3.solana.network}`);
    console.log(`  Anchor: ${config.web3.anchor.enabled ? '✓ Enabled' : '✗ Disabled'}\n`);

    // Display Messaging configuration
    console.log('💬 Messaging Configuration:');
    console.log(`  Slack: ${config.messaging.slack.token ? '✓ Configured' : '✗ Not configured'}`);
    console.log(`  Discord: ${config.messaging.discord.token ? '✓ Configured' : '✗ Not configured'}`);
    console.log(`  ManyChat: ${config.messaging.manychat.apiKey ? '✓ Configured' : '✗ Not configured'}`);
    console.log(`  BotBuilders: ${config.messaging.botbuilders.apiKey ? '✓ Configured' : '✗ Not configured'}`);
    console.log(`  OpenClaw: ${config.messaging.openclaw.apiKey ? '✓ Configured' : '✗ Not configured'}`);
    console.log(`  Moltbook: ${config.messaging.moltbook.apiKey ? '✓ Configured' : '✗ Not configured'}\n`);

    // Display Data configuration
    console.log('📊 Data Configuration:');
    console.log(`  PostgreSQL: ${config.data.postgres.host}:${config.data.postgres.port}/${config.data.postgres.database}`);
    console.log(`  Redis: ${config.data.redis.url}`);
    console.log(`  S3: ${config.data.s3.bucket ? `Bucket: ${config.data.s3.bucket}` : '✗ Not configured'}`);
    console.log(`  IPFS: ${config.data.ipfs.url}\n`);

    // Test validation (optional - uncomment to test)
    // console.log('🔍 Testing validation...');
    // validateConfig(config, ['ai.openai.apiKey']); // Will throw if not configured

    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('✅ All configuration tests passed!');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
  } catch (error: any) {
    console.error('❌ Configuration test failed:', error.message);
    process.exit(1);
  }
}

// Run test if executed directly
if (require.main === module) {
  testConfigLoader();
}

export { testConfigLoader };
