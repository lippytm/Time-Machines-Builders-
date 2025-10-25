# Quick Start Guide

Get up and running with Time-Machines-Builders integrations in minutes!

## Step 1: Setup Repository

### Fork or Clone
```bash
# Clone the repository
git clone https://github.com/lippytm/Time-Machines-Builders-.git
cd Time-Machines-Builders-

# Or fork via GitHub UI and clone your fork
git clone https://github.com/YOUR_USERNAME/Time-Machines-Builders-.git
cd Time-Machines-Builders-
```

### Verify Workflows
```bash
# List available workflows
ls .github/workflows/

# Expected files:
# - ci.yml
# - cross-repo-integration.yml
# - dependency-updates.yml
```

## Step 2: Enable GitHub Actions

1. Navigate to the **Actions** tab in your repository
2. Click **"I understand my workflows, go ahead and enable them"**
3. Verify workflows are enabled

## Step 3: Configure Integrations (Optional)

### Basic Setup (No External Services)
You can use the basic features without any configuration:
- ✅ CI/CD pipeline
- ✅ Security scanning
- ✅ Dependency review

### Advanced Setup (With External Services)

#### A. Huggingface Integration
```bash
# 1. Get API key from https://huggingface.co/settings/tokens
# 2. Add to GitHub Secrets:
#    Settings → Secrets and variables → Actions → New repository secret
#    Name: HUGGINGFACE_API_KEY
#    Value: hf_xxxxxxxxxxxxx
```

#### B. n8n Automation
```bash
# 1. Set up n8n instance (https://n8n.io/)
# 2. Create a webhook workflow
# 3. Add webhook URL to GitHub Secrets:
#    Name: N8N_WEBHOOK_URL
#    Value: https://your-n8n.com/webhook/xxxxx
```

#### C. Cloudflare Integration
```bash
# 1. Get API token from Cloudflare dashboard
# 2. Add to GitHub Secrets:
#    Name: CLOUDFLARE_API_TOKEN
#    Value: your-cloudflare-token
```

## Step 4: Test Your Setup

### Test CI Pipeline
```bash
# Push a change to trigger CI
echo "# Test" >> README.md
git add README.md
git commit -m "test: verify CI pipeline"
git push

# Or manually trigger
gh workflow run ci.yml
```

### Monitor Workflow
```bash
# View recent workflow runs
gh run list

# View details of latest run
gh run view

# Watch logs in real-time
gh run watch
```

## Step 5: Cross-Repository Integration

### Connect with AI-Time-Machines
```bash
# Trigger integration manually
gh workflow run cross-repo-integration.yml \
  -f target_repo=AI-Time-Machines \
  -f action=sync

# View integration logs
gh run list --workflow=cross-repo-integration.yml
```

## Common Tasks

### Update Dependencies
```bash
# Trigger dependency update workflow
gh workflow run dependency-updates.yml
```

### Check Integration Health
```bash
# Run full CI pipeline
gh workflow run ci.yml

# View integration status
gh run list --workflow=ci.yml --limit 1
```

### Debug Workflow Issues
```bash
# View failed workflow details
gh run list --status failure

# View specific run logs
gh run view <run-id> --log

# Re-run failed workflow
gh run rerun <run-id>
```

## Directory Structure

```
Time-Machines-Builders-/
├── .github/
│   ├── workflows/              # GitHub Actions workflows
│   │   ├── ci.yml             # Main CI/CD pipeline
│   │   ├── cross-repo-integration.yml
│   │   └── dependency-updates.yml
│   ├── ISSUE_TEMPLATE/        # Issue templates
│   │   ├── bug_report.yml
│   │   ├── feature_request.yml
│   │   └── integration_issue.yml
│   └── PULL_REQUEST_TEMPLATE/ # PR template
├── .env.example               # Configuration template
├── .gitignore                # Git ignore rules
├── README.md                 # Main documentation
├── INTEGRATION.md            # Integration guide
├── CONTRIBUTING.md           # Contribution guidelines
└── QUICKSTART.md            # This file
```

## Next Steps

1. **Explore Integrations**: Read [INTEGRATION.md](INTEGRATION.md) for detailed integration documentation
2. **Contribute**: Check [CONTRIBUTING.md](CONTRIBUTING.md) for contribution guidelines
3. **Connect Repos**: Set up integrations with related repositories
4. **Automate**: Configure n8n workflows for advanced automation
5. **Learn**: Explore connected repositories for more features

## Useful Commands

### GitHub CLI
```bash
# List all workflows
gh workflow list

# View workflow file
gh workflow view ci.yml

# Enable/disable workflow
gh workflow enable ci.yml
gh workflow disable ci.yml

# View repository secrets (names only)
gh secret list
```

### Git Operations
```bash
# Update from upstream
git fetch upstream
git merge upstream/main

# Create feature branch
git checkout -b feature/my-feature

# Push changes
git add .
git commit -m "feat: add new feature"
git push origin feature/my-feature
```

## Troubleshooting

### Workflows Not Running
- Check if Actions are enabled in repository settings
- Verify workflow trigger conditions (branches, events)
- Check repository permissions

### Integration Failing
- Verify secret configuration
- Check API key validity
- Review workflow logs for errors
- Test endpoints manually

### Permission Issues
- Ensure GitHub token has required scopes
- Check repository settings → Actions → General
- Verify workflow permissions in YAML

## Support

- **Documentation**: [INTEGRATION.md](INTEGRATION.md)
- **Issues**: [Create an issue](https://github.com/lippytm/Time-Machines-Builders-/issues/new/choose)
- **Discussions**: [GitHub Discussions](https://github.com/lippytm/Time-Machines-Builders-/discussions)

## Resources

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Huggingface API](https://huggingface.co/docs/api-inference/index)
- [n8n Documentation](https://docs.n8n.io/)
- [Cloudflare API](https://developers.cloudflare.com/api/)

---

Ready to build? Let's go! 🚀
