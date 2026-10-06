import { definePerson } from '../../schema'

export default definePerson({
  id: 'francisco-franco',
  names: [
    { text: 'Francisco Franco', lang: 'en', role: 'primary' },
    { text: 'Francisco Franco Bahamonde', lang: 'es', role: 'native' },
    {
      text: 'el caudillo',
      lang: 'es',
      role: 'alternative',
      cites: [
        {
          source: 'loc-spain-country-study-1988',
          loc: { section: 'THE SPANISH CIVIL WAR', para: '3' }
        }
      ]
    }
  ],
  researched: '2026-10-06',
  born: {
    alts: [
      {
        value: { d: '1892-12-04' },
        cites: [
          {
            source: 'lemo-biografie-francisco-franco',
            loc: { section: 'Francisco Franco 1892-1975', para: '2' }
          },
          {
            source: 'lemo-biografie-francisco-franco',
            loc: { section: 'Francisco Franco 1892-1975', para: '3' }
          }
        ]
      }
    ]
  },
  died: {
    alts: [
      {
        value: { d: '1975-11-20' },
        cites: [
          {
            source: 'lemo-biografie-francisco-franco',
            loc: { section: 'Francisco Franco 1892-1975', para: '116' }
          },
          {
            source: 'lemo-biografie-francisco-franco',
            loc: { section: 'Francisco Franco 1892-1975', para: '118' }
          }
        ]
      }
    ]
  },
  diedIn: {
    ref: 'place:madrid',
    cites: [
      {
        source: 'lemo-biografie-francisco-franco',
        loc: { section: 'Francisco Franco 1892-1975', para: '118' }
      }
    ]
  },
  regions: ['europe'],
  roles: ['military', 'head-of-state'],
  offices: [
    {
      title: 'head of state (generalissimo)',
      start: {
        alts: [
          {
            value: { d: '1936-10-01' },
            cites: [
              {
                source: 'lemo-biografie-francisco-franco',
                loc: { section: 'Francisco Franco 1892-1975', para: '34' }
              },
              {
                source: 'lemo-biografie-francisco-franco',
                loc: { section: 'Francisco Franco 1892-1975', para: '39' }
              }
            ]
          }
        ]
      },
      end: {
        alts: [
          {
            value: { d: '1975-11-20' },
            cites: [
              {
                source: 'lemo-biografie-francisco-franco',
                loc: { section: 'Francisco Franco 1892-1975', para: '116' }
              },
              {
                source: 'lemo-biografie-francisco-franco',
                loc: { section: 'Francisco Franco 1892-1975', para: '118' }
              }
            ]
          }
        ]
      },
      cites: [
        {
          source: 'loc-spain-country-study-1988',
          loc: { section: 'THE SPANISH CIVIL WAR', para: '3' }
        },
        {
          source: 'lemo-biografie-francisco-franco',
          loc: { section: 'Francisco Franco 1892-1975', para: '39' }
        }
      ]
    }
  ],
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'When he assumed leadership of the Nationalist forces, Franco had a reputation as a highly professional, career-oriented, combat soldier, who had developed into a first-rate officer.',
          lang: 'en',
          cite: {
            source: 'loc-spain-country-study-1988',
            loc: { section: 'THE SPANISH CIVIL WAR', para: '4' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/spain/21.htm' }
        },
        {
          id: 'q2',
          text: 'Until his death in November 1975, Franco ruled Spain as "Caudillo by the grace of God," as his coins proclaimed.',
          lang: 'en',
          cite: {
            source: 'loc-spain-country-study-1988',
            loc: { section: 'THE FRANCO YEARS: Franco\'s Political System', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/spain/22.htm' }
        }
      ]
    },
    {
      kind: 'ideas',
      quotes: [
        {
          id: 'q3',
          text: 'Known for his iron political nerve, Franco saw himself as the one designated to save Spain from the chaos and instability visited upon the country by the evils of parliamentary democracy and political parties, which he blamed for destroying the unity of Spain.',
          lang: 'en',
          cite: {
            source: 'loc-spain-country-study-1988',
            loc: { section: 'THE FRANCO YEARS: Franco\'s Political System', para: '3' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/spain/22.htm' }
        }
      ]
    },
    {
      kind: 'legacy',
      quotes: [
        {
          id: 'q4',
          text: 'Thus, Franco\'s rule has been characterized as authoritarian rather than totalitarian.',
          lang: 'en',
          cite: {
            source: 'loc-spain-country-study-1988',
            loc: { section: 'THE FRANCO YEARS: Franco\'s Political System', para: '16' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/spain/22.htm' }
        },
        {
          id: 'q5',
          text: 'Thus, while there was a definite fascist element during the first decade of Franco\'s rule, most analysts have concluded that early Francoism can more accurately be described as semifascist.',
          lang: 'en',
          cite: {
            source: 'loc-spain-country-study-1988',
            loc: { section: 'THE FRANCO YEARS: Franco\'s Political System', para: '17' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/spain/22.htm' }
        }
      ]
    },
    {
      kind: 'death',
      quotes: [
        {
          id: 'q6',
          text: '20. November: Francisco Franco stirbt in Madrid.',
          lang: 'de',
          cite: {
            source: 'lemo-biografie-francisco-franco',
            loc: { section: 'Francisco Franco 1892-1975', para: '118' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.dhm.de/lemo/biografie/francisco-franco'
          }
        }
      ]
    }
  ],
  portrait: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/9/92/Francisco_Franco_1930_Portrait.jpg/1280px-Francisco_Franco_1930_Portrait.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Francisco_Franco_1930_Portrait.jpg',
    credit: { institution: 'Biblioteca Virtual de Defensa', creator: 'Jalón Ángel' },
    license: { id: 'cc0' }
  }
})
