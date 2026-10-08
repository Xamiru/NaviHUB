import { defineInterpretation } from '../../schema'

export default defineInterpretation({
  id: 'first-taranaki-war-causes',
  about: ['event:first-taranaki-war'],
  topic: 'causes',
  positions: [
    {
      id: 'kingite-account',
      category: 'contemporary',
      holders: [
        { kind: 'participant', name: 'A Kingite survivor of the wars (Te Atiawa)' }
      ],
      statements: [
        {
          id: 'q1',
          text: 'A woman, Hariata, was the cause.',
          lang: 'en',
          cite: {
            source: 'cowan-1922-new-zealand-wars-vol-1',
            loc: { section: 'Chapter XVII. The Waitara Purchase' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://archive.org/download/newzealandwarshi01cowa/newzealandwarshi01cowa_djvu.txt'
          }
        },
        {
          id: 'q2',
          text: 'Ihaia, however, would not listen to this agreement, and he joined with Teira and sold some of the land of Te Rangitaake to the Government',
          lang: 'en',
          cite: {
            source: 'cowan-1922-new-zealand-wars-vol-1',
            loc: { section: 'Chapter XVII. The Waitara Purchase' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://archive.org/download/newzealandwarshi01cowa/newzealandwarshi01cowa_djvu.txt'
          }
        }
      ]
    },
    {
      id: 'defective-purchase',
      category: 'scholarly',
      holders: [
        { kind: 'scholar', name: 'James Cowan' }
      ],
      statements: [
        {
          id: 'q3',
          text: 'This land had always been thickly populated, and was the property of a great many families, and Wiremu Kingi, as the paramount chief, undoubtedly exercised his right in vetoing the sale.',
          lang: 'en',
          cite: {
            source: 'cowan-1922-new-zealand-wars-vol-1',
            loc: { section: 'Chapter XVII. The Waitara Purchase' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://archive.org/download/newzealandwarshi01cowa/newzealandwarshi01cowa_djvu.txt'
          }
        },
        {
          id: 'q4',
          text: 'among the natives, the Waitara, with its fairly numerous population and its highly complicated system of ownership, was the worst possible spot that Governor Gore Browne\'s advisers could have selected for a demonstration of their announced intention to bargain with individual owners.',
          lang: 'en',
          cite: {
            source: 'cowan-1922-new-zealand-wars-vol-1',
            loc: { section: 'Chapter XVII. The Waitara Purchase' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://archive.org/download/newzealandwarshi01cowa/newzealandwarshi01cowa_djvu.txt'
          }
        }
      ]
    }
  ],
  researched: '2026-10-08'
})
