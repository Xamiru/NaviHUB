---
name: local-release
description: Build and publish a NaviHUB release locally from this machine when GitHub Actions can't run (runner outage or build failure). Stamps the derived version, runs the full verify stage, builds Linux + Windows artifacts, and publishes the GitHub release with both updater manifests.
---

# Codex adapter

Read [the authoritative Claude workflow](../../../.claude/skills/local-release/SKILL.md) completely before taking action, then follow it as the workflow for this skill.

The files under `.claude/skills/local-release/` remain authoritative, including any scripts or assets they reference. When that workflow says to read or update `CLAUDE.md`, treat the instruction as applying to both byte-identical root contracts, `CLAUDE.md` and `AGENTS.md`.
