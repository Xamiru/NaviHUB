import { describe, it, expect, beforeEach, vi } from 'vitest'
import Database from 'better-sqlite3'
import { createTestDb } from './helpers'

let db: Database.Database
vi.mock('../src/main/db/connection', () => ({ getSqlite: () => db }))

import * as repo from '../src/main/repos/wrestlingRepo'
import * as listRepo from '../src/main/repos/listRepo'
import * as tierListRepo from '../src/main/repos/tierListRepo'
import { buildEvent, eventImageName } from '../src/main/wrestling/importRun'
import { parseHonours } from '../src/main/wrestling/wikitext'
import * as importRun from '../src/main/wrestling/importRun'

// A minimal but real-shaped event article. The point of these tests is the
// WRITE path — dedup, aliasing, and what survives a re-import — so the wikitext
// stays small; wikitext parsing itself is pinned in wrestlingWikitext.test.ts.
function article(opts: { name: string; date: string; matches: string[]; image?: string }): string {
  const rows = opts.matches
    .map((m, i) => `|match${i + 1} = ${m}\n|stip${i + 1} = [[Singles match]]\n|time${i + 1} = 10:0${i}`)
    .join('\n')
  return `{{Infobox wrestling event
|name = ${opts.name}
|date = {{start date|${opts.date}}}
|venue = [[Some Arena]]
|city = [[Somewhere, USA]]
|attendance = 12,345
${opts.image ? `|image = ${opts.image}` : ''}
}}
'''${opts.name}''' was a [[professional wrestling]] event held by [[WWE]] in [[Somewhere, USA]].

{{Pro wrestling results table
${rows}
}}`
}

beforeEach(() => {
  db = createTestDb()
})

describe('buildEvent', () => {
  it('turns an article into an event row with its whole card', () => {
    const built = buildEvent(
      'wwe',
      'Test Event (2001)',
      article({
        name: 'Test Event',
        date: '2001|4|1',
        matches: ['[[Alpha]] (c) defeated [[Beta]]', '[[Gamma]] and [[Delta]] defeated [[Epsilon]] and [[Zeta]]']
      }),
      null
    )!
    expect(built.name).toBe('Test Event')
    // The infobox name is the display name; the article title carries the
    // disambiguator and stays the dedup key.
    expect(built.wikiTitle).toBe('Test Event (2001)')
    expect(built.eventDate).toBe('2001-04-01')
    expect(built.city).toBe('Somewhere, USA')
    expect(built.attendance).toBe(12345)
    expect(built.matches).toHaveLength(2)
    expect(built.matches[0].title).toBe('Alpha vs. Beta')
    expect(built.matches[0].durationSeconds).toBe(600)
    expect(built.matches[0].participants.find((p) => p.name === 'Alpha')?.isChampion).toBe(true)
  })

  it('refuses a series hub instead of importing a card-less event', () => {
    expect(buildEvent('aew', 'AEW All Out', '{{Infobox wrestling PPV series}}\nstuff', null)).toBeNull()
  })

  it('reads the poster filename off the infobox', () => {
    const text = article({ name: 'X', date: '2001|4|1', matches: [], image: 'Poster.jpg' })
    expect(eventImageName(text)).toBe('Poster.jpg')
    // No image param, or a non-image value, must not invent a filename —
    // event posters are non-free so prop=pageimages returns nothing and this
    // is the only path to them.
    expect(eventImageName(article({ name: 'X', date: '2001|4|1', matches: [] }))).toBeNull()
  })
})

describe('saveEvent', () => {
  it('creates the event, its card and stub wrestlers', () => {
    const built = buildEvent(
      'wwe',
      'Test Event (2001)',
      article({ name: 'Test Event', date: '2001|4|1', matches: ['[[Alpha]] defeated [[Beta]]'] }),
      'media/dl-abc'
    )!
    const id = repo.saveEvent(built)
    const detail = repo.getEvent(id)!
    expect(detail.name).toBe('Test Event')
    expect(detail.posterPath).toBe('media/dl-abc')
    expect(detail.matches).toHaveLength(1)
    expect(detail.matches[0].participants.map((p) => p.name)).toEqual(['Alpha', 'Beta'])
    expect(detail.matches[0].participants[0].won).toBe(true)
    expect(detail.matches[0].participants[1].won).toBe(false)
    expect(repo.overview().totals.wrestlers).toBe(2)
  })

  it('reuses one wrestler row across events instead of duplicating', () => {
    repo.saveEvent(
      buildEvent('wwe', 'E1', article({ name: 'E1', date: '2001|4|1', matches: ['[[Alpha]] defeated [[Beta]]'] }), null)!
    )
    repo.saveEvent(
      buildEvent('wwe', 'E2', article({ name: 'E2', date: '2002|4|1', matches: ['[[Alpha]] defeated [[Gamma]]'] }), null)!
    )
    expect(repo.overview().totals.wrestlers).toBe(3)
    const alpha = repo.searchWrestlers('Alpha')[0]
    expect(alpha.matchCount).toBe(2)
    expect(repo.wrestlerMatches(alpha.id)).toHaveLength(2)
  })

  it('collapses redirect aliases onto one wrestler', () => {
    // The trap: cards link the same person as [[Steve Austin]],
    // [["Stone Cold" Steve Austin]] and [[Stone Cold Steve Austin]], and all
    // three are redirects to one article. Without the alias map each spelling
    // becomes its own wrestler and every career stat is wrong.
    repo.saveEvent(
      buildEvent(
        'wwe',
        'E1',
        article({ name: 'E1', date: '2001|4|1', matches: ['[[Stone Cold Steve Austin]] defeated [[Beta]]'] }),
        null
      )!
    )
    repo.recordAliases(
      new Map([
        ['Steve Austin', 'Stone Cold Steve Austin'],
        ['"Stone Cold" Steve Austin', 'Stone Cold Steve Austin']
      ])
    )
    repo.saveEvent(
      buildEvent(
        'wwe',
        'E2',
        article({ name: 'E2', date: '2002|4|1', matches: ['[[Steve Austin]] defeated [[Gamma]]'] }),
        null
      )!
    )

    const austins = repo.searchWrestlers('Austin')
    expect(austins).toHaveLength(1)
    expect(austins[0].matchCount).toBe(2)
  })
})

describe('re-import', () => {
  const first = article({
    name: 'Test Event',
    date: '2001|4|1',
    matches: ['[[Alpha]] defeated [[Beta]]', '[[Gamma]] defeated [[Delta]]']
  })

  it('refreshes canonical fields but never touches the personal layer', () => {
    const id = repo.saveEvent(buildEvent('wwe', 'Test Event (2001)', first, 'media/dl-old')!)
    const before = repo.getEvent(id)!

    // The user rates a match and hearts the event.
    repo.rateMatch(before.matches[1].id, 4.5)
    repo.setFavorite('event', id, true)
    repo.setFavorite('match', before.matches[0].id, true)

    // The article gains a dark match at the TOP of the card, which is exactly
    // what would break a sort_order-keyed restore.
    const revised = article({
      name: 'Test Event Renamed',
      date: '2001|4|1',
      matches: [
        '[[Omega]] defeated [[Sigma]]',
        '[[Alpha]] defeated [[Beta]]',
        '[[Gamma]] defeated [[Delta]]'
      ]
    })
    const sameId = repo.saveEvent(buildEvent('wwe', 'Test Event (2001)', revised, null)!)
    expect(sameId).toBe(id)

    const after = repo.getEvent(id)!
    // Canonical data is authoritative...
    expect(after.name).toBe('Test Event Renamed')
    expect(after.matches).toHaveLength(3)
    expect(after.matches[0].title).toBe('Omega vs. Sigma')
    // ...a null from the source never wipes what we already had...
    expect(after.posterPath).toBe('media/dl-old')
    // ...and every personal mark survives, still on the right match.
    expect(after.favorite).toBe(true)
    expect(after.matches.find((m) => m.title === 'Gamma vs. Delta')?.rating).toBe(4.5)
    expect(after.matches.find((m) => m.title === 'Alpha vs. Beta')?.favorite).toBe(true)
    expect(after.matches.find((m) => m.title === 'Omega vs. Sigma')?.rating).toBeNull()
  })

  it('does not duplicate the event', () => {
    repo.saveEvent(buildEvent('wwe', 'Test Event (2001)', first, null)!)
    repo.saveEvent(buildEvent('wwe', 'Test Event (2001)', first, null)!)
    expect(repo.listEvents()).toHaveLength(1)
    expect(repo.overview().totals.matches).toBe(2)
    expect(repo.eventExists('Test Event (2001)')).toBe(true)
  })
})

describe('reads', () => {
  beforeEach(() => {
    repo.saveEvent(
      buildEvent('wwe', 'WWE One', article({ name: 'WWE One', date: '2001|4|1', matches: ['[[Alpha]] defeated [[Beta]]'] }), null)!
    )
    repo.saveEvent(
      buildEvent('wcw', 'WCW One', article({ name: 'WCW One', date: '1997|12|28', matches: ['[[Gamma]] defeated [[Delta]]'] }), null)!
    )
  })

  it('filters by promotion, year and search', () => {
    expect(repo.listEvents({ promotion: 'wwe' }).map((e) => e.name)).toEqual(['WWE One'])
    expect(repo.listEvents({ yearTo: 1999 }).map((e) => e.name)).toEqual(['WCW One'])
    expect(repo.listEvents({ search: 'wcw' }).map((e) => e.name)).toEqual(['WCW One'])
    // Default sort is newest first.
    expect(repo.listEvents().map((e) => e.name)).toEqual(['WWE One', 'WCW One'])
  })

  it('summarizes per promotion', () => {
    const o = repo.overview()
    expect(o.totals).toMatchObject({ events: 2, matches: 2, wrestlers: 4, rated: 0 })
    expect(o.promotions.find((p) => p.promotion === 'wcw')).toMatchObject({
      eventCount: 1,
      firstYear: 1997,
      ownedCount: 0
    })
  })

  it('clamps ratings to half steps and lists the top rated', () => {
    const m = repo.getEvent(repo.listEvents({ promotion: 'wwe' })[0].id)!.matches[0]
    repo.rateMatch(m.id, 4.7)
    expect(repo.getEvent(m.eventId)!.matches[0].rating).toBe(4.5)
    repo.rateMatch(m.id, 99)
    expect(repo.getEvent(m.eventId)!.matches[0].rating).toBe(5)
    expect(repo.topRatedMatches().map((r) => r.eventName)).toEqual(['WWE One'])
    repo.rateMatch(m.id, null)
    expect(repo.topRatedMatches()).toHaveLength(0)
  })

  it('resolves wiki link targets to routes, including through redirects', () => {
    repo.recordAliases(new Map([['Steve Austin', 'Alpha']]))
    const resolved = repo.resolveLinks([
      'WWE_One', // an event, underscored the way lead prose carries it
      'Alpha', // a wrestler
      'Steve_Austin', // an alias of that wrestler
      'Some_Unrelated_Article'
    ])
    const byTitle = new Map(resolved.map((r) => [r.title, r]))
    expect(byTitle.get('WWE_One')?.kind).toBe('event')
    expect(byTitle.get('Alpha')?.kind).toBe('wrestler')
    expect(byTitle.get('Steve_Austin')?.id).toBe(byTitle.get('Alpha')?.id)
    // Unknown targets come back unresolved so the prose renders them as quiet
    // text rather than a dead link.
    expect(byTitle.get('Some_Unrelated_Article')).toMatchObject({ kind: null, id: null })
  })

  it('cascades a deleted event to its card and participants', () => {
    const id = repo.listEvents({ promotion: 'wwe' })[0].id
    db.prepare('DELETE FROM wrestling_event WHERE id = ?').run(id)
    expect(repo.overview().totals.matches).toBe(1)
    expect(
      db.prepare('SELECT COUNT(*) AS n FROM wrestling_match_participant').get() as { n: number }
    ).toEqual({ n: 2 })
    // Wrestler rows deliberately outlive the event — they are shared.
    expect(repo.overview().totals.wrestlers).toBe(4)
  })
})

describe('the personal layer', () => {
  it('is reachable through Lists, which is where "top 25 ever" belongs', () => {
    // ListKind was widened rather than rebuilding ranked lists inside the
    // section; listRepo resolves each kind through its fixed KIND map.
    const eventId = repo.saveEvent(
      buildEvent(
        'wwe',
        'Test Event (2001)',
        article({ name: 'Test Event', date: '2001|4|1', matches: ['[[Alpha]] defeated [[Beta]]'] }),
        null
      )!
    )
    const match = repo.getEvent(eventId)!.matches[0]
    const wrestler = repo.searchWrestlers('Alpha')[0]

    const listId = listRepo.create({ title: 'Best ever', kind: 'wrestlingMatch', ranked: true })
    listRepo.addItem(listId, match.id)
    const detail = listRepo.get(listId)!
    expect(detail.items).toHaveLength(1)
    // The denormalized match title is why wrestling_match needs a name column
    // at all — listRepo renders every kind through one nameCol.
    expect(detail.items[0].name).toBe('Alpha vs. Beta')

    const evList = listRepo.create({ title: 'Owned', kind: 'wrestlingEvent', ranked: false })
    listRepo.addItem(evList, eventId)
    expect(listRepo.get(evList)!.items[0].name).toBe('Test Event')

    const wList = listRepo.create({ title: 'Favourites', kind: 'wrestlingWrestler', ranked: false })
    listRepo.addItem(wList, wrestler.id)
    expect(listRepo.get(wList)!.items[0].name).toBe('Alpha')
  })

  it('toggles favorites on every entity kind', () => {
    const eventId = repo.saveEvent(
      buildEvent(
        'wwe',
        'E',
        article({ name: 'E', date: '2001|4|1', matches: ['[[Alpha]] defeated [[Beta]]'] }),
        null
      )!
    )
    const match = repo.getEvent(eventId)!.matches[0]
    const wrestler = repo.searchWrestlers('Alpha')[0]

    repo.setFavorite('event', eventId, true)
    repo.setFavorite('match', match.id, true)
    repo.setFavorite('wrestler', wrestler.id, true)
    expect(repo.getEvent(eventId)!.favorite).toBe(true)
    expect(repo.getEvent(eventId)!.matches[0].favorite).toBe(true)
    expect(repo.getWrestler(wrestler.id)!.favorite).toBe(true)
    expect(repo.listEvents({ favoriteOnly: true })).toHaveLength(1)
    expect(repo.favorites()).toMatchObject({
      matches: [{ id: match.id, title: 'Alpha vs. Beta' }],
      wrestlers: [{ id: wrestler.id, name: 'Alpha' }]
    })

    repo.setFavorite('event', eventId, false)
    expect(repo.listEvents({ favoriteOnly: true })).toHaveLength(0)
    // A stable has a favorite column too — the export sanitizer clears it, so
    // it must exist.
    expect(() => repo.setFavorite('stable', 1, true)).not.toThrow()
  })
})

describe('chronology', () => {
  function ev(name: string, date: string, series: string): number {
    return repo.saveEvent({
      promotion: 'wwe',
      name,
      wikiTitle: name,
      series,
      eventDate: date,
      matches: []
    })
  }

  it('steps through the promotion calendar and the series, independently', () => {
    // Interleaved on purpose: the WrestleMania series skips a year of other
    // shows, so a single date-ordered walk would conflate the two chronologies.
    const nwo = ev('No Way Out', '2001-02-25', 'No Way Out')
    const wm17 = ev('WrestleMania X-Seven', '2001-04-01', 'WrestleMania')
    const backlash = ev('Backlash', '2001-04-29', 'Backlash')
    const wm2000 = ev('WrestleMania 2000', '2000-04-02', 'WrestleMania')
    const wm18 = ev('WrestleMania X8', '2002-03-17', 'WrestleMania')

    const c = repo.chronology(wm17)
    // The promotion's calendar: whatever ran either side.
    expect(c.prev?.id).toBe(nwo)
    expect(c.next?.id).toBe(backlash)
    // The series: the same show a year either side.
    expect(c.seriesName).toBe('WrestleMania')
    expect(c.seriesPrev?.id).toBe(wm2000)
    expect(c.seriesNext?.id).toBe(wm18)
  })

  it('reports the ends of a run as null rather than wrapping', () => {
    const first = ev('First', '1985-03-31', 'WrestleMania')
    const last = ev('Last', '1986-04-07', 'WrestleMania')
    expect(repo.chronology(first).prev).toBeNull()
    expect(repo.chronology(first).seriesPrev).toBeNull()
    expect(repo.chronology(last).next).toBeNull()
  })

  it('never crosses promotions', () => {
    ev('WWE Show', '1997-12-01', 'A')
    const wcw = repo.saveEvent({
      promotion: 'wcw',
      name: 'Starrcade',
      wikiTitle: 'Starrcade (1997)',
      series: 'Starrcade',
      eventDate: '1997-12-28',
      matches: []
    })
    // The WWE show is 27 days earlier but belongs to another promotion.
    expect(repo.chronology(wcw).prev).toBeNull()
  })

  it('leaves an undated event out of the chronology instead of guessing', () => {
    ev('Dated', '2001-04-01', 'S')
    const undated = repo.saveEvent({
      promotion: 'wwe',
      name: 'Undated',
      wikiTitle: 'Undated',
      series: 'S',
      matches: []
    })
    expect(repo.chronology(undated)).toMatchObject({ prev: null, next: null, seriesPrev: null })
  })

  it('counts events per year for the year rail', () => {
    ev('A', '2001-01-01', 'S')
    ev('B', '2001-06-01', 'S')
    ev('C', '2002-01-01', 'S')
    expect(repo.yearCounts('wwe')).toEqual([
      { year: 2002, count: 1 },
      { year: 2001, count: 2 }
    ])
  })
})

describe('the year page', () => {
  function ev(promo: 'wwe' | 'wcw', name: string, date: string | null): number {
    return repo.saveEvent({
      promotion: promo,
      name,
      wikiTitle: name,
      eventDate: date,
      matches: []
    })
  }

  it('lists every promotion for a year, in date order', () => {
    ev('wwe', 'Royal Rumble', '1997-01-19')
    ev('wcw', 'Starrcade', '1997-12-28')
    ev('wwe', 'WrestleMania 13', '1997-03-23')
    ev('wwe', 'Next year', '1998-01-01')

    const year = repo.listEvents({ yearFrom: 1997, yearTo: 1997, sort: 'dateAsc' })
    // The Monday Night Wars read as ONE calendar, which is the point of the page.
    expect(year.map((e) => e.name)).toEqual(['Royal Rumble', 'WrestleMania 13', 'Starrcade'])
    expect(new Set(year.map((e) => e.promotion))).toEqual(new Set(['wwe', 'wcw']))
  })

  it('counts years across all promotions, newest first', () => {
    ev('wwe', 'A', '1997-01-19')
    ev('wcw', 'B', '1997-12-28')
    ev('wwe', 'C', '1998-01-01')
    expect(repo.allYears()).toEqual([
      { year: 1998, count: 1 },
      { year: 1997, count: 2 }
    ])
  })

  it('leaves undated events out of the year rail but keeps them findable', () => {
    ev('wwe', 'Dated', '1997-01-19')
    ev('wwe', 'Undated', null)
    // An undated row has no year to file under...
    expect(repo.allYears()).toEqual([{ year: 1997, count: 1 }])
    // ...and a year query must not sweep it in on a NULL comparison.
    expect(
      repo.listEvents({ yearFrom: 1997, yearTo: 1997 }).map((e) => e.name)
    ).toEqual(['Dated'])
  })
})

// ---------------------------------------------------------------------------
// Regressions from the code review. Each of these shipped broken and is pinned
// here so it cannot come back.
// ---------------------------------------------------------------------------
describe('review regressions', () => {
  it('dedups wrestlers through the REAL import loop, not a hand-fed alias map', async () => {
    // The original bug: recordAliases was only ever handed redirects for EVENT
    // titles (the crawl fetches nothing else), so it never matched a wrestler
    // row and inserted nothing — every alias spelling became its own wrestler
    // with its own split career. The old test passed only because it fed the
    // map by hand. This drives the actual runner.
    const pages = {
      E1: article({ name: 'E1', date: '2001|4|1', matches: ['[[Stone Cold Steve Austin]] defeated [[Beta]]'] }),
      E2: article({ name: 'E2', date: '2002|4|1', matches: ['[[Steve Austin]] defeated [[Gamma]]'] })
    }
    importRun.start(
      { promotions: ['wwe'], withWrestlers: false },
      {
        enumerateEvents: async () => ['E1', 'E2'],
        fetchPages: async (titles) => ({
          pages: titles.map((t) => ({ title: t, wikitext: pages[t as keyof typeof pages] })),
          aliases: new Map()
        }),
        // The importer must ASK about the card's wrestler links itself.
        resolveTitles: async (titles) =>
          new Map(
            titles
              .filter((t) => t === 'Steve Austin')
              .map((t) => [t, 'Stone Cold Steve Austin'])
          ),
        resolveFiles: async () => new Map(),
        downloadImages: async () => new Map(),
        delayMs: 0
      }
    )
    await vi.waitFor(() => expect(importRun.getStatus().state).toBe('done'), { timeout: 5000 })

    const austins = repo.searchWrestlers('Austin')
    expect(austins).toHaveLength(1)
    expect(austins[0].matchCount).toBe(2)
    // And the mapping is memoized, so the next run never re-asks.
    expect(repo.canonicalTitle('Steve Austin')).toBe('Stone Cold Steve Austin')
  })

  it('keeps match ids across a re-import, so list membership survives', () => {
    const card = (titles: string[]) => ({
      promotion: 'wwe' as const,
      name: 'E',
      wikiTitle: 'E',
      matches: titles.map((t, i) => ({
        sortOrder: i, title: t, resultText: null, stipulation: null, championship: null,
        durationSeconds: null, outcome: 'decision' as const, cardSlot: null, cardLabel: null,
        participants: []
      }))
    })
    const id = repo.saveEvent(card(['A vs. B', 'C vs. D']))
    const before = repo.getEvent(id)!.matches
    const listId = listRepo.create({ title: 'Best', kind: 'wrestlingMatch', ranked: true })
    listRepo.addItem(listId, before[0].id)

    // A dark match appears at the top of the card — ids must still be stable.
    repo.saveEvent(card(['Dark vs. Match', 'A vs. B', 'C vs. D']))
    const after = repo.getEvent(id)!.matches
    expect(after.find((m) => m.title === 'A vs. B')!.id).toBe(before[0].id)
    // The list still resolves its item rather than silently emptying.
    expect(listRepo.get(listId)!.items).toHaveLength(1)
  })

  it('gives two identically-titled matches their own ratings', () => {
    const card = {
      promotion: 'wwe' as const,
      name: 'E',
      wikiTitle: 'E',
      matches: ['A vs. B', 'C vs. D', 'A vs. B'].map((t, i) => ({
        sortOrder: i, title: t, resultText: null, stipulation: null, championship: null,
        durationSeconds: null, outcome: 'decision' as const, cardSlot: null, cardLabel: null,
        participants: []
      }))
    }
    const id = repo.saveEvent(card)
    const before = repo.getEvent(id)!.matches
    repo.rateMatch(before[0].id, 5)
    repo.saveEvent(card)

    const after = repo.getEvent(id)!.matches
    // Previously the title-keyed snapshot cloned the 5 onto BOTH "A vs. B" rows.
    expect(after.map((m) => m.rating)).toEqual([5, null, null])
  })

  it('drops a match that genuinely left the card, personal layer and all', () => {
    const card = (titles: string[]) => ({
      promotion: 'wwe' as const, name: 'E', wikiTitle: 'E',
      matches: titles.map((t, i) => ({
        sortOrder: i, title: t, resultText: null, stipulation: null, championship: null,
        durationSeconds: null, outcome: 'decision' as const, cardSlot: null, cardLabel: null,
        participants: []
      }))
    })
    const id = repo.saveEvent(card(['A vs. B', 'Gone vs. Away']))
    const removedId = repo.getEvent(id)!.matches[1].id
    repo.rateMatch(removedId, 3)
    const listId = listRepo.create({ title: 'Gone matches', kind: 'wrestlingMatch' })
    const tierId = tierListRepo.create({ title: 'Gone tiers', kind: 'wrestlingMatch' })
    listRepo.addItem(listId, removedId)
    tierListRepo.addItem(tierId, removedId)
    repo.saveEvent(card(['A vs. B']))
    expect(repo.getEvent(id)!.matches.map((m) => m.title)).toEqual(['A vs. B'])
    expect(listRepo.get(listId)!.items).toHaveLength(0)
    expect(tierListRepo.get(tierId)!.pool).toHaveLength(0)
    expect(
      db.prepare('SELECT COUNT(*) AS n FROM list_item WHERE entity_id = ?').get(removedId) as { n: number }
    ).toEqual({ n: 0 })
    expect(
      db.prepare('SELECT COUNT(*) AS n FROM tier_item WHERE entity_id = ?').get(removedId) as { n: number }
    ).toEqual({ n: 0 })
  })

  it('recognizes a redirect-titled category member instead of re-fetching forever', () => {
    repo.saveEvent(
      buildEvent('wwe', 'Backlash (2001)', article({ name: 'Backlash', date: '2001|4|29', matches: [] }), null)!
    )
    // The category lists the redirect; the event is stored under the canonical
    // title it resolved to.
    expect(repo.eventExists('WWF Backlash (2001)')).toBe(false)
    repo.recordAliases(new Map([['WWF Backlash (2001)', 'Backlash (2001)']]))
    expect(repo.eventExists('WWF Backlash (2001)')).toBe(true)
  })

  it('bounds listEvents and keeps lead prose out of list rows', () => {
    for (let i = 0; i < 5; i++) {
      repo.saveEvent({
        promotion: 'wwe', name: `E${i}`, wikiTitle: `E${i}`,
        eventDate: `200${i}-01-01`, lead: 'a very long article lead'.repeat(200), matches: []
      })
    }
    expect(repo.listEvents({ limit: 2 })).toHaveLength(2)
    // Rows for grids and pickers must not carry the article body.
    expect(repo.listEvents()[0].lead).toBeNull()
    // The detail read still has it.
    expect(repo.getEvent(repo.listEvents()[0].id)!.lead).toContain('article lead')
  })

  it('stores wrestler details and stops retrying an article-less stub', () => {
    repo.saveEvent(
      buildEvent('wwe', 'E', article({ name: 'E', date: '2001|4|1', matches: ['[[Alpha]] defeated [[Beta]]'] }), null)!
    )
    expect(repo.stubWrestlers().map((w) => w.wikiTitle).sort()).toEqual(['Alpha', 'Beta'])

    repo.saveWrestlerDetails([
      { wikiTitle: 'Alpha', realName: 'Al Pha', billedFrom: 'Texas', bio: 'A wrestler.' }
    ])
    const alpha = repo.searchWrestlers('Alpha')[0]
    expect(repo.getWrestler(alpha.id)).toMatchObject({ realName: 'Al Pha', billedFrom: 'Texas' })
    // Beta had no article; marking it checked keeps it out of future passes.
    repo.markWrestlersChecked(['Beta'])
    expect(repo.stubWrestlers()).toHaveLength(0)
  })

  it('commits profile fields, honours, and checked markers as one batch', () => {
    repo.saveEvent(
      buildEvent('wwe', 'E', article({ name: 'E', date: '2001|4|1', matches: ['[[Alpha]] defeated [[Beta]]'] }), null)!
    )
    const alpha = repo.searchWrestlers('Alpha')[0]
    repo.saveHonours(alpha.id, [{ org: 'Old', items: ['Old title'] }])

    expect(() =>
      repo.saveWrestlerDetailBatch(
        [{
          wikiTitle: 'Alpha',
          realName: 'Should roll back',
          honours: [{ org: 'Broken', items: [null as unknown as string] }]
        }],
        ['Alpha', 'Beta']
      )
    ).toThrow()

    expect(repo.getWrestler(alpha.id)?.realName).toBeNull()
    expect(repo.honoursFor(alpha.id)).toEqual([{ org: 'Old', items: ['Old title'] }])
    expect(repo.stubWrestlers().map((row) => row.wikiTitle).sort()).toEqual(['Alpha', 'Beta'])

    repo.saveWrestlerDetailBatch(
      [{ wikiTitle: 'Alpha', realName: 'Al Pha', honours: [{ org: 'WWE', items: ['Title'] }] }],
      ['Alpha', 'Beta']
    )
    expect(repo.getWrestler(alpha.id)?.realName).toBe('Al Pha')
    expect(repo.honoursFor(alpha.id)).toEqual([{ org: 'WWE', items: ['Title'] }])
    expect(repo.stubWrestlers()).toHaveLength(0)
  })

  it('keeps favorited and listed wrestlers when their last imported match disappears', () => {
    const eventId = repo.saveEvent(
      buildEvent('wwe', 'E', article({ name: 'E', date: '2001|4|1', matches: ['[[Alpha]] defeated [[Beta]]'] }), null)!
    )
    const alpha = repo.searchWrestlers('Alpha')[0]
    const beta = repo.searchWrestlers('Beta')[0]
    repo.setFavorite('wrestler', alpha.id, true)
    const listId = listRepo.create({ title: 'People', kind: 'wrestlingWrestler' })
    listRepo.addItem(listId, beta.id)

    repo.saveEvent({ promotion: 'wwe', name: 'E', wikiTitle: 'E', matches: [] })
    expect(repo.getEvent(eventId)!.matches).toHaveLength(0)
    repo.pruneOrphanWrestlers()

    expect(repo.getWrestler(alpha.id)?.favorite).toBe(true)
    expect(repo.getWrestler(beta.id)?.id).toBe(beta.id)
    expect(listRepo.get(listId)!.items).toHaveLength(1)
  })

  it('leaves a failed wrestler-detail fetch open for a later retry', async () => {
    let calls = 0
    importRun.start(
      { promotions: ['wwe'] },
      {
        enumerateEvents: async () => ['E'],
        fetchPages: async (titles) => {
          calls++
          if (calls > 1) throw new Error('temporary outage')
          return {
            pages: titles.map((title) => ({
              title,
              wikitext: article({ name: title, date: '2001|4|1', matches: ['[[Alpha]] defeated [[Beta]]'] })
            })),
            aliases: new Map()
          }
        },
        resolveFiles: async () => new Map(),
        resolveTitles: async () => new Map(),
        pageImages: async () => new Map(),
        downloadImages: async () => new Map(),
        delayMs: 0
      }
    )
    await vi.waitFor(() => expect(importRun.getStatus().state).toBe('error'), { timeout: 5000 })
    expect(repo.stubWrestlers().map((row) => row.wikiTitle).sort()).toEqual(['Alpha', 'Beta'])
  })

  it('reopens wrestler profiles only for promotions selected by a refresh', () => {
    repo.saveEvent(
      buildEvent('wwe', 'WWE E', article({ name: 'WWE E', date: '2001|4|1', matches: ['[[Alpha]] defeated [[Beta]]'] }), null)!
    )
    repo.saveEvent(
      buildEvent('wcw', 'WCW E', article({ name: 'WCW E', date: '1998|4|1', matches: ['[[Gamma]] defeated [[Delta]]'] }), null)!
    )
    repo.markWrestlersChecked(['Alpha', 'Beta', 'Gamma', 'Delta'])
    expect(repo.stubWrestlers()).toHaveLength(0)

    repo.resetWrestlerDetails(['wwe'])
    expect(repo.stubWrestlers().map((row) => row.wikiTitle).sort()).toEqual(['Alpha', 'Beta'])
  })
})

describe('honours and career record', () => {
  it('parses the accomplishments section into grouped honours', () => {
    // Shape verified against real articles: a bold org header, then its items.
    const article = `'''X''' is a wrestler.

==Championships and accomplishments==
* '''''[[Pro Wrestling Illustrated]]'''''
** [[PWI Match of the Year|Match of the Year]] (1997)<small> vs. [[Bret Hart]]</small><ref name="a"/>
** Ranked No. 1 (1998)<ref>{{cite web|url=http://x}}</ref>
*'''[[WWE]]'''
**[[WWE Championship]] (6 times)
**[[Royal Rumble]] (1997, 1998)
* '''Empty Org'''

==Other section==
Not an honour.`
    const groups = parseHonours(article)
    expect(groups.map((g) => g.org)).toEqual(['Pro Wrestling Illustrated', 'WWE'])
    expect(groups[0].items).toEqual([
      'Match of the Year (1997) vs. Bret Hart',
      'Ranked No. 1 (1998)'
    ])
    expect(groups[1].items).toEqual(['WWE Championship (6 times)', 'Royal Rumble (1997, 1998)'])
    // Citations go, the <small> qualifier stays (it's the useful half), a
    // header with nothing under it is a stray bullet, and the section stops at
    // the next heading.
    expect(groups.some((g) => g.org === 'Empty Org')).toBe(false)
  })

  it('returns nothing for an article with no such section', () => {
    expect(parseHonours('just prose')).toEqual([])
  })

  it('stores honours per wrestler and replaces them on re-import', () => {
    repo.saveEvent(
      buildEvent('wwe', 'E', article({ name: 'E', date: '2001|4|1', matches: ['[[Alpha]] defeated [[Beta]]'] }), null)!
    )
    const alpha = repo.searchWrestlers('Alpha')[0]
    repo.saveHonours(alpha.id, [{ org: 'WWE', items: ['A title (2 times)', 'Another'] }])
    expect(repo.honoursFor(alpha.id)).toEqual([
      { org: 'WWE', items: ['A title (2 times)', 'Another'] }
    ])
    // Canonical data, replaced wholesale — no duplicates on a second run.
    repo.saveHonours(alpha.id, [{ org: 'WWE', items: ['A title (3 times)'] }])
    expect(repo.honoursFor(alpha.id)).toEqual([{ org: 'WWE', items: ['A title (3 times)'] }])
  })

  it('computes a career record that counts draws separately', () => {
    const card = (title: string, outcome: 'decision' | 'draw', aWon: boolean) => ({
      sortOrder: 0,
      title,
      resultText: null,
      stipulation: null,
      championship: title === 'Title match' ? 'WWE Championship' : null,
      durationSeconds: null,
      outcome,
      method: null,
      cardSlot: null,
      cardLabel: null,
      participants: [
        { wikiTitle: 'Alpha', name: 'Alpha', side: 0, won: aWon, isChampion: false, teamName: null },
        { wikiTitle: 'Beta', name: 'Beta', side: 1, won: false, isChampion: false, teamName: null }
      ]
    })
    repo.saveEvent({
      promotion: 'wwe', name: 'E1', wikiTitle: 'E1', eventDate: '2001-01-01',
      matches: [card('Title match', 'decision', true)]
    })
    repo.saveEvent({
      promotion: 'wwe', name: 'E2', wikiTitle: 'E2', eventDate: '2002-01-01',
      matches: [card('Draw match', 'draw', false)]
    })
    const alpha = repo.searchWrestlers('Alpha')[0]
    const beta = repo.searchWrestlers('Beta')[0]
    // A draw is neither a win nor a loss for either side.
    expect(repo.recordFor(alpha.id)).toEqual({ wins: 1, losses: 0, draws: 1, total: 2 })
    expect(repo.recordFor(beta.id)).toEqual({ wins: 0, losses: 1, draws: 1, total: 2 })
    expect(repo.championshipsFor(alpha.id)).toEqual(['WWE Championship'])
    expect(repo.championshipsFor(beta.id)).toEqual([])
  })

  it('cascades honours away with the wrestler', () => {
    repo.saveEvent(
      buildEvent('wwe', 'E', article({ name: 'E', date: '2001|4|1', matches: ['[[Alpha]] defeated [[Beta]]'] }), null)!
    )
    const alpha = repo.searchWrestlers('Alpha')[0]
    repo.saveHonours(alpha.id, [{ org: 'WWE', items: ['A'] }])
    db.prepare('DELETE FROM wrestling_wrestler WHERE id = ?').run(alpha.id)
    expect(
      db.prepare('SELECT COUNT(*) AS n FROM wrestling_honour').get() as { n: number }
    ).toEqual({ n: 0 })
  })
})

describe('loose matches', () => {
  // A loose match is one you own with no PPV behind it. It is modelled as a
  // match with no event so that everything else — participants, ratings,
  // hearts, lists, wrestler pages, the career record — applies unchanged.
  function seedWrestlers(): { alpha: number; beta: number } {
    repo.saveEvent(
      buildEvent('wwe', 'E', article({ name: 'E', date: '2001|4|1', matches: ['[[Alpha]] defeated [[Beta]]'] }), null)!
    )
    return {
      alpha: repo.searchWrestlers('Alpha')[0].id,
      beta: repo.searchWrestlers('Beta')[0].id
    }
  }

  it('creates one with its own show and date, and no event', () => {
    const { alpha, beta } = seedWrestlers()
    const videoId = repo.addLooseVideo('Raw/1997-03-17 main.mkv', '1997-03-17 main')
    const id = repo.createLooseMatch(
      {
        title: 'Alpha vs. Beta',
        showLabel: 'Raw',
        matchDate: '1997-03-17',
        wrestlerIds: [alpha, beta],
        winnerIds: [alpha]
      },
      videoId
    )
    const rows = repo.looseMatches()
    expect(rows).toHaveLength(1)
    expect(rows[0]).toMatchObject({
      id,
      eventId: null,
      showLabel: 'Raw',
      matchDate: '1997-03-17',
      outcome: 'decision',
      videoId
    })
    // Winner lands on side 0 so the row reads "A def. B" like an imported one.
    const winner = rows[0].participants.find((p) => p.won)
    expect(winner?.name).toBe('Alpha')
    expect(winner?.side).toBe(0)
    expect(rows[0].participants.find((p) => !p.won)?.side).toBe(1)
  })

  it('shows up on the wrestler page and in the career record', () => {
    const { alpha, beta } = seedWrestlers()
    repo.createLooseMatch(
      { title: 'Alpha vs. Beta', showLabel: 'Raw', matchDate: '1999-01-04', wrestlerIds: [alpha, beta], winnerIds: [alpha] },
      null
    )
    // The imported PPV match plus the loose one.
    const matches = repo.wrestlerMatches(alpha)
    expect(matches).toHaveLength(2)
    // A LEFT JOIN is what keeps the loose one here; an inner join drops it.
    expect(matches.map((m) => m.eventName)).toContain('Raw')
    expect(repo.recordFor(alpha)).toMatchObject({ wins: 2, losses: 0, total: 2 })
  })

  it('carries ratings and hearts like any other match', () => {
    const { alpha, beta } = seedWrestlers()
    const id = repo.createLooseMatch(
      { title: 'Alpha vs. Beta', showLabel: 'Nitro', wrestlerIds: [alpha, beta], winnerIds: [beta] },
      null
    )
    repo.rateMatch(id, 5)
    repo.setFavorite('match', id, true)
    const top = repo.topRatedMatches()
    expect(top).toHaveLength(1)
    expect(top[0]).toMatchObject({ id, rating: 5, favorite: true, eventName: 'Nitro' })
  })

  it('edits in place, replacing participants', () => {
    const { alpha, beta } = seedWrestlers()
    const id = repo.createLooseMatch({ title: 'Old', wrestlerIds: [alpha], winnerIds: [] }, null)
    repo.updateLooseMatch(id, {
      title: 'New title',
      showLabel: 'SmackDown',
      matchDate: '2002-05-01',
      wrestlerIds: [alpha, beta],
      winnerIds: [beta]
    })
    const m = repo.looseMatches()[0]
    expect(m).toMatchObject({ title: 'New title', showLabel: 'SmackDown', outcome: 'decision' })
    expect(m.participants).toHaveLength(2)
    expect(m.participants.find((p) => p.won)?.name).toBe('Beta')
  })

  it('refuses to edit an imported match or accept invalid participant ids', () => {
    const { alpha, beta } = seedWrestlers()
    const imported = repo.getEvent(repo.listEvents()[0].id)!.matches[0]

    expect(() =>
      repo.updateLooseMatch(imported.id, { title: 'Tampered', wrestlerIds: [alpha] })
    ).toThrow('Loose match not found')
    expect(repo.getEvent(imported.eventId!)!.matches[0].participants).toHaveLength(2)

    expect(() =>
      repo.createLooseMatch(
        { title: 'Invalid winner', wrestlerIds: [alpha], winnerIds: [beta] },
        null
      )
    ).toThrow('Every winner')
    expect(() =>
      repo.createLooseMatch({ title: 'Unknown wrestler', wrestlerIds: [999999] }, null)
    ).toThrow('do not exist')
  })

  it('removes the match and its video row, and only a LOOSE one', () => {
    const { alpha } = seedWrestlers()
    const videoId = repo.addLooseVideo('a.mkv', 'a')
    const id = repo.createLooseMatch({ title: 'X', wrestlerIds: [alpha] }, videoId)
    const listId = listRepo.create({ title: 'Loose', kind: 'wrestlingMatch' })
    const tierId = tierListRepo.create({ title: 'Loose tiers', kind: 'wrestlingMatch' })
    listRepo.addItem(listId, id)
    tierListRepo.addItem(tierId, id)
    repo.removeLooseMatch(id)
    expect(repo.looseMatches()).toHaveLength(0)
    expect(
      db.prepare('SELECT COUNT(*) AS n FROM wrestling_video WHERE event_id IS NULL').get() as { n: number }
    ).toEqual({ n: 0 })
    expect(listRepo.get(listId)!.items).toHaveLength(0)
    expect(tierListRepo.get(tierId)!.pool).toHaveLength(0)
    expect(
      db.prepare('SELECT COUNT(*) AS n FROM list_item WHERE entity_id = ?').get(id) as { n: number }
    ).toEqual({ n: 0 })
    expect(
      db.prepare('SELECT COUNT(*) AS n FROM tier_item WHERE entity_id = ?').get(id) as { n: number }
    ).toEqual({ n: 0 })

    // An imported PPV match must be untouchable through this path.
    const ppvMatch = repo.getEvent(repo.listEvents()[0].id)!.matches[0]
    repo.removeLooseMatch(ppvMatch.id)
    expect(repo.getEvent(repo.listEvents()[0].id)!.matches).toHaveLength(1)
  })

  it('does not duplicate a video row for the same file', () => {
    const a = repo.addLooseVideo('same.mkv', 'same')
    expect(repo.addLooseVideo('same.mkv', 'same')).toBe(a)
  })

  it('does not attach one video row to two loose matches', () => {
    const { alpha } = seedWrestlers()
    const videoId = repo.addLooseVideo('same.mkv', 'same')
    repo.createLooseMatch({ title: 'First', wrestlerIds: [alpha] }, videoId)
    expect(() =>
      repo.createLooseMatch({ title: 'Second', wrestlerIds: [alpha] }, videoId)
    ).toThrow('already attached')
  })

  it('keeps loose matches out of an event card', () => {
    const { alpha } = seedWrestlers()
    repo.createLooseMatch({ title: 'Loose', wrestlerIds: [alpha] }, null)
    const eventId = repo.listEvents()[0].id
    expect(repo.getEvent(eventId)!.matches.map((m) => m.title)).toEqual(['Alpha vs. Beta'])
  })

  it('resolves both imported and loose match destinations', () => {
    const { alpha } = seedWrestlers()
    const eventMatch = repo.getEvent(repo.listEvents()[0].id)!.matches[0]
    const looseId = repo.createLooseMatch({ title: 'Loose', wrestlerIds: [alpha] }, null)
    expect(repo.matchLocation(eventMatch.id)).toEqual({
      kind: 'event',
      eventId: eventMatch.eventId
    })
    expect(repo.matchLocation(looseId)).toEqual({ kind: 'loose' })
    expect(repo.matchLocation(999999)).toBeNull()
  })
})
