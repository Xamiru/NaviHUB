# Linked local videos

> Reference detail. The rules an agent must not break live in
> [CLAUDE.md](../../CLAUDE.md#hard-invariants) — this file is the "how and why" narrative.

**Covers** — attached episode and wrestling-video folders, the in-app player (library episodes, wrestling files, wrestling clips, Football media), its decode gate and watchdog, external playback, watched tracking and resume positions, metadata probing, subtitle tracks and sentence mining.

**Key files** — `src/main/video/scan.ts`, `scope.ts`, `index.ts`, `source.ts`, `mine.ts`, `ffmpeg.ts`, `playability.ts`, `probeParse.ts`, `subtitles.ts`, `src/main/seriesText.ts`, `pages/VideoPlayerPage.tsx`, `components/video/`, `lib/useSubtitleTrack.ts`, `lib/videoDecodeStats.ts`, `lib/videoPrefs.ts`, `components/VideoEpisodesSection.tsx`, `components/wrestling/WrestlingFilesSection.tsx`

**Tests** — `video`, `videoSource`, `wrestlingVideo`, `videoNames`, `videoPlayability`, `videoCoverage`, `videoStudyRange`, `subtitles`, `renderer/videoPlayer`

---

## Current product boundary

NaviHUB plays local video in-app, directly from the file, and never converts it. The first player (removed 2026-08-30) was built on the belief that Chromium plays only MP4/WebM, so it ran an ffmpeg remux/transcode pass and kept a cache of converted copies. Measured on Electron 44 (2026-10-12): Chromium demuxes Matroska and decodes H.264 at every profile (Hi10P in software, about a quarter of one laptop core at 1080p), VP8, VP9, AV1, AAC, MP3, Opus, Vorbis, FLAC and PCM, straight off `navimg://` with Range 206 seeking. Nothing from the conversion tier came back: no prepare step, no `video_cache` writes, no converted copies, no ad-hoc `/watch/adhoc` route.

What Chromium cannot do fails silently, which is why the player has a gate:

- **HEVC on Linux** plays the audio over a blank picture. Windows and macOS hand HEVC to the OS decoder, so there it is `uncertain`, not refused.
- **AC3, E-AC3 and DTS** play the picture with zero decoded audio bytes, and no `error` event fires. AC3/E-AC3 are `uncertain` on Windows/macOS; DTS, TrueHD and MLP are always refused.
- **AVI, TS/M2TS, WMV, FLV, MPEG-PS** containers and MPEG-4 Part 2, MPEG-2 and VC-1 video are refused.

`playability.ts:decideDecodable` turns extension plus video and audio codec into `ok | uncertain | unsupported` with one sentence naming the reason. `unsupported` never mounts a `<video>`: the page shows `DecodePanel` with "Open externally". `ok` and `uncertain` mount it, and a watchdog (`lib/videoDecodeStats.ts`) judges the decode once 1.5 media seconds have played: `videoWidth === 0` or, when the source has an audio stream, `webkitAudioDecodedByteCount === 0` pauses and swaps to the same panel, as does an `error` event. The player never shows a silently undecodable file. Without ffprobe the codecs are unknown, so the verdict is `uncertain` and the watchdog decides.

Every file is one action from the system player. `video:openExternal` takes any `VideoSourceRef` and goes through the same `resolve()` in `video/source.ts` as the in-app player, so the scope check, the Football realpath containment (`resolveLocal`) and the error sentences are one implementation for every kind. Set VLC as the default application for video formats to make that VLC.

## The player

`/watch/:kind/:id` renders `pages/VideoPlayerPage.tsx` chromeless, in App's reader branch, classified `immersive` by `lib/surfaceMood.ts`. The four `kind` strings, `file`, `wrestling`, `clip` and `football`, are frozen: they ride routes, `?t=` resume links and the immersion handoff. `video:source` (`src/main/video/source.ts`) resolves a ref to its navimg URL, owner, decode verdict, audio streams, subtitle tracks (embedded ones listed with `url: null`) and, for episodes and wrestling files, previous/next by `sort_order`. A missing file rejects with a sentence the page shows.

Rules the page keeps:

- **Three clocks.** A frame callback drives cue sync and the study-range stop with no renders, `activeCues` changes only when the active set changes, and `uiTime` is a coarse ~4 Hz mirror for the scrubber and transcript. One `currentTime`-in-state would repaint a long transcript several times a second.
- **Start position.** A study range wins, then `?t=`, then `resume_seconds`, applied once on the first `loadedmetadata`.
- **Exit.** Back and Escape go back through the tab's history; on a tab's first entry they replace with the owning title's detail page, the wrestling event, the clip shelf or the Football media page. Next/previous replace the entry, so a binge stays one history entry.
- **Music and media keys.** Starting a video pauses (never stops) the music player. While mounted, the page owns the OS media session through `usePlayerControls().claimMediaSession`: the provider stays the one place that installs handlers, switching them to the video's play/pause/seek and back to music on release. No new push channel; the thumbbar still targets music.
- **Keyboard.** Space/K, arrows (Shift fine, Ctrl cue step), A/D cue step, R replay cue, Shift+R/Shift+L replay or loop the study range, J/L, `[`/`]`/`\`, S/B/-/=, T/M/C, N/P, F, O (open externally), ? (shortcut help) and an Escape cascade with exit-fullscreen first. Shortcuts ignore inputs, selects and Ctrl/Meta/Alt chords other than Ctrl+arrows.
- **Fullscreen** applies to the whole row, so the transcript and mining panel stay reachable.

## Resume positions and watched progress

`video:markProgress(ref, seconds | null)` writes `resume_seconds` only, for episodes and wrestling files; clips and Football media are ignored. It never logs progress: a position is not progress. The page coarsens saves to 5-second buckets and flushes on pause, seek, hide, leaving and next/previous. `ended` calls `video:markWatched(ref, true)` and then clears the position with `null`, so a finished file reopens from the start. The watched transition is the one progress write (below).

## Folder scanner and data ownership

Anime, movie, and TV detail pages attach one folder beneath `video.dir`. Wrestling events reuse the same scanner under `wrestling.dir`. `video/scope.ts:VIDEO_SCOPES` supplies the fixed table, owner column, root, and label; SQL identifiers never come from user input. Files are ordered naturally from parsed season/episode names and synchronized by relative path.

The destructive-sync guard remains load-bearing: when a scan finds zero files but rows already exist, it refuses to prune. An unavailable drive must not erase watched marks. Rescans refresh canonical file metadata while preserving `watched_at` and legacy `resume_seconds` for unchanged paths.

`video:openExternal` accepts a typed `VideoSourceRef`, resolves the row within its declared scope (or the clip/Football record), verifies that the path exists under that scope's configured root, and calls `shell.openPath`. A non-empty return string from Electron is surfaced as an error. The action never accepts an arbitrary absolute path.

## Watched progress

A file becomes watched when the player reaches its end or when the user ticks it in the list. `video:markWatched` takes the same scoped ref because ids are unique only within their table. For media-library episodes, the first unwatched-to-watched transition goes through `checklistRepo.logProgress`, the app's one "I watched another one" write. The scope guard is critical: a wrestling row's owner is an event id and must never be treated as a `media_item` id.

Unwatching a row clears its resume position as well as `watched_at`.

## Optional metadata, subtitles and mining

ffprobe and ffmpeg are optional, user-installed tools. Playback never depends on them. ffprobe fills duration, resolution, and codec metadata during scans and feeds the decode gate. ffmpeg extracts textual embedded subtitle streams, for the player (on demand, `video:subtitleTrack`, with a five-minute timeout because it reads the whole file) and for the offline Japanese comprehension scan and prep deck, and cuts sentence audio for mined cards (`video:clipAudio` → `jpaudio/mining/`, content-addressed, `null` without ffmpeg). Sibling subtitle files need no extraction.

Subtitles render as the app's own DOM, never a native `<track>` and never libass: `@shared/subtitles.ts` keeps words, timing and top/bottom placement and drops ASS layout, because a clickable token flow is the point. Japanese cues are tokenized for click-to-mine into `components/reader/MiningPanel.tsx`; Capture adds the current frame (canvas read, which needs navimg's ACAO header and `crossOrigin="anonymous"`) and the line's audio. Bitmap tracks (PGS/VobSub) are listed and refused, never silently absent. Track ids are re-derived per file from the saved language preferences in `lib/videoPrefs.ts`.

`playability.ts` now contains only safe argv builders. ffmpeg has no `--` terminator, so every path is validated as absolute and passed with a `file:` prefix. `probeParse.ts` skips attached cover-art video streams and numbers subtitle streams per type because `-map 0:s:N` uses the subtitle type index, not the absolute stream index.

Extracted subtitle tracks live under `userData/videocache/subs`. The wider `videocache` prefix and `video_cache` table remain for compatibility with existing databases; no new converted playback copies or cache rows are created. Old converted files are not automatically deleted during an application update.

## Deliberately removed surfaces

The conversion tier stays removed: no prepare step or task, no conversion cache controls or `video_cache` writes, no `/watch/adhoc` route or ad-hoc video file association, no Watch drawer/palette landing page, and no audio-stream switching (Chromium does not expose `audioTracks`; the system player does). Do not rebuild these as pending work; see [removed.md](removed.md).
