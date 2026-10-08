import { defineInterpretation } from '../../schema'

export default defineInterpretation({
  id: 'founding-of-the-rastakhiz-party-motives',
  about: ['event:founding-of-the-rastakhiz-party'],
  topic: 'motives',
  positions: [
    {
      id: 'a-school-for-civic-spirit',
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
          id: 'q1',
          text: 'I believed that representatives of all social levels and all opinions could be gathered together in one party. I thought that through eliminating an opposition party, I could solicit the aid of all capable political personalities without concern for party politics. For the future I saw this organization as a great political and ideological school, able to engender the civic spirit necessary for administrative reform.',
          lang: 'en',
          cite: {
            source: 'pahlavi-1980-answer-to-history',
            loc: { section: 'The White Revolution' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://archive.org/download/answer-to-history-by-shah-mohammad-reza-pahlavi/Answer%20to%20History%20by%20Shah%20Mohammad%20Reza%20Pahlavi_djvu.txt'
          }
        },
        {
          id: 'q2',
          text: 'However, experience was to show that the creation of this party was an error. President Sadat had to suppress the single party in Egypt and return to pluralism. I believe that he was right for the Resurgence Party did not succeed in achieving its objectives—it did not become the conduit of ideas, needs and wishes between the nation and the government.',
          lang: 'en',
          cite: {
            source: 'pahlavi-1980-answer-to-history',
            loc: { section: 'The White Revolution' }
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
      id: 'curbing-the-prime-ministers-power-base',
      category: 'scholarly',
      holders: [
        { kind: 'scholar', name: 'Abbas Milani' }
      ],
      statements: [
        {
          id: 'q3',
          text: 'Reliable evidence indicates that the party’s demise was related to its unusual show of force and to the shah’s decision to nip in the bud any effort by Hoveyda to develop an independent power base (ʿAlam, V, p. 49; Šāhqoli, U.S. Embassy in Iran, July 1977).',
          lang: 'en',
          cite: {
            source: 'iranica-milani-hoveyda',
            loc: { section: 'HOVEYDA, AMIR-ABBAS', para: '25' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://web.archive.org/web/20261002185029/https://www.iranicaonline.org/articles/hoveyda-amir-abbas/'
          }
        }
      ]
    },
    {
      id: 'one-party-state-alienated-the-educated',
      category: 'scholarly',
      holders: [
        { kind: 'organization', name: 'Library of Congress, Federal Research Division' }
      ],
      statements: [
        {
          id: 'q4',
          text: 'Increasing political repression and the establishment of a one-party state in 1975 further alienated the educated classes.',
          lang: 'en',
          cite: {
            source: 'loc-iran-country-study-1987',
            loc: { section: 'The Coming of the Revolution', para: '3' }
          },
          provenance: { via: 'web', at: '2026-10-09', url: 'http://countrystudies.us/iran/21.htm' }
        }
      ]
    }
  ],
  researched: '2026-10-09'
})
