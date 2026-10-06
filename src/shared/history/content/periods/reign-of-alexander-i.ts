import { definePeriod } from '../../schema'

export default definePeriod({
  id: 'reign-of-alexander-i',
  names: [
    { text: 'Reign of Alexander I of Russia', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-06',
  periodType: 'reign',
  start: {
    alts: [
      {
        value: { d: '1801' },
        cites: [
          {
            source: 'loc-russia-country-study-1996',
            loc: { section: 'Ruling the Empire', para: '5' }
          }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1825' },
        cites: [
          {
            source: 'loc-russia-country-study-1996',
            loc: { section: 'Ruling the Empire', para: '5' }
          }
        ]
      }
    ]
  },
  regions: ['russia-central-asia', 'europe'],
  prominence: 2,
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'During the early nineteenth century, Russia\'s population, resources, international diplomacy, and military forces made it one of the most powerful states in the world.',
          lang: 'en',
          cite: {
            source: 'loc-russia-country-study-1996',
            loc: { section: 'Ruling the Empire', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/russia/5.htm' }
        },
        {
          id: 'q2',
          text: 'Alexander\'s primary focus was not on domestic policy but on foreign affairs, and particularly on Napoleon.',
          lang: 'en',
          cite: {
            source: 'loc-russia-country-study-1996',
            loc: { section: 'Ruling the Empire', para: '6' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/russia/5.htm' }
        },
        {
          id: 'q3',
          text: 'Russia lost little territory under the treaty, and Alexander made use of his alliance with Napoleon for further expansion. He wrested the Grand Duchy of Finland from Sweden in 1809 and acquired Bessarabia from Turkey in 1812.',
          lang: 'en',
          cite: {
            source: 'loc-russia-country-study-1996',
            loc: { section: 'Ruling the Empire', para: '6' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/russia/5.htm' }
        }
      ]
    },
    {
      kind: 'legacy',
      quotes: [
        {
          id: 'q4',
          text: 'Historians have generally agreed that a revolutionary movement was born during the reign of Alexander I.',
          lang: 'en',
          cite: {
            source: 'loc-russia-country-study-1996',
            loc: { section: 'Ruling the Empire', para: '10' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/russia/5.htm' }
        }
      ]
    }
  ]
})
