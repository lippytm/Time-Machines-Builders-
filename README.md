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
