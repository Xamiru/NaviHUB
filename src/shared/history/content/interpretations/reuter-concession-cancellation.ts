import { defineInterpretation } from '../../schema'

export default defineInterpretation({
  id: 'reuter-concession-cancellation',
  about: ['event:reuter-concession'],
  topic: 'causes',
  researched: '2026-10-06',
  positions: [
    {
      id: 'opposition-and-no-british-support',
      category: 'scholarly',
      holders: [
        { kind: 'scholar', name: 'Mansoureh Ettehadiyeh Nezam-Mafi' }
      ],
      statements: [
        {
          id: 'q1',
          text: 'Owing to popular opposition in Persia and to lack of British government support for Reuter, however, the shah canceled this concession in 1290/1873 (Teymūrī, pp. 97-150).',
          lang: 'en',
          cite: {
            source: 'iranica-ettehadiyeh-concessions-qajar',
            loc: { section: 'CONCESSIONS ii. In the Qajar period', para: '4' }
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
      id: 'russian-opposition',
      category: 'scholarly',
      holders: [
        { kind: 'scholar', name: 'Elena Andreeva' }
      ],
      statements: [
        {
          id: 'q2',
          text: 'Russian opposition, augmented by British government indifference, led to the cancellation of a broad concession for industrial development granted to a British subject, Baron Julius de Reuter, in the early 1870s (Algar, pp. 174-78; Farhād-Moʿtamed, pp. 210-12; F. Ādamiyat, 1972, pp. 367-69; Kazemzadeh, 1968, pp. 126-34; Frechling, apud Issawi, pp. 178-84).',
          lang: 'en',
          cite: {
            source: 'iranica-andreeva-russia-relations',
            loc: {
              section: 'RUSSIA i. Russo-Iranian Relations up to the Bolshevik Revolution',
              para: '37'
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
      id: 'court-and-clergy',
      category: 'scholarly',
      holders: [
        { kind: 'organization', name: 'Library of Congress, Federal Research Division' }
      ],
      statements: [
        {
          id: 'q3',
          text: 'Opposition from bureaucratic factions hostile to the prime minister and from clerical leaders who feared foreign influence, however, forced the shah to dismiss his prime minister and to cancel the concession.',
          lang: 'en',
          cite: {
            source: 'loc-iran-country-study-1987',
            loc: { section: 'THE QAJARS, 1795-1925', para: '5' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/iran/12.htm' }
        }
      ]
    },
    {
      id: 'foreign-office-lukewarm',
      category: 'scholarly',
      holders: [
        { kind: 'scholar', name: 'Abbas Amanat', discipline: 'historian' }
      ],
      statements: [
        {
          id: 'q4',
          text: 'The British authorities were lukewarm about the concession, given the complexity of the task and the concessionaire’s credibility. The opening of Persia to private investment and hence the Russian reaction was also a concern.',
          lang: 'en',
          cite: {
            source: 'iranica-amanat-great-britain-ii',
            loc: {
              section: 'GREAT BRITAIN ii. British influence in Persia in the 19th century',
              para: '26'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/great-britain-ii/'
          }
        },
        {
          id: 'q5',
          text: 'In due course, the Foreign Office’s lukewarm attitude towards Reuter encouraged the humiliated shah to cancel the embarrassing concession.',
          lang: 'en',
          cite: {
            source: 'iranica-amanat-great-britain-ii',
            loc: {
              section: 'GREAT BRITAIN ii. British influence in Persia in the 19th century',
              para: '26'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/great-britain-ii/'
          }
        }
      ]
    }
  ]
})
