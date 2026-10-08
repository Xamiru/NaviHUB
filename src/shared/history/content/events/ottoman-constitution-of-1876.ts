import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'ottoman-constitution-of-1876',
  names: [
    { text: 'Ottoman constitution of 1876', lang: 'en', role: 'primary' },
    { text: 'Kanûn-ı Esâsî', lang: 'tr', role: 'native' }
  ],
  researched: '2026-10-08',
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
  polities: [
    { ref: 'polity:ottoman-empire' }
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
          text: 'In 1876 the hapless sultan was deposed by a fetva (legal opinion) obtained by Midhat Pasha, a reformist minister sympathetic to the aims of the Young Ottomans. His successor, Abdül Hamid II (r. 1876-1909), came to the throne with the approval of Midhat and other reformers. In December of that year, on the eve of the war with Russia, the new sultan promulgated a constitution, based on European models, that had been drafted by senior political, military, and religious officials under Midhat\'s direction. Embodying the substance of the Young Ottoman program, this document created a representative parliament, guaranteed religious liberty, and provided for enlarged freedom of expression.',
          lang: 'en',
          cite: {
            source: 'loc-turkey-country-study-1995',
            loc: { section: 'External Threats and Internal Transformations', para: '10' }
          },
          provenance: { via: 'web', at: '2026-10-07', url: 'http://countrystudies.us/turkey/10.htm' }
        },
        {
          id: 'q6',
          text: 'Turkey now made a show of going even beyond the demands formulated by Europe, and the international conference which met at Constantinople during ​the last days of 1876 was startled by the salvo of artillery which heralded the promulgation of a liberal constitution, not for the European provinces only, but for the whole empire, and the institution of a Turkish parliament.',
          lang: 'en',
          cite: { source: 'britannica-1911-turkey', loc: { section: 'TURKEY', para: '1442' } },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Turkey'
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
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/8/83/Midah_Pacha_%28i.e._Midhat-Pacha%29_-_btv1b531377226.jpg/1280px-Midah_Pacha_%28i.e._Midhat-Pacha%29_-_btv1b531377226.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Midah_Pacha_(i.e._Midhat-Pacha)_-_btv1b531377226.jpg',
    credit: { institution: 'Bibliothèque nationale de France', creator: 'Atelier Nadar' },
    license: { id: 'public-domain' }
  },
  furtherReading: [
    { source: 'tanor-2020-osmanli-turk-anayasal-gelismeleri', perspective: 'turkish' }
  ]
})
