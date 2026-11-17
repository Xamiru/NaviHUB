// Pure rules for the Kindle (KOReader) bridge: reading KOReader's sidecars and
// statistics, matching device books to library books, and planning an import.
// No electron, fs or database import: the IO halves (kindleDevice.ts,
// kindle.ts, repos/kindleRepo.ts) feed plain data in.
//
// KOReader facts relied on here (re-check against the device when KOReader
// changes them):
// - a book's sidecar is `<book stem>.sdr/metadata.<ext>.lua` beside the book,
//   or the same name under koreader/docsettings/<absolute path>, or
//   koreader/hashdocsettings/<md5[0..2]>/<md5>.sdr/ — `doc_path` names the book;
// - `percent_finished` (0-1), `summary.status` (reading|complete|abandoned),
//   `partial_md5_checksum`, `doc_props.title/authors`;
// - highlights are the `annotations` list (2024+) or, in older sidecars, the
//   `highlight` table keyed by page plus the `bookmarks` list;
// - statistics.sqlite3 keys books by the same partial MD5.

import { createHash } from 'crypto'
import { addDays } from '@shared/checklist'
import { startSession } from '@shared/mediaProgress'
import type {
  KindleLinkSuggestion,
  KindlePreviewBook,
  KindlePreviewQuote,
  KoReaderStatus
} from '@shared/types'
import { isLuaTable, luaArray, type LuaTable, type LuaValue } from './luaLiteral'

// The folder Send to Kindle owns on the device. Frozen: ledger rows store
// paths under it, and nothing outside it is ever written or deleted.
export const NAVIHUB_DEVICE_DIR = 'documents/NaviHUB'
// The marker file holding the generated device id.
export const DEVICE_MARKER = `${NAVIHUB_DEVICE_DIR}/.navihub-device.json`
// KOReader's own mount point on a Kindle; sidecars and history store it.
const KINDLE_MOUNT = '/mnt/us/'
// A day counts toward the checklist's book-session item from this much reading.
export const CREDIT_MIN_SECONDS = 5 * 60
// The checklist's editable window (checklistRepo HISTORY_DAYS).
export const CREDIT_WINDOW_DAYS = 364
export const QUOTE_TEXT_MAX = 4000

export interface KoAnnotation {
  text: string
  note: string | null
  chapter: string | null
  datetime: string | null
  pos0: string | null
  pos1: string | null
  // A fixed-layout page (PDF, CBZ); null for reflowable EPUB positions.
  page: number | null
}

export interface KoSidecar {
  // Book path relative to the storage root, when the sidecar says or implies it.
  bookPath: string | null
  partialMd5: string | null
  title: string | null
  authors: string | null
  percent: number | null
  status: KoReaderStatus | null
  annotations: KoAnnotation[]
}

function str(v: LuaValue | undefined): string | null {
  if (typeof v === 'string') {
    const t = v.trim()
    return t ? t : null
  }
  if (typeof v === 'number' && Number.isFinite(v)) return String(v)
  return null
}

function num(v: LuaValue | undefined): number | null {
  return typeof v === 'number' && Number.isFinite(v) ? v : null
}

// A position as a stable string: xpointers are strings already, PDF positions
// are small tables ({ page, x, y }), serialised with sorted keys.
function position(v: LuaValue | undefined): string | null {
  if (typeof v === 'string') return v
  if (typeof v === 'number') return String(v)
  if (isLuaTable(v)) return stableJson(v)
  return null
}

function stableJson(v: LuaValue): string {
  if (!isLuaTable(v)) return JSON.stringify(v)
  const keys = Object.keys(v).sort()
  return `{${keys.map((k) => `${JSON.stringify(k)}:${stableJson(v[k])}`).join(',')}}`
}

// "/mnt/us/documents/x.epub" -> "documents/x.epub"; anything outside the
// user storage (the system partition, another mount) -> null.
export function devicePathFromKindle(abs: string): string | null {
  if (!abs.startsWith(KINDLE_MOUNT)) return null
  const rel = abs.slice(KINDLE_MOUNT.length)
  return isSafeRelative(rel) ? rel : null
}

export function isSafeRelative(rel: string): boolean {
  if (!rel || rel.startsWith('/') || rel.includes('\\') || rel.includes('\0')) return false
  return rel.split('/').every((part) => part !== '' && part !== '.' && part !== '..')
}

// The book a sidecar belongs to, from the sidecar's own path on the device:
//   documents/a/Book.sdr/metadata.epub.lua            -> documents/a/Book.epub
//   koreader/docsettings/mnt/us/documents/a/Book.sdr/… -> documents/a/Book.epub
// Hashed sidecars carry no book name in their path (null; doc_path decides).
export function bookPathForSidecar(sidecarPath: string): string | null {
  const m = /^(.*\/)?([^/]+)\.sdr\/metadata\.([^./]+)\.lua$/.exec(sidecarPath)
  if (!m) return null
  const dir = m[1] ?? ''
  if (dir.startsWith('koreader/hashdocsettings/')) return null
  const book = `${dir}${m[2]}.${m[3]}`
  const docSettings = 'koreader/docsettings/'
  if (book.startsWith(docSettings)) return devicePathFromKindle(`/${book.slice(docSettings.length)}`)
  return isSafeRelative(book) ? book : null
}

const STATUSES: Record<string, KoReaderStatus> = {
  reading: 'reading',
  complete: 'complete',
  abandoned: 'abandoned'
}

export function normalizeSidecar(value: LuaValue, sidecarPath: string): KoSidecar | null {
  if (!isLuaTable(value)) return null
  const props = isLuaTable(value.doc_props) ? value.doc_props : null
  // CBZ and PDF sidecars carry an empty doc_props; KOReader's statistics
  // block names them instead ("N/A" for unknown authors).
  const stats = isLuaTable(value.stats) ? value.stats : null
  const summary = isLuaTable(value.summary) ? value.summary : null
  const known = (v: string | null): string | null => (v && v !== 'N/A' ? v : null)
  const docPath = str(value.doc_path)
  const percent = num(value.percent_finished)
  const statusRaw = str(summary?.status)
  return {
    bookPath: (docPath && devicePathFromKindle(docPath)) ?? bookPathForSidecar(sidecarPath),
    partialMd5: normalizeMd5(str(value.partial_md5_checksum)),
    title: known(str(props?.title)) ?? known(str(stats?.title)),
    authors: known(str(props?.authors)) ?? known(str(stats?.authors)),
    percent: percent == null ? null : Math.min(1, Math.max(0, percent)),
    status: statusRaw ? (STATUSES[statusRaw] ?? null) : null,
    annotations: value.annotations !== undefined ? newAnnotations(value) : legacyAnnotations(value)
  }
}

function normalizeMd5(v: string | null): string | null {
  return v && /^[0-9a-f]{32}$/i.test(v) ? v.toLowerCase() : null
}

// KOReader 2024.04+: one list. A highlight has a selection (`pos0`/`pos1`);
// a page bookmark has none but still carries generated text such as
// "in Chapter Two" (seen on the user's device, KOReader v2026.07.1), so it is
// skipped by its missing position, not by its text.
function newAnnotations(value: LuaTable): KoAnnotation[] {
  const out: KoAnnotation[] = []
  for (const a of luaArray(value.annotations)) {
    if (!isLuaTable(a) || a.pos0 === undefined) continue
    const text = str(a.text)
    if (!text) continue
    out.push({
      text,
      note: str(a.note),
      chapter: str(a.chapter),
      datetime: str(a.datetime),
      pos0: position(a.pos0),
      pos1: position(a.pos1),
      page: typeof a.page === 'number' ? a.page : null
    })
  }
  return out
}

// Older sidecars: `highlight[page] = { {text, chapter, datetime, pos0, pos1} }`,
// with an edited note living on the matching bookmark's `text`. An unedited
// bookmark text is KOReader's own "Page N … @ <datetime>" label, not a note.
function legacyAnnotations(value: LuaTable): KoAnnotation[] {
  const notes = new Map<string, string>()
  for (const b of luaArray(value.bookmarks)) {
    if (!isLuaTable(b)) continue
    const at = str(b.datetime)
    const text = str(b.text)
    if (!at || !text) continue
    if (/^Page \d+ .*@ \d{4}-\d\d-\d\d \d\d:\d\d:\d\d$/s.test(text)) continue
    notes.set(at, text)
  }
  const out: KoAnnotation[] = []
  const pages = isLuaTable(value.highlight) ? value.highlight : null
  if (!pages) return out
  const pageKeys = Object.keys(pages).sort((a, b) => Number(a) - Number(b))
  for (const pageKey of pageKeys) {
    for (const h of luaArray(pages[pageKey])) {
      if (!isLuaTable(h)) continue
      const text = str(h.text)
      if (!text) continue
      const at = str(h.datetime)
      const pageNo = Number(pageKey)
      out.push({
        text,
        note: at ? (notes.get(at) ?? null) : null,
        chapter: str(h.chapter),
        datetime: at,
        pos0: position(h.pos0),
        pos1: position(h.pos1),
        page: typeof h.pos0 === 'string' || !Number.isFinite(pageNo) ? null : pageNo
      })
    }
  }
  return out
}

// ---- KOReader's partial MD5 (frontend/util.lua partialMD5) ----

// MD5 over 1 KiB samples at 0, 1 KiB, 4 KiB, 16 KiB … 1 GiB (1024 << 2i for
// i = -1..10, where LuaJIT's lshift by -2 wraps to 0), stopping at the first
// offset past the end. `read` returns null or an empty buffer past the end.
export const PARTIAL_MD5_OFFSETS: number[] = [0, ...Array.from({ length: 11 }, (_, i) => 1024 * 4 ** i)]

export async function partialMd5(
  read: (offset: number, length: number) => Promise<Buffer | null>
): Promise<string> {
  const hash = createHash('md5')
  for (const offset of PARTIAL_MD5_OFFSETS) {
    const chunk = await read(offset, 1024)
    if (!chunk || chunk.length === 0) break
    hash.update(chunk)
  }
  return hash.digest('hex')
}

// ---- reading statistics ----

// One book's reading on one local day, as statistics.sqlite3 sums it (the
// query groups page_stat_data in SQLite, so years of page rows never cross
// into JavaScript one by one).
export interface StatDayRow {
  md5: string | null
  day: string // local YYYY-MM-DD
  seconds: number
  pages: number // distinct pages read that day
}

export interface ReadingDay {
  day: string // local YYYY-MM-DD
  seconds: number
  pages: number
}

// Per-book day lists. Days after `today` come from a wrong device clock and
// are counted in `future`, not kept.
export function aggregateReadingDays(
  rows: StatDayRow[],
  today: string
): { byMd5: Map<string, ReadingDay[]>; future: number } {
  const acc = new Map<string, Map<string, ReadingDay>>()
  let future = 0
  for (const r of rows) {
    const md5 = normalizeMd5(r.md5)
    if (!md5 || !(r.seconds > 0) || !/^\d{4}-\d\d-\d\d$/.test(r.day)) continue
    if (r.day > today) {
      future++
      continue
    }
    let days = acc.get(md5)
    if (!days) acc.set(md5, (days = new Map()))
    const d = days.get(r.day)
    if (d) {
      d.seconds += Math.round(r.seconds)
      d.pages += r.pages
    } else {
      days.set(r.day, { day: r.day, seconds: Math.round(r.seconds), pages: r.pages })
    }
  }
  // A day holds at most 24 hours: a torn statistics copy or a clock glitch
  // must not store more (stored days only ever rise).
  const byMd5 = new Map<string, ReadingDay[]>()
  for (const [md5, days] of acc) {
    for (const d of days.values()) d.seconds = Math.min(d.seconds, 86400)
    byMd5.set(md5, [...days.values()].sort((a, b) => a.day.localeCompare(b.day)))
  }
  return { byMd5, future }
}

// ---- title matching ----

export function titleKey(title: string): string {
  return title
    .normalize('NFKC')
    .toLowerCase()
    .replace(/\.(epub|cbz|pdf|mobi|azw3?|fb2|txt)$/, '')
    .replace(/[\p{P}\p{S}]+/gu, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

function words(key: string): Set<string> {
  return new Set(key.split(' ').filter((w) => w.length > 1 && !STOP_WORDS.has(w)))
}

const STOP_WORDS = new Set(['the', 'a', 'an', 'of', 'and', 'vol', 'volume', 'book'])

// How alike two titles are, 0-1. Exact (after folding) is 1; one title
// containing the other (a subtitle, a series suffix) 0.85; otherwise shared
// words scaled down so a coincidence never outranks a real match.
export function titleScore(a: string, b: string): number {
  return keyScore(titleKey(a), titleKey(b))
}

function keyScore(ka: string, kb: string, wa = words(ka), wb = words(kb)): number {
  if (!ka || !kb) return 0
  if (ka === kb) return 1
  const shorter = ka.length <= kb.length ? ka : kb
  const longer = shorter === ka ? kb : ka
  if (shorter.length >= 4 && (` ${longer} `.includes(` ${shorter} `) || (!/\s/.test(longer) && longer.includes(shorter)))) {
    return 0.85
  }
  if (wa.size === 0 || wb.size === 0) return 0
  let shared = 0
  for (const w of wa) if (wb.has(w)) shared++
  return (0.7 * shared) / (wa.size + wb.size - shared)
}

export const SUGGESTION_MIN_SCORE = 0.4

export interface LinkCandidate {
  id: number
  title: string
  // Folded once per scan, so matching a device book against a large library
  // is string compares, not a re-normalisation per pair.
  key: string
  words: Set<string>
}

// `match`, when given, is the text compared instead of the title (a manga's
// local folder name); the suggestion still shows the library title.
export function linkCandidates(rows: Array<{ id: number; title: string; match?: string }>): LinkCandidate[] {
  return rows.map((r) => {
    const key = titleKey(r.match ?? r.title)
    return { id: r.id, title: r.title, key, words: words(key) }
  })
}

export function suggestLinks(title: string, candidates: LinkCandidate[], limit = 3): KindleLinkSuggestion[] {
  const key = titleKey(title)
  const own = words(key)
  // One entry per library item: a title and its folder name can both match.
  const best = new Map<number, KindleLinkSuggestion>()
  for (const c of candidates) {
    const score = keyScore(key, c.key, own, c.words)
    if (score < SUGGESTION_MIN_SCORE) continue
    const had = best.get(c.id)
    if (!had || score > had.score) best.set(c.id, { mediaId: c.id, title: c.title, score })
  }
  return [...best.values()].sort((a, b) => b.score - a.score || a.title.localeCompare(b.title)).slice(0, limit)
}

// ---- highlights ----

export function sha1(text: string): string {
  return createHash('sha1').update(text, 'utf8').digest('hex')
}

// A highlight's identity within one book: KOReader's creation `datetime` (it
// survives a changed note) plus its start position, so two highlights made in
// the same second keep separate keys whatever else is on the device. A key
// must never depend on the other highlights: a key that shifted when one was
// deleted would point another highlight at the wrong quote. Extending a
// selection moves its start, so it imports as a new quote beside the old one.
// Entries without a datetime (old sidecars) are keyed by position and text.
export function annotationFingerprint(a: KoAnnotation): string {
  return sha1(a.datetime ? `at\n${a.datetime}\n${a.pos0 ?? ''}` : `text\n${a.pos0 ?? ''}\n${a.text}`)
}

// What quoteRepo stores for a text or note: trimmed, capped, null when empty.
export function storedForm(value: string | null | undefined, max = QUOTE_TEXT_MAX): string | null {
  const v = (value ?? '').trim()
  return v ? v.slice(0, max) : null
}

export function hashStored(value: string | null): string {
  return sha1(value ?? '')
}

export function annotationLocator(a: KoAnnotation): string | null {
  if (a.chapter) return a.chapter.slice(0, 300)
  if (a.page != null) return `Page ${a.page}`
  return null
}

// ---- the import plan ----

export interface PlanMedia {
  id: number
  title: string
  status: string | null
  progress: number
  totalUnits: number | null
  // Positional: first = in progress, second = completed, last = planned. The
  // middle ones are the user's to rename or remove.
  statuses: string[]
}

export interface PlanAnnotationState {
  quoteId: number | null
  // The quote's current stored text and note; null quote = deleted.
  quote: { text: string; note: string | null } | null
  importedTextHash: string
  importedNoteHash: string
}

export interface PlanDayState {
  seconds: number
  credited: boolean
}

export interface PlanBookInput {
  media: PlanMedia
  sidecar: KoSidecar | null
  days: ReadingDay[]
  annotations: Map<string, PlanAnnotationState>
  storedDays: Map<string, PlanDayState>
  // Days that already have a book-session checklist log for this book.
  loggedDays: Set<string>
}

export interface PlannedQuote extends KindlePreviewQuote {
  fingerprint: string
  quoteId: number | null
  // For updates: which fields the user has not edited and the device changed.
  setText: boolean
  setNote: boolean
}

export interface PlannedDay extends ReadingDay {
  credit: boolean
}

export interface PlannedBook extends Omit<KindlePreviewBook, 'quotes'> {
  quotes: PlannedQuote[]
  days: PlannedDay[]
}

// KOReader stores "On hold" as `abandoned`. The library's on-hold status is
// the one named so; failing that, the third of the five default positions.
// Without either, an on-hold book is not offered a status change.
export function onHoldStatus(statuses: string[]): string | null {
  const named = statuses.slice(2, -1).find((s) => /hold|pause/i.test(s))
  if (named) return named
  return statuses.length === 5 ? statuses[2] : null
}

// `creditable(day)`: the checklist's daily book-session item was on the board
// and due that day, by its rule history.
export function planBook(
  input: PlanBookInput,
  today: string,
  creditable: (day: string) => boolean
): PlannedBook {
  const { media, sidecar } = input
  const [inProgress, completed] = media.statuses
  const onHold = onHoldStatus(media.statuses)
  const total = media.totalUnits != null && media.totalUnits > 0 ? media.totalUnits : null
  const percent = sidecar?.percent ?? null
  const devicePages = percent != null && total != null ? Math.min(total, Math.round(percent * total)) : null

  let progress: PlannedBook['progress'] = null
  let status: PlannedBook['status'] = null
  let statusDefaultOn = true
  let rereading = false

  if (completed && media.status === completed) {
    if (sidecar?.status !== 'complete' && devicePages != null && total != null && devicePages < total) {
      rereading = true
    }
  } else {
    if (sidecar?.status === 'complete' && completed) {
      status = { from: media.status, to: completed, reason: 'finished' }
      if (total != null && media.progress < total) progress = { from: media.progress, to: total, total }
    } else {
      if (devicePages != null && total != null && devicePages > media.progress) {
        progress = { from: media.progress, to: devicePages, total }
      }
      if (sidecar?.status === 'abandoned' && onHold && media.status !== onHold) {
        status = { from: media.status, to: onHold, reason: 'abandoned' }
        statusDefaultOn = false
      } else if (progress || hasNewReading(input, today)) {
        const next = startSession(media.status, media.statuses)
        if (next && next !== media.status && next === inProgress) {
          status = { from: media.status, to: next, reason: 'started' }
        }
      }
    }
  }

  // Highlights.
  const quotes: PlannedQuote[] = []
  let skippedDeleted = 0
  const seen = new Set<string>()
  for (const a of sidecar?.annotations ?? []) {
    const fingerprint = annotationFingerprint(a)
    if (seen.has(fingerprint)) continue
    seen.add(fingerprint)
    const text = storedForm(a.text)
    if (!text) continue
    const note = storedForm(a.note)
    const locator = annotationLocator(a)
    const key = `${media.id}:${fingerprint}`
    const state = input.annotations.get(fingerprint)
    if (!state) {
      quotes.push({ key, kind: 'new', text, note, locator, fingerprint, quoteId: null, setText: true, setNote: true })
      continue
    }
    if (!state.quote || state.quoteId == null) {
      skippedDeleted++
      continue
    }
    const deviceTextChanged = hashStored(text) !== state.importedTextHash
    const deviceNoteChanged = hashStored(note) !== state.importedNoteHash
    const textUntouched = hashStored(storedForm(state.quote.text)) === state.importedTextHash
    const noteUntouched = hashStored(storedForm(state.quote.note)) === state.importedNoteHash
    const setText = deviceTextChanged && textUntouched
    const setNote = deviceNoteChanged && noteUntouched
    if (setText || setNote) {
      quotes.push({
        key,
        kind: 'update',
        text: setText ? text : state.quote.text,
        note: setNote ? note : state.quote.note,
        locator,
        fingerprint,
        quoteId: state.quoteId,
        setText,
        setNote
      })
    }
  }

  const days = planDays(input, today, creditable)
  return {
    mediaId: media.id,
    title: media.title,
    kind: 'book',
    progress,
    progressDefaultOn: true,
    chapterNumbering: null,
    status,
    statusDefaultOn,
    rereading,
    percent,
    volumesRead: [],
    quotes,
    skippedDeleted,
    reading: readingSummary(days),
    days
  }
}

// Reading days: device totals only ever raise a stored day (a trimmed
// statistics database must not shrink history), and a day is credited once.
function planDays(
  input: Pick<PlanBookInput, 'days' | 'storedDays' | 'loggedDays'>,
  today: string,
  creditable: (day: string) => boolean
): PlannedDay[] {
  const earliest = addDays(today, -(CREDIT_WINDOW_DAYS - 1))
  const days: PlannedDay[] = []
  for (const d of input.days) {
    if (d.day > today) continue
    const stored = input.storedDays.get(d.day)
    const seconds = Math.max(d.seconds, stored?.seconds ?? 0)
    const credit =
      seconds >= CREDIT_MIN_SECONDS &&
      d.day >= earliest &&
      !stored?.credited &&
      !input.loggedDays.has(d.day) &&
      creditable(d.day)
    if (!stored || seconds > stored.seconds || credit) {
      days.push({ day: d.day, seconds, pages: d.pages, credit })
    }
  }
  return days
}

function readingSummary(days: PlannedDay[]): PlannedBook['reading'] {
  return days.length
    ? {
        days: days.length,
        seconds: days.reduce((n, d) => n + d.seconds, 0),
        firstDay: days[0].day,
        lastDay: days[days.length - 1].day,
        credits: days.filter((d) => d.credit).length
      }
    : null
}

// A re-read alone is only a note, not a change: listing it would put the
// book in every preview with nothing to apply.
export function hasChanges(b: PlannedBook): boolean {
  return b.progress != null || b.status != null || b.quotes.length > 0 || b.days.length > 0
}

// Reading the import has not recorded yet. Days already stored do not start a
// book again, so a book the user moved back to planned stays there.
function hasNewReading(input: PlanBookInput, today: string): boolean {
  return input.days.some((d) => d.day <= today && d.seconds > (input.storedDays.get(d.day)?.seconds ?? 0))
}

// ---- Send to Kindle file names ----

// A file name that is legal on FAT/exFAT, NTFS and over MTP: no reserved
// characters or control codes, no trailing dot or space, no reserved DOS
// device name, at most 120 characters before the extension.
export function deviceFileName(title: string, ext: string): string {
  let base = title
    .normalize('NFC')
    .replace(/[<>:"/\\|?*\u0000-\u001f\u007f]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .replace(/[. ]+$/, '')
    // A leading dot hides a file (and the writer refuses one): ".hack" -> "hack".
    .replace(/^[. ]+/, '')
  if (/^(con|prn|aux|nul|com\d|lpt\d)$/i.test(base)) base = `${base} book`
  // By code point, so a surrogate pair is never split, and the end is
  // cleaned again: FAT drops a trailing dot or space, which would make the
  // name on the device differ from the one recorded.
  // At most 120 characters and 200 UTF-8 bytes (ext-style file systems allow
  // 255 bytes; 120 Japanese characters would be 360), leaving room for the
  // extension and a " (n)" from freeFileName.
  const points = Array.from(base)
  let keep = Math.min(points.length, 120)
  while (keep > 0 && Buffer.byteLength(points.slice(0, keep).join(''), 'utf8') > 200) keep--
  if (keep < points.length) base = points.slice(0, keep).join('').replace(/[. ]+$/, '')
  if (!base) base = 'Book'
  const cleanExt = ext.toLowerCase().replace(/[^a-z0-9]/g, '')
  return `${base}.${cleanExt || 'epub'}`
}

// The first free name: "x.epub", "x (2).epub", "x (3).epub" … against the
// names already in the folder, compared case-insensitively (FAT and NTFS are).
export function freeFileName(name: string, taken: Iterable<string>): string {
  const lower = new Set([...taken].map((n) => n.toLowerCase()))
  if (!lower.has(name.toLowerCase())) return name
  const dot = name.lastIndexOf('.')
  const stem = dot > 0 ? name.slice(0, dot) : name
  const ext = dot > 0 ? name.slice(dot) : ''
  for (let n = 2; n < 1000; n++) {
    const candidate = `${stem} (${n})${ext}`
    if (!lower.has(candidate.toLowerCase())) return candidate
  }
  throw new Error('No free file name on the device')
}

// Only paths inside NaviHUB's own device folder may be written or deleted.
export function isNaviHubDevicePath(rel: string): boolean {
  return isSafeRelative(rel) && rel.startsWith(`${NAVIHUB_DEVICE_DIR}/`) && rel.length > NAVIHUB_DEVICE_DIR.length + 1
}

// ---- the device's books ----

export interface DeviceBookRecord {
  key: string // md5, or 'path:<device path>' for a book KOReader never opened
  md5: string | null
  devicePath: string | null
  title: string
  authors: string | null
  sidecar: KoSidecar | null
  days: ReadingDay[]
  // Furthest page read / page count, from KOReader's statistics (0-1); null
  // when the statistics do not say.
  statsProgress?: number | null
}

function stem(path: string): string {
  const name = path.slice(path.lastIndexOf('/') + 1)
  const dot = name.lastIndexOf('.')
  return dot > 0 ? name.slice(0, dot) : name
}

// One record per book on the device, joining KOReader's sidecars, its
// statistics and the book files. A statistics-only book (its sidecar or file
// was deleted) still carries reading time and is listed.
export function mergeDeviceBooks(
  sidecars: Array<KoSidecar & { sidecarPath: string }>,
  statsBooks: Array<{
    md5: string
    title: string | null
    authors: string | null
    pages?: number | null
    maxPage?: number | null
  }>,
  files: Array<{ path: string }>,
  daysByMd5: Map<string, ReadingDay[]>
): DeviceBookRecord[] {
  const byKey = new Map<string, DeviceBookRecord>()
  const pathsSeen = new Set<string>()
  for (const s of sidecars) {
    const key = s.partialMd5 ?? `path:${s.bookPath ?? s.sidecarPath}`
    if (byKey.has(key)) continue // a stale docsettings copy of the same book
    if (s.bookPath) pathsSeen.add(s.bookPath)
    byKey.set(key, {
      key,
      md5: s.partialMd5,
      devicePath: s.bookPath,
      title: s.title ?? stem(s.bookPath ?? s.sidecarPath.replace(/\.sdr\/[^/]+$/, '')),
      authors: s.authors,
      sidecar: s,
      days: s.partialMd5 ? (daysByMd5.get(s.partialMd5) ?? []) : []
    })
  }
  for (const b of statsBooks) {
    const md5 = normalizeMd5(b.md5)
    if (!md5) continue
    const statsProgress = statsProgressOf(b.pages, b.maxPage)
    const existing = byKey.get(md5)
    if (existing) {
      if (!existing.authors && b.authors) existing.authors = b.authors
      existing.statsProgress = statsProgress
      continue
    }
    byKey.set(md5, {
      key: md5,
      md5,
      devicePath: null,
      title: b.title?.trim() || 'Untitled',
      authors: b.authors,
      sidecar: null,
      days: daysByMd5.get(md5) ?? [],
      statsProgress
    })
  }
  for (const f of files) {
    if (pathsSeen.has(f.path)) continue
    const key = `path:${f.path}`
    if (byKey.has(key)) continue
    byKey.set(key, { key, md5: null, devicePath: f.path, title: stem(f.path), authors: null, sidecar: null, days: [] })
  }
  return [...byKey.values()].sort((a, b) => a.title.localeCompare(b.title))
}


// One library book can be two device files (separate volumes, or another
// edition). Their KOReader data is merged before planning: every distinct
// highlight and each day's reading summed across the files (device seconds
// only, so the stored total is folded in once, by planBook); no position or
// status, since neither file's is the whole book's.
export function mergeForMedia(records: DeviceBookRecord[]): { sidecar: KoSidecar | null; days: ReadingDay[] } {
  const sidecars = records.map((r) => r.sidecar).filter((s): s is KoSidecar => s != null)
  let sidecar: KoSidecar | null = null
  if (sidecars.length === 1) sidecar = sidecars[0]
  else if (sidecars.length > 1) {
    const seen = new Set<string>()
    const annotations: KoAnnotation[] = []
    for (const s of sidecars) {
      for (const a of s.annotations) {
        const id = `${a.datetime ?? ''}\n${a.pos0 ?? ''}\n${a.text}`
        if (seen.has(id)) continue
        seen.add(id)
        annotations.push(a)
      }
    }
    // Two linked files always differ in content (kindle_book is unique per
    // partial MD5): separate volumes, or another edition. Neither one's
    // position or finished status is the book's, so progress and completion
    // are left to the user; highlights and reading time still add up.
    sidecar = {
      ...sidecars[0],
      percent: null,
      status: null,
      annotations
    }
  }
  const byDay = new Map<string, ReadingDay>()
  for (const r of records) {
    for (const d of r.days) {
      const had = byDay.get(d.day)
      byDay.set(d.day, had ? { day: d.day, seconds: had.seconds + d.seconds, pages: had.pages + d.pages } : { ...d })
    }
  }
  return { sidecar, days: [...byDay.values()].sort((a, b) => a.day.localeCompare(b.day)) }
}

// ---- manga: comic files grouped by series folder ----
//
// Manga reach the Kindle as one comic archive per chapter or volume, in one
// folder per series ("documents/Berserk/Berserk - Vol 01 Ch 003.cbz", from the
// user's Kindle-ready mirror). The files were renamed on the way, so they
// cannot be matched to the library's manga_chapter rows: a series folder is
// linked to a library manga by hand, and its chapter progress comes from the
// chapter numbers in the file names.

export const COMIC_EXTS = ['cbz', 'cbr', 'cbt', 'cb7'] as const

export function isComicPath(path: string): boolean {
  const dot = path.lastIndexOf('.')
  return dot > 0 && (COMIC_EXTS as readonly string[]).includes(path.slice(dot + 1).toLowerCase())
}

// The series a comic file belongs to: its folder under documents/, or the
// file's own name for a comic that sits directly in documents/. Null for a
// path outside documents/ or one NaviHUB wrote (Send to Kindle owns those).
export function seriesKeyFor(devicePath: string): string | null {
  if (!isSafeRelative(devicePath) || !devicePath.startsWith('documents/')) return null
  if (isNaviHubDevicePath(devicePath)) return null
  const parts = devicePath.slice('documents/'.length).split('/')
  if (parts.length === 1) return stem(parts[0]) || null
  return parts.slice(0, -1).join('/')
}

// A folder that holds series folders AND loose comic files (the user's device
// keeps everything under documents/Downloads/) is not itself a series: each of
// its loose comics becomes a series of its own, named after the file, so a
// stray CBZ never turns the whole Downloads folder into one series.
// A folder whose own comics are named after it ("Berserk/Berserk - Vol 01.cbz")
// is a series even with a subfolder (Berserk/Extras/), and stays whole.
export function splitLooseComics<T>(series: Map<string, T[]>, pathOf: (item: T) => string): Map<string, T[]> {
  const keys = [...series.keys()]
  const isParent = (k: string): boolean => keys.some((o) => o !== k && o.startsWith(`${k}/`))
  const namedAfter = (key: string, items: T[]): boolean => {
    const prefix = `${seriesName(key).normalize('NFKC').toLowerCase()} - `
    const named = items.filter((i) => {
      const p = pathOf(i)
      return p.slice(p.lastIndexOf('/') + 1).normalize('NFKC').toLowerCase().startsWith(prefix)
    }).length
    return named * 2 > items.length
  }
  const out = new Map<string, T[]>()
  for (const [key, items] of series) {
    if (!isParent(key) || namedAfter(key, items)) {
      out.set(key, [...(out.get(key) ?? []), ...items])
      continue
    }
    for (const item of items) {
      const path = pathOf(item)
      const own = `${key}/${stem(path.slice(path.lastIndexOf('/') + 1))}`
      out.set(own, [...(out.get(own) ?? []), item])
    }
  }
  return out
}

export function seriesName(key: string): string {
  return key.slice(key.lastIndexOf('/') + 1)
}

export type KindleUnit =
  // `volume`: the volume named beside the chapter ("Vol 03 Ch 012"), if any.
  | { kind: 'chapter'; number: number; volume?: number }
  | { kind: 'volume'; number: number }
  | { kind: 'other' }

// "Berserk - Vol 03 Ch 012 Part 2.cbz" is chapter 12; "Berserk - Vol 03.cbz"
// is volume 3; a bare "012.cbz" is chapter 12. A chapter number always wins
// over the volume beside it, because library progress counts chapters.
export function parseKindleUnit(fileName: string, series: string): KindleUnit {
  let s = stem(fileName).normalize('NFKC').trim()
  const prefix = `${series.normalize('NFKC').trim()} - `
  if (s.toLowerCase().startsWith(prefix.toLowerCase())) s = s.slice(prefix.length)
  const num = (v: string): number | null => {
    const n = Number(v)
    return Number.isFinite(n) && n >= 0 && n < 100000 ? n : null
  }
  const ch = /(?:^|[\s_\-.(\[])ch(?:apter)?\.?\s*(\d+(?:\.\d+)?)(?![\d-])/i.exec(s)
  const vol = /(?:^|[\s_\-.(\[])vol(?:ume)?\.?\s*(\d+(?:\.\d+)?)(?![\d-])/i.exec(s)
  const v = vol ? num(vol[1]) : null
  if (ch) {
    const n = chapterNumber(ch[1])
    if (n != null) return v != null ? { kind: 'chapter', number: n, volume: v } : { kind: 'chapter', number: n }
  }
  if (v != null) return { kind: 'volume', number: v }
  if (/^\d+(?:\.\d+)?$/.test(s)) {
    const n = chapterNumber(s)
    if (n != null) return { kind: 'chapter', number: n }
  }
  return { kind: 'other' }
}

// "10.5" is a half chapter; "287.297" (two or more digits after the dot,
// larger than the whole part) is a range of chapters, read as its end. The
// mirror writes the Evil Genius range "ch287-297" that way.
function chapterNumber(v: string): number | null {
  const m = /^(\d+)(?:\.(\d+))?$/.exec(v)
  if (!m) return null
  const whole = Number(m[1])
  const frac = m[2]
  const n = frac && frac.length >= 2 && Number(frac) > whole ? Number(frac) : Number(v)
  return Number.isFinite(n) && n >= 0 && n < 100000 ? n : null
}

// A comic file counts as read when KOReader marked it finished or it was read
// to (practically) the last page. Unlike a book's finished status, this only
// feeds chapter progress, and a chapter's last page is its end.
export const COMIC_READ_PERCENT = 0.99

// `statsProgress` (furthest page / page count from KOReader's statistics) is
// used only when the sidecar has no position at all: some sidecars on the
// user's device (touched by ZenOS) carry none. A comic's pages are fixed, so
// the furthest page is a real position, unlike a reflowed EPUB's.
export function isComicRead(sidecar: KoSidecar | null, statsProgress: number | null = null): boolean {
  if (sidecar?.status === 'complete') return true
  const percent = sidecar?.percent ?? statsProgress
  return (percent ?? 0) >= COMIC_READ_PERCENT
}

export function statsProgressOf(pages: number | null | undefined, maxPage: number | null | undefined): number | null {
  if (typeof pages !== 'number' || typeof maxPage !== 'number' || !(pages > 0) || !(maxPage > 0)) return null
  return Math.min(1, maxPage / pages)
}

export interface SeriesFile {
  unit: KindleUnit
  read: boolean
  // KOReader's own finished status. Reading to the last page counts a chapter
  // as read, but only this completes a series (2026-11-16 review).
  finished?: boolean
}

export interface SeriesSummary {
  files: number
  // The highest chapter whose every file (all its parts) is read; null when
  // no chapter file is read.
  lastChapter: number | null
  // Every file of the lastChapter chapter carries KOReader's finished status.
  lastFinished: boolean
  chaptersRead: number
  // 'per-volume': chapter numbers restart in each volume ("Vol 02 Ch 001"),
  // so lastChapter is the read chapter's position counted in volume and
  // chapter order, which is right only if no chapter is missing.
  // 'unclear': numbers restart AND some volumes are whole-volume files, so
  // no position can be counted; lastChapter is null.
  numbering: 'series' | 'per-volume' | 'unclear'
  volumesRead: number[]
}

export function summarizeSeries(files: SeriesFile[]): SeriesSummary {
  // A chapter number seen under two volumes means the numbering restarts.
  const volumesOf = new Map<number, Set<number>>()
  for (const f of files) {
    if (f.unit.kind !== 'chapter' || f.unit.volume == null) continue
    const set = volumesOf.get(f.unit.number) ?? new Set<number>()
    set.add(f.unit.volume)
    volumesOf.set(f.unit.number, set)
  }
  const restarts = [...volumesOf.values()].some((s) => s.size > 1)
  const hasVolumeFiles = files.some((f) => f.unit.kind === 'volume')
  const perVolume = restarts && !hasVolumeFiles
  const unclear = restarts && hasVolumeFiles

  // Chapter key -> every part read; for per-volume numbering the key is the
  // (volume, chapter) pair.
  const chapters = new Map<string, { vol: number; ch: number; read: boolean; finished: boolean }>()
  const volumes = new Map<number, boolean>()
  for (const f of files) {
    if (f.unit.kind === 'other') continue
    if (f.unit.kind === 'volume') {
      volumes.set(f.unit.number, (volumes.get(f.unit.number) ?? true) && f.read)
      continue
    }
    const vol = perVolume ? (f.unit.volume ?? 0) : 0
    const key = `${vol}:${f.unit.number}`
    const had = chapters.get(key)
    chapters.set(key, {
      vol,
      ch: f.unit.number,
      read: (had?.read ?? true) && f.read,
      finished: (had?.finished ?? true) && f.finished === true
    })
  }
  const ordered = [...chapters.values()].sort((a, b) => a.vol - b.vol || a.ch - b.ch)
  let lastChapter: number | null = null
  let lastFinished = false
  let chaptersRead = 0
  ordered.forEach((c, i) => {
    if (!c.read) return
    chaptersRead++
    const n = perVolume ? i + 1 : c.ch
    if (lastChapter == null || n > lastChapter) {
      lastChapter = n
      lastFinished = c.finished
    }
  })
  return {
    files: files.length,
    lastChapter: unclear ? null : lastChapter,
    lastFinished: !unclear && lastFinished,
    chaptersRead,
    numbering: unclear ? 'unclear' : perVolume ? 'per-volume' : 'series',
    volumesRead: [...volumes]
      .filter(([, read]) => read)
      .map(([n]) => n)
      .sort((a, b) => a - b)
  }
}

export interface PlanMangaInput {
  media: PlanMedia
  files: SeriesFile[]
  days: ReadingDay[]
  storedDays: Map<string, PlanDayState>
}

// One series' import plan, in the book plan's shape so Apply and Undo treat
// both alike. Progress is chapters, raised only, and never past a known
// total (a file numbered beyond it means the numbering differs, so nothing is
// offered). Completed only when the chapters reach a known total AND KOReader
// marked that last chapter finished: reading to the last page raises progress
// but never completes (the Kindle contract, kindle.md). Volume
// files are reported, never turned into a chapter count. Manga reading days
// never credit the checklist: its manga item logs a chapter, which would
// raise progress a second time.
export function planManga(input: PlanMangaInput, today: string): PlannedBook {
  const { media } = input
  const [inProgress, completed] = media.statuses
  const total = media.totalUnits != null && media.totalUnits > 0 ? media.totalUnits : null
  const summary = summarizeSeries(input.files)
  const reached = summary.lastChapter != null ? Math.floor(summary.lastChapter) : null

  let progress: PlannedBook['progress'] = null
  let status: PlannedBook['status'] = null
  const isCompleted = !!completed && media.status === completed
  if (!isCompleted && reached != null && reached > media.progress && (total == null || reached <= total)) {
    progress = { from: media.progress, to: reached, total }
  }
  const days = planDays({ ...input, loggedDays: new Set() }, today, () => false)
  if (!isCompleted) {
    // Completed when the highest chapter IS the known total and KOReader
    // finished it, whether or not progress moves now (it may already be at the
    // total, set by hand). A chapter beyond the total means the numbering
    // differs from the library's, so nothing is offered.
    if (completed && total != null && reached === total && summary.lastFinished) {
      status = { from: media.status, to: completed, reason: 'finished' }
    } else if (progress || days.some((d) => d.seconds > (input.storedDays.get(d.day)?.seconds ?? 0))) {
      const next = startSession(media.status, media.statuses)
      if (next && next !== media.status && next === inProgress) {
        status = { from: media.status, to: next, reason: 'started' }
      }
    }
  }
  // A counted chapter position is a guess, so it is offered unticked, and
  // so is any status that rests on it.
  const counted = summary.numbering === 'per-volume'
  return {
    mediaId: media.id,
    title: media.title,
    kind: 'manga',
    progress,
    progressDefaultOn: !counted,
    chapterNumbering: progress && summary.numbering !== 'unclear' ? summary.numbering : null,
    status,
    statusDefaultOn: !(counted && progress),
    rereading: false,
    percent: null,
    volumesRead: summary.volumesRead,
    quotes: [],
    skippedDeleted: 0,
    reading: readingSummary(days),
    days
  }
}
