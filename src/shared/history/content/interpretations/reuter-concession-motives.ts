import { defineInterpretation } from '../../schema'

export default defineInterpretation({
  id: 'reuter-concession-motives',
  about: ['event:reuter-concession'],
  topic: 'motives',
  researched: '2026-10-06',
  positions: [
    {
      id: 'safeguard-and-gain',
      category: 'scholarly',
      holders: [
        { kind: 'scholar', name: 'Abbas Amanat', discipline: 'historian' }
      ],
      statements: [
        {
          id: 'q1',
          text: 'No doubt the shah and the premier both rationalized the greater British investment in Persia as a safeguard against the growing Russian menace but they also were motivated by personal gains.',
          lang: 'en',
          cite: {
            source: 'iranica-amanat-great-britain-ii',
            loc: {
              section: 'GREAT BRITAIN ii. British influence in Persia in the 19th century',
              para: '25'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/great-britain-ii/'
          }
        },
        {
          id: 'q2',
          text: 'For a skilled diplomat such as Mošir-al-Dawla, well versed in the Ottoman Tanzimat and aware of its perils, negotiating such a concession was, however, out of charac-ter.',
          lang: 'en',
          cite: {
            source: 'iranica-amanat-great-britain-ii',
            loc: {
              section: 'GREAT BRITAIN ii. British influence in Persia in the 19th century',
              para: '25'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/great-britain-ii/'
          }
        }
      ]
    },
    {
      id: 'need-for-money',
      category: 'scholarly',
      holders: [
        { kind: 'scholar', name: 'Mansoureh Ettehadiyeh Nezam-Mafi' }
      ],
      statements: [
        {
          id: 'q3',
          text: 'Their interests often coincided with those of the shah, who was in need of money and did not fully understand the implications of such concessions, as well as those of some corrupt courtiers (Keddie, p. 7).',
          lang: 'en',
          cite: {
            source: 'iranica-ettehadiyeh-concessions-qajar',
            loc: { section: 'CONCESSIONS ii. In the Qajar period', para: '3' }
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
      id: 'modernization-hopes',
      category: 'scholarly',
      holders: [
        { kind: 'scholar', name: 'Elena Andreeva' }
      ],
      statements: [
        {
          id: 'q4',
          text: 'Nāṣer-al-Din Shah (r. 1848-96) encouraged foreign concessions in Iran in the hope that they would help to modernize the country, but, similar to the other Qajar rulers, he underestimated the need for radical financial and administrative reform in order for this policy to succeed.',
          lang: 'en',
          cite: {
            source: 'iranica-andreeva-russia-relations',
            loc: {
              section: 'RUSSIA i. Russo-Iranian Relations up to the Bolshevik Revolution',
              para: '35'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/russia-i-relations/'
          }
        }
      ]
    }
  ]
})
