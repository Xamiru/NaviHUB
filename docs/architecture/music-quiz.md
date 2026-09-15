# Music, theme songs and quizzes

> Reference detail. The rules an agent must not break live in
> [CLAUDE.md](../../CLAUDE.md#hard-invariants) — this file is the "how and why" narrative.

**Covers** — the theme-song library that reuses the media filter, and the single-elimination tournament bracket.

**Key files** — `src/main/repos/themeRepo.ts`, `src/main/themes.ts`, `@shared/bracket.ts`, `src/main/repos/tournamentRepo.ts`, `src/renderer/src/lib/player.tsx`

## Music artwork lookup

Scans abort before database writes if any directory read or audio-file stat fails;
a partial walk never prunes library records. Artist deletion removes its directory
before cascading database records, so a filesystem failure preserves tracking data.
Saved artwork paths are checked on scans: confirmed missing files are cleared, and
the first unchanged audio file is re-read for embedded artwork when its cover vanished.
Ordinary URL downloads report an indexing failure separately from saved audio and
ask the user to retry Scan library instead of reporting success.

Local folder and embedded artwork always wins. When the user asks NaviHUB to
find missing art online, remembered Spotify album ids provide the first
identity-safe oEmbed lookup, followed by a fast exact iTunes match. An exact
100-score MusicBrainz release group plus the Cover Art Archive's 1200px front
image is the archival fallback, with exact Deezer last. A known album year may
resolve otherwise ambiguous release groups; unresolved ambiguity is rejected.
Leading folder years such as `(1997) `, `[2001] `, and `2007 - ` are removed only
for provider lookup; edition markers elsewhere remain part of the identity.
Artist photos use remembered Spotify ids first, then an exact, non-disambiguation
Wikipedia page image, then exact-name Deezer.

Provider result order is not permission to guess: artist and album names must be
equal after safe case/Unicode/punctuation normalization. Edition identity such as
Deluxe, Remaster, Expanded, and Anniversary is preserved, and different images
for the same normalized result are treated as ambiguous. MusicBrainz Lucene
values are escaped, collaborative artist credits include every credited name and
join phrase, and requests carry NaviHUB's version plus repository contact URL in
the User-Agent through a serialized 1.1-second gate.
Optional art requests use one bounded 10-second attempt so an unavailable provider
cannot hold every later album in the bulk queue. HTTP/provider failures remain
retryable and do not stamp `art_checked_at`. The
explicit bulk action revisits older misses so a newly added provider can fill
them, but still excludes rows that already have art. Individual and bulk results
distinguish provider/download failures from a confident no-match. Existing online
art is never silently overwritten: clear a wrong image on its artist/album page,
then find it again.

The Bulk Import page's Refresh tab also has a separate **Local library
maintenance** card. It reuses the Music page's scan and missing-art actions rather
than adding music to `RefreshAspect`: source refresh is a `media_item` importer
pipeline, while the Sonic Archive owns standalone `music_*` tables. A scan also
re-resolves every imported Spotify playlist item, so newly downloaded or restored
files become playable without a Spotify re-import. Spotify playlists remain
one-time snapshots, and remembered artist/album sources remain explicitly
inspected from their own pages. Playlist source refresh is explicit and never downloads audio.

## Spotify playlist snapshots

The playlist page memoizes its local reorder seed and filtered source rows. The
shared incremental-list hook resets when the array changes, so allocating either
list on every render can reset the first 96 rows or repeatedly resync reorder state.
`tests/renderer/MusicPlaylistPage.test.tsx` covers reaching later batches, retaining
them through unrelated renders, and resetting them when search changes.

**Public snapshots with manual refresh (2026-09-12).** Sonic Archive can import a public Spotify
playlist link through the user-installed `spotDL` executable (`spotdl.path`, with
`spotdl` on PATH as the default). NaviHUB does not log into Spotify and does not
automatically sync after import. Refresh source updates metadata atomically, retains local audio and
manual decisions for surviving source IDs, and removes source rows only after a complete
provider count is validated. The normalized Spotify playlist id is unique, so importing the
same source again opens its existing local snapshot. spotDL supplies the playlist
compatibility layer and resolves downloaded audio through YouTube Music with ordinary
YouTube as the built-in fallback; Spotify does not supply audio files.
Parallel spotDL metadata workers can finish out of order, so import restores the
authoritative `list_position` before covers, deduplication and database insertion.
When the matching Python environment contains spotDL exactly 4.5.2, the bundled
version-guarded metadata adapter pages track IDs first, reports real progress, and
checkpoints completed track metadata under `userData/spotify-metadata`. Four workers
resume interrupted metadata without refetching completed tracks; checkpoints are removed
only after a successful database write. `spotdl.pythonPath` can select that environment.
Other versions or missing Python use the supported CLI path. Neither path accepts an
unknown count or a short successful payload as a complete snapshot.

In the CLI fallback, after spotDL reports the playlist track count it can remain silent while eight workers
resolve and serialize every track, and spotDL writes `playlist.spotdl` only after that
whole worker pool settles. Playlist imports therefore begin with a 30-minute
output-silence watchdog, then scale it by the reported size in 100-track/30-minute
blocks up to eight hours (provider rate-limit messages still fail immediately). An
800-track source gets four quiet hours rather than being killed after 30 minutes. The
shared activity/task surfaces report the discovered count, eight-worker phase and exact
silence allowance without presenting a fake percentage. If spotDL exits abnormally just
after writing a JSON array containing every reported row, NaviHUB validates and imports
that complete snapshot; a missing, malformed or short snapshot is never treated as a
resumable playlist. This phase does not download audio.

`music_spotify_playlist` owns source identity and `music_spotify_playlist_item`
keeps the ordered Spotify metadata, downloaded cover, and original spotDL payload.
Its `matched_track_id` is nullable with `ON DELETE SET NULL`: deleting or losing a
local file makes the source row unavailable without deleting its title, order, or
retry state. Ordinary `music_playlist_track` rows remain the manual-add layer and
append after the source snapshot.

An explicit recording choice is also stored once in `music_spotify_track_choice`,
keyed by Spotify track id. Choosing or confirming a local recording immediately
links every playlist/entity occurrence of that Spotify song; future imports reuse
the choice without matching or downloading again. Startup migrations promote older
row-level confirmations into this map. Deleting the chosen local track cascades the
choice and leaves source rows missing so they can be resolved again. Both source
resolvers select the Spotify identity explicitly, and future playlist imports store
reused choices as confirmed. Startup applies the existing choice migration but does
not run a full-library metadata rematch; Scan library applies revised matching to
older unresolved rows without a source re-import.

**Recording-aware matching.** Import and every music scan normalize Unicode, case,
punctuation, and whitespace. Recording-title keys ignore remaster labels and their attached years (before or after the label), so the original and remastered releases reuse one local recording. Unrelated years and other version words such as `live` remain meaningful.
The first tier requires exact normalized title, exact primary artist against the folder
artist or one component of `tag_artist`, and both durations within three seconds.
Album title can break one unique tie. Playlist rows alone get a second tier for a
unique same recording on another release: album differences such as standard,
Deluxe and greatest-hits compilations are ignored, and duration tolerance is 3% with
a three-second floor and eight-second ceiling. Meaningful Live, Acoustic, Remix,
Instrumental, Demo, Radio Edit, sped/slowed and re-recorded markers must
agree. Ambiguous rows remain missing but expose conservative local candidates through
`Use local version`; an explicit choice survives later scans while its file exists.
Artist/album source association keeps the strict first tier and the same recording-version checks. When several compatible local remasters exist, matching prefers the oldest local row. Normal download batches coalesce original/remaster duplicates within three seconds of duration, retaining all source rows; explicit manual sources and broader retries stay separate. A scan also rechecks remaster source titles when targeted indexing reports only the original title. Unmatched source rows
never enter the player queue.

Exact duplicate files with the same normalized title, artist set, album, recording
markers and rounded duration collapse to the oldest library row for matching and the
local-version picker. Distinct albums or durations remain separate choices. A source
row with any conservative local alternative is ineligible for download in both the
renderer and repository, so stale UI or a persisted queue cannot download over a
known local recording. A rejected downloaded candidate is quarantined and remains
eligible for a deliberate retry. The playlist projection and download guard exclude
the same quarantined tracks. Matching metadata is cached per SQLite connection with
both total-change and external data-version invalidation; playlists fetch full local
track records only for the selected alternatives, so likes and artwork stay fresh.
Add-to-playlist membership includes Spotify-linked rows, prevents a duplicate manual
addition, and removes either representation when the user toggles membership off.
An explicit source refresh can restore a removed Spotify source row.

**Download provenance and verification (2026-09-06).** Spotify downloads use a
temporary `[navihub-<spotify-track-id>]` filename marker so the post-download scan
can identify the exact source row even when title, deluxe-edition, or Unicode
metadata differs. The marker is removed after scanning. A file that is physically
present but fails strict matching is retained in
`music_spotify_download_candidate` and shown as **Downloaded locally; needs
verification**; it is not redownloaded or made playable implicitly. The user may
confirm the candidate, reject it and retry, or choose another local alternative.
Manual URLs and broader unfiltered results always require explicit approval,
even when spotDL writes matching Spotify tags and duration. `match_confirmed` preserves
that decision while the chosen file exists. `music_track.spotify_review_required`
prevents an unapproved or rejected recording from silently matching another playlist.
The shared recovery dialog compares expected/local duration, plays candidates, shows
the original audio URL, searches YouTube with title/channel/duration previews, accepts
an exact source, and lets playlist users choose any library recording or copy an audio
file into the library before confirming. Source options survive retries; actual resolved
URLs from spotDL result files are retained separately. Every `--save-file` output, including download-result files, must end in `.spotdl`; spotDL rejects other extensions before downloading any audio. The candidate table is personal data and is removed from sanitized
exports.

**Download and resume.** NaviHUB requires spotDL 4.5.2 or newer, ffmpeg and Deno before
starting acquisition. Settings detects all three and can run spotDL's official
`--download-deno` setup action; missing Deno is a readiness failure because current
YouTube extraction otherwise commonly ends in `YT-DLP download error`. Lyrics are
explicitly disabled. Missing rows preserve YouTube Music's native Opus stream under
`<music root>/<album artist>/<album>/<disc>-<track> - <title>.opus`. Free-provider audio
is normally about 128 kbps; bitrate conversion is disabled because converting an already
lossy source into a 320 kbps MP3 only makes a larger file and can add generation loss.
Normal acquisition uses spotDL's filtered artist/title/duration ranking across YouTube Music
and YouTube. It deliberately does not pass `--only-verified-results`, because that flag drops
otherwise strong official-channel matches when YouTube has not attached its music-verification
marker. An unresolved row can explicitly disable the normal filter for a broader match or store
one exact YouTube/YouTube Music URL in spotDL's `download_url` field;
both choices and the track-specific failure survive restarts. Optional YouTube Music Premium
cookies are passed only from local `spotdl.cookieFile`, switch output to native M4A, and can
provide 256 kbps when the account and source expose it. The cookie path is sanitized from
exports and its contents are never copied or logged. Piped, Bandcamp and SoundCloud are
available only through an explicit Settings fallback choice. Metadata-only `save` calls select
the YouTube provider solely to bypass spotDL's unrelated YouTube Music startup probe. When an
album `save` still returns a partial payload, NaviHUB keeps the complete indexed catalogue and
invokes spotDL's supported canonical album-URL download directly; the following strict scan
decides which tracks actually resolved. The runner feeds
stored payloads to spotDL in 100-track chunks with four workers. Consecutive small
resolved releases share a process, including bounded look-ahead during the first run;
Spotify album identities are saved before full expansion. Audio goes first into
`<music root>/.navihub-downloads`. Completed files move without overwriting existing audio,
and a private pending-index manifest survives interruption until indexing succeeds.
`indexMusicFiles` parses only those outputs, never prunes unseen library rows, and
re-resolves affected titles. Provenance normalization queries indexed paths instead of
walking the library. A resumed queue still runs the full recovery scan. Phase timings
are logged; no real-network speedup is assumed from unit tests.
Cancellation retains completed audio. Retry excludes matched, skipped and pending-review
rows. Playlist filters include Needs attention and Skipped; selections and per-song retry
allow precise recovery. Skipping is reversible. Pending review is not counted as a
successful match. spotDL and music scans share the music-maintenance gate; transient
payload/error files are private and removed after the run. spotDL, yt-dlp, and ffmpeg are external dependencies and are
never bundled.

Before an audio batch starts, NaviHUB runs a yt-dlp access probe, caching successful results for at most five minutes
with cookie-file, executable and JavaScript-runtime identity in the key. Failed probes
are retried on the next attempt. Expired cookies, bot checks, and PO-token failures
stop the batch before any track is attempted; a probe video that is itself
unavailable does not block the selected tracks. Settings provides a native
cookies.txt picker and a live access test. SpotDL child processes force UTF-8 on
Windows so artist names are not corrupted in logs or provenance matching. Provider
errors are translated into per-track retry guidance rather than leaving only raw
`AudioProviderError` text.

### Artist and album downloads

Artist and album headers open a persistent release catalogue rather than expanding
the full Spotify discography every time. The first open searches Apple's public
iTunes metadata catalogue, presents candidate cards only when an exact result is
ambiguous, and loads release headers first. Tracklists load only when opened or
selected for downloads; each loaded album must match its advertised track count before
it replaces saved metadata. The regional catalogue is explicitly partial (up to 200
releases), never described as the complete Spotify discography. The country defaults to
US and can be changed under source replacement; it is saved with each snapshot. It needs no Apple or Spotify credentials. Only albums and singles
whose album artist matches the selected artist are indexed; appearances,
compilations and features are excluded. A public Spotify URL remains available only
under Advanced source replacement. In parallel, one bounded six-second spotDL query
checks up to three representative local tracks for a non-tied Spotify identity; it
never expands the artist and cannot delay the otherwise-ready preview beyond that bound.
An empty local artist or album is a supported first-download case: automatic discovery
uses the page name, while an Advanced Spotify link inspects that exact source. Local
sample tracks improve identity discovery but are never a prerequisite for building the
catalogue.

The indexed catalogue is stored in `music_spotify_entity_snapshot`,
`music_spotify_entity_release` and `music_spotify_entity_track`. Reopening reads that
snapshot immediately with no network process. Refresh atomically replaces provider
metadata but retains source-row identities, manual choices and authoritative spotDL
payloads for surviving recordings; Forget deletes the snapshot and remembered Spotify IDs but never local
audio. Snapshot track matches are nullable and revalidated by every music scan, so a
deleted file turns grey and a restored or downloaded file resolves again. Sanitized
and in-app library exports always wipe all three tables.

spotDL album expansion is not trusted merely because the process exits successfully.
The expanded payload must cover every indexed catalogue track before it can replace
that release. Missing rows are recovered together through strict artist/title/duration
queries; a shared standard-edition recording may supply audio only after that identity
check, while its metadata is rewritten to the selected edition. If recovery remains
partial, the original complete indexed tracklist stays in the database and the release
remains retryable. Older truncated iTunes-backed snapshots are detected from broken
disc/track numbering and automatically restored from the fast catalogue on Retry.

When the fast provider fails, the same visible metadata task automatically falls back
to spotDL with eight metadata workers. NaviHUB deliberately omits `--use-cache-file`:
current spotDL uses that flag to select its official Spotify Web API path, and an
application-level limit there can demand a 24-hour wait. The fallback has no
fake percentage or hard completion promise because spotDL enumerates every release,
but it reports elapsed time and found tracks and remains cancellable. Duplicate opens
for the same artist or album attach to that job; a conflicting maintenance task is
named and linked through Tasks. Normal app shutdown terminates the complete spotDL
process tree and clears the in-process owner, so relaunch cannot inherit a stale
inspection.

Downloads resolve only the selected releases. An indexed release is queried by its
known Spotify album URL when available. For an unresolved iTunes release, NaviHUB ranks
release-unique tracks before shared tracks and later tracks before earlier ones, then tries
at most three strict artist/title/duration/edition track lookups to discover one Spotify
album id. It expands only that canonical album URL because spotDL 4.5.2's default provider
failed real `album:` text lookups despite the documented syntax, and shared lead tracks can
identify the standard edition of a Deluxe release. Apple-only terminal `- Single` / `- EP`
presentation suffixes are ignored without weakening Deluxe, Live or Remaster markers. The
album's artist, title and track overlap are validated before its authoritative payload is
persisted. Strict matching
runs again and only unmatched tracks enter the source-preserved Opus, 100-track/four-worker
pipeline. Releases continue independently after one failure and remain selectable for
Retry. Pause is restartable on every platform: the current spotDL tree is stopped,
completed files are scanned and kept, and Resume starts only unresolved work. Cancel
uses the same recovery path and releases the maintenance gate after cleanup. A
user-confirmed mismatch is one-shot and never overwrites the page source; source IDs
auto-link only after all relevant source tracks resolve to one unambiguous local entity.
Metadata and audio child processes also have output-silence watchdogs: a stalled spotDL
tree is terminated with an actionable Retry/Settings error instead of occupying the
maintenance gate indefinitely.
Provider rate-limit messages that request a multi-minute wait are also treated as a
terminal failure and tree-killed immediately, rather than leaving a task apparently
running until the provider's timer expires.

The batch owns the music-maintenance gate from start through its final rescan.
Child spotDL runs and scans re-enter that same unique owner; competing Spotify,
yt-dlp, and manual scan requests fail without replacing the active batch status.
Release previews retain both full-release and strictly-missing size estimates so
large-batch confirmation describes only the files that will actually download.

### Persistent Spotify download queue

Artist/album release selections and missing rows from imported Spotify playlists are
saved under `/music/downloads` before they run. `music_spotify_download_queue` owns one
ordered card per persistent source and `music_spotify_download_queue_selection` keeps
the exact release or playlist-item IDs. Repeated additions merge into that card. Source,
release and item deletion cascades naturally; Refresh keeps selections whose stable
provider release identity survives. Both tables are personal local-music state and are
wiped from every sanitized or in-app library export.

Adding is inert: the user explicitly starts all cards or one card. The mixed runner
holds one re-entrant music-maintenance owner, fetches the next card from the current DB
order after each completion, and rechecks strict local matches immediately before work.
Already-local tracks are skipped without spotDL. Entity cards retain release-by-release
resolution and scanning; playlist cards retain 100-track chunks and scan after each
chunk. One failed card stays visible for Retry while later cards continue. Completed
cards stay until Clear completed.

Every failed source row retains its last exact spotDL error. The expanded card offers
normal-filtered/broader retry and an exact YouTube source replacement without rerunning artist
inspection. Changing either option returns its card to Queued; a later scan clears the error
as soon as a strict local match appears. Entity source rows and all queue rows are wiped from
sanitized exports; imported-playlist snapshots may remain, but their local match, error,
fallback policy and manual source are cleared.

A failed-card Retry asks spotDL to replace unresolved destination files so a bad or
partial prior output cannot be skipped forever; ordinary first runs and Pause/Resume
continue to preserve completed files. Queue reads also re-open a completed card when a
selected local match disappears. Immediate-start confirmation is based on the complete
merged card after new selections are saved, so the 100-track/2 GB warning cannot
understate previously queued work. Partial runs finish with a warning and keep failed
cards visible rather than presenting a generic success.

Pause terminates the active spotDL/yt-dlp/ffmpeg process tree, scans recoverable files,
and persists the current card as paused while preserving whether Resume should continue
the whole queue or only that card. Cancel settles the runtime task and returns unfinished
work to queued; it never removes audio or queue cards. Startup converts any interrupted
`running` row to `paused`, and Resume performs a recovery scan before recalculating the
unresolved remainder. No queued work starts automatically on launch. Arbitrary yt-dlp
URL jobs remain immediate and outside this queue.
Shutdown marks the current durable card paused before the database closes, tree-kills
the active child, and abandons late async scan/write work. Reopening the app therefore
cannot inherit a hidden process, stale maintenance owner, or post-close database write.

## Sonic Archive browsing and acquisition language

**Listening-first archive surface (2026-08-27).** The library lead is an actionable
return point rather than a miniature stats dashboard: it queues recent tracks,
falls back to familiar or first-library tracks before any play history exists,
and links to the full listening history. Artists expose their complete track
catalog after the album shelf. Artists, albums, and tracks have history-entry
persisted sort/filter controls for large collections; search renders every result
returned by the bounded backend query rather than silently hiding results after
the sixth card. The all-tracks tab uses `music:trackPage`: filtering and ordering
happen in SQL and the renderer pulls 192 rows at a time, while explicit Play All
continues to request the complete queue. Recent-track query keys include their requested limit because
Home, Sonic Archive, and Listening Stats intentionally request different windows.

Playback remains the header hierarchy: Play is the single primary action and
Shuffle is the visible secondary. Acquisition and administration are disclosed as
separate **Add music** and **Library maintenance** menus. User-facing acquisition
language describes intent rather than the executable: **Import a playlist**,
**Complete from Spotify**, and **Save audio from a link**. spotDL, yt-dlp, matching,
and destination-folder details remain visible inside their dialogs and readiness
help. Spotify artist catalogues provide albums-and-singles/clear selection and a
missing-release filter for large discographies.

## Player bar layout and the now-playing wash

**Three-zone NowPlayingBar (2026-08-16).** The bar is now `[what is playing] [transport + scrubber] [modes + volume]` rather than one flat row. The old row put the seek bar between the transport and the volume, so the control you drag most sat wherever the layout happened to leave room; stacking the scrubber under the transport buttons puts them together and gives the track text the whole left zone instead of a fixed `w-52`. Every control, handler and title is unchanged — this is layout only, and the player logic (mediaSession, the `quiz-` masking in `displayMeta`, queue rules) was not touched.

Track switching pauses and clears the previous audio before publishing the next
track or awaiting local-path resolution. Failed lookups follow the missing-file
fallback/skip path, and an older lookup cannot replace a newer selection. Unshuffle
restores the current queue occurrence by object identity, even when song IDs repeat.

**Source-aware player actions (2026-08-27).** Both the persistent bar and full Now Playing view identify tracks by their load-bearing id namespace through one shared action component. A `music-<id>` library track shows Like plus Add to playlist; the playlist menu can toggle existing playlists or create one without leaving playback. A `theme-<id>` anime song shows only its theme Favorite action. Quiz, tournament and arbitrary-file audio show neither. Theme favorite state has a dedicated `themes:favorite` read so both player surfaces reflect changes made on the Songs or anime detail pages instead of trusting a stale queue snapshot; mutations invalidate both theme queries and the owning anime detail.

**No colour extraction (2026-08-16, decided with the user).** `NowPlayingPage` gets an ambient wash from the app's OWN accent — a radial `rgb(var(--accent) / 0.10)` behind the artwork — rather than a palette pulled from the cover. The Lain theme is one hue on purpose, and a per-album tint would make this the only screen in the app that isn't. It still lifts the artwork off a flat background, which was the point of the treatment.

The album page needed nothing: `MusicEntityHeader` + `MusicTrackRow` were already the hero-and-track-table shape.

## OS media integration + pop-out widget

**OS media integration + pop-out widget (2026-08-13)** — the global player surfaces on the OS (Windows SMTC flyout + hardware media keys via the `navigator.mediaSession` wiring in `player.tsx`, Windows taskbar thumbnail prev/play/next via `src/main/playerBridge.ts` + the pure `src/main/playerGlyphs.ts` rasterizer — no binary icon assets) and in a frameless always-on-top 480×60 pill for gaming (`src/main/widget.ts`, opened from the NowPlayingBar's pop-out button, `showInactive` so it never steals game focus, `screen-saver` z-level so it floats over borderless-windowed games — exclusive fullscreen bypasses the compositor and cannot be overlaid). The pill carries cover + title, transport, a volume slider, and close; its **song block is a button back into the app** (`player:showMain` → `playerBridge.activateMainWindow`, the same restore/show/focus `receiveOpen` does). Chromium delivers no mouse events inside a `-webkit-app-region: drag` region, so every interactive part is `app-no-drag` and the `flex-1` gutter between the song block and the controls is load-bearing — it is what is left to drag the window by. Data flow: the main window's provider publishes a compact `PlayerSnapshot` (`player:publishState`, no position — the pill has no scrubber) on every track/transport/volume change; main stores it, redraws the thumbbar and mirrors it to the widget over `player:state`; widget buttons and thumbbar clicks funnel into `playerBridge.dispatchCommand`, forwarded to the main window over `player:cmd` — these two are the app's ONLY push channels (frozen by `tests/pushBridge.test.ts`). `PlayerCommand` is a TAGGED union (`{kind:'volume', value}` carries a payload); the thumbbar is rebuilt only when `isPlaying/hasNext/hasPrev` change (a volume drag publishes dozens of snapshots a second), and the pill holds a local volume until its own value echoes back so the slider can't fight the echo mid-drag. Every OS-facing surface renders `displayMeta()` from `lib/playerMeta.ts`, which masks `quiz-` tracks ("Song Quiz", no artist/album/cover) so the overlay can't spoil a quiz answer. The widget window renders `PlayerWidgetPage` alone (a `#/widget` hash branch in `main.tsx` — no router/query client/second `AudioPlayerProvider`/BootSequence), is excluded from the UI-zoom and menu-bar `getAllWindows` loops in `ipc.ts`, closes with the main window, and persists its position (clamped to live displays by `src/main/widgetCore.ts`) in the `widget.pos` setting. Tests: playerMeta, playerGlyphs, widgetCore, pushBridge.

**Tests** — `themeRepo`, `themeImport`, `bracket`, `tournamentRepo`, `quizRepo`, `music`, `musicRepo`, `playerMeta`, `playerGlyphs`, `widgetCore`, `pushBridge`

---

## Quiz broadcast overhaul

**Replayable hub and spoiler boundary (2026-08-25).** `/quiz` is no longer a date-seeded daily challenge. It is a grouped Audio / Images / Connections / Library / Tournament hub with Party as its single primary action, plus Quick Solo, a fresh-seed Random Challenge, and Resume Tournament when the versioned save slot exists. `quiz:availability` returns format readiness under the same `QuizConsumptionScope` used at deal time; disabled cards explain their minimum. `consumed` is the default everywhere. Cast, voice-credit, synopsis, song, image, connection, graph, and tournament media pools therefore use the completed positional status. Manga panels apply the stronger page boundary: read chapters or pages through `last_read_page`, excluding the first two and final page when the chapter is long enough. The `all` override is explicit and carries a spoiler warning.

**Shared decisions and history.** `@shared/quizCore.ts` owns seeded RNG, identity-balanced dealing, deck-boundary anti-repeat, valid-key answers, score policies, and the exact personal-best comparator. Central quiz sessions store `correct`, `attempted`, `scorePolicy`, `playMode`, and `seed` in `quiz_session.settings`; no schema change was needed. Missing or malformed legacy settings are solo. `history(kind, limit, playMode)` filters party rows out of solo records. Accuracy ranks by correct/attempted, longer round, newest; point games rank points, accuracy, newest; party and tournament summaries have no personal best. `QuizRecord` shows point records beside their real accuracy. `quizAudioCore.ts` carries the testable audio decisions: Reverse auto-auditions and highlights clip 1, pauses its decision timer while audio plays, and gives every option the same repeatable snippet/offset path; request sequences reject stale URL resolutions, and cleanup only stops `quiz-` tracks.

**Library question integrity.** Cast seeds are restricted to photographed actors in movies/TV; movie seeds use only the first ten billed cast while TV stays uncapped. Every real in-scope screen appearance is excluded from wrong options, including lower-billed movie roles. Voice Actor Quiz is anime-only: it shows one character and asks for a different-title, genuinely different character sharing any Japanese VA. Every other character sharing one of the source's VAs is barred from the wrong answers. Known-gender answers require same-gender distractors, then role prominence and release-era affinity rank them; unknown gender falls back to those latter signals. Synopsis aliases are redacted case-insensitively and excerpts end on sentence boundaries where possible; same-media-type distractors are preferred before era/genre affinity, with a text-only hard mode. Identity-balanced deals prevent prolific titles, actors, voice actors, and studios from monopolising a round.

**Consolidated challenge contract.** One `quiz:challengePool` invoke accepts a discriminated `QuizChallengeRequest` (`kind`, deterministic `seed`, `scope`, `length`, options) and returns presentation-neutral validated questions. `quizChallenges.ts` is the pure generator. Routes are `/quiz/images` (`imageReveal`), `/quiz/silhouette`, `/quiz/connections`, `/quiz/chronology`, and `/quiz/higher-lower`. Image Reveal uses four equal four-second CSS stages worth 400/300/200/100; Timer Off changes these to manual Reveal more steps. Every new question mounts a keyed image already at Stage 1, preventing the previous answer's clear state from transitioning across the new cover. Loading gates timers/answers, five Solo and ten Party spares replace broken files, options stay within one media type with era/genre affinity, and Party strips option cover images while retaining fixed 2/1 scoring. Chronology exhausts resolved franchise groups before falling back to same-type shared-company and shared-person groups. It requires four distinct release years and covers, generates multiple unique sets from large groups, balances connector/title reuse, and reveals both the relationship and years. Its direct position controls support mouse and arrow keys; Solo and Party both allow 30-second owner turns. Connections is movie/TV-only and mixes actors with directors in the same person pool, so option type cannot reveal the answer. Actor appearances are capped at each title's first ten billed cast; directors are uncapped. Every shared eligible person remains valid while one is displayed, and the reveal names their character or director role in both titles. Person/title-balanced dealing prevents prolific credits from dominating.

**Higher or Lower.** Setup chooses one media category and one concrete fact. Release dates ask older/newer and compare displayed years; episode/chapter/page counts ask more/fewer; movie runtime and game/VN length ask longer/shorter; personal scores ask higher/lower and display the user's `/10` rating. Only covered titles with valid, non-tied values enter the selected pool, and availability reports each category/fact combination separately. The screen follows the familiar two-card information pattern: the reference value is known, the challenger value stays hidden until the call, then both exact values remain visible for the reveal. Solo keeps three lives and deals one seeded comparison at a time, carrying the challenger after a correct call, retaining the reference after a miss, and avoiding recent challengers without an artificial round ceiling. Party keeps its fixed question count and deals independent pairs so one side's result cannot alter another side's question.

**Library Grid and Movie Chain (2026-08-28).** The two solo screen puzzles share one completed-by-default movie/TV candidate projection and the consolidated `quiz:challengePool` channel. Library Grid proves every row/column intersection has at least two answers and proves a global nine-title matching before returning a board; original titles are search aliases, not separate identities. Its public clue families are main cast, director, genre, company and decade. Movie Chain builds undirected edges from actors billed 0-9 on both movies and TV plus uncapped directors, then chooses endpoints at exact shortest distance 2/3/4 for Easy/Normal/Hard. Availability uses one bounded BFS from each title, reports endpoint-pair counts by media selection and difficulty, and never silently downgrades a requested route. Both games use point scoring, explicit `all` spoiler warnings, no timer, no daily persistence and no Party adaptation. Chain records are separate QuizKinds by difficulty and lower the shared personal-record minimum to one route only for those kinds.

**Libraryle, Mystery Career, and Link Wall (2026-08-30).** These replayable solo movie/TV games extend the same candidate projection and consolidated challenge contract. Libraryle hides one covered title and compares up to eight searchable guesses across year/direction, type, genres, companies, directors, and top-ten cast. Mystery Career chooses an actor or director with six eligible titles, reveals one credit at first and another after every miss, and searches only people with enough in-scope credits to be plausible. Link Wall indexes top-ten actors, uncapped directors, companies, resolved franchise components, genres, and decades, then returns sixteen titles only when exact-cover validation proves one four-group solution using at least three relation families. The state machine caps selection at four, charges four mistakes, and reveals complete group proofs after the round. All three default to completed titles, keep Movies/TV/Both setup, use point-ranked one-board records, and are excluded from Party.

**Silhouette.** `/quiz/silhouette` is anime-only because TMDB character images are actor profile photos and opaque imported portraits cannot produce a real alpha silhouette. Instead, `@shared/silhouetteQuiz.ts` applies an opaque-image-safe grayscale/contrast/blur/crop treatment and reveals the original after answering. Name the character uses unique-name distractors from other anime, matching known gender when at least three matches exist. Name the anime excludes every alternate valid appearance, prefers era/genre affinity, and balances answer titles. Both modes require four options and exact 5/10/20 rounds, request five Solo and ten Party spares, gate timers/answers on image load, and reveal the character plus anime context. Party uses the same obscuring treatment and title-only choices.

**Couch party.** `/quiz/party` uses `@shared/partyQuiz.ts`: 2/3/4 fixed Player labels or Team A/B, five owned questions per side, ownership rotating independently of steals, 2 points for the owner and 1 for the next side's single five-second steal. It supports the library and challenge formats, with ordered answers editable during the steal. Song Relay uses masked `quiz-` audio, identical ten-second clips, a twenty-second owner clock, and no auto-advance. Only one final summary row is saved (`playMode:'party'`, labels, scores, winner/tie, count, scope, seed).

**Groups then knockout.** Tournament format is Knockout or Groups then knockout (8/16/32/64). `@shared/tournamentGroups.ts` creates immutable groups of four, all six pairings, one point per win, shared non-boundary positions, and cutoff-only tiebreak specifications. Qualifiers retain their group and finishing place so adjacent groups cross-seed A1 vs B2 and B1 vs A2 instead of creating immediate rematches. Autosave is version 3 and contains format, stage, original group field and standings, active tiebreak, knockout bracket, source label, original size, seed, and undo stack. Structural validation accepts only unfinished saves with a playable match. A synchronous interaction lock and final confirmation prevent duplicate resolution and accidental champions. Knockout placement numbers share ranks by elimination round (`1, 2, 3, 3, 5...`). Everyone is accepted only for resolved pools of at most 256.

---

## Songs / theme library

**Songs / theme library (2026-07-25)** — `/anime/songs` (`ThemeSongsPage`, an `ANIME.children` sidebar link + CommandPalette item; route sits above `/anime/:id`) replaces the sidebar's old "Shuffle Themes" button (gone, with `player.tsx:quizSongToTrack` — the page maps its own tracks). Every imported OP/ED as a playable list, where **the anime half of the filter IS `MediaListFilter`**: `repos/themeRepo.ts:list({media, search, songType, favoriteOnly, playableOnly})` calls mediaRepo's now-exported `buildWhere`/`buildOrder` (alias the media table `m`), so statuses/tags/ranges/favorite/season mean exactly what they mean on the anime list page — the page literally reuses `MediaFilterPanel`, the sort menu and `qk.mediaCounts.facets('anime')`. `mediaType` is forced to `'anime'` in the repo. Song-level extras: OP/ED, hearts, and a search that also matches song title/slug/artist (wider than the media filter's title-only search). Ordering groups songs under their anime (`COALESCE(sort_order,1000), ts.id`) EXCEPT `random`, where `buildOrder`'s new `randomIdExpr` arg hashes `ts.id` so a shuffle deals songs, not whole shows; every play button queues the WHOLE filtered set (`theme-<id>` id namespace, unchanged). **New personal column `theme_song.favorite`** (init.sql + schema.ts + `ensureColumn`, wiped in sanitizeSql.cjs, also on the detail page's `ThemeRow` heart): the AnimeThemes import is a clean replace, so `themes.ts` snapshots hearted `external_id`s before the DELETE and restores them on insert — mirrored in bulk-import.cjs. Tests: themeRepo.test.ts (shared-filter reuse, song filters, seeded song shuffle), themeImport.test.ts (favorites survive a refresh).

**Bulk theme backfill and repair (2026-09-06)** — Bulk Import exposes a dedicated local preview for AniList anime with zero `theme_song` rows; starting it reuses the Library Refresh task/status/cancel loop and fetches OP/ED metadata plus local audio. The Refresh tab's **Update anime theme songs** preset checks every AniList anime against AnimeThemes, compares external song IDs (not count alone), and counts unchanged titles as skipped. A mismatch atomically mirrors the source, preserving favorites for retained IDs and retaining healthy local audio; only new or audio-missing songs are downloaded. The comparison passes the fetched payload into the importer so each anime is requested once.

## Tournament quiz mode

**Tournament quiz mode (2026-07-16, expanded 2026-08-25)** — `/quiz/tournament` presents two contenders side by side and supports both knockout and groups-then-knockout. Pool sources remain music, themes, characters, media, credited people, and custom lists; media/theme/character sources default to completed content. `@shared/bracket.ts` is the immutable knockout engine and `@shared/tournamentGroups.ts` owns the group phase. `quiz:tournamentPool` still returns the complete normalized source before a seeded deal. Audio auditions retain the guarded `tourney-<key>` namespace so an image-only bracket cannot stop background music.

**Bracket tree, full standings, resume (2026-08-23; hardened 2026-08-27)** — Show bracket remains a view-only tree, but a contender is revealed only after appearing in the current or a completed real matchup. Untouched first-round pairings and bye entrants remain hidden, so opening the tree cannot spoil future matchups. Final standings use shared elimination-round ranks (`1, 2, 3, 3, 5...`). Resume uses structurally validated version-3 state in `tournament.saved`, including group standings, cutoff tiebreak, knockout bracket, source label, original size, seed, and undo history. Save and exit is explicit; abandon and discard require confirmation; failures use the global toast path. A resumed run freezes its source label and size, and Run it back preserves those plus format. Group history records the original field size rather than only the knockout qualifiers. No schema change.

## Library MCQ quizzes

**Cast / VA / Synopsis quizzes (2026-08-23; cast and VA rebuilt 2026-08-27)** — three hub cards sharing one loop skeleton (`components/libraryQuiz/LibMcRound.tsx`: index/streak/countdown/keyboard/auto-advance/one-shot `endGame()` with the decide-best-before-invalidate rule) while pure builders own question generation. Pools live in `quizRepo.ts` behind `quiz:castPool|vaPool|synopsisPool`:
- **Cast** (`/quiz/cast`, kind `'cast'`): a photographed actor maps to one of four movie/TV titles. Movie seeds stop at TMDB billing order 9; TV cast is uncapped. Every in-scope screen credit remains forbidden as a distractor, including lower-billed movie appearances, so exactly one displayed option is factually correct. The seeded builder balances both actors and titles. `/quiz/character` redirects here; legacy character-session history remains under its old kind.
- **Voice actors** (`/quiz/va`, kind `'va'`): one anime character points to another character from a different anime through a shared Japanese VA. The pool consolidates every Japanese VA on each character/title appearance. `@shared/vaQuiz.ts` requires four distinct option titles, exactly one factual connection, known-gender distractors matching the answer, and seeded balance across voice actors, titles, and characters. The reveal names the shared VA. `character.gender` is nullable canonical AniList data added by an idempotent migration; existing rows remain unknown until the anime is re-imported. Solo and Party use the same builder.
- **Synopses** (`/quiz/synopsis`, kind `'synopsis'`): the default Safe library pool combines completed titles with unfinished/planned titles only when no prequel relation or obvious sequel marker is known. Completed only remains available; there is no unrestricted unseen-content option on this route. `@shared/synopsisQuiz.ts` provides the seeded builder for both Solo and Party, balances question media types, and requires all four options to share one media type. Full/original titles, derived franchise names, relation-title aliases, and every linked character name/native name are redacted before a sentence-bounded excerpt is shown. Text-only permits coverless seeds and remains the hard option.
- **Manga panels** (`/quiz/panels`, kind `'mangaPanel'`): safe seeded pages from locally linked manga (`manga.panelPool`, channel `quiz:mangaPanelPool`). Consumed mode is page-progress based regardless of the manga's overall status: finished chapters qualify, and partial chapters stop at `last_read_page`. Eligible pages are flattened before sampling so large chapters are not underweighted; long chapters always drop the first two pages and drop the final page once read. `@shared/mangaPanelQuiz.ts` deterministically builds the four-title options. Solo requests five spares and Party ten; image loading pauses the timer and disables answers, with unreadable panels replaced without charging a miss. A Solo round refuses to start shorter than its selected length, while exhausting Party replacements cancels the unsaved round. EPUB chapters remain excluded; reading state is never mutated.
Consumed entity/fact/audio/image pools use `useAllCompletedStatuses()` and positional completed meaning, so renamed statuses remain safe. Synopsis and Manga Panels are the deliberate exceptions described above: synopsis admits likely first entries, while panels rely on exact local reading progress. Smart distractors retain the shared year/genre affinity fields.

## Song quiz modes

**Classic / Arcade / Reverse + snippet clips (2026-08-23)** — `SongQuizPage` grew a mode pill writing THREE separate kinds so personal bests stay meaningful: classic stays `'song'` (accuracy), arcade logs `'songArcade'` (endless, timer forced on, 3 lives, speed points = 100 + 10×seconds left → joins `SCORE_RANKED_KINDS`, which now also legitimately holds `'shiritori'`), reverse logs `'songReverse'` (the anime is named; four anonymous clips audition via keys 1-4 / ▸ buttons, Pick or Enter locks one — options are keyed by themeId, so a same-anime sibling theme can never appear as a distractor). A **Clip length** pill row pauses playback N seconds into every play (10/15/20s; implemented as an effect on `player.isPlaying` so replays re-arm it) with the countdown still running. Distractors in every mode come from `pickDistractors` instead of the old blind slice.

## Guess the Track

**Progressive intro game (2026-08-28).** `/quiz/guess-track` is a separate five-track Solo game over either completed/all anime themes (OP/ED and era filters) or the indexed music library (all, liked, playlist, artist, or album). `@shared/guessTrack.ts` normalizes title/performer identities, groups duplicate anime uses and album copies into one recording, preserves every grouped entry as a valid answer, balances the seeded deal across anime or artists, ranks autocomplete results, and owns the full attempt state machine. The clip ladder is 1, 2, 4, 7, 11, then 16 seconds from the opening. Each unlocked clip autoplays; unlimited replay costs nothing; four misses reveal the theme performer or the first Unicode character of a music artist; a correct answer scores 6 down to 1 and a sixth miss scores zero.

The reveal restarts the full recording but retains the `quiz-guess-track-` namespace and masked metadata, so it cannot increment music play counts or expose the answer through the persistent bar, widget, SMTC, or Media Session. Async local-path resolution uses a request epoch, cleanup stops only `quiz-` audio, and missing files are replaced from a seeded spare deck without spending an attempt. Availability reports theme and music identity counts separately plus a combined route-ready count through the existing `quiz:availability` invoke. Results save as distinct points-policy kinds, `guessTrackTheme` and `guessTrackMusic`, with solved count, fixed attempted count five, filters, per-track attempts/points, play mode, and seed in `quiz_session.settings`; no schema change or new IPC channel was required.
