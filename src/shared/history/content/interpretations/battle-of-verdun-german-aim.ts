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
          id: 'q1',
          text: 'Mit massivem Materialeinsatz geführte Schlacht bei Verdun soll Frankreich "ausbluten" lassen.',
          lang: 'de',
          cite: { source: 'lemo-chronik-1916', loc: { section: 'Chronik 1916', para: '23' } },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.dhm.de/lemo/jahreschronik/1916.html'
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
