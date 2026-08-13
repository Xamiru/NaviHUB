---
name: wrap
description: End-of-session chores for NaviHUB — run the CI gate, fold what changed into CLAUDE.md or docs/architecture, list what the user needs to commit, and emit a paste-ready handoff prompt for the next session. Use when work wraps up or the user says "end of session" / "update anything needed".
---

# Wrapping up a session

The user asked for this once ("update anything needed at the end of a session") and it then
happened in only 19 of 48 sessions. They compensate by asking for a handoff prompt by hand — four
separate times. This automates both.

## 1. Green the CI gate

```bash
npm run typecheck
npm run test
```

These are exactly what `.github/workflows/release.yml`'s `verify` job runs, so a green pair here
means their push will actually produce a release. **Never** `npx vitest` / `npx tsc` (Electron ABI).
Do not run `npm run dist:win` — that is the user's job, on their machine.

If anything fails, stop and report. Do not paper over it in the handoff.

## 2. Fold what changed into the docs

This is the part that decays if skipped, and the rule is now about **which** file:

- A new **rule or invariant** — something an agent must or must not do → `CLAUDE.md`, in
  *Hard invariants*. Stated once, not repeated per feature.
- A new **standing user preference** ("always…", "never…", "I don't want…") → `CLAUDE.md`, in
  *Standing user directives*, with the date.
- **How a subsystem works** — the narrative, the decisions, the gotchas → the matching file in
  `docs/architecture/`. **Update it in place.** Do not append a dated block to `CLAUDE.md`; that
  habit grew it to 135 KB before it was split.
- A **new subsystem** → a new `docs/architecture/<name>.md` plus a row in `00-index.md` and in
  `CLAUDE.md`'s reference index.
- A **bug the user reported that is not fixed** → `CLAUDE.md`, *Known open issues*. A vague report
  once sat undiagnosed for 33 days because nothing wrote it down.

Memory is for cross-project facts about the user and how they work — not for project
architecture, which belongs in the repo where it is versioned and reaches both machines.

## 3. Hand off

Show the user what is uncommitted (they commit, never you):

```bash
git status --short
```

Then write a short handoff block they can paste into a fresh session:

- What shipped this session, in two or three lines.
- Anything **left half-done**, and the next concrete step.
- Anything that needs **eyeballing on the laptop** — every renderer change, since there are no
  renderer tests and the VPS has no display.
- Anything that needs a **re-import** to take effect.

Keep it short enough to paste. It replaces the "explore the codebase again" warm-up, which still
costs a median 10-11 tool calls at the start of every session.
