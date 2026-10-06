import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'oregon-treaty',
  names: [
    { text: 'Oregon Treaty', lang: 'en', role: 'primary' },
    {
      text: 'Treaty with Great Britain, in Regard to Limits Westward of the Rocky Mountains',
      lang: 'en',
      role: 'official',
      cites: [
        {
          source: 'avalon-oregon-treaty-1846',
          loc: {
            section: 'Treaty with Great Britain, in Regard to Limits Westward of the Rocky Mountains',
            para: '1'
          }
        }
      ]
    }
  ],
  researched: '2026-10-06',
  type: 'treaty',
  start: {
    alts: [
      {
        value: { d: '1846-06-15' },
        cites: [
          {
            source: 'avalon-oregon-treaty-1846',
            loc: {
              section: 'Treaty with Great Britain, in Regard to Limits Westward of the Rocky Mountains',
              para: '13'
            }
          }
        ]
      }
    ]
  },
  regions: ['north-america'],
  prominence: 3,
  places: [
    {
      ref: 'place:washington-dc',
      cites: [
        {
          source: 'avalon-oregon-treaty-1846',
          loc: {
            section: 'Treaty with Great Britain, in Regard to Limits Westward of the Rocky Mountains',
            para: '13'
          }
        }
      ]
    }
  ],
  participants: [
    {
      name: 'James Polk',
      role: 'head-of-state',
      cites: [
        {
          source: 'state-dept-milestones-oregon-territory',
          loc: { section: 'The Oregon Territory, 1846', para: '7' }
        }
      ]
    },
    {
      name: 'Richard Pakenham',
      role: 'negotiator',
      cites: [
        {
          source: 'state-dept-milestones-oregon-territory',
          loc: { section: 'The Oregon Territory, 1846', para: '7' }
        }
      ]
    },
    {
      name: 'James Buchanan',
      role: 'negotiator',
      cites: [
        {
          source: 'state-dept-milestones-oregon-territory',
          loc: { section: 'The Oregon Territory, 1846', para: '7' }
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
          text: 'Along with territorial disputes with Spain and Mexico over the Southwest, the fate of the Oregon Territory was one of the major diplomatic issues of the first half of the 19th century.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-oregon-territory',
            loc: { section: 'The Oregon Territory, 1846', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://history.state.gov/milestones/1830-1860/oregon-territory'
          }
        },
        {
          id: 'q2',
          text: 'From the point on the forty-ninth parallel of north latitude, where the boundary laid down in existing treaties and conventions between the United States and Great Britain terminates, the line of boundary between the territories of the United States and those of her Britannic Majesty shall be continued westward along the said forty-ninth parallel of north latitude to the middle of the channel which separates the continent from Vancouver\'s Island, and thence southerly through the middle of the said channel, and of Fuca\'s Straits, to the Pacific Ocean: Provided, however, That the navigation of the whole of the said channel and straits, south of the forty-ninth parallel of north latitude, remain free and open to both parties.',
          lang: 'en',
          cite: {
            source: 'avalon-oregon-treaty-1846',
            loc: {
              section: 'Treaty with Great Britain, in Regard to Limits Westward of the Rocky Mountains',
              para: '3'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://avalon.law.yale.edu/19th_century/br-1846.asp'
          }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q3',
          text: 'By 1843, increased American immigration on the Oregon Trail to the Territory made the border issue a burning one in Congress, where jingoists raised the slogan of “54 degrees 40 minutes or fight.”',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-oregon-territory',
            loc: { section: 'The Oregon Territory, 1846', para: '7' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://history.state.gov/milestones/1830-1860/oregon-territory'
          }
        },
        {
          id: 'q4',
          text: 'President James Polk, a supporter of Manifest Destiny with an eye also on the Mexican Southwest and California, was eager to settle the boundary of the Oregon Territory and proposed a settlement on the 49 degree line to Great Britain.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-oregon-territory',
            loc: { section: 'The Oregon Territory, 1846', para: '7' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://history.state.gov/milestones/1830-1860/oregon-territory'
          }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q5',
          text: 'With some minor modifications, which reserved the whole of Vancouver Island to Canada, Great Britain agreed to Polk’s suggestion.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-oregon-territory',
            loc: { section: 'The Oregon Territory, 1846', para: '7' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://history.state.gov/milestones/1830-1860/oregon-territory'
          }
        },
        {
          id: 'q6',
          text: 'A later controversy over the precise boundaries in the Juan de Fuca Strait was resolved by international arbitration in favor of the United States.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-oregon-territory',
            loc: { section: 'The Oregon Territory, 1846', para: '7' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://history.state.gov/milestones/1830-1860/oregon-territory'
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
            value: { d: '1846-06-18' },
            cites: [
              {
                source: 'state-dept-milestones-oregon-territory',
                loc: { section: 'The Oregon Territory, 1846', para: '7' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q7',
        text: 'The Senate ratified the treaty by a vote of 41-14 on June 18, 1846.',
        lang: 'en',
        cite: {
          source: 'state-dept-milestones-oregon-territory',
          loc: { section: 'The Oregon Territory, 1846', para: '7' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://history.state.gov/milestones/1830-1860/oregon-territory'
        }
      }
    }
  ]
})
