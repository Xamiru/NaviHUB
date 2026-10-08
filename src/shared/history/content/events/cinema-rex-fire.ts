import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'cinema-rex-fire',
  names: [
    { text: 'Cinema Rex fire', lang: 'en', role: 'primary' },
    {
      text: 'Rex Cinema fire',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'loc-iran-country-study-1987',
          loc: { section: 'The Coming of the Revolution', para: '9' }
        }
      ]
    },
    {
      text: 'آتش‌سوزی سینما رکس آبادان',
      lang: 'fa',
      role: 'native',
      translit: 'Ātaš-suzi-ye sinemā Reks-e Ābādān'
    }
  ],
  researched: '2026-10-09',
  type: 'disaster',
  start: {
    alts: [
      {
        value: { d: '1978-08-20' },
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
        value: { d: '1978-08-19' },
        cites: [
          {
            source: 'cinema-iranica-parniani-abbasi-cinema-through-the-eyes-of-the-press',
            loc: {
              section: 'Iranian Cinema Through the Eyes of the Press: 1950s–1990s',
              para: '47'
            }
          },
          {
            source: 'pahlavi-1980-answer-to-history',
            loc: { section: 'The Unholy Alliance of Red and Black' }
          }
        ],
        heldBy: [
          { kind: 'scholar', name: 'Milad Parniani' },
          { kind: 'scholar', name: 'Javad Abbasi' },
          {
            kind: 'participant',
            name: 'Mohammad Reza Pahlavi',
            ref: 'person:mohammad-reza-pahlavi'
          }
        ]
      }
    ]
  },
  regions: ['iran'],
  prominence: 2,
  places: [
    {
      ref: 'place:abadan',
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
    }
  ],
  partOf: [
    { ref: 'event:iranian-revolution' }
  ],
  figures: [
    {
      key: 'deaths',
      value: {
        alts: [
          {
            value: { min: 400, qualifier: 'over' },
            cites: [
              {
                source: 'iranica-yarshater-chronology-part-4',
                loc: { section: 'Chronology of Iranian History Part 4, 1978' }
              },
              {
                source: 'loc-iran-country-study-1987',
                loc: { section: 'The Coming of the Revolution', para: '9' }
              }
            ],
            heldBy: [
              { kind: 'scholar', name: 'Ehsan Yarshater' },
              { kind: 'organization', name: 'Library of Congress, Federal Research Division' }
            ]
          },
          {
            value: { min: 477 },
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
            value: { min: 377 },
            cites: [
              {
                source: 'cinema-iranica-parniani-abbasi-cinema-through-the-eyes-of-the-press',
                loc: {
                  section: 'Iranian Cinema Through the Eyes of the Press: 1950s–1990s',
                  para: '84'
                }
              }
            ],
            heldBy: [
              { kind: 'media', name: 'Khurāsān (newspaper)' }
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
      ref: 'event:black-friday-1978',
      rel: 'followed-by',
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
    url: 'https://upload.wikimedia.org/wikipedia/commons/d/da/Cinemarex6.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Cinemarex6.jpg',
    credit: { institution: 'alefbe.com (rexbild6.jpg), newspaper headline of August 1978' },
    license: { id: 'public-domain' }
  },
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'The government\'s position deteriorated further in August 1978, when more than 400 people died in a fire at the Rex Cinema in Abadan.',
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
          id: 'q3',
          text: 'The protesters used a form of calculated violence to achieve their ends, attacking and destroying carefully selected targets that represented objectionable features of the regime: nightclubs and cinemas as symbols of moral corruption and the influence of Western culture; banks as symbols of economic exploitation; Rastakhiz (the party created by the shah in 1975 to run a one-party state) offices; and police stations as symbols of political repression.',
          lang: 'en',
          cite: {
            source: 'loc-iran-country-study-1987',
            loc: { section: 'The Coming of the Revolution', para: '8' }
          },
          provenance: { via: 'web', at: '2026-10-09', url: 'http://countrystudies.us/iran/21.htm' }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q7',
          text: 'Following the Rex Cinema fire, the shah removed Amuzegar and named Jafar Sharif-Emami prime minister.',
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
            value: { d: '1978-08-19' },
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
        id: 'q4',
        text: 'On August 19, fire swept a cinema in Abadan killing 477 people. Many were burned alive, others asphyxiated.',
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
            value: { d: '1978-08-20' },
            cites: [
              {
                source: 'iranica-yarshater-chronology-part-4',
                loc: { section: 'Chronology of Iranian History Part 4, 1978' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q8',
        text: 'A fire at the Rex theater in Abadan results in over 400 fatalities; at the time the fire is largely blamed on SAVAK, the government’s intelligence bureau, leading to a snowballing of protest against the regime, but after the Revolution it was proved to have been started by a religious group.',
        lang: 'en',
        cite: {
          source: 'iranica-yarshater-chronology-part-4',
          loc: { section: 'Chronology of Iranian History Part 4, 1978' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-09',
          url: 'https://www.iranicaonline.org/articles/chronology-of-iranian-history-part-4/'
        }
      }
    }
  ]
})
