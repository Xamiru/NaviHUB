# Removed features — do not rebuild

> Reference detail. The rules an agent must not break live in
> [CLAUDE.md](../../CLAUDE.md#hard-invariants) — this file is the "how and why" narrative.

**Covers** — things that shipped and were deliberately taken out. Read before proposing them as new work.

**Key files** — git history holds the code

**Tests** — n/a

---

## Phone sync / Android companion

**Phone sync / Android companion — REMOVED (2026-08-01).** A LAN sync server (`sync.ts`, `syncOps.ts`, `SyncOp`/`SYNC_PROTOCOL_VERSION`, the `sync:*` IPC group, the Settings "Phone sync" card, `sync_batch`) shipped 2026-07-16 as Phase 0 of a Capacitor companion app. **The user scrapped the idea — do not rebuild it, and do not treat it as pending work.** NaviHUB is desktop-only. Two deliberate leftovers: the `sync_batch` table and the `sync.*` settings keys still exist in the user's live DB (removing them from init.sql doesn't drop them) so sanitizeSql.cjs keeps wiping both — `sanitizeDb` skips tables a DB doesn't have, so it's a no-op on fresh installs. Git history has the code if it's ever wanted back.

## Odd One Out quiz

**Odd One Out — REMOVED (2026-08-27).** The central-library format that asked which of four titles lacked a stated company, credited-person, or genre relation was deliberately scrapped during the quiz review. Do not restore its route, hub card, Party option, challenge kind, or availability field. Old `quiz_session` rows may retain the `oddOneOut` text value; they are inert historical data and require no migration.

## Internal video player

**Internal video player — REMOVED (2026-08-30).** The `/watch` routes, Chromium playback page, ffmpeg remux/transcode workflow, conversion task/cache UI, transcript overlay, and player-side subtitle mining were deliberately removed. Do not restore them as unfinished work. Linked episode and wrestling-video folders remain, but their Open actions use the operating system's default video application; the intended setup is VLC as that default. Watched marks stay manual. Legacy `resume_seconds`, `playability`, `video_cache`, and converted files may remain in existing data without driving any current behavior.

## Detail-page hero and imported banner art

**Art-led detail hero — REMOVED (2026-09-26).** Anime and visual novels had an art-led header (a 220px strip of wide art with the cover hanging off it, selected by a `MediaConfig` hero flag), and the AniList and TMDB importers downloaded `bannerImage` / the `w1280` backdrop into `media_item.banner_path` for it. The per-media Art-tab background made it redundant, and the banner was an extra large download on every import. The header component, the flag, the `heroPath` resolution, the "Hero art" refresh aspect and its preset are gone. `runMigrations` drops `banner_path` and returns the banner files that no cover shares, and `initDatabase` deletes them from `userData/media`. The Search preview and the Installed Games featured tile now show the Art-tab background, falling back to the cover. TMDB backdrops remain available only as a manual search source on the Art tab. Do not re-add the banner download.

## Gacha tracker and FGO Coach

**Gacha section — REMOVED (2026-09-26).** The user quit gacha games. The `/gacha` tracker (HSR, FGO, E7, WuWa rosters, builds, currencies, banners, subreddit news), the Atlas catalog and Chaldea backup imports, the FGO Coach (an LLM chat with tools, goals, reminders, memory notes and imported chat logs), the Home Play card's gacha tasks and the four `gacha-daily-*` checklist items are gone. `runMigrations` drops the eleven `gacha_*` tables, deletes the gacha checklist rows and returns the unit, banner, game and chat-screenshot images that nothing else references; `initDatabase` deletes those files. The Japanese course's gacha vocabulary lesson stays, because it is language the user still meets in games. `src/main/llm.ts` survives for English writing feedback, keeping the stored `coach.provider`/`coach.model` keys. A saved `sidebar.hidden` row may still contain `gacha`; unknown keys are ignored. Do not rebuild it.

## spotDL dependency

**spotDL — REMOVED (2026-09-26).** Spotify's February/March 2026 Web API changes cut other users' playlist contents off from development-mode apps, and spotDL's shared client either hung silently or demanded day-long rate-limit waits. Spotify metadata is now read in-process by `spotifyWeb.ts`, sources are found by YouTube Music search (`youtubeMusic.ts`), and audio is downloaded by yt-dlp alone (`musicAcquisition.ts`). The Python metadata adapter (`spotifyMetadata.py`), spotDL version/capability probes, provider fallbacks (Piped, Bandcamp, SoundCloud) and the `spotdl.path`, `spotdl.pythonPath` and `spotdl.audioProviders` settings are gone; old rows for those keys are inert. `spotdl.cookieFile` and `spotdl.catalogueCountry` keep their names because stored settings use them, and `.spotdl/navihub-downloads` stays the staging folder so older interrupted runs still recover. Stored song payloads keep spotDL's field names. Do not reintroduce a spotDL dependency.

## Single-URL music downloader and legacy download mover

**Single-URL downloader and `navihub-downloads/` mover — REMOVED (2026-09-26).** `musicDownload.ts` held the original one-at-a-time yt-dlp downloader from the first music release; the persistent queue (`musicUrlQueue.ts`, `music:queueAdd`) had replaced it and nothing called it. Its yt-dlp version probe moved to `musicTools.detectBinary`, and the before-quit `killActiveMusicDownload` now points straight at `musicSpotify.killActive`. The unused `music:downloadStart`, `music:queueAddUrl` and `music:spotifyDownloadEntity` channels went with it. `musicLegacyDownloads.ts` moved files out of the old non-hidden `navihub-downloads/Artist/Album` folder on every scan; the user cleared that folder by hand on every machine, so the mover and its `legacy-moves.json` journal are gone. `.spotdl/navihub-downloads` staging recovery is unrelated and stays.

## Album listening journal

**Album listening journal — REMOVED (2026-09-26).** Album pages carried a "My listening journal" section (0–10 album rating, Want to hear / Exploring / Revisit shelf, review, album tags and dated listening entries), browsed from a Music **Journal** tab at `/music/journal`; smart playlists could filter by album rating and shelf. The user removed it. `runMigrations` drops `music_album_personal` and `music_listen`, and smart playlists no longer take `minAlbumRating`/`shelf` (older saved rules keep working; those keys are ignored). Per-track tags and standout marks (`music_track_personal`, the track menu's **Tags and standout track**) stay, and smart playlists still match them. Do not rebuild the album journal.
