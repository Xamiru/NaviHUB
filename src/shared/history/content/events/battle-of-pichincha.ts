import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'battle-of-pichincha',
  names: [
    { text: 'Battle of Pichincha', lang: 'en', role: 'primary' },
    { text: 'Batalla de Pichincha', lang: 'es', role: 'native' }
  ],
  researched: '2026-10-06',
  type: 'battle',
  start: {
    alts: [
      {
        value: { d: '1822-05-24' },
        cites: [
          {
            source: 'loc-ecuador-country-study-1989',
            loc: { section: 'THE STRUGGLE FOR INDEPENDENCE', para: '6' }
          }
        ]
      }
    ]
  },
  regions: ['latin-america'],
  prominence: 3,
  places: [
    {
      ref: 'place:quito',
      cites: [
        {
          source: 'loc-ecuador-country-study-1989',
          loc: { section: 'THE STRUGGLE FOR INDEPENDENCE', para: '6' }
        }
      ]
    }
  ],
  participants: [
    {
      ref: 'person:antonio-jose-de-sucre',
      role: 'commander',
      cites: [
        {
          source: 'loc-ecuador-country-study-1989',
          loc: { section: 'THE STRUGGLE FOR INDEPENDENCE', para: '6' }
        }
      ]
    },
    {
      name: 'Andrés de Santa Cruz Calahumana',
      role: 'commander',
      cites: [
        {
          source: 'loc-ecuador-country-study-1989',
          loc: { section: 'THE STRUGGLE FOR INDEPENDENCE', para: '6' }
        }
      ]
    }
  ],
  sections: [
    {
      kind: 'background',
      quotes: [
        {
          id: 'q1',
          text: 'The second chapter in Ecuador\'s struggle for emancipation from Spanish colonial rule began in Guayaquil, where independence was proclaimed in October 1820 by a local patriotic junta under the leadership of the poet José Joaquín Olmedo.',
          lang: 'en',
          cite: {
            source: 'loc-ecuador-country-study-1989',
            loc: { section: 'THE STRUGGLE FOR INDEPENDENCE', para: '5' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/ecuador/7.htm' }
        },
        {
          id: 'q2',
          text: 'After a number of initial successes, Sucre\'s army was defeated at Ambato in the central Sierra and he appealed for assistance from San Martín, whose army was by now in Peru.',
          lang: 'en',
          cite: {
            source: 'loc-ecuador-country-study-1989',
            loc: { section: 'THE STRUGGLE FOR INDEPENDENCE', para: '6' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/ecuador/7.htm' }
        }
      ]
    },
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q3',
          text: 'A string of victories culminated in the decisive Battle of Pichincha, on the slopes of the volcano of that name on the western outskirts of Quito, on May 24, 1822.',
          lang: 'en',
          cite: {
            source: 'loc-ecuador-country-study-1989',
            loc: { section: 'THE STRUGGLE FOR INDEPENDENCE', para: '6' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/ecuador/7.htm' }
        },
        {
          id: 'q4',
          text: 'A few hours after the victory by the patriots, the last president of the Audiencia of Quito signed a formal capitulation of his forces before Marshal Sucre.',
          lang: 'en',
          cite: {
            source: 'loc-ecuador-country-study-1989',
            loc: { section: 'THE STRUGGLE FOR INDEPENDENCE', para: '6' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/ecuador/7.htm' }
        },
        {
          id: 'q5',
          text: 'Ecuador was at last free of Spanish rule.',
          lang: 'en',
          cite: {
            source: 'loc-ecuador-country-study-1989',
            loc: { section: 'THE STRUGGLE FOR INDEPENDENCE', para: '6' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/ecuador/7.htm' }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q6',
          text: 'When present-day Ecuador was liberated in 1822, it also joined Gran Colombia.',
          lang: 'en',
          cite: {
            source: 'loc-colombia-country-study-1988',
            loc: { section: 'Gran Colombia', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/colombia/13.htm' }
        }
      ]
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/2/2a/Armisticio_de_la_batalla_de_Pichincha_-_Antonio_Salas_%28siglo_XIX%29.jpg/1280px-Armisticio_de_la_batalla_de_Pichincha_-_Antonio_Salas_%28siglo_XIX%29.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Armisticio_de_la_batalla_de_Pichincha_-_Antonio_Salas_(siglo_XIX).jpg',
    credit: { institution: 'Banco Central del Ecuador', creator: 'Antonio Salas' },
    license: { id: 'public-domain' }
  }
})
