# Workflow Architecture

This document describes the workflow architecture and integration patterns for Time-Machines-Builders.

## Workflow Overview

### 1. Continuous Integration (CI)

**File**: `.github/workflows/ci.yml`

**Triggers**:
- Push to `main` or `develop` branches
- Pull requests to `main` or `develop` branches  
- Manual workflow dispatch

**Jobs**:
1. **Code Quality & Security**
   - Trivy vulnerability scanning
   - SARIF upload to GitHub Security

2. **CodeQL Analysis**
   - Multi-language analysis (JavaScript, Python)
   - Security vulnerability detection

3. **Dependency Review**
   - Dependency vulnerability checking (PR only)

4. **Integration Health Check**
   - Validates connections to related repositories
   - Checks integration endpoint configuration

**Flow Diagram**:
```
Push/PR Event
    ↓
┌───────────────────────────┐
│  Code Quality & Security  │
│  - Trivy Scan            │
│  - Upload SARIF          │
└───────────────────────────┘
    ↓
┌───────────────────────────┐
│    CodeQL Analysis       │
│  - JavaScript            │
│  - Python                │
└───────────────────────────┘
    ↓
┌───────────────────────────┐
│   Dependency Review      │ (PR only)
│  - Check vulnerabilities │
└───────────────────────────┘
    ↓
┌───────────────────────────┐
│  Integration Health      │
│  - Verify connections    │
│  - Check endpoints       │
└───────────────────────────┘
```

---

### 2. Cross-Repository Integration

**File**: `.github/workflows/cross-repo-integration.yml`

**Triggers**:
- Repository dispatch events (`trigger-integration`)
- Manual workflow dispatch with parameters

**Jobs**:
1. **Cross-Repo Sync**
   - Dispatches events to target repositories
   - Sends notifications to n8n webhooks

2. **AI Integration Update**
   - Triggers updates in AI-Time-Machines repository
   - Logs integration status

**Flow Diagram**:
```
Manual Trigger / Dispatch Event
    ↓
┌─────────────────────────────────┐
│    Cross-Repo Sync              │
│  - Select target repo           │
│  - Choose action (sync/notify)  │
└─────────────────────────────────┘
    ↓
┌─────────────────────────────────┐
│  Repository Dispatch            │
│  - AI-Time-Machines             │
│  - Web3AI                       │
│  - gatsby-starter-blog          │
│  - Transparency-Logic-...       │
└─────────────────────────────────┘
    ↓
┌─────────────────────────────────┐
│  External Notifications         │
│  - n8n Webhook                  │
│  - Custom integrations          │
└─────────────────────────────────┘
    ↓
┌─────────────────────────────────┐
│  AI Integration Update          │
│  - Trigger AI-Time-Machines     │
│  - Log status                   │
└─────────────────────────────────┘
```

---

### 3. Dependency Management

**File**: `.github/workflows/dependency-updates.yml`

**Triggers**:
- Weekly schedule (Mondays at 9am UTC)
- Manual workflow dispatch

**Jobs**:
1. **Update Dependencies**
   - Checks for dependency updates
   - Prepares for future package manager integration

2. **Security Audit**
   - Runs security audits
   - Reports vulnerabilities

3. **Sync with AI-Time-Machines**
   - Checks for updates in related repositories
   - Coordinates dependency versions

**Flow Diagram**:
```
Weekly Cron / Manual Trigger
    ↓
┌─────────────────────────────────┐
│    Update Dependencies          │
│  - Check for updates            │
│  - Prepare update PRs           │
└─────────────────────────────────┘
    ↓
┌─────────────────────────────────┐
│    Security Audit               │
│  - Scan dependencies            │
│  - Report vulnerabilities       │
└─────────────────────────────────┘
    ↓
┌─────────────────────────────────┐
│  Sync with AI-Time-Machines     │
│  - Check related repo updates   │
│  - Coordinate versions          │
└─────────────────────────────────┘
```

---

## Integration Patterns

### Pattern 1: Push-Triggered Integration
```
Developer Push
    ↓
┌─────────────────┐
│   CI Workflow   │
│  (Automated)    │
└─────────────────┘
    ↓
┌─────────────────┐
│ Cross-Repo Sync │
│  (Conditional)  │
└─────────────────┘
    ↓
┌─────────────────┐
│ Target Repo     │
│  Updated        │
└─────────────────┘
```

### Pattern 2: External Webhook Integration
```
External Service (n8n)
    ↓
┌─────────────────┐
│ Webhook Trigger │
└─────────────────┘
    ↓
┌─────────────────┐
│ Repository      │
│  Dispatch       │
└─────────────────┘
    ↓
┌─────────────────┐
│ Cross-Repo      │
│  Integration    │
└─────────────────┘
    ↓
┌─────────────────┐
│ Update All      │
│  Connected      │
│  Services       │
└─────────────────┘
```

### Pattern 3: Scheduled Maintenance
```
Cron Schedule (Weekly)
    ↓
┌─────────────────┐
│  Dependency     │
│  Updates        │
└─────────────────┘
    ↓
┌─────────────────┐
│  Security       │
│  Audit          │
└─────────────────┘
    ↓
┌─────────────────┐
│  Sync with      │
│  Related Repos  │
└─────────────────┘
    ↓
┌─────────────────┐
│  Create PR      │
│  if needed      │
└─────────────────┘
```

---

## Repository Network

```
                    Time-Machines-Builders-
                           (Central Hub)
                              │
        ┌─────────────────────┼─────────────────────┐
        │                     │                     │
        ↓                     ↓                     ↓
┌───────────────┐    ┌───────────────┐    ┌───────────────┐
│ AI-Time-      │    │   Web3AI      │    │gatsby-starter-│
│  Machines     │    │               │    │    blog       │
│               │    │               │    │               │
│ (AI Agents)   │    │ (Blockchain)  │    │ (Docs)        │
└───────────────┘    └───────────────┘    └───────────────┘
        │                     │                     │
        └─────────────────────┴─────────────────────┘
                              │
                              ↓
                  ┌───────────────────────┐
                  │ Transparency-Logic-   │
                  │ Time-Machine-Bots-    │
                  │                       │
                  │ (Theory Framework)    │
                  └───────────────────────┘
```

---

## External Service Integration

```
Time-Machines-Builders-
        │
        ├─→ GitHub (Actions, API)
        │   └─→ Security Scanning (CodeQL, Trivy)
        │
        ├─→ Huggingface
        │   └─→ AI Model Training & Deployment
        │
        ├─→ n8n
        │   └─→ Workflow Automation
        │       ├─→ Data Processing
        │       ├─→ API Integration
        │       └─→ Notifications
        │
        └─→ Cloudflare
            └─→ Edge Computing & CDN
                ├─→ Workers
                ├─→ Pages
                └─→ DNS
```

---

## Security Flow

```
Code Changes
    ↓
┌─────────────────┐
│  Trivy Scan     │
│  (File System)  │
└─────────────────┘
    ↓
┌─────────────────┐
│  CodeQL         │
│  (Static        │
│   Analysis)     │
└─────────────────┘
    ↓
┌─────────────────┐
│  Dependency     │
│  Review         │
└─────────────────┘
    ↓
┌─────────────────┐
│  SARIF Upload   │
│  to Security    │
│  Tab            │
└─────────────────┘
    ↓
Security Dashboard Updated
```

---

## Workflow Permissions

Each workflow has specific permissions configured for security:

### CI Workflow
- `actions: read`
- `contents: read`
- `security-events: write`

### Cross-Repo Integration
- `contents: read`
- `actions: write`
- `repository-projects: write`

### Dependency Updates
- `contents: read`
- `pull-requests: write` (for automated PRs)

---

## Environment Variables & Secrets

### Required Secrets
- `GITHUB_TOKEN` (automatically provided)
- `HUGGINGFACE_API_KEY` (optional, for AI integration)
- `N8N_WEBHOOK_URL` (optional, for automation)
- `CLOUDFLARE_API_TOKEN` (optional, for edge computing)

### Configuration Files
- `.env.example` - Template for environment variables
- `.github/workflows/*.yml` - Workflow definitions

---

## Monitoring & Observability

### Workflow Run Logs
All workflow runs are logged and available in the Actions tab:
- Real-time log streaming
- Job-level logs
- Step-level details
- Artifact downloads

### Integration Health
The CI workflow includes integration health checks:
- Repository connection validation
- Endpoint availability checks
- Service status verification

### Notifications
Failed workflows trigger notifications:
- GitHub notifications
- Email alerts (if configured)
- External webhook notifications (n8n)

---

## Future Enhancements

Planned workflow improvements:
- [ ] Automated dependency update PRs
- [ ] Advanced AI model deployment
- [ ] Multi-environment deployments
- [ ] Performance benchmarking
- [ ] Integration testing framework
- [ ] Custom GitHub Actions
- [ ] Advanced n8n workflow templates
- [ ] Cloudflare Workers deployment
- [ ] Container image building and scanning

---

For more information, see:
- [INTEGRATION.md](INTEGRATION.md) - Integration setup guide
- [CONTRIBUTING.md](CONTRIBUTING.md) - Contribution guidelines
- [QUICKSTART.md](QUICKSTART.md) - Quick start guide
