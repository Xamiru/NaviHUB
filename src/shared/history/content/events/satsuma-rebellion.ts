import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'satsuma-rebellion',
  names: [
    { text: 'Satsuma Rebellion', lang: 'en', role: 'primary' },
    { text: '西南戦争', lang: 'ja', role: 'native' }
  ],
  researched: '2026-10-07',
  type: 'uprising',
  start: {
    alts: [
      {
        value: { d: '1877' },
        cites: [
          {
            source: 'loc-japan-country-study-1994',
            loc: { section: 'Opposition to the Meiji Oligarchy', para: '1' }
          }
        ]
      }
    ]
  },
  regions: ['east-asia'],
  prominence: 2,
  partOf: [
    { ref: 'period:meiji-era' }
  ],
  participants: [
    {
      ref: 'person:saigo-takamori',
      role: 'leader',
      cites: [
        {
          source: 'loc-japan-country-study-1994',
          loc: { section: 'Opposition to the Meiji Oligarchy', para: '1' }
        }
      ]
    }
  ],
  related: [
    { ref: 'event:meiji-restoration', rel: 'related' }
  ],
  sections: [
    {
      kind: 'background',
      quotes: [
        {
          id: 'q1',
          text: 'The Saga Rebellion and other agrarian and samurai uprisings mounted in protest to the Meiji reforms had been easily put down by the army. Satsuma\'s former samurai were numerous, however, and they had a long tradition of opposition to central authority.',
          lang: 'en',
          cite: {
            source: 'loc-japan-country-study-1994',
            loc: { section: 'Opposition to the Meiji Oligarchy', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/japan/24.htm' }
        },
        {
          id: 'q2',
          text: 'Former samurai found new pursuits as bureaucrats, teachers, army officers, police officials, journalists, scholars, colonists in the northern parts of Japan, bankers, and businessmen. These occupations helped stem some of the discontent this large group felt; some profited immensely, but many were not successful and provided significant opposition in the ensuing years.',
          lang: 'en',
          cite: {
            source: 'loc-japan-country-study-1994',
            loc: { section: 'THE EMERGENCE OF MODERN JAPAN', para: '7' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/japan/22.htm' }
        }
      ]
    },
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q4',
          text: 'Saigo, with some reluctance and only after more widespread dissatisfaction with the Meiji reforms, raised a rebellion in 1877.',
          lang: 'en',
          cite: {
            source: 'loc-japan-country-study-1994',
            loc: { section: 'Opposition to the Meiji Oligarchy', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/japan/24.htm' }
        },
        {
          id: 'q3',
          text: 'Three years later, the last major armed uprising--but the most serious challenge to the Meiji government-- took shape in the Satsuma Rebellion, this time with Saigo playing an active role.',
          lang: 'en',
          cite: {
            source: 'loc-japan-country-study-1994',
            loc: { section: 'Opposition to the Meiji Oligarchy', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/japan/24.htm' }
        },
        {
          id: 'q5',
          text: 'Both sides fought well, but the modern weaponry and better financing of the government forces ended the Satsuma Rebellion.',
          lang: 'en',
          cite: {
            source: 'loc-japan-country-study-1994',
            loc: { section: 'Opposition to the Meiji Oligarchy', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/japan/24.htm' }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q6',
          text: 'The suppression of the Satsuma Rebellion marked the end of serious threats to the Meiji regime but was sobering to the oligarchy. The fight drained the national treasury, led to serious inflation, and forced land values--and badly needed taxes--down. Most important, calls for reform were renewed.',
          lang: 'en',
          cite: {
            source: 'loc-japan-country-study-1994',
            loc: { section: 'Opposition to the Meiji Oligarchy', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/japan/24.htm' }
        }
      ]
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/c/c2/Saig%C5%8D%2C_Shiroyama_uchijini-zu_by_Toshimitsu.jpg/1280px-Saig%C5%8D%2C_Shiroyama_uchijini-zu_by_Toshimitsu.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Saig%C5%8D,_Shiroyama_uchijini-zu_by_Toshimitsu.jpg',
    credit: { institution: 'Freer Gallery of Art', creator: 'Toshimitsu' },
    license: { id: 'public-domain' }
  }
})
