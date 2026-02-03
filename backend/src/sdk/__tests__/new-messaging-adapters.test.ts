/**
 * Test New Messaging Adapters
 * 
 * Simple test to verify new messaging platform adapters can be created
 * Run with: ts-node src/sdk/__tests__/new-messaging-adapters.test.ts
 */

import { loadSDKConfig } from '../config';
import { SDKFactory } from '../factory';

async function testNewMessagingAdapters() {
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('🧪 Testing New Messaging Adapters');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

  try {
    // Load configuration
    const config = loadSDKConfig();
    const factory = new SDKFactory(config);

    console.log('📋 Testing ManyChat Adapter...');
    const manychat = factory.createMessagingAdapter('manychat');
    console.log(`  Type: ${manychat.type}`);
    console.log(`  Connected: ${manychat.isConnected()}`);
    console.log('  ✓ ManyChat adapter created successfully\n');

    console.log('📋 Testing BotBuilders Adapter...');
    const botbuilders = factory.createMessagingAdapter('botbuilders');
    console.log(`  Type: ${botbuilders.type}`);
    console.log(`  Connected: ${botbuilders.isConnected()}`);
    console.log('  ✓ BotBuilders adapter created successfully\n');

    console.log('📋 Testing OpenClaw Adapter...');
    const openclaw = factory.createMessagingAdapter('openclaw');
    console.log(`  Type: ${openclaw.type}`);
    console.log(`  Connected: ${openclaw.isConnected()}`);
    console.log('  ✓ OpenClaw adapter created successfully\n');

    console.log('📋 Testing Moltbook Adapter...');
    const moltbook = factory.createMessagingAdapter('moltbook');
    console.log(`  Type: ${moltbook.type}`);
    console.log(`  Connected: ${moltbook.isConnected()}`);
    console.log('  ✓ Moltbook adapter created successfully\n');

    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('✅ All adapter tests passed!');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
  } catch (error: any) {
    console.error('❌ Adapter test failed:', error.message);
    console.error(error.stack);
    process.exit(1);
  }
}

// Run test if executed directly
if (require.main === module) {
  testNewMessagingAdapters();
}

export { testNewMessagingAdapters };
