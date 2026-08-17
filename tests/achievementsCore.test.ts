import { describe, expect, it } from 'vitest'
import {
  buildGoldbergConfig,
  candidateUnlockPaths,
  diffNewUnlocks,
  joinCommunityWithPercentages,
  parseCommunityAchievementsPage,
  parseGoldbergSchema,
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

// ---- Keyless schema sources ------------------------------------------------

describe('parseGoldbergSchema (the crack’s own steam_settings/achievements.json)', () => {
  it('reads the documented array shape', () => {
    const rows = parseGoldbergSchema(
      JSON.stringify([
        {
          name: 'ACH_WIN',
          displayName: 'Winner',
          description: 'Win a round',
          hidden: '0',
          icon: 'achievement_images/win.jpg',
          icongray: 'achievement_images/win_gray.jpg'
        },
        { name: 'ACH_SECRET', displayName: 'Secret', hidden: '1', icon: 'img/s.jpg' }
      ])
    )
    expect(rows).toEqual([
      {
        apiName: 'ACH_WIN',
        name: 'Winner',
        description: 'Win a round',
        hidden: false,
        icon: 'achievement_images/win.jpg',
        iconGray: 'achievement_images/win_gray.jpg',
        globalPct: null
      },
      {
        apiName: 'ACH_SECRET',
        name: 'Secret',
        description: null,
        hidden: true,
        icon: 'img/s.jpg',
        iconGray: null,
        globalPct: null
      }
    ])
  })

  it('takes the English string out of a localized GSE config', () => {
    const rows = parseGoldbergSchema(
      JSON.stringify([
        {
          name: 'A',
          displayName: { english: 'Hello', german: 'Hallo' },
          description: { german: 'Beschreibung', english: 'Description' },
          hidden: 0,
          icon_gray: 'g.jpg'
        }
      ])
    )
    expect(rows[0]).toMatchObject({ name: 'Hello', description: 'Description', iconGray: 'g.jpg' })
  })

  it('falls back to another language when there is no English, and to the api name when there is nothing', () => {
    const rows = parseGoldbergSchema(
      JSON.stringify([{ name: 'A', displayName: { japanese: 'こんにちは' } }, { name: 'B' }])
    )
    expect(rows.map((r) => r.name)).toEqual(['こんにちは', 'B'])
  })

  it('tolerates the object-keyed-by-name variant and drops duplicates', () => {
    const rows = parseGoldbergSchema(
      JSON.stringify({ ACH_A: { displayName: 'A' }, ACH_B: { name: 'ACH_B', displayName: 'B' } })
    )
    expect(rows.map((r) => r.apiName)).toEqual(['ACH_A', 'ACH_B'])
    const dup = parseGoldbergSchema(JSON.stringify([{ name: 'X' }, { name: 'X' }]))
    expect(dup).toHaveLength(1)
  })

  it('never throws on garbage', () => {
    expect(parseGoldbergSchema('')).toEqual([])
    expect(parseGoldbergSchema('{')).toEqual([])
    expect(parseGoldbergSchema('"str"')).toEqual([])
    expect(parseGoldbergSchema('[null, 5, {"name": ""}]')).toEqual([])
  })
})

const COMMUNITY_PAGE = `
<html><body>
<div id="mainContents">
  <div class="achieveRow ">
    <div class="achieveImgHolder"><img src="https://cdn/440/win.jpg"></div>
    <div class="achieveTxtHolder">
      <div class="achievePercent">82.4%</div>
      <div class="achieveTxt"><h3>Winner &amp; Champion</h3><h5>Win a &quot;round&quot;</h5></div>
    </div>
  </div>
  <div class="achieveRow ">
    <div class="achieveImgHolder"><img src="https://cdn/440/tie1.jpg"></div>
    <div class="achieveTxtHolder">
      <div class="achievePercent">10.0%</div>
      <div class="achieveTxt"><h3>Tie One</h3><h5></h5></div>
    </div>
  </div>
  <div class="achieveRow ">
    <div class="achieveImgHolder"><img src="https://cdn/440/tie2.jpg"></div>
    <div class="achieveTxtHolder">
      <div class="achievePercent">10.0%</div>
      <div class="achieveTxt"><h3>Tie Two</h3><h5>Second of a tie</h5></div>
    </div>
  </div>
  <div class="achieveRow ">
    <div class="achieveImgHolder"><img src="https://cdn/440/orphan.jpg"></div>
    <div class="achieveTxtHolder">
      <div class="achievePercent">0.3%</div>
      <div class="achieveTxt"><h3>Orphan</h3><h5>Nobody in the API</h5></div>
    </div>
  </div>
</div>
</body></html>`

describe('parseCommunityAchievementsPage', () => {
  it('reads name, description, icon and percent out of each row, decoding entities', () => {
    const rows = parseCommunityAchievementsPage(COMMUNITY_PAGE)
    expect(rows).toHaveLength(4)
    expect(rows[0]).toEqual({
      name: 'Winner & Champion',
      description: 'Win a "round"',
      iconUrl: 'https://cdn/440/win.jpg',
      percent: 82.4
    })
    expect(rows[1].description).toBeNull()
  })

  it('returns nothing for a page that is not the stats page', () => {
    expect(parseCommunityAchievementsPage('<html><body>Sign in</body></html>')).toEqual([])
    expect(parseCommunityAchievementsPage('')).toEqual([])
  })
})

describe('joinCommunityWithPercentages', () => {
  const page = parseCommunityAchievementsPage(COMMUNITY_PAGE)
  const pct = [
    { name: 'ACH_WIN', percent: 82.4000015 },
    { name: 'ACH_TIE_A', percent: 10.0 },
    { name: 'ACH_TIE_B', percent: 10.0 }
  ]

  it('pairs each row with the api name at the same rounded percentage', () => {
    const { rows } = joinCommunityWithPercentages(page, pct)
    expect(rows.find((r) => r.name === 'Winner & Champion')).toMatchObject({
      apiName: 'ACH_WIN',
      globalPct: 82.4000015,
      icon: 'https://cdn/440/win.jpg',
      iconGray: null,
      hidden: false
    })
  })

  it('reads a blank description as the hidden flag — that is how Steam marks secrets on the public page', () => {
    const { rows } = joinCommunityWithPercentages(page, pct)
    expect(rows.find((r) => r.name === 'Tie One')).toMatchObject({ hidden: true, description: null })
    expect(rows.find((r) => r.name === 'Tie Two')?.hidden).toBe(false)
  })

  it('keeps shared order within a run of ties', () => {
    const { rows } = joinCommunityWithPercentages(page, pct)
    expect(rows.find((r) => r.name === 'Tie One')?.apiName).toBe('ACH_TIE_A')
    expect(rows.find((r) => r.name === 'Tie Two')?.apiName).toBe('ACH_TIE_B')
  })

  it('drops and counts a row with no partner instead of guessing', () => {
    const { rows, unmatched } = joinCommunityWithPercentages(page, pct)
    expect(rows.map((r) => r.name)).not.toContain('Orphan')
    expect(unmatched).toBe(1)
  })

  it('pairs by RANK, so cache drift between the page and the endpoint cannot break it', () => {
    // The AC4 Black Flag case: Steam served the page from a cache and the
    // percentages live, every value off by a tenth, and an exact-percent join
    // paired 12 of 49. Same order, same count → same pairing.
    const drifted = [
      { name: 'ACH_WIN', percent: 82.5 },
      { name: 'ACH_TIE_A', percent: 10.1 },
      { name: 'ACH_TIE_B', percent: 9.9 },
      { name: 'ACH_ORPHAN', percent: 0.4 }
    ]
    const { rows, unmatched } = joinCommunityWithPercentages(page, drifted)
    expect(unmatched).toBe(0)
    expect(rows.map((r) => [r.name, r.apiName])).toEqual([
      ['Winner & Champion', 'ACH_WIN'],
      ['Tie One', 'ACH_TIE_A'],
      ['Tie Two', 'ACH_TIE_B'],
      ['Orphan', 'ACH_ORPHAN']
    ])
    // And the live percentage wins over the page's cached one.
    expect(rows[0].globalPct).toBe(82.5)
  })

  it('aligns by order within a tolerance when the counts differ', () => {
    // The endpoint knows about an achievement the cached page does not yet
    // list (or vice versa): pair everything that lines up, drop the odd one.
    const extra = [
      { name: 'ACH_WIN', percent: 82.4 },
      { name: 'ACH_NEW', percent: 40.0 }, // not on the page
      { name: 'ACH_TIE_A', percent: 10.0 },
      { name: 'ACH_TIE_B', percent: 10.0 },
      { name: 'ACH_ORPHAN', percent: 0.3 }
    ]
    const { rows, unmatched } = joinCommunityWithPercentages(page, extra)
    expect(unmatched).toBe(0)
    expect(rows.map((r) => r.apiName)).toEqual(['ACH_WIN', 'ACH_TIE_A', 'ACH_TIE_B', 'ACH_ORPHAN'])
  })

  it('never uses one api name twice', () => {
    const { rows } = joinCommunityWithPercentages(page, [{ name: 'ONLY', percent: 10 }])
    expect(rows.filter((r) => r.apiName === 'ONLY')).toHaveLength(1)
  })
})
