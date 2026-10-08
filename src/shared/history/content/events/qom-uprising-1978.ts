import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'qom-uprising-1978',
  names: [
    { text: 'Qom uprising of January 1978', lang: 'en', role: 'primary' },
    { text: 'قیام ۱۹ دی', lang: 'fa', role: 'native', translit: 'Qiyām-e 19 Dey' },
    { text: 'قیام قم', lang: 'fa', role: 'alternative', translit: 'Qiyām-e Qom' }
  ],
  researched: '2026-10-09',
  type: 'uprising',
  start: {
    alts: [
      {
        value: { d: '1978-01-09' },
        cites: [
          {
            source: 'iranica-yarshater-chronology-part-4',
            loc: { section: 'Chronology of Iranian History Part 4, 1978' }
          }
        ]
      },
      {
        value: { d: '1978-01-07' },
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
      }
    ]
  },
  regions: ['iran'],
  prominence: 3,
  places: [
    {
      ref: 'place:qom',
      cites: [
        {
          source: 'iranica-yarshater-chronology-part-4',
          loc: { section: 'Chronology of Iranian History Part 4, 1978' }
        },
        {
          source: 'iranica-algar-khomeini-life',
          loc: { section: 'KHOMEINI i. Life', para: '52' }
        }
      ]
    }
  ],
  partOf: [
    { ref: 'event:iranian-revolution' }
  ],
  participants: [
    {
      ref: 'person:kazem-shariatmadari',
      role: 'participant',
      cites: [
        {
          source: 'loc-iran-country-study-1987',
          loc: { section: 'The Coming of the Revolution', para: '7' }
        }
      ]
    },
    {
      ref: 'person:mohammad-reza-pahlavi',
      role: 'head-of-state',
      cites: [
        {
          source: 'pahlavi-1980-answer-to-history',
          loc: { section: 'The Unholy Alliance of Red and Black' }
        }
      ]
    },
    {
      ref: 'person:ruhollah-khomeini',
      role: 'victim',
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
      key: 'participants',
      value: {
        alts: [
          {
            value: { min: 5000, qualifier: 'about' },
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
      }
    },
    {
      key: 'deaths',
      value: {
        alts: [
          {
            value: { min: 6 },
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
          }
        ]
      }
    }
  ],
  related: [
    {
      ref: 'event:iranian-revolution',
      rel: 'led-to',
      cites: [
        {
          source: 'iranica-algar-khomeini-life',
          loc: { section: 'KHOMEINI i. Life', para: '52' }
        },
        {
          source: 'loc-iran-country-study-1987',
          loc: { section: 'The Coming of the Revolution', para: '7' }
        }
      ]
    }
  ],
  polities: [
    { ref: 'polity:pahlavi-iran' }
  ],
  hero: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/8/81/%D9%85%D8%B5%D8%B7%D9%81%DB%8C_%D9%88_%D8%AE%D9%85%DB%8C%D9%86%DB%8C.JPG',
    page: 'https://commons.wikimedia.org/wiki/File:%D9%85%D8%B5%D8%B7%D9%81%DB%8C_%D9%88_%D8%AE%D9%85%DB%8C%D9%86%DB%8C.JPG',
    credit: {
      institution: 'Imam Khomeini Information Portal (payegah-e ettela-rasani-ye Emam Khomeini)'
    },
    license: { id: 'public-domain' }
  },
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'The protest movement took a new turn in January 1978, when a government-inspired article in Ettelaat, one of the country\'s leading newspapers, cast doubt on Khomeini\'s piety and suggested that he was a British agent. The article caused a scandal in the religious community. Senior clerics, including Ayatollah Kazem Shariatmadari, denounced the article. Seminary students took to the streets in Qom and clashed with police, and several demonstrators were killed.',
          lang: 'en',
          cite: {
            source: 'loc-iran-country-study-1987',
            loc: { section: 'The Coming of the Revolution', para: '7' }
          },
          provenance: { via: 'web', at: '2026-10-09', url: 'http://countrystudies.us/iran/21.htm' }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q2',
          text: '1977 On New Year’s Eve, 1978, President Carter visits the Shah in Tehran and refers to Iran as “an island of stability in a turbulent corner of the world.” Reassured that he enjoys Carter’s support, the Shah orders the publication of a harsh and humiliating newspaper article in the daily Eṭṭelāʿāt about Ayatollah Khomeini.',
          lang: 'en',
          cite: {
            source: 'iranica-yarshater-chronology-part-4',
            loc: { section: 'Chronology of Iranian History Part 4, 1977' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://www.iranicaonline.org/articles/chronology-of-iranian-history-part-4/'
          }
        },
        {
          id: 'q3',
          text: 'The publication of an outrageous article meant to malign the revered \'ulama\' and in particular Imam Khumaynî on 15 Day, 1356 [January 7, 1978] by the ruling regime accelerated the revolutionary movement and caused an outburst of popular outrage across the country.',
          lang: 'en',
          cite: {
            source: 'constitute-iran-constitution-1979-rev-1989',
            loc: { section: 'Preamble' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://www.constituteproject.org/constitution/Iran_1989'
          }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q6',
          text: 'On February 18, mosque services and demonstrations were held in several cities to honor those killed in the Qom demonstrations. In Tabriz these demonstrations turned violent, and it was two days before order could be restored. By the summer, riots and antigovernment demonstrations had swept dozens of towns and cities. Shootings inevitably occurred, and deaths of protesters fueled public feeling against the regime.',
          lang: 'en',
          cite: {
            source: 'loc-iran-country-study-1987',
            loc: { section: 'The Coming of the Revolution', para: '7' }
          },
          provenance: { via: 'web', at: '2026-10-09', url: 'http://countrystudies.us/iran/21.htm' }
        },
        {
          id: 'q7',
          text: 'The seventh-day and fortieth-day commemorations of the martyrs of the Revolution, like a series of steady heartbeats, gave greater vitality, intensity, vigour, and solidarity to this movement all over the country.',
          lang: 'en',
          cite: {
            source: 'constitute-iran-constitution-1979-rev-1989',
            loc: { section: 'Preamble' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://www.constituteproject.org/constitution/Iran_1989'
          }
        }
      ]
    },
    {
      kind: 'in-their-words',
      quotes: [
        {
          id: 'q8',
          text: 'A week later, on January 7, 1978, the first riots erupted in which the clergy were the major source of the agitation. Demonstrators surged through the streets of the holy city of Qom where thousands of pilgrims annually visit the tomb of Massoumeh, the sister of Imam Reza. There is little doubt in my mind that communist elements had infiltrated the 4,000 religious students and their supporters who took part in the protest. I am equally certain that rebellious and dissatisfied mullahs were at the center of the unrest. Six people were killed during the disturbance, a number duly exaggerated in media accounts of the incident to dozens of dead and hundreds of injured.',
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
      ]
    }
  ],
  course: [
    {
      date: {
        alts: [
          {
            value: { d: '1978-01-07' },
            cites: [
              {
                source: 'iranica-algar-khomeini-life',
                loc: { section: 'KHOMEINI i. Life', para: '52' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q9',
        text: 'On 7 January 1978, the semi-official daily newspaper Eṭṭelāʿā t (q.v.) published an article accusing Khomeini of treachery and collusion with foreign enemies, and the next day, a crowd of protesters attacked and ransacked the offices of the newspaper in Tehran.',
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
            value: { d: '1978-01-09' },
            cites: [
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
        text: 'Two days later, a crowd of some five thousand gathered at the shrine of Ḥażrat-e Maʿṣuma in Qom, protesting the insult to Khomeini and demanding fundamental changes in government policy. They were assaulted by the army as they left the shrine, and a large number were killed. Thus began a cycle of massacre and mourning.',
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
    }
  ]
})
