import { defineInterpretation } from '../../schema'

export default defineInterpretation({
  id: '1979-islamic-republic-referendum-legitimacy',
  about: ['event:1979-islamic-republic-referendum'],
  topic: 'legitimacy',
  positions: [
    {
      id: 'overwhelming-popular-mandate',
      category: 'official',
      holders: [
        { kind: 'state', name: 'Islamic Republic of Iran' }
      ],
      statements: [
        {
          id: 'q1',
          text: 'Unanimously, and with the participation of the maraji\' al-taqlid, the \'ulama\' of Islam, and the leadership, the Iranian people declared their final and firm decision, in the referendum on the Islamic Republic, to bring about a new political system, that of the Islamic Republic. A 98.2% majority of the people voted for this system.',
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
        },
        {
          id: 'q2',
          text: 'Through the ballot box, over 98% voted in favor of replacing the monarchy with an Islamic Republic.',
          lang: 'en',
          cite: {
            source: 'khamenei-ir-imam-khomeini-biography',
            loc: { section: 'Imam Khomeini’s Biography', para: '36' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://web.archive.org/web/20260610181904/https://english.khamenei.ir/news/2116/Imam-Khomeini-s-Biography'
          }
        }
      ],
      reception: [
        {
          id: 'q9',
          text: 'The government reported an overwhelming majority of over 98 percent in favor of an Islamic republic.',
          lang: 'en',
          cite: {
            source: 'loc-iran-country-study-1987',
            loc: { section: 'Consolidation of the Islamic Republic', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-09', url: 'http://countrystudies.us/iran/24.htm' }
        },
        {
          id: 'q10',
          text: 'The Assembly of Experts completed its work on November 15, and the Constitution was approved in a national referendum on December 2 and 3, 1979, once again, according to government figures, by over 98 percent of the vote.',
          lang: 'en',
          cite: {
            source: 'loc-iran-country-study-1987',
            loc: { section: 'Consolidation of the Islamic Republic', para: '3' }
          },
          provenance: { via: 'web', at: '2026-10-09', url: 'http://countrystudies.us/iran/24.htm' }
        }
      ]
    },
    {
      id: 'grotesque-farce',
      category: 'contemporary',
      holders: [
        {
          kind: 'participant',
          name: 'Mohammad Reza Pahlavi',
          ref: 'person:mohammad-reza-pahlavi'
        }
      ],
      statements: [
        {
          id: 'q4',
          text: 'On March 30-31, a pseudo-referendum was organized to put the Islamic Republic to a popular vote. It was a grotesque farce.',
          lang: 'en',
          cite: {
            source: 'pahlavi-1980-answer-to-history',
            loc: { section: 'From Hope to Despair' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://archive.org/download/answer-to-history-by-shah-mohammad-reza-pahlavi/Answer%20to%20History%20by%20Shah%20Mohammad%20Reza%20Pahlavi_djvu.txt'
          }
        }
      ]
    },
    {
      id: 'one-option-and-no-secret-ballot',
      category: 'scholarly',
      holders: [
        { kind: 'organization', name: 'Library of Congress, Federal Research Division' }
      ],
      statements: [
        {
          id: 'q5',
          text: 'Khomeini rejected demands by various political groups and by Shariatmadari that voters be given a wide choice. The only form of government to appear on the ballot was an Islamic republic, and voting was not by secret ballot.',
          lang: 'en',
          cite: {
            source: 'loc-iran-country-study-1987',
            loc: { section: 'The New Constitution', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-09', url: 'http://countrystudies.us/iran/24.htm' }
        }
      ]
    },
    {
      id: 'yes-or-no-with-room-for-an-alternative',
      category: 'scholarly',
      holders: [
        { kind: 'scholar', name: 'Hamid Algar' }
      ],
      statements: [
        {
          id: 'q6',
          text: 'It was a simple “yes” or “no” vote, although a space was provided on the ballot paper for suggesting an alternative, such as Islamic Democratic Republic or even monarchy (by equating the former with the latter, Khomeini was clearly declaring it reprehensible and unacceptable;',
          lang: 'en',
          cite: {
            source: 'iranica-algar-khomeini-life',
            loc: { section: 'KHOMEINI i. Life', para: '63' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://web.archive.org/web/20260928150602/https://www.iranicaonline.org/articles/khomeini-i-life/'
          }
        }
      ]
    },
    {
      id: 'claimed-participation-and-boycott',
      category: 'scholarly',
      holders: [
        { kind: 'scholar', name: 'Fakhreddin Azimi' },
        { kind: 'scholar', name: 'Shaul Bakhash' },
        { kind: 'scholar', name: 'Mohammad Hassan Kakar' },
        { kind: 'scholar', name: 'Peyman Vahabzadeh' }
      ],
      statements: [
        {
          id: 'q7',
          text: 'The government generally claimed high voter participation both in elections and referenda, between 60 and 70 percent of eligible voters in most parliamentary and presidential elections and 89 percent of eligible voters in the referendum to establish the Islamic Republic',
          lang: 'en',
          cite: {
            source: 'iranica-azimi-bakhash-kakar-elections',
            loc: {
              section: 'ELECTIONS i. Under the Qajar and Pahlavi monarchies, 1906-79',
              para: '92'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://www.iranicaonline.org/articles/elections/'
          }
        },
        {
          id: 'q8',
          text: 'The OIPFG boycotted the March 1979 referendum that installed the Islamic Republic of Iran.',
          lang: 'en',
          cite: {
            source: 'iranica-vahabzadeh-fadaian-e-khalq',
            loc: { section: 'FADĀʾIĀN-E ḴALQ', para: '46' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://www.iranicaonline.org/articles/fadaian-e-khalq/'
          }
        }
      ]
    }
  ],
  researched: '2026-10-09'
})
