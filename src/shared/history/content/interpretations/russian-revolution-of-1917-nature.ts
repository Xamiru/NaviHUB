import { defineInterpretation } from '../../schema'

export default defineInterpretation({
  id: 'russian-revolution-of-1917-nature',
  about: ['event:russian-revolution-of-1917'],
  topic: 'nature',
  researched: '2026-10-06',
  positions: [
    {
      id: 'coup-detat',
      category: 'scholarly',
      holders: [
        { kind: 'organization', name: 'Library of Congress, Federal Research Division' }
      ],
      statements: [
        {
          id: 'q1',
          text: 'Thus, by acting decisively while their opponents vacillated, the Bolsheviks succeeded in effecting their coup d\'état.',
          lang: 'en',
          cite: {
            source: 'loc-russia-country-study-1996',
            loc: { section: 'Revolutions and Civil War', para: '15' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/russia/8.htm' }
        }
      ]
    },
    {
      id: 'popular-revolution',
      category: 'scholarly',
      holders: [
        { kind: 'scholar', name: 'Christopher Read' }
      ],
      statements: [
        {
          id: 'q2',
          text: 'The main driving force was a popular movement comprising peasants, workers, soldiers, and sailors who began to assert their rights and demands through a vast network of for the most part spontaneously organised committees.',
          lang: 'en',
          cite: {
            source: 'eo1418-read-revolutions-russian-empire',
            loc: { section: 'From February to the October Revolution', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://encyclopedia.1914-1918-online.net/article/revolutions-russian-empire/'
          }
        },
        {
          id: 'q3',
          text: 'As one commentator said, the Bolsheviks had not so much seized power, as found it lying in the streets and picked it up.',
          lang: 'en',
          cite: {
            source: 'eo1418-read-revolutions-russian-empire',
            loc: { section: 'The October Revolution', para: '4' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://encyclopedia.1914-1918-online.net/article/revolutions-russian-empire/'
          }
        }
      ]
    },
    {
      id: 'spontaneous-february',
      category: 'scholarly',
      holders: [
        { kind: 'school', name: 'Early accounts of the February Revolution' }
      ],
      statements: [
        {
          id: 'q4',
          text: 'Early accounts of the final crisis emphasised the spontaneous nature of the final collapse in the February Revolution.',
          lang: 'en',
          cite: {
            source: 'eo1418-read-revolutions-russian-empire',
            loc: { section: 'From War to Revolution: 1914–February 1917', para: '2' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://encyclopedia.1914-1918-online.net/article/revolutions-russian-empire/'
          }
        }
      ]
    },
    {
      id: 'elite-driven-february',
      category: 'scholarly',
      holders: [
        { kind: 'school', name: 'Historians of the elites' }
      ],
      statements: [
        {
          id: 'q5',
          text: 'In this interpretation, the immediate cause of Nicholas’ abdication was not pressure from the streets but telegrams from six of the seven front commanders demanding his abdication.',
          lang: 'en',
          cite: {
            source: 'eo1418-read-revolutions-russian-empire',
            loc: { section: 'From War to Revolution: 1914–February 1917', para: '3' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://encyclopedia.1914-1918-online.net/article/revolutions-russian-empire/'
          }
        },
        {
          id: 'q6',
          text: 'Instead of stopping revolution, the February incompetents had opened it up.',
          lang: 'en',
          cite: {
            source: 'eo1418-read-revolutions-russian-empire',
            loc: { section: 'From War to Revolution: 1914–February 1917', para: '3' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://encyclopedia.1914-1918-online.net/article/revolutions-russian-empire/'
          }
        }
      ]
    }
  ]
})
