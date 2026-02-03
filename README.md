# Time-Machines-Builders

AI automation to Earn while you Learn to Become a Better Programmer and Blockchain Developer.

## 🚀 Overview

Time-Machines-Builders is an integrated ecosystem that connects multiple AI automation, blockchain development, and learning repositories. This project serves as a central hub for coordinating workflows and integrations across various platforms and services.

## 🔗 Connected Repositories

This repository integrates with:

- **[AI-Time-Machines](https://github.com/lippytm/AI-Time-Machines)** - AI agents and automation engine
- **[Web3AI](https://github.com/lippytm/Web3AI)** - Blockchain and Web3 AI integration
- **[gatsby-starter-blog](https://github.com/lippytm/gatsby-starter-blog)** - Documentation platform
- **[Transparency-Logic-Time-Machine-Bots-](https://github.com/lippytm/Transparency-Logic-Time-Machine-Bots-)** - Theoretical framework

## 🛠️ Integrations

### AI & Development
- ✅ **GitHub Copilot** - AI-assisted development
- ✅ **OpenAI** - GPT models and embeddings integration
- ✅ **Huggingface** - AI model training and deployment
- ✅ **LangChain** - AI application framework
- ✅ **LlamaIndex** - Data framework for LLM applications
- ✅ **Vector Stores** - Pinecone, Weaviate, Chroma (optional)
- ✅ **GitHub Actions** - Automated workflows and CI/CD
- ✅ **Full Stack Application** - React frontend + Node.js backend

### Web3 & Blockchain
- ✅ **EVM Chains** - Ethereum, Polygon, BSC support via ethers.js
- ✅ **Solana** - Solana blockchain integration
- ✅ **Anchor** - Solana framework support (optional)

### Messaging & Communication
- ✅ **Slack** - Slack API integration
- ✅ **Discord** - Discord bot integration
- ✅ **ManyChat** - Chatbot platform for Facebook Messenger, Instagram, WhatsApp, SMS, and Email
- ✅ **BotBuilders** - Conversational AI bot building and deployment platform
- ✅ **OpenClaw** - Open-source conversational AI and chatbot automation
- ✅ **Moltbook** - Social networking and messaging integration platform

### Data & Storage
- ✅ **PostgreSQL** - Relational database
- ✅ **MongoDB** - NoSQL database
- ✅ **Redis** - In-memory data store
- ✅ **AWS S3** - Object storage
- ✅ **IPFS** - Decentralized storage

### Automation & Services
- ✅ **n8n** - Workflow automation platform
- ✅ **Cloudflare** - Edge computing and CDN
- ✅ **Cross-Repository Sync** - Automated repository coordination
- ✅ **Container Deployment** - GitHub Container Registry (ghcr.io)

## 📋 Features

- **Full Stack AI Platform**: Complete React + Node.js application with OpenAI integration
- **OpenAI GPT Integration**: Text generation, summarization, and embeddings
- **Database Support**: PostgreSQL for structured data, MongoDB for unstructured data
- **Modern UI**: Material-UI components with responsive design
- **Automated CI/CD**: Continuous integration with security scanning and code quality checks
- **Cross-Repository Integration**: Seamlessly sync and coordinate across multiple repositories
- **AI Integration**: Connect with Huggingface and OpenAI for model training and deployment
- **Workflow Automation**: n8n integration for complex automation scenarios
- **Security First**: CodeQL analysis, Trivy scanning, and dependency reviews
- **Extensible Architecture**: Easy to add new integrations and workflows

## 🔌 SDK Adapters & Providers

This repository includes a comprehensive SDK with adapters for AI, Web3, messaging, and data services. All adapters follow a consistent factory pattern and reference the `@lippytm/ai-sdk` package for shared interfaces.

### AI Providers

#### Core AI Services
- **OpenAI** - GPT models, embeddings, and completions
  - Env vars: `OPENAI_API_KEY`, `OPENAI_ORG_ID`
- **Hugging Face** - Inference API and transformers
  - Env vars: `HUGGINGFACE_API_KEY`, `HUGGINGFACE_INFERENCE_ENDPOINT`
- **LangChain** - AI application framework
  - Env var: `LANGCHAIN_ENABLED=true`
- **LlamaIndex** - Data framework for LLM applications
  - Env var: `LLAMAINDEX_ENABLED=true`

#### Vector Stores (Optional - Heavy Dependencies)
- **Pinecone** - Managed vector database
  - Env vars: `PINECONE_API_KEY`, `PINECONE_ENVIRONMENT`
  - Install: `npm install @pinecone-database/pinecone` (optional)
- **Weaviate** - Open-source vector database
  - Env vars: `WEAVIATE_URL`, `WEAVIATE_API_KEY`
  - Install: `npm install weaviate-ts-client` (optional)
- **Chroma** - Embedding database
  - Env var: `CHROMA_URL`
  - Install: `npm install chromadb` (optional)

### Web3 Providers

- **EVM Chains** - Ethereum, Polygon, BSC, and other EVM-compatible chains
  - Env vars: `EVM_RPC_URL`, `EVM_CHAIN_ID`, `EVM_PRIVATE_KEY`
  - Uses: ethers.js
- **Solana** - Solana blockchain
  - Env vars: `SOLANA_RPC_URL`, `SOLANA_NETWORK`, `SOLANA_PRIVATE_KEY`
  - Uses: @solana/web3.js
- **Anchor** - Solana framework (optional)
  - Env vars: `ANCHOR_ENABLED=true`, `ANCHOR_PROGRAM_ID`
  - Install: `npm install @coral-xyz/anchor` (optional)

### Messaging Providers

- **Slack** - Slack API integration
  - Env vars: `SLACK_BOT_TOKEN`, `SLACK_SIGNING_SECRET`
- **Discord** - Discord bot integration
  - Env vars: `DISCORD_BOT_TOKEN`, `DISCORD_CLIENT_ID`
- **ManyChat** - Chatbot platform for Facebook Messenger, Instagram, WhatsApp
  - Env vars: `MANYCHAT_API_KEY`, `MANYCHAT_BASE_URL` (optional)
- **BotBuilders** - Conversational AI bot building platform
  - Env vars: `BOTBUILDERS_API_KEY`, `BOTBUILDERS_API_SECRET`, `BOTBUILDERS_BASE_URL`, `BOTBUILDERS_WORKSPACE_ID`
- **OpenClaw** - Open-source conversational AI automation
  - Env vars: `OPENCLAW_API_KEY`, `OPENCLAW_API_SECRET`, `OPENCLAW_BASE_URL`, `OPENCLAW_PROJECT_ID`
- **Moltbook** - Social networking and messaging platform
  - Env vars: `MOLTBOOK_API_KEY`, `MOLTBOOK_API_SECRET`, `MOLTBOOK_BASE_URL`, `MOLTBOOK_APP_ID`

### Data Providers

- **PostgreSQL** - Relational database
  - Env vars: `POSTGRES_HOST`, `POSTGRES_PORT`, `POSTGRES_DB`, `POSTGRES_USER`, `POSTGRES_PASSWORD`
- **Redis** - In-memory data store
  - Env vars: `REDIS_URL`, `REDIS_PASSWORD`
- **AWS S3** - Object storage
  - Env vars: `AWS_REGION`, `S3_BUCKET`, `AWS_ACCESS_KEY_ID`, `AWS_SECRET_ACCESS_KEY`
- **IPFS** - Decentralized storage
  - Env vars: `IPFS_URL`, `IPFS_PROJECT_ID`, `IPFS_PROJECT_SECRET`

### Multi-Language Support

The SDK adapters are primarily implemented in **Node.js/TypeScript**, with reference documentation for equivalent packages in other languages:

- **Python** - See `pyproject.toml` for Python package equivalents
- **Go** - See `go.mod` for Go module equivalents
- **Rust** - See `Cargo.toml` for Rust crate equivalents

### Usage Example

```typescript
import { loadSDKConfig, SDKFactory } from './sdk';

// Load configuration from environment
const config = loadSDKConfig();

// Create factory
const factory = new SDKFactory(config);

// Create AI adapter
const openai = factory.createAIAdapter('openai');

// Create Web3 adapter
const evm = factory.createWeb3Adapter('evm');

// Create messaging adapter
const slack = factory.createMessagingAdapter('slack');
const discord = factory.createMessagingAdapter('discord');
const manychat = factory.createMessagingAdapter('manychat');
const botbuilders = factory.createMessagingAdapter('botbuilders');
const openclaw = factory.createMessagingAdapter('openclaw');
const moltbook = factory.createMessagingAdapter('moltbook');

// Create data adapter
const redis = factory.createDataAdapter('redis');
```

### Testing SDK Configuration

Run the configuration smoke test to verify your setup:

```bash
cd backend
npm run test:config
```

This will display the status of all configured adapters and providers.

## 🚦 Getting Started

### Prerequisites

- GitHub account
- Node.js (v18 or higher)
- npm or yarn
- (Optional) PostgreSQL and MongoDB for database features
- (Optional) Redis for caching
- (Optional) API keys for external integrations:
  - **OpenAI API key** (recommended for AI features)
  - Hugging Face API key (for HF models)
  - Pinecone, Weaviate, or Chroma (for vector stores - heavy installs)
  - EVM RPC URL (for Ethereum/EVM chains)
  - Solana RPC URL (for Solana blockchain)
  - Slack Bot Token (for Slack integration)
  - Discord Bot Token (for Discord integration)
  - ManyChat API key (for ManyChat integration)
  - BotBuilders API key (for BotBuilders integration)
  - OpenClaw API key (for OpenClaw integration)
  - Moltbook API key (for Moltbook integration)
  - AWS credentials (for S3 storage)
  - IPFS credentials (for decentralized storage)
  - n8n webhook URL
  - Cloudflare API token

**Note**: Most dependencies are optional. The application will work with minimal configuration (just OpenAI API key for basic AI features).

### Quick Start - Full Stack Application

For detailed setup instructions, see [FULLSTACK_SETUP.md](FULLSTACK_SETUP.md)

```bash
# 1. Clone the repository
git clone https://github.com/lippytm/Time-Machines-Builders-.git
cd Time-Machines-Builders-

# 2. Set up backend
cd backend
npm install
cp .env.example .env
# Edit .env and add your OPENAI_API_KEY
npm run dev

# 3. Set up frontend (in a new terminal)
cd frontend
npm install
npm start
```

Visit `http://localhost:3000` to access the application.

### Quick Start - Docker

```bash
# Set OpenAI API key
export OPENAI_API_KEY=your_api_key_here

# Start all services
docker-compose up -d

# View logs
docker-compose logs -f
```

### Quick Start - GitHub Workflows

1. **Fork or Clone** this repository
2. **Configure Secrets** (for integrations):
   - Go to Settings → Secrets and variables → Actions
   - Add required secrets (see [INTEGRATION.md](INTEGRATION.md))
3. **Enable Workflows**:
   - Navigate to Actions tab
   - Enable workflows
4. **Trigger Integration**:
   ```bash
   gh workflow run ci.yml
   ```

## 📚 Documentation

- **[INTEGRATION.md](INTEGRATION.md)** - Comprehensive integration guide
- **[CONTRIBUTING.md](CONTRIBUTING.md)** - Contribution guidelines
- **[Issue Templates](.github/ISSUE_TEMPLATE/)** - Report bugs, request features, or integration issues
- **[PR Template](.github/PULL_REQUEST_TEMPLATE/)** - Pull request guidelines

## 🔄 Workflow Architecture

### CI/CD Pipeline
Runs on every push and pull request:
- Code quality and security scanning
- CodeQL analysis
- Dependency review
- Integration health checks

### Cross-Repository Integration
Enables synchronization across repositories:
- Trigger workflows in connected repositories
- Notify external services (n8n, etc.)
- Coordinate updates across the ecosystem

### Dependency Management
Weekly automated checks:
- Dependency updates
- Security audits
- Cross-repository synchronization

## 💡 Usage Examples

### Trigger Cross-Repo Sync
```bash
gh workflow run cross-repo-integration.yml \
  -f target_repo=AI-Time-Machines \
  -f action=sync
```

### Run CI Pipeline
```bash
gh workflow run ci.yml
```

### Manual Integration Test
```bash
# Test all integrations
gh workflow run ci.yml --ref main
```

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details on:
- Code of conduct
- Development workflow
- Integration development
- Submitting pull requests

## 📊 Project Status

![CI Status](https://github.com/lippytm/Time-Machines-Builders-/actions/workflows/ci.yml/badge.svg)

- ✅ GitHub Actions workflows configured
- ✅ Cross-repository integration enabled
- ✅ Security scanning active
- 🔄 Continuous integration active
- 🔄 AI integration ready

## 🔒 Security

This project uses multiple security measures:
- CodeQL analysis for vulnerabilities
- Trivy container scanning
- Dependency review on pull requests
- Secret scanning enabled
- Regular security audits

Report security issues via GitHub Security Advisories.

## 📝 License

This project is open source and available under standard licensing terms.

## 🙏 Acknowledgments

- GitHub Copilot for AI-assisted development
- Huggingface for AI/ML infrastructure
- n8n for workflow automation capabilities
- Cloudflare for edge computing support
- The open-source community

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/lippytm/Time-Machines-Builders-/issues)
- **Discussions**: [GitHub Discussions](https://github.com/lippytm/Time-Machines-Builders-/discussions)
- **Integration Guide**: [INTEGRATION.md](INTEGRATION.md)

---

**Learn. Build. Automate. Earn.** 🚀
