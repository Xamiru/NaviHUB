import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'iranian-land-reform',
  names: [
    { text: 'Iranian land reform', lang: 'en', role: 'primary' },
    { text: 'اصلاحات ارضی', lang: 'fa', role: 'native' },
    {
      text: 'Land reform of 1962',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'iranica-pesaran-economy-pahlavi',
          loc: { section: 'ECONOMY ix. IN THE PAHLAVI PERIOD', para: '19' }
        }
      ]
    }
  ],
  researched: '2026-10-08',
  type: 'reform',
  start: {
    alts: [
      {
        value: { d: '1962-01-09' },
        cites: [
          {
            source: 'iranica-ehlers-agriculture-in-iran',
            loc: { section: 'AGRICULTURE in Iran', para: '36' }
          }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1972' },
        cites: [
          {
            source: 'iranica-ehlers-agriculture-in-iran',
            loc: { section: 'AGRICULTURE in Iran', para: '51' }
          }
        ]
      }
    ]
  },
  regions: ['iran'],
  prominence: 2,
  partOf: [
    { ref: 'period:reign-of-mohammad-reza-shah' }
  ],
  polities: [
    { ref: 'polity:pahlavi-iran' }
  ],
  participants: [
    {
      ref: 'person:hasan-arsanjani',
      role: 'organizer',
      cites: [
        {
          source: 'iranica-pesaran-economy-pahlavi',
          loc: { section: 'ECONOMY ix. IN THE PAHLAVI PERIOD', para: '19' }
        },
        {
          source: 'iranica-yarshater-chronology-part-3',
          loc: { section: 'Chronology of Iranian History Part 3, 1961-62' }
        }
      ]
    },
    {
      ref: 'person:ali-amini',
      role: 'head-of-government',
      cites: [
        {
          source: 'loc-iran-country-study-1987',
          loc: { section: 'THE SHAH\'S WHITE REVOLUTION', para: '3' }
        }
      ]
    },
    {
      ref: 'person:mohammad-reza-pahlavi',
      role: 'head-of-state',
      cites: [
        {
          source: 'pahlavi-1980-answer-to-history',
          loc: { page: '102', section: 'The White Revolution' }
        }
      ]
    }
  ],
  related: [
    {
      ref: 'event:white-revolution',
      rel: 'followed-by',
      cites: [
        {
          source: 'iranica-pesaran-economy-pahlavi',
          loc: { section: 'ECONOMY ix. IN THE PAHLAVI PERIOD', para: '19' }
        }
      ]
    }
  ],
  hero: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/6/67/Mrplandreform1.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Mrplandreform1.jpg',
    credit: {
      institution: 'Reproduced in Catherine and Jacques Legrand, Shah-i Iran (Creative Publishing International, Minnetonka MN, 1999 Farsi ed.), p.95'
    },
    license: { id: 'public-domain' }
  },
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'In January 1962, in the single most important measure of the fourteen-month Amini government, the cabinet approved a law for land distribution.',
          lang: 'en',
          cite: {
            source: 'loc-iran-country-study-1987',
            loc: { section: 'THE SHAH\'S WHITE REVOLUTION', para: '3' }
          },
          provenance: { via: 'web', at: '2026-10-07', url: 'http://countrystudies.us/iran/18.htm' }
        },
        {
          id: 'q2',
          text: 'In 1961 a new law passed parliament and became effective 9 January 1962. Its main goals were to fix the upper limit of private property at one village and to distribute confiscated lands among sharecroppers, who had to join the newly developed rural cooperatives. Landlords were to be refunded for the expropriated lands in cash or industrial stocks.',
          lang: 'en',
          cite: {
            source: 'iranica-ehlers-agriculture-in-iran',
            loc: { section: 'AGRICULTURE in Iran', para: '36' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://web.archive.org/web/20260726061555/https://www.iranicaonline.org/articles/agriculture-in-iran/'
          }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q3',
          text: 'Obvious deficiencies in the productivity of rural Iran, the manifold social consequences of the unequal distribution of land, and the problems of sharecropping must be seen as the main reason for the implementation of a land reform program, the discussion of which had started by the late 1950s.',
          lang: 'en',
          cite: {
            source: 'iranica-ehlers-agriculture-in-iran',
            loc: { section: 'AGRICULTURE in Iran', para: '36' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://web.archive.org/web/20260726061555/https://www.iranicaonline.org/articles/agriculture-in-iran/'
          }
        }
      ]
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q4',
          text: 'The implementation of the 1962 Land Reform Law covered all estate holdings in excess of one entire village or comprising parts of different villages which could be regarded as equivalent to one whole village. Mechanized farms, tea plantations, fruit orchards, and groves were exempted. Compensation offered to landlords was based on previous tax assessments, and the land obtained by the government was then sold on favorable terms to sharecroppers (Lambton, 1969; Denman; Hooglund).',
          lang: 'en',
          cite: {
            source: 'iranica-pesaran-economy-pahlavi',
            loc: { section: 'ECONOMY ix. IN THE PAHLAVI PERIOD', para: '19' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://www.iranicaonline.org/articles/economy-ix/'
          }
        },
        {
          id: 'q5',
          text: 'Limiting rural property to the size of one village meant the immediate availability of 16,333 villages and 1,001 other estates for redistribution; according to Planck (1975), 777,825 farmers received title to newly assigned lands. Further restrictions on the maximum size of landholdings marked the inauguration of the second phase of the land reform program on 25 July 1964.',
          lang: 'en',
          cite: {
            source: 'iranica-ehlers-agriculture-in-iran',
            loc: { section: 'AGRICULTURE in Iran', para: '36' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://web.archive.org/web/20260726061555/https://www.iranicaonline.org/articles/agriculture-in-iran/'
          }
        },
        {
          id: 'q6',
          text: 'While more than one million farmers benefited from this second phase of the land reform and its regulations (for details see Aresvik 1976, Lambton 1969, Planck 1975), in 1968 a third addition to the existing laws was proclaimed: The maximum size of property was determined by the amount of land which the proprietor and his family could work by themselves. With minor additions and corrections, concerning, e.g., public and religious endowments and their distribution among farmers, one may say that by 1972 the land reform program seemed to have ended.',
          lang: 'en',
          cite: {
            source: 'iranica-ehlers-agriculture-in-iran',
            loc: { section: 'AGRICULTURE in Iran', para: '51' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://web.archive.org/web/20260726061555/https://www.iranicaonline.org/articles/agriculture-in-iran/'
          }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q7',
          text: 'The important results of the first years of the land reform can only be summarized here—initial increases in the income of land recipients due to the abolition of sharecropping, the psychological and political awakening of the rural population, which for the first time had the right to determine land use and crop rotation patterns. But the land reform was not connected with increases in agricultural productivity because of the perpetuation of traditional forms of tools, cultivation techniques, and the absence of aid through cooperatives and agricultural extension services. A special problem turned out to be the Islamic laws of inheritance, as a result of which many of the new small holdings were fragmented only a few years after their foundation. It seems that this factor has contributed considerably to the rapid decrease of viable farm units. Renewed indebtedness of farmers to urban shopkeepers and former landlords and the final takeover of their lands by these persons became common.',
          lang: 'en',
          cite: {
            source: 'iranica-ehlers-agriculture-in-iran',
            loc: { section: 'AGRICULTURE in Iran', para: '51' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://web.archive.org/web/20260726061555/https://www.iranicaonline.org/articles/agriculture-in-iran/'
          }
        }
      ]
    },
    {
      kind: 'in-their-words',
      quotes: [
        {
          id: 'q8',
          text: 'Agrarian reform was carried out in three stages. First, no landowner could own more than one village. Peasants who worked the land had the right to buy the surplus with loans repayable over 15 years.',
          lang: 'en',
          cite: {
            source: 'pahlavi-1980-answer-to-history',
            loc: { page: '103', section: 'The White Revolution' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://archive.org/download/answer-to-history-by-shah-mohammad-reza-pahlavi/Answer%20to%20History%20by%20Shah%20Mohammad%20Reza%20Pahlavi_djvu.txt'
          }
        }
      ]
    }
  ],
  furtherReading: [
    { source: 'pahlavi-1967-enqelab-e-sefid', perspective: 'iranian' }
  ]
})
