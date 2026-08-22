import { describe, it, expect, beforeEach } from 'vitest'
import {
  loadListSort,
  saveListSort,
  DEFAULT_LIST_SORT
} from '../src/renderer/src/lib/listSortPrefs'
import type { MediaSort } from '../src/shared/types'

// The module talks to localStorage directly (renderer prefs idiom), so the
// tests give it a minimal in-memory one and can also hand it a hostile store.
function installStorage(initial: Record<string, string> = {}): Map<string, string> {
  const map = new Map(Object.entries(initial))
  ;(globalThis as { localStorage?: unknown }).localStorage = {
    getItem: (k: string) => map.get(k) ?? null,
    setItem: (k: string, v: string) => void map.set(k, v),
    removeItem: (k: string) => void map.delete(k),
    clear: () => map.clear()
  }
  return map
}

const KEY = 'library.listSort'
const ALLOWED: MediaSort[] = ['updated', 'title', 'score', 'random']

describe('listSortPrefs', () => {
  beforeEach(() => installStorage())

  it('falls back to Last updated / desc with nothing stored', () => {
    expect(loadListSort('anime')).toEqual(DEFAULT_LIST_SORT)
    expect(DEFAULT_LIST_SORT).toEqual({ sort: 'updated', dir: 'desc' })
  })

  it('round-trips a sort and a direction', () => {
    saveListSort('anime', { sort: 'title' })
    saveListSort('anime', { dir: 'asc' })
    expect(loadListSort('anime')).toEqual({ sort: 'title', dir: 'asc' })
  })

  it('keeps each media type independent', () => {
    saveListSort('anime', { sort: 'title', dir: 'asc' })
    saveListSort('movie', { sort: 'release' })
    expect(loadListSort('anime')).toEqual({ sort: 'title', dir: 'asc' })
    expect(loadListSort('movie')).toEqual({ sort: 'release', dir: 'desc' })
    expect(loadListSort('game')).toEqual(DEFAULT_LIST_SORT)
  })

  it('ignores a stored sort the page does not offer', () => {
    saveListSort('anime', { sort: 'timesConsumed', dir: 'asc' })
    // Direction still survives — only the unknown key falls back.
    expect(loadListSort('anime', ALLOWED)).toEqual({ sort: 'updated', dir: 'asc' })
    expect(loadListSort('anime')).toEqual({ sort: 'timesConsumed', dir: 'asc' })
  })

  it('survives a corrupt or hand-edited blob', () => {
    installStorage({ [KEY]: 'not json' })
    expect(loadListSort('anime')).toEqual(DEFAULT_LIST_SORT)
    installStorage({ [KEY]: '"a string"' })
    expect(loadListSort('anime')).toEqual(DEFAULT_LIST_SORT)
    installStorage({ [KEY]: JSON.stringify({ anime: { sort: 42, dir: 'sideways' } }) })
    expect(loadListSort('anime')).toEqual(DEFAULT_LIST_SORT)
  })

  it('never throws when localStorage refuses to write', () => {
    ;(globalThis as { localStorage?: unknown }).localStorage = {
      getItem: () => null,
      setItem: () => {
        throw new Error('QuotaExceededError')
      }
    }
    expect(() => saveListSort('anime', { sort: 'title' })).not.toThrow()
  })

  it('writes one blob keyed by media type', () => {
    const map = installStorage()
    saveListSort('anime', { sort: 'title' })
    saveListSort('movie', { sort: 'score' })
    expect([...map.keys()]).toEqual([KEY])
    expect(JSON.parse(map.get(KEY) as string)).toEqual({
      anime: { sort: 'title', dir: 'desc' },
      movie: { sort: 'score', dir: 'desc' }
    })
  })
})
