# 06 — Accessibility & Keyboard Review

Scope: shortcut map/collisions, Escape cascades, focus management, keyboard
reachability of primary actions, unlabelled icon-only controls, palette
contrast, `prefers-reduced-motion` coverage. Read-only recon, no app launch
(headless box) — all findings are from static code reading + computed WCAG
contrast math, cross-checked against the codebase's own `:root` comment claims
(which independently verified correct — see Contrast section).

## Shortcut table

| Page / component | Keys | Guarded against inputs? | Notes |
|---|---|---|---|
| `pages/MangaReaderPage.tsx` window keydown (:382-472) | ←/→ turn page (direction-aware), Space/PageDown next (Shift=prev), PageUp prev, ↑/↓ scroll (vertical mode only), Home/End first/last, S/D/V mode, F cycle fit, R direction, C cover offset, O OCR overlay, M mine panel, `?` help, +/−/0 zoom, Esc/Backspace | Yes — bails on `HTMLInputElement`/`HTMLTextAreaElement`/`isContentEditable` (:385-386) | Escape cascade (:459-467): help → chapterList → settings → showEnd → panel → exit. Single switch, no duplicate listeners. |
| `pages/BookReaderPage.tsx` window keydown (:271-339) | ←/→ prev/next section, Space/PageDown scroll fwd (Shift=back), PageUp back, ↑/↓ small scroll, Home/End, V vertical toggle, T TOC, +/− font size, M mine, `?` help, Esc/Backspace | Yes (:273-275) | Cascade (:326-334): help → toc → settings → showEnd → panel → exit. |
| `pages/VideoPlayerPage.tsx` window keydown (:440-569) | Space/K play-pause, ←/→ seek 5s (Shift=1s, Ctrl=cue-step), A/D cue step, R replay cue, J/L seek 10s, `,`/`.` frame-step when paused, ↑/↓ volume, `M` (upper) mute, `[`/`]` rate, `\` reset rate, `s` subs on/off, `b` dual subs, `S` (upper) cycle track, `-`/`=` sub offset, `t` transcript, `m` (lower) mine panel, `c` capture, `f` fullscreen, `n`/`p` episode nav, Home/End seek, 0-9 seek-%, Esc/Backspace | Yes (:441-444) | Cascade (:553-563): fullscreen → menu → transcript → panel → exit. **No `?`/ShortcutHelp on this page** (only reader with ~25 bindings and zero in-app reference). |
| `components/CommandPalette.tsx` (:89-106, :177-188) | Ctrl/Cmd+K toggle, bare `/` opens, ↑/↓ navigate, Enter open | `/` guarded (:97-99); Ctrl+K unguarded (fine — modifier combo, standard convention) | Mounted only in App's shell branch (App.tsx:399) — never mounted alongside reader/video shortcuts. |
| `lib/player.tsx` / `components/NowPlayingBar.tsx` | none — OS media keys via MediaSession API (player.tsx:402-440) | n/a | `queue.length > 1` guards (documented in CLAUDE.md) prevent OS media-key skip on single-track queues. |
| `pages/JapaneseQuizPage.tsx` (:247-267) | 1-4 answer, Enter advance | Yes (:250-252) | |
| `pages/JapaneseReviewPage.tsx` (:182-204) | Space/Enter reveal, 1/2 ghost answer, 1-4 grade (`GRADE_KEYS`, :41) | Partial — checks `HTMLInputElement`/`HTMLTextAreaElement` only, **not** `isContentEditable` (:185) | Typed-answer `<input>` (:461-473) owns its own Enter and is excluded by the `HTMLInputElement` check; no `contentEditable` element exists anywhere in the renderer (verified by grep), so the gap is currently inert. |
| `pages/SongQuizPage.tsx` (:~137-147) | 1-4 answer, Enter advance | Yes | |
| `pages/TournamentPage.tsx` (:238-252) | 1/←, 2/→ pick, Backspace undo, Space play/pause (only when `player.track.id` starts with `tourney-`) | Yes | |
| `pages/ProgrammingQuizPage.tsx` (:211-220) | 1-4, Enter | Yes | |
| `pages/EnglishVocabQuizPage.tsx` / `EnglishMechanicsPage.tsx` / `EnglishReadingPage.tsx` | 1-4, Enter | Yes | Byte-identical guard/pattern across all three. |
| `pages/EnglishSpellingPage.tsx` | delegates to `TypedDrill`'s `<input onKeyDown>` (Enter submits) | n/a — element-level, real `<input>` | |
| `pages/CliPracticePage.tsx` (:250-...) / `pages/JapaneseKanaPage.tsx` (:342-349) | per-keystroke via a focused `<input>`; Enter/Space reveal-or-skip | n/a — element-level, real `<input>`, so global `/` and Ctrl+wheel handlers correctly ignore keystrokes | |
| `components/japanese/TypedDrill.tsx` (:160-170) | Enter submits/continues | element-level `<input onKeyDown>` | Shared engine behind CLI practice, kana/names drills, English spelling. |
| `components/reader/ShortcutHelp.tsx` | none of its own — Esc is handled by the **host page's** cascade (comment at :6-8); backdrop mousedown + `✕` button close it | n/a | `role="dialog" aria-modal="true"` (:24-26) but does **not** use `useDialog` — see Focus management. |
| `App.tsx` (:123-137) | Ctrl+wheel = UI zoom | excluded on reader routes (`isReader` guard, :124) | Wheel event, not keydown — no collision surface with any keydown handler. |

### Collisions

**Zero live collisions found.** Every candidate two-listeners-same-key scenario
investigated turned out to be either not co-mounted or explicitly guarded:

- `CommandPalette`'s bare-`/` listener vs. the per-keystroke typing drills
  (kana/CLI/spelling) — ruled out: all of them type into a real `<input>`,
  which `CommandPalette`'s guard explicitly bails on (`CommandPalette.tsx:98`).
- `MiningPanel`'s two lookup `<input>`s (`reader/MiningPanel.tsx:220`, `:465`)
  vs. the host reader's window-level shortcut switch — ruled out: each input
  calls `e.stopPropagation()` on every keydown *in addition to* the reader's
  own `HTMLInputElement` guard (belt-and-suspenders, and correct — React's
  synthetic `stopPropagation()` also halts the underlying native event before
  it reaches the `window`-level listener).
- `SubtitleTrackMenu`'s capture-phase Escape listener
  (`video/SubtitleTrackMenu.tsx:68`, `document.addEventListener(..., true)`)
  vs. `VideoPlayerPage`'s own Escape cascade — ruled out: the capture-phase
  `stopPropagation()` fires before the page's bubble-phase `window` listener,
  so only one handler ever runs per Escape press. The two `menuOpen` state
  variables (`VideoPlayerPage.tsx:262` and `VideoControls.tsx:78`, same name,
  different components) look like a duplicate-state bug at first read but are
  kept in lockstep by `VideoControls.tsx:79-82`'s `setMenu()` wrapper — not a
  bug.
- `ActionMenu`'s document-level Escape listener vs. `useDialog`'s window-level
  Escape — ruled out: grepped every `ActionMenu` call site; none render inside
  a `useDialog`-based dialog, so the "one Escape press closes two layers at
  once" scenario never occurs in the current codebase.

## Escape cascades

All three immersive surfaces implement the cascade as a single ordered
if/else chain inside one `window` keydown handler (not competing listeners),
which is the right shape — one Escape press, one deterministic effect:

- `pages/MangaReaderPage.tsx:459-467` — help → chapterList → settings →
  showEnd → panel → exit. Correct, matches the documented "ShortcutHelp first."
- `pages/BookReaderPage.tsx:326-334` — help → toc → settings → showEnd →
  panel → exit. Correct, and the settings popover (`BookSettingsPopover`) has
  no Escape handling of its own by design — it relies on the page's
  `settingsOpen` branch, same idiom as `ShortcutHelp`.
- `pages/VideoPlayerPage.tsx:553-563` — fullscreen (checks
  `document.fullscreenElement` directly, not local state) → menu →
  transcript → panel → exit. Correct and well-commented: fullscreen goes
  first specifically because the browser *also* handles Escape natively for
  fullscreen, so ordering it first prevents a double-effect.

`low` | `suspected` | `src/renderer/src/pages/VideoPlayerPage.tsx:553-563` — the Escape cascade has no `helpOpen` branch because the page has no shortcut-help overlay at all, unlike the two readers (`?` opens nothing here) → Fix: either add a `ShortcutHelp` panel + `?` binding for the video player's ~25 bindings, or note the omission is intentional.

## Focus management

`lib/hooks.ts:45-66` (`useDialog`) does exactly four things: on mount, moves
focus into the panel via `panel.focus()` **unless** focus is already inside
it (the comment at :43-44 explains this defers to an inner `autoFocus`
input, which wins because `autoFocus` applies at commit, before the effect
runs); attaches a `window`-level `Escape` listener that calls `onClose`; on
unmount, removes that listener and restores focus to whatever element was
`document.activeElement` at open time. It does **not** implement a focus
*trap* (Tab can still leave the panel and reach elements behind the overlay)
— that's a real, if minor, gap given `aria-modal="true"` is the convention
on every dialog (e.g. `components/CommandPalette.tsx:199-202`,
`components/Lightbox.tsx` — grep confirms `role="dialog"` on 15 components).

`high` | `verified` | `src/renderer/src/components/reader/ShortcutHelp.tsx:23-27` — renders `role="dialog" aria-modal="true" tabIndex={-1}` but never calls `useDialog` (confirmed: it's the only `role="dialog"` component besides `SubtitleTrackMenu` not using it) and never moves focus into the panel or restores it — `?` opens the overlay and focus stays wherever it was, so Tab can walk into background reader controls (e.g. `MangaReaderPage`'s chapter-title button, still in the DOM and focusable) while a modal-labelled overlay sits on top → Fix: either call `useDialog(onClose)` here too, or drop `aria-modal`/`role="dialog"` since the component is explicitly "dumb on purpose."

`low` | `verified` | `src/renderer/src/components/video/SubtitleTrackMenu.tsx:77-79` — `role="dialog"` with no `aria-modal`, no focus-in, no `useDialog` → this is functionally a popover (backdrop + Escape-only, matching the app's popover convention exactly), so the mismatch is cosmetic: `role="dialog"` on an element that's designed and behaves like a menu → Fix: use `role="menu"` (its `TrackRow` buttons already read naturally as `menuitem`s) or drop the role.

Every dialog component this review checked (`TorrentSearchDialog`, `ImageBrowseDialog`, `MusicDownloadDialog`, `gacha/CoachImportDialog`, `gacha/GachaBannerDialog`, `japanese/CoreDeckDialog`, `ImportDialog`, `checklist/ChecklistMediaPickerDialog`, `gacha/GachaUnitDialog`, `gacha/GachaGameImageDialog`, `checklist/ChecklistAddDialog`) correctly pairs `role="dialog" aria-modal="true"` with `useDialog(onClose)` — 13/15 `role="dialog"` components are compliant; the 2 exceptions are cited above.

Popovers correctly follow the "Escape-only, never steal focus" convention:
`components/ActionMenu.tsx:30-44`, `components/QueuePanel.tsx` (document
Escape listener + `group-focus-within`, see below),
`components/reader/BookSettingsPopover.tsx`, and `SubtitleTrackMenu.tsx`
were all grepped for `autoFocus`/`.focus()` — none found. Good.

## Keyboard reachability of primary actions

`high` | `verified` | `src/renderer/src/pages/MediaDetailPage.tsx:538-546` (also `:608-616` and `:644-652`) — "Remove cast member" / "Remove character" buttons are `className="absolute ... hidden group-hover:flex ..."`: `display:none` until the ancestor `.group` is `:hover`ed, with **no `group-focus-within:flex`**. A keyboard-only Tab pass can never focus these buttons (a `display:none` element is unfocusable), so removing a cast/character credit from a media detail page is completely mouse-only → Fix: add `group-focus-within:flex` alongside `group-hover:flex`, exactly as already done correctly at `components/QueuePanel.tsx:179` (`hidden shrink-0 items-center group-hover:flex group-focus-within:flex`) — the fix pattern already exists in the same codebase.

`high` | `verified` | `src/renderer/src/components/MediaImagesSection.tsx:98-108` — same bug: the wallpaper/fan-art "Remove image" button is `hidden group-hover:block` with no `group-focus-within` variant, so it's keyboard-unreachable → Fix: same as above.

`med` | `verified` | `src/renderer/src/components/MediaImagesSection.tsx:82-85` — the gallery tile itself (`<div className="group relative ... cursor-zoom-in" onClick={() => setLightboxAt(i)}>`) has no `role`, `tabIndex`, or `onKeyDown`; opening an image in the Lightbox from the Wallpapers/Fan Art grid has no keyboard path at all → Fix: make the tile a `<button>` or add `role="button" tabIndex={0}` + Enter/Space handling.

`med` | `suspected` | `src/renderer/src/components/video/SubtitleOverlay.tsx:111-122,134-142` — subtitle word `<span>`s declare `role="button"` but `tabIndex={-1}` and no `onKeyDown`, so the ARIA role is decorative: they are never reachable via sequential Tab and not operable via Enter/Space even if focused programmatically. Mining/lookup from subtitles is mouse/trackpad-only → Fix: this is likely accepted given the feature is inherently spatial (which word under the pointer), but if any keyboard path is ever wanted, `tabIndex={-1}` is the blocker to remove first.

`low` | `suspected` | `src/renderer/src/components/reader/OcrOverlay.tsx:47-71` and `src/renderer/src/components/reader/BookContent.tsx:102-113` — same "tap a word/paragraph to mine" pattern as `SubtitleOverlay`, but without even the `role="button"` gesture — plain `<div>`s with only mouse handlers. Consistent across all three mining surfaces (manga OCR, EPUB paragraphs, video subtitles), so this reads as a deliberate design choice for a mouse+keyboard desktop app (you cannot "tab to the word you want" without knowing which one in advance) rather than an oversight — flagged for completeness per the review brief, not as a clear defect.

Everything else checked (quiz MC options across all quiz pages, `TypedDrill`
Continue button, `NowPlayingBar`/`NowPlayingPage` transport, `ActionMenu`
items, chapter/TOC popovers) renders real `<button>`/`<Link>` elements — no
other mouse-only primary actions were found via the `onClick` div/li/span/img
sweep (see method note below).

*Method:* a structural scan for `<(div|li|span|img)` tags carrying `onClick`
without `role=`/`tabIndex` anywhere in the renderer turned up 7 hits total;
5 were backdrop-dismiss patterns or the reader's full-viewport page-turn zone
(both have complete keyboard equivalents elsewhere — arrow keys/Space for
page-turn, Escape for backdrops) and are not defects; the 2 real findings are
above (`MediaImagesSection.tsx` gallery tile, `BookContent.tsx` mining click
— the latter reclassified under the OcrOverlay finding since it's the same
pattern).

## Unlabelled icon-only controls

Most icon-only buttons in the app are properly labelled — `NowPlayingBar.tsx`,
`Lightbox.tsx`, `Sidebar.tsx`'s disclosure triangle, `GachaUnitPage.tsx`'s
favorite star, and `ThemeSongsPage.tsx`'s heart all pair `title` with
`aria-label`. The gaps:

`med` | `verified` | `src/renderer/src/pages/MediaDetailPage.tsx:538-546,608-616,644-652` — the three "remove" `×` buttons documented above under keyboard-reachability also carry `title` but **no `aria-label`** (violates the codebase's own stated convention "icon-only glyph buttons carry `aria-label` mirroring their `title`") → Fix: add `aria-label` matching each `title`, in the same edit as the `group-focus-within` fix.

`low` | `verified` | `src/renderer/src/pages/MediaDetailPage.tsx:944-949` (crew-credit remove), `src/renderer/src/pages/MediaFormPage.tsx:388-393` (tag-chip remove), `src/renderer/src/pages/MediaDetailPage.tsx:410-419` (studio/company-credit remove), `src/renderer/src/pages/SettingsPage.tsx:1712-1722` (status reorder ↑ / ↓ / × buttons) — all bare `×`/`↑`/`↓` glyph buttons with no `title` and no `aria-label` → Fix: add `aria-label` (e.g. "Remove tag", "Move status up/down", "Remove status").

`low` | `verified` | `src/renderer/src/components/MusicTrackRow.tsx:100-108` — like/unlike `♥`/`♡` button has `title` but no `aria-label` → Fix: mirror the `title` into `aria-label` as done correctly two lines away in the same file's `TrackMenu` usage.

## Contrast in this palette

Computed WCAG relative-luminance contrast ratios from the actual `:root`
values (`src/renderer/src/styles.css:12-41`). The file's own header comment
(`:11`) claims "gray-200 on base-900 is 15.1:1, accent on base-900 is
10.9:1" — both independently recomputed and confirmed accurate (15.13:1 and
10.88:1), which gives confidence in the numbers below.

| Combination | Background | Ratio | AA needs |
|---|---|---|---|
| `text-gray-400` on `base-900` | 10 15 11 | **7.70:1** | 4.5:1 — pass |
| `text-gray-500` on `base-900` | 10 15 11 | **4.40:1** | 4.5:1 — fails by a hair |
| `text-gray-500` on `base-800` (`.card`) | 16 24 18 | **4.12:1** | 4.5:1 — fails |
| `text-gray-600` on `base-900` | 10 15 11 | **2.87:1** | 4.5:1 — fails badly |
| `.kbd` text (`text-gray-600` on `bg-base-700/70`) | ≈22 34 26 | **≈2.4:1** | 4.5:1 (small text) — fails badly |
| `text-accent/80` on `base-900` | 10 15 11 | **7.19:1** | 4.5:1 — pass |
| `text-accent/60` on `base-900` | 10 15 11 | **4.46:1** | 4.5:1 — fails by a hair |
| `bg-accent` + `text-white` (via override) | n/a | **10.88:1** (text flips to `base-900`) | 4.5:1 — pass |

`med` | `verified` | `src/renderer/src/styles.css:26` (`--gray-500`) — `text-gray-500` is the single most common "secondary copy" color in the app (timestamps, subtitles, meta lines — e.g. `components/NowPlayingBar.tsx:131,144`, dozens more) and sits at 4.40:1 on the page background and 4.12:1 on `.card`, both under the 4.5:1 AA body-text threshold, despite CLAUDE.md's own convention note that "readable secondary copy uses `gray-400`+" (i.e. the lighter half of the ladder) → Fix: none required for a single self-selecting user, but if this is ever revisited, gray-500 is the one shade in the "readable" tier that doesn't actually clear AA.

`med` | `verified` | `src/renderer/src/pages/JapaneseFeedPage.tsx:210` (`text-gray-600` on `item.attribution`, real license/attribution text) and `src/renderer/src/pages/JapaneseListenPage.tsx:318` (`text-gray-600` on the recording's attribution line) — `text-gray-600` is documented in CLAUDE.md as "reserved for decorative/inactive markers," but these two instances carry real informational content (audio clip attribution) at 2.87:1 contrast → Fix: bump these two specific lines to `text-gray-500` or `text-gray-400`; the rest of the `text-gray-600` usages surveyed (index numbers, separators, disabled-state markers) are genuinely decorative and fine as-is.

`low` | `verified` | `src/renderer/src/styles.css:127-129` (`.kbd`) — the keyboard-hint chip (`text-gray-600` on `bg-base-700/70`) computes to roughly 2.4:1, and it's used for functional content, not decoration: every quiz option's corner hint (`pages/JapaneseQuizPage.tsx:433-435`), `ShortcutHelp.tsx`'s entire key-list, and the review setup's "Space to flip · 1 Again · 2 Hard · 3 Good · 4 Easy" line → Fix: lighten `.kbd`'s text color a step (e.g. `text-gray-400`) — the low-contrast look is presumably intentional "terminal chrome," but it's the app's only shortcut-discovery surface in three places.

`low` | `verified` | `src/renderer/src/components/Sidebar.tsx:21` (`text-accent/60` on the `//` label prefix) — 4.46:1, just under AA, but purely decorative (a two-character terminal-comment marker beside a readable label) → drop, informational only.

## `prefers-reduced-motion`

Full inventory of `@keyframes`/`animation:`/`transition:` in `styles.css`,
cross-checked against `@media (prefers-reduced-motion: no-preference)`
wrapping:

| Rule | Gated? |
|---|---|
| `.panel-in` (`panel-in` keyframes, MiningPanel mount) — `styles.css:292-302` | Yes — whole rule inside the media query |
| CRT scanline flicker (`lain-flicker`) — `styles.css:356-367` | Yes |
| Brand glitch (`lain-glitch`) — `styles.css:375-397` | Yes (base `text-shadow` stays static outside the query; only the `animation:` is gated) |
| `wired-dot` pulse (`lain-pulse`) — `styles.css:468-475` | Yes |
| Boot cursor blink (`lain-blink`) — `styles.css:478-485` | Yes |
| Stroke-order draw-in (`stroke-draw`) — `styles.css:498-509` | Yes — reduced motion shows strokes complete instead, by design |

All six CSS-defined animations in `styles.css` are correctly gated — this is
a genuinely clean sweep at the stylesheet level.

`components/BootSequence.tsx` handles reduced motion at the **module level**,
not just visually: `shouldBoot` (`:8-16`) checks
`window.matchMedia('(prefers-reduced-motion: reduce)').matches` once at
import time and if true, `phase` starts at `'done'` — the whole boot splash
never renders, rather than rendering statically. Correct and stronger than
CSS-only gating.

`med` | `verified` | `src/renderer/src/components/MusicDownloadDialog.tsx:52` and `src/renderer/src/components/ImportDialog.tsx:169` — both use bare Tailwind `animate-pulse` (a continuous, indefinite loop) with no `motion-safe:` prefix, so it runs regardless of the OS setting → Fix: prefix both with `motion-safe:`, matching the pattern the codebase already uses correctly at `src/renderer/src/pages/MangaReaderPage.tsx:997` (`motion-safe:animate-pulse`) and `src/renderer/src/components/ActivityIndicator.tsx:39` (`motion-safe:animate-spin`) — i.e. the convention exists and is just inconsistently applied.

`low` | `suspected` | Renderer-wide `transition-transform`/`transition-opacity` hover microinteractions (card image zoom-on-hover, bar fades, etc. — e.g. `pages/GachaHomePage.tsx:67`, `pages/SearchPage.tsx:69`, `pages/PersonDetailPage.tsx:196`) are not gated by `motion-reduce:`. These are discrete, short, interaction-triggered transitions rather than looping animations, which is the lower-risk category under WCAG 2.3.3 — flagged only for completeness, not recommended as a priority fix. `pages/MangaReaderPage.tsx:568` already shows the stricter pattern (`motion-reduce:transition-none`) where it mattered enough to the author to add it.

## What's good here

- `lib/hooks.ts:45-66` (`useDialog`) is a clean, single, correctly-documented implementation of focus-in / Escape / focus-restore, and 13 of 15 `role="dialog"` components in the renderer actually use it (verified by diffing `useDialog(` call sites against `role="dialog"` occurrences).
- Every reader/video/quiz global keydown handler consistently guards against `HTMLInputElement`/`HTMLTextAreaElement` targets before matching single-letter/number shortcuts (`MangaReaderPage.tsx:385`, `BookReaderPage.tsx:274`, `VideoPlayerPage.tsx:442`, and all six quiz pages) — a real, deliberate, repeated pattern, not an accident.
- The three immersive readers/player each run their Escape cascade as one ordered if/else chain in a single listener, so there is no risk of two competing handlers both reacting to the same Escape press (`MangaReaderPage.tsx:459-467`, `BookReaderPage.tsx:326-334`, `VideoPlayerPage.tsx:553-563`).
- `components/QueuePanel.tsx:179` already does the right thing for hover-reveal controls (`group-hover:flex group-focus-within:flex`), which is the exact fix the `MediaDetailPage.tsx`/`MediaImagesSection.tsx` findings above need — the correct pattern exists in-repo, it just didn't propagate everywhere.
- All six CSS-level animations in `styles.css` are properly scoped inside `@media (prefers-reduced-motion: no-preference)`, and `BootSequence.tsx` goes further by skipping its entire mount (not just its motion) for reduced-motion users at the module level.
