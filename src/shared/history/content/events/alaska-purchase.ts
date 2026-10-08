import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'alaska-purchase',
  names: [
    { text: 'Alaska Purchase', lang: 'en', role: 'primary' },
    { text: 'Purchase of Alaska', lang: 'en', role: 'alternative' }
  ],
  researched: '2026-10-08',
  type: 'treaty',
  start: {
    alts: [
      {
        value: { d: '1867-03-30' },
        cites: [
          {
            source: 'state-dept-milestones-purchase-of-alaska',
            loc: { section: 'Purchase of Alaska, 1867', para: '3' }
          }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1867-10-18' },
        cites: [
          {
            source: 'state-dept-milestones-purchase-of-alaska',
            loc: { section: 'Purchase of Alaska, 1867', para: '3' }
          }
        ]
      }
    ]
  },
  regions: ['north-america', 'russia-central-asia'],
  prominence: 3,
  places: [
    {
      ref: 'place:washington-dc',
      cites: [
        {
          source: 'state-dept-milestones-purchase-of-alaska',
          loc: { section: 'Purchase of Alaska, 1867', para: '3' }
        }
      ]
    }
  ],
  partOf: [
    { ref: 'period:reign-of-alexander-ii' }
  ],
  polities: [
    { ref: 'polity:united-states' },
    { ref: 'polity:russian-empire' }
  ],
  participants: [
    {
      name: 'William Seward',
      role: 'negotiator',
      cites: [
        {
          source: 'state-dept-milestones-purchase-of-alaska',
          loc: { section: 'Purchase of Alaska, 1867', para: '3' }
        }
      ]
    },
    {
      name: 'Edouard de Stoeckl',
      role: 'negotiator',
      cites: [
        {
          source: 'state-dept-milestones-purchase-of-alaska',
          loc: { section: 'Purchase of Alaska, 1867', para: '3' }
        }
      ]
    },
    {
      name: 'Andrew Johnson',
      role: 'head-of-state',
      cites: [
        {
          source: 'state-dept-milestones-purchase-of-alaska',
          loc: { section: 'Purchase of Alaska, 1867', para: '3' }
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
          text: 'The purchase of Alaska in 1867 marked the end of Russian efforts to expand trade and settlements to the Pacific coast of North America, and became an important step in the United States rise as a great power in the Asia-Pacific region.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-purchase-of-alaska',
            loc: { section: 'Purchase of Alaska, 1867', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://history.state.gov/milestones/1866-1898/alaska-purchase'
          }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q2',
          text: 'St. Petersburg, however, lacked the financial resources to support major settlements or a military presence along the Pacific coast of North America and permanent Russian settlers in Alaska never numbered more than four hundred.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-purchase-of-alaska',
            loc: { section: 'Purchase of Alaska, 1867', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://history.state.gov/milestones/1866-1898/alaska-purchase'
          }
        },
        {
          id: 'q3',
          text: 'Defeat in the Crimean War further reduced Russian interest in this region.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-purchase-of-alaska',
            loc: { section: 'Purchase of Alaska, 1867', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://history.state.gov/milestones/1866-1898/alaska-purchase'
          }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q4',
          text: 'This purchase ended Russia’s presence in North America and ensured U.S. access to the Pacific northern rim.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-purchase-of-alaska',
            loc: { section: 'Purchase of Alaska, 1867', para: '3' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://history.state.gov/milestones/1866-1898/alaska-purchase'
          }
        },
        {
          id: 'q5',
          text: 'Skeptics had dubbed the purchase of Alaska “Seward’s Folly,” but the former Secretary of State was vindicated when a major gold deposit was discovered in the Yukon in 1896, and Alaska became the gateway to the Klondike gold fields.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-purchase-of-alaska',
            loc: { section: 'Purchase of Alaska, 1867', para: '4' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://history.state.gov/milestones/1866-1898/alaska-purchase'
          }
        },
        {
          id: 'q6',
          text: 'The renewed international image of the United States also helped Secretary of State William Seward in his attempts to acquire additional territory in the postwar period. In 1867, Seward succeeded in purchasing Alaska from the Russian Government.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-consequences-of-union-victory',
            loc: { section: 'The Consequences of Union Victory, 1865', para: '7' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://history.state.gov/milestones/1861-1865/victory'
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
            value: { d: '1867-03-30' },
            cites: [
              {
                source: 'state-dept-milestones-purchase-of-alaska',
                loc: { section: 'Purchase of Alaska, 1867', para: '3' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q7',
        text: 'The looming U.S. Civil War delayed the sale, but after the war, Secretary of State William Seward quickly took up a renewed Russian offer and on March 30, 1867, agreed to a proposal from Russian Minister in Washington, Edouard de Stoeckl, to purchase Alaska for $7.2 million.',
        lang: 'en',
        cite: {
          source: 'state-dept-milestones-purchase-of-alaska',
          loc: { section: 'Purchase of Alaska, 1867', para: '3' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://history.state.gov/milestones/1866-1898/alaska-purchase'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1867-10-18' },
            cites: [
              {
                source: 'state-dept-milestones-purchase-of-alaska',
                loc: { section: 'Purchase of Alaska, 1867', para: '3' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q8',
        text: 'The Senate approved the treaty of purchase on April 9; President Andrew Johnson signed the treaty on May 28, and Alaska was formally transferred to the United States on October 18, 1867.',
        lang: 'en',
        cite: {
          source: 'state-dept-milestones-purchase-of-alaska',
          loc: { section: 'Purchase of Alaska, 1867', para: '3' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://history.state.gov/milestones/1866-1898/alaska-purchase'
        }
      }
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/2/20/Alaska_Purchase_%28hi-res%29.jpg/1280px-Alaska_Purchase_%28hi-res%29.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Alaska_Purchase_(hi-res).jpg',
    credit: { institution: 'U.S. National Archives' },
    license: { id: 'public-domain' }
  }
})
