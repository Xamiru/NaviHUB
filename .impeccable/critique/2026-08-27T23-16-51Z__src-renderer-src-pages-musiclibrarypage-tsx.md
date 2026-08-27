---
target: music section
total_score: 26
max_score: 40
na_heuristics: 
p0_count: 0
p1_count: 4
timestamp: 2026-08-27T23-16-51Z
slug: src-renderer-src-pages-musiclibrarypage-tsx
---
# Music section critique

## Design-specificity verdict

Medium specificity. “Sonic archive,” the listening-trail language, artwork-led entity pages, and the local-first file model give the section NaviHUB character. The dominant collection view is still fairly interchangeable: artist circles, album squares, generic track rows, and a streaming-style queue. The largest missed opportunity is using NaviHUB’s archive knowledge to drive the main experience through recently added music, forgotten favorites, incomplete artwork, new downloads, and other actionable personal signals.

## Nielsen heuristic scores

| Heuristic | Score | Main concern |
|---|---:|---|
| Visibility of system status | 3/4 | Scan and download states are visible, but progress bars lack explicit accessibility semantics and settled outcomes are mostly transient. |
| Match with the real world | 3/4 | The library model is familiar; spotDL, strict matching, and folder rules expose implementation concepts. |
| User control and freedom | 3/4 | Cancellation and queue editing are strong; playlist removals have no undo. |
| Consistency and standards | 3/4 | Shared rows and headers work well; full Now Playing exposes fewer current-track actions than the bar. |
| Error prevention | 3/4 | Destructive actions and source mismatches are guarded; overlapping acquisition routes are easy to confuse. |
| Recognition rather than recall | 3/4 | Entity context helps, but users must remember which import or download path applies. |
| Flexibility and efficiency | 2/4 | Large libraries lack sorting, useful archive filters, and batch operations. |
| Aesthetic and minimalist design | 2/4 | The lead competes with browsing and some headers expose too many peer-weight actions. |
| Error recovery | 2/4 | Spotify resume is thoughtful; contextual recovery and undo are limited. |
| Help and documentation | 2/4 | First-run guidance is good, but acquisition choices and consequences are not clearly unified. |
| **Total** | **26/40** | **Coherent and usable, but increasingly administrative and not yet fully authored as a personal archive.** |

## What works

- Now Playing is the strongest visual surface: large artwork, focused transport, and an adjacent queue.
- Artist, album, track, playlist, and queue relationships are consistently navigable.
- Long-running and destructive operations have unusually good safeguards: readiness checks, confirmations, cancellation, progress, and resumable downloads.
- Missing Spotify playlist tracks retain useful metadata and clearly explain why they cannot play.

## Priority issues

### P1: The library lead is personal but not actionable

The “listening leaves trails” panel has identity, yet its top track and new-signal count are mostly dead-end information. It pushes the actual collection down without helping the user start listening.

Make the first shelf playable and timely: Continue listening, Recently added, Recently downloaded, or Rediscover. Make top-track and discovery signals clickable, then keep the canonical Artists/Albums/Tracks taxonomy below.

### P1: Artist pages do not expose the artist’s full catalog

The page shows albums and a small Most played list, but there is no All tracks section. A user can play all without being able to browse all songs by that artist.

Add an incrementally rendered All tracks section, with album grouping or a compact sort control, after the album shelf.

### P1: Acquisition and maintenance are overtaking playback hierarchy

Artist and library headers combine Play, Shuffle, artwork, Spotify, torrents, scans, URL downloads, and deletion. Playlist headers can expose five actions at once.

Keep Play as the sole primary action and Shuffle as the visible secondary. Group the rest under clearly named Add music and Library maintenance menus while keeping active job status visible.

### P1: Full Now Playing loses actions available in the bar

Local music gets Like and Add to playlist in the persistent bar, but full Now Playing exposes only Like. Anime themes lose their favorite action there entirely.

Use one source-aware current-track action component in both places: music gets Like and Add to playlist; anime themes get Favorite.

### P2: Large-library navigation is thin

Artists, Albums, and Tracks have search but no remembered sorting or archive filters. Search also silently caps artist and album results at six.

Add compact sorting and filters such as recently added, recently played, least played, year, missing art, and recently downloaded. Add View all for capped search groups.

### P2: The acquisition language reflects tools rather than intent

Import Spotify playlist, Download from Spotify, Download from URL, Find torrents, spotDL, and yt-dlp are internally coherent but require a learned mental model.

Use three repeated intent labels: Import a playlist, Complete this artist or album, and Save audio from a link. Summarize source, destination, and retained linkage before each primary action.

### P2: A few interaction and accessibility details need polish

Playlist rename is hidden behind clicking the title. The add-tracks picker has no loading or no-results feedback. Progress bars lack progressbar semantics. Track menus rely heavily on hover. The active download pill uses a pulsing unicode download glyph, which conflicts with the app’s no-decorative-glyph rule and can be distracting.

## Persona red flags

### Large-library curator

- No recently added, unplayed, missing-art, year, or custom sort views.
- Track and playlist maintenance is mostly one row at a time.
- Spotify artist release selection can become a long checkbox list without batch selection tools.

### First-time local-music user

- Playlist import and entity download sound similar despite creating different relationships.
- URL download asks for folders and codec before making the destination model clear.
- Tool names appear before the user has a simple mental model of the workflows.

### Keyboard and accessibility-focused listener

- Hover-hidden menus weaken discoverability.
- Repeated row controls create long tab paths without batch alternatives.
- Visual progress lacks semantic values.
- The queue popover has Escape support but no explicit close action or richer popover semantics.

## Minor observations

- Album pages are the most complete conventional library surface and need the least intervention.
- Liked Songs is simple and appropriately focused.
- Playlist title renaming needs a visible edit affordance.
- “New signals” should link to the discoveries it summarizes.
- Search result caps need explanation or a View all path.
- Stats has strong content but becomes a long stack of similarly weighted sections.
- The playlist creation and Spotify import controls may become cramped in one row.
- Missing-track styling could mute the unavailable state without muting every piece of readable metadata.

## Questions

- Should the library open primarily as a listening cockpit or as a file taxonomy?
- Which should lead the next pass: a more useful personalized library home, stronger collection browsing, or simplifying download and maintenance controls?
- What should Sonic Archive reveal that Spotify cannot: forgotten albums, ownership completeness, newly restored files, or relationships to anime themes?
