import { defineInterpretation } from '../../schema'

export default defineInterpretation({
  id: 'white-revolution-nature',
  about: ['event:white-revolution'],
  topic: 'nature',
  positions: [
    {
      id: 'shahs-revolution',
      category: 'official',
      holders: [
        { kind: 'state', name: 'Imperial State of Iran' },
        {
          kind: 'participant',
          name: 'Mohammad Reza Pahlavi',
          ref: 'person:mohammad-reza-pahlavi'
        }
      ],
      statements: [
        {
          id: 'q1',
          text: 'With these aims in mind, in January 1963 I presented to my people the first stage of my White Revolution.* This program would construct a modern and progressive Iran on sound and strong foundations, so that my presence would no longer affect the destiny of the country.',
          lang: 'en',
          cite: {
            source: 'pahlavi-1980-answer-to-history',
            loc: { page: '102', section: 'The White Revolution' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://archive.org/download/answer-to-history-by-shah-mohammad-reza-pahlavi/Answer%20to%20History%20by%20Shah%20Mohammad%20Reza%20Pahlavi_djvu.txt'
          }
        },
        {
          id: 'q2',
          text: 'At the inception of our land reforms that January, I had predicted that the forces of the clergy (the Black reaction) and the communists (the Red destruction) would attempt to sabotage this program: the former, because they wished the nation to remain submerged in abject poverty and injustice; the latter, because their aim was the complete disintegra- tion of the country.',
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
      ],
      reception: [
        {
          id: 'q8',
          text: 'These measures earned the government considerable support among certain sectors of the population, but they did not deal immediately with sources of unrest. Economic conditions were still difficult for the poorer classes.',
          lang: 'en',
          cite: {
            source: 'loc-iran-country-study-1987',
            loc: { section: 'THE SHAH\'S WHITE REVOLUTION', para: '6' }
          },
          provenance: { via: 'web', at: '2026-10-09', url: 'http://countrystudies.us/iran/18.htm' }
        }
      ]
    },
    {
      id: 'american-inspired-facade',
      category: 'official',
      holders: [
        { kind: 'state', name: 'Islamic Republic of Iran' },
        { kind: 'organization', name: 'Khamenei.ir' }
      ],
      statements: [
        {
          id: 'q3',
          text: 'In January 1963, the Shah announced a six-point program of reform called the White Revolution, an American-inspired package of measures designed to give his regime a liberal and progressive facade.',
          lang: 'en',
          cite: {
            source: 'khamenei-ir-imam-khomeini-biography',
            loc: { section: 'Imam Khomeini’s Biography', para: '15' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://web.archive.org/web/20260610181904/https://english.khamenei.ir/news/2116/Imam-Khomeini-s-Biography'
          }
        },
        {
          id: 'q4',
          text: 'This was above all a hegemonic project intended to portray the Shah as a revolutionary leader through the utilization of social and historical myths reinterpreted through the prism of contemporary, often conflicting ideological constructs, such as nationalism and modernism.',
          lang: 'en',
          cite: {
            source: 'khamenei-ir-imam-khomeini-biography',
            loc: { section: 'Imam Khomeini’s Biography', para: '14' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://web.archive.org/web/20260610181904/https://english.khamenei.ir/news/2116/Imam-Khomeini-s-Biography'
          }
        }
      ],
      reception: [
        {
          id: 'q9',
          text: 'It was widely believed that the shah’s White Revolution and the land-reform program of the 1960s had been designed in detail by Americans, though in fact American officials had favored more moderate land reform',
          lang: 'en',
          cite: {
            source: 'iranica-ashraf-conspiracy-theories',
            loc: { section: 'CONSPIRACY THEORIES', para: '19' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://www.iranicaonline.org/articles/conspiracy-theories/'
          }
        }
      ]
    },
    {
      id: 'liberal-facade',
      category: 'scholarly',
      holders: [
        { kind: 'scholar', name: 'Hamid Algar' }
      ],
      statements: [
        {
          id: 'q5',
          text: 'A more serious confrontation ensued in January 1963, when Moḥammad-Reżā Shah announced a six-point program of reform that he termed the “White Revolution,” a package of measures designed to give the regime a liberal façade.',
          lang: 'en',
          cite: {
            source: 'iranica-algar-khomeini-life',
            loc: { section: 'KHOMEINI i. Life', para: '35' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://web.archive.org/web/20260928150602/https://www.iranicaonline.org/articles/khomeini-i-life/'
          }
        }
      ]
    },
    {
      id: 'kennedy-pressure',
      category: 'scholarly',
      holders: [
        { kind: 'scholar', name: 'Farian Sabahi' },
        { kind: 'scholar', name: 'Ehsan Yarshater' }
      ],
      statements: [
        {
          id: 'q6',
          text: 'Suggested by the Kennedy administration as an alternative to red revolutions and as a condition to U.S. aid, the White Revolution aimed at propelling Iran onto the level of the most modernized countries.',
          lang: 'en',
          cite: {
            source: 'iranica-sabahi-literacy-corps',
            loc: { section: 'LITERACY CORPS', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://web.archive.org/web/20260907212738/https://www.iranicaonline.org/articles/literacy-corps-1/'
          }
        },
        {
          id: 'q7',
          text: 'John F. Kennedy is elected President of the United States. His criticism of the Shah’s regime leads to a series of reforms in Iran.',
          lang: 'en',
          cite: {
            source: 'iranica-yarshater-chronology-part-3',
            loc: { section: 'Chronology of Iranian History Part 3, 1960' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://www.iranicaonline.org/articles/chronology-of-iranian-history-part-3/'
          }
        }
      ]
    }
  ],
  researched: '2026-10-09'
})
