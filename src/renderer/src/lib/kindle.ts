import type { KindleApplySelection, KindleImportPreview } from '@shared/types'

// Display helpers and the import selection for the Kindle page, kept out of
// the page modules so tests (and both dialogs) share one definition.

// "6 h 20 min", "45 min", "under 1 min". Rounds to whole minutes first, so
// 59 min 50 s reads "1 h 0 min", never "60 min". BookFacts uses it as well.
export function readTime(seconds: number): string {
  const minutes = Math.round(seconds / 60)
  if (minutes === 0) return seconds > 0 ? 'under 1 min' : '0 min'
  const h = Math.floor(minutes / 60)
  const m = minutes % 60
  return h > 0 ? `${h} h ${m} min` : `${m} min`
}

export function bytes(n: number): string {
  if (n >= 1024 ** 3) return `${(n / 1024 ** 3).toFixed(1)} GB`
  if (n >= 1024 ** 2) return `${Math.round(n / 1024 ** 2)} MB`
  return `${Math.round(n / 1024)} KB`
}

export function percent(p: number | null): string | null {
  return p == null ? null : `${Math.round(p * 100)}%`
}

// What Apply writes when the user changes nothing: everything except what is
// shown unticked (an "abandoned" status, a counted manga chapter).
export function defaultSelection(preview: KindleImportPreview): KindleApplySelection {
  return {
    scanId: preview.scanId,
    progress: preview.books.filter((b) => b.progress && b.progressDefaultOn).map((b) => b.mediaId),
    status: preview.books.filter((b) => b.status && b.statusDefaultOn).map((b) => b.mediaId),
    quotes: preview.books.flatMap((b) => b.quotes.map((q) => q.key)),
    reading: preview.books.filter((b) => b.reading).map((b) => b.mediaId),
    words: preview.words.filter((w) => w.importable).map((w) => w.key)
  }
}

export function selectionSize(s: KindleApplySelection): number {
  return s.progress.length + s.status.length + s.quotes.length + s.reading.length + s.words.length
}

export function toggle<T>(list: T[], item: T, on: boolean): T[] {
  const has = list.includes(item)
  if (on && !has) return [...list, item]
  if (!on && has) return list.filter((x) => x !== item)
  return list
}
