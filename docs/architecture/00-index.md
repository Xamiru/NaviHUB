# Architecture reference — index

`CLAUDE.md` is the always-loaded contract: standing directives, commands, architecture,
conventions, and the **hard invariants** an agent must not violate. It is deliberately small.

This folder holds the "how and why" narrative for each subsystem — the design decisions, the
things that were tried and rejected, and the gotchas that were paid for once already.
**Read the file for the area you are about to touch**, not the whole folder.

| Working on… | Read |
|---|---|
| Adding or changing a media type; wallpapers/fan art; books; game launching and playtime; seasonal shelves; list filtering and sorting | [media-types.md](media-types.md) |
| A games importer, or wondering why RAWG/IGDB/Steam all appear in the tree | [importers.md](importers.md) |
| The manga scanner, EPUB books, the manga/book readers, mokuro OCR | [readers.md](readers.md) |
| The local video player, ffmpeg transcoding, subtitles, subtitle mining | [video.md](video.md) |
| "Open with NaviHUB", double-click handling, desktop registration | [file-associations.md](file-associations.md) |
| The Japanese section — packs, drills, SRS, ghosts, the i+1 feed, the kana keyboard | [japanese.md](japanese.md) |
| The English section — dictionaries, SRS, drills, writing feedback | [english.md](english.md) |
| The programming section — courses, cheatsheets, the CLI drill | [programming.md](programming.md) |
| The gacha section or the FGO Coach (the app's LLM feature) | [gacha-fgo.md](gacha-fgo.md) |
| The wrestling section — the Wikipedia importer, matches, the local collection | [wrestling.md](wrestling.md) |
| Torrent search (Jackett/qBittorrent) or the bulk importer | [torrents-bulk.md](torrents-bulk.md) |
| Theme songs, the music library, the tournament bracket | [music-quiz.md](music-quiz.md) |
| The checklist, streaks, or anything that advances progress on a title | [checklist-progress.md](checklist-progress.md) |
| Shared UI components, the Lain theme, dialogs, the menu bar, zoom | [ui-conventions.md](ui-conventions.md) |
| Packaging, the release workflow, in-app updates, the library export | [packaging-ci-updates.md](packaging-ci-updates.md) |
| Anything that sounds like a feature request — check it was not already removed | [removed.md](removed.md) |

## Also in `docs/`

**[../review/](../review/)** — a full multi-agent code review from 2026-08-08 (typecheck clean,
1272 tests green at the time). Six deliverables plus raw recon reports. Start at
[../review/00-summary.md](../review/00-summary.md), then check
[../review/STATUS.md](../review/STATUS.md) for what has since shipped — several findings are
already fixed, and two of the review's own claims have themselves gone stale.

## House rules for this folder

- These files are **reference**, not instructions. Anything that is a rule — something an agent
  must or must not do — belongs in `CLAUDE.md`'s *Hard invariants* section, not here. If you find
  yourself writing "NEVER" in this folder, that sentence is in the wrong file.
- Dated headings are fine here. Narrative is fine here. Length is fine here.
- When a feature changes, **update its file in place** — do not append a new dated block to
  `CLAUDE.md`. That habit is what grew `CLAUDE.md` to 135 KB.
- Every source path cited in this folder is checked by `tests/docsDrift.test.ts`. If you move a
  file, that test tells you which doc to fix.
