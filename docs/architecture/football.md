# Football Archive

> Reference detail. The rules an agent must not break live in
> [CLAUDE.md](../../CLAUDE.md#hard-invariants). This file explains the subsystem's shape and source decisions.

**Covers** - the nine-competition history almanac, manually refreshed API-Football current desk, team/person/match reference pages, private match journal, manual media shelves, FotMob deep links, and five offline quizzes.

**Key files** - `src/shared/football.ts`, `src/shared/footballQuiz.ts`, `src/main/football/`, `src/main/repos/footballRepo.ts`, `src/renderer/src/pages/Football*.tsx`, `src/renderer/src/components/football/FootballCommon.tsx`

**Tests** - `footballSources`, `footballRepo`, `footballQuiz`, `footballContracts`, `adaptiveNav`, `exportSanitize`, `initLegacyDb`

## Product and identity

Football is a standalone section, not a `MediaType`. Historical seasons and matches would overwhelm the ordinary media library, and their tracking model is different: favorites exist across competitions, teams, people, and matches, while only matches have watched time, a 0-5 half-star rating, and a private note.

The frozen competition keys are `premier-league`, `la-liga`, `serie-a`, `bundesliga`, `champions-league`, `europa-league`, `conference-league`, `world-cup`, and `euros`. The archive preserves the First Division, European Cup, and UEFA Cup lineages. It excludes the Fairs Cup and international qualification.

`football_source_ref` owns provider identities. A source id is always scoped by source; a normalized label alone never merges people. Exact team aliases may resolve when there is one canonical candidate. Ambiguous person identities create `football_conflict` rows and stay out of quizzes until resolved.

The 25-table vertical is split into:

- archive graph: competition, era, season, stage, team, person, tenure, match, lineup, event, standing, and honour;
- source integrity: alias, source ref, assertion, coverage, conflict, import run, and article;
- personal layer: favorite, match journal, media, media link, and external link.

Every coverage facet says `complete`, `partial`, `conflicted`, or `not_supplied`. Missing scorer or lineup children never mean an empty factual set. Domestic history gets a calculated W-D-L/goals/points ledger using the season's points-for-a-win rule, but its ordinal rank remains null unless an official provider supplies a tested rank that includes deductions and tie-breaks.

## Source stack and sync

The first install avoids Wrestling's page-by-page crawl:

1. `engsoccerdata` contributes heterogeneous bulk CSV histories for England, Spain, Italy, Germany, plus European Cup/Champions League results through its archive. England is filtered to `tier=1`; adapters validate the real header of every file.
2. OpenFootball's CC0 tournament repository complements UEFA history. Its JSON and Football.TXT forms have explicit adapters for variable full-time, extra-time, penalty, scorer, own-goal, and stoppage-time representations. A missing scorer line stays `not_supplied`, never zero goals.
3. `international_results` cross-checks World Cup and Euros finals-tournament results and goal scorers. Scorers join only when date/home/away identifies exactly one match.
4. A frozen manifest of exactly nine English Wikipedia pages supplies explicit edition winners, runners-up, competition narrative, revision, license, and attribution. Each entry also freezes its first edition and a conservative row floor; a refresh must satisfy both and cannot shrink the last complete edition set before it may prune. The importer reads source wikitext and stores plain text; remote HTML is never rendered. A winner is never inferred from a calculated table.
5. API-Football supplies manually refreshed current fixtures, status, official tables, top-20 scorers, and changed fixture goal/lineup detail when the configured plan exposes them. The key is sent only as `x-apisports-key`. Provider logos are ignored.

StatsBomb and Wyscout are reduced optional overlay sources on the Sync page. Both require one explicitly selected competition, share the `footballSync` singleton, and are never part of initial installation. StatsBomb reads its official open-data season manifest and then fetches that season's match, event, and lineup JSON. A blank season selects the newest supported men's edition; an explicit season must match the manifest. Wyscout uses the fixed CC BY 4.0 Figshare release: the four domestic leagues are 2017/18, World Cup is 2018, and Euros is 2016. Its event archive is about 74 MB, is bounded at 96 MiB, and the UI warns before the user starts it. Unsupported competition-season requests fail before any canonical writes.

Each completed overlay match writes verified goal and lineup detail. StatsBomb and Wyscout people retain source-scoped ids; a matching normalized name creates a resolution conflict rather than an automatic person merge. Coverage becomes complete only after every match in the selected pack has committed. Cancellation or a failed detail request therefore leaves the last honest coverage state and every previously completed match usable.

`src/main/football/sync.ts` is the one `footballSync` singleton. History, current refresh, optional packs, and lazy entity enrichment cannot overlap. It exposes a polled status and a task-registry projection with cooperative pause/resume/cancel; there is no timer, push channel, or automatic refresh. Cancellation occurs between authoritative slices and on active fetches, so committed slices remain usable.

API-Football's daily budget is persisted in `football.api_quota`. Entitlements are checked per competition-season. The refresh spends requests on the league check and fixtures first, then supported standings and top scorers, then unfinished goal/lineup details. Work that cannot fit stays visible as backlog; the next manual refresh sees incomplete fixture coverage and resumes it.

Wikimedia/Wikidata enrichment is lazy. Opening an entity does not require it, while Save and the explicit reference button can queue it. The article record stores plain text, source URL, revision, license, attribution, and state. Images are accepted only after Commons reports a CC or public-domain license. The optional Player Quiz Pack deterministically selects up to 250 connected players, resolves a unique Wikimedia identity, and stores structured Wikidata senior-club memberships. A career only enters the quiz pool when it has at least four dated, verified, complete spells and no open identity conflict.

## Current desk and media

Scores are always visible. `/football/current` reads the last stored snapshot and never live-polls scores. Entitlement, facet coverage, refresh timestamp, quota, and backlog sit beside the data. When verified events are absent the UI says `Scorer data not supplied`.

Football media is manual only:

- local files must already be beneath `football.dir`; the DB stores a relative path, and `football/` resolves through the guarded `absoluteMediaPath` branch;
- HTTP(S) links open in the browser and are never embedded or downloaded;
- an attachment can link to many entities;
- footage linked to a match derives onto both teams and its competition without duplicate media rows;
- removing an attachment deletes only its DB row, never the underlying file.

FotMob is deliberately a validated external link provider, not a data source. Only pasted `fotmob.com` match, team, player, or league paths are stored and opened in the browser. No FotMob page or unsupported endpoint is scraped, cached, or embedded.

Ordinary and ranked Lists accept `footballCompetition`, `footballTeam`, `footballPerson`, and `footballMatch`. Football kinds are absent from the Tier List form and filters in v1.

## Quiz pack

All five games use the shared `quiz:challengePool` contract and record solo metadata, seed, filters, score policy, and dataset revision:

- `footballChampion`: verified, non-shared, completed edition winners with era-near distractors;
- `footballScoreline`: finished, semantically complete matches; awarded, abandoned, aggregate-only, and conflicted rows are excluded;
- `footballCareerPath`: four to six displayed verified senior spells, loan labels, and an ellipsis when a longer trail is shortened;
- `footballChronology`: five four-edition boards, scored as twenty direct positions;
- `footballPlayerGrid`: a 3x3 player board with at least two answers per cell, three clue families, and a proven nine-player matching. It scores 100 unaided, 40 after a hint, and subtracts 10 only for a known invalid player.

Player Grid is points-ranked. The other four use the shared accuracy comparison and its five-answer minimum. Every builder is seeded and pure; partial, ambiguous, conflicted, or unsupported facts are filtered in the repository before a deal.

## Export posture

Shareable exports always wipe every `football_*` table, Football list items, `football.dir`, the API key/quota, cached paths, URLs, articles, images referenced by the catalog, and the personal journal. This is intentionally stricter than Wrestling because the combined Football catalog includes personal-use and provider-restricted snapshots.
