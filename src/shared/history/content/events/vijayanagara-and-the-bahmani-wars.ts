import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'vijayanagara-and-the-bahmani-wars',
  names: [
    { text: 'Vijayanagara and the Bahmani wars', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-16',
  type: 'war',
  start: {
    alts: [
      {
        value: { d: '1347' },
        cites: [
          {
            source: 'loc-india-country-study-1995',
            loc: { section: 'Southern Dynasties', para: '1' }
          }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1565' },
        cites: [
          {
            source: 'loc-india-country-study-1995',
            loc: { section: 'Southern Dynasties', para: '3' }
          },
          { source: 'britannica-1911-vijayanagar', loc: { section: 'Vijayanagar', para: '1' } }
        ]
      }
    ]
  },
  regions: ['south-asia'],
  prominence: 3,
  places: [
    {
      ref: 'place:hampi',
      cites: [
        {
          source: 'loc-india-country-study-1995',
          loc: { section: 'Southern Dynasties', para: '2' }
        },
        { source: 'britannica-1911-vijayanagar', loc: { section: 'Vijayanagar', para: '1' } }
      ]
    }
  ],
  polities: [
    {
      ref: 'polity:vijayanagara-empire',
      cites: [
        {
          source: 'loc-india-country-study-1995',
          loc: { section: 'Southern Dynasties', para: '2' }
        }
      ]
    }
  ],
  sides: [
    {
      key: 'vijayanagara',
      name: 'Vijayanagar',
      polity: 'polity:vijayanagara-empire',
      cites: [
        {
          source: 'loc-india-country-study-1995',
          loc: { section: 'Southern Dynasties', para: '2' }
        }
      ]
    },
    {
      key: 'bahmani',
      name: 'Bahmani Sultanate',
      cites: [
        {
          source: 'loc-india-country-study-1995',
          loc: { section: 'Southern Dynasties', para: '1' }
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
          text: 'The sultans\' failure to hold securely the Deccan and South India resulted in the rise of competing southern dynasties: the Muslim Bahmani Sultanate (1347-1527) and the Hindu Vijayanagar Empire (1336-1565).',
          lang: 'en',
          cite: {
            source: 'loc-india-country-study-1995',
            loc: { section: 'Southern Dynasties', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-16', url: 'http://countrystudies.us/india/11.htm' }
        },
        {
          id: 'q2',
          text: 'Political rivalry between the Bahmani and the Vijayanagar rulers involved control over the Krishna-Tunghabadhra river basin, which shifted hands depending on whose military was superior at any given time.',
          lang: 'en',
          cite: {
            source: 'loc-india-country-study-1995',
            loc: { section: 'Southern Dynasties', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-16', url: 'http://countrystudies.us/india/11.htm' }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q3',
          text: 'At the beginning of the 14th century Mahommedan raiders had effectually destroyed every Hindu principality throughout southern India, but did not attempt to occupy the country permanently.',
          lang: 'en',
          cite: { source: 'britannica-1911-vijayanagar', loc: { section: 'Vijayanagar', para: '1' } },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Vijayanagar'
          }
        },
        {
          id: 'q4',
          text: 'In this state of desolation Hindu nationality rose again under two brothers, named Harihara and Bukka, of whom little more can be said than that they were Kanarese by race.',
          lang: 'en',
          cite: { source: 'britannica-1911-vijayanagar', loc: { section: 'Vijayanagar', para: '1' } },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Vijayanagar'
          }
        }
      ]
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q5',
          text: 'Within thirty years the Hindu Rayas of Vijayanagar were able to hold their own against the Bahmani sultans, who had now established their independence of Delhi in the Deccan proper.',
          lang: 'en',
          cite: { source: 'britannica-1911-vijayanagar', loc: { section: 'Vijayanagar', para: '1' } },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Vijayanagar'
          }
        },
        {
          id: 'q6',
          text: 'Warfare with the Mahommedans across the border in the Raichur doab was carried on almost unceasingly, and with varying result.',
          lang: 'en',
          cite: { source: 'britannica-1911-vijayanagar', loc: { section: 'Vijayanagar', para: '1' } },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Vijayanagar'
          }
        },
        {
          id: 'q7',
          text: 'The Vijayanagar rulers\' capacity for gaining victory over their enemies was contingent on ensuring a constant supply of horses--initially through Arab traders but later through the Portuguese--and maintaining internal roads and communication networks.',
          lang: 'en',
          cite: {
            source: 'loc-india-country-study-1995',
            loc: { section: 'Southern Dynasties', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-16', url: 'http://countrystudies.us/india/11.htm' }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q8',
          text: 'The Bahmani Sultanate, located in the northern Deccan, lasted for almost two centuries, until it fragmented into five smaller states in 1527.',
          lang: 'en',
          cite: {
            source: 'loc-india-country-study-1995',
            loc: { section: 'Southern Dynasties', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-16', url: 'http://countrystudies.us/india/11.htm' }
        }
      ]
    }
  ],
  course: [
    {
      date: {
        alts: [
          {
            value: { d: '1347' },
            cites: [
              {
                source: 'loc-india-country-study-1995',
                loc: { section: 'Southern Dynasties', para: '1' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q9',
        text: 'Zafar Khan, a former provincial governor under the Tughluqs, revolted against his Turkic overlord and proclaimed himself sultan, taking the title Ala-ud-Din Bahman Shah in 1347.',
        lang: 'en',
        cite: {
          source: 'loc-india-country-study-1995',
          loc: { section: 'Southern Dynasties', para: '1' }
        },
        provenance: { via: 'web', at: '2026-10-16', url: 'http://countrystudies.us/india/11.htm' }
      }
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/e/e0/Hampi%2C_Vittala_Temple%2C_chariot_%289881832023%29.jpg/1280px-Hampi%2C_Vittala_Temple%2C_chariot_%289881832023%29.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Hampi,_Vittala_Temple,_chariot_(9881832023).jpg',
    credit: { creator: 'Arian Zwegers' },
    license: { id: 'cc-by', version: '2.0', url: 'https://creativecommons.org/licenses/by/2.0' }
  }
})
