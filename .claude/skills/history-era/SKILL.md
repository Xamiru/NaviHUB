---
name: history-era
description: Research one decade (or deepen one topic) of the NaviHUB History section and commit it as content files — candidates from finding aids, verbatim quotes from real sources with locators, interpretations, media links and archive suggestions — finishing with the content validator green. Use when the user asks to research, add, extend or correct History content.
---

# Researching History content

**The rule that defines this section** (user, 2026-10-05): every sentence a reader sees is a
**verbatim quote from a named source**. You write no prose, no summaries, no captions, no
translations. You choose, order, structure and cite. If you cannot quote it from a source you
actually opened, it does not go in.

Read `docs/architecture/history.md` first. The schema is `src/shared/history/schema.ts`; copy the
shape of existing files under `src/shared/history/content/`.

## 0. Scope and state

- The scope is the 20th century decade by decade from the 1900s and, since 2026-10-06, the 19th
  century decade by decade from the 1800s; about **20–25 events** per decade on the first pass,
  world coverage with **extra depth on Iran**. A deepening session may instead take one topic.
- Several decades may be researched in parallel by subagents that each deliver a session spec;
  the primary agent builds them one at a time (`write_all`), so the slug lock never races, and
  dry-runs a spec first with `checks.py json` plus `tools/validate_spec.ts`.
- If the user handed you corrections (the Corrections page copies them), fix those first.
- Run `npm run test:main -- tests/historyContent.test.ts` to see the current state and warnings.

## 1. Candidates (finding aids only)

Wikipedia year and decade lists and Wikidata are **finding aids**: use them to find events, people,
dates to check and, above all, their footnotes, which point at the real sources. They are never
cited, never quoted, and never the URL a quote was copied from (the validator rejects
`wikipedia.org`, `wikidata.org` and `wikiwand.com`). Keep a Wikidata id in `findingAids.wikidata`
to prevent duplicates.

Pick the decade's events across regions (Iran pinned and deeper), its named periods, and the people
who matter to them. Give each a `prominence`: 1 for the few that define the decade.

## 2. Read real sources

Acceptable: academic books and journals, primary sources (treaties, speeches, letters, decrees,
trial records; public-domain translations from Wikisource, the Avalon Project and similar),
encyclopedias and institutions (Britannica, Encyclopaedia Iranica, national archives, museums,
government historians such as the US Office of the Historian). The user's own books may be
available as EPUB/PDF on the laptop; ask where.

**Never use OpenStax** or any other site whose terms forbid ingestion by large language models or
generative AI (OpenStax pages state it since at least 2026-10; found 2026-10-06). Read a new site's
reuse or attribution notice before quoting it, and skip it when it restricts copying or compiling.
Excluded so far: un.org, USHMM, news.stanford.edu, Sciences Po's Mass Violence & Resistance, BAILII,
habsburger.net, the Griffith Institute, federalreservehistory.org, olympics.com, the Wiener Library, and the robots-closed NYRB, Washington Post, Foreign Policy and
JFK Library.

- **Fetch or open the text and copy from it.** Never type a quote from memory. If a page cannot be
  read, the quote does not go in.
- Record the **locator** (page, section, folio, paragraph or time code) and the **provenance**
  (`via`: local-copy, web, scan, print; `at`: today; `url` for web copies).
- Quote the original language. Add `translation` only from a *published* translation, which is its
  own `Source` with `translationOf` pointing at the original.
- Mark omissions inside a quote with `[…]`. Never alter words, spelling or punctuation.
- Dates, figures and places are `Claim`s with citations. When sources disagree, record every value
  with `heldBy`; never pick one. Old Style dates: store the Gregorian `d` and set `julian: true`.
  A less precise value from another source (`1902` beside `1902-05-21`) is not a disagreement:
  keep the precise one only, or the page marks the date disputed.

### Tools (`tools/`, Python 3, standard library only)

New entities are written by a **session spec** (never in the repo) that imports these tools; run it
with `PYTHONPATH=.claude/skills/history-era/tools`. Keep specs, briefs and notes in
`~/.cache/navihub-history-work/`, not the session scratchpad: `/tmp` is wiped, and on 2026-10-07 it
took every 1800s-1940s spec with it.

- `fetch.py URL [regex] [--max N]` prints a page's paragraphs numbered as `lib` addresses them.
  Pages are cached in `~/.cache/navihub-history` (override: `NAVIHUB_HISTORY_CACHE`) so every later
  cut reads identical text. Some hosts refuse `curl` but accept this client (Iranica). It refuses
  any URL whose robots.txt closes it to a Claude/Anthropic agent by name; never work around that.
- `lib.py`: `page(url, section, base)` registers a page (`base` = index of the body's first
  paragraph, so `para` locators count like a reader); `Q(owner, source, url, i, start, end)` cuts a
  quote from paragraph `i` between two phrases and stops the build if either is missing or
  ambiguous; a start phrase alone is the whole quote. `cite`, `claim`/`alt`/`date`/`dclaim`, `name`,
  `holder` build the rest. `write_all(entities, session_json)` writes the `.ts` files and the lock
  entries, and refuses to overwrite any file this session did not create: from then on the `.ts`
  file is the truth and corrections are edited there by hand.
- `edit.py`: once built, the `.ts` files are the truth and there is no rebuild. `edit.load()` gives
  every committed file as a dict by path, `edit.save(path, entity)` writes one back in the exact
  house format (`python3 edit.py --roundtrip` proves the format), and `recut` (take in an earlier
  sentence of a quote's own paragraph), `register` (reuse an already-cited page with its committed
  paragraph numbering) and `add_quote` (next free id) edit quotes without typing text.
- `checks.py dates <spec>` prints every dated claim beside the words of its cited paragraph;
  `checks.py repeats <spec>` lists quotes repeated or nested on one article page (an entity plus
  the interpretations about it). Read both before the gate. `checks.py json <spec> out.json` dumps
  a spec for `validate_spec.ts`, which runs the real validator over the committed catalog plus the
  spec without writing anything (`node_modules/.bin/vite-node -c vitest.config.ts
  .claude/skills/history-era/tools/validate_spec.ts out.json` from the repo root).
- `commons.py "words"` and `ia.py 'query'` look up Commons images and Internet Archive items with
  their license, creator, holding institution, size and files.
- `gazetteer.py`: `coords(name, iso_country, today)` gives a place its Natural Earth position as cited
  data (by name and country, never by name alone); `geonames_coords(name, iso_country)` falls back to
  GeoNames cities500 (CC BY 4.0, alternate names included; download once into
  `~/.cache/navihub-history/geonames/cities500.txt`) for towns and villages, and `build_spec.py` uses
  it for any non-region place. A battlefield or site gets the position of the town it is named
  after, and the citation names that town. Check every new match by eye: an alternate name can
  belong to another town (Harpers Ferry matched an Athens). The decade builds apply it to every place without
  coordinates, so the map can pin its events; give a place `modernCountry` so it can be found.

### The overview's first quote

It is what a reader sees first on the page: it must say **what this event is**, in English, and
stand alone (subject named, no "He…", "However…", "In that year…" pointing at text the reader has
not seen). An encyclopedia or institution lede is ideal. Chronology lines (including LeMO's German
ones), treaty articles, Hansard procedure, headwords with dates and citation walls are evidence:
they go further down the page, never first (user, 2026-10-07).

### Quality bar (from the 2026-10-07 review of 1800–1969; backlog in docs/review/history-content.md)

- **English sources first.** A German/French chronology (LeMO, napoleon.org) is never the opener,
  the course of events or a side's name; use it only as a second citation when no English source
  states the fact. Persian is welcome in the original (the user reads it).
- **A dated course** for every event with more than one stage; **background → course →
  consequences** all present on prominence-1 and -2 events; one overview quote is too thin.
- **Disputes are only the same fact, at the same precision, from different sources.** A value that
  belongs to a different event (an earlier war, a different treaty) is not an alternative.
- **Never quote a passage that states a different subject's fact** (an act's date for another
  act, "His" pointing at the wrong man): quotes cannot be corrected, so pick another.
- **End quotes before citation parentheses and avoid OCR-damaged text** ("toobtain", "β" for £,
  hyphen-space breaks); re-fetch a clean copy or choose another passage.
- **Participants link to their person page** whenever it exists; every person page has a lede,
  birth and death when any source states them, offices, and a portrait.
- **Native-script names** for every non-English subject (Persian for Iran events, Kurdish,
  Azerbaijani, Arabic, Chinese… as the subject's own).
- **Memoirs and state sites are positions, not narration**: the Shah's books, Khamenei.ir, party
  resolutions go in `official` positions or `in-their-words`.
- **No repetition**: one quote per fact on a page.

## 3. Interpretations

For contested events (causes, responsibility, foreign roles, naming, casualties...), write an
`Interpretation` with every notable position — **including the people the event happened to**
(the Mexican view of 1846, the Japanese of Perry, the African of Berlin 1884, Soviet and Chinese
official narratives) and the classic historiographic debates. A position's statements are its
holders' own words (`official`/`contemporary` never carry a historian's paraphrase); one article
is not sliced into several positions; reception goes on the position it answers; a conspiracy view
is `fringe`, not `popular`; denial ranges stay in the interpretation, never in the infobox figures.
Categories: scholarly, official or national narratives, contemporary, popular, revisionist,
fringe. Each position: holders, their own quoted statements, a `category`.
`standing` only with a supporting quote. **Fringe and revisionist positions need `reception`
quotes** showing how scholars received them. Contested names go on the entity as name variants
with `usedBy` and citations.

### States and themes

- **A state** (`definePolity`, folder `polities/`) is a polity, not a span of time: empire, kingdom,
  republic, colony, protectorate, mandate… (`POLITY_TYPES`). Give it an encyclopedia lede, cited
  founding and end, dated `capitals`, `predecessors`, `partOf` (the empire a colony belonged to),
  `dynasties` (the ruling house periods), dated `area`/`population` figures, an image (flag, emblem,
  a period map) and **`cshapes`** links to the map: list `src/main/history/data/borders.json` units
  by name to find the `set` and `code`, and give a year span when one code covers several states
  (365 is Russia and the Soviet Union). Its native official name goes in `names`.
- **Rulers come from people**: tag each relevant `Office` with `polity: 'polity:<slug>'` (with its
  dated start and end); never list rulers on the state. Events name the states involved in
  `polities`, and a side that is a state gets `polity`.
- **A theme** (`defineTheme`, folder `themes/`) is a thread across decades: framing sections and an
  ordered `thread` of events, people, states and periods, each optionally with a quote saying why
  it belongs and a dated claim. Themes are written after their entries exist.
- Dynasties stay periods (the Qajar dynasty), regimes and eras too (Weimar, Nazi Germany, a reign);
  a period inside a state may name it as `parent`.

### Further reading (other traditions)

A page's quoted sources are mostly US and UK institutions and Iranica; that is the agreed core
(user, 2026-10-08). `furtherReading` on events, people, states, periods and themes lists works
from other traditions so the reader can go further: `{ source: '<source id>', perspective }`,
`PERSPECTIVES` in schema.ts (iranian, arab, turkish, russian-soviet, chinese, japanese,
south-asian, southeast-asian, african, latin-american, caribbean, pacific, central-asian, israeli,
palestinian, european, american, other). These works are **listed, never quoted**: bibliography only, no summary or description.

- Only real works you have verified: a library catalogue record (Open Library, a national library,
  a university catalogue), the publisher's page or a journal's article page, fetched and read.
  Never list a work from memory or from a citation you could not confirm.
- Take the bibliographic fields from that record: title in the original script (Persian, Arabic,
  Russian, Chinese…), author with `nameNative`, publisher, place, year, ISBN/DOI/OCLC in `ids`, and
  `url` + `accessed` for the record you checked. `lang` is the work's language.
- Prefer scholarship by historians of the region and works in its languages (Persian above all
  for Iran); a published English translation is its own source with `translationOf`.
- The perspective is the tradition the work comes from (an Iranian historian writing in Persian
  is `iranian`; a Soviet official history is `russian-soviet`), not its topic.
- Two to five works per leading event, people and states are enough; quality over count.

## 4. Media and archive

- **Media links** (`content/media/<source>-<type>-<id>.ts`, `defineMedia`): use the importer's ids
  (`tmdb` movie/tv, `anilist`, `vndb`, `igdb`/`steam`, `openlibrary`) so the link resolves in the
  user's library. Link kind, optional `portrayals` (person + credited character name), and
  `accuracy` quotes from historians or critics on what the title changed.
- **Archive suggestions** (`archive` on events and people): public-domain or openly licensed
  recordings, footage, photos and documents from institutional archives (Internet Archive, Library
  of Congress, national archives, Commons). Direct https file URL, landing page, holding
  institution, license, size if known. Check the license on the item's own page.
- **Images** (`hero`, `portrait`): Commons or institution files, credited to the holding
  institution with the license from the file's own page. Every event, person and period should
  have one (the user notices gaps, 2026-10-07): a file qualifies when its own page states the
  license and a source (archive, collection or publication; credit that as the institution), even
  with an unknown photographer. With no photograph, use a contemporary print, painting, document,
  map or the main participant's portrait. Keep graphic photographs (corpses, atrocities) off
  heroes: they also show as timeline medallions and cards. Read the license, artist and credit
  through the Commons API (`prop=imageinfo&iiprop=url|extmetadata&iiurlwidth=1280`), store the
  1280 px thumbnail URL without its query string, and pace the requests (Commons answers bursts
  with 429). Set `title` only to the archive's own caption, copied verbatim; otherwise omit it.
- Verify every media link's id with `tools/films.py movie|tv <tmdb id>` (Wikidata's TMDB-id
  properties). **Never fetch themoviedb.org**: its robots.txt closes the site to Claude agents. So
  no `posterUrl` and no portrayal `characterName` from it; a portrayal is just the person ref.
- Give a holder a `discipline` only when a source states it.

## 5. Write the files

- One file per entity, filename = slug (`event`: `1953-iranian-coup`; person:
  `mohammad-mosaddegh`; source: `abrahamian-2008-history-of-modern-iran`). Slugs are frozen.
- Append every new ref to `content/ids.lock.json`. Never remove one; a wrong slug moves through
  `redirects` (no chains).
- `researched` is today's date on every entity you write or change.
- Never use the `my-` prefix (reserved for the user's own entries).

## 6. Gate

```bash
npm run typecheck
npm run test:main -- tests/historyContent.test.ts
node_modules/.bin/vite-node -c vitest.config.ts .claude/skills/history-era/tools/lint_report.ts
```

Both must pass. Read the printed warnings (orphan sources, events without quotes yet). The content
test includes the **quality lint ratchet**: new content must add no lint issue (the report shows
what is new). Fix what you can of the old baseline as you touch pages, then rerun the report with
`--write-baseline` (it only ever shrinks; never add new issues to it).

## 7. Report

In chat: what was added (events, people, periods, interpretations, media links, archive items),
the open warnings, and anything you **dropped because it could not be verified** from a readable
source. The user reviews in `git diff` and in the app, and commits.
