#!/usr/bin/env python3
"""Generate a human-readable security/diagnostics summary from CI artifacts.

This is intentionally defensive and informational.
"""

import json
from pathlib import Path
from datetime import datetime

REPORTS = Path("reports")
REPORTS.mkdir(parents=True, exist_ok=True)

out_md = REPORTS / "security-summary.md"
out_json = REPORTS / "diagnostics.json"

now = datetime.utcnow().isoformat() + "Z"

# Minimal starter payload; expand as you add scanners.
payload = {
    "ts": now,
    "checks": {
        "trivy_fs": {"status": "unknown", "notes": "Wire in CI output"},
        "dependency_review": {"status": "unknown", "notes": "GitHub-native"},
        "secrets": {"status": "unknown", "notes": "Use GitHub Secret Scanning and/or gitleaks locally"},
    },
    "recommendations": [
        "Keep PRs small; keep CI green.",
        "Store keys in GitHub Secrets; never commit secrets.",
        "Treat security changes like production changes: review + test.",
    ],
}

out_json.write_text(json.dumps(payload, indent=2))

md = [
    "# Security Diagnostics Summary",
    f"Generated: {now}",
    "",
    "## Checks",
]
for name, info in payload["checks"].items():
    md.append(f"- **{name}**: {info['status']} — {info['notes']}")

md += [
    "",
    "## Recommendations",
] + [f"- {r}" for r in payload["recommendations"]]

out_md.write_text("\n".join(md) + "\n")
print(f"Wrote {out_md} and {out_json}")
