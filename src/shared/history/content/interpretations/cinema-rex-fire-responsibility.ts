import { defineInterpretation } from '../../schema'

export default defineInterpretation({
  id: 'cinema-rex-fire-responsibility',
  about: ['event:cinema-rex-fire'],
  topic: 'responsibility',
  positions: [
    {
      id: 'blame-on-the-regime-and-savak',
      category: 'scholarly',
      holders: [
        { kind: 'scholar', name: 'Ehsan Yarshater' },
        { kind: 'organization', name: 'Library of Congress, Federal Research Division' }
      ],
      statements: [
        {
          id: 'q2',
          text: 'the opposition carefully cultivated a widespread conviction that the fire was the work of SAVAK agents.',
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
      id: 'religious-militants-set-the-fire',
      category: 'scholarly',
      holders: [
        { kind: 'scholar', name: 'Ehsan Yarshater' },
        { kind: 'organization', name: 'Library of Congress, Federal Research Division' }
      ],
      statements: [
        {
          id: 'q4',
          text: 'Although evidence available after the Revolution suggested that the fire was deliberately started by religiously inclined students',
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
      id: 'khomeinis-provocation',
      category: 'contemporary',
      holders: [
        {
          kind: 'participant',
          name: 'Mohammad Reza Pahlavi',
          ref: 'person:mohammad-reza-pahlavi'
        },
        { kind: 'state', name: 'Imperial State of Iran' }
      ],
      statements: [
        {
          id: 'q5',
          text: 'Immediately my government was blamed for this atrocious act. Supposedly, the police had locked the doors of the cinema so that no one could escape. We were also charged with having started the fire. Khomeini needed yet another provocation to whet the appetites of his fanatic following.',
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
        },
        {
          id: 'q6',
          text: 'The real culprit fled to Iraq, where he was arrested. He confessed, but frightened or pusillanimous magistrates covered up the affair.',
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
    },
    {
      id: 'extremist-groups-and-cinema-burnings',
      category: 'scholarly',
      holders: [
        { kind: 'scholar', name: 'Milad Parniani' },
        { kind: 'scholar', name: 'Javad Abbasi' }
      ],
      statements: [
        {
          id: 'q7',
          text: 'The trend culminated in the burning of Cinema Rex in Ābādān on August 19, 1978.',
          lang: 'en',
          cite: {
            source: 'cinema-iranica-parniani-abbasi-cinema-through-the-eyes-of-the-press',
            loc: {
              section: 'Iranian Cinema Through the Eyes of the Press: 1950s–1990s',
              para: '47'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://cinema.iranicaonline.org/article/iranian-cinema-through-the-eyes-of-the-press-1950s-1990s-case-study-khurasan-newspaper/'
          }
        }
      ]
    }
  ],
  researched: '2026-10-09'
})
