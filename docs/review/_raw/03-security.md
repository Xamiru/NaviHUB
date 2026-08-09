# Security & robustness recon — NaviHUB

Scope: `navimg://` + path resolution, archive/EPUB handling, spawned child
processes, CSP vs. reality, secrets handling, trust in remote input, and the
renderer/main crash surface. Read-only recon; no files modified except this one.

---

### CBZ/zip entries decompress fully into memory with no size cap (zip-bomb crash)
`high` | `verified` | `src/main/archive.ts:197-214`

`readArchiveEntry` streams a zip entry through yauzl and does
`chunks.push(c)` / `Buffer.concat(chunks)` (`src/main/archive.ts:205-207`) with no
check against `entry.uncompressedSize` and no cap on total bytes accumulated —
the same unbounded pattern is used by `listArchivePages`/`cachedArchive` and by
the Yomitan dict importer's own zip reader (`src/main/dict/importer.ts`, `readEntry`
around line ~128, identical `chunks.push`/`Buffer.concat`). A single deflate
stream can reach roughly 1000:1 expansion with no nesting tricks required, so a
manga volume (`.cbz`) with one crafted page entry — a few MB compressed,
gigabytes uncompressed — exhausts the process heap the moment the reader opens
that page. This is directly reachable through a core supported workflow: the
app's own built-in torrent search (`torrents:*`, `TorrentSearchDialog`) actively
encourages downloading `.cbz` files from arbitrary/untrusted indexers, and the
manga reader opens whatever page the user taps with no way to preview first.
Fix: check `entry.uncompressedSize` (and a running byte counter while streaming)
against a sane per-entry cap before/while buffering, and abort with a decode
error instead of exhausting memory.

---

### Remote responses are buffered fully into memory with no size limit
`med` | `verified` | `src/main/files.ts:266-283`

`downloadImage` (line 277: `Buffer.from(await res.arrayBuffer())`),
`downloadImageTo` (line 312), and `downloadAudio` (line 216) all consume the
entire response body into a `Buffer` with no `Content-Length` pre-check and no
streaming cap. The same pattern recurs for JSON bodies: `atlas.ts:51`
(`fetchExport` does `await res.json()` on an array response with only an
"is it an array" check, no size bound) and `jackett.ts:148`
(`parseJackettResults(await res.json())`) — the latter is the more realistic
vector since Jackett aggregates whatever the user's configured indexer sites
return, which are lower-trust than the pinned API domains. A compromised or
simply misbehaving server (or a malicious indexer response) can hand back an
arbitrarily large body and exhaust memory the same way as the zip-bomb finding
above, just via HTTP instead of a local file.
Fix: enforce a byte cap on `fetchWithRetry` responses used for downloads (check
`content-length` where present, and cut off the read past a hard ceiling
regardless).

---

### Production build ships `'unsafe-eval'` and a permissive `connect-src`
`med` | `verified` | `src/renderer/index.html:7-9`

The CSP shipped in the actual production bundle (verified identical in
`out/renderer/index.html` after `npm run build`) is:
`script-src 'self' 'unsafe-eval'; connect-src 'self' navimg: ws: http://localhost:*`.
No renderer code was found using `eval`/`new Function`/dangerouslySetInnerHTML
(confirmed by grep — the app is disciplined about this), so `'unsafe-eval'`
appears to be an un-pruned Vite-dev leftover rather than something the shipped
app needs; likewise `ws:` and `http://localhost:*` in `connect-src` have no
corresponding renderer `fetch`/`WebSocket` call in the codebase. This is
defense-in-depth loss, not an active hole today: if any future feature ever
introduces a renderer injection point (a new markdown/HTML surface, a relaxed
sanitizer), `'unsafe-eval'` would make it materially easier to weaponize, and
the open `connect-src` would let injected script reach any local service on
the machine (e.g. the user's own Jackett/qBittorrent WebUI, which the app's own
code notes can run with auth-bypass-for-localhost).
Fix: drop `'unsafe-eval'` and narrow `connect-src` to `'self' navimg:` for the
production build (a separate dev-only CSP, or a build-time strip, if HMR needs
the wider policy in dev).

---

### `BrowserWindow` runs with `sandbox: false` and no justification
`low` | `verified` | `src/main/index.ts:88-92`

`webPreferences` sets `sandbox: false, contextIsolation: true` with no comment
explaining why the OS-level Chromium sandbox is off — notable because this
codebase otherwise documents every security-relevant deviation inline (see the
`assertSafeArgPath` comment in `playability.ts`, the single-instance-lock
comment in `index.ts`, etc.). `contextIsolation: true` and the absence of
`nodeIntegration`/`webviewTag` mean the practical exposure is limited to
whatever `contextBridge` exposes (`window.api`), so this is not independently
exploitable today, but it removes a layer of defense-in-depth for free (the
sandbox is the default in modern Electron and typically only needs to be off
when a preload script requires broader Node APIs).
Fix: try `sandbox: true`; if a preload dependency genuinely needs it off,
say so in a comment next to the setting, matching the rest of the codebase's style.

---

## What's good here

- **`absoluteMediaPath`'s traversal guard is actually solid**
  (`src/main/files.ts:179-200`): it rejects any literal `..` path segment
  *after* decoding (the protocol handler decodes once via
  `decodeURIComponent(url.host + url.pathname)` in `src/main/index.ts:169`
  before the check ever runs, so `%2e%2e` and doubly-nested encoding can't
  sneak through), normalizes backslashes so Windows-style traversal collapses
  to the same check, and relies on `path.join`'s non-resetting behavior (unlike
  `path.resolve`) so an absolute-looking segment or a Windows drive letter
  embedded mid-path can't escape the configured root. The `open/<token>` branch
  additionally never accepts a path at all — only an opaque hex token validated
  by regex (`src/main/files.ts:118`) against a process-lifetime map.
- **Zip-slip is structurally impossible in the archive/EPUB path**: entries are
  never written to or read from disk by name — `readArchiveEntry`
  (`src/main/archive.ts:197-214`) does an exact `Map` lookup against the real
  zip central directory, so even if `resolveEpubHref` (`src/shared/epubPaths.ts`)
  ever produced a traversal-shaped string, it simply wouldn't match any entry
  and 404s rather than reading anything.
- **Every spawned child process has an `error` handler and uses argv arrays,
  never a shell** — ffmpeg/ffprobe (`src/main/video/ffmpeg.ts:126`, `171`),
  yt-dlp (`src/main/musicDownload.ts:184`), mokuro (`src/main/mokuroRun.ts:171`),
  the game launcher (`src/main/gameLaunch.ts:112`) — so a missing binary or a
  spawn (`ENOENT`) failure surfaces as a status message instead of an uncaught
  `error` event crashing the main process. `assertSafeArgPath` +
  `file:`-prefixing (`src/main/video/playability.ts:220-232`) closes both the
  leading-dash-as-flag and the `protocol:` ambiguity classes of ffmpeg argument
  injection, and is applied to every input/output path in every argv builder in
  that file.
- **No secrets ever reach a log**: there are zero `console.*` calls anywhere in
  `src/main/`. Every API key/token/password setting found in the codebase
  (`tmdb.api_key`, `rawg.api_key`, `omdb.api_key`, `gemini.api_key`,
  `anthropic.api_key`, `vertex.*`, `jackett.api_key`, `qbittorrent.password`,
  `github.token`, `ytdlp.path`, `mokuro.path`, `ffmpeg.path`/`ffprobe.path`, all
  `*.dir` roots) is accounted for in `scripts/sanitizeSql.cjs:113-123`'s wipe
  list, cross-checked against every `getSetting('...')` call site in
  `src/main/`. Auth material is passed as HTTP headers (Gemini's
  `x-goog-api-key`, GitHub's `authorization: token …` in
  `src/main/updater.ts:208`) rather than embedded in URLs that could end up in
  a thrown-and-toasted error message.
- **SQL is consistently parameterized** despite heavy use of template-literal
  query building (`sets.join(', ')` patterns across `gachaRepo.ts`,
  `coachRepo.ts`, `mediaRepo.ts`, `musicRepo.ts`, etc.): the interpolated parts
  are always either a fixed column-name allowlist or a `?`-placeholder count
  sized to an array, and every actual value is bound as a parameter — no raw
  external string (remote API data, LLM tool input, torrent titles) was found
  concatenated directly into SQL text anywhere in `src/main/`.
