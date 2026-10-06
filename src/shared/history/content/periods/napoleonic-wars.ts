import { definePeriod } from '../../schema'

export default definePeriod({
  id: 'napoleonic-wars',
  names: [
    { text: 'Napoleonic Wars', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-06',
  periodType: 'war-period',
  start: {
    alts: [
      {
        value: { d: '1803' },
        cites: [
          {
            source: 'state-dept-milestones-napoleonic-wars',
            loc: { section: 'Napoleonic Wars and the United States, 1803–1815' }
          },
          {
            source: 'state-dept-milestones-napoleonic-wars',
            loc: { section: 'Napoleonic Wars and the United States, 1803–1815', para: '4' }
          }
        ]
      },
      {
        value: { d: '1796' },
        cites: [
          {
            source: 'loc-india-country-study-1995',
            loc: { section: 'The British Empire in India: Company Rule, 1757-1857', para: '1' }
          }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1815' },
        cites: [
          {
            source: 'state-dept-milestones-napoleonic-wars',
            loc: { section: 'Napoleonic Wars and the United States, 1803–1815' }
          },
          {
            source: 'loc-india-country-study-1995',
            loc: { section: 'The British Empire in India: Company Rule, 1757-1857', para: '1' }
          }
        ]
      }
    ]
  },
  regions: ['europe', 'global'],
  prominence: 1,
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'The Napoleonic Wars continued the Wars of the French Revolution. Great Britain and France fought for European supremacy, and treated weaker powers heavy-handedly.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-napoleonic-wars',
            loc: { section: 'Napoleonic Wars and the United States, 1803–1815', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://history.state.gov/milestones/1801-1829/napoleonic-wars'
          }
        },
        {
          id: 'q2',
          text: 'As a major European power, Russia could not escape the wars involving revolutionary and Napoleonic France.',
          lang: 'en',
          cite: {
            source: 'loc-russia-country-study-1996',
            loc: { section: 'Ruling the Empire', para: '4' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/russia/5.htm' }
        },
        {
          id: 'q3',
          text: 'As expected, Britain declared war on France in 1803, and would remain at war for over a decade.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-napoleonic-wars',
            loc: { section: 'Napoleonic Wars and the United States, 1803–1815', para: '4' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://history.state.gov/milestones/1801-1829/napoleonic-wars'
          }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q4',
          text: 'Approximately 300 states had existed within the Holy Roman Empire in 1789; only about forty remained by 1814.',
          lang: 'en',
          cite: {
            source: 'loc-germany-country-study-1995',
            loc: { section: 'The French Revolution and Germany', para: '5' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/germany/22.htm' }
        },
        {
          id: 'q5',
          text: 'External threats, both real and imagined, such as the Napoleonic Wars (1796-1815) and Russian expansion toward Afghanistan (in the 1830s), as well as the desire for internal stability, led to the annexation of more territory in India.',
          lang: 'en',
          cite: {
            source: 'loc-india-country-study-1995',
            loc: { section: 'The British Empire in India: Company Rule, 1757-1857', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/india/16.htm' }
        }
      ]
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/b/ba/La_bataille_d%27Austerlitz._2_decembre_1805_%28Fran%C3%A7ois_G%C3%A9rard%29.jpg/1280px-La_bataille_d%27Austerlitz._2_decembre_1805_%28Fran%C3%A7ois_G%C3%A9rard%29.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:La_bataille_d%27Austerlitz._2_decembre_1805_(Fran%C3%A7ois_G%C3%A9rard).jpg',
    credit: { creator: 'François Gérard' },
    license: { id: 'public-domain' }
  }
})
