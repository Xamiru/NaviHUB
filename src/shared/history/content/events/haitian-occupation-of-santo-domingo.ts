import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'haitian-occupation-of-santo-domingo',
  names: [
    { text: 'Haitian occupation of Santo Domingo', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-06',
  type: 'occupation',
  start: {
    alts: [
      {
        value: { d: '1822' },
        cites: [
          {
            source: 'loc-haiti-country-study-1989',
            loc: { section: 'Boyer: Expansion and Decline', para: '1' }
          }
        ]
      }
    ]
  },
  regions: ['latin-america'],
  prominence: 3,
  participants: [
    {
      name: 'Jean-Pierre Boyer',
      role: 'leader',
      cites: [
        {
          source: 'loc-haiti-country-study-1989',
          loc: { section: 'Boyer: Expansion and Decline', para: '1' }
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
          text: 'Boyer took advantage of internecine conflict in Santo Domingo by invading and securing the Spanish part of Hispaniola in 1822.',
          lang: 'en',
          cite: {
            source: 'loc-haiti-country-study-1989',
            loc: { section: 'Boyer: Expansion and Decline', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/haiti/13.htm' }
        },
        {
          id: 'q2',
          text: 'He succeeded where Toussaint and Dessalines had failed.',
          lang: 'en',
          cite: {
            source: 'loc-haiti-country-study-1989',
            loc: { section: 'Boyer: Expansion and Decline', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/haiti/13.htm' }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q3',
          text: 'Occupation of the territory, however, proved unproductive for the Haitians, and ultimately it sparked a Dominican rebellion.',
          lang: 'en',
          cite: {
            source: 'loc-haiti-country-study-1989',
            loc: { section: 'Boyer: Expansion and Decline', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/haiti/13.htm' }
        }
      ]
    }
  ]
})
