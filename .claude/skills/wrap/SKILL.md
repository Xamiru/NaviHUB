---
name: wrap
description: End-of-session chores for NaviHUB — confirm the CI gate, fold durable changes into CLAUDE.md or docs/architecture, and report uncommitted work. Use when work wraps up or the user says "end of session" / "update anything needed".
---

# Wrapping up a session

The user asked for end-of-session maintenance. Keep durable rules in the mirrored root contracts
and subsystem details in `docs/architecture/`.

## 1. Green the CI gate

```bash
npm run typecheck
npm run test
```

These are exactly what `.github/workflows/release.yml`'s `verify` job runs. Run them only if they
have not already passed for the final code state. **Never** `npx vitest` / `npx tsc` (Electron ABI).
Do not run `npm run dist:win` — that is the user's job, on their machine.

If anything fails, stop and report it.

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

## 3. Report the result

Show the user what is uncommitted (they commit, never you):

```bash
git status --short
```

Briefly report what changed, any unfinished work, what needs visual checking on the laptop for
renderer changes, and any re-import needed for importer changes.
