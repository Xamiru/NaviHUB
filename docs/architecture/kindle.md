# Kindle — KOReader progress, highlights and reading time

> Reference detail. The rules an agent must not break live in
> [CLAUDE.md](../../CLAUDE.md#hard-invariants) — this file is the "how and why" narrative.

**Covers** — `/books/kindle`, reading a jailbroken Kindle running KOReader, importing reading progress,
finished status, highlights (into Quotes) and reading time (into the checklist), linking device books
to library books, manga series (chapter progress from comic file names), Undo.

**Key files** — `src/main/kindle/` (`luaLiteral.ts`, `kindleCore.ts`, `kindleDevice.ts`, `kindleScan.ts`,
`kindle.ts`), `src/main/repos/kindleRepo.ts`, `src/renderer/src/pages/KindlePage.tsx`,
`src/renderer/src/components/kindle/` (`KindleReadingFact.tsx` is the manga detail page's reading
time; `KindleGuide.tsx` is the page's how-to, which must change with these rules), `src/renderer/src/lib/kindle.ts`,
`src/main/kindle/epubBuild.ts`, `epubContent.ts`, `kindleBooks.ts`, the writer `kindleWrite.ts` /
`kindleWriteCore.ts`, Send `kindleSend.ts`, the device lock `kindleBusy.ts`, the words
`kindleVocabCore.ts`, and the Windows probe `scripts/kindle-probe.ps1`

**Tests** — `tests/kindleCore.test.ts`, `tests/kindleRepo.test.ts`, `tests/kindleScan.test.ts`,
`tests/kindleBooks.test.ts`, `tests/kindleProbeScript.test.ts`, `tests/kindleWrite.test.ts`,
`tests/kindleWriteGuard.test.ts`, `tests/kindleSend.test.ts`, `tests/kindleVocab.test.ts`,
`tests/renderer/Kindle.test.tsx`, `tests/renderer/BookFacts.test.tsx`

---

## Shape (2026-10-29)

The user's Kindle Paperwhite (12th gen, firmware 5.17) is jailbroken, kept offline, and reads with
KOReader. It connects over USB as **MTP only**, and the main library lives on a Windows PC. The plan
approved on 2026-10-29 builds in this order: import back (this slice), Send to Kindle, then the Windows
device bridge.

Nothing runs until the user presses **Check Kindle**. A check detects the device, reads it (never
writes), and keeps a copy of KOReader's files under `userData/kindle/snapshots/<timestamp>/`. The newest 10
are kept, plus the largest of the older ones, and a stopped or failed check deletes its partial
folder, so checking a reset Kindle ten times never pushes out the last
copy of years of KOReader data; only folders named by that timestamp pattern are pruned. **Import from Kindle…** builds
a preview from that check; **Apply** writes the ticked lines in one transaction.

## Device access

`KindleDevice` (`kindleDevice.ts`) is the seam: paths relative to the storage root with forward slashes,
each checked by `isSafeRelative`. The filesystem adapter covers the Linux gvfs MTP mount
(`/run/user/<uid>/gvfs/mtp:host=…Kindle…/<storage>`), a mass-storage Kindle under `/media/<user>`, and
the `kindle.folder` setting: a folder the user filled with the Kindle's `documents` and `koreader`
folders through Explorer. That folder is the Windows path until the shell bridge exists. A connected
device is always preferred over the folder. `kindle.folder` is machine-local
(`MACHINE_LOCAL_SETTING_KEYS`) and wiped from exports.

The Windows bridge (planned) is inbox PowerShell 5.1 plus `Shell.Application` COM, with JSON requests
on stdin. It is not built: the user runs a read-only probe on the PC first, because `CopyHere`
behaviour over MTP cannot be verified from the laptop. The probe is `scripts/kindle-probe.ps1`
(2026-11-12): it lists the Kindle's storages, the top of `documents\` and `koreader\`, and copies one
KOReader sidecar from the Kindle into a new `%TEMP%\navihub-kindle-probe-<stamp>\` folder, timing it,
then writes `probe.json` there. `CopyHere` is called only on that local folder, so nothing on the
Kindle changes; `tests/kindleProbeScript.test.ts` guards that by text (no move, delete, verb, network
or other copy call, and writes only under its temp folder). The bridge's design waits for that
file. libmtp and WebUSB were rejected, because both
need a WinUSB driver swap that hides the Kindle from Explorer.

## What a check reads

`kindleScan.readDevice` walks `documents/` (book files and `.sdr` folders), `koreader/docsettings/`
and `koreader/hashdocsettings/`, with an entry budget (50,000) and a depth cap. A `.sdr` folder
without `metadata.<ext>.lua` is the stock reader's and is ignored; `.lua.old` backups are skipped.
Symlinks (possible only in a copied folder) are never followed, and a name no Kindle path can hold
is skipped, so one odd entry never fails the check. A stopped check throws `TaskCancelledError`
and keeps the previous result; at quit (`cancelKindleJobs`) it stops at the next step and never
reads the database again.
`koreader/settings/statistics.sqlite3` (plus any `-wal`) is copied to a working folder, opened
there, and deleted; the snapshot copy is never opened. Reading time is summed per book and local
day inside SQLite (`GROUP BY md5, date(start_time, 'unixepoch', 'localtime')`), so years of
page-turn rows never cross into JavaScript one by one on the main process. The vocabulary builder database,
`history.lua` and `settings.reader.lua` are only copied into the snapshot, for later features.

**Sidecars are parsed, never evaluated** (`luaLiteral.ts`): literals only, null-prototype tables,
`\ddd` escapes decoded as UTF-8 bytes, a nesting cap. Both highlight formats are read: the 2024+
`annotations` list, and the older `highlight` table with notes on matching `bookmarks` (an unedited
"Page N … @ datetime" bookmark text is KOReader's own label, not a note).

**Book identity is KOReader's partial MD5** (`partialMd5`: MD5 of 1 KiB samples at 0, 1 KiB, 4 KiB,
16 KiB … 1 GiB). Sidecars and the statistics database both carry it; a sidecar without one gets it
computed from the book file on the device. `mergeDeviceBooks` joins sidecars, statistics and files
into one record per book, so a book whose file was deleted still carries its reading time.

**Confirmed on the user's device (2026-10-29, KOReader v2026.07.1, PW 12th gen reported as
`KindlePaperWhite6`, framebuffer 1272x1696, 300 dpi):** sidecars sit beside the books
(`document_metadata_folder = "doc"`, no docsettings folders); the `annotations` format, where a page
bookmark carries generated text ("in Chapter Two") but no `pos0`, so highlights are recognised by
their selection; CBZ sidecars have an empty `doc_props` and name the book in `stats.title`;
`partialMD5` in `koreader/frontend/util.lua` matches `partialMd5` (a device EPUB's computed value
equals its sidecar's); `statistics.sqlite3` has the `book`/`page_stat_data` schema used here and is
in WAL mode; `statfs` over the gvfs mount gives real free space. A ZenOS plugin adds `zen_*` keys,
which are ignored. The stock `documents/dictionaries` folder and hidden folders are skipped. A full
read-only check of the device took 0.75 s for about 1,000 files.

## Linking

`kindle_book` ties a partial MD5 to a library book, `origin` `sent` (Send to Kindle) or `linked`
(by hand; frozen values). Only `media_type = 'book'` rows link; manga link per series folder (below). Unlinked books show title-based
suggestions (`suggestLinks`: exact folded title 1, containment 0.85, shared words scaled to 0.7;
library title keys and word sets are folded once per check, and the suggestions are computed during
the check in batches that yield to the event loop, never in a status read). A device book that
already carries a sidecar in the location KOReader is set to use (`document_metadata_folder` in
`settings.reader.lua`) takes that sidecar over a stale one left elsewhere. plus a search dialog. Unlink deletes a
`linked` row; a `sent` row only loses its library book, so the record of a file NaviHUB wrote
survives, and relinking it keeps `sent`. Deleting the library book sets `media_id` NULL, so the device book is unlinked, not
forgotten.

## Import rules (`planBook`)

The plan is rebuilt at Apply from the checked device data and the library as it is then, so a change
made between preview and Apply is judged afresh. A newer check invalidates an open preview (scan id).

- **Progress** = `round(percent_finished × total_units)`, forward only. KOReader's own page numbers
  for EPUB depend on the font, so only the percentage is used. No page count, no progress change.
- **Completed** only when KOReader's status is `complete` (not at 99 %), with progress set to the
  full page count. KOReader stores its **On hold** status as `abandoned`; it maps to the library's
  on-hold status (`onHoldStatus`: named "hold"/"pause", else the third of five default positions,
  else none, since only the first, second and last positions are fixed) and is offered unticked. A planned or
  untracked book that moves or has reading days becomes in-progress through `startSession`'s rule.
- **Re-reading**: a completed book that the device shows part-way through changes nothing and is
  flagged in the preview.
- Books never go through `logProgress`, `advanceProgress` or `syncMediaProgress`; the import writes
  `status`/`progress` through `mediaRepo.update`.
- **Highlights to Quotes**: one quote per highlight with text (page bookmarks skipped), `origin`
  `book` (the `quote.origin` CHECK cannot gain a value), the chapter as locator (`Page N` for fixed
  layouts), KOReader's note as the note. `kindle_annotation` keys each highlight by
  `(media_id, fingerprint)`; the fingerprint is KOReader's creation `datetime` plus the start
  position. A key never depends on the other highlights (a key that shifted when one was deleted
  would point another highlight at the wrong quote), so extending a selection imports a new quote
  beside the old one.
  A deleted quote leaves its row as a tombstone and is never imported again. A device-side text or
  note edit updates the quote only where the stored value still hashes to what the last import wrote
  (`quoteRepo.setTextAndNote`, which keeps favorite, themes and links).
- **Reading time** (`aggregateReadingDays`): seconds and distinct pages per book and local day from
  `page_stat_data`; rows dated after today are dropped and counted as a clock warning (the device is
  never registered, so its clock may drift). `kindle_reading_day` only ever rises, so a trimmed
  statistics database never shrinks history. A day of 5 minutes or more credits the checklist's
  **daily** `book-session` item once: inside the 364-day edit window, not when that book already
  has a book-session log that day for any book (one import credits a day once, however many books
  were read), and only on days the item was on the board and due, judged by its rule
  history (`checklistRepo.dailyItemDueDays`), never by the current board. The credit goes through
  `logSession(..., { keepStatus: true })`, so it never changes a status the user left unticked. Minutes have no home in the checklist or Stats, which estimate pages × minutes; they show
  on the book page (`BookFacts`) only, by the user's choice.
- Two device files of one library book are merged before planning (`mergeForMedia`): distinct
  highlights and each day's device seconds summed, so the stored total is folded in once. Their
  position and finished status are NOT merged (2026-11-17 review): `kindle_book` is unique per partial
  MD5, so two linked files always differ in content, typically separate volumes sent from one book, and
  one volume finished must not complete the title. Such a book's progress and status are left to the
  user. Statistics days are capped at 24 hours each, and the statistics copy must pass `quick_check`.
- After a whole, warning-free check, `reconcileOnDevice` marks a linked book whose file and
  fingerprint are both gone as removed (`kindle_book.removed_at`; the book page stops saying "On the
  Kindle"), and restores one seen again.

## Manga series (2026-11-12)

Most of the device is manga: one comic archive per chapter or volume, one folder per series, copied
from the user's Kindle-ready mirror (`/media/xamir/Nihon/Kindle` on the laptop). The conversion renamed
the files (`vol_1_DH` became `Berserk - Vol 01.cbz`) and left no manifest, so a device file cannot be
matched to a `manga_chapter` row. A check therefore groups comic files (`COMIC_EXTS`) by their folder
under `documents/` (`seriesKeyFor`; a folder that holds other series folders, like the user's
`documents/Downloads/`, has each of its loose comics made its own series by `splitLooseComics`,
unless most of them are named after the folder (`Berserk/Berserk - Vol 01.cbz` with a
`Berserk/Extras/`), which keeps it one series; a comic directly in `documents/` is its own series, and
`documents/NaviHUB/` is never a series) and lists them as **series**, not books. A series folder is
linked by hand to a library manga (`kindle_series`). Suggestions match the folder name against manga
titles **and** their `local_dir` folder names, which often carry the same name as the mirror
(`Shuumatsu no Valkyrie` → Record of Ragnarok); one suggestion per manga.

`parseKindleUnit` reads the file name after the `<Series> - ` prefix. `Ch N` (or `Chapter N`, or a bare
number) is a chapter and wins over a `Vol N` beside it; `Vol N` alone is a volume; anything else is
other. `Ch 287.297` (two or more digits after the dot, larger than the whole part) is the mirror's form
of the range `ch287-297` and reads as its end; `Ch 10.5` stays a half chapter. On the 2026-11-12 mirror
(10,930 comics) that classifies all but 27, which are extras, artbooks and the `Books` folder of
Japanese textbooks.

A file is read when KOReader marked it finished or its `percent_finished` is at least 0.99
(`isComicRead`). `summarizeSeries` counts a chapter read only when every file of it (each `Part`) is.
Numbering comes in three kinds:
- **series**: chapter numbers run through the series; the highest fully read chapter is the progress.
- **per-volume**: a chapter number appears under two volumes ("20th Century Boys - Vol 02 Ch 001";
  also Homunculus and Kengan Asura), so the position is counted in volume and chapter order. That is right
  only if no chapter is missing, so the preview offers it **unticked**, with the status it implies.
- **unclear**: numbers restart and some volumes are whole-volume files, so nothing is offered.

`planManga` returns the book plan's shape, so Apply and Undo are shared. Progress is chapters, raised
only, written through `mediaRepo.update` like books (never `markChapterRead`/`syncMediaProgress`, which
key on `manga_chapter` rows). A highest chapter beyond a known total means the numbering differs, so
nothing is offered. Completed only when chapters reach a known total and KOReader marked that last chapter `complete` (a chapter read to 99 % raises progress but never completes the series). Volume files are reported
("2 volume files are read on the Kindle"), never turned into a chapter count. Reading days are stored
in `kindle_reading_day` and shown on the manga page. They **never credit the checklist**: the manga
item (`manga-chapter`) is a `mediaLog` that raises chapter progress itself, so crediting it would count
the chapters twice. A manga id is planned as a series only. Known limit: a volume whose chapters restart
without a second volume repeating them (Berserk's `Vol 19 Ch 001`–`011` among chapters 287+) cannot be
told apart, so its chapters read as low numbers; progress only rises, and the preview shows the number.

## Books NaviHUB makes (2026-11-12)

**Make a book for the Kindle** builds an EPUB from the library on this computer and never touches the
device. `epubBuild.ts` (pure) returns the zip entries: `mimetype` first and stored, an EPUB 3 package
with nav and an NCX for older readers, one small stylesheet, no scripts, no fonts, no remote resources.
Every text goes through `xmlEscape` (which also drops XML-invalid control codes), so content never
becomes markup; furigana is `<ruby>`. `epubContent.ts` (pure) makes the two books:
- **My Quotes**: one chapter per source title (or per theme, the source then named in each line),
  favorites only on request. Readings, translations, speaker, locator and note are included.
- **Japanese graded readings**: one level of `@shared/japanese/readings`, one chapter per passage,
  with furigana, the glossary, the questions, and the answers after a rule.

`kindleBooks.ts` (IO, loaded lazily by `ipc.ts` because the reading content is large) writes to
`userData/kindle/generated/` under a `.part` name and renames, never overwriting (`freeFileName`); the
book id is a stable `urn:uuid` per book kind, so a re-made copy is the same book to KOReader. Show in
folder accepts only a name the folder listing returns. `tests/kindleBooks.test.ts` parses every built
file back with `epub.ts` and checks the stored `mimetype` sits at byte 30.

## Writing to the Kindle (Send to Kindle, 2026-11-17)

The device is written by one module, `kindleWrite.ts`; `kindleDevice.ts` stays read-only, and
`tests/kindleWriteGuard.test.ts` holds both by text (and checks every gio call puts `--` before its
paths and only ever runs `copy` or `remove`). `kindleWriteCore.ts` (pure) plans a send: names inside
`documents/NaviHUB/` (`deviceFileName`, by code point, no leading dot, then `freeFileName`), at most
500 MiB a file and 2 GiB a send, refused when the device does not report its space or would keep less
than 1 GiB and 10% free (KOReader writes its statistics and sidecars as you read).

`DeviceWriter` runs one device operation at a time across all writers, its listing and folder checks
included. Per file: check `documents/` and `documents/NaviHUB/` are plain folders (never links), list the
folder fresh (an unreadable folder throws, never reads as empty), refuse a taken name
(case-insensitive), take the SHA-256 and KOReader's partial MD5 of the local file, upload straight to
the name, then compare the size and the SHA-256 read back. On a failure it removes that one file (the
name was free, so it is the upload's); a removal that fails is reported with the file's name, and an
`EEXIST` from the mount (a name the listing missed) removes nothing. Two uploaders:
- `GioMtpUploader` (a gvfs MTP mount, `isGvfsMtpRoot`): `gio copy -- <local> <path under the FUSE
  mount>` and `gio remove`; gio maps the mount path to `mtp://` and escapes `#`/`%` itself, so no URI is
  built. `gioEnv` replaces a snap's `GIO_MODULE_DIR` that lacks `libgvfsdbus.so` with a system module
  folder that has it (or drops the variable). Each gio call has a deadline (two minutes plus a second
  per 512 KiB) and is ended with SIGTERM, then SIGKILL; `cancelKindleWrites()` (reached at quit
  through `cancelKindleJobs` → `cancelSends`) sends SIGTERM to a running copy and skips its clean-up.
- Every read through the gvfs mount (listing, size, read-back) is raced against a deadline (30 s, or
  two minutes plus a second per 512 KiB for a read-back), so a pulled cable fails the send and frees
  its locks instead of hanging them.
- The name is checked free twice: before hashing the local file and again right before the first
  byte, since hashing a large file takes seconds and the upload replaces silently.
- Clean-up (`removeIncomplete`) acts only on a plain file no larger than the upload and not the
  complete upload; anything else is `foreign` and left alone. It runs only on the Kindle the send went
  to (`kindle_send.device`, its label, which carries the serial), and Send refuses while two
  Kindle-like devices are connected.
- A file name is at most 120 characters and 200 UTF-8 bytes; a book file must really lie inside the
  books root (`realpath`, so a link there cannot send a file from elsewhere).
- `FilesystemUploader` (a mass-storage mount): a `wx` write, then `datasync` before the read-back.

**Send to Kindle (2026-11-17)** is `kindleSend.ts`, the writer's one user (the guard holds that). It
sends a book's local EPUB (`manga.bookFileForChapter`, book titles only, through the books root's
containment check) or a book NaviHUB made, only to a connected device (the copied folder is never
written), as the `kindleSend` task. The dialog (`KindleSendDialog`, opened from the book page's
`KindleSendBook` and from each made book) previews names and the free space after, and refuses as
`planSend` does. Manga are not sent: the writer places files directly in `documents/NaviHUB/`, and the
user's manga already reach the Kindle from the mirror.

The ledger is `kindle_send`. `beforeUpload` writes a `pending` row (with the SHA-256 and partial MD5)
right before the first byte goes out; a verified file settles `sent` and gives a library book its
`kindle_book` link (`origin 'sent'`), so the next check ties it up with no suggestion; a failure with
its copy removed is `failed`; one whose clean-up failed (`IncompleteCopyError`) is `incomplete`. A
database error after a verified upload leaves the row `pending`, never `failed`. Rows still `pending`
(NaviHUB quit mid-copy: `cancelKindleJobs` kills the gio child at once and stops ledger writes) or
`incomplete` are listed under **Unfinished sends**; Check and clean up compares the device file with
the recorded size and SHA-256 and removes it only when it is not the complete file (`removed`), records
it as sent when it is whole, and does nothing to the device when a later `sent` row has the same path
(`superseded`, `laterSentTo`). The inspection is read-only (`hasFolder`, never `ensureFolder`).

One Kindle job at a time (`kindleBusy.ts`): a check, a send and a clean-up each claim the device first,
since they share one MTP session; `start` claims it before its first await, so a double click is
refused.

**The laptop write probe (2026-11-17, PW 12th gen over gvfs MTP, gio 2.80) overturned that protocol.**
What the device does:
- `mkdir` through the FUSE mount works; **creating or writing a file through it does not** (`ENOTSUP`,
  with `wx` and with plain `w`). The gvfs MTP backend has no write path for a non-Android device; the only
  way in is an MTP upload, which `gio copy` performs.
- `gio copy` onto an **existing** name returns 0: the backend does **not** refuse to overwrite. "Never
  replace" must be NaviHUB's own name check against a fresh listing.
- `gio move` into another folder keeps the old base name, and **renaming a file fails** (`libmtp error:
  could not set object property list`). So no `.part`-then-rename on this Kindle.
- Reading back through the FUSE mount works (a 3,020-byte EPUB's SHA-256 matched), and `gio remove`
  works on a file and on an empty folder.
- VS Code is a snap and sets `GIO_MODULE_DIR` to a folder without `libgvfsdbus.so`, so gio launched from
  its terminal cannot see the Kindle at all ("Operation not supported"); a spawn must point
  `GIO_MODULE_DIR` at the system modules.
The protocol for the MTP Kindle is therefore: list `documents/NaviHUB/`, take a free name
(case-insensitive), upload straight to it with `gio copy`, read it back (size and SHA-256), and on any
mismatch remove that one file (the name was free, so the file is the upload's). The probe left
`documents/NaviHUB/NaviHUB Test Book.epub` on the device for opening in KOReader (the writer's own end-to-end run, through its snap-env fix, then added `Japanese Graded Readings N5.epub` and was refused a second send of the same name); its `.incoming`
folder and the probe's `1.part` were removed.

## Looked-up words (2026-11-17)

KOReader's vocabulary builder (`koreader/settings/vocabulary_builder.sqlite3`; schema confirmed on the
user's device: `vocabulary(word, title_id, create_time, prev_context, next_context, highlight, …)` and
`title(id, name)`) is read at each check from a working copy that passes `quick_check`, and that copy
(with its WAL) is what the snapshot keeps. Older schemas without some columns read them as NULL; past
20,000 rows the newest are kept, with a warning. `word` is the dictionary form ("lurch"), `highlight`
the tapped form ("lurched").

`kindleVocabCore.ts` (pure): `vocabKind` (kana or kanji is `jp`, Latin letters `en`, anything else
skipped), `vocabKey` (`en:<lowercased>` / `jp:<word>`, frozen in `kindle_vocab.word_key`; a curly
apostrophe folds to a straight one), `vocabContext` (the sentence around the tapped form, trimmed
around the word past 300 characters, never cutting the word out) and `planVocab`. `kindle.ts:wordPlan`
plans up to 300 new words per preview, skipping words already imported (`kindle_vocab`) or already in
a deck (`vocabSkipper`: the English deck read whole, Japanese fronts sought on `idx_jp_card_front`), and
looks each up once per check, offline only: English through `english.lookupOffline` (WordNet), Japanese
through `dict/lookup.lookupWord`, taking an entry only when its expression is the word or one of the
word's own deinflected forms (`lookupWord` also returns prefixes, whose meaning is another word's). So a
kanji-only Chinese word has no Japanese entry and is not importable. A word with no meaning is listed;
the user may type one (`KindleApplySelection.wordMeanings`), which never replaces a dictionary meaning.

Apply writes English words with `englishRepo.saveWord` (the sentence as the example) and Japanese
words with `japaneseRepo.createCard` into the mining inbox (`ensureMiningInbox`; the sentence as
`example_jp`, the book in `notes`), each with its `kindle_vocab` row, inside the import's transaction.
Undo removes a word only when it is unreviewed in every direction (`jp_card_review` included) and still
holds exactly what the import wrote; its `kindle_vocab` row goes with it so a later import offers it
again. On 2026-11-17 the laptop had no English WordNet installed (only two Japanese dictionaries), so
every English word there needs a typed meaning until it is installed (Settings, Learning).

## Undo

Each Apply writes a `kindle_import` row with what it changed. **Undo last import** reverses the newest
import only, item by item, and only where the item still holds what the import wrote: changed
progress or status, and a quote the user edited, favorited, themed, linked to a speaker or gave
readings or a translation, are kept and counted. Untouched quotes are deleted with their
`kindle_annotation` rows, so a later import offers them again; a quote the user had already deleted
keeps its row as the tombstone. Checklist credits go through `checklistRepo.undoLog` (they carry no
prior status, because the credit never changed one).

## Tables

`kindle_book`, `kindle_annotation`, `kindle_reading_day`, `kindle_series`, `kindle_send`,
`kindle_vocab` and `kindle_import` are new tables, all personal and wiped by
`scripts/sanitizeSql.cjs`; `kindle_send.device` also has an `ensureColumn` (it was added the day the
table was). `kindle_series.series_key`
is the folder's path under `documents/` as the device names it. Frozen strings: the
`kindle_book.origin` values, the device folder `documents/NaviHUB/` and the marker
`documents/NaviHUB/.navihub-device.json` (both for Send to Kindle, `kindleCore.ts`).
