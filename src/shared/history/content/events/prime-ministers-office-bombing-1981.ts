import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'prime-ministers-office-bombing-1981',
  names: [
    { text: 'Bombing of the prime minister’s office, 1981', lang: 'en', role: 'primary' },
    { text: 'انفجار دفتر نخست‌وزیری', lang: 'fa', role: 'native' },
    { text: 'Assassination of Rajai and Bahonar', lang: 'en', role: 'alternative' }
  ],
  researched: '2026-10-08',
  type: 'assassination',
  start: {
    alts: [
      {
        value: { d: '1981-08-30' },
        cites: [
          {
            source: 'loc-iran-country-study-1987',
            loc: { section: 'TERROR AND REPRESSION', para: '4' }
          },
          {
            source: 'iranica-azimi-bakhash-kakar-elections',
            loc: { section: 'ELECTIONS ii. Under the Islamic Republic, 1979-92', para: '7' }
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
  prominence: 3,
  places: [
    {
      ref: 'place:tehran',
      cites: [
        {
          source: 'loc-iran-country-study-1987',
          loc: { section: 'TERROR AND REPRESSION', para: '4' }
        }
      ]
    }
  ],
  polities: [
    {
      ref: 'polity:islamic-republic-of-iran',
      cites: [
        {
          source: 'loc-iran-country-study-1987',
          loc: { section: 'TERROR AND REPRESSION', para: '4' }
        }
      ]
    }
  ],
  participants: [
    {
      name: 'Mohammad-Ali Rajai',
      role: 'victim',
      cites: [
        {
          source: 'loc-iran-country-study-1987',
          loc: { section: 'TERROR AND REPRESSION', para: '4' }
        },
        {
          source: 'iranica-yarshater-chronology-part-4',
          loc: { section: 'Chronology of Iranian History Part 4, 1981' }
        }
      ]
    },
    {
      name: 'Mohammad-Javad Bahonar',
      role: 'victim',
      cites: [
        {
          source: 'loc-iran-country-study-1987',
          loc: { section: 'TERROR AND REPRESSION', para: '4' }
        },
        {
          source: 'iranica-yarshater-chronology-part-4',
          loc: { section: 'Chronology of Iranian History Part 4, 1981' }
        }
      ]
    }
  ],
  related: [
    { ref: 'event:hafte-tir-bombing', rel: 'preceded-by' },
    {
      ref: 'event:impeachment-of-abolhassan-banisadr',
      rel: 'related',
      cites: [
        {
          source: 'iranica-azimi-bakhash-kakar-elections',
          loc: { section: 'ELECTIONS ii. Under the Islamic Republic, 1979-92', para: '7' }
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
          text: 'Rajai and Bahonar, along with the chief of the Tehran police, lost their lives when a bomb went off during a meeting at the office of the prime minister on August 30.',
          lang: 'en',
          cite: {
            source: 'loc-iran-country-study-1987',
            loc: { section: 'TERROR AND REPRESSION', para: '4' }
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
          text: 'Moḥammad-ʿAlī Rajāʾī, was sworn in on August 2, and was killed by an assassin’s bomb on 30 August 1981.',
          lang: 'en',
          cite: {
            source: 'iranica-azimi-bakhash-kakar-elections',
            loc: { section: 'ELECTIONS ii. Under the Islamic Republic, 1979-92', para: '7' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://www.iranicaonline.org/articles/elections/'
          }
        },
        {
          id: 'q3',
          text: 'On August 5, 1981, the Majlis approved Rajai\'s choice of Ayatollah Mohammad Javad-Bahonar as prime minister.',
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
      kind: 'course',
      quotes: [
        {
          id: 'q4',
          text: 'A second bombing by the Mojāhedin-e ḵalq at the prime minister’s office kills both the President, Moḥammad ʿAli Rajāʾi and the prime minister, Moḥammad-Jawād Bāhonar.',
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
          id: 'q5',
          text: 'The Majlis named another cleric, Mahdavi-Kani, as interim prime minister.',
          lang: 'en',
          cite: {
            source: 'loc-iran-country-study-1987',
            loc: { section: 'TERROR AND REPRESSION', para: '4' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/iran/26.htm' }
        }
      ]
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/e/e0/Mohammad_Ali_Rajai%2C_Prime_Minister_of_Iran.jpg/1280px-Mohammad_Ali_Rajai%2C_Prime_Minister_of_Iran.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Mohammad_Ali_Rajai,_Prime_Minister_of_Iran.jpg',
    credit: {
      institution: 'Library of Congress (Bernard Gotfryd collection)',
      creator: 'Bernard Gotfryd'
    },
    license: { id: 'public-domain' }
  },
  course: [
    {
      date: {
        alts: [
          {
            value: { d: '1981-10-02' },
            cites: [
              {
                source: 'loc-iran-country-study-1987',
                loc: { section: 'TERROR AND REPRESSION', para: '4' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q6',
        text: 'In a new round of elections on October 2, Hojjatoleslam Ali Khamenehi was elected president.',
        lang: 'en',
        cite: {
          source: 'loc-iran-country-study-1987',
          loc: { section: 'TERROR AND REPRESSION', para: '4' }
        },
        provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/iran/26.htm' }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1981-10-28' },
            cites: [
              {
                source: 'loc-iran-country-study-1987',
                loc: { section: 'TERROR AND REPRESSION', para: '4' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q7',
        text: 'On October 28, the Majlis elected Mir-Hosain Musavi, a protégé of the late Mohammad Beheshti, as prime minister.',
        lang: 'en',
        cite: {
          source: 'loc-iran-country-study-1987',
          loc: { section: 'TERROR AND REPRESSION', para: '4' }
        },
        provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/iran/26.htm' }
      }
    }
  ]
})
