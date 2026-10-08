import { defineInterpretation } from '../../schema'

export default defineInterpretation({
  id: 'livingstone-legacy',
  about: ['person:david-livingstone', 'event:livingstone-crossing-of-africa'],
  topic: 'legacy',
  researched: '2026-10-08',
  positions: [
    {
      id: 'imperial-mandate',
      category: 'contemporary',
      holders: [
        { kind: 'participant', name: 'Sir Harry H. Johnston' }
      ],
      statements: [
        {
          id: 'q1',
          text: 'For Johnston, Livingstone not only provided the mandate for the protectorate, but was a predecessor to his own political administration in the region: “In Zambezia and Nyasaland especially,” he wrote, “– in what will soon be called ‘British Central Africa’ – Livingstone’s work is rapidly nearing the fruition he longed for under the flag he loved” (Johnston 1891: 367).',
          lang: 'en',
          cite: {
            source: 'livingstone-online-posthumous-reputation',
            loc: { section: 'Livingstone’s Posthumous Reputation', para: '21' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://livingstoneonline.org/life-and-times/livingstone-s-posthumous-reputation'
          }
        }
      ]
    },
    {
      id: 'jeal-revisionism',
      category: 'revisionist',
      holders: [
        { kind: 'scholar', name: 'Tim Jeal' }
      ],
      statements: [
        {
          id: 'q2',
          text: 'Jeal’s revisionism aimed to rebut long-established notions about one of Britain’s cherished heroes.',
          lang: 'en',
          cite: {
            source: 'livingstone-online-posthumous-reputation',
            loc: { section: 'Livingstone’s Posthumous Reputation', para: '56' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://livingstoneonline.org/life-and-times/livingstone-s-posthumous-reputation'
          }
        },
        {
          id: 'q3',
          text: 'While Livingstone may indeed have been “a great man,” he now appeared as “awkward, sullen,” “intolerant, narrow and self-opinionated” (Jeal 2001:371, 20, 25).',
          lang: 'en',
          cite: {
            source: 'livingstone-online-posthumous-reputation',
            loc: { section: 'Livingstone’s Posthumous Reputation', para: '56' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://livingstoneonline.org/life-and-times/livingstone-s-posthumous-reputation'
          }
        }
      ],
      reception: [
        {
          id: 'q4',
          text: 'Although Jeal’s approach enlarged and productively challenged prevailing conceptions of the celebrated missionary and explorer, its conditions of possibility lay in the decolonisation of the 1960s and the end of Britain’s imperial age.',
          lang: 'en',
          cite: {
            source: 'livingstone-online-posthumous-reputation',
            loc: { section: 'Livingstone’s Posthumous Reputation', para: '57' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://livingstoneonline.org/life-and-times/livingstone-s-posthumous-reputation'
          }
        }
      ]
    },
    {
      id: 'postcolonial-critique',
      category: 'scholarly',
      holders: [
        { kind: 'scholar', name: 'Justin D. Livingstone' }
      ],
      statements: [
        {
          id: 'q5',
          text: 'For Philip, European exploration was really a form of appropriation, dependent on the knowledge of local peoples.',
          lang: 'en',
          cite: {
            source: 'livingstone-online-posthumous-reputation',
            loc: { section: 'Livingstone’s Posthumous Reputation', para: '63' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://livingstoneonline.org/life-and-times/livingstone-s-posthumous-reputation'
          }
        }
      ]
    },
    {
      id: 'malleable-myth',
      category: 'scholarly',
      holders: [
        { kind: 'scholar', name: 'Justin D. Livingstone' }
      ],
      statements: [
        {
          id: 'q6',
          text: 'As the face of imperialism changed so too did Livingstone’s image: political developments in empire tended to result in the remobilisation and reconstruction of the iconic Livingstone, in accordance with the needs of the immediate context.',
          lang: 'en',
          cite: {
            source: 'livingstone-online-posthumous-reputation',
            loc: { section: 'Livingstone’s Posthumous Reputation', para: '18' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://livingstoneonline.org/life-and-times/livingstone-s-posthumous-reputation'
          }
        }
      ]
    }
  ]
})
