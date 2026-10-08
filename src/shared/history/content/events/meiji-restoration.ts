import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'meiji-restoration',
  names: [
    { text: 'Meiji Restoration', lang: 'en', role: 'primary' },
    { text: '明治維新', lang: 'ja', role: 'native' }
  ],
  researched: '2026-10-08',
  type: 'revolution',
  start: {
    alts: [
      {
        value: { d: '1868-01-03' },
        cites: [
          {
            source: 'loc-japan-country-study-1994',
            loc: { section: 'Decline of the Tokugawa', para: '9' }
          }
        ]
      }
    ]
  },
  regions: ['east-asia'],
  prominence: 1,
  places: [
    {
      ref: 'place:kyoto',
      cites: [
        {
          source: 'loc-japan-country-study-1994',
          loc: { section: 'THE EMERGENCE OF MODERN JAPAN: The Meiji Restoration', para: '3' }
        }
      ]
    },
    {
      ref: 'place:edo',
      cites: [
        {
          source: 'loc-japan-country-study-1994',
          loc: { section: 'THE EMERGENCE OF MODERN JAPAN: The Meiji Restoration', para: '3' }
        }
      ]
    }
  ],
  polities: [
    { ref: 'polity:empire-of-japan' }
  ],
  participants: [
    {
      ref: 'person:emperor-meiji',
      role: 'head-of-state',
      cites: [
        {
          source: 'loc-japan-country-study-1994',
          loc: { section: 'Decline of the Tokugawa', para: '9' }
        }
      ]
    },
    {
      name: 'Tokugawa Yoshinobu (Keiki)',
      role: 'leader',
      cites: [
        {
          source: 'loc-japan-country-study-1994',
          loc: { section: 'Decline of the Tokugawa', para: '9' }
        }
      ]
    },
    {
      name: 'Okubo Toshimichi',
      role: 'leader',
      cites: [
        {
          source: 'loc-japan-country-study-1994',
          loc: { section: 'THE EMERGENCE OF MODERN JAPAN: The Meiji Restoration', para: '5' }
        }
      ]
    },
    {
      ref: 'person:saigo-takamori',
      role: 'leader',
      cites: [
        {
          source: 'loc-japan-country-study-1994',
          loc: { section: 'THE EMERGENCE OF MODERN JAPAN: The Meiji Restoration', para: '5' }
        }
      ]
    },
    {
      name: 'Kido Koin',
      role: 'leader',
      cites: [
        {
          source: 'loc-japan-country-study-1994',
          loc: { section: 'THE EMERGENCE OF MODERN JAPAN: The Meiji Restoration', para: '5' }
        }
      ]
    },
    {
      name: 'Iwakura Tomomi',
      role: 'leader',
      cites: [
        {
          source: 'loc-japan-country-study-1994',
          loc: { section: 'THE EMERGENCE OF MODERN JAPAN: The Meiji Restoration', para: '5' }
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
          text: 'Those people who wanted to end Tokugawa rule did not envision a new government or a new society; they merely sought the transfer of power from Edo to Kyoto while retaining all their feudal prerogatives. Instead, a profound change took place. The emperor emerged as a national symbol of unity in the midst of reforms that were much more radical than had been envisioned.',
          lang: 'en',
          cite: {
            source: 'loc-japan-country-study-1994',
            loc: { section: 'THE EMERGENCE OF MODERN JAPAN: The Meiji Restoration', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-07', url: 'http://countrystudies.us/japan/22.htm' }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q3',
          text: 'The strong measures the bakufu took to reassert its dominance were not enough.',
          lang: 'en',
          cite: {
            source: 'loc-japan-country-study-1994',
            loc: { section: 'Decline of the Tokugawa', para: '9' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/japan/21.htm' }
        },
        {
          id: 'q4',
          text: 'Foreign naval retaliation led to still another concessionary commercial treaty in 1865, but Yoshitomi was unable to enforce the Western treaties. A bakufu army was defeated when it was sent to crush dissent in Satsuma and Choshu han in 1866.',
          lang: 'en',
          cite: {
            source: 'loc-japan-country-study-1994',
            loc: { section: 'Decline of the Tokugawa', para: '9' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/japan/21.htm' }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q5',
          text: 'To further dramatize the new order, the capital was relocated from Kyoto, where it had been situated since 794, to Tokyo (Eastern Capital), the new name for Edo.',
          lang: 'en',
          cite: {
            source: 'loc-japan-country-study-1994',
            loc: { section: 'THE EMERGENCE OF MODERN JAPAN: The Meiji Restoration', para: '3' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/japan/22.htm' }
        },
        {
          id: 'q6',
          text: 'The han were replaced with prefectures in 1871, and authority continued to flow to the national government.',
          lang: 'en',
          cite: {
            source: 'loc-japan-country-study-1994',
            loc: { section: 'THE EMERGENCE OF MODERN JAPAN: The Meiji Restoration', para: '3' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/japan/22.htm' }
        },
        {
          id: 'q7',
          text: 'To achieve these reforms, the old Tokugawa class system of samurai, farmer, artisan, and merchant was abolished by 1871, and, even though old prejudices and status consciousness continued, all were theoretically equal before the law.',
          lang: 'en',
          cite: {
            source: 'loc-japan-country-study-1994',
            loc: { section: 'THE EMERGENCE OF MODERN JAPAN: The Meiji Restoration', para: '7' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/japan/22.htm' }
        }
      ]
    }
  ],
  course: [
    {
      date: {
        alts: [
          {
            value: { d: '1867' },
            cites: [
              {
                source: 'loc-japan-country-study-1994',
                loc: { section: 'Decline of the Tokugawa', para: '9' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q8',
        text: 'Keiki accepted the plan in late 1867 and resigned, announcing an "imperial restoration."',
        lang: 'en',
        cite: {
          source: 'loc-japan-country-study-1994',
          loc: { section: 'Decline of the Tokugawa', para: '9' }
        },
        provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/japan/21.htm' }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1868-01-03' },
            cites: [
              {
                source: 'loc-japan-country-study-1994',
                loc: { section: 'Decline of the Tokugawa', para: '9' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q9',
        text: 'The Satsuma, Choshu, and other han leaders and radical courtiers, however, rebelled, seized the imperial palace, and announced their own restoration on January 3, 1868.',
        lang: 'en',
        cite: {
          source: 'loc-japan-country-study-1994',
          loc: { section: 'Decline of the Tokugawa', para: '9' }
        },
        provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/japan/21.htm' }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1868' },
            cites: [
              {
                source: 'loc-japan-country-study-1994',
                loc: { section: 'THE EMERGENCE OF MODERN JAPAN: The Meiji Restoration', para: '2' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q10',
        text: 'The first reform was the promulgation of the Charter Oath in 1868, a general statement of the aims of the Meiji leaders to boost morale and win financial support for the new government.',
        lang: 'en',
        cite: {
          source: 'loc-japan-country-study-1994',
          loc: { section: 'THE EMERGENCE OF MODERN JAPAN: The Meiji Restoration', para: '2' }
        },
        provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/japan/22.htm' }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1868-11' },
            cites: [
              {
                source: 'loc-japan-country-study-1994',
                loc: { section: 'Decline of the Tokugawa', para: '9' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q11',
        text: 'The bakufu was abolished, Keiki was reduced to the ranks of the common daimyo, and the Tokugawa army gave up without a fight (although other Tokugawa forces fought until November 1868, and bakufu naval forces continued to hold out for another six months).',
        lang: 'en',
        cite: {
          source: 'loc-japan-country-study-1994',
          loc: { section: 'Decline of the Tokugawa', para: '9' }
        },
        provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/japan/21.htm' }
      }
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/1/16/Mutsuhito%2C_The_Meiji_Emperor_MET_DT8575.jpg/1280px-Mutsuhito%2C_The_Meiji_Emperor_MET_DT8575.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Mutsuhito,_The_Meiji_Emperor_MET_DT8575.jpg',
    credit: { institution: 'Metropolitan Museum of Art', creator: 'Uchida Kuichi' },
    license: { id: 'cc0' }
  },
  furtherReading: [
    { source: 'inoue-1951-nihon-gendaishi-meiji-ishin', perspective: 'japanese' },
    { source: 'mitani-2017-ishinshi-saiko', perspective: 'japanese' }
  ]
})
