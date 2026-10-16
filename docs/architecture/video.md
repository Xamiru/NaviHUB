# Linked local videos

> Reference detail. The rules an agent must not break live in
> [CLAUDE.md](../../CLAUDE.md#hard-invariants) — this file is the "how and why" narrative.

**Covers** — attached episode and wrestling-video folders, the in-app player (library episodes, wrestling files, wrestling clips, Football media), its decode gate and watchdog, external playback, watched tracking and resume positions, metadata probing, subtitle tracks and sentence mining.

**Key files** — `src/main/video/scan.ts`, `scope.ts`, `index.ts`, `source.ts`, `mine.ts`, `fonts.ts`, `ffmpeg.ts`, `playability.ts`, `probeParse.ts`, `subtitles.ts`, `src/main/seriesText.ts`, `pages/VideoPlayerPage.tsx`, `components/video/`, `lib/useSubtitleTrack.ts`, `lib/videoDecodeStats.ts`, `lib/videoPrefs.ts`, `lib/jassubAssets.ts`, `lib/subtitleFallbackFont.ts`, `components/VideoEpisodesSection.tsx`, `components/wrestling/WrestlingFilesSection.tsx`

**Tests** — `video`, `videoSource`, `wrestlingVideo`, `videoNames`, `videoPlayability`, `videoCoverage`, `videoStudyRange`, `subtitles`, `performanceBoundaries`, `renderer/videoPlayer`, `renderer/subtitleStyle`

---

## Current product boundary

NaviHUB plays local video in-app, directly from the file, and never converts it. The first player (removed 2026-08-30) was built on the belief that Chromium plays only MP4/WebM, so it ran an ffmpeg remux/transcode pass and kept a cache of converted copies. Measured on Electron 44 (2026-10-12): Chromium demuxes Matroska and decodes H.264 at every profile (Hi10P in software, about a quarter of one laptop core at 1080p), VP8, VP9, AV1, AAC, MP3, Opus, Vorbis, FLAC and PCM, straight off `navimg://` with Range 206 seeking. Nothing from the conversion tier came back: no prepare step, no `video_cache` writes, no converted copies, no ad-hoc `/watch/adhoc` route.

What Chromium cannot do fails silently, which is why the player has a gate:

- **HEVC on Linux** plays the audio over a blank picture. Windows and macOS hand HEVC to the OS decoder, so there it is `uncertain`, not refused.
- **AC3, E-AC3 and DTS** play the picture with zero decoded audio bytes, and no `error` event fires. AC3/E-AC3 are `uncertain` on Windows/macOS; DTS, TrueHD and MLP are always refused.
- **AVI, TS/M2TS, WMV, FLV, MPEG-PS** containers and MPEG-4 Part 2, MPEG-2 and VC-1 video are refused.

`playability.ts:decideDecodable` turns extension plus video and audio codec into `ok | uncertain | unsupported` with one sentence naming the reason. `unsupported` never mounts a `<video>`: the page shows `DecodePanel` with "Open externally". `ok` and `uncertain` mount it, and a watchdog (`lib/videoDecodeStats.ts`) judges the decode once 1.5 media seconds have played: `videoWidth === 0` or, when the source has an audio stream, `webkitAudioDecodedByteCount === 0` pauses and swaps to the same panel, as does an `error` event. On an `error` the page resolves the source again first: a file that has vanished (drive unplugged, folder moved) shows main's own sentence under "Video unavailable" with no system-player button, since it is not a decode problem. The player never shows a silently undecodable file. Without ffprobe the codecs are unknown, so the verdict is `uncertain` and the watchdog decides.

Every file is one action from the system player. `video:openExternal` takes any `VideoSourceRef` and goes through the same `resolve()` in `video/source.ts` as the in-app player, so the scope check, the Football realpath containment (`resolveLocal`) and the error sentences are one implementation for every kind. Set VLC as the default application for video formats to make that VLC.

## The player

`/watch/:kind/:id` renders `pages/VideoPlayerPage.tsx` chromeless, in App's reader branch, classified `immersive` by `lib/surfaceMood.ts`. The four `kind` strings, `file`, `wrestling`, `clip` and `football`, are frozen: they ride routes, `?t=` resume links and the immersion handoff. `video:source` (`src/main/video/source.ts`) resolves a ref to its navimg URL, owner, decode verdict, audio streams, subtitle tracks (embedded ones listed with `url: null`) and, for episodes and wrestling files, previous/next by `sort_order`. A missing file rejects with a sentence the page shows.

Rules the page keeps:

- **Three clocks.** A frame callback drives cue sync and the study-range stop with no renders, `activeCues` changes only when the active set changes, and `uiTime` is a coarse ~4 Hz mirror for the scrubber and transcript. One `currentTime`-in-state would repaint a long transcript several times a second.
- **Start position.** A study range wins, then `?t=`, then `resume_seconds`, applied once on the first `loadedmetadata`.
- **Exit.** Back and Escape go back through the tab's history; on a tab's first entry they replace with the owning title's detail page, the wrestling event, the clip shelf or the Football media page. Next/previous replace the entry, so a binge stays one history entry.
- **Music and media keys.** Starting a video pauses (never stops) the music player. While mounted, the page owns the OS media session through `usePlayerControls().claimMediaSession`: the provider stays the one place that installs handlers, switching them to the video's play/pause/seek and back to music on release. No new push channel; the thumbbar still targets music.
- **Keyboard.** Space/K, arrows (Shift fine, Ctrl cue step), A/D cue step, R replay cue, Shift+R/Shift+L replay or loop the study range, J/L, `,`/`.` frame step while paused (the frame interval measured by the frame callback, 1/24 s until one is seen), `[`/`]`/`\`, S/B/Shift+S/-/=, T/M/C, N/P, Home/End, F, O (open externally), ? (shortcut help) and an Escape/Backspace cascade with exit-fullscreen first. Letters are told apart by Shift, never by case, so Caps Lock cannot turn L into Shift+L. Shortcuts ignore text inputs, selects and Ctrl/Meta/Alt chords other than Ctrl+arrows; the timeline and volume sliders opt back in with `data-player-keys`, so a click on them does not capture Space and the arrows, and the speed select blurs after a pointer pick. Keyboard changes to volume, speed, subtitle delay and tracks show a one-line readout (`VideoOsd`, a polite live region) for 1.2 s.
- **Subtitle delay.** Positive means later. It is remembered per `VideoSource.offsetKey` (`media:<id>` for a title's episodes, `event:<id>` or `wfile:<id>` for wrestling files, `clip:<id>`, `football:<id>`) in the `video.subOffsets` localStorage map, never globally: one release's timing fix used to shift every other video. The first player's global `subOffsetSec` is dropped on load. Both cue clocks read subtitle time as media time plus `-delay`, and captured sentence audio is cut in media time with the same shift.
- **End of file.** The Finished screen leaves on any seek back from the end (`seeking`, which also covers Space after the end, since `play()` restarts from 0), and position saving resumes; a replay's first save waits for the finish's clearing write.
- **Transcript.** Its line lists are memoised (the incremental list resets on a new array identity) and the panel is `memo`'d with stable handlers, so the 4 Hz clock does not reach it. Following the active line reveals a row past the rendered window before scrolling to it; wheel, a scrollbar press and Page Up/Down pause following for 4 s.
- **Mouse.** A single click on the picture does nothing (it only wakes the bars); a double-click toggles fullscreen. Play/pause is Space/K, the Play button and the media keys. Subtitle words and the end/range overlays stop click and double-click propagation.
- **Fullscreen** applies to the whole row, so the transcript and mining panel stay reachable.
- **Timeline.** A click anywhere on the scrubber seeks there and can keep dragging. It shares `.range-thumb` with the two-thumb `RangeSlider`, whose track ignores pointer events, so the timeline adds `.timeline-range` to take them back.
- **Auto-hiding bars.** Both bars hide 2.5 s after the last mouse movement while playing, along with the cursor (on every descendant, so a subtitle word's pointer cursor cannot override it). Only a pointer whose screen position changed counts as movement, since Chromium can deliver mousemove when content under a resting cursor changes. and stay up while paused, while a panel is open or while the pointer is over a bar. They reveal for keyboard focus through `has-[:focus-visible]`, never `focus-within`: a mouse click leaves ordinary focus on a button, and `focus-within` once pinned the bar over fullscreen video. The bars stack above the end and range overlays, so the controls stay usable after a file ends.

## Resume positions and watched progress

`video:markProgress(ref, seconds | null)` writes `resume_seconds` only, for episodes and wrestling files; clips and Football media are ignored. It never logs progress: a position is not progress. The page coarsens saves to 5-second buckets, flushes 500 ms after a seek lands (one write per scrub), and flushes at once on pause, hide, leaving and next/previous. `ended` calls `video:markWatched(ref, true)` and then clears the position with `null`, so a finished file reopens from the start. The watched transition is the one progress write (below).

## Folder scanner and data ownership

Anime, movie, and TV detail pages attach one folder beneath `video.dir`. Wrestling events reuse the same scanner under `wrestling.dir`. `video/scope.ts:VIDEO_SCOPES` supplies the fixed table, owner column, root, and label; SQL identifiers never come from user input. Files are ordered naturally from parsed season/episode names and synchronized by relative path.

The destructive-sync guard remains load-bearing: when a scan finds zero files but rows already exist, it refuses to prune. An unavailable drive must not erase watched marks. Rescans refresh canonical file metadata while preserving `watched_at` and legacy `resume_seconds` for unchanged paths.

`video:openExternal` accepts a typed `VideoSourceRef`, resolves the row within its declared scope (or the clip/Football record), verifies that the path exists under that scope's configured root, and calls `shell.openPath`. A non-empty return string from Electron is surfaced as an error. The action never accepts an arbitrary absolute path.

## Watched progress

A file becomes watched when the player reaches its end or when the user ticks it in the list. `video:markWatched` takes the same scoped ref because ids are unique only within their table. For media-library episodes, the first unwatched-to-watched transition goes through `checklistRepo.logProgress`, the app's one "I watched another one" write. The scope guard is critical: a wrestling row's owner is an event id and must never be treated as a `media_item` id.

Unwatching a row clears its resume position as well as `watched_at`.

## Optional metadata, subtitles and mining

ffprobe and ffmpeg are optional, user-installed tools. Playback never depends on them. ffprobe fills duration, resolution, and codec metadata during scans and feeds the decode gate. ffmpeg extracts textual embedded subtitle streams, for the player (on demand, `video:subtitleTrack`, with a five-minute timeout because it reads the whole file) and for the offline Japanese comprehension scan and prep deck, and cuts sentence audio for mined cards (`video:clipAudio` → `jpaudio/mining/`, content-addressed, `null` without ffmpeg). Sibling subtitle files need no extraction.

Subtitles are never a native `<track>`. There are two renderers, and they never draw the same line together:

- **The clickable overlay** (`SubtitleOverlay.tsx`) is the app's own DOM: `@shared/subtitles.ts` keeps words, timing and top/bottom placement and drops ASS layout, because a clickable token flow is the point. It draws SRT/VTT tracks, the second track, and an ASS primary track whenever the styled layer is not drawing it. While the styled layer draws the primary, the second track moves to the top of the frame, since libass puts the primary dialogue where the bottom lines sit. Its look comes from `SubtitleLook` in `lib/videoPrefs.ts` (size, height above the bottom, font stack, colour, outline or box with opacity, second-track size), edited live in the Style panel and stored in localStorage; colour and font classes live in `styles.css` (`.sub-ink-*`, `.sub-font-*`), with installed Japanese system fonts only. The first player's `subFontScale`/`subBackdrop` migrate on load.
- **The styled layer** (`StyledSubtitleLayer.tsx`) renders an ASS primary track exactly as authored with libass through jassub (WebAssembly in a worker, `'wasm-unsafe-eval'` in the CSP), on its own canvas over the video. It draws only while playing with no mining panel open; pausing hands the primary line to the overlay so words stay minable. jassub, its worker and both WASM builds load only by dynamic import (`tests/performanceBoundaries.test.ts`), one instance per track and dialogue-only setting, destroyed on track change and unmount. With dialogue-only on it is fed the script through `assDialogueOnly` (`@shared/subtitles.ts`), so signs and songs are hidden the same way as in the overlay. Fonts: the file's attachments, extracted once by `video/fonts.ts` (`video:subtitleFonts`; one dump per source at a time). A dump lands in `videocache/fonts/<sourceKey>.partial/` and is kept only when ffmpeg ends with "At least one output file must be specified" (its success message after dumping). Each font is then stored once by content as `videocache/fonts/<sha1>.<ext>`, so a season's episodes share one copy, and `<sourceKey>.json` lists one source's fonts. Settings → Storage counts and clears this folder together with the extracted subtitles, plus installed fonts through the Local Font Access API. libass draws missing glyphs with the default font, and jassub's bundled default has no Japanese, so `lib/subtitleFallbackFont.ts` passes the first installed Japanese family (Yu Gothic, Meiryo, Noto Sans CJK JP, ...) as `defaultFont`. Size scales dialogue styles only; signs and songs keep their authored size. Render height is capped at 1080 lines. A load failure falls back to the overlay and says so in the Style panel.

The cue normalizer merges same-time lines only within one style class, so a sign timed to a dialogue line stays its own cue and "Hide signs and songs" can remove it. Japanese cues are tokenized for click-to-mine into `components/reader/MiningPanel.tsx`; Capture adds the current frame (canvas read, which needs navimg's ACAO header and `crossOrigin="anonymous"`) and the line's audio. Bitmap tracks (PGS/VobSub) are listed and refused, never silently absent. Track ids are re-derived per file from the saved language preferences in `lib/videoPrefs.ts`.

`playability.ts` now contains only safe argv builders. ffmpeg has no `--` terminator, so every path is validated as absolute and passed with a `file:` prefix. `probeParse.ts` skips attached cover-art video streams and numbers subtitle streams per type because `-map 0:s:N` uses the subtitle type index, not the absolute stream index.

Extracted subtitle tracks live under `userData/videocache/subs`. The wider `videocache` prefix and `video_cache` table remain for compatibility with existing databases; no new converted playback copies or cache rows are created. Old converted files are not automatically deleted during an application update.

## Deliberately removed surfaces

The conversion tier stays removed: no prepare step or task, no conversion cache controls or `video_cache` writes, no `/watch/adhoc` route or ad-hoc video file association, no Watch drawer/palette landing page, and no audio-stream switching (Chromium does not expose `audioTracks`; the system player does). Do not rebuild these as pending work; see [removed.md](removed.md).
