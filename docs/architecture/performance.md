# Performance at library scale

Every slow screen found on 2026-10-05 was code that was fast on a small library and grew faster
than the library did. The laptop's library (3,625 titles, 79k characters, 100k credits, about 200
completed titles) is smaller than the user's main PC library, and the quizzes default to
completed titles, so a local timing is a lower bound. The rules live in `CLAUDE.md`
"Performance rules"; this file is the why, the numbers, and how to measure.

## Where the time goes

- **The main process.** better-sqlite3 is synchronous, so a handler that reads the whole library
  holds up every other IPC call and every `navimg://` image until it returns. The app looks
  frozen even though the renderer is idle. `quiz:availability` blocked main for 10.5 s on an
  uncached "All" read, and that cache reset on every write.
- **The renderer thread.** Quiz deal builders run there (except the ones moved into the quiz pool
  process), so a quadratic builder freezes input and painting. Starting Voice Actor on "All" took
  9.9 s and Cast 6.6 s.
- **Image decode and paint.** Franchise hero art (1920×620 up to 4496×2779) decoded at full size
  into 10rem cards dropped scroll frames of up to 100 ms.
- **Startup work.** The dictionary orphan sweep scanned every child table with `NOT IN`, reading
  the whole term index and FTS text on each cold launch: about 1.4 s before the first lookup.

## What fixed each one, and the rule it became

**Whole-library reads leave main.** `src/main/quizPools.ts` sends availability, the challenge,
song, cast and synopsis pools and the Voice Actor deal to a utility process
(`src/main/quizPoolChild.ts`) with its own read-only connection; `src/main/quizPoolsCore.ts` is the
dispatch, shared with the in-process fallback. `src/main/repos/quizRepo.ts` reads through
`src/main/db/sqliteHandle.ts` so the child never loads electron or `connection.ts`. Details,
caching and the fallback: [music-quiz.md](music-quiz.md) "Quiz pool process".

**Deals scale with the round.** The quadratic patterns, all removed:
- an eligibility check that re-filtered the whole pool for every item (Cast's distinct-title
  count, Connections' distractor count): count against a precomputed Set instead;
- building every possible seed and then picking 10 (Voice Actor pairs, Silhouette options,
  Movie Chain's every endpoint pair): `balancedBuiltDeal` in `src/shared/quizCore.ts` builds a seed
  only when the identity round-robin reaches it, Voice Actor samples `SOURCES_PER_QUESTION`
  sources, and Movie Chain searches from one seeded start;
- shuffling a whole pool per question to take three: `drawUntil` (partial Fisher-Yates) in
  `src/shared/quizChallenges.ts` stops once it has enough;
- `queue.shift()` and array spreads inside graph loops (Movie Chain), and `includes()` inside a
  filter (Library Grid).

`tests/quizScale.test.ts` runs the builders that were quadratic over a seeded library several times
the laptop's size with budgets far below the old times (6-245 s on that data, against 13-460 ms
now). Extend it when a builder starts dealing from a large pool.

**Queries seek instead of scanning.**
- Two library-sized `IN (…)` lists on one join made SQLite probe one list per row of the other:
  2.6 s for the media-relation components, against 19 ms for reading the 7,600-row table whole
  and filtering in JS.
- A correlated `COUNT(*)` per row (Image Reveal's availability) became a per-type CTE; the
  Connections count accepts a pair from two eligible-cast sizes and recounts shared cast only when
  those cannot decide.
- The dictionary sweep reads each child table's distinct parent ids with one index seek apiece
  (`ORPHAN_SWEEPS` in `src/main/dict/dictDb.ts`): 220-240 ms warm became 1-2 ms, and the cold
  launch read disappeared. `tests/dictSchemaSync.test.ts` fails if a child table's lookup would scan.

Check `EXPLAIN QUERY PLAN` for any new query over `credit`, `character`, `media_character`,
`media_relation` or a dictionary table; "SCAN" on one of those on a hot path is the warning sign.

**Thumbnails for small slots.** `src/renderer/src/pages/FranchisesPage.tsx` loads
`thumbUrl(path, 480)` and falls back to the full file; covers in small slots pass
`CoverImage thumbWidth`.

## Seeing it on the real library

`src/main/ipcTiming.ts` wraps every IPC handler at registration and logs
`slow handler <channel>: <ms> ms on the main process` (source `ipc`) when one blocks main for
100 ms or more, at most once per channel every 10 s. Only the part before a handler's first
`await` is timed, and only the channel and duration are written. On the PC, Tools → Logs shows
which handler outgrew the library; `quiz pools: building quizzes in the main process` means the
quiz pool process failed and the old blocking path is back for that session.

## Measuring at scale on the laptop

Never write to the live DB. The 2026-10-05 pass used scratch copies:

1. Copy `~/.config/navihub/navihub.db` with better-sqlite3's `backup()` into the scratchpad.
2. Duplicate every anime, movie and TV row k times with offset ids, suffixed titles and external
   ids, and copy each copy's characters, credits, tags, companies and relations alongside. People
   are reused, so the copies are denser than a real library k times the size: they overstate
   graph-heavy costs such as Movie Chain and Connections. The ×4 copy had 12.5k titles, 269k
   characters and 398k credits.
3. Bundle a script that imports `src/main/repos/quizRepo.ts` (or the builders) with esbuild,
   open the copy read-only, `installSqlite(() => db)`, and time each read. Run it with
   `ELECTRON_RUN_AS_NODE=1 node_modules/.bin/electron`, because better-sqlite3 is built for
   Electron's ABI.

On that ×4 copy, uncached "All" availability went from 13.6 s to 6.8 s (and off main), a Movie
Chain deal from 8.2 s to 0.6 s, and Silhouette from 2.1 s to 0.55 s.

## Still open

- Cast and synopsis still cross IPC as whole pools (3 MB and 4.5 MB on the laptop; 12-18 MB on
  the ×4 copy). Building them in the quiz pool process, as `quiz:vaQuestions` does, is the fix if
  they show up as slow.
- Availability is recomputed in the quiz pool process after any library write; it no longer blocks
  main, but a quiz page shows readiness later on a large library.
