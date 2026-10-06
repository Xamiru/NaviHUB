import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'ottoman-constitution-of-1876',
  names: [
    { text: 'Ottoman constitution of 1876', lang: 'en', role: 'primary' },
    { text: 'Kanûn-ı Esâsî', lang: 'tr', role: 'native' }
  ],
  researched: '2026-10-06',
  type: 'law',
  start: {
    alts: [
      {
        value: { d: '1876-12-23' },
        cites: [
          { source: 'lemo-chronik-1876', loc: { section: 'Chronik 1876', para: '71' } }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1878-02-13' },
        cites: [
          { source: 'lemo-chronik-1878', loc: { section: 'Chronik 1878', para: '9' } }
        ]
      }
    ]
  },
  regions: ['mena', 'europe'],
  prominence: 2,
  places: [
    { ref: 'place:istanbul' }
  ],
  partOf: [
    { ref: 'period:reign-of-abdul-hamid-ii' }
  ],
  participants: [
    {
      ref: 'person:midhat-pasha',
      role: 'organizer',
      cites: [
        {
          source: 'loc-turkey-country-study-1995',
          loc: { section: 'External Threats and Internal Transformations', para: '10' }
        }
      ]
    },
    {
      ref: 'person:abdul-hamid-ii',
      role: 'head-of-state',
      cites: [
        {
          source: 'loc-turkey-country-study-1995',
          loc: { section: 'External Threats and Internal Transformations', para: '10' }
        }
      ]
    }
  ],
  related: [
    {
      ref: 'event:russo-turkish-war-1877-1878',
      rel: 'related',
      cites: [
        {
          source: 'loc-turkey-country-study-1995',
          loc: { section: 'External Threats and Internal Transformations', para: '10' }
        }
      ]
    }
  ],
  sections: [
    {
      kind: 'background',
      quotes: [
        {
          id: 'q1',
          text: 'The 1860s and early 1870s saw the emergence of the Young Ottoman movement among Western-oriented intellectuals who wanted to see the empire accepted as an equal by the European powers. They sought to adopt Western political institutions, including an efficient centralized government, an elected parliament, and a written constitution.',
          lang: 'en',
          cite: {
            source: 'loc-turkey-country-study-1995',
            loc: { section: 'External Threats and Internal Transformations', para: '9' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/turkey/10.htm' }
        }
      ]
    },
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q2',
          text: 'In December of that year, on the eve of the war with Russia, the new sultan promulgated a constitution, based on European models, that had been drafted by senior political, military, and religious officials under Midhat\'s direction. Embodying the substance of the Young Ottoman program, this document created a representative parliament, guaranteed religious liberty, and provided for enlarged freedom of expression.',
          lang: 'en',
          cite: {
            source: 'loc-turkey-country-study-1995',
            loc: { section: 'External Threats and Internal Transformations', para: '10' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/turkey/10.htm' }
        },
        {
          id: 'q3',
          text: 'Das Osmanische Reich erhält unter dem am 31. August zum Sultan proklamierten Abd Al Hamid II. (1842-1918) erstmals eine Verfassung, in der die völlige Rechtsgleichheit aller Untertanen proklamiert wird. 1878 wird die Verfassung wieder zurückgezogen.',
          lang: 'de',
          cite: { source: 'lemo-chronik-1876', loc: { section: 'Chronik 1876', para: '72' } },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.dhm.de/lemo/jahreschronik/1876.html'
          }
        }
      ]
    },
    {
      kind: 'aftermath',
      quotes: [
        {
          id: 'q4',
          text: 'Abdül Hamid II\'s acceptance of constitutionalism was a temporary tactical expedient to gain the throne, however.',
          lang: 'en',
          cite: {
            source: 'loc-turkey-country-study-1995',
            loc: { section: 'External Threats and Internal Transformations', para: '10' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/turkey/10.htm' }
        },
        {
          id: 'q5',
          text: 'The sultan called the empire\'s first parliament but dissolved it within a year.',
          lang: 'en',
          cite: {
            source: 'loc-turkey-country-study-1995',
            loc: { section: 'External Threats and Internal Transformations', para: '10' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/turkey/10.htm' }
        }
      ]
    }
  ]
})
