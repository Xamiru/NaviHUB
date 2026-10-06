import { defineInterpretation } from '../../schema'

export default defineInterpretation({
  id: 'francisco-solano-lopez-reputation',
  about: ['person:francisco-solano-lopez'],
  topic: 'character',
  researched: '2026-10-06',
  framing: {
    id: 'q1',
    text: 'Observers sharply disagreed about Solano Lopez.',
    lang: 'en',
    cite: {
      source: 'loc-paraguay-country-study-1988',
      loc: { section: 'Francisco Solano Lopez', para: '3' }
    },
    provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/paraguay/10.htm' }
  },
  positions: [
    {
      id: 'monster',
      category: 'contemporary',
      holders: [
        { kind: 'participant', name: 'George Thompson' }
      ],
      statements: [
        {
          id: 'q2',
          text: 'George Thompson, an English engineer who worked for the younger Lopez (he distinguished himself as a Paraguayan officer during the War of the Triple Alliance, and later wrote a book about his experience) had harsh words for his ex-employer and commander, calling him "a monster without parallel."',
          lang: 'en',
          cite: {
            source: 'loc-paraguay-country-study-1988',
            loc: { section: 'Francisco Solano Lopez', para: '3' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/paraguay/10.htm' }
        },
        {
          id: 'q3',
          text: 'Solano Lopez\'s conduct laid him open to such charges.',
          lang: 'en',
          cite: {
            source: 'loc-paraguay-country-study-1988',
            loc: { section: 'Francisco Solano Lopez', para: '3' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/paraguay/10.htm' }
        }
      ]
    },
    {
      id: 'megalomaniac',
      category: 'popular',
      holders: [
        { kind: 'public', name: 'Other observers' }
      ],
      statements: [
        {
          id: 'q4',
          text: 'Others saw Solano Lopez as a paranoid megalomaniac, a man who wanted to be the "Napoleon of South America," willing to reduce his country to ruin and his countrymen to beggars in his vain quest for glory.',
          lang: 'en',
          cite: {
            source: 'loc-paraguay-country-study-1988',
            loc: { section: 'Francisco Solano Lopez', para: '3' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/paraguay/10.htm' }
        }
      ]
    },
    {
      id: 'patriot-hero',
      category: 'revisionist',
      holders: [
        { kind: 'school', name: 'Paraguayan nationalists and foreign revisionist historians' }
      ],
      statements: [
        {
          id: 'q5',
          text: 'However, sympathetic Paraguayan nationalists and foreign revisionist historians have portrayed Solano Lopez as a patriot who resisted to his last breath Argentine and Brazilian designs on Paraguay.',
          lang: 'en',
          cite: {
            source: 'loc-paraguay-country-study-1988',
            loc: { section: 'Francisco Solano Lopez', para: '4' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/paraguay/10.htm' }
        },
        {
          id: 'q6',
          text: 'They portrayed him as a tragic figure caught in a web of Argentine and Brazilian duplicity who mobilized the nation to repulse its enemies, holding them off heroically for five bloody, horror-filled years until Paraguay was finally overrun and prostrate.',
          lang: 'en',
          cite: {
            source: 'loc-paraguay-country-study-1988',
            loc: { section: 'Francisco Solano Lopez', para: '4' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/paraguay/10.htm' }
        }
      ],
      reception: [
        {
          id: 'q7',
          text: 'Solano Lopez\'s basic failing was that he did not recognize the changes that had occurred in the region since Francia\'s time.',
          lang: 'en',
          cite: {
            source: 'loc-paraguay-country-study-1988',
            loc: { section: 'Francisco Solano Lopez', para: '5' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/paraguay/10.htm' }
        }
      ]
    },
    {
      id: 'national-hero',
      category: 'popular',
      holders: [
        { kind: 'public', name: 'Paraguayans' }
      ],
      statements: [
        {
          id: 'q8',
          text: 'Since the 1930s, Paraguayans have regarded Solano Lopez as the nation\'s foremost hero.',
          lang: 'en',
          cite: {
            source: 'loc-paraguay-country-study-1988',
            loc: { section: 'Francisco Solano Lopez', para: '4' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/paraguay/10.htm' }
        }
      ]
    }
  ]
})
