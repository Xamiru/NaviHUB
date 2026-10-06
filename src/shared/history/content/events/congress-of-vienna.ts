import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'congress-of-vienna',
  names: [
    { text: 'Congress of Vienna', lang: 'en', role: 'primary' },
    { text: 'Wiener Kongress', lang: 'de', role: 'native' }
  ],
  researched: '2026-10-06',
  type: 'conference',
  start: {
    alts: [
      {
        value: { d: '1814-09' },
        cites: [
          {
            source: 'loc-austria-country-study-1994',
            loc: { section: 'The Congress of Vienna', para: '1' }
          }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1815-06' },
        cites: [
          {
            source: 'loc-austria-country-study-1994',
            loc: { section: 'The Congress of Vienna', para: '1' }
          }
        ]
      }
    ]
  },
  regions: ['europe', 'global'],
  prominence: 1,
  places: [
    {
      ref: 'place:vienna',
      cites: [
        {
          source: 'loc-austria-country-study-1994',
          loc: { section: 'The Congress of Vienna', para: '1' }
        }
      ]
    }
  ],
  participants: [
    {
      ref: 'person:klemens-von-metternich',
      role: 'leader',
      cites: [
        {
          source: 'loc-austria-country-study-1994',
          loc: { section: 'The Congress of Vienna', para: '1' }
        }
      ]
    },
    {
      ref: 'person:alexander-i-of-russia',
      role: 'head-of-state',
      cites: [
        {
          source: 'loc-russia-country-study-1996',
          loc: { section: 'Ruling the Empire', para: '8' }
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
          text: 'From September 1814 to June 1815, representatives of the European powers met in Vienna. Guided by Metternich, the Congress of Vienna redrew the map of Europe and laid the foundation for a long period of European peace.',
          lang: 'en',
          cite: {
            source: 'loc-austria-country-study-1994',
            loc: { section: 'The Congress of Vienna', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/austria/20.htm' }
        },
        {
          id: 'q2',
          text: 'In addition to the delegates of many small states, the congress included representatives of five large European states: Austria, Prussia, Russia, Britain, and France.',
          lang: 'en',
          cite: {
            source: 'loc-germany-country-study-1995',
            loc: { section: 'The German Confederation, 1815-66', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/germany/23.htm' }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q3',
          text: 'The Holy Roman Empire was not resurrected but was replaced with a German Confederation composed of thirty-five sovereign princes and four free cities.',
          lang: 'en',
          cite: {
            source: 'loc-austria-country-study-1994',
            loc: { section: 'The Congress of Vienna', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/austria/20.htm' }
        },
        {
          id: 'q4',
          text: 'The Congress of Vienna created the Kingdom of Poland (Russian Poland), to which Alexander granted a constitution.',
          lang: 'en',
          cite: {
            source: 'loc-russia-country-study-1996',
            loc: { section: 'Ruling the Empire', para: '9' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/russia/5.htm' }
        },
        {
          id: 'q5',
          text: 'The wartime allies--Austria, Britain, Russia, and Prussia-- concluded the Congress of Vienna by signing the Quadruple Alliance, which pledged them to uphold the peace settlement.',
          lang: 'en',
          cite: {
            source: 'loc-austria-country-study-1994',
            loc: { section: 'The Congress of Vienna', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/austria/20.htm' }
        }
      ]
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/b/b6/Congres_de_vienne.png/1280px-Congres_de_vienne.png',
    page: 'https://commons.wikimedia.org/wiki/File:Congres_de_vienne.png',
    credit: { creator: 'Jean-Baptiste Isabey' },
    license: { id: 'public-domain' }
  }
})
