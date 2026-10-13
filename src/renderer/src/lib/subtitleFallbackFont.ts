// libass draws any glyph its chosen font lacks with the DEFAULT font, and
// jassub's bundled default has no kana or kanji. So the styled layer passes an
// installed Japanese family as the default; jassub then loads it through the
// Local Font Access API, which Electron allows without a prompt. Nothing is
// bundled: a machine with no Japanese font keeps jassub's own default.

// Preference order: Windows, then macOS, then common Linux packages.
const CJK_FAMILIES = [
  'yu gothic',
  'meiryo',
  'ms gothic',
  'hiragino sans',
  'hiragino kaku gothic pron',
  'noto sans cjk jp',
  'noto sans jp',
  'source han sans jp',
  'ipaexgothic',
  'ipagothic',
  'takaogothic',
  'vl gothic'
]

export interface LocalFontEntry {
  family: string
  style: string
}

// The first preferred family installed with a Regular face (jassub looks a
// local font up by family and "regular" style), lower-cased as jassub wants.
export function pickCjkFamily(fonts: LocalFontEntry[]): string | null {
  const regular = new Set(
    fonts.filter((f) => f.style.toLowerCase() === 'regular').map((f) => f.family.toLowerCase())
  )
  return CJK_FAMILIES.find((name) => regular.has(name)) ?? null
}

let cached: Promise<string | null> | null = null

export function localCjkFamily(): Promise<string | null> {
  cached ??= (async () => {
    const query = (window as Window & { queryLocalFonts?: () => Promise<LocalFontEntry[]> })
      .queryLocalFonts
    if (typeof query !== 'function') return null
    try {
      return pickCjkFamily(await query.call(window))
    } catch {
      return null
    }
  })()
  return cached
}
