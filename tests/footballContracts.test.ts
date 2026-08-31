import { readFileSync, readdirSync } from 'fs'
import { fileURLToPath } from 'url'
import { join } from 'path'
import { describe, expect, it } from 'vitest'
import { qk } from '../src/renderer/src/lib/queryKeys'

const read = (path: string) => readFileSync(fileURLToPath(new URL(path, import.meta.url)), 'utf8')

describe('Football system contracts', () => {
  it('uses one query-key prefix for every Football surface', () => {
    const keys = [
      qk.football.overview,
      qk.football.competitions,
      qk.football.competition('world-cup'),
      qk.football.seasons('euros'),
      qk.football.season(1),
      qk.football.teams({ limit: 1 }),
      qk.football.team(1),
      qk.football.people({ limit: 1 }),
      qk.football.person(1),
      qk.football.matches({ limit: 1 }),
      qk.football.match(1),
      qk.football.current('premier-league'),
      qk.football.search('100%'),
      qk.football.media(),
      qk.football.mediaFor('match', 1),
      qk.football.sync,
      qk.football.syncStatus
    ]
    expect(keys.every((key) => key[0] === qk.football.all[0])).toBe(true)
  })

  it('settles tasks, cancels Football and only then closes databases', () => {
    const source = read('../src/main/index.ts')
    const settle = source.indexOf('settleAllTasksOnQuit()')
    const football = source.indexOf('cancelActiveFootballSync()', settle)
    const close = source.indexOf('closeDatabase()', settle)
    expect(settle).toBeGreaterThan(-1)
    expect(football).toBeGreaterThan(settle)
    expect(close).toBeGreaterThan(football)
  })

  it('adds no Football push channel or interval', () => {
    const root = fileURLToPath(new URL('../src/main/football', import.meta.url))
    const source = readdirSync(root).filter((name) => name.endsWith('.ts'))
      .map((name) => readFileSync(join(root, name), 'utf8')).join('\n')
    expect(source).not.toMatch(/webContents\.send|ipcRenderer\.on|setInterval\s*\(/)
  })

  it('keeps the API key in the provider header and out of URLs', () => {
    const source = read('../src/main/football/sync.ts')
    expect(source).toContain("headers: { 'x-apisports-key': key }")
    expect(source).not.toMatch(/API_BASE[^\n]*api[_-]?key/i)
  })
})
