# Renderer performance & state — review notes

Scope: `src/renderer/src/` (pages, components, lib). Read-only recon.

---

### Global player context re-renders every mounted usePlayer() consumer on every audio tick, including per-row list items

`high` | `verified` | `src/renderer/src/lib/player.tsx:123,493-533`

`AudioPlayerProvider` keeps `currentTime` in React state and updates it on the `<audio onTimeUpdate>` event (player.tsx:526), which fires several times a second during playback. The `PlayerContext.Provider` value (player.tsx:494-521) is a fresh object literal built on every render of the provider, so React re-renders **every** component that calls `usePlayer()` on every tick — not just the ones that read `currentTime`. This is a documented tradeoff in one place (`components/QueuePanel.tsx:31-33`: "usePlayer() re-renders on every timeupdate tick"), but the mitigation (memoizing `upNext`) only exists in QueuePanel. Elsewhere `usePlayer()` is called directly inside per-row, unmemoized list components:

- `components/MusicTrackRow.tsx:51-52` — `const player = usePlayer(); const isCurrent = player.track?.id === musicTrackId(track)`. `MusicTrackRow` is not wrapped in `memo`, and `TrackList` (`pages/MusicLibraryPage.tsx:340`) also calls `usePlayer()` itself, so every visible row (per `useIncrementalList`, up to hundreds as the user scrolls a 100k-track library) re-renders 4-10×/second while anything plays, just to know whether it's the current track.
- `pages/ThemeSongsPage.tsx:376-378` — `SongRow` does the same thing for the anime OP/ED library.
- `pages/MusicLibraryPage.tsx:25` and `pages/ThemeSongsPage.tsx:62` — both page-level components also call `usePlayer()` directly (only to build a queue on click), so the whole page (filters, tabs, grids) re-renders on every tick, not just the transport-related rows.

None of these components need to react to `currentTime`; they only need `track?.id` and `isPlaying`. Because the whole context value changes identity together, there's no way for a consumer to opt out short of restructuring the context.

Fix: split `PlayerContext` into a high-frequency slice (`currentTime`/`duration`) and a low-frequency slice (`track`/`queue`/`isPlaying`/etc.), or pass `isCurrent`/`isPlaying` down as props from a single subscribing parent instead of calling `usePlayer()` in every row.

---

### TranscriptPanel's per-tick re-render defeats the documented 4Hz-mitigation, refreshing up to ~1500 rows every tick

`high` | `verified` | `src/renderer/src/pages/VideoPlayerPage.tsx:799-808`, `src/renderer/src/components/video/TranscriptPanel.tsx:61,138-151`

VideoPlayerPage's own comment (lines 72-77) explains the three-clock design specifically to avoid "a single currentTime-in-state would repaint a 1500-row transcript 4×/s." That guarantee doesn't hold in practice: `uiTime` (VideoPlayerPage.tsx:81, set via `onTimeUpdate` at line 686) IS state on the same component that renders `<TranscriptPanel>`, so VideoPlayerPage's function body re-runs on every tick regardless. `TranscriptPanel` is not wrapped in `memo` (TranscriptPanel.tsx:61), and the props VideoPlayerPage passes it are inline closures created fresh every render — `onSeek={(cue) => {...}}` (VideoPlayerPage.tsx:799), `onMineCue={(cue) => openMining(cue.text, null)}` (803), `onClose={() => {...}}` (804). Even though the inner `Row` component IS memoized (TranscriptPanel.tsx:17), its `onSeek`/`onMine` props are TranscriptPanel's own `onSeek`/`onMineCue` props (line 148-149) — the same unstable references — so `Row`'s memo comparison fails for every visible row on every tick. Net effect: with the transcript open, up to `count` rows (grows by 96 as the user scrolls, so potentially most of a long episode's cue list) fully re-render 4-10×/second, exactly the cost the surrounding comment says was designed away.

Fix: wrap `TranscriptPanel` in `memo`, and hoist `onSeek`/`onMineCue`/`onClose` in VideoPlayerPage into stable `useCallback`s (the way `seekTo`/`openMining` already are) instead of inline arrow-wrapping them at the JSX call site.

---

### MediaDetailPage's theme-favorite toggle doesn't invalidate its own page cache (its sibling component does)

`med` | `verified` | `src/renderer/src/pages/MediaDetailPage.tsx:745-763`

`ThemeRow` (rendered from the anime detail page's Theme Songs tab) toggles favorite with:
```
async function toggleFavorite(): Promise<void> {
  const next = !favorite
  setFavorite(next)
  await api.themes.setFavorite(theme.id, next)
  qc.invalidateQueries({ queryKey: qk.themes.all })
}
```
This only invalidates `qk.themes.all`, never `qk.media.detail(m.id)` — even though `theme.favorite` came from that exact query (`ThemesSection` receives `m: MediaDetail` and is rendered from `qk.media.detail(m.id)`'s data, MediaDetailPage.tsx:230). The local `useState` mirror (line 756-757) masks the staleness only until the component unmounts or `theme.favorite` changes for another reason. Its near-identical twin, `ThemeSongsPage.tsx`'s `SongRow`, whose own comment says "Same heart as the Songs page" (MediaDetailPage.tsx:755), correctly invalidates **both** keys:
```
qc.invalidateQueries({ queryKey: qk.themes.all })
qc.invalidateQueries({ queryKey: qk.media.detail(song.mediaId) })   // ThemeSongsPage.tsx:391
```
Every sibling mutator on the same page (`CompaniesSection`, `CastSection`, `StaffSection` — MediaDetailPage.tsx:399-403, 447-453, 919-923) calls the passed-down `onChange()` (= `refresh`, line 77, which invalidates `qk.media.detail(mediaId)`) after its own narrow invalidation. `ThemesSection`/`ThemeRow` is the one place that doesn't receive or call it. Once the query goes stale (default `staleTime: 5_000`, main.tsx:20) and something else forces a refetch of `qk.media.detail(mediaId)` without the heart-invalidation path being hit first, the heart flips back to its pre-toggle value.

Fix: pass `onChange` (or just `m.id`) into `ThemesSection`/`ThemeRow` and invalidate `qk.media.detail(m.id)` alongside `qk.themes.all`, matching ThemeSongsPage.

---

### Two components poll the same status channel with inconsistent, one-of-them-unconditional gating

`med` | `verified` | `src/renderer/src/components/japanese/CoverageSection.tsx:32-36`, `src/renderer/src/components/MangaChaptersSection.tsx:30-35`

Both `MangaChaptersSection` and `CoverageSection` render together as siblings on a manga item's "media" tab (`pages/MediaDetailPage.tsx:222-231`), and both poll the identical query key `qk.japanese.prepDeckStatus`:

- `MangaChaptersSection.tsx:30-35`: `enabled: buildingDeck, refetchInterval: buildingDeck ? 400 : false` — properly self-gated, matches the `useUpdateStatus`/`useOcrRun`/`useGameSession` convention used elsewhere.
- `CoverageSection.tsx:32-36`: **no `enabled`**, `refetchInterval: 1000` unconditionally. The comment explains this was a deliberate workaround for a race (a build started by the sibling section wouldn't be caught by a gated poll before it starts), but the tradeoff is that this component polls `japanese:prepDeckStatus` once a second, forever, for as long as the Chapters tab is open — even when nothing is running.

Because both observers share one TanStack Query cache entry, whichever tab is open determines behavior, but the always-on 1s poll runs any time CoverageSection is mounted (every manga detail page's Chapters tab), which is a real, if cheap, deviation from the self-gating discipline the rest of the app follows and the `activity:status`-style "lazy 2s / tight 400ms" pattern documented for `ActivityIndicator`.

Fix: gate `CoverageSection`'s poll the same way `ActivityIndicator` does (slow idle poll + tighten only while active), or lift the `buildingDeck` flag to the shared parent so both sections observe one gated query.

---

### Torrent search results re-filter and re-sort the full accumulated array on every 400ms poll tick

`med` | `verified` | `src/renderer/src/lib/useTorrentSearch.ts:44-46`, `src/renderer/src/components/TorrentResultsPanel.tsx:32-38`, `src/renderer/src/components/TorrentResultsTable.tsx:27-49`

`useTorrentSearch` appends new rows with `setResults((prev) => [...prev, ...s.results])` (useTorrentSearch.ts:46) on every poll while a fan-out search runs (every 400ms for the ~17-30s a broad search can take, per the module's own comment). This produces a **new array reference** every poll. Downstream:

- `TorrentResultsPanel.tsx:32-38`: `relevant` (regex word-boundary filtering via `relevanceFilter`), `trackers` (dedup + sort), and `filtered` (`applyTorrentFilters`) are all `useMemo`'d off `search.results`, so all three recompute over the **entire** accumulated list (up to ~1000-3000 rows per the module's own comments) on every single poll tick, even though only a handful of new rows arrived since the last one.
- `TorrentResultsTable.tsx:27-49`: `sorted` re-sorts the entire `filtered` array (`[...results].sort(...)`) on every render triggered by that same reference change.

For a large, slow-populating search this means the app repeatedly reprocesses rows that were already filtered/sorted correctly in the previous tick, ~40-75 times over the life of one search. Each individual pass is cheap (a few thousand items), but it's pure waste — none of the already-seen rows' filter/sort inputs changed.

Fix: only rerun `relevanceFilter`/`applyTorrentFilters`/sort over newly-arrived rows and merge, or debounce/throttle the `results` array reference so downstream `useMemo`s recompute less often than once per 400ms poll.

---

### Music "Tracks" tab and Play All/Shuffle fetch the entire library unpaginated

`med` | `verified` | `src/renderer/src/pages/MusicLibraryPage.tsx:70,363-364`

`TracksTab` (`api.music.tracks({})`, MusicLibraryPage.tsx:363) and `playAll()` (line 70) both fetch the complete, unfiltered track list with no pagination or limit. `useIncrementalList` only bounds what's *rendered* (batches of 96) — the full result set is still fetched, JSON-serialized across the IPC boundary, and held in memory on every mount of the Tracks tab. For the "100k-track music library" scale case named in this review's brief, that's a full-library round trip on every tab visit, unlike `MediaListPage`, which at least narrows by filter/search server-side before the incremental-render layer takes over.

Fix: either paginate `api.music.tracks()` or accept the tradeoff explicitly (it may already be intentional for a local SQLite-backed single-user app) — but there's no server-side narrowing today, so the incremental list is disguising an unbounded fetch, not replacing one.

---

### Manga reader's vertical mode mounts one DOM node + IntersectionObserver target per page, for every page in the volume

`low` | `verified` | `src/renderer/src/pages/MangaReaderPage.tsx:180-198,646-670,977-1005`

In vertical/webtoon mode, `pages.map((p, i) => <VerticalBlock .../>)` (MangaReaderPage.tsx:646) mounts one wrapper `<div>` for every page in the chapter — for a 2000-page volume, 2000 divs, each registered into `blockRefs` and individually `observe()`'d by one `IntersectionObserver` (lines 185-197). `VerticalBlock` (977-1005) only renders the actual `<img>`/OCR overlay inside an 11-page window around the current page (`nearPage-2..nearPage+8`), which correctly avoids decoding hundreds of images at once — but the DOM node + observer-target count itself is not windowed. This is a deliberate, documented tradeoff ("so a long chapter doesn't hold hundreds of decoded images at once") and is unlikely to be a real jank source at 2000 nodes, but it's the one place in the reader that doesn't bound node count with `useIncrementalList`'s pattern the rest of the app uses for big lists.

Fix (if it ever becomes a problem in practice): windowed rendering of the wrapper divs too (render placeholders for a wider band, real nodes for a narrower one, drop far-away wrappers entirely), same idea as `TranscriptPanel`/`useIncrementalList`.

---

### `navState.ts`'s in-memory store never evicts entries

`low` | `verified` | `src/renderer/src/lib/navState.ts:9,15-32,42-50`

The module-level `store = new Map<string, unknown>()` backing `usePersistedState`/`useScrollRestoration` is keyed by `${location.key}:${name}`. React Router mints a new `location.key` on every push navigation, so every distinct navigation that touches a page using `usePersistedState` or `useScrollRestoration` adds a permanent entry that is never removed (the comment says it's cleared "on full reload," which is correct, but nothing evicts it within a long-running session). For a personal desktop app plausibly left open for hours/days with heavy back-and-forth navigation (readers, quiz pages, filters), this is a slow, unbounded memory leak — low severity since entries are small primitives/arrays, but real.

Fix: cap the map size (LRU-evict old history keys) or clear entries whose `location.key` is no longer reachable in history.

---

### `usePitchRecorder`'s auto-stop safety timer does nothing

`low` | `verified` | `src/renderer/src/lib/usePitchRecorder.ts:159-165`

```
useEffect(() => {
  if (status !== 'recording') return
  const t = window.setTimeout(() => {
    // The drill normally stops first; this just flips state if it didn't.
  }, MAX_TAKE_SECONDS * 1000 + 500)
  return () => window.clearTimeout(t)
}, [status])
```
The comment claims this "flips state if [the drill] didn't" stop recording, but the timeout callback body is empty — it does nothing. The actual cap is enforced by the caller (`components/japanese/SpeakDrill.tsx:158-164`, watching `recorder.seconds >= MAX_TAKE_SECONDS`), so this is currently harmless dead code, but if a future caller of `usePitchRecorder` relies on the documented safety net, recording (and the growing `chunksRef` array, plus the live mic stream) would run forever with no actual backstop.

Fix: either call `stop()`-equivalent logic in the timeout, or delete the dead effect and the misleading comment.

---

### `useIncrementalList` recreates its IntersectionObserver on every batch growth

`low` | `suspected — cheap in practice` | `src/renderer/src/lib/hooks.ts:102-115`

The effect's dependency array (`[items, count, batch, hasMore]`) means every time `count` grows by one batch, the observer is disconnected and a brand new `IntersectionObserver` is constructed and pointed at the same sentinel element, rather than being created once and left alone. This is inexpensive (one observer per scroll-batch, not per frame) so it's not a real jank source, but it's unnecessary churn relative to creating the observer once per mount and just re-triggering its callback logic.

---

## What's good here

- **Query key hygiene is clean.** Every group in `lib/queryKeys.ts` has an `all` key that is a genuine array-prefix of every other key in that group (verified by inspection of all ~20 groups) — invalidating `qk.<group>.all` correctly reaches every specific key. The "broad invalidation" choices throughout the app (`qk.music.all` on a like toggle, `qk.gacha.all` on any coach mutation, etc.) are consistently accompanied by an explanatory comment about why the narrow key isn't worth it, and that discipline holds almost everywhere — `ThemeRow`'s missing `media.detail` invalidation (flagged above) is the one place it visibly slipped.
- **The three-poll-status hooks (`useUpdateStatus`, `useOcrRun`, `useGameSession`) are a clean, consistent, self-gating pattern**: `refetchInterval` derives from the polled data itself (`ACTIVE.has(q.state.data.state)`) rather than local component state, so a long-running operation keeps reporting progress after navigating away and back, and the poll truly stops (not just slows) once idle. `ActivityIndicator` extends the same idea with a lazy-idle/tight-active split instead of a hard on/off.
- **The video player's three-clock design is real and correct where it's supposed to matter**: `timeRef` (VideoPlayerPage.tsx:80,135) is a plain ref updated every `requestVideoFrameCallback`/`requestAnimationFrame` tick with zero renders; `activeCues`/`activeSecondary` (85-86, 140-141) only call `setState` when the active cue id-set actually changes (`sameIds` check), so `SubtitleOverlay` repaints on cue transitions, not every frame. The one place this guarantee doesn't reach is `TranscriptPanel` (flagged above).
- **`addEventListener`/`removeEventListener` pairing is solid across the renderer** — a per-file balance check over every file using `addEventListener` found exactly one intentional exception (`main.tsx`'s app-lifetime `unhandledrejection` listener, correctly never removed), and every reader/quiz page's keydown effect, popover outside-click handler, and the `usePitchRecorder`/`useTorrentSearch` cleanup paths tear down correctly, including under the StrictMode double-invoke pattern (ref-guarded starts, idempotent cleanups).
- **`MediaCard` is properly memoized** (`components/MediaCard.tsx:12`) and its callers (`MediaListPage.tsx`, HomePage strips) pass stable `item`/`cfg` references from the query cache, so large media grids don't re-render on unrelated parent state changes (e.g. typing in the search box before the debounce settles) — this is the one place in the app that gets the "list of memoized cards fed stable props" pattern fully right, in contrast to the music/theme row components above.
