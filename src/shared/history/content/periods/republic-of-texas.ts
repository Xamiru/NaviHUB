import { definePeriod } from '../../schema'

export default definePeriod({
  id: 'republic-of-texas',
  names: [
    { text: 'Republic of Texas', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-07',
  periodType: 'regime',
  start: {
    alts: [
      {
        value: { d: '1836-03-02' },
        cites: [
          {
            source: 'tslac-texas-declaration-of-independence-1836',
            loc: { section: 'Declaration of Independence of Texas, 1836', para: '1' }
          }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1845-12-29' },
        cites: [
          {
            source: 'state-dept-milestones-texas-annexation',
            loc: {
              section: 'The Annexation of Texas, the Mexican-American War, and the Treaty of Guadalupe-Hidalgo, 1845–1848',
              para: '4'
            }
          }
        ]
      }
    ]
  },
  regions: ['north-america'],
  prominence: 3,
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'Accordingly, while the United States extended diplomatic recognition to Texas, it took no further action concerning annexation until 1844, when President John Tyler restarted negotiations with the Republic of Texas.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-texas-annexation',
            loc: {
              section: 'The Annexation of Texas, the Mexican-American War, and the Treaty of Guadalupe-Hidalgo, 1845–1848',
              para: '4'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://history.state.gov/milestones/1830-1860/texas-annexation'
          }
        }
      ]
    },
    {
      kind: 'aftermath',
      quotes: [
        {
          id: 'q2',
          text: 'With the support of President-elect Polk, Tyler managed to get the joint resolution passed on March 1, 1845, and Texas was admitted into the United States on December 29.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-texas-annexation',
            loc: {
              section: 'The Annexation of Texas, the Mexican-American War, and the Treaty of Guadalupe-Hidalgo, 1845–1848',
              para: '4'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://history.state.gov/milestones/1830-1860/texas-annexation'
          }
        }
      ]
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/c/cd/Declaration_Broadside_from_transparency_1909_1_344.jpg/1280px-Declaration_Broadside_from_transparency_1909_1_344.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Declaration_Broadside_from_transparency_1909_1_344.jpg',
    credit: { institution: 'Texas State Library and Archives Commission' },
    license: { id: 'public-domain' }
  }
})
