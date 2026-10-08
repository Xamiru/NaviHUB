import { definePeriod } from '../../schema'

export default definePeriod({
  id: 'reign-of-alexander-iii',
  names: [
    { text: 'Reign of Alexander III', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-08',
  periodType: 'reign',
  start: {
    alts: [
      {
        value: { d: '1881' },
        cites: [
          {
            source: 'loc-russia-country-study-1996',
            loc: { section: 'Transformation of Russia in the Nineteenth Century', para: '13' }
          }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1894' },
        cites: [
          {
            source: 'loc-russia-country-study-1996',
            loc: { section: 'Transformation of Russia in the Nineteenth Century', para: '13' }
          }
        ]
      }
    ]
  },
  regions: ['russia-central-asia', 'europe'],
  prominence: 2,
  parent: 'polity:russian-empire',
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'His son Alexander III (r. 1881-94) initiated a period of political reaction, which intensified a counterreform movement that had begun in 1866.',
          lang: 'en',
          cite: {
            source: 'loc-russia-country-study-1996',
            loc: { section: 'Transformation of Russia in the Nineteenth Century', para: '13' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/russia/6.htm' }
        },
        {
          id: 'q2',
          text: 'In their attempts to "save" Russia from "modernism," they revived religious censorship, persecuted non-Orthodox and non-Russian populations, fostered anti-Semitism, and suppressed the autonomy of the universities.',
          lang: 'en',
          cite: {
            source: 'loc-russia-country-study-1996',
            loc: { section: 'Transformation of Russia in the Nineteenth Century', para: '13' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/russia/6.htm' }
        }
      ]
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q3',
          text: 'In the dispute that arose between Austria-Hungary and Russia, Germany took a firm position toward Russia while mollifying the tsar with a bilateral defensive alliance, the Reinsurance Treaty of 1887 between Germany and Russia.',
          lang: 'en',
          cite: {
            source: 'loc-russia-country-study-1996',
            loc: { section: 'Transformation of Russia in the Nineteenth Century', para: '20' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/russia/6.htm' }
        },
        {
          id: 'q4',
          text: 'The People\'s Will remained underground, but in 1887 a young member of the group, Aleksandr Ul\'yanov, attempted to assassinate Alexander III, and authorities arrested and executed him.',
          lang: 'en',
          cite: {
            source: 'loc-russia-country-study-1996',
            loc: { section: 'Transformation of Russia in the Nineteenth Century', para: '24' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/russia/6.htm' }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q5',
          text: 'The nationalities, particularly Poles, Finns, Latvians, Lithuanians, and Ukrainians, reacted to the regime\'s efforts to Russify them by intensifying their own nationalism.',
          lang: 'en',
          cite: {
            source: 'loc-russia-country-study-1996',
            loc: { section: 'Transformation of Russia in the Nineteenth Century', para: '13' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/russia/6.htm' }
        }
      ]
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/9/9e/Alexander_III%2C_Emperor_of_Russia%2C_head-and-shoulders_portrait%2C_facing_right_LCCN99615681.jpg/1280px-Alexander_III%2C_Emperor_of_Russia%2C_head-and-shoulders_portrait%2C_facing_right_LCCN99615681.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Alexander_III,_Emperor_of_Russia,_head-and-shoulders_portrait,_facing_right_LCCN99615681.jpg',
    credit: { institution: 'Library of Congress' },
    license: { id: 'public-domain' }
  }
})
