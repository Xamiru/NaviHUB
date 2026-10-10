// The readers' remembered settings (localStorage, every series or book alike).
// Lives in lib/ so Settings → Readers & quizzes can show and edit the same
// values without importing a reader page (the route-split rule): what a reader
// was last left on IS the default the next one opens with.

// ---- manga reader ----

export type MangaReaderMode = 'single' | 'double' | 'vertical'
export type MangaReaderFit = 'height' | 'width' | 'original'
export type MangaReaderDirection = 'rtl' | 'ltr'

export interface MangaReaderPrefs {
  mode: MangaReaderMode
  fit: MangaReaderFit
  direction: MangaReaderDirection
  coverOffset: boolean
  zoom: number
  // Dim the page for night reading. A CSS filter on the reading column, so it
  // costs nothing and never touches the stored image.
  brightness: number // 0.3 – 1
  // Space between pages in scroll mode. 0 is the seamless webtoon look; a few
  // px separates the pages of a scanned volume.
  gap: number // px
}

const MANGA_KEY = 'manga.readerPrefs'

export const MANGA_READER_DEFAULTS: MangaReaderPrefs = {
  mode: 'single',
  fit: 'height',
  direction: 'rtl',
  coverOffset: true,
  zoom: 1,
  brightness: 1,
  gap: 0
}

export function loadMangaReaderPrefs(): MangaReaderPrefs {
  try {
    return { ...MANGA_READER_DEFAULTS, ...JSON.parse(localStorage.getItem(MANGA_KEY) ?? '{}') }
  } catch {
    return MANGA_READER_DEFAULTS
  }
}

export function saveMangaReaderPrefs(prefs: MangaReaderPrefs): void {
  try {
    localStorage.setItem(MANGA_KEY, JSON.stringify(prefs))
  } catch {
    // A full or disabled localStorage must never stop reading.
  }
}

// ---- book reader ----

export type BookTheme = 'dark' | 'black' | 'sepia' | 'paper'
export type BookFont = 'sans' | 'serif'

export interface BookPrefs {
  fontSize: number // px
  lineHeight: number
  maxWidth: number // px, horizontal mode text measure
  vertical: boolean
  theme: BookTheme
  font: BookFont
  // Dim the whole reading column for night reading. Separate from `theme`:
  // the paper and sepia pages are bright by design, and turning them down is
  // not the same choice as switching to the black one.
  brightness: number // 0.3 – 1
}

export const BOOK_DEFAULTS: BookPrefs = {
  fontSize: 18,
  lineHeight: 1.9,
  maxWidth: 700,
  vertical: false,
  theme: 'dark',
  font: 'sans',
  brightness: 1
}

const BOOK_KEY = 'book.readerPrefs'

export function loadBookReaderPrefs(): BookPrefs {
  try {
    return { ...BOOK_DEFAULTS, ...JSON.parse(localStorage.getItem(BOOK_KEY) ?? '{}') }
  } catch {
    return BOOK_DEFAULTS
  }
}

export function saveBookReaderPrefs(prefs: BookPrefs): void {
  try {
    localStorage.setItem(BOOK_KEY, JSON.stringify(prefs))
  } catch {
    // A full or disabled localStorage must never stop reading.
  }
}
