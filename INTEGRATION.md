# Integration Guide

This repository is designed to integrate with multiple systems and repositories to create a comprehensive AI automation and blockchain development ecosystem.

## Repository Interconnections

### Connected Repositories

1. **AI-Time-Machines** - https://github.com/lippytm/AI-Time-Machines
   - Main AI agents and automation engine
   - JavaScript-based AI integration framework
   - Provides AI agent capabilities

2. **Web3AI** - https://github.com/lippytm/Web3AI
   - Blockchain and Web3 integration
   - AI-powered blockchain development tools

3. **gatsby-starter-blog** - https://github.com/lippytm/gatsby-starter-blog
   - Documentation and blog platform
   - Content management for projects

4. **Transparency-Logic-Time-Machine-Bots-** - https://github.com/lippytm/Transparency-Logic-Time-Machine-Bots-
   - Grand Unified Fields of Theories implementation
   - Core theoretical framework

### Cross-Repository Integration

The repository uses GitHub Actions workflows to trigger integrations across repositories:

```yaml
# Trigger integration with AI-Time-Machines
gh workflow run cross-repo-integration.yml -f target_repo=AI-Time-Machines -f action=sync
```

## External Service Integrations

### GitHub Copilot
This repository is configured to work seamlessly with GitHub Copilot for AI-assisted development.

### Huggingface
Integration with Huggingface for AI model training and deployment.

**Setup:**
```bash
# Add your Huggingface API token as a repository secret
# Name: HUGGINGFACE_API_KEY
# Value: hf_xxxxxxxxxxxxx
```

### n8n Automation
n8n workflows can be triggered via webhooks to automate cross-platform operations.

**Setup:**
```bash
# Add your n8n webhook URL as a repository secret
# Name: N8N_WEBHOOK_URL
# Value: https://your-n8n-instance.com/webhook/xxxxx
```

**Example Workflow:**
- Code push → Trigger n8n workflow
- n8n updates Huggingface models
- n8n notifies connected services

### Cloudflare
Integration with Cloudflare for edge computing and CDN capabilities.

**Setup:**
```bash
# Add your Cloudflare API token as a repository secret
# Name: CLOUDFLARE_API_TOKEN
# Value: your-api-token
```

### ManyChat
Integration with ManyChat for chatbot automation across Facebook Messenger, Instagram, WhatsApp, SMS, and Email.

**Setup:**
```bash
# Add your ManyChat API key as a repository secret or environment variable
# Name: MANYCHAT_API_KEY
# Value: your-api-key
```

**Features:**
- Send messages to subscribers
- Manage subscriber tags and custom fields
- Trigger flows and broadcasts
- Cross-platform messaging (Messenger, Instagram, WhatsApp, SMS, Email)

### BotBuilders
Integration with BotBuilders platform for creating and managing conversational AI bots.

**Setup:**
```bash
# Add your BotBuilders API credentials as repository secrets or environment variables
# Name: BOTBUILDERS_API_KEY
# Value: your-api-key
# Name: BOTBUILDERS_API_SECRET (optional)
# Value: your-api-secret
# Name: BOTBUILDERS_WORKSPACE_ID (optional)
# Value: your-workspace-id
```

**Features:**
- Create and manage bots
- Deploy to multiple channels
- Train conversational AI models
- Access conversation analytics

### OpenClaw
Integration with OpenClaw for open-source conversational AI and chatbot automation.

**Setup:**
```bash
# Add your OpenClaw API credentials as repository secrets or environment variables
# Name: OPENCLAW_API_KEY
# Value: your-api-key
# Name: OPENCLAW_API_SECRET (optional)
# Value: your-api-secret
# Name: OPENCLAW_PROJECT_ID (optional)
# Value: your-project-id
```

**Features:**
- Session-based conversations
- NLU (Natural Language Understanding) training
- Intent and entity management
- Open-source conversational AI

### Moltbook
Integration with Moltbook for social networking and messaging capabilities.

**Setup:**
```bash
# Add your Moltbook API credentials as repository secrets or environment variables
# Name: MOLTBOOK_API_KEY
# Value: your-api-key
# Name: MOLTBOOK_API_SECRET (optional)
# Value: your-api-secret
# Name: MOLTBOOK_APP_ID (optional)
# Value: your-app-id
```

**Features:**
- Send messages to users
- Create and manage group conversations
- Post content to feeds
- Manage user connections and profiles

## Workflow Architecture

### CI/CD Pipeline (.github/workflows/ci.yml)
- Code quality and security scanning
- CodeQL analysis for vulnerabilities
- Dependency review
- Integration health checks

### Cross-Repository Integration (.github/workflows/cross-repo-integration.yml)
- Synchronization with related repositories
- Repository dispatch triggers
- External service notifications
- AI integration updates

### Dependency Management (.github/workflows/dependency-updates.yml)
- Weekly dependency checks
- Security audits
- Cross-repository dependency sync

## Setting Up Integrations

### 1. GitHub Secrets Configuration

Navigate to your repository settings and add the following secrets:

```
HUGGINGFACE_API_KEY    # For AI model integration
N8N_WEBHOOK_URL        # For automation workflows
CLOUDFLARE_API_TOKEN   # For edge computing
MANYCHAT_API_KEY       # For ManyChat chatbot integration
BOTBUILDERS_API_KEY    # For BotBuilders platform
BOTBUILDERS_API_SECRET # Optional BotBuilders secret
OPENCLAW_API_KEY       # For OpenClaw conversational AI
OPENCLAW_API_SECRET    # Optional OpenClaw secret
MOLTBOOK_API_KEY       # For Moltbook messaging platform
MOLTBOOK_API_SECRET    # Optional Moltbook secret
```

### 2. Repository Dispatch Setup

To enable cross-repository triggers, ensure the GitHub token has appropriate permissions:

```yaml
permissions:
  contents: read
  actions: write
  repository-projects: write
```

### 3. Webhook Configuration

For external services to trigger GitHub workflows:

1. Go to Settings → Webhooks
2. Add webhook URL
3. Select events: push, pull_request, repository_dispatch
4. Set content type to `application/json`

## Usage Examples

### Trigger Cross-Repository Sync

```bash
# Using GitHub CLI
gh workflow run cross-repo-integration.yml \
  -f target_repo=AI-Time-Machines \
  -f action=sync
```

### Manual Integration Test

```bash
# Test integration health
gh workflow run ci.yml
```

### Repository Dispatch from External Service

```bash
# From n8n or other services
curl -X POST \
  https://api.github.com/repos/lippytm/Time-Machines-Builders-/dispatches \
  -H "Authorization: token YOUR_GITHUB_TOKEN" \
  -d '{
    "event_type": "trigger-integration",
    "client_payload": {
      "source": "external",
      "action": "update"
    }
  }'
```

## Integration Patterns

### Pattern 1: Push-Triggered Sync
```
Code Push → CI Workflow → Cross-Repo Dispatch → AI-Time-Machines Update
```

### Pattern 2: Scheduled Sync
```
Weekly Cron → Dependency Check → Security Audit → Update Notification
```

### Pattern 3: External Trigger
```
n8n Webhook → Repository Dispatch → Workflow Execution → Service Update
```

## Monitoring and Debugging

### Check Workflow Status
```bash
gh run list --workflow=ci.yml
gh run view <run-id>
```

### View Integration Logs
```bash
gh run view <run-id> --log
```

### Debug Failed Integrations
1. Check workflow run logs
2. Verify secret configuration
3. Test webhook endpoints
4. Review cross-repository permissions

## Best Practices

1. **Security First**: Always use secrets for API keys and tokens
2. **Idempotent Operations**: Ensure integration actions can be safely retried
3. **Error Handling**: Implement proper error handling in workflows
4. **Monitoring**: Regularly check workflow runs and integration health
5. **Documentation**: Keep integration documentation up to date

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines on contributing to integrations.

## Support

For integration issues:
1. Check existing issues: https://github.com/lippytm/Time-Machines-Builders-/issues
2. Review workflow logs
3. Create a new issue using the Integration Issue template

## License

See LICENSE file for details.
