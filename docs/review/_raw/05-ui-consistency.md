# UI consistency sweep

Scope: `src/renderer/src/pages/` (80 files) + `src/renderer/src/components/` (~101 files incl. `checklist/ english/ gacha/ japanese/ reader/ video/`). Read-only recon; every violation below was confirmed by reading the cited line(s), not inferred from a grep hit alone.

---

## 1. Shared primitives (PageHeader / PageStatus / EmptyState / Section / Tabs / ActionMenu / HubCard / DoorCard / PillGroup / Pager / StatTile / StatInline)

**PageHeader** — used in 65/80 pages. The 15 without it are legitimate: `VideoPlayerPage`/`MangaReaderPage`/`BookReaderPage` (chromeless by design), `HomePage` (custom hero), and the rich two-column entity-detail pages (`CharacterDetailPage`, `PersonDetailPage`, `StudioDetailPage`, `GachaUnitPage`, `MediaDetailPage`, `MusicAlbumPage`/`MusicArtistPage`/`MusicPlaylistPage`, `NowPlayingPage`) which correctly use `EntityHeader`/`MusicEntityHeader` instead. `StudioListPage` gets it transitively via `EntityListView`.

- `src/renderer/src/pages/GachaGamePage.tsx:51-53` — hand-rolled breadcrumb (`<Link to="/gacha" className="mb-4 inline-block text-sm text-gray-500 hover:text-gray-300">← Gacha</Link>`) duplicates `PageHeader`'s `back={{to,label}}` breadcrumb idiom verbatim instead of composing through it → wrap the page's custom hero header section in `<PageHeader back={{ to: '/gacha', label: 'Gacha' }} ... />` (or otherwise route the breadcrumb through PageHeader) instead of hand-writing the Link.

**PageStatus** — used everywhere except:
- `src/renderer/src/pages/MediaDetailPage.tsx:88` — `if (isLoading) return <div className="p-6 text-gray-500">Loading…</div>` → `return <PageStatus>Loading…</PageStatus>` (file doesn't import `PageStatus` at all, unlike every sibling detail page).
- `src/renderer/src/pages/MediaDetailPage.tsx:89` — same for `<div className="p-6 text-gray-500">Not found.</div>` → `<PageStatus>Not found.</PageStatus>`.

**EmptyState + duplicate header button** — Followed everywhere checked (29 files use `EmptyState`); every screen with a header action and a same-verb EmptyState action correctly hides the header one.

**Multiple simultaneous `btn-primary`** — Followed everywhere checked; every file with 2+ `btn-primary` occurrences gates them by tab/phase/ternary so at most one renders at a time.

**DoorCard outside HomePage** — Followed everywhere; `DoorCard` is imported only by `HomePage.tsx`.

**Hand-rolled tabs** — Followed everywhere; every `activeTab`/`setTab` state (`MusicLibraryPage`, `GachaGamePage`, `MediaDetailPage`, `JapanesePitchPage`, `JapaneseKanaPage`, `SettingsPage`, `JapaneseConfusablesPage`, `MediaListPage`) routes through the shared `Tabs` component.

**Hand-rolled "More" menu instead of ActionMenu:**
- `src/renderer/src/components/MusicTrackRow.tsx:118-291` (`TrackMenu`) — a full custom overflow-menu popover: icon-only `⋯` trigger (`title="More"` but no visible "More" text, lines 181-187) instead of ActionMenu's text "More" button, plus its own outside-click effect (131-138) with **no Escape handler** (ActionMenu's does have one) → reuse `ActionMenu`'s trigger/interaction plumbing and add the playlist-specific rows as extra items inside it.

**Hand-rolled Pager:**
- `src/renderer/src/components/ImageBrowseDialog.tsx:198-218` — hand-rolled Prev / `{page} / {lastPage}` / Next for Wallhaven results → replace with the shared `Pager` component.

**Hand-rolled stat tiles** — Followed everywhere for pure display. `GachaGamePage.tsx:147-201` (`CurrencyTile`) and `GachaUnitPage.tsx:139-195` (`InlineNumber`) visually echo `StatTile` but add click-to-edit behavior StatTile doesn't support — documented intentional extensions, not duplicates.

---

## 2. Loading states

Page-level loading/not-found → `PageStatus`, in-section → `<p className="text-sm text-gray-500">Loading…</p>` is followed correctly in the large majority of ~15+ hits checked. Violations:

- `src/renderer/src/pages/MediaDetailPage.tsx:88` — page-level loading, wrong pattern (see §1) → `<PageStatus>Loading…</PageStatus>`.
- `src/renderer/src/pages/MediaDetailPage.tsx:89` — page-level not-found, wrong pattern (see §1) → `<PageStatus>Not found.</PageStatus>`.
- `src/renderer/src/pages/ThemeSongsPage.tsx:332` — `<p className="text-gray-500">Loading…</p>` missing `text-sm` → `<p className="text-sm text-gray-500">Loading…</p>`.
- `src/renderer/src/components/checklist/ChecklistMediaPickerDialog.tsx:86` — `<p className="text-sm text-gray-400">Loading…</p>` uses `gray-400` instead of the convention's `gray-500` → change to `text-gray-500`.

No skeleton loaders or spinner icons substitute for the plain-text convention anywhere in scope; `animate-spin`/`animate-pulse` hits found (`ActivityIndicator.tsx:39`, `MusicDownloadDialog.tsx:52`, `ImportDialog.tsx:169`) are background-job progress indicators, a different idiom, not query-loading states.

---

## 3. Dialogs (`useDialog`, `z-50`, backdrop dismiss, close-button aria-label, role/aria-modal/tabIndex)

21 dialog/popover-shaped components audited. **12 true modals fully compliant on all 5 rules**: `ImportDialog`, `ImageBrowseDialog`, `MusicDownloadDialog`, `TorrentSearchDialog`, `ChecklistAddDialog`, `ChecklistMediaPickerDialog`, `CoachImportDialog`, `GachaBannerDialog`, `GachaGameImageDialog`, `GachaUnitDialog`, `CoreDeckDialog`, `CommandPalette`. **5 popovers fully compliant** on the popover ruleset (Escape via document listener + aria-labels): `UniversalPicker`, `AddToListMenu`, `ActionMenu`, `QueuePanel`, `SubtitleTrackMenu` (minor: has `role="dialog"` + `aria-label` but no `aria-modal`/`tabIndex` — a half-applied marking, not a hard violation since it's popover-class).

Violations:

- `src/renderer/src/components/Lightbox.tsx:60` — close button `aria-label="Close viewer"` instead of the convention's literal `"Close"` → `aria-label="Close"`.
- `src/renderer/src/components/reader/ShortcutHelp.tsx:20` — overlay is `z-40`, not `z-50` → change to `z-50`.
- `src/renderer/src/components/reader/ShortcutHelp.tsx:8-24` — no `useDialog(onClose)` call anywhere (comment at line 6-8 explicitly says Escape/focus are deliberately left to the host reader's own keydown cascade) — a documented deviation, not an oversight, but still means `tabIndex={-1}` at line 25 never receives programmatic focus. Flagged for consistency since every other dialog-shaped component in the app uses `useDialog`.
- `src/renderer/src/pages/MangaReaderPage.tsx:676-677` — end-of-chapter overlay: outer `onClick={() => setShowEnd(false)}` + inner `onClick={(e) => e.stopPropagation()}` is exactly the old/forbidden stopPropagation-on-panel pattern → replace with `onMouseDown={(e) => e.target === e.currentTarget && setShowEnd(false)}` on the overlay only.
- `src/renderer/src/pages/MangaReaderPage.tsx:676` — overlay is `z-30`, not `z-50` → `z-50`.
- `src/renderer/src/pages/MangaReaderPage.tsx:677` — card div has no `role="dialog" aria-modal="true" tabIndex={-1}` and no `useDialog` → add both.
- `src/renderer/src/pages/BookReaderPage.tsx:421-426` — end-of-book overlay: backdrop-dismiss pattern is actually correct (`onMouseDown` + target check, lines 422-424) but overlay is `z-30` not `z-50`, and the card div (426) has no `role="dialog" aria-modal="true" tabIndex={-1}` / no `useDialog` → add role/aria-modal/tabIndex + bump z-index.
- `src/renderer/src/components/EntityPicker.tsx:57-63` — popover has outside-click dismissal only, **no Escape-key handler at all** (every sibling popover — `UniversalPicker`, `AddToListMenu`, `ActionMenu`, `QueuePanel`, `SubtitleTrackMenu` — has one) → add a `keydown`/Escape document listener alongside the existing mousedown one.

Soft deviations (functionally fine, Escape delegated to the host reader's shared keydown cascade instead of a self-contained listener — noted, not counted as hard violations): `ChapterListPopover`/`DisplayPopover` in `MangaReaderPage.tsx`, `TocPopover` in `BookReaderPage.tsx`, `BookSettingsPopover.tsx`.

Icon-only buttons missing `aria-label` (rule 6, app-wide): **0 found** — every icon-only button checked (dialog close buttons, `PlayerIcons`-based transport buttons, `BarButton`, `QueuePanel`'s reorder buttons) sets a matching `aria-label`, aside from the `Lightbox` wording mismatch above.

---

## 4. Forms

4 dedicated form pages found (`find -iname "*Form*"`). 3/4 fully compliant (`PageHeader back="history"`, all-`<label className="label">`, one bottom `btn-primary w-full` Save, no Cancel):

- `src/renderer/src/pages/MediaFormPage.tsx` — clean (header 172, labels e.g. 210/220/230, Save 339, no-Cancel comment at 170).
- `src/renderer/src/pages/ListFormPage.tsx` — clean (header 69, labels 73/84/94, Save 117).
- `src/renderer/src/pages/JapaneseCourseFormPage.tsx` — clean (header 63, labels 67/78/89/98, Save 113).
- `src/renderer/src/pages/JapaneseLessonFormPage.tsx:213` — `<div className="label mb-2">Example sentences / Cards…</div>` is a div-based label (the card-rows group heading), double-applying margin over `.label`'s own `mb-1` — exactly the pattern the rule forbids → `<label className="label">Example sentences / Cards…</label>` (or if it's a group heading rather than a field label, use a non-`.label` heading class instead of masquerading as one).

(`JapaneseMinePage.tsx`/`JapaneseDictionaryPage.tsx` intentionally use `back={{to,label}}` instead of `back="history"` — they're cross-entry-point tool pages, not entity forms, so out of scope.)

---

## 5. Hardcoded palette hex/rgb literals

Root palette (`styles.css:12-41`): base-900 `#0a0f0b`, base-800/700/600/500, accent `#00e05a`, accent-hover `#33ff85`, white `#f0fff4`, gray-50…950. Allowed exceptions confirmed present and are the only ones: `StatsPage.tsx` `TYPE_COLORS`, `shared/gacha.ts` per-game `color`, `MusicPlaceholder.tsx` art. Genuine violations outside those files:

- `src/renderer/src/components/reader/BookSettingsPopover.tsx:33` — `swatch: '#0a0f0b'` duplicates root var `--base-900` as a literal (the file's own comment at line 31 admits it's manually "kept in step") → reference `rgb(var(--base-900))` instead of re-typing the hex. (The other three swatches at lines 34-36 mirror the separate, deliberately-literal `--book-*` content-theme namespace at `styles.css:136-176`, not the root palette — not violations.)
- `src/renderer/src/components/video/SubtitleOverlay.tsx:42` — `CUE_SHADOW = '0 0 3px #000, 0 0 6px #000, 0 2px 2px rgb(0 0 0 / 0.9)'` — raw black literals for the caption text-shadow, bypassing the token system entirely → acceptable as a deliberate exception (subtitle shadow needs true black regardless of theme) but should be commented as such, or expressed via `rgb(var(--base-900) / …)` if base-900 is an acceptable stand-in for black here.
- `src/renderer/src/components/japanese/PitchContourChart.tsx:92` — `fill="rgb(var(--gray-300, 209 213 219))"` — the fallback triplet `209 213 219` is stock Tailwind gray-300, not this project's actual `--gray-300` (`169 211 183`) → fix the fallback to match the real token value, or drop the fallback since `--gray-300` is always defined in `:root`.

---

## 6. `text-gray-600` reserved for decorative/inactive

48 occurrences checked in context. Correctly-decorative uses (favorite/like/watched toggles, ordinal numbers, one self-documented case at `Sidebar.tsx:198-201`) are fine. Readable-copy misuses:

- `src/renderer/src/pages/EnglishMechanicsPage.tsx:258` — category eyebrow label above the quiz prompt → `text-gray-400`.
- `src/renderer/src/pages/EnglishReadingPage.tsx:218` — passage title/level label → `text-gray-400`.
- `src/renderer/src/pages/EnglishReadingPage.tsx:225` — question-kind label → `text-gray-400`.
- `src/renderer/src/pages/ProgrammingQuizPage.tsx:336` — question context label → `text-gray-400`.
- `src/renderer/src/pages/CliPracticePage.tsx:234` — sheet-title label → `text-gray-400`.
- `src/renderer/src/pages/CliPracticePage.tsx:269` — `"Enter reveals the answer"` hint, while the sibling hint 3 lines up (line 266, `"Enter to skip"`) uses `text-gray-500` — in-component inconsistency → align to `text-gray-500`/`400`.
- `src/renderer/src/pages/EnglishVocabQuizPage.tsx:343` — `"Closest in meaning"` instructional label → `text-gray-400`.
- `src/renderer/src/pages/SettingsPage.tsx:1215,1242,1271,1303` — dataset `· {revision}` suffix nested inside a `text-xs text-gray-500` paragraph (`PackRow`, line 1640), darkened below its own parent → `text-gray-500` to match.
- `src/renderer/src/pages/JapaneseFeedPage.tsx:210` — `{item.attribution}` source citation, darker than the `text-gray-400` translation above it (line 208) → `text-gray-400`.
- `src/renderer/src/pages/JapaneseListenPage.tsx:318` — `"Recording: {attribution}"` citation → `text-gray-400`/`500`.
- `src/renderer/src/pages/JapaneseDictionaryPage.tsx:365` — stroke-count/grade line, darker than the sibling onyomi/kunyomi lines just above (359, 361) which use `text-gray-500` → align.
- `src/renderer/src/pages/JapaneseShiritoriPage.tsx:188` — live `"chain {n}"` stat, inline with a `text-gray-400` prompt on the same line (186) → `text-gray-400`.
- `src/renderer/src/pages/GachaCoachPage.tsx:308` — persistent (not hover-only) `~$cost` estimate in the chat footer → `text-gray-400`/`500`.

---

## 7. No emoji / decorative glyphs

`⏮`/`⏭`/`❚❚` confirmed fully purged (only surviving mentions are a code comment in `PlayerIcons.tsx:4-5` explaining the ban). The allowed set (`✕ ✓ ○ ★ ♥ ← ▸ ▾ ›`, 91 occurrences checked) is used correctly everywhere — no decorative/bullet misuse. Genuine violations:

- `src/renderer/src/pages/MangaReaderPage.tsx:782` — `<BarButton label="⛏" ... title="Mine words (M)" .../>` — every sibling `BarButton` in the same toolbar uses text (`"+"`, `"−"`, `"?"`, `"Single"/"Double"/"Scroll"`) → change `label="⛏"` to a text label (e.g. `"Mine"`).
- `src/renderer/src/pages/BookReaderPage.tsx:508` — same `label="⛏"` on the book reader's mining toggle (sibling `BarButton`s there use `"Aa"`, `"?"`) → same fix.
- `src/renderer/src/pages/SettingsPage.tsx:703` — `⚠ This yt-dlp is over 3 months old…` → drop the glyph, keep the text (or use `.chip`/color to signal warning state instead of a unicode prefix).
- `src/renderer/src/components/ImageBrowseDialog.tsx:157` — `⚠ {error}` → drop the glyph.
- `src/renderer/src/components/ImportDialog.tsx:106` — `⚠ {error}` → drop the glyph.

Not flagged (read as functional HUD controls with matching `aria-label`, consistent with the reader-HUD carve-out): `VideoControls.tsx:220` (`⛶` fullscreen, `aria-label="Fullscreen"`), `NowPlayingBar.tsx:184` (`☰` queue toggle, `aria-label="Queue"`).

---

## 8. `.pill`/`.pill-active` and `.chip-toggle`/`.chip-toggle-active` vs hand-rolled toggles

34 correct usages confirmed (`CheatsheetsPage.tsx:60`, `JapaneseKanaPage.tsx:484/498/570`, `KeigoDrill.tsx`, `NumbersDrill.tsx:54`, `MediaListPage.tsx:358`, etc. — the pattern is well established). Hand-rolled equivalents that should use these classes instead:

- `src/renderer/src/components/MediaFilterPanel.tsx:157` — "Unrated only" toggle: `` `mt-2 chip ${value.unrated ? 'bg-accent text-white' : 'hover:bg-base-600'}` `` → `chip-toggle`/`chip-toggle-active`.
- `src/renderer/src/components/MediaFilterPanel.tsx:188` — season multi-select grid, same ad-hoc pattern → `chip-toggle`/`chip-toggle-active`.
- `src/renderer/src/components/MediaFilterPanel.tsx:212` — tag-mode any/all pair, same ad-hoc pattern → `pill`/`pill-active` (single-select).
- `src/renderer/src/components/MediaFilterPanel.tsx:236` — tag multi-select grid, same ad-hoc pattern → `chip-toggle`/`chip-toggle-active`.
- `src/renderer/src/pages/MediaListPage.tsx:180` — Filters toggle: `` `btn py-1.5 ${showFilters || nFilters ? 'bg-accent text-white' : 'bg-base-700 text-gray-300 hover:bg-base-600'}` `` → `chip-toggle`/`chip-toggle-active`.
- `src/renderer/src/pages/MediaListPage.tsx:187` — Favorites-only toggle, same ad-hoc pattern.
- `src/renderer/src/pages/ThemeSongsPage.tsx:183` — Filters toggle, same ad-hoc pattern — notably the **same file** correctly uses `pill`/`pill-active` for status filters at lines 158/168, so this is an in-file inconsistency.
- `src/renderer/src/pages/ThemeSongsPage.tsx:197` — OP/ED single-select pair, ad-hoc `bg-accent text-white` vs `bg-base-700` → `pill`/`pill-active`.
- `src/renderer/src/pages/ThemeSongsPage.tsx:208` — "Favorite songs" toggle, ad hoc.
- `src/renderer/src/pages/ThemeSongsPage.tsx:217` — "Favorite anime" toggle, ad hoc.
- `src/renderer/src/components/TorrentFilterBar.tsx:125` — tracker multi-select chips: `` `chip text-xs ${on ? 'bg-accent/10 text-accent' : 'text-gray-400 hover:text-white'}` `` → `chip-toggle-active`.
- `src/renderer/src/components/TorrentSearchDialog.tsx:99,105` — "Suggested"/"All categories" pair, ad-hoc `chip` + `bg-accent/10 text-accent` → `pill`/`pill-active`.
- `src/renderer/src/components/TorrentResultsPanel.tsx:63` — "Relevant only" toggle, ad hoc → `chip-toggle`/`chip-toggle-active`.
- `src/renderer/src/components/ImageBrowseDialog.tsx:117` — Wallhaven/TMDB source pair: `` `px-3 py-1 rounded-md text-sm ${source === key ? 'bg-base-700 text-white' : 'text-gray-400 hover:text-white'}` `` → `pill`/`pill-active`.

Not flagged (progress-bar tracks, avatar/cover rounded-full, static non-toggling color chips, transport-control circles, tab underlines, full-width row selectors) — correctly out of scope for this rule.

---

## 9. Focus styles (single global `:focus-visible` rule)

Followed everywhere — checked all 181 files. `grep -rn "focus:ring\|focus-visible:\|focus:outline\|focus:border"` over pages+components returns **zero matches**; the only rule is `src/renderer/src/styles.css:56` (`:focus-visible { @apply outline-none ring-2 ring-accent/70; }`). One incidental `focus-within:` hit, `src/renderer/src/components/QueuePanel.tsx:179` (`group-focus-within:flex`), only toggles hover-reveal visibility and adds no ring/border, so it doesn't conflict.

---

## 10. Animations gated by `prefers-reduced-motion`

All 6 custom `@keyframes` in `styles.css` (`panel-in`, `lain-flicker`, `lain-glitch`, `lain-pulse`, `lain-blink`, `stroke-draw`) are applied only inside `@media (prefers-reduced-motion: no-preference)` blocks. `StrokeOrderDiagram.tsx:66`'s inline `animationDelay` is harmless (acts on a class that's itself gated). Two stock-Tailwind `animate-*` utilities skip the app's own `motion-safe:` convention (elsewhere used correctly, e.g. `MangaReaderPage.tsx:997` `motion-safe:animate-pulse`, `ActivityIndicator.tsx:39` `motion-safe:animate-spin`):

- `src/renderer/src/components/ImportDialog.tsx:169` — `` `... ${pct == null ? 'w-full animate-pulse' : ''}` `` → prefix with `motion-safe:`.
- `src/renderer/src/components/MusicDownloadDialog.tsx:52` — `<span className="chip animate-pulse" ...>` → prefix with `motion-safe:`.

No inline `style={{ animation: ... }}` or CSS-in-JS animations bypassing `styles.css` were found.

---

## Highest-value cleanups

Ranked by how much they affect how the app actually feels/behaves (accessibility and functional bugs first, then visual noise, then polish):

1. **`src/renderer/src/pages/MangaReaderPage.tsx:676-677`** — end-of-chapter overlay uses the explicitly-forbidden `stopPropagation`-on-panel backdrop pattern (the exact anti-pattern the dialog convention was written to replace) instead of `onMouseDown` + target check on the overlay, is `z-30` not `z-50`, and its card has no `role="dialog"`/`aria-modal`/`tabIndex`. This is the most-used reader in the app hitting three dialog rules at once.
2. **`src/renderer/src/pages/BookReaderPage.tsx:421-426`** — same end-of-book overlay: `z-30` not `z-50`, missing `role`/`aria-modal`/`tabIndex`, no `useDialog`.
3. **`src/renderer/src/components/EntityPicker.tsx:57-63`** — the only popover in the app with zero Escape-key handling; a real, user-visible keyboard-trap inconsistency next to five siblings that all support Escape.
4. **`src/renderer/src/pages/MediaDetailPage.tsx:88-89`** — the single most-visited page in the app (every media detail view) hand-rolls its loading/not-found state instead of `PageStatus`, breaking the one convention this page most needed to inherit.
5. **`src/renderer/src/pages/MangaReaderPage.tsx:782`** and **`BookReaderPage.tsx:508`** — the mining-panel toggle is a bare `⛏` emoji glyph in the app's two flagship reader HUDs, in a codebase that did a "strict purge" of exactly this class of glyph everywhere else; every sibling button in the same toolbar uses text.
6. **`src/renderer/src/pages/ThemeSongsPage.tsx:158/168` vs `:183/197/208/217`** — the same file uses the correct `pill`/`pill-active` classes for status filters and ad-hoc `bg-accent text-white` toggles two sections later for Filters/OP-ED/Favorites — a visible in-page inconsistency, not just a cross-file one.
7. **`src/renderer/src/components/MediaFilterPanel.tsx:157/188/212/236`** — the filter panel that's reused across every single media list page (anime/manga/games/movies/etc.) hand-rolls all four of its toggle groups instead of `chip-toggle`/`pill`, so the inconsistency is multiplied across the whole library section.
8. **`src/renderer/src/components/Lightbox.tsx:60`** — `aria-label="Close viewer"` vs the app-wide literal `"Close"` convention; small, but Lightbox is the one full-screen image modal used from every media detail page's Wallpapers/Fan Art section.

## What's good here

- The dialog convention is genuinely well-followed: 12 of 14 true full-page modals are 100% compliant on all five rules (`useDialog`, `z-50`, correct `onMouseDown`-on-overlay backdrop dismiss, `✕`/`aria-label="Close"`, `role="dialog" aria-modal="true" tabIndex={-1}`) — e.g. `src/renderer/src/components/ImportDialog.tsx:34,63-66,70-73,78-84` and `src/renderer/src/components/gacha/GachaUnitDialog.tsx:25,74-77,81-91` are copy-paste-identical in structure despite being written for unrelated features.
- Focus styling is completely centralized: a `grep -rn "focus:ring\|focus-visible:"` across all 181 renderer files under review returns zero hits outside the single rule at `src/renderer/src/styles.css:56` — no component silently fights or duplicates it.
- The `⏮`/`⏭`/`❚❚` unicode-transport-glyph ban has held: zero live occurrences anywhere in `pages/`/`components/`, only a comment in `src/renderer/src/components/PlayerIcons.tsx:4-5` documenting why they were replaced by SVGs.
- Forms are near-perfectly consistent: 3 of 4 dedicated form pages (`MediaFormPage.tsx`, `ListFormPage.tsx`, `JapaneseCourseFormPage.tsx`) have zero deviations from `PageHeader back="history"` / `<label className="label">` / single bottom `btn-primary w-full` / no-Cancel, including a code comment at `MediaFormPage.tsx:170` that explicitly documents *why* there's no Cancel button.
- `EmptyState`'s "hide the header button with the same verb" rule was checked against every screen using it (29 files) with zero violations — genuinely followed everywhere, not just in the common case.
