import { defineInterpretation } from '../../schema'

export default defineInterpretation({
  id: 'russo-persian-war-1804-1813-causes',
  about: ['event:russo-persian-war-1804-1813'],
  topic: 'causes',
  researched: '2026-10-08',
  positions: [
    {
      id: 'securing-georgia',
      category: 'scholarly',
      holders: [
        { kind: 'scholar', name: 'Heribert Busse' }
      ],
      statements: [
        {
          id: 'q1',
          text: 'The immediate objective of the Russian advance on Ganǰa was to secure the southern frontier of Georgia, a province of Russian empire since 1801.',
          lang: 'en',
          cite: {
            source: 'iranica-busse-abbas-mirza',
            loc: { section: 'ʿABBĀS MĪRZĀ QAJAR', para: '4' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/abbas-mirza'
          }
        }
      ]
    },
    {
      id: 'tsitsianov-imperialism',
      category: 'scholarly',
      holders: [
        { kind: 'scholar', name: 'Elena Andreeva' }
      ],
      statements: [
        {
          id: 'q2',
          text: 'Tsistianov’s notoriously aggressive imperialist policy in the Caucasus was combined with his militant Europeanism and intense loathing for “Asiatic” or “Persian,” terms that he used interchangeably',
          lang: 'en',
          cite: {
            source: 'iranica-andreeva-russia-relations',
            loc: {
              section: 'RUSSIA i. Russo-Iranian Relations up to the Bolshevik Revolution',
              para: '16'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/russia-i-relations/'
          }
        },
        {
          id: 'q3',
          text: 'A direct military confrontation between Russia and Iran became inevitable, since the Qajars saw the Russian aggression in the Caucasus as a direct threat to their authority there.',
          lang: 'en',
          cite: {
            source: 'iranica-andreeva-russia-relations',
            loc: {
              section: 'RUSSIA i. Russo-Iranian Relations up to the Bolshevik Revolution',
              para: '17'
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
      id: 'russian-expansionism',
      category: 'scholarly',
      holders: [
        { kind: 'scholar', name: 'Ehsan Yarshater' }
      ],
      statements: [
        {
          id: 'q4',
          text: 'Russian expansionist policy leads to the breakout of hostilities between Russian and Persian forces.',
          lang: 'en',
          cite: {
            source: 'iranica-yarshater-chronology-part-1',
            loc: { section: 'Chronology of Iranian History Part 1, 1804' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/chronology-of-iranian-history-part-1/'
          }
        }
      ]
    },
    {
      id: 'persian-chronicles-mortaza-qoli',
      category: 'scholarly',
      holders: [
        { kind: 'scholar', name: 'Heribert Busse' }
      ],
      statements: [
        {
          id: 'q5',
          text: 'According to Persian sources, Mortażā-qolī Khan, brother and rival of Āqā Moḥammad Shah, after deserting to the Russians, persuaded them to invade territory claimed by Iran',
          lang: 'en',
          cite: {
            source: 'iranica-busse-abbas-mirza',
            loc: { section: 'ʿABBĀS MĪRZĀ QAJAR', para: '4' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/abbas-mirza'
          }
        }
      ]
    }
  ]
})
