import { describe, it, expect, beforeEach, vi } from 'vitest'
import Database from 'better-sqlite3'
import { createTestDb } from './helpers'

let db: Database.Database
vi.mock('../src/main/db/connection', () => ({ getSqlite: () => db }))

import * as repo from '../src/main/repos/wrestlingRepo'
import * as listRepo from '../src/main/repos/listRepo'
import { buildEvent, eventImageName } from '../src/main/wrestling/importRun'
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
    repo.rateMatch(repo.getEvent(id)!.matches[1].id, 3)
    repo.saveEvent(card(['A vs. B']))
    expect(repo.getEvent(id)!.matches.map((m) => m.title)).toEqual(['A vs. B'])
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
})
