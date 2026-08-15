import { describe, expect, it } from 'vitest'
import {
  buildGoldbergConfig,
  candidateUnlockPaths,
  diffNewUnlocks,
  parseUnlockFile,
  rarityTier
} from '../src/main/achievementsCore'

// The pure half of achievement tracking: emulator save locations, the file
// formats those emulators write, rarity cutoffs, and the wizard's config.
// Every fixture below is a literal string, so none of this needs Windows, a
// real emulator, or a game.

const FULL_ENV = {
  appData: 'C:\\Users\\me\\AppData\\Roaming',
  publicDir: 'C:\\Users\\Public',
  localAppData: 'C:\\Users\\me\\AppData\\Local'
}

describe('candidateUnlockPaths', () => {
  it('covers the common emulators for a full Windows environment', () => {
    const paths = candidateUnlockPaths('1091500', FULL_ENV, 'D:\\Games\\Cyberpunk')
    const emus = new Set(paths.map((c) => c.emu))
    for (const emu of ['Goldberg', 'GSE', 'CODEX', 'RUNE', 'EMPRESS', 'Online-Fix', 'SKIDROW']) {
      expect(emus, `missing ${emu}`).toContain(emu)
    }
  })

  it('substitutes the appid into every candidate that names one', () => {
    const paths = candidateUnlockPaths('12345', FULL_ENV, null)
    const goldberg = paths.find((c) => c.emu === 'Goldberg')
    expect(goldberg?.path).toBe(
      'C:\\Users\\me\\AppData\\Roaming\\Goldberg SteamEmu Saves\\12345\\achievements.json'
    )
    expect(goldberg?.format).toBe('goldberg-json')
    const codex = paths.find((c) => c.emu === 'CODEX')
    expect(codex?.path).toBe('C:\\Users\\Public\\Documents\\Steam\\CODEX\\12345\\achievements.ini')
    expect(codex?.format).toBe('ini')
  })

  it('drops candidates whose root is missing instead of guessing one', () => {
    const noPublic = candidateUnlockPaths('12345', { appData: FULL_ENV.appData }, null)
    expect(noPublic.every((c) => c.path.startsWith(FULL_ENV.appData))).toBe(true)
    expect(noPublic.some((c) => c.emu === 'CODEX')).toBe(true) // the APPDATA variant
    expect(noPublic.some((c) => c.emu === 'RUNE')).toBe(false) // %PUBLIC% only
  })

  it('only offers exe-relative candidates when an exe directory is known', () => {
    const withExe = candidateUnlockPaths('12345', FULL_ENV, 'D:\\Games\\Thing')
    const without = candidateUnlockPaths('12345', FULL_ENV, null)
    expect(withExe.some((c) => c.path.startsWith('D:\\Games\\Thing'))).toBe(true)
    expect(without.some((c) => c.path.startsWith('D:\\Games\\Thing'))).toBe(false)
  })

  it('marks the one candidate that needs a directory scan, and keeps it last', () => {
    const paths = candidateUnlockPaths('12345', FULL_ENV, 'D:\\Games\\Thing')
    const globbed = paths.filter((c) => c.glob)
    expect(globbed).toHaveLength(1)
    expect(globbed[0].emu).toBe('ALI213')
    expect(globbed[0].path).toContain('*')
    expect(paths[paths.length - 1].glob).toBe(true)
  })

  it('returns nothing for a blank appid and never duplicates a path', () => {
    expect(candidateUnlockPaths('', FULL_ENV, null)).toEqual([])
    const paths = candidateUnlockPaths('12345', FULL_ENV, 'D:\\G')
    expect(new Set(paths.map((c) => c.path)).size).toBe(paths.length)
  })

  it('builds POSIX paths under a POSIX root, so tests can use temp dirs', () => {
    const paths = candidateUnlockPaths('99', { appData: '/tmp/roaming' }, null)
    expect(paths[0].path).toBe('/tmp/roaming/Goldberg SteamEmu Saves/99/achievements.json')
  })
})

describe('parseUnlockFile: Goldberg/GSE JSON', () => {
  it('reads the earned flag and converts epoch seconds to ms', () => {
    const out = parseUnlockFile(
      'goldberg-json',
      JSON.stringify({
        ACH_WIN: { earned: true, earned_time: 1690000000 },
        ACH_LOSE: { earned: false, earned_time: 0 }
      })
    )
    expect(out).toEqual([{ apiName: 'ACH_WIN', unlockedAtMs: 1690000000000 }])
  })

  it('reports a missing or zero timestamp as null rather than 1970', () => {
    const out = parseUnlockFile(
      'goldberg-json',
      JSON.stringify({ A: { earned: true, earned_time: 0 }, B: { earned: true } })
    )
    expect(out).toEqual([
      { apiName: 'A', unlockedAtMs: null },
      { apiName: 'B', unlockedAtMs: null }
    ])
  })

  it('passes through a fork that already writes milliseconds', () => {
    const out = parseUnlockFile('goldberg-json', JSON.stringify({ A: { earned: true, earned_time: 1690000000000 } }))
    expect(out[0].unlockedAtMs).toBe(1690000000000)
  })

  it('rejects an implausible timestamp instead of passing a year-55534 date down', () => {
    // SQLite's datetime(?, 'unixepoch') is NULL past year 9999 and unlocked_at
    // is NOT NULL, so letting one of these through would abort the whole insert
    // transaction and discard every good unlock in the same batch. Reporting no
    // time makes the caller fall back to the file's mtime.
    for (const t of [1690000000000000, 1690000000000000000, 9.9e18]) {
      const out = parseUnlockFile('goldberg-json', JSON.stringify({ A: { earned: true, earned_time: t } }))
      expect(out, `earned_time ${t}`).toEqual([{ apiName: 'A', unlockedAtMs: null }])
    }
  })

  it('rejects the same out-of-range value from an INI', () => {
    const out = parseUnlockFile('ini', '[ACH_A]\nAchieved=1\nUnlockTime=1690000000000000000')
    expect(out).toEqual([{ apiName: 'ACH_A', unlockedAtMs: null }])
  })

  it('accepts the array shape some forks write', () => {
    const out = parseUnlockFile(
      'goldberg-json',
      JSON.stringify([
        { name: 'ACH_A', earned: true, earned_time: 1600000000 },
        { name: 'ACH_B', earned: false }
      ])
    )
    expect(out).toEqual([{ apiName: 'ACH_A', unlockedAtMs: 1600000000000 }])
  })
})

describe('parseUnlockFile: the CODEX/RUNE/Online-Fix INI family', () => {
  it('reads a section-per-achievement file', () => {
    const out = parseUnlockFile(
      'ini',
      ['[ACH_ONE]', 'Achieved=1', 'UnlockTime=1690000000', '', '[ACH_TWO]', 'Achieved=0'].join('\n')
    )
    expect(out).toEqual([{ apiName: 'ACH_ONE', unlockedAtMs: 1690000000000 }])
  })

  it('tolerates the HaveAchieved spelling and CRLF line endings', () => {
    const out = parseUnlockFile(
      'ini',
      '[ACH_X]\r\nHaveAchieved=1\r\nHaveAchievedTime=1600000000\r\n'
    )
    expect(out).toEqual([{ apiName: 'ACH_X', unlockedAtMs: 1600000000000 }])
  })

  it('reads the flat container shape, timestamp packed into the value', () => {
    const out = parseUnlockFile(
      'ini',
      ['[Achievements]', 'ACH_A=1', 'ACH_B=1,1690000000', 'ACH_C=0'].join('\n')
    )
    expect(out).toEqual([
      { apiName: 'ACH_A', unlockedAtMs: null },
      { apiName: 'ACH_B', unlockedAtMs: 1690000000000 }
    ])
  })

  it('ignores comments and blank lines', () => {
    const out = parseUnlockFile(
      'ini',
      ['; written by the emulator', '# comment', '', '[ACH_A]', 'Achieved=1'].join('\n')
    )
    expect(out).toEqual([{ apiName: 'ACH_A', unlockedAtMs: null }])
  })

  it('keeps the last entry when a file lists one achievement twice', () => {
    const out = parseUnlockFile(
      'ini',
      ['[ACH_A]', 'Achieved=1', 'UnlockTime=1600000000', '[ACH_A]', 'Achieved=1', 'UnlockTime=1700000000'].join('\n')
    )
    expect(out).toEqual([{ apiName: 'ACH_A', unlockedAtMs: 1700000000000 }])
  })
})

describe('parseUnlockFile: damaged input', () => {
  // The watcher reads these files WHILE the game writes them, so a torn read is
  // routine and must look like "nothing new", never like a crash.
  it('returns nothing for truncated JSON', () => {
    expect(parseUnlockFile('goldberg-json', '{"ACH_A": {"earned": tr')).toEqual([])
  })

  it('returns nothing for an empty file, either format', () => {
    expect(parseUnlockFile('goldberg-json', '')).toEqual([])
    expect(parseUnlockFile('ini', '')).toEqual([])
  })

  it('returns nothing for JSON that is not an achievement map', () => {
    expect(parseUnlockFile('goldberg-json', '"hello"')).toEqual([])
    expect(parseUnlockFile('goldberg-json', 'null')).toEqual([])
  })

  it('skips junk lines in an INI without dropping the valid sections', () => {
    const out = parseUnlockFile('ini', ['garbage line', '[ACH_A]', 'Achieved=1', '[unclosed'].join('\n'))
    expect(out).toEqual([{ apiName: 'ACH_A', unlockedAtMs: null }])
  })
})

describe('diffNewUnlocks', () => {
  it('keeps only names the caller has not recorded yet', () => {
    const parsed = [
      { apiName: 'A', unlockedAtMs: 1 },
      { apiName: 'B', unlockedAtMs: 2 }
    ]
    expect(diffNewUnlocks(new Set(['A']), parsed)).toEqual([{ apiName: 'B', unlockedAtMs: 2 }])
    expect(diffNewUnlocks(new Set(['A', 'B']), parsed)).toEqual([])
  })
})

describe('rarityTier', () => {
  it('maps the global percentage onto the four tiers', () => {
    expect(rarityTier(80)).toBe('common')
    expect(rarityTier(25.1)).toBe('common')
    expect(rarityTier(25)).toBe('uncommon')
    expect(rarityTier(10.1)).toBe('uncommon')
    expect(rarityTier(10)).toBe('rare')
    expect(rarityTier(3.1)).toBe('rare')
    expect(rarityTier(3)).toBe('ultra-rare')
    expect(rarityTier(0.1)).toBe('ultra-rare')
  })

  it('has no tier when the percentage was never fetched', () => {
    expect(rarityTier(null)).toBeNull()
    expect(rarityTier(undefined)).toBeNull()
    expect(rarityTier(Number.NaN)).toBeNull()
  })
})

describe('buildGoldbergConfig', () => {
  const rows = [
    {
      apiName: 'ACH_A',
      name: 'First Blood',
      description: 'Win a fight',
      hidden: false,
      iconFile: 'a.jpg',
      iconGrayFile: 'a_gray.jpg'
    },
    {
      apiName: 'ACH_B',
      name: 'Secret',
      description: null,
      hidden: true,
      iconFile: null,
      iconGrayFile: null
    }
  ]

  it('writes the shape Goldberg reads back', () => {
    const { achievementsJson, steamAppidTxt } = buildGoldbergConfig('1091500', rows)
    expect(steamAppidTxt).toBe('1091500\n')
    const parsed = JSON.parse(achievementsJson)
    expect(parsed).toEqual([
      {
        name: 'ACH_A',
        displayName: 'First Blood',
        description: 'Win a fight',
        hidden: '0',
        icon: 'achievement_images/a.jpg',
        icongray: 'achievement_images/a_gray.jpg'
      },
      {
        name: 'ACH_B',
        displayName: 'Secret',
        description: '',
        hidden: '1',
        icon: '',
        icongray: ''
      }
    ])
  })

  it('round-trips: the generated config parses as its own unlock file format', () => {
    // Not what Goldberg does with it, but it proves the JSON is well-formed
    // rather than merely string-concatenated.
    const { achievementsJson } = buildGoldbergConfig('1', rows)
    expect(() => JSON.parse(achievementsJson)).not.toThrow()
    expect(achievementsJson.endsWith('\n')).toBe(true)
  })
})
