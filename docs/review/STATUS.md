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
| Top-20 #4 — biased `.sort(() => Math.random() - 0.5)` shuffles | `tests/shuffle.test.ts` text guard | **0 sites** (2026-08-15) — one Fisher-Yates in `src/shared/shuffle.ts` |
| Programming quiz answer-length tell (77% at review time, 47% by 08-12) | `tests/programmingBias.test.ts` | **≤ 25% per course** (2026-08-15); the test caps strict-longest and strict-shortest at 30% and adds a 1.5× spread rule |
| Learning-step misses invisible to the leech list (`03-educational.md:53-60`) | `tests/japaneseRepo.test.ts` learning-step cases | fixed 2026-08-15 — `listLeeches` ORs `lapses >= 6` with Again-grades-since-reset `>= 8` |
| Programming: no per-lesson score, CLI misses discarded, quiz summary blind to the lesson (`03-educational.md:508-518`) | `prog_attempt` / `prog_cli_miss`; quiz summary "Missed N from …" | shipped 2026-08-15 |
| Cheatsheet answers / factual prose errors (`03-educational.md:441-471`) | the cited lines | already fixed before 08-15; the `regexCourse.ts:288/322` claim was WRONG — `(?<name>…)` shipped in Go 1.22 |
| Remote bodies could exhaust main-process memory (`01-technical.md:203-205`) | `tests/http.test.ts`; `tests/performanceBoundaries.test.ts` | fixed 2026-09-21 — structured responses have enforced byte ceilings and large assets stream with independent caps |
| Yomitan entries could decompress without a ceiling (`01-technical.md:192`) | `dict/importer.ts`; `tests/performanceBoundaries.test.ts` | fixed 2026-09-21 — archive download and declared/observed entry sizes are bounded |
| Music Tracks and whole-library playback were unbounded (`_raw/04-renderer-perf.md:88-93`) | `music:trackPage`; `music:playbackQueue`; `tests/musicRepo.test.ts` | fixed 2026-09-21 — SQL pagination plus a fair 2,000-track playback projection |
| Coverage panel polled prep-deck status forever (`01-technical.md:328-329`) | `CoverageSection.tsx`; `tests/performanceBoundaries.test.ts` | fixed 2026-09-21 — active work is observed through the sibling's shared query cache with no idle interval |

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
| Unescaped `LIKE '%q%'` in search — `%`/`_` in a query act as wildcards | `grep -c LIKE src/main/repos/searchRepo.ts` | **4** queries |

Everything else in the six deliverables is **unverified since 2026-08-08** — treat it as "probably
still true, but re-check before acting". The `_raw/` folder holds the thirteen intermediate recon
reports and, per `PROGRESS.md`, is safe to delete once the deliverables have been read.

## Keeping this honest

When you fix something from this review, add a row here. The whole reason this file exists is that
three fixes shipped with nothing recording them, and the next reader had to re-verify 78 items to
find out what was left.
