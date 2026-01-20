# Contributing to Time-Machines-Builders

Thank you for your interest in contributing to the Time-Machines-Builders ecosystem! This document provides guidelines for contributing to this project and its integrations.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Integration Development](#integration-development)
- [Submitting Changes](#submitting-changes)
- [Testing](#testing)

## Code of Conduct

By participating in this project, you agree to maintain a respectful and inclusive environment for all contributors.

## Getting Started

### Prerequisites

- Git
- GitHub account
- Familiarity with GitHub Actions (for workflow development)
- Understanding of the connected repositories:
  - AI-Time-Machines
  - Web3AI
  - gatsby-starter-blog
  - Transparency-Logic-Time-Machine-Bots-

### Setting Up Your Development Environment

1. Fork the repository
2. Clone your fork:
   ```bash
   git clone https://github.com/YOUR_USERNAME/Time-Machines-Builders-.git
   cd Time-Machines-Builders-
   ```

3. Add the upstream remote:
   ```bash
   git remote add upstream https://github.com/lippytm/Time-Machines-Builders-.git
   ```

4. Create a new branch for your changes:
   ```bash
   git checkout -b feature/your-feature-name
   ```

## Development Workflow

### Branching Strategy

- `main` - Production-ready code
- `develop` - Development branch
- `feature/*` - New features
- `bugfix/*` - Bug fixes
- `integration/*` - Integration updates

### Commit Messages

Follow conventional commit format:

```
type(scope): subject

body

footer
```

Types:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `workflow`: Workflow/CI changes
- `integration`: Integration updates
- `refactor`: Code refactoring
- `test`: Test updates

Example:
```
feat(integration): add Huggingface API connection

- Implement Huggingface model integration
- Add authentication flow
- Update documentation

Closes #123
```

## Integration Development

### Adding a New Integration

1. Create workflow file in `.github/workflows/`
2. Update `INTEGRATION.md` with integration details
3. Add necessary secrets documentation
4. Create issue template if needed
5. Test integration thoroughly

### Workflow Guidelines

- Use descriptive job names
- Include error handling
- Add appropriate permissions
- Document secret requirements
- Test with `workflow_dispatch` first

Example workflow structure:
```yaml
name: Your Integration

on:
  workflow_dispatch:
  # Add other triggers as needed

jobs:
  integration-job:
    name: Integration Job Name
    runs-on: ubuntu-latest
    
    steps:
      - name: Checkout
        uses: actions/checkout@v4
      
      - name: Your integration step
        run: |
          echo "Integration logic here"
```

### Cross-Repository Integration

When adding cross-repository features:

1. Coordinate with maintainers of target repositories
2. Use `repository_dispatch` for triggering
3. Document the integration flow
4. Add integration tests
5. Update related repositories as needed

## Submitting Changes

### Pull Request Process

1. Update your branch with the latest upstream changes:
   ```bash
   git fetch upstream
   git rebase upstream/main
   ```

2. Push your changes:
   ```bash
   git push origin feature/your-feature-name
   ```

3. Create a Pull Request:
   - Use the PR template
   - Fill out all relevant sections
   - Link related issues
   - Mark integration impacts

4. Address review comments:
   - Make requested changes
   - Push updates to your branch
   - Request re-review

### PR Checklist

Before submitting a PR, ensure:

- [ ] Code follows project style and conventions
- [ ] Documentation is updated (README, inline comments, etc.)
- [ ] All workflows pass successfully (lint-test, CodeQL, dependency-review)
- [ ] Integration tests completed (if applicable)
- [ ] No secrets or sensitive data exposed in code
- [ ] PR template filled out completely
- [ ] Related issues linked (use "Closes #123" or "Fixes #456")
- [ ] Code has been tested locally
- [ ] TypeScript compilation succeeds without errors
- [ ] No new linter warnings introduced
- [ ] Tests pass (frontend and backend)
- [ ] Branch is up-to-date with target branch (main or develop)
- [ ] Commit messages follow conventional commit format
- [ ] Changes are minimal and focused on the issue being addressed

## Testing

### Local Testing

Before submitting changes, test your code locally:

#### Frontend Testing
```bash
cd frontend
npm install
npm test          # Run tests
npm run build     # Ensure build succeeds
npx tsc --noEmit  # Type check
```

#### Backend Testing
```bash
cd backend
npm install
npm test          # Run tests (when available)
npm run build     # Ensure build succeeds
npx tsc --noEmit  # Type check
```

### Workflow Testing

Test workflows before submitting:

```bash
# Using act (local workflow runner)
act -j job-name

# Or use workflow_dispatch in your fork
gh workflow run workflow-name.yml
```

### Integration Testing

For cross-repository integrations:

1. Test in your fork first
2. Verify webhook endpoints in staging
3. Test with minimal payloads
4. Monitor workflow runs
5. Check logs for errors

### Testing Requirements

- **Unit Tests**: Write tests for new functions and components
- **Integration Tests**: Test interactions between components
- **End-to-End Tests**: Test complete user workflows (when applicable)
- **Security Tests**: Verify no secrets are exposed, inputs are validated
- **Performance Tests**: Ensure changes don't degrade performance (for large changes)

### Test Coverage

- Aim for at least 80% code coverage for new code
- Critical paths should have 100% coverage
- Tests should be meaningful, not just for coverage numbers

### Continuous Integration

All PRs must pass the following CI checks:

1. **Lint and Test** (`lint-test.yml`):
   - Linting (when lint script exists)
   - Type checking (TypeScript)
   - Unit tests
   - Build verification

2. **CodeQL Analysis** (`codeql.yml`):
   - Security vulnerability scanning
   - Code quality analysis

3. **Dependency Review** (`dependency-review.yml`):
   - Dependency vulnerability scanning
   - License compatibility checking

### Security Testing

- Never commit secrets or tokens
- Use repository secrets for sensitive data
- Test with minimal permissions first
- Verify secret handling in workflows
- Run CodeQL analysis before submitting
- Check for common vulnerabilities (XSS, SQL injection, etc.)

### Manual Testing Checklist

For UI changes:
- [ ] Test in Chrome, Firefox, and Safari
- [ ] Test responsive design (mobile, tablet, desktop)
- [ ] Test accessibility (keyboard navigation, screen readers)
- [ ] Verify no console errors

For API changes:
- [ ] Test all endpoints with various inputs
- [ ] Test error handling
- [ ] Verify rate limiting works
- [ ] Check authentication/authorization
- [ ] Test with invalid/malicious inputs

## Documentation

### Required Documentation Updates

When contributing, update:

- `README.md` - If adding major features
- `INTEGRATION.md` - For integration changes
- `CONTRIBUTING.md` - For process changes
- Inline comments - For complex logic
- Issue templates - For new issue types

### Documentation Style

- Use clear, concise language
- Include code examples
- Add diagrams for complex flows
- Keep formatting consistent
- Update table of contents

## Review Process

1. **Automated Checks**: Workflows must pass
2. **Security Review**: CodeQL and Trivy scans clear
3. **Code Review**: Maintainer review required
4. **Integration Test**: Cross-repo impacts verified
5. **Documentation**: All docs updated

## Getting Help

- **Questions**: Open a discussion
- **Bugs**: Use bug report template
- **Features**: Use feature request template
- **Integrations**: Use integration issue template

## Recognition

Contributors will be recognized in:
- GitHub contributors list
- Release notes
- Project documentation

## License

By contributing, you agree that your contributions will be licensed under the same license as the project.

Thank you for contributing to Time-Machines-Builders! 🚀
