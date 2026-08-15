import { beforeEach, describe, expect, it, vi } from 'vitest'
import type Database from 'better-sqlite3'
import { createTestDb } from './helpers'

// The Steam and RetroAchievements providers offline: schema mapping, rarity
// merge, the missing-key error, the retroactive emulator sweep, and RA's
// one-call set+history sync. The steamImport.test.ts recipe — URL-routed http
// fixtures, mocked files, a real in-memory DB.

let db: Database.Database
vi.mock('../src/main/db/connection', () => ({ getSqlite: () => db }))

let settings: Record<string, string> = {}
vi.mock('../src/main/repos/settingsRepo', () => ({
  get: (key: string) => settings[key] ?? null,
  set: (key: string, value: string) => {
    settings[key] = value
  },
  all: () => settings
}))

vi.mock('../src/main/files', () => ({
  // Every icon "downloads" to a path derived from its URL, so assertions can
  // tell the unlocked art from the locked art.
  downloadImages: async (urls: (string | null | undefined)[]) => {
    const map = new Map<string, string | null>()
    for (const u of urls) if (u) map.set(u, `media/dl-${u.split('/').pop()}`)
    return map
  },
  downloadImage: async () => null,
  // Local icons (a crack's steam_settings/achievement_images) "copy in" to a
  // path derived from the source, so a test can tell which file was used.
  importImageFile: (abs: string) => (abs.endsWith('.missing') ? null : `media/lc-${abs.split(/[\\/]/).pop()}`),
  absoluteMediaPath: (p: string) => `/userData/${p}`
}))

vi.mock('electron', () => ({ dialog: { showOpenDialog: async () => ({ canceled: true, filePaths: [] }) } }))

let schemaPayload: unknown
let percentPayload: unknown
let storeSearchPayload: unknown
let raGamePayload: unknown
let raGameList: unknown = []
let schemaStatus = 200
let communityHtml = ''
let communityStatus = 200
const fetched: string[] = []
vi.mock('../src/main/http', () => ({
  sleep: async () => {},
  fetchWithRetry: async (url: string) => {
    fetched.push(url)
    const isCommunity = url.includes('steamcommunity.com/stats/')
    const status = isCommunity ? communityStatus : schemaStatus
    return {
      ok: status === 200,
      status,
      text: async () => (isCommunity ? communityHtml : ''),
      json: async () => {
        if (url.includes('GetSchemaForGame')) return schemaPayload
        if (url.includes('GetGlobalAchievementPercentages')) return percentPayload
        if (url.includes('/storesearch/')) return storeSearchPayload
        if (url.includes('API_GetGameInfoAndUserProgress')) return raGamePayload
        if (url.includes('API_GetGameList')) return raGameList
        throw new Error(`Unrouted URL in test: ${url}`)
      }
    }
  }
}))

const achievements = await import('../src/main/achievements')
const retro = await import('../src/main/retroAchievements')
const repo = await import('../src/main/repos/achievementRepo')

function addGame(source: string | null = 'steam', externalId: string | null = '440'): number {
  const r = db
    .prepare(
      `INSERT INTO media_item (media_type, title, exe_path, external_source, external_id)
       VALUES ('game', 'Team Fortress 2', 'C:\\Games\\tf2\\tf.exe', ?, ?)`
    )
    .run(source, externalId)
  return Number(r.lastInsertRowid)
}

function schemaFixture(list: unknown[]): unknown {
  return { game: { gameName: 'TF2', availableGameStats: { achievements: list } } }
}

// [name, description, icon, percent] rows in the community stats page's shape.
function communityPage(rows: [string, string, string, string][]): string {
  return rows
    .map(
      ([name, desc, icon, pct]) => `<div class="achieveRow ">
  <div class="achieveImgHolder"><img src="${icon}"></div>
  <div class="achieveTxtHolder"><div class="achievePercent">${pct}%</div>
  <div class="achieveTxt"><h3>${name}</h3><h5>${desc}</h5></div></div></div>`
    )
    .join('\n')
}

// A crack's steam_settings folder, as the injected file IO sees it.
const EXE_DIR = 'C:\\Games\\tf2'
function localSchemaIO(schema: unknown, at = `${EXE_DIR}\\steam_settings\\achievements.json`) {
  const files: Record<string, string> = { [at]: JSON.stringify(schema) }
  return {
    exists: (p: string) => p in files,
    readFile: (p: string) => files[p] ?? '',
    mtimeMs: () => null,
    listDirs: () => []
  }
}

beforeEach(() => {
  db = createTestDb()
  settings = { 'steam.web_api_key': 'KEY', 'ra.username': 'me', 'ra.api_key': 'RAKEY' }
  schemaStatus = 200
  communityStatus = 200
  communityHtml = ''
  fetched.length = 0
  schemaPayload = schemaFixture([
    {
      name: 'ACH_WIN',
      displayName: 'Winner',
      description: 'Win a round',
      hidden: 0,
      icon: 'https://cdn/win.jpg',
      icongray: 'https://cdn/win_gray.jpg'
    },
    { name: 'ACH_SECRET', displayName: 'Secret', hidden: 1 }
  ])
  percentPayload = {
    achievementpercentages: { achievements: [{ name: 'ACH_WIN', percent: 42.5 }] }
  }
  storeSearchPayload = { items: [{ type: 'app', id: 440, name: 'Team Fortress 2', tiny_image: 'https://t/img.jpg' }] }
  raGamePayload = {
    NumDistinctPlayersCasual: 1000,
    Achievements: {
      '9': {
        ID: 9,
        Title: 'First Star',
        Description: 'Collect a star',
        Points: 10,
        BadgeName: '12345',
        DisplayOrder: 0,
        NumAwarded: 250,
        DateEarned: '2026-08-01 12:00:00'
      },
      '10': {
        ID: 10,
        Title: 'All Stars',
        Points: 50,
        BadgeName: '12346',
        DisplayOrder: 1,
        NumAwarded: 10
      }
    }
  }
})

describe('Steam schema fetch', () => {
  it('stores the set with descriptions, hidden flags and both icons', async () => {
    const id = addGame()
    const res = await achievements.fetchSteamSchema(id, '440')

    expect(res.total).toBe(2)
    const rows = repo.listForMedia(id)
    expect(rows.map((r) => r.apiName)).toEqual(['ACH_WIN', 'ACH_SECRET'])
    expect(rows[0]).toMatchObject({
      name: 'Winner',
      description: 'Win a round',
      hidden: false,
      iconPath: 'media/dl-win.jpg',
      iconGrayPath: 'media/dl-win_gray.jpg'
    })
    expect(rows[1]).toMatchObject({ name: 'Secret', hidden: true, description: null })
  })

  it('merges the keyless rarity endpoint into the set', async () => {
    const id = addGame()
    await achievements.fetchSteamSchema(id, '440')
    const [win, secret] = repo.listForMedia(id)
    expect(win.globalPct).toBe(42.5)
    expect(win.rarity).toBe('common')
    expect(secret.globalPct).toBeNull()
    expect(secret.rarity).toBeNull()
  })

  it('awards no points — Steam has none and none is invented', async () => {
    const id = addGame()
    await achievements.fetchSteamSchema(id, '440')
    expect(repo.listForMedia(id).every((r) => r.points === null)).toBe(true)
    expect(repo.summaryFor(id).points).toBeNull()
  })

  it('falls back to the api name when Steam ships a blank display name', async () => {
    schemaPayload = schemaFixture([{ name: 'ACH_RAW', displayName: '  ' }])
    const id = addGame()
    await achievements.fetchSteamSchema(id, '440')
    expect(repo.listForMedia(id)[0].name).toBe('ACH_RAW')
  })

  it('never asks the Web API when there is no key', async () => {
    settings = {}
    communityHtml = communityPage([['Winner', 'Win a round', 'https://cdn/win.jpg', '42.5']])
    await achievements.fetchSteamSchema(addGame(), '440')
    expect(fetched.some((u) => u.includes('GetSchemaForGame'))).toBe(false)
  })

  it('rejects an app id that is not a number', async () => {
    await expect(achievements.fetchSteamSchema(addGame(), 'not-an-id')).rejects.toThrow(
      /Not a Steam app id/
    )
  })

  it('says the app id may be wrong rather than writing an empty set', async () => {
    schemaPayload = schemaFixture([])
    communityStatus = 404
    const id = addGame()
    await expect(achievements.fetchSteamSchema(id, '440')).rejects.toThrow(/wrong app id/i)
    expect(repo.listForMedia(id)).toEqual([])
  })

  it('remembers the chosen app id even when the fetch fails, so a retry is one click', async () => {
    schemaPayload = schemaFixture([])
    communityStatus = 404
    const id = addGame(null, null)
    await expect(achievements.fetchSteamSchema(id, '999')).rejects.toThrow()
    expect(repo.getTracking(id)).toMatchObject({ provider: 'steam', providerGameId: '999' })
  })

  it('keeps the set when the rarity endpoint is unavailable', async () => {
    const id = addGame()
    // Percentages are decoration; losing them must not sink the fetch.
    percentPayload = null
    await achievements.fetchSteamSchema(id, '440')
    expect(repo.listForMedia(id)).toHaveLength(2)
    expect(repo.listForMedia(id)[0].globalPct).toBeNull()
  })
})

describe('Steam app id resolution', () => {
  it('offers the stored app id as an exact match for a Steam-imported row', async () => {
    const candidates = await achievements.resolveSteamCandidates(addGame())
    expect(candidates[0]).toMatchObject({ appid: '440', exact: true })
    // And does not list the same app twice via search.
    expect(candidates.filter((c) => c.appid === '440')).toHaveLength(1)
  })

  it('falls back to storefront search for a title imported from elsewhere', async () => {
    const candidates = await achievements.resolveSteamCandidates(addGame('rawg', '123'))
    expect(candidates.every((c) => !c.exact)).toBe(true)
    expect(candidates[0]).toMatchObject({ appid: '440', name: 'Team Fortress 2' })
  })

  it('refuses a media id that does not exist', async () => {
    await expect(achievements.resolveSteamCandidates(999)).rejects.toThrow(/not found/i)
  })
})

describe('retroactive emulator sweep', () => {
  const emuEnv = { appData: '/roaming', publicDir: '/public', localAppData: '/local' }
  const goldberg = '/roaming/Goldberg SteamEmu Saves/440/achievements.json'

  const io = (files: Record<string, string>, mtime = 1_600_000_000_000) => ({
    exists: (p: string) => p in files,
    readFile: (p: string) => files[p] ?? '',
    mtimeMs: (p: string) => (p in files ? mtime : null),
    listDirs: () => []
  })

  it('imports what the emulator already recorded', async () => {
    const id = addGame()
    await achievements.fetchSteamSchema(id, '440')
    const res = achievements.importEmuUnlocks(id, {
      io: io({ [goldberg]: JSON.stringify({ ACH_WIN: { earned: true, earned_time: 1500000000 } }) }),
      env: emuEnv
    })
    expect(res).toMatchObject({ found: 1, imported: 1, emus: ['Goldberg'] })
    expect(repo.summaryFor(id).unlocked).toBe(1)
  })

  it('runs automatically as part of setup, so a tracked game does not start at zero', async () => {
    const id = addGame()
    // No injected IO here — the real filesystem has nothing, which is the
    // honest default on this machine.
    const res = await achievements.fetchSteamSchema(id, '440')
    expect(res.filesFound).toBe(0)
    expect(res.importedFromFiles).toBe(0)
  })

  it('dates an unlock by the file that recorded it when the emulator wrote no time', async () => {
    const id = addGame()
    await achievements.fetchSteamSchema(id, '440')
    achievements.importEmuUnlocks(id, {
      io: io({ [goldberg]: JSON.stringify({ ACH_WIN: { earned: true } }) }, 1_600_000_000_000),
      env: emuEnv
    })
    const stored = db.prepare('SELECT unlocked_at FROM achievement_unlock').get() as {
      unlocked_at: string
    }
    expect(stored.unlocked_at).toBe('2020-09-13 12:26:40')
  })

  it('reports found: 0 for an untracked game rather than guessing an app id', () => {
    expect(achievements.importEmuUnlocks(addGame())).toEqual({ found: 0, imported: 0, emus: [] })
  })

  it('imports each achievement once, however often it is swept', async () => {
    const id = addGame()
    await achievements.fetchSteamSchema(id, '440')
    const files = { [goldberg]: JSON.stringify({ ACH_WIN: { earned: true, earned_time: 1500000000 } }) }
    achievements.importEmuUnlocks(id, { io: io(files), env: emuEnv })
    const second = achievements.importEmuUnlocks(id, { io: io(files), env: emuEnv })
    expect(second.imported).toBe(0)
    expect(repo.summaryFor(id).unlocked).toBe(1)
  })
})

describe('RetroAchievements', () => {
  it('syncs the set and the unlock history in one call', async () => {
    const id = addGame(null, null)
    const res = await retro.fetchRaGame(id, '4321')

    expect(res.total).toBe(2)
    expect(res.unlocked).toBe(1)
    const rows = repo.listForMedia(id)
    expect(rows.map((r) => r.name)).toEqual(['First Star', 'All Stars'])
    expect(rows[0].unlockedAt).toBeTruthy()
    expect(rows[1].unlockedAt).toBeNull()
  })

  it('keeps RA points, which RA actually awards', async () => {
    const id = addGame(null, null)
    await retro.fetchRaGame(id, '4321')
    expect(repo.summaryFor(id)).toMatchObject({ points: 10 })
  })

  it('derives rarity from awarded-over-players', async () => {
    const id = addGame(null, null)
    await retro.fetchRaGame(id, '4321')
    const rows = repo.listForMedia(id)
    // 250 of 1000 players earned it; 10 of 1000 earned the other.
    expect(rows.find((r) => r.name === 'First Star')?.globalPct).toBe(25)
    expect(rows.find((r) => r.name === 'First Star')?.rarity).toBe('uncommon')
    expect(rows.find((r) => r.name === 'All Stars')?.globalPct).toBe(1)
    expect(rows.find((r) => r.name === 'All Stars')?.rarity).toBe('ultra-rare')
  })

  it('downloads both the earned and the locked badge', async () => {
    const id = addGame(null, null)
    await retro.fetchRaGame(id, '4321')
    expect(repo.listForMedia(id)[0]).toMatchObject({
      iconPath: 'media/dl-12345.png',
      iconGrayPath: 'media/dl-12345_lock.png'
    })
  })

  // RA sends an EMPTY STRING for the hardcore field on a softcore-only unlock.
  // `??` keeps it and erases the valid DateEarned beside it, and since the
  // unlockedAtMs filter is the only earned test in this path the achievement
  // then renders locked for ever — a re-run never repairs it.
  it('falls through an empty DateEarnedHardcore to DateEarned', async () => {
    const payload = raGamePayload as { Achievements: Record<string, Record<string, unknown>> }
    payload.Achievements['9'].DateEarnedHardcore = ''

    const id = addGame(null, null)
    const res = await retro.fetchRaGame(id, '4321')

    expect(res.unlocked).toBe(1)
    expect(repo.listForMedia(id).find((r) => r.name === 'First Star')?.unlockedAt).toBeTruthy()
  })

  it('prefers a real DateEarnedHardcore over DateEarned', async () => {
    const payload = raGamePayload as { Achievements: Record<string, Record<string, unknown>> }
    payload.Achievements['9'].DateEarnedHardcore = '2026-08-02 12:00:00'

    const id = addGame(null, null)
    await retro.fetchRaGame(id, '4321')

    const row = repo.listForMedia(id).find((r) => r.name === 'First Star')!
    expect(row.unlockedAt).toContain('2026-08-02')
  })

  it('reads RA timestamps as UTC, not as local time', () => {
    expect(retro.parseRaDate('2026-08-01 12:00:00')).toBe(Date.UTC(2026, 7, 1, 12, 0, 0))
    expect(retro.parseRaDate(null)).toBeNull()
    expect(retro.parseRaDate('nonsense')).toBeNull()
  })

  it('explains what is missing when the account is not set up', async () => {
    settings = {}
    await expect(retro.fetchRaGame(addGame(null, null), '4321')).rejects.toThrow(
      /username and Web API key/i
    )
    expect(retro.hasRaCredentials()).toBe(false)
  })

  it('rejects a game id that is not a number', async () => {
    await expect(retro.fetchRaGame(addGame(null, null), 'abc')).rejects.toThrow(/game id/i)
  })

  it('reports zero earned points, which is different from a set that has none', async () => {
    // RA sets always award points, so "0" must not collapse into the "this
    // provider is pointless" null that Steam gets.
    raGamePayload = {
      NumDistinctPlayersCasual: 100,
      Achievements: { '9': { ID: 9, Title: 'Unearned', Points: 10, BadgeName: '1', NumAwarded: 5 } }
    }
    const id = addGame(null, null)
    await retro.fetchRaGame(id, '4321')
    expect(repo.summaryFor(id)).toEqual({ unlocked: 0, total: 1, points: 0 })
  })
})

describe('RetroAchievements search', () => {
  // RA has no free-text endpoint: the console's list is pulled and filtered here.
  const list = [
    { ID: 1, Title: 'Super Mario Kart', ConsoleName: 'SNES', ImageIcon: '/i/1.png' },
    { ID: 2, Title: 'Donkey Kong Country', ConsoleName: 'SNES', ImageIcon: null },
    { ID: 3, Title: '3', ConsoleName: 'SNES', ImageIcon: null }
  ]

  // The list endpoint is what searchGames reads; set it for one call.
  async function withRaList<T>(rows: unknown[], fn: () => Promise<T>): Promise<T> {
    raGameList = rows
    return fn()
  }

  it('matches on a normalized substring in either direction', async () => {
    const results = await withRaList(list, () => retro.searchGames('mario kart', '3'))
    expect(results.map((r) => r.title)).toEqual(['Super Mario Kart'])
  })

  it('finds a title whose RA name is shorter than the query', async () => {
    const results = await withRaList(list, () =>
      retro.searchGames('Donkey Kong Country (USA) [!]', '3')
    )
    expect(results.map((r) => r.title)).toEqual(['Donkey Kong Country'])
  })

  it('does not let a one-character title match every query containing it', async () => {
    const results = await withRaList(list, () => retro.searchGames('Super Mario Kart 3', '3'))
    expect(results.map((r) => r.title)).not.toContain('3')
  })

  it('needs a console and a query before it asks RA anything', async () => {
    expect(await retro.searchGames('mario', '')).toEqual([])
    expect(await retro.searchGames('', '3')).toEqual([])
  })
})

describe('refresh', () => {
  it('re-runs the provider the title is already set up with', async () => {
    const id = addGame()
    await achievements.fetchSteamSchema(id, '440')
    schemaPayload = schemaFixture([{ name: 'ACH_WIN', displayName: 'Winner (updated)' }])
    const res = await achievements.refresh(id)
    expect(res.total).toBe(1)
    expect(repo.listForMedia(id)[0].name).toBe('Winner (updated)')
  })

  it('refuses on a title nobody has set up yet', async () => {
    await expect(achievements.refresh(addGame())).rejects.toThrow(/not tracked/i)
  })
})


// ---- Keyless schema sources ------------------------------------------------
// The user's Steam account cannot get a Web API key (Steam only issues them to
// accounts that have spent money), so the list has to come from the crack's
// own files first, and Steam's public page as the last resort.

describe('schema source order', () => {
  const localSchema = [
    { name: 'ACH_WIN', displayName: 'Winner (local)', description: 'From disk', hidden: '0', icon: 'achievement_images/win.jpg', icongray: 'achievement_images/win_gray.jpg' },
    { name: 'ACH_SECRET', displayName: 'Secret', hidden: '1' }
  ]

  it('prefers the steam_settings file beside the exe, touching no schema endpoint at all', async () => {
    const id = addGame()
    const res = await achievements.fetchSteamSchema(id, '440', { io: localSchemaIO(localSchema) })

    expect(res.schemaSource).toBe('local')
    expect(res.total).toBe(2)
    const rows = repo.listForMedia(id)
    expect(rows[0]).toMatchObject({
      apiName: 'ACH_WIN',
      name: 'Winner (local)',
      description: 'From disk',
      iconPath: 'media/lc-win.jpg',
      iconGrayPath: 'media/lc-win_gray.jpg'
    })
    expect(rows[1]).toMatchObject({ hidden: true, iconPath: null })
    expect(fetched.some((u) => u.includes('GetSchemaForGame'))).toBe(false)
    expect(fetched.some((u) => u.includes('steamcommunity.com/stats'))).toBe(false)
  })

  it('still adds rarity to a local set from the keyless percentages endpoint', async () => {
    const id = addGame()
    await achievements.fetchSteamSchema(id, '440', { io: localSchemaIO(localSchema) })
    expect(repo.listForMedia(id)[0].globalPct).toBe(42.5)
  })

  it('finds the file up to two folders above an exe kept in bin/', async () => {
    const id = Number(
      db
        .prepare(
          `INSERT INTO media_item (media_type, title, exe_path) VALUES ('game', 'Nested', ?)`
        )
        .run(`${EXE_DIR}\\bin\\x64\\game.exe`).lastInsertRowid
    )
    const res = await achievements.fetchSteamSchema(id, '440', {
      io: localSchemaIO(localSchema, `${EXE_DIR}\\steam_settings\\achievements.json`)
    })
    expect(res.schemaSource).toBe('local')
  })

  it('falls through to the Web API when there is a key but no local file', async () => {
    const res = await achievements.fetchSteamSchema(addGame(), '440')
    expect(res.schemaSource).toBe('webapi')
  })

  it('falls through to the community page when there is no key and no local file', async () => {
    settings = {}
    communityHtml = communityPage([
      ['Winner', 'Win a round', 'https://cdn/win.jpg', '42.5'],
      ['Secret', 'Shh', 'https://cdn/secret.jpg', '2.9']
    ])
    percentPayload = {
      achievementpercentages: {
        achievements: [
          { name: 'ACH_WIN', percent: 42.5 },
          // Full precision on the API side, one decimal on the page — the
          // join has to round to pair them.
          { name: 'ACH_SECRET', percent: 2.9000001 }
        ]
      }
    }
    const id = addGame()
    const res = await achievements.fetchSteamSchema(id, '440')

    expect(res.schemaSource).toBe('community')
    expect(res.unmatched).toBe(0)
    const rows = repo.listForMedia(id)
    expect(rows.map((r) => [r.apiName, r.name])).toEqual([
      ['ACH_WIN', 'Winner'],
      ['ACH_SECRET', 'Secret']
    ])
    expect(rows[0]).toMatchObject({ iconPath: 'media/dl-win.jpg', iconGrayPath: null, globalPct: 42.5 })
    expect(rows[1].rarity).toBe('ultra-rare')
  })

  it('reports how many community rows could not be paired with an api name', async () => {
    settings = {}
    communityHtml = communityPage([
      ['Winner', '', 'https://cdn/win.jpg', '42.5'],
      ['Ghost', '', 'https://cdn/ghost.jpg', '0.1']
    ])
    percentPayload = { achievementpercentages: { achievements: [{ name: 'ACH_WIN', percent: 42.5 }] } }
    const res = await achievements.fetchSteamSchema(addGame(), '440')
    expect(res.total).toBe(1)
    expect(res.unmatched).toBe(1)
  })

  it('treats a failing percentages endpoint as fatal for the community path (it is the only bridge to api names)', async () => {
    settings = {}
    communityHtml = communityPage([['Winner', '', 'https://cdn/win.jpg', '42.5']])
    percentPayload = null
    await expect(achievements.fetchSteamSchema(addGame(), '440')).rejects.toThrow()
  })

  it('names every source it tried when all three come up empty', async () => {
    schemaPayload = schemaFixture([])
    communityStatus = 404
    await expect(achievements.fetchSteamSchema(addGame(), '440')).rejects.toThrow(
      /steam_settings.*Web API.*community/s
    )
  })

  it('the emulator sweep uses the same injected IO, so a local-schema game imports its unlocks in one go', async () => {
    const io = localSchemaIO(localSchema)
    const goldbergSave = '/roaming/Goldberg SteamEmu Saves/440/achievements.json'
    const files: Record<string, string> = {
      [`${EXE_DIR}\\steam_settings\\achievements.json`]: JSON.stringify(localSchema),
      [goldbergSave]: JSON.stringify({ ACH_WIN: { earned: true, earned_time: 1600000000 } })
    }
    const both = {
      ...io,
      exists: (p: string) => p in files,
      readFile: (p: string) => files[p] ?? '',
      mtimeMs: (p: string) => (p in files ? 1_600_000_000_000 : null)
    }
    // windowsEnv() reads process.env, which is empty here — pass an env through
    // importEmuUnlocks directly to prove the round trip.
    const id = addGame()
    await achievements.fetchSteamSchema(id, '440', { io: both })
    const swept = achievements.importEmuUnlocks(id, {
      io: both,
      env: { appData: '/roaming', publicDir: '/public', localAppData: '/local' }
    })
    expect(swept.imported).toBe(1)
  })
})
