import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'transfer-of-the-capital-to-isfahan',
  names: [
    { text: 'Transfer of the capital to Isfahan', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-13',
  type: 'other',
  start: {
    alts: [
      {
        value: { d: '1598' },
        cites: [
          { source: 'iranica-savory-abbas-i', loc: { section: 'ʿABBĀS I', para: '13' } }
        ],
        heldBy: [
          { kind: 'scholar', name: 'Roger M. Savory', discipline: 'historian' }
        ]
      },
      {
        value: { d: '1597', notAfter: '1598' },
        cites: [
          {
            source: 'iranica-haneda-matthee-isfahan-safavid-period',
            loc: { section: 'ISFAHAN vii. SAFAVID PERIOD', para: '12' }
          }
        ],
        heldBy: [
          { kind: 'scholar', name: 'Masashi Haneda and Rudi Matthee', discipline: 'historian' }
        ]
      }
    ]
  },
  regions: ['iran'],
  prominence: 2,
  places: [
    {
      ref: 'place:isfahan',
      cites: [
        { source: 'iranica-savory-abbas-i', loc: { section: 'ʿABBĀS I', para: '13' } }
      ]
    },
    {
      ref: 'place:qazvin',
      cites: [
        { source: 'iranica-savory-abbas-i', loc: { section: 'ʿABBĀS I', para: '13' } }
      ]
    }
  ],
  polities: [
    {
      ref: 'polity:safavid-iran',
      cites: [
        { source: 'iranica-savory-abbas-i', loc: { section: 'ʿABBĀS I', para: '13' } }
      ]
    }
  ],
  participants: [
    {
      ref: 'person:abbas-i',
      role: 'leader',
      cites: [
        { source: 'iranica-savory-abbas-i', loc: { section: 'ʿABBĀS I', para: '13' } }
      ]
    }
  ],
  related: [
    {
      ref: 'event:transfer-of-the-capital-to-qazvin',
      rel: 'preceded-by',
      cites: [
        {
          source: 'iranica-haneda-matthee-isfahan-safavid-period',
          loc: { section: 'ISFAHAN vii. SAFAVID PERIOD', para: '12' }
        }
      ]
    },
    {
      ref: 'event:building-of-naqsh-e-jahan',
      rel: 'led-to',
      cites: [
        {
          source: 'iranica-babaie-isfahan-x1-historical-survey',
          loc: { section: 'Isfahan x. MONUMENTS (1) A Historical Survey', para: '20' }
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
          text: 'After his victory over the Uzbeks in 1017/1598, Shah ʿAbbās transferred his capital from Qazvīn to Isfahan, which he transformed into one of the most beautiful cities in the world.',
          lang: 'en',
          cite: { source: 'iranica-savory-abbas-i', loc: { section: 'ʿABBĀS I', para: '13' } },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/abbas-i'
          }
        },
        {
          id: 'q2',
          text: 'Most scholars in fact consider this year as the time of transfer of the Safavid capital from Qazvin to Isfahan.',
          lang: 'en',
          cite: {
            source: 'iranica-haneda-matthee-isfahan-safavid-period',
            loc: { section: 'ISFAHAN vii. SAFAVID PERIOD', para: '12' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/isfahan-vii-safavid-period'
          }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q4',
          text: 'The choice of Isfahan as the new administrative and cultural center was based in part on the availability of water—in the form of the Zāyandarud—but was clearly politically motivated as well.',
          lang: 'en',
          cite: {
            source: 'iranica-haneda-matthee-isfahan-safavid-period',
            loc: { section: 'ISFAHAN vii. SAFAVID PERIOD', para: '11' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/isfahan-vii-safavid-period'
          }
        },
        {
          id: 'q5',
          text: 'The city was located deep into the interior and thus far less exposed to the Ottoman threat than Tabriz and even Qazvin had been.',
          lang: 'en',
          cite: {
            source: 'iranica-haneda-matthee-isfahan-safavid-period',
            loc: { section: 'ISFAHAN vii. SAFAVID PERIOD', para: '11' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/isfahan-vii-safavid-period'
          }
        }
      ]
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q6',
          text: 'The decision of Shah ʿAbbās to visit Isfahan in 1590 led to a confrontation, with Yuli Beg retreating into the fortress with his troops.',
          lang: 'en',
          cite: {
            source: 'iranica-haneda-matthee-isfahan-safavid-period',
            loc: { section: 'ISFAHAN vii. SAFAVID PERIOD', para: '9' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/isfahan-vii-safavid-period'
          }
        },
        {
          id: 'q7',
          text: 'That the city grew in importance throughout the 1590s is suggested by the fact that Shah ʿAbbās made the trip to and from Qazvin at least eighteen times in this period and visited Isfahan every year between 1590 and 1603',
          lang: 'en',
          cite: {
            source: 'iranica-haneda-matthee-isfahan-safavid-period',
            loc: { section: 'ISFAHAN vii. SAFAVID PERIOD', para: '12' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/isfahan-vii-safavid-period'
          }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q9',
          text: 'After it became the capital, all coronation ceremonies were held in Isfahan.',
          lang: 'en',
          cite: {
            source: 'iranica-haneda-matthee-isfahan-safavid-period',
            loc: { section: 'ISFAHAN vii. SAFAVID PERIOD', para: '12' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/isfahan-vii-safavid-period'
          }
        },
        {
          id: 'q10',
          text: 'This shifted the capital even farther away from the exposed western frontier, and completed the shift from a Turkish to a Persian cultural focus.',
          lang: 'en',
          cite: {
            source: 'iranica-matthee-safavid-dynasty',
            loc: { section: 'SAFAVID DYNASTY', para: '32' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/safavids'
          }
        },
        {
          id: 'q11',
          text: 'Craftsmen and merchants from all over the country were urged to come to settle in Isfahan.',
          lang: 'en',
          cite: {
            source: 'iranica-haneda-matthee-isfahan-safavid-period',
            loc: { section: 'ISFAHAN vii. SAFAVID PERIOD', para: '15' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/isfahan-vii-safavid-period'
          }
        }
      ]
    }
  ],
  course: [
    {
      date: {
        alts: [
          {
            value: { d: '1588' },
            cites: [
              {
                source: 'iranica-haneda-matthee-isfahan-safavid-period',
                loc: { section: 'ISFAHAN vii. SAFAVID PERIOD', para: '11' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q14',
        text: 'The idea of turning Isfahan into a new capital must have come to Shah ʿAbbās shortly after his accession in 1587, for the first mention of designs for the new Isfahan occurs under 998/1588 in the Afżal al-tawāriḵ',
        lang: 'en',
        cite: {
          source: 'iranica-haneda-matthee-isfahan-safavid-period',
          loc: { section: 'ISFAHAN vii. SAFAVID PERIOD', para: '11' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-13',
          url: 'https://www.iranicaonline.org/articles/isfahan-vii-safavid-period'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1590' },
            cites: [
              {
                source: 'iranica-haneda-matthee-isfahan-safavid-period',
                loc: { section: 'ISFAHAN vii. SAFAVID PERIOD', para: '9' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q15',
        text: 'Shortly thereafter, in early 1590, Isfahan was made crown land again',
        lang: 'en',
        cite: {
          source: 'iranica-haneda-matthee-isfahan-safavid-period',
          loc: { section: 'ISFAHAN vii. SAFAVID PERIOD', para: '9' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-13',
          url: 'https://www.iranicaonline.org/articles/isfahan-vii-safavid-period'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1597', notAfter: '1598' },
            cites: [
              {
                source: 'iranica-haneda-matthee-isfahan-safavid-period',
                loc: { section: 'ISFAHAN vii. SAFAVID PERIOD', para: '12' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q16',
        text: 'Both Eskandar Beg Torkamān and Mollā Jalāl Monajjem tell us that the royal household moved to Isfahan and that Shah ʿAbbās proclaimed the city his capital (maqarr-e dawlat) in 1006/1597-98, giving orders for the erection of “magnificent” buildings',
        lang: 'en',
        cite: {
          source: 'iranica-haneda-matthee-isfahan-safavid-period',
          loc: { section: 'ISFAHAN vii. SAFAVID PERIOD', para: '12' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-13',
          url: 'https://www.iranicaonline.org/articles/isfahan-vii-safavid-period'
        }
      }
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/9/95/Naqsh-e_Jahan_Square_by_Pascal_Coste_1_edited.jpg/1280px-Naqsh-e_Jahan_Square_by_Pascal_Coste_1_edited.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Naqsh-e_Jahan_Square_by_Pascal_Coste_1_edited.jpg',
    credit: { creator: 'Pascal Coste' },
    license: { id: 'public-domain' }
  }
})
