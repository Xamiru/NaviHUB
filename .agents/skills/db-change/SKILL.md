---
name: db-change
description: Change the NaviHUB database safely — add a table or column, write the migration, keep the Drizzle mirror and the export wipe list in step, and prove it against a pre-existing database. Use for ANY schema change; getting this wrong has shipped an app that would not start.
---

# Codex adapter

Read [the authoritative Claude workflow](../../../.claude/skills/db-change/SKILL.md) completely before taking action, then follow it as the workflow for this skill.

The files under `.claude/skills/db-change/` remain authoritative, including any scripts or assets they reference. When that workflow says to read or update `CLAUDE.md`, treat the instruction as applying to both byte-identical root contracts, `CLAUDE.md` and `AGENTS.md`.
