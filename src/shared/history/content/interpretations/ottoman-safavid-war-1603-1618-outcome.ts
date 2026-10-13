import { defineInterpretation } from '../../schema'

export default defineInterpretation({
  id: 'ottoman-safavid-war-1603-1618-outcome',
  about: ['event:ottoman-safavid-war-1603-1618'],
  topic: 'outcome',
  positions: [
    {
      id: 'the-last-ottoman-soldier-expelled',
      category: 'scholarly',
      holders: [
        { kind: 'scholar', name: 'Roger M. Savory', discipline: 'historian' }
      ],
      statements: [
        {
          id: 'q1',
          text: 'After winning a major victory at Ṣūfīān near Tabrīz, he proceeded in successive campaigns to expel the last Ottoman soldier from Iranian territory as defined by the Treaty of Amāsya (962/1555), and peace was signed with the Ottomans at Sarāb in 1027/1618.',
          lang: 'en',
          cite: { source: 'iranica-savory-abbas-i', loc: { section: 'ʿABBĀS I', para: '12' } },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/abbas-i'
          }
        }
      ]
    },
    {
      id: 'a-fortuitous-success',
      category: 'scholarly',
      holders: [
        { kind: 'scholar', name: 'Rudi Matthee', discipline: 'historian' }
      ],
      statements: [
        {
          id: 'q2',
          text: 'His military success against the Ottomans was mostly fortuitous.',
          lang: 'en',
          cite: {
            source: 'iranica-matthee-safavid-dynasty',
            loc: { section: 'SAFAVID DYNASTY', para: '31' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/safavids'
          }
        },
        {
          id: 'q3',
          text: 'Persia could only take on the Ottoman army so long as the latter were also engaged elsewhere.',
          lang: 'en',
          cite: {
            source: 'iranica-matthee-safavid-dynasty',
            loc: { section: 'SAFAVID DYNASTY', para: '31' }
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
      id: 'the-ottoman-side',
      category: 'scholarly',
      holders: [
        { kind: 'scholar', name: 'Rudi Matthee', discipline: 'historian' }
      ],
      statements: [
        {
          id: 'q4',
          text: 'In 1610 the Ottomans, having put down internal unrest, moved to Persia to regain the territories lost in 1603-04, but as enthusiasm for renewed warfare was low on both sides, little came of this.',
          lang: 'en',
          cite: {
            source: 'iranica-matthee-iraq-iv-safavid-period',
            loc: { section: 'IRAQ iv. RELATIONS IN THE SAFAVID PERIOD', para: '17' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/iraq-iv-safavid-period'
          }
        },
        {
          id: 'q5',
          text: 'Skirmishes continued until in 1613 the two parties concluded a peace treaty modeled on the Treaty of Amasya.',
          lang: 'en',
          cite: {
            source: 'iranica-matthee-iraq-iv-safavid-period',
            loc: { section: 'IRAQ iv. RELATIONS IN THE SAFAVID PERIOD', para: '17' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/iraq-iv-safavid-period'
          }
        }
      ]
    }
  ],
  researched: '2026-10-13'
})
