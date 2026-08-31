# Linked local videos

> Reference detail. The rules an agent must not break live in
> [CLAUDE.md](../../CLAUDE.md#hard-invariants) — this file is the "how and why" narrative.

**Covers** — attached episode and wrestling-video folders, external playback, manual watched tracking, metadata probing, and subtitle text used by Japanese study tools.

**Key files** — `src/main/video/scan.ts`, `scope.ts`, `index.ts`, `ffmpeg.ts`, `playability.ts`, `probeParse.ts`, `subtitles.ts`, `seriesText.ts`, `components/VideoEpisodesSection.tsx`, `components/wrestling/WrestlingFilesSection.tsx`

**Tests** — `video`, `wrestlingVideo`, `videoNames`, `videoPlayability`, `videoCoverage`, `subtitles`

---

## Current product boundary

NaviHUB does not contain a video player. The internal Chromium player, Watch routes, conversion workflow, transcript UI, and subtitle-mining controls were deliberately removed on 2026-08-30. A tracked file opens through `electron.shell.openPath`, so the operating system chooses the player. Set VLC as the default application for video formats to make NaviHUB launch VLC.

There is no attempt to control or observe the external player. NaviHUB therefore cannot seek to its old saved position, detect playback completion, select tracks, or update progress automatically. Existing resume values stay in the database as inert historical data. Watched state remains a manual toggle in the episode list.

## Folder scanner and data ownership

Anime, movie, and TV detail pages attach one folder beneath `video.dir`. Wrestling events reuse the same scanner under `wrestling.dir`. `video/scope.ts:VIDEO_SCOPES` supplies the fixed table, owner column, root, and label; SQL identifiers never come from user input. Files are ordered naturally from parsed season/episode names and synchronized by relative path.

The destructive-sync guard remains load-bearing: when a scan finds zero files but rows already exist, it refuses to prune. An unavailable drive must not erase watched marks. Rescans refresh canonical file metadata while preserving `watched_at` and legacy `resume_seconds` for unchanged paths.

`video:openExternal` accepts a typed `VideoFileRef`, resolves the row within its declared scope, verifies that the path exists under that scope's configured root, and calls `shell.openPath`. A non-empty return string from Electron is surfaced as an error. The action never accepts an arbitrary absolute path.

## Manual watched progress

`video:markWatched` takes the same scoped ref because ids are unique only within their table. For media-library episodes, the first unwatched-to-watched transition goes through `checklistRepo.logProgress`, the app's one "I watched another one" write. The scope guard is critical: a wrestling row's owner is an event id and must never be treated as a `media_item` id.

There is deliberately no `video:markProgress` action. External playback has no reliable position signal. Unwatching a row clears any legacy resume position as well as `watched_at`.

## Optional metadata and subtitle corpus

ffprobe and ffmpeg are optional, user-installed tools. Playback never depends on them. ffprobe fills duration, resolution, and codec metadata during scans. ffmpeg is used only to extract textual embedded subtitle streams for the offline Japanese comprehension scan and prep deck; sibling subtitle files require no extraction.

`playability.ts` now contains only safe argv builders. ffmpeg has no `--` terminator, so every path is validated as absolute and passed with a `file:` prefix. `probeParse.ts` skips attached cover-art video streams and numbers subtitle streams per type because `-map 0:s:N` uses the subtitle type index, not the absolute stream index.

Extracted subtitle tracks live under `userData/videocache/subs`. The wider `videocache` prefix and `video_cache` table remain for compatibility with existing databases; no new converted playback copies or cache rows are created. Old converted files are not automatically deleted during an application update.

## Deliberately removed surfaces

There are no `/watch` routes, Watch drawer/palette entry, ad-hoc video file association, `VideoPlayerPage`, prepare status/task, conversion cache controls, audio-clip mining, or player keyboard bindings. Do not rebuild these as pending work; see [removed.md](removed.md).
