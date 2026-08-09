# Database & data integrity review

Scope per assignment: `src/main/db/init.sql`, `src/main/db/schema.ts`, `src/main/db/connection.ts`, `src/main/dict/init.sql`, `src/main/dict/dictDb.ts`, all of `src/main/repos/` (21 files), the importers (`anilist.ts`, `tmdb.ts`, `vndb.ts`, `rawg.ts`, `openlibrary.ts`, `themes.ts`, `atlas.ts`, `chaldea.ts`), and `scripts/sanitizeSql.cjs`.

Method: every schema/connection/dict/sanitize/importer file was read in full directly. All 21 repo files were read in full either directly or by two focused sub-review passes whose claims were spot-verified against the source (including re-running `grep` on the exact lines cited). The two hottest query-plan claims were independently confirmed via `EXPLAIN QUERY PLAN` against the real schema. The full test suite (103 files / 1272 tests) and the two most relevant regression suites (`tests/initLegacyDb.test.ts`, `tests/exportSanitize.test.ts`) were executed and pass.

No findings rise to data-corruption, crash, or security class — this is a well-disciplined codebase (see "What's good" at the end). The findings below are real, verified performance/hygiene defects, ordered high → low.

---

### SRS review-queue queries full-scan instead of index-seek, on both SRS decks

`high` | `verified` | `src/main/repos/japaneseRepo.ts:375`

`reviewQueue()`'s due-card query filters `k.status != 'new' AND k.due_at <= datetime('now')`. The `!=` predicate cannot seek `idx_jp_card_due (status, due_at)` — confirmed via `EXPLAIN QUERY PLAN` against the real schema: the plan is `SCAN k`, not `SEARCH k USING INDEX idx_jp_card_due`. The exact same shape recurs at `japaneseRepo.ts:748` (`stats().dueCount`), `japaneseRepo.ts:824` (`statsDetail().dueForecast`), and `japaneseRepo.ts:467`/`514`/`516` (ghost queue / roadmap counts). The identical bug exists in the parallel English SRS deck: `src/main/repos/englishRepo.ts:108` (`reviewQueue`'s due query) and `englishRepo.ts:176` (`srsStats.dueCount`) filter `status != 'new'` against `idx_en_word_due (status, due_at)` with the same effect — also confirmed via `EXPLAIN`. Since `SrsStatus` is a closed 3-value enum (`'new'|'learning'|'review'`), rewriting as `status IN ('learning','review')` restores the index seek (verified). `reviewQueue()` is the hottest path in both modules — hit every time the Japanese/English review page opens — and `jp_card`/`jp_review_log`-scale tables are exactly what the app expects to grow large for an active user over months/years.
Fix: replace every `status != 'new'` with `status IN ('learning','review')` in japaneseRepo.ts and englishRepo.ts.

### Checklist detected-item queries full-scan their source tables on every page load

`high` | `verified` | `src/main/repos/checklistRepo.ts:321-353`

`DETECT_SQL`'s `count`/`perDay` statements for every detected source (`jp_review_log.reviewed_at`, `jp_lesson.learned_at`, `en_review_log.reviewed_at`, `quiz_session.played_at`, `game_session.started_at`) filter with `date(col, 'localtime') BETWEEN ? AND ?` (confirmed at checklistRepo.ts:324,331,337,343,349). Wrapping the column in `date(...)` prevents SQLite from using `idx_jp_review_log_time`, `idx_en_review_log_time`, `idx_quiz_session_kind`, or `idx_game_session_started` at all — every call is a full table scan regardless of how tight the actual date bound is, confirmed via `EXPLAIN QUERY PLAN`. `checklistRepo.ts:452` (`dailyHistory`'s `logRows`) has a second, independent issue: it filters `WHERE cadence = 'daily'`, the *second* column of `checklist_log(task_key, cadence, period_key)`, so the index can't be seeked there either. `checklist:status` is polled with `staleTime: 0` plus a 60s interval and rendered on HomePage's "Today" band (per CLAUDE.md) — this makes it one of the most frequently executed query groups in the whole app, against tables (`jp_review_log`, `en_review_log`, `checklist_log`) explicitly expected to grow without bound over the app's lifetime.
Fix: pass already-computed local start/end datetimes and compare the raw column directly (`reviewed_at >= ? AND reviewed_at < ?`) instead of wrapping in `date(...)`.

### Every media_item-joining browse query fetches full rows, unbounded, client-paginated only

`high` | `verified` | `src/main/repos/mediaRepo.ts:220`

`list()` — the query behind every media library/filter page — does `SELECT m.* FROM media_item m WHERE ... ORDER BY ...` with no `LIMIT`/`OFFSET` anywhere in the chain (confirmed: `ipc.ts:92` is a bare passthrough, `MediaListPage.tsx:85,88` fetches the whole filtered set via `api.media.list(filter)` and paginates purely client-side with `useIncrementalList`, batch 96). Every row carries the full `synopsis` text and `metadata` JSON blob (parsed per row in `mappers.ts:34`) even though `MediaCard.tsx` never reads either field. The identical shape recurs at `peopleRepo.ts:74` (`credits()` selects `m.*` per credit — unbounded per person, a prolific VA can have hundreds), `characterRepo.ts:48` (`roles()`, same), `companyRepo.ts:44` (`media(id)`, a studio's entire filmography), and `tagRepo.ts:54` (`media(tagId)`, a tag's entire media list). `musicRepo.ts:173-191` (`listTracks()`) has the equivalent pattern for the music library (leaner columns, but still unbounded — relevant at the "100k-row music_track" scale the app is designed for). Search inputs feeding these queries ARE debounced (`useDebouncedValue` in both `MediaListPage.tsx` and `MusicLibraryPage.tsx`), so this isn't a per-keystroke fetch, but every filter/search change still round-trips the entire matching set with no SQL-level cap.
Fix: add `LIMIT`/`OFFSET` (or keyset pagination) to `mediaRepo.list`/`musicRepo.listTracks`, and drop `synopsis`/`metadata` from list-view column sets, fetching them only on the detail page.

### mediaRepo.remove() never sweeps person/character/company rows left with zero remaining credits

`medium` | `verified` | `src/main/repos/mediaRepo.ts:685-688`

`remove(id)` calls `listRepo.removeEntityFromLists('media', id)` then `DELETE FROM media_item`. FK cascades correctly remove the *link* rows (`credit.person_id ON DELETE CASCADE`, `credit.character_id ON DELETE SET NULL`, `media_character.character_id ON DELETE CASCADE`, `media_company.company_id ON DELETE CASCADE` — init.sql:88-94, 109-115, 99-105), but the `person`/`character`/`company` rows themselves are never swept even when a delete leaves them with zero remaining credits anywhere in the library. The only code that ever prunes now-orphaned `person`/`character` rows is each importer's own re-import step (`anilist.ts:150-179` `pruneCharacters`, `tmdb.ts:341-366`, `vndb.ts:194-220`, `themes.ts:267-278` for artists) — scoped to that importer's `external_source` and triggered only by re-importing that *same* title, never by a manual delete, and no equivalent prune exists for `company` anywhere in the app. `peopleRepo.remove()`, `characterRepo.remove()`, and `companyRepo.remove()` all exist and correctly clean up `list_item` (peopleRepo.ts:138-141, characterRepo.ts:108-111, companyRepo.ts:73-76) — the app clearly has the pattern, it's just never invoked from `mediaRepo.remove()`. Over the life of a long-used library this silently accumulates zero-credit "ghost" rows on the People/Characters/Studios browse pages.
Fix: after `mediaRepo.remove()`'s cascade, sweep `person`/`character`/`company` rows with zero remaining `credit`/`media_character`/`media_company` references (mirroring the importers' prune, minus the `external_source` scoping).

### Mined jp_card audio/image files are never deleted when their card/lesson/course is removed

`medium` | `verified` | `src/main/repos/japaneseRepo.ts:178-183, 248-253, 345-349`

`removeCourse()`/`removeLesson()` FK-cascade away `jp_card` rows (and correctly sweep the FK-less `jp_ghost` orphans immediately after — see "What's good"), and `removeCard()` deletes the card directly — but none of the three, nor the `japanese:removeCard/removeLesson/removeCourse` IPC handlers, ever unlink the on-disk files referenced by the removed cards' `audio_path`/`image_path` columns (the mined sentence-audio clip and video-frame screenshot described at init.sql:369-372). This is the one case in the codebase where the feature's own stated rationale — "captured media nobody sees is worse than none" (CLAUDE.md, on why `jp_card.audio_path`/`image_path` exist at all) — is undermined by the delete path: the captured clip silently becomes an orphaned file instead of surfacing anywhere.
Fix: before the cascading deletes in `removeCourse`/`removeLesson`/`removeCard`, collect and unlink the affected cards' `audio_path`/`image_path` files (mirroring `music.ts`'s `unlinkTrackFile`/`pictures.ts`'s `unlinkSync` convention already used elsewhere).

### coachRepo over-fetches large JSON blob columns that the caller never uses

`medium` | `verified` | `src/main/repos/coachRepo.ts:108-114`

`listMessages()` does `SELECT * FROM gacha_chat_message`, pulling `api_blocks` — "the VERBATIM Anthropic content-block array" (per the file's own comment at coachRepo.ts:116-117), which can include large text/thinking blocks and base64 image data — for every message in a thread. `mapMessage()` (coachRepo.ts:94-106) never includes `api_blocks` in the returned `GachaChatMessage`; it is fetched and then discarded on every render of the chat thread. Contrast with `historyWindow()` (coachRepo.ts:153-164), which correctly selects only `role, api_blocks`. The identical pattern applies to `listDocs()` (coachRepo.ts:333-339): `SELECT *` on `gacha_coach_doc` fetches the full imported-chat `content` for every doc even though the sidebar list only renders `title`/`summary` (`content` is read only by the LLM context builder in `coachTools.ts`). Bounded by a single chat thread's/game's row count, so not a scaling emergency, but a clean textbook over-fetch.
Fix: `listMessages` should select the display columns only (drop `api_blocks`); `listDocs` should select `id, game, title, summary, created_at` and fetch `content` lazily only where it's actually consumed.

### tests/exportSanitize.test.ts doesn't exercise every table sanitizeSql.cjs wipes

`medium` | `verified` | `tests/exportSanitize.test.ts` (whole file) vs `scripts/sanitizeSql.cjs:54-55`

`scripts/sanitizeSql.cjs` correctly includes `DELETE FROM video_file` and `DELETE FROM video_cache` (lines 54-55), but `tests/exportSanitize.test.ts`'s `seed()` never inserts a `video_file`/`video_cache` row and its wipe-assertion list (lines 172-184) never checks either table — confirmed by reading the full 200-line test file, neither string appears anywhere in it. The same gap applies to several settings keys the sanitize allowlist correctly wipes but the test's settings seed (lines 100-126) never plants: `video.dir`, `ffmpeg.path`, `ffprobe.path`, `mokuro.path`, `vertex.region`, `sync.token`/`sync.device`/`sync.port`, `checklist.seeded`. The code is correct today; this is a coverage gap in exactly the file whose stated purpose is to catch a future regression in this list (the tables/keys were added post-2026-08-01, after the test's table list was last extended for the video-player feature).
Fix: add `video_file`/`video_cache` rows to `seed()` and their table names to the wipe-assertion loop; extend the settings seed with the missing keys.

### Widespread inconsistency: many 2-statement repo writes aren't wrapped in a transaction

`medium` | `verified` | see citations below

The codebase clearly knows and mostly follows the "wrap multi-statement writes in `db.transaction(...)`" rule (`mediaRepo.create/update`, `musicRepo.logPlay/addPlaylistTracks/reorderPlaylist`, `japaneseRepo.createLesson/submitReview`, `checklistRepo.reorder/logProgress/undoLog`, `gachaRepo.upsertCatalogUnits/applyOwnership`, `linkRepo.addCredit/removeMediaCharacter`, `englishRepo.saveWords/submitReview` all correctly use it), but the following functions run 2 unwrapped statements each, and in three cases a *sibling* function in the exact same file does wrap the same shape correctly, so this reads as an oversight rather than a deliberate choice:
- `mediaRepo.ts:685-688` (`remove`), `peopleRepo.ts:138-141` (`remove`), `characterRepo.ts:108-111` (`remove`), `companyRepo.ts:73-76` (`remove`) — list-cleanup DELETE + entity DELETE.
- `listRepo.ts` `addItem`/`removeItem`/`removeItemByEntity`/`updateItem` (~186-231) — item write + `bump()`'s separate `UPDATE list`, while `listRepo.ts:236-241`'s `reorder()` (same "mutate + bump" shape) correctly wraps it.
- `musicRepo.ts:412-420` (`removePlaylistTrack`), `musicRepo.ts:424-429` (`removePlaylistTrackByTrack`) — DELETE + `bump()`, while `addPlaylistTracks`/`reorderPlaylist` in the same file correctly wrap the identical shape.
- `coachRepo.ts:57-69` (`newThread`) — archive-old-thread UPDATE + insert-new-thread INSERT (a failure between them leaves the game with zero active threads; self-heals on the next `activeThread()` call, but not atomic); `coachRepo.ts:129-148` (`appendMessage`) — message INSERT + `touchThread()` UPDATE.
- `japaneseRepo.ts:178-183`/`248-253` (`removeCourse`/`removeLesson`) — entity DELETE + `jp_ghost` sweep DELETE; `japaneseRepo.ts:345-349`/`433-451` (`removeCard`/`resetCard`) — ghost DELETE + card DELETE/UPDATE.

Real-world impact is low in every instance (idempotent operations, self-healing reads, at worst a stale `updated_at` or a redundant retry) — nothing here can corrupt data — but it's a real, repeated inconsistency worth a cleanup pass.
Fix: wrap each pair in `db.transaction(...)`, matching the sibling functions that already do.

### gachaRepo's catalog upsert/backup-apply do one indexed point-lookup per row instead of a batch preload

`low` | `verified` | `src/main/repos/gachaRepo.ts:268-284` (esp. `:275`), `:318-319`

`upsertCatalogUnits` preloads a `known` `Set` from one upfront query to skip re-checking already-imported rows (gachaRepo.ts:236-244), but for every unit *not* already known it still calls `findManual.get(game, u.kind, u.name)` once per row inside the loop — on a first-time FGO catalog import (~2,500 servants/CEs) that's ~2,500 separate statement executions where a preloaded `Map` would do one. `applyOwnership` has no preload at all: `find.get(...)` (gachaRepo.ts:319) runs once per patch. Each individual lookup IS index-covered (`idx_gacha_unit_external`, confirmed via `EXPLAIN`), and better-sqlite3 is an embedded, synchronous, in-process engine with prepared-statement reuse — unlike a client-server DB, there is no network round-trip cost here, so the real-world cost of ~2,500 extra indexed point-lookups inside one transaction is low single-digit milliseconds, not a genuine bottleneck. Downgraded from a naive "N+1" read given that context.
Fix (optional, low priority): preload manual (`external_source IS NULL`) rows into a `Map` the same way `known` is preloaded, for consistency with the surrounding code's own stated intent.

### peopleRepo.list() without a mediaType filter does a full scan of `credit` — currently unreachable, but a latent trap

`low` | `verified` | `src/main/repos/peopleRepo.ts:32-47`

When called with a `role` but no `mediaType`, `list()` builds `JOIN credit cr ON cr.person_id = p.id AND cr.role = ?` — `credit.role` has no index (only `media_id`/`person_id`/`character_id` are indexed), confirmed via `EXPLAIN QUERY PLAN` to be a full scan of `credit`. Every shipped call site pairs `role` with `mediaType` (which does use `idx_media_type` efficiently, confirmed), so this isn't actively triggered today — but the function's public signature allows the unindexed shape, and `credit` grows with every media import.
Fix: add an index on `credit(role)` if a role-only browse is ever exposed, or narrow the exported signature to always require `mediaType`.

### schema.ts declares `idx_en_word_due` inline with the table, contradicting the enforced migration-ordering rule

`low` | `verified` | `src/main/db/schema.ts:1104`

`enWord`'s index block includes `byDue: index('idx_en_word_due').on(t.status, t.dueAt)` alongside the table definition. Per the rule init.sql itself documents (init.sql:804-809) and `tests/initLegacyDb.test.ts` actively enforces (regex-diffing every `CREATE INDEX` in init.sql against every `ensureColumn` call in connection.ts), this exact index must live ONLY in `runMigrations` (connection.ts:140), created after the 8 SRS columns are ensured — creating it alongside the table is precisely the shape that crashed a live pre-SRS DB on the English-SRS release ("no such column: status"). schema.ts thus misrepresents the real DDL ordering. Practical risk today is low: `drizzle.config.ts` + the `db:generate` npm script exist, but no `./drizzle` output directory exists anywhere in the repo or git history, and no `migrate(...)` call exists anywhere in `src/main` — so nothing generated from schema.ts is ever applied to the runtime DB. Still worth flagging: CLAUDE.md documents `db:generate` as "rarely needed" (implying occasional real use), and this is the exact failure class the codebase already shipped once.
Fix: drop the inline `byDue` index declaration from schema.ts (or add a comment explaining it must never be applied via a generated migration on an existing DB).

### media_image.created_at has no default in schema.ts

`low` | `verified` | `src/main/db/schema.ts:308` vs `src/main/db/init.sql:210`

init.sql defines `created_at TEXT NOT NULL DEFAULT (datetime('now'))`; schema.ts's mirror is `createdAt: text('created_at').notNull()` with no `.default(sql\`(datetime('now'))\`)` — every other table's `createdAt`/similar column in schema.ts carries the matching default. No runtime effect (repos use raw SQL, not the Drizzle query builder), but it's a real, isolated drift in the "types-only mirror" that CLAUDE.md says must stay in sync with init.sql.
Fix: add the missing `.default(sql\`(datetime('now'))\`)`.

### No garbage collection of now-unreferenced content-addressed media/ files after entity deletion

`low` | `verified` | `peopleRepo.ts:138-141`, `characterRepo.ts:108-111`, `companyRepo.ts:73-76`, `gachaRepo.ts` unit/banner removal

Deleting a person/character/company/gacha-unit/gacha-banner row never unlinks its `photo_path`/`image_path`/`logo_path` file under `media/`. Unlike `pictures/` (explicitly "deliberately NOT content-addressed" per CLAUDE.md, where the app DOES delete files on explicit removal), `media/` paths are content-addressed (`dl-<sha1(url)>`) specifically so multiple rows can safely share one downloaded file when they reference the same source URL — blindly unlinking on a single entity's deletion would risk breaking a *different*, still-live row that happens to share the same content-addressed file. Given there's no reference-counting/GC pass anywhere, leaving the file behind is the conservative-safe choice absent one, not a straightforward oversight like the `pictures/` case would be. Still a genuine, unbounded storage-hygiene gap over the life of a long-used library.
Fix (if ever prioritized): a periodic sweep that unlinks any `media/dl-*` file no longer referenced by any `cover_path`/`photo_path`/`image_path`/`logo_path`/`audio_path` column across every table, rather than per-delete unlinking.

---

## init.sql ↔ schema.ts drift (full table-by-table inventory)

All 51 tables in init.sql have a matching `sqliteTable(...)` export in schema.ts and vice versa — no table is missing on either side. Column names, nullability, and defaults match exactly except the two rows below.

| Table | Drift | Verdict |
|---|---|---|
| `media_image` | init.sql: `created_at TEXT NOT NULL DEFAULT (datetime('now'))` (init.sql:210). schema.ts: `createdAt: text('created_at').notNull()`, no `.default(...)` (schema.ts:308). | Real, isolated drift — see finding above. |
| `en_word` | schema.ts declares `idx_en_word_due` as a table-level index (schema.ts:1104); init.sql deliberately does NOT (the index lives in connection.ts's `runMigrations`, by design). | Real drift — see finding above; inert today since drizzle-kit output is never applied. |
| `jp_coverage_word` | init.sql: `WITHOUT ROWID` (init.sql:422). schema.ts has no equivalent declaration. | NOT a defect — confirmed by grepping `node_modules/drizzle-orm/sqlite-core`: this version of drizzle-orm has zero support for `WITHOUT ROWID` tables, so schema.ts categorically cannot represent this. Not actionable. |
| Every other table/column | No drift found. | — |

`drizzle.config.ts` and the `db:generate` npm script exist but produce nothing that is ever applied: no `./drizzle` output directory exists in the repo or its git history, and no `migrate(...)` call exists anywhere in `src/main`. The runtime schema is 100% `init.sql` + `runMigrations`; schema.ts/drizzle-kit is decorative today, which is why the `idx_en_word_due` drift above causes no live-app risk.

## Migrations audit (connection.ts `runMigrations`)

Every column added to a pre-existing table in init.sql has a matching `ensureColumn` call, and every `ensureColumn` call targets a column that genuinely exists in current init.sql (no dead/orphaned migrations found):

| init.sql column (pre-existing table) | ensureColumn present? |
|---|---|
| `character.external_source`, `character.external_id` | Yes — connection.ts:95-96 |
| `credit.importance` | Yes — connection.ts:97 |
| `media_character.sort_order` | Yes — connection.ts:98 |
| `jp_card.onyomi`, `.kunyomi`, `.source_media_id`, `.audio_path`, `.image_path` | Yes — connection.ts:101-107 |
| `jp_course.level`, `.difficulty` | Yes — connection.ts:108-109 |
| `media_item.local_dir`, `.exe_path` | Yes — connection.ts:112,115 |
| `gacha_news.author`, `.sort_order` | Yes — connection.ts:119-120 |
| `theme_song.favorite` | Yes — connection.ts:123 |
| `checklist_task.target` | Yes — connection.ts:125 |
| `en_word.status/.learning_step/.due_at/.interval_days/.ease/.reps/.lapses/.last_reviewed_at` (8 cols) | Yes — connection.ts:128-135 |

**Index/ensureColumn separation rule** ("any INDEX touching an ensureColumn'd column lives in runMigrations, never init.sql"): checked every one of the 59 `CREATE INDEX`/`CREATE UNIQUE INDEX` statements in init.sql against the ensureColumn list above — **zero violations**. The only index that touches ensureColumn'd columns (`idx_en_word_due` on `status, due_at`) correctly lives in connection.ts:140, not init.sql. `tests/initLegacyDb.test.ts:61-84` actively enforces this via a regex diff of both files (not a placeholder test — verified it fails if the rule is broken, and it currently passes). This part of the codebase is genuinely clean.

---

## What's good here

- **Every one of the 8 importers correctly follows "network work first, one synchronous `db.transaction()` last."** Read anilist.ts, tmdb.ts, vndb.ts, rawg.ts, openlibrary.ts, themes.ts, atlas.ts, and chaldea.ts in full — zero `await` calls found inside any transaction callback anywhere. A crash mid-import can never leave a half-written media item.
- **The ensureColumn / index-migration discipline is exemplary and actively tested**, not just documented: `tests/initLegacyDb.test.ts` replays a real pre-SRS legacy DB shape through init.sql + `runMigrations` and separately regex-cross-checks every `CREATE INDEX` in init.sql against every `ensureColumn` call in connection.ts, currently passing with zero violations.
- **`scripts/sanitizeSql.cjs` wipes every secret/machine-path settings key the app actually uses** — cross-checked against every `settingsRepo.get/set` call site in `src/main` plus every literal key in `SettingsPage.tsx`; all API keys, all `*.dir` folder paths, all binary paths, and `checklist.seeded`/`japanese.seeded%` are covered, while intentionally-harmless preferences (`theme`, `score.max`, `*.statuses`, `ui.scale`) are correctly left alone.
- **FK-less "link" columns the codebase deliberately gives no FK are, with one exception (the mined-media files finding above), handled correctly on both ends**: `japaneseRepo.removeCourse/removeLesson/removeCard/resetCard` (japaneseRepo.ts:178-183, 248-253, 345-349, 433-451) all correctly sweep orphaned `jp_ghost` rows, `jp_card.source_media_id`/`checklist_log.media_id` reads are `LEFT JOIN`s that tolerate deletion by design, and every importer's character-prune step (anilist.ts:169-174, tmdb.ts:357-362, vndb.ts:210-215, themes.ts:270-275) cleans up `list_item` before deleting the character/artist row.
- **`dict/dictDb.ts`'s orphan-sweep and version-bump DROP list are exhaustively guarded**: `tests/dictSchemaSync.test.ts` diffs the actual `CREATE TABLE` list in dict/init.sql against both, and independently re-reading both files by hand confirms every one of the 27 dict tables is correctly covered by both mechanisms.
