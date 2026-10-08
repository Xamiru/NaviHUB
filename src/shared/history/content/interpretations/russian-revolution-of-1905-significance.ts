import { defineInterpretation } from '../../schema'

export default defineInterpretation({
  id: 'russian-revolution-of-1905-significance',
  about: ['event:russian-revolution-of-1905'],
  topic: 'significance',
  researched: '2026-10-08',
  positions: [
    {
      id: 'dress-rehearsal',
      category: 'contemporary',
      holders: [
        { kind: 'participant', name: 'Vladimir Lenin' },
        { kind: 'party', name: 'Bolsheviks' }
      ],
      statements: [
        {
          id: 'q1',
          text: 'Without the “dress rehearsal” of 1905, the victory of the October Revolution in 1917 would have been impossible.',
          lang: 'en',
          cite: {
            source: 'lenin-1920-left-wing-communism-chapter-3',
            loc: { section: 'Chapter III. The Principal Stages in the History of Bolshevism' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.marxists.org/archive/lenin/works/1920/lwc/ch03.htm'
          }
        }
      ]
    },
    {
      id: 'revolution-in-its-own-right',
      category: 'scholarly',
      holders: [
        { kind: 'scholar', name: 'Siobhan Peeling' },
        { kind: 'school', name: 'Western historians of the 1905 Revolution' }
      ],
      statements: [
        {
          id: 'q2',
          text: 'Some western historians emphasise the importance of 1905 as a revolution in its own right. Virtually all social groups and geographical areas were affected, and in some localities insurgents briefly assumed the powers of government. The autocracy was driven to the brink of collapse and forced to concede limits on its power for the first time.',
          lang: 'en',
          cite: { source: 'eo1418-peeling-revolution-of-1905', loc: { section: 'Impact' } },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://encyclopedia.1914-1918-online.net/article/revolution-of-1905-russian-empire/'
          }
        },
        {
          id: 'q3',
          text: 'While some historians believe that 1905 fatally weakened the old order, for others it was not until World War I, and its effect on society, the economy, and the army, that a final blow seemed possible.',
          lang: 'en',
          cite: { source: 'eo1418-peeling-revolution-of-1905', loc: { section: 'Impact' } },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://encyclopedia.1914-1918-online.net/article/revolution-of-1905-russian-empire/'
          }
        }
      ]
    }
  ]
})
