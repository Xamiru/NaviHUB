# Music, theme songs and quizzes

> Reference detail. The rules an agent must not break live in
> [CLAUDE.md](../../CLAUDE.md#hard-invariants) — this file is the "how and why" narrative.

**Covers** — the theme-song library that reuses the media filter, and the single-elimination tournament bracket.

**Key files** — `src/main/repos/themeRepo.ts`, `src/main/themes.ts`, `@shared/bracket.ts`, `src/main/repos/tournamentRepo.ts`, `src/renderer/src/lib/player.tsx`

**Music module map (2026-09-26).** Main process: `music.ts` (scan, tags, genres), `musicArt.ts`,
`musicSpotify.ts` (process ownership, inspection, the persistent queue runner and acquisition),
`musicSpotifyCore.ts` (pure URL/payload/release decisions), `musicSpotifyMatch.ts` (pure
recording matching), `musicCatalogue.ts` (iTunes catalogue), `musicToolSetup.ts` (tool readiness,
YouTube access check, cookie picker, Deno install), `musicTools.ts` (shared yt-dlp options),
`musicLyrics.ts`, `musicUrlQueue.ts`, `musicSpotifyRecovery.ts`, `musicAcquisition.ts`, `spotifyWeb*.ts`,
`youtubeMusic.ts`. Renderer: `pages/Music*.tsx`, with the library tabs, shared cards/`TrackList`
and the Spotify import dialog in `components/music/`. Music pages never import another page
(guarded by `tests/performanceBoundaries.test.ts`).

## Personal track tags and smart playlists

Track actions open a labelled tags/standout dialog; standout marks appear on album
track rows (`musicJournal.standouts`) and remain independent of Liked Songs.
`musicJournalRepo` owns `music_track_personal`, attached to stable track IDs. Same-path
rescans preserve these rows; deleting or pruning the local track cascades them. Tags are
explicitly authored, Unicode-normalized, trimmed, lowercase and deduplicated. The album
listening journal (ratings, shelves, reviews, dated listens and `/music/journal`) was
removed on 2026-09-26; see [removed.md](removed.md).

`/music/smart` owns saved `music_smart_playlist` rule definitions, separate from manual
playlists and Spotify snapshots. Rules combine likes, played/unplayed, min/max plays,
days since last played (including never played), artist text and track tags
(all or any). Different filter families always combine with AND. Order is deterministic, and the
user-selected 1–2,000-track limit bounds playback; preview pages hold 50 rows and show
both capped playlist size and uncapped match count. Empty filters select the local
library up to the limit. All predicates are validated and SQL values are parameterized.

`musicSmartRepo` evaluates rules on each read against the current library. Playback
fetches a fresh bounded queue of matching tracks, then uses the normal `music-` IDs
and null `mediaId`; an already playing queue stays a snapshot. Unsaved rules cannot
start playback. Refreshed definitions update pristine forms; conflicting unsaved
forms offer Reload saved rules before saving or playback. `musicJournal:*` and
`musicSmart:*` IPC methods use keys under `qk.music.all`, and every mutation keeps
the broad music invalidation. All seven new music/game personal tables are cleared
from shared exports, including when other progress/ratings export options are enabled.

## Music artwork lookup

A hand-picked album cover or artist photo (Library maintenance → Change cover…/Change photo…) is held by the `image_override` restore triggers against the scanner, Find and the missing-file sweep; only Clear or Restore releases it. See media-types.md "Hand-picked images".

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
Artist photos use the remembered Spotify id, else the single Spotify artist id
that matched imported playlist rows credit under the artist's exact name. Then
comes Spotify's web search (anonymous `searchSuggestions`, 640 px avatar) when
exactly one artist id carries the exact name, then an exact, non-disambiguation
Wikipedia page image, then exact-name Deezer. The photo lookup never writes
`music_artist.spotify_id`; identity stays with the catalogue flow.

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
playlist link. NaviHUB does not log into Spotify and does not automatically sync after import.
Refresh source updates metadata atomically, retains local audio and manual decisions for
surviving source IDs, and removes source rows only after a complete provider count is validated.
The normalized Spotify playlist id is unique, so importing the same source again opens its
existing local snapshot. Spotify supplies metadata only; audio comes from YouTube Music.

**Native reader, no spotDL (2026-09-26).** Spotify's February/March 2026 Web API changes removed
other users' playlist contents from development-mode apps, which broke spotDL's shared-client
metadata path (it hung silently or demanded day-long rate-limit waits, and fetched one track per
API call). `spotifyWeb.ts` (IO) and `spotifyWebCore.ts` (pure) now read Spotify keylessly: the
public embed page issues an anonymous web-player token, and that token answers the web player's
own persisted GraphQL queries (`fetchPlaylist`, `getAlbum`, `searchSuggestions`,
`queryArtistDiscographyAll`) at 100 tracks per request. Known query hashes are built in; a
rotated hash (HTTP 412) triggers one rediscovery from the live web-player bundle (and its artist
route chunk), and an expired token (HTTP 401) is refreshed once. Payloads are mapped onto the
unchanged spotDL song-object shape that `raw_json` has always stored, so existing rows,
validation and matching need no migration. `saveSongs()` is the in-process replacement for
`spotdl save <targets>`: album/artist/playlist links expand, any other target is a track search
returning its single best hit. A playlist read reports real page progress, local files and
episodes keep their positions as unimportable rows, and a count that changes mid-read aborts.
`music_spotify_playlist` owns source identity and `music_spotify_playlist_item`
keeps the ordered Spotify metadata, downloaded cover, and original song payload.
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
punctuation, and whitespace. Recording-title keys ignore remaster labels and their attached years (before or after the label, including the newer "2017 Master" wording), featuring credits ("(feat. X)", "(with X)"), and "Single Version"/"Album Version" labels, so the original and remastered releases reuse one local recording; duration still separates different edits. Unrelated years and other version words such as `live` remain meaningful.
Recording-variant markers are read only from version text (brackets, a " - " suffix, and the
album), never from the main title, so "Who Wants to Live Forever" is not a live recording.
Local candidates are indexed by base title (subtitles and version suffixes removed).
The first tier requires the same normalized title, primary artist against the folder
artist or one component of the folder or `tag_artist` credit ("Philip Bailey, Phil Collins"),
and both durations within three seconds. A subtitle present on only one side ("2 + 2 = 5
(The Lukewarm.)") is accepted in this tier only when the album matches too (year prefix
ignored). Several first-tier copies are one recording on several releases or duplicate rips:
the album match wins, then the closest duration, then the oldest row. Playlist rows alone get a second tier for a
unique same recording on another release: album differences such as standard,
Deluxe and greatest-hits compilations are ignored, and duration tolerance is 3% with
a three-second floor and eight-second ceiling. Meaningful Live, Acoustic, Remix,
Instrumental, Demo, Radio Edit, sped/slowed and re-recorded markers must
agree. Ambiguous second-tier rows remain missing but expose conservative local candidates through
**Use library copy**; an explicit choice survives later scans while its file exists.
A 2026-09-26 run against the live library and eight "This Is …" playlists raised matches from
224 to 238 of 418; every remaining same-title near miss is a different take, live, edit or
"Taylor's Version" recording.
Artist/album source association uses the same strict-first, conservative unique cross-release policy as playlists. When several compatible local remasters exist, matching prefers the oldest local row. Normal download batches coalesce original/remaster duplicates within three seconds of duration, retaining all source rows; explicit manual sources and broader retries stay separate. A scan also rechecks remaster source titles when targeted indexing reports only the original title. Unmatched source rows
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

**Source approval and provenance (2026-09-18).** `musicSourceMatch.ts` owns remaster
normalization and recording-variant markers for local matching and independent remote
source assessment. Automatic acquisition requires explicit title, artist, variant and
duration evidence. Unknown or contradictory evidence is Needs review; Spotify tags
written onto the output are never independent evidence. Broader matching remains opt-in
and requires review. Automatic sources are found with keyless YouTube Music song search
(`youtubeMusic.ts`, the innertube endpoint ytmusicapi uses), ranked by
`musicAcquisition.rankYtmSources`, then inspected with standalone yt-dlp and pinned. A
retry query drops a bracketed or "- Remastered" suffix. In normal mode a candidate whose title
differs is discarded ("YouTube Music has no matching recording") rather than inspected; only
same-title near misses are kept for review. Broader retries also search YouTube videos and
always need review. The primary artist may be one member of a joined credit ("A, B"), and
official uploads from an artist channel ("IndilaMusic", "(Clip Officiel)") are recognised
without trusting fan re-uploads.

**Non-English catalogues (2026-09-28).** Under English, YouTube Music romanizes artists
("Keina Suda") and pairs native titles with a translation ("紅蓮華 - Gurenge"); the native
catalogue keeps 須田景凪 and 紅蓮華, and Spotify mixes both conventions. Songs whose title,
artist or album contains kana, Han, Hangul or Cyrillic are therefore also searched in that
catalogue (`sourceSearchLocales`: ja; ja then zh-TW; ko; ru), and `rankYtmSources` combines
every language view of one video, so a title can match in one and the artist credit in the
other. `titleAliases` accepts either half of a native/Latin title pair (" - " or a trailing
bracket) unless the Latin half is version wording. Artist credits compare through `&`/`and`,
Latin accents, a leading "The", spacing and two-word order; "Original Mix" is the plain track
and "Mono Version" equals "(Mono)". Any "live" in a release title marks its tracks live: "Live
Through This" (studio) cannot be told from "Live and Dangerous" (concert), so the studio album
needs review when the source reports no album rather than risking a studio take for a live one
(user decision, 2026-09-28). yt-dlp
reports YouTube's translated title ("Gurenge"), so a strong YouTube Music match for the exact
video is validated when yt-dlp confirms its duration and no variant wording; a retry that reuses
that validated video without searching applies the same checks. A retry reuses
only an approved or validated saved source; a pick that failed review is searched again. An
unreadable search page is a Lookup error rather than "no matching recording", unless an earlier
search for the song already answered: a later failing catalogue language only narrows the
evidence, and nothing found then is still a Lookup error. A throttled YouTube session ("try
again later", "rate-limited", HTTP 429, or three bare "Video unavailable" answers in a row for
videos the catalogue just listed) pauses the queue with a note instead of failing every
remaining song; those songs keep no error, and a paused run never stamps its unstarted songs as
failed. Remaining gaps
stay in review: Chinese artists that YouTube Music credits only in Chinese ("Jay Chou" vs
周杰倫), Latin transliterations of native-script uploads ("Gruppa krovi"), and songs the
catalogue lacks.

The recovery dialog (**Choose audio**) is shared by playlist and artist/album tracks. It shows
the song's current problem, searches YouTube Music on open (official audio first, then its
videos, native-script catalogues first for a native-script query; plain YouTube search only
when that fails) and marks strong results **Match**; the
library section is prefilled with the title. **Download this** / **Download link** approves that
exact permanent source and starts it at once, even while the queue runs; **Use this** or
**Import an audio file…** links a library copy. The separate broader-matching toggles and the
start-now checkbox were removed: choosing a source is the explicit broader step. `music_source_evidence` persists observed metadata, explicit approval, validation,
phase and an acquisition token independently of Spotify metadata. Old saved URLs have
no approval record and remain unconfirmed. Changed or unavailable sources retain the
choice and report the failure; they never silently substitute audio. Playback stream
URLs are re-resolved and never used as persistent identity. Preview request generations
prevent stale responses replacing the current choice.
Preview extraction returns the stream and independently observed metadata in one
yt-dlp invocation. A bounded in-memory cache reuses that exact source's metadata
for approval for up to five minutes, keyed by the current tool/cookie configuration;
it never retains playback URLs. Batch inspection also warms this cache. Failed
acquisition, missing extraction evidence, expired entries and configuration changes
force a new inspection. A cache hit does not grant approval: **Use this version**
still writes explicit consent. The recovery dialog immediately announces checking,
prevents repeated submission, and closes after saving while broad music queries
refresh in the background. Listening alone does not invalidate library queries.

Each acquisition writes `[navirun-<token>] [navihub-<spotify-id>]` markers. Linking requires
the exact acquisition token and a validated file duration consistent with independent
source evidence. A successfully validated, approved source links without another approval.
Older or unverified files remain explicit candidates. `music_track.spotify_review_required`
quarantines rejected files from automatic matching. Conflicting manual choices remain
separate. `music_audio_source` records validated source-to-file associations independently
of queue history; compatible requests reuse the audio while preserving source occurrences.
A final local-file check precedes acquisition. This does not clean up or delete duplicates
from the existing library.

**Tools and diagnostics.** `musicTools.ts` builds cookies, runtime, ffmpeg, retry and worker
options for every yt-dlp call. Direct jobs ignore ambient yt-dlp configuration. NaviHUB does not
edit external tool configuration or update tools automatically. Readiness (`detectMusicTools`)
needs only yt-dlp and ffmpeg (plus readable cookies when configured); Spotify metadata needs no
tool. It also reports the JavaScript runtime yt-dlp will use (Deno, else Node.js 22+; Node 20 is
rejected by yt-dlp) and whether Opus cover art can be embedded (yt-dlp's optional mutagen
library, detected from `-v` output). **Install Deno** downloads the official release into
`~/.deno/bin`, which `musicToolOptions` searches first. Exact-source failures identify lookup,
extraction, transfer/processing, indexing or linking, retaining useful diagnostics with
authentication and format errors classified first. Signed stream URLs and cookie values are
redacted. Batch inspection associates warnings/errors with each canonical source and splits the
URL list across the worker budget. A warning about one video must never be copied onto another
song, and a token warning cannot replace a concrete parse failure.

**Native acquisition.** Each validated song is downloaded by one yt-dlp process: inspection keeps
the full info JSON, `taggedInfoJson` overwrites title/artists/album/album artist/track/disc/date
and the thumbnail with Spotify's metadata and cover (clearing YouTube's description, category
and timestamps), and `--load-info-json` downloads without a second extraction. `--format`
selects the observed codec exactly (`bestaudio[acodec=opus]`, `^=mp4a` or `=mp3`) and
`--extract-audio` without `--audio-format` copies the stream, so audio is never transcoded;
cookies from a YouTube Music Premium session can expose 256 kbps AAC. Opus covers are embedded
when mutagen is present, otherwise the Spotify cover is written as the album folder's
`cover.jpg`. Output keeps the staged `Artist/Album/D-TT - Title [navirun-…] [navihub-…]` layout,
so indexing, provenance linking and marker cleanup are unchanged. Per-track downloads run in the
one-to-four worker pool; each song keeps its own error.

Source access evidence is cached for five minutes, keyed by tool/runtime/ffmpeg and cookie
file identity/mtime, and invalidated after failed acquisition. Permanent source URLs survive
retries. The queue owns every child process tree, including a separate Windows taskkill per PID.
Transient audio-command failures have at most three orchestration attempts with bounded backoff
and zero inner yt-dlp retries. Authentication, unavailable-source, format and validation errors
require correction.

**Completion and recovery.** Immediate Spotify actions enqueue and start the same persistent
queue used by Downloads. Incomplete album metadata stays incomplete; no canonical-album audio
fallback may bypass source verification. Metadata checkpoints, complete snapshots, source
order, lazy album expansion and small-release batching remain. Completed Spotify outputs move
from `.spotdl/navihub-downloads` (the historical staging path, kept so older interrupted runs
recover) without overwriting existing audio. The private
pending-index manifest remains in `.navihub-downloads` and survives interruption. An interrupted provenance rename that cannot be finished (both names exist, the file is gone, a locked file, an unreadable record) is logged and dropped rather than thrown, so it can never block later runs; the library row keeps the original name. Explicit queue
recovery also reads old `.navihub-downloads` outputs. Approved linking selects the
exact acquisition token before considering duplicate files; unrelated old copies cannot block
it. Filename markers are removed only after an archived source or durable review candidate
exists, so unresolved files keep their recovery identity. Existing duplicates are not deleted.
URL jobs use per-item staging and yt-dlp's structured after-move marker.
Each URL item checkpoints its final path before movement and persists indexing/ready/failure
state. Partial enumeration is saved but never called complete. A retry can finish indexing
without downloading again, and successful outputs survive a partially failed batch.
`indexMusicFiles` parses only completed paths, does not prune unseen library rows, and keeps
the maintenance owner through indexing and linking. Explicit resume recovers pending outputs;
it does not run a full-library cleanup scan. Cancellation stops the owned process tree,
retains completed files and never starts downloads automatically on relaunch.

Queue updates remain polled and mutations invalidate `qk.music.all`. Music playlist and URL rows use stable scope keys for incremental rendering, preserving
the rendered batch during polling, filtering and recovery actions. Queue/evidence/URL checkpoint
and source-archive tables are personal state and are removed by export sanitization. The
queue CHECK-constraint rebuild preserves old IDs, source selections and order and is replayed
against a pre-change database. Source-resolution, transfer/processing and targeted-indexing
elapsed times are logged; synthetic tests measure operation counts rather than promising
network speed gains. Windows preview/download/pause/restart and large-list scrolling still
require laptop verification.

### Artist and album downloads

Artist and album headers open a persistent release catalogue rather than expanding
the full Spotify discography every time. The first open searches Apple's public
iTunes metadata catalogue, presents candidate cards only when an exact result is
ambiguous, and loads release headers first. Tracklists load only when opened or
selected for downloads; each loaded album must match its advertised track count before
it replaces saved metadata. Apple omits tracks it does not sell in the chosen country (a
single can advertise one track and list none, a Deluxe edition 16 and list 15), so an empty,
short or failed Apple track list falls back to the same release on Spotify: an album search
filtered by release title (Apple's " - Single"/" - EP" suffix ignored) and album artist,
preferring the edition whose track count matches Apple's. That release is hydrated from
Spotify and remembers its Spotify album id. When several releases are added at once, one
unreadable release is reported (`unreadable`) and the others are still queued. The regional catalogue is explicitly partial (up to 200
releases), never described as the complete Spotify discography. The country defaults to
US and can be changed under source replacement; it is saved with each snapshot. It needs no Apple or Spotify credentials. Only albums and singles
whose album artist matches the selected artist are indexed; appearances,
compilations and features are excluded. A public Spotify URL remains available only
under Advanced source replacement. In parallel, one bounded six-second Spotify search
checks up to three representative local tracks for a non-tied Spotify identity; it
never expands the artist and cannot delay the otherwise-ready preview beyond that bound.
An empty local artist or album is a supported first-download case: automatic discovery
uses the page name, while an Advanced Spotify link inspects that exact source. Local
sample tracks improve identity discovery but are never a prerequisite for building the
catalogue.

The indexed catalogue is stored in `music_spotify_entity_snapshot`,
`music_spotify_entity_release` and `music_spotify_entity_track`. Reopening reads that
snapshot immediately with no network process. Refresh atomically replaces provider
metadata but retains source-row identities, manual choices and authoritative Spotify
payloads for surviving recordings; Forget deletes the snapshot and remembered Spotify IDs but never local
audio. Snapshot track matches are nullable and revalidated by every music scan, so a
deleted file turns grey and a restored or downloaded file resolves again. Sanitized
and in-app library exports always wipe all three tables.

Spotify album expansion is not trusted merely because the read succeeds.
The expanded payload must cover every indexed catalogue track before it can replace
that release. Missing rows are recovered together through strict artist/title/duration
queries; a shared standard-edition recording may supply audio only after that identity
check, while its metadata is rewritten to the selected edition. If recovery remains
partial, the original complete indexed tracklist stays in the database and the release
remains retryable. Older truncated iTunes-backed snapshots are detected from broken
disc/track numbering and automatically restored from the fast catalogue on Retry.

When the fast provider fails, the same visible metadata task automatically falls back
to the keyless Spotify reader, which pages the complete discography and reads each release
(four at a time), reporting releases read and remaining cancellable between requests. Duplicate opens
for the same artist or album attach to that job; a conflicting maintenance task is
named and linked through Tasks. Normal app shutdown terminates every music tool
process tree and clears the in-process owner, so relaunch cannot inherit a stale
inspection.

Downloads resolve only the selected releases. An indexed release is queried by its
known Spotify album URL when available. For an unresolved iTunes release, NaviHUB ranks
release-unique tracks before shared tracks and later tracks before earlier ones, then tries
at most three strict artist/title/duration/edition track lookups to discover one Spotify
album id. It expands only that canonical album because shared lead tracks can identify the standard
edition of a Deluxe release. Apple-only terminal `- Single` / `- EP`
presentation suffixes are ignored without weakening Deluxe, Live or Remaster markers. The
album's artist, title and track overlap are validated before its authoritative payload is
persisted. Strict matching
runs again and only unmatched tracks enter the source-preserved native-audio pipeline,
in chunks of at most 100 tracks with the configured one-to-four worker budget. Releases continue independently after one failure and remain selectable for
Retry. Pause is restartable on every platform: the current yt-dlp trees are stopped,
completed files are scanned and kept, and Resume starts only unresolved work. Cancel
uses the same recovery path and releases the maintenance gate after cleanup. A
user-confirmed mismatch is one-shot and never overwrites the page source; source IDs
auto-link only after all relevant source tracks resolve to one unambiguous local entity.
Audio child processes also have a ten-minute output-silence watchdog: a stalled yt-dlp
tree is terminated with an actionable Retry/Settings error instead of occupying the
maintenance gate indefinitely. Spotify reads go through `fetchWithRetry`, so a provider 429
waits a bounded number of times instead of holding a task open for a day.

The batch owns the music-maintenance gate from start through targeted indexing and linking.
Child processes and indexers re-enter that same unique owner; competing Spotify,
yt-dlp, and manual scan requests fail without replacing the active batch status.
Release previews retain both full-release and strictly-missing size estimates so
large-batch confirmation describes only the files that will actually download.

### Persistent music download queue

Artist/album release selections and missing rows from imported Spotify playlists are
saved under `/music/downloads` before they run. `music_spotify_download_queue` owns one
ordered card per persistent source and `music_spotify_download_queue_selection` keeps
the exact release or playlist-item IDs. Repeated additions merge into that card. Source,
release and item deletion cascades naturally; Refresh keeps selections whose stable
provider release identity survives. Both tables are personal local-music state and are
wiped from every sanitized or in-app library export.

Adding is inert: the user explicitly starts all cards or one card. A playlist page's visible
**Download missing** action is such an explicit start (it saves the selection, then runs it
next); **Add missing to Downloads without starting** remains in its More menu. A card that is
downloading accepts more songs: the runner gives it another pass when the current pass ends, and
a "start now" request joins a running single-card run instead of being refused. A single playlist
row's **Download** (and a Use-this-version start) passes `itemIds`, so the run passes over only that
song: the card's other selections, including earlier failures, stay on it untouched and the card
returns to Queued while any of them remains pending. In-process Resume keeps that narrowing; a
startup-interrupted card resumes whole. While the queue
runs, only the songs inside the active acquisition batch are locked against source changes or
skipping. The mixed runner
holds one re-entrant music-maintenance owner, fetches the next card from the current DB
order after each completion, and rechecks strict-first, unique cross-release local matches immediately before work.
Already-local tracks are skipped without a download. Entity cards retain release-by-release
resolution and targeted indexing; playlist cards retain 100-track chunks. Inside a chunk,
finished songs join the library every 10 songs or 20 seconds: those flushes move only the
staged files of yt-dlp runs that exited successfully (never a file ffmpeg or the tagger is
still writing), run one at a time, and finish before the chunk's closing scan files the rest.
The `[navirun-…]` token belongs to one source file, so a flush marks only the songs that file
serves as indexing, and two songs resolving to one source still share its download. One failed card stays visible for Retry while later cards continue. Completed
cards stay until Clear completed.

Every failed source row retains its last exact acquisition error. The expanded card offers
**Choose audio** (an exact source) and **Use automatic source** for a saved one, without rerunning artist
inspection. Changing either option returns its card to Queued; a later scan clears the error
as soon as a strict local match appears. Entity source rows and all queue rows are wiped from
sanitized exports; imported-playlist snapshots may remain, but their local match, error,
fallback policy and manual source are cleared.

A failed-card Retry recovers completed outputs first and allocates a new acquisition token
only for unresolved work. Transient command retries keep that token and skip completed
siblings; no retry overwrites an existing library file. Queue reads also re-open a completed card when a
selected local match disappears. Immediate-start confirmation is based on the complete
merged card after new selections are saved, so the 100-track/2 GB warning cannot
understate previously queued work. Partial runs finish with a warning and keep failed
cards visible rather than presenting a generic success.

Pause terminates every active yt-dlp/ffmpeg process tree, indexes recoverable outputs,
and persists the current card as paused while preserving whether Resume should continue
the whole queue or only that card. Once workers and finalization settle, Pause releases
the maintenance gate for manual recovery; Resume reacquires it before doing work. Cancel settles the runtime task and returns unfinished
work to queued; it never removes audio or queue cards. Startup converts any interrupted
`running` row to `paused`, and Resume recovers checkpointed outputs before recalculating the
unresolved remainder. No queued work starts automatically on launch. Direct YouTube video and playlist jobs use `music_url_job` and per-occurrence
`music_url_item` checkpoints in this same queue. Stable source IDs share acquired audio
without collapsing playlist occurrences. Incomplete enumeration remains retryable.
Shutdown marks the current durable card paused before the database closes, tree-kills
all owned children, and abandons late async indexing/write work. Reopening the app therefore
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
happen in SQL and the renderer pulls 192 rows at a time. The lead fallback reads
only its first 48-row page. Explicit Play All and Shuffle use `music:playbackQueue`,
which returns at most 2,000 tracks; Shuffle samples that bounded queue in SQLite
with `RANDOM()` so a very large library is not biased toward its first artists.
The UI reports when the full library was truncated. Recent-track query keys include their requested limit because
Home, Sonic Archive, and Listening Stats intentionally request different windows.

Playback remains the header hierarchy: Play is the single primary action and
Shuffle is the visible secondary. Acquisition and administration are disclosed as
separate **Add music** and **Library maintenance** menus. User-facing acquisition
language describes intent rather than the executable: **Add music** offers **Import Spotify
playlist…** and **Save audio from a link…** (the Playlists tab keeps **Import from Spotify…**),
and artist/album pages offer **Complete from Spotify**. YouTube Music, yt-dlp, matching,
and destination-folder details remain visible inside their dialogs and readiness
help. The artist/album dialog (**Download missing albums**) shows one catalogue line, release
rows that are whole clickable labels with a plain library status ("3 of 10 in your library",
"All in your library", "Not checked against your library yet") and a small **Check**, plus
**Select all** / **Select none** / **Hide complete releases**. Its primary action is
**Download** (starts now, or **Download next** while the queue runs); **Save for later** only
queues. The Downloads page lists, inside an opened card, only songs that still need something as
flat rows (status line plus **Choose audio** / **Check** / **Remove**), collapses the rest into
"N songs are already in your library", and its running panel shows the release and the current
step (finding recordings, checking them, downloading).

**Track lists: selection, right-click and search (2026-09-30).** `components/music/TrackListScope.tsx`
wraps each visible list (`TrackList`, album, playlist) and owns its multi-selection, a sticky
selection bar (Play, Play next, Add to queue, Add to playlist, Remove from playlist on playlist
pages, Delete…, Clear) and **Jump to playing** for lists of 30 or more, which grows an incremental
list through `useIncrementalList().reveal` before scrolling. In a scope, Ctrl+click toggles a row,
Shift+click extends from the last toggled row, and while anything is selected a plain click selects
rather than plays; each row also has a checkbox (hover/focus revealed until a selection exists).
Escape clears. Selection queues in list order and prunes rows a filter hides. The artist's Most
played list is not selectable, so one page never shows two bars. Every `MusicTrackRow` has a
right-click menu (the shared `ContextMenu`, destructive items behind a separator) whose
**Add to playlist…** opens the row's own ⋯ popover. Album, artist and playlist headers and Liked
songs carry an **Add to queue** menu (Play next / Add to end for the whole list). Liked songs has search
and a client-side sort; album pages, an artist's full track list and ordinary playlists show search
from 25 tracks (`TRACK_SEARCH_MIN`). Header Play/Shuffle on Liked and album pages follow the filtered
list; a playlist's Play keeps the whole playlist. Searching an ordinary playlist hides drag handles,
because manual order is edited only on the whole list.

**Deletes leave their page (2026-09-30).** `deleteTracks`/`deleteAlbum`/`deleteArtist` return the
album and artist ids the delete removed; deleting songs or an album prunes an album or artist it
emptied at once (the scan's rule, Spotify-snapshot exception included) instead of leaving an empty
page until the next scan. Album, artist, playlist and smart-playlist deletes, and a song delete that
empties the page being shown, leave through `useLeaveDeleted()`: back to the nearest history entry
that still exists, else a parent route. The row menus hide **Go to artist/album** on that page.

**Genres (2026-09-26).** The folder stays the artist; genre comes only from tags. The scanner
splits every genre tag on `;`, `/`, `|` and NUL (never commas, which Discogs-style names use
inside one genre) and stores one `music_track_genre` row per track and genre, so a track shows
under each of its genres. The column is `COLLATE NOCASE`, so "Rock" and "rock" filter and count
as one. Rows are replaced only when the file's tags are actually re-read; the mtime fast path
keeps them. `music_track.genres_scanned` (0 on rows that predate genres) forces one re-read of
each older file on the next scan, then the fast path resumes. The Albums and Tracks tabs filter
by one page-level `MusicBrowseScope` (genre plus decade) in SQL: `music:albums` takes it, the
track page request extends it, and the header's Play/Shuffle pass it to `music:playbackQueue`
whenever the Albums or Tracks tab is showing, so the queue matches what is listed. Counts come
from `music:genres` and `music:decades`; the genre select stays hidden until a scan has found
any genre. Genre rows are library data and are wiped with `music_track` from shared exports.

Decades group albums by `music_album.year`. `tagYear` keeps years 1000–2999 and reads a whole
date written into the year tag (`20140530`) as its year; anything else is unknown. Because the
album upsert keeps an existing year when a rescan finds none, `runMigrations` clears junk years
already stored so the genre re-read can refill them. Yearless albums form an "Unknown year"
group rather than disappearing from the filter.

**Lyrics (2026-09-27).** Now Playing shows Queue / Lyrics tabs for library tracks only
(`musicIdOf`); quiz, tournament, theme and arbitrary-file audio never mount the panel, so lyrics
can never reveal a quiz answer. Local wins, as with artwork: a sidecar `.lrc` beside the audio is
read on every request and never stored. Otherwise the panel's first open of a track calls
`music:fetchLyrics` once: embedded tags (SYLT milliseconds become LRC; LRC-shaped USLT stays
synced), then LRCLIB `/api/get` with the album year prefix stripped, then `/api/search` limited to
results within five seconds of the file's length. Found, instrumental and "missing" results are
stored in `music_track_lyrics` so they work offline and a miss is not re-queried automatically;
**Search again** repeats the lookup. HTTP and network failures are never stored, so the next open
retries. `@shared/lyrics.ts` parses LRC (several time tags per line, `[offset:]`) and finds the
active line; lines highlight 0.25 s early, scroll with playback (instant under reduced motion)
and seek on click. Stored lyrics cascade with the track and are wiped from shared exports.

**Bulk lyrics sweep (2026-09-28).** `fetchMissingLyrics` (`musicLyrics.ts`, task kind
`musicLyrics`) runs the same lookup for every track with no `music_track_lyrics` row: Settings →
Refresh → Local files → **Download missing lyrics**, and automatically (`queueLyricsSweep`) at the
end of every download-queue run that resolved tracks, which covers Spotify playlists, artists,
albums and direct URLs. A request made while a sweep runs triggers one more pass when it ends.
Stored misses are not retried; failed lookups stay unchecked, and three consecutive failures stop
the sweep as unreachable. Launch never starts a sweep.

**Play counts (2026-09-27).** `MusicPlayLogger` follows the scrobbler rule: a `music-` track
counts once half its length, capped at four minutes, has actually been heard; tracks under 30
seconds never count. `advanceListen` in `lib/musicTracks.ts` adds only normal forward playback
(position steps of at most two seconds while playing), so seeks, scrubbing and paused time add
nothing, and a return to the start after a counted play begins a new one (repeat-one counts every
loop). This replaced the old "10 seconds after the track starts" timer; existing counts are kept.

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

## Queue editing, repeat and player preferences

Queue edits (`removeFromQueue`/`moveInQueue`) are exposed only on "Next up" rows, so the playing index never shifts. `originalOrderRef` (non-null while shuffled) is pruned by object identity, because ids can repeat in a queue. Repeat modes are `off`/`all`/`one`; the wrap logic keeps its `queue.length > 1` guards so the quiz's single-track queue cannot be skipped by OS media keys. Volume, repeat and shuffle persist in localStorage `player.prefs`; `stop()` deliberately does not persist its shuffle reset. The pop-out widget renders `PlayerWidgetPage` alone through a `main.tsx` hash branch — no router, no query client, no second `AudioPlayerProvider` — with its fixed 480×60 geometry from `widgetCore.ts`.

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

**Songs / theme library (2026-07-25)** — `/anime/songs` (`ThemeSongsPage`, an `ANIME.children` sidebar link + CommandPalette item; route sits above `/anime/:id`) replaces the sidebar's old "Shuffle Themes" button (gone — the page builds its own `theme-<id>` tracks inline). Every imported OP/ED as a playable list, where **the anime half of the filter IS `MediaListFilter`**: `repos/themeRepo.ts:list({media, search, songType, favoriteOnly, playableOnly})` calls mediaRepo's now-exported `buildWhere`/`buildOrder` (alias the media table `m`), so statuses/tags/ranges/favorite/season mean exactly what they mean on the anime list page — the page literally reuses `MediaFilterPanel`, the sort menu and `qk.mediaCounts.facets('anime')`. `mediaType` is forced to `'anime'` in the repo. Song-level extras: OP/ED, hearts, and a search that also matches song title/slug/artist (wider than the media filter's title-only search). Ordering groups songs under their anime (`COALESCE(sort_order,1000), ts.id`) EXCEPT `random`, where `buildOrder`'s new `randomIdExpr` arg hashes `ts.id` so a shuffle deals songs, not whole shows; every play button queues the WHOLE filtered set (`theme-<id>` id namespace, unchanged). **New personal column `theme_song.favorite`** (init.sql + schema.ts + `ensureColumn`, wiped in sanitizeSql.cjs, also on the detail page's `ThemeRow` heart): the AnimeThemes import is a clean replace, so `themes.ts` snapshots hearted `external_id`s before the DELETE and restores them on insert — mirrored in bulk-import.cjs. Tests: themeRepo.test.ts (shared-filter reuse, song filters, seeded song shuffle), themeImport.test.ts (favorites survive a refresh).

**Bulk theme backfill and repair (2026-09-06)** — Bulk Import exposes a dedicated local preview for AniList anime with zero `theme_song` rows; starting it reuses the Library Refresh task/status/cancel loop and fetches OP/ED metadata plus local audio. The Refresh tab's **Update anime theme songs** preset checks every AniList anime against AnimeThemes, compares external song IDs (not count alone), and counts unchanged titles as skipped. A mismatch atomically mirrors the source, preserving favorites for retained IDs and retaining healthy local audio; only new or audio-missing songs are downloaded. Theme audio streams through a bounded sibling partial in `files.ts`, so a timeout, cancellation or oversized response cannot expose a truncated playable file. The comparison passes the fetched payload into the importer so each anime is requested once.

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
