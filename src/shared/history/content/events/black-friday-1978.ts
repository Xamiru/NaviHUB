import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'black-friday-1978',
  names: [
    { text: 'Black Friday', lang: 'en', role: 'primary' },
    {
      text: 'Jaleh Square massacre',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'loc-iran-country-study-1987',
          loc: { section: 'The Coming of the Revolution', para: '9' }
        }
      ]
    },
    { text: 'جمعه سیاه', lang: 'fa', role: 'native', translit: 'Jomʿa-ye siyāh' },
    {
      text: 'کشتار میدان ژاله',
      lang: 'fa',
      role: 'alternative',
      translit: 'Koštār-e Meydān-e Žāla'
    }
  ],
  researched: '2026-10-09',
  type: 'massacre',
  start: {
    alts: [
      {
        value: { d: '1978-09-08' },
        cites: [
          {
            source: 'iranica-yarshater-chronology-part-4',
            loc: { section: 'Chronology of Iranian History Part 4, 1978' }
          },
          {
            source: 'iranica-algar-khomeini-life',
            loc: { section: 'KHOMEINI i. Life', para: '52' }
          },
          {
            source: 'loc-iran-country-study-1987',
            loc: { section: 'The Coming of the Revolution', para: '9' }
          },
          {
            source: 'iranica-yarshater-iranian-history-islamic-period-6',
            loc: {
              section: 'IRAN ii. IRANIAN HISTORY (2) Islamic period, Moḥammad Reza Shah (1941-79)'
            }
          }
        ]
      }
    ]
  },
  regions: ['iran'],
  prominence: 2,
  places: [
    {
      ref: 'place:tehran',
      cites: [
        {
          source: 'iranica-yarshater-chronology-part-4',
          loc: { section: 'Chronology of Iranian History Part 4, 1978' }
        }
      ]
    },
    {
      ref: 'place:jaleh-square',
      cites: [
        {
          source: 'iranica-algar-khomeini-life',
          loc: { section: 'KHOMEINI i. Life', para: '52' }
        },
        {
          source: 'loc-iran-country-study-1987',
          loc: { section: 'The Coming of the Revolution', para: '9' }
        }
      ]
    }
  ],
  partOf: [
    { ref: 'event:iranian-revolution' }
  ],
  sides: [
    {
      key: 'demonstrators',
      name: 'Demonstrators',
      cites: [
        {
          source: 'iranica-yarshater-chronology-part-4',
          loc: { section: 'Chronology of Iranian History Part 4, 1978' }
        },
        {
          source: 'loc-iran-country-study-1987',
          loc: { section: 'The Coming of the Revolution', para: '9' }
        }
      ]
    },
    {
      key: 'troops',
      name: 'Imperial troops under martial law',
      cites: [
        {
          source: 'loc-iran-country-study-1987',
          loc: { section: 'The Coming of the Revolution', para: '9' }
        },
        {
          source: 'pahlavi-1980-answer-to-history',
          loc: { section: 'The Unholy Alliance of Red and Black' }
        }
      ],
      polity: 'polity:pahlavi-iran'
    }
  ],
  participants: [
    {
      ref: 'person:jafar-sharif-emami',
      role: 'head-of-government',
      side: 'troops',
      cites: [
        {
          source: 'iranica-yarshater-chronology-part-4',
          loc: { section: 'Chronology of Iranian History Part 4, 1978' }
        },
        {
          source: 'pahlavi-1980-answer-to-history',
          loc: { section: 'The Unholy Alliance of Red and Black' }
        }
      ]
    },
    {
      ref: 'person:mohammad-reza-pahlavi',
      role: 'head-of-state',
      side: 'troops',
      cites: [
        {
          source: 'iranica-algar-khomeini-life',
          loc: { section: 'KHOMEINI i. Life', para: '52' }
        }
      ]
    }
  ],
  figures: [
    {
      key: 'deaths',
      value: {
        alts: [
          {
            value: { min: 87 },
            cites: [
              {
                source: 'loc-iran-country-study-1987',
                loc: { section: 'The Coming of the Revolution', para: '9' }
              }
            ],
            heldBy: [
              { kind: 'state', name: 'Imperial State of Iran' }
            ]
          },
          {
            value: { min: 86 },
            cites: [
              {
                source: 'pahlavi-1980-answer-to-history',
                loc: { section: 'The Unholy Alliance of Red and Black' }
              }
            ],
            heldBy: [
              {
                kind: 'participant',
                name: 'Mohammad Reza Pahlavi',
                ref: 'person:mohammad-reza-pahlavi'
              }
            ]
          },
          {
            value: { min: 164, qualifier: 'about' },
            cites: [
              {
                source: 'iranica-yarshater-chronology-part-4',
                loc: { section: 'Chronology of Iranian History Part 4, 1978' }
              }
            ],
            heldBy: [
              { kind: 'scholar', name: 'Ehsan Yarshater' }
            ]
          },
          {
            value: { min: 2000, qualifier: 'about' },
            cites: [
              {
                source: 'iranica-algar-khomeini-life',
                loc: { section: 'KHOMEINI i. Life', para: '52' }
              }
            ],
            heldBy: [
              { kind: 'scholar', name: 'Hamid Algar' }
            ]
          },
          {
            value: { min: 8000 },
            cites: [
              {
                source: 'iranica-yarshater-chronology-part-4',
                loc: { section: 'Chronology of Iranian History Part 4, 1978' }
              }
            ],
            heldBy: [
              { kind: 'public', name: 'Revolutionary propaganda of 1978' }
            ]
          }
        ]
      }
    }
  ],
  related: [
    {
      ref: 'event:iranian-revolution',
      rel: 'contributed-to',
      cites: [
        {
          source: 'loc-iran-country-study-1987',
          loc: { section: 'The Coming of the Revolution', para: '9' }
        }
      ]
    },
    {
      ref: 'event:cinema-rex-fire',
      rel: 'preceded-by',
      cites: [
        {
          source: 'iranica-yarshater-chronology-part-4',
          loc: { section: 'Chronology of Iranian History Part 4, 1978' }
        },
        {
          source: 'iranica-yarshater-chronology-part-4',
          loc: { section: 'Chronology of Iranian History Part 4, 1978' }
        }
      ]
    }
  ],
  polities: [
    { ref: 'polity:pahlavi-iran' }
  ],
  hero: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/8/84/Black_Friday_in_Tehran.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Black_Friday_in_Tehran.jpg',
    credit: {
      institution: 'BBC Persian (bbc.com/persian/iran-features-45458721), as stated on the Commons file page'
    },
    license: { id: 'public-domain' }
  },
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'The government declared martial law in Tehran and eleven other cities on the night of September 7-8, 1978. The next day, troops fired into a crowd of demonstrators at Tehran\'s Jaleh Square. A large number of protesters, certainly many more than the official figure of eighty-seven, were killed. The Jaleh Square shooting came to be known as "Black Friday."',
          lang: 'en',
          cite: {
            source: 'loc-iran-country-study-1987',
            loc: { section: 'The Coming of the Revolution', para: '9' }
          },
          provenance: { via: 'web', at: '2026-10-09', url: 'http://countrystudies.us/iran/21.htm' }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q4',
          text: 'On September 4, more than 100,000 took part in the public prayers to mark the end of Ramazan, the Muslim fasting month. The ceremony became an occasion for antigovernment demonstrations that continued for the next two days, growing larger and more radical in composition and in the slogans of the participants.',
          lang: 'en',
          cite: {
            source: 'loc-iran-country-study-1987',
            loc: { section: 'The Coming of the Revolution', para: '9' }
          },
          provenance: { via: 'web', at: '2026-10-09', url: 'http://countrystudies.us/iran/21.htm' }
        }
      ]
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q7',
          text: 'In Persia the anti-regime sentiment kept growing and was heightened when on Friday, 8 September 1978, police opened fire on a pro-Khomeini demonstration in Tehran where a number of people were killed.',
          lang: 'en',
          cite: {
            source: 'iranica-yarshater-iranian-history-islamic-period-6',
            loc: {
              section: 'IRAN ii. IRANIAN HISTORY (2) Islamic period, Moḥammad Reza Shah (1941-79)'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://www.iranicaonline.org/articles/iran-ii2-islamic-period-page-6/'
          }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q8',
          text: 'The Jaleh Square shooting came to be known as "Black Friday." It considerably radicalized the opposition movement and made compromise with the regime, even by the moderates, less likely.',
          lang: 'en',
          cite: {
            source: 'loc-iran-country-study-1987',
            loc: { section: 'The Coming of the Revolution', para: '9' }
          },
          provenance: { via: 'web', at: '2026-10-09', url: 'http://countrystudies.us/iran/21.htm' }
        }
      ]
    }
  ],
  course: [
    {
      date: {
        alts: [
          {
            value: { d: '1978-09-04' },
            cites: [
              {
                source: 'iranica-yarshater-chronology-part-4',
                loc: { section: 'Chronology of Iranian History Part 4, 1978' }
              },
              {
                source: 'loc-iran-country-study-1987',
                loc: { section: 'The Coming of the Revolution', para: '9' }
              },
              {
                source: 'iranica-algar-khomeini-life',
                loc: { section: 'KHOMEINI i. Life', para: '52' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q10',
        text: 'On 4 September, on the occasion of ʿId-e Feṭr, marches took place in all the major cities of Iran, and five days later martial law was proclaimed.',
        lang: 'en',
        cite: {
          source: 'iranica-algar-khomeini-life',
          loc: { section: 'KHOMEINI i. Life', para: '52' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-09',
          url: 'https://web.archive.org/web/20260928150602/https://www.iranicaonline.org/articles/khomeini-i-life/'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1978-09-08' },
            cites: [
              {
                source: 'loc-iran-country-study-1987',
                loc: { section: 'The Coming of the Revolution', para: '9' }
              },
              {
                source: 'pahlavi-1980-answer-to-history',
                loc: { section: 'The Unholy Alliance of Red and Black' }
              }
            ],
            heldBy: [
              { kind: 'organization', name: 'Library of Congress, Federal Research Division' },
              {
                kind: 'participant',
                name: 'Mohammad Reza Pahlavi',
                ref: 'person:mohammad-reza-pahlavi'
              }
            ]
          },
          {
            value: { d: '1978-09-09' },
            cites: [
              {
                source: 'iranica-algar-khomeini-life',
                loc: { section: 'KHOMEINI i. Life', para: '52' }
              }
            ],
            heldBy: [
              { kind: 'scholar', name: 'Hamid Algar' }
            ]
          }
        ]
      },
      quote: {
        id: 'q11',
        text: 'Emami was forced to impose martial law in Teheran.',
        lang: 'en',
        cite: {
          source: 'pahlavi-1980-answer-to-history',
          loc: { section: 'The Unholy Alliance of Red and Black' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-09',
          url: 'https://archive.org/download/answer-to-history-by-shah-mohammad-reza-pahlavi/Answer%20to%20History%20by%20Shah%20Mohammad%20Reza%20Pahlavi_djvu.txt'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1978-09-10' },
            cites: [
              {
                source: 'pahlavi-1980-answer-to-history',
                loc: { section: 'The Unholy Alliance of Red and Black' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q12',
        text: 'Accordingly, on September 10, Emami requested and received the required approval—for eleven other cities as well as Teheran. That very day he and his cabinet also were given a vote of confidence by the Majlis.',
        lang: 'en',
        cite: {
          source: 'pahlavi-1980-answer-to-history',
          loc: { section: 'The Unholy Alliance of Red and Black' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-09',
          url: 'https://archive.org/download/answer-to-history-by-shah-mohammad-reza-pahlavi/Answer%20to%20History%20by%20Shah%20Mohammad%20Reza%20Pahlavi_djvu.txt'
        }
      }
    }
  ]
})
