import { definePerson } from '../../schema'

export default definePerson({
  id: 'hirohito',
  names: [
    { text: 'Hirohito', lang: 'en', role: 'primary' },
    { text: '裕仁', lang: 'ja', role: 'native' }
  ],
  researched: '2026-10-08',
  born: {
    alts: [
      {
        value: { d: '1901' },
        cites: [
          { source: 'lemo-chronik-1926', loc: { section: 'Chronik 1926' } }
        ]
      }
    ]
  },
  died: {
    alts: [
      {
        value: { d: '1989' },
        cites: [
          { source: 'lemo-chronik-1926', loc: { section: 'Chronik 1926' } }
        ]
      }
    ]
  },
  regions: ['east-asia'],
  roles: ['monarch'],
  offices: [
    {
      title: 'Emperor of Japan',
      polity: 'polity:empire-of-japan',
      cites: [
        {
          source: 'loc-japan-country-study-1994',
          loc: { section: 'The Rise of the Militarists', para: '2' }
        },
        {
          source: 'loc-japan-country-study-1994',
          loc: { section: 'WORLD WAR II AND THE OCCUPATION', para: '2' }
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
          text: 'The emperor was highly revered by these groups, and when Hirohito was enthroned in 1927, initiating the Showa period (Bright Harmony, 1926-89), there were calls for a "Showa Restoration" and a revival of Shinto.',
          lang: 'en',
          cite: {
            source: 'loc-japan-country-study-1994',
            loc: { section: 'The Rise of the Militarists', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/japan/32.htm' }
        }
      ]
    },
    {
      kind: 'career',
      quotes: [
        {
          id: 'q2',
          text: 'After the detonation of atomic bombs over Hiroshima and Nagasaki on August 6 and 8, 1945, respectively, the emperor asked that the Japanese people bring peace to Japan by "enduring the unendurable and suffering what is insufferable" by surrendering to the Allied powers.',
          lang: 'en',
          cite: {
            source: 'loc-japan-country-study-1994',
            loc: { section: 'WORLD WAR II AND THE OCCUPATION', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/japan/33.htm' }
        }
      ]
    },
    {
      kind: 'later-life',
      quotes: [
        {
          id: 'q3',
          text: 'State Shinto was disestablished, and on January 1, 1946, Emperor Hirohito repudiated his divinity.',
          lang: 'en',
          cite: {
            source: 'loc-japan-country-study-1994',
            loc: { section: 'WORLD WAR II AND THE OCCUPATION', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/japan/33.htm' }
        }
      ]
    }
  ],
  portrait: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/4/44/Hirohito_in_dress_uniform.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Hirohito_in_dress_uniform.jpg',
    credit: { institution: 'Library of Congress' },
    license: { id: 'public-domain' }
  }
})
