import { defineInterpretation } from '../../schema'

export default defineInterpretation({
  id: 'mexican-revolution-meaning',
  about: ['event:mexican-revolution'],
  topic: 'nature',
  researched: '2026-10-06',
  positions: [
    {
      id: 'political-restoration',
      category: 'contemporary',
      holders: [
        { kind: 'participant', name: 'Francisco I. Madero', ref: 'person:francisco-madero' }
      ],
      statements: [
        {
          id: 'q1',
          text: 'Although it was mainly a political document with scant reference to redressing Mexico\'s many social ills, the Plan of San Luis Potosí was enthusiastically received among the widespread, but uncoordinated movements that were already on the verge of rebellion against their respective state governments.',
          lang: 'en',
          cite: {
            source: 'loc-mexico-country-study-1996',
            loc: { section: 'The Revolution, 1910-20', para: '5' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/mexico/26.htm' }
        }
      ]
    },
    {
      id: 'agrarian-social-revolution',
      category: 'contemporary',
      holders: [
        { kind: 'participant', name: 'Emiliano Zapata', ref: 'person:emiliano-zapata' }
      ],
      statements: [
        {
          id: 'q2',
          text: 'Zapata had come to Mexico City to claim hacienda land for the peasants of Morelos, which to him was the only acceptable result of the overthrow of the Díaz regime.',
          lang: 'en',
          cite: {
            source: 'loc-mexico-country-study-1996',
            loc: { section: 'Madero\'s Government', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/mexico/27.htm' }
        }
      ]
    },
    {
      id: 'revolution-and-world-war',
      category: 'scholarly',
      holders: [
        { kind: 'scholar', name: 'Stephan Scheuzger' }
      ],
      statements: [
        {
          id: 'q3',
          text: 'Between 1914 and 1918, state actors in Germany, Great Britain and the United States defined their policies towards Mexico and its nationalist revolution with a view not only to improve their respective economic interests but also to influence the course of the world war.',
          lang: 'en',
          cite: {
            source: 'eo1418-scheuzger-mexican-revolution',
            loc: { section: 'Mexican Revolution' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://encyclopedia.1914-1918-online.net/article/mexican-revolution/'
          }
        }
      ]
    }
  ]
})
