import { defineInterpretation } from '../../schema'

export default defineInterpretation({
  id: 'herat-under-sultan-husayn-bayqara-significance',
  about: ['event:herat-under-sultan-husayn-bayqara'],
  topic: 'significance',
  positions: [
    {
      id: 'golden-age-of-patronage',
      category: 'scholarly',
      holders: [
        { kind: 'scholar', name: 'Hans R. Roemer', discipline: 'historian' },
        { kind: 'scholar', name: 'Maria Szuppe', discipline: 'historian' }
      ],
      statements: [
        {
          id: 'q1',
          text: 'Ḥosayn Bāyqarā’s role as a patron, particularly of poets, is widely recognized; literary culture flourished in Herat during his long reign.',
          lang: 'en',
          cite: {
            source: 'iranica-roemer-hosayn-bayqara',
            loc: { section: 'ḤOSAYN BĀYQARĀ', para: '11' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://www.iranicaonline.org/articles/hosayn-bayqara'
          }
        },
        {
          id: 'q2',
          text: 'Later Persian historiography viewed his reign in Herat as the golden age of modern times, not only because of relative stability of political and economic life, but also for cultural and scientific achievements associated with his court.',
          lang: 'en',
          cite: {
            source: 'iranica-herat-iii-history-medieval-period',
            loc: { section: 'HERAT iii. HISTORY, MEDIEVAL PERIOD', para: '20' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://www.iranicaonline.org/articles/herat-iii'
          }
        }
      ]
    },
    {
      id: 'structural-weakness',
      category: 'scholarly',
      holders: [
        { kind: 'scholar', name: 'Maria Szuppe', discipline: 'historian' }
      ],
      statements: [
        {
          id: 'q3',
          text: 'According to the Turko-Mongol political tradition, the members of the Timurid house and the military aristocracy, amirs, were relatively independent from the central power through a system of land tenure (soyurḡāl; see EQṬĀʿ), and fiscal and legal privileges.',
          lang: 'en',
          cite: {
            source: 'iranica-herat-iii-history-medieval-period',
            loc: { section: 'HERAT iii. HISTORY, MEDIEVAL PERIOD', para: '21' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://www.iranicaonline.org/articles/herat-iii'
          }
        },
        {
          id: 'q4',
          text: 'This situation certainly contributed to the weakening of the Timurid state.',
          lang: 'en',
          cite: {
            source: 'iranica-herat-iii-history-medieval-period',
            loc: { section: 'HERAT iii. HISTORY, MEDIEVAL PERIOD', para: '21' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://www.iranicaonline.org/articles/herat-iii'
          }
        }
      ]
    }
  ],
  researched: '2026-10-16'
})
