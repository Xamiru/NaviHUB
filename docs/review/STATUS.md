# Review status — what has since shipped

The review in this folder was produced **2026-08-08** and modified no source files. Four days
later several of its findings had been fixed with nothing recording it, and two of its own claims
had gone stale in the other direction — so the folder misled in both directions and all ~78 items
read as open.

This file is the ledger. **Verified against the tree on 2026-08-12**; each row was re-checked by
running the command shown, not by reading the review.

## Fixed since the review

| Finding | Check | Result |
|---|---|---|
| Top-20 #2 — `MediaDetailPage` has **zero** `btn-primary` | `grep -c btn-primary src/renderer/src/pages/MediaDetailPage.tsx` | **1** — fixed |
| Mouse-only destructive actions / native `window.confirm` modals (27 sites) | `grep -rn 'window\.confirm' src/renderer/src` | **0 call sites** — replaced by `lib/confirm.ts`; the only textual hit is a comment inside that module |

## The review itself is now wrong

These were true when written and are not true now. **Trust the code, not these rows.**

| Review claim | Check | Reality |
|---|---|---|
| Drift #1 — "SM-2 ignores lateness; `gradeCard` never receives elapsed days" | `src/shared/srs.ts:101` | `Math.max(s.intervalDays, …opts.elapsedDays…)` — lateness **is** consumed. `repos/japaneseRepo.ts:574,590` select and pass `overdue_days`. CLAUDE.md was right; the review drifted |
| Drift #4 — "`MediaConfig.icon` is still a *required* field" | `grep -c icon src/renderer/src/lib/mediaConfig.ts` | **0** — the field is gone |

## Fixed by the 2026-08-12 documentation pass

| Finding | What changed |
|---|---|
| Drift #5 — `SYNC_PROTOCOL_VERSION` stale in CLAUDE.md | Removed. `grep -rn SYNC_PROTOCOL_VERSION src/ .github/ CLAUDE.md` → **0** |
| Drift #6 — `books/` + `jpaudio/` missing from the `navimg://` prefix table | Table completed in CLAUDE.md — and `wrestling/` was missing too, which the review did not catch. It is now the full list |

## Still open

| Finding | Check | Result |
|---|---|---|
| Top-20 #4 — biased `.sort(() => Math.random() - 0.5)` with the answer at index 0. Measured over 200k trials: slot 1 **35.8%**, slot 3 **15.8%** | `grep -rln 'Math\.random() *- *0\.5' src/renderer/src` | **7 files**: `KeigoDrill`, `LookalikeDrill`, `MinimalPairsDrill`, `SpeakDrill`, `TransitivityDrill` (components/japanese/), `JapaneseLeechDrillPage`, `JapaneseLoanwordsPage` |
| Unescaped `LIKE '%q%'` in search — `%`/`_` in a query act as wildcards | `grep -c LIKE src/main/repos/searchRepo.ts` | **4** queries |
| Programming quiz — correct option is the strict longest of four in 169/219 questions (77%) | see `03-educational.md` | unchanged |

Everything else in the six deliverables is **unverified since 2026-08-08** — treat it as "probably
still true, but re-check before acting". The `_raw/` folder holds the thirteen intermediate recon
reports and, per `PROGRESS.md`, is safe to delete once the deliverables have been read.

## Keeping this honest

When you fix something from this review, add a row here. The whole reason this file exists is that
three fixes shipped with nothing recording them, and the next reader had to re-verify 78 items to
find out what was left.
