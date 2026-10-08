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
  researched: '2026-10-08',
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
      polity: 'polity:kingdom-of-prussia',
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
      polity: 'polity:german-empire',
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
          id: 'q5',
          text: 'He crossed the French frontier on the 11th of August, and personally commanded at the battles of Gravelotte and Sedan.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-william-i-of-germany',
            loc: { section: 'WILLIAM I. OF GERMANY', para: '4' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/William_I._of_Germany'
          }
        },
        {
          id: 'q6',
          text: 'After that period the emperor left the destinies of Germany almost entirely in the hands of Bismarck, who held the office of imperial chancellor.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-william-i-of-germany',
            loc: { section: 'WILLIAM I. OF GERMANY', para: '5' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/William_I._of_Germany'
          }
        }
      ]
    },
    {
      kind: 'later-life',
      quotes: [
        {
          id: 'q7',
          text: 'Personally William maintained the best traditions of the Hohenzollerns, not only by the splendour of the achievements with which his name will always be intimately associated, but by the simplicity, manliness and uprightness of his daily life.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-william-i-of-germany',
            loc: { section: 'WILLIAM I. OF GERMANY', para: '6' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/William_I._of_Germany'
          }
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
