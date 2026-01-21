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
- ✅ **GitHub Actions** - Automated workflows and CI/CD
- ✅ **Full Stack Application** - React frontend + Node.js backend

### Automation & Services
- ✅ **n8n** - Workflow automation platform
- ✅ **Cloudflare** - Edge computing and CDN
- ✅ **Cross-Repository Sync** - Automated repository coordination

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

## 🚦 Getting Started

### Prerequisites

- GitHub account
- Node.js (v18 or higher)
- npm or yarn
- (Optional) PostgreSQL and MongoDB for database features
- (Optional) API keys for external integrations:
  - **OpenAI API key** (required for AI features)
  - Huggingface API key
  - n8n webhook URL
  - Cloudflare API token

### Optional Heavy Dependencies

This project supports optional heavy ML/AI dependencies via npm's `optionalDependencies`. These are not installed by default to keep the base installation lightweight:

- **@huggingface/transformers** - Hugging Face transformers for local ML models
- **@pinecone-database/pinecone** - Pinecone vector database client
- **chromadb** - Chroma vector database
- **weaviate-ts-client** - Weaviate vector database client
- **@opentelemetry/*** - OpenTelemetry instrumentation (see Telemetry section)

To install with optional dependencies:
```bash
cd backend
npm install --include=optional
```

To install without optional dependencies (default):
```bash
cd backend
npm install
```

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

### Configuration Validation

The backend uses typed configuration validation with Zod to ensure all environment variables are correctly set before the application starts:

```bash
# Validate configuration without starting the server
cd backend
npm run build
npm run test:smoke
```

Configuration schema validates:
- Port numbers are valid (1-65535)
- Required API keys are present
- Database connection strings are properly formatted
- Environment is one of: development, production, test

If validation fails, detailed error messages will indicate which configuration values are missing or invalid.

### Telemetry (Optional)

The application supports optional OpenTelemetry instrumentation for distributed tracing and monitoring. Telemetry is **disabled by default** and requires optional dependencies.

To enable telemetry:

1. Install optional dependencies:
```bash
cd backend
npm install --include=optional
```

2. Set environment variables in `.env`:
```env
TELEMETRY_ENABLED=true
TELEMETRY_SERVICE_NAME=time-machines-backend
OTEL_EXPORTER_OTLP_ENDPOINT=http://your-otlp-collector:4318/v1/traces
```

Supported telemetry backends:
- Jaeger
- Zipkin
- Any OTLP-compatible collector
- Cloud providers (AWS X-Ray, Google Cloud Trace, Azure Monitor)

**Note**: No vendor lock-in - uses OpenTelemetry standard protocol.

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
- **Lint and Format Check** - ESLint and Prettier validation
- **Code quality and security scanning** - CodeQL analysis
- **Dependency review** - Automated dependency vulnerability checks
- **Integration health checks** - Validates external service connections

### Security Scanning and SBOM
Automated security scanning with SBOM generation:
- **Trivy scanning** - Vulnerability detection in dependencies and code
- **SBOM generation** - Software Bill of Materials in SPDX and CycloneDX formats
- **npm audit** - Regular dependency vulnerability scans
- Runs weekly and on pull requests to main branch

### Cross-Repository Integration
Enables synchronization across repositories:
- Trigger workflows in connected repositories
- Notify external services (n8n, etc.)
- Coordinate updates across the ecosystem

### Dependency Management
Automated dependency updates via Renovate:
- **Renovate bot** - Automated dependency updates ([renovate.json](renovate.json))
- Weekly update schedule (Mondays before 3 AM EST)
- Grouped updates for heavy ML/AI dependencies
- Security vulnerability alerts with high priority
- Auto-merge for patch updates on dev dependencies
- See [Renovate Dashboard](https://app.renovatebot.com/dashboard) for update status

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

### Development Setup

1. **Install dependencies**:
```bash
cd backend
npm install
```

2. **Set up pre-commit hooks** (optional but recommended):
```bash
cd backend
npm run prepare  # Installs Husky hooks
```

Pre-commit hooks will automatically:
- Run ESLint to check for code issues
- Run Prettier to format code
- Run on staged files only (via lint-staged)

3. **Run linting and formatting**:
```bash
cd backend
npm run lint        # Check for issues
npm run lint:fix    # Fix issues automatically
npm run format      # Format code with Prettier
```

4. **Run tests**:
```bash
cd backend
npm test            # Run all tests
npm run test:smoke  # Run smoke tests (config validation)
```

## 📊 Project Status

![CI Status](https://github.com/lippytm/Time-Machines-Builders-/actions/workflows/ci.yml/badge.svg)

- ✅ GitHub Actions workflows configured
- ✅ Cross-repository integration enabled
- ✅ Security scanning active
- 🔄 Continuous integration active
- 🔄 AI integration ready

## 🔒 Security

This project uses multiple security measures:
- **CodeQL analysis** - Automated code vulnerability detection
- **Trivy container scanning** - Filesystem and dependency scanning
- **SBOM generation** - Software Bill of Materials for transparency
  - SPDX format for compliance
  - CycloneDX format for tooling integration
  - Available as CI artifacts (90-day retention)
- **Dependency review** - Automated checks on pull requests
- **Secret scanning** - Prevents credential leaks
- **Renovate** - Automated dependency updates with security alerts
- **npm audit** - Regular dependency vulnerability scans
- **Pre-commit hooks** - Lint and format checks before commit

### Security Scanning

View security scan results:
- **GitHub Security tab** - CodeQL and Trivy SARIF results
- **Actions artifacts** - SBOM files and detailed scan reports
- **Renovate Dashboard** - Dependency update status

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
