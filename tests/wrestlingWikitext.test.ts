import { describe, it, expect } from 'vitest'
import { parseInline } from '@shared/markdown'
import {
  classifyArticle,
  extractChampionship,
  extractLead,
  findEventInfobox,
  parseCardSlot,
  parseDuration,
  parseInfoboxDate,
  parseIntLoose,
  parseResultCell,
  parseResultsCard,
  parseWikiLinks,
  parseWrestlerArticle,
  stripMarkup,
  titleToKey
} from '../src/main/wrestling/wikitext'

// Every fixture below is a verbatim slice of live Wikipedia wikitext (fetched
// from the MediaWiki API while designing this), not invented markup. The three
// articles were picked because they disagree with each other: different infobox
// spellings, different results-template names, 25 years apart, three promotions.

// WrestleMania X-Seven (WWE, 2001) — "Pro Wrestling results table".
const WM17 = `{{Infobox Wrestling event
|name = WrestleMania X-Seven
|image = WrestleManiaX-Seven.jpg
|caption = Promotional poster featuring [["Stone Cold" Steve Austin]], [[Dwayne Johnson|The Rock]], and the [[Astrodome|Reliant Astrodome]]
|tagline = Houston We Have a Problem...
|promotion = [[WWE|World Wrestling Federation]]
|date = {{start date|2001|4|1}}
|venue = [[Astrodome|Reliant Astrodome]]
|city = [[Houston, Texas]]
|attendance = 67,925
|buyrate = 1,040,000
}}
'''WrestleMania X-Seven''' was the seventeenth [[WrestleMania]] [[professional wrestling]] [[pay-per-view]] event produced by the [[WWE|World Wrestling Federation]].<ref name="a">Cite.</ref> It took place on April 1, 2001, at the [[Astrodome|Reliant Astrodome]] in [[Houston, Texas]].

The event is widely regarded as the greatest WrestleMania of all time.

==Background==
Some background prose.

{{Pro Wrestling results table
|results =
|times =
|note1 = heat
|match1  = X-Factor ([[X-Pac]] and [[Justin Credible]]) (with [[Matt Bloom|Albert]]) defeated [[Steve Blackman]] and [[Grand Master Sexay]]
|stip1   = [[Tag team match]]
|time1   = 2:46
|match2  = [[Chris Jericho]] (c) defeated [[William Regal]]
|stip2   = [[Singles match (professional wrestling)|Singles match]] for the [[WWF Intercontinental Championship]]
|time2   = 7:40
|match12 = [["Stone Cold" Steve Austin]] defeated [[Dwayne Johnson|The Rock]] (c)
|stip12  = [[No Disqualification match]] for the [[WWF Championship]]
|time12  = 28:08
}}`

// Starrcade (1997) (WCW) — lowercase infobox, a team that is itself a link,
// and two separate "(with …)" manager groups.
const STARRCADE97 = `{{Infobox wrestling event}}
{{Pro Wrestling results table
|match1 = [[Eddie Guerrero]] (c) defeated [[Dean Malenko]]
|stip1  = [[Professional wrestling match types|Singles match]] for the [[WWE Cruiserweight Championship (1996–2007)|WCW Cruiserweight Championship]]
|time1  = 14:57
|match2 = [[Randy Savage]], [[Scott Norton]] and [[Virgil (wrestler)|Vincent]] (with [[Miss Elizabeth]]) defeated [[Big Boss Man (wrestler)|Ray Traylor]] and [[The Steiner Brothers]] ([[Rick Steiner]] and [[Scott Steiner]]) (with [[Ted DiBiase]])
|stip2  = [[Professional wrestling tag team match types#Multiple man teamed matches|Six-man tag team match]]
|time2  = 11:06
}}`

// Wrestle Kingdom 17 (NJPW) — third infobox spelling, third template name, a
// time-limit draw, and a rumble whose entrants live in an {{efn}} footnote.
const WK17 = `{{Infobox professional wrestling event}}
{{Professional wrestling results table
|match1 = [[Ryohei Oiwa]] vs. [[Oleg Boltin]] ended in a time limit draw
|stip1 = [[Exhibition fight|Exhibition]] [[Singles match (professional wrestling)|match]]
|time1 = 3:00
|note1 = pre
|match2 = [[Great-O-Khan]], [[Shingo Takagi]], [[Sho (wrestler)|Sho]] and [[Toru Yano]] won{{efn|Participants were: [[Sho (wrestler)|Sho]], [[Hikuleo (wrestler)|Hikuleo]], [[Evil (wrestler)|Evil]], [[Tomohiro Ishii]], [[Douki]], [[Rocky Romero]]}}
|stip2 = [[New Japan Rumble|New Japan Ranbo]] to determine who will challenge for the [[KOPW (professional wrestling championship)|Provisional KOPW 2023 Championship]] at [[New Year Dash!!]]
|time2 = 30:37
|note2 = pre
}}`

// AEW All Out — a SERIES hub, not an event. It has no card of its own; its
// table lists the real event articles.
const AEW_SERIES = `{{Infobox wrestling PPV series}}
{| class="mw-datatable wikitable sortable"
! No. !! Event !! Date
|-
|1
|[[All Out (2019)]]
|August 31, 2019
|}`

describe('article classification', () => {
  it('separates event articles from series hubs across all three infobox spellings', () => {
    expect(classifyArticle(WM17)).toBe('event')
    expect(classifyArticle(STARRCADE97)).toBe('event')
    expect(classifyArticle(WK17)).toBe('event')
    // The trap: importing a series page as an event yields a card-less row and
    // silently loses every event in the series.
    expect(classifyArticle(AEW_SERIES)).toBe('series')
    expect(classifyArticle('just prose')).toBe('other')
  })
})

describe('infobox', () => {
  it('reads params past nested templates and links', () => {
    const box = findEventInfobox(WM17)!
    expect(box.params.get('name')).toBe('WrestleMania X-Seven')
    expect(box.params.get('tagline')).toBe('Houston We Have a Problem...')
    // `date` contains two pipes of its own — naive splitting loses it.
    expect(parseInfoboxDate(box.params.get('date'))).toBe('2001-04-01')
    expect(parseIntLoose(box.params.get('attendance'))).toBe(67925)
    expect(stripMarkup(box.params.get('venue') ?? '')).toBe('Reliant Astrodome')
    expect(stripMarkup(box.params.get('city') ?? '')).toBe('Houston, Texas')
  })

  it('parses the other two date spellings', () => {
    expect(parseInfoboxDate('{{Start date|1985|3|31|df=y}}')).toBe('1985-03-31')
    expect(parseInfoboxDate('April 1, 2001')).toBe('2001-04-01')
    expect(parseInfoboxDate('1 April 2001')).toBe('2001-04-01')
    expect(parseInfoboxDate('sometime')).toBeNull()
  })
})

describe('the card', () => {
  it('reads matchN/stipN/timeN out of every results-template spelling', () => {
    // index is the flattened card position, not the template's own N — the
    // fixture jumps 1, 2, 12 and comes back renumbered.
    expect(parseResultsCard(WM17).map((m) => m.index)).toEqual([1, 2, 3])
    expect(parseResultsCard(STARRCADE97)).toHaveLength(2)
    expect(parseResultsCard(WK17)).toHaveLength(2)
  })

  it('falls back to a raw wikitable when no template is present', () => {
    const table = `{| class="wikitable"
! No. !! Results !! Stipulations !! Times
|-
| 1
| [[A]] defeated [[B]]
| Singles match
| 5:00
|-
| 2
| [[C]] defeated [[D]]
| Tag team match
| 6:30
|}`
    const rows = parseResultsCard(table)
    expect(rows).toHaveLength(2)
    expect(rows[0].match).toBe('[[A]] defeated [[B]]')
    expect(rows[0].time).toBe('5:00')
    expect(rows[1].stip).toBe('Tag team match')
  })

  it('reads the INLINE wikitable form too', () => {
    // Cells written as `| a || b || c` on one line. Splitting these on the
    // single pipe shreds the row into values interleaved with empty strings,
    // which silently emptied every table using this form — i.e. exactly the
    // old articles the fallback exists for.
    const table = `{| class="wikitable"
! No. !! Results !! Stipulations !! Times
|-
| 1 || [[A]] defeated [[B]] || Singles match || 5:00
|-
| 2 || [[C]] defeated [[D]] || [[Tag team match|Tag team]] || 6:30
|}`
    const rows = parseResultsCard(table)
    expect(rows).toHaveLength(2)
    expect(rows[0].match).toBe('[[A]] defeated [[B]]')
    expect(rows[0].stip).toBe('Singles match')
    expect(rows[0].time).toBe('5:00')
    // A pipe inside a wikilink is not a cell separator.
    expect(rows[1].stip).toBe('[[Tag team match|Tag team]]')
    expect(rows[1].time).toBe('6:30')
  })

  it('flattens a multi-night event across BOTH results tables', () => {
    // WrestleMania 39's shape: two adjacent template calls whose numbering each
    // restart at 1, told apart only by |caption. Reading just the first drops a
    // whole night — and the second night's match1 would collide with the first.
    const twoNights = `{{Infobox wrestling event}}
{{Pro wrestling results table
|caption = Night 1
|match1 = [[A]] defeated [[B]]
|time1 = 5:00
|match2 = [[C]] defeated [[D]]
|time2 = 6:00
}}
{{Pro wrestling results table
|caption = Night 2
|match1 = [[E]] defeated [[F]]
|time1 = 7:00
}}`
    const card = parseResultsCard(twoNights)
    expect(card).toHaveLength(3)
    expect(card.map((m) => m.index)).toEqual([1, 2, 3])
    expect(card.map((m) => m.card)).toEqual(['Night 1', 'Night 1', 'Night 2'])
    expect(parseResultCell(card[2].match).title).toBe('E vs. F')
  })

  it('maps the noteN marker to a card slot and ignores the rest', () => {
    expect(parseCardSlot('pre')).toBe('pre')
    expect(parseCardSlot('dark')).toBe('dark')
    // WrestleMania X-Seven's note1 is "heat" — a footnote, not a card slot.
    expect(parseCardSlot('heat')).toBeNull()
    expect(parseCardSlot(null)).toBeNull()
  })

  it('parses durations, including the hour form', () => {
    expect(parseDuration('28:08')).toBe(1688)
    expect(parseDuration('2:46')).toBe(166)
    expect(parseDuration('1:02:15')).toBe(3735)
    expect(parseDuration('N/A')).toBeNull()
    expect(parseDuration('')).toBeNull()
  })
})

describe('result cells', () => {
  it('treats a parenthesised group as a team, not as wrestlers', () => {
    const m = parseResultCell(parseResultsCard(WM17)[0].match)
    expect(m.outcome).toBe('decision')
    const winners = m.participants.filter((p) => p.won)
    expect(winners.map((p) => p.name)).toEqual(['X-Pac', 'Justin Credible'])
    // "X-Factor" is the team, and must not become a wrestler row of its own.
    expect(winners.every((p) => p.teamName === 'X-Factor')).toBe(true)
    expect(m.participants.map((p) => p.name)).not.toContain('X-Factor')
    expect(m.participants.filter((p) => !p.won).map((p) => p.name)).toEqual([
      'Steve Blackman',
      'Grand Master Sexay'
    ])
  })

  it('drops managers and seconds — they were at ringside, not in the match', () => {
    const m = parseResultCell(parseResultsCard(WM17)[0].match)
    // "(with [[Matt Bloom|Albert]])"
    expect(m.participants.map((p) => p.name)).not.toContain('Albert')
  })

  it('handles a team whose name is itself a link, plus two manager groups', () => {
    const m = parseResultCell(parseResultsCard(STARRCADE97)[1].match)
    const names = m.participants.map((p) => p.name)
    expect(m.participants.filter((p) => p.won).map((p) => p.name)).toEqual([
      'Randy Savage',
      'Scott Norton',
      'Vincent'
    ])
    // Rick and Scott are the participants; "The Steiner Brothers" is their team.
    expect(names).toContain('Rick Steiner')
    expect(names).toContain('Scott Steiner')
    expect(names).not.toContain('The Steiner Brothers')
    expect(
      m.participants.find((p) => p.name === 'Rick Steiner')?.teamName
    ).toBe('The Steiner Brothers')
    expect(names).not.toContain('Miss Elizabeth')
    expect(names).not.toContain('Ted DiBiase')
    // Piped links keep their display name but resolve by target.
    expect(m.participants.find((p) => p.name === 'Vincent')?.link?.target).toBe('Virgil (wrestler)')
  })

  it('marks champions on either side of the verb', () => {
    const jericho = parseResultCell(parseResultsCard(WM17)[1].match)
    expect(jericho.participants.find((p) => p.name === 'Chris Jericho')?.isChampion).toBe(true)
    expect(jericho.participants.find((p) => p.name === 'William Regal')?.isChampion).toBe(false)

    const main = parseResultCell(parseResultsCard(WM17)[2].match)
    // The champion is the LOSER here — the marker binds to the name, not the side.
    expect(main.participants.find((p) => p.name === 'The Rock')?.isChampion).toBe(true)
    expect(main.participants.find((p) => p.name === 'The Rock')?.won).toBe(false)
    const austin = main.participants.find((p) => p.name === '"Stone Cold" Steve Austin')
    expect(austin?.won).toBe(true)
    expect(austin?.isChampion).toBe(false)
  })

  it('detects a time-limit draw and gives nobody the win', () => {
    const m = parseResultCell(parseResultsCard(WK17)[0].match)
    expect(m.outcome).toBe('draw')
    expect(m.participants.map((p) => p.name)).toEqual(['Ryohei Oiwa', 'Oleg Boltin'])
    expect(m.participants.some((p) => p.won)).toBe(false)
    expect(m.title).toBe('Ryohei Oiwa vs. Oleg Boltin')
  })

  it('records only the winners of a rumble and drops the efn entrant list', () => {
    const m = parseResultCell(parseResultsCard(WK17)[1].match)
    expect(m.outcome).toBe('decision')
    expect(m.participants.map((p) => p.name)).toEqual([
      'Great-O-Khan',
      'Shingo Takagi',
      'Sho',
      'Toru Yano'
    ])
    // Entrants named only inside {{efn|…}} must not become participants.
    expect(m.participants.map((p) => p.name)).not.toContain('Hikuleo')
    expect(m.participants.map((p) => p.name)).not.toContain('Douki')
  })

  it('builds a display title from the sides', () => {
    expect(parseResultCell(parseResultsCard(WM17)[2].match).title).toBe(
      '"Stone Cold" Steve Austin vs. The Rock'
    )
    expect(parseResultCell(parseResultsCard(WM17)[0].match).title).toBe(
      'X-Pac & Justin Credible vs. Steve Blackman & Grand Master Sexay'
    )
  })

  it('keeps unlinked wrestlers as plain names', () => {
    const m = parseResultCell('[[A Star]] defeated Some Jobber')
    expect(m.participants.map((p) => p.name)).toEqual(['A Star', 'Some Jobber'])
    expect(m.participants[1].link).toBeNull()
  })

  it('reads a no contest', () => {
    const m = parseResultCell('[[A]] vs. [[B]] ended in a no contest')
    expect(m.outcome).toBe('nocontest')
    expect(m.participants.some((p) => p.won)).toBe(false)
  })
})

describe('championships', () => {
  it('takes the title at stake out of the stipulation', () => {
    const card = parseResultsCard(WM17)
    expect(extractChampionship(card[1].stip)).toBe('WWF Intercontinental Championship')
    expect(extractChampionship(card[2].stip)).toBe('WWF Championship')
    expect(extractChampionship(parseResultsCard(STARRCADE97)[0].stip)).toBe(
      'WCW Cruiserweight Championship'
    )
  })

  it('stops at the championship instead of swallowing the rest of the sentence', () => {
    // Verbatim from All Out (2019). Reading the plain text after "for the"
    // takes the trailing clause with it and leaks a brace from the template.
    expect(
      extractChampionship(
        "[[Casino Battle Royale]] for the inaugural [[AEW Women's World Championship]] on the premiere episode of {{nowrap|[[AEW Dynamite|Dynamite]]}}"
      )
    ).toBe("AEW Women's World Championship")
  })

  it('does not invent a title from an unrelated "for the" phrase', () => {
    expect(extractChampionship('[[Battle royal]] for the vacant spot')).toBeNull()
    expect(extractChampionship('[[Singles match]]')).toBeNull()
    expect(extractChampionship(null)).toBeNull()
  })
})

describe('links and prose', () => {
  it('skips file, image and category links', () => {
    const links = parseWikiLinks('[[File:X.jpg|thumb]] [[Category:Y]] [[Real Person]]')
    expect(links.map((l) => l.target)).toEqual(['Real Person'])
  })

  it('resolves section anchors to the article', () => {
    expect(parseWikiLinks('[[Foo#Bar|baz]]')[0]).toEqual({ target: 'Foo', display: 'baz' })
  })

  it('strips refs, templates and bold/italic markup', () => {
    expect(stripMarkup(`'''Bold''' and ''italic''<ref name="a">Cite.</ref>{{efn|note}}`)).toBe(
      'Bold and italic'
    )
  })

  it('emits lead prose as markdown the app parser can already read', () => {
    const lead = extractLead(WM17)
    expect(lead).toContain('WrestleMania X-Seven was the seventeenth')
    // Citations must not survive into rendered prose.
    expect(lead).not.toContain('Cite.')
    expect(lead).not.toContain('<ref')
    // Stops at the first section heading.
    expect(lead).not.toContain('Some background prose')

    // The load-bearing contract: shared/markdown.ts's href class is [^)\s]+, so
    // an un-underscored target would silently degrade to plain text and every
    // wiki link in the app would die quietly. Assert through the REAL parser.
    expect(lead).toContain('(wiki:Houston,_Texas)')
    const links = parseInline(lead).filter((s) => s.type === 'link')
    expect(links.length).toBeGreaterThan(0)
    expect(links.some((l) => l.type === 'link' && l.href === 'wiki:Houston,_Texas')).toBe(true)
    // A multi-word target must round-trip as one link, not break at the space.
    const astro = links.find((l) => l.type === 'link' && l.href === 'wiki:Astrodome')
    expect(astro).toBeDefined()
    expect(astro && astro.type === 'link' && astro.text).toBe('Reliant Astrodome')
  })

  it('underscores titles for use as link targets', () => {
    expect(titleToKey('Stone Cold Steve Austin')).toBe('Stone_Cold_Steve_Austin')
    expect(titleToKey('  Spaced  Out  ')).toBe('Spaced_Out')
  })
})

describe('wrestler articles', () => {
  it('reads a NESTED wrestler infobox', () => {
    // The live shape: {{Infobox person | module = {{Infobox professional
    // wrestler | … }} }}. A top-level-only scan would find none of these.
    const text = `{{Infobox person
| name = Cody Rhodes
| module = {{Infobox professional wrestler
 | birth_name = Cody Garrett Runnels
 | billed    = [[Marietta, Georgia]]
 | height    = 6 ft 1 in
 | debut     = 2006
 }}
}}
'''Cody Rhodes''' is an American [[professional wrestling|professional wrestler]].`
    const w = parseWrestlerArticle(text)
    expect(w.realName).toBe('Cody Garrett Runnels')
    expect(w.billedFrom).toBe('Marietta, Georgia')
    expect(w.debutYear).toBe(2006)
    expect(w.height).toBe('6 ft 1 in')
    expect(w.bio).toContain('Cody Rhodes is an American')
  })

  it('returns nulls rather than throwing on an article with no infobox', () => {
    expect(parseWrestlerArticle('just prose')).toMatchObject({
      realName: null,
      debutYear: null,
      billedFrom: null
    })
  })
})
