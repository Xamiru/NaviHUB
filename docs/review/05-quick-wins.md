# Quick wins

Small, self-contained, each independently landable. Grouped by size. Everything here is verified —
I read the line. Bigger items live in `01`/`02`/`03`; this file is the "pick one up and do it" list.

Nothing here was applied — the review was read-only on source.

---

## One-liners

**1. Stop the shutdown path from closing and re-opening the database**
`src/main/index.ts:242-248` — delete `closeDatabase()` and `closeDictDb()` from the
`window-all-closed` handler, leaving only `app.quit()`. `before-quit` (`:250-269`) already calls both,
after `finalizeActiveGameSession()`, which is the order the comment asks for.

**2. Restore the SRS index seeks** — `SrsStatus` is a closed 3-value enum, so this is mechanical.
Replace `status != 'new'` with `status IN ('learning','review')` at:
`src/main/repos/japaneseRepo.ts:375, 467, 514, 516, 748, 824` and
`src/main/repos/englishRepo.ts:108, 176`.
Measured: the English due query goes from `SCAN en_word` to
`SEARCH en_word USING INDEX idx_en_word_due (status=? AND due_at<?)`.

**3. Bound the checklist heatmap queries**
`src/main/repos/checklistRepo.ts:325-352` — each of the five `perDay` queries aggregates all history
on every `checklist:status` call. Add the bound its sibling already uses
(`japaneseRepo.ts:781-783`): `WHERE date(col,'localtime') >= date('now','localtime','-364 days')`.
The rendered grid is 52 weeks either way.

**4. Tighten the production CSP**
`src/renderer/index.html:8` — `script-src 'self' 'unsafe-eval'` → `script-src 'self'`, and
`connect-src 'self' navimg: ws: http://localhost:*` → `connect-src 'self' navimg:`. A grep for
`eval`/`new Function`/`dangerouslySetInnerHTML` across the renderer returns nothing, and no renderer
code opens a WebSocket or talks to localhost. Verify HMR still works in dev; if not, keep the wide
policy behind the dev-only path.

**5. Subset the Japanese serif font (18 MB → well under 1 MB)**
`src/renderer/src/pages/BookReaderPage.tsx:21-22` — `@fontsource/noto-serif-jp/400.css` and
`600.css` emit 496 files / 18 MB (86% of the whole renderer output). Switch to the subset entry
points `@fontsource/noto-serif-jp/japanese-400.css` and `japanese-600.css`.

**6. `docker images ls` is not a command**
`src/shared/programming/cheatsheets.ts:624` — remove the third entry from
`answers: ['docker images', 'docker image ls', 'docker images ls']`. `docker images ls` parses `ls`
as a repository filter and lists nothing, exiting 0; the CLI drill currently accepts it as correct.

**7. Fix the `articles-06` explanation**
`src/shared/english/mechanics.ts:68` — the parenthetical *"(collapse is rarely sudden)"* is a
non-sequitur. Replace with a real contrast, e.g.
*"(compare* collapse is common in ancient trade networks *— general — with* the collapse of the
Bronze Age trading system *— specific)"*.

**8. The review session's Done button should go back**
`src/renderer/src/pages/JapaneseReviewPage.tsx:346` — `<Link to="/japanese">` → a button calling
`navigate(-1)`. Sessions are most often entered from the Checklist row or Home's Japanese card, and
today both end on the hub.

**8b. Restore the one primary action on the media detail page**
`src/renderer/src/pages/MediaDetailPage.tsx:286` — `className="btn-ghost w-full mt-2"` →
`btn-primary w-full mt-2`. `grep -c btn-primary MediaDetailPage.tsx` currently returns **0**, while
the comment at `:125-126` says "One filled action per screen: logging progress is the everyday one".
Today it is one of five identical ghost buttons.

**9. Delete the dead safety timer**
`src/renderer/src/lib/usePitchRecorder.ts:159-165` — the effect's timeout callback is empty; the real
cap lives in `SpeakDrill.tsx:158-164`. Delete the effect and its comment.

**10. Stop the i+1 feed rebuilding after every review**
`src/main/jpFeed.ts:184-192` — drop `MAX(jp_card.updated_at)` from `knowledgeFingerprint()` (every
grade writes it, `japaneseRepo.ts:584`) and fingerprint on what changes the known set instead:
`COUNT(*)`, `COUNT(*) FILTER (WHERE status='review')`, and the learned-lesson count.

**11. Give the mining inbox a low sort order**
`src/main/repos/japaneseRepo.ts:648` — `COALESCE(MAX(sort_order), -1) + 1` → a fixed low value
(e.g. `-1`). `reviewQueue`'s `fresh` query orders by `c.sort_order ASC` (`:387`), so today a word
mined tonight queues behind every new card in every lesson you have already marked learned.

**12. `text-gray-600` on real attribution text**
`src/renderer/src/pages/JapaneseFeedPage.tsx:210` and `JapaneseListenPage.tsx:318` — these carry
actual licensing/attribution copy at 2.87:1 contrast, against the convention that gray-600 is for
decorative markers. → `text-gray-400`.

**13. `Lightbox` close-button label**
`src/renderer/src/components/Lightbox.tsx:60` — `aria-label="Close viewer"` → `aria-label="Close"`.

**14. `ShortcutHelp` overlay z-index**
`src/renderer/src/components/reader/ShortcutHelp.tsx:20` — `z-40` → `z-50`.

**15. Fix the stock-Tailwind colour fallback**
`src/renderer/src/components/japanese/PitchContourChart.tsx:92` —
`rgb(var(--gray-300, 209 213 219))`: the fallback triplet is stock Tailwind gray-300, not this
project's `--gray-300` (`169 211 183`). Drop the fallback — `:root` always defines it.

**16. Don't re-type a palette hex**
`src/renderer/src/components/reader/BookSettingsPopover.tsx:33` — `swatch: '#0a0f0b'` duplicates
`--base-900`; the comment already admits it is "kept in step" by hand. Use `rgb(var(--base-900))`.

**17. Two ungated animations**
`src/renderer/src/components/ImportDialog.tsx:169` and `MusicDownloadDialog.tsx:52` — prefix
`animate-pulse` with `motion-safe:`, matching `MangaReaderPage.tsx:997` and `ActivityIndicator.tsx:39`.

**18. Loading-state nits**
`src/renderer/src/pages/ThemeSongsPage.tsx:332` — add `text-sm` to the in-section `Loading…`.
`src/renderer/src/components/checklist/ChecklistMediaPickerDialog.tsx:86` — `text-gray-400` →
`text-gray-500`.

**19. Form label that isn't a label**
`src/renderer/src/pages/JapaneseLessonFormPage.tsx:213` — `<div className="label mb-2">` double-applies
margin over `.label`'s own `mb-1`. Make it a `<label className="label">` or give the group heading its
own class.

**20. Drop the index Drizzle must never generate**
`src/main/db/schema.ts:1104` — delete `byDue: index('idx_en_word_due').on(t.status, t.dueAt)` from the
`enWord` table block. That index must be created only in `runMigrations` (`connection.ts:140`), after
the 8 SRS columns exist; creating it with the table is the exact shape that crashed live pre-SRS
databases once already.

**21. Missing default in the schema mirror**
`src/main/db/schema.ts:308` — `createdAt: text('created_at').notNull()` →
`.notNull().default(sql\`(datetime('now'))\`)`, matching `init.sql:210` and every other table.

**22. Retire the dead `theme` setting**
`src/main/db/connection.ts:34` — delete `theme: 'dark'` from `DEFAULT_SETTINGS`. Nothing reads the
key; the switchable theme was removed in July.

---

## A few lines

**23. Keyboard-unreachable remove buttons**
`src/renderer/src/pages/MediaDetailPage.tsx:538-546, 608-616, 644-652` and
`src/renderer/src/components/MediaImagesSection.tsx:98-108` — these are `hidden group-hover:flex` /
`group-hover:block` with no `group-focus-within` variant, and a `display:none` element cannot be
focused, so removing a cast member, a character or an image is mouse-only. Add
`group-focus-within:flex` / `group-focus-within:block` — the pattern already exists in this repo at
`QueuePanel.tsx:179`. The three `MediaDetailPage` buttons also carry `title` with no `aria-label`; add
it. (`MediaImagesSection.tsx:105` already has `aria-label="Remove image"` — it only needs the
focus-within fix.)

While in `MediaImagesSection.tsx:82-85`: the gallery tile that opens the Lightbox is a plain
`<div onClick>` with `cursor-zoom-in` and no `role`/`tabIndex`/`onKeyDown`, so there is no keyboard
path to open an image at all. Make it a `<button>`, or add `role="button" tabIndex={0}` plus
Enter/Space handling.

**24. The manga reader's end-of-chapter overlay uses the forbidden backdrop pattern**
`src/renderer/src/pages/MangaReaderPage.tsx:676-677` — replace the outer
`onClick={() => setShowEnd(false)}` + inner `onClick={(e) => e.stopPropagation()}` with
`onMouseDown={(e) => e.target === e.currentTarget && setShowEnd(false)}` on the overlay only; bump
`z-30` → `z-50`; add `role="dialog" aria-modal="true" tabIndex={-1}` to the card.
`BookReaderPage.tsx:421-426` needs the z-index and the ARIA attributes (its backdrop handling is
already correct).

**25. `MediaDetailPage` should use `PageStatus`**
`src/renderer/src/pages/MediaDetailPage.tsx:88-89` — replace the two hand-rolled
`<div className="p-6 text-gray-500">` returns with `<PageStatus>Loading…</PageStatus>` and
`<PageStatus>Not found.</PageStatus>`; the file doesn't import it today, unlike every sibling detail
page.

**26. Remove the last decorative glyphs**
`src/renderer/src/components/ImportDialog.tsx:106`, `ImageBrowseDialog.tsx:157`,
`SettingsPage.tsx:703` — drop the `⚠` prefix (the text is already red / already in context).
`MusicDownloadDialog.tsx:53` — drop `⬇`.
`MangaReaderPage.tsx:782` and `BookReaderPage.tsx:508` — `BarButton label="⛏"` → `label="Mine"`;
every sibling button in those two toolbars uses text.

**27. Guard the yt-dlp close handler**
`src/main/musicDownload.ts:190, 194` — both set `active = null` unconditionally while the `status`
writes beside them are guarded on `status.id !== id`. Guard both on `active?.id === id`, matching
`video/session.ts:106-107`.

**28. Fix the two silent failure modes in writing feedback**
`src/main/englishWriting.ts:42-45` — `clampScore` turns a non-numeric score (a model emitting `"8"`)
into **0** and persists it as the grade. Coerce with `Number(v)` first, and throw for a missing key
rather than defaulting.
`src/main/englishWriting.ts:62-70` — pass `submission` into `parseFeedback` and add
`.filter((c) => submission.includes(c.before))`. Today a hallucinated `before` string is rendered to
the learner as their own sentence.

**29. Make grading reproducible**
`src/main/llm.ts:80-85` — add `temperature: 0` to the Gemini `config` for `completeOnce`. (Gemini
only: the Anthropic path sets `thinking: {type:'adaptive'}` via `buildModelParams`, which requires
temperature 1.) Also raise `maxTokens` at `englishWriting.ts:100` — `modelRewrite` and `overall` are
the last keys in the required JSON, so a long essay truncates exactly those.

**30. `?import=1`**
`src/renderer/src/pages/MediaListPage.tsx` — read `useSearchParams()` and seed `showImport` from
`?import=1` (the one-shot `?tab=` idiom `MediaDetailPage`/`SettingsPage` already use), then point
`HomePage.tsx:631-635`'s chip at `${cfg.basePath}?import=1`. Today it navigates to the same place as
the card title and the user has to find a differently-labelled button.

**31. Show weekly items on Home**
`src/renderer/src/pages/HomePage.tsx:315` — `ChecklistCard` reads only `data.daily`;
`ChecklistStatus.weekly` rides the same query. Add "· 1 weekly open" to the `meta` line.

**32. `nFilters` should count an active search**
`src/renderer/src/pages/MediaListPage.tsx:82` — the empty state at `:304-308` says "clear a chip",
but "Clear all" (`:288-297`) only renders when `nFilters > 0`, and `nFilters` ignores
`debouncedSearch`. Include it, or branch the empty-state copy.

**33. Memoize the transcript panel**
`src/renderer/src/components/video/TranscriptPanel.tsx:61` — wrap the default export in `memo`, and in
`VideoPlayerPage.tsx:799-808` hoist `onSeek`/`onMineCue`/`onClose` into `useCallback`s (the way
`seekTo`/`openMining` already are). Without both, the inner memoized `Row` re-renders every visible
cue on every `uiTime` tick — the exact cost the three-clock comment at `:72-77` says was designed away.

**34. Self-gate the coverage poll**
`src/renderer/src/components/japanese/CoverageSection.tsx:32-36` — `refetchInterval: 1000` with no
`enabled` polls forever whenever a manga Chapters tab is open. Lift `buildingDeck` to the shared
parent (`MediaDetailPage.tsx:222-231` renders both sections) so it and
`MangaChaptersSection.tsx:30-35` observe one gated query.

**35. Give the activity slot a run id**
`src/main/progress.ts:7, 29-41` — add an `id` to `state`, return it from `beginActivity`, and make
`endActivity(id)` a no-op unless it owns the current run. Today a first import finishing wipes
`active: false` out from under a second one that is still running, and `updateActivity`/`imageProgress`
both no-op on `if (state.active)`, so the second import's pill goes dark for the rest of its life.

**36. Extend the export-sanitize test to what it now wipes**
`tests/exportSanitize.test.ts` — `seed()` never inserts `video_file`/`video_cache` rows and the
assertion loop never checks them, though `scripts/sanitizeSql.cjs:54-55` deletes both. Same for the
settings keys `video.dir`, `ffmpeg.path`, `ffprobe.path`, `mokuro.path`, `vertex.region`,
`sync.token`/`sync.device`/`sync.port`, `checklist.seeded`. The code is right; the regression guard
has a hole.

---

**36b. Replace the biased shuffles in the two multiple-choice drills**
`src/renderer/src/pages/JapaneseLoanwordsPage.tsx:55` and
`src/renderer/src/components/japanese/LookalikeDrill.tsx:47-48` both build their options with the
correct answer at index 0 and then run `[...arr].sort(() => Math.random() - 0.5)`. I measured the
resulting distribution over 200,000 trials: for n=4 the first element lands at index 0 **35.8%** of the
time and at index 2 only **15.8%** — the correct answer sits in slot 1 more than twice as often as in
slot 3. Use Fisher-Yates. The rng-injectable implementation at `src/shared/bracket.ts:35` should be
promoted to `@shared/shuffle.ts` and used here (and at the six pool-shuffling sites listed in
`03-educational.md`, plus the 21 duplicated Fisher-Yates copies, if you want the whole sweep).

---

## Deletions

**37. `src/renderer/src/components/EntityPicker.tsx`** — 131 lines, referenced by nothing
(`UniversalPicker` won). Delete the file.

**38. `MediaConfig.icon`** — `src/renderer/src/lib/mediaConfig.ts:10` and `:35` declare it
**required** on both the config and the child-link type; it is populated 20 times with glyphs and a
repo-wide grep for `.icon` outside that file returns nothing. Remove both declarations and the 20
literals.

**39. Five genuinely dead IPC channels** — `characters.cast` (`api.ts:237`), `credits.add` (`:243`),
`mediaCompanies.add` (`:253`), `settings.get` (`:867`), `video.scanStatus` (`:664`). Delete the
api.ts entry, the preload line and the `ipcMain.handle` for each. (The other four dead channels —
`tags.remove`, `gacha.coachThreads`, `gacha.createGoal`, `gacha.updateGoal` — should get UI instead;
see `04-ideas.md`.)

---

## Small but needs a test alongside

**40. Interval fuzz** — `src/shared/srs.ts:104-123`: multiply intervals ≥2 days by
`1 + (rng() - 0.5) * 0.1` with the rng injected, so `previewIntervals` and `tests/srs.test.ts` stay
deterministic. Without it, every cohort introduced by `buildCoreDeck`/`buildPrepDeck`/`setLessonLearned`
stays a cohort forever.

**41. Softer lapse** — `src/shared/srs.ts:101`: `intervalDays: 1` →
`Math.max(1, Math.round(s.intervalDays * 0.4))` (Anki's "new interval 40%"). Today one miss takes a
200-day card back to one day.

**42. Relearning "Easy" does nothing** — `src/shared/srs.ts:83, 88`: both `good` and `easy` call
`graduate(s, s.intervalDays)` when relearning, so Easy is byte-identical to Good. Either give it a
bonus or disable the button while a card is relearning. There is no relearning-Easy test today.

**43. Block duplicate mined cards** — `src/main/repos/japaneseRepo.ts:298-311`: `createCard` does no
existence check, and `MiningPanel`'s green check is a read-only hint from `minedFronts` that is never
enforced at save. Re-mining a word from a later chapter silently creates a second card and both enter
the rotation. Check `minedFronts([front])` in the save path.

**44. Credit the checklist when a chapter is read** — `src/main/ipc.ts` (`manga:markChapterRead` /
`manga:markProgress`): call `checklistRepo.logProgress(mediaId, todayLocal())` on the first `read_at`
transition, mirroring `video:markWatched` at `:378-381`, and suppress `syncMediaProgress`'s write on
that same transition so reading chapter 5 and then pressing Log doesn't land you on chapter 6
(`manga.ts:383-387` vs `mediaProgress.ts:97`). Pin it with a test in `tests/manga.test.ts`.
