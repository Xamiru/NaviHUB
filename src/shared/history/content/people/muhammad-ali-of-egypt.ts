import { definePerson } from '../../schema'

export default definePerson({
  id: 'muhammad-ali-of-egypt',
  names: [
    { text: 'Muhammad Ali of Egypt', lang: 'en', role: 'primary' },
    { text: 'محمد علي باشا', lang: 'ar', role: 'native' }
  ],
  researched: '2026-10-06',
  died: {
    alts: [
      {
        value: { d: '1849-08' },
        cites: [
          {
            source: 'loc-egypt-country-study-1990',
            loc: { section: 'Muhammad Ali, 1805-48', para: '10' }
          }
        ]
      }
    ]
  },
  regions: ['mena'],
  roles: ['military', 'politician'],
  offices: [
    {
      title: 'governor of Egypt',
      start: {
        alts: [
          {
            value: { d: '1805-06' },
            cites: [
              {
                source: 'loc-egypt-country-study-1990',
                loc: { section: 'Muhammad Ali, 1805-48', para: '3' }
              }
            ]
          }
        ]
      },
      end: {
        alts: [
          {
            value: { d: '1848' },
            cites: [
              {
                source: 'loc-egypt-country-study-1990',
                loc: { section: 'Muhammad Ali, 1805-48', para: '10' }
              }
            ]
          }
        ]
      },
      cites: [
        {
          source: 'loc-egypt-country-study-1990',
          loc: { section: 'Muhammad Ali, 1805-48', para: '3' }
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
          text: 'Muhammad Ali, who had arrived in Egypt as a junior commander in the Albanian forces, had by 1803 risen to commander.',
          lang: 'en',
          cite: {
            source: 'loc-egypt-country-study-1990',
            loc: { section: 'Muhammad Ali, 1805-48', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/egypt/21.htm' }
        },
        {
          id: 'q2',
          text: 'Muhammad Ali was also committed to the industrial development of Egypt.',
          lang: 'en',
          cite: {
            source: 'loc-egypt-country-study-1990',
            loc: { section: 'Muhammad Ali, 1805-48', para: '6' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/egypt/21.htm' }
        },
        {
          id: 'q3',
          text: 'Muhammad Ali\'s development strategy was based on agriculture.',
          lang: 'en',
          cite: {
            source: 'loc-egypt-country-study-1990',
            loc: { section: 'Muhammad Ali, 1805-48', para: '5' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/egypt/21.htm' }
        }
      ]
    },
    {
      kind: 'legacy',
      quotes: [
        {
          id: 'q4',
          text: 'The historian Marsot has argued that Britain became determined to check Muhammad Ali because a strong Egypt represented a threat to Britain\'s economic and strategic interests.',
          lang: 'en',
          cite: {
            source: 'loc-egypt-country-study-1990',
            loc: { section: 'Muhammad Ali, 1805-48', para: '7' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/egypt/21.htm' }
        }
      ]
    },
    {
      kind: 'death',
      quotes: [
        {
          id: 'q5',
          text: 'Muhammad Ali died in August 1849.',
          lang: 'en',
          cite: {
            source: 'loc-egypt-country-study-1990',
            loc: { section: 'Muhammad Ali, 1805-48', para: '10' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/egypt/21.htm' }
        }
      ]
    }
  ],
  portrait: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/2/2d/ModernEgypt%2C_Muhammad_Ali_by_Auguste_Couder%2C_BAP_17996.jpg/1280px-ModernEgypt%2C_Muhammad_Ali_by_Auguste_Couder%2C_BAP_17996.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:ModernEgypt,_Muhammad_Ali_by_Auguste_Couder,_BAP_17996.jpg',
    credit: {
      institution: 'Bibliotheca Alexandrina, Memory of Modern Egypt Digital Archive',
      creator: 'Auguste Couder'
    },
    license: { id: 'public-domain' }
  }
})
