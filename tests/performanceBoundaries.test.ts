import { readdirSync, readFileSync } from 'fs'
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
    const page = ['src/renderer/src/pages/MusicLibraryPage.tsx', 'src/renderer/src/components/music/MusicLibraryTabs.tsx',
      'src/renderer/src/components/music/MusicBrowse.tsx', 'src/renderer/src/components/music/SpotifyImportDialog.tsx']
      .map(read).join('\n')
    const repo = read('src/main/repos/musicRepo.ts')
    expect(page).not.toContain('api.music.tracks({})')
    expect(page).toContain('api.music.trackPage(')
    expect(page).toContain('api.music.playbackQueue(shuffle, ')
    expect(repo).toContain('MAX_PLAYBACK_QUEUE_TRACKS = 2_000')
    expect(repo).toContain("shuffle ? 'RANDOM()' : catalogOrder")
  })

  it('keeps music pages from importing each other (it collapses their lazy routes)', () => {
    const dir = fileURLToPath(new URL('../src/renderer/src/pages', import.meta.url))
    for (const file of readdirSync(dir).filter((name) => /^(Music|NowPlaying)/.test(name))) {
      expect(read(`src/renderer/src/pages/${file}`), file).not.toMatch(/from '\.\/[A-Z]\w*Page'/)
    }
  })

  it('loads the curated franchise catalog on demand outside the franchise pages', () => {
    // Every title's detail page shows its franchise; the catalog is several
    // hundred KB of curated data, so only a dynamic import may pull it in.
    const detail = read('src/renderer/src/pages/MediaDetailPage.tsx')
    expect(detail).not.toMatch(/^import (?!type )[^\n]*'@shared\/franchises'/m)
    expect(detail).toContain("import('@shared/franchises')")
  })

  it('does not poll prep-deck status while the coverage panel is idle', () => {
    const coverage = read('src/renderer/src/components/japanese/CoverageSection.tsx')
    expect(coverage).toContain('queryKey: qk.japanese.prepDeckStatus')
    expect(coverage).toContain('refetchInterval: false')
    expect(coverage).not.toContain('refetchInterval: 1000')
  })
})

describe('main-process loading boundaries', () => {
  it('keeps the quiz pool process free of electron and the main connection', () => {
    for (const file of ['src/main/quizPoolChild.ts', 'src/main/quizPoolsCore.ts', 'src/main/repos/quizRepo.ts']) {
      const src = read(file)
      expect(src, file).not.toMatch(/from 'electron'/)
      expect(src, file).not.toMatch(/db\/connection'/)
    }
    expect(read('src/main/quizPools.ts')).toContain("import childPath from './quizPoolChild?modulePath'")
    expect(read('src/main/index.ts')).toMatch(/stopQuizPools\(\)[\s\S]*closeDatabase\(\)/)
  })

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

  it('loads the History content catalog only through the lazy History service', () => {
    // The committed content grows by a decade per research session; it must
    // never parse at launch or ride into the renderer bundle.
    const staticImport = /^import [^\n]*from ['"][^'"]*(history\/historyService|history\/catalog|history\/historyMap)['"]/m
    for (const file of ['src/main/ipc.ts', 'src/main/repos/searchRepo.ts', 'src/main/index.ts']) {
      expect(read(file), file).not.toMatch(staticImport)
    }
    expect(read('src/main/ipc.ts')).toContain("import('./history/historyService')")
    expect(read('src/main/repos/searchRepo.ts')).toContain("import('../history/historyService')")
    // The map's 4 MB of borders load only when the map or a state page with map links opens, as raw text.
    expect(read('src/main/ipc.ts')).toContain("import('./history/historyMap')")
    expect(read('src/main/history/historyMap.ts')).toContain("import('./data/borders.json?raw')")
    // A state page draws its territory from the same borders, through the same
    // dynamic import: never a static import, and never the JSON directly.
    expect(read('src/main/history/historyService.ts')).not.toMatch(/^import [^\n]*historyMap|borders\.json/m)
    expect(read('src/main/history/historyService.ts')).toContain("import('./historyMap')")
    // Media detail pages ask for backlinks on every visit; a cheap gate decides first.
    expect(read('src/main/ipc.ts')).toContain("import('./history/historyBacklinkGate')")
    expect(read('src/main/history/historyBacklinkGate.ts')).not.toMatch(/history\/(catalog|historyService)/)
    const walk = (dir: string): string[] =>
      readdirSync(fileURLToPath(new URL(`../${dir}`, import.meta.url)), { withFileTypes: true }).flatMap((d) =>
        d.isDirectory() ? walk(`${dir}/${d.name}`) : /\.tsx?$/.test(d.name) ? [`${dir}/${d.name}`] : []
      )
    for (const file of walk('src/renderer/src')) {
      expect(read(file), file).not.toMatch(/history\/(catalog|content)/)
    }
    // The pure halves stay free of electron, the filesystem and the database.
    for (const file of [
      ...walk('src/shared/history').filter((f) => !f.includes('/content/')),
      'src/main/history/historyIndex.ts',
      'src/main/history/historyViews.ts'
    ]) {
      expect(read(file), file).not.toMatch(/from ['"](electron|fs|node:fs|better-sqlite3)['"]|db\/connection/)
    }
  })

  it('streams large catalog and media downloads instead of buffering response bodies', () => {
    // Both games catalogs install through the one streaming installer.
    const installer = read('src/main/catalogRelease.ts')
    const files = read('src/main/files.ts')
    for (const source of [installer, files]) {
      expect(source).not.toContain('.arrayBuffer()')
      expect(source).toContain('streamResponseToFile')
    }
    expect(installer).toContain('createGunzip()')
    for (const catalog of [read('src/main/gamesCatalog.ts'), read('src/main/launchboxCatalog.ts')]) {
      expect(catalog).toContain('installCatalogRelease(')
      expect(catalog).not.toContain('.arrayBuffer()')
      expect(catalog).not.toContain('gunzipSync')
    }
  })

  it('caps structured API bodies and dictionary archives before buffering them', () => {
    const http = read('src/main/http.ts')
    const jackett = read('src/main/jackett.ts')
    const vndb = read('src/main/vndb.ts')
    const dictionaries = read('src/main/dict/importer.ts')
    expect(http).toContain('MAX_API_RESPONSE_BYTES = 32 * 1024 * 1024')
    expect(http).toContain('readBoundedBody')
    for (const source of [vndb, jackett]) {
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
