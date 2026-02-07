# Cybersecurity Diagnostics Toolkit (Full Stack)

This toolkit provides **legal, defensive** diagnostics for full-stack AI systems (frontend + backend) and supports integration into bot ecosystems (MoltBot / ClawBot).

## Goals
- Detect common security risks early (deps, secrets, config, containers)
- Produce **evidence artifacts** (reports) for audit and learning
- Run locally and in CI (GitHub Actions)
- Stay vendor-neutral and cross-platform

## What it checks (baseline)
### Supply chain
- Dependency review (GitHub)
- Vulnerability scan (Trivy FS)
- Optional: SBOM generation (Syft)

### Secrets hygiene
- Never commit secrets
- Optional local scan: gitleaks (developer machine) / GitHub secret scanning

### App configuration
- Environment variables sanity (required keys present, no debug in prod)
- CORS/headers checklist (backend)
- TLS/HTTPS checklist (deployment)

### Runtime diagnostics (safe)
- Health endpoints respond
- Auth/session config review checklist

## Outputs
- `reports/security-summary.md`
- `reports/diagnostics.json`

## MoltBot / ClawBot integration pattern
- Bots can **trigger** diagnostics runs (workflow_dispatch)
- Bots can **summarize** results for humans (read-only)
- Bots should never auto-merge security changes without human review

## Legal + ethics boundary
These tools are defensive diagnostics for systems you own/control.
