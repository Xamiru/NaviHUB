# Wrestling section

> Reference detail. The rules an agent must not break live in
> [CLAUDE.md](../../CLAUDE.md#hard-invariants) — this file is the "how and why" narrative.

**Covers** — the Wikipedia-sourced wiki (events / matches / wrestlers), the local PPV collection, and every parser fact that was verified against the live API.

**Key files** — `src/main/wrestling/` (`wikitext.ts` pure, `wikipedia.ts` IO, `importRun.ts`, `looseMatch.ts`), `src/main/repos/wrestlingRepo.ts`, `@shared/wrestling.ts`, `@shared/wikiLinks.ts`, `src/main/video/scope.ts`

**Tests** — `wrestlingImport`, `wrestlingWikitext`, `wrestlingLinks`, `wrestlingVideo`, `era`

---

## Wrestling section

**Wrestling section (2026-08-12)** — `/wrestling`, a Wikipedia-sourced wiki (events / matches / wrestlers) plus a local collection of PPV rips. **Standalone (flavor B), deliberately NOT a MediaType**: ~2,500 events are reference data, and as `media_item` rows they'd flood Home strips, global search, stats, facets and "Plan to Watch".

Promotion vocabulary is code (`src/shared/wrestling.ts`, the `GACHA_GAMES` idiom; ids FROZEN — stored in `wrestling_event.promotion`), so adding a promotion is one entry.

Tables: `wrestling_event` / `_match` / `_match_participant` / `_wrestler` / `_wrestler_alias` / `_stable` / `_stable_member` / `_video`.

**Everything below was verified against the live MediaWiki API, not assumed** — each fact is a test:

1. **event cards are template PARAMETERS, not wikitables** (`|match1=`/`|stip1=`/`|time1=`/`|note1=`), stable across WWE/WCW/NJPW and 25 years even though the template NAME varies three ways — so `parseResultsCard` keys on params, with a raw-wikitable fallback;

2. a **multi-night event is TWO adjacent results templates** each restarting at `match1` (WrestleMania 39), told apart only by `|caption` — reading just the first silently drops a night, hence `findTemplates` (plural) + a running index;

3. **`Category:WWE pay-per-view events` is not the event list** (17 leftovers) — the real tree is its `…by year` subtree, starting at 1985 = WrestleMania I, walked by `enumerateCategory` depth 2 so a by-year parent and a flat category (ECW, NJPW) need no special-casing;

4. **link targets are redirects** — `[[Steve Austin]]`, `[["Stone Cold" Steve Austin]]` and `[[Stone Cold Steve Austin]]` are one person, so `fetchPages` sends `&redirects=1` and every alias is persisted in `wrestling_wrestler_alias`; without it every career stat forks;

5. **`prop=pageimages` returns NOTHING for event articles** (posters are non-free) and a bogus navbox photo for stables — posters come from `prop=imageinfo` on the infobox `|image=` filename, with `?utm_*` stripped or the content-addressed `downloadImage` cache thrashes;

6. `titles=` batches 50/request, so ~2,500 articles is ~50 round trips.

`wikitext.ts` is PURE (fixture-tested, own `NOT_SUPPORTED` block: rumble entrant lists, per-side grouping in multi-ways, managers/seconds, title lineage); `wikipedia.ts` is IO; `importRun.ts` is the `bulkImport.ts` singleton (module status + `wrestling:importStatus` poll, cancel, 10-consecutive-failure bail with resume hint, `beginActivity`/`endActivity` around its own loop, NOT withActivity).

**Re-import is authoritative for canonical fields and preserves the personal layer** by snapshotting ratings/hearts before the card is replaced and restoring them **by match TITLE, not sort_order** (a dark match inserted at position 1 would otherwise shift every rating by one — the themes.ts favorites-survive-a-refresh precedent).

**Wikilinks:** the importer rewrites `[[X]]` into ordinary markdown `[label](wiki:X_Title)`, which `shared/markdown.ts` ALREADY parsed — zero parser change; `Markdown.tsx` gained one optional `linkResolver` prop (http unchanged, resolvable targets become react-router `<Link>`s, unresolved render as quiet text — the RelatedSection greyed precedent).

**`@shared/wikiLinks.ts:wikiHref` percent-encodes `(`/`)`** because markdown's href class is `[^)\s]+` and Wikipedia wrestling titles are full of disambiguators (`Sting (wrestler)`, `Starrcade (1997)`) — unencoded they truncate to `wiki:Sting_(wrestler` and resolve to nothing, silently; measured at 5/21 links on Starrcade.

### Local collection
 new root `wrestling.dir` + `wrestling/` prefix in `absoluteMediaPath`. `video/scan.ts` is **generalized over `video/scope.ts:VideoScope`** (the `listRepo.KIND` fixed-map idiom crossed with `manga.ts:rootInfoFor`) rather than forked — table/ownerCol/root/settingKey come from the map, and the media-scoped exports stay as thin wrappers. A scoped `VideoFileRef` lets `video:openExternal` and `video:markWatched` select the correct table because a file id is only unique within its table. Wrestling files open in the operating system's default video player.

**The highest-severity line in the section:** `video:markWatched`'s `checklistRepo.logProgress` call is guarded on `scope.id === 'video'` — a wrestling row's owner is an EVENT id, and logging it would silently advance whatever media_item shares that number.

Personal layer = match `rating` (0-5 half steps) + `favorite` on all four entities + `ListKind` widened with `wrestlingEvent|wrestlingMatch|wrestlingWrestler` (which is why `wrestling_match.title` is denormalized — `listRepo.KIND` needs one nameCol; `imageCol` became a full SQL expression so a match can say `NULL`, and `tournamentRepo` falls back for kinds the bracket can't render).

Torrent search reuses `TorrentSearchDialog`'s explicit-categories path (`WRESTLING_CATEGORIES` 5060/5000, `wrestlingTorrentQuery` prefixes the ERA name — a 2001 WWE show is "WWF" on every tracker).

Export: the wiki survives (it isn't personal), but `wrestling_video`, `wrestling.dir`, ratings, favorites, `local_dir` and `poster_path` are wiped — posters are non-free fair use and must not travel.

### Chronology and year browsing
 event pages carry Wikipedia's TWO chronologies — the promotion's calendar (prev/next show) and the series (`WrestleMania 2000 -> X-Seven -> X8`) — both **derived from the library by date**, deliberately NOT from the article's own `lastevent`/`nextevent` links, which point at titles that may never have been imported; a missing arrow honestly means "not imported" instead of a dead link. `wrestling_event.series` is populated from the infobox `event` param (verified: WrestleMania/Starrcade/All Out/Wrestle Kingdom all resolve) — **a pre-existing library needs a re-import to fill it**, and until then only the series half of the chronology is empty. Promotion pages have a decade rail plus a year rail (`yearCounts`, its own query so picking 1997 doesn't collapse the rail to 1997); a year narrows its decade rather than stacking, and changing decade clears the year. **`/wrestling/year/:year`** is the cross-promotion "1997 in professional wrestling" view — every promotion's shows for one year, grouped by month with per-promotion accent colors, so the Monday Night Wars read as ONE calendar; its prev/next steps walk `allYears()` (the years actually HELD) rather than `year ± 1`, so a gap in the library skips instead of landing on an empty page. Reached from the hub's year rail, an event page's year chip, and the palette. Undated events are excluded from year queries and the rails (a NULL date must never sweep into a year bucket) but stay reachable from their promotion page.

### Corrections from the first code review (all regression-tested)


**(a)** **wrestler dedup needs its own resolve pass** — the crawl fetches ONLY event articles, so `fetchPages`'s alias map never contains wrestler redirects and `recordAliases` was a silent no-op; the loop now collects the card's participant links, asks `resolveTitles` (a content-free `redirects=1` query) about the ones `knownAliases` doesn't cover, and memoizes into the generic `wrestling_alias` table (which replaced the FK-bound `wrestling_wrestler_alias`, because an alias is learned BEFORE the row it names exists — that same memo makes `eventExists` recognize redirect-titled category members instead of re-fetching them every run).

**(b)** **`saveEvent` reuses match ids** instead of delete-and-reinsert: `list_item` holds match ids with no FK, so fresh AUTOINCREMENT ids silently emptied every wrestlingMatch list; old rows are matched to new by title through a **queue per title**, so a card with two identically-titled matches consumes one each rather than cloning one rating onto both.

**(c)** the **wikitable fallback never worked** — cells are `||`-separated inline and were being split on the single pipe, shredding every row into empty strings; `splitCells` handles the real form.

**(d)** **series-hub expansion was deleted**: the by-year categories already list individual events, and following a hub's wikilinks queued wrestlers/cities/championships — hundreds of pointless full-wikitext fetches and a meaningless progress total.

**(e)** `resolveFiles` now maps `query.normalized` back to the caller's key, or an underscored `|image=` silently yielded no poster.

**(f)** a **second import pass fetches wrestler details** (infobox + lead + Commons portrait via `pageImages`, which works for wrestlers and NOT for events) — without it every wrestler page rendered an empty placeholder forever; params are MERGED across the nested `{{Infobox person|module={{Infobox professional wrestler}}}}` pair (hence `findTemplates`' `nested` option — the outer match would otherwise hide the inner box), `<br>` becomes a newline so multi-valued fields don't run together, and stubs are stamped `detail_fetched_at` even on failure so article-less wrestlers aren't retried forever.

**(g)** `listEvents` is bounded and omits `lead` (a 40-row picker was serializing megabytes of prose).

**(h)** external launch resolves the wrestling scope without touching media/checklist keys.

**(i)** **a results cell does not end at the last wrestler** — it carries a tail (`… defeated [[Becky Lynch]] by [[pinfall]]`, `to win the [[WWE Championship]]`, `in a [[Ladder match]]`) that was being read as participants; because the method is a WIKILINK it looked exactly like a name, so "pinfall" became a wrestler row with its own page and match count. `splitTail` cuts at the first top-level tail marker and `method` (new column → **ensureColumn**, the table predates it) keeps it; `pruneOrphanWrestlers` runs at the end of an import to sweep the rows a re-import stops referencing. The fixtures had no tail at all, which is exactly why 28 green parser tests sat on top of this — every tail test is now a verbatim modern WWE cell. Sides also join as "A, B and C" (never `&`) and the row says **def.** between them instead of relying on colour.

**(j)** **dates come in five forms, not two** — `{{start date}}`, `{{dts}}` (In Your House), plain `April 1, 2001`, a two-night RANGE (`April 1–2, 2023`, `August 31 – September 1, 2024` → first night wins) and a `{{Plainlist}}` of nights; the range form left WrestleMania 39/XL and SummerSlam 2025 with no date at all, i.e. no year anywhere in the app, and `{{Plainlist}}` was being deleted wholesale by stripMarkup because it is a template.

**(k)** **two editor conventions inside result cells**: a conjunction PIPED to a stable's article (`[[Bron Breakker]] [[The Vision|and]] [[Bronson Reed]]`, also nested inside a team's roster) made a wrestler literally named "and"; and an entirely unlinked side (`Kane, Yoshi Tatsu, … and CM Punk`) arrived as ONE 90-character wrestler — `splitNameRun` splits it. All of (i)–(k) were found by sweeping 150 real events across 1985-2025 rather than by reading code; **that sweep is the review step this section actually needs** — its fixtures agreed with each other and hid every one of these.

**(l)** export-library.cjs now **excludes the poster FILES** — nulling `poster_path` left the non-free JPEGs in the bundle.

### Wrestler pages and honours
 the wrestler page is a two-column detail (portrait + facts rail: real name / billed from / debut / height / titles-won-on-a-card) over `Tabs` of **Honours** and **Matches**, with the career record in the subtitle. `wrestling_honour` (brand-new table, no ensureColumn) stores the article's "Championships and accomplishments" section — `parseHonours` reads its two-level bullet list (`* '''[[Org]]'''` then `** item`), strips `<ref>` but KEEPS `<small>` qualifiers (the "vs. Bret Hart at WrestleMania 13" half is the interesting part), drops org headers with no items, and stops at the next `==` heading; capped 30 groups / 40 items. Written by the wrestler-detail pass AFTER `saveWrestlerDetails` (the row must exist first), replaced wholesale on re-import — canonical, nothing personal. `recordFor` counts draws/no-contests in NEITHER column (`won` is only meaningful when `outcome='decision'`), and `championshipsFor` is labelled "titles won on a card" because a results cell says what was at stake, not who left with it.

### Loose matches
 the odd match you own with no PPV behind it — a weekly-show main event, a one-off — the wrestling analogue of a single with no album. Modelled as **a match with `event_id` NULL**, deliberately NOT its own entity, so participants, ratings, hearts, `list_item`, the wrestler pages and the career record all apply with no extra code; `show_label`/`match_date` carry what the event row would have said. That required relaxing NOT NULL on `wrestling_match.event_id` AND `wrestling_video.event_id`, which SQLite cannot do by ALTER — `connection.ts:dropNotNull` is the guarded copy-and-rename (shape-checked, so it runs at most once and is a no-op on fresh installs), pinned by tests/initLegacyDb.test.ts against a DB carrying a rating and a resume position. The two reads that JOIN events (`wrestlerMatches`, `topRatedMatches`) became **LEFT JOIN + COALESCE(e.name, m.show_label)** — an inner join silently drops every loose match from the wrestler's own page. `looseMatch.ts:pickAndCreate` picks the file in main under the same must-be-inside-the-root contract as folder attach. UI: `/wrestling/collection` (Owned events / Loose matches tabs) + a Recently-added strip on the hub. **Weekly-show matches have no Wikipedia source and are NOT importable** — verified: `Clash of the Champions` and `Saturday Night's Main Event` are TV *series* articles, `Raw 1000` carries no event data, per-episode articles don't exist; the only path is manual entry, which is unbuilt.

Routes note: a match has no page of its own (it belongs on its event's card), so `/wrestling/match/:id` is a REDIRECT that resolves the match to its event and lands on `?match=<id>`, which highlights and scrolls the row — that's what list entries point at.

Deferred: stables have tables + a favorite column but no import or page yet; championships/venues scoped out; unlinked wrestlers keep their name in the match title but get no row.
