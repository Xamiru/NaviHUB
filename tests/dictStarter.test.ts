import { beforeEach, describe, expect, it, vi } from 'vitest'

vi.mock('../src/main/logBus', () => ({ logWarn: vi.fn(), logInfo: vi.fn(), logError: vi.fn() }))

import {
  getStarterInstallStatus,
  resetStarterInstallStatus,
  runStarterInstall
} from '../src/main/dict/starterInstall'
import {
  missingStarterPacks,
  starterPackInstalled,
  type StarterPackFacts
} from '../src/shared/japanese/starterPacks'

const NOTHING: StarterPackFacts = { dicts: [], krad: false, grammar: false, sentences: false }

describe('starter pack predicates', () => {
  it('recognises each pack the way Settings does', () => {
    const facts: StarterPackFacts = {
      dicts: [
        { title: 'JMdict (English)', freqCount: 0 },
        { title: 'JMnedict', freqCount: 0 },
        { title: 'BCCWJ', freqCount: 1200 }
      ],
      krad: true,
      grammar: false,
      sentences: false
    }
    expect(starterPackInstalled('jmdict', facts)).toBe(true)
    // Any dictionary with frequency ranks counts, not only the JPDB preset.
    expect(starterPackInstalled('freq', facts)).toBe(true)
    expect(starterPackInstalled('kanjidic', facts)).toBe(false)
    expect(missingStarterPacks(facts)).toEqual(['kanjidic', 'grammar', 'sentences'])
  })

  it('does not mistake the JMnedict names pack for JMdict', () => {
    expect(starterPackInstalled('jmdict', { ...NOTHING, dicts: [{ title: 'JMnedict', freqCount: 0 }] })).toBe(false)
  })
})

describe('runStarterInstall', () => {
  beforeEach(() => resetStarterInstallStatus())

  it('installs only the missing packs, in order', async () => {
    const installed: string[] = []
    const result = await runStarterInstall({
      facts: () => ({ ...NOTHING, krad: true, dicts: [{ title: 'JMdict', freqCount: 0 }] }),
      install: async (key) => {
        installed.push(key)
      }
    })
    expect(installed).toEqual(['freq', 'kanjidic', 'grammar', 'sentences'])
    expect(result).toMatchObject({ running: false, current: null, error: null, remaining: [] })
    expect(result.done).toEqual(installed)
  })

  it('stops at the first failure and keeps what already landed', async () => {
    const installed: string[] = []
    const result = await runStarterInstall({
      facts: () => NOTHING,
      install: async (key) => {
        if (key === 'kanjidic') throw new Error('Download failed (HTTP 503)')
        installed.push(key)
      }
    })
    expect(installed).toEqual(['jmdict', 'freq'])
    expect(result.done).toEqual(['jmdict', 'freq'])
    expect(result.remaining).toEqual(['kanjidic', 'krad', 'grammar', 'sentences'])
    expect(result.error).toBe('KANJIDIC (English): Download failed (HTTP 503)')
  })

  it('reports the pack in progress and refuses a second concurrent run', async () => {
    let release: () => void = () => {}
    const gate = new Promise<void>((resolve) => (release = resolve))
    const install = vi.fn(async () => gate)
    const first = runStarterInstall({ facts: () => ({ ...NOTHING, krad: true, grammar: true, sentences: true, dicts: [{ title: 'JMdict', freqCount: 9 }] }), install })
    await Promise.resolve()
    expect(getStarterInstallStatus()).toMatchObject({ running: true, current: 'kanjidic' })

    const second = await runStarterInstall({ facts: () => NOTHING, install })
    expect(second.running).toBe(true)
    expect(install).toHaveBeenCalledTimes(1)

    release()
    expect((await first).done).toEqual(['kanjidic'])
  })
})
