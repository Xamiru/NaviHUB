import { definePerson } from '../../schema'

export default definePerson({
  id: 'patrick-pearse',
  names: [
    { text: 'Patrick Pearse', lang: 'en', role: 'primary' },
    { text: 'Pádraig Mac Piarais', lang: 'ga', role: 'native' },
    {
      text: 'Patrick Henry Pearse',
      lang: 'en',
      role: 'alternative',
      cites: [
        { source: 'eo1418-augusteijn-pearse', loc: { section: 'Pearse, Patrick' } }
      ]
    }
  ],
  researched: '2026-10-06',
  born: {
    alts: [
      {
        value: { d: '1879-11-10' },
        cites: [
          { source: 'eo1418-augusteijn-pearse', loc: { section: 'Pearse, Patrick' } }
        ]
      }
    ]
  },
  died: {
    alts: [
      {
        value: { d: '1916-05-03' },
        cites: [
          { source: 'eo1418-augusteijn-pearse', loc: { section: 'Pearse, Patrick' } }
        ]
      }
    ]
  },
  bornIn: {
    ref: 'place:dublin',
    cites: [
      { source: 'eo1418-augusteijn-pearse', loc: { section: 'Pearse, Patrick' } }
    ]
  },
  diedIn: {
    ref: 'place:dublin',
    cites: [
      { source: 'eo1418-augusteijn-pearse', loc: { section: 'Pearse, Patrick' } }
    ]
  },
  regions: ['europe'],
  roles: ['revolutionary', 'writer'],
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'Patrick Pearse was one of the leaders of the 1916 Easter Rising in which the Irish Republican Brotherhood (IRB), an extremely nationalist organization, attempted to establish an independent Ireland by force. His execution was an important catalyst for the growth of republicanism for which he long remained the chief ideologue.',
          lang: 'en',
          cite: { source: 'eo1418-augusteijn-pearse', loc: { section: 'Pearse, Patrick' } },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://encyclopedia.1914-1918-online.net/article/pearse-patrick/'
          }
        }
      ]
    },
    {
      kind: 'ideas',
      quotes: [
        {
          id: 'q2',
          text: 'Patrick Pearse – who, as President of the Republic, became the public face of the rebellion – epitomised the cultural nationalist values that pervaded the revolutionary generation, particularly in his commitment to the revival of the Irish language, seen as the essence of Irish nationality.',
          lang: 'en',
          cite: {
            source: 'eo1418-mcgarry-easter-rising',
            loc: { section: 'Rationale and Ideology', para: '6' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://encyclopedia.1914-1918-online.net/article/easter-rising-great-britain-and-ireland/'
          }
        }
      ]
    }
  ],
  portrait: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/0/0d/Patrick_Pearse_%28cropped%29.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Patrick_Pearse_(cropped).jpg',
    credit: { institution: 'Library of Congress' },
    license: { id: 'public-domain' }
  }
})
