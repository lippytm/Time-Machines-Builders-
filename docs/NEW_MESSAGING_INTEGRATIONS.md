# New Messaging Platform Integrations

This document describes the new messaging and chatbot platform integrations added to Time-Machines-Builders.

## Overview

Four new messaging and chatbot platforms have been integrated into the SDK:

1. **ManyChat** - Multi-platform chatbot automation
2. **BotBuilders** - Conversational AI bot building platform
3. **OpenClaw** - Open-source conversational AI
4. **Moltbook** - Social networking and messaging platform

## Architecture

All four platforms follow the same adapter pattern as existing messaging integrations (Slack, Discord):

- Implement the `BaseAdapter` interface
- Provide `isConnected()` and `disconnect()` methods
- Export a `lazy()` factory function for dynamic instantiation
- Load configuration from environment variables

## Platform Details

### ManyChat

**Purpose**: Chatbot platform for Facebook Messenger, Instagram, WhatsApp, SMS, and Email

**Configuration**:
```typescript
{
  apiKey: string;
  baseUrl?: string; // Default: https://api.manychat.com/fb
}
```

**Environment Variables**:
- `MANYCHAT_API_KEY` (required)
- `MANYCHAT_BASE_URL` (optional)

**Key Features**:
- Send messages to subscribers
- Manage subscriber tags and custom fields
- Get subscriber information
- Trigger flows and broadcasts

**API Methods**:
- `sendMessage(subscriberId, message, tag?)`
- `getSubscriber(subscriberId)`
- `setCustomField(subscriberId, fieldName, value)`
- `addTag(subscriberId, tagName)`
- `removeTag(subscriberId, tagName)`

### BotBuilders

**Purpose**: Platform for creating and managing conversational AI bots

**Configuration**:
```typescript
{
  apiKey: string;
  apiSecret?: string;
  baseUrl?: string; // Default: https://api.botbuilders.io/v1
  workspaceId?: string;
}
```

**Environment Variables**:
- `BOTBUILDERS_API_KEY` (required)
- `BOTBUILDERS_API_SECRET` (optional)
- `BOTBUILDERS_BASE_URL` (optional)
- `BOTBUILDERS_WORKSPACE_ID` (optional)

**Key Features**:
- Create and manage bots
- Deploy bots to multiple channels
- Train conversational AI models
- Access conversation history and analytics

**API Methods**:
- `sendMessage(conversationId, message, metadata?)`
- `createBot(name, config)`
- `getBot(botId)`
- `updateBot(botId, config)`
- `deployBot(botId, channels)`
- `getConversationHistory(conversationId, limit?)`
- `trainBot(botId, trainingData)`

### OpenClaw

**Purpose**: Open-source conversational AI and chatbot automation

**Configuration**:
```typescript
{
  apiKey: string;
  apiSecret?: string;
  baseUrl?: string; // Default: https://api.openclaw.io/v1
  projectId?: string;
}
```

**Environment Variables**:
- `OPENCLAW_API_KEY` (required)
- `OPENCLAW_API_SECRET` (optional)
- `OPENCLAW_BASE_URL` (optional)
- `OPENCLAW_PROJECT_ID` (optional)

**Key Features**:
- Session-based conversations
- NLU (Natural Language Understanding) training
- Intent and entity management
- Open-source conversational AI

**API Methods**:
- `sendMessage(sessionId, message, context?)`
- `createSession(userId, metadata?)`
- `getSession(sessionId)`
- `updateSessionContext(sessionId, context)`
- `getHistory(sessionId, limit?)`
- `createIntent(name, examples)`
- `trainModel(trainingData)`
- `getModelStatus()`

### Moltbook

**Purpose**: Social networking and messaging integration platform

**Configuration**:
```typescript
{
  apiKey: string;
  apiSecret?: string;
  baseUrl?: string; // Default: https://api.moltbook.io/v1
  appId?: string;
}
```

**Environment Variables**:
- `MOLTBOOK_API_KEY` (required)
- `MOLTBOOK_API_SECRET` (optional)
- `MOLTBOOK_BASE_URL` (optional)
- `MOLTBOOK_APP_ID` (optional)

**Key Features**:
- Send messages to users
- Create and manage group conversations
- Post content to feeds
- Manage user connections and profiles

**API Methods**:
- `sendMessage(userId, message, type?)`
- `getUserProfile(userId)`
- `postToFeed(content, media?, visibility?)`
- `getConversations(userId, limit?)`
- `getMessages(conversationId, limit?)`
- `createGroup(name, memberIds)`
- `addGroupMembers(groupId, memberIds)`
- `getConnections(userId)`

## Usage

### Creating Adapters

```typescript
import { loadSDKConfig, SDKFactory } from './sdk';

// Load configuration from environment
const config = loadSDKConfig();

// Create factory
const factory = new SDKFactory(config);

// Create messaging adapters
const manychat = factory.createMessagingAdapter('manychat');
const botbuilders = factory.createMessagingAdapter('botbuilders');
const openclaw = factory.createMessagingAdapter('openclaw');
const moltbook = factory.createMessagingAdapter('moltbook');
```

### Configuration

Set environment variables in `.env` file:

```bash
# ManyChat
MANYCHAT_API_KEY=your_api_key_here

# BotBuilders
BOTBUILDERS_API_KEY=your_api_key_here
BOTBUILDERS_API_SECRET=your_api_secret_here
BOTBUILDERS_WORKSPACE_ID=your_workspace_id_here

# OpenClaw
OPENCLAW_API_KEY=your_api_key_here
OPENCLAW_PROJECT_ID=your_project_id_here

# Moltbook
MOLTBOOK_API_KEY=your_api_key_here
MOLTBOOK_APP_ID=your_app_id_here
```

## Implementation Status

All adapters are **structurally complete** with:
- ✅ TypeScript interfaces defined
- ✅ Class implementations with BaseAdapter
- ✅ Configuration loading from environment
- ✅ Method signatures defined
- ✅ Documentation and comments
- ⏳ Actual API implementation (TODO - marked for future development)

The adapters are ready to be used as soon as the actual API integration code is implemented in the method bodies.

## Testing

### Configuration Test

```bash
cd backend
npm run test:config
```

This will display the configuration status of all adapters including the new platforms.

### Adapter Creation Test

```bash
cd backend
node src/sdk/__tests__/new-messaging-adapters-simple.js
```

This verifies that all four new adapters can be instantiated correctly.

## Multi-Language Support

While the primary implementation is in TypeScript/Node.js, the documentation includes equivalent packages for other languages:

- **Python**: Custom implementation using `requests` library
- **Go**: Custom implementation using `net/http` package
- **Rust**: Custom implementation using `reqwest` crate

## Future Enhancements

Planned improvements for these integrations:

- [ ] Implement actual API calls for all methods
- [ ] Add retry logic and error handling
- [ ] Add rate limiting support
- [ ] Add webhook support for incoming messages
- [ ] Add OAuth/authentication flows
- [ ] Add comprehensive unit tests
- [ ] Add integration tests with mock APIs
- [ ] Add performance monitoring
- [ ] Add usage analytics

## Security Considerations

- API keys are loaded from environment variables, never hardcoded
- All sensitive data should be stored in GitHub Secrets or a secure vault
- API secrets are optional and only used when needed
- The adapters follow secure coding practices
- CodeQL security analysis passed with 0 alerts

## Contributing

To add new methods to any adapter:

1. Add the method signature to the adapter class
2. Add documentation comments
3. Implement the actual API call logic
4. Add tests for the new method
5. Update this documentation

## Related Documentation

- [INTEGRATION.md](../INTEGRATION.md) - Setup instructions
- [README.md](../README.md) - General project overview
- [SDK Documentation](./backend/src/sdk/README.md) - SDK usage guide

---

**Version**: 1.0.0  
**Last Updated**: 2026-02-03  
**Status**: Production Ready (structure), Implementation Pending (API calls)
