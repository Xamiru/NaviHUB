# Quotes — the quote book

> Reference detail. The rules an agent must not break live in
> [CLAUDE.md](../../CLAUDE.md#hard-invariants) — this file is the "how and why" narrative.

**Covers** — `/quotes`, saving lines from the book reader and the video player, the Quotes
surfaces on title, character and person pages, VN notebook quotes, the Quote of the day widget.

**Key files** — `src/main/repos/quoteRepo.ts`, `src/shared/quotes.ts`,
`src/renderer/src/pages/QuotesPage.tsx`, `src/renderer/src/components/quotes/`,
`src/renderer/src/lib/quoteLinks.ts`

**Tests** — `tests/quoteRepo.test.ts`, `tests/renderer/Quotes.test.tsx`, `tests/homeWidgets.test.ts`

---

## Shape (2026-10-14)

A standalone section (flavor B) for lines worth keeping: a line from a VN, book, manga, film,
anime episode or wrestling promo, linked to where it came from and who said it. The user asked
for it to be as pretty as possible without changing any existing screen, so every surface outside
`/quotes` is additive and appears only once there is something to show.

**Storage.** `quote` holds the line (`text`), optional `furigana` markup and `translation`, a
`locator` ("Chapter 3", "S1 · Episode 5 · 12:34"), a `note`, `favorite`, and `origin`
(`manual`/`book`/`video`, frozen). Themes are free names in `quote_theme` (one row per quote,
`COLLATE NOCASE`). Both are personal and wiped by the export sanitizer.

**Links are FK-less with snapshots.** `media_id`, `character_id`, `person_id` and `wrestler_id`
(at most one speaker, a CHECK) carry no foreign keys, because a re-import prunes characters and a
title can be deleted. `save()` resolves each id and stores its current name in `source_title` /
`speaker_name`; an id that does not resolve is dropped and the typed free text kept. Reads LEFT
JOIN and fall back to the snapshot, so a quote never loses its attribution — it only stops being a
link. The `media_music_link` snap_* columns are the precedent.

**VN notebook quotes are unioned, never copied.** `quoteRepo.list()` appends `vn_notebook` rows
filed under `quote` as read-only items (`origin: 'vnNotebook'`, `id: null`, key `vn-<id>`); a
speaker filter excludes them. They are edited on the VN's reading page. Keys are `q-<id>` and
`vn-<id>` so the two namespaces never collide in a React list or the daily pick.

## Furigana

Japanese text gets readings in the graded-reader notation `漢字[かんじ]` that `parseFurigana`
renders. The Add quote dialog runs the offline kuromoji tokenizer (`japanese:tokenize`) and
`furiganaMarkup()` walks the ORIGINAL text so whitespace and line breaks survive, aligning each
token's reading with `alignFurigana`. The markup is prefilled in an editable Readings field (a
misread name is fixed by hand), saved in `quote.furigana`, and never recomputed on render. Save
refuses markup whose `stripFurigana` no longer equals the text. Notebook quotes have no stored
markup, so `QuoteText` tokenizes them once per text through `qk.quoteFurigana(text)` (outside the `quotes` prefix, so a save never re-tokenizes)
(`staleTime: Infinity`). Quotes are a collection, not a study source: nothing here mines words.

## Capture routes

- **Add quote dialog** (`QuoteDialog`), seeded by whoever opens it: `/quotes` and Ctrl+K "Add
  quote" (`/quotes?add=1`, consumed with a replace), the title page's `ActionMenu`, and the
  "Add quote" header action on character and person pages.
- **Book reader**: a text selection inside the page shows a floating "Save quote" pill (its
  `onMouseDown` prevents default so the selection survives the press); Q and the Quote bar button
  do the same. A library book links its title and records volume and TOC entry; a file opened from
  the OS has no media id (`mediaId` 0 is a sentinel) and becomes free-text source.
- **Video player**: Q or the Quote bar button pauses and seeds the line on screen
  (`activeCues[0]`) plus the second track as translation, with the episode title and timestamp.
  Only `source.mediaId` links a title; wrestling events, clips and football videos are named as
  free text. The dialog renders inside the player root so it shows in fullscreen, and the
  player's key handler returns while it is open (it does not check `[role=dialog]` itself).

## Presentation

`QuoteCard` sets the line in `.quote-serif` (Bodoni Moda, then the system CJK serif — the bundled
Shippori Mincho is a subset and cannot render arbitrary Japanese) behind an accent rule, with the
title's art as a blurred wash (`.quote-art`, thumbnail width). Length picks the type scale
(`quoteScale`). `/quotes` is a CSS-columns wall with shelves by type and favorites, theme chips
and search, and a Quote of the day hero when unfiltered. `QuoteFocus` is a full-screen dialog over
the title's chosen background (sharp) or its cover/portrait (blurred) with arrow-key stepping.
No decorative quotation glyphs: the accent rule does that work.

The title page's **Quotes** tab exists only while the title has quotes (a remembered tab that
vanished falls back to Overview); character and person pages render their Quotes section only when
non-empty. The **Quote of the day** Home widget is the first `defaultHidden` widget: off in a fresh
layout and appended hidden to stored ones, so Home is unchanged until the user enables it in
Customise. The daily pick is FNV-1a of the local date over the key-sorted collection.
