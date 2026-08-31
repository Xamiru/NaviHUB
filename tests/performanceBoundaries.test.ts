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
})

describe('reader font packaging', () => {
  it('ships only Chromium woff2 assets for the Japanese serif face', () => {
    const css = read('src/renderer/src/pages/BookReaderFonts.css')
    expect(css.match(/\.woff2/g)).toHaveLength(2)
    expect(css).not.toMatch(/\.woff(?:['")])/)
  })
})
