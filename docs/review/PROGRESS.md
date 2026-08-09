# Review progress log

Resume instructions: this file is the single source of truth for where the review stands.
Each phase appends a block. Partial findings are written into their target doc
(`01-technical.md`, `02-ux.md`, `03-educational.md`, `04-ideas.md`, `05-quick-wins.md`)
as they are produced, so nothing is held only in conversation context.

---

## Phase 0 — baseline (2026-08-08)

### Verification results

| Check | Command | Result |
| --- | --- | --- |
| Typecheck | `npm run typecheck` (node + web tsconfigs) | **PASS**, no output, exit 0 |
| Tests | `npm run test` | **PASS** — 103 files / 1272 tests, 0 failures, 65.23s (exit 0) |

Baseline is green. There is no "finding #1 is the build is broken". Slowest test:
`tests/tokenizer.test.ts` 2.85s (kuromoji dict load); everything else is sub-600ms.

### Size

- 111,215 lines across `src/`, `tests/`, `scripts/` (`*.ts`, `*.tsx`, `*.cjs`).
- `src/` alone: 90,980 lines / 351 files.
- 103 test files under `tests/`.
- Largest files: `db/japaneseSeed.ts` (4086), `shared/types.ts` (2507), `db/japaneseSeed2.ts` (2042),
  `pages/SettingsPage.tsx` (1742), `shared/programming/goCourse.ts` (1685),
  `shared/english/passages.ts` (1292), `shared/english/mechanics.ts` (1233), `db/schema.ts` (1170),
  `shared/programming/cheatsheets.ts` (1026), `pages/MangaReaderPage.tsx` (1005),
  `pages/MediaDetailPage.tsx` (962), `repos/japaneseRepo.ts` (905), `shared/api.ts` (881).

### Repo map

**Main process** (`src/main/`, 50 top-level modules + 4 subdirs)

- Entry/infra: `index.ts`, `ipc.ts`, `files.ts`, `http.ts`, `httpRange.ts`, `progress.ts`, `archive.ts`,
  `openFile.ts`, `updater.ts` + `updaterCore.ts`, `llm.ts`.
- Importers: `anilist.ts`, `tmdb.ts`, `vndb.ts`, `rawg.ts`, `openlibrary.ts`, `themes.ts`, `hltb.ts`,
  `atlas.ts`, `chaldea.ts`.
- Feature modules: `manga.ts`, `mokuro.ts`, `mokuroRun.ts`, `epub.ts`, `music.ts`, `musicDownload.ts`,
  `musicArt.ts`, `pictures.ts`, `gacha.ts`, `gachaCoach.ts` + `coachTools.ts`, `jackett.ts`,
  `qbittorrent.ts`, `gameLaunch.ts` + `gameLaunchCore.ts`, `english.ts`, `englishDrills.ts`,
  `englishWriting.ts`, `jisho.ts`, `tokenizer.ts`, `analyzeText.ts`, `coverage.ts`, `coreDeck.ts`,
  `prepDeck.ts`, `seriesText.ts`, `jpDrills.ts`, `jpFeed.ts`, `jpConfusables.ts`.
- `src/main/video/`: `playability.ts`, `probeParse.ts`, `progressParse.ts`, `names.ts` (pure) +
  `ffmpeg.ts`, `cache.ts`, `session.ts`, `subtitles.ts`, `scan.ts`, `mine.ts`, `index.ts` (IO).
- `src/main/dict/`: `importer.ts`, `dictDb.ts`, `lookup.ts`, `deinflect.ts`, `sentences.ts`,
  `strokes.ts`, `kanjium.ts`, `krad.ts`, `grammar.ts`, `names.ts`, `minimalPairs.ts`,
  `tatoebaAudio.ts`, `wordnet.ts`, `enFreq.ts`, `similarKanji.ts`, `init.sql`.
- `src/main/repos/` (22): character, checklist, coach, company, coverage, english, gacha, gameSession,
  japanese, link, list, mappers, media, music, people, programming, quiz, search, settings, tag,
  theme, tournament.
- `src/main/db/`: `init.sql`, `schema.ts`, `connection.ts`, `japaneseSeed{,2,3}.ts`.

**IPC** — 334 `ipcMain.handle` registrations in `src/main/ipc.ts`, by domain:
japanese 42, gacha 40, dict 40, music 39, english 19, video 16, manga 15, media 11, lists 11,
checklist 10, torrents 7, pictures 7, update 6, tags 6, characters 6, app 6, people 5, games 5,
companies 5, themes 4, quiz 4, settings 3, programming 3, files 3, vndb 2, tmdbTv 2, tmdb 2,
rawg 2, openlibrary 2, mediaCompanies 2, credits 2, anilistManga 2, anilist 2, search 1, hltb 1,
activity 1.

**Database** — `src/main/db/init.sql`: 51 tables, 58 indexes.
media_item, game_session, person, company, character, credit, media_company, media_character, tag,
media_tag, settings, theme_song, theme_artist, media_relation, media_image, list, list_item,
manga_chapter, video_file, video_cache, jp_course, jp_lesson, jp_card, jp_review_log, jp_coverage,
jp_coverage_word, music_artist, music_album, music_track, music_playlist, music_playlist_track,
music_play_log, quiz_session, gacha_unit, gacha_build, gacha_currency, gacha_banner, gacha_news,
gacha_meta, gacha_chat_thread, gacha_chat_message, gacha_goal, gacha_coach_note, gacha_coach_doc,
checklist_task, checklist_log, en_word, en_review_log, en_writing, prog_progress, jp_ghost.

`src/main/dict/init.sql` (separate `dictionaries.db`): 27 tables — dict, term, kanji, pitch, tag, freq,
sentence_bank, sentence, stroke_set, stroke, en_dict, en_lemma, en_synset, en_exc, en_pron,
en_freq_set, en_freq, krad_set, krad, krad_part, krad_component, grammar_bank, grammar_point,
audio_bank, sentence_audio, pair_set, minimal_pair.

**Renderer** — 79 pages in `src/renderer/src/pages/`, ~60 components + 5 component subdirs
(`checklist/`, `english/`, `gacha/`, `japanese/`, `reader/`, `video/`), 19 modules in `lib/`.

Routes in `App.tsx` (~120 `<Route>` lines): 8 chromeless reader/player routes outside the shell
(`/manga/:id/read|book/:chapterId`, `/books/:id/read|book/:chapterId`, `/watch/file|adhoc/:x`,
`/read/manga|book/:token`) and the rest inside the shell:
home/search/stats/checklist; 7 media types × 4 routes (anime + `/anime/seasonal`, `/anime/songs`);
6 people browse routes (`/people /actors /directors /authors /artists /mangaka`) + `/people/:id`;
studios, characters; quiz hub + song/tournament/programming; watch landing; torrents; lists; tags;
music (6) + now-playing; japanese (30 routes); english (8); programming (5); gacha (4); settings;
catch-all → `/`.

**Shared** (`src/shared/`): api.ts, types.ts + 30 pure modules (bracket, checklist, cloze, confusables,
conjugate, dictation, dictContent, epubPaths, era, gacha, kana, keigo, markdown, mediaProgress,
mediaUrl, numbers, pitchTrack, romaji, season, shiritori, similarKanji, srs, strokeMatch, strokes,
subtitles, torrents, transitivity, typing, uiScale) + `english/` (4) + `programming/` (9).

**Scripts**: `bulk-import.cjs`, `dist-win.sh`, `export-library.cjs`, `install-desktop.sh`,
`sanitizeSql.cjs`.

### Next

Phase 1 — parallel recon, 11 subagents in waves of ~4.

---

## Phase 1 — recon wave A (2026-08-08, ~10:04-10:16)

Subagents write raw findings to `docs/review/_raw/NN-*.md`. That directory is INTERMEDIATE —
`01`-`05` in `docs/review/` are the deliverables; `_raw/` can be deleted once they are written.
`_raw/00-self.md` holds the reviewer's own directly-verified findings and is not a subagent file.

Launched (all `model: sonnet`, medium-effort recon; the reviewer verifies at full effort in Phase 2):

| # | Area | Output | Status |
| --- | --- | --- | --- |
| 1 | Main process & IPC | `_raw/01-main-ipc.md` | done — 1 high, 6 med, 3 low |
| 2 | Database & data integrity | `_raw/02-database.md` | running |
| 3 | Security & robustness | `_raw/03-security.md` | done — 1 high, 2 med, 1 low |
| 4 | Renderer perf & state | `_raw/04-renderer-perf.md` | done — 2 high, 4 med, 4 low |
| 5 | UI consistency | `_raw/05-ui-consistency.md` | running |
| 6 | Accessibility & keyboard | `_raw/06-a11y-keyboard.md` | running |
| 7 | IA & daily flows | `_raw/07-ia-flows.md` | running |
| 8-11 | JP / English / Programming / tests+drift | pending | queued behind the wave |

Reviewer's own verified findings so far (in `_raw/00-self.md`): shutdown closes the DB then lazily
re-opens it to record a game session; SRS ignores overdue-ness (CLAUDE.md claims otherwise); 18 MB of
Noto Serif JP ships per build; no route code-splitting (2.4 MB chunk); Home's "Import" chip doesn't
import; `/watch` has no sidebar entry; 4 English test pages missing from the palette; `mediaRepo.list`
unbounded + ships synopsis/metadata; comprehension == deck coverage; the i+1 feed is empty for
beginners; the feed cache busts on every review; the "JLPT test" measures the seed deck;
`MediaConfig.icon` is required-but-dead (20 glyphs); 4 glyph prefixes on error text; `theme` setting
dead; OMDB undocumented; `components/EntityPicker.tsx` (131 LOC) unreferenced.

Cross-checked independently by the reviewer: the dead-IPC-channel list is exactly 9 —
`characters.cast`, `credits.add`, `mediaCompanies.add`, `tags.remove`, `settings.get`,
`video.scanStatus`, `gacha.coachThreads`, `gacha.createGoal`, `gacha.updateGoal`. (A naive grep also
flags the 10 importer channels + `english.saveWords` + `music.logPlay`; those are FALSE POSITIVES —
importers go through `api[source.key]` in `ImportDialog.tsx:24`, the other two are called on a
chained line.)

### Next
Launch recon 8-11 as slots free, then Phase 2 verification.

---

## Phase 1 complete + Phase 2/3 in progress (2026-08-08, ~10:26-10:45)

All 11 recon agents launched. Completed and read: 01 main/IPC, 02 database, 03 security,
04 renderer-perf, 05 UI-consistency, 06 a11y, 07 IA-flows, 10 english.
Still running: 09 japanese, 11 programming, 12 tests/dead-code/drift.

### Deliverables written so far
- `01-technical.md` — architecture / correctness / security / performance / data integrity.
  **The `## Tests` section is a placeholder** pending `_raw/12-tests-dead-drift.md`.
- `02-ux.md` — complete (daily flows, IA, consistency audit, keyboard/a11y).

### Phase 2 verification — what survived, what I changed

I re-read or re-ran every `high` the agents reported. Net: **3 of 7 agent-`high`s survived as high**,
4 were demoted, 1 of my own was promoted to high, and 1 of my own findings was withdrawn.

| Claim | Source | My verdict |
| --- | --- | --- |
| Unbounded `SELECT m.*` on every browse query | recon 02 + me | **high, kept** — the one perf item worth acting on |
| Status/score/favorite need the edit form | me | **high** — `api.media.update` has one caller in the whole renderer |
| In-app manga reading doesn't credit the checklist, and crediting double-counts progress | recon 07 + me | **promoted to high** — I verified the `+1` double-count myself (`mediaProgress.ts:97` vs `manga.ts:383-387`); the recon only found half of it |
| Mouse-only remove buttons (`hidden group-hover:` with no `group-focus-within`) | recon 06 | **high, kept** |
| `progress.ts` activity slot has no run id | recon 01 | **demoted to med** — display lies, nothing corrupts; both imports still complete atomically |
| CBZ zip-bomb OOM | recon 03 | **demoted to med** — app crash, no data loss, no escalation; the realistic trigger is a corrupt/huge entry, not an attack |
| Player context re-renders all consumers 4×/s | recon 04 | **demoted to med** — real and verified, but only while audio plays with a long list on screen |
| `TranscriptPanel` defeats the three-clock design | recon 04 | **demoted to med** — verified verbatim; bounded to the video player with the transcript open |
| `status != 'new'` defeats the SRS indexes | recon 02 | **demoted to med** — I re-ran the plans; real (EN degrades to a full table scan) but sub-ms at realistic deck sizes |
| Checklist `date(col,'localtime')` scans | recon 02 | **demoted to med**, and **extended**: the `perDay` heatmap queries have no date bound at all, unlike their sibling in `japaneseRepo.ts:781-783` |
| `video:markWatched` two-write race | recon 01 | **demoted to low** — the throw path needs a `media_id` that came from the row itself |
| `musicDownload` close-handler `active` race | recon 01 | **demoted to low** — the window is one tick |
| `EntityPicker` has no Escape handler (ranked #3 by recon 05) | recon 05 | **dropped as a fix, kept as a deletion** — the component is unreferenced dead code |
| Reader `BarButton`/`☰` missing `aria-label` | me | **withdrawn** — `BarButton.tsx:19-20` sets `aria-label` *and* `aria-pressed`; I was wrong |

Empirical checks I ran myself (not from an agent): `EXPLAIN QUERY PLAN` on six queries against a
fresh DB built from the real `init.sql`; the 334-channel dead-channel sweep; the font/bundle
measurements; the `.icon` grep; the `api.media.update` caller count.

### Next
Write `03-educational.md` (needs recon 09 + 11), `04-ideas.md`, `05-quick-wins.md`, then
`00-summary.md`. Fill in `01-technical.md`'s Tests section from recon 12.

---

## Phases 3-5 complete (2026-08-08, ~10:45-11:05)

All 11 recon agents finished. All six deliverables written.

| Doc | Status | Words |
| --- | --- | --- |
| `00-summary.md` | done — exec summary, findings-by-area, top 20, open questions | 2.1k |
| `01-technical.md` | done — incl. the Tests section and the CLAUDE.md drift table | 6.0k |
| `02-ux.md` | done | 3.1k |
| `03-educational.md` | done — Japanese, English, Programming | 5.4k |
| `04-ideas.md` | done — 14 ranked, 10 smaller, 10 rejected, 9 to delete | 2.5k |
| `05-quick-wins.md` | done — 46 items | 2.0k |

`git status --porcelain` → `?? docs/` only. **No source file was modified.** No git mutations were run.

### Findings the reviewer produced independently of the agents

Worth recording because they were the highest-ranked items in the end:

1. **The manga double-count.** The IA agent found half of it (reading doesn't credit the checklist).
   I traced the other half: `syncMediaProgress` (`manga.ts:383-387`) and `advanceProgress`
   (`mediaProgress.ts:97`) both move `media_item.progress` and don't know about each other, so the
   documented workaround adds a second chapter. → summary item #1.
2. **The measured shuffle bias.** No agent found it. `[...arr].sort(() => Math.random() - 0.5)` with
   the correct answer at index 0, in `JapaneseLoanwordsPage.tsx:55` and `LookalikeDrill.tsx:47-48`.
   Measured over 200k trials: n=4 → 35.8% / 17.1% / 15.8% / 31.3%. → summary item #4.
3. **`api.media.update` has exactly one caller** in the entire renderer. → summary item #6.
4. **The font measurement** — 496 files / 18 MB / 86% of renderer output. → item #7.
5. **The `EXPLAIN QUERY PLAN` re-runs** that let me demote the two "high" index findings honestly.
6. **`MediaConfig.icon` is required, not merely unrendered** — the part CLAUDE.md gets subtly wrong.

### Things I checked and did NOT report

- `video.markWatched` dropping its return value — the api.ts signature is `Promise<void>`, so it is
  correct by design.
- `JapaneseLeechDrillPage` depending on router `state` — it has a correct `listLeeches()` fallback
  (`:36-41`), so a deep link or refresh degrades gracefully.
- `isRelearning`'s `intervalDays > 0` heuristic — I tried to construct a misclassifying state and
  could not; every writer zeroes it correctly.
- Reader `BarButton`/`☰` missing `aria-label` — my own earlier suspicion, withdrawn: `BarButton.tsx:19-20`
  sets `aria-label` *and* `aria-pressed`.
- `EntityPicker`'s missing Escape handler (a recon agent's #3-ranked cleanup) — the component is
  unreferenced, so it belongs on the deletion list, not the fix list.

### Left explicitly unverified

`regexCourse.ts:288,322`'s "Go 1.22 accepts `(?<name>...)`" claim. The programming agent checked
golang/go#58458 via web and reports it accepted-but-unshipped; there is no Go toolchain on this box,
so I could not reproduce it. Flagged as open question #1 in the summary rather than asserted.

### If someone resumes from here

Everything is written. `_raw/` holds the eleven recon reports plus `00-self.md` (my own verified
findings) and `08-idea-candidates.md` (the pre-cut idea list) — all intermediate, safe to delete once
the six deliverables have been read.
