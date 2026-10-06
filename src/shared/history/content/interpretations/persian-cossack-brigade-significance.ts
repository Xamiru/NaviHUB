import { defineInterpretation } from '../../schema'

export default defineInterpretation({
  id: 'persian-cossack-brigade-significance',
  about: ['event:founding-of-the-persian-cossack-brigade'],
  topic: 'significance',
  researched: '2026-10-06',
  positions: [
    {
      id: 'european-instructors',
      category: 'scholarly',
      holders: [
        { kind: 'scholar', name: 'Muriel Atkin' }
      ],
      statements: [
        {
          id: 'q1',
          text: 'The formation of the Cossack Brigade was part of a larger process in which the Persian government, in the late 19th and early 20th centuries, engaged various European soldiers to train units of the Persian armed forces.',
          lang: 'en',
          cite: {
            source: 'iranica-atkin-cossack-brigade',
            loc: { section: 'COSSACK BRIGADE', para: '2' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/cossack-brigade'
          }
        }
      ]
    },
    {
      id: 'tool-of-russian-influence',
      category: 'scholarly',
      holders: [
        { kind: 'scholar', name: 'Elena Andreeva' }
      ],
      statements: [
        {
          id: 'q2',
          text: 'In 1879, the Russians helped Nāṣer-al-Din Shah to form a Cossack Brigade (berigād-e qazāq; q.v.), which was led by Russian officers. It had a reputation of being a well-disciplined modern military unit loyal to the shah (Kazemzādeh, 1968, pp. 166-68; Shuster, pp. xxxviii [photograph], 290, 293). At the same time, it was a tool of Russian influence.',
          lang: 'en',
          cite: {
            source: 'iranica-andreeva-russia-relations',
            loc: {
              section: 'RUSSIA i. Russo-Iranian Relations up to the Bolshevik Revolution',
              para: '39'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/russia-i-relations/'
          }
        }
      ]
    },
    {
      id: 'concession',
      category: 'scholarly',
      holders: [
        { kind: 'scholar', name: 'Mansoureh Ettehadiyeh Nezam-Mafi' }
      ],
      statements: [
        {
          id: 'q3',
          text: 'In addition, in 1296/1879 the Russians were asked to form the Cossack Brigade under the command of Russian officers, a major political and military concession.',
          lang: 'en',
          cite: {
            source: 'iranica-ettehadiyeh-concessions-qajar',
            loc: { section: 'CONCESSIONS ii. In the Qajar period', para: '2' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/concessions/concessions-ii-in-the-qajar-period'
          }
        }
      ]
    },
    {
      id: 'spread-of-influence',
      category: 'scholarly',
      holders: [
        { kind: 'scholar', name: 'Ehsan Yarshater' }
      ],
      statements: [
        {
          id: 'q4',
          text: '1878 Establishment of the Cossack Brigade, a military force trained by Russian officers and an important source of the rapid spread of Russian influence in ensuing years.',
          lang: 'en',
          cite: {
            source: 'iranica-yarshater-chronology-part-2',
            loc: { section: 'Chronology of Iranian History Part 2, 1878' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/chronology-of-iranian-history-part-2/'
          }
        }
      ]
    }
  ]
})
