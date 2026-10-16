import { defineInterpretation } from '../../schema'

export default defineInterpretation({
  id: 'battle-of-otlukbeli-venetian-firearms',
  about: ['event:battle-of-otlukbeli'],
  topic: 'other',
  positions: [
    {
      id: 'sent-in-1471-never-arrived',
      category: 'scholarly',
      holders: [
        { kind: 'scholar', name: 'Rudi Matthee', discipline: 'historian' }
      ],
      statements: [
        {
          id: 'q1',
          text: 'In 1471, the Venetians sent him matchlocks, siege guns, and other firearms as well as six bombardiers.',
          lang: 'en',
          cite: {
            source: 'iranica-matthee-firearms-i-history',
            loc: { section: 'FIREARMS i. HISTORY', para: '6' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://www.iranicaonline.org/articles/firearms-i-history'
          }
        },
        {
          id: 'q2',
          text: 'These, however, never reached Tabrīz, and in 878/1473, Uzun Ḥasan lost the battle of Baškent mainly because of the concentrated firepower of the Ottomans.',
          lang: 'en',
          cite: {
            source: 'iranica-matthee-firearms-i-history',
            loc: { section: 'FIREARMS i. HISTORY', para: '6' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://www.iranicaonline.org/articles/firearms-i-history'
          }
        }
      ]
    },
    {
      id: 'shipped-in-1473-too-late',
      category: 'scholarly',
      holders: [
        { kind: 'scholar', name: 'Rosemarie Quiring-Zoche', discipline: 'historian' }
      ],
      statements: [
        {
          id: 'q3',
          text: 'After his victory over the Qara Qoyunlū and Abū Saʿīd, Uzun Ḥasan promised the Signoria in 875/1470 that in the event of a Venetian attack on Ottoman-controlled territories from the sea, he would undertake a support operation on land. For this purpose he asked the Venetians to supply firearms; these were shipped in the spring of 877-78/1473 but were to reach him too late.',
          lang: 'en',
          cite: {
            source: 'iranica-quiring-zoche-aq-qoyunlu',
            loc: { section: 'AQ QOYUNLŪ', para: '13' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://www.iranicaonline.org/articles/aq-qoyunlu-confederation'
          }
        }
      ]
    }
  ],
  researched: '2026-10-16'
})
