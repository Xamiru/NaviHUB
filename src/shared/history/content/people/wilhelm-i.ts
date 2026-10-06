import { definePerson } from '../../schema'

export default definePerson({
  id: 'wilhelm-i',
  names: [
    { text: 'Wilhelm I', lang: 'en', role: 'primary' },
    { text: 'Wilhelm I.', lang: 'de', role: 'native' },
    {
      text: 'Friedrich Wilhelm Ludwig',
      lang: 'de',
      role: 'alternative',
      cites: [
        { source: 'lemo-biografie-wilhelm-i', loc: { section: 'Wilhelm I.' } }
      ]
    }
  ],
  researched: '2026-10-06',
  born: {
    alts: [
      {
        value: { d: '1797-03-22' },
        cites: [
          { source: 'lemo-biografie-wilhelm-i', loc: { section: 'Wilhelm I.' } }
        ]
      }
    ]
  },
  died: {
    alts: [
      {
        value: { d: '1888-03-09' },
        cites: [
          { source: 'lemo-biografie-wilhelm-i', loc: { section: 'Wilhelm I.' } }
        ]
      }
    ]
  },
  bornIn: {
    ref: 'place:berlin',
    cites: [
      { source: 'lemo-biografie-wilhelm-i', loc: { section: 'Wilhelm I.' } }
    ]
  },
  diedIn: {
    ref: 'place:berlin',
    cites: [
      { source: 'lemo-biografie-wilhelm-i', loc: { section: 'Wilhelm I.' } }
    ]
  },
  regions: ['europe'],
  roles: ['monarch', 'military'],
  offices: [
    {
      title: 'König von Preußen',
      lang: 'de',
      start: {
        alts: [
          {
            value: { d: '1861-01-02' },
            cites: [
              { source: 'lemo-biografie-wilhelm-i', loc: { section: 'Wilhelm I.' } }
            ],
            heldBy: [
              { kind: 'organization', name: 'Deutsches Historisches Museum' }
            ]
          },
          {
            value: { d: '1858' },
            cites: [
              {
                source: 'loc-germany-country-study-1995',
                loc: { section: 'Bismarck and Unification', para: '2' }
              }
            ],
            heldBy: [
              { kind: 'organization', name: 'Library of Congress, Federal Research Division' }
            ]
          }
        ]
      },
      end: {
        alts: [
          {
            value: { d: '1888-03-09' },
            cites: [
              { source: 'lemo-biografie-wilhelm-i', loc: { section: 'Wilhelm I.' } }
            ]
          }
        ]
      },
      cites: [
        { source: 'lemo-biografie-wilhelm-i', loc: { section: 'Wilhelm I.' } },
        {
          source: 'loc-germany-country-study-1995',
          loc: { section: 'Bismarck and Unification', para: '2' }
        }
      ]
    },
    {
      title: 'Deutscher Kaiser',
      lang: 'de',
      start: {
        alts: [
          {
            value: { d: '1871-01-18' },
            cites: [
              { source: 'lemo-biografie-wilhelm-i', loc: { section: 'Wilhelm I.' } }
            ]
          }
        ]
      },
      end: {
        alts: [
          {
            value: { d: '1888-03-09' },
            cites: [
              { source: 'lemo-biografie-wilhelm-i', loc: { section: 'Wilhelm I.' } }
            ]
          }
        ]
      },
      cites: [
        { source: 'lemo-biografie-wilhelm-i', loc: { section: 'Wilhelm I.' } }
      ]
    }
  ],
  sections: [
    {
      kind: 'career',
      quotes: [
        {
          id: 'q1',
          text: 'In 1862 King Wilhelm I of Prussia (r. 1858-88) chose Bismarck to serve as his minister president.',
          lang: 'en',
          cite: {
            source: 'loc-germany-country-study-1995',
            loc: { section: 'Bismarck and Unification', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/germany/27.htm' }
        },
        {
          id: 'q2',
          text: 'Im Deutsch-Französischen Krieg hat Wilhelm I. das Kommando über die deutschen Truppen in der entscheidenden Schlacht von Sedan.',
          lang: 'de',
          cite: { source: 'lemo-biografie-wilhelm-i', loc: { section: 'Wilhelm I.' } },
          provenance: { via: 'web', at: '2026-10-06', url: 'https://www.dhm.de/lemo/biografie/wilhelm-i' }
        },
        {
          id: 'q3',
          text: 'Die Regierungsgeschäfte überlässt Wilhelm I. weitgehend seinem Reichskanzler und preußischen Ministerpräsidenten Bismarck.',
          lang: 'de',
          cite: { source: 'lemo-biografie-wilhelm-i', loc: { section: 'Wilhelm I.' } },
          provenance: { via: 'web', at: '2026-10-06', url: 'https://www.dhm.de/lemo/biografie/wilhelm-i' }
        }
      ]
    },
    {
      kind: 'later-life',
      quotes: [
        {
          id: 'q4',
          text: 'Als Integrationsfigur des Reiches und mit seinem an Sparsamkeit und Einfachheit orientierten Lebensstil gewinnt der Kaiser zunehmend an Popularität in der Bevölkerung.',
          lang: 'de',
          cite: { source: 'lemo-biografie-wilhelm-i', loc: { section: 'Wilhelm I.' } },
          provenance: { via: 'web', at: '2026-10-06', url: 'https://www.dhm.de/lemo/biografie/wilhelm-i' }
        }
      ]
    }
  ],
  portrait: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/b/bf/Emperor_of_Germany_%28Wilhelm_I%5E%29_-_NARA_-_530230.jpg/1280px-Emperor_of_Germany_%28Wilhelm_I%5E%29_-_NARA_-_530230.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Emperor_of_Germany_(Wilhelm_I%5E)_-_NARA_-_530230.jpg',
    credit: {
      institution: 'U.S. National Archives and Records Administration',
      creator: 'Mathew Benjamin Brady'
    },
    license: { id: 'public-domain' }
  }
})
