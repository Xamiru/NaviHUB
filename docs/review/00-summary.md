# Review summary

`npm run typecheck` clean. `npm run test`: **103 files / 1272 tests, 0 failures, 65 s.** Nothing is
broken; this is a review of a working app.

## What I actually think

The engineering discipline here is better than the app's size would predict. 334 IPC channels with
zero contract orphans. Every one of eight importers genuinely does all network work before one
synchronous transaction — I checked all eight. Every column added to a pre-existing table has a
matching `ensureColumn`, and the index-ordering rule that once crashed a live database is now enforced
by a test that regex-diffs two files. Path traversal is correctly defended. Every spawn uses an argv
array with an error handler, and the ffmpeg `file:` prefixing closes an injection class that a `--`
guard would have missed. There are zero `console.*` calls in the main process and every secret is in
the export wipe list. The test suite is not padded: 54 files read adversarially produced exactly one
weak assertion.

So the interesting findings aren't "this code is bad". They're in three other places.

**First: the app knows things it doesn't act on.** Reading a chapter in your own reader doesn't credit
your own checklist, while watching an episode does — and the workaround (pressing Log) advances
progress a second time, so reading chapter 5 and crediting it puts you on chapter 6. `api.media.update`
has exactly one caller in the entire renderer, so setting a score costs a 13-field form. Mined words
sort behind the curriculum and can wait a week. The Import chip on Home navigates to the same place as
the card title. None of these are hard; all of them are on the path you walk daily.

**Second: some numbers aren't true.** "Comprehension" is deck coverage, so it reads near zero if you
already know some Japanese — and simultaneously counts a card that graduated eleven minutes ago as
"known", so it over-promises the moment the deck moves. The i+1 feed keeps only sentences with exactly
one unknown word, drawn from that same deck-only set, which makes the flagship comprehensible-input
page structurally empty for the first several months. The SRS ignores how overdue a card was, while
CLAUDE.md says it doesn't. The "JLPT checkpoint" measures the app's own seed deck. Music listening is
the only precisely-measured time in the database and it's the one thing excluded from "days of your
life".

**Third: two assessment bugs I measured rather than reasoned about.** In the loanword and lookalike
drills the correct answer lands in slot 1 **35.8%** of the time and slot 3 **15.8%** — the biased
`.sort(() => Math.random() - 0.5)` idiom, with the answer at index 0 before the shuffle. And across all
219 programming questions, the correct option is the strict longest of four in **169 of them (77%)**.
Both are free giveaways in drills built to test discrimination.

The content, by the way, is the best part of the learning verticals and I'd resist the temptation to
generate more of it. 100 hand-written English mechanics items produced exactly one flawed explanation
on a full read. The shell course's `set -e` exception list is correct in every particular — verified by
running it. The SQL course's version claims check out exactly against the app's own bundled SQLite
3.49.2. The weak layer is the *generated* one: OpenSubtitles frequency ranks put `notwithstanding` in
the "C2 literary" band and `furthermore` in "advanced", and WordNet's first sense resolves
`conjunction` to the temporal-coincidence meaning, so knowing the word correctly gets you marked wrong
— and then auto-saved into your SRS deck with the wrong definition attached.

Finally, a note on the doc you asked me to distrust: **CLAUDE.md is unusually accurate.** About forty
"deliberately/never/must" assertions checked out exactly, and both high-risk "did this creep back"
checks — phone sync, the theme switcher — came back completely clean. Six real divergences are listed
in `01-technical.md`; the sharpest is that "one `btn-primary` per screen" has regressed to **zero** on
the media detail page.

## Findings by area

| Area | High | Med | Low |
| --- | --- | --- | --- |
| Technical — architecture, correctness, security, perf, data integrity, tests, drift | 5 | 19 | 17 |
| UX — flows, IA, consistency, keyboard/a11y | 3 | 9 | ~45 (mostly the consistency sweep) |
| Educational — Japanese, English, Programming | 11 | 14 | 9 |

Four agent-reported `high`s were demoted after I re-read them, one was withdrawn entirely (I was wrong
about missing `aria-label`s on the reader buttons — `BarButton.tsx:19-20` sets one), and one of my own
was promoted. The reasoning for each is in `PROGRESS.md`.

---

## Top 20, ranked by (impact for you, daily) × (1 / effort)

| # | What | Where | Why it matters | Effort |
| --- | --- | --- | --- | --- |
| 1 | Reading a chapter in-app doesn't credit the checklist, and pressing Log then double-counts progress | `src/main/manga.ts:406-424`, `src/main/ipc.ts:378-381`, `src/shared/mediaProgress.ts:97` | The video player credits automatically; the manga reader doesn't. And the intended workaround advances progress a second time — read chapter 5, credit it, land on 6. Wrong data on the daily loop. | S |
| 2 | The most-visited page has no primary action at all | `src/renderer/src/pages/MediaDetailPage.tsx:286` | `grep -c btn-primary` → 0. The log button is `btn-ghost`, identical to the four buttons stacked around it, while the comment above still claims "one filled action per screen". | S |
| 3 | Mined words queue behind the curriculum | `src/main/repos/japaneseRepo.ts:648` (+ `:387`) | The inbox course gets `MAX(sort_order)+1` and `fresh` orders by course. At 10 new/day, a word you captured tonight can wait a week — silently defeating the feature mining exists for. | S |
| 4 | Two drills give the answer away by position (measured) | `JapaneseLoanwordsPage.tsx:55`, `LookalikeDrill.tsx:47-48` | Correct answer at index 0 + a biased comparator sort ⇒ slot 1 **35.8%** vs slot 3 **15.8%** over 200k trials. A free tell in two discrimination drills. | S |
| 5 | Seven cheatsheet answers teach commands that do something else | `cheatsheets.ts:180, 132, 255, 265, 515, 197/217, 624` | The CLI drill accepts them as correct. `tr -d \r` (unquoted) deletes the letter r and leaves the CRs — I ran it. `awk {print $2}` errors out. `find . -name *.log` silently misses everything nested. | S |
| 6 | Status, score and favorite need a 13-field form | `MediaDetailPage.tsx:154-170`, `MediaFormPage.tsx:144` | `api.media.update` has **one** caller in the whole renderer. A theme song gets a one-click heart; a title doesn't. This is a tracker's two most frequent actions. | S–M |
| 7 | 18 MB of font in every build, most of it unloadable | `BookReaderPage.tsx:21-22` | 496 files, 86% of the renderer output, shipped in every AppImage/NSIS and every self-update download. The `.woff` half can never be used by Chromium. | S |
| 8 | Home's "Import" chip doesn't import | `HomePage.tsx:631-635` → `MediaListPage.tsx:122-126` | Navigates to the same destination as the card title above it; the user then hunts for a differently-labelled button. Repeats across all six media types. | S |
| 9 | The SRS ignores how overdue a card was | `src/shared/srs.ts:65`, `japaneseRepo.ts:569-579` | `gradeCard` never sees a due date. Every backlog you clear is scheduled as if answered on time, so intervals systematically under-grow. CLAUDE.md asserts the opposite. | S–M |
| 10 | Remove buttons are mouse-only | `MediaDetailPage.tsx:538,608,644`, `MediaImagesSection.tsx:98` | `hidden group-hover:flex` with no `group-focus-within` — a `display:none` element can't be focused. The correct pattern already exists at `QueuePanel.tsx:179`. | S |
| 11 | 77% of programming questions have the longest option correct | all six courses, 169/219 measured | Docker 90%, git 85%. Someone who never read the lesson beats chance by picking the most qualified option. Mechanical fix — no facts change. | M |
| 12 | "Known" is deck-only, so comprehension and the i+1 feed are both wrong | `coverageRepo.ts:28-37`, `jpFeed.ts:113,213` | Reads ~0% if you have prior knowledge; counts an 11-minute-old graduation as known; and keeps only exactly-one-unknown sentences, so the feed is empty for months. One frequency baseline fixes all three. | M |
| 13 | No interval fuzz, in an app that introduces cards in cohorts | `src/shared/srs.ts:104-123` | `buildCoreDeck`/`buildPrepDeck`/`setLessonLearned` all introduce batches; deterministic intervals keep them a batch forever. The `dueCap` pill is treating the symptom. | S |
| 14 | Production ships `'unsafe-eval'` and `connect-src http://localhost:*` | `src/renderer/index.html:8` | Confirmed byte-identical in `out/`. Nothing in the renderer uses either. Free defence-in-depth against the day a new markdown/HTML surface appears. | S |
| 15 | `bulk-import.cjs` writes without a single transaction | `scripts/bulk-import.cjs` (0 hits for `.transaction(`) | An interrupted bulk run leaves permanently-committed partial titles, indistinguishable from real rows, never retried. Plus orphaned covers on every re-run, wrong game lengths, and missing `epDuration` skewing `/stats`. | M |
| 16 | Every browse query is unbounded and ships `synopsis` + `metadata` | `mediaRepo.ts:213-226`, `HomePage.tsx:46-51` | Home runs seven full-library fetches per mount. Fine at hundreds of titles, not at ten thousand — and the same shape recurs in `peopleRepo.credits`, `characterRepo.roles`, `tagRepo.media`. | M |
| 17 | Writing feedback: a string score becomes 0, and corrections aren't checked against your text | `englishWriting.ts:42-45, 62-70`; `llm.ts:80-85` | `clampScore` silently persists a 0-2 grade for a well-formed reply that types one score as a string; a hallucinated `before` is shown to you as your own sentence. Also no `temperature`, so the rubric you're told to watch climb can move on sampling noise. | S |
| 18 | The review session's "Done" discards where you came from | `JapaneseReviewPage.tsx:346` | Hard-linked to `/japanese`, while the two common entry points are the Checklist row and Home's card. Every other sub-page uses `navigate(-1)`. | S |
| 19 | English content exhausts in days and never adapts | `EnglishMechanicsPage.tsx:110-115`, `EnglishReadingPage.tsx:65-81` | 100 items and 12 passages reshuffle forever with no weighting toward misses; a 12-item category at 20 questions repeats inside one round by pigeonhole. Meanwhile `en_writing`'s corrections — your real error log — are never read again. | M |
| 20 | `mappers.ts`, `tmdb.ts` and `vndb.ts` are untested and load-bearing | `repos/mappers.ts:18-79`, `tmdb.ts`, `vndb.ts` | No test ever calls `mediaRepo.detail()`, so the mappers behind every detail page's cast/crew are uncovered and take `any` — a field typo compiles and silently nulls it. Two whole importers (incl. the undocumented OMDB merge and vndb's VA reconciliation) have no import test while five others do. | M–L |

---

## The documents

- `01-technical.md` — architecture, correctness, security, performance, data integrity, tests, and
  the six CLAUDE.md divergences.
- `02-ux.md` — daily-flow friction, information architecture, the full consistency sweep, keyboard
  and contrast.
- `03-educational.md` — Japanese, English and Programming judged as learning tools.
- `04-ideas.md` — 14 ranked proposals, 10 smaller ones, 10 deliberately rejected, and a
  delete/simplify list.
- `05-quick-wins.md` — 46 self-contained fixes with exact changes, grouped by size.
- `PROGRESS.md` — the run log, including which agent findings I demoted or killed and why.
- `_raw/` — the eleven recon reports plus my own working notes. Intermediate; delete when done.

Nothing outside `docs/review/` was modified.

---

## Open questions for you

1. **`regexCourse.ts:288,322` claims Go 1.22 accepts `(?<name>...)`.** The recon checked
   golang/go#58458 and reports it accepted-but-never-shipped. There's no Go toolchain on this box, so
   I could not verify. One `go run` settles it — and it matters because the false claim is baked into
   a quiz *explanation*.
2. **How large is the library actually going to get?** Several performance findings (unbounded list
   queries, the player context re-render, the index predicates) are real but sub-millisecond at a few
   hundred titles. If you're not heading for thousands, items 16 and the SRS index fixes drop several
   places down this list.
3. **Do you want `/watch` to exist?** The landing page has no sidebar entry and the file-open path is
   how video actually gets played. It's either worth a sidebar slot or worth deleting — right now it's
   neither.
4. **The four dead-but-useful IPC channels** (`tags.remove`, `gacha.coachThreads`,
   `gacha.createGoal`/`updateGoal`) — build the UI or delete them? Tag deletion in particular means
   imported tags currently accumulate with no way to prune.
5. **`scripts/bulk-import.cjs`** — is it still in use? If yes, the transaction and image-orphan issues
   are worth fixing. If it was a one-off seeding tool, saying so in CLAUDE.md is enough and item 15
   comes off the list.
