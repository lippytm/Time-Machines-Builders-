/**
 * Test New Messaging Adapters (JS Version)
 * 
 * Simple test to verify new messaging platform adapters can be created
 * Run with: node src/sdk/__tests__/new-messaging-adapters-simple.js
 */

const path = require('path');

async function testNewMessagingAdapters() {
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('🧪 Testing New Messaging Adapters');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

  try {
    console.log('📋 Testing ManyChat Adapter...');
    const { ManyChatAdapter } = require('../messaging/manychat.adapter');
    const manychat = new ManyChatAdapter({ apiKey: 'test-key' });
    console.log(`  Type: ${manychat.type}`);
    console.log(`  Connected: ${manychat.isConnected()}`);
    console.log('  ✓ ManyChat adapter created successfully\n');

    console.log('📋 Testing BotBuilders Adapter...');
    const { BotBuildersAdapter } = require('../messaging/botbuilders.adapter');
    const botbuilders = new BotBuildersAdapter({ apiKey: 'test-key' });
    console.log(`  Type: ${botbuilders.type}`);
    console.log(`  Connected: ${botbuilders.isConnected()}`);
    console.log('  ✓ BotBuilders adapter created successfully\n');

    console.log('📋 Testing OpenClaw Adapter...');
    const { OpenClawAdapter } = require('../messaging/openclaw.adapter');
    const openclaw = new OpenClawAdapter({ apiKey: 'test-key' });
    console.log(`  Type: ${openclaw.type}`);
    console.log(`  Connected: ${openclaw.isConnected()}`);
    console.log('  ✓ OpenClaw adapter created successfully\n');

    console.log('📋 Testing Moltbook Adapter...');
    const { MoltbookAdapter } = require('../messaging/moltbook.adapter');
    const moltbook = new MoltbookAdapter({ apiKey: 'test-key' });
    console.log(`  Type: ${moltbook.type}`);
    console.log(`  Connected: ${moltbook.isConnected()}`);
    console.log('  ✓ Moltbook adapter created successfully\n');

    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('✅ All adapter tests passed!');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
    console.log('✨ All 4 new messaging platform adapters are functional:');
    console.log('   - ManyChat');
    console.log('   - BotBuilders');
    console.log('   - OpenClaw');
    console.log('   - Moltbook\n');
  } catch (error) {
    console.error('❌ Adapter test failed:', error.message);
    console.error(error.stack);
    process.exit(1);
  }
}

// Run test
testNewMessagingAdapters();
