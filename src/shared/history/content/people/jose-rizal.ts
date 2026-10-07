import { definePerson } from '../../schema'

export default definePerson({
  id: 'jose-rizal',
  names: [
    { text: 'José Rizal', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-07',
  born: {
    alts: [
      {
        value: { d: '1861' },
        cites: [
          {
            source: 'loc-philippines-country-study-1991',
            loc: { section: 'José Rizal and the Propaganda Movement', para: '2' }
          }
        ]
      }
    ]
  },
  died: {
    alts: [
      {
        value: { d: '1896-12-30' },
        cites: [
          {
            source: 'loc-philippines-country-study-1991',
            loc: { section: 'The 1896 Uprising and Rizal\'s Execution', para: '4' }
          }
        ]
      }
    ]
  },
  diedIn: {
    ref: 'place:manila',
    cites: [
      {
        source: 'loc-philippines-country-study-1991',
        loc: { section: 'The 1896 Uprising and Rizal\'s Execution', para: '4' }
      }
    ]
  },
  regions: ['southeast-asia'],
  roles: ['writer', 'activist', 'scholar'],
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'The most outstanding Propagandist was José Rizal, a physician, scholar, scientist, and writer.',
          lang: 'en',
          cite: {
            source: 'loc-philippines-country-study-1991',
            loc: { section: 'José Rizal and the Propaganda Movement', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/philippines/10.htm' }
        }
      ]
    },
    {
      kind: 'works',
      quotes: [
        {
          id: 'q2',
          text: 'His greatest impact on the development of a Filipino national consciousness, however, was his publication of two novels--Noli Me Tangere (Touch me not) in 1886 and El Filibusterismo (The reign of greed) in 1891.',
          lang: 'en',
          cite: {
            source: 'loc-philippines-country-study-1991',
            loc: { section: 'José Rizal and the Propaganda Movement', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/philippines/10.htm' }
        }
      ]
    },
    {
      kind: 'career',
      quotes: [
        {
          id: 'q3',
          text: 'In July he established the Liga Filipina (Philippine League), designed to be a truly national, nonviolent organization.',
          lang: 'en',
          cite: {
            source: 'loc-philippines-country-study-1991',
            loc: { section: 'José Rizal and the Propaganda Movement', para: '5' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/philippines/10.htm' }
        }
      ]
    },
    {
      kind: 'death',
      quotes: [
        {
          id: 'q4',
          text: 'On December 30, 1896, he was brought out to the Luneta and executed by a firing squad.',
          lang: 'en',
          cite: {
            source: 'loc-philippines-country-study-1991',
            loc: { section: 'The 1896 Uprising and Rizal\'s Execution', para: '4' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/philippines/12.htm' }
        }
      ]
    }
  ],
  portrait: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/a/aa/Jose_rizal_craig01g.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Jose_rizal_craig01g.jpg',
    credit: {
      institution: 'Austin Craig, Lineage, Life and Labors of José Rizal (1909)',
      creator: 'Juan Luna'
    },
    license: { id: 'public-domain' }
  }
})
