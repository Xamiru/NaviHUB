import { definePerson } from '../../schema'

export default definePerson({
  id: 'simon-bolivar',
  names: [
    { text: 'Simón Bolívar', lang: 'en', role: 'primary' },
    { text: 'Simón Bolívar', lang: 'es', role: 'native' }
  ],
  researched: '2026-10-08',
  born: {
    alts: [
      {
        value: { d: '1783' },
        cites: [
          {
            source: 'loc-venezuela-country-study-1990',
            loc: { section: 'The Epic of Independence', para: '6' }
          }
        ]
      }
    ]
  },
  died: {
    alts: [
      {
        value: { d: '1830-12' },
        cites: [
          {
            source: 'loc-venezuela-country-study-1990',
            loc: { section: 'The Epic of Independence', para: '10' }
          }
        ]
      }
    ]
  },
  bornIn: {
    ref: 'place:caracas',
    cites: [
      {
        source: 'loc-venezuela-country-study-1990',
        loc: { section: 'The Epic of Independence', para: '6' }
      }
    ]
  },
  regions: ['latin-america'],
  roles: ['revolutionary', 'military', 'head-of-state'],
  offices: [
    {
      title: 'President of Gran Colombia',
      polity: 'polity:gran-colombia',
      start: {
        alts: [
          {
            value: { d: '1819-08' },
            cites: [
              {
                source: 'loc-colombia-country-study-1988',
                loc: { section: 'Gran Colombia', para: '1' }
              }
            ]
          }
        ]
      },
      cites: [
        {
          source: 'loc-colombia-country-study-1988',
          loc: { section: 'Gran Colombia', para: '1' }
        }
      ]
    }
  ],
  sections: [
    {
      kind: 'early-life',
      quotes: [
        {
          id: 'q1',
          text: 'Bolívar was born in 1783 into one of Caracas\'s most aristocratic criollo families. Orphaned at age nine, he was educated in Europe, where he became intrigued by the intellectual revolution called the Enlightenment and the political revolution in France. As a young man, Bolívar pledged himself to see a united Latin America, not simply his native Venezuela, liberated from Spanish rule.',
          lang: 'en',
          cite: {
            source: 'loc-venezuela-country-study-1990',
            loc: { section: 'The Epic of Independence', para: '6' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/venezuela/4.htm' }
        }
      ]
    },
    {
      kind: 'career',
      quotes: [
        {
          id: 'q2',
          text: 'His brilliant career as a field general began in 1813 with the famous cry of "war to the death" against Venezuela\'s Spanish rulers that was followed by a lightning campaign through the Andes to capture Caracas.',
          lang: 'en',
          cite: {
            source: 'loc-venezuela-country-study-1990',
            loc: { section: 'The Epic of Independence', para: '6' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/venezuela/4.htm' }
        },
        {
          id: 'q3',
          text: 'Bolívar was forced to flee to Jamaica, where he issued an eloquent letter that established his intellectual leadership of the Spanish American independence movement.',
          lang: 'en',
          cite: {
            source: 'loc-venezuela-country-study-1990',
            loc: { section: 'The Epic of Independence', para: '7' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/venezuela/4.htm' }
        }
      ]
    },
    {
      kind: 'death',
      quotes: [
        {
          id: 'q4',
          text: 'Shortly before his death in December 1830, the liberator of northern South America likened his efforts at Latin American unity to having "plowed the sea."',
          lang: 'en',
          cite: {
            source: 'loc-venezuela-country-study-1990',
            loc: { section: 'The Epic of Independence', para: '10' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/venezuela/4.htm' }
        }
      ]
    }
  ],
  portrait: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/0/06/Sim%C3%B3n_Bol%C3%ADvar%2C_1825.jpg/1280px-Sim%C3%B3n_Bol%C3%ADvar%2C_1825.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Sim%C3%B3n_Bol%C3%ADvar,_1825.jpg',
    credit: { creator: 'José Gil de Castro' },
    license: { id: 'public-domain' }
  }
})
