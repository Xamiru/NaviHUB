import { readFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { describe, expect, it } from 'vitest'

const read = (relative: string): string =>
  readFileSync(fileURLToPath(new URL(`../${relative}`, import.meta.url)), 'utf8')

describe('renderer loading boundaries', () => {
  it('keeps the branch-specific roots out of the renderer bootstrap', () => {
    const src = read('src/renderer/src/main.tsx')
    expect(src).toContain("lazy(() => import('./MainAppRoot'))")
    expect(src).toContain("lazy(() => import('./pages/PlayerWidgetPage'))")
    expect(src).toContain("lazy(() => import('./pages/AchPopupPage'))")
    expect(src).not.toMatch(/^import MainAppRoot/m)
    expect(src).not.toMatch(/^import PlayerWidgetPage/m)
    expect(src).not.toMatch(/^import AchPopupPage/m)
  })

  it('keeps secondary routes lazy and Home independent from Stats', () => {
    const app = read('src/renderer/src/App.tsx')
    const home = read('src/renderer/src/pages/HomePage.tsx')
    expect(app).toContain("import HomePage from './pages/HomePage'")
    for (const page of ['SearchPage', 'StatsPage', 'MediaListPage', 'MediaDetailPage']) {
      expect(app, page).toContain(`const ${page} = lazy(() => import('./pages/${page}'))`)
      expect(app, page).not.toMatch(new RegExp(`^import ${page} from`, 'm'))
    }
    expect(home).not.toContain("from './StatsPage'")
    expect(home).toContain("from '../lib/mediaColors'")
  })

  it('does not keep the open-file backstop interval alive in hidden windows', () => {
    const src = read('src/renderer/src/components/OpenFileHandler.tsx')
    expect(src).not.toContain('setInterval(')
    expect(src).toContain("document.visibilityState !== 'visible'")
    expect(src).toContain('collect().finally(schedule)')
  })

  it('keeps music browsing and whole-library playback bounded', () => {
    const page = read('src/renderer/src/pages/MusicLibraryPage.tsx')
    const repo = read('src/main/repos/musicRepo.ts')
    expect(page).not.toContain('api.music.tracks({})')
    expect(page).toContain('api.music.trackPage(')
    expect(page).toContain('api.music.playbackQueue(shuffle)')
    expect(repo).toContain('MAX_PLAYBACK_QUEUE_TRACKS = 2_000')
    expect(repo).toContain("shuffle ? 'RANDOM()' : catalogOrder")
  })

  it('does not poll prep-deck status while the coverage panel is idle', () => {
    const coverage = read('src/renderer/src/components/japanese/CoverageSection.tsx')
    expect(coverage).toContain('queryKey: qk.japanese.prepDeckStatus')
    expect(coverage).toContain('refetchInterval: false')
    expect(coverage).not.toContain('refetchInterval: 1000')
  })
})

describe('main-process loading boundaries', () => {
  it('defers offline learning catalogs until their first IPC call', () => {
    const ipc = read('src/main/ipc.ts')
    const sandbox = read('src/main/sqlSandbox.ts')
    expect(ipc).not.toMatch(/^import \* as programmingRepo/m)
    expect(ipc).not.toMatch(/^import \* as englishWriting/m)
    expect(ipc).toContain("import('./repos/programmingRepo')")
    expect(ipc).toContain("import('./englishWriting')")
    expect(sandbox).not.toMatch(/^import \* as programmingRepo/m)
    expect(sandbox).toContain("await import('./repos/programmingRepo')")
    expect(ipc).not.toMatch(/^import \* as retroAchievements/m)
    expect(ipc).toContain("import('./retroAchievements')")
    const watcher = read('src/main/achievementWatcher.ts')
    expect(watcher).not.toMatch(/^import \* as retroAchievements/m)
    expect(watcher).toContain("await import('./retroAchievements')")
  })

  it('streams large catalog and media downloads instead of buffering response bodies', () => {
    const catalog = read('src/main/gamesCatalog.ts')
    const files = read('src/main/files.ts')
    for (const source of [catalog, files]) {
      expect(source).not.toContain('.arrayBuffer()')
      expect(source).toContain('streamResponseToFile')
    }
    expect(catalog).toContain('createGunzip()')
    expect(catalog).not.toContain('gunzipSync')
  })

  it('caps structured API bodies and dictionary archives before buffering them', () => {
    const http = read('src/main/http.ts')
    const atlas = read('src/main/atlas.ts')
    const jackett = read('src/main/jackett.ts')
    const dictionaries = read('src/main/dict/importer.ts')
    expect(http).toContain('MAX_API_RESPONSE_BYTES = 32 * 1024 * 1024')
    expect(http).toContain('readBoundedBody')
    for (const source of [atlas, jackett]) {
      expect(source).toContain('maxResponseBytes: MAX_API_RESPONSE_BYTES')
    }
    expect(dictionaries).toContain('MAX_DICTIONARY_ARCHIVE_BYTES = 2 * 1024 * 1024 * 1024')
    expect(dictionaries).toContain('MAX_DICTIONARY_ENTRY_BYTES = 256 * 1024 * 1024')
    expect(dictionaries).toContain('streamResponseToFile')
  })
})

describe('reader font packaging', () => {
  it('ships only Chromium woff2 assets for the Japanese serif face', () => {
    const css = read('src/renderer/src/pages/BookReaderFonts.css')
    expect(css.match(/\.woff2/g)).toHaveLength(2)
    expect(css).not.toMatch(/\.woff(?:['")])/)
  })

  it('keeps bundled renderer and schema-build packages out of production dependencies', () => {
    const pkg = JSON.parse(read('package.json')) as {
      dependencies: Record<string, string>
      devDependencies: Record<string, string>
    }
    for (const name of [
      '@fontsource/noto-serif-jp',
      '@dnd-kit/core',
      '@dnd-kit/sortable',
      '@dnd-kit/utilities',
      'drizzle-orm'
    ]) {
      expect(pkg.dependencies, name).not.toHaveProperty(name)
      expect(pkg.devDependencies, name).toHaveProperty(name)
    }
  })
})
