import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'hafte-tir-bombing',
  names: [
    { text: 'Hafte Tir bombing', lang: 'en', role: 'primary' },
    { text: 'انفجار هفتم تیر', lang: 'fa', role: 'native' },
    { text: 'فاجعه هفتم تیر', lang: 'fa', role: 'alternative' },
    {
      text: 'Bombing of the Islamic Republican Party headquarters',
      lang: 'en',
      role: 'alternative'
    }
  ],
  researched: '2026-10-09',
  type: 'assassination',
  start: {
    alts: [
      {
        value: { d: '1981-06-28' },
        cites: [
          {
            source: 'loc-iran-country-study-1987',
            loc: { section: 'TERROR AND REPRESSION', para: '3' }
          },
          {
            source: 'iranica-algar-khomeini-life',
            loc: { section: 'KHOMEINI i. Life', para: '80' }
          }
        ]
      }
    ]
  },
  regions: ['iran'],
  prominence: 2,
  places: [],
  polities: [
    {
      ref: 'polity:islamic-republic-of-iran',
      cites: [
        {
          source: 'loc-iran-country-study-1987',
          loc: { section: 'TERROR AND REPRESSION', para: '3' }
        }
      ]
    }
  ],
  participants: [
    {
      ref: 'person:mohammad-beheshti',
      role: 'victim',
      cites: [
        {
          source: 'loc-iran-country-study-1987',
          loc: { section: 'TERROR AND REPRESSION', para: '3' }
        },
        {
          source: 'iranica-algar-khomeini-life',
          loc: { section: 'KHOMEINI i. Life', para: '80' }
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
            value: { min: 73 },
            cites: [
              {
                source: 'loc-iran-country-study-1987',
                loc: { section: 'TERROR AND REPRESSION', para: '3' }
              }
            ],
            heldBy: [
              { kind: 'organization', name: 'Federal Research Division, Library of Congress' },
              { kind: 'organization', name: 'Imam Khomeini website (en.imam-khomeini.ir)' }
            ]
          }
        ]
      }
    }
  ],
  related: [
    {
      ref: 'event:impeachment-of-abolhassan-banisadr',
      rel: 'preceded-by',
      cites: [
        {
          source: 'iranica-algar-khomeini-life',
          loc: { section: 'KHOMEINI i. Life', para: '80' }
        }
      ]
    },
    {
      ref: 'event:prime-ministers-office-bombing-1981',
      rel: 'followed-by',
      cites: [
        {
          source: 'loc-iran-country-study-1987',
          loc: { section: 'TERROR AND REPRESSION', para: '4' }
        }
      ]
    },
    { ref: 'event:iran-iraq-war', rel: 'related' }
  ],
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'On June 28, 1981, a powerful bomb exploded at the headquarters of the IRP while a meeting of party leaders was in progress.',
          lang: 'en',
          cite: {
            source: 'loc-iran-country-study-1987',
            loc: { section: 'TERROR AND REPRESSION', para: '3' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/iran/26.htm' }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q2',
          text: 'Opposed to the constitution approved in the referendum of December 1979, it made common cause with Bani-Ṣadr. In June 1981 it organized demonstrations in his support, and on 21 June, the day of his impeachment, endorsed his call for a mass uprising against the government',
          lang: 'en',
          cite: {
            source: 'iranica-algar-khomeini-life',
            loc: { section: 'KHOMEINI i. Life', para: '80' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://web.archive.org/web/20260928150602/https://www.iranicaonline.org/articles/khomeini-i-life/'
          }
        },
        {
          id: 'q3',
          text: 'Following the fall of Bani Sadr, opposition elements attempted to reorganize and to overthrow the government by force. The government responded with a policy of repression and terror.',
          lang: 'en',
          cite: {
            source: 'loc-iran-country-study-1987',
            loc: { section: 'TERROR AND REPRESSION', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/iran/26.htm' }
        }
      ]
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q4',
          text: 'One of the main opposition parties, the Mojahedin (Mojahedin-e Khalq, or People\'s Struggle), rose up in a nationwide armed rebellion.',
          lang: 'en',
          cite: {
            source: 'loc-iran-country-study-1987',
            loc: { section: 'The Reign of Terror', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/iran/92.htm' }
        }
      ]
    },
    {
      kind: 'casualties',
      quotes: [
        {
          id: 'q5',
          text: 'Seventy-three persons were killed, including the chief justice and party secretary general Mohammad Beheshti, four cabinet ministers, twenty-seven Majlis deputies, and several other government officials.',
          lang: 'en',
          cite: {
            source: 'loc-iran-country-study-1987',
            loc: { section: 'TERROR AND REPRESSION', para: '3' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/iran/26.htm' }
        },
        {
          id: 'q7',
          text: 'A bomb at the Islamic Republican Party headquarters kills some 70 members of the ruling party including its leader, Ayatollah Sayyed-Moḥammad Behešti (b. 1928)',
          lang: 'en',
          cite: {
            source: 'iranica-yarshater-chronology-part-4',
            loc: { section: 'Chronology of Iranian History Part 4, 1981' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.iranicaonline.org/articles/chronology-of-iranian-history-part-4/'
          }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q8',
          text: 'The government responded to the armed challenge of the guerrilla groups by expanded use of the Pasdaran in counterintelligence activities and by widespread arrests, jailings, and executions.',
          lang: 'en',
          cite: {
            source: 'loc-iran-country-study-1987',
            loc: { section: 'TERROR AND REPRESSION', para: '5' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/iran/26.htm' }
        },
        {
          id: 'q9',
          text: 'By moving quickly to hold new elections and to fill vacant posts, the government managed to maintain continuity in authority, however, and by repression and terror it was able to crush the guerrilla movements.',
          lang: 'en',
          cite: {
            source: 'loc-iran-country-study-1987',
            loc: { section: 'TERROR AND REPRESSION', para: '6' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/iran/26.htm' }
        },
        {
          id: 'q10',
          text: 'Early in 1982, the murderous potential of the Mojahedin-e Khalq inside Iran came to an end when their operational commander, Musā Ḵiābāni, was killed in his headquarters.',
          lang: 'en',
          cite: {
            source: 'iranica-algar-khomeini-life',
            loc: { section: 'KHOMEINI i. Life', para: '80' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://web.archive.org/web/20260928150602/https://www.iranicaonline.org/articles/khomeini-i-life/'
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
            value: { d: '1981-06-21' },
            cites: [
              {
                source: 'loc-iran-country-study-1987',
                loc: { section: 'The Reign of Terror', para: '1' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q17',
        text: 'The dismissal of Bani Sadr on June 21, 1981, brought to a head the underlying conflicts within the political elite and between its members and other groups contesting for power.',
        lang: 'en',
        cite: {
          source: 'loc-iran-country-study-1987',
          loc: { section: 'The Reign of Terror', para: '1' }
        },
        provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/iran/92.htm' }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1981-06-27' },
            cites: [
              {
                source: 'iranica-algar-khomeini-life',
                loc: { section: 'KHOMEINI i. Life', para: '80' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q18',
        text: 'On 27 June, an attempt was made to assassinate Ali Khamenei, almost paralyzing his right arm.',
        lang: 'en',
        cite: {
          source: 'iranica-algar-khomeini-life',
          loc: { section: 'KHOMEINI i. Life', para: '80' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-08',
          url: 'https://web.archive.org/web/20260928150602/https://www.iranicaonline.org/articles/khomeini-i-life/'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1981-06-28' },
            cites: [
              {
                source: 'loc-iran-country-study-1987',
                loc: { section: 'TERROR AND REPRESSION', para: '3' }
              },
              {
                source: 'iranica-algar-khomeini-life',
                loc: { section: 'KHOMEINI i. Life', para: '80' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q13',
        text: 'On 28 June, a bomb was placed in the headquarters of the Islamic Republic Party, killing Ayatollah Behešti, the main antagonist of Bani-Ṣadr, together with some seventy other people.',
        lang: 'en',
        cite: {
          source: 'iranica-algar-khomeini-life',
          loc: { section: 'KHOMEINI i. Life', para: '80' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-08',
          url: 'https://web.archive.org/web/20260928150602/https://www.iranicaonline.org/articles/khomeini-i-life/'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1981-07-24' },
            cites: [
              {
                source: 'loc-iran-country-study-1987',
                loc: { section: 'TERROR AND REPRESSION', para: '3' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q15',
        text: 'Elections for a new president were held on July 24, and Rajai, the prime minister, was elected to the post.',
        lang: 'en',
        cite: {
          source: 'loc-iran-country-study-1987',
          loc: { section: 'TERROR AND REPRESSION', para: '3' }
        },
        provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/iran/26.htm' }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1981-08-05' },
            cites: [
              {
                source: 'loc-iran-country-study-1987',
                loc: { section: 'TERROR AND REPRESSION', para: '3' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q16',
        text: 'On August 5, 1981, the Majlis approved Rajai\'s choice of Ayatollah Mohammad Javad-Bahonar as prime minister.',
        lang: 'en',
        cite: {
          source: 'loc-iran-country-study-1987',
          loc: { section: 'TERROR AND REPRESSION', para: '3' }
        },
        provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/iran/26.htm' }
      }
    }
  ],
  hero: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/e/ec/Mohammad_Beheshti_1980.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Mohammad_Beheshti_1980.jpg',
    credit: {
      institution: 'iusnews.ir (source named on the Commons file page)',
      creator: 'Hayrik Shahbazian'
    },
    license: { id: 'public-domain' }
  },
  furtherReading: [
    { source: 'beheshti-1999-khaterat-e-mandegar', perspective: 'iranian' }
  ]
})
