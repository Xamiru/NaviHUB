import { defineInterpretation } from '../../schema'

export default defineInterpretation({
  id: 'fazlollah-nuri-legacy',
  about: ['person:fazlollah-nuri'],
  topic: 'legacy',
  researched: '2026-10-06',
  positions: [
    {
      id: 'islamic-republic',
      category: 'official',
      holders: [
        { kind: 'state', name: 'Islamic Republic of Iran' }
      ],
      statements: [
        {
          id: 'q1',
          text: 'He was to be remembered as a martyr for the cause of Islam by the Islamic Republic',
          lang: 'en',
          cite: { source: 'iranica-martin-nuri', loc: { section: 'NURI, FAŻL-ALLĀH', para: '16' } },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/nuri-fazl-allah/'
          }
        }
      ]
    },
    {
      id: 'martin',
      category: 'scholarly',
      holders: [
        { kind: 'scholar', name: 'Vanessa Martin', discipline: 'historian' }
      ],
      statements: [
        {
          id: 'q2',
          text: 'but his ultimate support for the absolutist system in terms of the relationship between religion and state meant that he did not become a model for Ayatollah Khomeini’s Islamist movement.',
          lang: 'en',
          cite: { source: 'iranica-martin-nuri', loc: { section: 'NURI, FAŻL-ALLĀH', para: '16' } },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/nuri-fazl-allah/'
          }
        },
        {
          id: 'q3',
          text: 'Shaikh Fażl-Allāh was the first jurist to identify and clearly argue the problem of incompatibility between a law based on the will of the people, and one based on divine will.',
          lang: 'en',
          cite: { source: 'iranica-martin-nuri', loc: { section: 'NURI, FAŻL-ALLĀH', para: '16' } },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/nuri-fazl-allah/'
          }
        }
      ]
    },
    {
      id: 'yarshater',
      category: 'scholarly',
      holders: [
        { kind: 'scholar', name: 'Ehsan Yarshater', discipline: 'historian' }
      ],
      statements: [
        {
          id: 'q4',
          text: 'Execution of Shaikh Fażl-Allāh Nuri (b. 1843), a leading theologian and political activist who initiated the Islamic fundamentalist movement in Iran, by the conquerers of Tehran.',
          lang: 'en',
          cite: {
            source: 'iranica-yarshater-chronology-part-2',
            loc: { section: 'Chronology of Iranian History Part 2, 1909' }
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
