// Text matching for History search (Ctrl+K and /search). Names arrive in
// several scripts, so both the query and every indexed string go through one
// normaliser: Unicode compatibility forms, case, diacritics (which also folds
// ё → е and Arabic hamza seats), Persian/Arabic letter variants, joiners and
// digits. Matching is then plain substring/prefix work over a small index.

const ARABIC_TO_PERSIAN: Record<string, string> = {
  'ي': 'ی', // ي -> ی
  'ى': 'ی', // ى -> ی
  'ك': 'ک', // ك -> ک
  'ة': 'ه' // ة -> ه
}
const DIGITS: Record<string, string> = {}
'۰۱۲۳۴۵۶۷۸۹'.split('').forEach((c, i) => (DIGITS[c] = String(i)))
'٠١٢٣٤٥٦٧٨٩'.split('').forEach((c, i) => (DIGITS[c] = String(i)))

export function normalizeForSearch(s: string): string {
  return s
    .normalize('NFKD')
    .replace(/\p{M}/gu, '')
    .replace(/[‌‍ـ]/g, '')
    .replace(/[يىكة]/g, (c) => ARABIC_TO_PERSIAN[c])
    .replace(/[۰-۹٠-٩]/g, (c) => DIGITS[c])
    .toLowerCase()
    .replace(/[\s\-‐-―_'’"“”.,;:!?()[\]]+/g, ' ')
    .trim()
}

export interface SearchDoc {
  ref: string
  kind: string
  title: string
  subtitle?: string
  /** Names, transliterations and other strong fields. */
  names: string[]
  /** Weaker fields: quote text, source titles. */
  text?: string[]
}

export interface PreparedDoc extends SearchDoc {
  normNames: string[]
  normText: string[]
}

export function prepareDocs(docs: SearchDoc[]): PreparedDoc[] {
  return docs.map((d) => ({
    ...d,
    normNames: d.names.map(normalizeForSearch).filter(Boolean),
    normText: (d.text ?? []).map(normalizeForSearch).filter(Boolean)
  }))
}

export interface SearchHit {
  ref: string
  kind: string
  title: string
  subtitle?: string
  score: number
}

function nameScore(name: string, q: string): number {
  if (name === q) return 100
  if (name.startsWith(q)) return 80
  if ((' ' + name).includes(' ' + q)) return 60
  if (name.includes(q)) return 40
  // Persian compounds are written with a joiner, a space or nothing at all
  // (روح‌الله / روح الله / روحالله); compare with spaces removed as a fallback.
  if (name.replace(/ /g, '').includes(q.replace(/ /g, ''))) return 30
  return 0
}

export function searchDocs(docs: PreparedDoc[], query: string, limit = 20): SearchHit[] {
  const q = normalizeForSearch(query)
  if (!q) return []
  const hits: SearchHit[] = []
  for (const d of docs) {
    let score = 0
    for (const n of d.normNames) score = Math.max(score, nameScore(n, q))
    if (score === 0 && q.length >= 3) {
      for (const t of d.normText) {
        if (t.includes(q)) {
          score = 10
          break
        }
      }
    }
    if (score > 0) hits.push({ ref: d.ref, kind: d.kind, title: d.title, subtitle: d.subtitle, score })
  }
  return hits.sort((a, b) => b.score - a.score || a.title.localeCompare(b.title)).slice(0, limit)
}
