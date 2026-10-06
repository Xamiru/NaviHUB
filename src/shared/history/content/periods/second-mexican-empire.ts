import { definePeriod } from '../../schema'

export default definePeriod({
  id: 'second-mexican-empire',
  names: [
    { text: 'Second Mexican Empire', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-06',
  periodType: 'regime',
  start: {
    alts: [
      {
        value: { d: '1864-06-12' },
        cites: [
          {
            source: 'loc-mexico-country-study-1996',
            loc: { section: 'Civil War and the French Intervention', para: '4' }
          }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1867-05-15' },
        cites: [
          {
            source: 'loc-mexico-country-study-1996',
            loc: { section: 'Civil War and the French Intervention', para: '5' }
          }
        ]
      }
    ]
  },
  regions: ['latin-america'],
  prominence: 3,
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'On June 12, 1864, the Emperor Maximilian I and his Belgian wife, Marie Charlotte Amélie Léopoldine, now called Empress Carlota, arrived in Mexico City. The republican government under Juárez retreated to the far north.',
          lang: 'en',
          cite: {
            source: 'loc-mexico-country-study-1996',
            loc: { section: 'Civil War and the French Intervention', para: '4' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/mexico/21.htm' }
        },
        {
          id: 'q2',
          text: 'Although Maximilian’s Conservative government controlled much of the country, Liberals held on to power in northwestern Mexico and parts of the Pacific coast.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-french-intervention-in-mexico',
            loc: {
              section: 'French Intervention in Mexico and the American Civil War, 1862–1867',
              para: '6'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://history.state.gov/milestones/1861-1865/french-intervention'
          }
        }
      ]
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/f/f8/Emperador_Maximiliano_I_de_Mexico.jpg/1280px-Emperador_Maximiliano_I_de_Mexico.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Emperador_Maximiliano_I_de_Mexico.jpg',
    credit: { creator: 'Albert Graefle' },
    license: { id: 'public-domain' }
  }
})
