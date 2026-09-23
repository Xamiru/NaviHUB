# Hobby depth: five feature implementation plan

Status: approved and implemented on 2026-09-23. Typecheck, the full test suite, final focused regression checks and production build passed. Real UI verification remains laptop-only.

The user selected the five priorities in the research shortlist and explicitly does not want spoiler controls. This plan defines the remaining implementation choices for one approval under AGENTS.md's substantial-work rule. Once approved, implement all five slices without asking again at each slice.

## Scope and product decisions

1. Visual-novel routes, chapters, endings and a dated reading notebook.
2. Wrestling story paths with local availability and viewing progress.
3. Local VN text capture connected to the existing offline Japanese tools.
4. VNDB discovery, related works, releases and personal edition tracking.
5. Cross-media guides and explicit links to locally stored soundtracks.

Results, route names, descriptions and guide content remain directly visible. Do not add spoiler preferences, reveal controls or historical viewing cutoffs. Preserve the existing quiz answer-masking behavior; it is unrelated to catalog spoiler preferences.

These features use the established themes, shared controls and normal application shell. No UI previews are requested. Personal data lives in the local database; imported metadata and authored guide content remain usable offline. Network access is limited to explicit discovery, imports and refreshes.

## 1. Visual-novel reading workspace

Add a Reading destination from each VN detail page, with a resume summary, ordered reading plan and dated notebook.

- Create, edit, reorder and remove route/chapter/ending entries. Entries support a parent route, status, personal rating, notes and completion date. Validate parent ownership and prevent cycles.
- Select the current entry and record a save-slot reference plus a short "where I stopped" recap. Show that continuation when returning to the workspace.
- Record notebook entries with a date, optional reading-plan entry, category (reaction, theory, question, quote or recap), text and optional locally attached image.
- Support straightforward chronological VNs as well as branching ones. The workspace works for any title through user-authored entries; curated route templates can be added only where exact title/edition behavior is verified.
- Keep reading completion separate from tracked minutes and the title's existing overall completion status. Reading one ending must not silently complete the title or invent playtime.
- Keep existing general notes accessible. Re-importing metadata cannot overwrite the reading plan, notebook, ratings or resume point.

Success: create two routes and several chapters, complete one route, attach a dated theory to another, navigate away, and return to the saved entry with all state retained.

## 2. Wrestling story paths

Add Journeys to Wrestling, with an index, journey detail and editor. A journey is an ordered sequence of matches, events and standalone story segments.

- Link an imported event or match without copying its canonical results into personal state. Allow manual promo/interview/segment entries with date, contextual notes, source reference and an optional local file.
- Display watched progress, the next unfinished step and local availability. Open files through the current external-player workflow.
- Support dated viewing entries and notes so repeat viewing does not overwrite the first viewing. Distinguish watching a match from watching its entire event or file.
- Expose the already-supported wrestling-file watched state in its file list.
- Ship sourced starter journeys for Undertaker/Triple H and Bret Hart/Shawn Michaels, with concise original context and an editable personal copy. Research every selected beat before shipping; missing imported matches remain honest unresolved entries until linked.
- Personal journeys must survive refreshed cards and source gaps. Where a referenced imported match is removed, retain the journey step's label/context and mark its link unresolved.

Success: start a built-in journey, link an owned file, mark a step watched, add a manual segment, reorder it with the keyboard, and continue after navigating away or reopening the app.

## 3. VN text capture and Japanese study

Add a Text / Study area to the reading workspace. Reuse the existing tokenizer, dictionaries, text analysis, mining draft and review queue.

- Paste text or import a bounded UTF-8 text log, preview it, name the capture and associate it with the VN and optional reading-plan entry.
- Preserve the text and source context locally. Detect identical imports and provide clear handling so accidental re-import does not silently duplicate the corpus.
- Browse captured sentences, perform offline dictionary lookups, and create review cards carrying the sentence and VN source.
- Show captured character counts, vocabulary frequency and coverage calculated from the user's existing learning state. Clearly label these as statistics for captured text, not the entire VN or proof of mastery.
- Extend the existing comprehension/preparation pipeline to use saved VN captures. Deleting or replacing captures invalidates derived coverage so old percentages cannot masquerade as current results.
- Handle unavailable dictionary/tokenizer resources with actionable setup states while keeping captured text readable.

The complete initial capture workflow is paste plus local text-log import. Automatic hooking into a running VN, OCR, OBS/audio capture and third-party accounts are not dependencies of this release; the researched proposal treated a live hook as a later optional enhancement.

Success: import a log, look up a word offline, mine it with sentence context, find the card in the existing review system, and recalculate coverage after replacing the log.

## 4. VNDB discovery and editions

Add Discover to Visual Novels, backed by VNDB's documented API, and extend imported VN detail data.

- Search with title, language, platform, length, rating and selected tags; show explicit loading/error/retry states and bounded pagination.
- Fetch tags, languages, platforms and related VNs. Related titles use the existing library relationship surface where possible.
- List releases with language, platform, date, publisher, official/patch flags and partial/complete status when the source supplies them. Preserve unknown and partial dates honestly.
- Select the release actually being read and keep personal installation/translation/patch notes separately from canonical metadata.
- Retain cached release information offline and show when it was fetched. Discovery and release refresh are explicit user actions; do not imply a live release-notification service.
- Preserve personal choices across metadata refresh. A removed source release remains identifiable from its saved snapshot and can be relinked explicitly.
- Honor partial-refresh invariants: an image-only refresh must not prune tags, relations, characters, releases or personal state. Review the duplicated bulk-import pipeline whenever shared import logic changes.

Existing titles need a VNDB re-import or an explicit metadata/release refresh to receive the newly supported source fields.

Success: find a VN using filters, import it, inspect related works/releases, select an edition, refresh the metadata, and verify the personal selection and notes remain intact.

## 5. Cross-media guides and soundtrack links

Add cross-media guides using the existing curated-franchise pattern, with stable entry keys, sourced relationships, original explanatory notes and exact library matching.

- Support VN, anime, manga, game, movie/TV and book entries with explicit media type. Distinguish an adaptation, sequel, remake, alternate continuity and optional side story.
- Offer authored suggested order and release order, clearly identifying editorial recommendations. Display library ownership/progress and the next relevant entry without changing title progress automatically.
- Ship bounded introductory guides for Science Adventure and When They Cry. Define each guide's coverage explicitly rather than imply an exhaustive franchise catalog. Verify every included entry and ordering explanation during implementation.
- Preserve existing game-franchise routes and frozen IDs. Reuse shared components and matching helpers without making titles from different media types collide.
- Add explicit many-to-many links from local music albums/tracks to library media and, for entrance themes, wrestlers. Show links in both directions, with optional relationship labels and notes.
- Play linked music through the existing player and queue. Retain music track namespaces and `mediaId: null`; associated-work navigation uses the explicit relationship rather than changing the player's anime-specific identity field.
- Linking and unlinking soundtrack records never downloads, retags, moves or deletes audio files. Media/music deletion cleans up relationships; scanning that preserves track IDs preserves their associations.

Success: open a guide containing multiple media types, navigate to matched library entries, link a local soundtrack, play it from the work page, and navigate back from the album to its associated work.

## Implementation sequence and architecture

Implement the VN reading workspace, wrestling journeys, Japanese capture, VNDB discovery/releases, then guides and soundtrack links. Each slice includes database, IPC, UI and focused tests before moving on.

- New personal tables store reading entries, notebook entries, captures, personal release choices, journeys/viewings and soundtrack associations. Final names and normalization follow existing repo conventions; do not store growing collections as opaque settings JSON.
- Keep canonical VNDB release caches and authored guide definitions distinct from personal state. Use transactions for related writes and validate all referenced entity types and owners in main.
- Mirror schema changes in Drizzle and add idempotent migrations for existing-table changes. Wipe personal tables, attachments and paths from sanitized exports, and verify actual exported file inclusion as well as database rows.
- Expose thin typed IPC methods through shared types, NaviApi, main, preload and query keys. Use bounded queries, lazy secondary routes and polled tasks for substantial import/tokenization work.
- Add navigation through adaptiveNav and respect theme semantics, accessible labels, keyboard reorder, error states and Back behavior.
- Update the relevant architecture files with each slice. Update AGENTS.md and CLAUDE.md together only for durable new contracts, including stable content keys where needed.

## Verification and handoff

Run typecheck after each code slice and focused tests for that area. At the end run the full `npm run test` gate and production build once, with reruns only for changes or failures that justify them.

Verification must cover pre-existing-database migration, personal export sanitization, authoritative/partial re-import, missing/deleted source records, foreign-entity rejection, duplicate text imports, keyboard interactions, visible error states, route navigation and the player identity invariants.

Existing focused seams include `initLegacyDb`, `exportSanitize`, `sanitizeCoverage`, `analyzeText`, `dictLookup`, `japaneseRepo`, `coverage`, `wrestlingImport`, `wrestlingVideo`, `franchiseMatch`, `musicRepo`, `ipcContractSync`, `adaptiveNav` and `performanceBoundaries`. Add a dedicated VNDB importer suite: the present coverage tests its bulk query builder, not a full authoritative or partial import. New feature repositories and renderer interactions also need their own behavior tests.

This checkout is the headless VPS. Do not launch Electron's GUI. Report all renderer work as unverified in the real UI and provide the laptop click-through steps for the five success scenarios above. Do not commit, stage, branch or push. Preserve the pre-existing change in tests/renderer/InstalledGamesPage.test.tsx.

## Research starting points

- VNDB API: https://api.vndb.org/kana
- GameSentenceMiner capture workflow: https://docs.gamesentenceminer.com/docs/overview/
- Jiten vocabulary/coverage inspiration: https://github.com/Sirush/Jiten
- WWE Undertaker/Triple H collection: https://www.wwe.com/article/undertaker-triple-h-storied-rivalry-chronicled-in-new-wwe-network-collection
- WWE Bret Hart/Shawn Michaels collection: https://www.wwe.com/wwe-network-november-2017-collections
- MusicBrainz soundtrack modeling: https://musicbrainz.org/doc/Style/Specific_types_of_releases/Soundtrack

These references support research and authored context. They do not imply automated feeds for wrestling stories, cross-media reading orders or soundtrack matching.
