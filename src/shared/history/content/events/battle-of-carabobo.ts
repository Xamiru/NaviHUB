import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'battle-of-carabobo',
  names: [
    { text: 'Battle of Carabobo', lang: 'en', role: 'primary' },
    { text: 'Batalla de Carabobo', lang: 'es', role: 'native' }
  ],
  researched: '2026-10-06',
  type: 'battle',
  start: {
    alts: [
      {
        value: { d: '1821-06' },
        cites: [
          {
            source: 'loc-venezuela-country-study-1990',
            loc: { section: 'The Epic of Independence', para: '8' }
          }
        ]
      }
    ]
  },
  regions: ['latin-america'],
  prominence: 3,
  places: [
    { ref: 'place:carabobo' }
  ],
  related: [
    { ref: 'period:gran-colombia', rel: 'related' }
  ],
  participants: [
    {
      ref: 'person:simon-bolivar',
      role: 'commander',
      cites: [
        {
          source: 'loc-venezuela-country-study-1990',
          loc: { section: 'The Epic of Independence', para: '8' }
        }
      ]
    }
  ],
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'Nearly two years later, in June 1821, Bolívar\'s troops fought the decisive Battle of Carabobo that liberated Caracas from Spanish rule.',
          lang: 'en',
          cite: {
            source: 'loc-venezuela-country-study-1990',
            loc: { section: 'The Epic of Independence', para: '8' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/venezuela/4.htm' }
        }
      ]
    },
    {
      kind: 'aftermath',
      quotes: [
        {
          id: 'q2',
          text: 'In August delegates from Venezuela and Colombia met at the border town of Cúcuta to formally sign the Constitution of the Republic of Gran Colombia, with its capital in Bogotá.',
          lang: 'en',
          cite: {
            source: 'loc-venezuela-country-study-1990',
            loc: { section: 'The Epic of Independence', para: '8' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/venezuela/4.htm' }
        },
        {
          id: 'q3',
          text: 'Bolívar was named president and Francisco de Paula Santander, a Colombian, was named vice president.',
          lang: 'en',
          cite: {
            source: 'loc-venezuela-country-study-1990',
            loc: { section: 'The Epic of Independence', para: '8' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/venezuela/4.htm' }
        }
      ]
    }
  ]
})
