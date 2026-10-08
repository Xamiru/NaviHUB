import { defineInterpretation } from '../../schema'

export default defineInterpretation({
  id: 'battle-of-verdun-german-aim',
  about: ['event:battle-of-verdun'],
  topic: 'motives',
  researched: '2026-10-06',
  positions: [
    {
      id: 'bleeding-france-white',
      category: 'contemporary',
      holders: [
        { kind: 'participant', name: 'Erich von Falkenhayn' }
      ],
      statements: [
        {
          id: 'q3',
          text: 'If they do so the forces of France will bleed to death — as there can be no question of a voluntary withdrawal — whether we reach our goal or not',
          lang: 'en',
          cite: {
            source: 'falkenhayn-1919-general-headquarters',
            loc: { page: '217', section: 'The Position at the end of 1915' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://archive.org/download/generalheadquart00falk/generalheadquart00falk_djvu.txt'
          }
        }
      ]
    },
    {
      id: 'ex-post-facto-reconstruction',
      category: 'scholarly',
      holders: [
        { kind: 'scholar', name: 'Elise Julien' }
      ],
      statements: [
        {
          id: 'q2',
          text: 'On the German side, Verdun was a battle of attrition which Erich von Falkenhayn (1861-1922) claimed to have conceived from the start as a deliberate bleeding dry of the French army. However, this was an ex post facto reconstruction intended to mask the failure of an offensive that was actually intended to accelerate events along the Western Front.',
          lang: 'en',
          cite: {
            source: 'eo1418-julien-verdun-site-of-memory',
            loc: { section: 'One Battle, Two Distinct Myths', para: '3' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://encyclopedia.1914-1918-online.net/article/verdun-site-of-memory/'
          }
        }
      ]
    }
  ]
})
