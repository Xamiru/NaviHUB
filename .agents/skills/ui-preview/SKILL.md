---
name: ui-preview
description: Show the user a NaviHUB screen or component BEFORE building it — a single self-contained local HTML file (previews/, gitignored, never uploaded) that uses the app's real Tailwind classes, Lain theme, fonts and shell, compiled with the project's own config so the markup ports straight into JSX once approved. Works on the headless VPS. Use when the user asks for a UI preview, a mockup, design options/variants, "show me first", or when a renderer change is big enough that a wrong guess would waste a build cycle.
---

# Codex adapter

Read [the authoritative Claude workflow](../../../.claude/skills/ui-preview/SKILL.md) completely before taking action, then follow it as the workflow for this skill.

The files under `.claude/skills/ui-preview/` remain authoritative, including any scripts or assets they reference. When that workflow says to read or update `CLAUDE.md`, treat the instruction as applying to both byte-identical root contracts, `CLAUDE.md` and `AGENTS.md`.
