import { defineEvent } from '../../schema'

export default defineEvent({
  id: '2008-united-states-presidential-election',
  names: [
    { text: '2008 United States presidential election', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-12',
  type: 'election',
  start: {
    alts: [
      {
        value: { d: '2008-11-04' },
        cites: [
          {
            source: 'millercenter-nelson-obama-campaigns-and-elections',
            loc: { section: 'Barack Obama: Campaigns and Elections', para: '11' }
          }
        ]
      }
    ]
  },
  regions: ['north-america'],
  prominence: 2,
  polities: [
    {
      ref: 'polity:united-states',
      cites: [
        {
          source: 'millercenter-nelson-obama-campaigns-and-elections',
          loc: { section: 'Barack Obama: Campaigns and Elections', para: '11' }
        }
      ]
    }
  ],
  sides: [
    {
      key: 'obama-biden',
      name: 'Democratic ticket of Barack Obama and Joe Biden',
      cites: [
        {
          source: 'millercenter-nelson-obama-campaigns-and-elections',
          loc: { section: 'Barack Obama: Campaigns and Elections', para: '7' }
        }
      ]
    },
    {
      key: 'mccain-palin',
      name: 'Republican ticket of John McCain and Sarah Palin',
      cites: [
        {
          source: 'millercenter-nelson-obama-campaigns-and-elections',
          loc: { section: 'Barack Obama: Campaigns and Elections', para: '9' }
        }
      ]
    }
  ],
  participants: [
    {
      ref: 'person:barack-obama',
      role: 'leader',
      side: 'obama-biden',
      cites: [
        {
          source: 'millercenter-nelson-obama-campaigns-and-elections',
          loc: { section: 'Barack Obama: Campaigns and Elections', para: '2' }
        }
      ]
    },
    {
      name: 'John McCain',
      role: 'leader',
      side: 'mccain-palin',
      cites: [
        {
          source: 'millercenter-nelson-obama-campaigns-and-elections',
          loc: { section: 'Barack Obama: Campaigns and Elections', para: '9' }
        }
      ]
    },
    {
      name: 'Joe Biden',
      role: 'participant',
      side: 'obama-biden',
      cites: [
        {
          source: 'millercenter-nelson-obama-campaigns-and-elections',
          loc: { section: 'Barack Obama: Campaigns and Elections', para: '7' }
        }
      ]
    },
    {
      name: 'Sarah Palin',
      role: 'participant',
      side: 'mccain-palin',
      cites: [
        {
          source: 'millercenter-nelson-obama-campaigns-and-elections',
          loc: { section: 'Barack Obama: Campaigns and Elections', para: '9' }
        }
      ]
    },
    {
      name: 'Hillary Clinton',
      role: 'participant',
      side: 'obama-biden',
      cites: [
        {
          source: 'millercenter-nelson-obama-campaigns-and-elections',
          loc: { section: 'Barack Obama: Campaigns and Elections', para: '2' }
        }
      ]
    }
  ],
  related: [
    {
      ref: 'event:2008-financial-crisis',
      rel: 'related',
      cites: [
        {
          source: 'millercenter-nelson-obama-campaigns-and-elections',
          loc: { section: 'Barack Obama: Campaigns and Elections', para: '10' }
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
          text: 'Obama was elected handily on November 4, 2008.',
          lang: 'en',
          cite: {
            source: 'millercenter-nelson-obama-campaigns-and-elections',
            loc: { section: 'Barack Obama: Campaigns and Elections', para: '11' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-12',
            url: 'https://millercenter.org/president/obama/campaigns-and-elections'
          }
        },
        {
          id: 'q2',
          text: 'Obama announced his presidential candidacy on February 10, 2007, at a rally in front of the Old State House in Springfield, Illinois, where Abraham Lincoln had given his famous “house divided” speech in 1858.',
          lang: 'en',
          cite: {
            source: 'millercenter-nelson-obama-campaigns-and-elections',
            loc: { section: 'Barack Obama: Campaigns and Elections', para: '2' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-12',
            url: 'https://millercenter.org/president/obama/campaigns-and-elections'
          }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q3',
          text: 'From February through early June, Obama and Clinton battled fiercely through the remaining primaries and caucuses.',
          lang: 'en',
          cite: {
            source: 'millercenter-nelson-obama-campaigns-and-elections',
            loc: { section: 'Barack Obama: Campaigns and Elections', para: '4' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-12',
            url: 'https://millercenter.org/president/obama/campaigns-and-elections'
          }
        },
        {
          id: 'q4',
          text: 'But Obama had three crucial advantages that enabled him to eke out a narrow victory for the Democratic nomination.',
          lang: 'en',
          cite: {
            source: 'millercenter-nelson-obama-campaigns-and-elections',
            loc: { section: 'Barack Obama: Campaigns and Elections', para: '5' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-12',
            url: 'https://millercenter.org/president/obama/campaigns-and-elections'
          }
        }
      ]
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q5',
          text: 'In his acceptance speech on the last night of the convention, Obama outlined the issues of his general election campaign.',
          lang: 'en',
          cite: {
            source: 'millercenter-nelson-obama-campaigns-and-elections',
            loc: { section: 'Barack Obama: Campaigns and Elections', para: '8' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-12',
            url: 'https://millercenter.org/president/obama/campaigns-and-elections'
          }
        },
        {
          id: 'q6',
          text: 'McCain maintained his narrow advantage in the polls until mid-September, when the nation\'s financial sector, heavily invested in risky mortgage-backed securities, went into a sudden tailspin.',
          lang: 'en',
          cite: {
            source: 'millercenter-nelson-obama-campaigns-and-elections',
            loc: { section: 'Barack Obama: Campaigns and Elections', para: '10' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-12',
            url: 'https://millercenter.org/president/obama/campaigns-and-elections'
          }
        }
      ]
    },
    {
      kind: 'aftermath',
      quotes: [
        {
          id: 'q7',
          text: 'Nebraska distributes its electoral votes proportionally, with two at-large electors representing the statewide winning presidential and vice presidential candidates and one elector each representing the winners from its three Congressional districts.',
          lang: 'en',
          cite: {
            source: 'national-archives-2008-electoral-college-results',
            loc: { section: '2008 Electoral College Results', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-12',
            url: 'https://www.archives.gov/electoral-college/2008'
          }
        },
        {
          id: 'q8',
          text: 'From the very start of Obama’s tenure as president, congressional Republicans pursued a strategy of consistent, strenuous opposition to most of his legislative initiatives.',
          lang: 'en',
          cite: {
            source: 'millercenter-nelson-obama-campaigns-and-elections',
            loc: { section: 'Barack Obama: Campaigns and Elections', para: '14' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-12',
            url: 'https://millercenter.org/president/obama/campaigns-and-elections'
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
            value: { d: '2007' },
            cites: [
              {
                source: 'millercenter-nelson-obama-campaigns-and-elections',
                loc: { section: 'Barack Obama: Campaigns and Elections', para: '3' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q9',
        text: 'Drawing on his online base of supporters, Obama initially surprised political pundits by matching Clinton and besting Edwards in campaign fundraising throughout 2007.',
        lang: 'en',
        cite: {
          source: 'millercenter-nelson-obama-campaigns-and-elections',
          loc: { section: 'Barack Obama: Campaigns and Elections', para: '3' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-12',
          url: 'https://millercenter.org/president/obama/campaigns-and-elections'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '2008-03-18' },
            cites: [
              {
                source: 'millercenter-nelson-obama-campaigns-and-elections',
                loc: { section: 'Barack Obama: Campaigns and Elections', para: '6' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q10',
        text: 'Obama largely defused the crisis by giving a speech in Philadelphia on March 18, 2008, repudiating Wright\'s statements and thoughtfully outlining his own views on race relations.',
        lang: 'en',
        cite: {
          source: 'millercenter-nelson-obama-campaigns-and-elections',
          loc: { section: 'Barack Obama: Campaigns and Elections', para: '6' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-12',
          url: 'https://millercenter.org/president/obama/campaigns-and-elections'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '2008-08-22' },
            cites: [
              {
                source: 'millercenter-nelson-obama-campaigns-and-elections',
                loc: { section: 'Barack Obama: Campaigns and Elections', para: '7' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q11',
        text: 'Partly to expand his appeal to working-class whites, and partly to offset his own modest foreign policy credentials, Obama named Senator Joe Biden of Delaware as his vice presidential running mate on August 22, two days before the opening of the Democratic National Convention in Denver, Colorado.',
        lang: 'en',
        cite: {
          source: 'millercenter-nelson-obama-campaigns-and-elections',
          loc: { section: 'Barack Obama: Campaigns and Elections', para: '7' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-12',
          url: 'https://millercenter.org/president/obama/campaigns-and-elections'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '2008-08-29' },
            cites: [
              {
                source: 'millercenter-nelson-obama-campaigns-and-elections',
                loc: { section: 'Barack Obama: Campaigns and Elections', para: '9' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q12',
        text: 'Obama left Denver on August 29 enjoying a small lead over McCain in the polls.',
        lang: 'en',
        cite: {
          source: 'millercenter-nelson-obama-campaigns-and-elections',
          loc: { section: 'Barack Obama: Campaigns and Elections', para: '9' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-12',
          url: 'https://millercenter.org/president/obama/campaigns-and-elections'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '2008-09-26' },
            cites: [
              {
                source: 'millercenter-nelson-obama-campaigns-and-elections',
                loc: { section: 'Barack Obama: Campaigns and Elections', para: '10' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q13',
        text: 'In the three nationally televised debates between the presidential candidates that took place from September 26 to October 15, Obama\'s calm, confident, and competent demeanor impressed voters who were looking for both reassurance that all would be well and a change in the nation\'s direction.',
        lang: 'en',
        cite: {
          source: 'millercenter-nelson-obama-campaigns-and-elections',
          loc: { section: 'Barack Obama: Campaigns and Elections', para: '10' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-12',
          url: 'https://millercenter.org/president/obama/campaigns-and-elections'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '2008-11-04' },
            cites: [
              {
                source: 'millercenter-nelson-obama-campaigns-and-elections',
                loc: { section: 'Barack Obama: Campaigns and Elections', para: '11' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q14',
        text: 'In the Electoral College, Obama prevailed by a margin of 365 to 173.',
        lang: 'en',
        cite: {
          source: 'millercenter-nelson-obama-campaigns-and-elections',
          loc: { section: 'Barack Obama: Campaigns and Elections', para: '11' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-12',
          url: 'https://millercenter.org/president/obama/campaigns-and-elections'
        }
      }
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/1/15/Barack_Obama_Rally_in_Grant_Park_November_4%2C_2008_%283005067639%29.jpg/1280px-Barack_Obama_Rally_in_Grant_Park_November_4%2C_2008_%283005067639%29.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Barack_Obama_Rally_in_Grant_Park_November_4,_2008_(3005067639).jpg',
    credit: { creator: 'Wendy Piersall' },
    license: { id: 'cc-by', version: '2.0', url: 'https://creativecommons.org/licenses/by/2.0' }
  },
  places: [
    {
      ref: 'place:washington-dc',
      cites: [
        {
          source: 'millercenter-nelson-obama-campaigns-and-elections',
          loc: { section: 'Barack Obama: Campaigns and Elections', para: '6' }
        }
      ]
    }
  ]
})
