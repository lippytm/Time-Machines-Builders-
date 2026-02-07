# AI GitLab Blueprint (Self-Hosted Forge + Diagnostics Hub)

This blueprint describes a **self-hosted, AI-assisted Git platform** ("AI GitLab") that complements GitHub.

## Goals
- Own your source-of-truth forge (repos, issues, CI runners)
- Mirror to/from GitHub for redundancy and collaboration
- Enforce **transparency + diagnostics gates** on every repo
- Enable bots (ClawBot/MoltBot) to draft PRs and run diagnostics **safely**

## Architecture
- **Forge**: GitLab CE (or Gitea/Forgejo for lighter ops)
- **Runner**: GitLab Runner (or Gitea act_runner)
- **Registry**: built-in GitLab registry or separate registry
- **Diagnostics Hub**: control-plane repo that:
  - inventories repos
  - checks drift
  - triggers diagnostics workflows
  - publishes weekly digests

## Multi-Forge (Merged) model
- GitHub = public + ecosystem integrations
- AI GitLab = private sovereign forge + internal CI + backups
- Every repo exists in ≥2 forges (mirror policy)

## Security + Transparency
- Default-deny policy gate
- Diagnostics gate (Trivy + dependency review + SBOM hooks)
- Transparency gate (required metadata + evidence artifacts)
- Branch protection required checks

## Bot guardrails
Bots may:
- trigger diagnostics
- summarize evidence
- draft PRs for safe upgrades
Bots must not:
- auto-merge security-sensitive changes
- target third-party systems without authorization

## Deployment
See `infra/ai-gitlab/` for docker-compose and setup steps.
