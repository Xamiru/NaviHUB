# Ideas

I generated ~41 candidates across media tracking, the readers/player, the three learn verticals,
gacha, music, stats, checklist and quality-of-life (the raw list is `_raw/08-idea-candidates.md`),
then cut anything that didn't reuse an existing table, didn't fit a single-user offline desktop app,
or wasn't worth the code. What survived is below, ranked by (impact for you, daily) × (1 / effort).

Every entry names the convention it follows, because none of these should be a new subsystem.

---

## 1. Inline status / score / favorite on the detail page and the card
**S–M.** Fixes the single biggest daily friction.

`api.media.update` currently has exactly one caller in the renderer — the edit form
(`MediaFormPage.tsx:144`). Make Status a `PillGroup` row, Score a pill row or a stepper, and the
favorite star a toggle, all on `MediaDetailPage` beside the existing `LogProgressButton`. Add a heart
overlay to `MediaCard` so the Continue and Favorites strips can be curated without leaving Home.

*Reuses:* `api.media.update` (unchanged), `PillGroup`, the `ThemeRow` optimistic-heart pattern
(`MediaDetailPage.tsx:755-763`), `qk.media.detail`/`qk.media.all` invalidation. No IPC change, no
schema change.
*Risk:* the score picker needs `score.max` from settings (`lib/hooks.ts:70` already resolves it), and
the optimistic local mirror must be re-synced from props like `ThemeRow` does or it goes stale after
an unrelated refetch.

## 2. Make in-app reading credit the checklist — and stop the double-count
**S.** This is a bug fix that reads as a feature.

Call `checklistRepo.logProgress(mediaId, todayLocal())` from `manga:markChapterRead` /
`manga:markProgress` on the first `read_at` transition, exactly as `video:markWatched` does
(`ipc.ts:378-381`), and let `logProgress` own the `media_item.progress` write for manga so
`syncMediaProgress` stops fighting it (today, reading chapter 5 then pressing Log leaves you on
chapter 6 — `mediaProgress.ts:97` vs `manga.ts:383-387`).

*Reuses:* the one documented progress write path; no new tables, no new channels.
*Risk:* `syncMediaProgress` is also called by `rescan`/`detach`; keep its monotonic behaviour for
those and only suppress it on the read transition. Worth a test in `tests/manga.test.ts` pinning
"read a chapter then Log adds 1, not 2".

## 3. A known-word baseline, so comprehension and the i+1 feed are true for a real learner
**M.** The highest-leverage change in the whole Japanese vertical.

Everything the section calls "known" comes from `jp_card` × `jp_lesson` alone
(`coverageRepo.ts:28-37`). That means comprehension reads near 0% for someone who already reads some
Japanese, and the i+1 feed — which keeps a sentence only when *exactly one* word is unknown
(`jpFeed.ts:113`) — is structurally empty until the deck is large. The flagship "comprehensible input
on tap" page does nothing for the first several months, which is the inverse of when it's needed.

Two parts, both small:
- A settings-backed "assume the top N frequency words known" baseline, unioned into `TIER_CTE` and
  `knownWordSet`. The `freq` table is already in `dictionaries.db` and `jpFeed.realDeps` already
  queries it (`:215-241`).
- A "**I already know this**" action on any dictionary/feed/coverage word that writes a card at
  `status='review'` in a pre-learned lesson — the `ensureMiningInbox` shape with a different lesson.

*Reuses:* `freq`, `TIER_CTE`, `knownWordSet`, `japaneseRepo.ensureMiningInbox`.
*Risk:* the baseline must be visible and adjustable, or the comprehension number becomes a different
kind of lie. Show it as "known: 340 cards + top 1000 assumed".

## 4. One activity heatmap across everything you do
**M.** The app has five dated event logs and renders a calendar for none of them together.

`checklist_log` (every progress event since 2026-07-25), `jp_review_log`, `en_review_log`,
`music_play_log`, `quiz_session.played_at`, `game_session.started_at`. A single "what you did" grid
on `/stats` — one row per source, or one merged grid with a source breakdown on hover — is a real
answer to "where did this year go", and it costs one repo function.

*Reuses:* `CalendarHeatmap` (already used by the Japanese stats page), `musicRepo.computeStreaks`,
one new `media:activityHeatmap` channel following the IPC chain.
*Risk:* five `GROUP BY date(col,'localtime')` queries — bound them to 364 days (see the checklist
finding in `01-technical.md`, where the existing ones don't).

## 5. Resume anything, on Home
**S–M.** You have four resume positions in the database and surface none of them together.

`manga_chapter.last_read_page` + `read_at`, `video_file.resume_seconds` + `watched_at`, the book
reader's spine index (same `manga_chapter` columns), and `media_item.progress`. One "Pick up where you
left off" strip that links *straight into the reader/player* — not to the detail page — removes the
click that Flow A currently spends on navigation.

*Reuses:* `lib/readerPath.ts:readerPath()` already builds the right URL for image-vs-book;
`MediaCard` with `showProgressBar`; one repo query per source.
*Risk:* it must not duplicate the existing Continue strip. Continue is "in progress by status";
this is "you were literally at page 143". Put it above Continue and cap it at 4.

## 6. Turn writing feedback into a personal error log — and drills from it
**M.** The most valuable data the English vertical produces is currently write-only.

Every `en_writing.feedback` row holds a `corrections[]` array of `{before, after, why}`. Nothing ever
reads them again. Parse them into a per-category tally (the six `EN_MECHANICS` categories are already
the right taxonomy), show "your last 20 submissions: 14 comma splices, 9 article slips", and weight
the mechanics pool toward the categories you actually miss.

*Reuses:* `en_writing` (no schema change — the JSON is already stored), `EN_MECHANICS` categories,
the existing `EnglishMechanicsPage` pool logic.
*Risk:* the model's `why` strings aren't a controlled vocabulary. Ask for a `category` field in the
JSON contract (`buildFeedbackPrompt` already dictates the shape) constrained to the six category keys
— that makes the tally trustworthy instead of a keyword-match guess.

## 7. Interval fuzz in the SRS
**S.** One line, and it fixes a problem the app is already working around.

`gradeCard` is fully deterministic (`srs.ts:104-123`), so a batch of cards introduced together stays
a batch at every subsequent step. This app introduces cards in batches *by design* —
`buildCoreDeck`, `buildPrepDeck`, and `setLessonLearned` flipping a whole lesson at once. The review
page's `dueCap` pill (`JapaneseReviewPage.tsx:64`) is treating the symptom.

*Reuses:* nothing new. Multiply intervals ≥2 days by `1 + (rng() - 0.5) * 0.1`, with the rng injected
so `previewIntervals` and `tests/srs.test.ts` stay deterministic.
*Risk:* the button previews would show the un-fuzzed value; that's fine and is what Anki does.
Consider pairing it with Anki's "new interval 40%" on lapse (`srs.ts:94-103` currently drops a
200-day card to 1 day).

## 8. Count music in "days of your life"
**S.** `music_play_log.duration` is a real measured number, and it's the only one the stats page
ignores.

Every figure on `/stats` is an estimate from a settings constant (`stats.animeEpMinutes`,
`mangaChapterMinutes`, `bookPageMinutes`) except games. Music has per-play seconds
(`init.sql:515-520`) and is excluded entirely, because `timeStats()` only reads `media_item`
(`mediaRepo.ts:347-364`).

*Reuses:* `LibraryTimeStats` + one `SUM(duration)` query; `TYPE_COLORS` needs one more entry.
*Risk:* it will dwarf everything else and change the headline number. That's the honest outcome —
flag it `estimated: false` and let the split bar show it.

## 9. Schedule grammar, don't just quiz it
**M.** `grammar_point` is already levelled N5–N1 with cloze fields precomputed at import.

Right now grammar is a one-shot MC drill (`/japanese/grammar/quiz`). The SRS machinery it needs
already exists twice over (`jp_card` for Japanese, `en_word` for English) — the cheapest version is a
`jp_lesson` of kind `grammar` whose cards are generated from selected grammar points, so grammar
enters the *same* review queue rather than becoming a third scheduler.

*Reuses:* `grammar_point` (`dictionaries.db`), `jp_card`/`jp_lesson`, `@shared/cloze.ts`,
`japaneseRepo.submitReview` unchanged.
*Risk:* grammar cards grade badly as recall-the-string. Front = the cloze sentence, back = the point
+ its explanation, and self-graded — do not try to auto-check a typed answer.

## 10. Derive reading minutes instead of guessing them
**S–M.** You already have the timestamps.

`stats.mangaChapterMinutes` (default 5) and `stats.bookPageMinutes` (default 1.5) are guesses applied
to everything. `manga_chapter.read_at` gives you consecutive-chapter deltas; the book reader saves a
spine index on the same debounce. A median over your own last N chapters is a far better constant —
and it can stay a *suggested* value the settings field offers, so nothing becomes magic.

*Reuses:* `manga_chapter`, `mediaRepo.rowMinutes` unchanged (only the constant changes),
`SettingsPage`'s existing Time-stats card.
*Risk:* deltas are garbage when you read three chapters in a burst or leave the app open. Use the
median of deltas under 90 minutes and require ≥20 samples before offering it.

## 11. "What's next in this franchise"
**S–M.** `media_relation` is imported for every AniList title and rendered as a flat list.

Resolve `(related_source, related_external_id)` against `media_item.(external_source, external_id)`
and split the section into *in your library* (link to it, with its status) and *not imported* (a
one-click import through the existing dialog). Sequels you own but forgot about is exactly what a
personal tracker should surface.

*Reuses:* `media_relation` (`init.sql:180-190`), the existing `ImportDialog`, `mediaRepo`.
*Risk:* relation types from AniList are noisy (`CHARACTER`, `OTHER`, `SUMMARY`). Whitelist
sequel/prequel/side-story/parent and hide the rest behind a disclosure.

## 12. Per-source mining stats
**S.** `jp_card.source_media_id` has existed since the mining feature shipped and nothing groups by it.

"312 cards, from: Berserk 88 · Steins;Gate 64 · video 41" on the Japanese stats page, each linking to
that title's coverage. It answers "is my immersion actually producing cards" and it's one `GROUP BY`.

*Reuses:* `jp_card.source_media_id` (LEFT JOIN, tolerates deletion by design), `JapaneseStatsPage`'s
existing Journey block.
*Risk:* none worth naming.

## 13. Tag deletion, and a tag janitor
**S.** `tags.remove` is wired end-to-end and called by nothing, so imported tags accumulate forever.

`TagsIndexPage` already has counts (`tags:listWithCounts`). Add a delete in an `ActionMenu` per row,
plus a "0 titles" filter so pruning after a big import is one pass.

*Reuses:* the dead `tags.remove` channel exactly as built.
*Risk:* deleting a tag with rows is destructive — put it behind `ActionMenu` (where Delete lives by
convention) and confirm with the count.

## 14. Prune the deck: rare-word and leech triage for English
**S–M.** The auto-save-misses loop will fill `en_word` with tail vocabulary.

A missed 40k-rank word enters the deck on the same schedule as a word you actually need
(`englishRepo.saveWord`), and English got none of the Japanese leech machinery — no list, no drill,
no suspend. Add a leech list (`listLeeches` ported from `japaneseRepo.ts:401-428`), show the saved
word's frequency rank next to it, and offer bulk-remove for anything above a rank threshold you pick.

*Reuses:* `en_freq` (already imported), `englishRepo`, the Japanese leech page as a template.
*Risk:* keep it manual. Auto-pruning someone's deck is the kind of helpfulness nobody thanks you for.

---

## Smaller ones worth doing

- **`?import=1` on the list route** so Home's Import chip works in one click — `useSearchParams`, the
  `?tab=` idiom `MediaDetailPage`/`SettingsPage` already use. *(S)*
- **Auto-advance to the next chapter/episode** at the end of the current one — `readerPath()` and the
  sibling list are already in hand; make it a reader pref, off by default. *(S)*
- **Weekly items on Home's checklist card** — `ChecklistStatus.weekly` already rides the same query
  `ChecklistCard` fetches (`HomePage.tsx:315` just ignores it). *(S)*
- **A game-session pill in the Topbar** — mount `useGameSession` next to `ActivityIndicator` so a
  tracked session is visible from anywhere, not only from the tab that started it. *(S)*
- **"Dropped but nearly finished" shelf** — `progress / total_units > 0.8` with a dropped/on-hold
  status; a `MediaListFilter` predicate and a Home strip. *(S)*
- **Coach thread switcher** — `gacha.coachThreads` and `qk.gacha.coachThreads` both already exist and
  are dead; every "New thread" currently orphans the last conversation. *(S)*
- **Manual gacha goal CRUD** — `gacha.createGoal`/`updateGoal` are wired and unreachable, so adding a
  reminder by hand currently costs an LLM call. *(S)*
- **Per-round programming quiz history** — `quiz_session` rows with `kind: 'programming'` are already
  written, with an unused `settings` JSON to hold which course the round covered. *(S)*
- **Retro-credit a checklist day** — `checklist_log.period_key` is just a string; allowing yesterday
  would stop one forgotten tick from breaking a streak you actually earned. *(S)*
- **Store the provider and model on each `en_writing` row** — `coach.provider` is switchable, and the
  writing history silently mixes two graders' scores on one chart. *(S, needs an `ensureColumn`)*

---

## Deliberately rejected

- **In-volume bookmarks** — `last_read_page` already covers the only case one reader has.
- **A/B repeat + slow playback in the video player** — real for shadowing practice, but the mining
  loop is the player's job and this is a different tool.
- **"Command of the day" on the programming hub** — a gimmick with no retention mechanism behind it.
- **Score distribution by studio/author** — `credit`/`media_company` make it easy, but the stats page
  is already dense and nobody acts on this number.
- **A bulk import queue in the app** — `scripts/bulk-import.cjs` exists and is the right place for it.
- **A weekly review screen** — the checklist page already shows the week; a second view of the same
  rows is not a feature.
- **"Rediscover" music shelf** — pleasant, but the library is small enough that shuffle covers it.
- **Auto-detecting reading sessions from window focus** — needs to guess at intent, and guessing wrong
  corrupts the one honest number in the stats page.
- **Any form of scheduled/background sync of external data** — every fetch in this app is button-only
  by deliberate design, and that is the right call.
- **A second scheduler for grammar/programming** — one SM-2 implementation, reused; not three.

---

## Worth deleting or simplifying

Cutting these is worth more than most of the additions above, because each one is surface area you
currently have to keep true.

- **`src/renderer/src/components/EntityPicker.tsx`** — 131 lines, unreferenced (`UniversalPicker` won).
  Delete it. It is currently the subject of an accessibility finding that nobody will ever hit.
- **`MediaConfig.icon`** — a **required** field on two interfaces (`lib/mediaConfig.ts:10,35`),
  populated 20 times with glyphs, rendered nowhere. Every new media type still has to invent one.
- **`DEFAULT_SETTINGS.theme`** (`connection.ts:34`) — seeded into every database since the theme
  switcher was removed.
- **The 9 dead IPC channels** — each is an api.ts entry + a preload line + a handler + (usually) a
  repo function that has to keep working. Four of them (`tags.remove`, `gacha.coachThreads`,
  `gacha.createGoal`/`updateGoal`) are listed above as things to *wire up*; `characters.cast`,
  `credits.add`, `mediaCompanies.add`, `settings.get` and `video.scanStatus` should just go.
- **`usePitchRecorder`'s safety-timer effect** (`:159-165`) — an empty callback with a comment
  claiming it does something.
- **The `.woff` half of every bundled font, and 122 of Noto Serif JP's 124 subsets** — 18 MB of the
  21 MB renderer output, in a build that self-updates over the network.
- **`/watch` as a destination** — the landing page has no sidebar entry and the file-open path is how
  video actually gets played. Either give it a sidebar slot or fold its one useful line (the
  "nothing is saved for one-off files" warning) into the player and drop the page.
- **`LibraryGlance` on Home** (`HomePage.tsx:595-642`) — a full re-listing of the sidebar at the
  bottom of the page you open most. Its only unique affordance is the Import chip, which doesn't work.
- **`TopPeople`'s all-or-nothing gate** (`:522`) — under 3 voice actors the section hides the studios
  row too, for no reason.
