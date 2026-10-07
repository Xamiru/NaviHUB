import { defineInterpretation } from '../../schema'

export default defineInterpretation({
  id: 'june-1963-uprising-significance',
  about: ['event:june-1963-uprising'],
  topic: 'significance',
  positions: [
    {
      id: 'landowners-and-reaction',
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
          text: 'My prophecy was fulfilled. Widespread sabotage began, accompanied by murder and rioting, the most severe outbreaks of which were the rebellion in the south of the country and the disorders in Teheran in June 1963.',
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
        },
        {
          id: 'q2',
          text: 'The 1963 Teheran riots were inspired by an obscure individual who claimed to be a religious leader, Ruhollah Khomeini. It was certain, however, that he had secret dealings with foreign agents.',
          lang: 'en',
          cite: {
            source: 'pahlavi-1980-answer-to-history',
            loc: { page: '104', section: 'The White Revolution' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://archive.org/download/answer-to-history-by-shah-mohammad-reza-pahlavi/Answer%20to%20History%20by%20Shah%20Mohammad%20Reza%20Pahlavi_djvu.txt'
          }
        },
        {
          id: 'q3',
          text: 'The vast majority of the country\'s religious leaders, its real spiritual leaders, played absolutely no part in these events. The riots were financed by a group of landowners affected by the land reform law.',
          lang: 'en',
          cite: {
            source: 'pahlavi-1980-answer-to-history',
            loc: { page: '104', section: 'The White Revolution' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://archive.org/download/answer-to-history-by-shah-mohammad-reza-pahlavi/Answer%20to%20History%20by%20Shah%20Mohammad%20Reza%20Pahlavi_djvu.txt'
          }
        }
      ]
    },
    {
      id: 'bond-of-people-and-clergy',
      category: 'official',
      holders: [
        { kind: 'state', name: 'Islamic Republic of Iran' },
        { kind: 'participant', name: 'Ali Khamenei' }
      ],
      statements: [
        {
          id: 'q4',
          text: 'However, the 15th of Khordad of 1342 was a very important juncture. The reason is that the event which took place on the 15th of Khordad revealed that the bond between the people and the clergy had reached a so-called dangerous level.',
          lang: 'en',
          cite: {
            source: 'khamenei-ir-2013-06-04-speech-24th-demise-anniversary',
            loc: {
              section: 'Leader’s Speech on 24th Demise Anniversary of Imam Khomeini',
              para: '6'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://web.archive.org/web/20250606181336/https://english.khamenei.ir/news/1799/Leader-s-Speech-on-24th-Demise-Anniversary-of-Imam-Khomeini-r-a'
          }
        },
        {
          id: 'q5',
          text: 'The arrest of our magnanimous Imam (r.a.) resulted in such an uprising in Tehran and certain other parts of the country that the regime had to step in to suppress the people in a brutal way. A large number of people were killed. The streets of Tehran were covered with the blood of pious people and youth. On the 15th of Khordad, the brutal and ruthless nature of the taghuti regime was fully revealed.',
          lang: 'en',
          cite: {
            source: 'khamenei-ir-2013-06-04-speech-24th-demise-anniversary',
            loc: {
              section: 'Leader’s Speech on 24th Demise Anniversary of Imam Khomeini',
              para: '8'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://web.archive.org/web/20250606181336/https://english.khamenei.ir/news/1799/Leader-s-Speech-on-24th-Demise-Anniversary-of-Imam-Khomeini-r-a'
          }
        }
      ]
    },
    {
      id: 'turning-point',
      category: 'scholarly',
      holders: [
        { kind: 'scholar', name: 'Hamid Algar' }
      ],
      statements: [
        {
          id: 'q6',
          text: 'This uprising, on 15 Ḵordād 1342 Š./5 June 1963, can reasonably be called a turning point in Iranian history: The repressive nature of the regime was continuously intensified, and the stature of Khomeini as the only prominent figure willing to challenge it, enhanced. Previously quietist figures among the ʿolamāʾ began to follow his lead.',
          lang: 'en',
          cite: {
            source: 'iranica-algar-khomeini-life',
            loc: { section: 'KHOMEINI i. Life', para: '37' }
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
      id: 'prelude-to-revolution',
      category: 'scholarly',
      holders: [
        { kind: 'scholar', name: 'Ali Rahnema' }
      ],
      statements: [
        {
          id: 'q7',
          text: 'The 5 June 1963 uprising and the bloody repression that ensued, may be considered as the prelude to the 1979 Revolution in Iran.',
          lang: 'en',
          cite: {
            source: 'iranica-rahnema-jamiyat-e-motalefa-ye-eslami',
            loc: {
              section: 'JAMʿIYAT-E MOʾTALEFA-YE ESLĀMI i. Hayʾathā-ye Moʾtalefa-ye Eslāmi 1963-79',
              para: '21'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://web.archive.org/web/20260407183707/https://www.iranicaonline.org/articles/jamiyat-e-motalefa-i/'
          }
        }
      ]
    }
  ],
  researched: '2026-10-07'
})
