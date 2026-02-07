# Security Platform Strategy (lippytm.ai / Encyclopedia Ecosystem)

This strategy is **defensive, legal, and audit-friendly**. It is designed to help you build money-generating applications while keeping systems safe.

## Principles
- **Defense only**: diagnostics and protection for systems you own/control.
- **Evidence > vibes**: produce artifacts (reports) in CI.
- **Least privilege** everywhere (tokens, workflows, roles).
- **Human-in-the-loop** for security-sensitive changes.
- **Redundancy by design**: monitoring, drift detection, backups, restore drills.

## Threat model (baseline)
- Supply chain compromise (deps, containers)
- Secrets leakage (keys, tokens, configs)
- Misconfiguration (CORS, headers, debug flags)
- Access control errors (authz/authn)
- Data exposure (logs, PII)

## Controls (minimum viable serious)
### Supply chain
- Dependency review
- Vulnerability scanning (Trivy)
- SBOM generation (Syft) (optional/next)

### Secrets
- GitHub Secret Scanning
- Optional local: gitleaks
- No secrets in code, ever

### CI/CD hardening
- Required checks before merge
- Separate security workflow from build/test workflow
- Artifact retention for evidence

### Runtime/ops
- Health endpoints
- Rate limiting and input validation
- Structured logs without secrets

## Bot integration (MoltBot / ClawBot)
Bots can:
- Trigger diagnostics runs (workflow_dispatch)
- Summarize reports and open issues
- Draft PRs for safe upgrades (deps, config hardening)

Bots must NOT:
- Auto-merge security changes
- Run intrusive tests against third-party targets

## Legal boundary
Everything here is intended for **your own repos/systems** or systems where you have explicit authorization.
