import { defineInterpretation } from '../../schema'

export default defineInterpretation({
  id: 'transfer-of-the-capital-to-qazvin-motives',
  about: ['event:transfer-of-the-capital-to-qazvin'],
  topic: 'motives',
  positions: [
    {
      id: 'the-ottoman-threat',
      category: 'scholarly',
      holders: [
        { kind: 'scholar', name: 'Rudi Matthee', discipline: 'historian' }
      ],
      statements: [
        {
          id: 'q1',
          text: 'Ottoman troops posed a continual threat to the rich province of Azarbaijan.',
          lang: 'en',
          cite: {
            source: 'iranica-matthee-safavid-dynasty',
            loc: { section: 'SAFAVID DYNASTY', para: '18' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/safavids'
          }
        }
      ]
    },
    {
      id: 'a-new-imperial-ethos',
      category: 'scholarly',
      holders: [
        { kind: 'scholar', name: 'Colin Paul Mitchell', discipline: 'historian' }
      ],
      statements: [
        {
          id: 'q2',
          text: 'The decision to replace Tabriz as the imperial center, a city that had historically been the hub of a number of Mongol and Turkmen dynasties such as the Il-khanids, the Qara Qoyunlus, and the Āq Qoyunlus, was concurrent with a decision by the shah to populate and staff his court and army with members of a new, non-Qezelbāš constituency.',
          lang: 'en',
          cite: { source: 'iranica-mitchell-tahmasp-i', loc: { section: 'ṬAHMĀSP I', para: '10' } },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/tahmasp-i'
          }
        },
        {
          id: 'q3',
          text: 'Qazvin had long since been associated with orthodoxy and stable governance, and Ṭahmāsp’s patronage of a number of new palaces, administrative complexes, gardens, and other public works suggests a need to develop a new imperial center for a new imperial ethos.',
          lang: 'en',
          cite: { source: 'iranica-mitchell-tahmasp-i', loc: { section: 'ṬAHMĀSP I', para: '10' } },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/tahmasp-i'
          }
        }
      ]
    }
  ],
  researched: '2026-10-13'
})
