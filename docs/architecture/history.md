# History

> Reference detail. The rules an agent must not break live in
> [CLAUDE.md](../../CLAUDE.md#hard-invariants). This file explains the subsystem's shape and why.

**Covers** — the world-history wiki: the content model and its sourcing rules, the committed catalog and its validator, the lazy main-process index, the timeline, article pages, the personal layer (marks, notes, own links, archive files, personal entities) and the research-session ritual.

**Key files** — `src/shared/history/` (`schema.ts`, `validate.ts`, `calendars.ts`, `timelineLayout.ts`, `search.ts`, `model.ts`, `catalog.ts`, `content/`), `src/main/history/` (`historyService.ts`, `historyIndex.ts`, `historyViews.ts`, `library.ts`, `historyImages.ts`, `historyJobs.ts`, `historyArchiveCore.ts`), `src/main/repos/historyRepo.ts`, `src/renderer/src/pages/History*.tsx`, `src/renderer/src/components/history/`, `.claude/skills/history-era/SKILL.md`

**Tests** — `historyCalendars`, `historyValidate`, `historyContent`, `historyTimelineLayout`, `historySearch`, `historyViews`, `historyRepo`, `historyArchiveCore`, `tests/renderer/HistoryPages.test.tsx`, plus the shared guards (`performanceBoundaries`, `adaptiveNav`, `sidebarSections`, `taskKindSync`, `playerTrackIds`, `sanitizeCoverage`)

## The content rule

Settled with the user on 2026-10-05: **every sentence a reader sees is a verbatim quote from a named source.** No prose is written by NaviHUB or by an agent, and nothing is machine-translated. Quotes in other languages are shown as written; an English translation appears only when a *published* translation exists, as its own cited source.

The schema enforces this structurally. Prose lives only in `Quote.text`. Every other visible string is a name, bibliographic data, or a key from one of the frozen label tables in `schema.ts` (event types, section kinds, relation kinds, roles, link kinds, interpretation topics, position categories, standing labels), which the UI labels. Do not add a free-text prose field to any entity.

Sources are academic books and journals, primary sources, and other encyclopedias and institutions. **Wikipedia and Wikidata are finding aids only**: a research session uses them to find candidates and to follow their footnotes to the real sources, and the validator rejects either host in a cited source or in a quote's provenance. Wikimedia Commons is allowed as the host of images, credited to the holding institution with its license. Research is done by an AI agent, so a publisher that forbids that is never used: OpenStax states its books may not be ingested by large language models (the validator's `no-ai-source` rule rejects `openstax.org`), and themoviedb.org closes its site to Claude agents in robots.txt, so media links take their TMDB ids from Wikidata and carry no TMDB poster or credited character name. The research fetcher refuses any URL whose robots.txt names a Claude or Anthropic agent.

Interpretations record *everything notable, labelled*: scholarly positions, official and national narratives, popular views, revisionist and fringe views. Each position names who holds it and states it in their own quoted words. Its category is always shown. A standing label (mainstream, minority, discredited...) appears only when a quoted source supports it, and fringe and revisionist positions must carry quoted reception, or the validator fails. Contested names are name variants with who uses them, cited.

## Content model

One TypeScript file per entity under `content/<kind>/<slug>.ts`, each `export default defineEvent({...})` (or `definePerson`, `definePeriod`, `definePlace`, `defineSource`, `defineInterpretation`, `defineMedia`). Quotes, claims, sections and course-of-events items live inside the file that owns them. Media files are keyed by the importer identity of a library title (`tmdb-movie-68734`), so curated links resolve against each machine's library by `idx_media_external`.

- **Claims.** Dates, figures and places are `Claim<T>`: one or more sourced alternatives. More than one alternative means the sources disagree, and every value is shown, with who holds it.
- **Dates.** `HistDate.d` is proleptic Gregorian at year, month or day precision, with `approx` ("c.") and `notAfter` (a range of uncertainty). Old Style and Solar Hijri forms are computed for display by `calendars.ts`, never stored: Solar Hijri appears for entities whose regions include `iran`, and Old Style where `julian` is set. The Solar Hijri port follows jalaali-js; dates before Iran adopted the calendar on 31 March 1925 are marked *proleptic*, because the computed date can differ by a day from a commemorated one (5 August 1906 computes to 13 Mordad 1285; Nowruz 1285 fell on 22 March).
- **Slugs** are frozen. `content/ids.lock.json` lists every ref ever committed; the content test fails if one disappears without a redirect, and redirects may not chain. The `my-` prefix is reserved for personal entities.
- **Prominence** (1–3) is curation metadata, not content: it drives semantic zoom on the timeline and the decade lead stories.

## The catalog and the index

`catalog.ts` collects the content with Vite's compile-time `import.meta.glob`, so research sessions add files and never maintain an index. It is imported **only** by `historyService.ts`, which ipc.ts and searchRepo load through a cached dynamic `import()`; the content never parses at launch, and nothing in the renderer may import it (`tests/performanceBoundaries.test.ts`). The build puts it in its own chunk.

The service builds a pure in-memory index (`historyIndex.ts`) from the catalog plus `history_user_entity` rows: timeline entries, part-of children, inbound relations, people's events, interpretations by subject, media links by target and by portrayed person, citation counts and search documents. Personal entities invalidate it on save. The page payloads (`historyViews.ts`) are pure functions of the index plus a `ViewContext` (marks, library lookups, archive rows, a cached-image lookup), so tests feed fixtures with no database.

Global search merges History hits through `searchRepo.globalAll()` (the `search:global` handler); the synchronous `global()` keeps returning `history: []`. The normaliser folds diacritics, Arabic and Persian letter variants, joiners and Persian digits, and compares Persian compounds with and without the joiner or space.

## Pages

- **Landing** (`/history`): a zoomable world timeline with one lane per region (Iran pinned first), global periods as bands, regional periods shaded in their lane, long events as bars and point events as marks. Ctrl+wheel zooms around the pointer; Shift+wheel or drag pans; plain wheel still scrolls the page (the native listener prevents the app's Ctrl+wheel UI zoom only over the track). The List view is the same data as a decade-grouped table for keyboard and screen-reader use. Selecting an event fills a lens and sets the pinned page background to its archival image, the franchise-page treatment. Below it, decade front pages: lead stories, the rest by region, events continuing from earlier decades, born and died, and linked library titles (including those of continuing events).
- **Articles** (`/history/{event,person,period,place}/:id`): a hero over the pinned background, a sticky contents rail, the quoted text, course of events, sub-events, before and after, interpretations, people by side, meanwhile elsewhere or contemporaries, in media (with fact-vs-fiction quotes, portrayals resolved to the library's credited actors, and Import for missing titles), archive, the numbered bibliography and a private note. Footnote markers are numbered by first citation of each source on the page; the popover shows the reference, locator and how the text was copied. Facts sit in a sticky infobox at `xl` and move inline above the article below it.
- **Sources** (`/history/sources`, `/history/source/:id`), **My additions** (`/history/my`), the personal editor (`/history/new/:kind`, `/history/my/:id/edit`) and **Corrections** (`/history/corrections`).
- Library detail pages show a History fact from `history:backlinks`. `historyBacklinkGate.ts` answers it first from the slug lock's `media:` refs and the user's personal links, so a title with neither never loads the catalog.

## Personal layer

Per machine, in `navihub.db`: `history_mark` (read date, favorite), `history_note` (kind `note` or `correction`), `history_media_link` (the user's own title links, cascading with the title), `history_archive` (files under the `history/` prefix, one row per file, `suggestion_key` = `<ref>#<suggestion id>` for research downloads) and `history_user_entity` (personal entities as the content schema's JSON). All are wiped from shared exports. Content refs are strings, so these tables have no foreign key to the content; a ref whose entity is gone is ignored.

The in-app editor writes personal entities that pass the same validator as researched content. Corrections to researched content go through research sessions: a page note marked *correction* collects on the Corrections page, which copies them for the next session.

## Archive

`history.dir` (default `userData/history`) holds attached and downloaded files, one folder per entity (`event-1953-iranian-coup/`). It changes only through Settings → Folders → Move… (`storageMove`, like `media.dir` and `pictures.dir`), and deleting a personal entry deletes its archive rows and copies. Attaching copies the picked file in (NaviHUB owns these copies, unlike Football's in-place attachments) with a SHA-256; research suggestions download over https with per-kind caps through `streamResponseToFile`. Both are tasks (`historyAttach`, `historyDownload`) with status polled through `history:archiveJobs`, and `cancelHistoryJobs()` sits in the before-quit registry right after `cancelActiveFootballSync()`. Recordings play in the global player under the `history-` track namespace (no Like, no Favorite, no play logging); video and documents open in the system's apps; photos open in the lightbox.

Curated hero images, portraits and posters are cached into the `media/` pool on view by `historyImages.ts`, the franchise art pattern, with a descriptive User-Agent that Wikimedia's servers require.

## Research sessions

The `history-era` skill is the ritual: find candidates through finding aids, read real sources, copy quotes verbatim with locator and provenance, write entity files with frozen slugs and lock entries, add archive suggestions with credit and license, and finish with `npm run typecheck` plus `npm run test:main -- tests/historyContent.test.ts` green. Its `tools/` (Python, standard library) cut every quote from a cached copy of the page by start and end phrases, so no quote is typed by hand, and refuse to overwrite a content file the session did not create. The pilot is the 20th century, decade by decade from the 1900s, then the 19th century from the 1800s (added 2026-10-06), about 20–25 events per decade on the first pass, world coverage with extra depth on Iran.

## Later

History quizzes (built only from cited claims; disputed values excluded or shown as disputed) and an offline historical map (CShapes 2.0 country borders 1886–2019, CC BY-NC-SA 4.0, drawn with place coordinates) are planned, not built.
