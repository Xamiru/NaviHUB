import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'perry-expedition-to-japan',
  names: [
    { text: 'Perry Expedition and the Treaty of Kanagawa', lang: 'en', role: 'primary' },
    {
      text: 'Treaty of Kanagawa',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'state-dept-milestones-opening-to-japan',
          loc: { section: 'The United States and the Opening to Japan, 1853', para: '9' }
        }
      ]
    },
    {
      text: 'Treaty of Peace and Amity',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'loc-japan-country-study-1994',
          loc: { section: 'Decline of the Tokugawa', para: '5' }
        }
      ]
    }
  ],
  researched: '2026-10-06',
  type: 'expedition',
  start: {
    alts: [
      {
        value: { d: '1853-07-08' },
        cites: [
          {
            source: 'state-dept-milestones-opening-to-japan',
            loc: { section: 'The United States and the Opening to Japan, 1853', para: '1' }
          }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1854-03-31' },
        cites: [
          {
            source: 'state-dept-milestones-opening-to-japan',
            loc: { section: 'The United States and the Opening to Japan, 1853', para: '9' }
          }
        ]
      }
    ]
  },
  regions: ['east-asia', 'north-america'],
  prominence: 2,
  places: [
    {
      ref: 'place:edo',
      cites: [
        {
          source: 'loc-japan-country-study-1994',
          loc: { section: 'Decline of the Tokugawa', para: '5' }
        }
      ]
    }
  ],
  participants: [
    {
      ref: 'person:matthew-perry',
      role: 'commander',
      cites: [
        {
          source: 'state-dept-milestones-opening-to-japan',
          loc: { section: 'The United States and the Opening to Japan, 1853', para: '1' }
        }
      ]
    },
    {
      name: 'Abe Masahiro',
      role: 'negotiator',
      cites: [
        {
          source: 'loc-japan-country-study-1994',
          loc: { section: 'Decline of the Tokugawa', para: '5' }
        }
      ]
    },
    {
      name: 'Millard Fillmore',
      role: 'head-of-state',
      cites: [
        {
          source: 'state-dept-milestones-opening-to-japan',
          loc: { section: 'The United States and the Opening to Japan, 1853', para: '6' }
        }
      ]
    }
  ],
  sections: [
    {
      kind: 'background',
      quotes: [
        {
          id: 'q1',
          text: 'Japan turned down a demand from the United States, which was greatly expanding its own presence in the Asia-Pacific region, to establish diplomatic relations when Commodore James Biddle appeared in Edo Bay with two warships in July 1846.',
          lang: 'en',
          cite: {
            source: 'loc-japan-country-study-1994',
            loc: { section: 'Decline of the Tokugawa', para: '5' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/japan/21.htm' }
        },
        {
          id: 'q2',
          text: 'In 1851, President Millard Fillmore authorized a formal naval expedition to Japan to return shipwrecked Japanese sailors and request that Americans stranded in Japan be returned to the United States.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-opening-to-japan',
            loc: { section: 'The United States and the Opening to Japan, 1853', para: '6' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://history.state.gov/milestones/1830-1860/opening-to-japan'
          }
        }
      ]
    },
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q3',
          text: 'On July 8, 1853, American Commodore Matthew Perry led his four ships into the harbor at Tokyo Bay, seeking to re-establish for the first time in over 200 years regular trade and discourse between Japan and the western world.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-opening-to-japan',
            loc: { section: 'The United States and the Opening to Japan, 1853', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://history.state.gov/milestones/1830-1860/opening-to-japan'
          }
        },
        {
          id: 'q4',
          text: 'However, when Commodore Matthew C. Perry\'s four-ship squadron appeared in Edo Bay in July 1853, the bakufu was thrown into turmoil.',
          lang: 'en',
          cite: {
            source: 'loc-japan-country-study-1994',
            loc: { section: 'Decline of the Tokugawa', para: '5' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/japan/21.htm' }
        },
        {
          id: 'q5',
          text: 'Lacking consensus, Abe decided to compromise by accepting Perry\'s demands for opening Japan to foreign trade while also making military preparations.',
          lang: 'en',
          cite: {
            source: 'loc-japan-country-study-1994',
            loc: { section: 'Decline of the Tokugawa', para: '5' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/japan/21.htm' }
        },
        {
          id: 'q6',
          text: 'The advance boat soon touched the spot, and Captain Buchanan, who commanded the party, sprang ashore, being the first of the Americans who landed in the Kingdom of Japan.',
          lang: 'en',
          cite: {
            source: 'hawks-1856-narrative-of-the-expedition-to-japan',
            loc: { section: 'Commodore Perry: When We Landed in Japan, 1853', para: '9' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://sourcebooks.fordham.edu/mod/1854Perry-japan1.asp'
          }
        },
        {
          id: 'q7',
          text: 'The port of Simoda, in the principality of Idzu and the port of Hakodadi, in the pricipality of Matsmai are granted by the Japanese as ports for he reception for American ships, where they can be supplied with wood, water, provisions and coal, and other articles their necessities may require, as far as the Japanese have them.',
          lang: 'en',
          cite: {
            source: 'avalon-treaty-of-kanagawa',
            loc: { section: 'Treaty of Kanagawa; March 31, 1854', para: '6' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://avalon.law.yale.edu/19th_century/japan002.asp'
          }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q8',
          text: 'A commercial treaty, opening still more areas to American trade, was forced on the bakufu five years later.',
          lang: 'en',
          cite: {
            source: 'loc-japan-country-study-1994',
            loc: { section: 'Decline of the Tokugawa', para: '5' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/japan/21.htm' }
        },
        {
          id: 'q9',
          text: 'The resulting damage to the bakufu was significant.',
          lang: 'en',
          cite: {
            source: 'loc-japan-country-study-1994',
            loc: { section: 'Decline of the Tokugawa', para: '6' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/japan/21.htm' }
        },
        {
          id: 'q10',
          text: 'At the same time, the process by which the United States and the Western powers forced Japan into modern commercial intercourse, along with other internal factors, weakened the position of the Tokugawa Shogunate to the point that the shogun fell from power.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-opening-to-japan',
            loc: { section: 'The United States and the Opening to Japan, 1853', para: '12' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://history.state.gov/milestones/1830-1860/opening-to-japan'
          }
        }
      ]
    }
  ],
  course: [
    {
      date: {
        alts: [
          {
            value: { d: '1854-03-31' },
            cites: [
              {
                source: 'state-dept-milestones-opening-to-japan',
                loc: { section: 'The United States and the Opening to Japan, 1853', para: '9' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q11',
        text: 'The Japanese grudgingly agreed to Perry’s demands, and the two sides signed the Treaty of Kanagawa on March 31, 1854.',
        lang: 'en',
        cite: {
          source: 'state-dept-milestones-opening-to-japan',
          loc: { section: 'The United States and the Opening to Japan, 1853', para: '9' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://history.state.gov/milestones/1830-1860/opening-to-japan'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1858' },
            cites: [
              {
                source: 'state-dept-milestones-opening-to-japan',
                loc: { section: 'The United States and the Opening to Japan, 1853', para: '11' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q12',
        text: 'The United States and Japan signed their first true commercial treaty, sometimes called the Harris Treaty, in 1858.',
        lang: 'en',
        cite: {
          source: 'state-dept-milestones-opening-to-japan',
          loc: { section: 'The United States and the Opening to Japan, 1853', para: '11' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://history.state.gov/milestones/1830-1860/opening-to-japan'
        }
      }
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/6/63/Commodore_Perry_expedition_LOC_LC-USZ62-3319.jpg/1280px-Commodore_Perry_expedition_LOC_LC-USZ62-3319.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Commodore_Perry_expedition_LOC_LC-USZ62-3319.jpg',
    credit: { institution: 'Library of Congress', creator: 'Wilhelm Heine' },
    license: { id: 'public-domain' }
  },
  archive: [
    {
      id: 'perry-1856',
      mediaKind: 'document',
      title: 'Narrative of the expedition of an American squadron to the China Seas and Japan, performed in the years 1852, 1853, and 1854, under the command of Commodore M. C. Perry, United States Navy, by order of the government of the United States',
      date: { d: '1856' },
      url: 'https://archive.org/download/narrativeofexped01perr/narrativeofexped01perr.pdf',
      page: 'https://archive.org/details/narrativeofexped01perr',
      credit: {
        institution: 'University of California Libraries (Internet Archive)',
        creator: 'Matthew Calbraith Perry'
      },
      license: { id: 'public-domain' },
      bytes: 46374778
    }
  ]
})
