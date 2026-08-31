# Manga, books and the readers

> Reference detail. The rules an agent must not break live in
> [CLAUDE.md](../../CLAUDE.md#hard-invariants) — this file is the "how and why" narrative.

**Covers** — the manga scanner, EPUB light novels as chapters, in-app mokuro OCR runs, and the reader/Home UI conventions that came out of them.

**Key files** — `src/main/manga.ts`, `src/main/epub.ts`, `src/main/archive.ts`, `src/main/mokuroRun.ts`, `src/renderer/src/pages/MangaReaderPage.tsx`, `BookReaderPage`, `components/reader/`

**Tests** — `manga`, `epub`, `archive`, `mokuro`, `mokuroRun`

---

## Home as a widget dashboard

**Configurable Home (2026-08-16).** Everything below the hero is a widget: shown/hidden and reordered from Home's Customise dialog, persisted as ONE settings row (`home.widgets`).

**The hero is not a widget.** The wall of the user's own covers behind the brand is Home's identity — the user asked for it explicitly — so it stays pinned above whatever is configured, and the dialog says so.

`lib/homeWidgets.ts` holds the catalogue and the pure layout resolution, deliberately outside `HomePage.tsx` so it is testable (`tests/homeWidgets.test.ts`; the renderer has no `.tsx` tests). `parseHomeLayout` is forgiving because that settings row outlives the code that wrote it: unparseable or absent input falls back to the defaults, a key this build no longer knows is dropped, and **a key the build knows but the row lacks is APPENDED, visible** — a widget added in a later release has to appear on its own, or it would be invisible forever to anyone who had ever opened the dialog. Widget keys are therefore FROZEN strings (CLAUDE.md's list).

Layout is a 2-column grid; each widget declares `span: 'full' | 'half'`, so halves pair up and strips take the width. Rendering is a lookup from the stored order into a `Record<HomeWidgetKey, ReactNode>` rather than a chain of JSX, so the order is the only thing deciding what appears where. The widgets' own `mt-8` margins came off — the grid's `gap-6` owns the spacing now.

The dialog uses ▲▼ buttons rather than the `SortableList` drag primitive, on the play-queue precedent: that primitive is for orders persisted per-row on the server with optimistic rollback, and this list is client-side until Save writes one settings row.

## Reader settings drawer

**One drawer, both readers (2026-08-16).** `components/reader/ReaderSettingsDrawer.tsx` is the settings panel for the manga and book readers: a flex SIBLING of the reading column (the `MiningPanel` idiom), not an overlay — opening it narrows the page instead of covering it, so a setting can be watched taking effect on the page while it is dragged. That is why it replaced the bottom-anchored popover, which sat on top of the thing it was changing and had to stay small.

Escape is deliberately NOT wired in the drawer. Both readers already own a keydown chain that closes the topmost thing (help → chapter list → settings → mining panel → back to series), and a `useDialog` there would double-fire it. `DrawerSlider` is the drawer's one new primitive, for the genuinely continuous prefs; everything enumerated stays `PopoverRow` + `PopoverOption`, which `BookSettingsPopover.tsx` still exports for both readers.

`BookSettingsPopover` now exports `BookSettingsGroups` — the controls without a shell. The module owns the controls, the drawer owns the panel.

**Brightness** (both readers, in each reader's own localStorage prefs) applies `filter: brightness()` to the whole reading COLUMN, bars included — a bright bar over a dimmed page is exactly what you do not want at 2am. It is separate from the book reader's `theme`: the paper and sepia pages are bright by design, and turning them down is not the same choice as switching to the black one. **Page gap** (manga, scroll mode only) spaces the pages of a scanned volume; 0 keeps the seamless webtoon look. Both merge over `DEFAULTS` on load, so stored prefs from before they existed pick up the defaults with no migration.

The manga reader's page counter now also flanks the slider: while dragging, the top bar is the furthest thing from your eye.

## EPUB light novels

**EPUB light novels (2026-07-06, streaming hardened 2026-08-31)** live in the manga section as chapters: the scanner treats a `.epub` as one chapter whose `page_count` = spine length ("pages" = spine documents); `manga.ts:listChapterPages` is the format seam (folder → CBZ → EPUB). `src/main/epub.ts` parses container/OPF/nav/NCX with a hand-rolled, test-covered tag scan (no XML dep) behind an mtime cache; `archive.ts`'s `splitArchivePath` recognizes `.epub` segments so the protocol pipes entries directly from yauzl into the Response instead of `Buffer.concat`-ing a whole page. A 128 MiB uncompressed-entry ceiling rejects corrupt or hostile archive entries. `readArchiveEntry` remains only for parsers that genuinely need a complete small document. EPUB_MIME adds xhtml/css/fonts but never scripts, and `.epub` deliberately remains outside `ARCHIVE_EXTS` so a book cannot scan as a CBZ of embedded images.

## In-app mokuro OCR runs

**In-app mokuro OCR runs (2026-08-04)** — the manga reader's mining overlay needs mokuro sidecars, previously always hand-run; now a **Run OCR** button on the Chapters tab orchestrates a **user-installed** mokuro (`mokuro.path` setting, pipx — the ytdlp/ffmpeg posture, wiped in sanitizeSql.cjs; Settings → Integrations card with Save & test → `manga:ocrDetect`). `src/main/mokuroRun.ts` is the video/session.ts singleton (status + `manga:ocrRunStatus` poll via `lib/useOcrRun.ts` — a useUpdateStatus port whose `kick()` every start/cancel must call; `killActiveOcr()` in before-quit): ONE spawn over every eligible volume missing a sidecar (`selectOcrTargets` skips EPUBs + `findSidecar` hits), so the ML model loads once. Load-bearing facts: mokuro accepts `.cbz`/`.zip` directly (own temp dir) and writes `<stem>.mokuro` beside the input — exactly where `findSidecar` looks, so NO extraction code and the reader's mtime cache picks results up unaided; `--disable_html` is mandatory (legacy HTML forces in-place unzip, littering the manga dir); progress arrives as loguru `Processing i/N` lines + tqdm page bars that are **`\r`-separated, so no readline** — `onStreamLines` splits chunks by hand, and the model-download bars ("450M/450M") deliberately fail the `\d+/\d+` page pattern. `manga:ocrOverview` (existsSync-cheap sidecar presence per chapter) drives per-row OCR chips + the button's missing count. Pure parts (`buildMokuroArgs` w/ `assertSafeArgPath`, `parseMokuroLine`, `selectOcrTargets`) tested in tests/mokuroRun.test.ts.

## Reader and Home UI polish

**Reader & Home UI polish (2026-08-04)** — three conventions came out of it. (1) **Book reading themes**: `data-book-theme` (`dark|black|sepia|paper`) on the book reader's viewport scopes `--book-bg/sheet/border/fg/muted/rule/mining` vars in styles.css — CONTENT-level colors, deliberately literal; the Lain `:root` palette and the HUD bars stay untouched in every theme, and `.book-content` reads only the vars. Horizontal mode floats a bordered "sheet" (`--book-sheet`) on the backdrop; vertical stays full-bleed. Serif pref = bundled `@fontsource/noto-serif-jp` (400/600 WOFF2 only through `BookReaderFonts.css`; `BOOK_SERIF_STACK`). All book prefs + defaults live in `components/reader/BookSettingsPopover.tsx` (`BookPrefs`/`BOOK_DEFAULTS`), which also exports the shared popover primitives **`PopoverRow`/`PopoverOption`** used by the manga reader's `DisplayPopover`. (2) **Reader HUD kit**: `components/reader/BarButton.tsx` (the one bar-button — was three copies), `ShortcutHelp.tsx` (`?` opens it in both readers; pages own the state and put it FIRST in their Escape cascade), reader sliders use `accent-accent` (never `accent-current` — a no-op), popovers use the `bg-base-900/95 backdrop-blur` shell, and the `.panel-in` class (motion-gated keyframe in styles.css) animates MiningPanel's mount. Manga: fit/direction live in DisplayPopover (the old always-`active` letter buttons were a bug), double-spread gap is 0 (art joins across the seam; `perPageWidth` = vp.w/2). (3) **HomePage structure**: hero (cover wall + streak chip) → "Today" DoorCard band (Routine/Japanese/English/Play — this IS Home's glow rail, relocated) → Continue (capped 12) → Spotlight (day-stable seed: `daySeed()` hashes today's date, Reroll still randomizes) + rail (TimeStats with `MEDIA_TYPE_COLORS` from `lib/mediaColors` and a Recently-played music card via `playTracks`) → people/recent/favorites (capped 12). A `ResumeStrip` sits above Continue (saved reader/player positions from `media:resumePoints`, linking straight into the reader via `readerPath`, capped 4 — Continue is "in progress by status", this is "you were on page 143"). The old `LibraryGlance` band was deleted 2026-08-08, taking Home's per-type counts and its Import chip with it; import lives on each list page's header (plus the `?import=1` deep link). Home now reads the bounded `media:homeOverview` projection; remaining `qk.media.home(type)` consumers keep byte-identical `{ mediaType }` filters.
