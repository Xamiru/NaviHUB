---
name: wrap
description: End-of-session chores for NaviHUB — run the CI gate, fold what changed into CLAUDE.md or docs/architecture, list what the user needs to commit, and emit a paste-ready handoff prompt for the next session. Use when work wraps up or the user says "end of session" / "update anything needed".
---

# Codex adapter

Read [the authoritative Claude workflow](../../../.claude/skills/wrap/SKILL.md) completely before taking action, then follow it as the workflow for this skill.

The files under `.claude/skills/wrap/` remain authoritative, including any scripts or assets they reference. When that workflow says to read or update `CLAUDE.md`, treat the instruction as applying to both byte-identical root contracts, `CLAUDE.md` and `AGENTS.md`.
