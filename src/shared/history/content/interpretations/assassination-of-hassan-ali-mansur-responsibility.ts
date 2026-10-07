import { defineInterpretation } from '../../schema'

export default defineInterpretation({
  id: 'assassination-of-hassan-ali-mansur-responsibility',
  about: ['event:assassination-of-hassan-ali-mansur'],
  topic: 'responsibility',
  positions: [
    {
      id: 'khomeini-refused-fatwa',
      category: 'scholarly',
      holders: [
        { kind: 'scholar', name: 'Ali Rahnema' }
      ],
      statements: [
        {
          id: 'q1',
          text: 'Khomeini, the spiritual and temporal father of the Coalition had been approached and asked for his approval, yet he had refused to issue a fatwa or condone the assassination (ʿErāqi, pp. 228-29; Aḥmadi, p. 336; Ḵal-ḵāli, p. 163; SAVAK sources as reported by Moqaddam, pp. 366, 373).',
          lang: 'en',
          cite: {
            source: 'iranica-rahnema-jamiyat-e-motalefa-ye-eslami',
            loc: {
              section: 'JAMʿIYAT-E MOʾTALEFA-YE ESLĀMI i. Hayʾathā-ye Moʾtalefa-ye Eslāmi 1963-79',
              para: '35'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://web.archive.org/web/20260407183707/https://www.iranicaonline.org/articles/jamiyat-e-motalefa-i/'
          }
        },
        {
          id: 'q2',
          text: 'Milāni is reported to have said, “If someone can do this, this would be an obligation and should be done with a minimum of collateral damage” (Moqaddam, p. 246). The Armed Branch of the Coalition construed Milāni’s verbal statement as a valid permission to assassinate the Shah or Manṣur (Moqaddam, pp. 366, 374).',
          lang: 'en',
          cite: {
            source: 'iranica-rahnema-jamiyat-e-motalefa-ye-eslami',
            loc: {
              section: 'JAMʿIYAT-E MOʾTALEFA-YE ESLĀMI i. Hayʾathā-ye Moʾtalefa-ye Eslāmi 1963-79',
              para: '37'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://web.archive.org/web/20260407183707/https://www.iranicaonline.org/articles/jamiyat-e-motalefa-i/'
          }
        }
      ]
    },
    {
      id: 'clerics-close-to-khomeini',
      category: 'scholarly',
      holders: [
        { kind: 'organization', name: 'Library of Congress, Federal Research Division' }
      ],
      statements: [
        {
          id: 'q3',
          text: 'Evidence made available after the Islamic Revolution revealed that the group had affiliations with clerics close to Khomeini.',
          lang: 'en',
          cite: {
            source: 'loc-iran-country-study-1987',
            loc: { section: 'State and Society, 1964-74', para: '7' }
          },
          provenance: { via: 'web', at: '2026-10-07', url: 'http://countrystudies.us/iran/19.htm' }
        }
      ]
    },
    {
      id: 'retaliation-for-exile',
      category: 'scholarly',
      holders: [
        { kind: 'scholar', name: 'Abbas Milani' }
      ],
      statements: [
        {
          id: 'q4',
          text: 'Religious fundamentalists angry with him for allegedly insulting their religious leader, Ayatollah Khomeini, had organized the terrorist act.',
          lang: 'en',
          cite: {
            source: 'iranica-milani-hoveyda',
            loc: { section: 'HOVEYDA, AMIR-ABBAS', para: '17' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://web.archive.org/web/20261002185029/https://www.iranicaonline.org/articles/hoveyda-amir-abbas/'
          }
        },
        {
          id: 'q5',
          text: 'His opposition to the agreement led to his arrest and eventual exile, and his supporters assassinated Manṣur in retaliation.',
          lang: 'en',
          cite: {
            source: 'iranica-milani-hoveyda',
            loc: { section: 'HOVEYDA, AMIR-ABBAS', para: '17' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://web.archive.org/web/20261002185029/https://www.iranicaonline.org/articles/hoveyda-amir-abbas/'
          }
        }
      ]
    },
    {
      id: 'coalition-religious-permit',
      category: 'official',
      holders: [
        { kind: 'party', name: 'Islamic Coalition Party' }
      ],
      statements: [
        {
          id: 'q6',
          text: 'Through official statements, the Coalition has tried to convince the public that its decision to embark on the path of “armed jihad” was legitimized by a “religious permit” (ʿAṣr-e āzādagān, 9 Esfand 1378 Š./28 February 1999).',
          lang: 'en',
          cite: {
            source: 'iranica-rahnema-jamiyat-e-motalefa-ye-eslami',
            loc: {
              section: 'JAMʿIYAT-E MOʾTALEFA-YE ESLĀMI i. Hayʾathā-ye Moʾtalefa-ye Eslāmi 1963-79',
              para: '28'
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
