# AI Writing CLI

This folder contains a safe, audit-friendly writing toolkit.

## Commands
- `python -m scripts.writing.cli readme` — generate/refresh README content
- `python -m scripts.writing.cli pr-summary --diff path/to/diff.txt` — summarize a diff
- `python -m scripts.writing.cli weekly-digest --input reports/weekly-digest.json` — convert JSON digest to Markdown

## AI usage
If `OPENAI_API_KEY` is set, the CLI can use an LLM for drafting. If not, it falls back to deterministic summaries.

Guardrails:
- never include secrets
- no intrusive/offensive content
- evidence-first
